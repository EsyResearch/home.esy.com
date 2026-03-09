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

| Field           | Type                   | Required | Purpose                                    |
|-----------------|------------------------|----------|--------------------------------------------|
| `id`            | `string`               | Yes      | URL slug, must be unique                   |
| `title`         | `string`               | Yes      | H1 and OG title                            |
| `description`   | `string`               | Yes      | SEO meta description                       |
| `cluster`       | `string`               | Yes      | Topic cluster key (e.g. `hominids`)        |
| `category`      | `InfographicCategory`  | Yes      | Visual category for badge color            |
| `imageSrc`      | `string`               | Yes      | Full-res image URL on R2                   |
| `thumbnailSrc`  | `string`               | No       | 400px thumbnail URL for grid cards         |
| `imageAlt`      | `string`               | Yes      | Descriptive alt text (SEO-critical)        |
| `width`         | `number`               | Yes      | Original pixel width                       |
| `height`        | `number`               | Yes      | Original pixel height                      |
| `dataPoints`    | `InfographicDataPoint[]`| No      | Key data rendered on detail page           |
| `sources`       | `string[]`             | No       | Academic citations (displayed on detail)   |
| `relatedEssays` | `string[]`             | No       | Paths to related visual essays for linking |
| `keywords`      | `string[]`             | No       | Long-tail SEO keywords                     |
| `publishedDate` | `string`               | Yes      | ISO date string for ordering               |
| `draft`         | `boolean`              | No       | If true, excluded from published list      |

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
    {slug}/
      {slug}.{hash}.webp          <-- Full resolution
      {slug}-thumb.{hash}.webp    <-- 400px thumbnail
```

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
| `/infographics/[slug]`     | `[slug]/page.tsx` → `InfographicDetailClient` | Detail   |

Both routes use Next.js App Router with:
- Server components for metadata generation
- Client components for interactivity (filtering, image loading)
- `generateStaticParams` for build-time static generation

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

- **Nano Banana Pro**: AI infographic generation engine (Gemini-powered)
- **Template system**: Reusable infographic templates with data binding
- **Batch upload**: Process entire cluster of infographics at once
- **Quality gates**: Automated data verification against source citations
- **A/B testing**: Test different visual treatments per data set
