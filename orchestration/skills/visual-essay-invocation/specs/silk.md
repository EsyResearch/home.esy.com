---
status: APPROVED
topic: Silk - 3,000 Years of Thread, Empire, and Espionage
generated: 2026-02-09
visual_treatment: photorealistic
chapters: 7
figures: 10
lens_applied: history
---

# Visual Essay Invocation: The Luminous Thread

---

## Layer 1: Strategic Foundation

### Project Title
**"The Luminous Thread: 5,000 Years of Silk, Secrecy, and Civilization"**

### Executive Brief

Create a photography-dense, scroll-driven visual essay that follows a single material — silk — across 5,000 years of human civilization. This is the story of a caterpillar's cocoon that connected every empire on Earth, sparked one of history's greatest acts of industrial espionage, and seeded the invention of the computer.

The narrative traces silk from the Neolithic Chinese villages where Bombyx mori was first domesticated, through the world's most famous trade route, into a Byzantine conspiracy that broke China's 3,000-year monopoly, through the European silk wars that clothed kings and starved weavers, to the Jacquard loom whose punch cards prefigured computing, to an American spy who revived Thai silk — and then vanished without a trace.

**Why this matters now:** In an age of synthetic materials and digital abstraction, silk is a reminder that a single biological thread can reshape empires, fund wars, inspire machines, and connect cultures across continents. The reader who finishes this essay will never touch silk the same way. They will feel 5,000 years in the thread.

**Emotional transformation:** Wonder → reverence → intrigue → outrage → awe → stillness.

### Visual Treatment Philosophy

#### Photography-Heavy Treatment

This essay requires **30–38 photographs** — approximately 3× the image density of a standard visual essay. Photography is not illustration; it is evidence, texture, and presence.

**Era 1: Neolithic & Ancient China (6500 BCE – 200 BCE)**
- Color treatment: Warm ochre, terracotta, jade green, gold
- Processing: Warm color grading, slight grain, intimate close-up framing
- Sources: Museum textile collections, archaeological photography, Suzhou Silk Museum
- Key visual: Macro of silkworm on mulberry leaf, Han Dynasty silk fragments

**Era 2: Silk Road (200 BCE – 800 CE)**
- Color treatment: Desert sand, lapis lazuli blue, imperial red, Byzantine purple and gold
- Processing: Wide landscape format, warm saturation, epic scale
- Sources: UNESCO heritage sites, Wikimedia landscape photography, British Museum
- Key visual: Taklamakan desert panorama, Justinian mosaic at San Vitale

**Era 3: European Silk Wars (900 – 1800)**
- Color treatment: Versailles gold, Lyon crimson, Venetian deep blue
- Processing: Painterly contrast, detail-oriented fabric close-ups
- Sources: V&A Museum, Louvre, Lyon municipal archives
- Key visual: Rigaud's Louis XIV portrait, Jacquard loom mechanism

**Era 4: Modern (1900 – Present)**
- Color treatment: Clean, documentary, natural light
- Processing: Sharp, editorial quality
- Sources: Jim Thompson House Museum, news archives, fashion archives
- Key visual: Jim Thompson in Bangkok, Thai silk weaver at loom

**Transition Treatment:**
Era shifts are driven by scroll-position — color grading shifts gradually, grain increases or decreases, light temperature changes. The silk thread itself remains luminous through every era, a constant amid visual change.

---

## Layer 2: Technical Systems

### Scroll-Lock Animation System

**Critical Implementation:** Viewport locks during key sequences; scroll input drives animation progress.

**Required Behavior:**
- Scroll into designated zone triggers viewport lock
- Continued scroll input controls animation progress
- Visual progress indicator shows sequence completion
- Upon 100% completion, lock releases with smooth easing
- Skip affordance: "Skip to continue" link, bottom-right, 40% opacity until hover

**Scroll-Lock Sequences for This Essay:**

1. **The Thread Reveal** (Hero) — A silk thread materializes from darkness, catching light as the reader scrolls. Light refracts through the fiber's triangular cross-section, rainbow spectral effects.
2. **The Lifecycle** (Movement II) — IngredientOracle: mulberry leaf → silkworm → cocoon → reeling → thread → fabric → garment. Scroll controls progression through 7 stages.
3. **The Route** (Movement III) — MigrationTrail: animated line traces the Silk Road from Xi'an to Constantinople with photographed landscape at each stop. Scroll controls the journey westward.
4. **The Smuggling** (Movement III) — Scroll reveals the hollow bamboo cane cross-section, then silkworm eggs hidden inside, then the two monks walking westward.
5. **The Punch Card** (Movement IV) — Split screen: Jacquard punch card on left, woven silk pattern on right. Scroll drives the card through the loom mechanism.
6. **The TimefoldSlider** (Movement V) — 8-era slider from 6500 BCE to present. Each era shows a key photograph and one-line caption.

### Parallax Depth System

- **Layer 0 (Background):** Silk texture, woven pattern — moves at 0.2× scroll
- **Layer 1 (Mid-ground):** Landscape, architecture, fabric drape — moves at 0.5× scroll
- **Layer 2 (Subject):** Figures, artifacts, photographs — moves at 1.0× (reference)
- **Layer 3 (Overlay):** Pull quotes, dates, captions — moves at 1.3× scroll
- **Layer 4 (Ambient):** Silk shimmer particles, light refraction, dust motes — moves at 1.6× scroll

### Progress Bar Design

#### Concept: "The Thread"

The progress indicator is a single vertical silk thread, left edge, that extends and shimmers as the reader scrolls. It begins as a single fiber and gradually thickens as more history wraps around it.

**Design:**
- Position: Left edge, vertical, 85% viewport height
- Visual: Luminous thread that catches light — subtle rainbow refraction
- Movement markers: Thread develops visible "knots" at each Movement transition
- Current position: Bright shimmer point on the thread
- Completed sections: Thread behind shimmer point is golden; ahead is silver-white
- Hover: Reveals movement title and scroll percentage

**Data Structure:**
- Movement I (Invocation): Thread emerges, single fiber (0–10%)
- Movement II (Ancestral): Thread thickens — ancient Chinese silk weight (10–35%)
- Movement III (Collision): Thread frays and reforms — tension and convergence (35–65%)
- Movement IV (Modern Echo): Thread twists with a metallic strand — machine age (65–85%)
- Movement V (Revelation): Thread pulses with light — full luminosity (85–100%)

---

## Layer 3: Hero Architecture

### Scroll-Lock Hero Sequence: "The Thread Reveal"

**Duration:** 10% of total essay scroll
**Lock Type:** Full viewport lock — scroll input drives animation

**Choreography:**

**0–20% scroll (Black void)**
Absolute darkness. No UI, no text, no navigation. One pixel of light appears at screen center.

**20–40% (Thread materializes)**
The light elongates vertically — a single silk filament. It catches light, revealing the triangular cross-section that gives silk its characteristic shimmer. Subtle rainbow refraction. Ambient sound design: the creak of a wooden loom (optional, muted by default).

**40–60% (Texture emerges)**
Camera "pulls back" — the thread is one of thousands, woven into fabric. The fabric ripples gently, responding to scroll micro-movements. Background warms from black to deep amber.

**60–80% (Title card)**
Fabric recedes to background. Text appears, character by character:

> *"For three thousand years, China kept one secret."*

Pause. Then below:

> *"How caterpillars make thread."*

**80–100% (Title reveal)**
Title card: **THE LUMINOUS THREAD**
Subtitle fades in: *5,000 Years of Silk, Secrecy, and Civilization*

Background fabric becomes the visual foundation for Movement I transition. Viewport lock releases with 400ms ease-out.

---

## Layer 4: Chapter Schema

### Movement I — Invocation: "The Shimmer"
*Scroll: 0–10% | Duration: ~1.5 min read*

**Central metaphor:** A single thread contains all of civilization's vanity, ambition, and beauty.

**Visual assets:**
- Hero image: Macro photography of silk fiber catching light (full-bleed)
- Background: Silk fabric texture, extreme close-up, warm amber
- Ambient: Slow parallax shimmer particles

**Content focus:**
- Pure sensory immersion — no facts, no dates, no names
- The physical experience of silk: luminosity, drape, translucency
- The sound metaphor: a loom's rhythm (suggested, not literal)
- Sensory vocabulary: "shimmer," "whisper," "breath"

**Scroll-lock sequence:** "The Thread Reveal" (see Layer 3)

**Parallax treatment:** Maximum depth separation — background silk texture at 0.2×, thread particle system at 1.6×

---

### Movement II — Ancestral Pulse: "The Secret Kingdom"
*Scroll: 10–35% | Duration: ~4.5 min read*

**Central metaphor:** For millennia, one civilization guarded one secret — and built an empire on a caterpillar.

**Visual assets:**
- Mulberry grove photography (Chinese countryside)
- Silkworm macro photography (Bombyx mori on leaf, cocoon stages)
- Hand-reeling photography (artisan reeling silk from cocoons in water)
- Han Dynasty silk fragment (museum archival photo)
- Mawangdui silk banner (archaeological photo)
- Zhang Qian statue (Xi'an)
- Oracle bone inscription with silk character (丝)

**Content focus:**

*Beat 1: The Origin*
- Archaeological evidence: silk protein residues at Hemudu, c. 6500 BCE
- The Empress Leizu legend — a cocoon falls into tea
- Clarification: Leizu is cultural myth, but the myth itself is historically significant
- The biology: Bombyx mori — blind, flightless, utterly dependent on humans after millennia of selective breeding

*Beat 2: The State Secret*
- Sericulture as state-controlled technology
- Death penalty for smuggling silkworms or mulberry seeds
- Silk as currency: tax payments, diplomatic gifts, soldier wages
- The Chinese character evolution: 丝 (silk) → one of the most common radicals in Chinese writing

*Beat 3: The IngredientOracle Sequence*
- **Scroll-lock interaction**: IngredientOracle
- Stages: Mulberry leaf → Silkworm → Cocoon → Reeling → Thread → Fabric → Garment
- Each stage: photograph + one-line revelation
  - "One silkworm eats 20× its weight in mulberry leaves"
  - "Each cocoon contains a single filament up to 900 meters long"
  - "25,000 cocoons make one silk dress"

*Beat 4: Zhang Qian Opens the Road*
- Emperor Wu sends Zhang Qian west (138 BCE)
- Captured by Xiongnu, held 10 years, completes mission anyway
- His intelligence reports reveal Central Asia to China for the first time
- The routes he maps will become the Silk Road

**Key figure profiles:**

**Empress Leizu (c. 2700 BCE, legendary)**
> *Role: Discoverer of silk (Chinese tradition)*
> *Imagery: Temple depictions, traditional paintings*
> *Quote: N/A — legendary figure, but referenced in Records of the Grand Historian*

**Zhang Qian (d. 114 BCE)**
> *Role: Han diplomat who opened the Silk Road*
> *Imagery: Han tomb murals, modern statues in Xi'an*
> *Quote: "Zhang Qian was the first person to bring back a clear account of the regions west of China." — Sima Qian*

**Scroll-lock sequence:** "The Lifecycle" — IngredientOracle interaction
**Parallax treatment:** Warm interior → expanding outward as Zhang Qian's journey begins

---

### Movement III — Collision of Worlds: "The Road and the Heist"
*Scroll: 35–65% | Duration: ~6 min read*

**Central metaphor:** The thread that connected Rome to Xi'an also connected conspiracy to salvation — and the man who broke the secret changed the world.

**Visual assets:**
- Taklamakan Desert panorama (Silk Road landscape)
- Dunhuang Mogao Caves (silk-painted Buddhist murals)
- Samarkand Registan Square
- Caravanserai ruins (Central Asia)
- Afrasiab murals — Sogdian merchants (7th c.)
- Justinian I mosaic, San Vitale, Ravenna
- Byzantine silk textile with eagle pattern
- Islamic tiraz silk with Arabic calligraphy
- Silk Road map (cartographic style)
- Damascus textile souk

**Content focus:**

*Beat 1: The Road*
- The Silk Road was not one road — Hansen's revision: a shifting network of routes
- But the romantic name captures something real: the first sustained connection between East and West
- **MigrationTrail interaction**: Xi'an → Dunhuang → Kashgar → Samarkand → Baghdad → Constantinople → Venice
- Each stop has a landscape photograph and brief caption

*Beat 2: The Intermediaries Nobody Remembers*
- The Sogdian merchants: Iranian-speaking traders from Samarkand
- They dominated East-West trade for 400+ years
- "The Sogdians left behind letters, contracts, and account books that reveal the mechanics of Silk Road trade in unprecedented detail." — de la Vaissière
- The Afrasiab murals: the only surviving portraits of Sogdian merchants

*Beat 3: Rome's Obsession*
- Romans craved silk but didn't understand it — Pliny thought it grew on trees
- "The Seres are famous for the woollen substance obtained from their forests"
- Roman Senate tried to ban men's silk: "Let no man disgrace himself by wearing silk"
- The ban failed completely
- Annual Roman trade deficit: Pliny estimated 100 million sesterces flowing east

*Beat 4: The Byzantine Heist — the essay's dramatic climax*
- Justinian I needs silk independence — Persian intermediaries are bleeding the treasury
- c. 552 CE: Two unnamed Nestorian monks approach Justinian
- "They said that they were formerly in Serinda... and that while they were living there they had learned the whole art of making silk" — Procopius
- They promise to smuggle silkworm eggs — hidden in hollow bamboo canes
- **Scroll-lock sequence**: "The Smuggling" — cross-section reveal of the bamboo cane
- They succeed. Byzantium launches its own silk industry.
- China's 3,000-year monopoly: broken by two anonymous men and a bamboo cane

*Beat 5: Islamic Silk*
- 7th–8th century: Islamic conquest brings silk to Damascus, Baghdad, Córdoba
- "Damask" — named for Damascus
- Tiraz workshops: silk with woven Arabic calligraphy — art and text as one
- Islamic geometric patterns on silk: a new aesthetic vocabulary

**Key figure profiles:**

**Justinian I (482–565 CE)**
> *Role: Byzantine Emperor who broke China's silk monopoly*
> *Imagery: San Vitale mosaic, Ravenna — in purple silk, gold halo*
> *Quote (via Procopius): "About the same time there came from India certain monks; and when they had satisfied Justinian Augustus that the Romans no longer should buy silk from the Persians, they promised the emperor... they would provide the materials for making silk."*

**The Two Monks (c. 552 CE)**
> *Role: Anonymous smugglers of silkworm eggs*
> *Imagery: Medieval manuscript illustrations*
> *Quote: "They said that they were formerly in Serinda, and that while they were living there they had learned the whole art of making silk." — Procopius*

**Sogdian Merchants (4th–8th century, collective)**
> *Role: The invisible intermediaries of Silk Road trade*
> *Imagery: Afrasiab murals, Chinese tomb figurines*
> *Quote: "The Sogdians left behind letters, contracts, and account books that reveal the mechanics of Silk Road trade in unprecedented detail." — de la Vaissière*

**Pliny the Elder (23–79 CE)**
> *Role: Roman naturalist — the Western perspective on silk*
> *Imagery: Medieval manuscript portraits*
> *Quote: "So manifold is the labour employed, and so distant is the region of the globe drawn upon, to enable the Roman matron to flaunt transparent raiment in public."*

**Scroll-lock sequences:** "The Route" (MigrationTrail) + "The Smuggling" (bamboo reveal)
**Parallax treatment:** Maximum epic scale for landscapes; intimate, conspiratorial lighting for the smuggling sequence

---

### Movement IV — Modern Echo: "The Machine and the Mystery"
*Scroll: 65–85% | Duration: ~4 min read*

**Central metaphor:** The thread that connected empires now connects to the machine in your pocket — and the man who pulled it from oblivion vanished into thin air.

**Visual assets:**
- Jacquard loom mechanism (working, close-up)
- Jacquard punch cards (detail)
- Jacquard's silk self-portrait (woven in silk, Musée des Arts et Métiers)
- Lyon silk workers (historical photos, Canut revolt era)
- Ada Lovelace portrait
- Jim Thompson photograph (1950s Bangkok)
- Jim Thompson House, Bangkok
- Thai silk weaver at traditional loom
- Modern Suzhou silk factory
- Silk on contemporary fashion runway

**Content focus:**

*Beat 1: The Punch Card Revolution*
- Joseph Marie Jacquard, Lyon, 1804
- His loom used interchangeable punch cards to automate complex silk patterns
- Each card = one row of the pattern. Stack the cards = program the loom.
- **Scroll-lock sequence**: "The Punch Card" — split screen showing card and resulting pattern
- Ada Lovelace: "The Analytical Engine weaves algebraic patterns just as the Jacquard loom weaves flowers and leaves"
- Direct technical lineage: Jacquard → Babbage → Hollerith → IBM → the computer on your lap
- Jacquard's silk self-portrait: woven using 24,000 punch cards — one of history's great flex moves

*Beat 2: The Lyon Workers' Revolt*
- By 1720, Lyon employed 28,000+ silk workers
- The Canuts (silk workers) lived in poverty despite producing the world's most luxurious fabric
- 1831: First Canut revolt — "Vivre en travaillant ou mourir en combattant!" (Live working or die fighting)
- "We work sixteen hours a day and yet we lack bread."
- The silk that clothed kings was woven by hands that couldn't afford bread

*Beat 3: The American Spy Who Saved Thai Silk*
- Jim Thompson: OSS/CIA officer, arrives Bangkok post-WWII
- Finds Thai silk industry dying — weavers switching to synthetics
- Single-handedly creates a global luxury brand from hand-woven Thai silk
- "Thai silk was dying when I arrived. I simply showed them the world still wanted what they made."
- March 26, 1967: Thompson walks into the Malaysian Cameron Highlands and is never seen again
- Theories: tiger, Communists, CIA — body never found
- His house in Bangkok is now a museum surrounded by silk

*Beat 4: The Thread Today*
- China still produces 80% of world's raw silk (FAO, 2023)
- Global market: ~$16.9 billion
- 5,000 years later, the same caterpillar, the same mulberry leaf, the same thread
- But also: medical sutures, parachutes, biotech silk (spider silk synthesis)
- The ethical question: each cocoon is boiled with the pupa inside

**Key figure profiles:**

**Joseph Marie Jacquard (1752–1834)**
> *Role: Inventor of the programmable loom*
> *Imagery: Portrait by Claude Bonnefond; Jacquard silk self-portrait (24,000 punch cards)*
> *Quote: "It is the invention which weaves flowered silks, in a style far superior to anything that was done before." — 1812 British government report*

**Jim Thompson (1906–1967, presumed dead)**
> *Role: American who revived Thai silk, then vanished*
> *Imagery: Photographs from Jim Thompson House Museum*
> *Quote: "Thai silk was dying when I arrived. The weavers were switching to synthetic threads. I simply showed them the world still wanted what they made."*

**Ada Lovelace (1815–1852)**
> *Role: Mathematician who connected Jacquard to computing*
> *Imagery: Portrait (watercolor by Alfred Edward Chalon)*
> *Quote: "The Analytical Engine weaves algebraic patterns just as the Jacquard loom weaves flowers and leaves."*

**Scroll-lock sequence:** "The Punch Card" — split-screen Jacquard mechanism
**Parallax treatment:** Transitioning from mechanical (hard shadows, precision) to warm documentary (Jim Thompson's Bangkok) to clean contemporary

---

### Movement V — Revelation: "The Thread That Remains"
*Scroll: 85–100% | Duration: ~2 min read*

**Central metaphor:** One thread, 5,000 years. The caterpillar doesn't know what it's making. Maybe we don't either.

**Visual assets:**
- Silk thread extreme close-up (triangular cross-section, SEM-style)
- Mulberry tree in morning light
- Empty loom with single thread
- Callback to hero image: the same thread, the same shimmer

**Content focus:**

*Beat 1: The Return*
- Pull back from the modern to the timeless
- One thread of silk is 1/25th the diameter of a human hair
- Its triangular cross-section refracts light like a prism — this is why silk shimmers
- The shimmer you see in a silk scarf is the same physics that caught firelight in a Neolithic Chinese village

*Beat 2: The Continuity*
- China discovered silk ~6500 BCE. China still makes 80% of the world's silk.
- That is the longest-running economic dominance in human history.
- The mulberry tree still grows. The silkworm still spins. The thread still shimmers.
- But now it also runs through the history of computing, the history of espionage, the history of labor, the history of fashion, the history of empire.

*Beat 3: The Quiet*
- **TimefoldSlider interaction**: 8 eras, from 6500 BCE to present
- Each era: one photograph, one sentence
- The slider allows the reader to compress or expand 8,500 years with a gesture

*Final image:*
- Return to the opening visual: a single silk thread catching light
- But now the reader knows what the thread has carried
- Text: *"The caterpillar spins in darkness. It does not know it is making civilization."*
- Fade to essay end.

**Scroll-lock sequence:** "TimefoldSlider" interaction
**Parallax treatment:** Minimal — intimate, quiet, almost still

---

## Layer 5: Design System

### Color Palette

| Token | Hex | Usage | Semantic |
|-------|-----|-------|----------|
| `--silk-gold` | `#C9A84C` | Primary accent, thread shimmer | Silk's natural color, luxury |
| `--silk-ivory` | `#F5F0E8` | Background (light mode) | Raw silk, cocoon |
| `--silk-deep` | `#1A1510` | Background (dark sections) | The darkness inside the cocoon |
| `--silk-mulberry` | `#6B3A5C` | Secondary accent | Mulberry leaf, dye tradition |
| `--silk-lapis` | `#264B8C` | Silk Road sections | Lapis lazuli from Afghanistan — the road's color |
| `--silk-byzantine` | `#6B2D75` | Byzantine section | Tyrian purple — the emperor's silk |
| `--silk-crimson` | `#8B1A1A` | European section | Lyon silk, revolution, blood |
| `--silk-sand` | `#D4C5A9` | Silk Road landscapes | Desert, caravanserai |
| `--silk-jade` | `#4A7C59` | Chinese sections | Jade — China's other precious material |
| `--silk-white` | `#FAFAFA` | Text on dark, highlights | Silk's characteristic luminosity |

### Typography Scale

| Element | Font | Size | Weight | Tracking |
|---------|------|------|--------|----------|
| Movement titles | Serif (Georgia or custom) | 3.5rem / 56px | 400 | +0.02em |
| Chapter headings | Serif | 2.25rem / 36px | 600 | +0.01em |
| Body narrative | Serif | 1.125rem / 18px | 400 | normal |
| Pull quotes | Serif italic | 1.5rem / 24px | 400 | +0.01em |
| Figure captions | Sans-serif | 0.875rem / 14px | 400 | +0.02em |
| Timeline dates | Monospace or condensed sans | 0.9375rem / 15px | 700 | +0.05em |
| Interactive labels | Sans-serif | 0.8125rem / 13px | 500 | +0.04em |

**Typography philosophy:** Serif-dominant, in honor of the text traditions that silk roads carried between civilizations. The serif should feel timeless — not antique, not modern. It should feel like a voice that has been speaking for 5,000 years.

### Animation Principles

| Property | Value | Usage |
|----------|-------|-------|
| Base duration | 600ms | Standard transitions |
| Slow reveal | 1200ms | Hero sequence, title reveals |
| Micro-interaction | 200ms | Hover states, toggles |
| Easing (entrance) | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Elements appearing — smooth deceleration |
| Easing (exit) | `cubic-bezier(0.55, 0.06, 0.68, 0.19)` | Elements departing — quick acceleration |
| Scroll-lock easing | `cubic-bezier(0.22, 0.61, 0.36, 1)` | Lock engage/release — must feel natural |
| Parallax smoothing | 16ms throttle + `will-change: transform` | Prevent jank on scroll |
| Stagger delay | 80ms per element | Sequential reveals (e.g., MigrationTrail stops) |

**Animation philosophy:** Silk moves like breath — never sudden, never jerky. Animations should feel like fabric unfurling, not mechanical snapping. The only sharp motion should be the "moment of breaking" — when the monks smuggle the eggs, when the Canuts revolt.

### Era Mood Treatments

See research/ERA-GUIDE.md for full era-specific visual processing. Summary:

1. **Neolithic/Ancient China** — Warm, intimate, firelit. Ochre and jade.
2. **Silk Road** — Wide, epic, sunlit. Sand and lapis.
3. **Byzantine/Islamic** — Rich, conspiratorial, mosaic gold. Purple and turquoise.
4. **European Courts** — Opulent, exploitative, chandelier-lit. Crimson and gold.
5. **Modern** — Clean, documentary, natural. White and warm wood.

---

## Layer 6: Implementation

### Responsive Adaptations

| Breakpoint | Adjustments |
|------------|-------------|
| Desktop (≥1200px) | Full parallax, full-bleed photography, side-by-side scroll-lock panels |
| Tablet (768–1199px) | Reduced parallax layers (3 instead of 5), stacked scroll-lock panels |
| Mobile (≤767px) | No parallax (performance), vertical scroll replaces horizontal MigrationTrail, tap instead of hover for IngredientOracle |

**Mobile-first photography:** All photographs must work at mobile viewport width. Hero images crop to portrait orientation on mobile. MigrationTrail becomes vertical scroll with stops.

### Accessibility Requirements

- All photographs: descriptive `alt` text (min 15 words for hero images)
- All scroll-lock sequences: skip button visible at all times (keyboard accessible)
- All interactions: keyboard navigable (Tab, Enter, Space, Arrow keys)
- Color contrast: 4.5:1 minimum for all text (WCAG AA)
- Reduced motion: `prefers-reduced-motion` disables parallax, scroll-lock becomes simple scroll, animation durations set to 0
- Screen reader: All visual content has text equivalent; figure profiles read as structured data

### Source Attribution

- All photographs must include source attribution on hover (caption bar) and in a bibliography section
- Museum images: include institution name, collection number where available
- Wikimedia images: include license type (CC-BY-SA, Public Domain)
- Quotes: inline attribution (speaker, source, date) + bibliography entry
- All sources linked to CITATIONS.md entries (C1–C22)

### Interaction Mode Specifications

#### MigrationTrail: The Silk Road
- **Type**: Horizontal scroll map with 7 stops
- **Stops**: Xi'an → Dunhuang → Kashgar → Samarkand → Baghdad → Constantinople → Venice
- **Each stop**: Landscape photograph (16:9), city name, one-sentence caption, date range
- **Animation**: Route line animates between stops on scroll; current stop glows
- **Mobile**: Vertical scroll with stops stacked

#### IngredientOracle: Sericulture Process
- **Type**: Progressive reveal, 7 stages
- **Stages**: Mulberry leaf → Silkworm → Cocoon → Reeling → Thread → Fabric → Garment
- **Each stage**: Close-up photograph, item name, one-line revelation
- **Interaction**: Tap/click to reveal; scroll to advance
- **Mobile**: Swipe carousel

#### TimefoldSlider: 5,000 Years
- **Type**: Horizontal slider, 8 era stops
- **Eras**: 6500 BCE | 2700 BCE | 138 BCE | 552 CE | 1300 CE | 1804 CE | 1948 CE | Present
- **Each era**: Key photograph, one-sentence caption
- **Interaction**: Drag slider or use arrow keys
- **Mobile**: Swipe or tap arrows

### Deliverables Checklist

- [ ] page.tsx — Next.js route at `/essays/silk`
- [ ] SilkClient.tsx — Client component with all movements
- [ ] silk.css — Full stylesheet with design tokens
- [ ] DESIGN-RESEARCH.md — Subject-derived visual identity
- [ ] research/ — Complete research package (7 files)
- [ ] 30–38 sourced photographs with licenses verified
- [ ] All 3 interaction modes implemented (MigrationTrail, IngredientOracle, TimefoldSlider)
- [ ] 6 scroll-lock sequences
- [ ] Responsive at all 3 breakpoints
- [ ] WCAG AA accessibility compliance
- [ ] Bibliography section with all 22 sources
- [ ] Performance: < 3s LCP on 4G connection (lazy-load images below fold)
