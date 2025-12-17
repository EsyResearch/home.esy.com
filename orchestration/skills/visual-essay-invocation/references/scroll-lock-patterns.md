# Scroll-Lock Animation Patterns

This reference documents reusable scroll-lock animation patterns for visual essays. Each pattern solves a specific narrative challenge.

---

## Status Legend

| Icon | Meaning |
|------|---------|
| ✅ | **Implemented** — In production across multiple essays |
| 🟡 | **Partial** — Implemented in some essays or partially complete |
| 📋 | **Spec Only** — Defined in design specs, not yet coded |
| 🔮 | **Future** — Possible pattern, not yet specified or implemented |

---

## Pattern Overview

| # | Pattern | Purpose | Status |
|---|---------|---------|--------|
| 1 | **The Reveal** | Unveil hidden content dramatically | ✅ |
| 2 | **The Pan** | Explore large image across details | 🟡 |
| 3 | **The Zoom** | Focus attention on specific detail | ✅ |
| 4 | **The Comparison** | Show change, contrast two states | 🟡 |
| 5 | **The Sequence** | Progression through multiple images | ✅ |
| 6 | **The Assembly** | Build understanding piece by piece | 🟡 |
| 7 | **The Conversation** | Show dialogue or exchange | 📋 |
| 8 | **The Transformation** | Visualize metamorphosis | ✅ |
| 9 | **The Timeline** | Navigate through time | 🟡 |
| 10 | **The Word Transform** | Typography evolves (font, era, letterforms) | ✅ |
| 11 | **The Pinned Scroll** | Text fixed, background scrolls | 🟡 |
| 12 | **The Annotation Overlay** | Progressive labeling on image | 🟡 |
| 13 | **The Branching** | Narrative diverges into paths | 📋 |
| 14 | **The Parallax Lock** | Multi-layer movement while locked | 📋 |
| 15 | **The Depth Dive** | Z-axis movement into scene | 🔮 |
| 16 | **The Split Screen** | Two narratives run simultaneously | 🔮 |
| 17 | **The Video Scrub** | Frame-accurate video control | 🔮 |
| 18 | **The Map Journey** | Geographic navigation | 🔮 |
| 19 | **The Data Build** | Charts/graphs animate with data | 🔮 |
| 20 | **The Rotation** | Object rotates in 3D space | 🔮 |
| 21 | **The Accordion** | Sections expand/collapse | 🔮 |

---

## Core Mechanics

### How Scroll-Lock Works

1. User scrolls into designated trigger zone
2. Viewport position locks (page stops scrolling)
3. Continued scroll input drives animation progress
4. Animation completes at 100% scroll progress
5. Lock releases, natural scrolling resumes

### Implementation Principles

- **Scroll depth**: 600-1200px of scroll input per locked section
- **Progress mapping**: Linear by default; custom easing for dramatic beats
- **Skip affordance**: Always provide—small text link or button, corner-positioned
- **Lock/unlock easing**: 300-500ms ease-out transition
- **Visual progress**: Subtle indicator showing completion percentage

### Anti-Patterns

- Locking without clear purpose (decorative only)
- Sequences longer than 1500px scroll depth
- No skip option for accessibility
- Jarring lock/unlock without easing
- Animation that completes before scroll reaches 100%

---

## Pattern Library

### 1. The Reveal ✅

**Purpose:** Create anticipation; unveil hidden content dramatically

**Implementation Status:** Used in multiple essays for dramatic reveals.

**Mechanics:** Occlusion (black bars, fog, blur, mask) gradually recedes as user scrolls, exposing content beneath.

**Best for:**
- Opening dramatic photographs
- Revealing key documents
- Exposing "hidden" information

**Choreography Example:**
```
- 0-30% scroll: Occlusion covers 100% of content
- 30-70% scroll: Occlusion recedes from edges toward center
- 70-90% scroll: Final content fully exposed
- 90-100% scroll: Subtle zoom or settle into final position
```

**Variations:**
- **Horizontal reveal**: Bars recede left/right
- **Vertical reveal**: Bars recede top/bottom
- **Radial reveal**: Circle expands from center
- **Fog reveal**: Gaussian blur clears
- **Shutter reveal**: Venetian blind effect

---

### 2. The Pan 🟡

**Purpose:** Explore large image; guide attention across details

**Implementation Status:** Partial implementation in some essays; not consistently used.

**Mechanics:** Scroll input moves viewport horizontally or vertically across an image larger than screen.

**Best for:**
- Panoramic photographs
- Timeline visualizations
- Detailed scenes with multiple focal points
- "Journey" metaphors

**Choreography Example:**
```
- 0-25% scroll: View begins at left edge, focal point A
- 25-50% scroll: Pan right, pause briefly at focal point B
- 50-75% scroll: Continue pan, reach focal point C
- 75-100% scroll: Settle on final focal point D at right edge
```

**Variations:**
- **Horizontal pan**: Left-to-right or right-to-left
- **Vertical pan**: Top-to-bottom (scrolling a tall document)
- **Diagonal pan**: Corner-to-corner for dynamic movement
- **Pan with zoom**: Combine lateral movement with depth change

**Technical Notes:**
- Image should be 150-300% viewport width/height
- Add subtle parallax to foreground elements during pan
- Consider annotation overlays that appear at focal points

---

### 3. The Zoom ✅

**Purpose:** Focus attention; isolate significance from context

**Implementation Status:** Implemented in multiple essays.

**Mechanics:** Scroll input pushes "camera" into image, magnifying specific detail.

**Best for:**
- Highlighting key details in complex images
- Creating intimacy with portraits
- Emphasizing document text
- "Drilling down" metaphors

**Choreography Example:**
```
- 0-20% scroll: Full image visible, context established
- 20-60% scroll: Gradual zoom toward target area
- 60-80% scroll: Target detail fills frame
- 80-100% scroll: Optional: text/annotation appears over detail
```

**Variations:**
- **Smooth zoom**: Continuous scale increase
- **Stepped zoom**: Discrete zoom levels with brief holds
- **Zoom with reframe**: Center of zoom shifts during motion
- **Zoom out**: Reverse—detail to context revelation

**Technical Notes:**
- Source image must be high resolution (2-4x final zoom level)
- Consider vignette that intensifies during zoom
- Exit frame should have clear focal point

---

### 4. The Comparison 🟡

**Purpose:** Show change over time; contrast two states

**Implementation Status:** Slider variation partially implemented; crossfade not consistently used.

**Mechanics:** Scroll input drives transition between two images—slider, crossfade, or split.

**Best for:**
- Before/after photographs
- Historical then/now comparisons
- Alternative outcomes visualization
- Cause and effect relationships

**Choreography Example (Slider):**
```
- 0-10% scroll: Image A fully visible, slider at left edge
- 10-90% scroll: Slider moves right, revealing Image B beneath
- 90-100% scroll: Image B fully visible, slider at right edge
```

**Choreography Example (Crossfade):**
```
- 0-20% scroll: Image A at 100% opacity
- 20-80% scroll: Image A fades out, Image B fades in
- 80-100% scroll: Image B at 100% opacity
```

**Variations:**
- **Horizontal slider**: Most common, left-to-right reveal
- **Vertical slider**: Top-to-bottom reveal
- **Crossfade**: Opacity transition without hard edge
- **Split screen**: Both images visible, proportions shift
- **Morph**: If subjects align, animated transformation

**Technical Notes:**
- Images should be precisely aligned for best effect
- Slider handle should be clearly visible/interactive
- Consider adding date labels that transition with images

---

### 5. The Sequence ✅

**Purpose:** Show progression; create rhythm through multiple images

**Implementation Status:** Implemented in multiple essays for image galleries and progressions.

**Mechanics:** Scroll input advances through series of images rapidly, like flipbook.

**Best for:**
- Showing process steps
- Historical photo sequences
- Portrait galleries
- Rapid timeline compression

**Choreography Example:**
```
- 0-100% scroll: 10-20 images cycle through
- Each image holds for ~50-100px of scroll
- Transitions are quick cuts or brief crossfades (100-200ms)
```

**Variations:**
- **Hard cut sequence**: Instant transitions between images
- **Crossfade sequence**: Brief dissolves between images
- **Stacked sequence**: Images layer on top of each other
- **Grid populate**: Images fill grid positions sequentially

**Technical Notes:**
- Minimum 8-10 images for effective sequence
- Maximum 25-30 before fatigue sets in
- Consider adding subtle captions that update with images
- All images should be same aspect ratio

---

### 6. The Assembly 🟡

**Purpose:** Build understanding piece by piece; show construction

**Implementation Status:** Partial implementation; diagram builds exist but not consistently as scroll-locks.

**Mechanics:** Scroll input adds elements progressively—diagram builds, timeline populates, structure constructs.

**Best for:**
- Technical diagrams
- Timelines
- Network visualizations
- Process explanations
- "How it works" sections

**Choreography Example (Diagram):**
```
- 0-20% scroll: Empty frame or base element appears
- 20-40% scroll: First component group adds with labels
- 40-60% scroll: Second component group adds
- 60-80% scroll: Connections/relationships draw between components
- 80-100% scroll: Final elements, complete diagram settles
```

**Variations:**
- **Additive assembly**: Elements appear and stay
- **Transformative assembly**: Elements morph into final form
- **Exploded view**: Complete object separates into components
- **Timeline build**: Events populate along temporal axis

**Technical Notes:**
- Each addition should be meaningful (not arbitrary decoration)
- Stagger element appearances (50-100ms between related items)
- Consider annotation tooltips that appear with each component

---

### 7. The Conversation 📋

**Purpose:** Humanize interaction; show dialogue or exchange

**Implementation Status:** Specified in design docs but not yet implemented.

**Mechanics:** Scroll input reveals dialogue line by line, simulating real-time conversation.

**Best for:**
- Historical exchanges
- Interview excerpts
- Human-AI dialogue demonstrations
- Debates or arguments
- Question-and-answer formats

**Choreography Example:**
```
- 0-15% scroll: First speaker's message appears
- 15-30% scroll: Second speaker's response appears
- 30-45% scroll: First speaker's follow-up
- [Continue alternating]
- 85-100% scroll: Final exchange, optional reflection text
```

**Variations:**
- **Chat interface**: Modern messaging UI aesthetic
- **Transcript style**: Formal document appearance
- **Split screen**: Speakers on opposite sides
- **Typewriter**: Text types out character by character

**Technical Notes:**
- Attribution (speaker names/photos) should be clear
- Consider typing animation for dramatic effect
- Pacing should feel natural—not too fast, not too slow

---

### 8. The Transformation ✅

**Purpose:** Show metamorphosis; visualize change process

**Implementation Status:** Implemented in TOY hero (TOY→TOYE), Pussy hero, and other etymology essays.

**Mechanics:** Scroll input drives continuous transformation of one element into another.

**Best for:**
- Concept evolution
- Visual metaphors
- State changes
- Historical progression

**Choreography Example:**
```
- 0-25% scroll: Initial state fully visible
- 25-75% scroll: Gradual transformation—morphing, dissolving, reshaping
- 75-100% scroll: Final state achieved, settled
```

**Variations:**
- **Morph**: Smooth interpolation between forms
- **Dissolve/reform**: Break apart, reassemble as new form
- **Evolution**: Multiple intermediate states
- **Symbolic**: Abstract representation of change

---

### 9. The Timeline 🟡

**Purpose:** Navigate through time; compress history into scrollable space

**Implementation Status:** Partial implementation; timeline structures exist but not always as true scroll-locks.

**Mechanics:** Scroll input moves through chronological sequence, with dates and events appearing at positions.

**Best for:**
- Historical narratives
- Biographical essays
- Evolution of concepts
- Project/process timelines

**Choreography Example:**
```
- 0-100% scroll: Move through [date range]
- Events appear as their dates pass
- Major events trigger brief holds or expansions
- Current date indicator shows position in timeline
```

**Variations:**
- **Horizontal timeline**: Left-to-right time flow
- **Vertical timeline**: Top-to-bottom time flow
- **Branching timeline**: Multiple parallel threads
- **Focused timeline**: Zoom in/out on different time scales

---

### 10. The Word Transform ✅

**Purpose:** Typography evolves—font changes, era shifts, letterform transformations

**Implementation Status:** Implemented in TOY essay (TOY→TOYE), Pussy essay, and other etymology-focused visual essays.

**Mechanics:** Scroll input drives transformation of word's visual appearance—font family, style, deconstruction/reconstruction of letterforms.

**Best for:**
- Etymology essays
- Word origin stories
- Era-specific typography transitions
- Semantic evolution visualization

**Choreography Example:**
```
- 0-15% scroll: Modern word appears clean
- 15-30% scroll: Word flickers, cracks appear
- 30-50% scroll: Letterforms fragment, older form emerges
- 50-70% scroll: Historical typography settles
- 70-85% scroll: Annotations/definitions appear around word
- 85-100% scroll: Final state, lock releases
```

**Variations:**
- **Era morph**: Modern → Victorian → Medieval typography
- **Deconstruction**: Word breaks into letters that rearrange
- **Palimpsest**: Layers of older text visible beneath
- **Script transform**: Writing system changes (Latin → Greek → etc.)

**Technical Notes:**
- Requires multiple font files for different eras
- Consider variable fonts for smooth weight/width transitions
- Letterform animations need GPU acceleration
- Cracks/fractures use CSS gradients or SVG overlays

---

### 11. The Pinned Scroll 🟡

**Purpose:** Keep key text/element fixed while background content scrolls past

**Implementation Status:** Partial implementation in various essays; not consistently structured as formal scroll-lock.

**Mechanics:** Text or UI element stays fixed in viewport while images, backgrounds, or supporting content scrolls behind/alongside.

**Best for:**
- Quote monuments (quote stays, supporting visuals scroll)
- Section headers that persist
- Key statistics or data points
- Navigation anchors during long sequences

**Choreography Example:**
```
- 0-100% scroll: Text element fixed at center
- Background images crossfade or pan behind
- Progress indicator shows position in sequence
- At 100%, text releases and scrolls normally
```

**Variations:**
- **Quote monument**: Large quote fixed, images scroll behind
- **Sticky header**: Section title persists through content
- **Split fixed**: Left side fixed, right side scrolls (or vice versa)
- **Floating annotation**: Commentary stays while evidence scrolls

**Technical Notes:**
- Use `position: sticky` within scroll-lock container
- Ensure sufficient contrast between fixed and scrolling layers
- Consider parallax between layers for depth

---

### 12. The Annotation Overlay 🟡

**Purpose:** Progressively label and annotate an image or document

**Implementation Status:** Partial implementation; annotations exist but not always as formal scroll-lock sequences.

**Mechanics:** Scroll input reveals annotations, callouts, or labels one by one on a base image.

**Best for:**
- Artifact analysis
- Document examination
- Technical diagrams
- Art history / image deconstruction

**Choreography Example:**
```
- 0-10% scroll: Base image visible, no annotations
- 10-30% scroll: First annotation appears with line to detail
- 30-50% scroll: Second annotation appears
- 50-70% scroll: Third annotation appears
- 70-90% scroll: All annotations visible, relationships clear
- 90-100% scroll: Optional summary text, lock releases
```

**Variations:**
- **Sequential reveal**: One annotation at a time
- **Zone-based**: Annotations appear as scroll enters each region
- **Comparative**: Multiple layers of annotation (scholarly, casual, etc.)
- **Interactive overlay**: Annotations respond to hover during lock

**Technical Notes:**
- Annotation lines should animate (grow from origin)
- Use consistent visual language for callout boxes
- Consider z-index management for overlapping annotations

---

### 13. The Branching 📋

**Purpose:** Narrative diverges into multiple paths the reader can explore

**Implementation Status:** Specified in TOY essay design (word meaning branches) but not yet fully implemented.

**Mechanics:** Scroll input reaches a fork; user chooses path or system presents both; selected path expands while others minimize.

**Best for:**
- Etymology branches (word takes multiple meanings)
- Historical "what if" scenarios
- Multiple interpretations of evidence
- Choose-your-own-adventure elements

**Choreography Example:**
```
- 0-30% scroll: Single narrative thread
- 30-40% scroll: Fork appears, two (or more) paths visible
- 40-50% scroll: User selects path (or both shown minimized)
- 50-90% scroll: Selected path content animates through
- 90-100% scroll: Paths reconverge or conclude
```

**Variations:**
- **Forced choice**: User must select one path
- **Parallel**: Both paths shown simultaneously at reduced size
- **Sequential**: First path, then option to explore second
- **Collapse/expand**: Unselected paths minimize but remain accessible

**Technical Notes:**
- Ensure all paths are accessible (not locked behind choices)
- Provide "return to main" affordance
- Track which branches user has explored

---

### 14. The Parallax Lock 📋

**Purpose:** Create depth through multi-layer movement while viewport is locked

**Implementation Status:** Specified in design docs (5-layer parallax system) but not implemented as true scroll-lock.

**Mechanics:** During scroll-lock, multiple layers move at different speeds, creating 3D depth effect.

**Best for:**
- Atmospheric sections
- Scene establishment
- Transitional moments between eras
- "Journey through" metaphors

**Choreography Example:**
```
- 0-100% scroll: Viewport locked
- Background layer: Moves at 0.2x scroll rate
- Mid-ground layer: Moves at 0.5x scroll rate
- Subject layer: Moves at 1.0x (reference)
- Foreground layer: Moves at 1.5x scroll rate
- Ambient particles: Move at 2.0x scroll rate
```

**Variations:**
- **Horizontal parallax**: Layers move left/right
- **Vertical parallax**: Layers move up/down
- **Depth parallax**: Layers scale and blur with distance
- **Reveal parallax**: Foreground moves away to reveal background

**Technical Notes:**
- Use `transform: translate3d` for GPU acceleration
- Limit to 3-5 layers for performance
- Disable on mobile or reduce layer count

---

### 15. The Depth Dive 🔮

**Purpose:** Move "into" the scene along Z-axis, creating immersive tunnel effect

**NOT IMPLEMENTED** — Future pattern for consideration.

**Mechanics:** Scroll input pushes viewpoint forward into scene; elements pass by as if flying through.

**Best for:**
- Data visualization journeys
- Time travel metaphors
- Abstract concept exploration
- Dramatic introductions

**Choreography Example:**
```
- 0-20% scroll: Scene visible at distance
- 20-60% scroll: Rapid z-axis movement, elements pass by
- 60-80% scroll: Approach destination
- 80-100% scroll: Arrive at focal point, lock releases
```

**Variations:**
- **Tunnel**: Cylindrical passage through content
- **Starfield**: Points of light streaming past
- **Document stack**: Fly through layers of pages
- **Timeline tunnel**: Dates stream past as you travel through time

**Technical Notes:**
- Requires 3D transforms or WebGL
- High performance cost—consider pre-rendered video fallback
- Can cause motion sickness—provide skip option prominently

---

### 16. The Split Screen 🔮

**Purpose:** Show two narratives simultaneously; user controls balance

**NOT IMPLEMENTED** — Future pattern for consideration.

**Mechanics:** Screen divided; scroll input shifts balance between two parallel contents.

**Best for:**
- Dual perspectives on same event
- Cause and effect relationships
- Parallel timelines
- Debate or argument visualization

**Choreography Example:**
```
- 0-20% scroll: Left side dominates (80/20 split)
- 20-50% scroll: Balance shifts toward center (50/50)
- 50-80% scroll: Right side grows (20/80 split)
- 80-100% scroll: Either resolves to single view or maintains split
```

**Variations:**
- **Horizontal split**: Left/right division
- **Vertical split**: Top/bottom division
- **Diagonal split**: Dynamic angle
- **Picture-in-picture**: One view dominant, other in corner

**Technical Notes:**
- Both sides should scroll independently or in sync
- Consider which side is "primary" for accessibility
- Audio/video should only play from one side at a time

---

### 17. The Video Scrub 🔮

**Purpose:** Control video playback frame-by-frame via scroll

**NOT IMPLEMENTED** — Future pattern for consideration.

**Mechanics:** Scroll input maps directly to video timeline position; scrubbing forward/backward controls playback.

**Best for:**
- Product reveals (Apple-style)
- Process demonstrations
- Historical footage examination
- Animation breakdowns

**Choreography Example:**
```
- 0-100% scroll: Maps to 0-100% of video duration
- Scroll forward: Video plays forward
- Scroll backward: Video plays backward
- Stop scrolling: Video pauses at current frame
```

**Variations:**
- **Linear scrub**: Direct 1:1 mapping
- **Eased scrub**: Momentum/smoothing applied
- **Segmented scrub**: Discrete chapters with holds
- **Loop scrub**: Video loops within scroll range

**Technical Notes:**
- Requires pre-decoded video frames or canvas rendering
- Consider image sequence fallback for Safari
- Large file sizes—implement progressive loading
- 30fps minimum for smooth appearance

---

### 18. The Map Journey 🔮

**Purpose:** Navigate geographically across a map tied to narrative

**NOT IMPLEMENTED** — Future pattern for consideration.

**Mechanics:** Scroll input pans and zooms across map; locations highlight as narrative reaches them.

**Best for:**
- Trade routes
- Migration patterns
- Historical journeys
- Geographic spread of phenomena

**Choreography Example:**
```
- 0-20% scroll: Map centered on origin point A
- 20-40% scroll: Pan and zoom to location B
- 40-60% scroll: Route between A-B animates
- 60-80% scroll: Continue to location C
- 80-100% scroll: Full route visible, overview
```

**Variations:**
- **Point-to-point**: Sequential location visits
- **Path trace**: Route draws as you scroll
- **Zoom levels**: Street → city → country → continent
- **Time-based**: Map shows changes over time at each stop

**Technical Notes:**
- Use vector maps (Mapbox, Leaflet) for zoom quality
- Pre-render routes for performance
- Consider static image fallback for simple journeys

---

### 19. The Data Build 🔮

**Purpose:** Animate data visualization construction tied to scroll

**NOT IMPLEMENTED** — Future pattern for consideration.

**Mechanics:** Scroll input drives chart/graph animation—bars grow, lines draw, points plot.

**Best for:**
- Statistical revelations
- Trend visualizations
- Comparative data
- Scientific findings

**Choreography Example:**
```
- 0-20% scroll: Axes appear, labels render
- 20-60% scroll: Data points/bars animate in sequence
- 60-80% scroll: Trend line or annotation draws
- 80-100% scroll: Final value highlights, insight text appears
```

**Variations:**
- **Bar chart build**: Bars grow from zero
- **Line chart draw**: Line traces left-to-right
- **Scatter populate**: Points appear one by one
- **Pie chart fill**: Segments animate in sequence

**Technical Notes:**
- Use D3.js or similar for data binding
- Consider `countUp` animations for displayed values
- Ensure data is accessible in text form

---

### 20. The Rotation 🔮

**Purpose:** Rotate object in 3D space to examine all sides

**NOT IMPLEMENTED** — Future pattern for consideration.

**Mechanics:** Scroll input rotates object around axis; user can examine artifact from multiple angles.

**Best for:**
- Artifact examination
- Product visualization
- Sculptural analysis
- 3D model exploration

**Choreography Example:**
```
- 0-100% scroll: Object rotates 360° around Y-axis
- Or: 0-50% Y-rotation, 50-100% X-rotation
- Annotations appear at specific rotation angles
- Key features highlight as they face viewer
```

**Variations:**
- **Single axis**: Rotate around one axis only
- **Orbital**: Full spherical rotation control
- **Turntable**: Classic product spin
- **Exploded rotation**: Components separate as it rotates

**Technical Notes:**
- Requires 3D model or pre-rendered image sequence
- 36-72 images for smooth 360° rotation
- Consider drag interaction as alternative to scroll

---

### 21. The Accordion 🔮

**Purpose:** Sections expand and collapse in sequence

**NOT IMPLEMENTED** — Future pattern for consideration.

**Mechanics:** Scroll input expands current section while collapsing previous; content reveals progressively.

**Best for:**
- Multi-part explanations
- FAQ-style content
- Nested information
- Chapter introductions

**Choreography Example:**
```
- 0-25% scroll: Section A fully expanded, B-D collapsed
- 25-50% scroll: Section A collapses, Section B expands
- 50-75% scroll: Section B collapses, Section C expands
- 75-100% scroll: Section C collapses, Section D expands
```

**Variations:**
- **Sequential**: Only one section open at a time
- **Cumulative**: Sections stay open as you progress
- **Nested**: Sections within sections
- **Radial**: Sections expand from center

**Technical Notes:**
- Smooth height transitions with `max-height` or FLIP
- Ensure collapsed sections remain accessible
- Consider keyboard navigation between sections

---

## Combining Patterns

Complex sequences often combine multiple patterns:

**Example: "The Discovery"**
1. Reveal (expose document)
2. Zoom (focus on key passage)
3. Pan (explore surrounding context)

**Example: "The Consequence"**
1. Comparison (before/after)
2. Sequence (progression of impact)
3. Assembly (final state diagram)

**Example: "The People"**
1. Sequence (portrait gallery)
2. Zoom (focus on single figure)
3. Conversation (their words)

**Example: "The Etymology Hero" (implemented in TOY/Pussy)**
1. Word Transform (modern → historical)
2. Annotation Overlay (definitions swirl around word)
3. Branching (word takes multiple meaning paths)

**Example: "The Journey" (future)**
1. Map Journey (geographic movement)
2. Timeline (temporal progression)
3. Pinned Scroll (narrator text fixed)

**Example: "The Evidence" (future)**
1. Reveal (document exposed)
2. Annotation Overlay (key passages labeled)
3. Data Build (statistics visualized)

---

## Accessibility Requirements

Every scroll-lock implementation must include:

1. **Skip control**: Visible button/link to bypass sequence
2. **Keyboard support**: Space/Enter to advance, Escape to skip
3. **Reduced motion mode**: Static images with manual navigation
4. **Progress indication**: Clear sense of completion percentage
5. **Pause capability**: User can stop mid-sequence

---

## Performance Considerations

- Preload all assets in sequence before lock triggers
- Use will-change CSS property for animated elements
- Throttle scroll input processing (16ms minimum between updates)
- Test on low-powered devices
- Consider lazy-loading for sequences not yet in viewport

---

## Common Issues & Gotchas

### 🚨 Issue #1: `overflow-x: hidden` Breaks `position: sticky`

**Symptom:** Content doesn't pin to viewport during scroll-lock — it scrolls away before animation completes.

**Root Cause:** Any ancestor element with `overflow: hidden`, `overflow: auto`, or `overflow: scroll` creates a new scrolling context that breaks `position: sticky`.

**Fix:** Use `overflow-x: clip` instead of `overflow-x: hidden`:

```css
/* ❌ WRONG — breaks position: sticky */
.essay-container {
  overflow-x: hidden;
}

/* ✅ CORRECT — clips content without breaking sticky */
.essay-container {
  overflow-x: clip;
}
```

**Why this works:** `overflow: clip` clips content at the element's bounds (like `hidden`) but does NOT create a scrolling context, so `position: sticky` continues to work.

**Debugging tip:** If sticky isn't working, inspect the ancestor chain in DevTools and look for any `overflow` property that isn't `visible`.

---

### 🚨 Issue #2: CSS Specificity Conflicts Override Sticky

**Symptom:** `position: sticky` is set but element behaves like `position: relative`.

**Root Cause:** A less-specific CSS rule sets `position: relative` AFTER the sticky rule, overriding it due to cascade order.

**Example of the bug:**

```css
/* Rule 1 (specificity: 0,3,0) — sets sticky */
.essay-container .hero-section .hero-content {
  position: sticky;
  top: 0;
}

/* Rule 2 (specificity: 0,2,0) — comes later, BUT doesn't override... */
.essay-container .hero-content {
  position: relative;  /* ← This WOULD override if specificity were equal! */
}
```

**Fix:** Either:
1. Remove `position` from the less-specific rule
2. Use higher specificity for the sticky rule
3. Use `!important` (last resort)

```css
/* ✅ CORRECT — don't set position in less-specific rule */
.essay-container .hero-content {
  /* position is inherited from more specific selector */
  z-index: 10;
  text-align: center;
}
```

**Debugging tip:** In DevTools, check the "Computed" tab for `position` and trace which rule is winning.

---

### 🚨 Issue #3: Scroll Distance Too Short

**Symptom:** Animation phases feel rushed — user scrolls past before seeing full choreography.

**Root Cause:** The scroll-lock container height doesn't provide enough scroll distance for all animation phases.

**Fix:** Increase the section height:

```tsx
// ❌ TOO SHORT — 400vh = 3 viewport heights of scroll distance
<section style={{ height: "400vh" }}>

// ✅ BETTER — 600vh = 5 viewport heights of scroll distance
<section style={{ height: "600vh" }}>
```

**Rule of thumb:**
- Simple sequences (3-4 phases): 400vh
- Medium sequences (5-6 phases): 500-600vh
- Complex sequences (7+ phases): 700vh+

---

## Related Documents

- `animation-taxonomy.md` — Complete taxonomy of all animation types (36 categories)
- `../specs/[essay-name].md` — Essay-specific animation specifications
- `../specs/[essay-name]-design-research.md` — Animation philosophy per essay

---

*Last Updated: December 2025*