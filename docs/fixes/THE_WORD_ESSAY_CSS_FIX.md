# The Word Essay - CSS Issues & Resolution

## Overview

This document describes the CSS issues encountered on the `/essays/etymology/the-word-essay` page and the debugging journey to resolve them. The core problem was **global CSS conflicts** causing elements to be invisible during client-side navigation, not animation timing as initially suspected.

---

## Initial Request

Remove the entrance animation on the hero section (above the fold) so content appears immediately without fade-in effects.

**File Location:** `src/app/essays/etymology/the-word-essay/`

---

## Problem 1: Title Not Visible on Client-Side Navigation

### Symptom
- The "ESSAIS" title would **not appear** when navigating from the homepage via a link
- The title **did appear** on:
  - Direct URL entry
  - Page refresh (Cmd+R)
- Other hero content (etymology chain, subtitle, tagline) was visible

### Initial Hypothesis (Incorrect)
We assumed the issue was related to the entrance animation state:
- The hero section used `isMounted` state and a `visible` class
- CSS transitions were triggered when `visible` class was added
- We removed the animations and the `visible` class dependency

**This did not fix the issue.**

### Root Cause (Actual)
The `globals.css` file contained aggressive styling for `.hero-title`:

```css
/* globals.css - Line 778 */
.hero-title {
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 25%, #c7d2fe 50%, #e0e7ff 75%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;  /* Makes text invisible! */
  background-clip: text;
  background-size: 200% 200%;
  animation: gradientShift 8s ease-in-out infinite;
}
```

The key issue: **`-webkit-text-fill-color: transparent`** makes text invisible unless a background gradient shows through.

### Why It Worked on Refresh but Not Client Navigation
During **full page load** (refresh/direct URL):
1. Server renders HTML
2. All CSS files load and parse
3. Specificity is calculated correctly
4. Local CSS overrides global CSS

During **client-side navigation** (Next.js Link):
1. React renders the component client-side
2. CSS cascade/specificity behaves differently
3. Global styles can "win" over local styles during the brief render window
4. The `-webkit-text-fill-color: transparent` from globals was applied before local overrides

### Attempted Solutions (Failed)

1. **Removing animation CSS** - Did not address the `text-fill-color` issue
2. **Adding explicit `opacity: 1`** - Did not override `text-fill-color`
3. **Using `!important`** - Inconsistent results
4. **Inline styles** - Still overridden by global CSS in some cases

### Solution (Successful)
**Use unique class names that don't conflict with global styles:**

```tsx
// Before (conflicting with globals.css)
<h1 className="hero-title">
  <span className="hero-word era-renaissance">ESSAIS</span>
</h1>

// After (unique class names)
<h1 className="essay-main-title">
  <span className="essay-title-word">ESSAIS</span>
</h1>
```

```css
/* the-word-essay.css */
.the-word-essay .essay-main-title {
  margin-bottom: var(--space-md);
  text-align: center;
}

.the-word-essay .essay-title-word {
  display: block;
  font-size: clamp(4rem, 15vw, 10rem);
  font-weight: 400;
  letter-spacing: 0.1em;
  font-family: var(--font-display);
  color: #722F37;
  -webkit-text-fill-color: #722F37;  /* Explicit color */
  opacity: 1;
}
```

---

## Problem 2: Content Misaligned Below Title

### Symptom
After fixing the title visibility, the subtitle "A History of Attempting to Think" and tagline appeared **left-aligned** instead of centered during client-side navigation.

### Root Cause
Same issue - global CSS for `.hero-subtitle` and `.hero-content` was conflicting:

```css
/* globals.css */
.hero-content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  /* No text-align: center by default */
}

.hero-subtitle {
  font-size: 1.5rem;
  color: var(--text-muted);
  margin-bottom: 3rem;
  /* No text-align: center */
}
```

### Solution
Rename all hero-related classes to unique names:

| Original Class | New Class |
|---------------|-----------|
| `hero-content` | `essay-hero-content` |
| `hero-title` | `essay-main-title` |
| `hero-word` | `essay-title-word` |
| `hero-subtitle` | `essay-subtitle` |
| `hero-tagline` | `essay-tagline` |
| `hero-quote` | `essay-quote` |

---

## Files Modified

### `TheWordEssayClient.tsx`
- Removed `isMounted` state (no longer needed)
- Removed `heroComplete` state (unused)
- Changed hero section class from conditional `visible` to static `hero-section`
- Renamed all hero element classes to `essay-*` variants

### `the-word-essay.css`
- Removed animation-related CSS for hero elements
- Added new unique class definitions with explicit styling
- Added explicit `text-align: center` and `opacity: 1` to ensure visibility

---

## Key Learnings

### 1. Global CSS is Dangerous
Generic class names in `globals.css` like `.hero-title`, `.hero-content` create hidden dependencies that break when:
- New pages use similar class names
- Client-side navigation occurs
- CSS specificity battles happen

### 2. Client-Side Navigation ≠ Full Page Load
CSS cascade behaves differently during React client-side navigation. What works on refresh may break during SPA navigation.

### 3. `-webkit-text-fill-color: transparent` is Invisible
This property makes text invisible. It's used for gradient text effects but causes problems when inherited or applied unexpectedly.

### 4. Specificity Isn't Enough
Even with higher specificity selectors like `.the-word-essay .hero-title`, the global styles can still "win" during certain render phases. Unique class names are the safest solution.

### 5. Animation Removal ≠ Visibility Fix
Removing CSS animations doesn't fix visibility issues caused by `opacity`, `display`, `visibility`, or `text-fill-color` properties.

---

## Recommended Architectural Changes

To prevent this in future visual essays:

1. **Namespace global hero styles** - Rename `.hero-title` to `.home-hero-title` in globals.css
2. **Use CSS Modules** - Each visual essay should use scoped CSS
3. **Avoid generic class names** - Use specific prefixes like `essay-`, `article-`, etc.
4. **Document global styles** - Create a reference of what classes exist in globals.css

---

## Testing Checklist

When modifying visual essay CSS:

- [ ] Test direct URL navigation
- [ ] Test client-side navigation from homepage
- [ ] Test client-side navigation from essays index
- [ ] Test page refresh
- [ ] Test on mobile viewport
- [ ] Verify all text is visible immediately (no flash of invisible content)
- [ ] Verify alignment matches production

---

## Related Files

- `src/app/globals.css` - Contains conflicting hero styles
- `src/app/essays/etymology/the-word-essay/TheWordEssayClient.tsx` - Main component
- `src/app/essays/etymology/the-word-essay/the-word-essay.css` - Page-specific styles

---

*Last Updated: February 2026*
