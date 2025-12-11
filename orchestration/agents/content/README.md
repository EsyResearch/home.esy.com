# 📚 Content Creators

Specialist agents focused on content creation, writing, and editorial work.

---

## Agents in This Category

| Agent | Domain | Key Capability |
|-------|--------|----------------|
| [Historian Writer](./historian-writer-expert.md) | Historical Narrative | Compelling storytelling from research |
| [Historian Editor](./historian-editor-expert.md) | Fact-Checking | Accuracy verification, Gate G3 |
| [Essayist Expert](./essayist-expert.md) | Academic Writing | Essay structure & argumentation |
| [Copywriter Marketing](./copywriter-marketing-expert.md) | Marketing Copy | Conversion-focused messaging |

---

## Content Pipeline

```
Research & Citations (research/)
        │
        ▼
┌───────────────────┐
│  Historian Writer │ ← Creates narrative
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│  Historian Editor │ ← Fact-checks (G3)
└─────────┬─────────┘
          │
          ▼
    Verified Content
```

---

## When to Use

| Scenario | Agent |
|----------|-------|
| Historical narrative content | Historian Writer |
| Fact-checking & verification | Historian Editor |
| Academic essay guidance | Essayist Expert |
| Marketing & conversion copy | Copywriter Marketing |

---

## Collaboration

- **Historian Writer + Editor** work as a pair (writer creates, editor verifies)
- All content creators receive sources from **Research & Citations** (research/)

---

## Invocation Pattern

```
Using @agents/content/historian-writer-expert.md, create a compelling 
narrative about [HISTORICAL TOPIC] based on the research provided.
```

---

## See Also

- [Research Agents](../research/README.md) — Source discovery
- [Regional Experts](../regional/README.md) — Subject matter specialists
- [Scrollytelling Expert](../orchestrators/scrollytelling-expert.md) — Coordinates content creation


