#!/usr/bin/env node
/**
 * Upload a non-image asset (GLB, JSON, etc.) to R2.
 * Usage: node scripts/r2-upload-asset.mjs --file=./model.glb --essay=turkana-boy --name=mandible [--dry]
 */

import { createHash } from "crypto";
import { readFileSync, existsSync } from "fs";
import path from "path";
import mime from "mime-types";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const envPath = path.resolve(process.cwd(), ".env.local");
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...valueParts] = trimmed.split("=");
      const value = valueParts.join("=").replace(/^["']|["']$/g, "");
      if (key && !process.env[key]) process.env[key] = value;
    }
  }
}

function slugify(s) {
  return s.toLowerCase().trim().replace(/['"]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

function hashBytes(buf, len = 10) {
  return createHash("sha256").update(buf).digest("hex").slice(0, len);
}

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => a.split("=")).map(([k, v]) => [k.replace(/^--/, ""), v ?? true])
);

const filePath = args.file;
const essaySlug = slugify(String(args.essay || ""));
const baseName = slugify(String(args.name || path.parse(filePath).name));
const dryRun = args.dry === true || args.dry === "true";

if (!filePath || !essaySlug) {
  console.error("Usage: node scripts/r2-upload-asset.mjs --file=./model.glb --essay=turkana-boy --name=mandible");
  process.exit(1);
}

if (!existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

const buf = readFileSync(filePath);
const ext = path.extname(filePath).toLowerCase();
const contentType = mime.lookup(ext) || "application/octet-stream";
const hash = hashBytes(buf, 10);
const key = `essays/${essaySlug}/${baseName}.${hash}${ext}`;
const publicUrl = `https://images.esy.com/${key}`;

console.log("\n=== R2 Asset Upload ===");
console.log("File:   ", filePath);
console.log("Size:   ", `${(buf.length / 1024).toFixed(0)} KB`);
console.log("Type:   ", contentType);
console.log("Key:    ", key);
console.log("URL:    ", publicUrl);

if (dryRun) {
  console.log("\n(dry run)");
  process.exit(0);
}

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
  console.error("Missing env vars: R2_BUCKET, R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY");
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

console.log("\nUploaded:", publicUrl);
