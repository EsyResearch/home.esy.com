# Artifact Versioning

> Created: March 5, 2026
> Status: **Active**

## Overview

Visual essays can have multiple "builds" — the same spec implemented by different AI models. Each build produces genuinely different research, prose, and design. The versioning system manages these builds with stable URLs, SEO-correct canonical tags, and a single-card index presence per essay concept.

## URL Structure

```
/essays/science/turkana-boy                          ← base URL (canonical pointer)
/essays/science/turkana-boy/v/gpt-5-4               ← GPT 5.4 build
/essays/science/turkana-boy/v/claude-opus-4-6        ← Claude Opus 4.6 build
```

- The base URL always serves whichever build is currently promoted as canonical.
- Each build has a permanent `/v/{model-slug}` URL that never changes.
- The `/v/` namespace is a neutral separator — not "version" or "variation," just a path segment.

## File Structure

```
src/app/essays/science/turkana-boy/
  page.tsx                              ← canonical pointer (imports from promoted build)
  v/
    gpt-5-4/
      page.tsx                          ← variant route
      meta.ts                           ← exported ESSAY_META
      TurkanaBoyClient.tsx
      images.ts
      turkana-boy.css
      research/
    claude-opus-4-6/
      page.tsx                          ← variant route
      meta.ts                           ← exported ESSAY_META
      TurkanaBoyClient.tsx
      images.ts
      turkana-boy.css
      research/
```

## How to Promote a Different Build to Canonical

When you want the base URL to serve a different build:

### 1. Update the base `page.tsx` imports

In `src/app/essays/science/turkana-boy/page.tsx`, change the import paths to point to the new build:

```tsx
// Before (GPT 5.4 was canonical):
import TurkanaBoyClient from './v/gpt-5-4/TurkanaBoyClient';
import { IMAGES } from './v/gpt-5-4/images';
import { ESSAY_META } from './v/gpt-5-4/meta';
import './v/gpt-5-4/turkana-boy.css';

// After (promoting Claude Opus 4.6):
import TurkanaBoyClient from './v/claude-opus-4-6/TurkanaBoyClient';
import { IMAGES } from './v/claude-opus-4-6/images';
import { ESSAY_META } from './v/claude-opus-4-6/meta';
import './v/claude-opus-4-6/turkana-boy.css';
```

### 2. Update `visualEssays.ts`

In `src/data/visualEssays.ts`, swap the canonical and variant entries:

- The **canonical entry** (no `variant` field) should have `buildModel` and `canonicalBuild` matching the new promoted build.
- The **old canonical** becomes a variant entry with `variant` and `href` pointing to its `/v/` URL.

```typescript
// Canonical entry — now Opus 4.6
{
  id: "turkana-boy",
  href: "/essays/science/turkana-boy",
  buildModel: "claude-opus-4.6",          // ← new model
  canonicalBuild: "claude-opus-4-6",      // ← matches /v/ directory
  // ... no variant field
},
// GPT 5.4 is now the variant
{
  id: "turkana-boy--gpt-5-4",
  href: "/essays/science/turkana-boy/v/gpt-5-4",
  variant: "gpt-5-4",
  buildModel: "gpt-5.4",
  // ...
},
```

### 3. Verify

- Base URL renders the new build's content.
- Both `/v/` URLs still work independently.
- The Artifact Versions switcher in the spec panel shows the correct active state.
- The canonical `<link>` tag on all pages points to the base URL.

## SEO

- All `/v/` pages set `<link rel="canonical" href="/essays/science/turkana-boy/" />` via `canonicalOverride` in `createVisualEssayMetadata`.
- The base URL is self-canonical.
- Only base URLs appear in the sitemap (`/v/` paths are excluded in `sitemap.ts`).
- Only canonical builds appear on the `/essays` index page (`publishedVisualEssays` filters out entries with a `variant` field).

## Data Layer

Key fields in `src/data/visualEssays.ts`:

| Field | Purpose |
|-------|---------|
| `spec` | Groups all builds of the same essay concept (e.g., `"turkana-boy"`) |
| `variant` | Model slug for non-canonical builds (absent on canonical entry) |
| `buildModel` | Model registry ID that built this essay (e.g., `"claude-opus-4.6"`) |
| `canonicalBuild` | Which `/v/` directory the base URL renders (on canonical entry only) |

Helper functions:
- `getVariantGroup(specSlug)` — returns all builds for a spec
- `getCanonicalBuild(specSlug)` — returns the canonical build entry

## Artifact Versions Switcher

The `ModelVariantSwitcher` component in `src/components/ArtifactDetail/` renders inside the Artifact Spec panel when `meta.spec` is set and multiple builds exist. It shows vendor-colored dots, model labels, a "Canonical" badge on the promoted build, and active state highlighting for the current page.

## Runner CLI

To create a new variant build:

```bash
node orchestration/runner/cli.js run visual-essay \
  --slug turkana-boy \
  --variant gemini-2-5-pro \
  --build-model gemini-2.5-pro \
  --artifact-path src/app/essays/science/turkana-boy/v/gemini-2-5-pro
```

The `--variant` flag auto-derives the artifact path as `{canonical-path}/v/{variant}` if `--artifact-path` is not provided explicitly.

## Model Slug Convention

- Registry keys use dots: `claude-opus-4.6`, `gpt-5.4`
- URL/directory slugs use hyphens: `claude-opus-4-6`, `gpt-5-4`
- The `variant` field in `visualEssays.ts` uses the hyphenated slug (matches the URL)
