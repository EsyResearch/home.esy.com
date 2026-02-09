# 🔬 Research

Research and source discovery agents that ensure content is built on authoritative foundations.

---

## Agents in This Category

| Agent | Domain | Key Capability |
|-------|--------|----------------|
| [Brainstorming Agent](./brainstorming-agent.md) | Research Design | Question formulation, hypothesis generation, scope definition |
| [Research & Citations](./research-citations-expert.md) | Source Discovery | Tier 1-2 authoritative sources, evaluation, synthesis |
| [Image Research & Licensing](./image-research-licensing-expert.md) | Visual Assets | Public domain image sourcing & rights verification |
| [Design Researcher](./design-researcher.md) | Visual Identity | Subject-derived design (Archival or Pedagogical lens) |
| [Concept Research Agent](./concept-research-agent.md) | Concept Verification | Scientific claims, learning sequences, misconceptions |
| [Visualization Research Agent](./visualization-research-agent.md) | Visualization Blueprints | Domain-specific diagram research, reference exemplars, comprehension tests |

---

## Source Tier System

| Tier | Quality | Examples |
|------|---------|----------|
| Tier 1 | Gold Standard | JSTOR, .edu, peer-reviewed, museums, archives |
| Tier 2 | Highly Credible | NYT, WSJ, Guardian, Britannica, major publishers |
| Tier 3 | Use with Caution | Wikipedia (verify elsewhere), expert blogs |
| Tier 4 | Red Flag (AVOID) | Social media, anonymous, self-published |

**Target:** 80%+ of sources should be Tier 1-2.

---

## Research Pipeline

These agents are orchestrated by the **Research Orchestrator** (`orchestrators/research-orchestrator.md`) during Phase 2 of visual essay production.

```
Research Orchestrator (orchestrators/)
        │
        ├── Phase 1: Brainstorming Agent
        │             └── Research questions, hypotheses, keywords
        │
        ├── Phase 2: Research & Citations Expert
        │             └── Source discovery, evaluation, synthesis
        │             └── Routes to: Regional Experts, Historians
        │
        ├── Phase 3: Citation Audit Agent (auditors/)
        │             └── Link verification, quote validation
        │
        └── Phase 4: Package Assembly
                      └── research/CITATIONS.md, SYNTHESIS.md, etc.
                              │
                              ▼
                      Production Phase (Phase 3)
                      Writers use research package — no fabrication!
```

---

## When to Use

| Scenario | Agent |
|----------|-------|
| Formulate research questions and scope | Brainstorming Agent |
| Find authoritative sources for claims | Research & Citations |
| Source public domain images | Image Research & Licensing |
| Verify image licensing | Image Research & Licensing |
| Upgrade weak sources | Research & Citations |
| **Derive visual identity from subject matter** | Design Researcher (Gate 4) |
| **Research concepts for educational essays** | Concept Research Agent (G2 conceptual) |
| **Full historical research pipeline** | Use Research Orchestrator (orchestrators/) |
| **Full conceptual research pipeline** | Use Conceptual Essay Orchestrator (orchestrators/) |
| **Research how to visualize specific diagrams** | Visualization Research Agent (G4.V) |

---

## Invocation Pattern

**Research & Citations:**
```
Using @agents/research/research-citations-expert.md, find Tier 1-2 sources 
for claims about [TOPIC]. Focus on .edu and peer-reviewed journals.
```

**Design Research (Archival Lens - Historical Essays):**
```
Using @agents/research/design-researcher.md, conduct comprehensive 
design research for visual essay about [TOPIC]. Produce Design Research 
Report with subject-derived color palette, typography, and animation philosophy.
```

**Design Research (Pedagogical Lens - Conceptual Essays):**
```
Using @agents/research/design-researcher.md with Pedagogical Lens,
conduct design research for conceptual essay about [TOPIC].
Produce diagram language system, pedagogical color tokens, SVG blueprints.
```

**Concept Research:**
```
Using @agents/research/concept-research-agent.md, conduct concept
research for educational essay about [TOPIC]. Produce CONCEPTS.md,
SEQUENCE.md, DEFINITIONS.md, ANALOGIES.md, MISCONCEPTIONS.md, CLAIMS.md.
```

**Visualization Research:**
```
Using @agents/research/visualization-research-agent.md, research the 
visualizations specified for [SLUG]. Produce VISUALIZATION-RESEARCH.md 
with structured briefs for all Tier 1-3 visualizations.
```

---

## See Also

- [Research Orchestrator](../orchestrators/research-orchestrator.md) — Coordinates research pipeline for historical essays
- [Conceptual Essay Orchestrator](../orchestrators/conceptual-essay-orchestrator.md) — Coordinates research for conceptual essays
- [Visual Essay Orchestrator](../orchestrators/visual-essay-orchestrator.md) — Invokes Design Researcher for Gate 4
- [Citation Audit Agent](../auditors/citation-audit-agent.md) — Verifies research quality
- [Accuracy Audit Agent](../auditors/accuracy-audit-agent.md) — Verifies conceptual research accuracy
- [Visualization Quality Standard](../../standards/visualization-quality-standard.md) — Defines research-before-rendering requirements
- [Content Creators](../content/README.md) — Consumes research output
- [Regional Experts](../regional/README.md) — Provides domain expertise











