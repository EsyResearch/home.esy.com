# Hero Scroll-Lock Pattern

## Overview

A standardized pattern for implementing scroll-locked hero sections in visual essays, adapted from the Manhattan Project pattern for simplicity and maintainability.

## Pattern: Manhattan Project Style

The Manhattan Project essay uses a clean, phase-based approach that's easier to understand and maintain than complex custom hooks with multiple states.

### Key Characteristics

1. **Simple `useScrollLock` hook** - Returns `containerRef`, `progress`, and `isPinned` only
2. **Phase-based rendering** - Uses `useMemo` to calculate current phase from scroll progress
3. **Direct height styling** - Sets height directly in style: `style={{ height: '250vh' }}`
4. **Clean conditional rendering** - `opacity: phase === "statement1" ? 1 : 0`
5. **No overlap protection** - Uses `visibility: hidden` when opacity is 0 to prevent rendering overlap

## Implementation

### Hook Pattern

```tsx
// Scroll-lock hook for pinned animation sections (Manhattan Project pattern)
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

      // Calculate progress through the scroll-lock section
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
        // Unpin when above or below the scroll-lock zone
        setIsPinned(false);
        setProgress(sectionTop > 0 ? 0 : 1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionHeight]);

  return { containerRef, progress, isPinned };
};
```

### Phase Calculation

```tsx
// Phase calculations for sequential statement reveals (Manhattan Project pattern)
const phase = useMemo(() => {
  if (heroProgress < 0.20) return "statement1";
  if (heroProgress < 0.35) return "statement2";
  if (heroProgress < 0.50) return "statement3";
  if (heroProgress < 0.65) return "statement4";
  if (heroProgress < 0.80) return "title";
  return "complete";
}, [heroProgress]);
```

### Statement Rendering

```tsx
{/* Statement 1: 0-20% */}
<p 
  className="hero-statement"
  style={{
    opacity: phase === "statement1" ? 1 : 0,
    visibility: phase === "statement1" ? 'visible' : 'hidden',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    transition: 'opacity 0.5s ease-out',
    pointerEvents: 'none',
    zIndex: 10,
  }}
>
  Most people think money is created by printing presses.
</p>
```

### CSS Structure

```css
.hero-section {
  position: relative;
  background: /* ... */;
}

.hero-pinned {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-pinned.is-pinned {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
```

## Phase Boundaries

Recommended phase boundaries for sequential text reveals:

- **Statement 1**: 0-20% (initial statement)
- **Statement 2**: 20-35% (response/refutation)
- **Statement 3**: 35-50% (explanation)
- **Statement 4**: 50-65% (conclusion)
- **Title**: 65-100% (final resolution)

Each phase should have ~15% scroll space for comfortable reading time.

## Common Issues & Solutions

### Issue: Overlapping Statements

**Symptom**: Multiple statements visible simultaneously, causing blur/overlap.

**Solution**: 
1. Use `visibility: hidden` when opacity is 0 (prevents rendering overlap)
2. Ensure phase boundaries don't overlap
3. Use clean phase checks: `phase === "statement1"` not ranges

```tsx
// ✅ GOOD
opacity: phase === "statement1" ? 1 : 0,
visibility: phase === "statement1" ? 'visible' : 'hidden',

// ❌ BAD (allows overlap)
opacity: heroProgress > 0.2 && heroProgress < 0.3 ? 1 : 0,
```

### Issue: First Statement Not Visible on Load

**Symptom**: Hero appears blank on initial page load.

**Solution**: 
1. Ensure first phase triggers at progress = 0
2. Check that `useScrollLock` initializes progress to 0
3. Verify container height is set correctly

```tsx
// ✅ GOOD - First phase starts at 0
if (heroProgress < 0.20) return "statement1";

// ❌ BAD - First phase starts later
if (heroProgress < 0.10) return "statement1"; // Too narrow
```

### Issue: Missing Closing Tags

**Symptom**: Syntax error: "JSX element 'div' has no corresponding closing tag"

**Solution**: Verify structure:
- `hero-section` (section tag)
  - `hero-pinned` (div)
    - `hero-content` (div)
      - Statements (p tags)
      - Title (div)
    - `</div>` closes hero-content
  - `</div>` closes hero-pinned
- `</section>` closes section

### Issue: Scroll-Lock Too Long/Short

**Symptom**: Hero section scroll duration feels wrong.

**Solution**: Adjust container height:
- Shorter: `style={{ height: '200vh' }}` (2x viewport)
- Longer: `style={{ height: '350vh' }}` (3.5x viewport)
- Default: `style={{ height: '250vh' }}` (2.5x viewport)

## Comparison: Complex vs Simple Pattern

### Complex Pattern (Avoid)

```tsx
// ❌ Complex with many states
const { containerRef, isLocked, progress, isComplete, skip } = useScrollLock(2.5);
// Requires reducedMotion handling
// Requires skip functionality
// Requires isComplete tracking
// Uses heightMultiplier approach
// Has guards for edge cases
```

### Simple Pattern (Prefer)

```tsx
// ✅ Simple with essential states only
const { containerRef, progress, isPinned } = useScrollLock(2.5);
// Direct phase calculation
// Clean conditional rendering
// Direct height styling
```

## Essays Using This Pattern

- `how-money-is-created/HowMoneyIsCreatedClient.tsx` - Refactored from complex pattern
- `the-manhattan-project/ManhattanProjectClient.tsx` - Original reference implementation

## Related Documentation

- [Sticky Position Fixes](./STICKY_POSITION_FIXES.md) - **Critical** — Fixes for when sticky breaks (overflow, specificity)
- [Hero Hydration Pattern](./HERO_HYDRATION_PATTERN.md) - Fixing FOUC on first load
- [Scroll-Lock Patterns Reference](../../orchestration/skills/visual-essay-invocation/references/scroll-lock-patterns.md)

