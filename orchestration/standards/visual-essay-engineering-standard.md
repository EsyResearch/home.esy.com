# Visual Essay Engineering Standard

> Version: 1.0
> Created: February 9, 2026
> Status: Active

## Purpose

This standard defines the mandatory engineering patterns for building and shipping visual essays on Esy.com. It covers page structure, component wrappers, data registration, routing, and server configuration.

These patterns were codified after the "Inside a Black Hole" production run revealed that engineering conventions were scattered across agent docs, gate instructions, and tribal knowledge — leading to repeated corrections during QA.

---

## 1. Page Structure

Every visual essay consists of three files in its route directory:

```
src/app/essays/[category]/[slug]/
├── page.tsx              # Server component: metadata + ArtifactDetailWrapper + JSON-LD
├── [Name]Client.jsx      # Client component: "use client", essay content
└── [slug].css            # Essay-specific styles (BEM with essay prefix)
```

### Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Route folder | `kebab-case` | `inside-a-black-hole/` |
| Client component | `PascalCase` + `Client` suffix | `InsideABlackHoleClient.jsx` |
| CSS file | `kebab-case` matching slug | `inside-a-black-hole.css` |
| Page file | Always `page.tsx` | `page.tsx` |

### `page.tsx` Structure

```tsx
import { createVisualEssayMetadata } from '@/lib/visual-essay-metadata';
import MyEssayClient from './MyEssayClient';
import ArtifactDetailWrapper from '@/components/ArtifactDetail';

const ESSAY_META = { /* see Section 2 */ };

const jsonLd = { /* Schema.org structured data */ };

export const metadata = createVisualEssayMetadata({
  slug: 'my-essay',
  basePath: 'essays/science',
  title: 'My Essay Title | Esy',
  description: '...',
  ogTitle: 'My Essay Title',
  ogDescription: '...',
  ogImage: 'https://images.esy.com/essays/my-essay/my-essay-og.HASH.webp',
  keywords: ['...'],
  publishedTime: '2026-02-08T00:00:00.000Z',
});

export default function MyEssayPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <MyEssayClient />
      </ArtifactDetailWrapper>
    </>
  );
}
```

---

## 2. ArtifactDetailWrapper (Mandatory)

Every visual essay MUST be wrapped in `ArtifactDetailWrapper` from `@/components/ArtifactDetail`. This presents the essay as a produced artifact with metadata hero, spec panel, content frame, immersive mode, and footer.

### ESSAY_META Object

Define this as a `const` in `page.tsx` and pass it as the `meta` prop.

**Required fields:**

| Field | Type | Example |
|---|---|---|
| `title` | string | `'Inside a Black Hole'` |
| `subtitle` | string | `'What physics actually tells us...'` |
| `category` | string | `'Science'` |
| `readTime` | string | `'25 min'` |
| `sourceCount` | number | `16` |
| `sourceTier` | string | `'Tier-1'` |
| `sectionCount` | number | `9` |
| `visualizationCount` | number | `7` |
| `designSystem` | string | `'Subject-derived'` |
| `published` | string | `'February 8, 2026'` |
| `model` | string | `'Claude Opus 4.6'` |
| `template` | string | `'Visual Essay'` |

**Optional fields:**

| Field | Type | Default |
|---|---|---|
| `subcategory` | string | — |
| `backLink` | string | `'/essays'` |
| `backLabel` | string | `'Essays'` |
| `palette` | `Array<{name, color}>` | — |
| `visualizations` | `Array<{name, type}>` | — |
| `keySources` | `string[]` | — |

---

## 3. Data Registration

Every published visual essay MUST be registered in `src/data/visualEssays.ts`.

**Required entry:**

```typescript
{
  id: "my-essay",
  number: "31",           // Sequential — highest = newest
  title: "My Essay Title",
  subtitle: "Subtitle",
  description: "Card description for discovery page.",
  category: "Science",    // Must match EssayCategory type
  readTime: "25 min",
  href: "/essays/science/my-essay",  // Must match route
  isNew: true,            // Set true for newest essay
  tags: ["physics", "black holes"],
  visualStyle: "illustrated",
}
```

When adding a new essay as `isNew: true`, remove `isNew` from the previous newest essay.

---

## 4. Category-Based Routing

Visual essays are organized by category under `/essays/`:

| Category | Path | `basePath` value |
|---|---|---|
| Default (uncategorized) | `/essays/[slug]/` | `'essays'` |
| Etymology | `/essays/etymology/[slug]/` | `'essays/etymology'` |
| Science | `/essays/science/[slug]/` | `'essays/science'` |

When creating a new category:

1. Create the directory: `src/app/essays/[category]/[slug]/`
2. Add the `basePath` value to the union type in `src/lib/visual-essay-metadata.ts`
3. Update `href` in `visualEssays.ts` to include the category path
4. Add breadcrumb entries in `jsonLd` (Home → Essays → Category → Essay)

When moving an existing essay to a category path, add a **301 redirect** in `netlify.toml`:

```toml
[[redirects]]
  from = "/essays/old-slug/*"
  to = "/essays/category/old-slug/:splat"
  status = 301
  force = true
```

---

## 5. CSP for Three.js Essays

Essays that use Three.js require `unsafe-eval` in the Content Security Policy for WebGL shader compilation. Add a scoped CSP header in `netlify.toml`:

```toml
[[headers]]
  for = "/essays/science/my-3d-essay/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://www.clarity.ms https://region1.google-analytics.com; frame-src 'self'"
```

Additionally, Three.js components MUST:
- Be loaded via `next/dynamic` with `ssr: false`
- Include a static SVG fallback for when WebGL is unavailable
- Be wrapped in an Error Boundary

---

## 6. OG Images

All OG images go through Cloudflare R2. Never use a local `/public/og/` path as the production OG URL.

**Workflow**: Use `r2-upload-single-image.mjs` with `--og` flag → copy CDN URL → set in `page.tsx` via `ogImage` prop and `jsonLd.image`.

Full pipeline details: [`orchestration/agents/engineering/social-media-meta-expert.md`](../agents/engineering/social-media-meta-expert.md) § "OG Image Pipeline"
Script reference: [`scripts/README.md`](../../scripts/README.md) § "r2-upload-single-image.mjs"

---

## Red Lines

- ❌ **NEVER ship a visual essay without `ArtifactDetailWrapper`**
- ❌ **NEVER ship without registering in `visualEssays.ts`**
- ❌ **NEVER use a local OG image path in production** — always upload to R2
- ❌ **NEVER add `unsafe-eval` to the global CSP** — scope it to the specific essay path
- ❌ **NEVER move an essay URL without a 301 redirect in `netlify.toml`**

---

## Pipeline Enforcement

| Gate | What's checked |
|---|---|
| **G5** (Content Complete) | Page structure, ArtifactDetailWrapper, Client component, CSS |
| **G8** (Publication Certification) | OG image on CDN, social meta, CSP if Three.js |
| **G9** (Publication Approval) | `visualEssays.ts` registered, ArtifactDetailWrapper verified, 301 redirects if moved |

---

## Related Standards

| Standard | What it covers |
|---|---|
| [Visualization Quality Standard](./visualization-quality-standard.md) | Research-before-rendering for diagrams |
| [Citation-First Source Standard](./citation-first-source-standard.md) | Source traceability in essay content |
| [Social Media Meta Expert](../agents/engineering/social-media-meta-expert.md) | OG image pipeline and meta tag specs |
| [Metadata Helper](../../docs/VISUAL_ESSAY_METADATA_PATTERN.md) | `createVisualEssayMetadata()` usage |
| [Scripts Reference](../../scripts/README.md) | R2 upload scripts |

---

## Version History

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-02-09 | Initial standard — page structure, ArtifactDetailWrapper, data registration, category routing, CSP, OG images. Born from accumulated corrections during "Inside a Black Hole" production and post-production. |
