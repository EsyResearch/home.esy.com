# Conceptual Essay Invocation Skill

> Created: February 2026

## Overview

This skill defines the **6-layer invocation specification** for conceptual/educational visual essays. Unlike visual essays that focus on historical figures and timelines, conceptual essays focus on explaining abstract concepts through diagrams and progressive visual reveals.

## When to Use This Skill

Use this invocation pattern when creating:
- Science explainers (neuroscience, physics, biology)
- Technical concept explanations
- Process visualizations
- Abstract idea explorations
- Educational content that teaches through diagrams

## Relationship to Visual Essay Invocation

| Visual Essay Invocation | Conceptual Essay Invocation |
|------------------------|----------------------------|
| Historical figures | Core concepts |
| Timeline of events | Learning sequence |
| Archival photography | SVG diagrams |
| Era treatments | Concept sections |
| Historical quotes | Expert quotes + claims |
| Photo sourcing | Diagram blueprints |

---

## 6-Layer Specification Architecture

### Layer 1: Meta (10%)

**Purpose**: Define the essay's identity and scope.

```yaml
# Layer 1: Meta
title: "[TOPIC]: [Core Question]"
slug: "[topic-slug]"
type: conceptual-essay
status: draft

# Core Thesis
thesis: "[One sentence that captures the central insight]"

# Target Audience
audience:
  level: "[beginner | intermediate | advanced]"
  assumed_knowledge:
    - "[What reader should already know]"
  learning_objectives:
    - "[What reader will understand after]"
    - "[What reader will be able to explain]"

# Scope Boundaries
scope:
  includes:
    - "[Concept 1]"
    - "[Concept 2]"
  excludes:
    - "[What we're NOT covering]"
    - "[Common tangent to avoid]"

# Read Time
estimated_read_time: "[X] minutes"
diagram_count: "[Expected number of major diagrams]"
```

---

### Layer 2: Research Foundation (15%)

**Purpose**: Reference the research package that grounds the spec.

```yaml
# Layer 2: Research Foundation
research_package: "[path]/research/"

# Core Research Files
concepts_file: "CONCEPTS.md"
sequence_file: "SEQUENCE.md"
definitions_file: "DEFINITIONS.md"
analogies_file: "ANALOGIES.md"
misconceptions_file: "MISCONCEPTIONS.md"
claims_file: "CLAIMS.md"

# Key Research Findings
core_concepts:
  - concept: "[Concept Name]"
    definition: "[Accessible definition]"
    visual_representation: "[How to diagram]"
    prerequisites: ["[Prereq 1]", "[Prereq 2]"]

# Primary Analogy
primary_analogy:
  comparison: "[Abstract] is like [Concrete]"
  mapping:
    - "[Abstract element] → [Concrete element]"
  limitations:
    - "[Where analogy breaks]"
  source: "[ANALOGIES.md reference]"

# Key Misconceptions to Address
misconceptions:
  - misconception: "[What people wrongly believe]"
    address_in: "[Section where to address]"
    method: "[preemptive | direct | conflict]"

# Verified Claims
claim_tier_distribution:
  tier_1: "[X]%"
  tier_2: "[X]%"
  tier_3: "[X]%"
```

---

### Layer 3: Section Architecture (20%)

**Purpose**: Define the learning sequence and section structure.

```yaml
# Layer 3: Section Architecture
# Sections follow SEQUENCE.md learning progression

sections:
  - section: 1
    title: "[Foundation Section]"
    purpose: "[What this section establishes]"
    introduces:
      - "[Concept A]"
      - "[Concept B]"
    assumes:
      - "[Prior knowledge]"
    prepares_for:
      - "[What comes next]"
    diagram: "[Name of diagram for this section]"
    length: "[short | medium | long]"
    
  - section: 2
    title: "[Building Section]"
    purpose: "[What this section builds]"
    introduces:
      - "[Concept C]"
    assumes:
      - "[Concept A from Section 1]"
    prepares_for:
      - "[Section 3 concepts]"
    diagram: "[Diagram name]"
    addresses_misconception: "[From MISCONCEPTIONS.md]"
    
  # Continue for all sections...

# Section Flow
flow:
  hook: "[How to engage reader immediately]"
  build: "[How complexity increases]"
  climax: "[Where core thesis clicks]"
  resolution: "[How to conclude]"

# Cognitive Load Map
cognitive_load:
  - section: 1
    new_concepts: 2
    complexity: low
  - section: 2
    new_concepts: 3
    complexity: medium
```

---

### Layer 4: Diagram Specifications (25%)

**Purpose**: Define each diagram's content, structure, and animation.

```yaml
# Layer 4: Diagram Specifications

diagrams:
  - name: "[Diagram 1 Name]"
    section: 1
    purpose: "[What concept this diagram explains]"
    type: "[process | system | comparison | hierarchy]"
    
    # Elements
    elements:
      - element: "[Element Name]"
        shape: "[rectangle | rounded-rect | circle | diamond]"
        color_token: "[--diagram-primary]"
        label: "[Text label]"
        position: "[relative position description]"
      
      - element: "[Element 2]"
        shape: "[shape]"
        color_token: "[token]"
        label: "[label]"
    
    # Connections
    connections:
      - from: "[Element A]"
        to: "[Element B]"
        arrow_type: "[solid | dashed | loop | bidirectional]"
        label: "[Connection label if any]"
    
    # Animation Sequence
    animation:
      scroll_locked: true
      duration: "[total duration]"
      sequence:
        - at: "0-20%"
          show: "[Initial elements]"
          action: "[fade-in | draw | highlight]"
        - at: "20-50%"
          show: "[Building elements]"
          action: "[description]"
        - at: "50-80%"
          show: "[Key reveal]"
          action: "[description]"
        - at: "80-100%"
          show: "[Complete diagram]"
          action: "[final state]"
    
    # Accessibility
    alt_text: "[Complete description for screen readers]"
    reduced_motion_fallback: "[How to show without animation]"

  - name: "[Diagram 2 Name]"
    section: 2
    # ... similar structure
```

---

### Layer 4b: Data Visualization Specifications (Data Journalism Mode)

**Purpose**: When the orchestrator activates Data Journalism mode, this subsection extends Layer 4 with specifications for interactive, programmatic data visualizations. These are distinct from conceptual diagrams — they encode real data from DATASETS.md and STATISTICS.md into interactive visual representations.

> **When to include**: Only when the Conceptual Essay Orchestrator is operating in Data Journalism mode. Standard conceptual essays use Layer 4 diagram specs only.

```yaml
# Layer 4b: Data Visualization Specifications
# (Data Journalism Mode Extension)

# Data source references
data_sources:
  datasets: "DATASETS.md"
  statistics: "STATISTICS.md"
  comparisons: "COMPARISONS.md"
  projections: "PROJECTIONS.md"

# Visualization specifications
data_visualizations:

  # --- CHOROPLETH MAP ---
  - name: "[Map Title — insight statement, not description]"
    type: choropleth_map
    section: "[Section number]"
    purpose: "[What insight this map conveys]"
    data_source: "DATASETS.md#[dataset-reference]"

    # Geographic configuration
    geography:
      scope: "[world | continent | country | region]"
      projection: "[geoEqualEarth | geoNaturalEarth1 | geoMercator]"
      topology: "[TopoJSON source — e.g., world-110m, world-50m]"
      simplification: "[topology detail level for performance]"

    # Data encoding
    encoding:
      variable: "[Data variable being mapped — e.g., water_stress_index]"
      scale_type: "[sequential | diverging | threshold]"
      color_interpolator: "[interpolateBlues | interpolateViridis | custom]"
      domain: "[min, max values or threshold breakpoints]"
      legend:
        type: "[continuous | discrete]"
        labels: ["[Low]", "[Moderate]", "[High]", "[Extreme]"]

    # Time dimension (optional)
    time_dimension:
      enabled: true
      range: "[start_year, end_year]"
      driver: "[scroll | slider | both]"
      interpolation: "[linear | step]"
      projection_boundary_year: "[year where measured → projected]"
      projection_visual_treatment: "[dashed borders | color shift | label]"

    # Interaction
    interaction:
      hover: true
      hover_content:
        - "[field: Country Name]"
        - "[field: Stress Category]"
        - "[field: Population Affected]"
        - "[field: Primary Driver]"
      touch_target: "44px minimum"
      click_behavior: "[none | zoom | detail-panel]"

    # Animation
    animation:
      scroll_locked: "[true | false]"
      year_transition_duration: "300ms"
      year_transition_easing: "ease-in-out"
      pattern_reference: "scroll-lock-patterns.md#18-the-map-journey"

    # Accessibility
    accessibility:
      alt_text: "[Complete description]"
      data_table_fallback: true
      colorblind_safe: true
      reduced_motion: "Show final year state, no animation"

  # --- FLOW DIAGRAM (SANKEY / ALLUVIAL) ---
  - name: "[Diagram Title — insight statement]"
    type: flow_diagram
    section: "[Section number]"
    purpose: "[What proportional relationship this reveals]"
    data_source: "STATISTICS.md#[reference]"

    # Flow structure
    flows:
      source_nodes:
        - name: "[Source Category]"
          value: "[percentage or absolute]"
          color_token: "[CSS variable]"
      target_nodes:
        - name: "[Target Category]"
          parent: "[Source it flows from]"
          value: "[percentage or absolute]"
      subdivisions:
        - parent: "[Source Category]"
          children:
            - name: "[Sub-category 1]"
              value: "[value]"
            - name: "[Sub-category 2]"
              value: "[value]"

    # Visual encoding
    encoding:
      width_encoding: "proportional to value"
      flow_direction: "[left-to-right | top-to-bottom]"
      flow_animation: "[particle | pulse | static]"
      dominant_emphasis: "[Which flow should be viscerally obvious]"

    # Animation
    animation:
      scroll_locked: true
      progressive_build: true
      build_sequence:
        - at: "0-20%"
          show: "[Labels and frame]"
        - at: "20-50%"
          show: "[Primary flows animate]"
        - at: "50-75%"
          show: "[Secondary flows animate]"
        - at: "75-100%"
          show: "[Subdivisions, particles, final state]"
      pattern_reference: "scroll-lock-patterns.md#19-the-data-build"

    accessibility:
      alt_text: "[Complete description]"
      data_table_fallback: true
      reduced_motion: "Show complete diagram, no progressive build"

  # --- COMPARISON WIDGET ---
  - name: "[Widget Title — insight statement]"
    type: comparison_widget
    section: "[Section number]"
    purpose: "[What divergence in outcomes this reveals]"
    data_source: "COMPARISONS.md#[reference]"

    # Entity selection
    entities:
      selectable: true
      selection_ui: "[dropdown | button-group | search]"
      curated_pairs:
        - entity_a: "[Country/Region A]"
          entity_b: "[Country/Region B]"
          insight: "[Why this pair is meaningful]"
        - entity_a: "[Country/Region C]"
          entity_b: "[Country/Region D]"
          insight: "[Key divergence]"

    # Metrics
    metrics:
      - name: "[Metric 1 — e.g., Annual Rainfall]"
        unit: "[mm/year]"
        display: "[bar | number | icon]"
        normalization: "[per capita | per GDP | raw]"
      - name: "[Metric 2]"
        unit: "[unit]"
        display: "[bar | number | icon]"
      # ... additional metrics

    # Layout
    layout: "[side-by-side | stacked | overlapping-bars]"

    # Annotation
    annotation:
      contextual: true
      annotation_source: "COMPARISONS.md#contextual-annotations"
      placement: "[below | inline | tooltip]"

    # Animation
    animation:
      metric_entrance: "[grow | count-up | slide]"
      metric_duration: "500ms"
      selection_transition: "300ms ease-out"

    accessibility:
      alt_text: "[Complete description]"
      keyboard_navigable: true
      screen_reader_announces_selection: true

  # --- SCROLL-LOCKED EXPLAINER SEQUENCE ---
  - name: "[Sequence Title — e.g., 'The Scarcity Equation']"
    type: scroll_explainer
    section: "[Section number]"
    purpose: "[What cumulative understanding this builds]"
    data_source: "STATISTICS.md#[reference]"

    # Stages
    stages:
      - stage: 1
        title: "[Stage name]"
        visual_layer: "[What appears — e.g., base resource graphic]"
        annotation: "[Prose text for this stage]"
        data_values: ["[Values from STATISTICS.md used in this stage]"]
      - stage: 2
        title: "[Stage name]"
        visual_layer: "[Overlay that adds to previous — e.g., demand layer]"
        annotation: "[Prose text]"
        data_values: ["[Values]"]
      - stage: 3
        title: "[Stage name]"
        visual_layer: "[Next overlay]"
        annotation: "[Prose text]"
      - stage: 4
        title: "[Stage name]"
        visual_layer: "[Final overlay — resulting state]"
        annotation: "[Concluding prose]"

    # Animation
    animation:
      scroll_locked: true
      scroll_depth: "[800-1200px depending on stage count]"
      stage_transition: "ease-in-out 400ms"
      layer_entrance: "[fade-in | draw | grow]"
      pattern_reference: "scroll-lock-patterns.md#19-the-data-build"

    accessibility:
      alt_text: "[Complete description of final state]"
      stage_announcements: true
      reduced_motion: "Show all layers simultaneously"

  # --- DATA TICKER / STATISTICS STRIP ---
  - name: "[Strip Title — e.g., 'By The Numbers']"
    type: data_ticker
    section: "[Section number]"
    purpose: "[Anchor key statistics at narratively strategic moment]"
    data_source: "STATISTICS.md#[reference]"

    # Statistics
    statistics:
      - value: "[Number]"
        label: "[What this number means]"
        source: "[STATISTICS.md entry reference]"
        format: "[integer | decimal | percentage | currency]"
        prefix: "[optional — e.g., '$']"
        suffix: "[optional — e.g., ' billion']"
      - value: "[Number]"
        label: "[Label]"
        source: "[Reference]"
      # ... 4-6 statistics total

    # Layout
    layout: "[horizontal-strip | vertical-stack | grid]"
    placement: "[after-section-X | strategic-narrative-moment]"

    # Animation
    animation:
      trigger: "intersection-observer"
      count_up: true
      count_duration: "2000ms"
      count_easing: "ease-out"
      stagger_delay: "200ms between statistics"

    accessibility:
      alt_text: "[All statistics in text form]"
      reduced_motion: "Show final values immediately"
```

---

### Layer 5: Content Specifications (20%)

**Purpose**: Define the text content that supports diagrams.

```yaml
# Layer 5: Content Specifications

content:
  - section: 1
    # Text supports diagram, not vice versa
    role: "support_diagram"
    
    # Opening Hook
    hook:
      type: "[question | scenario | surprising fact]"
      text: "[Hook text]"
      connects_to: "[What this leads into]"
    
    # Key Text Blocks
    text_blocks:
      - block: "pre_diagram"
        purpose: "[Set up the diagram]"
        length: "[1-2 paragraphs]"
        key_points:
          - "[Point 1]"
          - "[Point 2]"
      
      - block: "post_diagram"
        purpose: "[Explain what diagram showed]"
        length: "[1-2 paragraphs]"
    
    # Claims in this section
    claims:
      - claim: "[Claim text]"
        source: "CLAIMS.md#[reference]"
    
    # Expert Quotes
    quotes:
      - quote: "[Quote text]"
        attribution: "[Expert name]"
        source: "CLAIMS.md#[reference]"
        placement: "[Where in section]"

  - section: 2
    # Misconception Addressing
    addresses_misconception:
      misconception: "[What people wrongly believe]"
      method: "direct"
      text: "[How we address it]"
    
    # ... continue similar structure
```

---

### Layer 6: Technical Implementation (10%)

**Purpose**: Define implementation requirements.

```yaml
# Layer 6: Technical Implementation

# File Structure
files:
  page: "page.tsx"
  client: "[TopicSlug]Client.tsx"
  styles: "[topic-slug].css"
  path: "src/app/essays/[topic-slug]/"

# Design Research Reference
design_research: "[path]/DESIGN-RESEARCH.md"

# Color Token Implementation
color_tokens:
  primary: "var(--diagram-primary)"
  secondary: "var(--diagram-secondary)"
  accent: "var(--diagram-accent)"
  # ... per design research

# Typography
typography:
  display: "[Font from design research]"
  body: "[Font from design research]"
  diagram_labels: "[Font]"

# Animation Specs
animation:
  scroll_lock_enabled: true
  default_easing: "[easing function]"
  reduced_motion: "show final states"

# Mobile Requirements
mobile:
  diagram_behavior: "[stack | scroll | zoom]"
  min_touch_target: "44px"
  font_scaling: "[responsive sizes]"

# SEO
seo:
  title: "[Title for search]"
  description: "[Meta description]"
  keywords: ["[keyword1]", "[keyword2]"]

# Accessibility
accessibility:
  wcag_level: "AA"
  screen_reader_support: true
  keyboard_navigation: true
  reduced_motion_support: true
```

---

## Spec Template

```markdown
# Conceptual Essay Invocation Spec: [Topic]

**Status**: [DRAFT]  
**Date**: [Date]  
**Research Package**: [path]

---

## Layer 1: Meta

[Paste Layer 1 content]

---

## Layer 2: Research Foundation

[Paste Layer 2 content]

---

## Layer 3: Section Architecture

[Paste Layer 3 content]

---

## Layer 4: Diagram Specifications

[Paste Layer 4 content]

---

## Layer 5: Content Specifications

[Paste Layer 5 content]

---

## Layer 6: Technical Implementation

[Paste Layer 6 content]

---

## Research Package Reference

- CONCEPTS.md: [path]
- SEQUENCE.md: [path]
- DEFINITIONS.md: [path]
- ANALOGIES.md: [path]
- MISCONCEPTIONS.md: [path]
- CLAIMS.md: [path]
- DESIGN-RESEARCH.md: [path]

---

## Spec Approval

**Gate 3 Status**: ⏳ Pending

### Checklist

- [ ] All sections follow SEQUENCE.md learning progression
- [ ] All claims sourced from CLAIMS.md
- [ ] All misconceptions addressed per MISCONCEPTIONS.md
- [ ] All analogies include documented limitations
- [ ] Diagram specifications complete for each section
- [ ] No speculation or unverified content
- [ ] Technical implementation references design research
```

---

## Quality Requirements

### Spec Must Include

- [ ] Core thesis clearly stated (Layer 1)
- [ ] Target audience and learning objectives (Layer 1)
- [ ] Research package referenced (Layer 2)
- [ ] All concepts from CONCEPTS.md represented (Layer 2)
- [ ] Learning sequence from SEQUENCE.md followed (Layer 3)
- [ ] All misconceptions from MISCONCEPTIONS.md addressed (Layer 3)
- [ ] Diagram specs for each major concept (Layer 4)
- [ ] Animation sequences defined (Layer 4)
- [ ] Content supports diagrams (Layer 5)
- [ ] All claims traced to CLAIMS.md (Layer 5)
- [ ] Implementation references design research (Layer 6)

### Spec Must NOT Include

- [ ] Claims not in CLAIMS.md
- [ ] Concepts without prerequisite coverage
- [ ] Diagrams without accessibility specs
- [ ] Content that leads diagrams (diagrams should lead)
- [ ] Speculation or hedging language
- [ ] Analogies without limitations documented

---

## See Also

- [conceptual-essay-orchestrator.md](../../agents/orchestrators/conceptual-essay-orchestrator.md) — Uses this skill
- [conceptual-research-profile.md](../../profiles/research/conceptual-research-profile.md) — Research package spec
- [data-journalism-research-profile.md](../../profiles/research/data-journalism-research-profile.md) — Data journalism research extensions (DATASETS.md, STATISTICS.md, COMPARISONS.md, PROJECTIONS.md)
- [diagram-design-profile.md](../../profiles/design/diagram-design-profile.md) — Design research spec
- [visual-essay-invocation/SKILL.md](../visual-essay-invocation/SKILL.md) — Comparison skill
- [scroll-lock-patterns.md](../visual-essay-invocation/references/scroll-lock-patterns.md) — Patterns 18 (Map Journey) and 19 (Data Build) for data visualization scroll-locks

---

## Last Updated
February 2026

---

*This skill defines the 6-layer specification architecture for conceptual essays. Unlike visual essays that center on historical figures and archival photography, conceptual essays center on abstract concepts and SVG diagrams. Every spec built with this skill ensures learning sequence integrity, research-backed claims, and diagram-first visual design.*
