# Pattern: Base-Visible Animate-Class Animations

## Overview

A robust animation pattern for Next.js pages where **content is visible by default** and **animations are triggered opt-in via a CSS class**. This solves issues with animations not playing during client-side navigation.

---

## Why This Pattern?

### The Problem with Traditional Approach

```css
/* Traditional: Start invisible, animate to visible */
.hero-title {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
}

.hero-section.visible .hero-title {
  opacity: 1;
  transform: translateY(0);
}
```

**Issues:**
- Content invisible until JS runs
- Client-side navigation may not trigger `visible` class correctly
- Users see blank content if JS is slow or fails
- Hydration timing issues in Next.js

### The Base-Visible Pattern

```css
/* Base state: VISIBLE */
.hero-title {
  opacity: 1;
  transform: none;
}

/* Animation only when .animate class is present */
.hero-section.animate .hero-title {
  animation: fadeIn 0.8s ease-out both;
}
```

**Benefits:**
- ✅ Content always visible (progressive enhancement)
- ✅ Works with client-side navigation
- ✅ No flash of invisible content
- ✅ Graceful degradation if JS fails
- ✅ Easy to disable for reduced motion

---

## Implementation

### 1. React Component Setup

```tsx
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function MyVisualEssay() {
  const pathname = usePathname();
  const [animate, setAnimate] = useState(false);

  // Trigger animation on mount AND on client-side navigation
  useEffect(() => {
    // Reset first (important for re-navigation to same page)
    setAnimate(false);
    
    // Double requestAnimationFrame ensures:
    // 1. First frame: DOM updates with animate=false
    // 2. Second frame: CSS has processed, safe to animate
    let frame2: number;
    const frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => {
        setAnimate(true);
      });
    });
    
    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
    };
  }, [pathname]); // Re-run on route change

  return (
    <section className={`hero-section ${animate ? 'animate' : ''}`}>
      <h1 className="my-title">Title</h1>
      <p className="my-subtitle">Subtitle</p>
    </section>
  );
}
```

### 2. CSS Structure

```css
/* ==================== BASE STATE: VISIBLE ==================== */

.my-title {
  font-size: 4rem;
  color: var(--primary-color);
  opacity: 1;           /* Visible by default */
  transform: none;      /* No transform by default */
}

.my-subtitle {
  font-size: 1.5rem;
  opacity: 1;
  transform: none;
}

/* ==================== ANIMATIONS (opt-in) ==================== */

/* Only apply when .animate class is present on parent */
.hero-section.animate .my-title {
  animation: titleAppear 0.8s ease-out 0.2s both;
}

.hero-section.animate .my-subtitle {
  animation: fadeIn 0.6s ease-out 0.5s both;
}

/* ==================== KEYFRAMES ==================== */

@keyframes titleAppear {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ==================== REDUCED MOTION ==================== */

@media (prefers-reduced-motion: reduce) {
  .hero-section.animate .my-title,
  .hero-section.animate .my-subtitle {
    animation: none;
  }
}
```

---

## Key Principles

### 1. Base State = Final State
The default CSS (without `.animate`) should show the element in its final, visible position.

### 2. Animations Are Additive
The `.animate` class adds animation behavior, it doesn't define visibility.

### 3. Use `usePathname()` for Re-Triggers
This ensures animations replay when navigating back to the page via client-side routing.

### 4. Double `requestAnimationFrame`
This browser-native timing ensures the DOM has actually updated before adding the animate class.

### 5. Staggered Delays via CSS
Use `animation-delay` in CSS, not JavaScript timeouts:

```css
.hero-section.animate .element-1 { animation-delay: 0.1s; }
.hero-section.animate .element-2 { animation-delay: 0.3s; }
.hero-section.animate .element-3 { animation-delay: 0.5s; }
```

---

## Comparison: Before vs After

| Aspect | Traditional (visible class) | Base-Visible Pattern |
|--------|----------------------------|---------------------|
| Initial state | Invisible | Visible |
| JS dependency | Required for visibility | Only for animation |
| Client navigation | Often breaks | Works reliably |
| Reduced motion | Needs extra handling | Built-in support |
| Progressive enhancement | No | Yes |

---

## When to Use This Pattern

✅ **Use for:**
- Hero sections
- Page entrance animations
- Any "above the fold" content
- Visual essay introductions

❌ **Don't use for:**
- Scroll-triggered animations (use Intersection Observer)
- Interactive animations (use state-based transitions)
- Micro-interactions (use :hover/:focus)

---

## Applied Examples

| Essay | File | Animation Elements |
|-------|------|-------------------|
| The Word "Essay" | `the-word-essay/` | Title scale-in, etymology chain stagger, subtitle/tagline fade |
| SLANG | `the-word-slang-typographic/` | Letter-by-letter title, tagline fade, subtitle fade |

---

## Quality Assessment

This pattern is considered **high quality** because it:

1. **Follows progressive enhancement** - Works without JS
2. **Respects accessibility** - Easy reduced motion support
3. **Handles edge cases** - Client navigation, re-navigation, hydration
4. **Is maintainable** - Clear separation of concerns
5. **Is performant** - CSS animations, no layout thrashing
6. **Is predictable** - Content never unexpectedly invisible

---

## Related Documentation

- [PATTERN-global-css-hero-invisible-title-client-navigation.md](./PATTERN-global-css-hero-invisible-title-client-navigation.md) - Why unique class names matter
- [PATTERN-global-css-hero-content-fix.md](./PATTERN-global-css-hero-content-fix.md) - Hero content alignment fixes
