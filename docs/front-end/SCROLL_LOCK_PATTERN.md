# Scroll-Lock Pattern

## Overview

A standardized pattern for implementing scroll-locked sections in visual essays. The viewport pins in place while scroll input drives animation progress, then releases when the sequence completes.

**Origin**: Adapted from the Manhattan Project essay for simplicity and consistency.

## When to Use

Use scroll-lock for:
- **Hero sections** — Sequential text/statement reveals
- **Diagram animations** — Balance sheets, flow charts assembling step-by-step
- **Multi-phase reveals** — Any content that should animate based on scroll progress
- **Immersive moments** — Key narrative beats that deserve focused attention

Do NOT use for:
- Simple content sections (use normal scroll)
- Side-by-side comparisons (use sticky-scroll or grid layout)
- Long-form text (users should scroll normally)

## Core Pattern

### 1. The Hook

```tsx
interface ScrollLockState {
  containerRef: React.RefObject<HTMLDivElement>;
  progress: number;   // 0 to 1
  isPinned: boolean;  // true when viewport is locked
}

const useScrollLock = (sectionHeight: number = 3): ScrollLockState => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionTotalHeight = rect.height;

      const scrollableDistance = sectionTotalHeight - windowHeight;
      const scrolledIntoSection = -sectionTop;

      if (sectionTop <= 0 && scrolledIntoSection <= scrollableDistance) {
        setIsPinned(true);
        const newProgress = Math.min(
          Math.max(scrolledIntoSection / scrollableDistance, 0),
          1
        );
        setProgress(newProgress);
      } else {
        setIsPinned(false);
        setProgress(sectionTop > 0 ? 0 : 1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionHeight]);

  return { containerRef, progress, isPinned };
};
```

### 2. Phase Calculation

Use `useMemo` to derive discrete phases from continuous progress:

```tsx
const phase = useMemo(() => {
  if (progress < 0.25) return "phase1";
  if (progress < 0.50) return "phase2";
  if (progress < 0.75) return "phase3";
  if (progress < 0.95) return "phase4";
  return "complete";
}, [progress]);
```

### 3. Component Structure

```tsx
const ScrollLockSection: React.FC = () => {
  const { containerRef, progress, isPinned } = useScrollLock(2.5);
  
  const phase = useMemo(() => {
    // Phase calculation based on progress
  }, [progress]);
  
  return (
    <section 
      ref={containerRef}
      className={`scroll-lock-container phase-${phase}`}
      style={{ height: '250vh' }}  // Direct height, not multiplier
    >
      <div className={`pinned-content ${isPinned ? 'is-pinned' : ''}`}>
        {/* Animated content here */}
      </div>
    </section>
  );
};
```

### 4. CSS Structure

```css
.scroll-lock-container {
  position: relative;
  background: var(--background);
}

.pinned-content {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.pinned-content.is-pinned {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background: var(--background);  /* Must have background! */
}
```

## Examples

### Hero Section (Text Reveals)

```tsx
// Phase-based text reveals
const phase = useMemo(() => {
  if (heroProgress < 0.20) return "statement1";
  if (heroProgress < 0.35) return "statement2";
  if (heroProgress < 0.50) return "statement3";
  if (heroProgress < 0.65) return "statement4";
  if (heroProgress < 0.80) return "title";
  return "complete";
}, [heroProgress]);

// Render with visibility control
<p style={{
  opacity: phase === "statement1" ? 1 : 0,
  visibility: phase === "statement1" ? 'visible' : 'hidden',
  transition: 'opacity 0.5s ease-out',
}}>
  Most people think money is created by printing presses.
</p>
```

### Diagram Animation (Balance Sheet)

```tsx
// Phase-based diagram assembly
const phase = useMemo(() => {
  if (progress < 0.25) return "structure";   // Empty structure
  if (progress < 0.50) return "assets";      // Assets appear
  if (progress < 0.75) return "liabilities"; // Liabilities appear
  if (progress < 0.95) return "complete";    // Connection visible
  return "done";
}, [progress]);

// Animate elements based on phase
const assetsOpacity = phase === "structure" ? 0 : 1;
const liabilitiesOpacity = phase === "structure" || phase === "assets" ? 0 : 1;
const connectionOpacity = phase === "complete" || phase === "done" ? 1 : 0;

<div style={{
  opacity: assetsOpacity,
  transform: `translateX(${(1 - assetsOpacity) * -20}px)`,
  transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
}}>
  <span>Loans</span>
  <span>+$100,000</span>
</div>
```

## Height Guidelines

| Content Type | Height | Scroll Duration |
|--------------|--------|-----------------|
| Short (3-4 phases) | `200vh` | Quick reveal |
| Medium (5-6 phases) | `250vh` | Standard |
| Long (7+ phases) | `300-350vh` | Extended sequence |

The `sectionHeight` parameter in `useScrollLock(n)` is a multiplier: `2` = 200vh, `2.5` = 250vh, etc.

## Common Issues

### Content Not Visible on Load

**Cause**: First phase doesn't trigger at progress = 0

**Fix**: Ensure first phase condition uses `<` not `<=`:
```tsx
// ✅ GOOD
if (progress < 0.25) return "phase1";

// ❌ BAD - phase1 never triggers at 0
if (progress > 0 && progress < 0.25) return "phase1";
```

### Pinned Content Shows Through Next Section

**Cause**: Missing background on `.is-pinned` state

**Fix**: Add explicit background:
```css
.pinned-content.is-pinned {
  background: var(--vellum);  /* Must match page background */
}
```

### Overlapping Elements

**Cause**: Multiple elements visible simultaneously

**Fix**: Use `visibility: hidden` alongside `opacity: 0`:
```tsx
visibility: phase === "phase1" ? 'visible' : 'hidden',
```

### Janky Pin/Unpin Transitions

**Cause**: No transition on pinned state

**Fix**: Use GPU-accelerated properties only:
```css
.pinned-content {
  transition: opacity 0.3s ease-out;
  /* Don't transition position or transform for pin state */
}
```

## Essays Using This Pattern

| Essay | Sections Using Scroll-Lock |
|-------|---------------------------|
| `how-money-is-created` | Hero (text reveals), Stage 2 (balance sheet animation) |
| `the-manhattan-project` | Hero (Trinity sequence), Document reveals, Trinity chapter |

## Checklist

When implementing a scroll-lock section:

- [ ] Use `useScrollLock(height)` hook
- [ ] Set explicit height: `style={{ height: '250vh' }}`
- [ ] Add `is-pinned` class toggle for fixed positioning
- [ ] Add background to `.is-pinned` state
- [ ] Use `useMemo` for phase calculation
- [ ] First phase triggers at progress = 0
- [ ] Use `visibility: hidden` to prevent overlap
- [ ] Test on mobile (touch scroll)
- [ ] Test with `prefers-reduced-motion` 

## Related Documentation

- [Sticky Position Fixes](./STICKY_POSITION_FIXES.md) - **Critical** — Fixes for when sticky breaks (overflow, specificity)
- [Hero Hydration Pattern](./HERO_HYDRATION_PATTERN.md) - Fixing FOUC on first load
- [Scroll-Lock Patterns Reference](../../orchestration/skills/visual-essay-invocation/references/scroll-lock-patterns.md) - Pattern catalog

