# Scroll-Lock Pinning Fixes — "The Origin of Toy"

## Overview

This document records the fixes applied to make `DictionaryArchaeology` and `ShakespeareShuffle` components properly pin during their scroll-lock sequences.

**Date:** December 2025  
**Essay:** The Etymology of Play (the-origin-of-toy)

---

## Issues Fixed

### Issue #1: Missing Scroll-Lock Pinning

**Components Affected:** `DictionaryArchaeology`, `ShakespeareShuffle`

**Problem:** These scroll-lock sections were scroll-progress-animated but **NOT pinned**. The content scrolled normally with the page instead of locking the viewport during the animation sequence.

**Root Cause:** 
1. Missing `isPinned` state tracking
2. Missing `pinned-content` wrapper with `is-pinned` class
3. Missing CSS for `position: fixed` when pinned
4. Components were placed INSIDE ChapterSection (which has CSS transforms that break fixed positioning)

**Before:**
```tsx
// No isPinned state
const [scrollProgress, setScrollProgress] = useState(0);

// No pinning logic - just calculates progress
return (
  <div ref={containerRef} className="dictionary-archaeology">
    {/* Content scrolls away with page */}
  </div>
);
```

**After:**
```tsx
const [scrollProgress, setScrollProgress] = useState(0);
const [isPinned, setIsPinned] = useState(false);

// Proper scroll-lock pinning logic
if (rect.top <= 0 && scrolledIntoSection <= scrollableDistance) {
  setIsPinned(true);
  // Calculate progress only while pinned
} else {
  setIsPinned(false);
}

return (
  <div ref={containerRef} className="dictionary-archaeology" style={{ height: "300vh" }}>
    <div className={`pinned-content ${isPinned ? "is-pinned" : ""}`}>
      {/* Content locks to viewport during sequence */}
    </div>
  </div>
);
```

---

### Issue #2: Components Inside Transformed ChapterSection

**Problem:** `DictionaryArchaeology` and `ShakespeareShuffle` were rendered inside `<ChapterSection>` components, which use CSS transforms for entrance animations. CSS transforms break `position: fixed`.

**Before:**
```tsx
<ChapterSection chapter={1} title="The Medieval Toye" ...>
  {/* Content */}
  <DictionaryArchaeology /> {/* ❌ Inside transformed parent */}
</ChapterSection>
```

**After:**
```tsx
<ChapterSection chapter={1} title="The Medieval Toye" ...>
  {/* Content before scroll-lock */}
</ChapterSection>

{/* Scroll-Lock: OUTSIDE section to avoid transform conflicts */}
<DictionaryArchaeology />

{/* Chapter 1 continued after scroll-lock */}
<div className="chapter-continued" style={{ transform: "none" }} />
```

---

## CSS Added

```css
/* Dictionary Archaeology */
.dictionary-archaeology .pinned-content {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--toy-space-lg);
  padding: var(--toy-space-xl) var(--toy-space-md);
  background: var(--toy-bg-primary);
}

.dictionary-archaeology .pinned-content.is-pinned {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

/* Shakespeare Shuffle (identical pattern) */
.shakespeare-shuffle .pinned-content { ... }
.shakespeare-shuffle .pinned-content.is-pinned { ... }
```

---

## Files Touched

- `src/app/essays/the-origin-of-toy/OriginOfToyClient.tsx`
  - Added `isPinned` state to both components
  - Wrapped content in `pinned-content` div
  - Moved components outside ChapterSection
  - Added skip buttons and progress bars
  
- `src/app/essays/the-origin-of-toy/the-origin-of-toy.css`
  - Added `.pinned-content` and `.is-pinned` styles for both components

---

## Verification Checklist

- [x] `DictionaryArchaeology` pins to viewport when reached
- [x] `DictionaryArchaeology` shows skip button and progress bar
- [x] 5 dictionary layers excavate progressively
- [x] Viewport releases when sequence completes
- [x] `ShakespeareShuffle` pins to viewport when reached
- [x] Folio cards reveal and spread during sequence
- [x] Conclusion text appears at end of sequence
- [x] No empty headings or broken structure after fixes

---

## Related Fixes

- `sticky-position-fixes.md` — Fixes for `overflow-x: hidden` breaking `position: sticky` in hero
- `/docs/front-end/STICKY_POSITION_FIXES.md` — Global reference for sticky/fixed positioning issues

---

*This follows the same pattern established in "The Word Pussy" essay's `scroll-lock-fixes.md`*

