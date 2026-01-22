# Visual Essay Specification: "SLANG" — Typographic Visual Essay

**Slug:** `the-word-slang-typographic`
**Format:** Typography-led visual essay (NO photographs)
**Panels:** 16 panels in gallery/scrollytelling format
**Depth Mode:** Deep

---

## Layer 1: Strategic Foundation

### 1.1 Essay Identity

**Title:** SLANG: The Rogue Archive
**Tagline:** "A typographic etymology of the word that names the unnamed"
**Thesis:** The word "slang" is itself a piece of slang—born in criminal cant, gradually escaping into respectability, its etymology as murky as the vocabulary it labels. This essay traces that escape through 250 years of documentation, stigma, and celebration.

### 1.2 Target Audience

- **Primary:** Language enthusiasts, typography lovers, design-curious readers (25-45)
- **Secondary:** Students of linguistics, etymology, cultural history
- **Tertiary:** General intellectually curious readers

### 1.3 Emotional Journey

| Phase | Panels | Emotion | Typography Tone |
|-------|--------|---------|-----------------|
| Hook | 1–2 | Intrigue, recognition | Kinetic, fragmented |
| Origin | 3–5 | Mystery, discovery | Historical, scholarly |
| Evolution | 6–8 | Understanding, insight | Transitional |
| People | 9–11 | Admiration, connection | Character-driven |
| Modern | 12–14 | Energy, recognition | Digital, accelerated |
| Close | 15–16 | Reflection, belonging | Unified, resolved |

### 1.4 Key Messages

1. "Slang" named itself before dictionaries could name it
2. The word's etymology is genuinely unknown—and that's fitting
3. Gatekeepers and champions have battled over slang's status for centuries
4. Slang is social glue, not linguistic decay
5. The internet accelerated what has always been true: language belongs to its speakers

### 1.5 Success Metrics

- Reader completes 80%+ of essay
- Social shares emphasize "surprising facts" or visual quality
- Design community recognition for typographic execution
- Zero factual corrections needed post-publication

---

## Layer 2: Technical Systems

### 2.1 Framework

- **Platform:** Next.js 14+ with App Router
- **Styling:** CSS Modules with CSS custom properties
- **Animation:** CSS animations + Framer Motion for scroll-triggered effects
- **Typography:** Variable fonts via Google Fonts / self-hosted
- **Build:** Static export compatible

### 2.2 Responsive Strategy

| Breakpoint | Panel Layout | Typography Scale |
|------------|--------------|------------------|
| Mobile (<640px) | Single column, stacked | Base: 16px, H1: 32px |
| Tablet (640–1024px) | Constrained width | Base: 18px, H1: 48px |
| Desktop (1024px+) | Full panel width | Base: 20px, H1: 64px |

### 2.3 Accessibility Requirements

- **WCAG 2.1 AA** minimum contrast ratios
- **Semantic HTML** for all content sections
- **Keyboard navigation** for interactive elements
- **Reduced motion** media query support
- **Screen reader** compatibility for all text content

### 2.4 Performance Targets

- **LCP:** <2.5s (no images to load)
- **CLS:** <0.1 (stable layouts)
- **FID:** <100ms
- **Bundle size:** <200KB initial JS

### 2.5 File Structure

```
src/app/essays/etymology/the-word-slang-typographic/
├── page.tsx                    # Next.js page (metadata, schema)
├── TheWordSlangTypographicClient.tsx  # Main client component
├── the-word-slang-typographic.css     # Styles
├── components/
│   ├── Panel.tsx               # Reusable panel wrapper
│   ├── Timeline.tsx            # Timeline component
│   ├── ConceptConstellation.tsx # Slang neighbors diagram
│   ├── IdentityCard.tsx        # Key figure cards
│   ├── ConfidenceMeter.tsx     # Etymology confidence display
│   └── QuoteCard.tsx           # Styled quote component
└── research/
    └── [6 research files]
```

---

## Layer 3: Hero Architecture

### 3.1 Opening Hero

**Panel 1: "The Word in the Wild"**

**Visual Composition:**
- Full-viewport typographic collage
- The word "SLANG" fragmented across the canvas
- Layered at different scales: tiny (whispered), medium (spoken), large (shouted)
- Fragments of slang words from different eras float behind: "cool," "lit," "hip," "groovy," "rad"
- Dark background (near-black) with type in cream, gold accents

**Typography:**
- Display: Dramatic contrast serif (like Editorial New or Reckless)
- "SLANG" letters at 3 different scales, overlapping
- Micro-type layer of historical quotes in monospace (barely readable, texture)

**Animation:**
- Subtle parallax on scroll
- Letters shift position slightly with mouse movement (desktop)
- Fade reveals the subtitle on scroll

**Copy:**
> "Some words describe the margins. This one was born there."

### 3.2 Title Card

**Panel 2: "Birth Certificate"**

**Visual Composition:**
- Clean, centered layout
- The word "SLANG" as typographic sculpture—dimensional, shadowed
- Below: "First recorded: London, 1756"
- Stamp seal motif: "ATTESTED" in a rounded rectangle

**Typography:**
- Main title: 128px+ display serif, warm cream
- Subtitle: 24px transitional serif, gold accent
- Date stamp: Monospace, slightly rotated

**Copy:**
> "A word so low, so marginal, that no one thought to write it down—until a novelist did."

---

## Layer 4: Chapter Schema

### Chapter A: The Hook (Panels 1–2)

| Panel | Title | Subtitle | Hero Visual | Micro-Artifact |
|-------|-------|----------|-------------|----------------|
| 1 | The Word in the Wild | Language you weren't supposed to hear | Typographic collage | Pull quote fragments |
| 2 | Birth Certificate | London, 1756 | "SLANG" dimensional | ATTESTED stamp |

### Chapter B: Origin & Etymology (Panels 3–5)

| Panel | Title | Subtitle | Hero Visual | Micro-Artifact |
|-------|-------|----------|-------------|----------------|
| 3 | The First Sighting | A novelist captures what scholars missed | 1756 quote facsimile | Dictionary entry frame |
| 4 | The Mystery | Where did this word come from? | Etymology flow diagram | Confidence meters |
| 5 | The Scandinavian Suspect | A theory, not a verdict | Norwegian *slengja* typography | Marginalia annotation |

### Chapter C: Semantic Evolution (Panels 6–8)

| Panel | Title | Subtitle | Hero Visual | Micro-Artifact |
|-------|-------|----------|-------------|----------------|
| 6 | Criminal Beginnings | Cant, flash, and the language of the underground | "CANT" → "SLANG" transition | Grose dictionary facsimile |
| 7 | The Expansion | From thieves to everyone | Semantic widening diagram | Mini-glossary capsule |
| 8 | Slang's Neighbors | A family of outsiders | Concept constellation | Definition comparison |

### Chapter D: The Gatekeepers (Panels 9–11)

| Panel | Title | Subtitle | Hero Visual | Micro-Artifact |
|-------|-------|----------|-------------|----------------|
| 9 | The Collectors | Those who documented the undocumented | Identity cards (Grose, Hotten, Green) | Quote cards |
| 10 | The Judges | "A conscious offence against propriety" | Bradley quote as institutional type | Britannica facsimile |
| 11 | The Champions | "Devised by individuals of wit and ingenuity" | Mencken/Whitman quote duel | American newspaper style |

### Chapter E: Timeline & Spread (Panels 12–13)

| Panel | Title | Subtitle | Hero Visual | Micro-Artifact |
|-------|-------|----------|-------------|----------------|
| 12 | 250 Years of "Slang" | A timeline | Full timeline component | Era band key |
| 13 | The Global Word | From London to everywhere | Line-art map | Regional labels |

### Chapter F: Modern Era & Closing (Panels 14–16)

| Panel | Title | Subtitle | Hero Visual | Micro-Artifact |
|-------|-------|----------|-------------|----------------|
| 14 | The Internet Engine | When slang got velocity | Glitch-style acceleration graphic | Platform iconography |
| 15 | The Half-Life | Why words burn bright, then vanish | Typographic decay animation | Slang lifecycle diagram |
| 16 | The Rogue's Return | Language belongs to those who speak it | Unified "SLANG" resolved | Closing quote |

---

## Layer 5: Design System

### 5.1 Brand Direction: "The Rogue Archive"

**Concept:** Slang as escaped prisoner from the dictionary's jail. The design feels like archival documents that have broken free—scholarly bones with subversive energy.

**Emotional Tone:** Mischievous, historically grounded, intellectually playful

**What It Signals:** Slang has always existed in tension with authority. This design honors both the gatekeepers who documented it and the speakers who created it.

### 5.2 Color System

#### Base Palette
| Name | Hex | Role |
|------|-----|------|
| Archive Black | `#0D0D0D` | Primary background |
| Parchment | `#F5F0E6` | Primary text, light panels |
| Aged Cream | `#E8E0D0` | Secondary text |

#### Accent Colors
| Name | Hex | Role |
|------|-----|------|
| Attestation Gold | `#C4A04D` | Dates, stamps, verification |
| Gatekeeper Red | `#8B2635` | Authority, Victorian era |
| Street Signal Yellow | `#E6B325` | Modern era, emphasis |

#### Era-Based Color Rules
| Era | Background | Primary | Accent |
|-----|------------|---------|--------|
| Georgian (1756–1800) | Deep sepia `#1A1612` | Parchment | Gold |
| Victorian (1850–1911) | Charcoal `#1C1C1C` | Cream | Red |
| American (1919–1960) | Off-black `#0F0F0F` | Warm white | Gold + Red |
| Digital (1999–now) | True black `#000000` | Clean white | Yellow |

### 5.3 Typography System

#### Display Type
**Category:** High-contrast editorial serif
**Examples:** Editorial New, Reckless Neue, GT Sectra Display
**Rationale:** Captures the archival/documentary feel while allowing dramatic scale. The high contrast echoes historical printing while feeling contemporary.
**Usage:** Panel titles, hero type, the word "SLANG" itself

#### Text Type
**Category:** Readable transitional serif
**Examples:** Spectral, Source Serif Pro, Crimson Pro
**Rationale:** Balances scholarly credibility with screen readability. Transitional forms bridge historical and modern.
**Usage:** Body copy, longer passages, definitions

#### Mono/Annotation Type
**Category:** Proportional monospace or typewriter
**Examples:** JetBrains Mono, IBM Plex Mono, iA Writer Mono
**Rationale:** Signals documentation, citations, scholarly apparatus. Creates visual distinction for meta-content.
**Usage:** Citations, dates, source notes, marginalia

#### Hierarchy Rules
| Level | Font | Size | Weight | Tracking |
|-------|------|------|--------|----------|
| H1 (Panel Title) | Display | 48–64px | Bold | -0.02em |
| H2 (Subtitle) | Display | 24–32px | Regular | 0 |
| Body | Text | 18–20px | Regular | 0 |
| Caption | Text | 14–16px | Regular | 0.01em |
| Citation | Mono | 12–14px | Regular | 0.02em |
| Stamp | Mono | 14–18px | Bold | 0.1em |

#### Typographic Behaviors
- **Small caps:** For "OED," "ATTESTED," era labels
- **Italics:** Foreign words (*slengja*), emphasis, book titles
- **Redaction bars:** Black rectangles over text for uncertainty/taboo motif
- **Brackets:** [SLANG] for editorial labeling, contested status
- **Underlines:** Reserved for hyperlinks only

### 5.4 Graphic Motifs

| Motif | Visual | Meaning | Usage |
|-------|--------|---------|-------|
| Brackets [ ] | Square brackets around text | Editorial labeling, stigma, contested status | Around slang terms being discussed |
| Redaction bar | Black rectangle over text | Unknown, suppressed, taboo | Etymology uncertainty |
| Speech fragment | Partial speech bubble outline | Oral culture, ephemeral speech | Quote treatments |
| Dictionary frame | Double-line border with headword style | Authority, documentation | Facsimile panels |
| Stamp seal | Rounded rectangle with caps text | Attestation, verification | Dates ("ATTESTED 1756") |
| Arrow/callout | Simple line with annotation | Linguistic analysis | Explanatory elements |
| Glitch lines | Horizontal distortion | Digital acceleration, noise | Internet era panels |
| Ligature connector | Hyphen or ligature mark | Word evolution, connection | Timeline connections |
| Marginalia marks | Handwritten-style annotations | Scholar's notes | Secondary commentary |
| Era band | Background color shift | Historical period boundary | Timeline, transitions |

### 5.5 Layout & Grid

#### Grid System
- **Columns:** 12-column grid
- **Gutter:** 24px (mobile), 32px (tablet), 40px (desktop)
- **Margins:** 5% (mobile), 8% (tablet), 12% (desktop)

#### Panel Layout
- **Full-bleed:** Hero panels (1, 2, 16)
- **Contained:** Content panels (3–15)
- **Maximum width:** 1200px for readability

#### Caption Placement
- **Position:** Bottom-left of visual elements
- **Style:** Small caps label + source in monospace
- **Margin:** 12px from visual edge

#### Footnote System
- **In-text:** Superscript numbers
- **Display:** Panel footer, monospace, smaller size
- **Linking:** Click/tap to expand

#### Museum Placard Style
- **Background:** Semi-transparent dark overlay
- **Border:** 1px gold line (left edge only)
- **Padding:** 16px 20px
- **Typography:** Small caps title, regular body

---

## Layer 6: Production Directives

### 6.1 Component Priority

1. **P0 (Must Ship):**
   - Panel wrapper with era theming
   - Typography scale and hierarchy
   - 16 panel structure with all copy
   - Timeline component (static)
   - Concept constellation (static)
   - Quote cards
   - Basic responsive layout

2. **P1 (Should Ship):**
   - Scroll-triggered era transitions
   - Identity cards for 8 key figures
   - Stamp/seal micro-artifacts
   - Confidence meters for etymology

3. **P2 (Nice to Have):**
   - Parallax effects on hero
   - Animated timeline
   - Interactive concept constellation
   - Glossary popups

### 6.2 Copy Requirements

| Panel | Word Count | Status |
|-------|------------|--------|
| 1 | 50 | Required |
| 2 | 80 | Required |
| 3 | 150 | Required |
| 4 | 180 | Required |
| 5 | 150 | Required |
| 6 | 160 | Required |
| 7 | 140 | Required |
| 8 | 120 | Required |
| 9 | 200 | Required |
| 10 | 150 | Required |
| 11 | 180 | Required |
| 12 | 100 (+ timeline) | Required |
| 13 | 120 (+ map) | Required |
| 14 | 150 | Required |
| 15 | 130 | Required |
| 16 | 80 | Required |
| **Total** | ~2,100 | |

### 6.3 Key Figure Cards

| Figure | Era | Typography Style | Quote/Contribution |
|--------|-----|------------------|-------------------|
| Francis Grose | 1785 | Georgian scholarly serif | "SLANG. Cant language." |
| John Camden Hotten | 1859 | Victorian bold display | First "Slang Dictionary" |
| Henry Bradley | 1911 | Britannica formal | "conscious offence against propriety" |
| H.L. Mencken | 1919 | American newspaper | "devised by individuals of wit" |
| Walt Whitman | 1885 | Poetic humanist | "the lawless germinal element" |
| Eric Partridge | 1937 | British academic | "language at play" |
| Connie Eble | 1996 | Modern academic | "creates solidarity" |
| Jonathon Green | 2010 | Contemporary reference | 125,000+ entries |

### 6.4 Bibliography Integration

Every panel must include:
- In-text citation markers (superscript)
- Panel-level source list (footer)
- All sources link to full bibliography (separate component)

### 6.5 QA Checklist

- [ ] All 16 panels render correctly
- [ ] Typography hierarchy is consistent
- [ ] Colors match era specifications
- [ ] All citations are accurate and verifiable
- [ ] Responsive layouts function at all breakpoints
- [ ] Accessibility audit passes (axe-core)
- [ ] No photographs or photorealistic elements
- [ ] All quotes are properly attributed
- [ ] Timeline contains 16+ milestones with sources
- [ ] Concept constellation shows all 7 terms with definitions

---

## Appendix: Research Package Reference

All research materials are located in:
`src/app/essays/etymology/the-word-slang-typographic/research/`

| File | Contents |
|------|----------|
| CITATIONS.md | 17 verified sources |
| SYNTHESIS.md | Key findings + brand recommendations |
| FIGURES.md | 15 figure specifications |
| QUOTES.md | 18 verified quotes |
| TIMELINE.md | 19 milestones + design specs |
| VISUALS.md | 24 typographic references |
