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

### Good Alt Text

- **Descriptive**: Conveys the content and purpose of the image
- **Contextual**: Relates to the surrounding narrative
- **Concise**: Typically 125 characters or less
- **No redundancy**: Don't start with "Image of..." or "Photo of..."

### Examples

```typescript
// ✅ Good
alt: "Portrait of Joseph Priestley by Ellen Sharples, showing the scientist in formal 18th-century attire"

// ✅ Good (for data visualization)
alt: "Line graph showing Coca-Cola's market share growth from 12% in 1920 to 45% in 1950"

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

### Image Research Expert (G4.5) Output

The Image Research Expert should produce `VISUALS.md` with structured data:

```markdown
## Chapter 1: Scientific Discovery

| Key | Source URL | Alt Text | Credit | License |
|-----|-----------|----------|--------|---------|
| josephPriestley | https://upload.wikimedia.org/... | Portrait of Joseph Priestley by Ellen Sharples | Ellen Sharples, Wikimedia Commons | Public Domain |
| pneumaticTrough | https://upload.wikimedia.org/... | Priestley's pneumatic trough apparatus | Science History Institute | Public Domain |
```

### Migration to R2

After Image Research Expert completes sourcing:

1. Create `images-migration.json` from VISUALS.md
2. Run migration: `node scripts/migrate-essay-images-to-r2.mjs --config=... --update`
3. The script updates URLs; metadata (alt, credit, license) is preserved in the IMAGES constant

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

## Hosting

All essay images must be self-hosted on R2:

- **Domain**: `https://images.esy.com/`
- **Path pattern**: `essays/{essay-slug}/{filename}.{hash}.{ext}`
- **Cache**: Immutable (`max-age=31536000, immutable`)

**Never hotlink** from external sources (Wikimedia, etc.) in production code.

---

## Scripts

| Script | Purpose |
|--------|---------|
| `scripts/scan-hotlinked-images.mjs` | Detect external image URLs, generate migration configs |
| `scripts/migrate-essay-images-to-r2.mjs` | Upload images to R2, update IMAGES constant |

---

## Checklist for New Essays

- [ ] All images sourced with verified licenses
- [ ] All images uploaded to R2 (no hotlinking)
- [ ] IMAGES constant uses structured format with `src`, `alt`
- [ ] `credit` and `license` populated for all images
- [ ] Image Credits section in Bibliography
- [ ] Alt text reviewed for accessibility

---

*This standard applies to all new visual essays. Existing essays may use the legacy URL-only format until opportunistically migrated.*
