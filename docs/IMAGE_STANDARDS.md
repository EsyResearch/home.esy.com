# Image Standards for Visual Essays

> Established: January 2026

## Overview

All visual essays should use a structured `IMAGES` constant that centralizes image URLs and metadata. This ensures proper attribution, accessibility compliance, and maintainable code.

## IMAGES Constant Structure

### TypeScript Type Definition

```typescript
interface ImageData {
  /** R2-hosted image URL */
  src: string;
  
  /** Descriptive alt text for accessibility (required) */
  alt: string;
  
  /** Attribution credit line */
  credit?: string;
  
  /** License identifier (e.g., "Public Domain", "CC BY-SA 4.0") */
  license?: string;
  
  /** Optional caption for display beneath the image */
  caption?: string;
}

type ImagesConstant = Record<string, ImageData>;
```

### Example Implementation

```typescript
const IMAGES = {
  josephPriestley: {
    src: "https://images.esy.com/essays/the-complete-history-of-soda/priestley.bfa51bd351.jpg",
    alt: "Portrait of Joseph Priestley by Ellen Sharples, showing the scientist in formal 18th-century attire",
    credit: "Ellen Sharples, via Wikimedia Commons",
    license: "Public Domain",
    caption: "Joseph Priestley (1733-1804), discoverer of carbonated water"
  },
  pneumaticTrough: {
    src: "https://images.esy.com/essays/the-complete-history-of-soda/pneumatic-trough.6aaabd011a.jpg",
    alt: "Diagram of Priestley's pneumatic trough apparatus used for carbonation experiments",
    credit: "Science History Institute",
    license: "Public Domain",
  },
} as const;
```

### Usage in Components

```tsx
// Basic usage
<img 
  src={IMAGES.josephPriestley.src} 
  alt={IMAGES.josephPriestley.alt} 
/>

// With figure and caption
<figure>
  <img 
    src={IMAGES.josephPriestley.src} 
    alt={IMAGES.josephPriestley.alt}
    loading="lazy"
  />
  {IMAGES.josephPriestley.caption && (
    <figcaption>
      {IMAGES.josephPriestley.caption}
      {IMAGES.josephPriestley.credit && (
        <span className="credit"> — {IMAGES.josephPriestley.credit}</span>
      )}
    </figcaption>
  )}
</figure>
```

---

## Field Requirements

| Field | Required | Description |
|-------|----------|-------------|
| `src` | ✅ Yes | R2-hosted URL (`https://images.esy.com/essays/...`) |
| `alt` | ✅ Yes | Descriptive text for screen readers and accessibility |
| `credit` | ⚠️ Recommended | Attribution line (artist, source, institution) |
| `license` | ⚠️ Recommended | License identifier for legal compliance |
| `caption` | Optional | Display caption (may differ from alt text) |

---

## Alt Text Guidelines

> **Responsibility:** The **Production Orchestrator** writes alt text during production, using the Image Research Expert's `description` as input.

### Good Alt Text

- **Contextual**: Relates to the essay's narrative (why is this image here?)
- **Descriptive**: Conveys the content and purpose
- **Concise**: Typically 125 characters or less
- **No redundancy**: Don't start with "Image of..." or "Photo of..."

### Description vs Alt Text

| Type | Written By | Focus | Example |
|------|-----------|-------|---------|
| `description` | Image Research Expert | Factual, archival | "Portrait of Joseph Priestley by Ellen Sharples, oil on canvas, circa 1797" |
| `alt` | Production Orchestrator | Narrative context | "Joseph Priestley, the scientist who discovered carbonated water in 1767" |

### Examples

```typescript
// ✅ Good - contextual, relates to narrative
alt: "Joseph Priestley, the scientist who discovered carbonated water in 1767"

// ✅ Good - for data visualization
alt: "Line graph showing Coca-Cola's market share growth from 12% in 1920 to 45% in 1950"

// ⚠️ Acceptable but not ideal - factual but not contextual
alt: "Portrait of Joseph Priestley by Ellen Sharples"

// ❌ Bad - too vague
alt: "A man"

// ❌ Bad - redundant
alt: "Image of Joseph Priestley"

// ❌ Bad - filename
alt: "priestley.jpg"
```

---

## License Types

Use standardized license identifiers:

| License | Identifier | Commercial Use |
|---------|------------|----------------|
| Public Domain | `"Public Domain"` | ✅ Yes |
| CC0 | `"CC0 1.0"` | ✅ Yes |
| Creative Commons Attribution | `"CC BY 4.0"` | ✅ Yes (with credit) |
| Creative Commons Attribution-ShareAlike | `"CC BY-SA 4.0"` | ✅ Yes (with credit, same license) |
| Creative Commons Attribution-NonCommercial | `"CC BY-NC 4.0"` | ❌ No |
| Fair Use | `"Fair Use"` | ⚠️ Limited |
| All Rights Reserved | `"All Rights Reserved"` | ❌ No (avoid) |

### Preferred Sources (Tier 1)

1. **Wikimedia Commons** — verify license on file page
2. **Library of Congress** — most items are public domain
3. **Smithsonian Open Access** — CC0
4. **Metropolitan Museum of Art** — CC0 for public domain works
5. **National Archives** — public domain

---

## Integration with Visual Essay Pipeline

### Image Research Expert (G4.5) Responsibilities

The **Image Research Licensing Expert** (`@agents/research/image-research-licensing-expert.md`) is responsible for sourcing all images during Gate 4.5. The agent outputs structured data with **descriptions** that inform the final alt text.

> **Important distinction:**
> - `description` — What the Image Research Expert provides (factual, archival)
> - `alt` — What the Production Orchestrator writes (contextual, narrative-aware)

#### Required Output: `VISUALS.md`

For each chapter/section, the agent produces a table with research findings:

```markdown
## VISUALS.md - [Essay Title]

### Chapter 1: Scientific Discovery

| Key | Source URL | Description | Credit | License |
|-----|-----------|-------------|--------|---------|
| josephPriestley | https://upload.wikimedia.org/.../Priestley.jpg | Portrait of Joseph Priestley by Ellen Sharples, oil on canvas, circa 1797 | Ellen Sharples, via Wikimedia Commons | Public Domain |
| pneumaticTrough | https://upload.wikimedia.org/.../Pneumatic_trough.jpg | Technical diagram showing Priestley's pneumatic trough apparatus | Science History Institute | Public Domain |

### Chapter 2: The Pharmacy Era

| Key | Source URL | Description | Credit | License |
|-----|-----------|-------------|--------|---------|
| johnPemberton | https://upload.wikimedia.org/.../Pemberton.jpg | Formal portrait photograph of John Stith Pemberton, late 19th century | Unknown photographer, via Wikimedia Commons | Public Domain |
```

#### Field Requirements for Image Research Expert

| Field | Required | Agent Responsibility |
|-------|----------|---------------------|
| `Key` | ✅ | Generate camelCase key name matching the subject (e.g., `josephPriestley`, not `image1`) |
| `Source URL` | ✅ | Direct image URL (must be `upload.wikimedia.org`, not `commons.wikimedia.org/wiki/File:`) |
| `Description` | ✅ | Factual description of the image (artist, medium, date, subject) — **NOT contextual alt text** |
| `Credit` | ✅ | Full attribution: artist/photographer, source institution |
| `License` | ✅ | Verify and document license (prefer Public Domain, CC0, CC BY) |

> **Note:** The Image Research Expert provides `Description`, not `Alt`. Writing contextual alt text is the Production Orchestrator's responsibility during production.

#### URL Verification

The Image Research Expert must verify URLs are **direct image links**:

```bash
# ✅ Correct - returns image content
curl -sI "https://upload.wikimedia.org/wikipedia/commons/d/d5/Priestley.jpg" | grep Content-Type
# Content-Type: image/jpeg

# ❌ Wrong - returns HTML (wiki page, not image)
curl -sI "https://commons.wikimedia.org/wiki/File:Priestley.jpg" | grep Content-Type
# Content-Type: text/html
```

#### License Verification

The agent must verify license status on the source page:
1. Navigate to Wikimedia Commons file page
2. Check "Licensing" section
3. Document exact license (e.g., "CC BY-SA 4.0", not just "Creative Commons")
4. Flag any images that are **not** Public Domain or CC-licensed

### From VISUALS.md to IMAGES Constant

The workflow from research to production:

```
┌─────────────────────────────────────────────────────────────┐
│  1. VISUALS.md (Image Research Expert)                      │
│  ─────────────────────────────────────                      │
│  • description: "Portrait of Priestley by Sharples, 1797"   │
│  • credit, license, sourceUrl                               │
│  • Factual, archival focus                                  │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  2. Migration (scripts)                                     │
│  ─────────────────────────────────────                      │
│  • Upload images to R2                                      │
│  • Generate R2 URLs with content hashes                     │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  3. Production (Production Orchestrator)                      │
│  ─────────────────────────────────────                      │
│  • Writes contextual ALT text using description + narrative │
│  • Creates final IMAGES constant                            │
└─────────────────────────────────────────────────────────────┘
```

#### Step 1: Create migration config from VISUALS.md

```json
{
  "essaySlug": "the-complete-history-of-soda",
  "images": [
    {
      "key": "josephPriestley",
      "filename": "priestley.jpg",
      "sourceUrl": "https://upload.wikimedia.org/...",
      "description": "Portrait of Joseph Priestley by Ellen Sharples, circa 1797",
      "credit": "Ellen Sharples, via Wikimedia Commons",
      "license": "Public Domain"
    }
  ]
}
```

#### Step 2: Run migration to upload to R2

```bash
node scripts/r2-migrate-flat-url-map.mjs --config=path/images-migration.json --update
```

#### Step 3: Production Orchestrator writes contextual alt text

The Production Orchestrator creates the final IMAGES constant, transforming factual descriptions into narrative-aware alt text:

```typescript
const IMAGES = {
  josephPriestley: {
    src: "https://images.esy.com/essays/.../priestley.abc123.jpg",
    // Alt text is contextual — relates to the essay's narrative
    alt: "Joseph Priestley, the scientist who discovered carbonated water in 1767",
    credit: "Ellen Sharples, via Wikimedia Commons",
    license: "Public Domain",
  },
} as const;
```

**Description vs Alt:**
| Field | Source | Purpose |
|-------|--------|---------|
| `description` | Image Research Expert | Factual: "Portrait by Sharples, 1797" |
| `alt` | Production Orchestrator | Contextual: "Priestley, discoverer of carbonated water" |

---

## Bibliography Integration

Images should also appear in the essay's Bibliography section under "Image Credits":

```tsx
<section className="bibliography">
  <h3>Image Credits</h3>
  <ul>
    {Object.entries(IMAGES).map(([key, img]) => (
      <li key={key}>
        <em>{img.caption || img.alt}</em>
        {img.credit && <span>. {img.credit}</span>}
        {img.license && <span> ({img.license})</span>}
      </li>
    ))}
  </ul>
</section>
```

---

## Migration Path for Existing Essays

Existing essays use a simpler `IMAGES` constant (URL strings only). Migration to the new format is **optional** and can happen opportunistically:

1. Essays work fine with current format
2. When editing an essay, consider upgrading to structured format
3. Priority: essays with missing/poor alt text or attribution gaps

---

## Hosting & Format Standards

All essay images must be self-hosted on R2:

- **Domain**: `https://images.esy.com/`
- **Path pattern**: `essays/{essay-slug}/{filename}.{hash}.webp`
- **Cache**: Immutable (`max-age=31536000, immutable`)

**Never hotlink** from external sources (Wikimedia, etc.) in production code.

### WebP Format Standard

> **All images uploaded to R2 should be WebP format.**

| Format | Use Case | Notes |
|--------|----------|-------|
| **WebP** | ✅ All essay images | Default format, best compression |
| **JPEG** | ⚠️ Legacy only | Acceptable for already-uploaded images |
| **PNG** | ⚠️ Only when needed | For transparency, diagrams, screenshots |

**Why WebP?**
- **30-50% smaller** than JPEG at equivalent quality
- **Universal support** in modern browsers (Chrome, Firefox, Safari 14+, Edge)
- **Lossless option** available (like PNG but smaller)
- **Transparency support** (like PNG)

### Image Processing Pipeline

The migration scripts automatically:
1. Download source image (any format)
2. Convert to WebP using Sharp
3. Resize to max 1600px width (preserves aspect ratio)
4. Quality: 80% (configurable, good balance of size/quality)
5. Upload to R2 with content hash in filename

```typescript
// Sharp conversion settings (in r2-migrate-nested-src-objects.mjs)
const webpBuffer = await sharp(buffer)
  .resize(1600, null, { 
    fit: 'inside', 
    withoutEnlargement: true 
  })
  .webp({ quality: 80 })
  .toBuffer();
```

### Filename Convention

```
{slugified-name}.{content-hash}.webp
```

Examples:
- `joseph-priestley.bfa51bd351.webp`
- `trinity-test-fireball-16ms.83ddf63450.webp`

The content hash enables:
- **Cache busting**: New hash = new URL = fresh cache
- **Deduplication**: Same image = same hash
- **Integrity**: Verify file hasn't been corrupted

---

## Wikimedia Migration: Rate Limits & Solutions

> Lessons learned from migrating Wikimedia-hosted images to R2.

### The Problem: Thumbnail Rate Limiting

Wikimedia serves two types of image URLs:

**Full-Resolution URL** (✅ works well):
```
https://upload.wikimedia.org/wikipedia/commons/7/78/Trinity_Test_Fireball_16ms.jpg
```

**Thumbnail URL** (⚠️ heavily rate-limited):
```
https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Oppenheimer.jpg/440px-Oppenheimer.jpg
                                               ↑                        ↑
                                            /thumb/                   size prefix
```

Thumbnail URLs are **dynamically resized** by Wikimedia's Thumbor service. This costs CPU, so they aggressively rate-limit these requests:

| Request Type | Behavior |
|--------------|----------|
| Full-resolution | Static cached file, rarely rate-limited |
| Thumbnail | Dynamic resize, **HTTP 429** after ~10-20 requests |

### Rate Limit Specifics

- **Anonymous**: 500 requests/hour per IP
- **Authenticated**: 5,000 requests/hour
- **Retry-After**: Must respect header (could be minutes/hours)
- **Aggressive retries**: May result in **IP ban**

### The Solution: Convert Thumbnails to Full-Res

Our migration script automatically converts thumbnail URLs to full-resolution:

```javascript
// In r2-migrate-nested-src-objects.mjs
function convertToFullRes(url) {
  // Thumbnail: .../thumb/8/85/Image.jpg/440px-Image.jpg
  // Full-res: .../8/85/Image.jpg
  
  const thumbMatch = url.match(/\/thumb\/([^/]+\/[^/]+\/[^/]+)\/\d+px-/);
  if (thumbMatch) {
    return url.replace(/\/thumb\//, '/').replace(/\/\d+px-[^/]+$/, '');
  }
  return url;
}
```

Then we use Sharp to resize locally (much faster, no rate limits).

### Best Practices for Wikimedia Migration

1. **Always use full-resolution URLs** — Convert thumbnails before fetching
2. **Include User-Agent header** — Wikimedia requires this for API policy compliance
3. **Respect Retry-After** — Don't retry every few seconds
4. **Batch with delays** — 1-2 second delay between requests
5. **Convert to WebP locally** — Better compression than Wikimedia thumbnails

```javascript
// Required headers for Wikimedia
const response = await fetch(url, {
  headers: {
    'User-Agent': 'EsyImageMigration/1.0 (https://esy.com; contact@esy.com)'
  }
});
```

### What If Rate Limited?

If you hit HTTP 429:
1. **Stop immediately** — Don't retry aggressively
2. **Check Retry-After header** — Wait that long
3. **If no header** — Wait at least 1 hour
4. **Consider authentication** — 10x higher limits with API token

### Script Reference

| Script | Wikimedia Handling |
|--------|-------------------|
| `r2-migrate-nested-src-objects.mjs` | Converts thumbnails → full-res, WebP output |
| `r2-migrate-flat-url-map.mjs` | Basic retry logic, respects delays |
| `scan-hotlinked-images.mjs` | Identifies thumbnail URLs for review |

---

## Scripts

| Script | Purpose |
|--------|---------|
| `scripts/scan-hotlinked-images.mjs` | Detect external image URLs, generate migration configs |
| `scripts/r2-migrate-flat-url-map.mjs` | Upload images to R2 from config file — flat `{ key: "url" }` |
| `scripts/r2-migrate-nested-src-objects.mjs` | Upload images to R2 from `images.ts` — nested `{ key: { src } }` |
| `scripts/r2-upload-single-image.mjs` | Upload a single local image to R2 |

See `scripts/README.md` for detailed usage instructions.

---

## Checklist for New Essays

- [ ] All images sourced with verified licenses
- [ ] All images uploaded to R2 (no hotlinking)
- [ ] IMAGES constant uses structured format with `src`, `alt`
- [ ] `credit` and `license` populated for all images
- [ ] Image Credits section in Bibliography
- [ ] Alt text reviewed for accessibility

---

## Future: Database Architecture

> For scaling to thousands of essays with CMS support

### Overview

The current `IMAGES` constant approach works well for the current scale (~30 essays). As Esy grows to thousands of essays, image management should migrate to a database-backed registry.

```
┌─────────────────────────────────────────────────────────────────┐
│                         Postgres                                 │
│  ┌─────────────┐    ┌──────────────────┐    ┌───────────────┐   │
│  │   images    │◄──►│  essay_images    │◄──►│    essays     │   │
│  │ (registry)  │    │ (relationships)  │    │  (metadata)   │   │
│  └─────────────┘    └──────────────────┘    └───────────────┘   │
└─────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Cloudflare R2                                 │
│              (actual file storage)                               │
│         https://images.esy.com/essays/...                        │
└─────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Build / Runtime                               │
│  • Static build: fetch from DB → generate IMAGES constants       │
│  • Or runtime: API call to get image data                        │
└─────────────────────────────────────────────────────────────────┘
```

### Database Schema

```sql
-- Central image registry
CREATE TABLE images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- R2 storage
  r2_key TEXT UNIQUE NOT NULL,           -- essays/soda/priestley.abc123.jpg
  r2_url TEXT NOT NULL,                  -- https://images.esy.com/essays/...
  
  -- Original source (for reference/re-download)
  original_url TEXT,                     -- https://upload.wikimedia.org/...
  original_source TEXT,                  -- "Wikimedia Commons", "Library of Congress"
  
  -- Required metadata
  alt TEXT NOT NULL,
  
  -- Attribution
  credit TEXT,
  license TEXT,                          -- "Public Domain", "CC BY-SA 4.0"
  license_url TEXT,                      -- Link to license deed
  
  -- Display
  caption TEXT,
  
  -- Technical
  width INTEGER,
  height INTEGER,
  file_size INTEGER,
  mime_type TEXT,
  content_hash TEXT,                     -- For deduplication
  
  -- Audit
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  uploaded_by TEXT
);

-- Essay metadata (if not managed elsewhere)
CREATE TABLE essays (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,                         -- "history", "etymology", etc.
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Many-to-many: which images are used in which essays
CREATE TABLE essay_images (
  essay_slug TEXT REFERENCES essays(slug) ON DELETE CASCADE,
  image_id UUID REFERENCES images(id) ON DELETE RESTRICT,
  key_name TEXT NOT NULL,                -- "josephPriestley" (used in IMAGES constant)
  display_order INTEGER,                 -- For ordered galleries
  
  PRIMARY KEY (essay_slug, key_name)
);

-- Indexes for common queries
CREATE INDEX idx_images_license ON images(license);
CREATE INDEX idx_images_source ON images(original_source);
CREATE INDEX idx_essay_images_image ON essay_images(image_id);
```

### Capabilities Enabled

| Capability | Query Example |
|------------|---------------|
| Find missing alt text | `SELECT * FROM images WHERE alt IS NULL OR alt = ''` |
| Audit by license | `SELECT * FROM images WHERE license = 'CC BY-SA 4.0'` |
| Find unlicensed images | `SELECT * FROM images WHERE license IS NULL` |
| Image reuse detection | `SELECT image_id, COUNT(*) FROM essay_images GROUP BY image_id HAVING COUNT(*) > 1` |
| Essay image count | `SELECT essay_slug, COUNT(*) FROM essay_images GROUP BY essay_slug` |
| Storage usage | `SELECT SUM(file_size) FROM images` |
| Find by source | `SELECT * FROM images WHERE original_source = 'Wikimedia Commons'` |
| Unused images | `SELECT * FROM images WHERE id NOT IN (SELECT image_id FROM essay_images)` |

### Build-Time Integration

Generate `IMAGES` constants from database at build time:

```typescript
// scripts/generate-images-constants.ts
import { db } from './db';

async function generateImagesForEssay(slug: string) {
  const images = await db.query(`
    SELECT ei.key_name, i.r2_url, i.alt, i.credit, i.license, i.caption
    FROM essay_images ei
    JOIN images i ON ei.image_id = i.id
    WHERE ei.essay_slug = $1
  `, [slug]);
  
  const constant = `export const IMAGES = {\n${
    images.rows.map(img => `  ${img.key_name}: {
    src: "${img.r2_url}",
    alt: "${img.alt}",
    ${img.credit ? `credit: "${img.credit}",` : ''}
    ${img.license ? `license: "${img.license}",` : ''}
    ${img.caption ? `caption: "${img.caption}",` : ''}
  }`).join(',\n')
  }\n} as const;`;
  
  return constant;
}
```

### CMS Features (Future)

- **Image Browser**: Search, filter, preview all images
- **Upload Flow**: Drag-and-drop → R2 upload → DB record
- **Essay Editor**: Visual picker to add images to essays
- **Audit Dashboard**: License compliance, alt text coverage
- **Bulk Operations**: Update license for all images from source
- **Usage Analytics**: Most used images, orphaned images

### Migration Path

| Phase | State | Transition |
|-------|-------|------------|
| **Current** | IMAGES constants in TSX files | — |
| **Phase 1** | Database + build script | Import existing IMAGES into DB, generate constants at build |
| **Phase 2** | Database + API | Runtime fetch, SSR/ISR for image data |
| **Phase 3** | Full CMS | Admin UI for image management |

### Migration Script (Phase 1)

```typescript
// scripts/import-images-to-db.ts
// Reads existing IMAGES constants and imports to database

async function importEssayImages(essaySlug: string) {
  const filePath = `src/app/essays/**/${essaySlug}/*Client.tsx`;
  // Parse IMAGES constant from file
  // Insert into images table
  // Create essay_images relationships
}
```

---

*This standard applies to all new visual essays. Existing essays may use the legacy URL-only format until opportunistically migrated.*
