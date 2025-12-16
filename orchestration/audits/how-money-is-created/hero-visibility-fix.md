# Hero Visibility Fix
**Component/Page**: `src/app/essays/how-money-is-created/`
**Date**: 2024-12-15
**Issue**: Hero statements not visible on initial page load
**Root Cause**: `useScrollLock` progress calculation bug

---

## Problem

On initial page load, the hero section content (statements) was not visible. The page showed only the decorative borders, corners, and progress dial, but no text content.

---

## Root Cause Analysis

The `useScrollLock` hook had a timing issue:

1. **Initial Render**: Hero section container has `min-height: 100vh` from CSS
2. **Progress Calculation**: `handleScroll()` runs immediately in `useEffect`
3. **Container Height Not Ready**: The second `useEffect` that sets `minHeight` to `windowHeight * 4` hasn't run yet
4. **Scrollable Distance = 0**: When `sectionTotalHeight = windowHeight`, then `scrollableDistance = sectionTotalHeight - windowHeight = 0`
5. **Lock Zone Check Fails**: With `scrollableDistance = 0`, the `inLockZone` condition fails
6. **Wrong Progress**: Falls into else branch, and with `sectionTop <= 0`, sets `progress = 1`
7. **No Content Visible**: All statements check `heroProgress` ranges (0-0.2, 0.2-0.4, etc.), none match when progress = 1

---

## Solution

Added a guard to handle the case when the container height hasn't been properly set yet:

```tsx
// If scrollableDistance is <= 0, container isn't ready yet - default to progress 0
if (scrollableDistance <= 0) {
  setIsLocked(false);
  setProgress(0);
  setIsComplete(false);
  rafId.current = null;
  return;
}
```

This ensures:
- Progress stays at 0 until container is properly sized
- First statement (visible when progress <= 0.2) is shown immediately
- Correct behavior once container height is set

---

## Additional Improvements

Also clarified the else branch logic for better readability:

```tsx
} else {
  // Before lock zone (sectionTop > 0): progress = 0 (show first statement)
  // After lock zone (scrolled past): progress = 1 (show last content)
  setIsLocked(false);
  if (sectionTop > 0) {
    // Section hasn't reached top yet - show initial state
    setProgress(0);
    setIsComplete(false);
  } else {
    // Section is scrolled past - show final state
    setProgress(1);
    setIsComplete(true);
  }
}
```

---

## Files Modified

- `src/app/essays/how-money-is-created/HowMoneyIsCreatedClient.tsx`
  - Lines 234-268: Added scrollableDistance guard and clarified else branch logic

---

## Testing

After this fix:
- ✅ First statement ("Most people think money is created by printing presses.") is visible on initial load
- ✅ Progress correctly starts at 0
- ✅ Scroll lock animation works correctly once container height is set
- ✅ No flash of invisible content (FOIC)

---

## Related Issues

This fix addresses the hydration audit finding where progress-based visibility could cause first-load issues. Combined with the CSS fallback rule added earlier:

```css
/* Hydration safety: Ensure first statement is visible by default (SSR/hydration safe) */
.money-creation-essay .hero-content .hero-statement:first-of-type {
  opacity: 1;
  visibility: visible;
}
```

The hero section now has both CSS and JavaScript safety mechanisms to ensure content is visible on first load.

