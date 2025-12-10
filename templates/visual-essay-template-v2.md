# ESY Visual Essay Template — Version 2.0

## *Radically Cinematic, Museum-Grade SVG Execution*

---

## Role Definition
**Award-winning cinematic visual essay director with mastery of visual narrative, atmospheric tension, and multi-sensory digital storytelling. This template transforms any subject into an immersive experience worthy of Criterion Collection stills, MoMA exhibitions, and National Geographic editorial spreads.**

---

## 🌒 THE THREE PILLARS (EXPERIENCE SETUP)

Before any implementation begins, every visual essay experience MUST define these three foundational elements.

### Pillar 1: The Central Obsession

Define the emotional and conceptual core of the story.

**Required Questions:**
- Why does this subject matter to humanity?
- What universal truth does it reveal?
- What emotion should linger after the experience ends?

**Examples:**
```markdown
Subject: Ngapi (Fermented Fish Paste)
Central Obsession: "Transformation through patience—how time, salt, and 
surrender create something greater than its parts."

Subject: Tea
Central Obsession: "A single leaf that connected empires, sparked revolutions, 
and became humanity's most consumed ritual after water."

Subject: The Spoon
Central Obsession: "The first tool that touched human lips—30,000 years of 
feeding, nurturing, and sharing."
```

### Pillar 2: The Cinematic Point of View

Choose ONE POV that persists throughout the entire story. Consistency creates intimacy.

| POV Style | Voice Character | Best For |
|-----------|-----------------|----------|
| **First-person historian** | "I have traced these routes for decades..." | Academic subjects, discoveries |
| **Ancestral voice** | "My grandmother's grandmother knew..." | Cultural traditions, recipes |
| **Ingredient narrator** | "I began as a leaf on a mountain..." | Food, natural materials |
| **Place-based memory** | "These walls remember when..." | Architecture, cities, landscapes |
| **Object narrator** | "I have held a thousand hands..." | Tools, instruments, artifacts |
| **Witness observer** | "Watch now, as the steam rises..." | Processes, ceremonies |

**Template Declaration:**
```markdown
## Cinematic POV: [Style]
Voice Sample: "[Opening line in chosen voice]"
Consistency Rule: This voice appears in Movement I opening, all transition 
moments, and Movement V closing.
```

### Pillar 3: The Sensory Anchor

Pick ONE sensory motif that repeats throughout the experience. This anchor evolves and transforms, returning at the ending in its final form.

| Anchor | Evolution Pattern | Visual Expression |
|--------|-------------------|-------------------|
| **Steam** | Gentle → Dense → Dissipating | SVG particle systems, opacity transitions |
| **Texture** | Rough → Refined → Ancient | Surface detail close-ups, grain overlays |
| **Temperature** | Cold → Warm → Hot | Color temperature shifts, animation speed |
| **Sound** | Silence → Rhythm → Resonance | Audio cues, visual waveforms |
| **Light** | Dawn → Noon → Dusk | Gradient backgrounds, luminosity |
| **Color** | Muted → Saturated → Transcendent | Palette progression, hue shifts |

**Template Declaration:**
```markdown
## Sensory Anchor: [Element]
Opening State: [Description of initial appearance]
Peak State: [Description at climax/Movement III]
Transformed State: [Description at Movement V revelation]
```

---

## 🔥 THE TENSION ARC — FIVE IMMERSIVE MOVEMENTS

Every visual essay experience follows this dramatic structure. No exceptions.

### Movement I: Invocation (5-10% of scroll depth)

**Purpose:** Cinematic, atmospheric opening. No facts. Only mood, sensation, and anticipation.

**Requirements:**
- Full-bleed hero (100dvh minimum)
- Sensory Anchor in its initial state
- Maximum 2-3 sentences of text
- Animation triggers on entry, not on scroll
- POV voice establishes presence

**Visual Modes Allowed:** Sensory Overwhelm, Stillness & Revelation

**Anti-Patterns:**
- ❌ Facts, dates, or statistics
- ❌ "In this story, we will explore..."
- ❌ Multiple text blocks
- ❌ Navigation elements visible in hero
- ❌ Call-to-action buttons

**Code Pattern:**
```tsx
<section className="movement movement-invocation">
  <div className="sensory-anchor anchor-opening">
    {/* Steam/texture/light SVG animation */}
  </div>
  <div className="invocation-content">
    <h1 className="invocation-title">{title}</h1>
    <p className="invocation-voice">{poVoice.opening}</p>
  </div>
</section>
```

### Movement II: Ancestral Pulse (20-25% of scroll depth)

**Purpose:** Origin story, mythic context, early identity formation. This must feel like MEMORY, not documentation.

**Requirements:**
- Minimum 3 distinct scene transitions
- Historical context through sensation, not lecture
- POV voice weaves through narrative
- Sensory Anchor appears in historical context
- NO literal maps unless museum-grade SVG

**Visual Modes Allowed:** Historical Dreamscape, Sensory Overwhelm

**Narrative Techniques:**
- Personal anecdote or legend as entry point
- Sensory details ("the clay was cool beneath fingertips...")
- Time compression through visual metaphor
- Ancestral wisdom as pull quotes

**Anti-Patterns:**
- ❌ "The history of X begins in Y century..."
- ❌ Wikipedia-style chronology
- ❌ Stock photography of "ancient" scenes
- ❌ Parchment texture backgrounds
- ❌ Faux-antique map borders

### Movement III: Collision of Worlds (25-30% of scroll depth)

**Purpose:** The dramatic turning point—cultures mixing, techniques merging, adversity or triumph shaping the subject.

**Requirements:**
- Highest visual density of the experience
- Fastest transition pace
- Contrast as primary tool (before/after, east/west, old/new)
- Sensory Anchor at peak intensity
- Multiple interaction modes active

**Visual Modes Allowed:** Collision Montage, Global Threads (if SVG-compliant)

**Narrative Techniques:**
- Parallel storylines converging
- Split-screen or comparison panels
- Animated overlays showing transformation
- Data visualization of impact/change
- Key quotes from historical figures

**This is the CLIMAX. Energy must be palpable.**

### Movement IV: Modern Echo (20-25% of scroll depth)

**Purpose:** The subject's life today—diaspora, global interpretation, restaurant culture, identity, sustainability.

**Requirements:**
- Return to intimate scale after Movement III intensity
- Contemporary voices and perspectives
- Global presence without cliché "world map"
- Connection to reader's own experience
- Sensory Anchor in modern context

**Visual Modes Allowed:** Global Threads (premium SVG only), Sensory Overwhelm

**Narrative Techniques:**
- Interview excerpts or contemporary quotes
- Day-in-the-life vignettes
- Geographic diversity through specific stories
- Ethical/sustainability considerations
- Personal connection prompts ("Next time you...")

### Movement V: Revelation (10-15% of scroll depth)

**Purpose:** A distilled emotional truth that ties the entire story together. Return to the sensory anchor, transformed.

**Requirements:**
- Deliberate slowdown in pace
- Maximum 1-2 text sections
- Sensory Anchor in final, transformed state
- POV voice delivers closing reflection
- Visual stillness creates space for meaning

**Visual Modes Allowed:** Stillness & Revelation ONLY

**Narrative Techniques:**
- Single powerful statement
- Return to opening imagery, transformed
- Universal truth extracted from specific story
- Invitation to continued relationship with subject
- Sources section follows seamlessly

**The ending must RESONATE. Readers should sit in silence for a moment.**

---

## 🌍 VISUAL ARCHITECTURE — FIVE IMMERSION MODES

Each mode is a visual engine that may be activated at specific points. Never use more than 2 modes in a single viewport.

### Mode 1: Sensory Overwhelm

**Purpose:** Extreme close-ups, textures, motion loops that envelop the senses.

**Technical Specifications:**
```css
.mode-sensory-overwhelm {
  /* Full viewport immersion */
  min-height: 100dvh;
  overflow: hidden;
  
  /* Subtle motion */
  animation: sensory-drift 20s ease-in-out infinite;
}

.sensory-texture {
  /* Grain overlay */
  background-image: url("data:image/svg+xml,...");
  opacity: 0.04;
  mix-blend-mode: overlay;
}

.sensory-loop {
  /* Continuous subtle motion */
  animation: sensory-pulse 8s ease-in-out infinite;
  will-change: transform, opacity;
}
```

**Visual Elements:**
- Macro photography or detailed SVG illustrations
- Subtle parallax (max 2 layers)
- Grain/noise texture overlay (opacity < 0.05)
- Continuous motion loops (steam, bubbles, light shimmer)
- Depth of field effects via blur gradients

**Movement Allowance:** I, II, IV, V

### Mode 2: Historical Dreamscape

**Purpose:** Evoke the past through abstraction, not literal representation.

**CRITICAL: No ancient map clichés. No parchment. No faux-weathered effects.**

**Approved Techniques:**
- Abstract vector geometry derived from subject
- Line-based symbolism (trade routes as pure strokes)
- Minimalist shapes suggesting architecture/landscape
- Watercolor-textured backgrounds (SVG filters)
- Typography as visual element

**Technical Specifications:**
```css
.mode-dreamscape {
  background: linear-gradient(
    180deg,
    var(--dreamscape-sky) 0%,
    var(--dreamscape-earth) 100%
  );
}

.dreamscape-element {
  /* Soft, memory-like appearance */
  filter: url(#watercolor-filter);
  opacity: 0.85;
  animation: dreamscape-fade 1.5s ease-out;
}

.dreamscape-line {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: line-draw 3s ease-out forwards;
}
```

**SVG Filter for Watercolor Effect:**
```svg
<filter id="watercolor-filter">
  <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" />
  <feDisplacementMap in="SourceGraphic" scale="8" />
  <feGaussianBlur stdDeviation="0.5" />
</filter>
```

**Movement Allowance:** II only

### Mode 3: Collision Montage

**Purpose:** Fast transitions, contrasting imagery, animated overlays for dramatic impact.

**Technical Specifications:**
```css
.mode-collision {
  /* Rapid transitions */
  --transition-speed: 0.3s;
}

.collision-panel {
  animation: collision-enter var(--transition-speed) cubic-bezier(0.16, 1, 0.3, 1);
}

.collision-contrast {
  /* Split screen effect */
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
}

@keyframes collision-enter {
  from {
    opacity: 0;
    transform: scale(1.05);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

**Visual Elements:**
- Split-screen comparisons
- Rapid image sequences
- Animated SVG overlays
- Counter/ticker animations
- Before/after sliders

**Movement Allowance:** III only

### Mode 4: Global Threads

**Purpose:** Geographic context through premium, minimalist visualization.

**⚠️ THE MAP RULE (ABSOLUTE):**

Maps are OPTIONAL. If used, they MUST meet ALL of these criteria:

| Requirement | Standard |
|-------------|----------|
| **Pure Vector SVG** | Mathematically clean shapes, no raster elements |
| **No Antique Effects** | Zero parchment, weathering, or faux-vintage styling |
| **Minimalist Labels** | Small, elegant, functional—never decorative |
| **Meaningful Motion** | Animation tells the story (migration, diffusion, trade) |
| **Apple Keynote Quality** | If it wouldn't fit a Steve Jobs presentation, remove it |

**If the SVG cannot be world-class, DO NOT INCLUDE A MAP.**

**Approved Map Styles:**
```css
.global-thread-map {
  /* Clean, modern aesthetic */
  background: var(--map-bg, #0d1117);
}

.map-landmass {
  fill: var(--map-land, #161b22);
  stroke: var(--map-border, #30363d);
  stroke-width: 0.5;
}

.map-route {
  fill: none;
  stroke: var(--map-route, #58a6ff);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: route-draw 4s ease-out forwards;
}

.map-label {
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  font-weight: 500;
  fill: var(--map-label, rgba(255, 255, 255, 0.6));
  text-anchor: middle;
}
```

**Movement Allowance:** III, IV (sparingly)

### Mode 5: Stillness & Revelation

**Purpose:** Minimal, meditative, powerful closing visuals.

**Technical Specifications:**
```css
.mode-stillness {
  /* Generous whitespace */
  padding: 15vh 0;
  
  /* Slow, intentional motion */
  --reveal-duration: 1.2s;
}

.stillness-element {
  animation: stillness-reveal var(--reveal-duration) ease-out;
}

.stillness-text {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  line-height: 1.7;
  max-width: 65ch;
  margin: 0 auto;
  opacity: 0;
  animation: stillness-text 1.5s ease-out 0.3s forwards;
}

@keyframes stillness-reveal {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Visual Elements:**
- Single focal point
- Maximum negative space
- Slow fade transitions
- Final sensory anchor state
- Typography as primary visual

**Movement Allowance:** I (opening only), V

---

## 🌀 INTERACTION MODES — USER AS PARTICIPANT

Every visual essay experience must include AT LEAST TWO of these interaction modes.

### Mode A: Ingredient Oracle

**Purpose:** Ingredients/objects whisper their history when tapped.

**Interaction Pattern:**
```tsx
interface OracleItem {
  id: string;
  name: string;
  whisper: string; // Short poetic line
  history: string; // Expanded content
  position: { x: number; y: number };
}

const IngredientOracle: React.FC<{ items: OracleItem[] }> = ({ items }) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  
  return (
    <div className="oracle-container">
      {items.map(item => (
        <button
          key={item.id}
          className={`oracle-item ${activeItem === item.id ? 'active' : ''}`}
          style={{ left: `${item.position.x}%`, top: `${item.position.y}%` }}
          onClick={() => setActiveItem(item.id)}
          aria-expanded={activeItem === item.id}
        >
          <span className="oracle-glow" />
          <span className="oracle-name">{item.name}</span>
        </button>
      ))}
      
      {activeItem && (
        <div className="oracle-reveal" role="tooltip">
          <p className="oracle-whisper">{items.find(i => i.id === activeItem)?.whisper}</p>
          <p className="oracle-history">{items.find(i => i.id === activeItem)?.history}</p>
        </div>
      )}
    </div>
  );
};
```

**Visual Design:**
- Subtle glow on interactive items
- Whisper text appears in elegant serif
- Smooth reveal animation
- Touch-friendly hit areas (44px+)

### Mode B: Migration Trail (SVG-Only, Ultra-Minimalist)

**Purpose:** Lines animate across a sleek vector canvas showing movement/spread.

**⚠️ NO aged map textures. Premium SVG only.**

**Implementation Pattern:**
```tsx
const MigrationTrail: React.FC<{ routes: Route[] }> = ({ routes }) => {
  const [activeRoute, setActiveRoute] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);
  
  useEffect(() => {
    // Animate path drawing
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = `${length}`;
      pathRef.current.style.strokeDashoffset = `${length}`;
      
      // Trigger animation
      pathRef.current.style.animation = 'route-draw 3s ease-out forwards';
    }
  }, [activeRoute]);
  
  return (
    <div className="migration-container">
      <svg viewBox="0 0 1000 500" className="migration-map">
        {/* Minimal land shapes */}
        <g className="map-lands">
          {/* Clean, geometric landmasses */}
        </g>
        
        {/* Animated route */}
        <path
          ref={pathRef}
          d={routes[activeRoute].path}
          className="migration-route"
        />
        
        {/* Origin/destination markers */}
        <circle cx={routes[activeRoute].origin.x} cy={routes[activeRoute].origin.y} r="6" className="route-marker origin" />
        <circle cx={routes[activeRoute].dest.x} cy={routes[activeRoute].dest.y} r="6" className="route-marker dest" />
      </svg>
      
      {/* Route selector */}
      <div className="route-controls">
        {routes.map((route, i) => (
          <button
            key={route.id}
            onClick={() => setActiveRoute(i)}
            className={i === activeRoute ? 'active' : ''}
          >
            {route.era}
          </button>
        ))}
      </div>
    </div>
  );
};
```

### Mode C: Flavor Resonance Wheel

**Purpose:** User rotates a dial to explore aromatic/flavor layers.

**Implementation Pattern:**
```tsx
const FlavorWheel: React.FC<{ flavors: Flavor[] }> = ({ flavors }) => {
  const [rotation, setRotation] = useState(0);
  const [activeSegment, setActiveSegment] = useState(0);
  
  const handleRotation = useCallback((direction: 'cw' | 'ccw') => {
    const segmentAngle = 360 / flavors.length;
    const newRotation = direction === 'cw' 
      ? rotation + segmentAngle 
      : rotation - segmentAngle;
    setRotation(newRotation);
    setActiveSegment((activeSegment + (direction === 'cw' ? 1 : -1) + flavors.length) % flavors.length);
  }, [rotation, activeSegment, flavors.length]);
  
  return (
    <div className="flavor-wheel-container">
      <svg viewBox="0 0 400 400" className="flavor-wheel">
        <g transform={`rotate(${rotation} 200 200)`} className="wheel-segments">
          {flavors.map((flavor, i) => (
            <g key={flavor.id} className={`segment ${i === activeSegment ? 'active' : ''}`}>
              <path d={calculateSegmentPath(i, flavors.length)} fill={flavor.color} />
              <text>{flavor.name}</text>
            </g>
          ))}
        </g>
        <circle cx="200" cy="200" r="40" className="wheel-center" />
      </svg>
      
      {/* Active flavor detail */}
      <div className="flavor-detail">
        <h3>{flavors[activeSegment].name}</h3>
        <p>{flavors[activeSegment].description}</p>
        <div className="flavor-notes">
          {flavors[activeSegment].notes.map(note => (
            <span key={note} className="flavor-note">{note}</span>
          ))}
        </div>
      </div>
      
      {/* Rotation controls */}
      <button onClick={() => handleRotation('ccw')} className="wheel-control prev">←</button>
      <button onClick={() => handleRotation('cw')} className="wheel-control next">→</button>
    </div>
  );
};
```

### Mode D: Timefold Slider

**Purpose:** Drag to see one location transform across decades/centuries.

**Implementation Pattern:**
```tsx
const TimefoldSlider: React.FC<{ eras: Era[] }> = ({ eras }) => {
  const [position, setPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setPosition(x);
  }, []);
  
  const currentEra = Math.floor(position * (eras.length - 1));
  const nextEra = Math.min(currentEra + 1, eras.length - 1);
  const blend = (position * (eras.length - 1)) % 1;
  
  return (
    <div 
      ref={containerRef}
      className="timefold-container"
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* Base layer (current era) */}
      <div className="timefold-layer base">
        <img src={eras[currentEra].image} alt={eras[currentEra].label} />
      </div>
      
      {/* Blend layer (next era) */}
      <div 
        className="timefold-layer blend"
        style={{ opacity: blend }}
      >
        <img src={eras[nextEra].image} alt={eras[nextEra].label} />
      </div>
      
      {/* Slider indicator */}
      <div className="timefold-indicator" style={{ left: `${position * 100}%` }}>
        <div className="indicator-line" />
        <span className="indicator-year">
          {eras[currentEra].year} → {eras[nextEra].year}
        </span>
      </div>
      
      {/* Era labels */}
      <div className="timefold-labels">
        {eras.map((era, i) => (
          <span 
            key={era.year}
            className="era-label"
            style={{ left: `${(i / (eras.length - 1)) * 100}%` }}
          >
            {era.year}
          </span>
        ))}
      </div>
    </div>
  );
};
```

### Mode E: Whispering Object

**Purpose:** A bowl, leaf, or pot reveals memories on hover/tap.

**Implementation Pattern:**
```tsx
const WhisperingObject: React.FC<{ object: ObjectConfig }> = ({ object }) => {
  const [isWhispering, setIsWhispering] = useState(false);
  const [currentMemory, setCurrentMemory] = useState(0);
  
  const handleInteraction = useCallback(() => {
    setIsWhispering(true);
    // Cycle through memories
    const timer = setInterval(() => {
      setCurrentMemory(prev => (prev + 1) % object.memories.length);
    }, 4000);
    
    return () => clearInterval(timer);
  }, [object.memories.length]);
  
  return (
    <div 
      className={`whispering-object ${isWhispering ? 'active' : ''}`}
      onMouseEnter={handleInteraction}
      onTouchStart={handleInteraction}
      onMouseLeave={() => setIsWhispering(false)}
    >
      {/* The object SVG */}
      <div className="object-visual">
        {object.svg}
        <div className="object-glow" />
      </div>
      
      {/* Whispered memories */}
      <div className="object-memories" aria-live="polite">
        {isWhispering && (
          <p className="memory-text">
            {object.memories[currentMemory]}
          </p>
        )}
      </div>
    </div>
  );
};
```

---

## 🎙️ NARRATION DESIGN — THREE VOICES

Every visual essay experience uses three distinct narrative voices that layer to create depth.

### Voice 1: The Seen (Descriptive)

**Purpose:** Describes what is visible on screen. Anchors the reader in the visual.

**Characteristics:**
- Present tense
- Concrete, sensory language
- Short sentences
- Appears as image captions or subtle overlay text

**Example:**
> "Steam rises from the clay pot. The leaves unfurl, releasing their first color."

### Voice 2: The Unseen (Contextual)

**Purpose:** Explains cultural depth, emotional context, historical significance.

**Characteristics:**
- Past or present tense (varies)
- Richer vocabulary
- Medium-length sentences
- Appears as body text paragraphs

**Example:**
> "For generations, this moment marked the beginning of something sacred. The preparation was never rushed—it couldn't be. Time itself was an ingredient."

### Voice 3: The Eternal (Poetic)

**Purpose:** One elevated, poetic sentence per major section that transcends the specific subject to touch universal truth.

**Characteristics:**
- Timeless present tense
- Metaphorical language
- Single sentence, carefully crafted
- Appears as pull quotes or section dividers
- Uses serif/display typography

**Example:**
> "We do not make tea. We make time visible."

**Implementation:**
```tsx
interface NarrationBlock {
  seen?: string;
  unseen: string;
  eternal?: string;
}

const Narration: React.FC<{ content: NarrationBlock }> = ({ content }) => (
  <div className="narration-block">
    {content.seen && (
      <p className="voice-seen">{content.seen}</p>
    )}
    <p className="voice-unseen">{content.unseen}</p>
    {content.eternal && (
      <blockquote className="voice-eternal">
        <p>{content.eternal}</p>
      </blockquote>
    )}
  </div>
);
```

**CSS:**
```css
.voice-seen {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
  margin-bottom: 0.5rem;
}

.voice-unseen {
  font-family: var(--font-serif);
  font-size: clamp(1.125rem, 2.5vw, 1.25rem);
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.9);
}

.voice-eternal {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-weight: 500;
  font-style: italic;
  text-align: center;
  color: var(--color-accent);
  padding: 2rem 0;
  margin: 3rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## 🎨 ART DIRECTION — THE ALBUM COVER RULE

**Every scene must be able to stand alone as a:**
- Criterion Collection still
- MoMA exhibition poster
- Michelin-star menu illustration
- National Geographic editorial spread

### Visual Quality Checklist

Before any visual element is approved:

- [ ] **Could this frame a museum wall?** If no, redesign.
- [ ] **Is every pixel intentional?** No filler, no padding.
- [ ] **Does it advance the story?** Decoration for its own sake is forbidden.
- [ ] **Is the typography considered?** Every character placement matters.
- [ ] **Does it respect the color palette?** No rogue hues.

### Forbidden Elements

| Category | Banned Items |
|----------|--------------|
| **Graphics** | Clip art, emojis, stock icons, generic patterns |
| **Photography** | Stock photos, obviously posed shots, watermarked images |
| **Maps** | Parchment textures, antique borders, decorative compass roses |
| **Typography** | Comic Sans, Papyrus, any "fun" font, excessive font mixing |
| **Effects** | Lens flares, drop shadows on text, bevels, glossy effects |
| **Layouts** | Centered-everything, symmetrical grids without purpose |

### Approved Visual Languages

| Style | Description | Use Case |
|-------|-------------|----------|
| **Editorial Minimalism** | Bloomberg, NYT Magazine | Data, statistics, modern subjects |
| **Textural Intimacy** | Close-up, tactile, detailed | Food, crafts, materials |
| **Geometric Abstraction** | Shapes, lines, minimal color | Historical eras, trade routes |
| **Photographic Stillness** | Single powerful image | Emotional beats, revelations |
| **Illustrated Precision** | Technical but beautiful SVG | Processes, anatomies, mechanics |

---

## 🗺️ MAP & CARTOGRAPHY RULE (STRICT)

Maps are **optional**, not required. Most stories are better without them.

**If used, maps must meet ALL of the following:**

### A. Pure Vector SVG Geometry
- Shapes, lines, and gradients must be mathematically clean
- No raster images embedded in SVG
- Think Apple Design Award level execution

### B. No Parchment / Antique / Weathered Effects
- Strictly forbidden
- No grain overlays suggesting age
- No "ancient map" styling whatsoever

### C. Minimalist Labels Only
- Country/city names must appear:
  - Small (0.6875rem or smaller)
  - Elegant (proper font, proper weight)
  - Functional (only necessary labels)
- Never decorative or ornamental

### D. Motion Must Be Meaningful
- Maps must tell a story through animation:
  - Ingredient migration paths
  - Trade route emergence
  - Diaspora movement
  - Cultural diffusion waves
- Static maps are forbidden—if it doesn't move, remove it

### E. World-Class or Nothing
**If the SVG cannot be executed at world-class level, remove the map entirely.**

This rule is absolute. A mediocre map is worse than no map.

---

## 🎵 SOUNDSCAPE CUES (OPTIONAL)

If audio is implemented, follow these guidelines:

### Ambient Layers
- Movement I: Silence or single tone
- Movement II: Environmental textures (distant, muffled)
- Movement III: Layered, complex, peak energy
- Movement IV: Contemporary, present sounds
- Movement V: Return to simplicity, final resonance

### Interaction Sounds
- Tap/click: Subtle, organic (ceramic tap, leaf rustle)
- Hover: Breath-like, nearly subliminal
- Transition: Whoosh-free, prefer fades
- Success: Warm, not celebratory

### Audio Rules
- Never autoplay with sound
- Always provide mute control
- Sound should enhance, never demand attention
- Prefer generative/procedural audio

---

## 🧰 OUTPUT REQUIREMENTS

Every visual essay experience created with this template MUST include:

### Required Deliverables

1. **Three Pillars Declaration**
   - Central Obsession statement
   - Cinematic POV with voice sample
   - Sensory Anchor with evolution states

2. **Five Movements Implementation**
   - Movement I: Invocation scene
   - Movement II: Ancestral Pulse (3+ scenes)
   - Movement III: Collision of Worlds (climax)
   - Movement IV: Modern Echo
   - Movement V: Revelation

3. **Visual Mode Usage**
   - Documented mode selection per section
   - CSS implementation for each active mode
   - Transition definitions between modes

4. **Interaction Modes (minimum 2)**
   - Component implementation
   - Touch/mouse parity
   - Accessibility considerations

5. **Narration System**
   - Three Voices applied throughout
   - Pull quotes for Eternal Voice
   - Consistent POV maintenance

6. **Art Direction**
   - Color palette with CSS variables
   - Typography stack definition
   - Visual quality approval for all assets

7. **Implementation Files**
   - `page.tsx` with metadata
   - `[Name]Client.tsx` with components
   - `[name].css` with cinematic styles
   - Any interaction components

8. **Sources Section**
   - Minimum 5 authoritative citations
   - Proper attribution format

### Quality Standards

| Aspect | Requirement |
|--------|-------------|
| **Cinematic** | Every viewport feels intentional |
| **Atmospheric** | Mood is palpable, not described |
| **Intellectual** | Teaches without lecturing |
| **Emotional** | Moves without manipulating |
| **Technical** | 60fps, accessible, performant |
| **Visual** | Museum-grade execution |

---

## 📋 PRE-FLIGHT CHECKLIST

Before publishing any visual essay experience:

### Structure
- [ ] Three Pillars clearly defined
- [ ] Five Movements properly paced
- [ ] At least 2 Interaction Modes implemented
- [ ] Three Voices consistently applied

### Visual
- [ ] Album Cover Rule passes for all scenes
- [ ] No forbidden visual elements
- [ ] Map Rule compliance (or no maps)
- [ ] Sensory Anchor appears in all Movements

### Technical
- [ ] 60fps on mobile devices
- [ ] Touch targets 44px+
- [ ] `prefers-reduced-motion` respected
- [ ] Safe areas handled
- [ ] No layout shifts (CLS < 0.1)

### Content
- [ ] POV voice consistent throughout
- [ ] Facts verified by historian-editor
- [ ] Sources section included
- [ ] No Wikipedia-style lecturing

### Experience
- [ ] Opening creates anticipation
- [ ] Climax delivers impact
- [ ] Ending resonates
- [ ] Would share this with others

---

## Last Updated
December 2024

---

*This template transforms any subject into a cinematic visual essay experience worthy of international design awards. It enforces radically high visual standards while maintaining narrative depth, emotional resonance, and technical excellence. Every element serves the story. Nothing is accidental.*




