# Infographic Artifact System

> Parallel to the Visual Essay Pipeline Guide, this document covers
> the architecture, data flow, and operational workflow for infographic artifacts on Esy.

---

## Architecture Overview

```
public/infographics/staging/   <-- Drop raw images here
        |
        v
scripts/r2-upload-infographic.mjs
        |
        +-- Converts to WebP (quality 90)
        +-- Generates 400px thumbnail
        +-- Uploads both to R2 (images.esy.com/infographics/{slug}/)
        +-- Auto-registers entry in src/data/infographics.ts
        |
        v
src/data/infographics.ts       <-- SINGLE SOURCE OF TRUTH
        |
        +-- /infographics           (index page - grid + cluster filter)
        +-- /infographics/[slug]    (detail page - full image + meta)
        +-- sitemap.ts              (auto-includes all slugs)
```

## Data Model

Each infographic is defined by the `Infographic` interface in `src/data/infographics.ts`:

### Core Fields

| Field           | Type                   | Required | Purpose                                    |
|-----------------|------------------------|----------|--------------------------------------------|
| `id`            | `string`               | Yes      | URL slug, must be unique                   |
| `title`         | `string`               | Yes      | H1 and OG title                            |
| `description`   | `string`               | Yes      | SEO meta description                       |
| `cluster`       | `string`               | Yes      | Topic cluster key (e.g. `hominids`)        |
| `category`      | `InfographicCategory`  | Yes      | Visual category for badge color            |
| `imageSrc`      | `string`               | Yes      | Full-res image URL on R2                   |
| `thumbnailSrc`  | `string`               | No       | 400px thumbnail URL for grid cards         |
| `animatedSrc`   | `string`               | No       | URL for animated version (video/webp)      |
| `imageAlt`      | `string`               | Yes      | Descriptive alt text (SEO-critical)        |
| `width`         | `number`               | Yes      | Original pixel width                       |
| `height`        | `number`               | Yes      | Original pixel height                      |
| `publishedDate` | `string`               | Yes      | ISO date string for ordering               |
| `draft`         | `boolean`              | No       | If true, excluded from published list      |

### Artifact Spec Fields

| Field           | Type                        | Required | Purpose                                    |
|-----------------|-----------------------------|----------|--------------------------------------------|
| `designSystem`  | `string`                    | No       | e.g. "Subject-derived"                     |
| `sourceTier`    | `string`                    | No       | e.g. "Tier-1"                              |
| `citationFirst` | `boolean`                   | No       | Whether data was verified before design    |
| `model`         | `string`                    | No       | AI model used (e.g. "gemini-2.0-flash")   |
| `authorship`    | `InfographicAuthorship`     | No       | Provenance: mode, director, model, contributions |
| `palette`       | `Array<{name, color}>`      | No       | Color palette used in the infographic      |

### Content Fields

| Field           | Type                        | Required | Purpose                                    |
|-----------------|-----------------------------|----------|--------------------------------------------|
| `dataPoints`    | `InfographicDataPoint[]`    | No       | Key data rendered on detail page           |
| `sources`       | `string[]`                  | No       | Academic citations (displayed in spec)     |
| `relatedEssays` | `string[]`                  | No       | Paths to related visual essays for linking |
| `keywords`      | `string[]`                  | No       | Long-tail SEO keywords                     |

### Authorship Interface

```typescript
interface InfographicAuthorship {
  mode: 'human' | 'ai-assisted' | 'ai-directed';
  director?: { name: string; role?: string };
  author?: { name: string; role?: string };
  model?: string;
  aiContributions?: string[];
}
```

## SEO Strategy

Each infographic detail page generates:

1. **Meta tags** via `createInfographicMetadata()` in `src/lib/infographic-metadata.ts`
   - Title, description, canonical URL, keywords
   - OpenGraph with infographic as OG image
   - Twitter card (summary_large_image)

2. **JSON-LD** structured data (`ImageObject` schema)
   - Enables Google Images rich results
   - Includes creator, dimensions, keywords, publish date

3. **Sitemap** entries auto-generated from `getInfographicSlugs()`

4. **Image alt text** is required and should be descriptive (50-125 words)

5. **Internal linking** via `relatedEssays` creates cross-links to visual essays,
   building topical authority within each cluster.

## Cluster System

Clusters group related infographics and essays by topic:

| Cluster Key    | Label               | Example Content                          |
|----------------|---------------------|------------------------------------------|
| `hominids`     | Human Evolution     | Skulls & Brains, Lucy, Turkana Boy       |
| `the-brain`    | The Brain           | Neuron structure, brain regions           |
| `mythology`    | Mythology & Fables  | Ramayana, Aesop's Fables                 |
| `etymology`    | Etymology           | Word origins, language evolution          |
| `food-history` | Food & Agriculture  | Honey, spices, agriculture timeline       |

Add new clusters by updating `CLUSTER_LABELS` in `src/data/infographics.ts`.

## R2 Storage Convention

```
images.esy.com/
  infographics/
    {slug}.{hash}.webp            <-- Full resolution
    {slug}-thumb.{hash}.webp      <-- 400px thumbnail
```

Flat key structure — no subdirectories per slug.

- All images are content-hashed for cache-busting with immutable cache headers
- WebP at quality 90 for full-res, quality 80 for thumbnails
- Custom domain: `images.esy.com` (Cloudflare R2)

## Upload Workflow

### Quick: Single Infographic

```bash
# 1. Drop image in staging
cp ~/Downloads/my-infographic.png public/infographics/staging/

# 2. Upload and register
node scripts/r2-upload-infographic.mjs \
  --file=public/infographics/staging/my-infographic.png \
  --slug=my-infographic \
  --title="My Infographic Title" \
  --description="SEO description here" \
  --cluster=hominids \
  --category=Science

# 3. Fill in remaining fields in src/data/infographics.ts
#    (imageAlt, dataPoints, sources, relatedEssays, keywords)

# 4. Clean up staging
rm public/infographics/staging/my-infographic.png
```

### Dry Run

Add `--dry` to preview without uploading:

```bash
node scripts/r2-upload-infographic.mjs \
  --file=public/infographics/staging/test.png \
  --slug=test \
  --dry
```

## Routing

| Route                      | Component                          | Purpose          |
|----------------------------|------------------------------------|------------------|
| `/infographics`            | `page.tsx` → `InfographicsIndexClient` | Grid index   |
| `/infographics/[slug]`     | `[slug]/page.tsx` → `InfographicDetailClient` → `InfographicArtifactWrapper` | Artifact detail |

Both routes use Next.js App Router with:
- Server components for metadata generation
- Client components for interactivity (filtering, image loading)
- `generateStaticParams` for build-time static generation

### Navigation Behavior

Individual infographic detail pages (`/infographics/[slug]`) hide the site-wide
navigation and footer via `ConditionalNavigation.js` and `ConditionalFooter.js`.
The artifact wrapper provides its own toolbar, matching the pattern used by
visual essay detail pages.

## Detail Page Architecture

The infographic detail page uses `InfographicArtifactWrapper`
(`src/components/InfographicArtifact/InfographicArtifactWrapper.tsx`),
which mirrors the visual language of the essay `ArtifactDetailWrapper` but is
purpose-built for static image artifacts.

### Artifact Mode (Default)

The default view presents the infographic as a produced artifact:

```
┌─────────────────────────────────────────────┐
│ ← Infographics         [Science] [Cinematic]│  Toolbar (sticky)
├─────────────────────────────────────────────┤
│         ── Artifact · Research Infographic ──│  Provenance line
│              How Our Brains Grew…            │  Title
│         Cranial capacity comparison…         │  Description
│      5 Tier-1 sources · Human Evolution      │  Meta row
│      [View Infographic] [Cinematic Mode]     │  CTAs
├─────────────────────────────────────────────┤
│  ▾ Artifact Spec                             │  Collapsible spec panel
│  ┌──────┬──────┬──────┬──────┐              │    - Template, Design System
│  │Templ.│Design│Publi.│Direct│              │    - Published, Authorship
│  └──────┴──────┴──────┴──────┘              │    - Source Quality, Citation-First
│  Color Palette: ■ ■ ■ ■                     │    - Dimensions, Palette
│  Key Sources: [tag] [tag] [tag]              │    - Sources, Related Essays
├─────────────────────────────────────────────┤
│                                              │
│            [ Infographic Image ]        [⛶]  │  Full-width image + cinematic btn
│                                              │
├─────────────────────────────────────────────┤
│  KEY DATA                                    │  Data points panel
│  Species shown ................... 8         │
│  Time span ............. 7 million years     │
├─────────────────────────────────────────────┤
│  Related Visual Essays                       │  Cross-links to essays
│  ┌──────────┬──────────┬──────────┐         │
│  │ Essay    │ Essay    │ Essay    │         │
│  └──────────┴──────────┴──────────┘         │
├─────────────────────────────────────────────┤
│  More in Human Evolution                     │  Cluster siblings (image cards)
│  ┌──────────┬──────────┬──────────┐         │
│  │ [image]  │ [image]  │ [image]  │         │
│  │  Title   │  Title   │  Title   │         │
│  └──────────┴──────────┴──────────┘         │
└─────────────────────────────────────────────┘
```

### Cinematic Mode

Cinematic mode is an immersive full-viewport image viewer optimized for
infographic inspection. It replaces the essay-style "Immersive Mode" with
an image-centric experience.

**Entry points:**
- Toolbar "Cinematic Mode" button
- Hero CTA "Cinematic Mode" button
- Small expand icon (top-right corner of image, appears on hover)

**Behavior:**
- Full-screen `#000` overlay at `z-index: 9999`
- Lite toolbar: exit button + infographic title
- Image centered at maximum viewport-fitting size
  (`max-width: 90vw`, `object-fit: contain`)
- Left/right arrow buttons navigate between infographics in the same cluster
- Keyboard: Escape exits, Arrow Left/Right navigates cluster

**Future — Animated Toggle:**
When `animatedSrc` is set on an infographic entry, the cinematic toolbar
will show a static/animated toggle. This enables switching between the
original infographic and an AI-animated version (video or animated webp).
The toggle is currently a stub that only renders when the field is present.

### Component Structure

```
src/components/InfographicArtifact/
  InfographicArtifactWrapper.tsx   ← Main wrapper (artifact + cinematic modes)
  infographic-artifact.css         ← BEM styles, iga-* prefix
```

The wrapper is NOT a refactoring of `ArtifactDetailWrapper`. It is a separate
component that mirrors the visual language but is tailored to infographic metadata
and the cinematic viewing experience. This avoids coupling with the essay system.

## Quality Checklist (Per Infographic)

Before publishing, verify:

- [ ] `imageAlt` is descriptive (50-125 words, includes key data points)
- [ ] `description` reads well as a meta description (120-160 chars)
- [ ] `sources` list all data citations
- [ ] `dataPoints` capture 3-5 key facts from the infographic
- [ ] `relatedEssays` link to at least 2-3 visual essays in the same cluster
- [ ] `keywords` include 4-8 long-tail search terms
- [ ] Image renders correctly at full resolution on detail page
- [ ] Thumbnail displays correctly in grid cards

## Future Pipeline (Not Yet Built)

The following will be developed as the infographic production system matures:

- **Animated infographics**: AI-animated versions of static infographics
  (data model field `animatedSrc` is ready; cinematic mode toggle is stubbed)
- **Nano Banana Pro**: AI infographic generation engine (Gemini-powered)
- **Template system**: Reusable infographic templates with data binding
- **Batch upload**: Process entire cluster of infographics at once
- **Quality gates**: Automated data verification against source citations
- **A/B testing**: Test different visual treatments per data set
