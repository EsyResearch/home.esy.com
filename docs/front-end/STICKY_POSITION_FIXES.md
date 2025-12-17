# Sticky Position Fixes

## Overview

`position: sticky` is essential for scroll-lock patterns in visual essays, but it's notoriously fragile. Several CSS properties on ancestor elements can silently break sticky positioning with no error or warning.

This document catalogs known issues and their fixes.

---

## Issue #1: `overflow-x: hidden` Breaks Sticky

### Symptom

Content doesn't pin to viewport during scroll-lock — it scrolls away before animation completes. The `position: sticky` element behaves like `position: relative`.

### Root Cause

Any ancestor element with `overflow: hidden`, `overflow: auto`, or `overflow: scroll` creates a new scrolling context. This breaks `position: sticky` because sticky elements can only stick within their containing block's scrolling context.

### The Bug

```css
/* ❌ WRONG — this breaks position: sticky on any descendant */
.essay-container {
  overflow-x: hidden;
}

.hero-content {
  position: sticky;  /* Will NOT work! */
  top: 0;
}
```

### The Fix

Use `overflow-x: clip` instead:

```css
/* ✅ CORRECT — clips content without breaking sticky */
.essay-container {
  overflow-x: clip;
}

.hero-content {
  position: sticky;  /* Works correctly */
  top: 0;
}
```

### Why This Works

| Property | Clips Content | Creates Scroll Context | Breaks Sticky |
|----------|---------------|------------------------|---------------|
| `overflow: visible` | ❌ | ❌ | ❌ |
| `overflow: hidden` | ✅ | ✅ | ✅ |
| `overflow: scroll` | ✅ | ✅ | ✅ |
| `overflow: auto` | ✅ | ✅ | ✅ |
| `overflow: clip` | ✅ | ❌ | ❌ |

`overflow: clip` was introduced specifically to address this limitation. It clips overflowing content (like `hidden`) but does NOT create a scrolling context, so `position: sticky` continues to work.

### Browser Support

`overflow: clip` is supported in all modern browsers (Chrome 90+, Firefox 81+, Safari 16+, Edge 90+). For older browser support, consider:

```css
.essay-container {
  overflow-x: hidden;  /* Fallback */
  overflow-x: clip;    /* Modern browsers override */
}
```

### Debugging

If sticky isn't working:

1. Open DevTools → Elements panel
2. Select the sticky element
3. Walk UP the ancestor tree
4. Check each ancestor for `overflow` property
5. Any value other than `visible` or `clip` is suspect

---

## Issue #2: CSS Specificity Conflicts

### Symptom

`position: sticky` is set in CSS, but element behaves like `position: relative`. DevTools shows the sticky rule is being overridden.

### Root Cause

A less-specific (or equally-specific) CSS rule sets `position: relative` and wins due to cascade order or specificity.

### The Bug

```css
/* Rule 1: Sets sticky (specificity: 0,3,0) */
.essay-container .hero-section .hero-content {
  position: sticky;
  top: 0;
}

/* Rule 2: Overrides sticky! (specificity: 0,2,0, but comes LATER) */
.essay-container .hero-content {
  position: relative;  /* ← Wins if same specificity, loses if lower */
  z-index: 10;
}
```

### The Fix

Option A: Remove `position` from less-specific rule:

```css
/* ✅ Don't set position in less-specific rule */
.essay-container .hero-content {
  /* position is controlled by more specific selector */
  z-index: 10;
  text-align: center;
}
```

Option B: Increase specificity of sticky rule:

```css
/* ✅ Higher specificity wins */
.essay-container .hero-section .hero-content.sticky-element {
  position: sticky;
  top: 0;
}
```

Option C: Use `!important` (last resort):

```css
/* ⚠️ Works but avoid if possible */
.essay-container .hero-section .hero-content {
  position: sticky !important;
  top: 0;
}
```

### Debugging

1. Open DevTools → Elements panel
2. Select the element that should be sticky
3. Check "Computed" tab → `position` property
4. Click the arrow to see which rule is winning
5. Look for `position: relative` overriding `position: sticky`

---

## Issue #3: Scroll Distance Too Short

### Symptom

Animation phases feel rushed — user scrolls past the sequence before seeing all phases complete.

### Root Cause

The scroll-lock container height doesn't provide enough scroll distance for the animation choreography.

### The Bug

```tsx
// ❌ TOO SHORT for a 6-phase animation
<section style={{ height: "400vh" }}>
  {/* Only 300vh of scroll distance (400vh - 100vh viewport) */}
  {/* Each phase gets ~50vh, too quick! */}
</section>
```

### The Fix

Increase container height:

```tsx
// ✅ BETTER — more scroll time per phase
<section style={{ height: "600vh" }}>
  {/* 500vh of scroll distance */}
  {/* Each phase gets ~80vh, comfortable pace */}
</section>
```

### Guidelines

| Animation Complexity | Phases | Recommended Height | Scroll Distance |
|---------------------|--------|-------------------|-----------------|
| Simple | 3-4 | `400vh` | 300vh |
| Medium | 5-6 | `500-600vh` | 400-500vh |
| Complex | 7+ | `700vh+` | 600vh+ |

### Calculating Scroll Distance

```
Scroll Distance = Container Height - Viewport Height
                = Container Height - 100vh
```

For a 6-phase animation where each phase should have ~80vh of scroll:
```
Needed: 6 phases × 80vh = 480vh scroll distance
Container: 480vh + 100vh = 580vh ≈ 600vh
```

---

## Checklist: Sticky Debugging

When `position: sticky` isn't working:

- [ ] Check ALL ancestors for `overflow: hidden/auto/scroll` → change to `clip`
- [ ] Check for CSS rules overriding `position: sticky` with `position: relative`
- [ ] Verify the sticky element has `top: 0` (or appropriate offset)
- [ ] Confirm the parent container has sufficient height
- [ ] Ensure no `transform` on ancestors (also breaks sticky in some browsers)
- [ ] Test in multiple browsers (Safari is pickiest)

---

## Essays Where These Fixes Were Applied

| Essay | Issue Fixed | Date |
|-------|------------|------|
| `the-origin-of-toy` | #1 (overflow-x), #2 (specificity), #3 (height) | Dec 2025 |

---

## Related Documentation

- [Scroll-Lock Pattern](./SCROLL_LOCK_PATTERN.md) — General scroll-lock implementation
- [Hero Scroll-Lock Pattern](./HERO_SCROLL_LOCK_PATTERN.md) — Hero-specific patterns
- [Scroll-Lock Patterns Reference](../../orchestration/skills/visual-essay-invocation/references/scroll-lock-patterns.md) — Pattern catalog

---

*Last Updated: December 2025*

