# Fix Pattern: Scroll-Lock Unlock Transition

**Date:** 2024-12-10  
**Status:** Recurring Pattern  
**Severity:** High  
**Category:** UI-UX / Animation / Scroll  
**Affects:** All scroll-lock sections in scrollytelling/visual essay pages

---

## ⚡ Quick Fix (Copy-Paste)

If your scroll-locked content disappears abruptly when the lock releases:

### 1. Add `isComplete` state to your scroll-lock hook:

```typescript
const useScrollLock = (sectionHeight: number = 3) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [isComplete, setIsComplete] = useState(false); // ADD THIS
  
  useEffect(() => {
    const updateScrollState = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionTotalHeight = rect.height;
      const scrollableDistance = sectionTotalHeight - windowHeight;
      const scrolledIntoSection = -sectionTop;

      if (sectionTop <= 0 && scrolledIntoSection <= scrollableDistance) {
        // Currently in the scroll-lock zone
        setIsPinned(true);
        setIsComplete(false);
        const newProgress = Math.min(Math.max(scrolledIntoSection / scrollableDistance, 0), 1);
        setProgress(newProgress);
      } else if (sectionTop > 0) {
        // Above the section (haven't reached it yet)
        setIsPinned(false);
        setIsComplete(false);
        setProgress(0);
      } else {
        // Below the section (scrolled past it) - KEY FIX
        setIsPinned(false);
        setIsComplete(true);  // MARK AS COMPLETE
        setProgress(1);
      }
    };
    // ... rest of hook
  }, [sectionHeight]);

  return { containerRef, progress, isPinned, isComplete };
};
```

### 2. Apply three-state CSS classes:

```tsx
const getPinnedClass = () => {
  if (isPinned) return "is-pinned";
  if (isComplete) return "is-complete";
  return "";
};

return (
  <section ref={containerRef} style={{ height: "250vh" }}>
    <div className={`pinned-content ${getPinnedClass()}`}>
      {/* Your content */}
    </div>
  </section>
);
```

### 3. Add CSS for three states:

```css
/* Default: relative positioning before entering */
.pinned-content {
  position: relative;
  min-height: 100dvh;
  /* ... your styles */
}

/* During scroll-lock: fixed to viewport */
.pinned-content.is-pinned {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  transform: translateZ(0); /* Safari iOS */
}

/* After scroll-lock: anchor to bottom of container */
.pinned-content.is-complete {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
```

---

## Issue Description

### Symptoms
- Scroll-locked content **disappears abruptly** when user scrolls past
- Content "jumps" or "flashes" during unlock transition
- User loses visual continuity between scroll-lock and next section
- Feels like broken/janky experience

### Root Cause

The typical two-state scroll-lock implementation:

```css
/* BROKEN: Two-state system */
.pinned { position: relative; }
.pinned.is-pinned { position: fixed; top: 0; }
```

**Problem:** When `is-pinned` is removed:
1. Content snaps from `position: fixed` → `position: relative`
2. Relative positioning places content at **top** of its container
3. But user has scrolled **past** the container
4. Content is now above the viewport → **invisible**

### Visual Diagram

```
BROKEN (Two States):
┌─────────────────┐
│   VIEWPORT      │  ← User is here (scrolled past container)
├─────────────────┤
│                 │
│   Container     │
│   ┌─────────┐   │
│   │ Content │   │  ← Content jumps to TOP (invisible!)
│   └─────────┘   │
│                 │
│                 │
└─────────────────┘

FIXED (Three States):
┌─────────────────┐
│   Container     │
│                 │
│                 │
│   ┌─────────┐   │
│   │ Content │   │  ← Content anchored to BOTTOM (visible!)
├───┴─────────┴───┤
│   VIEWPORT      │  ← User is here
└─────────────────┘
```

---

## The Three-State Solution

| State | Class | Position | When Applied |
|-------|-------|----------|--------------|
| **Default** | (none) | `relative` | Before user scrolls into section |
| **Pinned** | `.is-pinned` | `fixed; top: 0` | During scroll-lock animation |
| **Complete** | `.is-complete` | `absolute; bottom: 0` | After user scrolls past |

### Why This Works

When scroll-lock completes and user scrolls past:
- Content transitions to `position: absolute; bottom: 0`
- This anchors content at the **bottom** of its container
- The bottom of the container aligns with where the viewport is
- Content remains visible during transition to next section

---

## Prevention Checklist

For **every scroll-lock implementation**:

- [ ] Hook returns `isComplete` state (not just `isPinned`)
- [ ] Component applies three CSS classes: default / `.is-pinned` / `.is-complete`
- [ ] CSS includes `.is-complete { position: absolute; bottom: 0; }`
- [ ] Test by scrolling through the section slowly AND quickly
- [ ] Test scroll direction reversal (scroll back up after completing)
- [ ] Test on Safari iOS (most sensitive to position changes)

---

## Implementation Examples

### ✅ Good: Hero with Typewriter Effect

```tsx
// EssayWritingClient.tsx
const TypewriterHero: React.FC = () => {
  const { containerRef, progress, isPinned, isComplete } = useScrollLock(2.5);
  
  const getPinnedClass = () => {
    if (isPinned) return "is-pinned";
    if (isComplete) return "is-complete";
    return "";
  };

  return (
    <section ref={containerRef} style={{ height: "250vh" }}>
      <div className={`hero-pinned ${getPinnedClass()}`}>
        {/* Typewriter content */}
      </div>
    </section>
  );
};
```

```css
/* how-to-write-an-essay.css */
.hero-pinned {
  position: relative;
  min-height: 100dvh;
}

.hero-pinned.is-pinned {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  transform: translateZ(0);
}

.hero-pinned.is-complete {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
```

### ✅ Good: ThinkingMachine Pattern

```css
/* thinking-machine.css */
.scroll-lock-pinned.is-pinned {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.scroll-lock-pinned.is-complete {
  position: absolute;
  bottom: 0;
}
```

---

## Debugging Steps

If scroll-lock content disappears on unlock:

1. **Check state transitions** in React DevTools
   - Does `isComplete` become `true` when `isPinned` becomes `false`?
   - Or does it jump straight to default state?

2. **Inspect computed styles** when content disappears
   - Is it `position: relative`? That's the bug.
   - Is it `position: absolute; bottom: 0`? Good.

3. **Check the container height**
   - Container must have explicit height (e.g., `height: 250vh`)
   - `absolute; bottom: 0` only works with sized parent

4. **Log scroll position states**
   ```typescript
   console.log({ sectionTop, scrolledIntoSection, scrollableDistance });
   console.log({ isPinned, isComplete, progress });
   ```

---

## Edge Cases

### Scroll Direction Reversal

User scrolls past (complete), then scrolls back up:
- `isComplete` should become `false`
- `isPinned` should become `true` again
- Animation should work in both directions

The hook handles this automatically via the three-way conditional.

### Fast Scrolling

User scrolls very quickly past the section:
- Content may briefly flash through states
- Use `will-change: transform` for GPU acceleration
- Consider `transition: none` during rapid state changes

### Safari iOS

- Always include `transform: translateZ(0)` on `.is-pinned`
- Safari has quirks with `position: fixed` inside scrolling containers
- Test on real device, not just simulator

---

## References

- `orchestration/skills/visual-essay-invocation/references/scroll-lock-patterns.md` — Scroll-lock animation patterns
- `orchestration/agents/immersive-scrolling-auditor.md` — Scroll-lock testing standards
- `orchestration/agents/immersive-experience-engineer.md` — Engineering implementation guide
- `src/app/essays/visual/the-thinking-machine/ThinkingMachineClient.tsx` — Reference implementation

---

## Related Patterns

- [PATTERN-global-css-hero-content-fix.md](./PATTERN-global-css-hero-content-fix.md) — CSS scoping for scroll-lock sections

---

*Last updated: December 2024*



