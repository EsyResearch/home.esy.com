# Self-Hosted Fonts with next/font

This guide documents how to migrate visual essays from Google Fonts CDN to self-hosted fonts using `next/font`. This eliminates external network requests and improves LCP (Largest Contentful Paint).

## Why Self-Host?

| Metric | Google Fonts CDN | next/font Self-Hosted |
|--------|------------------|----------------------|
| DNS Lookup | ~50ms | 0ms (same origin) |
| Connection | ~100ms | 0ms (reused) |
| CORS Overhead | Yes | No |
| Total Savings | **~230ms** | — |

## The Pattern

### 1. Identify Fonts in CSS

Find the `@import` statement in the essay's CSS file:

```css
/* Before: External Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600;700&...');
```

Note which fonts and weights are used.

### 2. Add next/font Imports to Client Component

```tsx
// EssayClient.tsx
'use client';

import { Playfair_Display, Inter, Source_Serif_4, IBM_Plex_Mono } from 'next/font/google';

// Define fonts with CSS variable names matching your CSS
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',  // Must match CSS variable name
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-headline',
  display: 'swap',
});

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});
```

### 3. Apply Font Classes to Wrapper Element

```tsx
export default function EssayClient() {
  const fontClasses = `${playfairDisplay.variable} ${inter.variable} ${sourceSerif4.variable} ${ibmPlexMono.variable}`;
  
  return (
    <article className={`essay-wrapper ${fontClasses}`}>
      {/* Essay content */}
    </article>
  );
}
```

### 4. Update CSS File

**Remove** the `@import` (or comment it out):

```css
/* Fonts loaded via next/font in EssayClient.tsx
   @import url('https://fonts.googleapis.com/css2?family=...');
*/
```

**Remove** static font variable definitions:

```css
/* Before */
.essay-wrapper {
  --font-display: 'Playfair Display', Georgia, serif;
  --font-headline: 'Inter', sans-serif;
}

/* After - variables provided by next/font classes */
.essay-wrapper {
  /* Typography provided by next/font via CSS variables */
}
```

**Keep** all `font-family: var(--font-display)` usages — they still work.

## Common Font Mappings

| Google Fonts Name | next/font Import |
|-------------------|------------------|
| Playfair Display | `Playfair_Display` |
| Source Serif 4 | `Source_Serif_4` |
| IBM Plex Mono | `IBM_Plex_Mono` |
| JetBrains Mono | `JetBrains_Mono` |
| DM Sans | `DM_Sans` |
| Space Grotesk | `Space_Grotesk` |
| Cormorant Garamond | `Cormorant_Garamond` |
| EB Garamond | `EB_Garamond` |

## Verifying Migration

1. Run the dev server: `npm run dev`
2. Open the essay page
3. Check Network tab — should see:
   - ✅ Fonts from `/_next/static/media/*.woff2`
   - ❌ No requests to `fonts.googleapis.com`
   - ❌ No requests to `fonts.gstatic.com`

## Example: Venezuela Essay

Reference implementation:
- `src/app/essays/why-venezuela-matters/WhyVenezuelaMattersClient.tsx`
- `src/app/essays/why-venezuela-matters/why-venezuela-matters.css`

## Notes

- `display: 'swap'` ensures text is visible immediately with fallback fonts
- `subsets: ['latin']` reduces font file size
- Only include weights you actually use
- next/font automatically optimizes and subsets fonts at build time
