# 🎬 Orchestrators

Top-level agents that coordinate multiple specialist agents to produce complex deliverables.

---

## Agents in This Category

| Agent | Purpose | Coordinates |
|-------|---------|-------------|
| [Visual Essay Orchestrator](./visual-essay-orchestrator.md) | **TOP-LEVEL** — Historical/Etymology essays | Research Orchestrator, Scrollytelling, Meta Audit |
| [Conceptual Essay Orchestrator](./conceptual-essay-orchestrator.md) | **TOP-LEVEL** — Conceptual/Educational essays | Concept Research, Design (Pedagogical Lens), Accuracy Audit |
| [Research Orchestrator](./research-orchestrator.md) | **Research pipeline** — Phase 2 of visual essay production | Brainstorming, Research Citations, Citation Audit, Regional Experts |
| [Meta Audit Orchestrator](./meta-audit-orchestrator.md) | Multi-domain audit coordination | All audit agents |
| [QA Remediation Orchestrator](./qa-remediation-orchestrator.md) | **Iterative fix loop** — Audit→Fix→Reaudit | Auditors (input), Engineers (fixes) |
| [Production Orchestrator](./production-orchestrator.md) | Mobile-native immersive narratives | 7 specialist agents |

---

## When to Use

| Scenario | Agent |
|----------|-------|
| Historical/biographical visual essay | Visual Essay Orchestrator |
| **Conceptual/educational visual essay** | Conceptual Essay Orchestrator |
| Comprehensive quality audit | Meta Audit Orchestrator |
| Fix issues found in audit (iterative) | QA Remediation Orchestrator |
| New scrollytelling experience | Production Orchestrator |

---

## Hierarchies

### Visual Essay Pipeline (Historical/Etymology)

```
Visual Essay Orchestrator (TOP)
├── Research Orchestrator (Phase 2)
│   ├── Brainstorming Agent
│   ├── Research & Citations Expert
│   └── Routes to: Regional Experts, Historians
├── Design Researcher (Phase 4 - Archival Lens)
├── Production Orchestrator (Phase 5)
│   └── [7 specialist agents]
└── Meta Audit Orchestrator (Phase 6)
    └── [Citation Audit, Scrolling Auditor, etc.]
```

### Conceptual Essay Pipeline (Educational)

```
Conceptual Essay Orchestrator (TOP)
├── Concept Research Agent (Phase 2)
│   └── CONCEPTS.md, SEQUENCE.md, CLAIMS.md
├── Design Researcher (Phase 4 - Pedagogical Lens)
│   └── Diagram language, SVG blueprints
├── Production Orchestrator (Phase 5)
│   └── [SVG Expert, Science Writer, etc.]
└── Conceptual Audit Suite (Phase 6)
    ├── Accuracy Audit Agent (G6)
    ├── Pedagogy Audit Agent (G6.5)
    └── Diagram Clarity Auditor (G7)
```

---

## Invocation Pattern

```
Using @agents/orchestrators/visual-essay-orchestrator.md, initiate production 
for a visual essay about "[TOPIC]".

Spec: orchestration/skills/visual-essay-invocation/specs/[topic-slug].md
```

> **Note**: All orchestrators now require a **Spec Path** as the source of truth. See [INVOCATION-EXAMPLES.md](./INVOCATION-EXAMPLES.md) for complete invocation patterns.

---

## See Also

- [INVOCATION-EXAMPLES.md](./INVOCATION-EXAMPLES.md) — Complete invocation patterns
- [Agent Registry](../AGENT-REGISTRY.md) — Complete agent index
- [Main README](../README.md) — Detailed documentation


