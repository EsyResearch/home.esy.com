# Esy Orchestration System

The orchestration system coordinates specialized AI agents and procedural skills to produce complex deliverables like visual essays, scrollytelling experiences, and verified content.

---

## Quick Start

| I want to... | Start here |
|--------------|------------|
| **Understand the framework** | [`FRAMEWORK.md`](./FRAMEWORK.md) ⭐ |
| **Learn how to invoke agents** | [`INVOCATION-GUIDE.md`](./INVOCATION-GUIDE.md) |
| Create a historical/etymology visual essay | `@orchestration/agents/orchestrators/visual-essay-orchestrator.md` |
| Create a conceptual/educational essay | `@orchestration/agents/orchestrators/conceptual-essay-orchestrator.md` |
| Conduct research | `@orchestration/agents/orchestrators/research-orchestrator.md` |
| Run a comprehensive audit | `@orchestration/agents/orchestrators/meta-audit-orchestrator.md` |
| Understand available agents | `@orchestration/agents/README.md` |
| Use a specific skill | `@orchestration/skills/[skill-name]/SKILL.md` |
| Update documentation | `@orchestration/agents/utilities/readme-curator.md` |
| Create a new agent | `@orchestration/agents/META-AGENT-FRAMEWORK.md` |
| View audit reports | `@orchestration/audits/` |

---

## Philosophy

**Orchestration** at Esy means coordinating specialized components—each excellent at one thing—to produce outcomes none could achieve alone.

### Core Principles

1. **Separation of Expertise** — Each agent masters a domain; no agent tries to do everything
2. **Procedural Knowledge as Skills** — Repeatable workflows are codified as skills, not embedded in agents
3. **Quality Gates Over Trust** — Verification checkpoints ensure excellence at every stage
4. **Composition Over Complexity** — Simple components combined intelligently beat monolithic solutions

---

## The Orchestration Triad

The system has three component types, each serving a distinct purpose:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ORCHESTRATION SYSTEM                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌────────────────┐      ┌────────────────┐      ┌────────────────┐       │
│   │     AGENTS     │      │     SKILLS     │      │  ORCHESTRATORS │       │
│   │                │      │                │      │                │       │
│   │   Personas     │      │   Procedures   │      │  Coordinators  │       │
│   │   with         │      │   with         │      │  with          │       │
│   │   expertise    │      │   steps        │      │  pipelines     │       │
│   │                │      │                │      │                │       │
│   │   "WHO"        │      │   "HOW"        │      │  "WHEN/ORDER"  │       │
│   │                │      │                │      │                │       │
│   │   Makes        │      │   Provides     │      │   Sequences    │       │
│   │   judgments    │      │   procedures   │      │   agents       │       │
│   └────────────────┘      └────────────────┘      └────────────────┘       │
│                                                                              │
│   Examples:                Examples:              Examples:                  │
│   • Historian Editor       • image-url-extraction • Visual Essay Orchestrator   │
│   • Citation Audit         • visual-essay-        • Production Orchestrator   │
│   • Image Research           invocation           • Citation Audit Agent    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Agents

**Definition:** Specialized personas with deep expertise in a domain. Agents exercise judgment, make decisions, and produce creative or analytical outputs.

**Characteristics:**
- Have a defined role and specialization
- Apply expertise to novel situations
- Can invoke other agents or apply skills
- Produce deliverables (content, reports, code)

**Location:** `orchestration/agents/`

**Documentation:** [Agents README](./agents/README.md)

---

### Skills

**Definition:** Codified procedural knowledge—step-by-step workflows that any agent can apply. Skills are deterministic and repeatable.

**Characteristics:**
- Provide specific procedures for specific tasks
- Source-agnostic (any agent can use them)
- Include references for different contexts
- Have verification steps built in

**Location:** `orchestration/skills/`

**Documentation:** [Skills README](./skills/README.md)

---

### Orchestrators

**Definition:** Specialized agents that coordinate other agents through defined pipelines with quality gates.

**Characteristics:**
- Manage multi-agent workflows
- Enforce quality gates (blocking checkpoints)
- Track production status
- Own final deliverable approval

**Current Orchestrators:**

| Orchestrator | Domain | Agents Coordinated |
|--------------|--------|-------------------|
| `visual-essay-orchestrator.md` | Publication Pipeline | 4+ agents, 8 gates |
| `production-orchestrator.md` | Content Production | 7 agents |
| `citation-audit-agent.md` | Source Verification | 2-3 agents |
| `immersive-experience-auditor.md` | Experience QA | 1 agent (Scrolling Auditor) + direct checks |
| `meta-audit-orchestrator.md` | **Comprehensive QA** | 5 agents (Scroll, Experience, Visual, Citation, Quotes) |

---

## Relationship Model

### How Components Interact

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       RELATIONSHIP PATTERNS                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PATTERN 1: Agent Applies Skill                                             │
│  ────────────────────────────────                                           │
│  ┌──────────────────┐                                                       │
│  │ Image Research   │──applies──► image-url-extraction skill                │
│  │ Expert           │             ├─► wikimedia-commons.md                  │
│  └──────────────────┘             ├─► library-of-congress.md                │
│                                   └─► generic-fallback.md                   │
│                                                                              │
│  When: Agent needs procedural knowledge outside its core expertise          │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  PATTERN 2: Agent Invokes Agent                                             │
│  ──────────────────────────────                                             │
│  ┌──────────────────┐                                                       │
│  │ Citation Audit   │──invokes──► Quotes Audit Agent (specialist)           │
│  │ Agent            │──invokes──► Research Expert (source discovery)        │
│  └──────────────────┘                                                       │
│                                                                              │
│  When: Task requires expertise outside the invoking agent's domain          │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  PATTERN 3: Orchestrator Runs Pipeline                                      │
│  ─────────────────────────────────────                                      │
│  ┌──────────────────┐                                                       │
│  │ Visual Essay     │──G1──► Brief Approval                                 │
│  │ Director         │──G2──► Production Orchestrator (design)                 │
│  │                  │──G3──► Historian Editor (content)                     │
│  │                  │──G4──► Research Expert (sources)                      │
│  │                  │──G5──► Citation Audit (verification)                  │
│  │                  │──G6──► Scrolling Auditor (certification)              │
│  │                  │──G7──► Mobile Verification                            │
│  │                  │──G8──► Publication Approval                           │
│  └──────────────────┘                                                       │
│                                                                              │
│  When: Complex deliverable requires sequenced agents with quality gates     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Relationship Types

| Relationship | Direction | Nature | Example |
|--------------|-----------|--------|---------|
| Agent → Skill | Apply | Agent uses procedural knowledge | Image Expert applies URL extraction |
| Agent → Agent | Invoke | Delegation to specialist | Citation Audit invokes Quotes Audit |
| Orchestrator → Agent | Sequence | Pipeline stage execution | Director invokes Production Orchestrator |
| Orchestrator → Gate | Enforce | Quality checkpoint | Director enforces G5 Citation Audit |

---

## When to Use What

### Decision Tree

```
┌─────────────────────────────────────────────┐
│ What do you need?                           │
└─────────────────────┬───────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
┌───────────┐  ┌───────────┐  ┌───────────┐
│ Expertise │  │ Procedure │  │ Pipeline  │
│ & Judgment│  │ & Steps   │  │ & Gates   │
└─────┬─────┘  └─────┬─────┘  └─────┬─────┘
      │              │              │
      ▼              ▼              ▼
┌───────────┐  ┌───────────┐  ┌───────────┐
│   AGENT   │  │   SKILL   │  │ORCHESTRATOR│
│           │  │           │  │           │
│ "Someone  │  │ "A recipe │  │ "A project│
│  who knows│  │  anyone   │  │  manager  │
│  the field│  │  can      │  │  with     │
│  deeply"  │  │  follow"  │  │  checkpts"│
└───────────┘  └───────────┘  └───────────┘
```

### Quick Reference

| If you need... | Create/Use a... | Example |
|----------------|-----------------|---------|
| Domain expertise with judgment | **Agent** | `historian-editor-expert.md` |
| Repeatable procedure any agent can use | **Skill** | `image-url-extraction/` |
| Source-specific procedural knowledge | **Skill Reference** | `wikimedia-commons.md` |
| Multi-agent coordination with quality gates | **Orchestrator** | `visual-essay-orchestrator.md` |
| Documentation updates | **README Curator** | `readme-curator.md` |

---

## Quality Gates

Orchestrators enforce **quality gates**—mandatory checkpoints that must pass before proceeding.

### The 13-Gate Visual Essay Pipeline

```
G1 → G2 → G3 → G4 → G4.1 → G4.5 → G5 → G5.2 → G5.5 → G6 → G7 → G8 → G9
```

| Phase | Gates | What's Verified |
|-------|-------|-----------------|
| **Intake** | G1 | Scope approval, topic intake |
| **Research** | G2 | Research package complete (CITATIONS, FIGURES, QUOTES, etc.) |
| **Spec** | G3 | 6-layer spec built from research, no orphan claims |
| **Production** | G4 → G4.1 → G4.5 → G5 → G5.2 → G5.5 | Design research, reconciliation, images, implementation, CSS↔TSX binding, bibliography |
| **Audit** | G6 → G7 | Citation audit, scroll certification |
| **Publish** | G8 → G9 | Publication certification, director sign-off |

**Deep Dive:** See [FRAMEWORK.md](./FRAMEWORK.md) for full gate definitions and [orchestration/runner/README.md](./runner/README.md) for CLI-driven execution.

---

## Directory Structure

```
orchestration/
├── README.md                      ← You are here (system overview)
├── INVOCATION-GUIDE.md            ← How to invoke agents (start here!)
├── FRAMEWORK.md                   ← Core architecture, pipeline diagrams
├── FUTURE-WORK.md                 ← Planned improvements (deferred work)
│
├── base/                          ← Universal patterns shared by all orchestrators
│   ├── README.md
│   └── base-artifact-orchestrator.md  ← Universal gates (G1, G5, G8-G9)
│
├── profiles/                      ← Composable modules for different artifact types
│   ├── README.md
│   ├── research/                  ← G2 deliverables by domain
│   │   └── conceptual-research-profile.md
│   └── design/                    ← G4 research targets by domain
│       └── diagram-design-profile.md
│
├── agents/
│   ├── README.md                  ← Agent details, invocation patterns
│   ├── AGENT-REGISTRY.md          ← Complete agent index
│   ├── META-AGENT-FRAMEWORK.md    ← How to create new agents
│   ├── orchestrators/             ← Top-level coordinators (6)
│   ├── auditors/                  ← Quality verification (19)
│   ├── content/                   ← Content creation (4)
│   ├── research/                  ← Source discovery (5)
│   ├── regional/                  ← Regional specialists (2)
│   ├── engineering/               ← Technical implementation (8)
│   └── utilities/                 ← Support functions (5)
│
├── audits/                        ← All audit reports (organized by essay)
│   ├── README.md                  ← Audit system overview
│   └── [essay-slug]/              ← Audits for specific essay
│
└── skills/
    ├── README.md                  ← Skills overview, creation guide
    ├── image-url-extraction/      ← URL extraction from archives
    ├── seo-element-extraction/    ← SEO element extraction
    ├── visual-essay-invocation/   ← Historical essay spec creation
    └── conceptual-essay-invocation/  ← Conceptual essay spec creation
```

---

## Creating New Components

### New Agent
1. Read `@orchestration/agents/META-AGENT-FRAMEWORK.md`
2. Follow the structural template
3. Register in META-AGENT-FRAMEWORK's derived agent list
4. Update `@orchestration/agents/README.md` via README Curator

### New Skill
1. Read `@orchestration/skills/README.md`
2. Create skill directory with `SKILL.md`, `references/`, `examples/`
3. Add source-specific references as needed
4. Update `@orchestration/skills/README.md` via README Curator

### New Orchestrator
1. Start with an existing agent
2. Define the pipeline stages and quality gates
3. Document which agents are coordinated
4. Register in this README's orchestrator table

---

## Documentation Updates

**Always use the README Curator agent for documentation changes:**

```
Using @orchestration/agents/readme-curator.md, update documentation 
to reflect [describe what changed].
```

The curator will:
1. Determine which README(s) need updates
2. Maintain consistency across documentation
3. Update cross-references
4. Verify structural integrity

---

## See Also

- **[Invocation Guide](./INVOCATION-GUIDE.md)** — Practical guide to invoking agents ⭐
- **[Agents README](./agents/README.md)** — Full agent catalog, invocation patterns, workflows
- **[Skills README](./skills/README.md)** — Skills overview, creation guide, current skills
- **[META-AGENT-FRAMEWORK](./agents/META-AGENT-FRAMEWORK.md)** — Agent creation template
- **[Quality Gates Tutorial](./agents/README.md#quality-gates-system)** — Deep dive on gates

---

*Last Updated: February 2026*

### Recent Changes
- Added `base/` directory with universal gate patterns (G1, G5, G8-G9)
- Added `profiles/` directory for compositional workflow design
- Added Conceptual Essay Orchestrator for educational/explainer essays
- Added conceptual-essay-invocation skill
- See FUTURE-WORK.md for planned improvements

