# 🎬 Orchestrators

Top-level agents that coordinate multiple specialist agents to produce complex deliverables.

---

## Agents in This Category

| Agent | Purpose | Coordinates |
|-------|---------|-------------|
| [Visual Essay Orchestrator](./visual-essay-orchestrator.md) | **TOP-LEVEL** — End-to-end production pipeline | Research Orchestrator, Scrollytelling, Meta Audit |
| [Research Orchestrator](./research-orchestrator.md) | **Research pipeline** — Phase 2 of visual essay production | Brainstorming, Research Citations, Citation Audit, Regional Experts |
| [Meta Audit Orchestrator](./meta-audit-orchestrator.md) | Multi-domain audit coordination | All 6 audit agents |
| [Scrollytelling Expert](./scrollytelling-expert.md) | Mobile-native immersive narratives | 7 specialist agents |
| [Children's Fiction Scrollytelling](./childrens-fiction-scrollytelling-agent.md) | Magical stories for ages 3-6 | Children's Writer, UI/UX, SVG, Engineers |

---

## When to Use

| Scenario | Agent |
|----------|-------|
| Complete visual essay from scratch | Visual Essay Orchestrator |
| Comprehensive quality audit | Meta Audit Orchestrator |
| New scrollytelling experience | Scrollytelling Expert |
| Children's picture book experience | Children's Fiction Scrollytelling |

---

## Hierarchy

```
Visual Essay Orchestrator (TOP)
├── Research Orchestrator (Phase 2)
│   ├── Brainstorming Agent
│   ├── Research & Citations Expert
│   ├── Citation Audit Agent (validation)
│   └── Routes to: Regional Experts, Historians
├── Scrollytelling Expert (Phase 3)
│   ├── Historian Writer
│   ├── Historian Editor
│   ├── UI/UX Design
│   ├── SVG Illustration
│   ├── Software Engineering
│   └── Immersive Engineer
└── Meta Audit Orchestrator (Phase 4)
    ├── Scrolling Auditor
    ├── Citation Audit
    ├── Visual Auditor
    └── SEO Audit
```

---

## Invocation Pattern

```
Using @agents/orchestrators/visual-essay-orchestrator.md, initiate production 
for a visual essay about "[TOPIC]".
```

---

## See Also

- [Agent Registry](../AGENT-REGISTRY.md) — Complete agent index
- [Main README](../README.md) — Detailed documentation

