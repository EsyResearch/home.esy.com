# 🔧 Utilities

Support agents for request enhancement, documentation, and workflow optimization.

---

## Agents in This Category

| Agent | Purpose |
|-------|---------|
| [Visual Essay Intake Enhancer](./visual-essay-intake-enhancer.md) | Transform rough visual essay requests → structured intake documents |
| [Visual Essay Refurbish Agent](./visual-essay-refurbish-agent.md) | Evaluate legacy essays, extract intent, propose expansions, formalize research |
| [Scrollytelling Invocation Enhancer](./scrollytelling-invocation-enhancer.md) | Transform rough requests → structured briefs |
| [Visual Essay Invocation Agent](./visual-essay-invocation-agent.md) | Generate detailed specs for visual essays |
| [Concept Extraction Agent](./concept-extraction-agent.md) | Extract concepts from educational essays → CORE-CONCEPTS.md + ConceptualFoundationsSection |
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
| Improve a rough visual essay request before sending to orchestrator | Visual Essay Intake Enhancer |
| Evaluate existing essay missing research package or design spec | Visual Essay Refurbish Agent |
| Bring legacy essay into pipeline compliance | Visual Essay Refurbish Agent |
| Propose content expansion for existing essay | Visual Essay Refurbish Agent |
| Extract intent and formalize intake from existing implementation | Visual Essay Refurbish Agent |
| Improve a rough request before sending to scrollytelling agent | Scrollytelling Invocation Enhancer |
| Generate a detailed visual essay specification (from research) | Visual Essay Invocation Agent |
| Extract concepts from educational/foundations essays | Concept Extraction Agent |
| Generate Conceptual Foundations section for `/essays/foundations/*` | Concept Extraction Agent |
| Update documentation after changes | README Curator |
| Determine where to document something | README Curator |

---

## Workflow: Request Enhancement

### Visual Essay Pipeline

```
Rough Idea ("visual essay about semiconductors")
    │
    ▼
┌─────────────────────────────┐
│ Visual Essay Intake         │
│ Enhancer                    │
│                             │
│ • Assesses clarity          │
│ • Asks strategic questions  │
│ • Translates vague→concrete │
│ • Outputs structured intake │
└──────────────┬──────────────┘
               │
               ▼
        Structured Intake Document
               │
               ▼
┌─────────────────────────────┐
│ Visual Essay Orchestrator   │
│ (orchestrators/)            │
│                             │
│ Phase 1: Intake ← HERE      │
│ Phase 2: Research           │
│ Phase 3: Spec Construction  │
│ ...                         │
└─────────────────────────────┘
```

### Scrollytelling Pipeline

```
Rough Idea ("story about a bunny")
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
│ Production Orchestrator       │
│ (orchestrators/)            │
└─────────────────────────────┘
```

### Refurbish Pipeline (Legacy Essays)

```
Existing Essay (missing research/ or spec)
    │
    ▼
┌─────────────────────────────┐
│ Visual Essay Refurbish      │
│ Agent                       │
│                             │
│ • Extracts content & design │
│ • Infers original intent    │
│ • Identifies research gaps  │
│ • Proposes expansions       │
│ • Assesses design (keep?)   │
│ • Outputs refurbish intake  │
└──────────────┬──────────────┘
               │
               ▼
        Refurbish Intake Document
               │
               ▼
┌─────────────────────────────┐
│ Visual Essay Orchestrator   │
│ (REFURBISH mode)            │
│                             │
│ Phase 2: Research           │
│  • Reconstruct citations    │
│  • Verify existing sources  │
│  • Expand with new research │
│ Phase 3-6: Standard flow    │
└─────────────────────────────┘
```

---

## Operating Modes (Both Enhancers)

| Mode | Trigger | Behavior |
|------|---------|----------|
| **Quick** | `enhance this request:` | Uses intelligent defaults, no questions |
| **Guided** | `enhance with questions:` | Always asks 2-6 strategic questions |
| **Auto** | Just provide request | Asks questions only if ambiguous |

Both the Visual Essay Intake Enhancer and Scrollytelling Invocation Enhancer support these modes.

---

## Invocation Pattern

```
# Enhance a rough visual essay request
Using @agents/utilities/visual-essay-intake-enhancer.md, enhance this request:
"visual essay about the history of semiconductors"

# Refurbish a legacy essay (missing research package)
Using @agents/utilities/visual-essay-refurbish-agent.md, evaluate and
prepare a refurbish intake for the visual essay at:
src/app/essays/[essay-slug]/

# Refurbish with expansion focus
Using @agents/utilities/visual-essay-refurbish-agent.md, evaluate the
visual essay at [path] with focus on EXPANSION. Identify additional
figures, events, and data visualizations to add.

# Enhance a rough scrollytelling request
Using @agents/utilities/scrollytelling-invocation-enhancer.md, enhance this request:
"story about a bunny who learns to share"

# Generate visual essay spec (from research package)
Using @agents/utilities/visual-essay-invocation-agent.md, create a detailed
specification for a visual essay about [TOPIC].

# Extract concepts from educational essay
Using @agents/utilities/concept-extraction-agent.md, extract and document
all key concepts from the essay at [path]. Generate CORE-CONCEPTS.md,
TypeScript concepts array, and ConceptualFoundationsSection component.

# Documentation routing
Using @agents/utilities/readme-curator.md, determine where to document
[NEW FEATURE] and update accordingly.
```

---

## See Also

- [Agent Registry](../AGENT-REGISTRY.md) — Complete agent index
- [Orchestrators](../orchestrators/README.md) — Receive enhanced requests
- [InvocationTemplates](./InvocationTemplates/README.md) — Template examples



