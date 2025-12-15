# Hero Section Hydration Pattern

## Problem: Hero Section Flash on First Load

Visual essay hero sections that depend on `IntersectionObserver` for visibility may display corrupted or invisible content on first load. A page refresh typically fixes the issue, but first-time visitors experience a flash of unstyled content (FOUC).

## Root Cause

The issue is a **hydration race condition** between React state and the browser's `IntersectionObserver`:

1. **Server renders** → Hero content starts with CSS `opacity: 0` (no `visible` class)
2. **Client hydrates** → `useEffect` runs and sets up `IntersectionObserver`
3. **Race condition** → `IntersectionObserver` may not immediately fire for elements **already in the viewport** on initial page load
4. **Result** → Hero remains invisible until observer fires (browser-dependent timing)

## The Anti-Pattern (Don't Do This)

```tsx
// ❌ BAD: Hero starts invisible, waits for IntersectionObserver
export default function EssayClient() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => new Set([...prev, entry.target.id]));
        }
      });
    }, { threshold: 0.2 });

    // This observes the hero, but observer may not fire immediately
    const sections = document.querySelectorAll('.hero-section, .chapter-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="hero" 
      className={`hero-section ${visibleSections.has('hero') ? 'visible' : ''}`}
    >
      {/* Hero content with opacity: 0 until 'visible' class is added */}
    </section>
  );
}
```

## The Correct Pattern

```tsx
// ✅ GOOD: Hero is pre-visible, animations trigger after hydration
export default function EssayClient() {
  // 1. Initialize with 'hero' already in the Set
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(['hero']));
  
  // 2. Track hydration completion
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => new Set([...prev, entry.target.id]));
        }
      });
    }, { threshold: 0.2 });

    // 3. Only observe non-hero sections
    const sections = document.querySelectorAll('.chapter-section, .closing-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="hero" 
      // 4. Use isMounted to prevent SSR/client mismatch while still showing content
      className={`hero-section ${isMounted && visibleSections.has('hero') ? 'visible' : ''}`}
    >
      {/* Hero content animates in after hydration */}
    </section>
  );
}
```

## Key Principles

1. **Pre-populate hero visibility**: Initialize `visibleSections` with `'hero'` already in the Set
2. **Track hydration with `isMounted`**: Prevents SSR/client class mismatch
3. **Exclude hero from observer**: Don't observe the hero section - it's always visible on load
4. **Use `isMounted` for class application**: `${isMounted && visibleSections.has('hero') ? 'visible' : ''}`

## Alternative: Pure CSS Animations

For hero sections that don't need JavaScript-controlled visibility, use CSS `@keyframes` with `animation-delay`:

```css
/* Hero uses CSS animation, not JS-controlled visibility */
.hero-title {
  opacity: 0;
  transform: translateY(30px);
  animation: hero-title-enter 1s ease-out 0.4s forwards;
}

@keyframes hero-title-enter {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

This approach doesn't depend on JavaScript state and runs immediately on page load.

## Essays Using This Pattern

The following essays were updated to use the correct hero hydration pattern:

- `the-word-essay/TheWordEssayClient.tsx`
- `the-tea-journey/TeaJourneyClient.tsx`
- `the-tea-journey-illustrated/TeaJourneyIllustratedClient.tsx`
- `who-invented-the-fork/WhoInventedTheForkClient.tsx`

Essays using CSS keyframe animations for hero (no fix needed):

- `the-history-of-burmese-cuisine/BurmeseCuisineClient.tsx`

## Checklist for New Visual Essays

When creating new visual essays with scroll-triggered animations:

- [ ] Does the hero section use `IntersectionObserver` for visibility?
  - If yes: Pre-initialize `visibleSections` with `'hero'`
  - If no (pure CSS animations): No action needed
- [ ] Add `isMounted` state to prevent hydration mismatch
- [ ] Exclude hero from `IntersectionObserver` query selector
- [ ] Test on first load (not just refresh) in incognito/private browsing

## Related Documentation

- [Next.js Hydration Errors](https://nextjs.org/docs/messages/react-hydration-error)
- [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)

