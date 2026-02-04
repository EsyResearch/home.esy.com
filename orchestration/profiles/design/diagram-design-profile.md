# Diagram Design Profile

> Created: February 2026

## Overview

This profile defines the **G4 design research targets** for conceptual explainer essays — educational content that teaches through diagrams rather than archival photography. Instead of visual archaeology of historical materials, this profile researches effective visualization approaches for abstract concepts.

## Use Cases

- Science explainers with process diagrams
- Technical concepts with system diagrams
- Abstract ideas with conceptual visualizations
- Educational content with progressive reveals

---

## G4: Diagram Design Research

### Purpose

Research and define the visual language for explaining abstract concepts:
- Educational visualization conventions
- Diagram language system (shapes, arrows, colors)
- Pedagogical color psychology
- Animation principles for learning
- SVG blueprint specifications

---

## Design Research Targets

### Instead of Historical Visual Archaeology...

| Archival Design Profile | Diagram Design Profile |
|------------------------|----------------------|
| Museum collections | Educational visualization research |
| Archival photography | Scientific illustration conventions |
| Era-specific materials | Domain-appropriate visual language |
| Historical color associations | Pedagogical color psychology |
| Cultural visual motifs | Diagram element semantics |

---

## Research Phases

### Phase 1: Domain Visual Language Research (30%)

**What to Research**:
- How does this domain visualize concepts? (textbooks, papers, educational media)
- What diagram conventions already exist?
- What visual metaphors are standard?
- What colors are associated with this subject?

**Deliverables**:
- Domain visualization survey
- Existing convention analysis
- Visual precedent collection

### Phase 2: Diagram Language System Design (25%)

**What to Define**:
- Shape semantics (what shapes mean what)
- Arrow/connection semantics
- Color token system with semantic meaning
- Label and annotation conventions
- Grouping and hierarchy patterns

**Deliverables**:
- Diagram Language Specification

### Phase 3: Pedagogical Color Psychology (20%)

**What to Research**:
- What colors aid comprehension in this domain?
- What colors signal importance, error, process?
- What color blindness considerations apply?
- What background/foreground combinations maximize readability?

**Deliverables**:
- Color Token System with semantic rationale

### Phase 4: Animation Philosophy (15%)

**What to Define**:
- How do concepts build/reveal?
- What timing supports comprehension?
- What easing feels "cognitive"?
- How do diagrams animate to show process?

**Deliverables**:
- Animation Principles Document

### Phase 5: SVG Blueprint Specification (10%)

**What to Define**:
- Specific diagrams needed
- Element specifications for each
- Animation sequences
- Responsive considerations

**Deliverables**:
- SVG Blueprint per major diagram

---

## Diagram Language Specification Template

```markdown
# Diagram Language: [Topic]

## Shape Semantics

| Shape | Meaning | Example Use |
|-------|---------|-------------|
| Rectangle | Process/Action | "Predict", "Compare", "Update" |
| Rounded Rectangle | State/Model | "Brain's internal model" |
| Circle | Input/Output | "Sensory input", "Motor output" |
| Diamond | Decision | "Match?" |
| Hexagon | External entity | "Environment" |

## Arrow Semantics

| Arrow Type | Meaning | Example |
|------------|---------|---------|
| Solid → | Information flow | Data moving between processes |
| Dashed → | Uncertainty/Hypothesis | Predicted vs actual |
| Loop ↺ | Continuous cycle | Prediction loop |
| Bidirectional ↔ | Two-way interaction | Feedback |

## Color Token System

| Token | Hex | Semantic Meaning | Usage |
|-------|-----|------------------|-------|
| `--diagram-primary` | #XXX | Main process flow | Primary elements |
| `--diagram-secondary` | #XXX | Supporting elements | Labels, context |
| `--diagram-accent` | #XXX | Attention/Error | Prediction error, highlights |
| `--diagram-muted` | #XXX | Background context | Inactive, past states |
| `--diagram-success` | #XXX | Correct/Match | When prediction matches |
| `--diagram-error` | #XXX | Mismatch/Update needed | Prediction error signal |

## Grouping Conventions

- Dashed border = conceptual grouping
- Solid border = functional unit
- Background shading = phase/stage
- Proximity = relationship strength

## Label Conventions

- Process labels: Verb phrase ("Generate prediction")
- State labels: Noun phrase ("Internal model")
- Arrow labels: Short descriptor ("sensory data")
- Font: [Specified font for diagram labels]
```

---

## Animation Principles Template

```markdown
# Animation Principles: [Topic]

## Overall Philosophy

The diagrams should animate to show [core principle — e.g., "continuous prediction cycle"].

Animation should feel like: "[metaphor — e.g., thinking, learning, discovering]"

## Reveal Strategy

### Progressive Build
1. Start with [foundation element]
2. Add [next layer]
3. Introduce [complexity]
4. Show [full system]

### Timing Principles

| Animation Type | Duration | Easing | Rationale |
|---------------|----------|--------|-----------|
| Element appear | 400ms | ease-out | Gentle introduction |
| Arrow draw | 600ms | ease-in-out | Shows directionality |
| Highlight pulse | 1000ms | ease-in-out | Draws attention |
| State change | 300ms | ease-out | Quick feedback |

## Scroll-Lock Diagram Sequences

### Sequence 1: [Name]
- **Trigger**: Scroll to [section]
- **0-20%**: [Initial state]
- **20-50%**: [Building]
- **50-80%**: [Key reveal]
- **80-100%**: [Complete view]

## Reduced Motion Fallback

For users with `prefers-reduced-motion`:
- Show final state immediately
- Use opacity transitions only
- No movement animations
```

---

## SVG Blueprint Template

```markdown
# SVG Blueprint: [Diagram Name]

## Purpose
[What this diagram explains]

## Elements

### Element 1: [Name]
- **Shape**: [Rectangle/Circle/etc.]
- **Size**: [Dimensions]
- **Position**: [Relative position]
- **Color**: [Token reference]
- **Label**: [Text content]
- **Animation**: [How it animates]

### Element 2: ...

## Connections

### Connection 1: [From] → [To]
- **Arrow type**: [Solid/Dashed]
- **Label**: [If any]
- **Animation**: [Draw timing]

## Animation Sequence

1. [Step 1 description]
2. [Step 2 description]
3. ...

## Responsive Behavior

- **Desktop**: [Full layout]
- **Tablet**: [Adjustments]
- **Mobile**: [Simplified or stacked]
```

---

## G4 Gate Checklist

Before proceeding to G4.5 (Diagram Specification):

- [ ] Domain visualization research complete
- [ ] Diagram Language Specification defined
- [ ] Shape semantics documented
- [ ] Arrow semantics documented
- [ ] Color Token System with semantic rationale
- [ ] Animation Principles defined
- [ ] Timing and easing specified
- [ ] Reduced motion fallback planned
- [ ] SVG Blueprints for major diagrams

**G4 Status**: ⏳ Pending / ✅ Approved / ❌ Rejected

---

## G4.5: Diagram Specification

After G4 design research, G4.5 produces detailed SVG specifications:

- [ ] SVG Blueprint for each major diagram
- [ ] Element specifications complete
- [ ] Animation sequences documented
- [ ] Responsive behavior defined
- [ ] Accessibility considerations addressed

**G4.5 Status**: ⏳ Pending / ✅ Approved / ❌ Rejected

---

## Comparison to Archival Design Profile

| Archival Design Profile | Diagram Design Profile |
|------------------------|----------------------|
| Visual archaeology | Domain viz research |
| Era treatments | N/A (no eras) |
| Photo sourcing | SVG blueprints |
| Archival color derivation | Pedagogical color system |
| Historical typography | Clarity-focused typography |
| Museum references | Textbook/paper references |

---

## See Also

- [design-researcher.md](../../agents/research/design-researcher.md) — Agent with Diagram Lens
- [archival-design-profile.md](./archival-design-profile.md) — Comparison profile
- [conceptual-essay-orchestrator.md](../../agents/orchestrators/conceptual-essay-orchestrator.md) — Uses this profile

---

## Last Updated
February 2026
