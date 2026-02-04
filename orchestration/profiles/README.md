# Orchestration Profiles

> Created: February 2026

## Overview

Profiles are **composable modules** that define what specific gates produce for different artifact types. They enable orchestrators to share common patterns while customizing domain-specific behavior.

## Architecture

```
orchestration/
├── base/
│   └── base-artifact-orchestrator.md    ← Universal gates (G1, G5, G8-G9)
│
└── profiles/
    ├── research/                        ← G2 deliverables by domain
    │   ├── historical-research-profile.md
    │   └── conceptual-research-profile.md
    │
    ├── design/                          ← G4 research targets by domain
    │   ├── archival-design-profile.md
    │   └── diagram-design-profile.md
    │
    └── audit/                           ← G6-G7 verification by domain
        ├── citation-audit-profile.md
        ├── accuracy-audit-profile.md
        └── pedagogy-audit-profile.md
```

## Profile Types

### Research Profiles (G2)

Define what the research phase produces:

| Profile | Deliverables | Use Case |
|---------|--------------|----------|
| **Historical** | FIGURES.md, TIMELINE.md, QUOTES.md, VISUALS.md | Biographical/historical essays |
| **Conceptual** | CONCEPTS.md, SEQUENCE.md, DEFINITIONS.md, CLAIMS.md | Explainer/educational essays |
| **Data** | DATASETS.md, METHODOLOGY.md, SOURCES.md | Infographics, data-driven content |

### Design Profiles (G4)

Define what design research produces:

| Profile | Deliverables | Use Case |
|---------|--------------|----------|
| **Archival** | Era treatments, photo sourcing, visual archaeology | Historical/cultural essays |
| **Diagram** | SVG systems, visual language, pedagogical color | Conceptual explainers |
| **DataViz** | Chart types, color scales, annotation patterns | Infographics |

### Audit Profiles (G6-G7)

Define what verification gates check:

| Profile | Verifies | Use Case |
|---------|----------|----------|
| **Citation** | Sources, quotes, links | All citation-heavy content |
| **Accuracy** | Scientific correctness, consensus | Educational/science content |
| **Pedagogy** | Learning effectiveness, progression | Conceptual explainers |
| **Data Integrity** | Data accuracy, methodology | Infographics |

---

## How Orchestrators Compose Profiles

```markdown
# Conceptual Essay Orchestrator

Extends: @orchestration/base/base-artifact-orchestrator.md

## Profile Composition
- Research: @profiles/research/conceptual-research-profile.md
- Design: @profiles/design/diagram-design-profile.md
- Audit: @profiles/audit/accuracy-audit-profile.md
- Audit: @profiles/audit/pedagogy-audit-profile.md
```

---

## Creating New Profiles

When adding support for a new artifact type:

1. **Identify which gates differ** from existing profiles
2. **Create research profile** if G2 deliverables differ
3. **Create design profile** if G4 research targets differ
4. **Create audit profile** if G6-G7 verification differs
5. **Create orchestrator** that composes the profiles
6. **Update this README** with new profile

---

## See Also

- [base-artifact-orchestrator.md](../base/base-artifact-orchestrator.md) — Universal gate patterns
- [visual-essay-orchestrator.md](../agents/orchestrators/visual-essay-orchestrator.md) — Historical essay example
- [conceptual-essay-orchestrator.md](../agents/orchestrators/conceptual-essay-orchestrator.md) — Conceptual essay example

---

## Last Updated
February 2026
