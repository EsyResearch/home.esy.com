# 🎬 Orchestrators

Top-level agents that coordinate multiple specialist agents to produce complex deliverables.

---

## Agents in This Category

| Agent | Purpose | Coordinates |
|-------|---------|-------------|
| [Visual Essay Orchestrator](./visual-essay-orchestrator.md) | **TOP-LEVEL** — End-to-end production pipeline | Research Orchestrator, Scrollytelling, Meta Audit |
| [Research Orchestrator](./research-orchestrator.md) | **Research pipeline** — Phase 2 of visual essay production | Brainstorming, Research Citations, Citation Audit, Regional Experts |
| [Meta Audit Orchestrator](./meta-audit-orchestrator.md) | Multi-domain audit coordination | All 7 audit agents (incl. Spec Compliance) |
| [QA Remediation Orchestrator](./qa-remediation-orchestrator.md) | **Iterative fix loop** — Audit→Fix→Reaudit | Auditors (input), Engineers (fixes) |
| [Production Orchestrator](./production-orchestrator.md) | Mobile-native immersive narratives | 7 specialist agents |

---

## When to Use

| Scenario | Agent |
|----------|-------|
| Complete visual essay from scratch | Visual Essay Orchestrator |
| Comprehensive quality audit | Meta Audit Orchestrator |
| Fix issues found in audit (iterative) | QA Remediation Orchestrator |
| New scrollytelling experience | Production Orchestrator |

---

## Hierarchy

```
Visual Essay Orchestrator (TOP)
├── Research Orchestrator (Phase 2)
│   ├── Brainstorming Agent
│   ├── Research & Citations Expert
│   ├── Citation Audit Agent (validation)
│   └── Routes to: Regional Experts, Historians
├── Production Orchestrator (Phase 3)
│   ├── Historian Writer
│   ├── Historian Editor
│   ├── UI/UX Design
│   ├── SVG Illustration
│   ├── Software Engineering
│   └── Immersive Engineer
├── Meta Audit Orchestrator (Phase 4)
│   ├── Scrolling Auditor
│   ├── Citation Audit
│   ├── Visual Auditor
│   ├── SEO Audit
│   └── Spec Compliance Auditor ← NEW
└── QA Remediation Orchestrator (Phase 4.5 - if issues found)
    ├── INPUT: Auditors (find issues)
    ├── FIX: Engineers (resolve issues)
    └── VERIFY: Re-audit (confirm fixes)
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


