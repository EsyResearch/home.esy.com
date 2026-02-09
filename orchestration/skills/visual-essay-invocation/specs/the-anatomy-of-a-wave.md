# Visual Essay Invocation Spec: The Anatomy of a Wave

**Status**: ✅ APPROVED
**Date**: February 9, 2026
**Research Package**: `src/app/essays/science/the-anatomy-of-a-wave/research/`
**Mode**: Conceptual Essay (Pure — No Data Journalism Extension)

---

## Layer 1: Strategic Foundation

```yaml
# Layer 1: Strategic Foundation
title: "The Anatomy of a Wave"
slug: "the-anatomy-of-a-wave"
type: visual-essay
category: Science
subcategory: Physics
status: draft

# Core Thesis
thesis: "Waves are a single phenomenon expressed across radically different scales — from the ocean to sound to quantum mechanics — and understanding any one of them unlocks the pattern behind all of them."

# Target Audience
audience:
  level: "general-curious"
  profile: "Curious adults who watch Veritasium/3Blue1Brown but haven't studied physics formally. Everyone has seen ocean waves; most understand sound waves vaguely; quantum waves are mysterious."
  assumed_knowledge:
    - "Waves exist in the ocean"
    - "Sound is some kind of wave"
    - "Light is related to color"
    - "Quantum physics is weird and hard to understand"
  learning_objectives:
    - "Define a wave as energy transfer without matter transfer"
    - "Identify wavelength, frequency, amplitude, and phase on any wave"
    - "Explain constructive and destructive interference visually"
    - "Recognize standing waves as the bridge from classical to quantum"
    - "Understand what a quantum wave function IS (probability) without needing math"

# Scope Boundaries
scope:
  includes:
    - "Water waves as the physical anchor (circular particle orbits)"
    - "Sound as longitudinal pressure waves"
    - "Light as electromagnetic waves — visible spectrum"
    - "Superposition and interference (constructive/destructive)"
    - "Interference patterns (ripple tank, double-slit setup)"
    - "Standing waves, harmonics, resonance"
    - "Quantum wave functions (probability amplitude, conceptual)"
    - "The double-slit experiment as climax"
  excludes:
    - "Full electromagnetic spectrum deep dive"
    - "Maxwell's equations or Schrödinger equation in symbolic form"
    - "Fourier transforms or signal processing"
    - "Detailed quantum mechanics beyond wave-particle duality"
    - "Seismology or earthquake waves"
    - "Radio engineering or telecommunications"
    - "History of wave theory (Huygens vs Newton)"

# Read Time
estimated_read_time: "18-25 minutes"
visualization_count: 7
word_count: "3,000-4,000"
code_lines: "2,500+"
```

---

## Layer 2: Technical Systems

```yaml
# Layer 2: Technical Systems
research_package: "src/app/essays/science/the-anatomy-of-a-wave/research/"

# Core Research Files (Conceptual Profile)
claims_file: "CLAIMS.md"
concepts_file: "CONCEPTS.md"
sequence_file: "SEQUENCE.md"
definitions_file: "DEFINITIONS.md"
analogies_file: "ANALOGIES.md"
misconceptions_file: "MISCONCEPTIONS.md"

# Source Quality Requirements
source_requirements:
  minimum_total: 10
  tier_1_minimum_pct: 60
  tier_1_2_minimum_pct: 80
  actual_total: 14
  actual_tier_1_pct: 86
  actual_tier_1_2_pct: 100

# Key Sources
key_sources:
  - id: S1
    citation: "Halliday, Resnick & Walker, Fundamentals of Physics, 12th ed."
    tier: 1
    used_for: "Core wave mechanics, superposition, standing waves"
  - id: S3
    citation: "Feynman, R.P., The Feynman Lectures on Physics, Vol. I (1964)"
    tier: 1
    used_for: "Wave intuitions, cork demonstration"
  - id: S7
    citation: "Hecht, E., Optics, 5th ed."
    tier: 1
    used_for: "Interference, diffraction, superposition"
  - id: S8
    citation: "Griffiths, D.J., Introduction to Quantum Mechanics, 3rd ed."
    tier: 1
    used_for: "Quantum wave functions, Born rule, probability"
  - id: S11
    citation: "Tonomura et al., Am. J. Phys. 57, 117 (1989)"
    tier: 1
    used_for: "Single-electron double-slit experiment"

# Verified Claim Count by Section
claim_distribution:
  section_1: 4  # C1.1-C1.4
  section_2: 4  # C2.1-C2.4
  section_3: 4  # C3.1-C3.4
  section_4: 4  # C4.1-C4.4
  section_5: 3  # C5.1-C5.3
  section_6: 3  # C6.1-C6.3
  section_7: 5  # C7.1-C7.5
  section_8: 5  # C8.1-C8.5
  section_9: 2  # C9.1-C9.2
  total: 34

# Misconception Registry
misconceptions_to_address:
  - id: MC1
    belief: "The water moves with the wave"
    section: 1
    severity: critical
  - id: MC2
    belief: "Sound travels through empty space"
    section: 3
    severity: high
  - id: MC3
    belief: "Louder means higher pitch"
    section: 3
    severity: medium
  - id: MC4
    belief: "Red light is slower than blue light in vacuum"
    section: 4
    severity: medium
  - id: MC5
    belief: "Destructive interference destroys energy"
    section: 5
    severity: high
  - id: MC6
    belief: "Electrons orbit like planets"
    section: 8
    severity: critical
  - id: MC7
    belief: "Observation = consciousness causing collapse"
    section: 8
    severity: high
```

---

## Layer 3: Hero Architecture

```yaml
# Layer 3: Hero Architecture
hero:
  type: "scroll-triggered-animation"
  visual: "Ocean wave cross-section, full viewport, animated particles in circular orbits"
  
  # The hook
  opening_text: >
    Watch the seagull. A wave passes under it.
    The water rises… and falls.
    The seagull ends up exactly where it started.
    The wave moved. The water didn't.
    That distinction is the key to everything that follows.
  
  # Hero sequence (scroll-triggered)
  stages:
    - stage: 1
      visual: "Still ocean surface, seagull floating"
      text: "Watch the seagull."
    - stage: 2
      visual: "Wave approaching from left, particles begin circular motion"
      text: "A wave passes under it."
    - stage: 3
      visual: "Wave crest lifts seagull, circular orbits visible beneath surface"
      text: "The water rises… and falls."
    - stage: 4
      visual: "Wave passed, seagull returns, particle orbits trace visible"
      text: "The seagull ends up exactly where it started."
    - stage: 5
      visual: "Energy arrow follows wave direction, particles labeled as stationary"
      text: "The wave moved. The water didn't."
    - stage: 6
      visual: "Transition to essay body — labels appear (wavelength, amplitude)"
      text: "That distinction is the key to everything that follows."
  
  # Transition
  hero_to_body: "Dissolve ocean scene into labeled wave diagram"
```

---

## Layer 4: Chapter Schema

```yaml
# Layer 4: Chapter Schema
sections:
  - id: 1
    title: "What Is a Wave?"
    subtitle: "Energy on the move"
    word_count: "300-400"
    claims: [C1.1, C1.2, C1.3, C1.4]
    misconception: MC1
    visualization:
      id: D1
      name: "Ocean Wave Anatomy"
      type: "Annotated SVG + CSS animation"
      tier: 2
      description: "Cross-section of ocean wave showing circular particle orbits decreasing with depth. Animated particles trace orbits continuously. Wavelength and amplitude labeled."
      interactivity: "Scroll-triggered animation start"
      research_brief_required: true
    key_analogy: A1 (Stadium Wave)
    emotional_beat: Wonder

  - id: 2
    title: "The Language of Waves"
    subtitle: "Four numbers describe any wave in the universe"
    word_count: "350-450"
    claims: [C2.1, C2.2, C2.3, C2.4]
    visualization:
      id: null
      description: "Annotated overlay on D1 — interactive labels for wavelength, frequency, amplitude, phase. v = fλ shown visually."
    key_analogy: A2 (Rope Flick)
    emotional_beat: Clarity

  - id: 3
    title: "Waves You Can't See"
    subtitle: "Sound is air doing the wave"
    word_count: "400-500"
    claims: [C3.1, C3.2, C3.3, C3.4]
    misconceptions: [MC2, MC3]
    visualization:
      id: D2
      name: "Sound Pressure"
      type: "Animated SVG"
      tier: 2
      description: "Longitudinal wave visualization: dots representing air molecules bunch (compression) and spread (rarefaction). Pressure graph overlaid showing the sine wave equivalent. Frequency slider changes pitch."
      interactivity: "Frequency slider, play/pause"
      research_brief_required: true
    key_analogy: A3 (Slinky Push), A4 (Ambulance Siren)
    emotional_beat: Surprise

  - id: 4
    title: "Waves You Can See"
    subtitle: "200 years to accept that light needs no medium"
    word_count: "300-400"
    claims: [C4.1, C4.2, C4.3, C4.4]
    misconception: MC4
    visualization:
      id: D3
      name: "Light Spectrum"
      type: "Styled HTML/CSS gradient"
      tier: 1
      description: "Full visible spectrum strip from violet (380nm) to red (700nm) with wavelength scale, frequency scale, and color labels. Prism dispersion diagram alongside."
      interactivity: "Hover for wavelength/frequency values"
    key_analogy: M2 (Piano Keys as Frequency)
    emotional_beat: Elegance

  - id: 5
    title: "When Waves Meet"
    subtitle: "The principle that makes everything else possible"
    word_count: "350-450"
    claims: [C5.1, C5.2, C5.3]
    misconception: MC5
    visualization:
      id: D4
      name: "Superposition Playground"
      type: "Interactive SVG/Canvas"
      tier: 3
      description: "Two-wave combiner: top shows Wave A, middle shows Wave B, bottom shows A+B. User controls frequency and amplitude of each wave via sliders. Shows constructive and destructive interference in real time."
      interactivity: "Frequency sliders, amplitude sliders, phase offset slider"
      research_brief_required: true
    key_analogy: A5 (Two Rocks in a Pond)
    emotional_beat: Delight

  - id: 6
    title: "The Ripple Tank"
    subtitle: "When two sources create a pattern"
    word_count: "200-300"
    claims: [C6.1, C6.2, C6.3]
    visualization:
      id: D5
      name: "Ripple Tank Simulation"
      type: "Canvas/WebGL"
      tier: 3
      description: "Two-source ripple tank: concentric waves emanate from two point sources. Interference pattern (constructive/destructive bands) forms between them. User can adjust source separation and wavelength."
      interactivity: "Drag sources, wavelength slider"
      research_brief_required: true
    emotional_beat: Visual satisfaction

  - id: 7
    title: "Waves That Stand Still"
    subtitle: "The guitar string that explains the atom"
    word_count: "400-500"
    claims: [C7.1, C7.2, C7.3, C7.4, C7.5]
    visualization:
      id: D6
      name: "Standing Wave Builder"
      type: "Animated SVG"
      tier: 2
      description: "A vibrating string showing the fundamental (1st harmonic) and higher harmonics (2nd through 5th). Toggle between modes. Nodes and antinodes labeled. Optional: 2D drumhead Chladni patterns."
      interactivity: "Harmonic mode selector (1-5), play/pause"
      research_brief_required: true
    key_analogy: A6 (Guitar String = Quantum Atom)
    emotional_beat: Connection

  - id: 8
    title: "The Strangest Wave"
    subtitle: "One electron. Two slits. An impossible pattern."
    word_count: "400-500"
    claims: [C8.1, C8.2, C8.3, C8.4, C8.5]
    misconceptions: [MC6, MC7]
    visualization:
      id: D7
      name: "Double-Slit Experiment"
      type: "Scroll-triggered Canvas"
      tier: 3
      description: "The double-slit experiment visualized. Particles are fired one at a time at two slits. Early particles appear to land randomly. As count increases (scroll-triggered), an interference pattern gradually emerges. The reveal: individual particles create a wave pattern."
      interactivity: "Scroll controls particle count"
      research_brief_required: true
    emotional_beat: Awe

  - id: 9
    title: "Everything Is Waves"
    subtitle: "The universal pattern"
    word_count: "200-300"
    claims: [C9.1, C9.2]
    visualization: null
    emotional_beat: Completeness
    closing_quote: "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration. — Nikola Tesla"
```

---

## Layer 5: Design System

```yaml
# Layer 5: Design System
design_philosophy: "Subject-derived — the palette and motion language come from waves themselves"

# Color Palette
# The palette progresses from concrete (ocean) to abstract (quantum), mirroring the essay's arc.
palette:
  primary:
    ocean_blue: "#1a6fa0"        # Ocean waves — the opening
    deep_navy: "#0d2137"         # Deep water, backgrounds
  secondary:
    sound_amber: "#d4872c"       # Sound — warm, pressure, energy
    light_spectrum: "linear-gradient(90deg, #7b2ff7, #2196f3, #4caf50, #ffeb3b, #ff9800, #f44336)"
  accent:
    quantum_violet: "#6b3fa0"    # Quantum — mysterious, abstract
    interference_cyan: "#00bcd4" # Interference patterns — bright, precise
    node_white: "#f0f4f8"        # Nodes, static points, backgrounds
  semantic:
    constructive: "#2ecc71"      # Green — waves adding up
    destructive: "#e74c3c"       # Red — waves canceling
    danger_text: "#c0392b"       # Misconception callouts
  backgrounds:
    dark: "#0a1628"              # Deep ocean — primary background
    section_alt: "#0d1f3c"       # Alternating section background
    card: "#132a4a"              # Card/panel backgrounds
    surface: "#1a3a5c"           # Interactive surface

# Typography
typography:
  heading_font: "System serif stack"
  body_font: "System sans-serif stack"
  mono_font: "System monospace stack (equations, labels)"
  heading_style: "Clean, scientific — no decorative serifs"
  body_style: "16px minimum, 1.7 line-height, max-width 680px"

# Animation Philosophy
animation:
  principle: "Waves ARE motion. Every wave visualization must animate. A static sine curve is a dead wave."
  easing: "Sinusoidal (ease-in-out-sine) — the wave function itself as the easing curve"
  scroll_trigger: "IntersectionObserver with threshold 0.3"
  performance: "requestAnimationFrame for continuous animations, CSS for scroll-triggered"
  reduced_motion: "All animations respect prefers-reduced-motion — show static frame at t=0"
  
# Transitions Between Sections
section_transitions:
  approach: "Progressive abstraction — each section's background becomes slightly more abstract"
  ocean_to_sound: "Blue → amber color shift, transverse lines → longitudinal dots"
  sound_to_light: "Amber → spectrum gradient, dots → smooth wave"
  light_to_quantum: "Spectrum → deep violet, smooth wave → probability cloud"

# Component Patterns
components:
  misconception_callout:
    style: "Red-bordered card with 'Common Misconception' header"
    icon: "⚠️ or custom SVG"
    background: "rgba(231, 76, 60, 0.1)"
  definition_inline:
    style: "Bold term with tooltip on first use"
    tooltip_style: "Dark card with definition text"
  equation_visual:
    style: "v = fλ shown as visual diagram, not math notation"
    approach: "Three labeled arrows: speed, frequency, wavelength"
  source_tag:
    style: "Small superscript number linking to Sources section"

# Responsive Breakpoints
responsive:
  mobile: "320px — single column, stacked visualizations"
  tablet: "768px — side-by-side text + visualization where appropriate"
  desktop: "1200px — max content width 1100px, generous margins"
```

---

## Layer 6: Implementation Notes

```yaml
# Layer 6: Implementation Notes

# File Structure
files:
  page: "src/app/essays/science/the-anatomy-of-a-wave/page.tsx"
  client: "src/app/essays/science/the-anatomy-of-a-wave/TheAnatomyOfAWaveClient.jsx"
  css: "src/app/essays/science/the-anatomy-of-a-wave/the-anatomy-of-a-wave.css"

# Framework Requirements
framework:
  next_js: "App Router, static export"
  wrapper: "ArtifactDetailWrapper from @/components/ArtifactDetail"
  data_registration: "src/data/visualEssays.ts"
  metadata: "createVisualEssayMetadata from @/lib/visual-essay-metadata"
  basePath: "essays/science"

# ArtifactDetailWrapper Meta
essay_meta:
  title: "The Anatomy of a Wave"
  subtitle: "From ocean to quantum — the universal pattern"
  category: "Science"
  subcategory: "Physics"
  readTime: "20 min"
  sourceCount: 14
  sourceTier: "Tier-1"
  sectionCount: 9
  visualizationCount: 7
  designSystem: "Subject-derived"
  model: "Claude Opus 4.6"
  template: "Visual Essay"
  palette:
    - { name: "Ocean Blue", color: "#1a6fa0" }
    - { name: "Sound Amber", color: "#d4872c" }
    - { name: "Quantum Violet", color: "#6b3fa0" }
    - { name: "Interference Cyan", color: "#00bcd4" }
    - { name: "Constructive Green", color: "#2ecc71" }

# Visualization Tech Stack
visualization_tech:
  D1_ocean: "SVG + CSS animation (requestAnimationFrame for orbits)"
  D2_sound: "SVG + requestAnimationFrame (particle simulation)"
  D3_spectrum: "Pure HTML/CSS (gradient + absolute-positioned labels)"
  D4_superposition: "Canvas 2D (real-time wave rendering with sliders)"
  D5_ripple: "Canvas 2D or WebGL (2D wave interference simulation)"
  D6_standing: "SVG + CSS animation (harmonic modes, node highlighting)"
  D7_double_slit: "Canvas 2D (particle accumulation, scroll-triggered)"

# Performance Budget
performance:
  target_fps: 60
  max_canvas_resolution: "1920x1080 (scale for device pixel ratio)"
  lazy_load: "All visualizations lazy-loaded with IntersectionObserver"
  ssr_safety: "All Canvas/interactive components loaded via next/dynamic with ssr: false"

# CSP Notes
csp:
  unsafe_eval_required: false  # No Three.js — all Canvas 2D and SVG
  note: "No special CSP headers needed — this essay uses only Canvas 2D and SVG, no WebGL shader compilation"

# Accessibility
a11y:
  reduced_motion: "All animations paused, show static t=0 frame"
  keyboard_nav: "Tab through interactive controls (sliders, toggles)"
  aria_labels: "All SVG diagrams have descriptive aria-label attributes"
  color_contrast: "All text meets WCAG AA against background colors"

# Testing Checklist
testing:
  - "All 7 visualizations render on mobile (iPhone SE minimum)"
  - "Canvas visualizations hit 60fps on M1 Mac + iPhone 14"
  - "Sliders and interactive controls work on touch devices"
  - "prefers-reduced-motion disables all continuous animations"
  - "Static export builds without errors"
  - "ArtifactDetailWrapper renders correctly with all meta fields"
  - "visualEssays.ts entry links to correct route"
```
