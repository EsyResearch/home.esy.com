# Visual Essay Animation Taxonomy

This reference documents the complete taxonomy of animation patterns used in Esy visual essays. Use this alongside `scroll-lock-patterns.md` for comprehensive animation guidance.

---

## Status Legend

| Icon | Meaning |
|------|---------|
| ✅ | **Implemented** — In production across multiple essays |
| 🟡 | **Partial** — Implemented in some essays or partially complete |
| 📋 | **Spec Only** — Defined in design specs, not yet coded |

---

## Overview

Visual essay animations fall into **seven categories**:

| Category | Purpose | Scroll-Driven? | Status |
|----------|---------|----------------|--------|
| **Scroll-Lock Patterns** | Major narrative sequences | Yes (viewport locks) | ✅ |
| **Choreography** | Staged animation phases | Yes (percentage-based) | ✅ |
| **Typography Morphs** | Word/letterform transformations | Yes or triggered | 🟡 |
| **Micro-interactions** | Polish and feedback | Mixed | ✅ |
| **Transition Treatments** | Era/section boundaries | Yes | 🟡 |
| **Parallax Depth** | Layered spatial depth | Yes | 📋 |
| **Ambient/Atmospheric** | Background motion | Continuous | 🟡 |

---

## 1. Scroll-Lock Patterns ✅

**Definition**: Viewport locks in place; scroll input drives animation progress (0-100%).

**See**: `scroll-lock-patterns.md` for full pattern library.

**Core Patterns**:
- The Reveal
- The Pan
- The Zoom
- The Comparison
- The Sequence
- The Assembly
- The Conversation
- The Transformation
- The Timeline

**When to Use**: Major narrative moments that deserve focused attention—key reveals, complex visualizations, dramatic transformations.

---

## 2. Choreography (Percentage-Based Staging) ✅

**Definition**: Breaking a scroll-driven sequence into distinct phases with specific visual states at percentage breakpoints.

**Format**:
```
0-20%:   [Initial state description]
20-40%:  [Second phase description]
40-60%:  [Third phase description]
60-80%:  [Fourth phase description]
80-100%: [Final state description]
```

**Example (Hero Word Transformation)**:
```
0-15%:   Darkness. Word emerges soft white on black.
15-30%:  Word flickers, hairline cracks appear.
30-50%:  Word fragments, older letterform emerges beneath.
50-70%:  Annotations appear around transformed word.
70-85%:  Annotations swirl, then settle into order.
85-100%: Title card emerges, scroll-lock releases.
```

**Best Practices**:
- 5 stages is typical (can range 3-7)
- Each stage should have distinct visual identity
- Transitions between stages: 200-400ms
- Document what triggers each stage transition

**When to Use**: Any scroll-driven sequence with multiple distinct phases—heroes, scroll-locks, era transitions.

---

## 3. Typography Morphs / Typography Evolution 🟡

**Definition**: Word-specific animations where **letterforms transform**—font changes, deconstruction, reconstruction.

**Implementation Status**: Hero morphs work in TOY and Pussy essays. Variable font morphing and script transformations not yet implemented.

### Sub-Types

| Type | Description | Example |
|------|-------------|---------|
| **Font Morph** | Word transitions between typefaces | "ESSAY" in Garamond → Caslon → Gill Sans |
| **Era Evolution** | Typography reflects historical period | Medieval blackletter → Renaissance humanist → Modern sans |
| **Deconstruction** | Word breaks into components | "ESSAY" → E-S-S-A-Y separated |
| **Reconstruction** | Components reassemble | Letter fragments → unified word |
| **Script Transform** | Writing system changes | 漢 through oracle bone → seal → regular script |

### Implementation

**CSS Approach (Variable Fonts)**:
```css
.word-morph {
  transition: font-variation-settings 600ms ease-in-out;
}
```

**JavaScript Approach (Font Swap)**:
```javascript
// At scroll threshold, swap font-family with crossfade
element.style.fontFamily = nextEraFont;
element.style.transition = 'opacity 300ms';
```

### Timing Guidelines

| Morph Type | Duration | Easing |
|------------|----------|--------|
| Font family swap | 400-600ms | ease-in-out |
| Letter separation | 300-500ms | ease-out |
| Letter reassembly | 400-600ms | ease-out |
| Continuous morph | tied to scroll | linear |

**When to Use**: Etymology essays, word-focused narratives, era transitions where typography carries meaning.

---

## 4. Micro-interactions ✅

**Definition**: Small, subtle effects that add polish, provide feedback, or enhance immersion.

### Sub-Types

| Type | Description | Trigger |
|------|-------------|---------|
| **Flicker** | Brief opacity/visibility oscillation | Scroll position, timer |
| **Crack/Fracture** | Visual damage appearing | Scroll threshold |
| **Glow/Pulse** | Luminosity variation | Continuous, hover |
| **Shimmer** | Moving highlight across surface | Scroll, hover |
| **Bounce** | Elastic settle after motion | Animation end |
| **Hover Reveal** | Content appears on hover | Mouse enter |
| **Velocity Response** | Effect intensity tied to scroll speed | Scroll velocity |

### Implementation Examples

**Flicker Effect**:
```css
@keyframes flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.flickering {
  animation: flicker 0.15s infinite alternate;
}
```

**Crack Overlay**:
```css
.crack-overlay {
  background-image: 
    linear-gradient(47deg, transparent 42%, rgba(255,255,255,0.12) 45%, transparent 48%);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.cracking .crack-overlay {
  opacity: 1;
}
```

**Scroll Velocity Response**:
```javascript
let lastScroll = 0;
const velocity = Math.abs(window.scrollY - lastScroll);
element.style.setProperty('--scroll-velocity', velocity);
lastScroll = window.scrollY;
```

### Timing Guidelines

| Micro-interaction | Duration | Notes |
|-------------------|----------|-------|
| Flicker cycle | 100-200ms | Fast, unsettling |
| Crack appearance | 300-500ms | Gradual reveal |
| Glow pulse | 1-2s | Slow, ambient |
| Hover reveal | 200-300ms | Responsive |
| Bounce settle | 250-400ms | Use bounce easing |

**When to Use**: Throughout—these add the "craft" feeling. Use sparingly; too many creates visual noise.

---

## 5. Transition Treatments 🟡

**Definition**: Visual changes that mark **era or section boundaries**—the aesthetic shift between historical periods or narrative chapters.

**Implementation Status**: Era-specific CSS styling (colors, filters, fonts) applied in TOY essay. Animated crossfades between eras not consistently implemented.

### Components

| Component | What Changes |
|-----------|--------------|
| **Color Palette** | Background, accent, text colors shift |
| **Texture** | Paper grain, noise, material overlays |
| **Processing** | Sepia, contrast, saturation, grain |
| **Typography** | Font family, weight, spacing |
| **Atmosphere** | Light quality, warmth/coolness |

### Era Treatment Examples

**Medieval → Renaissance**:
```css
/* Medieval */
--era-bg: #1a150e;
--era-text: rgba(247, 243, 235, 0.85);
filter: sepia(0.3) contrast(1.05);
font-family: 'Cloister Black', serif;

/* Renaissance */
--era-bg: #1c1714;
--era-text: rgba(247, 243, 235, 0.9);
filter: saturate(1.1) contrast(1.02);
font-family: 'EB Garamond', serif;
```

### Transition Mechanics

| Approach | Best For | Duration |
|----------|----------|----------|
| **Crossfade** | Subtle shifts | 600-800ms |
| **Scroll-driven** | Gradual change | Tied to scroll |
| **Hard cut** | Dramatic contrast | Instant |
| **Wipe/reveal** | Visual metaphor | 400-600ms |

**When to Use**: At chapter/era boundaries. The transition should feel intentional—viewers should sense "we've entered a new period."

---

## 6. Parallax Depth System 📋

**Definition**: Multiple visual layers moving at different scroll speeds, creating perceived depth.

**Implementation Status**: 5-layer system fully specified in design docs. Not yet implemented in any production essay. Candidate for next implementation phase.

### Standard Layer Structure

| Layer | Speed | Content | Z-Index |
|-------|-------|---------|---------|
| **Background** | 0.2x | Textures, atmosphere | 0 |
| **Mid-ground** | 0.5x | Context, environment | 1 |
| **Subject** | 1.0x | Primary content (reference) | 2 |
| **Overlay** | 1.2-1.3x | Typography, annotations | 3 |
| **Ambient** | 1.5-1.6x | Particles, fragments | 4 |

### Implementation

```css
.parallax-container {
  perspective: 1px;
  overflow-y: scroll;
}

.layer-background {
  transform: translateZ(-0.8px) scale(1.8);
}

.layer-midground {
  transform: translateZ(-0.5px) scale(1.5);
}

.layer-subject {
  transform: translateZ(0);
}

.layer-overlay {
  transform: translateZ(0.2px) scale(0.8);
}
```

**Or JavaScript approach**:
```javascript
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  background.style.transform = `translateY(${scrollY * 0.2}px)`;
  midground.style.transform = `translateY(${scrollY * 0.5}px)`;
  overlay.style.transform = `translateY(${scrollY * 1.3}px)`;
});
```

### Mobile Considerations

- Reduce or disable parallax on mobile (performance)
- Flatten to 2-3 layers maximum
- Consider `prefers-reduced-motion`

**When to Use**: Atmospheric sections, hero backgrounds, quote monuments—anywhere depth enhances immersion without distracting from content.

---

## 7. Ambient / Atmospheric Animations 🟡

**Definition**: Continuous background motion that creates atmosphere without demanding attention.

**Implementation Status**: Swirl/orbit effects work in TOY hero. Floating particles and dust motes specified but not implemented.

### Sub-Types

| Type | Description | Movement |
|------|-------------|----------|
| **Floating Particles** | Dust motes, ink spots, fragments | Slow drift |
| **Swirl/Orbit** | Elements rotating around center | Circular path |
| **Drift** | Slow lateral movement | Linear, slow |
| **Pulse/Breathe** | Gentle scale oscillation | In-out cycle |
| **Shimmer** | Moving light across surface | Wave pattern |
| **Ink Flow** | Organic, fluid motion | Randomized |

### Implementation Examples

**Floating Particles**:
```css
@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-15px) translateX(5px); }
  50% { transform: translateY(-25px) translateX(-5px); }
  75% { transform: translateY(-10px) translateX(8px); }
}

.particle {
  animation: float 8s ease-in-out infinite;
  opacity: 0.3;
}

.particle:nth-child(2) { animation-delay: -2s; }
.particle:nth-child(3) { animation-delay: -4s; }
```

**Swirl Effect**:
```css
@keyframes swirl {
  0% { transform: rotate(0deg) translateX(50px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
}

.swirling-element {
  animation: swirl 20s linear infinite;
}
```

**Annotation Swirl (from TOY hero)**:
```javascript
// Multiple annotations orbit and settle
const swirlRotation = (scrollProgress - 70) * 8; // degrees
const swirlScale = 1 + (scrollProgress - 70) * 0.01;

container.style.transform = `rotate(${swirlRotation}deg) scale(${swirlScale})`;
```

### Timing Guidelines

| Effect | Duration | Notes |
|--------|----------|-------|
| Particle float | 6-12s | Slow, dreamlike |
| Swirl/orbit | 15-30s | Very slow |
| Pulse/breathe | 2-4s | Subtle |
| Drift | 10-20s | Nearly imperceptible |

### Performance Considerations

- Use `transform` and `opacity` only (GPU-accelerated)
- Limit particle count (8-15 max)
- Use `will-change: transform` sparingly
- Disable in `prefers-reduced-motion`

**When to Use**: Background atmosphere, hero sections, transitions. Should be felt, not noticed.

---

## Combining Animation Types

Complex sequences layer multiple animation types:

### Example: Hero Word Transformation (TOY Essay)

```
┌─────────────────────────────────────────────────────────────┐
│ SCROLL-LOCK PATTERN: The Transformation                     │
│                                                             │
│ CHOREOGRAPHY:                                               │
│   0-15%:  Word emerges (REVEAL)                            │
│   15-30%: Flicker + cracks (MICRO-INTERACTIONS)            │
│   30-50%: TOY → TOYE (TYPOGRAPHY MORPH)                    │
│   50-70%: Annotations appear (REVEAL)                       │
│   70-85%: Annotations swirl (AMBIENT)                       │
│   85-100%: Title card (REVEAL)                              │
│                                                             │
│ PARALLAX: Annotations at 1.3x, particles at 1.6x           │
│                                                             │
│ TRANSITION TREATMENT: Darkness → parchment atmosphere      │
└─────────────────────────────────────────────────────────────┘
```

### Example: Era Boundary Transition

```
┌─────────────────────────────────────────────────────────────┐
│ TRANSITION TREATMENT: Medieval → Renaissance                │
│                                                             │
│ CHOREOGRAPHY (scroll-driven, no lock):                     │
│   0-30%:  Color palette crossfade                          │
│   20-50%: Typography morph (blackletter → humanist)        │
│   40-70%: Texture shift (heavy grain → refined)            │
│   60-100%: Atmospheric warmth increases                    │
│                                                             │
│ MICRO-INTERACTIONS: Subtle shimmer on new typography       │
└─────────────────────────────────────────────────────────────┘
```

---

## Quick Reference: Timing Defaults

| Animation Type | Default Duration | Default Easing |
|----------------|------------------|----------------|
| Micro-interaction | 150-300ms | ease-out |
| Typography morph | 400-600ms | ease-in-out |
| Reveal/fade | 300-500ms | ease-out |
| Era transition | 600-800ms | ease-in-out |
| Parallax | continuous | linear |
| Ambient motion | 6-20s | ease-in-out |
| Scroll-lock unlock | 300-500ms | ease-out |

---

## Accessibility Requirements

All animation types must respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  /* Disable continuous animations */
  .ambient-particle,
  .floating-element {
    animation: none;
  }
  
  /* Convert morphs to instant crossfade */
  .typography-morph {
    transition-duration: 0.01ms;
  }
  
  /* Show all choreography states immediately */
  .choreographed-element {
    opacity: 1;
    transform: none;
  }
  
  /* Flatten parallax */
  .parallax-layer {
    transform: none;
  }
}
```

---

## Checklist: Animation Implementation

- [ ] Identify which animation categories apply
- [ ] Define choreography stages (if scroll-driven)
- [ ] Specify exact timing and easing values
- [ ] Document parallax layer speeds
- [ ] List all micro-interactions
- [ ] Define transition treatment for era/section changes
- [ ] Implement `prefers-reduced-motion` alternatives
- [ ] Test on low-powered devices
- [ ] Verify skip affordances for scroll-locks

---

## Related Documents

- `scroll-lock-patterns.md` — Detailed scroll-lock pattern library
- `../specs/[essay-name].md` — Essay-specific animation specifications
- `../specs/[essay-name]-design-research.md` — Animation philosophy per essay

---

*Last Updated: December 2025*

