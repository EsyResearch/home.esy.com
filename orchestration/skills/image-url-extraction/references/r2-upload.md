# R2 Image Upload Reference

## Overview

All images in visual essays must be self-hosted on Cloudflare R2, served via `https://images.esy.com`. Hotlinking external URLs (Wikimedia, LOC, etc.) in production code is prohibited. This reference documents the R2 upload scripts and the migration procedure.

---

## When to Use

After all image URLs have been extracted, verified, and written to `images.ts` (Steps 1-4 in SKILL.md), run the R2 migration to replace external URLs with self-hosted `images.esy.com` URLs.

---

## Prerequisites

R2 credentials must be in `.env.local` at the project root:

```env
R2_BUCKET=esy-images-prod
R2_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=<key>
R2_SECRET_ACCESS_KEY=<secret>
```

---

## Available Scripts

### 1. `scan-hotlinked-images.mjs` — Scan & Generate Config

Scans `src/app/essays/` for external image URLs and generates `images-migration.json` config files for each essay with hotlinks.

```bash
# Scan only (preview)
node scripts/scan-hotlinked-images.mjs

# Generate config files
node scripts/scan-hotlinked-images.mjs --write
```

**Output:** `{essay_dir}/images-migration.json` with format:
```json
{
  "essaySlug": "seven-million-years",
  "images": [
    { "key": "toumai", "filename": "sahelanthropus-tchadensis---tm-266-01-060-1.jpg", "sourceUrl": "https://upload.wikimedia.org/..." }
  ]
}
```

Preserves existing `IMAGES` constant key names when found.

### 2. `r2-migrate-flat-url-map.mjs` — Primary Migration Script

Migrates flat `IMAGES = { key: "url" }` structures. This is the **primary script** for visual essay image migration.

```bash
# Dry run (preview uploads without executing)
node scripts/r2-migrate-flat-url-map.mjs --config=path/to/images-migration.json --dry

# Upload and auto-update images.ts
node scripts/r2-migrate-flat-url-map.mjs --config=path/to/images-migration.json --update

# Options
#   --no-webp        Skip WebP conversion, keep original format
#   --max-width=N    Maximum image width (default: 1200)
```

**What it does:**
1. Reads the migration config JSON
2. Fetches each source image
3. Converts to WebP (quality 85) and resizes to max-width
4. Generates a content hash (SHA-256, 10 chars)
5. Uploads to R2 at `essays/{slug}/{baseName}.{hash}.webp`
6. Rewrites the `IMAGES` constant in-place (with `--update`)

### 3. `r2-migrate-nested-src-objects.mjs` — Nested Object Migration

For `images.ts` files with nested structures like `{ src: "url", alt: "..." }`.

```bash
node scripts/r2-migrate-nested-src-objects.mjs --file=path/to/images.ts --slug=essay-slug
```

Uses regex to find `src:` and `imageUrl:` patterns. Max-width default: 1600px.

### 4. `r2-upload-single-image.mjs` — Individual Uploads

For one-off uploads (OG images, hero banners, etc.).

```bash
node scripts/r2-upload-single-image.mjs --file=image.jpg --essay=essay-slug
node scripts/r2-upload-single-image.mjs --file=image.jpg --essay=essay-slug --og  # 1200x630 OG size
```

---

## Standard Migration Procedure

For a visual essay with `images.ts` containing external URLs:

```bash
# 1. Generate migration config
node scripts/scan-hotlinked-images.mjs --write

# 2. Review the config (verify keys match IMAGES constant)
cat src/app/essays/{slug}/images-migration.json

# 3. Dry run to preview
node scripts/r2-migrate-flat-url-map.mjs \
  --config=src/app/essays/{slug}/images-migration.json \
  --dry

# 4. Execute upload + rewrite
node scripts/r2-migrate-flat-url-map.mjs \
  --config=src/app/essays/{slug}/images-migration.json \
  --update

# 5. Verify images.ts was rewritten
grep "images.esy.com" src/app/essays/{slug}/images.ts

# 6. Verify URLs are reachable
curl -sI "https://images.esy.com/essays/{slug}/{any-image}.webp" | head -5

# 7. Clean up migration config
rm src/app/essays/{slug}/images-migration.json
```

---

## R2 Key Structure

All essay images follow this key pattern:

```
essays/{essaySlug}/{baseName}.{contentHash}.webp
```

- `essaySlug`: lowercase, hyphenated (e.g., `seven-million-years`)
- `baseName`: slugified original filename
- `contentHash`: first 10 chars of SHA-256 of the final image bytes
- `.webp`: default format after conversion (unless `--no-webp`)

**Public URL:** `https://images.esy.com/essays/{slug}/{baseName}.{hash}.webp`

---

## WebP Conversion Defaults

| Script | Quality | Max Width | Notes |
|--------|---------|-----------|-------|
| `r2-migrate-flat-url-map.mjs` | 85 | 1200px | Configurable via `--max-width` |
| `r2-migrate-nested-src-objects.mjs` | 85 | 1600px | Fixed |
| `r2-upload-single-image.mjs` | 85 | Original | `--og` forces 1200x630 |

SVGs and GIFs are never converted to WebP.

---

## Verification

After migration, verify:

1. **No external URLs remain:**
   ```bash
   grep -c "upload.wikimedia.org" src/app/essays/{slug}/images.ts
   # Expected: 0
   ```

2. **All URLs point to R2:**
   ```bash
   grep -c "images.esy.com" src/app/essays/{slug}/images.ts
   # Expected: matches total image count
   ```

3. **URLs are reachable:**
   ```bash
   curl -sI "https://images.esy.com/essays/{slug}/{filename}" | grep -i "content-type"
   # Expected: content-type: image/webp
   ```

---

## Common Pitfalls

- **Missing `.env.local`**: Scripts will fail silently or error on S3 client init. Verify credentials first.
- **Wikimedia rate limiting**: The migration scripts include 1.5s delays between fetches and retry with exponential backoff. If you still hit 429s, wait and retry.
- **Key name mismatch**: `scan-hotlinked-images.mjs` preserves `IMAGES` constant keys, but if the scan can't parse them, it generates camelCase keys from the filename. Review the config before migrating.
- **Forgetting `--update`**: Without `--update`, the script uploads but does not rewrite `images.ts`. You'll need to manually replace URLs.
- **SVG/GIF handling**: These formats are uploaded as-is (no WebP conversion). Content hash still applies.
