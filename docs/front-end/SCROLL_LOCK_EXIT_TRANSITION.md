# Scroll-Lock Exit Transition

## The Problem

When a scroll-lock sequence ends, the pinned content **abruptly disappears** instead of scrolling up naturally with the page.

### What Happens

1. During scroll-lock: `isPinned = true` → content has `position: fixed`
2. Scroll-lock ends: `isPinned = false` → content switches to `position: relative`
3. Content **jumps/vanishes** because it's now positioned at the top of its container (off-screen)

### Visual Symptom

The user scrolls through a scroll-lock sequence. When it completes, instead of the content scrolling up and out of view naturally, it simply **blinks out of existence**. This is jarring and breaks immersion.

## The Solution

Add an **exit state** that positions the content absolutely at the exact "unpin point" — the scroll position where the lock released. This lets it scroll away naturally.

### State Management

```tsx
const [isPinned, setIsPinned] = useState(false);
const [isExiting, setIsExiting] = useState(false);
const [unpinPoint, setUnpinPoint] = useState(0);
```

### Three-State Logic

```tsx
useEffect(() => {
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const containerHeight = container.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = containerHeight - viewportHeight;
    const scrolledIntoSection = -rect.top;

    if (rect.top <= 0 && scrolledIntoSection <= scrollableDistance) {
      // STATE 1: Currently in scroll-lock zone
      setIsPinned(true);
      setIsExiting(false);
      const progress = Math.min(100, Math.max(0, (scrolledIntoSection / scrollableDistance) * 100));
      setScrollProgress(progress);
    } else if (rect.top > 0) {
      // STATE 2: Before scroll-lock zone (haven't entered yet)
      setIsPinned(false);
      setIsExiting(false);
      setScrollProgress(0);
    } else {
      // STATE 3: After scroll-lock zone - SMOOTH EXIT
      setIsPinned(false);
      setIsExiting(true);
      setScrollProgress(100);
      setUnpinPoint(scrollableDistance); // Store where to position content
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

### JSX with Exit Positioning

```tsx
return (
  <div 
    ref={containerRef} 
    className="scroll-lock-container" 
    style={{ height: "500vh", position: "relative" }}
  >
    <div 
      className={`pinned-content ${isPinned ? "is-pinned" : ""} ${isExiting ? "is-exiting" : ""}`}
      style={isExiting ? { 
        position: "absolute",
        top: `${unpinPoint}px`,  // Positioned at exact unpin point
        left: 0,
        right: 0,
        height: "100vh",
      } : undefined}
    >
      {/* Content */}
    </div>
  </div>
);
```

### CSS

```css
.scroll-lock-container {
  position: relative;  /* Required for absolute exit positioning */
}

.pinned-content {
  position: relative;
  height: 100vh;
  width: 100%;
}

.pinned-content.is-pinned {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: var(--background);
}

/* Exit state uses inline styles for precise positioning */
.pinned-content.is-exiting {
  /* position: absolute set via inline style */
  /* top: unpinPoint set via inline style */
}
```

## How It Works

| State | `isPinned` | `isExiting` | Position | Behavior |
|-------|------------|-------------|----------|----------|
| Before | `false` | `false` | `relative` | Content in normal flow, off-screen below |
| During | `true` | `false` | `fixed` | Content locked to viewport center |
| After | `false` | `true` | `absolute` | Content at unpin point, scrolls naturally |

### The Key Insight

When exiting, `unpinPoint = scrollableDistance` gives us the exact pixel position within the container where the scroll-lock ended. By positioning the content absolutely at this point, it appears in the **same location** it was when pinned, but now flows with the document as the user continues scrolling.

## Complete Hook Implementation

```tsx
interface ScrollLockState {
  containerRef: React.RefObject<HTMLDivElement>;
  progress: number;
  isPinned: boolean;
  isExiting: boolean;
  unpinPoint: number;
}

const useScrollLockWithExit = (heightVh: number = 300): ScrollLockState => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [unpinPoint, setUnpinPoint] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = containerHeight - viewportHeight;
      const scrolledIntoSection = -rect.top;

      if (rect.top <= 0 && scrolledIntoSection <= scrollableDistance) {
        setIsPinned(true);
        setIsExiting(false);
        setProgress(Math.min(1, Math.max(0, scrolledIntoSection / scrollableDistance)));
      } else if (rect.top > 0) {
        setIsPinned(false);
        setIsExiting(false);
        setProgress(0);
      } else {
        setIsPinned(false);
        setIsExiting(true);
        setProgress(1);
        setUnpinPoint(scrollableDistance);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { containerRef, progress, isPinned, isExiting, unpinPoint };
};
```

## Usage

```tsx
const MyScrollLockSection: React.FC = () => {
  const { containerRef, progress, isPinned, isExiting, unpinPoint } = useScrollLockWithExit(500);

  return (
    <section 
      ref={containerRef}
      style={{ height: "500vh", position: "relative" }}
    >
      <div 
        className={`pinned-content ${isPinned ? "is-pinned" : ""}`}
        style={isExiting ? {
          position: "absolute",
          top: `${unpinPoint}px`,
          left: 0,
          right: 0,
          height: "100vh",
        } : undefined}
      >
        {/* Animated content based on progress */}
      </div>
    </section>
  );
};
```

## Debugging

### Content Still Disappearing

Check that `position: relative` is set on the container:
```tsx
style={{ height: "500vh", position: "relative" }}  // ← Required!
```

### Content Jumps on Exit

Ensure `unpinPoint` is being set correctly. Log it:
```tsx
console.log('Exit state:', { isExiting, unpinPoint, scrollableDistance });
```

### Content Appears Twice

Make sure you're not rendering the content both in the pinned and exit states. The same element should handle all three states.

## Essays Using This Pattern

| Essay | Component |
|-------|-----------|
| `the-origin-of-toy` | `ShakespeareShuffle` |

## Related Documentation

- [Scroll-Lock Pattern](./SCROLL_LOCK_PATTERN.md) - Core scroll-lock implementation
- [Sticky Position Fixes](./STICKY_POSITION_FIXES.md) - When sticky/fixed positioning breaks
- [Hero Scroll-Lock Pattern](./HERO_SCROLL_LOCK_PATTERN.md) - Specific pattern for hero sections

