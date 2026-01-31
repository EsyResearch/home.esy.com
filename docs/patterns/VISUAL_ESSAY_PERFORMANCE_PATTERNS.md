# Visual Essay Performance Optimization Patterns

This document captures proven performance optimization patterns for visual essays. Apply these patterns to achieve good Lighthouse scores (90+ performance).

## Quick Reference

| Issue | Solution | Impact |
|-------|----------|--------|
| Font render-blocking | Use `next/font/google` | -200ms FCP |
| NO_LCP error | Remove `loading="lazy"` from above-fold images | Critical |
| Hero with `opacity: 0` | Use LCP-safe animations (min 70% opacity) | Critical |
| Large images | Add `sizes` attribute | -50-70% transfer |
| Slow image loading | Add `preconnect` to image CDN | -100-200ms |
| Jank animations | Use GPU-accelerated properties | Smooth 60fps |
| CLS from images | Always set explicit dimensions | 0 CLS |

---

## 1. Font Loading (CRITICAL)

**Problem:** External Google Fonts `@import` blocks rendering and causes 200-300ms FCP delay.

**Solution:** Use `next/font/google` to self-host fonts.

### Implementation

```tsx
// EssayClient.tsx
'use client';

import { Playfair_Display, Source_Serif_4, JetBrains_Mono } from 'next/font/google';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-data',
  display: 'swap',
});

export default function EssayClient() {
  const fontClasses = `${playfairDisplay.variable} ${sourceSerif4.variable} ${jetbrainsMono.variable}`;
  
  return (
    <article className={`essay-container ${fontClasses}`}>
      {/* content */}
    </article>
  );
}
```

### CSS Pattern

```css
/* Comment out or remove the @import */
/* @import url('https://fonts.googleapis.com/css2?family=...'); */

/* Fonts loaded via next/font in EssayClient.tsx
   CSS variables set by next/font:
   - --font-display (Playfair Display)
   - --font-body (Source Serif 4)
   - --font-data (JetBrains Mono)
*/

/* Remove static font variable definitions - next/font provides them */
:root {
  /* Typography - provided by next/font via CSS variables */
}

/* Keep using the variables as normal */
.essay-title {
  font-family: var(--font-display);
}
```

**Reference:** See `docs/SELF_HOSTED_FONTS_GUIDE.md` for detailed migration steps.

**Reference Implementation:** `src/app/essays/why-venezuela-matters/WhyVenezuelaMattersClient.tsx`

---

## 2. Image LCP Optimization (CRITICAL)

**Problem:** `loading="lazy"` on above-the-fold images causes NO_LCP errors in Lighthouse.

**Solution:** Use `loading="eager"` and `fetchPriority="high"` for the first 1-2 visible images.

### Pattern

```tsx
{/* FIRST visible image - likely LCP candidate */}
<img
  src={IMAGES.heroImage}
  alt="Description"
  className="hero-image"
  loading="eager"           // NOT lazy!
  fetchPriority="high"      // Prioritize this resource
  sizes="(max-width: 768px) 100vw, 708px"
/>

{/* Below-fold images - use lazy loading */}
<img
  src={IMAGES.sectionImage}
  alt="Description"
  className="chapter-image"
  loading="lazy"
  sizes="(max-width: 768px) 100vw, 400px"
/>
```

### Rules

1. **First 1-2 images** in the viewport: `loading="eager"` + `fetchPriority="high"`
2. **All other images**: `loading="lazy"`
3. **Always add `sizes`** attribute for responsive images

---

## 3. Responsive Image Sizes (IMPORTANT)

**Problem:** Oversized images waste bandwidth. A 1200px image displayed at 400px wastes 70%+ of the transfer.

**Solution:** Add `sizes` attribute so the browser can choose the right size.

### Common Size Patterns

```tsx
{/* Full-width hero/chapter images */}
<img
  src={image}
  sizes="(max-width: 768px) 100vw, 800px"
  loading="lazy"
/>

{/* Right-floated figures (max-width: 280px in CSS) */}
<img
  src={image}
  sizes="(max-width: 768px) 100vw, 280px"
  loading="lazy"
/>

{/* Inline figures (max-width: 400px in CSS) */}
<img
  src={image}
  sizes="(max-width: 768px) 100vw, 400px"
  loading="lazy"
/>

{/* Grid images (e.g., 3-column at 160px each) */}
<img
  src={image}
  sizes="(max-width: 768px) 50vw, 160px"
  loading="lazy"
/>
```

### Rule of Thumb

Match `sizes` to your CSS `max-width` for that image type.

---

## 4. GPU-Accelerated Animations (IMPORTANT)

**Problem:** Animations using `box-shadow`, `width`, `height`, `top`, `left` trigger paint operations and cause jank.

**Solution:** Use compositor-only properties: `transform`, `opacity`, `filter`.

### Bad (Triggers Paint)

```css
.timeline-marker.active {
  /* ❌ box-shadow triggers paint on every frame */
  box-shadow: 0 0 12px var(--color);
}

.element:hover {
  /* ❌ width/height trigger layout + paint */
  width: 120%;
  left: -10%;
}
```

### Good (GPU Accelerated)

```css
.timeline-marker.active {
  /* ✅ filter is compositor-friendly */
  filter: drop-shadow(0 0 8px var(--color));
}

.element:hover {
  /* ✅ transform is compositor-only */
  transform: scale(1.2) translateX(-10%);
}
```

### Properties Reference

| GPU Accelerated ✅ | Triggers Layout/Paint ❌ |
|-------------------|-------------------------|
| `transform` | `width`, `height` |
| `opacity` | `top`, `left`, `right`, `bottom` |
| `filter` | `margin`, `padding` |
| | `box-shadow` |
| | `border-radius` (when animating) |

---

## 5. Avoiding CLS (Cumulative Layout Shift)

**Problem:** Images without dimensions cause layout shifts when they load.

**Solution:** Always set dimensions or use aspect-ratio.

### Pattern

```css
/* Set aspect-ratio for images */
.chapter-image {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;  /* Reserves space before load */
}

/* Or use explicit dimensions */
.figure-image {
  width: 280px;
  height: 373px;  /* aspect-ratio: 3/4 */
  object-fit: cover;
}
```

---

## 6. Preconnect to Image CDN

**Problem:** Browser doesn't know about `images.esy.com` until it parses CSS/HTML, causing connection delay.

**Solution:** Add preconnect hints in `page.tsx`:

```tsx
export default function EssayPage() {
  return (
    <>
      {/* Preconnect to image CDN for faster image loading */}
      <link rel="preconnect" href="https://images.esy.com" />
      <link rel="dns-prefetch" href="https://images.esy.com" />
      <EssayClient />
    </>
  );
}
```

This tells the browser to establish the connection early, before images are discovered in HTML.

---

## 7. Third-Party Script Management

**Problem:** Analytics scripts (GTM, FullStory, Clarity) block main thread.

**Solution:** These are loaded at the layout level. For individual essays, don't add additional third-party scripts. If needed, use `next/script` with `strategy="lazyOnload"`.

---

## Checklist for New Visual Essays

```markdown
## Performance Checklist

### Fonts
- [ ] Using `next/font/google` (NOT @import or <link>)
- [ ] Font variables applied to container element
- [ ] CSS @import removed/commented

### Images  
- [ ] First 1-2 images have `loading="eager"` + `fetchPriority="high"`
- [ ] All other images have `loading="lazy"`
- [ ] All images have `sizes` attribute
- [ ] Images hosted on images.esy.com (not external URLs)

### Animations
- [ ] No `box-shadow` animations (use `filter: drop-shadow`)
- [ ] Animations use `transform` and `opacity` only
- [ ] Complex animations have `will-change` hint

### Layout
- [ ] Images have explicit dimensions or aspect-ratio
- [ ] No layout shifts on scroll reveal animations
```

---

## Reference Implementations

| Pattern | Reference File |
|---------|---------------|
| Font loading | `src/app/essays/why-venezuela-matters/WhyVenezuelaMattersClient.tsx` |
| Image optimization | `src/app/essays/history/the-complete-history-of-soda/SodaHistoryClient.tsx` |
| CSS variables | `src/app/essays/why-venezuela-matters/why-venezuela-matters.css` |

---

## Lighthouse Target Scores

| Metric | Target | Notes |
|--------|--------|-------|
| Performance | 90+ | Mobile emulation |
| FCP | < 2.0s | Font loading critical |
| LCP | < 2.5s | Image optimization critical |
| TBT | < 200ms | Avoid heavy JS |
| CLS | < 0.1 | Set image dimensions |

---

## Common Lighthouse Errors and Fixes

### "NO_LCP" Error
**Cause:** The browser couldn't identify a Largest Contentful Paint element, usually because:
- All above-fold images have `loading="lazy"`
- Hero content uses CSS animations with `opacity: 0` and long delays that hide content during measurement

**Fix:** 
1. Add `loading="eager"` and `fetchPriority="high"` to first visible image
2. **Critical:** Hero text must NOT start with `opacity: 0`. Use LCP-safe animations:

```css
/* ❌ BAD: Content hidden during Lighthouse measurement */
.hero-title {
  opacity: 0;
  animation: fadeUp 0.8s ease 0.7s forwards;
}

/* ✅ GOOD: Content visible immediately (70% opacity min) */
@keyframes gentleSlideUp {
  from { opacity: 0.7; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero-title {
  animation: gentleSlideUp 0.8s ease 0.1s both;
}
```

**Why 70%?** Mobile Lighthouse uses slow 4G throttling. Long animation delays (>0.5s) can cause content to still be hidden when LCP is measured.

### "Serve images in next-gen formats"
**Cause:** Using JPG/PNG instead of WebP.

**Fix:** Our CDN (images.esy.com) automatically converts to WebP. Ensure images are hosted there.

### "Properly size images"
**Cause:** Missing `sizes` attribute or serving large images.

**Fix:** Add `sizes` attribute matching CSS max-width.

### "Avoid non-composited animations"
**Cause:** Animating `box-shadow`, `border-radius`, or layout properties.

**Fix:** Replace with `filter: drop-shadow()` or `transform`.
