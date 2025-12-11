# 🔧 Utilities

Support agents for request enhancement, documentation, and workflow optimization.

---

## Agents in This Category

| Agent | Purpose |
|-------|---------|
| [Scrollytelling Invocation Enhancer](./scrollytelling-invocation-enhancer.md) | Transform rough requests → structured briefs |
| [Visual Essay Invocation Agent](./visual-essay-invocation-agent.md) | Generate detailed specs for visual essays |
| [README Curator](./readme-curator.md) | Documentation routing & maintenance |

---

## Resources

| Resource | Location |
|----------|----------|
| Invocation Templates | `./InvocationTemplates/` |

---

## When to Use

| Scenario | Agent |
|----------|-------|
| Improve a rough request before sending to scrollytelling agent | Invocation Enhancer |
| Generate a detailed visual essay specification | Visual Essay Invocation Agent |
| Update documentation after changes | README Curator |
| Determine where to document something | README Curator |

---

## Workflow: Request Enhancement

```
Rough Idea
    │
    ▼
┌─────────────────────────────┐
│ Scrollytelling Invocation   │
│ Enhancer                    │
│                             │
│ • Detects target agent      │
│ • Asks clarifying questions │
│ • Fills intelligent defaults│
│ • Outputs structured brief  │
└──────────────┬──────────────┘
               │
               ▼
        Structured Brief
               │
               ▼
┌─────────────────────────────┐
│ Scrollytelling Expert       │
│ (orchestrators/)            │
└─────────────────────────────┘
```

---

## Operating Modes (Invocation Enhancer)

| Mode | Trigger | Behavior |
|------|---------|----------|
| **Quick** | `enhance this request:` | Uses intelligent defaults, no questions |
| **Guided** | `enhance with questions:` | Always asks 2-6 strategic questions |
| **Auto** | Just provide request | Asks questions only if ambiguous |

---

## Invocation Pattern

```
# Enhance a rough request
Using @agents/utilities/scrollytelling-invocation-enhancer.md, enhance this request:
"story about a bunny who learns to share"

# Generate visual essay spec
Using @agents/utilities/visual-essay-invocation-agent.md, create a detailed 
specification for a visual essay about [TOPIC].

# Documentation routing
Using @agents/utilities/readme-curator.md, determine where to document 
[NEW FEATURE] and update accordingly.
```

---

## See Also

- [Agent Registry](../AGENT-REGISTRY.md) — Complete agent index
- [Orchestrators](../orchestrators/README.md) — Receive enhanced requests
- [InvocationTemplates](./InvocationTemplates/README.md) — Template examples

