# window is not defined in Next.js SSR

## Symptom

```
Error occurred prerendering page "/essays/the-geography-of-water-scarcity"
ReferenceError: window is not defined
```

Build fails during `next build` with `output: 'export'`.

## Root Cause

In JavaScript, there's a difference between a variable that **exists but is null/undefined** and a variable that **doesn't exist at all**.

`window` is a browser global. It does not exist in Node.js. Accessing an undeclared identifier is a `ReferenceError` — this happens *before* optional chaining (`?.`) can intervene.

```javascript
// ❌ Crashes in Node.js — `window` is not declared, ReferenceError thrown
window?.innerHeight || 800

// ✅ Safe — `typeof` can check undeclared variables without throwing
typeof window !== 'undefined' ? window.innerHeight : 800
```

### Why `"use client"` doesn't protect you

`"use client"` does **not** mean "skip server rendering." Next.js still pre-renders client components to static HTML on the server. The directive only marks the hydration boundary — meaning the component will become interactive on the client.

**Rendering flow:**
1. **Build time (Node.js)**: Next.js renders the component to HTML → any bare `window` reference → 💥
2. **Browser**: Component hydrates and `window` is available → would have worked fine

### Why `useEffect` is safe

`useEffect` **only runs in the browser**, never on the server. That's why `window` references inside `useEffect` callbacks don't crash:

```javascript
// ✅ Safe — useEffect is client-only
useEffect(() => {
  const height = window.innerHeight;  // Fine here
  window.addEventListener('scroll', handler, { passive: true });
  return () => window.removeEventListener('scroll', handler);
}, []);
```

## Fix

Guard any `window`, `document`, or `navigator` reference that runs at **render time** (in JSX, in component body, or in module scope):

```javascript
// Before (broken)
<div style={{ height: `${items.length * 300 + window?.innerHeight || 800}px` }}>

// After (fixed)
<div style={{ height: `${items.length * 300 + (typeof window !== 'undefined' ? window.innerHeight : 800)}px` }}>
```

## Rule

**Any `window`, `document`, or `navigator` access that is NOT inside one of these contexts needs a `typeof` guard:**

| Context | Safe? | Why |
|---|---|---|
| Inside `useEffect` | ✅ | Only runs on client |
| Inside event handlers (`onClick`, etc.) | ✅ | Only triggered by user interaction |
| Inside `useCallback` (called from effect/handler) | ✅ | Only called on client |
| In JSX / render return | ❌ | Runs on server during SSR |
| In component body (before return) | ❌ | Runs on server during SSR |
| At module scope (top of file) | ❌ | Runs on server during import |

## First Encountered

- **Date**: 2026-02-08
- **File**: `src/app/essays/the-geography-of-water-scarcity/GeographyOfWaterScarcityClient.jsx` (line 712)
- **Commit**: `d848e9c`
