# Scroll-Lock Content Layout

## The Problem

Content inside scroll-lock sections **overlaps or positions incorrectly** when:
1. Using radial/absolute positioning for multiple elements
2. Centering content vertically with `justify-content: center`
3. Fixed heights don't accommodate growing content

### Common Symptoms

- Elements stack on top of each other instead of spreading out
- Text overlaps with cards/diagrams
- Content gets cut off or extends beyond viewport
- Animations look chaotic instead of choreographed

## Root Causes & Solutions

### 1. Radial Positioning Overlap

**Problem:** Using trigonometric formulas to position elements in a radial pattern causes overlap when elements have width/height.

```tsx
// ❌ BAD - Radial positioning causes overlap
const angle = (index / items.length) * 180 - 90;
const x = Math.cos((angle * Math.PI) / 180) * distance;
const y = Math.sin((angle * Math.PI) / 180) * distance;

return (
  <div style={{ 
    position: 'absolute',
    transform: `translate(${x}px, ${y}px)` 
  }}>
    {/* Content overlaps because cards have width */}
  </div>
);
```

**Solution:** Use grid-based rows organized by logical groups.

```tsx
// ✅ GOOD - Grid rows prevent overlap
{[1, 2, 3].map(groupNum => {
  const groupItems = items.filter(item => item.group === groupNum);
  
  return (
    <div key={groupNum} className={`row row-${groupNum}`}>
      {groupItems.map(item => (
        <div key={item.id} className="item">
          {/* Content flows naturally in rows */}
        </div>
      ))}
    </div>
  );
})}
```

```css
.row {
  display: flex;
  justify-content: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
}
```

### 2. Vertical Centering Overlap

**Problem:** Using `justify-content: center` on pinned-content causes all elements to cluster in the viewport center, leading to overlap.

```css
/* ❌ BAD - Centers everything, causing overlap */
.scroll-lock .pinned-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  /* This causes overlap! */
  height: 100vh;
}
```

**Solution:** Use `flex-start` and let content flow naturally from top.

```css
/* ✅ GOOD - Content flows from top, no overlap */
.scroll-lock .pinned-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;  /* Flow from top */
  padding-top: var(--space-md);
  min-height: 100vh;
  overflow-y: auto;  /* Allow scroll if content exceeds viewport */
}
```

### 3. Fixed Height Overflow

**Problem:** Fixed heights on containers don't accommodate variable content.

```css
/* ❌ BAD - Fixed height clips content */
.tree-container {
  height: 400px;  /* What if tree has 4 rows? */
}
```

**Solution:** Remove fixed heights or use `min-height`.

```css
/* ✅ GOOD - Container grows with content */
.tree-container {
  min-height: 300px;  /* Minimum, but can grow */
  /* OR simply omit height and let it auto-size */
}
```

### 4. Conclusion/Text Positioning

**Problem:** Conclusion text appears in the middle of content instead of at the bottom.

```css
/* ❌ BAD - Conclusion floats with centered content */
.conclusion {
  margin-top: var(--space-lg);
  /* With justify-content: center, this doesn't push to bottom */
}
```

**Solution:** Use `margin-top: auto` to push to bottom of flex container.

```css
/* ✅ GOOD - Conclusion pushed to bottom */
.conclusion {
  margin-top: auto;  /* Pushes to bottom of flex container */
  padding: var(--space-lg);
  flex-shrink: 0;  /* Don't compress */
}
```

## Complete Pattern: Hierarchical Tree Layout

For tree/branch diagrams that grow during scroll-lock:

### JSX Structure

```tsx
const TreeDiagram: React.FC = () => {
  const items = [
    { word: "item 1", group: 1 },
    { word: "item 2", group: 1 },
    { word: "item 3", group: 2 },
    // ...
  ];

  return (
    <div className="scroll-lock-container" style={{ height: "450vh" }}>
      <div className="pinned-content">
        {/* Header */}
        <div className="header">
          <span>Section Title</span>
        </div>

        {/* Root */}
        <div className="root-node">
          ROOT
        </div>

        {/* Branches organized by row */}
        <div className="branches-grid">
          {[1, 2, 3].map(groupNum => {
            const groupItems = items.filter(i => i.group === groupNum);
            const groupStart = groupNum === 1 ? 25 : groupNum === 2 ? 50 : 70;
            
            return (
              <div key={groupNum} className={`branch-row row-${groupNum}`}>
                {groupItems.map((item, idx) => {
                  const itemStart = groupStart + idx * 8;
                  const opacity = scrollProgress >= itemStart 
                    ? Math.min(1, (scrollProgress - itemStart) / 12) 
                    : 0;
                  
                  return (
                    <div
                      key={item.word}
                      className="branch-item"
                      style={{
                        opacity,
                        transform: `scale(${0.8 + opacity * 0.2})`,
                        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                      }}
                    >
                      {item.word}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Conclusion - pushed to bottom */}
        {showConclusion && (
          <div className="conclusion">
            <p>"Closing quote here."</p>
          </div>
        )}
      </div>
    </div>
  );
};
```

### CSS Structure

```css
.scroll-lock-container {
  position: relative;
}

.pinned-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;  /* Not center! */
  padding: var(--space-md);
  min-height: 100vh;
  overflow-y: auto;
}

.pinned-content.is-pinned {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  z-index: 50;
  background: var(--background);
}

/* Grid-based branches */
.branches-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  width: 100%;
}

.branch-row {
  display: flex;
  justify-content: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.branch-item {
  /* No position: absolute! */
  padding: var(--space-sm);
  background: var(--card-bg);
  border-radius: 8px;
}

/* Conclusion at bottom */
.conclusion {
  margin-top: auto;
  padding: var(--space-lg);
  text-align: center;
}

/* Mobile: Stack vertically */
@media (max-width: 768px) {
  .branch-row {
    flex-direction: column;
    align-items: center;
  }
}
```

## Checklist

When building scroll-lock content layouts:

- [ ] Use `justify-content: flex-start` (not `center`) on pinned-content
- [ ] Organize elements in rows/groups, not radial positions
- [ ] Remove fixed heights that might clip content
- [ ] Use `margin-top: auto` for bottom-positioned elements
- [ ] Add `flex-shrink: 0` to elements that shouldn't compress
- [ ] Test with all phases visible to check for overlap
- [ ] Add `overflow-y: auto` as safety valve

## Essays Using This Pattern

| Essay | Component |
|-------|-----------|
| `the-origin-of-toy` | `WordBranches` (tree diagram) |

## Related Documentation

- [Scroll-Lock Pattern](./SCROLL_LOCK_PATTERN.md) - Core scroll-lock implementation
- [Scroll-Lock Exit Transition](./SCROLL_LOCK_EXIT_TRANSITION.md) - Smooth exit when scroll-lock ends
- [Sticky Position Fixes](./STICKY_POSITION_FIXES.md) - When sticky/fixed positioning breaks

