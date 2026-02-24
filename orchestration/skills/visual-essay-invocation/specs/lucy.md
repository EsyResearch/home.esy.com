# Visual Essay Invocation Spec: Lucy — Before the Genus Homo

**Status**: ✅ APPROVED
**Date**: February 24, 2026
**Research Package**: `src/app/essays/science/lucy/research/`
**Mode**: Historical Essay (Deep) + Data Journalism Extension
**Cluster Parent**: `seven-million-years`

---

## Layer 1: Strategic Foundation

```yaml
title: "Lucy: Before the Genus Homo"
subtitle: "The Fossil That Rewrote the Story of Walking Upright"
slug: "lucy"
type: visual-essay
category: Science
subcategory: Paleoanthropology
cluster_parent: seven-million-years
status: approved

thesis: "Lucy is not just a fossil — she is a 3.2-million-year-old argument about what it means to be human. Her skeleton settled the bipedalism-before-brains debate, but nearly everything else about her — how she died, how she lived, what she ate, whether she climbed trees, and where she fits on our family tree — remains contested. She is simultaneously the most famous hominin fossil ever found and one of the most actively debated."

audience:
  level: "beginner-intermediate"
  profile: "Curious adults who have heard the name Lucy but don't know the details. Veritasium/Kurzgesagt viewers. Readers of Seven Million Years who want to go deeper on one species. Comfortable with science writing but haven't studied anatomy or geology."
  assumed_knowledge:
    - "May know Lucy is a famous fossil"
    - "Unlikely to know she's 3.2 million years old"
    - "Not expected to know anatomical terminology"
    - "Expected to be willing to learn technical vocabulary"
  learning_objectives:
    - "Describe the discovery of AL 288-1 — who, where, when, why 40% completeness was extraordinary"
    - "Explain key anatomical features proving obligate bipedalism (valgus knee, bowl-shaped pelvis, femoral neck angle, lumbar lordosis)"
    - "Assess competing hypotheses about arboreal vs. terrestrial locomotion"
    - "Reconstruct the Pliocene East African environment Lucy inhabited"
    - "Compare A. afarensis against contemporary species"
    - "Evaluate theories about Lucy's cause of death"
    - "Understand what isotopic and microwear analysis reveals about diet"
    - "Articulate why Lucy reshaped the bipedalism-before-brains paradigm"
  accessibility_principles:
    - "Define then deploy — every anatomical term gets plain-language definition on first use, then is used freely"
    - "Show before telling — visualizations introduce concepts before text explains"
    - "Earned complexity — starts accessible, builds to intermediate by Section 5"
    - "Respect the reader — teaches up, not down"

scope:
  includes:
    - "The discovery of AL 288-1 at Hadar, Ethiopia (1974)"
    - "Detailed anatomical analysis of all recovered elements"
    - "The bipedalism question — obligate vs. facultative debate"
    - "Pliocene East African paleoecology at 3.2 Ma"
    - "Diet reconstruction from isotopic and microwear evidence"
    - "Social structure, sexual dimorphism, group dynamics"
    - "Cause of death hypothesis (Kappelman 2016)"
    - "Contemporary species comparison (A. africanus, K. platyops, A. deyiremeda, A. garhi, P. aethiopicus, Selam)"
    - "Phylogenetic position and cladistic debates"
    - "Cultural legacy and Ethiopian national significance"
    - "Pliocene climate context and turnover pulse hypothesis"
  excludes:
    - "Full hominin phylogeny (covered in parent essay)"
    - "Post-Homo evolution"
    - "Molecular clock dating methodology"
    - "Detailed comparative anatomy of ALL hominin species"
    - "Out of Africa migrations"
    - "Fictional/speculative daily-life reconstruction"

estimated_read_time: "35-45 minutes"
visualization_count: 12
word_count: "7,000-10,000"
photography_count: "25-35"
code_lines: "5,000+"
```

---

## Layer 2: Technical Systems

```yaml
research_package: "src/app/essays/science/lucy/research/"

citations_file: "CITATIONS.md"
figures_file: "FIGURES.md"
timeline_file: "TIMELINE.md"
quotes_file: "QUOTES.md"
visuals_file: "VISUALS.md"
era_guide_file: "ERA-GUIDE.md"
datasets_file: "DATASETS.md"
comparisons_file: "COMPARISONS.md"

source_requirements:
  minimum_total: 18
  tier_1_minimum_pct: 60
  actual_total: 24
  actual_tier_1_pct: 87.5
  actual_tier_2_pct: 8.3
  actual_tier_3_pct: 4.2

key_sources:
  - id: S01
    citation: "Johanson & White 1979, Science — A. afarensis type description"
    tier: 1
    used_for: "Sections 2, 3, 11 — original taxonomic paper"
  - id: S02
    citation: "Johanson & Edey 1981, Lucy: The Beginnings of Humankind"
    tier: 3
    used_for: "Section 2 — discovery narrative"
  - id: S03
    citation: "Kimbel & Delezene 2009, JHE — A. afarensis comprehensive review"
    tier: 2
    used_for: "Sections 3, 4, 5, 8, 11 — species reassessment"
  - id: S04
    citation: "Kappelman et al. 2016, Nature — perimortem fractures"
    tier: 1
    used_for: "Section 9 — death hypothesis"
  - id: S05
    citation: "Stern & Susman 1983, AJPA — arboreal locomotion"
    tier: 1
    used_for: "Section 5 — facultative bipedal hypothesis"
  - id: S06
    citation: "Lovejoy 1981, Science — evolution of human walking"
    tier: 1
    used_for: "Section 4 — obligate bipedal model"
  - id: S07
    citation: "Ward et al. 2011, Science — fourth metatarsal"
    tier: 1
    used_for: "Section 4 — foot arches and bipedalism"
  - id: S08
    citation: "Alemseged et al. 2006, Nature — Selam (DIK-1-1)"
    tier: 1
    used_for: "Section 10 — infant A. afarensis"
  - id: S09
    citation: "Haile-Selassie et al. 2015, Nature — A. deyiremeda"
    tier: 1
    used_for: "Sections 10, 11 — contemporary species"
  - id: S10
    citation: "Sponheimer & Lee-Thorp 1999, Science — isotopic ecology"
    tier: 1
    used_for: "Section 7 — diet reconstruction"
  - id: S11
    citation: "Reed 1997, JHE — Hadar paleoecology"
    tier: 1
    used_for: "Section 6 — environmental reconstruction"
  - id: S12
    citation: "Vrba 1985, South African J. Science — turnover pulse"
    tier: 1
    used_for: "Sections 6, 11 — climate-driven speciation"

photography:
  style: "museum-specimen + Ethiopian landscape"
  sources:
    - "Wikimedia Commons (CC BY-SA)"
    - "Smithsonian Open Access (CC0)"
    - "Cleveland Museum of Natural History"
    - "Ethiopian National Museum"
    - "Getty/Alamy (editorial, landscapes)"
  treatment: "Full-bleed landscape for Afar Depression; contained specimen photos on dark backgrounds"
  minimum_images: 25
  categories:
    - name: "Fossil specimens"
      count: "8-12"
    - name: "Landscape/site"
      count: "5-7"
    - name: "Anatomical comparison"
      count: "4-6"
    - name: "Climate/environment"
      count: "3-4"
    - name: "Cultural legacy"
      count: "2-3"

scroll_system:
  type: "intersection-observer + scroll-lock"
  lock_zones:
    - "Hero sequence (Section 0)"
    - "Skeletal completeness reveal (Section 3)"
    - "Bipedalism biomechanics animation (Section 4)"
    - "Contemporary species time-slider (Section 10)"
  parallax: "Subtle — sedimentary layers shift at 0.3x-0.7x rates"
  progress_indicator: "Geological stratigraphy — progress bar styled as a sedimentary column that fills with strata layers as the reader advances. Lucy's position marked."

visualization_suite:
  total: 12
  tier_3_count: 10
  tier_2_count: 2
  average_tier: 2.83
  visualizations:
    - id: D1
      name: "Anatomical Comparison"
      tier: 3
      type: "Interactive SVG/D3"
      section: 4
    - id: D2
      name: "Pliocene Climate Timeline"
      tier: 3
      type: "D3 Layered Chart + Brush"
      section: 6
    - id: D3
      name: "Hadar Site Map"
      tier: 3
      type: "D3-Geo Interactive Map"
      section: 1
    - id: D4
      name: "Dietary Analysis"
      tier: 3
      type: "D3 Scatter + Voronoi Hover"
      section: 7
    - id: D5
      name: "Body Size Dimorphism"
      tier: 2
      type: "Recharts Grouped Bar"
      section: 8
    - id: D6
      name: "Contemporary Species Map"
      tier: 3
      type: "D3-Geo Animated Map"
      section: 10
    - id: D7
      name: "Skeletal Completeness"
      tier: 3
      type: "Interactive SVG"
      section: 3
    - id: D8
      name: "Phylogenetic Position"
      tier: 3
      type: "D3 Interactive Cladogram"
      section: 11
    - id: D9
      name: "Cause of Death Evidence"
      tier: 3
      type: "Interactive SVG"
      section: 9
    - id: D10
      name: "Bipedalism Biomechanics"
      tier: 3
      type: "Canvas/SVG Animation"
      section: 4
    - id: D11
      name: "Stratigraphic Column"
      tier: 2
      type: "Annotated SVG"
      section: 1
    - id: D12
      name: "Species Trait Radar"
      tier: 3
      type: "D3 Radar Chart"
      section: 10
```

---

## Layer 3: Hero Architecture

```yaml
hero:
  type: "full-bleed-photographic"
  visual: "Dark background. A single fragment of fossilized bone — amber-brown against near-black matrix — resolves slowly from darkness. It is a proximal femur. The valgus angle is visible. This is the bone that proved we walked before we thought."

  opening_text: >
    In 1974, in a gully in the Afar Depression of Ethiopia,
    a knee joint changed everything we thought we knew
    about what makes us human.

  stages:
    - stage: 1
      scroll_pct: "0-15%"
      visual: "Total darkness. Silence. Then: a single bone fragment fades in, warm amber, museum-lit against black."
      text: null
    - stage: 2
      scroll_pct: "15-30%"
      visual: "More bones materialize — pelvis, vertebrae, ribs, skull fragments — arranging themselves into anatomical position. 47 of 206 elements. Forty percent."
      text: "Forty percent of her survived."
    - stage: 3
      scroll_pct: "30-50%"
      visual: "The skeleton is now assembled. A faint modern human silhouette appears beside it for scale — Lucy is small. 105 centimeters. The silhouette towers over her."
      text: "She stood three feet five inches tall. Her brain was the size of a chimpanzee's."
    - stage: 4
      scroll_pct: "50-70%"
      visual: "The pelvis glows — highlighted, isolated from the rest. It rotates slowly, showing its broad, bowl-shaped form. A chimpanzee pelvis appears for comparison: tall, narrow. The difference is unmistakable."
      text: "But her pelvis told a different story."
    - stage: 5
      scroll_pct: "70-85%"
      visual: "Pull back. The full skeleton, the comparison, all fade. A single line of text. Below it, the landscape of the Afar Depression fades in — vast, eroded, ancient."
      text: "She walked upright 3.2 million years ago. More than a million years before the genus Homo would appear."
    - stage: 6
      scroll_pct: "85-100%"
      visual: "Title card resolves over the landscape."
      text: "Lucy: Before the Genus Homo"

  hero_to_body: "Landscape cross-dissolves into the first section — the geology of the Afar, same warm earth tones, continuous visual flow"
```

---

## Layer 4: Chapter Schema

```yaml
sections:

  - id: 1
    title: "The Afar"
    subtitle: "Where the Earth splits open"
    era: "Geological context"
    word_count: "500-700"
    central_metaphor: "The Earth's own filing cabinet — tectonic forces that buried Lucy also exposed her"
    citations: [S11, S14, S15]
    visualization:
      - id: D3
        name: "Hadar Site Map"
        type: "D3-Geo Interactive Map"
        tier: 3
        description: "Zoomable map of the Afar Triangle with fossil localities. Click-to-reveal panels for each site."
      - id: D11
        name: "Stratigraphic Column"
        type: "Annotated SVG"
        tier: 2
        description: "Hadar Formation cross-section showing sedimentary members, tuff markers, and Lucy's position in the Denen Dora Member."
    content_beats:
      - "The Afar Triple Junction — three rifts meeting"
      - "How rifting preserves and exposes fossils"
      - "The Hadar Formation — four members, each a chapter in geological time"
      - "Volcanic tuffs as chronological bookmarks (radiometric dating)"
    photography:
      - "Afar Depression aerial/wide landscape"
      - "Exposed sedimentary strata at Hadar"
      - "Rift valley geological features"
    emotional_beat: "Setting the stage — the deep-time architecture that made discovery possible"

  - id: 2
    title: "November 24, 1974"
    subtitle: "A morning in the Afar"
    era: "Discovery"
    word_count: "600-800"
    central_metaphor: "The moment the past reaches forward and taps you on the shoulder"
    citations: [S01, S02, S16]
    key_figures:
      - name: "Donald Johanson"
        role: "Discoverer of AL 288-1"
        quote: "I looked down and saw a piece of bone on the surface... I knew at once it was a hominid."
      - name: "Tom Gray"
        role: "Graduate student, co-discoverer"
      - name: "Maurice Taieb"
        role: "French geologist who identified Hadar"
    content_beats:
      - "The International Afar Research Expedition"
      - "Locality 288 — the walk that changed paleoanthropology"
      - "The identification: arm bone fragment, then more, then more"
      - "'Lucy in the Sky with Diamonds' playing at camp"
      - "Dinkinesh: 'you are marvellous' in Amharic"
      - "Three weeks of excavation recovering 47 elements"
    photography:
      - "Archival expedition photographs"
      - "Hadar excavation site"
    emotional_beat: "Wonder and disbelief — the improbability of finding 40% of a 3.2-million-year-old individual"

  - id: 3
    title: "Forty Percent"
    subtitle: "What the bones reveal"
    era: "Anatomy I"
    word_count: "600-800"
    central_metaphor: "Reading a book with more than half the pages missing — and still understanding the story"
    citations: [S01, S03, S17]
    visualization:
      - id: D7
        name: "Skeletal Completeness"
        type: "Interactive SVG"
        tier: 3
        description: "Full-body silhouette. Click recovered bones to learn what each reveals. Guided tour mode. 40% illuminated, 60% faded."
    content_beats:
      - "Why 40% is extraordinary (typical hominin recovery is <5%)"
      - "Inventory: what survived and what's missing"
      - "Each element as a sentence in a longer argument"
      - "The pelvis as the Rosetta Stone of locomotion"
      - "Sex determination from pelvic morphology — Lucy was female"
      - "Age estimation from dental eruption and epiphyseal fusion"
      - "Body mass (~29 kg) and stature (~105 cm) estimates"
    photography:
      - "AL 288-1 full skeleton layout"
      - "Key elements in detail (pelvis, femur, mandible)"
    emotional_beat: "Intimacy — knowing a specific individual from 3.2 million years ago"

  - id: 4
    title: "Built to Walk"
    subtitle: "The anatomy of a revolution"
    era: "Anatomy II — Bipedalism"
    word_count: "800-1000"
    central_metaphor: "The body as argument — every bone testifying about how its owner moved"
    citations: [S06, S07, S17, S18, S19]
    key_figure:
      name: "C. Owen Lovejoy"
      role: "Kent State — reconstructed Lucy's pelvis, championed obligate bipedal model"
      quote: "The pelvis is the Rosetta Stone of locomotion."
    visualization:
      - id: D1
        name: "Anatomical Comparison"
        type: "Interactive SVG/D3"
        tier: 3
        description: "Toggle skeletal overlay: Lucy vs. human vs. chimpanzee. Highlight differences in pelvis, femur, spine, foot."
      - id: D10
        name: "Bipedalism Biomechanics"
        type: "Canvas/SVG Animation"
        tier: 3
        description: "Side-by-side animated gait cycles: chimp, Lucy, human. Force vectors, joint angles, center of gravity."
    scroll_lock:
      name: "The Walking Proof"
      duration: "800vh"
      choreography:
        - "0-20%: Pelvis comparison — chimp (tall/narrow) vs. Lucy (short/broad) vs. human"
        - "20-40%: Valgus knee angle animation — how angled knees enable efficient walking"
        - "40-60%: Lumbar lordosis — the spinal curve that keeps bipeds balanced"
        - "60-80%: Foot arch (Ward et al. 2011) — the spring mechanism for walking"
        - "80-100%: The gait animation plays — three figures walking side by side"
    content_beats:
      - "The pre-Lucy paradigm: brain-first ('cerebral Rubicon')"
      - "Pelvis morphology — broad iliac blades, short ischium, oriented gluteal muscles"
      - "The valgus knee angle — the geometric signature of bipedalism"
      - "Lumbar lordosis — spinal curvature for upright balance"
      - "Foot arches — the fourth metatarsal evidence (Ward et al. 2011)"
      - "Bipedalism preceded encephalization by at least 2 million years"
    photography:
      - "Pelvis comparison (Lucy / chimp / human)"
      - "Femur/knee angle comparison"
    emotional_beat: "Revelation — the bones prove something astonishing about the order of human evolution"

  - id: 5
    title: "Or Built to Climb?"
    subtitle: "The arboreal debate"
    era: "Anatomy III — Contested"
    word_count: "600-800"
    central_metaphor: "The same bones telling two different stories depending on who reads them"
    citations: [S05, S03, S20, S21]
    key_figures:
      - name: "Jack Stern & Randall Susman"
        role: "Stony Brook — arboreal/facultative bipedal hypothesis (1983)"
        quote: "The features we see in A. afarensis are not vestigial — they are functional."
    content_beats:
      - "Curved manual phalanges — grip morphology retained from arboreal ancestors or actively used?"
      - "Scapular morphology — cranially oriented glenoid fossa (like apes, unlike humans)"
      - "Green & Alemseged 2012: Selam's scapula supports significant climbing"
      - "Stern & Susman 'facultative bipedal' model"
      - "Lovejoy's rebuttal: these are vestigial retentions, not functional adaptations"
      - "DeSilva 2009: ankle morphology constrains but doesn't prevent climbing"
      - "The current consensus: bipedal on the ground, retained climbing capability, degree debated"
    photography:
      - "Hand/foot bone close-ups showing curvature"
      - "Scapula comparison photographs"
    emotional_beat: "Tension — honest scientific disagreement, unresolved for 40 years"

  - id: 6
    title: "The Pliocene World"
    subtitle: "3.2 million years ago"
    era: "Paleoecology"
    word_count: "700-900"
    central_metaphor: "Reconstructing a vanished world from chemical fingerprints and fossilized pollen"
    citations: [S10, S11, S12, S14, S15]
    visualization:
      - id: D2
        name: "Pliocene Climate Timeline"
        type: "D3 Layered Chart + Brush"
        tier: 3
        description: "Temperature, CO₂, vegetation index overlaid on 5-2 Ma timeline. Brushable zoom. Lucy's position marked."
    content_beats:
      - "Climate: mid-Pliocene warm period (~2-3°C warmer than today)"
      - "CO₂ at ~350-450 ppm — similar to modern levels"
      - "East African Rift System creating mosaic landscapes"
      - "Vegetation: gallery forest near rivers, grassland on interfluves"
      - "Faunal assemblage: sabertooth cats, crocodiles, hippos, bovids"
      - "Predation pressure — hominins were prey, not predators"
      - "Paleosol, pollen, and faunal proxy evidence"
      - "This was NOT the modern Afar Desert — it was a greener, wetter place"
    photography:
      - "Ethiopian landscape (modern Afar or analogous woodland-grassland)"
      - "Pliocene vegetation reconstruction art"
      - "Faunal reconstruction or museum diorama"
    emotional_beat: "Immersion — entering Lucy's world through scientific evidence, not speculation"

  - id: 7
    title: "What She Ate"
    subtitle: "Chemistry of survival"
    era: "Diet"
    word_count: "500-700"
    central_metaphor: "Teeth as chemical archives — every meal recorded in enamel"
    citations: [S10, S22, S03]
    visualization:
      - id: D4
        name: "Dietary Analysis"
        type: "D3 Scatter + Voronoi Hover"
        tier: 3
        description: "δ13C vs. δ18O isotope ratios across species. Convex hulls show niche separation."
    content_beats:
      - "Dental morphology: large molars, moderate enamel thickness"
      - "Stable isotope analysis: δ13C ratios show mixed C3/C4 diet"
      - "C3 = forest foods (fruits, leaves), C4 = grasses and sedges"
      - "The generalist-feeder hypothesis — A. afarensis ate broadly"
      - "Contrast with Paranthropus — extreme C4 specialization"
      - "Dental microwear patterns suggest varied food textures"
      - "What body proportions suggest about foraging range"
    photography:
      - "Lucy's teeth / dental arcade"
      - "Dental microwear microscopy"
    emotional_beat: "Precision — extracting surprisingly specific information from ancient teeth"

  - id: 8
    title: "Among Her Kind"
    subtitle: "Society without language"
    era: "Social structure"
    word_count: "600-800"
    central_metaphor: "The skeleton as social document — dimorphism writing power dynamics into bone"
    citations: [S03, S23, S17]
    visualization:
      - id: D5
        name: "Body Size Dimorphism"
        type: "Recharts Grouped Bar"
        tier: 2
        description: "Male/female height and mass across species. Silhouette scale figures."
    content_beats:
      - "Extreme sexual dimorphism: males ~151 cm, females ~105 cm"
      - "What dimorphism implies: multi-male polygyny vs. pair bonding"
      - "The dimorphism debate (Reno et al. vs. Plavcan et al.)"
      - "The First Family (AL 333): 13+ individuals died together"
      - "What a catastrophic assemblage reveals about group composition"
      - "Predator avoidance: group vigilance, sleeping sites"
      - "Sleeping in trees? On the ground? The debate continues"
    photography:
      - "First Family specimens"
      - "AL 444-2 (large male cranium) alongside Lucy"
    emotional_beat: "Connection — these were social beings, living and dying together"

  - id: 9
    title: "The Fall"
    subtitle: "How Lucy died"
    era: "Taphonomy"
    word_count: "600-800"
    central_metaphor: "3.2 million years of silence — and the bones still bear witness"
    citations: [S04]
    key_figure:
      name: "John Kappelman"
      role: "UT Austin — CT scan analysis, tree-fall death hypothesis (2016)"
    visualization:
      - id: D9
        name: "Cause of Death Evidence"
        type: "Interactive SVG"
        tier: 3
        description: "Clickable fracture sites on skeleton. Each reveals bone, pattern, interpretation, counter-argument. Toggle between hypotheses."
    content_beats:
      - "Kappelman et al. 2016: CT scans reveal perimortem fractures"
      - "Nine fracture sites — bilateral humeri, radius, femoral neck, vertebra, pelvis, scapula, ribs, sacrum"
      - "The tree-fall interpretation: pattern consistent with vertical deceleration"
      - "Clinical parallels: these fractures match modern fall-from-height cases"
      - "Tim White's rebuttal: 'show me the gazelles that fell from trees'"
      - "Taphonomic alternative: 3.2 million years of sediment compression"
      - "The core debate: pattern vs. individual explanation"
      - "Why we may never know definitively"
    photography:
      - "CT scan images of fracture sites"
      - "Specimen photographs of affected bones"
    emotional_beat: "Mystery and humility — the limits of what fossils can tell us"

  - id: 10
    title: "Her Contemporaries"
    subtitle: "A crowded family tree"
    era: "Comparative"
    word_count: "800-1000"
    central_metaphor: "Lucy was never alone — her epoch was a laboratory of evolutionary experiments"
    citations: [S08, S09, S24, S03]
    visualization:
      - id: D6
        name: "Contemporary Species Map"
        type: "D3-Geo Animated Map"
        tier: 3
        description: "Time-slider (4.0-2.0 Ma) showing species ranges across Africa. Play/pause auto-animation."
      - id: D12
        name: "Species Trait Radar"
        type: "D3 Radar Chart"
        tier: 3
        description: "6-axis comparison across species. Toggle to build custom comparisons."
    content_beats:
      - "A. africanus — the South African counterpart, Taung Child (1924)"
      - "K. platyops — the flat-faced contemporary, White vs. Leakey debate"
      - "A. deyiremeda — announced 2015, just 35 km from Hadar"
      - "A. garhi — possible tool-maker, Homo ancestor candidate"
      - "P. aethiopicus — the Black Skull, dawn of the robust lineage"
      - "Selam (DIK-1-1) — an infant A. afarensis, 'Lucy's baby'"
      - "Laetoli footprint makers — 3.66 Ma, A. afarensis or another species?"
      - "The implication: multiple hominin species coexisted in East Africa"
    photography:
      - "Taung Child skull"
      - "Black Skull (KNM-WT 17000)"
      - "Selam (DIK-1-1) skull"
    emotional_beat: "Perspective — Lucy was one of many experiments; most failed"

  - id: 11
    title: "Where She Sits"
    subtitle: "The phylogenetic question"
    era: "Systematics"
    word_count: "600-800"
    central_metaphor: "Drawing a family tree when half the family is missing"
    citations: [S01, S03, S09, S12]
    visualization:
      - id: D8
        name: "Phylogenetic Position"
        type: "D3 Interactive Cladogram"
        tier: 3
        description: "Three competing phylogenies toggled with animated transitions. Stem-species, side-branch, and bush models."
    content_beats:
      - "The stem-species hypothesis: A. afarensis as last common ancestor"
      - "The side-branch model: A. afarensis as cousin, not grandmother"
      - "The bush model: too many contemporaries to identify a single stem"
      - "How A. deyiremeda and K. platyops complicate the picture"
      - "The lumper/splitter debate in paleoanthropology"
      - "Vrba's turnover pulse: climate driving the diversification"
      - "Current consensus: probably near the base, but which branch is uncertain"
    photography:
      - "Comparative cranial photographs across species"
    emotional_beat: "Intellectual honesty — science as ongoing conversation, not settled doctrine"

  - id: 12
    title: "Dinkinesh"
    subtitle: "'You are marvellous'"
    era: "Legacy"
    word_count: "500-700"
    central_metaphor: "A 3.2-million-year-old individual who became a symbol for an entire species — and an entire nation"
    citations: [S02]
    content_beats:
      - "Lucy's impact on paleoanthropology — bipedalism-before-brains paradigm"
      - "The naming: Lucy vs. Dinkinesh — Western pop culture vs. Ethiopian identity"
      - "Lucy as Ethiopian national symbol — postage stamps, national pride"
      - "The 2007-2013 US exhibition tour controversy"
      - "Fossil repatriation and Ethiopian scientific sovereignty"
      - "Berhane Asfaw and the fight for Ethiopian-led research"
      - "Lucy in popular culture: children's books, documentaries, museum exhibitions"
      - "What one skeleton can teach us about the scientific process itself"
    photography:
      - "Ethiopian National Museum — Lucy display"
      - "US exhibition tour photographs"
      - "Ethiopian heritage / cultural context"
    emotional_beat: "Reverence — 50 years later, she is still teaching us"
```

---

## Layer 5: Design System

```yaml
design_philosophy: >
  The visual identity emerits from Lucy's material world: Ethiopian earth, fossilized bone,
  geological strata, the Afar Depression. The essay should feel like entering a world-class
  natural history museum's most intimate gallery — dramatic lighting on a single specimen,
  the sense that you are standing before something profoundly old and profoundly significant.
  
  As a cluster essay, it inherits the broader visual language of Seven Million Years
  (Stratum Dark, Bone Ivory, Ochre Red) but develops its own voice — warmer, more focused
  on Ethiopian geology specifically, with a tighter palette reflecting the narrower scope.

color_palette:
  - name: "Hadar Dark"
    hex: "#1C1610"
    role: "Primary background — volcanic basalt meets deep sediment"
  - name: "Bone Ivory"
    hex: "#E8DCC8"
    role: "Primary text, inherited from parent essay"
  - name: "Lucy Amber"
    hex: "#C4893A"
    role: "Primary accent — the specific warm amber of mineralized bone"
  - name: "Afar Sienna"
    hex: "#9B6B3C"
    role: "Secondary accent — Hadar sediment tones"
  - name: "Ochre Red"
    hex: "#C4572A"
    role: "Warning/emphasis accent — inherited from parent"
  - name: "Rift Grey-Green"
    hex: "#6B7A65"
    role: "Paleoecology sections — Pliocene vegetation undertone"
  - name: "Tuff Grey"
    hex: "#8A8477"
    role: "Secondary text, captions, data labels"
  - name: "Strata Band"
    hex: "#3D3028"
    role: "Elevated background, card surfaces, section dividers"

typography:
  display: "Serif (e.g., Freight Display, Source Serif) — editorial authority"
  body: "Serif — long-form reading comfort, scientific gravitas"
  data: "Sans-serif (e.g., Inter, IBM Plex Sans) — clean chart labels"
  mono: "Monospace — specimen IDs (AL 288-1), dates, measurements"
  quotes: "Serif italic — researcher quotes distinguished from body text"

photography_treatment:
  specimens: "Museum-lit on dark backgrounds (#1C1610). High contrast. No busy backgrounds."
  landscapes: "Full-bleed, warm-desaturated. The Afar palette — earth tones, not oversaturated."
  comparisons: "Clinical, white or neutral background for anatomical side-by-sides."
  archival: "Preserved as-is with slight warm grade to match overall palette."

animation_direction:
  philosophy: "Purposeful anatomical revelation — every animation teaches"
  scroll_lock: "Four scroll-lock zones (hero, skeleton, biomechanics, species map)"
  transitions: "Smooth D3 transitions, 600-800ms duration, ease-out curves"
  gait_animation: "D10 biomechanics animation runs on requestAnimationFrame, synced to scroll in lock zone"
  guided_tours: "D7 and D10 include optional step-by-step guided modes"
  reduced_motion: "All animations respect prefers-reduced-motion; static fallback states"
  avoid: "No particle effects, no skeletal 'dancing', no gratuitous bone rotation"

chart_quality:
  standard: "Publication-quality — axes, labels, legends, source attribution on every chart"
  library: "D3 for interactive/geographic, Recharts for standard charts"
  responsive: "All charts adapt to mobile; complex interactives degrade to simplified views"
  accessibility: "Screen-reader data tables for all visualizations"
```

---

## Layer 6: Implementation Notes

```yaml
files:
  page: "src/app/essays/science/lucy/page.tsx"
  client: "src/app/essays/science/lucy/LucyClient.tsx"
  css: "src/app/essays/science/lucy/lucy.css"
  data_registration: "src/data/visualEssays.ts"
  images: "src/app/essays/science/lucy/images.ts"

components:
  wrapper: "ArtifactDetailWrapper (existing — import from @/components/ArtifactDetail)"
  progress_bar: "Custom stratigraphic column progress indicator"
  section_reveal: "IntersectionObserver-based section fade-in"
  anatomical_comparison: "D1 — separate component file (AnatomicalComparison.tsx)"
  climate_timeline: "D2 — separate component (PlioceneClimate.tsx)"
  site_map: "D3 — separate component (HadarMap.tsx)"
  dietary_chart: "D4 — separate component (DietaryAnalysis.tsx)"
  dimorphism_chart: "D5 — inline or separate based on complexity"
  species_map: "D6 — separate component (ContemporarySpeciesMap.tsx)"
  skeleton_explorer: "D7 — separate component (SkeletalCompleteness.tsx)"
  phylogenetic_tree: "D8 — separate component (PhylogeneticPosition.tsx)"
  fracture_explorer: "D9 — separate component (CauseOfDeath.tsx)"
  gait_animation: "D10 — separate component (BipedalismBiomechanics.tsx)"
  stratigraphic_column: "D11 — separate component (StratigraphicColumn.tsx)"
  species_radar: "D12 — separate component (SpeciesRadar.tsx)"

constraints:
  - "Inherits parent design language but develops own voice — no direct CSS copy"
  - "All 10 Tier 3 visualizations in separate component files (>80 line rule)"
  - "D3-geo with topojson for geographic visualizations (D3, D6)"
  - "requestAnimationFrame for gait animation (D10)"
  - "Responsive: all charts must work on mobile with graceful degradation"
  - "Accessibility: alt text on all images, data tables for charts, ARIA labels on interactives"
  - "Reduced motion: static fallbacks for all scroll-lock and animation zones"
  - "Lazy-load all visualization components below the fold"
  - "All dates and claims sourced to CITATIONS.md"
  - "Images through R2 pipeline (images.esy.com)"
  - "Beginner-intermediate vocabulary: define terms on first use in body text AND in viz tooltips"

visual_essays_entry:
  id: "lucy"
  title: "Lucy: Before the Genus Homo"
  subtitle: "The Fossil That Rewrote the Story of Walking Upright"
  description: "A comprehensive visual essay exploring the most famous fossil in human history — the 3.2-million-year-old skeleton that proved we walked before we thought. Featuring interactive anatomical comparisons, animated gait biomechanics, and the unresolved debates that still surround her."
  category: "Science"
  readTime: "40 min"
  href: "/essays/science/lucy"
  tags: ["paleoanthropology", "Lucy", "Australopithecus afarensis", "bipedalism", "human evolution", "fossil", "Ethiopia", "Pliocene"]
  visualStyle: "photorealistic"
  isNew: true
  clusterParent: "seven-million-years"

performance:
  target_lcp: "<2.5s"
  target_cls: "<0.1"
  heavy_components: "Lazy-load D1, D3, D6, D8, D10 (large D3/Canvas components)"
  image_format: "WebP with JPEG fallback"
  d3_bundle: "Import only needed modules (d3-geo, d3-scale, d3-interpolate, d3-shape)"
  component_splitting: "12 visualization components = significant JS; code-split aggressively"
```
