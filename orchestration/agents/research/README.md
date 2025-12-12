# 🔬 Research

Research and source discovery agents that ensure content is built on authoritative foundations.

---

## Agents in This Category

| Agent | Domain | Key Capability |
|-------|--------|----------------|
| [Brainstorming Agent](./brainstorming-agent.md) | Research Design | Question formulation, hypothesis generation, scope definition |
| [Research & Citations](./research-citations-expert.md) | Source Discovery | Tier 1-2 authoritative sources, evaluation, synthesis |
| [Image Research & Licensing](./image-research-licensing-expert.md) | Visual Assets | Public domain image sourcing & rights verification |

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
| **Full research pipeline** | Use Research Orchestrator (orchestrators/) |

---

## Invocation Pattern

```
Using @agents/research/research-citations-expert.md, find Tier 1-2 sources 
for claims about [TOPIC]. Focus on .edu and peer-reviewed journals.
```

---

## See Also

- [Research Orchestrator](../orchestrators/research-orchestrator.md) — Coordinates research pipeline (Phase 2)
- [Citation Audit Agent](../auditors/citation-audit-agent.md) — Verifies research quality
- [Content Creators](../content/README.md) — Consumes research output
- [Regional Experts](../regional/README.md) — Provides domain expertise






