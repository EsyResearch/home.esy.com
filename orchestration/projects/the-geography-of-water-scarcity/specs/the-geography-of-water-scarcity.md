# Conceptual Essay Invocation Spec: The Geography of Water Scarcity

**Status**: ✅ APPROVED  
**Date**: February 8, 2026  
**Research Package**: `orchestration/projects/the-geography-of-water-scarcity/research/`  
**Mode**: Data Journalism (Conceptual Essay Orchestrator)

---

## Layer 1: Meta

```yaml
# Layer 1: Meta
title: "The Geography of Water Scarcity"
slug: "the-geography-of-water-scarcity"
type: data-journalism-essay
status: draft

# Core Thesis
thesis: "Water scarcity is not a natural disaster — it is a geographic, political, and infrastructural reality shaped by human decisions, and its trajectory is accelerating in predictable, preventable ways."

# Target Audience
audience:
  level: "general"
  profile: "Intellectually curious adult — Atlantic / Aeon reader level"
  assumed_knowledge:
    - "Basic geography"
    - "Awareness that water is a finite resource"
    - "General understanding of climate change"
  learning_objectives:
    - "Recognize that water stress is a global phenomenon including wealthy nations"
    - "Understand the freshwater allocation system (agriculture 70%)"
    - "Explain why similar rainfall produces different water outcomes based on policy"
    - "Describe how population, agriculture, and climate interact to create deficit"
    - "Reframe water scarcity from natural fate to design problem"

# Scope Boundaries
scope:
  includes:
    - "Global water stress patterns and trends (2000-2040)"
    - "Freshwater allocation system (agriculture/industrial/domestic)"
    - "The scarcity equation (supply-demand interaction)"
    - "Policy comparison case studies (3 curated pairs)"
    - "Infrastructure investment as outcome lever"
    - "Climate change as accelerating factor"
  excludes:
    - "Desalination as comprehensive solution"
    - "Water chemistry or hydrological cycle science"
    - "Country-by-country exhaustive analysis"
    - "Geopolitical water conflict narratives"
    - "Specific policy recommendations"

# Read Time
estimated_read_time: "12-18 minutes"
visualization_count: 5
word_count: "1,500-2,500"
code_lines: "1,500+"
```

---

## Layer 2: Research Foundation

```yaml
# Layer 2: Research Foundation
research_package: "orchestration/projects/the-geography-of-water-scarcity/research/"

# Core Research Files (Conceptual Profile)
concepts_file: "CONCEPTS.md"
sequence_file: "SEQUENCE.md"
definitions_file: "DEFINITIONS.md"
analogies_file: "ANALOGIES.md"
misconceptions_file: "MISCONCEPTIONS.md"
claims_file: "CLAIMS.md"

# Data Journalism Extension Files
datasets_file: "DATASETS.md"
statistics_file: "STATISTICS.md"
comparisons_file: "COMPARISONS.md"
projections_file: "PROJECTIONS.md"

# Core Concepts (7 Total)
core_concepts:
  - concept: "Water Stress Index"
    definition: "The ratio of total freshwater withdrawals to available renewable supply"
    visual_representation: "Choropleth map — color encodes stress level"
    prerequisites: []

  - concept: "Freshwater Allocation System"
    definition: "Distribution of freshwater across agriculture (70%), industry (19%), domestic (11%)"
    visual_representation: "Sankey/alluvial flow diagram — width encodes proportion"
    prerequisites: ["Water Stress Index"]

  - concept: "The Scarcity Equation"
    definition: "Interaction between supply, demand drivers, and climate that produces deficit"
    visual_representation: "Scroll-locked progressive diagram — layers build"
    prerequisites: ["Water Stress Index", "Freshwater Allocation System"]

  - concept: "Infrastructure & Policy as Levers"
    definition: "Human systems that determine water capture, treatment, distribution, and reuse efficiency"
    visual_representation: "Country comparison widget — side-by-side metrics"
    prerequisites: ["The Scarcity Equation"]

  - concept: "Water Scarcity as Design Problem"
    definition: "Reframing scarcity from natural disaster to engineering/governance challenge"
    visual_representation: "Prose-driven synthesis — no single visualization"
    prerequisites: ["All above"]

  - concept: "Geographic Distribution of Stress"
    definition: "Spatial pattern of water stress globally and its change over time"
    visual_representation: "Choropleth with time scrubber"
    prerequisites: ["Water Stress Index"]

  - concept: "Demand-Supply Gap Trajectory"
    definition: "Projected widening between demand and sustainable supply"
    visual_representation: "Time dimension on choropleth + prose"
    prerequisites: ["The Scarcity Equation"]

# Primary Analogy
primary_analogy:
  comparison: "Water scarcity is like a household budget crisis — not that money doesn't exist, but spending exceeds income"
  mapping:
    - "Available freshwater → Monthly income"
    - "Agricultural demand → The biggest expense (70%)"
    - "Groundwater depletion → Running up debt"
    - "Climate change → Income getting cut"
    - "Infrastructure investment → Financial planning"
  limitations:
    - "Money is fungible; water has geographic constraints"
    - "Water quality matters in ways money doesn't"
    - "Can oversimplify ecological dimensions"
  source: "ANALOGIES.md#primary"

# Key Misconceptions
misconceptions:
  - misconception: "Water scarcity only affects poor, dry countries"
    address_in: "Section 2 (Choropleth Map)"
    method: "visual evidence"

  - misconception: "The Earth is running out of water"
    address_in: "Section 4 (Scarcity Equation)"
    method: "framing correction"

  - misconception: "Desalination can solve water scarcity"
    address_in: "Section 5 (Country Comparison)"
    method: "contextual annotation"

  - misconception: "Climate change is the primary cause"
    address_in: "Section 4 (diagram layer ordering)"
    method: "visual sequencing"

  - misconception: "Saving water at home would fix this"
    address_in: "Section 3 (Sankey Diagram)"
    method: "visual proportion"

# Claim Tier Distribution
claim_tier_distribution:
  tier_1: "83%"  # 10 of 12 claims
  tier_2: "17%"  # 2 of 12 claims
  tier_3: "0%"
```

---

## Layer 3: Section Architecture

```yaml
# Layer 3: Section Architecture
# Follows SEQUENCE.md learning progression + emotional arc

sections:
  - section: 1
    title: "The Number You Didn't Expect"
    emotional_target: "Disorientation"
    purpose: "Shatter the assumption that water scarcity is a distant, developing-world problem"
    introduces:
      - "Water stress index (basic)"
      - "Global scope of scarcity"
    assumes:
      - "Reader thinks scarcity = distant problem"
    prepares_for:
      - "Choropleth map exploration (where is stress?)"
    visualization: "data-ticker"
    prose_length: "medium"
    cognitive_load: "low"
    key_sentence: "2.3 billion people live in water-stressed countries — and some of those countries are among the wealthiest on Earth."

  - section: 2
    title: "Water Stress by Region"
    emotional_target: "Expansion (grasping scale)"
    purpose: "Map the global footprint of water stress and show its trajectory"
    introduces:
      - "Geographic distribution of stress"
      - "Time dimension (2000-2040)"
      - "Water stress categories"
    assumes:
      - "Reader is primed by Section 1 disorientation"
    prepares_for:
      - "Understanding WHY these regions are stressed"
    visualization: "choropleth-map"
    prose_length: "medium"
    cognitive_load: "medium"
    addresses_misconception: "Only affects poor/dry countries"
    key_sentence: "The map might surprise you. Water stress doesn't follow the equator — it follows demand."

  - section: 3
    title: "Where Freshwater Goes"
    emotional_target: "Understanding (mechanism begins)"
    purpose: "Reveal the freshwater allocation system — agriculture's dominance"
    introduces:
      - "Freshwater allocation system"
      - "Agricultural dominance (~70%)"
      - "Sector subdivisions"
    assumes:
      - "Reader understands WHERE stress exists"
    prepares_for:
      - "The scarcity equation (how demand creates deficit)"
    visualization: "flow-diagram"
    prose_length: "medium"
    cognitive_load: "medium"
    addresses_misconception: "Saving water at home would fix this"
    key_sentence: "A single kilogram of beef requires approximately 15,400 liters of water. The faucet in your kitchen is a rounding error."

  - section: 4
    title: "The Scarcity Equation"
    emotional_target: "Understanding + Urgency"
    purpose: "Show HOW scarcity emerges — supply, demand, climate interaction"
    introduces:
      - "The scarcity equation"
      - "Demand drivers (population, agriculture, industry)"
      - "Climate as accelerant"
      - "Demand-supply gap trajectory"
    assumes:
      - "Reader understands allocation and geographic patterns"
    prepares_for:
      - "Understanding that policy choices matter"
    visualization: "scroll-explainer"
    prose_length: "long"
    cognitive_load: "high"
    addresses_misconception:
      - "Running out of water"
      - "Climate change is the primary cause"
    key_sentence: "Earth has the same water it had a billion years ago. The problem isn't quantity — it's that demand is outpacing the rate at which freshwater is renewed."

  - section: 5
    title: "Same Rain, Different Outcomes"
    emotional_target: "Agency (hope through comparison)"
    purpose: "Prove that policy and infrastructure choices produce different outcomes"
    introduces:
      - "Infrastructure & policy as levers"
      - "Country comparison data"
    assumes:
      - "Reader understands the scarcity equation"
    prepares_for:
      - "Final reframing (design problem)"
    visualization: "comparison-widget"
    prose_length: "medium"
    cognitive_load: "medium"
    addresses_misconception: "Desalination solves it"
    key_sentence: "Israel and Jordan share nearly identical rainfall. Israel recycles 85% of its wastewater. Jordan recycles 10%. This is not geography — it is governance."

  - section: 6
    title: "A Design Problem, Not a Fate"
    emotional_target: "Reframing"
    purpose: "Complete the thesis — scarcity is a solvable design challenge"
    introduces:
      - "Water scarcity as design problem"
    assumes:
      - "All previous concepts — reader has full picture"
    prepares_for:
      - "Reader's own reflection"
    visualization: "none (prose-only, possible choropleth callback)"
    prose_length: "medium"
    cognitive_load: "low"
    key_sentence: "Water scarcity is not a sentence handed down by geography. It is a design problem — with levers, blueprints, and proof that better outcomes are possible."

# Section Flow
flow:
  hook: "Disorienting statistic that challenges assumption"
  build: "Map → allocation → equation (increasing complexity)"
  climax: "Section 4 — the scarcity equation scroll-lock (highest cognitive load)"
  turn: "Section 5 — agency via comparison (complexity drops, hope rises)"
  resolution: "Section 6 — reframing as design problem"

# Emotional Arc
emotional_arc:
  - section: 1
    emotion: "Disorientation"
    intensity: "medium"
  - section: 2
    emotion: "Expansion / awe at scale"
    intensity: "high"
  - section: 3
    emotion: "Understanding / revelation"
    intensity: "medium-high"
  - section: 4
    emotion: "Urgency / concern"
    intensity: "high (peak)"
  - section: 5
    emotion: "Hope / agency"
    intensity: "high"
  - section: 6
    emotion: "Resolution / empowerment"
    intensity: "medium"

# Cognitive Load Map
cognitive_load:
  - section: 1
    new_concepts: 1
    complexity: low
    fatigue_risk: low
  - section: 2
    new_concepts: 2
    complexity: medium
    fatigue_risk: low
    mitigation: "Interactive — reader explores at own pace"
  - section: 3
    new_concepts: 2
    complexity: medium
    fatigue_risk: medium
    mitigation: "Scroll-triggered build keeps focus"
  - section: 4
    new_concepts: 3
    complexity: high
    fatigue_risk: high
    mitigation: "Screen locks — guided journey, one layer at a time"
  - section: 5
    new_concepts: 2
    complexity: medium
    fatigue_risk: medium
    mitigation: "Interactive — reader chooses comparisons"
  - section: 6
    new_concepts: 1
    complexity: low
    fatigue_risk: low
    mitigation: "Synthesis only — no new data"
```

---

## Layer 4: Diagram Specifications

> This essay uses **Layer 4b (Data Journalism Mode)** exclusively. Instead of conceptual SVG diagrams, all visuals are programmatic data visualizations encoding real data from the research package.

---

## Layer 4b: Data Visualization Specifications

```yaml
# Layer 4b: Data Visualization Specifications
# (Data Journalism Mode)

data_sources:
  datasets: "DATASETS.md"
  statistics: "STATISTICS.md"
  comparisons: "COMPARISONS.md"
  projections: "PROJECTIONS.md"

data_visualizations:

  # ─── VISUAL 1: INTERACTIVE CHOROPLETH MAP ─────────────────────────
  - name: "Water Stress by Region"
    type: choropleth_map
    section: 2
    purpose: "Show the global footprint of water stress and reveal that it touches wealthy nations, not just developing ones. Time scrubber shows trajectory."
    data_source: "DATASETS.md#wri-aqueduct"

    geography:
      scope: world
      projection: geoNaturalEarth1  # Good balance of area preservation and aesthetics
      topology: world-110m  # Simplified for performance; embed in .jsx
      simplification: "110m resolution — sufficient for country-level choropleth"

    encoding:
      variable: "bws_cat"  # Baseline water stress category
      scale_type: sequential
      color_scale:
        type: "custom-5-class"
        classes:
          - label: "Low (<10%)"
            color: "#1a5276"  # Deep blue-teal
          - label: "Low-Medium (10-20%)"
            color: "#2980b9"  # Medium blue
          - label: "Medium-High (20-40%)"
            color: "#f39c12"  # Amber warning
          - label: "High (40-80%)"
            color: "#e74c3c"  # Red
          - label: "Extremely High (>80%)"
            color: "#7b241c"  # Deep red
        no_data: "#1a1a2e"  # Near-background
      legend:
        type: discrete
        position: "bottom-left"
        labels: ["Low", "Low-Med", "Med-High", "High", "Extreme"]

    time_dimension:
      enabled: true
      steps: [2000, 2010, 2020, 2030, 2040]
      driver: "slider"  # Slider below map; optionally scroll-linked
      default_year: 2020
      interpolation: step  # Discrete steps, not smooth blending
      projection_boundary_year: 2020
      projection_visual_treatment:
        label: "PROJECTED"
        border_style: "dashed"
        opacity_reduction: 0.85
        year_indicator: "Projected data (WRI Aqueduct SSP2-RCP4.5)"

    interaction:
      hover: true
      hover_content:
        - "field: Country Name"
        - "field: Stress Category (with color indicator)"
        - "field: Population Affected (millions)"
        - "field: Primary Driver (agriculture / population / climate)"
      touch_target: "44px minimum"
      click_behavior: none
      mobile_interaction: "tap to show tooltip, tap elsewhere to dismiss"

    animation:
      scroll_locked: false  # Free-standing interactive element
      year_transition_duration: "400ms"
      year_transition_easing: "ease-in-out"
      entrance_animation: "fade-in on intersection"
      pattern_reference: "scroll-lock-patterns.md#18-the-map-journey"

    accessibility:
      alt_text: "Interactive world map showing water stress levels by country from 2000 to 2040. Countries are colored from blue (low stress) through amber (medium) to deep red (extreme stress). A time slider allows viewing changes over time. Projected data from 2020 onward is marked."
      data_table_fallback: true
      colorblind_safe: true  # Blue-amber-red is safe for most color vision deficiencies
      reduced_motion: "Show 2020 static view, no transitions"

  # ─── VISUAL 2: ANIMATED PROPORTIONAL FLOW DIAGRAM ─────────────────
  - name: "Where Freshwater Goes"
    type: flow_diagram
    section: 3
    purpose: "Show that agriculture overwhelmingly dominates freshwater use. The visual must make agriculture's 70% share viscerally obvious."
    data_source: "STATISTICS.md#agriculture-allocation"

    flows:
      source_node:
        name: "Global Freshwater Withdrawals"
        label: "~3,900 km³/year"
        color_token: "--accent-blue"

      primary_targets:
        - name: "Agriculture"
          value: 70
          unit: "%"
          color_token: "--accent-green"
          emphasis: "dominant"  # MUST be visually overwhelming
          subdivisions:
            - name: "Irrigation"
              value: 85  # % of agricultural water
            - name: "Livestock"
              value: 10
            - name: "Aquaculture"
              value: 5

        - name: "Industry"
          value: 19
          unit: "%"
          color_token: "--accent-amber"
          subdivisions:
            - name: "Manufacturing"
              value: 50
            - name: "Energy (cooling)"
              value: 40
            - name: "Mining"
              value: 10

        - name: "Domestic"
          value: 11
          unit: "%"
          color_token: "--accent-teal"
          subdivisions:
            - name: "Household"
              value: 65
            - name: "Municipal"
              value: 35

    encoding:
      width_encoding: "proportional to percentage"
      flow_direction: "left-to-right"
      flow_animation: "particle"  # Water particles flowing through streams
      dominant_emphasis: "Agriculture stream must be 6-7x wider than industry"

    animation:
      scroll_locked: true
      scroll_depth: "800px"
      progressive_build: true
      build_sequence:
        - at: "0-15%"
          show: "Source node (Global Freshwater) appears"
          action: "fade-in"
        - at: "15-35%"
          show: "Agriculture stream animates — wide, dominant"
          action: "draw from source, particles begin flowing"
        - at: "35-55%"
          show: "Industry stream animates — noticeably thinner"
          action: "draw, particles"
        - at: "55-70%"
          show: "Domestic stream animates — thinnest"
          action: "draw, particles"
        - at: "70-85%"
          show: "Subdivisions expand from each stream"
          action: "branch and label"
        - at: "85-100%"
          show: "Labels, values, complete state"
          action: "final annotations appear"
      pattern_reference: "scroll-lock-patterns.md#19-the-data-build"

    accessibility:
      alt_text: "Flow diagram showing global freshwater withdrawals of approximately 3,900 cubic kilometers per year. Agriculture receives 70% (split into irrigation 85%, livestock 10%, aquaculture 5%), Industry receives 19% (manufacturing 50%, energy 40%, mining 10%), and Domestic use receives 11% (household 65%, municipal 35%)."
      data_table_fallback: true
      reduced_motion: "Show complete diagram immediately"

  # ─── VISUAL 3: COUNTRY COMPARISON WIDGET ──────────────────────────
  - name: "Same Rain, Different Outcomes"
    type: comparison_widget
    section: 5
    purpose: "Prove that policy and infrastructure choices — not geography — determine water outcomes"
    data_source: "COMPARISONS.md"

    entities:
      selectable: true
      selection_ui: "button-group"  # Prominent selection, not hidden dropdown
      default_pair:
        entity_a: "Israel"
        entity_b: "Jordan"
      curated_pairs:
        - entity_a: "Israel"
          entity_b: "Jordan"
          insight: "Geographic neighbors, similar aridity — Israel recycles 85%, Jordan 10%"
        - entity_a: "Singapore"
          entity_b: "Malaysia"
          insight: "Both wet — Singapore is water-secure, Malaysia loses 37% to leakage"
        - entity_a: "Australia"
          entity_b: "South Africa"
          insight: "Similar climate stress — Australia invested post-drought, SA's response delayed"

    metrics:
      - name: "Annual Rainfall"
        unit: "mm/year"
        display: "bar"
        normalization: "raw"
        note: "Similar starting conditions"
      - name: "Water Stress Index"
        unit: "WRI 0-5 scale"
        display: "bar"
        normalization: "raw"
      - name: "Wastewater Recycled"
        unit: "%"
        display: "bar"
        normalization: "raw"
        highlight: true  # Key differentiator
      - name: "Renewable Freshwater Per Capita"
        unit: "m³/year"
        display: "number"
        normalization: "per capita"
      - name: "Population"
        unit: "millions"
        display: "number"
        normalization: "raw"
      - name: "GDP Per Capita"
        unit: "USD"
        display: "number"
        normalization: "raw"
        note: "Context for investment capacity"

    layout: "side-by-side"

    annotation:
      contextual: true
      annotation_source: "COMPARISONS.md#contextual-annotations"
      placement: "below"
      content: "Brief explanation of WHY the difference exists — not just THAT it exists"

    animation:
      metric_entrance: "grow"  # Bars grow to fill
      metric_duration: "600ms"
      selection_transition: "300ms ease-out"
      stagger_delay: "100ms between metrics"

    accessibility:
      alt_text: "Interactive comparison widget allowing selection of two countries. Default view shows Israel versus Jordan. Both have similar rainfall, but Israel recycles 85% of wastewater versus Jordan's 10%. Six metrics are compared side by side with contextual annotations explaining the differences."
      keyboard_navigable: true
      screen_reader_announces_selection: true
      reduced_motion: "Show final metric values immediately"

  # ─── VISUAL 4: SCROLL-LOCKED EXPLAINER SEQUENCE ──────────────────
  - name: "The Scarcity Equation"
    type: scroll_explainer
    section: 4
    purpose: "Build the reader's understanding of how scarcity emerges — each scroll step adds a layer of demand or reduction until deficit appears"
    data_source: "STATISTICS.md + PROJECTIONS.md"

    stages:
      - stage: 1
        title: "Available Freshwater"
        visual_layer: "Base resource graphic — blue reservoir/pool representing available freshwater supply"
        annotation: "Earth has vast water reserves, but only 2.5% is freshwater — and less than 1% is accessible. This blue represents the renewable freshwater available to a region each year."
        data_values:
          - "2.5% of Earth's water is freshwater"
          - "~1% is accessible surface freshwater"

      - stage: 2
        title: "Population Demand"
        visual_layer: "Overlay — human figures or demand indicator drawing from the reservoir, reducing water level"
        annotation: "8 billion people need water to drink, cook, and clean. Population growth adds 80 million people per year. Each person needs a minimum of 50 liters per day for basic needs."
        data_values:
          - "8 billion global population"
          - "50 L/day minimum per person"

      - stage: 3
        title: "Agricultural Draw"
        visual_layer: "Major overlay — massive agricultural demand indicator (largest draw). The reservoir drops dramatically."
        annotation: "Agriculture takes 70% of all freshwater withdrawals. A single kilogram of beef requires 15,400 liters. This is the largest draw on the system by far — and it's growing as the world eats more meat and dairy."
        data_values:
          - "70% of freshwater → agriculture"
          - "15,400 L per kg of beef"

      - stage: 4
        title: "Climate Reduction"
        visual_layer: "The supply side shrinks — the reservoir's input (precipitation/inflow) visually reduces. Shifting patterns, glacier retreat."
        annotation: "Climate change isn't just a future threat — it's already reducing water availability in dry regions by shifting precipitation patterns and accelerating evaporation. Each degree of warming could reduce renewable water by 20% in already-stressed areas."
        data_values:
          - "~20% reduction per °C in dry regions (IPCC)"

      - stage: 5
        title: "The Deficit"
        visual_layer: "Final state — demand lines exceed supply. Gap is highlighted in accent color. The reservoir is nearly empty."
        annotation: "When demand exceeds what nature can renew, the result is deficit. By 2030, under business-as-usual, global demand could exceed sustainable supply by 40%. This is not a prediction of doom — it's a measurement of a trajectory that policy can change."
        data_values:
          - "40% demand-supply gap by 2030 (BAU)"

    animation:
      scroll_locked: true
      scroll_depth: "1200px"  # 5 stages × ~240px each
      stage_transition: "ease-in-out 400ms"
      layer_entrance: "grow"  # Layers grow/fill rather than abruptly appear
      progress_indicator: "dot-based stage indicator"
      pattern_reference: "scroll-lock-patterns.md#19-the-data-build"

    accessibility:
      alt_text: "Progressive diagram showing how water scarcity emerges. Stage 1: Available freshwater supply. Stage 2: Population demand draws from supply. Stage 3: Agriculture takes 70% — the largest draw. Stage 4: Climate change reduces the supply side. Stage 5: Demand exceeds supply, creating a deficit projected at 40% by 2030."
      stage_announcements: true
      reduced_motion: "Show all 5 layers simultaneously with numbered labels"

  # ─── VISUAL 5: REACTIVE DATA TICKER ───────────────────────────────
  - name: "By The Numbers"
    type: data_ticker
    section: 1
    purpose: "Anchor key statistics at the opening — land with maximum impact before the reader has context"
    data_source: "STATISTICS.md"

    statistics:
      - value: 2300000000
        label: "people live in water-stressed countries"
        source: "STATISTICS.md#statistic-1"
        format: "integer"
        display_value: "2.3 billion"
        suffix: ""
      - value: 70
        label: "of freshwater goes to agriculture"
        source: "STATISTICS.md#statistic-2"
        format: "integer"
        suffix: "%"
      - value: 40
        label: "projected demand-supply gap by 2030"
        source: "STATISTICS.md#statistic-3"
        format: "integer"
        suffix: "%"
        projection_flag: true
      - value: 85
        label: "of wastewater recycled by Israel"
        source: "STATISTICS.md#statistic-4"
        format: "integer"
        suffix: "%"

    layout: "horizontal-strip"
    placement: "section-1-opening"

    animation:
      trigger: "intersection-observer"
      count_up: true
      count_duration: "2000ms"
      count_easing: "ease-out"
      stagger_delay: "300ms between statistics"

    accessibility:
      alt_text: "Key statistics: 2.3 billion people live in water-stressed countries. 70% of freshwater goes to agriculture. 40% projected demand-supply gap by 2030. 85% of wastewater recycled by Israel."
      reduced_motion: "Show final values immediately"
```

---

## Layer 5: Content Specifications

```yaml
# Layer 5: Content Specifications
# In Data Journalism mode, prose WEAVES BETWEEN visualizations
# Prose does what visuals cannot: context, human stories, the "so what"

content:
  - section: 1
    role: "hook"

    hook:
      type: "disorienting fact"
      text: "In 2018, Cape Town — a modern, wealthy city in a G20 nation — came within weeks of turning off its municipal water supply entirely."
      connects_to: "This isn't a distant problem"

    text_blocks:
      - block: "pre_ticker"
        purpose: "Establish disorientation"
        length: "2 paragraphs"
        key_points:
          - "Cape Town's Day Zero — vivid, concrete, recent"
          - "This happened in a wealthy city, not a remote village"
          - "Pivot: the numbers behind this story"

      - block: "post_ticker"
        purpose: "Bridge to map"
        length: "1-2 paragraphs"
        key_points:
          - "These are not isolated facts — they're symptoms of a system"
          - "To understand, we need to see the whole picture"
          - "Transition to choropleth"

    claims:
      - claim: "Cape Town nearly ran out of water in 2018"
        source: "CLAIMS.md#claim-10"
      - claim: "2.3 billion in water-stressed countries"
        source: "CLAIMS.md#claim-1"

    quotes: []  # Save quotes for later sections

    pull_quote: "2.3 billion people live in water-stressed countries — and some of those countries are among the wealthiest on Earth."

  - section: 2
    role: "expansion"

    text_blocks:
      - block: "pre_map"
        purpose: "Set up what the map will reveal"
        length: "2 paragraphs"
        key_points:
          - "Water stress follows demand, not just rainfall"
          - "Wealthy nations are not immune"
          - "The map will show you where"

      - block: "mid_map"
        purpose: "Guide the reader through the map"
        length: "2-3 paragraphs"
        key_points:
          - "Point out MENA region (6% population, 1% freshwater)"
          - "Point out surprising stress in US West, southern Europe, Australia"
          - "Invite reader to scrub time slider: watch 2000→2040"

      - block: "post_map"
        purpose: "Interpret what the time scrub revealed"
        length: "1 paragraph"
        key_points:
          - "Stress is migrating and intensifying"
          - "This isn't static — it's getting worse"
          - "Transition: WHY?"

    claims:
      - claim: "MENA: 6% of population, 1% of freshwater"
        source: "CLAIMS.md#claim-6"

    inline_citations:
      - "WRI Aqueduct, 2023"
      - "World Bank, 2018"

  - section: 3
    role: "mechanism_part_1"

    text_blocks:
      - block: "pre_sankey"
        purpose: "Introduce the allocation question"
        length: "2 paragraphs"
        key_points:
          - "Where does all the freshwater go?"
          - "The answer will restructure your intuition"

      - block: "post_sankey"
        purpose: "Make agriculture's share tangible"
        length: "2-3 paragraphs"
        key_points:
          - "A kilogram of beef = 15,400 liters"
          - "Agriculture isn't 'wasting' water — it's feeding the world"
          - "But the proportion means: household conservation is marginal"
          - "The biggest lever is agricultural efficiency"

    claims:
      - claim: "Agriculture ~70% of global withdrawals"
        source: "CLAIMS.md#claim-2"
      - claim: "15,400 liters per kg of beef"
        source: "CLAIMS.md#claim-9"

    addresses_misconception:
      misconception: "If people just used less water at home, it'd be fine"
      method: "visual proportion"
      text: "The Sankey diagram makes this impossible to miss: domestic use is a thin stream. The ocean is agriculture."

    inline_citations:
      - "FAO AQUASTAT"
      - "Mekonnen & Hoekstra, 2012"

  - section: 4
    role: "mechanism_part_2_plus_trajectory"

    text_blocks:
      - block: "pre_explainer"
        purpose: "Introduce the scarcity equation"
        length: "2 paragraphs"
        key_points:
          - "Earth isn't running out of water — it's a closed cycle"
          - "The problem is the RATE of demand vs. renewal"
          - "Let's build the equation step by step"

      - block: "between_stages"
        purpose: "Narrative glue between scroll-lock stages"
        length: "4-5 short annotation paragraphs (one per stage)"
        key_points:
          - "Stage 1: The starting reservoir"
          - "Stage 2: Population demand"
          - "Stage 3: Agricultural demand (the big one)"
          - "Stage 4: Climate shrinking supply"
          - "Stage 5: The resulting deficit"

      - block: "post_explainer"
        purpose: "Land the trajectory point"
        length: "2 paragraphs"
        key_points:
          - "By 2030, 40% gap under BAU"
          - "India: 600 million facing severe stress"
          - "Invisible scarcity — groundwater you can't see running out"
          - "But this trajectory is not fate — transition to Section 5"

    claims:
      - claim: "Only 2.5% freshwater"
        source: "CLAIMS.md#claim-5"
      - claim: "40% gap by 2030 (BAU)"
        source: "CLAIMS.md#claim-3"
      - claim: "600 million in India facing severe stress"
        source: "CLAIMS.md#claim-8"
      - claim: "Groundwater depletion in Punjab >20 km³/year"
        source: "CLAIMS.md#claim-11"

    addresses_misconception:
      - misconception: "Running out of water"
        method: "framing"
        text: "Earth has the same water it had a billion years ago."
      - misconception: "Climate is the cause"
        method: "visual sequencing"
        text: "Climate appears LAST in the scroll sequence — demand is the bigger driver"

    inline_citations:
      - "USGS"
      - "IPCC AR6"
      - "2030 Water Resources Group"
      - "NITI Aayog, 2018"

  - section: 5
    role: "agency"

    text_blocks:
      - block: "pre_comparison"
        purpose: "Set up the policy argument"
        length: "2 paragraphs"
        key_points:
          - "If scarcity were just geography, nothing could be done"
          - "But countries with similar conditions have wildly different outcomes"
          - "Select two countries below and see for yourself"

      - block: "post_comparison"
        purpose: "Explain WHY differences exist"
        length: "3-4 paragraphs"
        key_points:
          - "Israel: decades of investment, centralized water authority, 85% recycling"
          - "Singapore: existential threat drove 'Four National Taps' strategy"
          - "This isn't about being smarter — it's about sustained political will"
          - "Desalination alone isn't the answer — Israel succeeds because it's ONE tool among many"

    claims:
      - claim: "Israel recycles ~85% of wastewater"
        source: "CLAIMS.md#claim-4"
      - claim: "Singapore imports 40% from Malaysia"
        source: "CLAIMS.md#claim-7"
      - claim: "Jordan: <100 m³/capita/year"
        source: "CLAIMS.md#claim-12"

    quotes:
      - quote: "The water crisis is not about having too little water. It is a crisis of managing water so badly that billions of people — and the environment — suffer."
        attribution: "Peter Gleick, Pacific Institute"
        source: "CLAIMS.md#gleick-quote"
        placement: "Pull quote between comparison widget and explanation"

    inline_citations:
      - "Israel Water Authority"
      - "PUB Singapore"
      - "World Bank, 2018"

  - section: 6
    role: "reframing"

    text_blocks:
      - block: "closing"
        purpose: "Land the thesis with full emotional weight"
        length: "3-4 paragraphs"
        key_points:
          - "Restate thesis: scarcity is not a natural disaster"
          - "The evidence shows it's a design problem"
          - "Levers exist: recycling, efficiency, governance, investment"
          - "The trajectory is urgent but not inevitable"
          - "Close with agency: this is preventable"

    claims: []  # Synthesis — no new claims

    quotes:
      - quote: "We never really valued water as the foundation of life that it is."
        attribution: "Sandra Postel, Global Water Policy Project"
        source: "CLAIMS.md#postel-quote"
        placement: "Opening of closing section"

    pull_quote: "Water scarcity is not a sentence handed down by geography. It is a design problem — with levers, blueprints, and proof that better outcomes are possible."
```

---

## Layer 6: Technical Implementation

```yaml
# Layer 6: Technical Implementation

# File Structure
files:
  format: "Single .jsx file — self-contained React component with default export"
  page: "page.tsx"
  client: "GeographyOfWaterScarcityClient.jsx"
  path: "src/app/essays/visual/the-geography-of-water-scarcity/"

# Design Research Reference (TO BE COMPLETED IN G4)
design_research: "orchestration/projects/the-geography-of-water-scarcity/DESIGN-RESEARCH.md"

# Color Token Implementation (from prompt — to be validated in G4)
color_tokens:
  background: "#0a0a0f"    # Deep near-black
  text_primary: "#e8e4e0"  # Off-white
  text_secondary: "#a8a4a0"  # Muted off-white for secondary text
  accent_blue: "#2980b9"   # Water-evocative blue
  accent_teal: "#1abc9c"   # Teal for highlights
  accent_green: "#27ae60"  # Agriculture
  accent_amber: "#f39c12"  # Industry / warning
  accent_red: "#e74c3c"    # Extreme stress
  stress_low: "#1a5276"    # Choropleth: low stress
  stress_medium: "#2980b9" # Choropleth: medium stress
  stress_high: "#f39c12"   # Choropleth: high stress
  stress_extreme: "#7b241c" # Choropleth: extreme stress

# Typography (to be finalized in G4)
typography:
  display: "Source Serif Pro (or Literata)"  # Editorial serif
  body: "Source Serif Pro"  # Readable serif, 1.7-1.8 line-height
  data_labels: "Inter"  # Clear sans for chart annotations
  hierarchy:
    - "Display headings: ~40px, serif, bold"
    - "Section subheads: ~28px, serif, semibold"
    - "Body prose: ~18px, serif, normal, line-height 1.75"
    - "Caption text: ~14px, sans, normal"

# Allowed Libraries
libraries:
  - "React (hooks: useState, useEffect, useRef, useCallback, useMemo)"
  - "Tailwind CSS"
  - "D3 (d3-geo, d3-selection, d3-transition, d3-interpolate)"
  - "Recharts (if needed for simpler charts)"
  - "Lodash (throttle, debounce)"
  - "Lucide React (icons)"

# Animation Specs
animation:
  scroll_lock_enabled: true
  scroll_lock_sections:
    - "flow-diagram (800px)"
    - "scroll-explainer (1200px)"
  default_easing: "cubic-bezier(0.4, 0, 0.2, 1)"
  default_duration: "300ms"
  reduced_motion: "show final states, skip animation"
  gpu_accelerated: true  # Use transform/opacity only

# Scroll Detection
scroll:
  method: "IntersectionObserver"
  thresholds: [0, 0.1, 0.25, 0.5, 0.75, 1.0]
  root_margin: "0px"

# Data Embedding Strategy
data:
  all_data_embedded: true
  no_external_api: true
  estimated_data_size: "50-100KB JSON"
  data_sources:
    - "Simplified TopoJSON (world-110m): country boundaries"
    - "Country stress data: JSON array per time step"
    - "Allocation percentages: constants"
    - "Comparison metrics: structured object for 6 countries"
    - "Ticker statistics: constant array"

# Mobile Requirements
mobile:
  responsive: true
  min_width: "320px"
  breakpoints:
    mobile: "640px"
    tablet: "768px"
    desktop: "1024px"
  choropleth_mobile: "Smaller projection, tap instead of hover"
  sankey_mobile: "Vertical orientation if needed"
  comparison_mobile: "Stack instead of side-by-side"
  touch_targets: "44px minimum"
  font_scaling:
    body_mobile: "16px"
    body_desktop: "18px"

# Layout
layout:
  max_prose_width: "720px"  # Optimal reading measure
  visualization_width: "full viewport (with padding)"
  vertical_spacing: "generous — 80-120px between sections"
  content_centering: "centered with auto margins"

# SEO
seo:
  title: "The Geography of Water Scarcity | Esy"
  description: "An interactive visual essay exploring why water scarcity is not a natural disaster but a design problem shaped by human decisions. Featuring interactive maps, data visualizations, and in-depth analysis."
  keywords:
    - "water scarcity"
    - "water stress"
    - "water crisis"
    - "data visualization"
    - "interactive essay"
    - "water policy"
    - "agriculture water use"
    - "freshwater"

# Accessibility
accessibility:
  wcag_level: "AA"
  screen_reader_support: true
  keyboard_navigation: true
  reduced_motion_support: true
  color_independence: "Stress levels encoded by color AND label"
  data_table_fallbacks: true
  focus_indicators: true
  alt_text: "Required for all 5 visualizations"
  aria_labels: "All interactive elements"
  skip_navigation: "Skip to main content"

# Performance
performance:
  svg_optimization: true
  topology_simplification: "110m resolution"
  lazy_loading: "Visualizations below fold"
  debounced_scroll: "Scroll handlers throttled"
  requestAnimationFrame: "All animations use rAF"
```

---

## Research Package Reference

| File | Path |
|------|------|
| CONCEPTS.md | `orchestration/projects/the-geography-of-water-scarcity/research/CONCEPTS.md` |
| SEQUENCE.md | `orchestration/projects/the-geography-of-water-scarcity/research/SEQUENCE.md` |
| DEFINITIONS.md | `orchestration/projects/the-geography-of-water-scarcity/research/DEFINITIONS.md` |
| ANALOGIES.md | `orchestration/projects/the-geography-of-water-scarcity/research/ANALOGIES.md` |
| MISCONCEPTIONS.md | `orchestration/projects/the-geography-of-water-scarcity/research/MISCONCEPTIONS.md` |
| CLAIMS.md | `orchestration/projects/the-geography-of-water-scarcity/research/CLAIMS.md` |
| DATASETS.md | `orchestration/projects/the-geography-of-water-scarcity/research/DATASETS.md` |
| STATISTICS.md | `orchestration/projects/the-geography-of-water-scarcity/research/STATISTICS.md` |
| COMPARISONS.md | `orchestration/projects/the-geography-of-water-scarcity/research/COMPARISONS.md` |
| PROJECTIONS.md | `orchestration/projects/the-geography-of-water-scarcity/research/PROJECTIONS.md` |
| DESIGN-RESEARCH.md | `TBD — G4` |

---

## Spec Approval

**Gate 3 Status**: ✅ APPROVED

### Checklist

- [x] Core thesis clearly stated (Layer 1)
- [x] Target audience and learning objectives defined (Layer 1)
- [x] All 7 concepts from CONCEPTS.md represented (Layer 2)
- [x] Primary analogy with documented limitations (Layer 2)
- [x] All 5 misconceptions addressed per MISCONCEPTIONS.md (Layer 3)
- [x] 6 sections follow SEQUENCE.md learning progression (Layer 3)
- [x] Emotional arc mapped section-by-section (Layer 3)
- [x] Cognitive load managed per section (Layer 3)
- [x] All 5 data visualizations fully specified (Layer 4b)
- [x] Animation sequences defined with pattern references (Layer 4b)
- [x] Accessibility specs for all visualizations (Layer 4b)
- [x] Content blocks weave between visualizations (Layer 5)
- [x] All 12 claims traced to CLAIMS.md (Layer 5)
- [x] 6+ inline citations included (Layer 5)
- [x] Pull quotes at key moments (Layer 5)
- [x] Technical implementation outlined (Layer 6)
- [x] Mobile responsiveness specified (Layer 6)
- [x] Data embedding strategy defined (Layer 6)
- [x] Design Research marked as G4 dependency (Layer 6)

### Data Journalism Mode Checklist

- [x] DATASETS.md referenced for all data visualizations
- [x] STATISTICS.md referenced for all numeric claims
- [x] COMPARISONS.md referenced for comparison widget
- [x] PROJECTIONS.md referenced for time-series and projection labeling
- [x] Projection data clearly distinguished from historical data
- [x] All Tier distribution ≥85% Tier 1-2

### NOT Included (Correct)

- [ ] Claims not in CLAIMS.md — CORRECT (none added)
- [ ] Concepts without prerequisite coverage — CORRECT
- [ ] Visualizations without accessibility specs — CORRECT
- [ ] Speculation or unverified data — CORRECT
- [ ] Rainbow color scales — CORRECT (perceptually designed)

---

**Next Step**: Upon G3 approval, invoke Design Researcher (Pedagogical Lens) for G4.

---

*This spec was built using the Conceptual Essay Invocation Skill (Data Journalism Mode) and references the G2 research package (10 files). All content is grounded in verified research from Tier 1-2 sources; no speculation has been added.*
