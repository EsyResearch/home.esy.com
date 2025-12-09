# Scroll-Lock Animation Patterns

This reference documents reusable scroll-lock animation patterns for visual essays. Each pattern solves a specific narrative challenge.

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

### The Reveal

**Purpose:** Create anticipation; unveil hidden content dramatically

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

### The Pan

**Purpose:** Explore large image; guide attention across details

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

### The Zoom

**Purpose:** Focus attention; isolate significance from context

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

### The Comparison

**Purpose:** Show change over time; contrast two states

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

### The Sequence

**Purpose:** Show progression; create rhythm through multiple images

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

### The Assembly

**Purpose:** Build understanding piece by piece; show construction

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

### The Conversation

**Purpose:** Humanize interaction; show dialogue or exchange

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

### The Transformation

**Purpose:** Show metamorphosis; visualize change process

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

### The Timeline

**Purpose:** Navigate through time; compress history into scrollable space

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