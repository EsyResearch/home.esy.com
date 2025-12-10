# Visual Essay Invocation Skill

Generate comprehensive invocation documents (specs) for scroll-driven visual essays.

---

## Quick Start

**Recommended: Via Invocation Agent**
```
Using @agents/visual-essay-invocation-agent.md,
generate a complete invocation spec for a visual essay about [TOPIC]
```

**Direct Skill Application (Advanced)**
```
Using @orchestration/skills/visual-essay-invocation/SKILL.md,
generate an invocation for a visual essay about [TOPIC]
```

---

## Purpose

This skill transforms rough topic requests into **production-ready specifications**—comprehensive blueprints that ensure consistent, high-quality visual essay development.

An invocation is NOT the final artifact. It's the architectural blueprint that guides implementation—ensuring no critical element is overlooked.

## What It Produces

A complete six-layer specification:

| Layer | Contents |
|-------|----------|
| **1. Strategic Foundation** | Title, executive brief, visual treatment philosophy |
| **2. Technical Systems** | Scroll-lock techniques, parallax depth, progress bar design |
| **3. Hero Architecture** | Opening sequence with percentage-based choreography |
| **4. Chapter Schema** | All chapters with metaphors, figures, scroll-lock sequences |
| **5. Design System** | Colors, typography, animation principles |
| **6. Implementation** | Responsive specs, accessibility, deliverables checklist |

---

## Skill Structure

```
visual-essay-invocation/
├── SKILL.md                    ← Core framework, workflow, quality standards
├── README.md                   ← You are here
├── examples/                   ← Condensed format references (incomplete templates)
│   ├── README.md               ← Example directory guide
│   └── history-of-ai.md        ← Format/depth reference
├── specs/                      ← Finished production-ready invocations
│   ├── README.md               ← Spec status index
│   └── the-ramayana.md         ← [DRAFT] Mythology
├── references/                 ← Templates and patterns
│   ├── invocation-template.md  ← Complete six-layer template
│   ├── scroll-lock-patterns.md ← Pattern library
│   ├── chapter-schema.md       ← Chapter structure examples
│   └── topic-selection.md      ← Topic evaluation criteria
└── lenses/                     ← Subject-specific guidance
    └── mythology.md            ← Sacred narratives, religious figures
```

### Examples vs Specs

| | Examples | Specs |
|-|----------|-------|
| **Purpose** | Format reference | Production specification |
| **Completeness** | Condensed, partial | Complete, actionable |
| **Use** | Study when learning | Implement into visual essays |

---

## When to Use

| Situation | Use This Skill? |
|-----------|-----------------|
| Starting a new visual essay | ✅ Yes |
| Need comprehensive production spec | ✅ Yes |
| Want consistency across essays | ✅ Yes |
| Quick draft without full spec | ❌ No — invoke Scrollytelling Expert directly |
| Editing existing essay | ❌ No — work with the implementation |

---

## Invocation Modes

### Via Visual Essay Invocation Agent (Recommended)

The Invocation Agent applies this skill and stores the output:

```
Using @agents/visual-essay-invocation-agent.md, generate a complete
invocation spec for a visual essay about [TOPIC].
```

The agent will:
1. Apply this skill framework
2. Generate six-layer specification
3. Store to `specs/[topic-slug].md`
4. Provide handoff summary

### Via Visual Essay Orchestrator

The orchestrator invokes the Invocation Agent during Phase 1:

```
Using @agents/visual-essay-orchestrator.md, initiate production
for a visual essay about [TOPIC].
```

### Direct Skill Application (Advanced)

For generating a spec without the agent wrapper:

```
Using @orchestration/skills/visual-essay-invocation/SKILL.md,
generate an invocation for a visual essay about [TOPIC].

Details:
- Visual treatment: [photorealistic/illustrated/mixed]
- Target audience: [experts/beginners/general]
- Estimated length: [chapters/read time]
```

---

## Lenses

Lenses provide subject-specific guidance for specialized topics:

| Lens | Use For |
|------|---------|
| `lenses/mythology.md` | Sacred narratives, religious figures, epics, cosmology |
| *`lenses/science.md`* | *(Future)* Biology, physics, chemistry |
| *`lenses/history.md`* | *(Future)* Wars, revolutions, biographies |
| *`lenses/technology.md`* | *(Future)* Engineering, computing, innovation |

Lenses are auto-selected based on topic type.

---

## Spec Status Levels

| Status | Meaning |
|--------|---------|
| `[DRAFT]` | Recently generated, awaiting review |
| `[REVIEWED]` | Human-validated, confirmed quality |
| `[IMPLEMENTED]` | Visual essay built from this spec |
| `[CANONICAL]` | Reference-quality, may be promoted to `/references/` |

---

## Quality Checklist

A complete invocation must have:

- [ ] Every chapter has a named metaphor
- [ ] Every scroll-lock sequence has percentage breakpoints
- [ ] Every figure has photograph/illustration description
- [ ] Design system is specific (not generic descriptors)
- [ ] Progress bar concept matches subject matter
- [ ] Arc moves from question to resolution/open question
- [ ] Emotional stakes clear from executive brief

---

## See Also

- **[SKILL.md](./SKILL.md)** — Complete framework and procedures
- **[Examples](./examples/)** — Condensed format references
- **[Specs](./specs/)** — Finished production-ready invocations
- **[Visual Essay Invocation Agent](../../agents/visual-essay-invocation-agent.md)** — Agent that applies this skill
- **[Visual Essay Orchestrator](../../agents/visual-essay-orchestrator.md)** — Invokes the agent in Phase 1
- **[Orchestration Overview](../../README.md)** — System architecture

---

*Last Updated: December 2024*
