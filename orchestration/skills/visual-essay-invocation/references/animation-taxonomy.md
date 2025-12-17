# Visual Essay Animation Taxonomy

This reference documents the complete taxonomy of animation patterns used in Esy visual essays. Use this alongside `scroll-lock-patterns.md` for comprehensive animation guidance.

---

## Status Legend

| Icon | Meaning |
|------|---------|
| ✅ | **Implemented** — In production across multiple essays |
| 🟡 | **Partial** — Implemented in some essays or partially complete |
| 📋 | **Spec Only** — Defined in design specs, not yet coded |
| 🔮 | **Future** — Possible technique, not yet specified or implemented |

---

## Overview

Visual essay animations fall into **7 core categories** (implemented/partial) plus **29 future techniques** (not implemented) = **36 total**.

### Core Categories (1-7)

| Category | Purpose | Scroll-Driven? | Status |
|----------|---------|----------------|--------|
| **Scroll-Lock Patterns** | Major narrative sequences | Yes (viewport locks) | ✅ |
| **Choreography** | Staged animation phases | Yes (percentage-based) | ✅ |
| **Typography Morphs** | Word/letterform transformations | Yes or triggered | 🟡 |
| **Micro-interactions** | Polish and feedback | Mixed | ✅ |
| **Transition Treatments** | Era/section boundaries | Yes | 🟡 |
| **Parallax Depth** | Layered spatial depth | Yes | 📋 |
| **Ambient/Atmospheric** | Background motion | Continuous | 🟡 |

### Future Techniques (8-36)

| # | Category | Purpose | Status |
|---|----------|---------|--------|
| 8 | **Spatial / 3D** | Camera dolly, orbital, depth of field, perspective | 🔮 |
| 9 | **Reveal Mechanics** | Redaction lift, x-ray, focus pull, spotlight | 🔮 |
| 10 | **Data-Driven** | Morphing charts, accumulation, counter, map pan | 🔮 |
| 11 | **Temporal Effects** | Time-lapse scrub, split-time, decay/growth | 🔮 |
| 12 | **Interactive / Branching** | Choose path, hotspots, annotation toggle | 🔮 |
| 13 | **Audio-Visual** | Soundscapes, voice-over sync, musical motif, silence | 🔮 |
| 14 | **Typography Extended** | Kinetic type, concrete poetry, erasure, palimpsest | 🔮 |
| 15 | **Physics Simulations** | Gravity, liquid/fluid, elastic/spring, magnetic | 🔮 |
| 16 | **Narrative Devices** | Unreliable narrator, memory fade, dream logic, Ken Burns | 🔮 |
| 17 | **SVG Path Morphing** | Shape-to-shape, letter morph, map transitions | 🔮 |
| 18 | **Text Path Animations** | Circular text, wave text, spiral, path animation | 🔮 |
| 19 | **Staggered Cascades** | List reveal, letter stagger, grid wave, domino | 🔮 |
| 20 | **Cursor/Pointer Tracking** | Parallax tilt, spotlight, magnetic, reveal mask | 🔮 |
| 21 | **Masking & Clipping** | Circle reveal, text mask, brush stroke, wipe | 🔮 |
| 22 | **Lottie / After Effects** | Complex illustrations, infographics, flourishes | 🔮 |
| 23 | **WebGL / Shaders** | 3D scenes, GLSL shaders, particle systems | 🔮 |
| 24 | **Variable Font Axes** | Animating weight, width, slant, custom axes | 🔮 |
| 25 | **Video Integration** | Scroll-synced video, background video, scrubbing | 🔮 |
| 26 | **Glitch / Distortion** | Digital artifacts, VHS, chromatic aberration | 🔮 |
| 27 | **Grain / Texture** | Film grain, paper texture, halftone, noise | 🔮 |
| 28 | **Gradient / Color** | Animated gradients, hue rotation, blend modes | 🔮 |
| 29 | **Cursor Effects Extended** | Trails, custom cursors, magnetic buttons, ripples | 🔮 |
| 30 | **FLIP / Shared Element** | Layout animations, view transitions, morphing | 🔮 |
| 31 | **Generative / Procedural** | Perlin noise, L-systems, cellular automata | 🔮 |
| 32 | **Device Sensors** | Accelerometer, gyroscope, ambient light | 🔮 |
| 33 | **Gesture Recognition** | Pinch, swipe, rotate, multi-touch | 🔮 |
| 34 | **Scroll Behaviors** | Snap points, hijacking, velocity, overscroll | 🔮 |
| 35 | **Progress & Navigation** | Reading progress, chapter markers, minimap | 🔮 |
| 36 | **Accessibility Adaptation** | High contrast, print styles, network/battery aware | 🔮 |

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

## 8. Spatial / 3D Effects 🔮

**Definition**: Camera movements, perspective shifts, and depth manipulation in 3D space.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **Camera Dolly** | Push into / pull out of scenes (z-axis) | Zooming into manuscript detail |
| **Orbital View** | Content rotates in 3D space as you scroll | Artifact rotating to show all sides |
| **Depth of Field** | Blur foreground/background dynamically | Focus shifts between era layers |
| **Perspective Shift** | Viewpoint angle changes (bird's eye → eye level) | Map overview to street view |
| **Card Flip** | Element rotates 180° to reveal backside | Dictionary page flipping |
| **Parallax Z-axis** | True 3D depth layers vs. speed-based | Elements at different Z positions |

### Conceptual Implementation

```css
/* Camera dolly via scale + translateZ */
.dolly-container {
  perspective: 1000px;
  transform-style: preserve-3d;
}

.dolly-content {
  transform: translateZ(calc(var(--scroll-progress) * 500px));
}

/* Orbital rotation */
.orbital {
  transform: rotateY(calc(var(--scroll-progress) * 360deg));
}

/* Depth of field via filter */
.layer-background {
  filter: blur(calc((1 - var(--focus-progress)) * 8px));
}
```

### Considerations

- Performance impact on mobile (disable or simplify)
- Motion sickness for rapid perspective changes
- `prefers-reduced-motion` must disable
- Browser support for `preserve-3d`

---

## 9. Reveal Mechanics 🔮

**Definition**: Techniques for progressively exposing hidden content through various visual metaphors.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **Redaction Lift** | Black bars over text that lift to reveal | Censorship metaphor, classified docs |
| **X-Ray / Transparency** | See through layers | Anatomy, architecture, documents |
| **Focus Pull** | Sharp area moves across image | Attention direction |
| **Spotlight / Flashlight** | Only illuminated area visible | Follows cursor or scroll, manuscript discovery |

### Conceptual Implementation

```css
/* Redaction bars */
.redacted-text {
  position: relative;
}

.redaction-bar {
  position: absolute;
  background: #000;
  height: 1.2em;
  width: 100%;
  transform-origin: left;
  transform: scaleX(1);
  transition: transform 0.6s ease-out;
}

.revealed .redaction-bar {
  transform: scaleX(0);
}

/* Spotlight effect */
.spotlight-container {
  background: radial-gradient(
    circle 150px at var(--spot-x, 50%) var(--spot-y, 50%),
    transparent 0%,
    rgba(0, 0, 0, 0.95) 100%
  );
}

/* Focus pull via backdrop blur */
.focus-layer {
  filter: blur(calc((1 - var(--focus)) * 10px));
}
```

### Considerations

- Spotlight requires cursor tracking or scroll mapping
- X-ray may need canvas or WebGL for complex scenes
- Ensure revealed content remains accessible
- Consider static fallback for reduced motion

---

## 10. Data-Driven Animations 🔮

**Definition**: Visualizations that transform, accumulate, or respond to narrative data.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **Morphing Charts** | Data viz transforms (bar → line → map) | Statistics evolving through eras |
| **Accumulation** | Elements stack/pile up representing scale | Casualties, documents, years |
| **Counter / Ticker** | Numbers counting up tied to scroll | Death toll, monetary value |
| **Cartographic Pan** | Map moves to follow narrative geography | Trade routes, migration paths |

### Conceptual Implementation

```javascript
// Counter tied to scroll
const targetValue = 1000000;
const currentValue = Math.floor(scrollProgress * targetValue);
counter.textContent = currentValue.toLocaleString();

// Accumulation
items.forEach((item, i) => {
  const threshold = i / items.length;
  item.classList.toggle('visible', scrollProgress > threshold);
});

// Map pan
map.style.transform = `translate(
  ${-scrollProgress * mapWidth}px,
  ${-scrollProgress * mapHeight * 0.3}px
)`;
```

### Considerations

- Chart morphing requires D3.js or similar
- Counters should use `tabular-nums` font feature
- Map panning needs careful mobile handling
- Accumulation can impact performance with many elements

---

## 11. Temporal Effects 🔮

**Definition**: Animations that convey the passage of time, aging, or temporal comparison.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **Time-lapse Scrub** | Scrub through time (seasons, decades, aging) | Building construction, face aging |
| **Split-Time** | Same location, different eras side-by-side | Before/after comparison |
| **Clock / Calendar** | Time indicator advances with scroll | Era markers, year counter |
| **Decay / Growth** | Objects age or flourish | Manuscript deteriorating, tree growing |

### Conceptual Implementation

```css
/* Decay effect via filters */
.artifact {
  filter: 
    sepia(calc(var(--age) * 0.5))
    contrast(calc(1 - var(--age) * 0.2))
    brightness(calc(1 - var(--age) * 0.3));
  opacity: calc(1 - var(--age) * 0.4);
}

/* Split-time slider */
.split-container {
  position: relative;
}

.era-past, .era-present {
  position: absolute;
  inset: 0;
}

.era-present {
  clip-path: inset(0 0 0 var(--split-position, 50%));
}
```

```javascript
// Time-lapse with image sequence
const frameIndex = Math.floor(scrollProgress * totalFrames);
imageElement.src = frames[frameIndex];
```

### Considerations

- Time-lapse needs preloaded image sequences
- Split-time works well with draggable slider
- Decay can use blend modes and noise textures
- Clock animations should be subtle, not distracting

---

## 12. Interactive / Branching 🔮

**Definition**: User-driven exploration and choice-based narrative paths.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **Choose Path** | Reader selects which thread to follow | Etymology branch selection |
| **Hotspot Exploration** | Clickable regions reveal detail | Annotated artwork, map locations |
| **Annotation Mode** | Toggle layer of scholarly notes | Academic essay mode |
| **Compare / Contrast Slider** | User-controlled before/after | Two translations side-by-side |

### Conceptual Implementation

```jsx
// Branching narrative
const [selectedPath, setSelectedPath] = useState(null);

return (
  <div className="branch-point">
    <p>The word took two paths:</p>
    <button onClick={() => setSelectedPath('vulgar')}>
      The Vulgar Path →
    </button>
    <button onClick={() => setSelectedPath('innocent')}>
      The Innocent Path →
    </button>
    
    {selectedPath && <BranchContent path={selectedPath} />}
  </div>
);

// Hotspot
<div className="hotspot-container">
  <img src="/artifact.jpg" alt="Artifact" />
  {hotspots.map(spot => (
    <button 
      className="hotspot"
      style={{ left: spot.x, top: spot.y }}
      onClick={() => showDetail(spot.id)}
    />
  ))}
</div>
```

### Considerations

- Branching increases content complexity
- All paths must be accessible
- Consider "return to main thread" affordance
- Hotspots need touch-friendly hit areas

---

## 13. Audio-Visual Integration 🔮

**Definition**: Sound design synchronized with visual narrative and scroll position.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **Soundscape Layers** | Ambient audio tied to scroll position | Era-specific background sounds |
| **Voice-over Sync** | Narration advances with reading | Documentary-style storytelling |
| **Musical Motif** | Themes that swell at key moments | Dramatic reveal accompaniment |
| **Silence** | Deliberate audio absence for impact | Pause before significant moment |

### Conceptual Implementation

```javascript
// Soundscape crossfade
const medievalAudio = new Audio('/sounds/medieval-ambient.mp3');
const modernAudio = new Audio('/sounds/modern-ambient.mp3');

window.addEventListener('scroll', () => {
  const progress = getScrollProgress();
  medievalAudio.volume = Math.max(0, 1 - progress * 2);
  modernAudio.volume = Math.max(0, (progress - 0.5) * 2);
});

// Voice-over sync
const transcript = [...]; // timestamped segments
const currentSegment = transcript.find(seg => 
  scrollProgress >= seg.start && scrollProgress < seg.end
);
if (currentSegment && !audio.playing) {
  audio.currentTime = currentSegment.audioTime;
  audio.play();
}
```

### Considerations

- **CRITICAL**: Audio must be opt-in (muted by default)
- Provide clear audio controls
- Consider bandwidth (lazy-load audio)
- Sync is hard—allow for drift tolerance
- Silence must be intentional, not broken audio

---

## 14. Typography Extended 🔮

**Definition**: Advanced typographic animations beyond basic morphs.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **Kinetic Typography** | Words move independently, reform sentences | Quote animation, emphasis |
| **Concrete Poetry** | Text arranged as visual shapes | Word forming an image |
| **Erasure** | Words disappear, leaving different meaning | Redacted poetry |
| **Palimpsest** | Layered text, older writing visible beneath | Manuscript layers |

### Conceptual Implementation

```css
/* Kinetic typography */
.kinetic-word {
  display: inline-block;
  animation: kinetic-bounce 0.5s ease-out;
}

@keyframes kinetic-bounce {
  0% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0); }
}

/* Erasure */
.erasure-text span.erased {
  opacity: 0;
  transition: opacity 0.3s;
}

/* Palimpsest layers */
.palimpsest {
  position: relative;
}

.palimpsest .layer-old {
  position: absolute;
  opacity: 0.15;
  filter: blur(0.5px);
  color: var(--ink-faded);
}

.palimpsest .layer-new {
  position: relative;
}
```

### Considerations

- Kinetic type can be distracting—use sparingly
- Concrete poetry needs careful responsive handling
- Erasure requires accessible alternative
- Palimpsest text must remain readable

---

## 15. Physics Simulations 🔮

**Definition**: Animations driven by physics engines or physics-inspired behaviors.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **Gravity** | Elements fall, settle, pile | Letters dropping into place |
| **Liquid / Fluid** | Content behaves like water | Ink spreading, word flowing |
| **Elastic / Spring** | Bounce, stretch, snap-back | UI elements with bounce |
| **Magnetic** | Elements attract/repel | Word associations clustering |

### Conceptual Implementation

```javascript
// Gravity simulation (Matter.js)
import Matter from 'matter-js';

const engine = Matter.Engine.create();
const letters = 'ETYMOLOGY'.split('').map((char, i) => 
  Matter.Bodies.rectangle(100 + i * 40, 0, 30, 40, {
    label: char,
    restitution: 0.3
  })
);

Matter.World.add(engine.world, letters);
Matter.Engine.run(engine);

// Elastic/Spring (react-spring)
const [{ x }, api] = useSpring(() => ({ x: 0 }));

const handleDrag = (dx) => {
  api.start({ x: dx, config: { tension: 300, friction: 10 } });
};
```

```css
/* CSS-only spring approximation */
.spring-element {
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Considerations

- Physics engines (Matter.js, p2.js) add bundle weight
- CPU-intensive for many bodies
- Consider pre-baked animations for complex sims
- Mobile may need simplified versions

---

## 16. Narrative Devices 🔮

**Definition**: Visual techniques that support storytelling conventions and emotional tone.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **Unreliable Narrator** | Visual contradictions, glitches | Text that changes when you look away |
| **Memory Fade** | Edges blur, colors desaturate for flashbacks | Historical sections feeling dreamlike |
| **Dream Logic** | Non-linear spatial relationships | Impossible architecture, space warping |
| **Ken Burns** | Slow pan/zoom on still images | Documentary-style image presentation |

### Conceptual Implementation

```css
/* Memory fade */
.flashback-section {
  filter: sepia(0.4) contrast(0.9) brightness(0.95);
}

.flashback-section::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 40%,
    rgba(0, 0, 0, 0.4) 100%
  );
  pointer-events: none;
}

/* Ken Burns */
@keyframes ken-burns {
  0% { transform: scale(1) translate(0, 0); }
  100% { transform: scale(1.1) translate(-3%, -2%); }
}

.ken-burns-image {
  animation: ken-burns 20s ease-in-out infinite alternate;
}

/* Unreliable narrator - text shifts */
.unreliable:not(:hover) .truth { opacity: 0; }
.unreliable:not(:hover) .lie { opacity: 1; }
.unreliable:hover .truth { opacity: 1; }
.unreliable:hover .lie { opacity: 0; }
```

### Considerations

- Unreliable narrator should have narrative purpose
- Memory fade shouldn't impair readability
- Dream logic can disorient—use sparingly
- Ken Burns is subtle—don't overuse

---

## 17. SVG Path Morphing 🔮

**Definition**: Smooth transformation between two SVG shapes by interpolating path data.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **Icon Evolution** | Shape transforms into another | Quill pen → fountain pen → ballpoint |
| **Letter Morphing** | Letterform transforms | Gothic 'A' → Roman 'A' |
| **Map Transitions** | Geographic boundaries shift | Medieval map → modern borders |
| **Abstract to Concrete** | Blob → recognizable shape | Concept visualization |

### Conceptual Implementation

```javascript
// Using flubber or GSAP MorphSVG
import { interpolate } from 'flubber';

const interpolator = interpolate(pathA, pathB);
path.setAttribute('d', interpolator(scrollProgress));
```

### Considerations

- Requires paths with similar point counts (or library)
- Libraries: flubber, GSAP MorphSVG, anime.js
- Consider pre-generating keyframes for complex morphs

---

## 18. Text Path Animations 🔮

**Definition**: Text rendered along a curved or animated SVG path.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **Circular Text** | Words orbit around a central point | Era dates circling a timeline node |
| **Wave Text** | Text follows undulating path | "The semantic treadmill" undulating |
| **Spiral** | Text spirals inward/outward | Etymology branches converging |
| **Path Animation** | Text moves along path on scroll | Quote traveling across page |

### Conceptual Implementation

```html
<svg viewBox="0 0 500 200">
  <defs>
    <path id="curve" d="M10,90 Q250,10 490,90" fill="transparent"/>
  </defs>
  <text>
    <textPath href="#curve" startOffset="0%">
      Words flow along this curved path
    </textPath>
  </text>
</svg>
```

### Considerations

- Accessibility: screen readers handle textPath differently
- Performance with long text
- Mobile readability at small sizes

---

## 19. Staggered Cascades 🔮

**Definition**: Multiple elements animate sequentially with calculated delay offsets.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **List Reveal** | Items appear one after another | Timeline events cascading in |
| **Letter Stagger** | Each letter animates separately | Word spelling itself out |
| **Grid Wave** | Items reveal in wave pattern | Image grid loading |
| **Domino Effect** | One triggers the next | Definition cards falling |

### Conceptual Implementation

```css
.cascade-item {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease-out;
}

.cascade-item:nth-child(1) { transition-delay: 0ms; }
.cascade-item:nth-child(2) { transition-delay: 80ms; }
.cascade-item:nth-child(3) { transition-delay: 160ms; }
```

### Considerations

- Total duration = (n items × delay) + animation duration
- Don't exceed 800-1000ms total
- Consider grouping for large sets

---

## 20. Cursor/Pointer Tracking 🔮

**Definition**: Elements respond to mouse/touch position, creating interactive depth or follow effects.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **Parallax Tilt** | Container tilts toward cursor | Hero section depth effect |
| **Spotlight** | Light follows cursor | Illuminating old manuscript |
| **Magnetic Elements** | Items attracted to cursor | Interactive word cloud |
| **Reveal Mask** | Cursor reveals hidden layer | Before/after comparison |

### Conceptual Implementation

```javascript
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  container.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
});
```

### Considerations

- Touch devices: use device orientation or disable
- Performance: throttle mousemove handler
- Accessibility: content must work without interaction

---

## 21. Masking & Clipping 🔮

**Definition**: Content revealed or hidden through animated mask shapes or clip paths.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **Circle Reveal** | Expanding circle reveals content | Era transition spotlight |
| **Text Mask** | Content visible only through text | Word as window into image |
| **Brush Stroke** | Paint-like reveal | Manuscript being written |
| **Geometric Wipe** | Shape-based transitions | Diamond wipe between sections |

### Conceptual Implementation

```css
.masked-content {
  clip-path: circle(0% at 50% 50%);
  transition: clip-path 0.8s ease-out;
}

.masked-content.revealed {
  clip-path: circle(150% at 50% 50%);
}
```

### Considerations

- `clip-path` animations are performant
- SVG masks more flexible but complex
- Consider PNG mask fallbacks

---

## 22. Lottie / After Effects 🔮

**Definition**: Complex pre-rendered animations exported from After Effects as JSON.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **Complex Illustrations** | Multi-element character animations | Animated historical figure |
| **Infographics** | Data visualizations with motion | Animated timeline chart |
| **Logo Animations** | Brand mark sequences | Esy logo reveal |
| **Decorative Flourishes** | Ornate border animations | Medieval manuscript decorations |

### Conceptual Implementation

```javascript
import lottie from 'lottie-web';

const animation = lottie.loadAnimation({
  container: document.getElementById('lottie-container'),
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: '/animations/hero-sequence.json'
});

// Sync to scroll
animation.goToAndStop(scrollProgress * animation.totalFrames, true);
```

### Considerations

- File size: JSON can be large
- Requires After Effects + Bodymovin plugin
- Alternative: Rive for interactive animations
- Not easily editable in code

---

## 23. WebGL / Shaders / Canvas 🔮

**Definition**: GPU-accelerated graphics using WebGL, Three.js, or custom GLSL shaders.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **3D Scenes** | Full three-dimensional environments | Virtual museum, artifact viewer |
| **Custom Shaders** | GLSL-based visual effects | Displacement, ripple, noise |
| **Particle Systems** | Thousands of animated particles | Dust clouds, starfields, rain |
| **Procedural Textures** | Generated patterns and noise | Organic backgrounds |

### Conceptual Implementation

```javascript
// Three.js basic scene
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

// Custom shader material
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uScroll: { value: 0 }
  },
  vertexShader: `...`,
  fragmentShader: `
    uniform float uTime;
    uniform float uScroll;
    void main() {
      // Ripple distortion
      vec2 uv = vUv;
      uv.x += sin(uv.y * 10.0 + uTime) * 0.02 * uScroll;
      gl_FragColor = texture2D(uTexture, uv);
    }
  `
});
```

### Considerations

- Significant bundle size (Three.js ~150KB min)
- Requires WebGL support
- High GPU/battery usage
- Must provide 2D fallback
- Complex to maintain

---

## 24. Variable Font Axes 🔮

**Definition**: Animating variable font properties (weight, width, slant, custom axes) over time or scroll.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **Weight Animation** | Font weight changes smoothly | Light → Bold transition |
| **Width Animation** | Condensed ↔ Extended | Text expanding with scroll |
| **Optical Size** | Size-appropriate rendering | Small text → display text |
| **Custom Axes** | Designer-defined properties | "Casualness", "Wonkiness" |

### Conceptual Implementation

```css
/* Variable font with animated weight */
@font-face {
  font-family: 'InterVariable';
  src: url('/fonts/Inter-Variable.woff2') format('woff2');
  font-weight: 100 900;
}

.animated-text {
  font-family: 'InterVariable', sans-serif;
  font-variation-settings: 
    'wght' var(--font-weight, 400),
    'wdth' var(--font-width, 100);
  transition: font-variation-settings 0.3s ease;
}

/* Scroll-driven */
.scroll-weight {
  font-variation-settings: 'wght' calc(300 + var(--scroll-progress) * 600);
}
```

### Considerations

- Requires variable font files
- Not all fonts have all axes
- Performance varies by browser
- Fallback to standard weights

---

## 25. Video Integration 🔮

**Definition**: Video content synchronized with scroll or narrative progression.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **Scroll-Synced Playback** | Video frame tied to scroll position | Apple-style product reveals |
| **Background Video** | Full-bleed ambient video | Era atmosphere |
| **Video Scrubbing** | Frame-accurate scroll control | Time-lapse sequences |
| **Video-to-Still** | Video freezes to image | Key moment capture |

### Conceptual Implementation

```javascript
// Scroll-synced video
const video = document.querySelector('video');
const duration = video.duration;

window.addEventListener('scroll', () => {
  const scrollProgress = getScrollProgress();
  video.currentTime = scrollProgress * duration;
});

// Or using canvas for frame-accurate control
const canvas = document.getElementById('video-canvas');
const ctx = canvas.getContext('2d');

function drawFrame(frameIndex) {
  // Draw specific frame from preloaded frames array
  ctx.drawImage(frames[frameIndex], 0, 0);
}
```

### Considerations

- Large file sizes
- Preloading required for smooth scrubbing
- Consider image sequences as alternative
- Mobile autoplay restrictions
- Bandwidth concerns

---

## 26. Glitch / Distortion Effects 🔮

**Definition**: Digital artifacts, corruption aesthetics, and signal noise effects.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **Digital Artifacts** | Compression glitches, data corruption | Tech dystopia aesthetic |
| **VHS / CRT** | Scan lines, color separation, tracking | Retro media feel |
| **Chromatic Aberration** | RGB color channel offset | Lens distortion |
| **Static / Noise** | Signal interference | Transition disruption |

### Conceptual Implementation

```css
/* Chromatic aberration */
.glitch-text {
  position: relative;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
}

.glitch-text::before {
  color: cyan;
  clip-path: inset(0 0 50% 0);
  transform: translateX(-2px);
}

.glitch-text::after {
  color: magenta;
  clip-path: inset(50% 0 0 0);
  transform: translateX(2px);
}

/* VHS tracking */
@keyframes vhs-tracking {
  0%, 100% { transform: translateX(0); }
  10% { transform: translateX(-5px) skewX(-2deg); }
  20% { transform: translateX(3px); }
}

.vhs-effect {
  animation: vhs-tracking 0.5s infinite;
}
```

### Considerations

- Can cause motion sickness
- Use sparingly for emphasis
- Reduce for accessibility
- Has strong aesthetic associations

---

## 27. Grain / Texture Overlays 🔮

**Definition**: Adding film grain, paper texture, and material overlays to content.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **Film Grain** | Animated noise overlay | Vintage/documentary feel |
| **Paper Texture** | Subtle surface patterns | Manuscript, aged document |
| **Halftone** | Dot pattern overlay | Print/risograph aesthetic |
| **Dust & Scratches** | Physical media wear | Old film, vinyl |

### Conceptual Implementation

```css
/* Animated film grain via SVG filter */
.grain-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}

/* Animate grain */
@keyframes grain {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -10%); }
  30% { transform: translate(3%, 5%); }
  50% { transform: translate(-7%, -5%); }
  70% { transform: translate(8%, 2%); }
  90% { transform: translate(-3%, 7%); }
}

.grain-animated {
  animation: grain 0.5s steps(6) infinite;
}
```

### Considerations

- Subtle is better (opacity 0.03-0.08)
- Performance impact of large SVG filters
- Can affect text readability
- Consider `prefers-reduced-motion`

---

## 28. Gradient / Color Animation 🔮

**Definition**: Animated color gradients, hue shifts, and blend mode transitions.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **Gradient Movement** | Background gradient shifts position | Ambient atmosphere |
| **Hue Rotation** | Colors cycle through spectrum | Mood transitions |
| **Blend Modes** | multiply, screen, difference transitions | Layered effects |
| **Day/Night** | Complete palette shift | Time-of-day theming |

### Conceptual Implementation

```css
/* Animated gradient */
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animated-gradient {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
}

/* Hue rotation */
.hue-cycle {
  animation: hue-rotate 10s linear infinite;
}

@keyframes hue-rotate {
  from { filter: hue-rotate(0deg); }
  to { filter: hue-rotate(360deg); }
}

/* Scroll-driven color */
.scroll-color {
  background-color: hsl(calc(var(--scroll-progress) * 60), 70%, 50%);
}
```

### Considerations

- Gradient animation is performant
- `filter: hue-rotate` affects all colors
- Use CSS custom properties for control
- Color changes should have meaning

---

## 29. Cursor Effects Extended 🔮

**Definition**: Advanced cursor customization and trailing effects.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **Cursor Trails** | Elements following cursor path | Ink trail, sparkles |
| **Custom Cursors** | Section-specific cursor graphics | Era-appropriate pointers |
| **Magnetic Buttons** | UI elements pull toward cursor | Interactive affordance |
| **Cursor Ripples** | Click creates ripple effect | Feedback |

### Conceptual Implementation

```javascript
// Cursor trail
const trail = [];
const trailLength = 20;

document.addEventListener('mousemove', (e) => {
  trail.push({ x: e.clientX, y: e.clientY, age: 0 });
  if (trail.length > trailLength) trail.shift();
  
  trail.forEach((point, i) => {
    const element = trailElements[i];
    element.style.left = point.x + 'px';
    element.style.top = point.y + 'px';
    element.style.opacity = 1 - (i / trailLength);
  });
});

// Magnetic button
button.addEventListener('mousemove', (e) => {
  const rect = button.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  
  button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
});
```

```css
/* Custom cursor per section */
.medieval-section { cursor: url('/cursors/quill.svg') 2 2, auto; }
.modern-section { cursor: url('/cursors/pointer.svg') 2 2, auto; }
```

### Considerations

- Touch devices have no cursor—disable entirely
- Custom cursors must be small files
- Magnetic effects can frustrate users
- Trails impact performance

---

## 30. FLIP / Shared Element Transitions 🔮

**Definition**: Smooth layout animations using First-Last-Invert-Play technique or View Transitions API.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **Layout Morph** | Grid ↔ list transitions | Definition card expansion |
| **Card Expand** | Thumbnail → full screen | Image detail view |
| **View Transitions** | Cross-page element morphing | Page navigation |
| **Reorder Animation** | Items shuffle smoothly | Filtered list |

### Conceptual Implementation

```javascript
// FLIP technique
function flip(element, newState) {
  // First: record starting position
  const first = element.getBoundingClientRect();
  
  // Last: apply final state
  newState();
  const last = element.getBoundingClientRect();
  
  // Invert: calculate delta
  const deltaX = first.left - last.left;
  const deltaY = first.top - last.top;
  const scaleX = first.width / last.width;
  const scaleY = first.height / last.height;
  
  // Play: animate from inverted position to final
  element.animate([
    { transform: `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})` },
    { transform: 'none' }
  ], { duration: 300, easing: 'ease-out' });
}

// View Transitions API (Chrome 111+)
document.startViewTransition(() => {
  updateDOM();
});
```

```css
/* View Transitions */
::view-transition-old(card),
::view-transition-new(card) {
  animation-duration: 0.3s;
}

.card {
  view-transition-name: card;
}
```

### Considerations

- FLIP requires JavaScript
- View Transitions API limited browser support
- Complex with many elements
- Consider fallback to instant change

---

## 31. Generative / Procedural 🔮

**Definition**: Algorithmically generated visuals using noise, fractals, or rule-based systems.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **Perlin Noise** | Organic, flowing randomness | Natural movement patterns |
| **L-Systems** | Growing structures (plants, fractals) | Tree diagrams, coral |
| **Cellular Automata** | Rule-based pattern generation | Game of Life, maze |
| **Algorithmic Backgrounds** | Generated patterns | Unique per page load |

### Conceptual Implementation

```javascript
// Perlin noise movement
import { createNoise2D } from 'simplex-noise';

const noise = createNoise2D();

function animate(time) {
  elements.forEach((el, i) => {
    const x = noise(i * 0.1, time * 0.001) * 50;
    const y = noise(i * 0.1 + 100, time * 0.001) * 50;
    el.style.transform = `translate(${x}px, ${y}px)`;
  });
  requestAnimationFrame(animate);
}

// L-System (turtle graphics)
const rules = {
  'F': 'FF+[+F-F-F]-[-F+F+F]'
};

function lsystem(axiom, iterations) {
  let result = axiom;
  for (let i = 0; i < iterations; i++) {
    result = result.split('').map(c => rules[c] || c).join('');
  }
  return result;
}
```

### Considerations

- Can be computationally expensive
- Results may vary—consider seeding
- May not fit all aesthetics
- Beautiful when done well

---

## 32. Device Sensors 🔮

**Definition**: Using device hardware sensors for animation input.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **Accelerometer** | Device tilt moves elements | Parallax on tilt |
| **Gyroscope** | Device rotation | 360° view control |
| **Ambient Light** | Brightness adaptation | Auto dark mode |
| **Proximity** | Distance detection | Privacy blur |

### Conceptual Implementation

```javascript
// Device orientation (tilt)
window.addEventListener('deviceorientation', (e) => {
  const x = e.gamma; // Left/right tilt (-90 to 90)
  const y = e.beta;  // Front/back tilt (-180 to 180)
  
  parallaxLayers.forEach((layer, i) => {
    const speed = (i + 1) * 0.5;
    layer.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});

// Ambient light (experimental)
if ('AmbientLightSensor' in window) {
  const sensor = new AmbientLightSensor();
  sensor.addEventListener('reading', () => {
    if (sensor.illuminance < 50) {
      document.body.classList.add('dark-mode');
    }
  });
  sensor.start();
}
```

### Considerations

- Requires user permission
- Not available on desktop
- Battery drain concerns
- Always provide fallback

---

## 33. Gesture Recognition 🔮

**Definition**: Multi-touch gestures for direct manipulation.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **Pinch Zoom** | Two-finger scale | Image detail inspection |
| **Two-Finger Rotate** | Rotation control | Artifact examination |
| **Swipe** | Directional gesture | Navigation, carousel |
| **Long Press** | Press and hold | Context menu, detail |

### Conceptual Implementation

```javascript
// Using Hammer.js for gestures
import Hammer from 'hammerjs';

const mc = new Hammer.Manager(element);

mc.add(new Hammer.Pinch());
mc.add(new Hammer.Rotate());
mc.add(new Hammer.Swipe());

mc.on('pinch', (e) => {
  element.style.transform = `scale(${e.scale})`;
});

mc.on('rotate', (e) => {
  element.style.transform = `rotate(${e.rotation}deg)`;
});

mc.on('swipeleft', () => {
  navigateNext();
});
```

### Considerations

- Library adds bundle weight
- Conflicts with native scroll
- Discoverability challenge
- Must not break single-touch

---

## 34. Scroll Behaviors Extended 🔮

**Definition**: Advanced scroll control and feedback mechanisms.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **Scroll Snap** | Snap to section boundaries | Chapter divisions |
| **Scroll Hijacking** | Override native scroll | Controlled sequences |
| **Velocity Detection** | Respond to scroll speed | Fast scroll = skip |
| **Elastic Overscroll** | Bounce at boundaries | iOS-style feedback |

### Conceptual Implementation

```css
/* CSS Scroll Snap */
.snap-container {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
}

.snap-section {
  scroll-snap-align: start;
  height: 100vh;
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}
```

```javascript
// Velocity detection
let lastScroll = 0;
let lastTime = Date.now();

window.addEventListener('scroll', () => {
  const now = Date.now();
  const deltaScroll = Math.abs(window.scrollY - lastScroll);
  const deltaTime = now - lastTime;
  const velocity = deltaScroll / deltaTime;
  
  if (velocity > 2) {
    // Fast scrolling - simplify animations
    document.body.classList.add('fast-scroll');
  } else {
    document.body.classList.remove('fast-scroll');
  }
  
  lastScroll = window.scrollY;
  lastTime = now;
});
```

### Considerations

- Scroll hijacking frustrates users
- Snap should be predictable
- Velocity threshold needs tuning
- Respect user scroll intent

---

## 35. Progress & Navigation 🔮

**Definition**: Visual indicators of reading progress and position within content.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **Reading Progress Bar** | Horizontal bar showing position | Top of viewport |
| **Chapter Markers** | Dots or ticks for sections | Side navigation |
| **Minimap** | Zoomed-out content preview | Code editor style |
| **Breadcrumb Trail** | "You are here" context | Etymology path |

### Conceptual Implementation

```css
/* Progress bar */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--accent-color);
  transform-origin: left;
  transform: scaleX(var(--scroll-progress, 0));
  z-index: 1000;
}

/* Chapter markers */
.chapter-nav {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}

.chapter-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  margin: 8px 0;
  cursor: pointer;
}

.chapter-dot.active {
  background: var(--accent-color);
  transform: scale(1.5);
}
```

```javascript
// Update progress
window.addEventListener('scroll', () => {
  const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  document.body.style.setProperty('--scroll-progress', progress);
});
```

### Considerations

- Progress bar should be subtle
- Chapter markers need click-to-navigate
- Minimap is complex to implement
- Consider hiding on short content

---

## 36. Accessibility & Adaptation 🔮

**Definition**: Animations that respond to user preferences and device capabilities.

**NOT IMPLEMENTED** — Future technique for consideration.

### Sub-Types

| Effect | Description | Example |
|--------|-------------|---------|
| **High Contrast** | Forced colors support | Windows high contrast |
| **Print Styles** | Static fallback for printing | PDF-friendly |
| **Network-Aware** | Reduce on slow connection | Save data mode |
| **Battery-Aware** | Reduce on low power | Disable ambient |

### Conceptual Implementation

```css
/* High contrast mode */
@media (forced-colors: active) {
  .animated-element {
    forced-color-adjust: none;
    border: 2px solid currentColor;
  }
}

/* Print styles */
@media print {
  .animation-container {
    display: none;
  }
  
  .print-fallback {
    display: block;
  }
  
  * {
    animation: none !important;
    transition: none !important;
  }
}

/* Prefers contrast */
@media (prefers-contrast: more) {
  :root {
    --text-color: #000;
    --bg-color: #fff;
  }
}
```

```javascript
// Network-aware
if (navigator.connection) {
  const { effectiveType, saveData } = navigator.connection;
  
  if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
    document.body.classList.add('reduce-animations');
  }
}

// Battery-aware
if (navigator.getBattery) {
  navigator.getBattery().then(battery => {
    if (battery.level < 0.2 && !battery.charging) {
      document.body.classList.add('low-power-mode');
    }
  });
}
```

### Considerations

- These are progressive enhancements
- Test with actual assistive tech
- Battery API deprecated in some browsers
- Network API experimental
- Always provide base experience

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

### Core Categories
- [ ] Identify which animation categories apply
- [ ] Define choreography stages (if scroll-driven)
- [ ] Specify exact timing and easing values
- [ ] Document parallax layer speeds
- [ ] List all micro-interactions
- [ ] Define transition treatment for era/section changes
- [ ] Implement `prefers-reduced-motion` alternatives
- [ ] Test on low-powered devices
- [ ] Verify skip affordances for scroll-locks

### Future Techniques (when implementing)
- [ ] Evaluate if future technique adds meaningful value
- [ ] Check browser support requirements
- [ ] Plan mobile/touch fallbacks
- [ ] Consider bundle size impact (Lottie, libraries)
- [ ] Ensure graceful degradation

---

## Related Documents

- `scroll-lock-patterns.md` — Detailed scroll-lock pattern library
- `../specs/[essay-name].md` — Essay-specific animation specifications
- `../specs/[essay-name]-design-research.md` — Animation philosophy per essay

---

*Last Updated: December 2025*

