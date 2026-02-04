# Conceptual Essay Workflow Implementation

> **Date**: February 3, 2026  
> **Branch**: `conceptual-explainer-workflow`  
> **Status**: Complete, pending merge to `qa`

---

## Summary

Implemented a new workflow for **conceptual/educational visual essays** — content that explains abstract concepts through diagrams rather than historical narratives. This workflow is designed for essays like "The Brain as a Prediction Machine" that teach complex topics to audiences with little domain background.

---

## Problem Statement

The existing `visual-essay-orchestrator.md` was designed for **historical/biographical essays** with:
- FIGURES.md (key people)
- TIMELINE.md (events)
- Archival photography
- Citation-focused auditing

For **conceptual essays**, we need different deliverables:
- CONCEPTS.md (abstract ideas)
- SEQUENCE.md (learning progression)
- CLAIMS.md (verified scientific facts)
- SVG diagrams (not photography)
- Accuracy and pedagogy auditing

---

## Architecture Decision

### Option Considered: Refactor visual-essay-orchestrator.md

**Rejected** — Too risky, would affect all existing essays. Documented in `FUTURE-WORK.md` for later.

### Option Chosen: Compositional Architecture

Created a layered system:

```
orchestration/
├── base/
│   └── base-artifact-orchestrator.md    ← Universal gates (G1, G5, G8-G9)
│
├── profiles/
│   ├── research/
│   │   └── conceptual-research-profile.md   ← G2 deliverables
│   └── design/
│       └── diagram-design-profile.md        ← G4 targets
│
└── agents/orchestrators/
    ├── visual-essay-orchestrator.md         ← Historical (unchanged)
    └── conceptual-essay-orchestrator.md     ← NEW: Conceptual essays
```

This allows future artifact types (infographics, web templates) to reuse base patterns.

---

## Files Created

### Base Architecture (2 files)

| File | Purpose | Lines |
|------|---------|-------|
| `orchestration/base/base-artifact-orchestrator.md` | Universal gates, quality framework, templates | ~400 |
| `orchestration/base/README.md` | Base directory documentation | ~50 |

### Profiles (3 files)

| File | Purpose | Lines |
|------|---------|-------|
| `orchestration/profiles/README.md` | Profiles system overview | ~100 |
| `orchestration/profiles/research/conceptual-research-profile.md` | G2 deliverables (CONCEPTS, SEQUENCE, CLAIMS, etc.) | ~300 |
| `orchestration/profiles/design/diagram-design-profile.md` | G4 targets (diagram language, color tokens, SVG blueprints) | ~350 |

### New Agents (5 files)

| File | Category | Gate Owned | Purpose |
|------|----------|------------|---------|
| `agents/orchestrators/conceptual-essay-orchestrator.md` | Orchestrator | G1, G3, G9 | Main pipeline coordinator |
| `agents/research/concept-research-agent.md` | Research | G2 | Concept verification, learning sequences |
| `agents/auditors/accuracy-audit-agent.md` | Auditor | G6 | Scientific claim verification |
| `agents/auditors/pedagogy-audit-agent.md` | Auditor | G6.5 | Learning effectiveness |
| `agents/auditors/diagram-clarity-auditor.md` | Auditor | G7 | Diagram consistency, accessibility |

### New Skill (2 files)

| File | Purpose |
|------|---------|
| `skills/conceptual-essay-invocation/SKILL.md` | 6-layer spec architecture for conceptual essays |
| `skills/conceptual-essay-invocation/README.md` | Skill quick reference |

### Documentation (1 file)

| File | Purpose |
|------|---------|
| `orchestration/FUTURE-WORK.md` | Documents deferred refactoring work |

---

## Files Modified

### Extended Agents (1 file)

| File | Changes |
|------|---------|
| `agents/research/design-researcher.md` | Added **Pedagogical Lens** section for conceptual essays |

### Updated READMEs (6 files)

| File | Changes |
|------|---------|
| `orchestration/README.md` | Added base/, profiles/ to directory structure |
| `agents/AGENT-REGISTRY.md` | Added 5 new agents (44→49 total) |
| `agents/orchestrators/README.md` | Added Conceptual Essay Orchestrator, dual pipeline |
| `agents/research/README.md` | Added Concept Research Agent, Pedagogical Lens |
| `agents/auditors/README.md` | Added 3 new auditors |
| `skills/README.md` | Added conceptual-essay-invocation skill |

---

## Quality Gates Comparison

### Visual Essay Pipeline (Historical)

| Gate | Name | Owner |
|------|------|-------|
| G1 | Intake Approval | Visual Essay Orchestrator |
| G2 | Research Complete | Research Orchestrator |
| G3 | Spec Approval | Visual Essay Orchestrator |
| G4 | Design Research | Design Researcher (Archival Lens) |
| G5 | Content Complete | Production Orchestrator |
| G6 | Citation Audit | Citation Audit Agent |
| G7 | Scroll Certification | Immersive Scrolling Auditor |
| G8 | Publication Certification | Publish Artifact Orchestrator |
| G9 | Publication Approval | Visual Essay Orchestrator |

### Conceptual Essay Pipeline (Educational)

| Gate | Name | Owner |
|------|------|-------|
| G1 | Intake Approval | Conceptual Essay Orchestrator |
| G2 | Concept Research Complete | **Concept Research Agent** |
| G3 | Spec Approval | Conceptual Essay Orchestrator |
| G4 | Design Research | Design Researcher (**Pedagogical Lens**) |
| G4.5 | Diagram Specification | Design Researcher |
| G5 | Content Complete | Production Orchestrator |
| G6 | **Accuracy Audit** | **Accuracy Audit Agent** |
| G6.5 | **Pedagogy Audit** | **Pedagogy Audit Agent** |
| G7 | **Diagram Clarity Audit** | **Diagram Clarity Auditor** |
| G7.5 | Scroll Certification | Immersive Scrolling Auditor |
| G8 | Publication Certification | Publish Artifact Orchestrator |
| G9 | Publication Approval | Conceptual Essay Orchestrator |

---

## Research Deliverables Comparison

### Historical (FIGURES, TIMELINE, QUOTES)

```
research/
├── FIGURES.md       ← Key people with imagery
├── TIMELINE.md      ← Chronological events
├── QUOTES.md        ← Historical quotes
├── VISUALS.md       ← Archival photo sources
├── ERA-GUIDE.md     ← Period treatments
└── CITATIONS.md     ← All sources
```

### Conceptual (CONCEPTS, SEQUENCE, CLAIMS)

```
research/
├── CONCEPTS.md      ← Core concepts + relationships
├── SEQUENCE.md      ← Learning progression
├── DEFINITIONS.md   ← Key terms defined
├── ANALOGIES.md     ← Concrete comparisons + limitations
├── MISCONCEPTIONS.md ← Common errors to address
└── CLAIMS.md        ← Verified facts with sources
```

---

## Design Research Comparison

### Archival Lens (Historical)

- Visual archaeology of subject materials
- Era-appropriate typography
- Colors derived from historical artifacts
- Photo sourcing from archives

### Pedagogical Lens (Conceptual)

- Domain visualization survey
- Diagram language system (shapes, arrows, colors)
- Pedagogical color tokens (semantic meaning)
- SVG blueprints with animation sequences
- Clarity-focused typography

---

## Key Innovations

### 1. Compositional Architecture

Base orchestrator + profiles = extensible system for future artifact types.

### 2. Pedagogical Lens for Design Research

Same Design Researcher agent, different lens application based on essay type.

### 3. Learning-Focused Audits

- **Accuracy Audit**: All claims verified against CLAIMS.md
- **Pedagogy Audit**: Learning sequence follows prerequisites, misconceptions addressed
- **Diagram Clarity**: Visual language consistent, accessible

### 4. CLAIMS.md Instead of QUOTES.md

For conceptual essays, we verify scientific claims with sources rather than historical quotes.

---

## Agent Statistics Update

| Category | Before | After | Delta |
|----------|--------|-------|-------|
| Orchestrators | 5 | 6 | +1 |
| Research | 4 | 5 | +1 |
| Auditors | 16 | 19 | +3 |
| **Total** | **44** | **49** | **+5** |

---

## Usage Example

To create a conceptual essay like "The Brain as a Prediction Machine":

```
Using @agents/orchestrators/conceptual-essay-orchestrator.md, initiate 
production for a conceptual essay about predictive processing in the brain.

Core thesis: The brain is primarily a prediction machine that constantly 
anticipates sensory input and updates its models when predictions fail.

Target audience: First-year college students with no neuroscience background.

Learning objectives:
- Understand prediction as the brain's core function
- Explain prediction error and model updating
- Recognize this framework in everyday perception
```

---

## Future Work

Documented in `orchestration/FUTURE-WORK.md`:

1. **Generic Compositor Refactor** — Refactor visual-essay-orchestrator.md to use base + profiles (2-3 hours, medium risk)
2. **Workflow JSON** — Create `conceptual-essay.json` for runner automation
3. **Conceptual Essay Invocation Agent** — Dedicated agent for building specs from research
4. **Cross-Profile Auditing** — Unified audit profiles for all artifact types

---

## Git History

```
Branch: conceptual-explainer-workflow

Commit 1: feat(orchestration): add conceptual essay workflow
  - Base architecture
  - Profiles
  - New agents
  - New skill
  - FUTURE-WORK.md

Commit 2: docs(orchestration): update all category READMEs with new agents
  - orchestrators/README.md
  - research/README.md
  - auditors/README.md
  - Main README.md
```

---

## Testing Checklist

- [ ] Run conceptual essay workflow manually with "Brain as a Prediction Machine"
- [ ] Verify G2 produces CONCEPTS.md, SEQUENCE.md, CLAIMS.md
- [ ] Verify Design Researcher applies Pedagogical Lens
- [ ] Verify Accuracy Audit catches unverified claims
- [ ] Verify Pedagogy Audit catches sequence violations
- [ ] Verify Diagram Clarity Auditor checks consistency

---

## Merge Instructions

```bash
# After testing:
git checkout qa
git merge conceptual-explainer-workflow
git push origin qa

# After QA approval:
git checkout main
git merge qa
git push origin main
```

---

*This implementation establishes the foundation for diagram-first educational content at Esy, enabling the creation of visual essays that teach complex concepts through carefully sequenced diagrams and verified scientific claims.*
