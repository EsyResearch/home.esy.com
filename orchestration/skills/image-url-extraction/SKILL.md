# Image URL Extraction & R2 Upload Skill

## Purpose

Reliably extract direct image URLs from archive HTML pages and upload them to Cloudflare R2 (`images.esy.com`) for self-hosted delivery. This skill solves two problems: (1) extracting actual image file URLs from archive description pages, and (2) ensuring all images are self-hosted on R2 rather than hotlinked from external sources.

---

## When to Use This Skill

Invoke this skill when:
- You have navigated to an image file page on an archive site
- You need to download an image to local storage
- You need to reference an image URL in code (e.g., `images.ts`)
- A previously attempted image URL returned an error or HTML instead of an image

---

## The Problem This Solves

### What You Land On (HTML Page)
```
https://commons.wikimedia.org/wiki/File:Alan_Turing_portrait.jpg
```

### What You Actually Need (Direct Image)
```
https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_portrait.jpg
```

The HTML page contains metadata, licensing, and a preview—but using this URL in an `<img>` tag or `curl` download will fail or return HTML.

---

## Core Procedure

### Step 1: Identify the Source

Match the current URL against known archive patterns:

| URL Pattern | Source | Reference File |
|-------------|--------|----------------|
| `commons.wikimedia.org/wiki/File:` | Wikimedia Commons | `wikimedia-commons.md` |
| `loc.gov/pictures/` or `loc.gov/resource/` | Library of Congress | `library-of-congress.md` |
| `si.edu/object/` or `ids.si.edu` | Smithsonian | `smithsonian.md` |
| `metmuseum.org/art/collection/` | Metropolitan Museum | `met-museum.md` |
| `catalog.archives.gov/` | National Archives (NARA) | `national-archives.md` |
| Other / Unknown | Use generic fallback | `generic-fallback.md` |

### Step 2: Execute Source-Specific Extraction

Open the matched reference file and follow its extraction procedure exactly. Each reference contains:
- URL structure explanation
- Primary extraction method (usually `curl` + parsing)
- Fallback methods
- Verification steps
- Common pitfalls

### Step 3: Verify the Extracted URL

Before using any extracted URL, **always verify**:

```bash
# Check Content-Type header
curl -sI "{extracted_url}" | grep -i "content-type"
```

**Expected**: `content-type: image/jpeg`, `image/png`, `image/gif`, etc.
**Failure**: `content-type: text/html` means you got the wrong URL

```bash
# Check file size (should be > 1KB for real images)
curl -sI "{extracted_url}" | grep -i "content-length"
```

### Step 4: Write to `images.ts` (Staging)

Once verified, write the extracted URLs into `images.ts` as a flat URL map:

```typescript
export const IMAGES = {
  keyName: "{verified_url}",
  // ...
} as const;
```

These are **staging URLs** — they will be migrated to R2 in the next step.

### Step 5: Upload to R2 (Self-Hosting)

**All images MUST be uploaded to Cloudflare R2 before shipping.** Hotlinking external URLs in production is prohibited. See `references/r2-upload.md` for the full procedure.

**Quick procedure:**
```bash
# 1. Generate migration config from images.ts
node scripts/scan-hotlinked-images.mjs --write

# 2. Upload to R2 and rewrite images.ts in-place
node scripts/r2-migrate-flat-url-map.mjs \
  --config={artifact_path}/images-migration.json \
  --update

# 3. Verify rewrite
grep "images.esy.com" {artifact_path}/images.ts

# 4. Clean up ephemeral config
rm {artifact_path}/images-migration.json
```

After this step, `images.ts` should contain only `https://images.esy.com/essays/{slug}/...` URLs.

**Requires:** R2 credentials in `.env.local` (`R2_BUCKET`, `R2_ENDPOINT`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`).

---

## Decision Tree

```
┌─────────────────────────────────────┐
│ Have URL to image file page (HTML)  │
└─────────────────┬───────────────────┘
                  ▼
┌─────────────────────────────────────┐
│ Identify source from URL pattern    │
└─────────────────┬───────────────────┘
                  ▼
┌─────────────────────────────────────┐
│ Load source-specific reference      │
└─────────────────┬───────────────────┘
                  ▼
┌─────────────────────────────────────┐
│ Execute Method 1 (curl + grep)      │
└─────────────────┬───────────────────┘
                  ▼
          ┌───────┴───────┐
          │ URL extracted? │
          └───────┬───────┘
         Yes      │      No
          ▼       │       ▼
┌─────────────┐   │  ┌─────────────────┐
│ Verify URL  │   │  │ Try Method 2    │
└──────┬──────┘   │  │ (API or browser)│
       ▼          │  └────────┬────────┘
┌─────────────┐   │           ▼
│ Content-Type│   │  ┌─────────────────┐
│ = image/* ? │   │  │ Still failing?  │
└──────┬──────┘   │  │ Use fallback.md │
  Yes  │  No      │  └─────────────────┘
   ▼   │   ▼      │
┌──────┐│┌────────┐│
│STAGE ││ │ RETRY  ││ Write to images.ts
└──┬───┘│└────────┘│ (external URLs)
   ▼    │          │
┌──────────────────┐
│ R2 Upload        │ scan-hotlinked-images.mjs
│ (Step 5)         │ r2-migrate-flat-url-map.mjs
└────────┬─────────┘
         ▼
┌──────────────────┐
│ images.ts now    │
│ images.esy.com/* │ DONE
└──────────────────┘
```

---

## Red Lines (Never Do These)

- ❌ **NEVER ship hotlinked URLs to production** — all images must be hosted on `images.esy.com` via R2
- ❌ **NEVER guess URL hash structures** — always extract from page
- ❌ **NEVER use thumbnail URLs for final assets** — look for "Original file" links
- ❌ **NEVER skip verification** — always check Content-Type before using
- ❌ **NEVER assume URL structure is consistent** — different files may have different hashes
- ❌ **NEVER download without checking file size** — tiny files are usually error pages
- ❌ **NEVER skip the R2 upload step** — `images.ts` with external URLs is a staging artifact only

---

## CRITICAL: Wikipedia Fair Use Detection

**Before extracting ANY Wikipedia image, verify it's not "fair use" (copyrighted).**

### The Problem
Wikipedia hosts two types of images:
- **Wikimedia Commons** (`commons.wikimedia.org`) → FREE, reusable ✅
- **Wikipedia Local** (`en.wikipedia.org/wiki/File:`) → Often FAIR USE, NOT reusable ❌

### Detection Command
```bash
# Check if image is fair use (any output = DO NOT USE)
curl -sL -A "Mozilla/5.0" "{wikipedia_file_url}" | grep -iE "non-free|fair use|NOT under a free license"
```

### Quick Check
If URL starts with `en.wikipedia.org/wiki/File:` (not `commons.wikimedia.org`), **assume fair use** until proven otherwise.

### Why This Matters
Using a Wikipedia fair use image outside Wikipedia = **copyright infringement**. These images are copyrighted by photographers/estates and only allowed on Wikipedia under specific legal exceptions.

---

## Quick Reference Commands

### Wikimedia Commons (FREE images only)
```bash
curl -s "{file_page_url}" | grep -oE 'https://upload\.wikimedia\.org/wikipedia/commons/[a-f0-9]/[a-f0-9]{2}/[^"]+\.(jpg|jpeg|png|gif)' | grep -v thumb | head -1
```

### Library of Congress
```bash
curl -s "{item_url}" | grep -oE 'https://tile\.loc\.gov/[^"]+\.(jpg|tif)' | head -1
```

### Generic (any site)
```bash
curl -s "{page_url}" | grep -oE 'https?://[^"]+\.(jpg|jpeg|png|gif|webp)' | grep -v thumb | grep -v icon | head -5
```

### R2 Migration (after all URLs sourced)
```bash
node scripts/scan-hotlinked-images.mjs --write
node scripts/r2-migrate-flat-url-map.mjs --config={artifact_path}/images-migration.json --update
```

### Verify R2 Upload
```bash
curl -sI "https://images.esy.com/essays/{slug}/{filename}.webp" | grep -i "content-type"
# Expected: content-type: image/webp
```

---

## Integration with Agents

This skill is primarily used by:
- `@orchestration/agents/image-research-licensing-expert.md`

### Invocation Pattern
When the image research agent needs to extract a URL, it should:

1. State: "Applying image-url-extraction skill for {source_name}"
2. Follow the source-specific reference
3. Verify before using
4. Document the extraction in the image record

---

## Troubleshooting

### "File not found" errors
- The hash path may be wrong — re-extract from the HTML page
- The filename may have special characters — check URL encoding

### Curl returns HTML instead of image
- You're using the file page URL, not the direct image URL
- Re-run extraction procedure

### Image downloads but is tiny/corrupted
- You may have grabbed a thumbnail — look for "Original file" link
- The server may require specific headers — try adding `-H "User-Agent: Mozilla/5.0"`

### Rate limiting
- Add delays between requests: `sleep 1`
- Some archives block automated access — use browser fallback

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | February 2026 | Added R2 upload phase (Step 5), `references/r2-upload.md`, hotlinking prohibition |
| 1.1 | December 2024 | Added Wikipedia fair use detection section |
| 1.0 | December 2024 | Initial skill definition |

---

*This skill ensures reliable image URL extraction from major archives and self-hosted delivery via Cloudflare R2, eliminating both broken images and hotlinking in visual essays.*

