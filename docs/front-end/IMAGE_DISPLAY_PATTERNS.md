# Image Display Patterns

## Overview

This document describes the two image display modes used across Visual Essays and other image-heavy components. The pattern solves the common problem of displaying images with varying aspect ratios in fixed containers.

## The Problem

When displaying images in fixed-size containers:
- **Cover mode** (`object-fit: cover`) fills the container but crops edges
- **Contain mode** (`object-fit: contain`) shows the full image but leaves empty space

Neither is universally correct—the right choice depends on the image type.

## Solution: Two Display Modes

### Mode 1: Cover (Default)

**Use for:** Photographs, artwork, immersive imagery

```css
.reveal-image {
  object-fit: cover;
  object-position: center center;
}
```

**Behavior:**
- Fills the entire container
- Crops edges to maintain aspect ratio
- Best for photos where edge cropping is acceptable

**Examples:**
- Portrait photographs (Aristotle bust, chimpanzee)
- Artwork and manuscripts
- Nature photography

---

### Mode 2: Contain

**Use for:** Diagrams, illustrations, scientific imagery, historical documents

```css
.image-reveal.contain-image .reveal-image {
  object-fit: contain;
  padding: var(--space-sm);
}

.image-reveal.contain-image .image-reveal-inner {
  background: linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-elevated) 100%);
}
```

**Behavior:**
- Shows the complete image without cropping
- Adds subtle gradient background to fill empty space
- Small padding prevents image from touching edges

**Examples:**
- Scientific diagrams (DNA structure)
- Historical illustrations (Vesalius anatomy)
- Notebook sketches (Darwin's tree of life)
- Title pages and documents

---

## Implementation

### ImageReveal Component

The `ImageReveal` component accepts a `contain` prop to switch modes:

```tsx
interface ImageRevealProps {
  src: string;
  alt: string;
  caption?: string;
  era: 'ancient' | 'medieval' | 'renaissance' | 'enlightenment' | 'darwin' | 'modern';
  contain?: boolean; // For illustrations/diagrams that shouldn't be cropped
}

const ImageReveal: React.FC<ImageRevealProps> = ({ 
  src, alt, caption, era, contain = false 
}) => {
  return (
    <div className={`image-reveal era-${era} ${contain ? 'contain-image' : ''}`}>
      <div className="image-reveal-inner">
        <Image src={src} alt={alt} fill />
      </div>
      {caption && <p className="image-caption">{caption}</p>}
    </div>
  );
};
```

### Usage Examples

**Default (cover) - for photographs:**
```tsx
<ImageReveal
  src={IMAGES.modern.primate}
  alt="Portrait of a chimpanzee"
  caption="98% of our DNA is shared with chimpanzees"
  era="modern"
/>
```

**Contain mode - for illustrations:**
```tsx
<ImageReveal
  src={IMAGES.modern.dna}
  alt="DNA double helix structure diagram"
  caption="DNA sequencing reveals the molecular definition of 'animal'"
  era="modern"
  contain  // ← Shows full diagram without cropping
/>
```

---

## FigureProfile Images

For profile cards with images (used for historical figures), a similar pattern applies:

```css
.figure-image-wrapper {
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: 8px;
  background: linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-elevated) 100%);
}

.figure-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
  padding: var(--space-xs);
}
```

FigureProfile always uses contain mode because:
- Portrait images may have varying aspect ratios
- Historical illustrations shouldn't be cropped
- The 4:5 container provides a consistent card layout

---

## Decision Guide

| Image Type | Mode | Reasoning |
|------------|------|-----------|
| Portrait photograph | Cover | Edge cropping acceptable |
| Landscape photograph | Cover | Fills container attractively |
| Scientific diagram | Contain | Must show complete information |
| Historical illustration | Contain | Artistic integrity preserved |
| Manuscript page | Contain | Text must be readable |
| Notebook sketch | Contain | Full context important |
| Artwork/painting | Cover | Cropping often acceptable |
| Logo/icon | Contain | Must show complete mark |

---

## CSS Variables Used

```css
--bg-surface: /* Slightly elevated background */
--bg-elevated: /* More elevated background */
--space-sm: /* Small spacing unit */
--space-xs: /* Extra-small spacing unit */
```

---

## Related Patterns

- [Visual Essay Metadata Pattern](../VISUAL_ESSAY_METADATA_PATTERN.md)
- [Design System](../DESIGN_SYSTEM.md)
- [Responsive Design System](../RESPONSIVE_DESIGN_SYSTEM.md)

---

## Changelog

- **December 2024**: Initial implementation in Visual Essays
- Pattern extracted from `/src/app/essays/visual/the-word-animal/`
