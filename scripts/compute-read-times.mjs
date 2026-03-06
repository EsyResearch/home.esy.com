#!/usr/bin/env node
/**
 * compute-read-times.mjs
 *
 * Scans essay directories, extracts word counts from Client TSX components,
 * counts images and visualizations, and computes defensible readTime values
 * using the formula:
 *
 *   readTime = ceil(wordCount / 238 + imageCount * 0.2 + vizCount * 0.4)
 *
 * Usage:
 *   node scripts/compute-read-times.mjs              # dry-run, print report
 *   node scripts/compute-read-times.mjs --update     # update visualEssays.ts in-place
 *   node scripts/compute-read-times.mjs --json       # output JSON for CI
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const ESSAYS_DIR = path.join(ROOT, 'src/app/essays');
const VE_PATH = path.join(ROOT, 'src/data/visualEssays.ts');

const WPM = 238;
const MIN_PER_IMAGE = 0.2;
const MIN_PER_VIZ = 0.4;

function computeReadTime(wordCount, imageCount, vizCount) {
  return Math.ceil(wordCount / WPM + imageCount * MIN_PER_IMAGE + vizCount * MIN_PER_VIZ);
}

// ---------------------------------------------------------------------------
// 1. Find all essay directories (contain page.tsx but are not index pages)
// ---------------------------------------------------------------------------

function findEssayDirs(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '[id]' || entry.name === 'research' || entry.name === 'design-research') continue;
      findEssayDirs(full, results);
    } else if (entry.name === 'page.tsx' || entry.name === 'page.jsx') {
      const rel = path.relative(ESSAYS_DIR, dir);
      if (rel === '' || rel === 'visual' || rel === 'guides' || rel === 'foundations') continue;
      results.push(dir);
    }
  }
  return results;
}

// ---------------------------------------------------------------------------
// 2. Find the Client component for an essay
// ---------------------------------------------------------------------------

function findClientFile(essayDir) {
  const files = fs.readdirSync(essayDir);
  const client = files.find(f => /Client\.(tsx|jsx)$/.test(f));
  if (client) return path.join(essayDir, client);

  // Check if page.tsx imports a Client from a subdirectory (canonical pointer pages)
  const pagePath = path.join(essayDir, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    const src = fs.readFileSync(pagePath, 'utf-8');
    const importMatch = src.match(/from\s+['"]\.\/(.+?Client)['"]/);
    if (importMatch) {
      const resolved = path.join(essayDir, importMatch[1] + '.tsx');
      if (fs.existsSync(resolved)) return resolved;
    }
    // Also handle: import X from './v/variant-name/XClient'
    const variantImport = src.match(/from\s+['"]\.\/v\/[^/]+\/(\w+Client)['"]/);
    if (variantImport) {
      const dirMatch = src.match(/from\s+['"](\.\/v\/[^/]+)\/\w+Client['"]/);
      if (dirMatch) {
        const resolved = path.join(essayDir, dirMatch[1], variantImport[1] + '.tsx');
        if (fs.existsSync(resolved)) return resolved;
      }
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// 3. Extract visible prose word count from a TSX/JSX file
// ---------------------------------------------------------------------------

function extractWordCount(filePath) {
  const src = fs.readFileSync(filePath, 'utf-8');

  // Step 1: Remove import/export lines
  let code = src.replace(/^(import|export)\s+.*/gm, '');

  // Step 2: Remove single-line comments and block comments
  code = code.replace(/\/\/.*$/gm, '');
  code = code.replace(/\/\*[\s\S]*?\*\//g, '');

  // Step 3: Remove data arrays/objects that are clearly not prose
  //         (IMAGES, SOURCES, IMAGE_CREDITS, ESSAY_META, COLOR consts, etc.)
  code = code.replace(/(?:const|let|var)\s+(?:IMAGES|SOURCES|IMAGE_CREDITS|ESSAY_META|COLORS?|PALETTE|DATA|TIMELINE_DATA|SECTION_DATA|MAP_DATA|GEO_JSON|GEO_DATA)\s*[:=][\s\S]*?(?:^(?:const|let|var|function|export|\/\/)|\n\n)/gm, '');

  // Step 4: Remove style objects and CSS class strings
  code = code.replace(/style\s*=\s*\{[\s\S]*?\}/g, '');
  code = code.replace(/className\s*=\s*["'][^"']*["']/g, '');
  code = code.replace(/className\s*=\s*\{[^}]*\}/g, '');

  // Step 5: Remove JSX/HTML tags themselves, keeping inner text
  code = code.replace(/<[^>]+>/g, ' ');

  // Step 6: Remove JSX expression containers (braces) but keep string content
  code = code.replace(/\{["'`]([^"'`]*)["'`]\}/g, ' $1 ');
  code = code.replace(/\{[^}]*\}/g, ' ');

  // Step 7: Remove remaining code-like lines
  code = code.replace(/^\s*(const|let|var|function|return|if|else|for|while|switch|case|break|try|catch|useEffect|useState|useRef|useMemo|useCallback)\b.*$/gm, '');

  // Step 8: Remove special characters, collapse whitespace
  code = code.replace(/[{}();=<>[\]`]/g, ' ');
  code = code.replace(/\s+/g, ' ').trim();

  // Step 9: Count words (sequences of 2+ letters/hyphens/apostrophes)
  const words = code.match(/[a-zA-ZÀ-ÿ][\w'-]{1,}/g) || [];
  return words.length;
}

// ---------------------------------------------------------------------------
// 4. Count images for an essay
// ---------------------------------------------------------------------------

function countImages(essayDir, clientFile) {
  // Check for images.ts in essay dir or client file's directory
  const searchDirs = [essayDir];
  if (clientFile) {
    const clientDir = path.dirname(clientFile);
    if (clientDir !== essayDir) searchDirs.push(clientDir);
  }

  for (const dir of searchDirs) {
    const imagesFile = path.join(dir, 'images.ts');
    if (fs.existsSync(imagesFile)) {
      const src = fs.readFileSync(imagesFile, 'utf-8');
      const matches = src.match(/^\s+\w+:\s*["'`]https?:\/\//gm);
      if (matches) return matches.length;
    }
  }

  // Fallback: count image references in client component
  if (!clientFile) return 0;
  const src = fs.readFileSync(clientFile, 'utf-8');

  let count = 0;

  // Count R2-hosted images
  count += (src.match(/https:\/\/images\.esy\.com\//g) || []).length;

  // Count <img tags
  count += (src.match(/<img\s/gi) || []).length;

  // Count Wikimedia/external image URLs not already counted
  count += (src.match(/https:\/\/upload\.wikimedia\.org\/[^"'\s]+\.(jpg|jpeg|png|webp|svg)/gi) || []).length;

  // Deduplicate rough estimate (some URLs appear in both src and data)
  return Math.max(1, Math.ceil(count * 0.7));
}

// ---------------------------------------------------------------------------
// 5. Extract visualizationCount from ESSAY_META
// ---------------------------------------------------------------------------

function getVizCount(essayDir, clientFile) {
  const pagePath = path.join(essayDir, 'page.tsx');
  const metaPath = path.join(essayDir, 'meta.ts');

  // Also check the client file's directory (for canonical pointer pages)
  const extraPaths = [];
  if (clientFile) {
    const clientDir = path.dirname(clientFile);
    if (clientDir !== essayDir) {
      extraPaths.push(path.join(clientDir, 'meta.ts'));
      extraPaths.push(path.join(clientDir, 'page.tsx'));
    }
  }

  for (const fp of [pagePath, metaPath, ...extraPaths]) {
    if (!fs.existsSync(fp)) continue;
    const src = fs.readFileSync(fp, 'utf-8');
    const match = src.match(/visualizationCount\s*:\s*(\d+)/);
    if (match) return parseInt(match[1], 10);
  }

  // Try looking in client file for visualization components (heuristic)
  const resolvedClient = clientFile || findClientFile(essayDir);
  if (resolvedClient) {
    const src = fs.readFileSync(resolvedClient, 'utf-8');
    let vizHints = 0;
    // Count D3/Recharts/Three.js component usage
    vizHints += (src.match(/<(BarChart|LineChart|AreaChart|PieChart|ScatterChart|RadarChart|ResponsiveContainer|Recharts)/g) || []).length;
    vizHints += (src.match(/d3\.(select|scaleLinear|scaleBand|geoPath|geoMercator)/g) || []).length;
    vizHints += (src.match(/<Canvas|<mesh|useFrame|OrbitControls/g) || []).length;
    if (vizHints > 0) return vizHints;
  }

  return 0;
}

// ---------------------------------------------------------------------------
// 6. Build href from essay directory path
// ---------------------------------------------------------------------------

function dirToHref(essayDir) {
  const rel = path.relative(path.join(ROOT, 'src/app'), essayDir);
  return '/' + rel;
}

// ---------------------------------------------------------------------------
// 7. Parse visualEssays.ts to extract current readTime values
// ---------------------------------------------------------------------------

function parseCurrentReadTimes() {
  const src = fs.readFileSync(VE_PATH, 'utf-8');
  const entries = {};
  const lines = src.split('\n');

  let currentReadTime = null;
  for (const line of lines) {
    const rtMatch = line.match(/readTime:\s*["']([^"']+)["']/);
    if (rtMatch) currentReadTime = rtMatch[1];

    const hrefMatch = line.match(/href:\s*["']([^"']+)["']/);
    if (hrefMatch && currentReadTime) {
      entries[hrefMatch[1]] = currentReadTime;
      currentReadTime = null;
    }
  }
  return { entries, source: src };
}

// ---------------------------------------------------------------------------
// 8. Update visualEssays.ts with computed values
// ---------------------------------------------------------------------------

function updateVisualEssays(updates) {
  const src = fs.readFileSync(VE_PATH, 'utf-8');
  const lines = src.split('\n');
  let changed = 0;

  // Build a lookup: href -> newReadTime
  const lookup = new Map();
  for (const { href, oldReadTime, newReadTime } of updates) {
    if (oldReadTime !== newReadTime) lookup.set(href, newReadTime);
  }

  // Walk lines: when we see readTime, note its line index; when we see href,
  // check if that href needs updating, and if so patch the readTime line.
  let readTimeLineIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    const rtMatch = lines[i].match(/^(\s*readTime:\s*["'])([^"']+)(["'].*)$/);
    if (rtMatch) {
      readTimeLineIdx = i;
    }

    const hrefMatch = lines[i].match(/href:\s*["']([^"']+)["']/);
    if (hrefMatch && readTimeLineIdx >= 0) {
      const newRT = lookup.get(hrefMatch[1]);
      if (newRT) {
        const rtLine = lines[readTimeLineIdx].match(/^(\s*readTime:\s*["'])([^"']+)(["'].*)$/);
        if (rtLine) {
          lines[readTimeLineIdx] = rtLine[1] + newRT + rtLine[3];
          changed++;
        }
      }
      readTimeLineIdx = -1;
    }
  }

  if (changed > 0) {
    fs.writeFileSync(VE_PATH, lines.join('\n'), 'utf-8');
  }
  return changed;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const doUpdate = args.includes('--update');
const doJson = args.includes('--json');

const essayDirs = findEssayDirs(ESSAYS_DIR);
const { entries: currentReadTimes } = parseCurrentReadTimes();

const results = [];
let totalOld = 0;
let totalNew = 0;

for (const dir of essayDirs) {
  const clientFile = findClientFile(dir);
  if (!clientFile) continue;

  const href = dirToHref(dir);
  const wordCount = extractWordCount(clientFile);
  const imageCount = countImages(dir, clientFile);
  const vizCount = getVizCount(dir, clientFile);
  const computed = computeReadTime(wordCount, imageCount, vizCount);
  const newReadTime = `${computed} min`;
  const oldReadTime = currentReadTimes[href] || null;

  const oldMinutes = oldReadTime ? parseInt(oldReadTime, 10) : null;
  const delta = oldMinutes !== null ? computed - oldMinutes : null;

  results.push({ href, wordCount, imageCount, vizCount, computed, newReadTime, oldReadTime, delta });

  if (oldMinutes !== null) {
    totalOld += oldMinutes;
    totalNew += computed;
  }
}

// Sort by absolute delta (biggest discrepancies first)
results.sort((a, b) => Math.abs(b.delta || 0) - Math.abs(a.delta || 0));

if (doJson) {
  console.log(JSON.stringify(results, null, 2));
} else {
  console.log('\n📊 Computed Read Times Report');
  console.log('='.repeat(100));
  console.log(
    'href'.padEnd(55) +
    'words'.padStart(7) +
    'imgs'.padStart(6) +
    'viz'.padStart(5) +
    'old'.padStart(8) +
    'new'.padStart(8) +
    'delta'.padStart(8)
  );
  console.log('-'.repeat(100));

  for (const r of results) {
    const deltaStr = r.delta !== null
      ? (r.delta > 0 ? `+${r.delta}` : `${r.delta}`)
      : 'N/A';
    console.log(
      r.href.padEnd(55) +
      String(r.wordCount).padStart(7) +
      String(r.imageCount).padStart(6) +
      String(r.vizCount).padStart(5) +
      (r.oldReadTime || 'N/A').padStart(8) +
      r.newReadTime.padStart(8) +
      deltaStr.padStart(8)
    );
  }

  console.log('-'.repeat(100));
  console.log(`Essays analyzed: ${results.length}`);
  console.log(`Essays in visualEssays.ts: ${Object.keys(currentReadTimes).length}`);
  console.log(`Total old minutes: ${totalOld}`);
  console.log(`Total new minutes: ${totalNew}`);
  console.log(`Net change: ${totalNew - totalOld} min`);

  if (!doUpdate) {
    console.log('\nDry run. Pass --update to write changes to visualEssays.ts');
  }
}

if (doUpdate) {
  const updates = results
    .filter(r => r.oldReadTime)
    .map(r => ({ href: r.href, oldReadTime: r.oldReadTime, newReadTime: r.newReadTime }));
  const changed = updateVisualEssays(updates);
  console.log(`\n✅ Updated ${changed} readTime values in visualEssays.ts`);
}
