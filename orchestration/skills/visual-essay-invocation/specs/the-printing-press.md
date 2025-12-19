---
status: DRAFT
topic: The Printing Press
generated: 2025-12-18
visual_treatment: photorealistic
chapters: 4
figures: 8
lens_applied: timeline-history
---

# Visual Essay Invocation: The Printing Press

**"The Printing Press: A Global Timeline History"**
*From Tang Dynasty China to the Reformation — How Humanity Learned to Multiply Words*

---

## [Layer 1: Strategic Foundation]

### Project Title

**"The Printing Press: A Global Timeline History"**
*Subtitle: From Tang Dynasty China to the Reformation — 700 Years of Innovation*

### Executive Brief

Create an immersive, photography-driven visual essay that chronicles the complete global history of the printing press — not as a European invention, but as a 700-year evolution across civilizations. This experience uses archival photography, museum artifacts, and animated timelines to take readers on a journey from the Diamond Sutra to Martin Luther's viral pamphlets.

The narrative spans from 868 CE (the oldest dated printed book) through 1550 (the Reformation's print revolution), exploring how the same innovation had radically different impacts in different cultural and linguistic contexts. It centers human faces: Bi Sheng the commoner, Gutenberg the goldsmith, the Korean monks who printed the Jikji, the financier who took everything.

This essay matters now because we're living through another information revolution. Understanding how the last one unfolded — who invented what, why some societies transformed and others didn't, how ideas suddenly spread faster than anyone imagined — illuminates our present moment.

The reader who completes this essay will understand: printing was invented multiple times across multiple civilizations; Gutenberg synthesized rather than invented; the alphabet gave Europe an advantage; and when the right technology meets the right context, everything changes.

### Visual Treatment Philosophy

#### Photography Across Eras

This essay spans 700 years across multiple civilizations. Visual treatment shifts with era and region.

**Era 1: Asian Origins (700s–1400)**
- Color treatment: Warm sepia tones evoking aged scrolls and temple interiors
- Processing: Soft grain, golden hour warmth, paper textures
- Sources: British Library (Diamond Sutra), Bibliothèque nationale de France (Jikji), Korean museum collections, Chinese archive reconstructions

**Era 2: Gutenberg's Workshop (1440–1460)**
- Color treatment: Deep, saturated medieval palette — rich burgundies, aged golds, dark wood
- Processing: Candlelit atmosphere, higher contrast, Northern European winter light
- Sources: Gutenberg Museum (Mainz), Library of Congress, British Library

**Era 3: European Spread (1460–1500)**
- Color treatment: Gradually brightening — Renaissance influence, Italian light entering
- Processing: Less grain, cleaner tones, commercial energy
- Sources: Plantin-Moretus Museum, various national archives, Westminster Abbey materials

**Era 4: The Cascade (1500–1550)**
- Color treatment: Black and white woodcut aesthetic for Reformation materials
- Processing: High contrast, pamphlet reproduction textures
- Sources: German museum collections, Luther archives

**Transition Treatment:**
Era shifts are scroll-driven — as the timeline moves, color grading subtly transitions. The user experiences the passage of time through changing visual warmth and processing.

---

## [Layer 2: Technical Systems]

### Scroll-Lock Animation System

**Critical Implementation:** Viewport locks during key sequences; scroll input drives animation progress.

**Required Behavior:**
- Scroll into designated zone triggers viewport lock
- Continued scroll input controls animation choreography
- Visual progress indicator (timeline bar) shows sequence completion
- Upon 100% completion, lock releases with smooth easing (400ms)
- Skip affordance available: "Skip →" link, bottom-right corner, 70% opacity

**Scroll-Lock Techniques for This Essay:**

- **The Timeline Build:** Events populate chronologically along a horizontal/vertical axis as user scrolls. Dates appear, era sections fill, cities light up on maps.

- **The Assembly (Printing Mechanism):** Scroll drives step-by-step demonstration of how the press works — type placement, ink application, paper positioning, press operation, page removal.

- **The Map Journey:** Geographic spread visualization — printing presses appear as dots on a European map, spreading from Mainz outward (1455-1500).

- **The Sequence (Portrait Gallery):** Rapid succession through multiple historical figures as scroll advances.

- **The Reveal:** Diamond Sutra scroll emerging from cave darkness; Gutenberg Bible pages unveiled.

- **The Comparison:** Before/after slider showing manuscript vs. printed page production.

### Parallax Depth System

- **Layer 0 (Background):** Atmospheric textures — aged paper, workshop shadows, cave walls. Moves at 0.2x scroll rate.
- **Layer 1 (Mid-ground):** Supporting elements — furniture, architecture, contextual artifacts. Moves at 0.5x scroll rate.
- **Layer 2 (Subject):** Primary content — photographs, documents, figures. Moves at 1.0x (reference).
- **Layer 3 (Overlay):** UI elements, annotations, timeline markers. Moves at 1.0x, fixed to viewport during locks.
- **Layer 4 (Ambient):** Subtle particles — dust motes, paper fibers, candlelight flickers. Moves at 1.8x scroll rate.

### Progress Bar Design

#### Concept: "The Timeline Spine"

The progress indicator is a vertical timeline that runs along the left edge of the screen, visualizing the 700-year journey from 868 to 1550.

**Design:**
- Position: Left edge, vertical, 8px wide
- Visual: A continuous line that fills with color as user progresses. Era sections have distinct tints.
- Era markers: Small notches with dates (868, 1040, 1377, 1455, 1500, 1517)
- Chapter markers: Icons representing each chapter's focus (scroll, type block, map, pamphlet)
- Current position: Glowing dot that pulses subtly at current location
- Micro-interactions: Hover reveals era name and year range

**Data Structure:**
- Intro/Hero: [868] — "The Oldest Book"
- Chapter 1: [868–1400] — "Eastern Origins"
- Chapter 2: [1440–1460] — "The Synthesis"
- Chapter 3: [1460–1500] — "The Spread"
- Chapter 4: [1500–1550] — "The Cascade"

**Color by Era:**
- Asian Origins: Warm amber (#D4A574)
- Gutenberg's Workshop: Deep burgundy (#8B1538)
- European Spread: Renaissance blue (#1E3A5F)
- The Cascade: Reformation black/white contrast

---

## [Layer 3: Hero Architecture]

### Hero Section Specification

#### Visual Concept: "The Cave Discovery"

The hero opens in darkness — the sealed cave at Dunhuang where 40,000 scrolls waited for 900 years. The user scrolls to "enter" the cave, and the Diamond Sutra emerges from the darkness: the oldest dated printed book, proof that this story begins not in Germany, but in Tang Dynasty China.

**Scroll-Lock Hero Sequence:**

- **0-15% scroll:** Total darkness. Faint Chinese characters flicker at the edges, barely visible. Ambient sound: wind, distant bells.

- **15-35% scroll:** Cave walls begin to materialize from the edges. Texture of rock becomes visible. The year "868 CE" fades in at bottom.

- **35-55% scroll:** A golden light source emerges from the center — the scroll being discovered. The silhouette of the Diamond Sutra begins to glow.

- **55-75% scroll:** The 16-foot scroll reveals itself, unfurling slowly. The woodcut Buddha illustration becomes clear. Text appears: "The oldest dated printed book in the world."

- **75-90% scroll:** The scroll settles; zoom to the colophon showing the date. "Reverently made for universal free distribution by Wang Jie on behalf of his two parents. May 11, 868."

- **90-100% scroll:** Pull back. Question appears: "But wait — if China had printing in 868... why do we say Gutenberg invented it in 1455?"

**Title Card:**
The Printing Press
*A Global Timeline History*

---

## [Layer 4: Chapter Schema]

### Chapter 1: Eastern Origins
*868 CE – 1400 CE*

**Metaphor:** The roots that didn't flower — innovation ahead of its time, waiting for the right soil

**Central Photographs/Visuals:**
- Diamond Sutra scroll (British Library)
- Bi Sheng ceramic movable type reconstruction
- Jikji pages (Bibliothèque nationale de France)
- Korean metal type specimens
- Wang Zhen's revolving typecase diagram from *Nong Shu*
- Tang Dynasty Buddhist printing artifacts

**Content Focus:**

The story begins not where you expect. In 868 CE, 600 years before Gutenberg, a Buddhist scroll was printed in Tang Dynasty China — complete with a woodcut illustration that remains the oldest dated book art. This Diamond Sutra now sits in the British Library, proof that printing's roots run deep into Asian soil.

Around 1040, a commoner named Bi Sheng created something even more revolutionary: movable type. Individual characters, carved into clay, baked hard, and arranged to print any text — then rearranged for the next. The concept Gutenberg would "invent" 400 years later.

But here's the puzzle: movable type didn't transform China the way it would transform Europe. Why? The answer lies in 45,000 characters versus 26 letters, in woodblock printing that already worked well enough, in low labor costs that made innovation unnecessary. The same invention, different outcomes.

Korea took the next step. In the 1230s, Korean craftsmen developed metal movable type — more durable than clay. In 1377, monks at Heungdeok Temple printed the Jikji, a Buddhist teaching anthology. It survives today at the Bibliothèque nationale de France: the oldest extant book printed with movable metal type, created 78 years before the Gutenberg Bible.

**Key Figure Profiles:**

**Bi Sheng (毕昇)** — The Commoner Inventor
- Created world's first movable type system (~1040)
- Used fired clay tiles, one for each Chinese character
- Organized type by rhyme-group in wooden cases
- Created 20+ copies of common characters for efficiency
- "If one were to print only two or three copies, this method would be neither simple nor easy. But for printing hundreds or thousands of copies, it was marvelously quick." — Shen Kuo describing Bi Sheng's method
- Photograph: Reconstruction of ceramic type pieces, museum display

**Wang Zhen (王禎)** — The Systematic Improver
- Yuan Dynasty agronomist and inventor (fl. 1290-1333)
- Created 30,000+ wooden movable types in 1298
- Invented the revolving typecase for efficient typesetting
- Printed 100 copies of county records in one month
- Documented process in *Nong Shu* (Book of Agriculture, 1313)
- Photograph: *Nong Shu* diagram of revolving typecase

**The Jikji Printers (Seoksan and Daldam)** — The Monks Who Mastered Metal
- Students of Buddhist monk Baegun
- Printed Jikji at Heungdeok Temple, Korea (July 1377)
- Used beeswax casting method for metal type
- Created oldest surviving metal movable type book
- Photograph: Jikji pages from BnF collection

**Scroll-Lock Sequence: "The 45,000 Problem"**

This sequence explains why movable type didn't revolutionize China — visualizing the character complexity challenge.

- **0-20% scroll:** Screen fills with Chinese characters, dense and overwhelming. Counter appears: "45,000+ unique characters"

- **20-40% scroll:** Characters begin sorting into type cases. The scale becomes apparent — thousands of slots needed. Text: "Each character requires its own type piece"

- **40-60% scroll:** Contrast appears: English alphabet. 26 letters emerge cleanly. "European languages: 26 letters"

- **60-80% scroll:** Split screen comparison: Chinese type case (massive, complex) vs. European type case (compact, manageable)

- **80-100% scroll:** Resolution text: "The same innovation. Radically different economics."

**Parallax Treatment:**
- Background: Aged paper texture, Tang Dynasty architectural elements
- Mid-ground: Type cases, wooden furniture, scroll storage
- Subject: Artifacts, type specimens, manuscript pages
- Ambient: Dust motes catching golden light

---

### Chapter 2: The Synthesis
*1440 – 1460 CE*

**Metaphor:** The goldsmith's secret — not invention but integration, not creation but combination

**Central Photographs/Visuals:**
- Gutenberg portrait engraving (André Thevet, 1584)
- Gutenberg Bible pages (42-line Bible)
- Hand mold for type casting
- Metal type specimens (lead-tin-antimony alloy)
- Reconstructed Gutenberg press at Gutenberg Museum
- Helmasperger Instrument (lawsuit document)

**Content Focus:**

In the 1440s, in the German city of Mainz, a goldsmith named Johannes Gutenberg was working on something he called "aventur und kunst" — adventure and art. He was secretive, working in borrowed spaces, borrowing money. What he created wasn't printing — that existed. It wasn't movable type — that existed too. What Gutenberg created was a system.

He combined movable metal type (cast in a hand mold from a lead-tin-antimony alloy that melted easily and held precise shapes), oil-based ink (water-based ink beaded up on metal), and a wooden screw press (adapted from wine-making). Each element existed before. The combination changed everything.

By 1455, Gutenberg completed his masterpiece: a Bible with 42 lines per page, approximately 180 copies, the first major book printed in Europe. Future Pope Pius II saw pages being displayed in Frankfurt and wrote of their beauty.

But Gutenberg wouldn't enjoy his success. Johann Fust, the financier who had loaned him 1,600 guilders over five years, filed a lawsuit on November 6, 1455. The Helmasperger Instrument — the legal document recording this case — is the only contemporary account of Gutenberg's invention. Fust won. Gutenberg lost his press, his type, his Bible.

Modern scholarship suggests Gutenberg wasn't ruined — he maintained property, repaid other loans, and likely continued printing. But the popular image persists: the inventor robbed of his creation. What matters more: by 1468 when Gutenberg died, his invention had already begun spreading across Europe.

**Key Figure Profiles:**

**Johannes Gutenberg** — The Synthesizer
- Born c. 1400 in Mainz to wealthy family
- Trained as goldsmith, gem cutter, metallurgist
- Family exiled to Strasbourg (1428); experiments began there
- Returned to Mainz (1448); established print shop by 1450
- Created lead-tin-antimony alloy that remained standard for 550 years
- Lost press to Fust (1455); continued working until death (1468)
- Photograph: 1584 engraving after André Thevet; reconstructed workshop

**Johann Fust** — The Financier
- Goldsmith turned moneylender in Mainz
- Loaned Gutenberg 800 guilders (1450), another 800 (1452)
- Filed lawsuit November 6, 1455; won in court
- Partnered with Peter Schöffer; printed Psalter (1457)
- Modern scholarship: Not the villain of legend; Gutenberg wasn't ruined
- Photograph: Helmasperger Instrument document

**Scroll-Lock Sequence: "The Assembly"**

Step-by-step demonstration of how Gutenberg's press worked — the mechanical process that changed the world.

- **0-15% scroll:** Empty press frame. Text: "The Process"

- **15-30% scroll:** Type pieces appear, individual letters. Hand places them into composing stick, right to left (mirror writing).

- **30-45% scroll:** Composed lines transfer to type bed. Frame locks around them.

- **45-60% scroll:** Ink balls appear; ink is applied to type surface with dabbing motion.

- **60-75% scroll:** Paper sheet lowers onto type bed. Positioned precisely.

- **75-90% scroll:** Press mechanism activates — wooden screw turns, platen descends, pressure applies.

- **90-100% scroll:** Paper lifts away, revealing printed page. Text: "Repeat 180 times. One Bible."

**Parallax Treatment:**
- Background: Medieval workshop shadows, candlelit walls
- Mid-ground: Wooden press structure, furniture, type cases
- Subject: Type, hands, paper, mechanism
- Ambient: Candle flicker, smoke wisps

---

### Chapter 3: The Spread
*1460 – 1500 CE*

**Metaphor:** The network effect — German craftsmen fan out across a continent, carrying secrets in their hands

**Central Photographs/Visuals:**
- Map of Europe with printing press locations (animated)
- Subiaco monastery (first Italian press)
- Venice printing district imagery
- Westminster Abbey Caxton memorial
- Aldine Press publications with italic type
- Plantin-Moretus printing house (Antwerp)

**Content Focus:**

In 1462, two German printers — Arnold Pannartz and Conrad Sweynheym — carried Gutenberg's secrets across the Alps to a Benedictine monastery at Subiaco, near Rome. Italy had printing. By 1467, Rome. By 1469, Venice — which would become the printing capital of Europe with 150 presses by century's end.

The spread was explosive. Cologne (1466). Paris (1470). Buda and Kraków (1473). London never — until a merchant named William Caxton learned to print in Cologne, set up a press in Bruges, and in 1476 established England's first printing shop in Westminster. His "pen became worn, his hand weary, his eye dimmed" from copying manuscripts by hand, so he learned a better way.

By 1500, printing presses operated in 282 cities across 20 countries. The master printers spreading the technology were overwhelmingly German — Gutenberg's apprentices and their apprentices, carrying knowledge outward in widening circles.

The numbers tell the transformation: before printing, manuscript books in Europe numbered in the thousands. By 1500, fifty years after the Gutenberg Bible, an estimated 9-20 million books existed. Book prices fell by two-thirds. What had been rare became common. What had been silent began to speak.

**Key Figure Profiles:**

**William Caxton** — The English Pioneer
- Merchant in Bruges; learned printing in Cologne (1470-1472)
- Printed first book in English: *Recuyell of the Historyes of Troye* (1473)
- Established first English press at Westminster (1476)
- Printed 108 books including Chaucer's *Canterbury Tales* and Malory's *Le Morte d'Arthur*
- "My pen became worn, my hand weary, my eye dimmed" with copying by hand, so he "practiced and learnt" to print
- Named among 100 Greatest Britons (BBC poll, 2002)
- Photograph: Westminster Abbey memorial inscription

**Aldus Manutius** — The Pocket Book Revolutionary
- Founded Aldine Press in Venice (1494)
- Introduced italic type (designed by Francesco Griffo, 1501)
- Created the portable pocket book (*libelli portatiles*)
- Made Greek and Latin classics affordable to ordinary readers
- Dolphin-and-anchor emblem still used by Doubleday Books
- "The first person to introduce portable books on a mass scale"
- Photograph: Aldine publications, italic type specimens

**Scroll-Lock Sequence: "The Map Journey"**

Animated map showing the spread of printing across Europe from 1455-1500.

- **0-20% scroll:** Map of Europe appears. Single glowing dot at Mainz (1455).

- **20-40% scroll:** First wave: dots appear at Strasbourg, Cologne, Bamberg (1460s). Lines trace connections.

- **40-60% scroll:** Italian explosion: Subiaco, Rome, Venice, Florence, Milan. Counter shows: "77 Italian cities by 1500"

- **60-80% scroll:** Continental spread: Paris, Lyon, Bruges, Westminster, Buda, Kraków. Lines crisscross continent.

- **80-95% scroll:** Full picture: 282 dots across 20 countries. Counter: "20 million books"

- **95-100% scroll:** Zoom out. Europe glows with connected points. Text: "50 years."

**Parallax Treatment:**
- Background: Parchment map texture, sea areas with subtle wave motion
- Mid-ground: Country boundaries, city labels
- Subject: Glowing press location dots, connection lines
- Ambient: Ship icons along trade routes, subtle border animations

---

### Chapter 4: The Cascade
*1500 – 1550 CE*

**Metaphor:** The demonstration of power — what printing made possible, proven in the span of two months

**Central Photographs/Visuals:**
- Martin Luther portrait (Lucas Cranach)
- 95 Theses pamphlet reproduction
- Reformation pamphlets (*Flugschriften*)
- German Bible (1534 edition)
- Woodcuts from Reformation era
- Counter visualization: pamphlet multiplication

**Content Focus:**

On October 31, 1517, a professor named Martin Luther composed 95 propositions for academic debate about the sale of indulgences. He may have posted them on the church door at Wittenberg — the standard way to announce a scholarly disputation. He expected a local conversation among theologians.

Within two weeks, the 95 Theses had spread throughout Germany. Within two months, throughout Europe. "It is a mystery to me," Luther wrote to Pope Leo X, "how my theses were spread to so many places. They were meant exclusively for our academic circle here."

The mystery was the printing press.

Luther became the first bestselling author. Between 1517 and 1520, thirty of his pamphlets ran through 370 editions — roughly 400,000 copies flooding Germany. By 1525, his complete works totaled 287 tracts and some two million copies. He wrote in German, not Latin, expanding his audience beyond the educated elite.

The Reformation might have been impossible in the pre-Gutenberg age. One man with strong opinions had always existed. A technology that could multiply those opinions faster than any authority could respond — that was new.

This is what the printing press made possible: not just more books, but the acceleration of ideas beyond institutional control. It took 700 years to get here — from Diamond Sutra to Luther's pamphlets. The revolution, when it finally came, took only weeks.

**Key Figure Profiles:**

**Martin Luther** — The Accidental Bestseller
- Professor of moral theology at Wittenberg
- Posted 95 Theses on October 31, 1517
- First bestselling author of the print era
- 287 tracts, ~2 million copies by 1525
- Wrote in German, expanding audience beyond Latin-literate elite
- "It is a mystery to me how my theses were spread to so many places. They were meant exclusively for our academic circle here."
- Photograph: Lucas Cranach portrait (multiple versions available)

**Scroll-Lock Sequence: "The Viral Moment"**

Visualizing the spread of Luther's 95 Theses — the world's first viral content.

- **0-15% scroll:** Single pamphlet appears. Date: "October 31, 1517." Location: "Wittenberg."

- **15-30% scroll:** Pamphlet multiplies — 2, 4, 8, 16. Text: "Printers in Basel, Leipzig, Nuremberg begin reproducing."

- **30-50% scroll:** Pamphlets spread across map of Germany. Two-week timeline plays out. Counter accelerates.

- **50-70% scroll:** Pamphlets cross borders — France, England, Italy, Spain. Two-month timeline. Counter shows hundreds, then thousands.

- **70-85% scroll:** Full European spread. Counter: "400,000 copies by 1520"

- **85-100% scroll:** Luther's quote appears over the visualization: "It is a mystery to me..." Then: "The mystery was the printing press."

**Parallax Treatment:**
- Background: Dark, dramatic — Reformation-era woodcut aesthetic
- Mid-ground: Multiple pamphlet copies at varying depths, creating cascade effect
- Subject: Central pamphlet, map, counter
- Ambient: Paper edges fluttering, ink splatter particles

---

## [Layer 5: Design System]

### Color Palette

- **Primary Background:** #1A1611 (Deep parchment black)
- **Secondary Background:** #2D261E (Aged leather brown)
- **Accent Primary:** #D4A574 (Manuscript gold — Asian origins)
- **Accent Secondary:** #8B1538 (Gutenberg burgundy — European development)
- **Text Primary:** #F5F0E8 at 95% (Cream white)
- **Text Secondary:** #F5F0E8 at 70% (Subdued cream)
- **Era: Asian Origins:** #D4A574 (Warm amber)
- **Era: Gutenberg:** #8B1538 (Deep burgundy)
- **Era: European Spread:** #1E3A5F (Renaissance blue)
- **Era: The Cascade:** #2C2C2C with #F5F0E8 (High contrast B&W)

### Era-Based Visual Treatment

**Asian Origins (868-1400):**
- Warm sepia tones
- Soft grain overlay
- Golden hour warmth
- Calligraphic flourishes in transitions

**Gutenberg's Workshop (1440-1460):**
- Deep saturated palette
- High contrast shadows
- Candlelit atmosphere simulation
- Gothic letterform influences

**European Spread (1460-1500):**
- Gradually brightening palette
- Renaissance Italian light
- Map-focused compositions
- Commercial energy in transitions

**The Cascade (1500-1550):**
- Black and white dominance
- Woodcut aesthetic
- High contrast
- Pamphlet texture overlays

### Typography

- **Headlines:** Playfair Display, 700 weight — classic editorial gravitas with historical resonance
- **Body:** Source Serif Pro, 400 weight — optimized for long-form reading, subtle warmth
- **Quotes:** Cormorant Garamond, 500 italic — evokes historical printing while remaining readable
- **Technical/Dates:** JetBrains Mono, 400 weight — clear dates and statistics
- **Captions/Data:** Source Sans Pro, 400 weight — clean, subordinate to primary content

### Animation Principles

- **Scroll-lock zones:** 500-800px depth per locked section
- **Photo transitions:** 600ms ease-out for hero reveals, 400ms for chapter transitions
- **Text reveals:** 300ms fade-in with 20px upward motion, staggered 50ms between paragraphs
- **Parallax ratios:**
  - Background: 0.2x
  - Mid-ground: 0.5x
  - Subject: 1.0x
  - Foreground: 1.3x
  - Ambient: 1.8x
- **Stagger values:** 80ms between sequential figure profiles, 50ms between timeline events
- **Easing:** cubic-bezier(0.25, 0.1, 0.25, 1.0) — smooth ease-out for most transitions
- **Lock/unlock:** 400ms ease-out with subtle scale (1.0 → 0.98 → 1.0)

---

## [Layer 6: Implementation]

### Responsive Considerations

#### Mobile Adaptations
- Timeline progress bar moves to bottom edge (horizontal) on mobile
- Scroll-lock sequences maintain choreography but reduce depth (400-600px)
- Map journey sequence uses full-screen map with overlay controls
- Figure profiles stack vertically rather than side-by-side
- Parallax reduced to 2-3 layers for performance
- Type size increases: body 18px → 20px on mobile

#### Tablet Adaptations
- Timeline remains on left edge but reduces to 6px width
- Chapter headers use sticky positioning during content scroll
- Map sequence allows pinch-to-zoom interaction

### Accessibility

- **Skip controls:** Every scroll-lock sequence has "Skip →" button (bottom-right, 70% opacity, keyboard accessible)
- **Reduced motion:** `prefers-reduced-motion` disables parallax, replaces scroll-lock with click-to-advance galleries
- **Keyboard navigation:** Space/Enter advance through locked sequences; Escape skips to end
- **Screen reader:** All images have descriptive alt text; timeline data available as text list
- **Color contrast:** All text meets WCAG AA standard (4.5:1 minimum)
- **Focus indicators:** Visible focus rings on all interactive elements

### Source Attribution Requirements

All historical claims must be attributed. Sources section at essay end, organized by type:

**Primary Archives:**
- British Library — Diamond Sutra
- Bibliothèque nationale de France — Jikji
- Library of Congress — Gutenberg Bible
- Gutenberg Museum, Mainz — Press reconstructions, Bible pages
- Göttingen State and University Library — Helmasperger Instrument

**Secondary Sources:**
- Shen Kuo, *Dream Pool Essays* (c. 1088)
- Wang Zhen, *Nong Shu* (1313)
- Thomas Carter, *The Invention of Printing in China and Its Spread Westward* (1955)

**Image Credits:**
- Each museum/archive credited with specific image
- Public domain clearly marked
- Licensed images noted

### Content Warnings

None required — historical content without graphic material.

### Deliverables Checklist

- [ ] Hero sequence with scroll-lock animation ("The Cave Discovery")
- [ ] Themed progress bar component ("The Timeline Spine")
- [ ] 4 chapters with scroll-lock sequences:
  - [ ] Chapter 1: "The 45,000 Problem"
  - [ ] Chapter 2: "The Assembly"
  - [ ] Chapter 3: "The Map Journey"
  - [ ] Chapter 4: "The Viral Moment"
- [ ] 8 historical figures profiled (Bi Sheng, Wang Zhen, Jikji printers, Gutenberg, Fust, Caxton, Manutius, Luther)
- [ ] Parallax depth system implemented (5 layers)
- [ ] Era-based visual treatment (4 eras with distinct color grading)
- [ ] Mobile-responsive adaptations
- [ ] Accessibility: reduced motion mode, skip controls, alt text, keyboard navigation
- [ ] Source attribution system (expandable footer)
- [ ] FAQ section with verified answer to "Who invented the printing press?"

---

## FAQ Integration

**Q: Who invented the printing press?**

**A:** Johannes Gutenberg of Mainz, Germany, around 1440 — but the full answer is more nuanced. Gutenberg didn't invent printing itself. Chinese woodblock printing dates to the 9th century, and Bi Sheng created ceramic movable type around 1040. Korea produced metal movable type by the 1230s.

What Gutenberg invented was a *system*: he combined movable metal type (cast in a hand mold he designed), oil-based ink (that adhered to metal), and a wooden press adapted from wine-making. This synthesis made mass production of books economically viable in Europe for the first time.

So Gutenberg invented *the European printing press* — the specific technology that ignited the information revolution in the West.

---

## Research Package Reference

This spec was built from verified research located at:
```
src/app/essays/the-printing-press/research/
├── TIMELINE.md      — Global chronology (868-1550)
├── FIGURES.md       — 8 key figures with imagery sources
├── QUOTES.md        — 12+ verified quotes
├── VISUALS.md       — Archive sources and visual requirements
├── CHINA-CONTEXT.md — Why movable type didn't transform China
├── CITATIONS.md     — 35 sources (Tier 1-2 majority)
├── GAPS.md          — Unverified claims to avoid
└── SYNTHESIS.md     — Research summary
```

All claims in this spec are research-backed. Items documented in GAPS.md have been avoided or qualified.

---

*Last generated: December 18, 2025*
