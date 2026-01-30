import { createHash } from "crypto";
import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

/**
 * r2-migrate-nested-src-objects.mjs
 * 
 * Specialized script for migrating images.ts files with nested object structures.
 * Finds all external URLs in the file, uploads them to R2 (with WebP conversion),
 * and replaces the URLs in-place.
 * 
 * Unlike r2-migrate-flat-url-map.mjs (which uses a config file), this works directly with images.ts files
 * that have nested structures like:
 *   export const heroImages = { 
 *     trinityTower: { src: "https://...", alt: "...", ... } 
 *   }
 * 
 * Usage:
 *   node scripts/r2-migrate-nested-src-objects.mjs --file=path/to/images.ts --slug=essay-slug [--dry] [--no-webp]
 * 
 * Requires env vars (unless --dry):
 *   R2_BUCKET, R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY
 */

// Auto-load .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...valueParts] = trimmed.split("=");
      const value = valueParts.join("=").replace(/^["']|["']$/g, "");
      if (key && !process.env[key]) {
        process.env[key] = value;
      }
    }
  }
}

function slugify(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function hashBytes(buf, len = 10) {
  return createHash("sha256").update(buf).digest("hex").slice(0, len);
}

// Parse args
const args = Object.fromEntries(
  process.argv
    .slice(2)
    .map((a) => a.split("="))
    .map(([k, v]) => [k.replace(/^--/, ""), v ?? true])
);

const filePath = args.file;
const essaySlug = args.slug;
const dryRun = args.dry === true || args.dry === "true";
const convertToWebP = !(args["no-webp"] === true || args["no-webp"] === "true");

if (!filePath || !essaySlug) {
  console.error("\nUsage: node scripts/r2-migrate-nested-src-objects.mjs --file=path/to/images.ts --slug=essay-slug [--dry] [--no-webp]\n");
  process.exit(1);
}

if (!existsSync(filePath)) {
  console.error(`\nFile not found: ${filePath}\n`);
  process.exit(1);
}

// Check env vars
const bucket = process.env.R2_BUCKET;
if (!dryRun && (!bucket || !process.env.R2_ENDPOINT || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY)) {
  console.error("\nMissing env vars. Set: R2_BUCKET, R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY");
  console.error("Or run with --dry to preview without uploading.\n");
  process.exit(1);
}

// R2 client
const client = dryRun ? null : new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

// User-Agent for Wikimedia
const USER_AGENT = "EsyImageMigration/1.0 (https://esy.com; contact@esy.com)";

// Convert Wikimedia thumbnail URLs to full-resolution URLs
// Thumbnails are rate-limited more heavily; full-res are more reliable
// Example: .../thumb/6/6c/File.jpg/800px-File.jpg -> .../6/6c/File.jpg
function convertToFullResolution(url) {
  const thumbMatch = url.match(/\/thumb\/([a-f0-9])\/([a-f0-9]{2})\/([^/]+)\/\d+px-[^/]+$/i);
  if (thumbMatch) {
    const [, a, ab, filename] = thumbMatch;
    return `https://upload.wikimedia.org/wikipedia/commons/${a}/${ab}/${filename}`;
  }
  // Also handle /wikipedia/en/ thumbnails
  const enThumbMatch = url.match(/\/wikipedia\/en\/thumb\/([a-f0-9])\/([a-f0-9]{2})\/([^/]+)\/\d+px-[^/]+$/i);
  if (enThumbMatch) {
    const [, a, ab, filename] = enThumbMatch;
    return `https://upload.wikimedia.org/wikipedia/en/${a}/${ab}/${filename}`;
  }
  return url;
}

async function fetchWithRetry(url, maxRetries = 5) {
  // Try full-res URL first if it's a thumbnail
  const fullResUrl = convertToFullResolution(url);
  const urlToFetch = fullResUrl !== url ? fullResUrl : url;
  
  if (fullResUrl !== url) {
    console.log(`   📐 Using full-res: ${path.basename(fullResUrl)}`);
  }
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const response = await fetch(urlToFetch, {
      headers: { "User-Agent": USER_AGENT },
    });
    
    if (response.ok) return response;
    
    if (response.status === 429 && attempt < maxRetries) {
      const delay = Math.pow(2, attempt) * 2000;
      console.log(`   ⏳ Rate limited, waiting ${delay/1000}s (attempt ${attempt}/${maxRetries})...`);
      await new Promise(r => setTimeout(r, delay));
      continue;
    }
    
    throw new Error(`HTTP ${response.status}`);
  }
}

// Read file content
let content = readFileSync(filePath, "utf-8");

// Find all external image URLs (Wikimedia, atomicarchive, etc.)
// Match: src: "https://..." patterns
const urlPattern = /src:\s*["']((https?:\/\/(?:upload\.wikimedia\.org|www\.atomicarchive\.com|commons\.wikimedia\.org)[^"']+))["']/g;

const matches = [...content.matchAll(urlPattern)];
const urls = [...new Set(matches.map(m => m[1]))]; // Dedupe

console.log("\n=== images.ts Migration ===\n");
console.log(`File:   ${filePath}`);
console.log(`Slug:   ${essaySlug}`);
console.log(`URLs:   ${urls.length} external images found`);
console.log(`Format: ${convertToWebP ? "WebP (optimized)" : "Original"}`);
console.log(`Mode:   ${dryRun ? "DRY RUN" : "UPLOADING"}\n`);

// Skip local images (starting with /)
const externalUrls = urls.filter(u => u.startsWith("http"));
console.log(`External URLs to migrate: ${externalUrls.length}\n`);

const urlMap = {}; // sourceUrl -> r2Url
let uploaded = 0;
let failed = 0;

for (const sourceUrl of externalUrls) {
  try {
    // Extract filename from URL
    const urlPath = new URL(sourceUrl).pathname;
    const originalFilename = path.basename(urlPath);
    const originalExt = path.extname(originalFilename).toLowerCase() || ".jpg";
    const baseName = slugify(path.parse(originalFilename).name);
    
    // Fetch image
    const response = await fetchWithRetry(sourceUrl);
    let buf = Buffer.from(await response.arrayBuffer());
    
    // Delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 1500));
    
    // Convert to WebP and resize (unless disabled or SVG/GIF)
    // Max width of 1600px is good for web - sharp enough for retina but not huge
    let finalExt = originalExt;
    let contentType = "image/jpeg";
    
    if (convertToWebP && ![".svg", ".gif"].includes(originalExt)) {
      buf = await sharp(buf)
        .resize({ width: 1600, withoutEnlargement: true }) // Don't upscale small images
        .webp({ quality: 85, effort: 6 })
        .toBuffer();
      finalExt = ".webp";
      contentType = "image/webp";
    } else if (![".svg"].includes(originalExt)) {
      // Still resize non-WebP images
      buf = await sharp(buf)
        .resize({ width: 1600, withoutEnlargement: true })
        .toBuffer();
      contentType = originalExt === ".png" ? "image/png" : 
                    originalExt === ".gif" ? "image/gif" : "image/jpeg";
    } else {
      contentType = "image/svg+xml";
    }
    
    // Hash and build key
    const hash = hashBytes(buf, 10);
    const r2Key = `essays/${essaySlug}/${baseName}.${hash}${finalExt}`;
    const publicUrl = `https://images.esy.com/${r2Key}`;
    
    urlMap[sourceUrl] = publicUrl;
    
    if (dryRun) {
      console.log(`[DRY] ${baseName}${finalExt}`);
      console.log(`      ${sourceUrl.substring(0, 60)}...`);
      console.log(`   -> ${publicUrl}\n`);
    } else {
      await client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: r2Key,
          Body: buf,
          ContentType: contentType,
          CacheControl: "public, max-age=31536000, immutable",
          Metadata: {
            "source-url": sourceUrl,
            "essay-slug": essaySlug,
            "original-filename": originalFilename,
            "migrated-at": new Date().toISOString(),
          },
        })
      );
      console.log(`✅ ${baseName}${finalExt}`);
      console.log(`   -> ${publicUrl}`);
    }
    uploaded++;
  } catch (err) {
    console.error(`❌ ${sourceUrl.substring(0, 60)}...`);
    console.error(`   Error: ${err.message}\n`);
    failed++;
  }
}

console.log(`\n=== ${dryRun ? "Preview" : "Uploaded"}: ${uploaded} images, ${failed} failed ===\n`);

// Replace URLs in content
if (!dryRun && failed === 0) {
  for (const [sourceUrl, r2Url] of Object.entries(urlMap)) {
    content = content.split(sourceUrl).join(r2Url);
  }
  writeFileSync(filePath, content);
  console.log(`✅ Updated: ${filePath}`);
} else if (!dryRun && failed > 0) {
  console.log("⚠️  Skipping file update due to failed uploads.\n");
  console.log("URL mapping for successful uploads:");
  for (const [sourceUrl, r2Url] of Object.entries(urlMap)) {
    console.log(`  ${sourceUrl.substring(0, 50)}... -> ${r2Url}`);
  }
} else if (dryRun) {
  console.log("URL mapping preview:");
  for (const [sourceUrl, r2Url] of Object.entries(urlMap)) {
    console.log(`  ${sourceUrl.substring(0, 50)}... -> ${r2Url}`);
  }
}

console.log("\nDone!\n");
