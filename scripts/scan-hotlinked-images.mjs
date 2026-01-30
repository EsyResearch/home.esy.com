import { readdirSync, readFileSync, writeFileSync, statSync } from "fs";
import path from "path";

/**
 * scan-hotlinked-images.mjs
 * 
 * Scans all essays for hotlinked external images and generates migration config files.
 * Run this to identify which essays need image migration to R2.
 * 
 * What it does:
 *   1. Recursively scans src/app/essays/ for TSX/TS files
 *   2. Extracts external image URLs (Wikimedia, etc.)
 *   3. Generates images-migration.json for each essay with hotlinks
 *   4. Outputs a summary of all essays needing migration
 * 
 * Usage:
 *   node scripts/scan-hotlinked-images.mjs [--write]  # --write to create config files
 * 
 * Then migrate with:
 *   node scripts/r2-migrate-flat-url-map.mjs --config=path/to/images-migration.json
 */

const ESSAYS_ROOT = "src/app/essays";

// Only match URLs that end with actual image extensions
// This avoids matching Wikipedia article links, reference URLs, etc.
const IMAGE_EXTENSIONS = /\.(?:jpg|jpeg|png|gif|webp|svg|avif|bmp|tiff|tif|ico|heic|heif)(?:\?[^"'\s`]*)?$/i;

// Pattern to find any external URL, then filter by extension
const URL_PATTERN = /https?:\/\/[^"'\s`<>]+/g;

// URLs to ignore (already self-hosted or intentionally external)
const IGNORE_PATTERNS = [
  /^https?:\/\/images\.esy\.com/,
  /^https?:\/\/esy\.com/,
  /^https?:\/\/localhost/,
  /placeholder/i,
  
  // IMPORTANT: Wikimedia Commons FILE PAGES vs DIRECT IMAGE URLs
  // These look like image URLs because they end in .jpg/.png but they're HTML pages:
  //   ❌ https://commons.wikimedia.org/wiki/File:Example.jpg  (wiki page - won't download)
  //   ✅ https://upload.wikimedia.org/wikipedia/commons/a/ab/Example.jpg  (actual image)
  // The wiki/File: URLs return HTML, not image data. Always use upload.wikimedia.org for actual images.
  /^https?:\/\/commons\.wikimedia\.org\/wiki\/File:/,
];

function slugify(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getEssaySlug(essayPath) {
  // Extract slug from path like src/app/essays/history/the-complete-history-of-soda
  const parts = essayPath.split(path.sep);
  return parts[parts.length - 1];
}

function extractFilename(url) {
  const filename = path.basename(url).split("?")[0];
  // Clean up encoded characters
  return decodeURIComponent(filename)
    .replace(/[^a-zA-Z0-9.-]/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

/**
 * Parse existing IMAGES constant from file content to extract key → URL mappings.
 * This preserves the original key names from the visual essay production pipeline.
 */
function parseImagesConstant(content) {
  const keyUrlMap = new Map();
  
  // Match IMAGES constant patterns:
  // const IMAGES = { ... } or export const IMAGES = { ... }
  const imagesMatch = content.match(/(?:export\s+)?const\s+IMAGES\s*=\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/s);
  
  if (!imagesMatch) {
    return keyUrlMap;
  }
  
  const imagesBlock = imagesMatch[1];
  
  // Match key: "url" or key: `url` patterns
  // Handles: keyName: "https://...", or keyName: `${BASE}/file.jpg`,
  const entryPattern = /(\w+)\s*:\s*["'`]([^"'`]+)["'`]/g;
  
  let match;
  while ((match = entryPattern.exec(imagesBlock)) !== null) {
    const [, key, url] = match;
    // Only include if URL looks like an external image URL
    if (url.startsWith("http") && IMAGE_EXTENSIONS.test(url)) {
      keyUrlMap.set(url, key);
    }
  }
  
  // Also handle template literal URLs like `${CLOUDINARY_BASE}/filename.jpg`
  // These won't be hotlinked, so we skip them
  
  return keyUrlMap;
}

function findExternalUrls(content) {
  const urls = new Set();
  
  const matches = content.match(URL_PATTERN) || [];
  for (const match of matches) {
    // Clean up the URL - remove trailing punctuation
    let url = match.replace(/[,;)\]}>'"` ]+$/, "");
    
    // Skip if not an image extension
    if (!IMAGE_EXTENSIONS.test(url)) {
      continue;
    }
    
    // Skip if matches ignore patterns (already self-hosted)
    if (IGNORE_PATTERNS.some(p => p.test(url))) {
      continue;
    }
    
    urls.add(url);
  }
  
  return Array.from(urls);
}

function scanDirectory(dir) {
  const results = [];
  
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Skip node_modules, .git, etc.
        if (entry.name.startsWith(".") || entry.name === "node_modules") {
          continue;
        }
        results.push(...scanDirectory(fullPath));
      } else if (entry.isFile() && /\.(tsx?|jsx?)$/.test(entry.name)) {
        results.push(fullPath);
      }
    }
  } catch (err) {
    console.error(`Error scanning ${dir}: ${err.message}`);
  }
  
  return results;
}

function findEssayDirectories(root) {
  const essays = [];
  
  function scan(dir, depth = 0) {
    try {
      const entries = readdirSync(dir, { withFileTypes: true });
      
      // Check if this directory contains a page.tsx (is an essay)
      const hasPage = entries.some(e => e.name === "page.tsx" || e.name === "page.js");
      
      if (hasPage && depth > 0) {
        essays.push(dir);
      }
      
      // Continue scanning subdirectories
      for (const entry of entries) {
        if (entry.isDirectory() && !entry.name.startsWith(".")) {
          scan(path.join(dir, entry.name), depth + 1);
        }
      }
    } catch (err) {
      // Ignore errors
    }
  }
  
  scan(root);
  return essays;
}

// Parse args
const writeConfigs = process.argv.includes("--write");

console.log("\n=== Hotlinked Image Scanner ===\n");
console.log(`Scanning: ${ESSAYS_ROOT}`);
console.log(`Mode: ${writeConfigs ? "WRITE CONFIGS" : "SCAN ONLY (use --write to create config files)"}\n`);

const essayDirs = findEssayDirectories(ESSAYS_ROOT);
console.log(`Found ${essayDirs.length} essay directories\n`);

const summary = [];
let totalImages = 0;

for (const essayDir of essayDirs) {
  const essaySlug = getEssaySlug(essayDir);
  const files = scanDirectory(essayDir);
  
  const allUrls = new Set();
  const existingKeys = new Map(); // URL → key from IMAGES constant
  
  for (const file of files) {
    const content = readFileSync(file, "utf-8");
    const urls = findExternalUrls(content);
    urls.forEach(url => allUrls.add(url));
    
    // Parse existing IMAGES constant to get original key names
    const parsedKeys = parseImagesConstant(content);
    parsedKeys.forEach((key, url) => existingKeys.set(url, key));
  }
  
  if (allUrls.size > 0) {
    const urlList = Array.from(allUrls);
    let fallbackIndex = 0;
    
    // Generate config with existing keys or fallback
    const config = {
      essaySlug,
      images: urlList.map((url) => {
        // Prefer existing key from IMAGES constant
        let key = existingKeys.get(url);
        
        if (!key) {
          // Fallback: generate from URL filename (rare case)
          const filename = path.basename(url).split("?")[0];
          const nameWithoutExt = path.parse(filename).name;
          const slugified = slugify(nameWithoutExt);
          
          if (!slugified || slugified.length < 3) {
            key = `image${++fallbackIndex}`;
          } else {
            key = slugified
              .split("-")
              .map((part, i) => i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1))
              .join("");
          }
        }
        
        return {
          key,
          filename: extractFilename(url),
          sourceUrl: url,
        };
      }),
    };
    
    summary.push({
      essaySlug,
      path: essayDir,
      imageCount: urlList.length,
      urls: urlList,
    });
    
    totalImages += urlList.length;
    
    console.log(`📁 ${essaySlug}: ${urlList.length} hotlinked images`);
    
    if (writeConfigs) {
      const configPath = path.join(essayDir, "images-migration.json");
      writeFileSync(configPath, JSON.stringify(config, null, 2));
      console.log(`   ✅ Created: ${configPath}`);
    }
  }
}

console.log("\n=== Summary ===\n");
console.log(`Essays with hotlinked images: ${summary.length}`);
console.log(`Total hotlinked images: ${totalImages}`);

if (summary.length > 0 && !writeConfigs) {
  console.log("\nRun with --write to generate config files:");
  console.log("  node scripts/scan-hotlinked-images.mjs --write\n");
  
  console.log("Then migrate each essay:");
  console.log("  node scripts/r2-migrate-flat-url-map.mjs --config=<path>/images-migration.json\n");
  
  console.log("Or batch migrate all:");
  console.log('  for f in $(find src/app/essays -name "images-migration.json"); do');
  console.log('    node scripts/r2-migrate-flat-url-map.mjs --config="$f"');
  console.log("  done\n");
}

if (writeConfigs && summary.length > 0) {
  console.log("\n✅ Config files created. Next steps:");
  console.log("\n1. Review the generated images-migration.json files");
  console.log("2. Fix any key names that need manual adjustment");
  console.log("3. Run the migration:\n");
  console.log('   for f in $(find src/app/essays -name "images-migration.json"); do');
  console.log('     node scripts/r2-migrate-flat-url-map.mjs --config="$f" --dry');
  console.log("   done\n");
}

// Output detailed list
if (summary.length > 0) {
  console.log("\n=== Detailed List ===\n");
  for (const { essaySlug, path: essayPath, imageCount, urls } of summary) {
    console.log(`\n${essaySlug} (${imageCount} images)`);
    console.log(`  Path: ${essayPath}`);
    for (const url of urls.slice(0, 5)) {
      console.log(`  - ${url.substring(0, 80)}${url.length > 80 ? "..." : ""}`);
    }
    if (urls.length > 5) {
      console.log(`  ... and ${urls.length - 5} more`);
    }
  }
}

console.log("");
