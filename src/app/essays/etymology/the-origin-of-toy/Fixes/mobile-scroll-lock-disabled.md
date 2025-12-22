# Mobile Scroll-Lock Disabled — "The Origin of Toy"

## Overview

This document records the decision and implementation to **disable scroll-lock behavior on mobile devices** for the hero section animation.

**Date:** December 2025
**Essay:** The Etymology of Play (the-origin-of-toy)
**Component:** `HeroSection` in `OriginOfToyClient.tsx`

---

## Architecture Note: Multiple Scroll-Lock Patterns

This essay uses **multiple independent scroll-lock implementations**:

| Section | Component | Scroll-Lock Pattern | Mobile Behavior |
|---------|-----------|---------------------|-----------------|
| Hero | `HeroSection` | Inline `handleScroll` with `isPinned` state | **DISABLED** |
| Chapter 1 | `DictionaryArchaeology` | Inline scroll handler + `isPinned` | Active |
| Chapter 2 | `ShakespeareShuffle` | Inline scroll handler + `isPinned` | Active |
| Chapter 3 | `ChildhoodInvention` | Inline scroll handler + `isPinned` | Active |
| Chapter 4 | `ToymakerBench` | Inline scroll handler + `isPinned` | Active |
| Chapter 5 | `DepartmentStore` | Inline scroll handler + `isPinned` | Active |
| Chapter 6 | `WordBranches` | Inline scroll handler + `isPinned` | Active |
| Chapter 7 | `EtymologyReveal` | Inline scroll handler + `isPinned` | Active |

**Why multiple patterns?**
Each scroll-lock section has unique animation choreography (different progress calculations, phase timings, visual effects). Rather than a single generic hook, each component manages its own scroll state for precise control.

**Shared utility:**
The `useIsMobile()` hook (lines 49-68) provides mobile detection and can be reused by any component that needs to disable pinning on mobile.

**Note:** The `useScrollLock` hook at the top of the file is **not currently used** by any component. It was an earlier abstraction attempt. The actual scroll-lock behavior is implemented inline within each section component.

---

## The Problem

### What Is Scroll-Lock?

The essay's hero section uses a "scroll-lock" pattern for its cinematic intro animation:

1. User scrolls to the hero section
2. Page scroll is **locked** (`overflow: hidden` on body)
3. Wheel events are intercepted to drive animation progress (0-100%)
4. When animation completes, scroll is **released**

This creates a theatrical "unfold" experience where the viewport stays fixed while content animates based on scroll input.

### Why This Breaks on Mobile

| Desktop | Mobile |
|---------|--------|
| Scroll = wheel events | Scroll = touch events |
| `handleWheel` captures input | No wheel events fired |
| User can progress animation | **User is stuck** |

On mobile devices:
- **No wheel events** — Mobile uses `touchstart`, `touchmove`, `touchend`
- **Body overflow:hidden** — Prevents ALL scrolling, including touch
- **User cannot progress** — Animation stuck at 0%, user trapped
- **Frustrating UX** — Users instinctively swipe up/down, nothing happens

### Real User Impact

```
Mobile user experience BEFORE fix:
1. Scroll to hero section
2. Screen locks (body overflow: hidden)
3. Swipe up... nothing happens
4. Swipe down... nothing happens
5. Confusion → frustration → bounce
```

---

## The Solution

### Approach: Disable Scroll-Lock on Mobile Entirely

Rather than implementing touch event handlers (complex, easy to get wrong), we **skip the scroll-lock pattern on mobile**.

**Rationale:**
- Mobile users expect native scroll behavior
- The cinematic "locked viewport" effect is less impactful on small screens anyway
- Simpler code with fewer edge cases
- Touch scroll listeners are notoriously finicky across devices

### Implementation

#### 1. Mobile Detection Hook

Added `useIsMobile()` hook with robust detection:

```tsx
const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Primary: viewport width < 768px (standard mobile breakpoint)
      const isNarrowViewport = window.innerWidth < 768;
      // Secondary: touch capability on devices < 1024px
      const hasTouchCapability = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isNarrowViewport || (hasTouchCapability && window.innerWidth < 1024));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};
```

**Detection Logic:**
- `width < 768px` → Always mobile (phones, small tablets)
- `width < 1024px` + touch → Mobile (tablets in portrait)
- `width >= 1024px` → Desktop (even if touch-capable)

#### 2. Skip Scroll-Lock on Mobile

In `useScrollLock`, added early return:

```tsx
const useScrollLock = (ref, lockHeight, stages) => {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!ref.current) return;

    // MOBILE: Skip scroll-lock entirely
    if (isMobile) {
      return; // No listeners attached
    }

    // Desktop: Normal scroll-lock behavior
    // ... wheel event handlers, overflow:hidden, etc.
  }, [ref, lockHeight, stages, isMobile]);

  return state;
};
```

---

## What Happens on Mobile Now

### Before (Broken)
```
Hero section → locks scroll → user stuck → frustration
```

### After (Fixed)
```
Hero section → scrolls naturally → user continues reading
```

The hero section still has its visual styling (background, title, etc.), but:
- No viewport lock
- No body overflow manipulation
- Page scrolls normally through the hero
- Animation progress tracking disabled (state stays at 0)

---

## Trade-offs

### What We Lose on Mobile
- The cinematic "scroll-to-animate" effect
- Progress-based opacity/position transitions in hero
- The theatrical "unfold" experience

### What We Gain
- **Working scroll** — Users can navigate the page
- **Native feel** — Respects mobile scroll conventions
- **No frustration** — Users don't get stuck
- **Simpler code** — No touch event edge cases

### Acceptable Because
- Mobile screens are small; cinematic effects have less impact
- The essay content itself is the value, not the intro animation
- Desktop users (larger screens, more leisure browsing) still get full effect

---

## Files Changed

| File | Change |
|------|--------|
| `OriginOfToyClient.tsx` | Added `useIsMobile` hook, mobile detection in `HeroSection` component |
| `Fixes/mobile-scroll-lock-disabled.md` | This documentation |

**Note:** Only the hero section scroll-lock is disabled on mobile. All other scroll-lock experiences below the fold (DictionaryArchaeology, ShakespeareShuffle, etc.) retain their pinning behavior on all devices.

---

## Testing Checklist

- [ ] **Desktop Chrome** — Scroll-lock works, animation progresses
- [ ] **Desktop Firefox** — Scroll-lock works
- [ ] **Desktop Safari** — Scroll-lock works
- [ ] **Mobile Chrome (Android)** — Page scrolls normally through hero
- [ ] **Mobile Safari (iOS)** — Page scrolls normally through hero
- [ ] **iPad (Portrait)** — Page scrolls normally (touch + width < 1024)
- [ ] **iPad (Landscape)** — Scroll-lock works (width >= 1024)
- [ ] **Window resize** — Behavior updates when crossing breakpoint

---

## Future Considerations

### If Touch Animation Is Needed Later

Could implement touch handlers, but requires:
1. `touchstart` — Capture initial Y position
2. `touchmove` — Calculate delta, update progress
3. `touchend` — Check if should release lock
4. Careful handling of `preventDefault` to avoid blocking scroll
5. Testing across iOS Safari, Chrome, Samsung Browser, etc.

**Recommendation:** Keep current approach unless user research shows mobile users want the animation.

### Alternative: Intersection Observer Animation

For mobile, could drive animations via Intersection Observer (element visibility) rather than scroll position:
- Less theatrical but still visually interesting
- Works with native scroll
- No event hijacking needed

---

## Related Documentation

- `scroll-lock-pinning-fixes.md` — Fixes for pinned content during scroll-lock
- `sticky-position-fixes.md` — Fixes for sticky positioning in hero
- `/docs/front-end/SCROLL_PATTERNS.md` — Global scroll pattern reference

---

*Pattern established: Disable scroll-lock on mobile for all visual essays with this pattern.*
