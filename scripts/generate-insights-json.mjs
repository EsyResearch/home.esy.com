#!/usr/bin/env node

/**
 * Generate pre-computed insights JSON for visual essays.
 *
 * Reads research packages (FIGURES.md, CITATIONS.md, SYNTHESIS.md),
 * extracts key terms and figures, generates contextual insights via
 * Claude Haiku, and writes /public/insights/{slug}.json.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-ant-... node scripts/generate-insights-json.mjs turkana-boy
 *   ANTHROPIC_API_KEY=sk-ant-... node scripts/generate-insights-json.mjs --all
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ESSAYS_DIR = path.join(ROOT, 'src/app/essays');
const OUTPUT_DIR = path.join(ROOT, 'public/insights');

const API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = 'claude-3-5-haiku-latest';
const MAX_TOKENS = 200;

// ── Discover essays with research packages ──────────────────────

function findEssaysWithResearch(baseDir, prefix = '') {
  const results = [];
  if (!fs.existsSync(baseDir)) return results;

  for (const entry of fs.readdirSync(baseDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (entry.name === 'v' || entry.name === 'research' || entry.name === 'node_modules') continue;

    const fullPath = path.join(baseDir, entry.name);
    const researchDir = path.join(fullPath, 'research');
    const slug = entry.name;

    if (fs.existsSync(researchDir) && fs.existsSync(path.join(researchDir, 'FIGURES.md'))) {
      results.push({ slug, researchDir, category: prefix });
    }

    // Recurse into category directories
    const deeper = findEssaysWithResearch(fullPath, prefix ? `${prefix}/${entry.name}` : entry.name);
    results.push(...deeper);
  }

  return results;
}

// ── Parse research files ────────────────────────────────────────

function readFileIfExists(dir, filename) {
  const p = path.join(dir, filename);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null;
}

function extractFigures(figuresMd) {
  if (!figuresMd) return [];
  const figures = [];
  const regex = /^## \d+\.\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(figuresMd)) !== null) {
    const name = match[1].trim();
    const startIdx = match.index + match[0].length;
    const nextMatch = regex.exec(figuresMd);
    const endIdx = nextMatch ? nextMatch.index : figuresMd.length;
    regex.lastIndex = nextMatch ? nextMatch.index : figuresMd.length;

    const block = figuresMd.slice(startIdx, endIdx);
    const roleMatch = block.match(/\*\*Role\*\*:\s*(.+)/);
    const relevanceMatch = block.match(/\*\*Relevance\*\*:\s*([\s\S]*?)(?=\n\*\*|$)/);

    figures.push({
      name,
      role: roleMatch ? roleMatch[1].trim() : '',
      relevance: relevanceMatch ? relevanceMatch[1].trim().slice(0, 500) : '',
    });
  }
  return figures;
}

function extractCitedTerms(citationsMd) {
  if (!citationsMd) return [];
  const terms = new Set();

  const italicTerms = citationsMd.matchAll(/\*([A-Z][a-z]+ [a-z]+)\*/g);
  for (const m of italicTerms) terms.add(m[1]);

  const specimenIds = citationsMd.matchAll(/\b(KNM-[A-Z]+-?\d+)\b/g);
  for (const m of specimenIds) terms.add(m[1]);

  return [...terms];
}

function extractSynthesisTerms(synthesisMd) {
  if (!synthesisMd) return [];
  const terms = [];
  const boldTerms = synthesisMd.matchAll(/\*\*([^*]{3,60})\*\*/g);
  for (const m of boldTerms) {
    const t = m[1].trim();
    if (!t.includes(':') && !t.startsWith('Phase') && !t.startsWith('Section')) {
      terms.push(t);
    }
  }
  return terms;
}

// ── Call Anthropic API ──────────────────────────────────────────

async function generateInsight(term, essayContext) {
  if (!API_KEY) {
    return `[Placeholder insight for "${term}" — set ANTHROPIC_API_KEY to generate real insights]`;
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: `You write concise contextual insights for readers of visual essays. Given a term or name that appears in an essay, write a 2-3 sentence explanation that helps the reader understand its significance in context. Be specific and informative, not generic. Do not use markdown.`,
      messages: [{
        role: 'user',
        content: `Essay context:\n${essayContext}\n\nWrite a concise insight for the term: "${term}"`,
      }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error(`  API error for "${term}": ${response.status} ${err}`);
    return null;
  }

  const data = await response.json();
  return data.content[0].text;
}

// ── Main ────────────────────────────────────────────────────────

async function generateForEssay(slug, researchDir) {
  console.log(`\nGenerating insights for: ${slug}`);

  const figuresMd = readFileIfExists(researchDir, 'FIGURES.md');
  const citationsMd = readFileIfExists(researchDir, 'CITATIONS.md');
  const synthesisMd = readFileIfExists(researchDir, 'SYNTHESIS.md');

  const figures = extractFigures(figuresMd);
  const citedTerms = extractCitedTerms(citationsMd);
  const synthesisTerms = extractSynthesisTerms(synthesisMd);

  const essayContext = [
    citationsMd ? citationsMd.slice(0, 2000) : '',
    synthesisMd ? synthesisMd.slice(0, 1500) : '',
    figuresMd ? figuresMd.slice(0, 1500) : '',
  ].filter(Boolean).join('\n\n---\n\n');

  const termMap = new Map();

  for (const fig of figures) {
    termMap.set(fig.name, { type: 'figure', context: `${fig.role}. ${fig.relevance}` });
  }
  for (const t of citedTerms) {
    if (!termMap.has(t)) termMap.set(t, { type: 'cited_term' });
  }
  for (const t of synthesisTerms) {
    if (!termMap.has(t)) termMap.set(t, { type: 'synthesis_term' });
  }

  console.log(`  Found ${termMap.size} terms (${figures.length} figures, ${citedTerms.length} cited, ${synthesisTerms.length} synthesis)`);

  const insights = { terms: {}, passages: {} };
  let generated = 0;
  let errors = 0;

  for (const [term, meta] of termMap) {
    const contextForTerm = meta.context
      ? `${meta.context}\n\n${essayContext.slice(0, 1000)}`
      : essayContext.slice(0, 2000);

    const insight = await generateInsight(term, contextForTerm);
    if (insight) {
      insights.terms[term] = insight;
      generated++;
    } else {
      errors++;
    }

    // Pace requests to stay under rate limits
    if (API_KEY) await new Promise(r => setTimeout(r, 200));
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const outputPath = path.join(OUTPUT_DIR, `${slug}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(insights, null, 2));
  console.log(`  Wrote ${outputPath} (${generated} insights, ${errors} errors)`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage:');
    console.log('  node scripts/generate-insights-json.mjs <slug>      Generate for one essay');
    console.log('  node scripts/generate-insights-json.mjs --all       Generate for all essays with research packages');
    console.log('');
    console.log('Set ANTHROPIC_API_KEY env var for real insights. Without it, placeholders are generated.');
    process.exit(0);
  }

  const allEssays = findEssaysWithResearch(ESSAYS_DIR);

  if (args[0] === '--all') {
    console.log(`Found ${allEssays.length} essays with research packages`);
    for (const essay of allEssays) {
      await generateForEssay(essay.slug, essay.researchDir);
    }
  } else {
    const slug = args[0];
    const essay = allEssays.find(e => e.slug === slug);
    if (!essay) {
      // Try direct path for top-level essays
      const directResearch = path.join(ESSAYS_DIR, slug, 'research');
      if (fs.existsSync(directResearch)) {
        await generateForEssay(slug, directResearch);
      } else {
        console.error(`Essay "${slug}" not found or has no research package.`);
        console.log('Available essays:', allEssays.map(e => e.slug).join(', '));
        process.exit(1);
      }
    } else {
      await generateForEssay(essay.slug, essay.researchDir);
    }
  }

  console.log('\nDone.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
