import { createHash } from "crypto";
import { readFileSync, existsSync } from "fs";
import path from "path";
import mime from "mime-types";
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

// ---- CLI ----
// Flexible R2 upload script. Supports any directory path in the bucket.
//
// Usage:
//   node scripts/r2-upload.mjs --file=./image.png --dir=brand --name=my-image
//   node scripts/r2-upload.mjs --file=./photo.jpg --dir=courses/thumbnails --name=claude-code-hero
//   node scripts/r2-upload.mjs --file=./logo.svg --dir=brand --dry
//
// Args:
//   --file   (required) Path to the local file to upload
//   --dir    (required) Target directory in the R2 bucket (e.g. "brand", "courses/thumbnails")
//   --name   (optional) Custom base name for the file; defaults to the original filename
//   --nohash (optional) Skip content hash in the filename
//   --dry    (optional) Print the upload plan without actually uploading

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .map((a) => a.split("="))
    .map(([k, v]) => [k.replace(/^--/, ""), v ?? true])
);

const filePath = args.file;
const dir = String(args.dir || "").replace(/^\/+|\/+$/g, ""); // strip leading/trailing slashes
const baseName = slugify(String(args.name || path.parse(filePath || "").name));
const dryRun = args.dry === true || args.dry === "true";
const noHash = args.nohash === true || args.nohash === "true";

if (!filePath || !dir) {
  console.error(
    `Missing args.\n\nUsage:\n  node scripts/r2-upload.mjs --file=./image.png --dir=brand --name=my-image\n\nRequired:\n  --file   Path to the local file\n  --dir    Target directory in R2 (e.g. "brand", "courses/thumbnails")\n\nOptional:\n  --name   Custom filename (defaults to original)\n  --nohash Skip content hash in filename\n  --dry    Dry run (don't upload)`
  );
  process.exit(1);
}

if (!existsSync(filePath)) {
  console.error(`\n❌ File not found: ${filePath}`);
  process.exit(1);
}

const buf = readFileSync(filePath);
const hash = hashBytes(buf, 10);
const ext = path.extname(filePath).toLowerCase();
const contentType = mime.lookup(ext) || "application/octet-stream";

const filename = noHash ? `${baseName}${ext}` : `${baseName}.${hash}${ext}`;
const key = `${dir}/${filename}`;
const publicUrl = `https://images.esy.com/${key}`;

console.log("\n=== R2 Upload Plan ===");
console.log("File:        ", filePath);
console.log("Directory:   ", dir);
console.log("Base name:   ", baseName);
console.log("Hash:        ", noHash ? "(skipped)" : hash);
console.log("Content-Type:", contentType);
console.log("Key:         ", key);
console.log("URL:         ", publicUrl);

if (dryRun) {
  console.log("\n(dry run) Not uploading.");
  process.exit(0);
}

// ---- R2 S3 client ----
const client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const bucket = process.env.R2_BUCKET;

if (!bucket || !process.env.R2_ENDPOINT || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
  console.error("\n❌ Missing env vars. Set: R2_BUCKET, R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY");
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
      "directory": dir,
      "original-filename": path.basename(filePath),
      "uploaded-at": new Date().toISOString(),
    },
  })
);

console.log("\n✅ Uploaded:", publicUrl);
