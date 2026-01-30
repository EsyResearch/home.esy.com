# Esy Scripts

Utility scripts for managing the Esy.com codebase.

## Image Migration Scripts

These scripts handle migrating hotlinked images from external sources (Wikimedia, etc.) to Cloudflare R2 for self-hosting.

### Why Self-Host Images?

- **Reliability**: External URLs can break, change, or get rate-limited
- **Performance**: R2 + Cloudflare CDN provides fast, global delivery
- **Control**: Immutable URLs with content-hash cache busting
- **Optimization**: Automatic WebP conversion reduces file sizes 25-35%

---

## Script Overview

| Script | Purpose | When to Use |
|--------|---------|-------------|
| `scan-hotlinked-images.mjs` | Find hotlinked images in essays | First step - identify what needs migration |
| `migrate-essay-images-to-r2.mjs` | Migrate images using config file | Essays with flat `IMAGES` constant |
| `migrate-images-ts-to-r2.mjs` | Migrate images.ts files directly | Essays with nested object structures |
| `upload-image-to-r2.mjs` | Upload a single local image | Manual one-off uploads |

---

## Environment Setup

Create `.env.local` with R2 credentials:

```bash
R2_BUCKET=your-bucket-name
R2_ENDPOINT=https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=your-access-key
R2_SECRET_ACCESS_KEY=your-secret-key
```

Scripts auto-load `.env.local` - no need to manually export.

---

## Workflow: Migrating Essay Images

### Step 1: Scan for Hotlinked Images

```bash
# Scan all essays and generate migration configs
node scripts/scan-hotlinked-images.mjs --write

# Scan a specific essay
node scripts/scan-hotlinked-images.mjs --essay=the-complete-history-of-soda --write
```

This creates `images-migration.json` files in each essay directory.

### Step 2: Review the Config

Check the generated config file:

```json
{
  "essaySlug": "the-complete-history-of-soda",
  "images": [
    {
      "key": "josephPriestley",
      "filename": "joseph-priestley.jpg",
      "sourceUrl": "https://upload.wikimedia.org/..."
    }
  ]
}
```

### Step 3: Run Migration

**For essays with flat `IMAGES` constant:**

```bash
# Dry run (preview without uploading)
node scripts/migrate-essay-images-to-r2.mjs \
  --config=src/app/essays/history/the-complete-history-of-soda/images-migration.json \
  --dry

# Actual migration with auto-update
node scripts/migrate-essay-images-to-r2.mjs \
  --config=src/app/essays/history/the-complete-history-of-soda/images-migration.json \
  --update
```

**For essays with nested `images.ts` structures:**

```bash
# Dry run
node scripts/migrate-images-ts-to-r2.mjs \
  --file=src/app/essays/history/the-manhattan-project/images.ts \
  --slug=the-manhattan-project \
  --dry

# Actual migration
node scripts/migrate-images-ts-to-r2.mjs \
  --file=src/app/essays/history/the-manhattan-project/images.ts \
  --slug=the-manhattan-project
```

---

## Script Details

### `scan-hotlinked-images.mjs`

Scans essay files for external image URLs and generates migration configs.

```bash
node scripts/scan-hotlinked-images.mjs [options]

Options:
  --write              Write images-migration.json to each essay directory
  --essay=<slug>       Scan only a specific essay
```

**Features:**
- Detects URLs from Wikimedia, atomicarchive, and other external sources
- Preserves existing image keys from `IMAGES` constants
- Filters out non-image URLs (Wikimedia file pages, etc.)

---

### `migrate-essay-images-to-r2.mjs`

Migrates images using a config file. Best for essays with flat `IMAGES` constants.

```bash
node scripts/migrate-essay-images-to-r2.mjs [options]

Options:
  --config=<path>      Path to images-migration.json (required)
  --dry                Preview without uploading
  --update             Auto-update the TSX file with new URLs
  --no-webp            Skip WebP conversion, keep original format
  --max-width=N        Maximum image width in pixels (default: 1200)
```

**Features:**
- Converts images to WebP (85% quality, ~50% smaller than JPG)
- Resizes to max width (default 1200px, good for retina displays)
- Adds content-hash to filenames for cache busting
- Retry logic for rate-limited requests
- Auto-updates source files with `--update` flag

---

### `migrate-images-ts-to-r2.mjs`

Migrates images directly from `images.ts` files with nested structures.

```bash
node scripts/migrate-images-ts-to-r2.mjs [options]

Options:
  --file=<path>        Path to images.ts file (required)
  --slug=<slug>        Essay slug for R2 path (required)
  --dry                Preview without uploading
  --no-webp            Skip WebP conversion
```

**Features:**
- Works with nested object structures (`heroImages.trinityTower.src`)
- Converts Wikimedia thumbnail URLs to full-resolution (avoids rate limits)
- Resizes to max 1600px width (Sharp)
- Updates `src` values in place

---

### `upload-image-to-r2.mjs`

Uploads a single local image file to R2.

```bash
node scripts/upload-image-to-r2.mjs [options]

Options:
  --file=<path>        Local image file path (required)
  --essay=<slug>       Essay slug for R2 path (required)
  --name=<name>        Base name for the file (optional)
  --dry                Preview without uploading
```

**Example:**
```bash
node scripts/upload-image-to-r2.mjs \
  --file=./downloads/trinity-tower.jpg \
  --essay=the-manhattan-project \
  --name=trinity-tower
```

---

## R2 URL Structure

Uploaded images follow this pattern:

```
https://images.esy.com/essays/{essay-slug}/{filename}.{hash}.{ext}
```

Example:
```
https://images.esy.com/essays/the-manhattan-project/trinity-fireball.83ddf63450.webp
```

- **essay-slug**: Matches the essay's URL path
- **filename**: Slugified original filename
- **hash**: First 10 chars of SHA-256 hash (content-based cache busting)
- **ext**: `.webp` (or original if `--no-webp`)

---

## Handling Rate Limits

Wikimedia aggressively rate-limits requests, especially for thumbnail URLs.

**Solutions built into the scripts:**

1. **Automatic retries** with exponential backoff (4s, 8s, 16s, 32s)
2. **User-Agent header** per Wikimedia's API requirements
3. **Full-resolution URL conversion** (thumbnails → full-res, then resize with Sharp)
4. **Delay between requests** (1.5s default)

If you still hit rate limits:
- Wait 5-10 minutes and try again
- Run in smaller batches
- Use `--no-webp` to skip Sharp processing (faster, but larger files)

---

## WebP Conversion

All scripts use Sharp to convert images to WebP:

- **Quality**: 85% (good balance of size vs quality)
- **Max width**: 1200px for standard script, 1600px for images.ts script
- **Typical savings**: 50% smaller than JPG, 25-35% smaller than PNG
- **Skipped for**: SVG, GIF (kept as original format)

To disable: add `--no-webp` flag.

---

## R2 Custom Metadata

All scripts automatically attach metadata to uploaded images for tracking and auditing:

| Metadata Key | Description | Example |
|--------------|-------------|---------|
| `source-url` | Original source URL | `https://upload.wikimedia.org/...` |
| `essay-slug` | Essay the image belongs to | `the-complete-history-of-soda` |
| `original-filename` | Filename before slugification | `Joseph_Priestley.jpg` |
| `migrated-at` / `uploaded-at` | ISO timestamp | `2026-01-30T13:45:00.000Z` |

**Accessing metadata:**
- Cloudflare Dashboard: R2 → Bucket → Object → Metadata tab
- AWS CLI: `aws s3api head-object --bucket esy-images-prod --key essays/...`
- Programmatically: Use S3 SDK `HeadObjectCommand`

**Use cases:**
- Audit trail for image sources
- License compliance tracking
- Debugging (find original sources)
- Future CMS integration

---

## Troubleshooting

### "Missing env vars" error
Create `.env.local` with R2 credentials (see Environment Setup above).

### HTTP 429 (Rate Limited)
Wikimedia is rate-limiting requests. The scripts will retry automatically. If persistent, wait a few minutes and try again.

### HTTP 404 (Not Found)
The source URL is broken or the file was moved. Find an alternative source manually.

### "Could not find file with IMAGES constant"
The `--update` flag only works with essays that have a flat `IMAGES` constant. For nested structures, use `migrate-images-ts-to-r2.mjs` instead.

---

## Other Scripts

### `generate-sitemap-routes.js`
Generates static routes for the sitemap.

### `generate-glossary-json.js`
Generates JSON data for the glossary feature.

---

## Related Documentation

- [IMAGE_STANDARDS.md](../docs/IMAGE_STANDARDS.md) - Image metadata standards for essays
- [Visual Essay Pipeline Guide](../docs/artifact-patterns-guide/VISUAL_ESSAY_PIPELINE_GUIDE.md) - Full production pipeline
