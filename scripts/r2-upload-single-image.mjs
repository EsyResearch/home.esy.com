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

function buildKey({ essaySlug, baseName, hash, ext }) {
  return `essays/${essaySlug}/${baseName}.${hash}${ext}`;
}

function cf(url, opts) {
  return `https://esy.com/cdn-cgi/image/${opts}/${url}`;
}

// ---- CLI ----
// Usage:
// node r2-upload-single-image.mjs --file ./map.png --essay why-venezuela-matters --name venezuela-orinoco-oil-belt-map --dry
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

if (!filePath || !essaySlug || !baseName) {
  console.error(
    "Missing args. Example:\nnode scripts/r2-upload-single-image.mjs --file=./map.png --essay=why-venezuela-matters --name=my-image"
  );
  process.exit(1);
}

const buf = readFileSync(filePath);
const hash = hashBytes(buf, 10);

const ext = path.extname(filePath).toLowerCase(); // keep original ext
const contentType = mime.lookup(ext) || "application/octet-stream";

const key = buildKey({ essaySlug, baseName, hash, ext });
const publicUrl = `https://images.esy.com/${key}`;

console.log("\n=== R2 Upload Plan ===");
console.log("File:", filePath);
console.log("Essay:", essaySlug);
console.log("Base:", baseName);
console.log("Hash:", hash);
console.log("Key :", key);
console.log("URL :", publicUrl);

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
