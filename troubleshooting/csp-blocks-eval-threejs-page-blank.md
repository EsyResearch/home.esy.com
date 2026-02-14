# CSP Blocks eval — Three.js Page Renders Blank

## Symptom

The page at `/essays/inside-a-black-hole/` loads blank in production. The browser DevTools **Issues** tab shows:

```
Content Security Policy of your site blocks the use of 'eval' in JavaScript

The Content Security Policy (CSP) prevents the evaluation of arbitrary strings
as JavaScript to make it more difficult for an attacker to inject unauthorized
code on your site.

AFFECTED RESOURCES
  Directive: script-src
  Status: blocked
```

A secondary warning also appears:

```
StorageType.persistent is deprecated. Please use standardized navigator.storage instead.
```

The page works fine in local development (`next dev`) because no CSP headers are set locally.

## Root Cause

Three.js (used for the `SpacetimeVisualization` 3D component) internally uses `new Function()` for WebGL shader compilation. Browsers treat `new Function()` identically to `eval()` — both require `'unsafe-eval'` in the CSP `script-src` directive.

The site's CSP (configured in the Netlify dashboard) restricts `script-src` without `'unsafe-eval'`. When Three.js tries to compile shaders:

1. `new Function()` is called internally by Three.js
2. CSP blocks the call and throws a runtime error
3. The error propagates up the React component tree
4. No error boundary exists to catch it → the entire page crashes to blank

### Why the WHOLE page goes blank (not just the 3D viz)

React's rendering model means an uncaught error in any component kills the entire tree above it up to the nearest error boundary. Since there was no error boundary around `SpacetimeVisualization`, the crash propagated all the way up through `InsideABlackHoleClient` → `ArtifactDetailWrapper` → the page layout, producing a blank screen.

### Why other pages are unaffected

Other pages don't import Three.js. The CSP `eval` restriction also affects Google Tag Manager and Microsoft Clarity (both use `eval` internally), but their scripts load asynchronously and fail silently — they don't crash the React tree.

## Fix

Three changes were made:

### 1. CSP pre-flight check + try-catch in `SpacetimeVisualization.jsx`

Before initializing Three.js, we test whether `eval` is available:

```javascript
// Guard: Three.js shader compilation may use new Function() which CSP can block.
try {
  new Function('return true')();
} catch {
  console.warn('[SpacetimeVisualization] CSP blocks eval — showing fallback.');
  setInitFailed(true);
  return;
}
```

The entire Three.js initialization is also wrapped in a `try-catch` so any runtime error (WebGL unavailable, GPU driver crash, etc.) sets `initFailed = true` and renders a **static SVG fallback** instead of crashing.

### 2. React Error Boundary in `InsideABlackHoleClient.jsx`

A `VisualizationErrorBoundary` class component wraps `<SpacetimeVisualization />`:

```jsx
<VisualizationErrorBoundary>
  <SpacetimeVisualization />
</VisualizationErrorBoundary>
```

If anything throws during render (edge cases the try-catch doesn't cover), the boundary catches it and shows a graceful fallback instead of killing the page.

### 3. CSP header override in `netlify.toml`

A page-specific header allows `'unsafe-eval'` only on the Three.js essay page:

```toml
[[headers]]
  for = "/essays/inside-a-black-hole/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://www.clarity.ms https://region1.google-analytics.com; frame-src 'self'"
```

> **Note:** If CSP is also set in the Netlify dashboard (Site settings → Headers), the `netlify.toml` headers take precedence for matching paths. If issues persist after deploy, check the dashboard too.

## Rule

**Any page that uses Three.js (or any library that requires `eval`/`new Function()`) needs:**

1. **A CSP header that includes `'unsafe-eval'` in `script-src`** — add a path-specific `[[headers]]` block in `netlify.toml`
2. **A try-catch around initialization** — WebGL can fail for many reasons (CSP, no GPU, driver bugs); always handle it
3. **A React Error Boundary** — wrapping any heavy/risky visualization component so a crash doesn't blank the entire page
4. **A static fallback** — an SVG or CSS-only version that communicates the same concept when the 3D version can't load

### Quick checklist for future Three.js pages

| Step | What | Where |
|---|---|---|
| 1 | Add `'unsafe-eval'` CSP header for the page path | `netlify.toml` |
| 2 | Test `new Function('return true')()` before Three.js init | Component `useEffect` |
| 3 | Wrap Three.js init in `try-catch`, set failure state | Component `useEffect` |
| 4 | Build a static SVG fallback for `initFailed` state | Component render |
| 5 | Wrap the dynamic import with `VisualizationErrorBoundary` | Parent component |

## CSP Whitelist Completeness (Critical!)

When adding a page-specific CSP, every other page has **NO CSP at all**, so all external scripts load freely. A page-specific CSP must whitelist ALL external scripts the site uses:

| Script | Domain | Purpose |
|---|---|---|
| Google Tag Manager | `https://www.googletagmanager.com` | Tag management |
| Google Analytics | `https://www.google-analytics.com` | Analytics |
| GA Region | `https://region1.google-analytics.com` | GA endpoint |
| Microsoft Clarity | `https://www.clarity.ms` AND `https://scripts.clarity.ms` | Session replay |
| Cloudflare Insights | `https://static.cloudflareinsights.com` | Web analytics |
| FullStory | `https://edge.fullstory.com` | Session replay |
| Ahrefs | `https://analytics.ahrefs.com` | SEO analytics |
| Cloudflare Challenges | `https://challenges.cloudflare.com` | Bot protection |

**Failure mode**: Missing any of these causes `Refused to load script` errors in console. If Cloudflare's challenge platform is blocked, bot-challenged users see a blank/stuck page.

## Files Changed

- `src/app/essays/science/inside-a-black-hole/SpacetimeVisualization.jsx` — CSP guard, try-catch, SVG fallback
- `src/app/essays/science/inside-a-black-hole/InsideABlackHoleClient.jsx` — Error boundary class + wrapping (both Three.js visualizations)
- `src/app/essays/science/inside-a-black-hole/PenroseVisualization.jsx` — CSP guard, try-catch, SVG fallback
- `netlify.toml` — Page-specific CSP header with `'unsafe-eval'` and full domain whitelist

## First Encountered

- **Date**: 2026-02-08
- **Page**: `/essays/inside-a-black-hole/` (later moved to `/essays/science/inside-a-black-hole/`)
- **Environment**: Production (Netlify + Cloudflare)
- **Library**: Three.js `^0.182.0`
- **Recurrence**: 2026-02-10 — CSP whitelist was incomplete, blocking Cloudflare/analytics scripts