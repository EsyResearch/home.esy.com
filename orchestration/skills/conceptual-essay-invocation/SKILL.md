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
- [diagram-design-profile.md](../../profiles/design/diagram-design-profile.md) — Design research spec
- [visual-essay-invocation/SKILL.md](../visual-essay-invocation/SKILL.md) — Comparison skill

---

## Last Updated
February 2026

---

*This skill defines the 6-layer specification architecture for conceptual essays. Unlike visual essays that center on historical figures and archival photography, conceptual essays center on abstract concepts and SVG diagrams. Every spec built with this skill ensures learning sequence integrity, research-backed claims, and diagram-first visual design.*
