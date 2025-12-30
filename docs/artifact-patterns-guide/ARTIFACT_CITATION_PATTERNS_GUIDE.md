# Artifact Citation Patterns Guide

This document establishes citation patterns for visual essays and other artifacts on Esy. It covers image attribution, source citation, and the hybrid approach developed for comprehensive legal compliance and user experience.

---

## Table of Contents

1. [Philosophy](#philosophy)
2. [Image Citation: The Hybrid Approach](#image-citation-the-hybrid-approach)
3. [Inline Attribution Format](#inline-attribution-format)
4. [Image Credits Section](#image-credits-section)
5. [Verifying Licenses via Wikimedia API](#verifying-licenses-via-wikimedia-api)
6. [Source Tiers](#source-tiers)
7. [Implementation Patterns](#implementation-patterns)
8. [CSS Styling Reference](#css-styling-reference)
9. [Checklist for New Essays](#checklist-for-new-essays)

---

## Philosophy

Citation serves multiple purposes:

1. **Legal compliance** — Proper attribution satisfies CC license requirements
2. **Academic credibility** — Shows sources are verifiable and trustworthy
3. **User trust** — Transparency about where content originates
4. **Maintainability** — Centralized credits are easier to audit and update

We use a **hybrid approach**: brief inline attribution for immediate context, plus a comprehensive credits section for full legal compliance and easy auditing.

---

## Image Citation: The Hybrid Approach

### Why Hybrid?

| Approach | Pros | Cons |
|----------|------|------|
| Inline only | Immediate context | Clutters design, inconsistent formatting |
| Centralized only | Clean design, easy to audit | Attribution not visible with image |
| **Hybrid** | Best of both worlds | Slight redundancy (acceptable) |

### The Pattern

1. **Inline attribution** below each image: `"Photographer, License"`
2. **Image Credits section** at end of Sources: Full details with clickable links

This mirrors how major publications (NYT, The Atlantic, museum sites) handle image credits.

---

## Inline Attribution Format

### Standard Format

```
"Photographer/Source, License"
```

### Examples

| Good | Bad |
|------|-----|
| `"Bryan Ledgard, CC BY 2.0"` | `"Wikimedia Commons, 2009"` |
| `"Stax Records, Public Domain"` | `"Public Domain"` |
| `"Antonio Cruz/ABr, CC BY 3.0 BR"` | `"CC BY 3.0"` |
| `"U.S. Navy/Donna Lou Morgan, Public Domain"` | `"Government photo"` |

### Rules

1. **Always include photographer name** (or source if photographer unknown)
2. **Always include license** — `CC BY 2.0`, `CC BY-SA 4.0`, `Public Domain`, `CC0`
3. **No "Wikimedia Commons"** in inline — that's for the credits section
4. **No year in inline** — keep it brief; year goes in credits section if needed
5. **Use standard license abbreviations**:
   - `CC BY 2.0` (not "Creative Commons Attribution 2.0")
   - `CC BY-SA 3.0` (not "CC-BY-SA-3.0")
   - `Public Domain` (not "PD")
   - `CC0` (not "CC Zero" or "Public Domain Dedication")

### TypeScript Interface

```typescript
interface Figure {
  name: string;
  epithet: string;
  // ... other fields
  imageUrl?: string;
  imageAttribution?: string;  // "Photographer, License"
}
```

---

## Image Credits Section

The Image Credits section appears at the end of the Sources section, providing full attribution with clickable links to original files.

### Structure

```tsx
<div className="image-credits-section">
  <h3 className="image-credits-title">
    <span className="source-jack" />
    Image Credits
  </h3>
  <p className="image-credits-intro">
    All images sourced from Wikimedia Commons. Click subject names to view original files.
  </p>
  <ul className="image-credits-list">
    <li>
      <a href="https://commons.wikimedia.org/wiki/File:Example.jpg"
         target="_blank"
         rel="noopener noreferrer">
        Subject Name
      </a>
      <span>— Photographer Name, License</span>
    </li>
    {/* ... more entries */}
  </ul>
</div>
```

### Entry Format

```
Subject Name — Photographer, License
     ↓
     Links to commons.wikimedia.org/wiki/File:Filename.jpg
```

### Example Entries

```tsx
<li>
  <a href="https://commons.wikimedia.org/wiki/File:Booker_T._Jones_2009.jpg"
     target="_blank" rel="noopener noreferrer">
    Booker T. Jones
  </a>
  <span>— Bryan Ledgard, CC BY 2.0</span>
</li>

<li>
  <a href="https://commons.wikimedia.org/wiki/File:Aretha_franklin_1960s_cropped_retouched.jpg"
     target="_blank" rel="noopener noreferrer">
    Aretha Franklin
  </a>
  <span>— Atlantic Records, CC0</span>
</li>
```

### Ordering

List images in the order they appear in the essay (by chapter), or alphabetically by subject name. Consistency matters more than which approach you choose.

---

## Verifying Licenses via Wikimedia API

Before using any image, verify its license using the Wikimedia API. This prevents using non-free images and ensures accurate attribution.

### API Query Pattern

```bash
curl -s "https://en.wikipedia.org/w/api.php?action=query&titles=File:FILENAME.jpg&prop=imageinfo&iiprop=url,extmetadata&format=json"
```

### Batch Query (Multiple Images)

```bash
curl -s "https://en.wikipedia.org/w/api.php?action=query&titles=File:Image1.jpg|File:Image2.jpg|File:Image3.jpg&prop=imageinfo&iiprop=extmetadata&format=json"
```

### Parsing Response

```bash
curl -s "https://en.wikipedia.org/w/api.php?action=query&titles=File:Stevie_Wonder.jpg&prop=imageinfo&iiprop=url,extmetadata&format=json" | python3 -c "
import sys, json
d = json.load(sys.stdin)
for page_id, page in d['query']['pages'].items():
    title = page.get('title', 'Unknown')
    info = page.get('imageinfo', [{}])[0]
    url = info.get('url', 'NOT FOUND')
    meta = info.get('extmetadata', {})
    artist = meta.get('Artist', {}).get('value', 'Unknown')
    license = meta.get('LicenseShortName', {}).get('value', 'Unknown')
    print(f'File: {title}')
    print(f'URL: {url}')
    print(f'Artist: {artist}')
    print(f'License: {license}')
"
```

### Key Metadata Fields

| Field | Description |
|-------|-------------|
| `Artist` | Photographer or creator name (may contain HTML) |
| `LicenseShortName` | Standard license abbreviation |
| `LicenseUrl` | Link to full license text |
| `ImageDescription` | Description of the image |
| `DateTimeOriginal` | When the image was created |

### URL Path Patterns

Wikimedia Commons URLs follow this pattern:
```
https://upload.wikimedia.org/wikipedia/commons/X/XX/Filename.jpg
```

Where `X/XX` is a hash derived from the filename. The API returns the full URL, so use that rather than trying to construct it manually.

### Commons vs English Wikipedia

- **Commons** (`/wikipedia/commons/`) — Free licenses only (CC, Public Domain)
- **English Wikipedia** (`/wikipedia/en/`) — May include fair use images

**Rule: Only use images from Commons.** Fair use images from `/en/` are not suitable for commercial use.

---

## Source Tiers

For non-image sources (books, articles, documentaries), use this tier system:

| Tier | Description | Examples | Target % |
|------|-------------|----------|----------|
| **Tier 1** | Academic/Primary | Peer-reviewed journals, university presses, archives, autobiographies | 40%+ |
| **Tier 2** | Highly Credible | Major news (original reporting), documentaries, encyclopedias | 40%+ |
| **Tier 3** | Supplementary | Wikipedia (verify elsewhere), expert blogs | <20% |
| **Tier 4** | Avoid | Social media, anonymous sources, content farms | 0% |

---

## Implementation Patterns

### IMAGES Constant

Define all image URLs in a centralized constant:

```typescript
const IMAGES = {
  // Locations
  hitsvilleUsa: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Hitsville_USA.jpg",
  staxMuseum: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Stax_Museum_Memphis_TN_01.jpg",

  // Equipment
  tr808: "https://upload.wikimedia.org/wikipedia/commons/b/be/Roland_TR-808_drum_machine.jpg",

  // Artists
  arethaFranklin: "https://upload.wikimedia.org/wikipedia/commons/9/99/Aretha_franklin_1960s_cropped_retouched.jpg",
  stevieWonder: "https://upload.wikimedia.org/wikipedia/commons/8/81/Stevie_Wonder.jpg",
} as const;
```

### Figure with Image

```typescript
{
  name: "Aretha Franklin",
  epithet: "The Queen of Soul",
  born: "March 25, 1942, Memphis, Tennessee",
  died: "August 16, 2018",
  domains: ["Singer", "Pianist", "Icon"],
  description: "First woman inducted into the Rock and Roll Hall of Fame (1987).",
  isFeatured: true,
  imageUrl: IMAGES.arethaFranklin,
  imageAttribution: "Atlantic Records, CC0",
}
```

### Rendering Inline Attribution

```tsx
{figure.imageUrl && (
  <div className="patch-image-container">
    <img
      src={figure.imageUrl}
      alt={figure.name}
      className="patch-image"
    />
    {figure.imageAttribution && (
      <p className="patch-image-credit">{figure.imageAttribution}</p>
    )}
  </div>
)}
```

---

## CSS Styling Reference

### Inline Attribution

```css
.patch-image-credit {
  font-family: var(--cs-font-mono);
  font-size: 0.5625rem;
  color: var(--cs-text-label);
  margin-top: 0.375rem;
}
```

### Image Credits Section

```css
.image-credits-section {
  padding-top: 1.5rem;
  border-top: 1px solid #2a2a2a;
  margin-top: 1.5rem;
}

.image-credits-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--cs-font-mono);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--cs-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 0.75rem;
}

.image-credits-intro {
  font-size: 0.8rem;
  color: var(--cs-text-muted);
  margin: 0 0 1rem;
  line-height: 1.5;
}

.image-credits-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem 1.5rem;
}

@media (max-width: 600px) {
  .image-credits-list {
    grid-template-columns: 1fr;
  }
}

.image-credits-list li {
  font-size: 0.75rem;
  line-height: 1.4;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.image-credits-list a {
  color: var(--cs-era-led, #00ff88);
  text-decoration: none;
  font-weight: 500;
}

.image-credits-list a:hover {
  text-decoration: underline;
}

.image-credits-list span {
  color: var(--cs-text-muted);
  font-family: var(--cs-font-mono);
  font-size: 0.6875rem;
}
```

---

## Checklist for New Essays

### Before Adding Images

- [ ] Verify image is on Wikimedia Commons (not `/en/` fair use)
- [ ] Query API to get accurate photographer and license
- [ ] Confirm license permits commercial use (CC-BY, CC-BY-SA, CC0, Public Domain)
- [ ] Check image resolution is adequate

### For Each Image

- [ ] Add URL to centralized `IMAGES` constant
- [ ] Add `imageUrl` to figure data
- [ ] Add `imageAttribution` in format: `"Photographer, License"`
- [ ] Add entry to Image Credits section with Wikimedia link

### Before Publishing

- [ ] All inline attributions follow standard format
- [ ] Image Credits section is complete
- [ ] All Wikimedia links are clickable and correct
- [ ] No `/en/` (fair use) images used
- [ ] CSS for image credits is responsive

### Audit Verification

Run this to find images without proper attribution:

```bash
grep -n "imageUrl:" EssayClient.tsx | while read line; do
  linenum=$(echo "$line" | cut -d: -f1)
  next=$((linenum + 1))
  sed -n "${next}p" EssayClient.tsx | grep -q "imageAttribution" || echo "Missing attribution near line $linenum"
done
```

---

## Reference Implementation

The R&B History essay (`src/app/essays/history/rnb-history/`) serves as the reference implementation for these patterns:

- **RnbHistoryClient.tsx** — Figure data with inline attributions + Image Credits section
- **rnb-history.css** — Styling for `.image-credits-*` classes
- **research/CITATIONS.md** — Full source documentation including image citations

---

## Changelog

| Date | Change |
|------|--------|
| 2024-12-30 | Initial pattern established with R&B History essay |
| 2024-12-30 | Standardized 24 inline attributions, added Image Credits section |

---

*This guide is maintained as part of the Esy documentation system.*
