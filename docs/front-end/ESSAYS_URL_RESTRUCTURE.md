# Essays URL Restructure

> Created: December 14, 2025  
> Status: **Completed**

## Overview

Visual essays have been promoted from `/essays/visual/` to `/essays/`, making them the primary essays experience on esy.com. This refactor simplifies the URL structure and elevates the visual essays as the main content type.

## Before & After

| Content | Before | After |
|---------|--------|-------|
| Essays index | `/essays/` (gateway page) | `/essays/` (visual essays grid) |
| Visual essays index | `/essays/visual/` | Redirects to `/essays/` |
| Individual visual essay | `/essays/visual/the-manhattan-project/` | `/essays/the-manhattan-project/` |
| Markdown essays | `/essays/algorithmic-governance/` | `/essays/algorithmic-governance/` (unchanged) |

## Motivation

1. **Simpler URLs**: Visual essays are the flagship content and deserve top-level placement
2. **Better SEO**: Shorter, cleaner URLs rank better
3. **Unified experience**: One `/essays/` destination instead of bifurcated paths
4. **Reduced confusion**: Users don't need to understand "visual" vs other essay types

## Implementation Details

### Directory Structure Changes

All 57 visual essay directories were moved from:
```
src/app/essays/visual/[essay-name]/
```

To:
```
src/app/essays/[essay-name]/
```

The shared components remain in `/essays/visual/` for organizational clarity:
```
src/app/essays/visual/
├── layout.tsx           # Shared metadata defaults
├── page.tsx             # Redirect to /essays/
├── visual-essays.css    # Index page styles
└── VisualEssaysClient.tsx  # Index page component
```

### Updated Files

#### Core Route Changes
- `src/app/essays/page.js` - Now renders `VisualEssaysClient` with `basePath="/essays"`
- `src/app/essays/visual/page.tsx` - Redirects to `/essays/`
- `src/data/visualEssays.ts` - All `href` paths updated to `/essays/[slug]`
- `src/lib/visual-essay-metadata.ts` - Canonical URLs now use `/essays/[slug]/`

#### Navigation & Links
- `src/components/Home/navigation.tsx`
- `src/components/Home/GalleryNavigation.tsx`
- `src/components/Home/GalleryHero.tsx`
- `src/components/Home/EssayShowcaseGrid.tsx`
- `src/components/Home/CuratedGallery.tsx`
- `src/app/photo-essays/PhotoEssaysClient.tsx`

#### Sitemap
- `src/app/sitemap.ts` - Added `/essays/visual` to excluded routes

## Coexistence with Markdown Essays

The site has two types of essays:

1. **Visual Essays** (57 essays) - Interactive, scroll-driven experiences
   - Served by static `page.tsx` files at `/essays/[slug]/`
   - Examples: `the-manhattan-project`, `the-word-robot`

2. **Markdown Essays** (3 essays) - Traditional text-based articles
   - Served by dynamic `[id]/page.js` route from `src/content/essays/`
   - Examples: `algorithmic-governance`, `geopolitics-renewable-energy`

Next.js routing prioritizes static routes over dynamic ones, so there's no conflict. Visual essays take precedence when both exist.

## URL Redirects

The old `/essays/visual/` index redirects to `/essays/` using Next.js's `redirect()` function:

```tsx
// src/app/essays/visual/page.tsx
import { redirect } from "next/navigation";

export default function VisualEssaysPage() {
  redirect("/essays");
}
```

**Note**: Individual essay URLs at `/essays/visual/[slug]` no longer exist (pages were moved). Users hitting old URLs will see 404. Consider adding redirects in hosting config if needed.

## Sitemap Behavior

The sitemap now:
1. Auto-discovers visual essays at `/essays/[slug]/` (57 routes)
2. Excludes `/essays/visual` (redirect page)
3. Adds markdown essays from `src/content/essays/` (3 routes)

## Testing Checklist

After deployment, verify:

- [ ] `/essays/` shows the visual essays grid
- [ ] `/essays/visual/` redirects to `/essays/`
- [ ] `/essays/the-manhattan-project/` loads correctly
- [ ] Navigation links point to `/essays/` (not `/essays/visual/`)
- [ ] Sitemap contains `/essays/[slug]/` URLs (not `/essays/visual/[slug]/`)
- [ ] Google Search Console shows no 404 errors (after re-crawl)

## Rollback Plan

If issues arise, the refactor can be reversed by:
1. Moving essay directories back to `/essays/visual/`
2. Reverting `visualEssays.ts` href paths
3. Restoring original `/essays/page.js` and `/essays/visual/page.tsx`

Git history preserves all original files for reference.

## Related Documentation

- [Trailing Slash Standard](./TRAILING_SLASH_STANDARD.md) - URL formatting conventions
- [Visual Essay Metadata Pattern](/docs/VISUAL_ESSAY_METADATA_PATTERN.md) - Metadata helper usage
