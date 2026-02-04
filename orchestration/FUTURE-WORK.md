# Future Work: Orchestration System

> Created: February 2026

## Overview

This document tracks planned improvements and refactoring work for the Esy orchestration system that were identified but deferred due to scope or complexity.

---

## 1. Generic Compositor Refactor

### Status: Deferred

### Problem Statement

The current `visual-essay-orchestrator.md` contains both:
1. **Universal patterns** (G1 intake, G5 content complete, G8-G9 publication)
2. **Historical-essay-specific patterns** (FIGURES.md, TIMELINE.md, archival photos)

When we created the conceptual essay workflow, we extracted universal patterns to `base-artifact-orchestrator.md` and created a sibling `conceptual-essay-orchestrator.md`. However, the original `visual-essay-orchestrator.md` still contains both universal and specific patterns mixed together.

### Proposed Solution

Refactor `visual-essay-orchestrator.md` into a true **generic compositor**:

```
BEFORE:
visual-essay-orchestrator.md (1700+ lines, mixed universal + historical)

AFTER:
base-artifact-orchestrator.md (universal gates, patterns)
├── visual-essay-orchestrator.md (thin wrapper, historical profile)
├── conceptual-essay-orchestrator.md (thin wrapper, conceptual profile)
├── infographic-orchestrator.md (thin wrapper, data viz profile)
└── [future artifact types]
```

### Work Required

1. **Extract remaining universal patterns** from visual-essay-orchestrator.md to base-artifact-orchestrator.md
2. **Create historical-research-profile.md** extracting FIGURES.md, TIMELINE.md, etc.
3. **Create archival-design-profile.md** extracting photo sourcing, era treatments
4. **Slim down visual-essay-orchestrator.md** to only historical-specific composition
5. **Update all references** to visual-essay-orchestrator.md
6. **Test** that historical visual essays still work

### Estimated Effort

- **Time**: 2-3 hours
- **Risk**: Medium (many existing references to update)
- **Files affected**: 10-15

### Why Deferred

- Current sibling approach works immediately
- Refactor has medium risk of breaking existing workflows
- Can be done incrementally later
- Conceptual workflow was priority

### Decision

Created `conceptual-essay-orchestrator.md` as sibling for now. Refactor can happen when:
- We need a third artifact type (infographics)
- We have bandwidth for thorough testing
- Pattern duplication becomes painful

---

## 2. Workflow JSON for Conceptual Essays

### Status: Planned for after testing

### Problem Statement

The existing workflow runner (`orchestration/runner/`) has `workflows/visual-essay.json` that maps gates to agents for automated prompt packet generation. We need a similar `conceptual-essay.json` for the new workflow.

### Proposed Solution

Create `orchestration/runner/workflows/conceptual-essay.json`:

```json
{
  "name": "conceptual-essay",
  "orchestrator": "conceptual-essay-orchestrator.md",
  "gates": {
    "G1": { "agent": "conceptual-essay-orchestrator.md", "action": "intake" },
    "G2": { "agent": "concept-research-agent.md", "action": "research" },
    "G3": { "agent": "conceptual-essay-invocation-agent.md", "action": "spec" },
    "G4": { "agent": "design-researcher.md", "lens": "pedagogical", "action": "design" },
    "G6": { "agent": "accuracy-audit-agent.md", "action": "audit" },
    "G6.5": { "agent": "pedagogy-audit-agent.md", "action": "audit" },
    "G7": { "agent": "diagram-clarity-auditor.md", "action": "audit" }
  }
}
```

### Work Required

1. Create `conceptual-essay.json` workflow definition
2. Update runner CLI to accept `--workflow conceptual-essay`
3. Create prompt packet templates for new agents
4. Test end-to-end workflow

### Why Deferred

- Need to validate the agents manually first
- Workflow JSON can be added after patterns are proven

---

## 3. Conceptual Essay Invocation Agent

### Status: Placeholder exists, implementation pending

### Problem Statement

The skill `conceptual-essay-invocation/SKILL.md` defines the 6-layer spec structure, but we don't yet have a dedicated agent that builds specs from research packages (like `visual-essay-invocation-agent.md` does for historical essays).

### Proposed Solution

Create `orchestration/agents/utilities/conceptual-essay-invocation-agent.md` that:
- Ingests CONCEPTS.md, SEQUENCE.md, CLAIMS.md, etc.
- Applies SKILL.md template
- Produces `specs/[topic-slug].md`

### Work Required

1. Create agent following META-AGENT-FRAMEWORK
2. Define input/output contract
3. Add to agent registries

### Why Deferred

- Can be done manually for initial conceptual essays
- Agent can be created after first successful essay validates the pattern

---

## 4. Cross-Profile Auditing

### Status: Not started

### Problem Statement

Currently each orchestrator type has its own auditors (citation audit for historical, accuracy audit for conceptual). There's no unified way to audit an artifact regardless of type.

### Proposed Solution

Create audit profiles that can be composed:
- `citation-audit-profile.md` (sources, links)
- `accuracy-audit-profile.md` (scientific claims)
- `pedagogy-audit-profile.md` (learning effectiveness)
- `accessibility-audit-profile.md` (WCAG compliance)

Then orchestrators compose the relevant profiles for their artifact type.

### Work Required

1. Extract common audit patterns to profiles
2. Update existing auditors to reference profiles
3. Create profile composition pattern in orchestrators

### Why Deferred

- Current dedicated auditors work fine
- Can be unified when we have 3+ artifact types

---

## 5. Skills Directory Reorganization

### Status: Under consideration

### Problem Statement

Skills are currently flat under `orchestration/skills/`. As we add more skills (conceptual-essay-invocation, infographic-creation, etc.), a category structure may be helpful.

### Proposed Solution

```
skills/
├── essay/
│   ├── visual-essay-invocation/
│   └── conceptual-essay-invocation/
├── infographic/
│   └── [future]
└── common/
    └── image-url-extraction/
```

### Why Deferred

- Only 2 essay skills currently
- Reorganization can happen when we add infographic skills

---

## Priority Order

When bandwidth is available:

1. **Workflow JSON** (unlocks automated prompt packets for conceptual essays)
2. **Conceptual Essay Invocation Agent** (completes the G3 automation)
3. **Generic Compositor Refactor** (cleanup, enables future artifact types)
4. **Cross-Profile Auditing** (wait for 3+ artifact types)
5. **Skills Reorganization** (wait for 4+ skills)

---

## See Also

- [base-artifact-orchestrator.md](./base/base-artifact-orchestrator.md) — Current universal patterns
- [visual-essay-orchestrator.md](./agents/orchestrators/visual-essay-orchestrator.md) — Historical essays
- [conceptual-essay-orchestrator.md](./agents/orchestrators/conceptual-essay-orchestrator.md) — Conceptual essays
- [profiles/README.md](./profiles/README.md) — Profile system

---

## Last Updated
February 2026
