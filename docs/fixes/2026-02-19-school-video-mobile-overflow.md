# Fix: School Video Pages — Mobile Overflow & Scrollbar Styling

> Date: February 19, 2026

## Issue

On mobile viewports (< 640px), the `/school/[slug]` video detail pages had two problems:

1. **Horizontal text clipping** — All text content (paragraphs, headings, the "Try this workflow" CTA) was cut off on the right edge of the screen.
2. **Dark scrollbar on workflow pipeline** — The horizontally scrollable workflow pipeline component inherited the site's global dark scrollbar styles, creating an opaque black scrollbar on a light-themed page.

## Root Cause

### Text Clipping

The main content column had `alignSelf: "start"` applied unconditionally:

```css
alignSelf: "start"
```

This was added for the **desktop grid layout** — it prevents the content column from stretching to match the sidebar's full row height, which is required for `position: sticky` to work on the sidebar.

However, on mobile the layout switches from CSS Grid to Flexbox (`flex-direction: column`). In a column flex container, `align-self: start` controls the **cross-axis** (horizontal) — it prevents the child from stretching to the full container width. The content div shrank to its intrinsic width, and any text that exceeded that width was clipped by `overflow: hidden` on parent containers.

### Dark Scrollbar

The global scrollbar styles in `globals.css` target `::-webkit-scrollbar` universally, applying dark theme colors (`var(--dark)`, `var(--border)`). The workflow pipeline's `overflowX: auto` horizontal scrollbar inherited these styles, appearing as a thick black bar on the light-themed school pages.

## Solution

### Text Clipping

Made `alignSelf` conditional on viewport size:

```typescript
alignSelf: isCompact ? "stretch" : "start"
```

- **Mobile/tablet** (`isCompact`): `stretch` — fills the full flex container width, text wraps correctly.
- **Desktop**: `start` — preserves sticky sidebar behavior in the grid layout.

Also removed aggressive `overflow: hidden` from content wrappers that was masking the issue instead of fixing it. Replaced with `overflowWrap: "break-word"` which handles long words gracefully without clipping normal text.

### Scrollbar

Applied light-theme scrollbar styles via two approaches:

1. **Standard CSS** (Firefox): `scrollbarWidth: "thin"` and `scrollbarColor: "rgba(0, 168, 150, 0.25) transparent"` as inline styles.
2. **WebKit CSS** (Chrome/Safari): Scoped `::-webkit-scrollbar` overrides in `globals.css` targeting the `.workflow-pipeline-scroll` class — 4px height, transparent track, teal-tinted thumb.

## Files Changed

| File | Change |
|---|---|
| `src/app/school/[slug]/client.tsx` | Conditional `alignSelf`, removed `overflow: hidden`, added scrollbar class + inline styles |
| `src/components/SchoolArticle/EnhancedMarkdownRenderer.module.css` | Removed `overflow: hidden` from `.markdownContainerLight`, kept `overflow-wrap: break-word` |
| `src/app/globals.css` | Added `.workflow-pipeline-scroll::-webkit-scrollbar` overrides |

## Testing

1. Open any `/school/[slug]` page in Chrome DevTools responsive mode at 400px width
2. Verify all text wraps correctly — no horizontal clipping
3. Scroll down to the workflow pipeline and swipe horizontally
4. Verify the scrollbar is a thin teal-tinted bar, not a thick black one
5. Switch to desktop width (1200px+) and verify sticky sidebar still works

## Key Lesson

`align-self: start` behaves differently depending on the flex/grid axis:
- In a **row flex** or **grid**: controls vertical alignment (usually what you want)
- In a **column flex**: controls **horizontal** alignment — `start` prevents the element from stretching to full width, which causes text clipping on narrow viewports

When switching between grid (desktop) and flex-column (mobile), always make `align-self` conditional on the layout mode.
