# Global CSS Hero Class Conflict

## Problem Summary

Visual essay hero titles become **invisible during client-side navigation** but display correctly on page refresh or direct URL access.

---

## Root Cause

The global `globals.css` file contains aggressive styling for `.hero-title` that uses transparent text for gradient effects:

```css
/* In globals.css */
.hero-title {
  background: linear-gradient(...);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;  /* <-- This hides text */
  animation: gradientShift 8s ease-in-out infinite;
}
```

### Why Client-Side Navigation Differs from Page Refresh

| Scenario | Behavior |
|----------|----------|
| **Direct URL / Refresh** | CSS loads in correct order; page-specific styles win |
| **Client-Side Navigation** | Global CSS may apply after page-specific CSS due to Next.js hydration timing |

During client-side navigation, the global `.hero-title` styles can override page-specific overrides because:
1. CSS cascade timing differs during React hydration
2. Specificity battles are lost when global styles load later
3. `!important` and inline styles are unreliable during this window

---

## Symptoms

- Hero title invisible on link click from another page
- Title appears on browser refresh (Cmd+R / Ctrl+R)
- Title appears on direct URL entry
- Other hero content (subtitles, taglines) may also be affected

---

## Solution: Use Unique Class Names

**Do NOT use generic `hero-*` class names.** Instead, prefix with the essay's unique identifier:

### Before (Broken)
```tsx
<h1 className="hero-title">ESSAIS</h1>
<p className="hero-subtitle">A History of Attempting to Think</p>
```

### After (Fixed)
```tsx
<h1 className="essay-main-title">ESSAIS</h1>
<p className="essay-subtitle">A History of Attempting to Think</p>
```

Or use essay-specific prefixes:
```tsx
<h1 className="slang-hero-title">SLANG</h1>
<p className="slang-tagline">The Rogue Archive</p>
```

---

## Classes to Avoid

These global classes have aggressive styling that causes conflicts:

| Avoid | Use Instead |
|-------|-------------|
| `.hero-title` | `.[essay]-main-title` or `.[essay]-hero-title` |
| `.hero-subtitle` | `.[essay]-subtitle` |
| `.hero-content` | `.[essay]-hero-content` |
| `.hero-tagline` | `.[essay]-tagline` |
| `.hero-quote` | `.[essay]-quote` |

---

## Failed Solutions

These approaches were attempted but **do not reliably fix** the issue:

### 1. CSS Specificity Overrides
```css
/* Does NOT work reliably */
.my-essay .hero-title {
  -webkit-text-fill-color: currentColor;
  background: none;
}
```

### 2. `!important` Declarations
```css
/* Does NOT work reliably */
.hero-title {
  color: #722F37 !important;
  -webkit-text-fill-color: #722F37 !important;
}
```

### 3. Inline Styles
```tsx
/* Does NOT work reliably */
<h1 className="hero-title" style={{ 
  WebkitTextFillColor: '#722F37',
  background: 'none' 
}}>
```

**The only reliable solution is avoiding the global class names entirely.**

---

## Affected Essays & Fixes Applied

| Essay | Date Fixed | Classes Renamed |
|-------|------------|-----------------|
| `/essays/etymology/the-word-essay` | 2026-02-01 | `hero-title` → `essay-main-title`, `hero-content` → `essay-hero-content`, etc. |
| `/essays/etymology/the-word-slang-typographic` | 2026-02-01 | `hero-title` → `slang-hero-title`, `hero-letter` → `slang-letter`, etc. |
| `/essays/etymology/the-word-robot` | 2026-02-01 | `hero-title` → `robot-main-title`, `hero-content` → `robot-hero-content`, `hero-meta` → `robot-meta`, etc. |

---

## Prevention for New Essays

When creating new visual essays:

1. **Never use** `hero-title`, `hero-subtitle`, `hero-content`, `hero-tagline`
2. **Always prefix** hero classes with the essay's unique identifier
3. **Test client-side navigation** by clicking from `/essays` index page

### Testing Checklist

- [ ] Navigate to essay via link click (not direct URL)
- [ ] Verify title is visible immediately
- [ ] Verify all hero content appears without delay
- [ ] Test on both light and dark themes

---

## Long-Term Fix Options

To prevent this systemically:

1. **Namespace global styles**: Rename `.hero-title` to `.home-hero-title` in `globals.css`
2. **Remove global hero styles**: Move them to the homepage component only
3. **Use CSS Modules**: Scope styles to components automatically

Until a systemic fix is implemented, **use unique class names for all visual essay hero elements**.

---

## Related Documentation

- [THE_WORD_ESSAY_CSS_FIX.md](./THE_WORD_ESSAY_CSS_FIX.md) - Detailed debugging journey for the first fix
