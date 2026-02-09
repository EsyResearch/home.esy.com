import { createHash } from "crypto";
import { readFileSync, existsSync } from "fs";
import path from "path";
import mime from "mime-types";
import sharp from "sharp";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Auto-load .env.local if it exists
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

function buildKey({ essaySlug, baseName, hash, ext }) {
  return `essays/${essaySlug}/${baseName}.${hash}${ext}`;
}

function cf(url, opts) {
  return `https://esy.com/cdn-cgi/image/${opts}/${url}`;
}

// ---- CLI ----
// Usage:
//   node scripts/r2-upload-single-image.mjs --file=./map.png --essay=why-venezuela-matters --name=my-image
//   node scripts/r2-upload-single-image.mjs --file=./screenshot.png --essay=inside-a-black-hole --name=og --og
//   node scripts/r2-upload-single-image.mjs --file=./photo.jpg --essay=my-essay --name=hero --no-webp --dry
//
// Args:
//   --file     (required) Path to the local file to upload
//   --essay    (required) Essay slug for the R2 key path
//   --name     (optional) Custom base name; defaults to original filename
//   --og       (optional) Resize to 1200×630 (OG standard) before upload
//   --no-webp  (optional) Skip WebP conversion, keep original format
//   --dry      (optional) Print upload plan without actually uploading

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .map((a) => a.split("="))
    .map(([k, v]) => [k.replace(/^--/, ""), v ?? true])
);

const filePath = args.file;
const essaySlug = slugify(String(args.essay || ""));
const baseName = slugify(String(args.name || path.parse(filePath).name));
const dryRun = args.dry === true || args.dry === "true";
const ogMode = args.og === true || args.og === "true";
const noWebp = args["no-webp"] === true || args["no-webp"] === "true";

if (!filePath || !essaySlug || !baseName) {
  console.error(
    "Missing args. Example:\n  node scripts/r2-upload-single-image.mjs --file=./map.png --essay=why-venezuela-matters --name=my-image\n\nFlags:\n  --og       Resize to 1200×630 for OG images\n  --no-webp  Skip WebP conversion\n  --dry      Dry run"
  );
  process.exit(1);
}

if (!existsSync(filePath)) {
  console.error(`\n❌ File not found: ${filePath}`);
  process.exit(1);
}

// ---- Image processing ----
const originalExt = path.extname(filePath).toLowerCase();
const skipConversion = [".svg", ".gif"].includes(originalExt);
const convertToWebp = !noWebp && !skipConversion;

let buf = readFileSync(filePath);
let ext = originalExt;
let contentType = mime.lookup(ext) || "application/octet-stream";

// Get original dimensions for logging
const originalMeta = skipConversion ? null : await sharp(buf).metadata();
const originalSize = buf.length;

// OG mode: resize to 1200×630
if (ogMode && !skipConversion) {
  buf = await sharp(buf)
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .toBuffer();
  console.log("\n📐 OG resize: 1200×630 (cover crop, centred)");
}

// Convert to WebP (default behavior, matching migration scripts)
if (convertToWebp) {
  buf = await sharp(buf)
    .webp({ quality: 85, effort: 6 })
    .toBuffer();
  ext = ".webp";
  contentType = "image/webp";
  const savings = ((1 - buf.length / originalSize) * 100).toFixed(0);
  console.log(`\n🔄 WebP conversion: ${(originalSize / 1024).toFixed(0)}KB → ${(buf.length / 1024).toFixed(0)}KB (${savings}% smaller)`);
} else if (!skipConversion && ogMode) {
  // If --no-webp but --og, still output resized original format
  buf = await sharp(buf).toBuffer();
}

const hash = hashBytes(buf, 10);
const key = buildKey({ essaySlug, baseName, hash, ext });
const publicUrl = `https://images.esy.com/${key}`;

console.log("\n=== R2 Upload Plan ===");
console.log("File:        ", filePath);
if (originalMeta) {
  console.log("Original:    ", `${originalMeta.width}×${originalMeta.height}, ${(originalSize / 1024).toFixed(0)}KB`);
}
console.log("Essay:       ", essaySlug);
console.log("Base:        ", baseName);
console.log("Format:      ", ext.replace(".", "").toUpperCase());
console.log("Size:        ", `${(buf.length / 1024).toFixed(0)}KB`);
console.log("Hash:        ", hash);
console.log("Key:         ", key);
console.log("URL:         ", publicUrl);

if (ogMode) {
  console.log("OG dims:      1200×630 ✓");
}

// Cloudflare Image Resizing URLs (requires Pro plan @ $20/mo)
// Uncomment when you upgrade to Pro:
// console.log("\n=== Cloudflare Resized URLs (paste into essay) ===");
// console.log("Hero 2000w:", cf(publicUrl, "width=2000,format=auto"));
// console.log("Inline 1200w:", cf(publicUrl, "width=1200,format=auto"));
// console.log("Thumb 480w:", cf(publicUrl, "width=480,format=auto"));
// console.log("OG 1200x630:", cf(publicUrl, "width=1200,height=630,fit=cover,format=auto"));

if (dryRun) {
  console.log("\n(dry run) Not uploading.");
  process.exit(0);
}

// ---- R2 S3 client ----
const client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT, // e.g. https://<accountid>.r2.cloudflarestorage.com
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const bucket = process.env.R2_BUCKET; // esy-images-prod

if (!bucket || !process.env.R2_ENDPOINT || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
  console.error("\nMissing env vars. Set: R2_BUCKET, R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY");
  process.exit(1);
}

await client.send(
  new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: buf,
    ContentType: contentType,
    CacheControl: "public, max-age=31536000, immutable",
    Metadata: {
      "source-url": "local-upload",
      "essay-slug": essaySlug,
      "original-filename": path.basename(filePath),
      "uploaded-at": new Date().toISOString(),
    },
  })
);

console.log("\n✅ Uploaded:", publicUrl);
