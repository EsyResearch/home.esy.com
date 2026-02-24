# Visual Essay Invocation Spec: Seven Million Years

**Status**: ✅ APPROVED
**Date**: February 24, 2026
**Research Package**: `src/app/essays/seven-million-years/research/`
**Mode**: Historical Essay (Deep) + Data Journalism Extension

---

## Layer 1: Strategic Foundation

```yaml
# Layer 1: Strategic Foundation
title: "Seven Million Years"
subtitle: "The Complete Visual History of Our Kind"
slug: "seven-million-years"
type: visual-essay
category: Science
subcategory: Paleoanthropology
status: draft

# Core Thesis
thesis: "The history of hominins is not a march from primitive to modern but a 7-million-year branching experiment in which dozens of human species emerged, adapted, and — with a single exception — went extinct. We are the last ones standing, not the inevitable destination."

# Target Audience
audience:
  level: "general-curious"
  profile: "Curious adults who read longform journalism (NYT, National Geographic, The Atlantic). Interested in science and human origins but not specialists. May have seen March of Progress image and assumed it's accurate."
  assumed_knowledge:
    - "Humans evolved from earlier primates"
    - "Neanderthals existed and are now extinct"
    - "Lucy is a famous early human fossil"
    - "Africa is the cradle of humankind"
  learning_objectives:
    - "Understand that human evolution is branching (bushy), not linear"
    - "Name at least 8 different hominin species and their approximate dates"
    - "Explain why Homo sapiens survived when others didn't"
    - "Recognize that we carry Neanderthal and Denisovan DNA"
    - "Appreciate the vast timescales involved (7 million years)"
    - "Understand the role of climate in driving hominin evolution and extinction"

# Scope Boundaries
scope:
  includes:
    - "All major hominin species from Sahelanthropus to Homo sapiens"
    - "Geological and climatic context (Miocene through Holocene)"
    - "Species-by-species profiles with sourced data"
    - "Comparative anatomy and behavior across species"
    - "Tool technology evolution"
    - "Migration patterns and Out of Africa events"
    - "The sapiens survival question — why us?"
    - "Interbreeding and genetic legacy"
    - "Neanderthal culture, capabilities, and decline"
    - "Island hominins (floresiensis, luzonensis)"
    - "The Denisovan mystery"
  excludes:
    - "Post-agricultural human civilization"
    - "Pre-hominin primate evolution in detail"
    - "Future human evolution speculation"
    - "Detailed molecular biology / genetics methodology"

# Read Time
estimated_read_time: "35-45 minutes"
visualization_count: 9
word_count: "7,000-9,000"
code_lines: "4,000+"
```

---

## Layer 2: Technical Systems

```yaml
# Layer 2: Technical Systems
research_package: "src/app/essays/seven-million-years/research/"

# Core Research Files (Historical Profile + Data Extension)
citations_file: "CITATIONS.md"
figures_file: "FIGURES.md"
timeline_file: "TIMELINE.md"
quotes_file: "QUOTES.md"
visuals_file: "VISUALS.md"
era_guide_file: "ERA-GUIDE.md"
datasets_file: "DATASETS.md"
comparisons_file: "COMPARISONS.md"
synthesis_file: "SYNTHESIS.md"

# Source Quality Requirements
source_requirements:
  minimum_total: 15
  tier_1_minimum_pct: 80
  tier_1_2_minimum_pct: 100
  actual_total: 23
  actual_tier_1_pct: 100
  actual_tier_1_2_pct: 100

# Key Sources
key_sources:
  - id: S1
    citation: "Brunet et al. 2002 — Sahelanthropus tchadensis"
    tier: 1
    used_for: "Earliest hominin candidate"
  - id: S3
    citation: "Johanson & White 1979 — Australopithecus afarensis"
    tier: 1
    used_for: "Lucy, bipedalism evidence"
  - id: S7
    citation: "Hublin et al. 2017 — Jebel Irhoud sapiens"
    tier: 1
    used_for: "Earliest Homo sapiens, pan-African origin"
  - id: S8
    citation: "Green et al. 2010 — Neanderthal genome"
    tier: 1
    used_for: "Interbreeding evidence"
  - id: S9
    citation: "Reich et al. 2010 — Denisovan genome"
    tier: 1
    used_for: "Denisovan discovery"
  - id: S10
    citation: "Stringer 2012 — Lone Survivors"
    tier: 1
    used_for: "Comprehensive synthesis, survival theories"
  - id: S12
    citation: "Antón, Potts & Aiello 2014 — Early Homo"
    tier: 1
    used_for: "H. erectus evolution, variability selection"
  - id: S14
    citation: "Potts 1996/1998 — Variability Selection"
    tier: 1
    used_for: "Climate-adaptation hypothesis"

# Photography Requirements
photography:
  style: "museum-specimen + landscape"
  sources:
    - "Wikimedia Commons (CC BY-SA)"
    - "Smithsonian Open Access (CC0)"
    - "Natural History Museum London"
  treatment: "Full-bleed landscape, contained specimen photos on dark backgrounds"
  minimum_images: 12
```

---

## Layer 3: Hero Architecture

```yaml
# Layer 3: Hero Architecture
hero:
  type: "full-bleed-photographic"
  visual: "Dark background with a single illuminated hominin cranium (Homo erectus or composite), shot from three-quarter angle, museum-lighting style. The 7-million-year timeline faintly traces vertically behind it."

  # The hook
  opening_text: >
    Seven million years.
    That is how long this story has been running.
    In that time, at least twenty-one species of human have walked the Earth.
    We are the only one left.

  # Hero sequence
  stages:
    - stage: 1
      visual: "Total darkness. A single number appears: 7,000,000"
      text: "Seven million years."
    - stage: 2
      visual: "Faint cranium outline begins to emerge from darkness"
      text: "That is how long this story has been running."
    - stage: 3
      visual: "Multiple cranium silhouettes appear and fade — suggesting the many species"
      text: "At least twenty-one species of human have walked the Earth."
    - stage: 4
      visual: "All silhouettes fade except one — modern human skull, fully lit"
      text: "We are the only one left."
    - stage: 5
      visual: "Pull back to reveal geological layers — deep time strata"
      text: "This is the story of all of them."

  # Transition
  hero_to_body: "Geological strata dissolve into the first era section"
```

---

## Layer 4: Chapter Schema

```yaml
# Layer 4: Chapter Schema
sections:

  - id: 1
    title: "The Deep Divergence"
    subtitle: "7–4.4 million years ago"
    era: "Late Miocene → Early Pliocene"
    word_count: "700-900"
    species_covered:
      - Sahelanthropus tchadensis
      - Orrorin tugenensis
      - Ardipithecus kadabba
      - Ardipithecus ramidus
    citations: [S1, S2, S3_white]
    key_quote: Q5_johanson (adapted — use Ardi context)
    visualization:
      id: V1
      name: "Phylogenetic Tree"
      type: "D3 interactive cladogram"
      tier: 2
      description: "Interactive branching tree of all hominin species. Time-scaled x-axis (7 MYA → present). Click species for popup with key details. Highlights contested placements with dashed branches."
      interactivity: "Click species nodes, hover for dates and brain size"
    emotional_beat: Mystery — peering through deep time with fragmentary evidence
    photography:
      - "Toumaï cranium (Sahelanthropus) — three-quarter view"
      - "Ardi reconstruction or skeleton cast"
      - "Afar Depression landscape — where Ardi was found"

  - id: 2
    title: "The Australopith Explosion"
    subtitle: "4.4–2 million years ago"
    era: "Pliocene"
    word_count: "800-1000"
    species_covered:
      - Australopithecus anamensis
      - Australopithecus afarensis
      - Kenyanthropus platyops
      - Australopithecus africanus
      - Australopithecus garhi
      - Paranthropus aethiopicus
      - Paranthropus boisei
      - Paranthropus robustus
    citations: [S3, S4, S5_berger_sediba, S18_harmand]
    key_quote: Q5_johanson
    visualization:
      id: V2
      name: "Species Timeline"
      type: "D3/Recharts interactive gantt chart"
      tier: 2
      description: "Horizontal bars showing temporal range of every hominin species. Color-coded by genus. Overlap regions highlighted. Hover reveals species details. Vertical cursor shows 'who was alive at this moment.'"
      interactivity: "Hover for details, scrub timeline cursor, filter by genus"
    emotional_beat: Proliferation — evolution experimenting with multiple body plans
    photography:
      - "Lucy skeleton (AL 288-1) — Ethiopian National Museum"
      - "Laetoli footprints"
      - "Paranthropus boisei cranium (OH 5 / 'Zinj')"
      - "Olduvai Gorge landscape"

  - id: 3
    title: "The First Humans"
    subtitle: "2.8–1 million years ago"
    era: "Early Pleistocene"
    word_count: "800-1000"
    species_covered:
      - Homo habilis
      - Homo rudolfensis
      - Homo erectus
      - Australopithecus sediba
    citations: [S12, S15, S22]
    visualization:
      id: V3
      name: "Brain Volume Chart"
      type: "Recharts ScatterChart"
      tier: 2
      description: "Scatter plot: X-axis = time (MYA), Y-axis = cranial capacity (cc). Each dot = a species (sized by specimen count). Trend line showing overall brain expansion. Color-coded by genus. Hover for species name and details."
      interactivity: "Hover for species details, toggle trend line"
    emotional_beat: Momentum — genus Homo finding its stride
    photography:
      - "Turkana Boy (KNM-WT 15000) skeleton"
      - "Dmanisi Skull 5"
      - "Oldowan and Acheulean hand axes"
      - "Dmanisi site, Georgia"

  - id: 4
    title: "Out of Africa"
    subtitle: "The first great migration"
    era: "Early-Middle Pleistocene"
    word_count: "600-800"
    species_covered:
      - Homo erectus (global dispersal)
    citations: [S15, S12]
    visualization:
      id: V4
      name: "Migration Map — Out of Africa I"
      type: "D3-geo animated map"
      tier: 2
      description: "World map (Natural Earth projection) showing H. erectus dispersal from East Africa to Dmanisi, Java, and China. Animated routes with date labels. Key sites marked. Can toggle between different dispersal events."
      interactivity: "Play/pause animation, toggle routes, click sites for details"
    emotional_beat: Expansion — first hominin footsteps on new continents
    photography:
      - "Java Man site (Trinil, Java)"
      - "Zhoukoudian cave entrance (China)"
      - "Great Rift Valley aerial view"

  - id: 5
    title: "The Great Diversification"
    subtitle: "800–130 thousand years ago"
    era: "Middle Pleistocene"
    word_count: "700-900"
    species_covered:
      - Homo heidelbergensis
      - Homo naledi
      - Early Homo sapiens
      - Early Neanderthals
      - Denisovans
    citations: [S5, S7, S9, S17, S20]
    visualization:
      id: V5
      name: "Climate Overlay"
      type: "D3 layered line chart"
      tier: 2
      description: "Marine isotope δ18O curve (Lisiecki & Raymo 2005) showing glacial/interglacial cycles. Species range bars overlaid as semi-transparent horizontal bands. Vertical markers for key events (first fire, wooden spears, etc.)."
      interactivity: "Hover for climate values and events, toggle species overlays"
    emotional_beat: Complexity — multiple human species alive simultaneously
    photography:
      - "Sima de los Huesos cranium (Atapuerca)"
      - "Homo naledi cranium (DH1)"
      - "Schöningen spears"
      - "Rising Star Cave entrance"

  - id: 6
    title: "Our Closest Kin"
    subtitle: "The Neanderthals"
    era: "400–40 thousand years ago"
    word_count: "900-1100"
    species_covered:
      - Homo neanderthalensis
    citations: [S8, S19, S10]
    key_quote: Q8_finlayson
    comparison: "Sapiens vs. Neanderthals — the central comparison"
    visualization:
      id: V6
      name: "Species Comparison Dashboard"
      type: "Recharts RadarChart + custom cards"
      tier: 2
      description: "Interactive side-by-side comparison of Neanderthals vs. Homo sapiens across 8+ dimensions: brain size, body mass, caloric needs, tool complexity, group size, geographic range, symbolic behavior, genetic diversity. Radar chart + detailed cards below."
      interactivity: "Toggle between species pairs, hover for detailed comparisons"
    emotional_beat: Respect and elegy — they were formidable, not primitive
    photography:
      - "La Chapelle-aux-Saints cranium"
      - "Neanderthal reconstruction (museum quality)"
      - "Mousterian tools / Levallois cores"
      - "Gorham's Cave, Gibraltar"

  - id: 7
    title: "The Rise of Sapiens"
    subtitle: "300 thousand years ago to the cognitive revolution"
    era: "Middle-Late Pleistocene"
    word_count: "800-1000"
    species_covered:
      - Homo sapiens
    citations: [S7, S21, S10, S13]
    key_quote: Q10_henrich
    visualization:
      id: V7
      name: "Tool Technology Timeline"
      type: "D3 stepped progression"
      tier: 2
      description: "Visual progression from Lomekwian through Upper Paleolithic. Each stage shows representative tools, associated species, key innovations. Scroll-driven reveal with tool photography/illustrations and annotated descriptions."
      interactivity: "Scroll through stages, hover for details"
    emotional_beat: Emergence — language, art, symbolic thought changing everything
    photography:
      - "Jebel Irhoud cranium"
      - "Blombos Cave ochre engravings"
      - "Upper Paleolithic blade tools"
      - "Lion Man of Hohlenstein-Stadel"

  - id: 8
    title: "The Coexistence"
    subtitle: "When five species of human walked the Earth"
    era: "130–40 thousand years ago"
    word_count: "600-800"
    species_covered:
      - All coexisting species
    citations: [S5_naledi, S6, S9, S16]
    visualization:
      id: V8
      name: "Body Size Comparison"
      type: "Custom SVG silhouettes + Recharts"
      tier: 2
      description: "Height comparison showing scaled silhouettes of 8 key species side by side. Below: grouped bar chart of height and mass estimates. Emphasizes the diversity of body plans alive simultaneously."
      interactivity: "Hover silhouettes for species details"
    emotional_beat: Wonder — the most diverse period in human history
    photography:
      - "H. floresiensis cast (Liang Bua)"
      - "Denisova Cave exterior"
      - "Chauvet Cave paintings"

  - id: 9
    title: "Why We Survived"
    subtitle: "Theories on the sapiens advantage"
    era: "Synthesis"
    word_count: "800-1000"
    citations: [S10, S13, S14, S23]
    key_quote: Q10_henrich
    theories:
      - "Social network superiority (Dunbar's number)"
      - "Language and symbolic thought"
      - "Dietary flexibility / generalist strategy"
      - "Cultural cumulation (ratchet effect)"
      - "Demographic advantages"
      - "Luck and timing"
    emotional_beat: Understanding — connecting the evidence into a coherent argument

  - id: 10
    title: "The Migration"
    subtitle: "How one species colonized every continent"
    era: "65 thousand years ago to present"
    word_count: "500-700"
    citations: [S21, S10]
    visualization:
      id: V9
      name: "Global Migration Animation"
      type: "D3-geo animated world map"
      tier: 2
      description: "Full animated migration map showing sapiens dispersal from Africa to Australia, Europe, Asia, and the Americas. Animated paths with date labels. Population density heat map builds over time. Key sites marked (Madjedbebe, Bacho Kiro, Monte Verde)."
      interactivity: "Play/pause, speed control, click sites, timeline scrubber"
    emotional_beat: Awe — one species reaching every corner of the planet
    photography:
      - "World landscapes montage — Arctic, desert, rainforest, coast"

  - id: 11
    title: "The Last Ones Standing"
    subtitle: "Alone for 40,000 years"
    era: "Epilogue"
    word_count: "400-500"
    citations: [S8, S9, S10]
    key_quote: Q12_cronin
    visualization: null
    emotional_beat: Reflection — the weight of being the sole survivor
    themes:
      - "Genetic legacy of extinct species in our DNA"
      - "40,000 years of solitude is the exception, not the rule"
      - "What we carry from those who came before"
```

---

## Layer 5: Design System

```yaml
# Layer 5: Design System

# CRITICAL: This is subject-derived. Do NOT copy from any existing essay.
# Design research will be conducted in G4 to derive the final visual identity.

design_philosophy: >
  The visual identity must be derived from the subject matter itself:
  geological strata, fossilized bone, stone tools, cave environments, ochre pigments.
  The essay should feel like walking through a world-class natural history museum —
  dramatic lighting on specimens, vast landscapes establishing geographic context,
  and publication-quality data visualizations that would not look out of place
  in Nature or Scientific American.

color_direction:
  primary: "Earth/geological strata tones (to be specified in G4 DESIGN-RESEARCH.md)"
  secondary: "Ochre and bone (to be specified in G4)"
  accent: "A warm accent derived from fire/ochre pigments"
  backgrounds: "Deep cave-dark tones — not pure black, but charcoal and volcanic"
  note: "Final palette will be determined by Design Research (G4)"

typography_direction:
  display: "Serif — editorial authority, scientific gravitas"
  body: "Serif — long-form reading comfort"
  data: "Sans-serif — clean, scientific chart labels"
  mono: "Monospace — dates, measurements, technical terms"

photography_treatment:
  hero_images: "Full-bleed, dark-background museum-style lighting"
  specimen_photos: "Contained within frames, annotated where useful"
  landscape_photos: "Full-bleed establishing shots for each era"
  overall: "Photography-forward — images are not decoration, they carry narrative weight"

animation_direction:
  philosophy: "Purposeful, not decorative. Every animation should reveal information."
  scroll_reveals: "Sections fade in on scroll (intersection observer)"
  data_transitions: "Smooth D3 transitions on chart interactions"
  migration_map: "Animated paths with easing — elegant, not jerky"
  avoid: "No gratuitous particle effects, no spinning loaders, no SVG shimmer"

chart_quality:
  standard: "Publication-quality — axes, labels, legends, source attribution"
  library: "Recharts for standard charts, D3 for geographic and complex"
  no_css_charts: "CSS-only width bars are NOT charts. All data viz must use proper libraries."
  responsive: "Charts must adapt to mobile viewports"
```

---

## Layer 6: Implementation Notes

```yaml
# Layer 6: Implementation Notes

# File Structure
files:
  page: "src/app/essays/seven-million-years/page.tsx"
  client: "src/app/essays/seven-million-years/SevenMillionYearsClient.tsx"
  css: "src/app/essays/seven-million-years/seven-million-years.css"
  data_registration: "src/data/visualEssays.ts"

# Component Architecture
components:
  wrapper: "ArtifactDetailWrapper (existing — import from @/components/ArtifactDetail)"
  progress_bar: "Custom reading progress indicator (subject-derived)"
  section_reveal: "IntersectionObserver-based section fade-in"
  phylogenetic_tree: "D3 cladogram (may need separate component file if >80 lines)"
  migration_map: "D3-geo animated map (will need separate component file)"
  brain_chart: "Recharts ScatterChart"
  timeline: "D3 or Recharts gantt-style chart"
  comparison_dashboard: "Recharts RadarChart + custom HTML cards"
  body_size: "Custom SVG silhouettes + Recharts bar chart"
  climate_overlay: "D3 line chart with overlaid bands"
  tool_progression: "D3 stepped timeline or custom SVG"

# Key Implementation Constraints
constraints:
  - "NO existing essay design reference — build from first principles"
  - "All data visualizations must be Tier 2+ (Recharts/D3, not CSS)"
  - "D3-geo with topojson for all geographic visualizations"
  - "Responsive design — all charts must work on mobile"
  - "Accessibility — alt text on all images, data tables for charts"
  - "Reduced motion support via prefers-reduced-motion media query"
  - "Print styles for key content sections"
  - "Images lazy-loaded below the fold"
  - "All dates and claims sourced to CITATIONS.md"

# Registration
visual_essays_entry:
  id: "seven-million-years"
  number: "93"
  title: "Seven Million Years"
  subtitle: "The Complete Visual History of Our Kind"
  description: "A comprehensive visual journey through 7 million years of hominin evolution — from the earliest bipedal apes to the sole surviving species. Featuring interactive migration maps, species comparison charts, and the story of why we're the last ones standing."
  category: "Science"
  readTime: "40 min"
  href: "/essays/seven-million-years"
  tags: ["evolution", "paleoanthropology", "hominid", "human origins", "Neanderthal", "migration", "fossil record", "deep time"]
  visualStyle: "photorealistic"
  isNew: true

# Performance Budget
performance:
  target_lcp: "<2.5s"
  target_cls: "<0.1"
  heavy_components: "Lazy-load migration map and phylogenetic tree (below fold)"
  image_format: "WebP with JPEG fallback"
  d3_bundle: "Import only needed D3 modules (d3-geo, d3-scale, d3-interpolate)"
```
