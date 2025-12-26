# Performance Audit Interpretation for esy.com

**Date:** December 18, 2025  
**Performance Score:** 70/100 (Needs Improvement)  
**Source:** Lighthouse 12.8.1 audit  
**Page:** Homepage (https://esy.com/)

## Executive Summary

The audit reveals several optimization opportunities that could improve your performance score from 70 to 90+. The main issues are:

1. **Render-blocking CSS and fonts** (860ms savings potential)
2. **Unoptimized OG images** (2,491 KiB savings potential)
3. **Missing preconnect hints** for Google Fonts
4. **Short cache lifetimes** for third-party scripts (77 KiB savings)
5. **Large third-party scripts** (Google Tag Manager, Clarity)

---

## Current Performance Metrics

| Metric | Value | Status |
|--------|-------|--------|
| **First Contentful Paint (FCP)** | 2.1s | ⚠️ Needs improvement |
| **Largest Contentful Paint (LCP)** | 6.6s | ❌ Poor (target: <2.5s) |
| **Total Blocking Time (TBT)** | 10ms | ✅ Good |
| **Speed Index** | 5.6s | ⚠️ Needs improvement |
| **Cumulative Layout Shift (CLS)** | 0 | ✅ Excellent |

**Key Issue:** LCP at 6.6s is the primary concern. This is likely caused by large, unoptimized images loading on the homepage.

---

## Issue #1: Render-Blocking Requests (860ms savings)

### Problem
Multiple CSS files and Google Fonts are blocking the initial render, delaying LCP.

### Current Implementation

**CSS Files Blocking Render:**
- `c091bf98ed623069.css` (14.2 KiB, 180ms)
- `8f01e9e1606366c2.css` (4.9 KiB, 180ms)
- `98f15a659630e498.css` (1.2 KiB)
- `d3f52c8142de9b80.css` (0.6 KiB)
- `2f20e5770fbe02b9.css` (1.2 KiB)

**Google Fonts CDN:**
- `fonts.googleapis.com/css2?family=...` (1.7 KiB, 780ms) - **This is the biggest blocker**

### Root Cause Analysis

1. **Multiple Google Fonts imports in `globals.css`:**
   ```css
   @import url('https://fonts.googleapis.com/css2?family=Cinzel&family=Neuton&...');
   ```
   This is a render-blocking external stylesheet.

2. **Next.js font optimization is partially used:**
   - `layout.js` uses `next/font/google` for some fonts (Geist, Inter, Literata, etc.)
   - But `globals.css` still has an external `@import` for additional fonts
   - This creates a **double font loading problem**

3. **Individual essay CSS files also import fonts:**
   - `the-word-dick.css` imports fonts via `@import url('https://fonts.googleapis.com/...')`
   - `origin-of-porn.css` does the same
   - These are loaded per-essay, but still block render on those pages

### Recommendations

1. **Migrate all fonts to Next.js font optimization:**
   ```javascript
   // In layout.js, add all fonts used in globals.css
   import { Cinzel, Neuton, Poiret_One, Rokkitt, Spartan, Dancing_Script, Cormorant_Garamond, Poppins } from "next/font/google";
   
   const cinzel = Cinzel({ variable: "--font-cinzel", subsets: ["latin"] });
   const neuton = Neuton({ variable: "--font-neuton", subsets: ["latin"] });
   // ... etc
   ```

2. **Remove the `@import` from `globals.css`:**
   - Delete line 2: `@import url('https://fonts.googleapis.com/css2?...');`
   - Use CSS variables instead: `font-family: var(--font-cinzel);`

3. **Add preconnect hints for Google Fonts:**
   ```javascript
   // In layout.js <head>
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
   ```

4. **For essay-specific fonts:**
   - Consider loading them asynchronously or using `font-display: swap`
   - Or migrate to Next.js font optimization if they're used frequently

---

## Issue #2: Image Delivery (2,491 KiB savings)

### Problem
Two OG images are significantly oversized and not using modern formats or responsive sizing.

### Current Implementation

**Problematic Images:**
1. `/og/the-word-essay.png` 
   - **Size:** 1,578.6 KiB
   - **Displayed at:** 724×578px
   - **Actual size:** 1320×656px
   - **Potential savings:** 1,510.5 KiB

2. `/og/the-origin-of-toy.png`
   - **Size:** 1,032.7 KiB
   - **Displayed at:** 724×440px
   - **Actual size:** 1624×809px
   - **Potential savings:** 980.9 KiB

### Root Cause Analysis

1. **Images are used in `CuratedGallery.tsx`:**
   ```tsx
   <Image
     src={essay.heroImage}  // '/og/the-word-essay.png'
     alt={essay.heroAlt}
     fill
     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
   />
   ```

2. **Next.js image optimization is disabled:**
   ```javascript
   // next.config.mjs
   images: {
     unoptimized: true  // ❌ This disables all Next.js image optimization
   }
   ```

3. **Images are PNG format:**
   - PNG is not optimized for photos/illustrations
   - WebP or AVIF would be 50-80% smaller

4. **No responsive image variants:**
   - Single large image served to all devices
   - Mobile users download desktop-sized images

### Recommendations

1. **Enable Next.js Image Optimization:**
   ```javascript
   // next.config.mjs - Remove unoptimized: true
   images: {
     domains: ['images.unsplash.com', 'upload.wikimedia.org', 'images.metmuseum.org'],
     formats: ['image/avif', 'image/webp'],
     deviceSizes: [640, 750, 828, 1080, 1200, 1920],
     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
   }
   ```
   **Note:** This requires removing `output: 'export'` or using a Next.js server. If you must use static export, see option 2.

2. **If static export is required, optimize images manually:**
   - Convert PNG → WebP or AVIF
   - Resize to actual display dimensions
   - Create responsive variants (1x, 2x for retina)
   - Use `srcset` with Next.js Image component

3. **Optimize the specific OG images:**
   ```bash
   # Example optimization commands
   cwebp -q 80 the-word-essay.png -o the-word-essay.webp
   # Resize to 724x578 (display size × 2 for retina = 1448x1156)
   convert the-word-essay.png -resize 1448x1156 -quality 80 the-word-essay-2x.webp
   ```

4. **Update image usage to include priority for LCP:**
   ```tsx
   // For the first image in CuratedGallery (likely LCP element)
   <Image
     src={essay.heroImage}
     alt={essay.heroAlt}
     fill
     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
     priority={index === 0}  // First image gets priority
     fetchPriority="high"    // Explicit LCP hint
   />
   ```

---

## Issue #3: Network Dependency Tree (428ms critical path)

### Problem
Font loading creates a long critical path: HTML → CSS → Google Fonts CSS → Font files.

### Current Critical Path
```
Initial Navigation (116ms)
  → CSS files (246ms)
  → Google Fonts CSS (275ms)
    → Font WOFF2 files (428ms total)
```

### Root Cause
- No preconnect hints for `fonts.googleapis.com` or `fonts.gstatic.com`
- Fonts are loaded sequentially, not in parallel
- Multiple font files loading (4 different fonts: UcC73FwrK, co3bmX5sl, co3ZmX5sl, tDbv2o-fl)

### Recommendations

1. **Add preconnect hints:**
   ```javascript
   // In layout.js <head>
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
   ```

2. **Use Next.js font optimization (already partially done):**
   - Next.js automatically handles preconnect and font loading optimization
   - Migrate remaining fonts from `globals.css` to Next.js font system

3. **Consider font subsetting:**
   - Only load the weights/styles you actually use
   - Reduces font file sizes

---

## Issue #4: Cache Lifetimes (77 KiB savings)

### Problem
Third-party scripts have short cache lifetimes, requiring frequent re-downloads.

### Current Cache TTLs
- **FullStory Analytics:** 1 hour (82 KiB)
- **Microsoft Clarity:** 1 day (26 KiB)
- **Ahrefs Analytics:** 4 hours (3 KiB)

### Recommendations

1. **These are third-party scripts - you can't control their cache headers directly**
2. **However, you can:**
   - Defer loading until after page load
   - Use `rel="preconnect"` for third-party domains
   - Consider if all analytics are necessary (FullStory + Clarity + Google Analytics might be redundant)

3. **Defer third-party scripts:**
   ```javascript
   // Load analytics after page load
   useEffect(() => {
     // Load FullStory, Clarity after initial render
   }, []);
   ```

---

## Issue #5: Third-Party Code Impact

### Current Third-Party Scripts
- **Google Tag Manager:** 238 KiB (39ms main thread)
- **Microsoft Clarity:** 27 KiB (16ms main thread)
- **FullStory:** Not shown in audit but likely loaded

### Recommendations

1. **Defer all analytics scripts:**
   - Load after `window.load` event
   - Or use `loading="lazy"` for script tags

2. **Consider consolidating:**
   - Do you need both Clarity and FullStory?
   - Both provide similar session replay functionality

3. **Use Next.js Script component:**
   ```tsx
   import Script from 'next/script';
   
   <Script
     src="https://www.googletagmanager.com/gtag/js?id=G-FHDZHEDVL2"
     strategy="afterInteractive"  // Loads after page becomes interactive
   />
   ```

---

## Issue #6: LCP Breakdown Analysis

### Current LCP Subparts
| Subpart | Duration | % of Total |
|---------|----------|------------|
| Time to first byte | 100ms | 15% |
| Resource load delay | 210ms | 32% |
| Resource load duration | 370ms | 56% |
| Element render delay | 60ms | 9% |

### Analysis
- **Resource load duration (370ms)** is the largest component
- This is likely the large OG images loading
- **Resource load delay (210ms)** suggests render-blocking resources

### Recommendations
1. Optimize images (Issue #2) will reduce resource load duration
2. Fix render-blocking (Issue #1) will reduce resource load delay
3. Add `fetchpriority="high"` to LCP image

---

## Implementation Priority

### High Priority (Biggest Impact)
1. ✅ **Optimize OG images** (2,491 KiB savings)
   - Convert to WebP/AVIF
   - Resize to display dimensions
   - Enable Next.js image optimization if possible

2. ✅ **Fix Google Fonts loading** (780ms savings)
   - Remove `@import` from `globals.css`
   - Migrate to Next.js font optimization
   - Add preconnect hints

### Medium Priority
3. ✅ **Defer third-party scripts**
   - Use Next.js Script component with `afterInteractive`
   - Load analytics after page load

4. ✅ **Optimize CSS loading**
   - Consider CSS splitting
   - Inline critical CSS

### Low Priority
5. ✅ **Review analytics stack**
   - Consolidate if possible
   - Ensure all are necessary

---

## Expected Performance Improvements

After implementing the high-priority fixes:

| Metric | Current | Expected | Improvement |
|--------|---------|----------|-------------|
| **Performance Score** | 70 | 85-90 | +15-20 points |
| **LCP** | 6.6s | 2.5-3.5s | -3.1 to -4.1s |
| **FCP** | 2.1s | 1.5-1.8s | -0.3 to -0.6s |
| **Speed Index** | 5.6s | 3.0-4.0s | -1.6 to -2.6s |

---

## Code Locations to Modify

1. **`src/app/layout.js`** - Add preconnect, migrate fonts
2. **`src/app/globals.css`** - Remove `@import` for fonts
3. **`next.config.mjs`** - Enable image optimization (if possible)
4. **`src/components/Home/CuratedGallery.tsx`** - Add `priority` and `fetchPriority` to images
5. **`public/og/the-word-essay.png`** - Optimize image file
6. **`public/og/the-origin-of-toy.png`** - Optimize image file
7. **Analytics components** - Defer loading

---

## Notes

- The site uses `output: 'export'` which disables Next.js Image Optimization
- Consider if static export is necessary, or if you can use Next.js server features
- If static export is required, manual image optimization is necessary
- Font optimization via Next.js will still work with static export






