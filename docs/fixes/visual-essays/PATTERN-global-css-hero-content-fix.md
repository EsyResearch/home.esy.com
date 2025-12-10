# Fix Pattern: Global CSS Hero Content Conflict

**Date:** 2024-12-10  
**Status:** Recurring Pattern  
**Severity:** High  
**Category:** UI-UX / CSS  
**Affects:** All scrollytelling/visual essay pages

---

## ⚡ Quick Fix (Copy-Paste)

If your scrollytelling hero content is invisible or has broken layout on wide screens:

```css
/* Add to your story's CSS file */
/* Replace .your-story with your container class (e.g., .mirror-container) */

/* Override global .hero-content grid styles from globals.css */
.your-story .hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  /* Explicitly unset global grid properties */
  grid-template-columns: unset;
  gap: unset;
}

/* Override global .hero-title styles from globals.css */
.your-story .hero-title {
  /* Reset global gradient/animation that may interfere */
  background: none;
  -webkit-text-fill-color: currentColor;
  background-clip: border-box;
  animation: none;
  /* Add your story's color */
  color: var(--your-text-color);
}
```

---

## Issue Description

### Symptoms
- Hero content (title, tagline, scroll indicator) is **invisible**
- Hero content splits into **two columns** on wide screens (>1024px)
- Hero title has **wrong gradient/color** from global styles
- Progress indicator stays at 0% (content height collapsed)

### Root Cause

The global `src/app/globals.css` contains styles for generic class names:

```css
/* In globals.css - line ~682 */
.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;  /* THIS causes two-column split */
  gap: 4rem;
}

/* In globals.css - line ~725 */
.hero-title {
  background: linear-gradient(...);  /* THIS overrides story colors */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 8s ease-in-out infinite;
}
```

When a scrollytelling page uses `.hero-content` or `.hero-title`, these global styles apply FIRST, then story-specific styles layer on top. If story CSS doesn't explicitly override layout properties, the global styles persist.

---

## Prevention Checklist

For **every new scrollytelling story**:

- [ ] Use unique container class prefix (e.g., `.mirror-container .hero-content`)
- [ ] Explicitly override `display`, `grid-template-columns`, `flex-direction`
- [ ] Explicitly override `background`, `-webkit-text-fill-color` on `.hero-title`
- [ ] Test on **1440px+ wide screens** to catch column splits
- [ ] Test in Safari, Chrome, Firefox

---

## Known Conflicting Global Classes

| Class | Global Style | Effect on Scrollytelling |
|-------|-------------|--------------------------|
| `.hero-content` | `grid-template-columns: 1fr 1fr` | Splits hero into 2 columns |
| `.hero-title` | gradient + animation | Overrides story title colors |
| `.hero-subtitle` | typography styles | May override story fonts |
| `.section` | various | Potential conflicts |
| `.content` | various | Potential conflicts |

---

## Example Implementations

### ✅ Good: The Great Fire Essay
```css
/* src/app/essays/visual/the-great-fire/great-fire.css */
/* Override global .hero-content grid styles from globals.css 
   Using .great-fire-essay scoping for higher specificity */
.great-fire-essay .hero-content {
  position: relative;
  z-index: 2;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  /* Explicitly unset global grid properties */
  grid-template-columns: unset;
  gap: unset;
}
```

### ✅ Good: The Mirror Essay
```css
/* src/app/essays/visual/who-invented-the-mirror/who-invented-the-mirror.css */
.mirror-container .hero-content {
  position: relative;
  z-index: 2;
  max-width: 900px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  grid-template-columns: unset;
  gap: unset;
}
```

---

## Debugging Steps

If hero content is invisible:

1. **Open DevTools** → Inspect the `.hero-content` element
2. **Check computed styles** for `grid-template-columns`
   - If you see `1fr 1fr`, global CSS is winning
3. **Check the cascade** panel to see which stylesheet is applying
4. **Add explicit overrides** as shown in Quick Fix above
5. **Test at 1440px width** to verify fix

---

## References

- `orchestration/agents/README.md` → Section "Known Style Conflicts (Scrollytelling)"
- `orchestration/agents/immersive-experience-engineer.md` → Section "Global CSS Conflicts (CRITICAL)"
- `src/app/globals.css` lines 682-742 (hero styles)

---

## Future Considerations

**Long-term solutions to consider:**
1. Scope global `.hero-*` styles to specific pages (e.g., `.homepage .hero-content`)
2. Rename scrollytelling hero classes to avoid collision (e.g., `.story-hero-content`)
3. Use CSS Modules for scrollytelling components
4. Add a lint rule to catch unscoped generic class usage

---

*Last updated: December 2024*
