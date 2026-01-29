# Esy Orchestration Invocation Guide

> **Your practical guide to invoking Esy's AI agents effectively.**

This guide teaches you how to work with the orchestration system—when to use which agent, how to invoke them, and what to expect at each step.

---

## Quick Start

| I want to... | Invoke this | Example |
|--------------|-------------|---------|
| Create a visual essay | Visual Essay Orchestrator | `@agents/visual-essay-orchestrator.md` |
| Write essay content only | Production Orchestrator | `@agents/production-orchestrator.md` |
| Find scholarly sources | Research Citations Expert | `@agents/research-citations-expert.md` |
| Verify citations | Citation Audit Agent | `@agents/citation-audit-agent.md` |
| Audit scroll performance | Immersive Scrolling Auditor | `@agents/immersive-scrolling-auditor.md` |
| Find images for essays | Image Research Expert | `@agents/image-research-licensing-expert.md` |

---

## Part 1: Visual Essay Orchestrator

The **Visual Essay Orchestrator** is your primary entry point for creating complete, publication-ready visual essays. It manages the entire production pipeline from concept to deployment.

### When to Use

| Situation | Use Visual Essay Orchestrator? |
|-----------|--------------------------------|
| New visual essay from scratch | ✅ Yes |
| Full production with quality gates | ✅ Yes |
| Need citation certification | ✅ Yes |
| Quick content draft only | ❌ No — use Production Orchestrator |
| Editing existing essay | ❌ No — use specific expert agents |
| Research-only task | ❌ No — use Research Citations Expert |

### Three Ways to Invoke

#### Option A: Use the Visual Essay Creation Template (Recommended)

The easiest path—structured questionnaire with intelligent defaults.

```
Using @agents/InvocationTemplates/visual-essay-creation.md,
create a visual essay about [YOUR TOPIC]
```

**Modes available:**

| Mode | Trigger | What happens |
|------|---------|--------------|
| **Quick** | Add "just run with it" | Applies defaults, proceeds immediately |
| **Guided** | Add "guide me through" | Asks all strategic questions |
| **Auto** | Just provide topic | Asks 3-5 key questions, fills rest |

**Examples:**

```
# Quick — minimal friction
Using @agents/InvocationTemplates/visual-essay-creation.md,
create a visual essay about the invention of glass. Just run with it.

# Guided — full control
Using @agents/InvocationTemplates/visual-essay-creation.md,
create a visual essay about the invention of glass. Guide me through.

# Auto — balanced (default)
Using @agents/InvocationTemplates/visual-essay-creation.md,
create a visual essay about the invention of glass.
```

#### Option B: Direct Orchestrator Invocation

For users who prefer to provide their own brief structure.

```
Using @agents/visual-essay-orchestrator.md, initiate production
for a visual essay about [TOPIC].

Key details:
- [Any specific requirements]
- [Timeline constraints if any]
- [Visual style preferences]
```

The orchestrator will:
1. Apply the `visual-essay-invocation` skill to generate a complete brief
2. Auto-select appropriate lens (mythology, history, etc.)
3. Guide you through quality gates

#### Option C: Provide Your Own Invocation Document

For advanced users with a pre-written invocation brief.

```
Using @agents/visual-essay-orchestrator.md, execute production
using this invocation document:

@orchestration/skills/visual-essay-invocation/blueprints/[topic].md
```

---

### What Happens After Invocation

The Visual Essay Orchestrator follows a **5-phase pipeline** with **8 quality gates**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PRODUCTION PIPELINE                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PHASE 1: INTAKE & PLANNING (10%)                                          │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  📋 Brief Development → Apply visual-essay-invocation skill           │ │
│  │  🎯 Scope Definition → Sections, read time, complexity                │ │
│  │  📅 Timeline Establishment                                            │ │
│  │  ✅ GATE 1: Brief Approval                                            │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                      ↓                                      │
│  PHASE 2: PRODUCTION (50%)                                                 │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  🎨 Design Research → Unique visual identity                          │ │
│  │  ✅ GATE 2: Design Research Approved                                  │ │
│  │  📝 Content Creation → Production Orchestrator orchestration            │ │
│  │  💻 Implementation → page.tsx, Client.tsx, CSS                        │ │
│  │  ✅ GATE 3: Content Complete                                          │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                      ↓                                      │
│  PHASE 3: CITATION PIPELINE (25%)                                          │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  📚 Research Citations Expert → Source discovery                      │ │
│  │  ✅ GATE 4: Citation Research Complete                                │ │
│  │  🔍 Citation Audit Agent → Verification                               │ │
│  │  ✅ GATE 5: Citation Certified                                        │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                      ↓                                      │
│  PHASE 4: PUBLICATION APPROVAL (10%)                                       │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  📱 Immersive Scrolling Auditor → Scroll certification                │ │
│  │  ✅ GATE 6: Scroll Certified (≥8.0/10)                                │ │
│  │  📲 Real Device Testing → Safari iOS + Chrome Android                 │ │
│  │  ✅ GATE 7: Mobile Verified                                           │ │
│  │  ✍️ Final Sign-Off                                                    │ │
│  │  ✅ GATE 8: Publication Approved                                      │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                      ↓                                      │
│  PHASE 5: DEPLOYMENT & MONITORING (5%)                                     │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  🚀 Deploy to /essays/visual/                                         │ │
│  │  📊 Update visualEssays index                                         │ │
│  │  👁️ Post-publication monitoring                                       │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Quality Gates Explained

| Gate | What's Checked | Blocking? |
|------|----------------|-----------|
| **G1: Brief Approval** | Complete invocation with scope, timeline, success criteria | ✅ Yes |
| **G2: Design Research** | Unique visual identity derived from subject matter | ✅ Yes |
| **G3: Content Complete** | All sections drafted, implementation functional | ✅ Yes |
| **G4: Citation Research** | Tier 1-2 sources for all major claims | ✅ Yes |
| **G5: Citation Audit** | Citation Certification achieved | ✅ Yes |
| **G6: Scroll Certification** | Immersive Scrolling Auditor score ≥8.0 | ✅ Yes |
| **G7: Mobile Verification** | Real device testing passed | ✅ Yes |
| **G8: Publication Approval** | Final orchestrator sign-off | ✅ Yes |

### Steering the Pipeline

You can interact with the orchestrator at any point:

```
# Check status
Using @agents/visual-essay-orchestrator.md, provide status update
on the visual essay "[TITLE]" currently in production.

# Request phase acceleration
Using @agents/visual-essay-orchestrator.md, proceed to the next phase
for "[TITLE]". The current gate requirements are met.

# Request specific agent
Using @agents/visual-essay-orchestrator.md, invoke the Research Citations
Expert to compile sources for "[TITLE]".

# Request final approval
Using @agents/visual-essay-orchestrator.md, conduct final publication
approval review for the visual essay at [PATH].
```

---

### Invocation Examples

#### Example 1: Mythology Topic

```
Using @agents/InvocationTemplates/visual-essay-creation.md,
create a visual essay about the Ramayana—the Hindu epic.
Focus on how it's been visualized across 2,500 years of art.
```

The orchestrator will:
1. Apply `visual-essay-invocation` skill
2. **Auto-select** the `mythology` lens (based on topic type)
3. Apply lens-specific guidance (visual source hierarchy, figure profiles, darshan moments)
4. Generate invocation with cultural sensitivity protocols

#### Example 2: Technology Topic

```
Using @agents/visual-essay-orchestrator.md, initiate production
for a visual essay about the history of artificial intelligence.

Key requirements:
- Cover 1950s to present
- Include key figures: Turing, McCarthy, Hinton
- Photo-driven aesthetic (archival photography)
- Timeline: 3 weeks
```

#### Example 3: Resuming Paused Production

```
Using @agents/visual-essay-orchestrator.md, resume production
for the visual essay "The Journey Home" (Ramayana).

Current state:
- Phase 3 (Citation Pipeline) complete
- G4 and G5 passed
- Ready for scroll certification (G6)

Please invoke the Immersive Scrolling Auditor.
```

---

### Common Pitfalls & Solutions

| Problem | Solution |
|---------|----------|
| **"The orchestrator is asking too many questions"** | Use Quick Mode: add "just run with it" to your invocation |
| **"I want to skip citation audit"** | You can't—Citation Certification is mandatory. No exceptions. |
| **"The essay is taking too long"** | Request expedited production (parallelizes compatible phases) |
| **"I need to change scope mid-production"** | Request scope revision at any gate boundary—not mid-phase |
| **"Mobile testing is blocking deployment"** | Real device testing is required. Simulation is not sufficient. |

---

### Files Produced

A complete visual essay production generates:

```
src/app/essays/visual/[slug]/
├── page.tsx                    ← Server component (metadata, SEO)
├── [Name]Client.tsx            ← Client component (scroll logic, content)
└── [slug].css                  ← Styles (design system implementation)

orchestration/skills/visual-essay-invocation/blueprints/
└── [slug].md                   ← Invocation blueprint (production spec)

src/data/visualEssays.ts        ← Updated with new entry
```

---

## Part 2: Other Agents (Coming Soon)

Future sections will cover:

- **Production Orchestrator** — Direct content creation without full pipeline
- **Research Citations Expert** — Standalone research tasks
- **Citation Audit Agent** — Auditing existing essays
- **Immersive Scrolling Auditor** — Performance audits
- **Image Research Expert** — Finding public domain imagery

---

## Decision Tree: Which Agent Do I Need?

```
                        ┌─────────────────────────────────┐
                        │     What do you want to do?     │
                        └─────────────────┬───────────────┘
                                          │
          ┌───────────────────────────────┼───────────────────────────────┐
          │                               │                               │
          ▼                               ▼                               ▼
   ┌──────────────┐              ┌──────────────┐              ┌──────────────┐
   │   Create     │              │   Research   │              │    Audit     │
   │   Content    │              │   or Find    │              │   Quality    │
   └──────┬───────┘              └──────┬───────┘              └──────┬───────┘
          │                             │                             │
    ┌─────┴─────┐                 ┌─────┴─────┐                 ┌─────┴─────┐
    │           │                 │           │                 │           │
    ▼           ▼                 ▼           ▼                 ▼           ▼
┌────────┐ ┌────────┐       ┌────────┐ ┌────────┐       ┌────────┐ ┌────────┐
│Full    │ │Content │       │Sources │ │Images  │       │Scroll  │ │Citation│
│Essay   │ │Only    │       │        │ │        │       │Perf    │ │Verify  │
└───┬────┘ └───┬────┘       └───┬────┘ └───┬────┘       └───┬────┘ └───┬────┘
    │          │                │          │                │          │
    ▼          ▼                ▼          ▼                ▼          ▼
┌────────┐ ┌────────┐       ┌────────┐ ┌────────┐       ┌────────┐ ┌────────┐
│Visual  │ │Scrolly-│       │Research│ │Image   │       │Immersive│ │Citation│
│Essay   │ │telling │       │Citation│ │Research│       │Scrolling│ │Audit   │
│Orch.   │ │Expert  │       │Expert  │ │Expert  │       │Auditor  │ │Agent   │
└────────┘ └────────┘       └────────┘ └────────┘       └────────┘ └────────┘
```

---

## See Also

- [Agents README](./agents/README.md) — Complete agent catalog
- [Skills README](./skills/README.md) — Reusable skill definitions
- [Visual Essay Creation Template](./agents/InvocationTemplates/visual-essay-creation.md) — Detailed template
- [Visual Essay Invocation Skill](./skills/visual-essay-invocation/SKILL.md) — Brief generation framework

---

*Last Updated: December 2024*

