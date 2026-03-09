/**
 * r2-upload-infographic.mjs
 *
 * Uploads an infographic to R2 and auto-registers it in src/data/infographics.ts.
 *
 * Usage:
 *   node scripts/r2-upload-infographic.mjs \
 *     --file=public/infographics/staging/skulls-and-brains.png \
 *     --slug=skulls-and-brains \
 *     --title="How Our Brains Grew Over 7 Million Years" \
 *     --description="Cranial capacity across 8 hominid species..." \
 *     --cluster=hominids \
 *     --category=Science
 *
 * Optional:
 *   --no-register   Skip auto-registration in infographics.ts
 *   --no-thumb      Skip thumbnail generation
 *   --no-webp       Keep original format
 *   --dry           Print plan without uploading
 */

import { createHash } from "crypto";
import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import mime from "mime-types";
import sharp from "sharp";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Load .env.local
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

// ---- CLI Parsing ----
const args = Object.fromEntries(
  process.argv
    .slice(2)
    .map((a) => {
      const eqIdx = a.indexOf("=");
      if (eqIdx === -1) return [a.replace(/^--/, ""), true];
      return [a.slice(0, eqIdx).replace(/^--/, ""), a.slice(eqIdx + 1)];
    })
);

const filePath = args.file;
const slug = slugify(String(args.slug || ""));
const title = String(args.title || "");
const description = String(args.description || "");
const cluster = String(args.cluster || "");
const category = String(args.category || "Science");
const dryRun = args.dry === true;
const noWebp = args["no-webp"] === true;
const noThumb = args["no-thumb"] === true;
const noRegister = args["no-register"] === true;

if (!filePath || !slug) {
  console.error(
    `Missing required args.

Usage:
  node scripts/r2-upload-infographic.mjs \\
    --file=public/infographics/staging/my-infographic.png \\
    --slug=my-infographic \\
    --title="My Infographic Title" \\
    --description="Short description for SEO" \\
    --cluster=my-cluster \\
    --category=Science

Optional flags:
  --no-register   Skip auto-registration in infographics.ts
  --no-thumb      Skip thumbnail generation
  --no-webp       Keep original format (skip WebP conversion)
  --dry           Print upload plan without uploading`
  );
  process.exit(1);
}

if (!existsSync(filePath)) {
  console.error(`\nFile not found: ${filePath}`);
  process.exit(1);
}

// ---- Image Processing ----
const originalExt = path.extname(filePath).toLowerCase();
const skipConversion = [".svg", ".gif"].includes(originalExt);
const convertToWebp = !noWebp && !skipConversion;

let buf = readFileSync(filePath);
const originalSize = buf.length;
const meta = skipConversion ? null : await sharp(buf).metadata();
const imgWidth = meta?.width || 0;
const imgHeight = meta?.height || 0;

let ext = originalExt;
let contentType = mime.lookup(ext) || "application/octet-stream";

if (convertToWebp) {
  buf = await sharp(buf).webp({ quality: 90, effort: 6 }).toBuffer();
  ext = ".webp";
  contentType = "image/webp";
  const savings = ((1 - buf.length / originalSize) * 100).toFixed(0);
  console.log(
    `\nWebP: ${(originalSize / 1024).toFixed(0)}KB -> ${(buf.length / 1024).toFixed(0)}KB (${savings}% smaller)`
  );
}

const hash = hashBytes(buf, 10);
const key = `infographics/${slug}/${slug}.${hash}${ext}`;
const publicUrl = `https://images.esy.com/${key}`;

// ---- Thumbnail ----
let thumbUrl = "";
if (!noThumb && !skipConversion) {
  const thumbBuf = await sharp(readFileSync(filePath))
    .resize(400, null, { fit: "inside" })
    .webp({ quality: 80, effort: 6 })
    .toBuffer();
  const thumbHash = hashBytes(thumbBuf, 10);
  const thumbKey = `infographics/${slug}/${slug}-thumb.${thumbHash}.webp`;
  thumbUrl = `https://images.esy.com/${thumbKey}`;

  if (!dryRun) {
    const client = getS3Client();
    await client.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: thumbKey,
        Body: thumbBuf,
        ContentType: "image/webp",
        CacheControl: "public, max-age=31536000, immutable",
        Metadata: {
          "source-url": "local-upload",
          "infographic-slug": slug,
          "type": "thumbnail",
          "uploaded-at": new Date().toISOString(),
        },
      })
    );
    console.log(`Thumbnail uploaded: ${thumbUrl}`);
  }
}

// ---- Upload Plan ----
console.log("\n=== Infographic Upload Plan ===");
console.log("File:        ", filePath);
if (meta) {
  console.log(
    "Dimensions:  ",
    `${imgWidth}x${imgHeight}`
  );
}
console.log("Slug:        ", slug);
console.log("Format:      ", ext.replace(".", "").toUpperCase());
console.log("Size:        ", `${(buf.length / 1024).toFixed(0)}KB`);
console.log("Key:         ", key);
console.log("URL:         ", publicUrl);
if (thumbUrl) {
  console.log("Thumbnail:   ", thumbUrl);
}

if (dryRun) {
  console.log("\n(dry run) Not uploading.");
  process.exit(0);
}

// ---- S3 Client ----
function getS3Client() {
  if (
    !process.env.R2_BUCKET ||
    !process.env.R2_ENDPOINT ||
    !process.env.R2_ACCESS_KEY_ID ||
    !process.env.R2_SECRET_ACCESS_KEY
  ) {
    console.error(
      "\nMissing R2 env vars. Set: R2_BUCKET, R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY in .env.local"
    );
    process.exit(1);
  }
  return new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });
}

// ---- Upload ----
const client = getS3Client();
await client.send(
  new PutObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: key,
    Body: buf,
    ContentType: contentType,
    CacheControl: "public, max-age=31536000, immutable",
    Metadata: {
      "source-url": "local-upload",
      "infographic-slug": slug,
      "original-filename": path.basename(filePath),
      "uploaded-at": new Date().toISOString(),
    },
  })
);
console.log(`\nUploaded: ${publicUrl}`);

// ---- Auto-Register in infographics.ts ----
if (!noRegister && title) {
  const registryPath = path.join(
    process.cwd(),
    "src/data/infographics.ts"
  );

  if (!existsSync(registryPath)) {
    console.log("\nSkipping registration: infographics.ts not found");
  } else {
    const content = readFileSync(registryPath, "utf-8");

    if (content.includes(`id: '${slug}'`)) {
      console.log(`\nRegistry: '${slug}' already exists, skipping.`);
    } else {
      const today = new Date().toISOString().split("T")[0];

      const entry = `  {
    id: '${slug}',
    title: '${title.replace(/'/g, "\\'")}',
    description: '${description.replace(/'/g, "\\'")}',
    cluster: '${cluster}',
    category: '${category}' as InfographicCategory,
    imageSrc: '${publicUrl}',${thumbUrl ? `\n    thumbnailSrc: '${thumbUrl}',` : ""}
    imageAlt: '',
    width: ${imgWidth},
    height: ${imgHeight},
    keywords: [],
    publishedDate: '${today}',
  },`;

      const insertMarker = "const infographics: Infographic[] = [";
      if (content.includes(insertMarker)) {
        const updated = content.replace(
          insertMarker,
          `${insertMarker}\n${entry}`
        );
        writeFileSync(registryPath, updated, "utf-8");
        console.log(`\nRegistered '${slug}' in infographics.ts`);
        console.log(
          "NOTE: Fill in imageAlt, dataPoints, sources, and relatedEssays manually."
        );
      } else {
        console.log(
          "\nCould not find insertion point in infographics.ts. Register manually."
        );
      }
    }
  }
} else if (!title) {
  console.log(
    "\nSkipping registration: --title not provided. Use --title to auto-register."
  );
}

console.log("\nDone.");
