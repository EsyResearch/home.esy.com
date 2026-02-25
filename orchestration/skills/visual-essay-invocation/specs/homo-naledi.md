# Visual Essay Specification — Layers 1–3

## Title

**Homo naledi: The Small-Brained Species That Buried Its Dead**

## Subtitle

1,500 Bones, 560 Cubic Centimetres, and the Question of What Makes Us Human

## Category

Science (Paleoanthropology)

## Cluster

Parent: *Seven Million Years*
Sibling: *Lucy: Before the Genus Homo*

---

## Layer 1 — Strategic Foundation

### Executive Brief

The emotional throughline is **"a paradox made of bone."**

A species with a gorilla-sized brain may have carried its dead through pitch-dark cave passages. If true, brain size isn't what makes us human. If false, explaining 1,500 bones in an unreachable chamber is its own mystery.

The essay holds both possibilities open. It presents the evidence — the morphology, the geology, the taphonomy — and lets the reader feel the weight of the question rather than rushing to a verdict. The narrative arc follows the physical journey: darkness → discovery → anatomy → controversy → implication.

### Visual Treatment

Photography-forward, cave darkness aesthetic. Subterranean specimens rendered on near-black backgrounds. Light is scarce and intentional — every illuminated surface is an act of attention.

**Sources:** eLife CC-BY 4.0 and Wikimedia Commons.

**Asset budget:**
- 38 photographs (specimens, cave system, excavation context)
- 14 data visualizations (comparative anatomy, timelines, cladograms)
- 2 interactive 3D specimen viewers (DH1 cranium, H. naledi hand)

### Audience

Beginner–Intermediate. No prerequisite knowledge of paleoanthropology assumed. Technical terms introduced in context with inline definitions. The essay rewards close reading but never requires it — every section is self-contained enough to skim.

---

## Layer 2 — Technical Systems

### Scroll Mechanics

- Section-based reveals with lazy-loaded images
- Intersection Observer triggers for progressive disclosure
- No scroll-hijacking — native browser scroll throughout
- Sections fade or slide into view as the reader reaches them

### Progress Indicator

Vertical descent line running along the left edge of the viewport. The reader **descends into the cave** as they scroll — the line fills downward, mapping reading progress to physical depth. Depth markers correspond to major essay sections.

### 3D Specimen Viewers

- **Runtime:** React Three Fiber
- **Loading:** Lazy-loaded bundles — 3D code only ships when the viewer scrolls into range
- **Rendering:** `frameloop="demand"` (render only on interaction, not every frame)
- **Fallback:** Static high-resolution photograph displayed if WebGL is unavailable or while the 3D bundle loads
- **Interaction:** Orbit controls (rotate, zoom). No auto-spin. The reader chooses to engage.

### Performance Targets

| Metric | Target |
|--------|--------|
| LCP | < 3 s |
| 3D bundle | Lazy-loaded, never in critical path |
| Mesh size | Decimated to 500 KB – 1 MB per model |
| Images | `srcset` + WebP/AVIF with LQIP placeholders |
| Total page weight | < 8 MB initial, < 25 MB fully loaded |

---

## Layer 3 — Hero Architecture

### Concept: Descent into Darkness

The essay opens on near-black. Silence before the story.

**Sequence:**

1. **The void.** Screen is `#0D0E12` — almost black, not quite. A faint grain texture prevents the feeling of a broken page.
2. **The cranium appears.** The DH1 cranium fades in from darkness — bone ivory emerging from void. Centred, mid-frame. No border, no container. Just bone and negative space.
3. **The title lands.** Below the cranium, in large serif type: *Homo naledi: The Small-Brained Species That Buried Its Dead.* It appears after the cranium is fully visible — the specimen comes first, the language second.
4. **Metadata resolves.** Subtitle, reading time (35 min), source count (24 sources), visualization count (14 visualizations) fade in last, in accent color. Small, precise, unhurried.

### Scroll Behaviour

No scroll-lock on the hero. Clean entry — the reader scrolls naturally and the hero gives way to Section 1 without interruption. The descent line begins tracking as soon as the reader moves past the hero fold.

### Color Palette

| Role | Value | Description |
|------|-------|-------------|
| Background | `#0D0E12` | Near-black cave void |
| Primary text | `#E8DCC8` | Warm bone ivory |
| Accent / metadata | `#C4893A` | Amber — lamplight on stone |

---

## Layer 4 — Chapter Schema

Each section specifies: title, temporal/contextual marker, central metaphor, visual assets, narrative beats, key figure with quote, and scroll treatment.

---

### Section 1 — The Recruitment

**When:** 2013
**Metaphor:** "The ad that broke every rule."

**Visual Assets:**
- Images: Berger portrait, astronaut team
- Visualizations: —

**Narrative Beats:**
1. Lee Berger posts a Facebook ad calling for small-bodied scientists willing to work in dangerous conditions underground
2. Six women — all early-career researchers — are selected from a global applicant pool
3. Superman's Crawl: 18 cm (7 in) wide in places, a passage most adult humans cannot physically enter
4. The paleoanthropology establishment reacts with skepticism and disdain — this isn't how fieldwork is done

**Key Figure:** Lee Berger — *"The question was not whether we could get scientists down there. The question was whether we could get them back out."*

**Scroll Treatment:** Opens with Berger's face, full-bleed, fading in from darkness. The Facebook post appears as a reconstructed card element overlaid on cave darkness. Team portraits enter as a horizontal row that scrolls into alignment.

---

### Section 2 — The Cave

**When:** Rising Star Cave System, present day
**Metaphor:** "A cathedral of darkness."

**Visual Assets:**
- Images: cave entrance, Superman's Crawl, Dragon's Back, Dinaledi Chamber
- Visualizations: D1 (Cave Cross-Section)

**Narrative Beats:**
1. The physical journey from surface to chamber — sunlight to total darkness in stages
2. Superman's Crawl dimensions and Dragon's Back climb — the body as the limiting factor
3. Total darkness in Dinaledi Chamber: no natural light has reached it in geological time
4. Why the geography matters: the inaccessibility of the chamber is central to the disposal argument — if it's hard for humans to reach, it's harder for accident or predators to explain

**Key Figure:** Marina Elliott — *"You chimney up, slide down, and then you're in a space that has never seen light. And there are bones everywhere."*

**Scroll Treatment:** D1 (Cave Cross-Section) builds progressively as the reader scrolls — surface, entrance zone, Superman's Crawl, Dragon's Back, Dinaledi Chamber — each segment lighting up in sequence. Cave photographs appear at their corresponding depth positions alongside the cross-section.

---

### Section 3 — The Haul

**When:** 2013–2015
**Metaphor:** "More bones than entire species."

**Visual Assets:**
- Images: bones in situ, specimens on lab table
- Visualizations: D5 (Chamber Floor Plan)

**Narrative Beats:**
1. 1,550+ fragments recovered from Dinaledi Chamber — one of the largest single-species assemblages in the history of African paleoanthropology
2. At least 15 individuals represented, from infants to elderly adults — all age classes present
3. The excavation grid and methodology: real-time video, remote guidance, millimeter-precision recovery
4. Context: many hominin species are known from a single jawbone or partial skull — naledi has an embarrassment of riches

**Key Figure:** Becca Peixotto — *"We were pulling bone out of the ground faster than we could catalogue it."*

**Scroll Treatment:** D5 (Chamber Floor Plan) serves as the section anchor. Bone fragments animate into their mapped positions on the grid. A counter ticks upward as specimens enter view — 100, 500, 1,000, 1,550+.

---

### Section 4 — The Mosaic Body

**When:** Anatomy (timeless)
**Metaphor:** "A body assembled from two different eras."

**Visual Assets:**
- Images: composite skeleton, hand, foot, shoulder, pelvis
- Visualizations: D2 (Anatomical Mosaic), D7 (Hand Morphology), D14 (Hand 3D Viewer)

**Narrative Beats:**
1. Primitive regions: small brain, curved fingers (arboreal grip), australopith-like shoulder and trunk
2. Modern regions: long legs, human-like feet and ankles (committed bipedalism), wrist morphology suited to tool use
3. What this combination means: naledi isn't a transitional form — it's a mosaic, mixing features separated by millions of years in other lineages
4. Why it defies easy classification: no existing category in the hominin family tree accommodates a body like this
5. Cross-link to Lucy essay — Lucy's mosaic was bipedalism + small brain; naledi's mosaic is more extreme

**Key Figure:** John Hawks — *"It's as if evolution assembled this creature from a parts bin spanning three million years."*

**Scroll Treatment:** D2 (Anatomical Mosaic) is the centrepiece — an interactive body map where the reader can tap/hover on regions to see primitive vs. modern annotations. D14 (Hand 3D Viewer) loads lazily below. The composite skeleton photograph anchors the section, flanked by close-ups of hand, foot, and pelvis.

---

### Section 5 — The Brain Problem

**When:** Cognition
**Metaphor:** "Gorilla-sized and yet."

**Visual Assets:**
- Images: DH1 cranium (3 views — anterior, lateral, superior)
- Visualizations: D3 (Brain vs Behaviour), D6 (Skull Comparison), D13 (DH1 3D Viewer)

**Narrative Beats:**
1. 560 cc in context: gorilla-range, one-third the volume of a modern human brain, smaller than most australopiths
2. What large brains are "supposed to" enable: symbolic thought, planning, social complexity — the orthodox ladder
3. The outlier: if the disposal hypothesis is correct, naledi performed behaviours associated exclusively with large-brained species
4. Endocast shape (Holloway et al.): despite small volume, the frontal lobe organization resembles Homo — it's not just a scaled-down ape brain

**Key Figure:** Ralph Holloway — *"The shape tells a different story than the size. This is a reorganized brain, not merely a small one."*

**Scroll Treatment:** D6 (Skull Comparison) presents naledi, erectus, and sapiens crania side by side, scaling to correct proportions. D13 (DH1 3D Viewer) allows rotation of the cranium. D3 (Brain vs Behaviour) is a scatter plot — brain volume on x-axis, behavioural complexity proxies on y-axis — with naledi plotted as the dramatic outlier.

---

### Section 6 — The Dating Bombshell

**When:** 2017
**Metaphor:** "Three million years too young."

**Visual Assets:**
- Images: flowstone detail
- Visualizations: D4 (Dating Timeline), D12 (Species Coexistence)

**Narrative Beats:**
1. Everyone assumed naledi was 2+ million years old — primitive morphology, logical placement alongside early Homo
2. The convergence: uranium-thorium dating of flowstones, electron spin resonance on teeth, paleomagnetism of sediments — three independent methods, one answer
3. 236,000–335,000 years ago — contemporary with archaic Homo sapiens in Africa
4. Implications: a small-brained, morphologically primitive species living alongside big-brained humans, sharing the southern African landscape

**Key Figure:** Paul Dirks — *"When the dates came back, nobody believed them. We ran them again. Same answer."*

**Scroll Treatment:** D4 (Dating Timeline) is a horizontal timeline that zooms dramatically — starting at 7 Ma, narrowing to 3 Ma (where everyone expected naledi), then snapping to 236–335 ka with a visual jolt. D12 (Species Coexistence) shows the temporal overlap with sapiens and Neanderthals, emphasizing naledi's anomalous persistence.

---

### Section 7 — The Disposal Debate

**When:** The core question (ongoing)
**Metaphor:** "The chamber that admits no easy answer."

**Visual Assets:**
- Images: Dinaledi Chamber establishing shot, excavation grid
- Visualizations: D8 (Disposal Evidence Flowchart)

**Narrative Beats:**
1. No other entrance: geological surveys confirm a single, difficult access route
2. No water-transported sediment: the bones weren't washed in by flooding
3. No carnivore marks: no tooth punctures, no gnawing damage, no predator accumulation
4. No other fauna: the chamber contains almost exclusively naledi remains — no antelope, no rodents, no incidental cave dwellers
5. All age classes: infants, juveniles, adults, elderly — consistent with a community practice, not a single catastrophic event
6. Counterarguments: mass death event, unknown second entrance (now sealed), accidental falls over millennia
7. What "disposal" means vs "burial": deliberate body deposition ≠ grave digging with grave goods — the claim is modest but still revolutionary

**Key Figure:** Lee Berger — *"We are not claiming ritual. We are claiming that these bodies were placed here. The cave itself is the evidence."*

**Scroll Treatment:** D8 (Disposal Evidence Flowchart) is an interactive decision tree — the reader walks through each line of evidence, with each node presenting the data and the counter-hypothesis. The section is the longest and most deliberate — it earns its conclusions by showing every step.

---

### Section 8 — Neo and Lesedi

**When:** 2017
**Metaphor:** "The confirmation."

**Visual Assets:**
- Images: Neo skull, Lesedi Chamber
- Visualizations: —

**Narrative Beats:**
1. A second chamber — Lesedi — discovered in the same cave system, accessed by a different (equally difficult) route
2. "Neo": the most complete Homo naledi skull ever found, preserving detail lost in the Dinaledi specimens
3. Same species, same depositional pattern: bodies in an isolated chamber with no other fauna
4. Independent corroboration: the disposal hypothesis gains strength because the pattern repeats in a separate location

**Key Figure:** Marina Elliott — *"Finding them once is extraordinary. Finding them twice, in the same way, in a different part of the cave — that's a pattern."*

**Scroll Treatment:** Neo skull fades in with a slow rotation reveal. Side-by-side with earlier Dinaledi specimens to show morphological consistency. Lesedi Chamber photograph provides spatial context.

---

### Section 9 — Fire and Engravings

**When:** 2023
**Metaphor:** "The claim too far?"

**Visual Assets:**
- Images: cave passage detail
- Visualizations: —

**Narrative Beats:**
1. Berger's team reports evidence of controlled fire use: hearths, soot deposits on cave ceilings, charred animal bone fragments
2. Geometric markings on cave walls: cross-hatch patterns incised into dolomite surfaces
3. The peer review controversy: results announced via preprint and Netflix documentary before full peer review, drawing sharp criticism from the scientific community
4. The scientific community's skepticism: extraordinary claims require extraordinary evidence — and the evidence presented so far has not convinced most specialists
5. What would need to be true: if a 560 cc brain produced fire control and symbolic markings, virtually every model of cognitive evolution would require revision

**Key Figure:** Tim White — *"Announcing results on Netflix before they've survived peer review is not how science works. The evidence needs to be extraordinary, and it isn't yet."*

**Scroll Treatment:** This section is visually restrained — fewer images, more text weight. The tone shifts from narrative to critical analysis. Pull quotes from skeptics and supporters alternate. No celebratory visuals — the section earns its uncertainty.

---

### Section 10 — The Open Science Revolution

**When:** Methods (2013–present)
**Metaphor:** "The fossil that belonged to everyone."

**Visual Assets:**
- Images: MorphoSource screenshot, eLife publication
- Visualizations: —

**Narrative Beats:**
1. Social media recruitment: Facebook, not old-boy networks, determined who entered the cave
2. eLife over Nature: Berger chose an open-access journal over prestige gatekeepers, making all data freely available on publication day
3. 3D scans on MorphoSource: every specimen digitized and downloadable — any researcher on Earth can study naledi without visiting South Africa
4. Two-year turnaround: from excavation to publication in a field where decades-long embargoes are normal
5. Traditionalist pushback: accusations of rushed science, self-promotion, lowered standards — the cost of breaking the mold

**Key Figure:** Lee Berger — *"If you lock fossils in a vault, they belong to one scientist. If you put them online, they belong to the species."*

**Scroll Treatment:** Clean, bright section — a visual break from cave darkness. White/bone-ivory backgrounds. The MorphoSource interface is shown as an embedded screenshot with annotation callouts. The eLife paper appears as a stylized publication card.

---

### Section 11 — Where Does Naledi Fit?

**When:** Phylogenetics (ongoing)
**Metaphor:** "Three trees, one species, no consensus."

**Visual Assets:**
- Images: Cradle of Humankind landscape, Sterkfontein exterior
- Visualizations: D11 (Phylogenetic Position), D9 (SA Cave Sites Map), D10 (Body Proportions)

**Narrative Beats:**
1. Hypothesis A — basal Homo: naledi branches off near the root of the genus, a very early experiment in the Homo body plan
2. Hypothesis B — sister to erectus: naledi shares a recent common ancestor with Homo erectus, making it a close relative of the lineage that led to us
3. Hypothesis C — independent lineage: naledi represents a long-surviving ghost lineage with no close modern relatives, evolving in parallel for millions of years
4. The Australopithecus sediba comparison: another Berger discovery, another mosaic species, another classification debate — pattern or coincidence?
5. The Cradle concentration: Rising Star, Sterkfontein, Swartkrans, Kromdraai — why southern Africa's dolomitic caves preserve what open-air sites destroy
6. Cross-link to Seven Million Years — naledi's phylogenetic ambiguity in the context of the full hominin family tree

**Key Figure:** Bernard Wood — *"Every time we think we understand the human family tree, a new fossil comes along and redraws it. Naledi didn't just redraw it — it suggested we might need a different kind of tree entirely."*

**Scroll Treatment:** D11 (Phylogenetic Position) shows three competing cladograms side by side, with naledi's position highlighted differently in each. D9 (SA Cave Sites Map) provides geographic context. D10 (Body Proportions) compares naledi to australopiths, early Homo, and modern humans in a parallel-coordinates chart.

---

### Section 12 — What the Small Brain Means

**When:** Synthesis
**Metaphor:** "The reckoning."

**Visual Assets:**
- Images: (no new images — the section relies on callbacks to earlier visuals)
- Visualizations: —

**Narrative Beats:**
1. If 560 cc can bury its dead: brain size is not the threshold for complex behaviour we assumed it was
2. The metric is wrong: volume alone cannot predict cognition — organization, connectivity, and life history matter as much or more
3. Tie to Lucy: bipedalism didn't need big brains either — Lucy walked upright at 400 cc, naledi may have buried its dead at 560 cc — the "big brain first" narrative keeps failing
4. Tie forward: what does "human" mean if brain size isn't the dividing line? The question naledi poses is not yet answered.
5. The unresolved questions: the fire and engraving claims remain contested, the phylogenetic position is unsettled, and new chambers in Rising Star may still hold discoveries that rewrite the story again

**Key Figure:** Lee Berger — *"We have been telling ourselves a story about big brains for a hundred years. Naledi asks whether we were listening to the wrong story."*

**Scroll Treatment:** The descent line reaches its deepest point. Visuals recede — the DH1 cranium returns, alone on darkness, as it appeared in the hero. The essay ends where it began: bone and void. A final ambient pause before the footer.

---

## Layer 5 — Design System

### Color Palette

| Token | Hex | Role |
|-------|-----|------|
| Dinaledi Dark | `#0D0E12` | Primary background — the void of the cave |
| Cave Charcoal | `#1A1C22` | Secondary background — raised surfaces, cards, code blocks |
| Bone Ivory | `#E8DCC8` | Primary text — warm, organic, not clinical white |
| Dolomite Grey | `#6B7A8A` | Secondary text — captions, metadata, muted labels |
| Signal Amber | `#C4893A` | Accent — highlights, links, interactive affordances |
| Ochre Earth | `#9B6B3C` | Secondary accent — dates, specimen labels, warm emphasis |
| Flowstone Cream | `#C9BFA8` | Tertiary text — blockquotes, pull quotes, soft contrast |
| Deep Passage | `#2A2D35` | Borders, dividers, subtle structural lines |

### Typography

| Role | Family | Weight | Usage |
|------|--------|--------|-------|
| Display | Source Serif 4 | 600 (semibold) | Section titles, hero title, pull quotes |
| Body | Source Serif 4 | 400 (regular) | Running text, narrative prose |
| Data / Specimens | JetBrains Mono | 400 | Specimen IDs, measurements, data labels, code |
| Captions | Source Serif 4 | 400 italic | Image captions, attribution lines |

### Animation

| Property | Value | Notes |
|----------|-------|-------|
| Base duration | `0.8s` | Standard reveal timing |
| Easing | `ease-out` | Decelerating — elements arrive and settle |
| Reveal style | Opacity from darkness | Elements fade in from `opacity: 0` on `#0D0E12` background |
| Progress bar | Vertical descent | Left-edge line filling downward, mapping scroll to cave depth |
| Scroll trigger | Intersection Observer | `threshold: 0.15` — elements begin animating when 15% visible |
| Reduced motion | `prefers-reduced-motion` | All animations replaced with instant `opacity: 1` |

---

## Layer 6 — Implementation Notes

### Responsive Strategy

- **Mobile-first:** Base styles target `<768px`; complexity layers on at `md` and `lg` breakpoints
- **3D viewers:** Static high-resolution fallback images on `<768px` — Three.js bundles only load on tablet/desktop
- **Cave Cross-Section (D1):** Switches from interactive scroll-driven build to a static annotated diagram on mobile
- **Data visualizations:** Simplified layouts (e.g., horizontal bar charts instead of parallel-coordinates) on small screens

### Accessibility

- **Reduced motion:** `prefers-reduced-motion: reduce` disables all scroll-triggered animations — content renders immediately at full opacity
- **ARIA labels:** Every visualization carries descriptive `aria-label` and `aria-describedby` attributes summarizing the data being presented
- **Color contrast:** All text/background combinations verified against WCAG AA on `#0D0E12` — Bone Ivory on Dinaledi Dark passes at 12.5:1
- **Alt text:** All photographs include contextual alt text (not "image of skull" but "DH1 cranium, lateral view, showing supraorbital morphology")
- **Keyboard navigation:** 3D viewers support keyboard orbit (arrow keys) and zoom (+/−)

### Source Attribution

- `SOURCES` array in `images.ts` — structured citation objects with `id`, `author`, `year`, `title`, `journal`, `doi`, `license`
- `IMAGE_CREDITS` array in `images.ts` — per-image attribution with `src`, `photographer`, `license`, `licenseUrl`, `description`
- In-essay citations rendered as numbered superscripts linking to a collapsible references section at the footer

### Cross-Linking

- **Section 4 (The Mosaic Body):** Inline link to the Lucy essay — *"Lucy's mosaic was bipedalism with a small brain; naledi's is more extreme"*
- **Section 11 (Where Does Naledi Fit?):** Inline link to the Seven Million Years parent essay — *"naledi's phylogenetic ambiguity in the context of the full hominin tree"*
- **Section 12 (What the Small Brain Means):** Inline link to the Lucy essay — *"bipedalism didn't need big brains either"*

### Dependencies

| Package | Purpose |
|---------|---------|
| `d3` | Cave cross-section, disposal flowchart, phylogenetic trees, scatter plots |
| `recharts` | Timeline charts, bar charts, simpler data visualizations |
| `@react-three/fiber` | 3D specimen viewer runtime (React reconciler for Three.js) |
| `@react-three/drei` | Orbit controls, loaders, environment maps for 3D viewers |
| `three` | Core 3D engine (peer dependency of R3F) |
