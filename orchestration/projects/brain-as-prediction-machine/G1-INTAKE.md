# G1 Intake Document: The Brain as a Prediction Machine

> **Date**: February 3, 2026  
> **Orchestrator**: Conceptual Essay Orchestrator  
> **Status**: G1 — PENDING APPROVAL

---

## Project Identification

| Field | Value |
|-------|-------|
| **Working Title** | The Brain as a Prediction Machine |
| **Slug** | `brain-as-prediction-machine` |
| **Type** | Conceptual Visual Essay |
| **Source Prompt** | `orchestration/prompts/the-brain-as-prediction-machine-v1.md` |

---

## Core Thesis

**The brain is not primarily reacting to the world — it is constantly predicting it, and updating itself when it is wrong.**

This thesis must be reinforced throughout every section.

---

## Target Audience

| Attribute | Value |
|-----------|-------|
| **Level** | Beginner (no neuroscience background) |
| **Profile** | First-year college student: smart, curious, easily overwhelmed by jargon |
| **Prior Knowledge** | Basic understanding of brain as organ, no technical knowledge |
| **Reading Level** | Accessible, plain language |

### Implicit Reader Question

> "What is the brain actually doing all day?"

---

## Learning Objectives

After reading this essay, the reader should be able to:

1. **Understand** that the brain's primary function is prediction, not reaction
2. **Explain** what prediction error is and why it matters
3. **Recognize** that perception is the brain's "best guess" constrained by sensory input
4. **Appreciate** why predictive processing is more efficient than reactive processing
5. **Apply** this mental model to understand learning, attention, and mistakes

---

## Scope Definition

### Includes

- The predictive processing framework (conceptual level)
- Prediction error as the learning signal
- Perception as "controlled hallucination" (carefully framed)
- Efficiency benefits of prediction
- Practical implications for learning and attention

### Excludes

- AI/machine learning comparisons
- Bayesian mathematics or formal notation
- Free energy principle
- Brain anatomy tours (no region name-dropping)
- Academic citations or reference lists
- Computational neuroscience terminology

---

## Tone & Style Constraints

### Required Tone

- Calm, confident, explanatory
- Never condescending
- No hype ("mind-blowing," "crazy," "you won't believe")

### Text Constraints

- Short paragraphs only (2-4 sentences preferred, max 5)
- Define terms BEFORE using them
- No unexplained acronyms
- No philosophy jargon
- No math, equations, or formal symbols

### Example Usage

- Use examples sparingly (2-3 total across entire essay)
- Reuse the same example(s) rather than introducing new ones
- One consistent everyday scenario to anchor multiple sections

---

## Visual Requirements

### Primary Medium

**SVG Diagrams** — This is a diagram-led essay where visuals do the explanatory work.

### Diagram Style

- Flat, minimal, educational
- Arrows, blocks, layers, loops
- Neutral palette with ONE accent color for prediction error

### Pre-Defined Visual Language

| Element | Shape | Meaning |
|---------|-------|---------|
| Rectangle | □ | Process (predict, compare, update) |
| Rounded Rectangle | ▢ | Brain model / internal guess |
| Circle | ○ | Inputs/outputs |
| Solid Arrow | → | Information flow |
| Loop Arrow | ↻ | Continuous cycle |
| Accent Color | 🔴 | Prediction error / surprise |
| Dashed Line | - - - | Uncertainty / missing info / noise |
| Thicker Outline | ▭ | Attention focus |

### Pre-Defined Color Tokens

| Token | Usage | Color |
|-------|-------|-------|
| `--ink` | Text/lines | Deep gray-blue |
| `--background` | Canvas | Very light gray-blue |
| `--primary` | Predictions/model | Soft blue |
| `--secondary` | Sensory input/world | Slate gray |
| `--accent` | Prediction error ONLY | Warm coral/red |

### Accessibility

- Labels must be readable and self-explanatory
- Do not rely on color alone (use icons/line styles)
- ALT text required for each diagram

---

## Section Architecture (from prompt)

| Section | Title | Key Concept |
|---------|-------|-------------|
| 1 | The Naive View of the Brain | Common but incorrect assumption |
| 2 | Why Pure Reaction Doesn't Work | Reaction is too slow/inefficient |
| 3 | The Predictive Brain | Introduce prediction as primary job |
| 4 | Prediction Error — The Engine of Learning | Make prediction error intuitive |
| 5 | Perception Is Controlled Hallucination | Careful, non-sensational explanation |
| 6 | Why This Makes the Brain Efficient | Connect to energy and survival |
| 7 | What This Means for Learning, Attention, and Mistakes | Practical applications |
| 8 | Final Mental Model | Lock in the takeaway |

---

## Research Requirements

Based on the Conceptual Research Profile, G2 must produce:

| Deliverable | Purpose |
|-------------|---------|
| `CONCEPTS.md` | Core concepts (prediction, prediction error, model updating) |
| `SEQUENCE.md` | Learning progression (matches 8 sections above) |
| `DEFINITIONS.md` | Key terms (prediction error, perception, attention, etc.) |
| `ANALOGIES.md` | Concrete comparisons with documented limitations |
| `MISCONCEPTIONS.md` | Common errors (brain as passive receiver, reaction-first) |
| `CLAIMS.md` | Verified scientific claims with Tier 1-2 sources |

---

## Design Research Requirements

Based on the Diagram Design Profile (Pedagogical Lens), G4 must conduct **full design research**:

> ⚠️ **IMPORTANT**: The prompt provides design direction as INPUT, not as a replacement for G4. The Design Researcher must still conduct independent research and may confirm, refine, or override the prompt's suggestions.

### G4 Research Activities (Required)

| Activity | Purpose |
|----------|---------|
| **Domain Visualization Survey** | How does neuroscience/cognitive science typically visualize prediction, error, loops? |
| **Pedagogical Color Research** | Is coral/red effective for "error"? What does research say about educational color use? |
| **Shape Semantics Validation** | Are rectangles-for-process and circles-for-I/O standard conventions or arbitrary? |
| **Animation Philosophy Development** | How should diagrams reveal to support learning (not just look good)? |
| **Accessibility Research** | Color blindness considerations, contrast ratios, reduced motion |

### G4 Deliverables (Required)

| Deliverable | Purpose |
|-------------|---------|
| Pedagogical Design Research Report | Complete design system with research-backed rationale |
| Diagram Language Specification | Shape/arrow/color semantics (may differ from prompt if research supports) |
| SVG Blueprints | Detailed specs for each of 8+ diagrams |
| Animation Sequences | Scroll-lock reveal choreography |
| Color Token CSS | Implementation-ready color system |

### Relationship to Prompt Design Direction

| Prompt Says | G4 Must |
|-------------|---------|
| "Use coral/red for error" | Research if this is pedagogically effective, document finding |
| "Rectangles = process" | Validate against domain conventions, confirm or propose alternative |
| "Neutral palette + accent" | Research cognitive load implications, validate or refine |

---

## Quality Gates Overview

| Gate | Name | Owner | Deliverable |
|------|------|-------|-------------|
| G1 | Intake Approval | Conceptual Essay Orchestrator | This document |
| G2 | Concept Research Complete | Concept Research Agent | research/ package |
| G3 | Spec Approval | Conceptual Essay Orchestrator | specs/brain-as-prediction-machine.md |
| G4 | Design Research (Pedagogical) | Design Researcher | DESIGN-RESEARCH.md |
| G4.5 | Diagram Specification | Design Researcher | SVG blueprints |
| G5 | Content Complete | Production Orchestrator | Implementation |
| G6 | Accuracy Audit | Accuracy Audit Agent | Certification |
| G6.5 | Pedagogy Audit | Pedagogy Audit Agent | Certification |
| G7 | Diagram Clarity Audit | Diagram Clarity Auditor | Certification |
| G7.5 | Scroll Certification | Scrolling Auditor | Certification |
| G8 | Publication Certification | Publish Artifact Orchestrator | GO/NO-GO |
| G9 | Publication Approval | Conceptual Essay Orchestrator | Sign-off |

---

## Estimated Scope

| Metric | Estimate |
|--------|----------|
| Read Time | 8-12 minutes |
| Sections | 8 |
| Major Diagrams | 8-10 |
| Word Count | 1,500-2,500 words |
| Complexity | Medium (conceptual, no math) |

---

## G1 Approval Checklist

- [x] Topic is viable for conceptual essay treatment
- [x] Core thesis is clear and falsifiable
- [x] Target audience is well-defined
- [x] Learning objectives are specific and testable
- [x] Scope boundaries are clear (includes/excludes)
- [x] Section architecture aligns with learning sequence
- [x] Visual requirements are specified
- [x] Research requirements identified
- [x] Design research requirements identified

---

## Approval

**G1 Status**: ⏳ PENDING APPROVAL

**Next Step**: Upon approval, invoke Concept Research Agent for G2.

---

*This intake document captures the complete scope and requirements for "The Brain as a Prediction Machine" conceptual essay. All subsequent gates reference this document as the source of truth for project scope.*
