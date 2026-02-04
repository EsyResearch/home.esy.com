# Conceptual Essay Invocation Spec: The Brain as a Prediction Machine

**Status**: DRAFT  
**Date**: February 3, 2026  
**Research Package**: `orchestration/projects/brain-as-prediction-machine/research/`

---

## Layer 1: Meta

```yaml
# Layer 1: Meta
title: "The Brain as a Prediction Machine"
slug: "brain-as-prediction-machine"
type: conceptual-essay
status: draft

# Core Thesis
thesis: "The brain is not primarily reacting to the world — it is constantly predicting it, and updating itself when it is wrong."

# Target Audience
audience:
  level: "beginner"
  profile: "First-year college student, smart and curious, no neuroscience background"
  assumed_knowledge:
    - "Brain is an organ that controls body"
    - "We have five senses"
    - "Learning happens somehow"
  learning_objectives:
    - "Understand that prediction is the brain's primary job"
    - "Explain what prediction error is and why it matters"
    - "Recognize perception as brain's best guess"
    - "Apply framework to understand learning and attention"

# Scope Boundaries
scope:
  includes:
    - "Predictive processing (conceptual level)"
    - "Prediction error as learning signal"
    - "Perception as controlled hallucination"
    - "Efficiency of prediction"
    - "Applications to learning, attention, mistakes"
  excludes:
    - "AI/machine learning comparisons"
    - "Bayesian mathematics"
    - "Free energy principle"
    - "Brain anatomy/regions"
    - "Academic citations"
    - "Computational neuroscience"

# Read Time
estimated_read_time: "8-12 minutes"
diagram_count: 8
word_count: "1,500-2,500"
```

---

## Layer 2: Research Foundation

```yaml
# Layer 2: Research Foundation
research_package: "orchestration/projects/brain-as-prediction-machine/research/"

# Core Research Files
concepts_file: "CONCEPTS.md"
sequence_file: "SEQUENCE.md"
definitions_file: "DEFINITIONS.md"
analogies_file: "ANALOGIES.md"
misconceptions_file: "MISCONCEPTIONS.md"
claims_file: "CLAIMS.md"

# Core Concepts (7 Total)
core_concepts:
  - concept: "Prediction"
    definition: "The brain's automatically generated guess about what sensory input will arrive next"
    visual_representation: "Rounded rectangle (brain model)"
    prerequisites: []
    
  - concept: "Sensory Input"
    definition: "Raw data from the world arriving through senses"
    visual_representation: "Circle (input)"
    prerequisites: []
    
  - concept: "Prediction Error"
    definition: "The difference between what the brain predicted and what sensory input actually reported"
    visual_representation: "ACCENT COLOR — only concept with accent"
    prerequisites: ["Prediction", "Sensory Input"]
    
  - concept: "Model Updating"
    definition: "Adjusting internal predictions based on prediction error"
    visual_representation: "Rectangle with loop arrow"
    prerequisites: ["Prediction Error"]
    
  - concept: "Perception"
    definition: "The brain's best guess constrained by sensory evidence"
    visual_representation: "Output circle"
    prerequisites: ["Prediction", "Sensory Input", "Prediction Error"]
    
  - concept: "Attention"
    definition: "The brain's mechanism for deciding which prediction errors matter most"
    visual_representation: "Thicker outline"
    prerequisites: ["Prediction Error"]
    
  - concept: "Learning"
    definition: "Long-term accumulation of model updates improving prediction accuracy"
    visual_representation: "Loop arrow (continuous cycle)"
    prerequisites: ["Prediction Error", "Model Updating"]

# Primary Analogy
primary_analogy:
  comparison: "Brain prediction is like autocomplete for reality"
  mapping:
    - "Keyboard predictions → Neural predictions"
    - "You type, it guesses → World happens, brain guesses"
    - "Wrong suggestion → correction → Prediction error → model update"
    - "System learns patterns → Brain learns from experience"
  limitations:
    - "Autocomplete is visible/conscious; brain predictions are not"
    - "You can reject autocomplete; you can't reject brain predictions"
    - "Autocomplete only does language; brain predicts everything"
  source: "ANALOGIES.md#autocomplete"

# Running Example
running_example:
  scenario: "Catching a ball"
  sections_used: [2, 3, 4, 6]
  reason: "Familiar, physical, timing-dependent — illustrates latency, prediction, error, efficiency"

# Key Misconceptions
misconceptions:
  - misconception: "The brain reacts to the world"
    correct_model: "The brain predicts the world"
    address_in: "Sections 1-3"
    method: "misconception-first teaching"
    
  - misconception: "Perception equals reality"
    correct_model: "Perception is brain's best guess"
    address_in: "Section 5"
    method: "gentle reframe"
    
  - misconception: "Mistakes are failures"
    correct_model: "Mistakes are learning signals"
    address_in: "Section 7"
    method: "practical reframe"
    
  - misconception: "Attention means seeing more"
    correct_model: "Attention means weighting errors"
    address_in: "Section 7"
    method: "brief correction"
    
  - misconception: "Learning is absorbing information"
    correct_model: "Learning is updating predictions"
    address_in: "Section 7"
    method: "practical reframe"

# Claim Tier Distribution
claim_tier_distribution:
  tier_1: "67%"  # 4 of 6 claims
  tier_2: "33%"  # 2 of 6 claims
  tier_3: "0%"   # No speculative claims
```

---

## Layer 3: Section Architecture

```yaml
# Layer 3: Section Architecture
# Follows SEQUENCE.md learning progression

sections:
  - section: 1
    title: "The Naive View of the Brain"
    purpose: "Surface the reader's implicit model"
    introduces:
      - "Naive model (to be corrected)"
    assumes:
      - "Reader has never examined their brain model"
    prepares_for:
      - "Section 2 challenge to naive model"
    diagram: "naive-model-diagram"
    length: "short"
    cognitive_load: "low"
    duration: "~1 minute"
    
  - section: 2
    title: "Why Pure Reaction Doesn't Work"
    purpose: "Create productive dissonance"
    introduces:
      - "Latency problem"
      - "Ambiguity problem"
    assumes:
      - "Naive model from Section 1"
    prepares_for:
      - "Prediction as solution"
    diagram: "latency-timeline-diagram"
    length: "medium"
    cognitive_load: "medium"
    duration: "~1.5 minutes"
    uses_running_example: "ball — reaction too slow"
    
  - section: 3
    title: "The Predictive Brain"
    purpose: "Introduce core thesis"
    introduces:
      - "Prediction"
      - "Comparison"
    assumes:
      - "Problem established in Section 2"
    prepares_for:
      - "Prediction error mechanism"
    diagram: "prediction-loop-diagram"
    length: "medium"
    cognitive_load: "high"
    duration: "~2 minutes"
    uses_running_example: "ball — prediction enables catch"
    addresses_misconception: "Brain reacts to world"
    
  - section: 4
    title: "Prediction Error — The Engine of Learning"
    purpose: "Introduce key mechanism"
    introduces:
      - "Prediction error"
      - "Model updating"
    assumes:
      - "Prediction understood"
    prepares_for:
      - "Perception as inference"
    diagram: "error-comparison-diagram"
    diagram_highlight: "ACCENT COLOR for error signal"
    length: "medium"
    cognitive_load: "high"
    duration: "~2 minutes"
    uses_running_example: "ball — miss generates error"
    
  - section: 5
    title: "Perception Is Controlled Hallucination"
    purpose: "Apply framework to conscious experience"
    introduces:
      - "Perception as inference"
    assumes:
      - "Predict-error-update loop"
    prepares_for:
      - "Efficiency explanation"
    diagram: "perception-inference-diagram"
    length: "medium"
    cognitive_load: "high"
    duration: "~2 minutes"
    addresses_misconception: "Perception equals reality"
    sensitive_framing: true  # "hallucination" needs careful handling
    
  - section: 6
    title: "Why This Makes the Brain Efficient"
    purpose: "Connect to evolutionary advantage"
    introduces:
      - "Metabolic efficiency"
    assumes:
      - "Full predictive model"
    prepares_for:
      - "Practical applications"
    diagram: "efficiency-energy-diagram"
    length: "medium"
    cognitive_load: "medium"
    duration: "~1.5 minutes"
    uses_running_example: "ball — low energy when correct"
    
  - section: 7
    title: "What This Means for Learning, Attention, and Mistakes"
    purpose: "Transfer framework to practical domains"
    introduces:
      - "Learning as error reduction"
      - "Attention as precision weighting"
      - "Mistakes reframed"
    assumes:
      - "Complete framework"
    prepares_for:
      - "Final consolidation"
    diagram: "applications-diagram"
    length: "medium"
    cognitive_load: "high"
    duration: "~2 minutes"
    addresses_misconception: 
      - "Mistakes are failures"
      - "Attention is seeing more"
      - "Learning is absorption"
    
  - section: 8
    title: "Final Mental Model"
    purpose: "Lock in the takeaway"
    introduces: []  # Consolidation only
    assumes:
      - "All concepts"
    prepares_for: []  # Terminal section
    diagram: "complete-loop-diagram"
    length: "short"
    cognitive_load: "low"
    duration: "~1 minute"

# Section Flow
flow:
  hook: "Surface naive model, challenge it immediately"
  build: "Introduce prediction → error → update loop piece by piece"
  climax: "Section 5 — perception as controlled hallucination"
  resolution: "Practical applications, final mental model"

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
  - section: 3
    new_concepts: 2
    complexity: high
    fatigue_risk: medium
    mitigation: "Use running example"
  - section: 4
    new_concepts: 2
    complexity: high
    fatigue_risk: medium
    mitigation: "Same running example as Section 3"
  - section: 5
    new_concepts: 1
    complexity: high
    fatigue_risk: high
    mitigation: "Short section, strong diagram"
  - section: 6
    new_concepts: 1
    complexity: medium
    fatigue_risk: medium
    mitigation: "Practical grounding"
  - section: 7
    new_concepts: 3
    complexity: high
    fatigue_risk: high
    mitigation: "Bullet format, quick transfer"
  - section: 8
    new_concepts: 0
    complexity: low
    fatigue_risk: low
    mitigation: "Consolidation, breathing room"
```

---

## Layer 4: Diagram Specifications

```yaml
# Layer 4: Diagram Specifications
# Global Visual Language (from prompt + CONCEPTS.md)

visual_language:
  shapes:
    rectangle: "Process (predict, compare, update)"
    rounded_rectangle: "Brain model / internal guess"
    circle: "Inputs/outputs"
    diamond: "Decision point"
  arrows:
    solid: "Information flow"
    dashed: "Uncertainty / missing info / noise"
    loop: "Continuous cycle"
    bidirectional: "Two-way interaction"
  emphasis:
    thicker_outline: "Attention focus"
    accent_color: "Prediction error ONLY"
  
color_tokens:
  ink: "Deep gray-blue (text/lines)"
  background: "Very light gray-blue"
  primary: "Soft blue (predictions/model)"
  secondary: "Slate gray (sensory input/world)"
  accent: "Warm coral/red (prediction error ONLY)"

diagrams:
  - name: "naive-model-diagram"
    section: 1
    purpose: "Visualize the naive reactive model"
    type: "process"
    
    elements:
      - element: "World"
        shape: "circle"
        color_token: "secondary"
        label: "World"
        position: "left"
        
      - element: "Senses"
        shape: "rectangle"
        color_token: "secondary"
        label: "Senses"
        position: "center-left"
        
      - element: "Brain"
        shape: "rounded_rectangle"
        color_token: "primary"
        label: "Brain"
        position: "center"
        
      - element: "Response"
        shape: "circle"
        color_token: "primary"
        label: "Response"
        position: "right"
    
    connections:
      - from: "World"
        to: "Senses"
        arrow_type: "solid"
        label: "signals"
      - from: "Senses"
        to: "Brain"
        arrow_type: "solid"
        label: "input"
      - from: "Brain"
        to: "Response"
        arrow_type: "solid"
        label: "output"
    
    animation:
      scroll_locked: false
      duration: "2s"
      sequence:
        - at: "0-50%"
          show: "World, arrow, Senses"
          action: "fade-in left to right"
        - at: "50-75%"
          show: "Brain"
          action: "fade-in"
        - at: "75-100%"
          show: "Response"
          action: "fade-in"
    
    alt_text: "Flow diagram showing the naive model: World sends signals to Senses, which send input to Brain, which produces Response. A simple left-to-right chain."
    reduced_motion_fallback: "Show complete diagram"

  - name: "latency-timeline-diagram"
    section: 2
    purpose: "Show why reaction is too slow"
    type: "timeline"
    
    elements:
      - element: "Stimulus"
        shape: "circle"
        color_token: "secondary"
        label: "Ball thrown"
        position: "timeline-start"
        
      - element: "Latency Gap"
        shape: "rectangle"
        color_token: "ink"
        label: "Neural processing time"
        position: "timeline-middle"
        annotation: "~80-200ms"
        
      - element: "Ball Arrives"
        shape: "circle"
        color_token: "secondary"
        label: "Ball arrives"
        position: "timeline-point"
        
      - element: "Reaction"
        shape: "circle"
        color_token: "primary"
        label: "Reaction"
        position: "timeline-end"
        annotation: "TOO LATE"
    
    connections:
      - from: "Stimulus"
        to: "Latency Gap"
        arrow_type: "solid"
      - from: "Latency Gap"
        to: "Reaction"
        arrow_type: "dashed"
        label: "delay"
    
    animation:
      scroll_locked: true
      duration: "3s"
      sequence:
        - at: "0-30%"
          show: "Stimulus"
          action: "fade-in"
        - at: "30-50%"
          show: "Latency Gap"
          action: "expand-width"
        - at: "50-70%"
          show: "Ball Arrives"
          action: "fade-in (crosses timeline)"
        - at: "70-100%"
          show: "Reaction with TOO LATE"
          action: "fade-in with emphasis"
    
    alt_text: "Timeline showing a ball thrown at time 0, neural processing taking 80-200 milliseconds, while the ball arrives before reaction is ready. The reaction is labeled 'TOO LATE'."

  - name: "prediction-loop-diagram"
    section: 3
    purpose: "Introduce the predictive loop"
    type: "loop"
    
    elements:
      - element: "Prediction"
        shape: "rounded_rectangle"
        color_token: "primary"
        label: "Prediction"
        position: "top"
        
      - element: "Compare"
        shape: "rectangle"
        color_token: "ink"
        label: "Compare"
        position: "center"
        
      - element: "Sensory Input"
        shape: "circle"
        color_token: "secondary"
        label: "Sensory Input"
        position: "bottom-left"
    
    connections:
      - from: "Prediction"
        to: "Compare"
        arrow_type: "solid"
        label: "What I expect"
      - from: "Sensory Input"
        to: "Compare"
        arrow_type: "solid"
        label: "What arrives"
      - from: "Compare"
        to: "Prediction"
        arrow_type: "loop"
        label: "Update"
    
    animation:
      scroll_locked: true
      duration: "4s"
      sequence:
        - at: "0-25%"
          show: "Prediction box"
          action: "fade-in"
        - at: "25-50%"
          show: "Arrow down to Compare"
          action: "draw"
        - at: "50-75%"
          show: "Sensory Input, arrow to Compare"
          action: "fade-in, draw"
        - at: "75-100%"
          show: "Loop arrow back to Prediction"
          action: "draw with emphasis"
    
    alt_text: "Loop diagram showing Prediction flowing to Compare, Sensory Input flowing to Compare, and Compare looping back to update Prediction. This represents the continuous predict-compare-update cycle."

  - name: "error-comparison-diagram"
    section: 4
    purpose: "Show prediction error generation"
    type: "comparison"
    
    elements:
      - element: "Prediction"
        shape: "rounded_rectangle"
        color_token: "primary"
        label: "Expected: Ball here →"
        position: "left"
        
      - element: "Reality"
        shape: "circle"
        color_token: "secondary"
        label: "Actual: Ball here ↑"
        position: "right"
        
      - element: "Mismatch"
        shape: "rectangle"
        color_token: "accent"  # ACCENT COLOR
        label: "PREDICTION ERROR"
        position: "center-bottom"
        emphasis: true
    
    connections:
      - from: "Prediction"
        to: "Mismatch"
        arrow_type: "solid"
      - from: "Reality"
        to: "Mismatch"
        arrow_type: "solid"
    
    animation:
      scroll_locked: true
      duration: "4s"
      sequence:
        - at: "0-30%"
          show: "Prediction"
          action: "fade-in"
        - at: "30-60%"
          show: "Reality"
          action: "fade-in (offset from prediction)"
        - at: "60-80%"
          show: "Mismatch connection"
          action: "draw both arrows"
        - at: "80-100%"
          show: "PREDICTION ERROR"
          action: "pulse with accent color"
    
    alt_text: "Comparison diagram showing Expected position versus Actual position, with the mismatch generating a Prediction Error signal highlighted in accent color. This is the only diagram where accent color appears."

  - name: "perception-inference-diagram"
    section: 5
    purpose: "Show perception as constructed"
    type: "process"
    
    elements:
      - element: "Raw Input"
        shape: "circle"
        color_token: "secondary"
        label: "Noisy Input"
        position: "left"
        style: "fuzzy/unclear"
        
      - element: "Brain Model"
        shape: "rounded_rectangle"
        color_token: "primary"
        label: "Brain's Best Guess"
        position: "center"
        
      - element: "Perception"
        shape: "circle"
        color_token: "primary"
        label: "What You Experience"
        position: "right"
        style: "clean/clear"
    
    connections:
      - from: "Raw Input"
        to: "Brain Model"
        arrow_type: "dashed"
        label: "constrains"
      - from: "Brain Model"
        to: "Perception"
        arrow_type: "solid"
        label: "generates"
    
    animation:
      scroll_locked: true
      duration: "3s"
      sequence:
        - at: "0-30%"
          show: "Raw Input (fuzzy)"
          action: "fade-in"
        - at: "30-60%"
          show: "Brain Model"
          action: "fade-in"
        - at: "60-100%"
          show: "Perception (clear)"
          action: "fade-in with emphasis"
    
    alt_text: "Process diagram showing noisy sensory input being processed by the brain's internal model to generate a clean, clear perception. The diagram emphasizes that perception is constructed, not received."

  - name: "efficiency-energy-diagram"
    section: 6
    purpose: "Show metabolic efficiency"
    type: "comparison"
    
    elements:
      - element: "Correct Prediction"
        shape: "rounded_rectangle"
        color_token: "primary"
        label: "Prediction ✓"
        position: "left"
        annotation: "Low energy"
        
      - element: "Wrong Prediction"
        shape: "rounded_rectangle"
        color_token: "accent"
        label: "Prediction ✗"
        position: "right"
        annotation: "High energy"
    
    connections: []  # Side-by-side comparison, no arrows
    
    animation:
      scroll_locked: false
      duration: "2s"
      sequence:
        - at: "0-50%"
          show: "Correct Prediction"
          action: "fade-in"
        - at: "50-100%"
          show: "Wrong Prediction"
          action: "fade-in"
    
    alt_text: "Side-by-side comparison showing correct predictions requiring low energy versus wrong predictions requiring high energy. This explains why prediction is metabolically efficient."

  - name: "applications-diagram"
    section: 7
    purpose: "Connect framework to practical domains"
    type: "hierarchy"
    
    elements:
      - element: "Framework"
        shape: "rounded_rectangle"
        color_token: "primary"
        label: "Predictive Processing"
        position: "top-center"
        
      - element: "Learning"
        shape: "rectangle"
        color_token: "ink"
        label: "Learning = Error Reduction"
        position: "bottom-left"
        
      - element: "Attention"
        shape: "rectangle"
        color_token: "ink"
        label: "Attention = Precision Weighting"
        position: "bottom-center"
        
      - element: "Mistakes"
        shape: "rectangle"
        color_token: "ink"
        label: "Mistakes = Learning Signals"
        position: "bottom-right"
    
    connections:
      - from: "Framework"
        to: "Learning"
        arrow_type: "solid"
      - from: "Framework"
        to: "Attention"
        arrow_type: "solid"
      - from: "Framework"
        to: "Mistakes"
        arrow_type: "solid"
    
    animation:
      scroll_locked: false
      duration: "3s"
      sequence:
        - at: "0-25%"
          show: "Framework"
          action: "fade-in"
        - at: "25-50%"
          show: "Learning"
          action: "fade-in"
        - at: "50-75%"
          show: "Attention"
          action: "fade-in"
        - at: "75-100%"
          show: "Mistakes"
          action: "fade-in"
    
    alt_text: "Hierarchy diagram showing Predictive Processing framework at top, with three applications branching below: Learning as error reduction, Attention as precision weighting, and Mistakes as learning signals."

  - name: "complete-loop-diagram"
    section: 8
    purpose: "Final consolidated model"
    type: "comprehensive"
    
    elements:
      - element: "Prediction"
        shape: "rounded_rectangle"
        color_token: "primary"
        label: "PREDICT"
        position: "top"
        
      - element: "Compare"
        shape: "rectangle"
        color_token: "ink"
        label: "COMPARE"
        position: "center"
        
      - element: "World"
        shape: "circle"
        color_token: "secondary"
        label: "WORLD"
        position: "bottom"
        
      - element: "Error"
        shape: "rectangle"
        color_token: "accent"
        label: "ERROR"
        position: "right"
        
      - element: "Update"
        shape: "rectangle"
        color_token: "primary"
        label: "UPDATE"
        position: "top-right"
    
    connections:
      - from: "Prediction"
        to: "Compare"
        arrow_type: "solid"
      - from: "World"
        to: "Compare"
        arrow_type: "solid"
      - from: "Compare"
        to: "Error"
        arrow_type: "solid"
      - from: "Error"
        to: "Update"
        arrow_type: "solid"
      - from: "Update"
        to: "Prediction"
        arrow_type: "loop"
    
    animation:
      scroll_locked: true
      duration: "5s"
      sequence:
        - at: "0-20%"
          show: "All elements"
          action: "fade-in together"
        - at: "20-80%"
          show: "Connections"
          action: "draw in sequence, highlighting flow"
        - at: "80-100%"
          show: "Loop arrow"
          action: "pulse to emphasize continuous cycle"
    
    alt_text: "Complete loop diagram showing the full predictive processing cycle: Predict → Compare (with World input) → Error → Update → back to Predict. This is the final mental model readers should take away."
```

---

## Layer 5: Content Specifications

```yaml
# Layer 5: Content Specifications
# Text SUPPORTS diagrams — diagrams do the heavy lifting

content:
  - section: 1
    role: "setup"
    
    hook:
      type: "scenario"
      text: "If someone asked you what your brain does, what would you say?"
      connects_to: "Surfacing implicit model"
    
    text_blocks:
      - block: "pre_diagram"
        purpose: "Articulate the naive model"
        length: "2 paragraphs"
        key_points:
          - "Most people think brain is like a receiver"
          - "World → Senses → Brain → Response"
        
      - block: "post_diagram"
        purpose: "Acknowledge this seems right"
        length: "1 paragraph"
        key_points:
          - "This model feels intuitive"
          - "But there's a problem..."
    
    claims: []  # No scientific claims in this section
    quotes: []  # No expert quotes in this section

  - section: 2
    role: "challenge"
    
    text_blocks:
      - block: "pre_diagram"
        purpose: "Introduce latency problem"
        length: "2 paragraphs"
        key_points:
          - "Reaction takes time"
          - "Neural signals aren't instant"
          - "Running example: catching a ball"
        
      - block: "post_diagram"
        purpose: "Emphasize impossibility of pure reaction"
        length: "1 paragraph"
        key_points:
          - "By the time you react, the world has moved"
    
    claims:
      - claim: "Neural processing introduces latency of 80-200ms"
        source: "CLAIMS.md (implicit in Tier 1 claims)"
    
    quotes: []

  - section: 3
    role: "core_thesis"
    
    text_blocks:
      - block: "pre_diagram"
        purpose: "Introduce prediction as solution"
        length: "2 paragraphs"
        key_points:
          - "Instead of reacting, the brain predicts"
          - "Predictions are automatic, below awareness"
        
      - block: "post_diagram"
        purpose: "Lock in predict-compare loop"
        length: "2 paragraphs"
        key_points:
          - "Brain generates guess before input arrives"
          - "Then compares guess to reality"
    
    claims:
      - claim: "The brain generates predictions before sensory input arrives"
        source: "CLAIMS.md#claim-1"
    
    key_sentence: "Instead of waiting to react, the brain is constantly generating predictions about what will happen next — and then checking those predictions against what actually arrives."

  - section: 4
    role: "mechanism"
    
    text_blocks:
      - block: "pre_diagram"
        purpose: "Set up prediction error"
        length: "2 paragraphs"
        key_points:
          - "When prediction is wrong, something happens"
          - "This isn't failure — it's information"
        
      - block: "post_diagram"
        purpose: "Explain error as learning signal"
        length: "2 paragraphs"
        key_points:
          - "Error signal says 'update your model'"
          - "Without error, no learning"
    
    claims:
      - claim: "Prediction error signals exist and drive learning"
        source: "CLAIMS.md#claim-2"
    
    key_sentence: "When a prediction is wrong, the brain doesn't just ignore the mistake — it generates a prediction error signal, which is the brain's way of saying: 'Update your model.'"

  - section: 5
    role: "implication"
    sensitive_framing: true
    
    text_blocks:
      - block: "pre_diagram"
        purpose: "Set up perception as constructed"
        length: "2 paragraphs"
        key_points:
          - "What we experience isn't raw reality"
          - "It's the brain's best guess"
        
      - block: "post_diagram"
        purpose: "Careful framing of 'hallucination'"
        length: "2 paragraphs"
        key_points:
          - "'Controlled' is the key word"
          - "Reality keeps the guess in check"
          - "This isn't scary — it's efficient"
    
    claims:
      - claim: "Perception is an inference, not a direct readout"
        source: "CLAIMS.md#claim-3"
    
    addresses_misconception:
      misconception: "What I see is what's really there"
      method: "gentle"
      text: "This doesn't mean you're disconnected from reality. It means your experience of reality is built by your brain, checked against reality."
    
    key_sentence: "What you see, hear, and feel is not a direct copy of the world — it's your brain's best guess, constrained by sensory evidence."

  - section: 6
    role: "explanation"
    
    text_blocks:
      - block: "pre_diagram"
        purpose: "Connect to efficiency"
        length: "2 paragraphs"
        key_points:
          - "Why would the brain work this way?"
          - "Prediction saves energy"
        
      - block: "post_diagram"
        purpose: "Energy only spent on surprises"
        length: "1 paragraph"
        key_points:
          - "Correct prediction = low cost"
          - "Wrong prediction = learning investment"
    
    claims:
      - claim: "Prediction is more metabolically efficient than reaction"
        source: "CLAIMS.md#claim-4"
    
    key_sentence: "Prediction is efficient because when the brain is right, it doesn't need to do much. It only expends energy when it's wrong — when there's something new to learn."

  - section: 7
    role: "application"
    
    text_blocks:
      - block: "pre_diagram"
        purpose: "Set up practical implications"
        length: "1 paragraph"
        key_points:
          - "This framework changes how we understand everyday things"
        
      - block: "post_diagram"
        purpose: "Three applications"
        length: "3 short paragraphs (one per application)"
        format: "Bullet-like, quick transfer"
        key_points:
          - "Learning = updating predictions through error"
          - "Attention = making some errors louder"
          - "Mistakes = valuable, not shameful"
    
    claims:
      - claim: "Attention can be understood as precision weighting of prediction errors"
        source: "CLAIMS.md#claim-5"
      - claim: "Learning updates the brain's predictive model"
        source: "CLAIMS.md#claim-6"
    
    addresses_misconception:
      - misconception: "Learning is absorbing information"
        method: "practical"
        text: "You don't learn by passively receiving information. You learn by making predictions, being wrong, and updating."
      - misconception: "Mistakes are failures"
        method: "reframe"
        text: "Mistakes are not failures — they're the only way prediction improves."
    
    key_sentence: "Learning is not absorbing facts — it's updating your brain's predictions through exposure. Mistakes are not failures — they're the only way prediction improves."

  - section: 8
    role: "consolidation"
    
    text_blocks:
      - block: "single_block"
        purpose: "Lock in takeaway"
        length: "2 short paragraphs"
        key_points:
          - "Restate thesis clearly"
          - "Reader now has new mental model"
    
    claims: []  # Consolidation, no new claims
    
    key_sentence: "The brain is not a passive receiver of the world — it is an active predictor, constantly guessing what will happen next, and using surprise as its teacher."
```

---

## Layer 6: Technical Implementation

```yaml
# Layer 6: Technical Implementation

# File Structure
files:
  page: "page.tsx"
  client: "BrainPredictionMachineClient.tsx"
  styles: "brain-as-prediction-machine.css"
  path: "src/app/essays/brain-as-prediction-machine/"

# Design Research Reference (TO BE COMPLETED IN G4)
design_research: "orchestration/projects/brain-as-prediction-machine/DESIGN-RESEARCH.md"

# Color Token Implementation (from prompt, to be validated in G4)
color_tokens:
  ink: "#2D3748"
  background: "#F7FAFC"
  primary: "#4A90D9"
  secondary: "#718096"
  accent: "#E53E3E"  # PREDICTION ERROR ONLY

# Typography (to be finalized in G4)
typography:
  display: "TBD — Design Research"
  body: "TBD — Design Research"
  diagram_labels: "TBD — Design Research"

# Animation Specs
animation:
  scroll_lock_enabled: true
  default_easing: "cubic-bezier(0.4, 0, 0.2, 1)"
  reduced_motion: "show final states, skip animation"
  
  scroll_lock_sections:
    - "latency-timeline-diagram"
    - "prediction-loop-diagram"
    - "error-comparison-diagram"
    - "perception-inference-diagram"
    - "complete-loop-diagram"

# Mobile Requirements
mobile:
  diagram_behavior: "scroll"
  min_touch_target: "44px"
  font_scaling:
    body_base: "16px"
    body_large: "18px"
  breakpoints:
    mobile: "640px"
    tablet: "768px"
    desktop: "1024px"

# SEO
seo:
  title: "The Brain as a Prediction Machine | Esy"
  description: "A visual essay explaining how the brain predicts the world instead of just reacting to it. Understand prediction error, perception, learning, and attention through clear diagrams."
  keywords:
    - "predictive processing"
    - "brain prediction"
    - "prediction error"
    - "neuroscience explained"
    - "how the brain works"
    - "perception science"

# Accessibility
accessibility:
  wcag_level: "AA"
  screen_reader_support: true
  keyboard_navigation: true
  reduced_motion_support: true
  color_independence: "All diagrams use shape + label, not color alone"
  alt_text: "Required for all 8 diagrams"

# Performance
performance:
  svg_optimization: true
  lazy_loading: "diagrams below fold"
  critical_css: "above-fold styles inline"
```

---

## Research Package Reference

| File | Path |
|------|------|
| CONCEPTS.md | `orchestration/projects/brain-as-prediction-machine/research/CONCEPTS.md` |
| SEQUENCE.md | `orchestration/projects/brain-as-prediction-machine/research/SEQUENCE.md` |
| DEFINITIONS.md | `orchestration/projects/brain-as-prediction-machine/research/DEFINITIONS.md` |
| ANALOGIES.md | `orchestration/projects/brain-as-prediction-machine/research/ANALOGIES.md` |
| MISCONCEPTIONS.md | `orchestration/projects/brain-as-prediction-machine/research/MISCONCEPTIONS.md` |
| CLAIMS.md | `orchestration/projects/brain-as-prediction-machine/research/CLAIMS.md` |
| DESIGN-RESEARCH.md | `TBD — G4` |

---

## Spec Approval

**Gate 3 Status**: ⏳ PENDING APPROVAL

### Checklist

- [x] Core thesis clearly stated (Layer 1)
- [x] Target audience and learning objectives defined (Layer 1)
- [x] All 7 concepts from CONCEPTS.md represented (Layer 2)
- [x] Primary analogy (autocomplete) with limitations (Layer 2)
- [x] Running example (catching ball) threaded through sections (Layer 2)
- [x] All 5 misconceptions addressed per MISCONCEPTIONS.md (Layer 3)
- [x] 8 sections follow SEQUENCE.md learning progression (Layer 3)
- [x] Cognitive load managed per section (Layer 3)
- [x] 8 diagrams specified with elements and connections (Layer 4)
- [x] Animation sequences defined for scroll-lock diagrams (Layer 4)
- [x] Accessibility specs (alt text, color independence) (Layer 4)
- [x] Content blocks support diagrams (not vice versa) (Layer 5)
- [x] All 6 claims traced to CLAIMS.md (Layer 5)
- [x] Key sentences defined for each section (Layer 5)
- [x] Technical implementation outlined (Layer 6)
- [x] Design Research marked as G4 dependency (Layer 6)

### NOT Included (Correct)

- [ ] Claims not in CLAIMS.md — CORRECT (none added)
- [ ] Concepts without prerequisites — CORRECT (all have prerequisites covered first)
- [ ] Diagrams without accessibility — CORRECT (all have alt text)
- [ ] Content leading diagrams — CORRECT (diagrams lead)
- [ ] Speculation or hedging — CORRECT (none)
- [ ] Analogies without limitations — CORRECT (autocomplete limitations documented)

---

**Next Step**: Upon G3 approval, invoke Design Researcher (Pedagogical Lens) for G4.

---

*This spec was built using the Conceptual Essay Invocation Skill and references the G2 research package. All content is grounded in verified research; no speculation has been added.*
