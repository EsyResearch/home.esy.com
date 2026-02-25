import { readFileSync, writeFileSync } from "fs";
import path from "path";

/**
 * register-essay.mjs
 *
 * Registers a visual essay in src/data/visualEssays.ts by extracting
 * metadata from page.tsx and images.ts. Idempotent — skips if the
 * essay slug already exists in the registry.
 *
 * Usage:
 *   node scripts/register-essay.mjs --slug homo-naledi --artifact-path src/app/essays/science/homo-naledi
 *
 * What it does:
 *   1. Reads ESSAY_META from page.tsx (title, subtitle, category, readTime)
 *   2. Reads first image URL from images.ts for heroImage
 *   3. Computes href from artifact-path (strips src/app prefix)
 *   4. Finds the highest numeric `number` in visualEssays.ts, increments
 *   5. Inserts the new entry before the closing ];
 *
 * Integrates with the orchestration runner at G9 (Publication Approval).
 */

const REGISTRY_PATH = "src/data/visualEssays.ts";

function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--") && args[i + 1] && !args[i + 1].startsWith("--")) {
      parsed[args[i].slice(2)] = args[i + 1];
      i++;
    }
  }
  return parsed;
}

function extractEssayMeta(pageTsxContent) {
  const meta = {};

  const stringFields = [
    "title", "subtitle", "category", "readTime", "published",
  ];

  for (const field of stringFields) {
    const pattern = new RegExp(`${field}:\\s*['"\`]([^'"\`]+)['"\`]`);
    const match = pageTsxContent.match(pattern);
    if (match) {
      meta[field] = match[1];
    }
  }

  const numberFields = ["visualizationCount", "sectionCount", "sourceCount"];
  for (const field of numberFields) {
    const pattern = new RegExp(`${field}:\\s*(\\d+)`);
    const match = pageTsxContent.match(pattern);
    if (match) {
      meta[field] = parseInt(match[1]);
    }
  }

  // Extract description from createVisualEssayMetadata call
  const descMatch = pageTsxContent.match(
    /createVisualEssayMetadata\(\{[\s\S]*?(?:^|\n)\s*description:\s*\n?\s*['"`]([^'"`]+)['"`]/m
  );
  if (descMatch) {
    meta.description = descMatch[1].replace(/\s+/g, " ").trim();
  }

  // Extract ogDescription as fallback
  if (!meta.description) {
    const ogDescMatch = pageTsxContent.match(
      /ogDescription:\s*\n?\s*['"`]([^'"`]+)['"`]/m
    );
    if (ogDescMatch) {
      meta.description = ogDescMatch[1].replace(/\s+/g, " ").trim();
    }
  }

  // Extract tags from keywords array
  const keywordsMatch = pageTsxContent.match(/keywords:\s*\[([\s\S]*?)\]/);
  if (keywordsMatch) {
    meta.tags = keywordsMatch[1]
      .match(/['"`]([^'"`]+)['"`]/g)
      ?.map(s => s.replace(/['"`]/g, ""))
      .filter(Boolean) || [];
  }

  return meta;
}

function extractHeroImage(artifactPath) {
  try {
    const imagesContent = readFileSync(path.join(artifactPath, "images.ts"), "utf-8");
    // Grab the first images.esy.com URL
    const match = imagesContent.match(/https:\/\/images\.esy\.com\/[^"'`\s]+/);
    return match ? match[0] : null;
  } catch {
    return null;
  }
}

function deriveHref(artifactPath) {
  // src/app/essays/science/homo-naledi -> /essays/science/homo-naledi
  return "/" + artifactPath.replace(/^src\/app\//, "");
}

function detectVisualStyle(artifactPath) {
  try {
    const imagesContent = readFileSync(path.join(artifactPath, "images.ts"), "utf-8");
    const r2Count = (imagesContent.match(/images\.esy\.com/g) || []).length;
    // Photorealistic if substantial photography (5+ images)
    return r2Count >= 5 ? "photorealistic" : "illustrated";
  } catch {
    return "illustrated";
  }
}

function findHighestNumber(registryContent) {
  const matches = registryContent.matchAll(/number:\s*"(\d+)"/g);
  let max = 0;
  for (const m of matches) {
    const n = parseInt(m[1]);
    if (n > max) max = n;
  }
  return max;
}

function slugAlreadyExists(registryContent, slug) {
  return registryContent.includes(`id: "${slug}"`);
}

function formatEntry(entry) {
  const lines = ["  {"];
  lines.push(`    id: "${entry.id}",`);
  lines.push(`    number: "${entry.number}",`);
  lines.push(`    title: "${entry.title}",`);
  lines.push(`    subtitle: "${entry.subtitle}",`);
  lines.push(`    description: "${entry.description}",`);
  lines.push(`    category: "${entry.category}",`);
  lines.push(`    readTime: "${entry.readTime}",`);
  lines.push(`    href: "${entry.href}",`);
  if (entry.heroImage) {
    lines.push(`    heroImage: "${entry.heroImage}",`);
  }
  if (entry.publishedDate) {
    lines.push(`    publishedDate: "${entry.publishedDate}",`);
  }
  if (entry.tags && entry.tags.length > 0) {
    const tagsStr = entry.tags.map(t => `"${t}"`).join(", ");
    lines.push(`    tags: [${tagsStr}],`);
  }
  if (entry.visualStyle) {
    lines.push(`    visualStyle: "${entry.visualStyle}",`);
  }
  lines.push("  },");
  return lines.join("\n");
}

function main() {
  const args = parseArgs();
  const { slug } = args;
  const artifactPath = args["artifact-path"] || `src/app/essays/${slug}`;

  if (!slug) {
    console.error("Error: --slug is required");
    console.error("Usage: node scripts/register-essay.mjs --slug <slug> --artifact-path <path>");
    process.exit(1);
  }

  // Read registry
  let registry;
  try {
    registry = readFileSync(REGISTRY_PATH, "utf-8");
  } catch (e) {
    console.error(`Error: Cannot read ${REGISTRY_PATH}: ${e.message}`);
    process.exit(1);
  }

  // Idempotence check
  if (slugAlreadyExists(registry, slug)) {
    console.log(`Already registered: "${slug}" exists in ${REGISTRY_PATH}`);
    console.log("No changes made.");
    process.exit(0);
  }

  // Read page.tsx
  let pageTsx;
  try {
    pageTsx = readFileSync(path.join(artifactPath, "page.tsx"), "utf-8");
  } catch (e) {
    console.error(`Error: Cannot read ${artifactPath}/page.tsx: ${e.message}`);
    process.exit(1);
  }

  // Extract metadata
  const meta = extractEssayMeta(pageTsx);

  if (!meta.title) {
    console.error("Error: Could not extract 'title' from ESSAY_META in page.tsx");
    process.exit(1);
  }

  // Build entry
  const highestNumber = findHighestNumber(registry);
  const nextNumber = String(highestNumber + 1).padStart(2, "0");

  const entry = {
    id: slug,
    number: nextNumber,
    title: meta.title,
    subtitle: meta.subtitle || "",
    description: meta.description || `A visual essay about ${slug.replace(/-/g, " ")}.`,
    category: meta.category || "Science",
    readTime: meta.readTime || "20 min",
    href: deriveHref(artifactPath),
    heroImage: extractHeroImage(artifactPath),
    publishedDate: new Date().toISOString().split("T")[0],
    tags: meta.tags || [],
    visualStyle: detectVisualStyle(artifactPath),
  };

  // Find the closing ]; of the visualEssays array specifically.
  // Match `= [` after `export const visualEssays` to skip the type annotation `[]`
  const arrayStart = registry.indexOf("export const visualEssays");
  if (arrayStart === -1) {
    console.error("Error: Cannot find 'export const visualEssays' in visualEssays.ts");
    process.exit(1);
  }

  const assignmentBracket = registry.indexOf("= [", arrayStart);
  if (assignmentBracket === -1) {
    console.error("Error: Cannot find '= [' for visualEssays array");
    process.exit(1);
  }
  // The actual opening bracket is the `[` in `= [`
  const openBracket = assignmentBracket + 2;

  // Track bracket depth to find the matching close
  let depth = 0;
  let closingBracket = -1;
  for (let i = openBracket; i < registry.length; i++) {
    if (registry[i] === "[") depth++;
    if (registry[i] === "]") {
      depth--;
      if (depth === 0) {
        closingBracket = i;
        break;
      }
    }
  }

  if (closingBracket === -1) {
    console.error("Error: Cannot find closing ']' for visualEssays array");
    process.exit(1);
  }

  const formatted = formatEntry(entry);
  const updated = registry.slice(0, closingBracket) + formatted + "\n" + registry.slice(closingBracket);

  writeFileSync(REGISTRY_PATH, updated);

  console.log(`Registered: "${slug}" as #${nextNumber} in ${REGISTRY_PATH}`);
  console.log("");
  console.log("Entry:");
  console.log(formatted);
  console.log("");
  console.log(`href: ${entry.href}`);
  console.log(`category: ${entry.category}`);
  console.log(`heroImage: ${entry.heroImage || "(none)"}`);
  console.log(`publishedDate: ${entry.publishedDate}`);
  console.log(`visualStyle: ${entry.visualStyle}`);
}

main();
