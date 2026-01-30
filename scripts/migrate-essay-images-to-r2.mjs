import { createHash } from "crypto";
import { readFileSync, writeFileSync, existsSync, readdirSync } from "fs";
import path from "path";
import mime from "mime-types";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

// Auto-load .env.local if it exists (no dotenv dependency needed)
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

/**
 * migrate-essay-images-to-r2.mjs
 * 
 * Generic script to migrate hotlinked images from external sources (Wikimedia, etc.)
 * to Cloudflare R2 for self-hosting. Eliminates dependency on third-party image URLs
 * and ensures long-term availability.
 * 
 * What it does:
 *   1. Reads image config from a JSON file
 *   2. Fetches each image directly from its source URL
 *   3. Converts to WebP format using Sharp (smaller files, better quality)
 *   4. Computes a content hash for cache-busting filenames
 *   5. Uploads to R2 with immutable cache headers
 *   6. Outputs the new IMAGES constant with R2 URLs
 *   7. Optionally auto-updates the source file (--update)
 * 
 * Usage:
 *   node scripts/migrate-essay-images-to-r2.mjs --config=path/to/images-migration.json [--dry] [--update] [--no-webp]
 * 
 *   --dry      Preview without uploading to R2
 *   --update   Auto-update the TSX file with new IMAGES constant (requires actual upload, not dry run)
 *   --no-webp  Skip WebP conversion, keep original format
 *   --max-width=N  Maximum image width in pixels (default: 1200, good for retina)
 * 
 * Config file format (images-migration.json):
 *   {
 *     "essaySlug": "the-complete-history-of-soda",
 *     "images": [
 *       { "key": "josephPriestley", "filename": "joseph-priestley.jpg", "sourceUrl": "https://..." },
 *       ...
 *     ]
 *   }
 * 
 * Requires env vars (unless --dry):
 *   R2_BUCKET, R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY
 * 
 * Generate configs using:
 *   node scripts/scan-hotlinked-images.mjs
 */

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

function buildKey({ essaySlug, baseName, hash, ext }) {
  return `essays/${essaySlug}/${baseName}.${hash}${ext}`;
}

// Parse args
const args = Object.fromEntries(
  process.argv
    .slice(2)
    .map((a) => a.split("="))
    .map(([k, v]) => [k.replace(/^--/, ""), v ?? true])
);

const configPath = args.config;
const dryRun = args.dry === true || args.dry === "true";
const autoUpdate = args.update === true || args.update === "true";
const convertToWebP = !(args["no-webp"] === true || args["no-webp"] === "true");
const maxWidth = parseInt(args["max-width"], 10) || 1200; // Default 1200px for good retina support

if (!configPath) {
  console.error("\nUsage: node scripts/migrate-essay-images-to-r2.mjs --config=path/to/images-migration.json [--dry] [--update] [--no-webp]\n");
  process.exit(1);
}

if (autoUpdate && dryRun) {
  console.error("\n⚠️  Cannot use --update with --dry. Remove --dry to enable auto-update.\n");
  process.exit(1);
}

if (!existsSync(configPath)) {
  console.error(`\nConfig file not found: ${configPath}\n`);
  process.exit(1);
}

// Load config
const config = JSON.parse(readFileSync(configPath, "utf-8"));
const { essaySlug, images } = config;

if (!essaySlug || !images || !Array.isArray(images)) {
  console.error("\nInvalid config. Must have 'essaySlug' (string) and 'images' (array).\n");
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

console.log("\n=== R2 Image Migration ===\n");
console.log(`Config: ${configPath}`);
console.log(`Essay:  ${essaySlug}`);
console.log(`Images: ${images.length}`);
console.log(`Format: ${convertToWebP ? "WebP (optimized)" : "Original"}`);
console.log(`Resize: max ${maxWidth}px width`);
console.log(`Mode:   ${dryRun ? "DRY RUN" : "UPLOADING"}${autoUpdate ? " + AUTO-UPDATE" : ""}\n`);

const imageUrls = {};
let uploaded = 0;
let failed = 0;

// Helper: fetch with retry for rate limiting
// Wikimedia requires a User-Agent header per their API policy
const USER_AGENT = "EsyImageMigration/1.0 (https://esy.com; contact@esy.com)";

async function fetchWithRetry(url, maxRetries = 5) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const response = await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT,
      },
    });
    
    if (response.ok) {
      return response;
    }
    
    // Rate limited - wait and retry with exponential backoff
    if (response.status === 429 && attempt < maxRetries) {
      const delay = Math.pow(2, attempt) * 2000; // 4s, 8s, 16s, 32s
      console.log(`   ⏳ Rate limited, waiting ${delay/1000}s (attempt ${attempt}/${maxRetries})...`);
      await new Promise(r => setTimeout(r, delay));
      continue;
    }
    
    throw new Error(`HTTP ${response.status}`);
  }
}

// Delay between requests to avoid rate limiting (Wikimedia needs generous delays)
const DELAY_BETWEEN_REQUESTS = 1500; // ms

for (const { key, filename, sourceUrl } of images) {
  if (!key || !filename || !sourceUrl) {
    console.error(`❌ Invalid image entry: ${JSON.stringify({ key, filename, sourceUrl })}`);
    failed++;
    continue;
  }

  try {
    // Fetch image from source with retry
    const response = await fetchWithRetry(sourceUrl);
    const arrayBuffer = await response.arrayBuffer();
    let buf = Buffer.from(arrayBuffer);
    
    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, DELAY_BETWEEN_REQUESTS));

    // Determine original extension
    const originalExt = path.extname(filename).toLowerCase();
    const baseName = slugify(path.parse(filename).name);
    
    // Process image: resize and convert to WebP (unless disabled or SVG/GIF)
    let finalExt = originalExt;
    let contentType = mime.lookup(originalExt) || "application/octet-stream";
    
    if (![".svg", ".gif"].includes(originalExt)) {
      // Create Sharp instance for processing
      let sharpInstance = sharp(buf);
      
      // Get metadata to check if resize is needed
      const metadata = await sharpInstance.metadata();
      
      // Resize if width exceeds max (maintains aspect ratio)
      if (metadata.width && metadata.width > maxWidth) {
        sharpInstance = sharpInstance.resize(maxWidth, null, {
          withoutEnlargement: true,
          fit: "inside"
        });
      }
      
      // Convert to WebP with good quality settings (unless disabled)
      if (convertToWebP) {
        buf = await sharpInstance
          .webp({ quality: 85, effort: 6 })
          .toBuffer();
        finalExt = ".webp";
        contentType = "image/webp";
      } else {
        // Keep original format but apply resize
        buf = await sharpInstance.toBuffer();
      }
    }

    // Compute hash AFTER conversion (so hash reflects final content)
    const hash = hashBytes(buf, 10);
    const r2Key = buildKey({ essaySlug, baseName, hash, ext: finalExt });
    const publicUrl = `https://images.esy.com/${r2Key}`;

    imageUrls[key] = publicUrl;

    if (dryRun) {
      console.log(`[DRY] ${key}: ${publicUrl}`);
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
            "original-filename": filename,
            "migrated-at": new Date().toISOString(),
          },
        })
      );
      console.log(`✅ ${key}: ${publicUrl}`);
    }
    uploaded++;
  } catch (err) {
    console.error(`❌ ${key}: ${err.message}`);
    failed++;
  }
}

console.log(`\n=== ${dryRun ? "Preview" : "Uploaded"}: ${uploaded} images, ${failed} failed ===\n`);

if (failed > 0) {
  console.log("⚠️  Some images failed. Check the errors above.\n");
}

// Generate new IMAGES constant
const newImagesConstant = `const IMAGES = {\n${Object.entries(imageUrls)
  .map(([key, url]) => `  ${key}: "${url}",`)
  .join("\n")}\n} as const;`;

// Auto-update the source file if requested
if (autoUpdate && !dryRun && failed === 0) {
  const essayDir = path.dirname(configPath);
  
  // Find the file containing the IMAGES constant
  const files = readdirSync(essayDir).filter(f => /\.(tsx?|jsx?)$/.test(f));
  let updatedFile = null;
  
  for (const file of files) {
    const filePath = path.join(essayDir, file);
    const content = readFileSync(filePath, "utf-8");
    
    // Look for IMAGES constant pattern
    const imagesPattern = /const\s+IMAGES\s*=\s*\{[\s\S]*?\}\s*as\s+const;?/;
    
    if (imagesPattern.test(content)) {
      const newContent = content.replace(imagesPattern, newImagesConstant);
      writeFileSync(filePath, newContent);
      updatedFile = filePath;
      console.log(`✅ Auto-updated: ${filePath}`);
      break;
    }
  }
  
  if (!updatedFile) {
    console.log("⚠️  Could not find file with IMAGES constant to update.");
    console.log("   Manually copy the constant below:\n");
  }
} else if (autoUpdate && failed > 0) {
  console.log("⚠️  Skipping auto-update due to failed uploads. Fix errors first.\n");
}

// Always output the constant for reference/manual copy
console.log("// ==================== COPY BELOW ====================");
console.log(`// R2 URLs for: ${essaySlug}`);
console.log("// Replace the existing IMAGES constant in your component\n");
console.log(newImagesConstant);
console.log("\n// ==================== END COPY ====================\n");

// Clean up migration config after successful update
if (autoUpdate && !dryRun && failed === 0) {
  console.log("💡 Migration complete. You can delete the config file:");
  console.log(`   rm ${configPath}\n`);
}
