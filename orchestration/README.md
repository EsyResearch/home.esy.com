# Esy Orchestration System

The orchestration system coordinates specialized AI agents and procedural skills to produce complex deliverables like visual essays, scrollytelling experiences, and verified content.

---

## Quick Start

| I want to... | Start here |
|--------------|------------|
| **Understand the framework** | [`FRAMEWORK.md`](./FRAMEWORK.md) ⭐ |
| **Learn how to invoke agents** | [`INVOCATION-GUIDE.md`](./INVOCATION-GUIDE.md) |
| Create a visual essay | `@orchestration/agents/orchestrators/visual-essay-orchestrator.md` |
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

### The Eight Gates (Visual Essay Pipeline)

```
G1 ──► G2 ──► G3 ──► G4 ──► G5 ──► G6 ──► G7 ──► G8
Brief  Design Content Sources Citation Scroll  Mobile  Publish
                              Audit    Cert    Verify
```

| Gate | Owner | What's Verified |
|------|-------|-----------------|
| G1 | Director | Complete brief with scope |
| G2 | Production Orchestrator | Unique visual identity |
| G3 | Historian Editor | Facts verified |
| G4 | Research Expert | Tier 1-2 sources |
| G5 | Citation Audit | All claims supported |
| G6 | Scrolling Auditor | 60fps, scroll-lock functional |
| G7 | Director | Real device mobile verification |
| G8 | Director | Final publication approval |

**Deep Dive:** See [Quality Gates System](./agents/README.md#quality-gates-system) in Agents README.

---

## Directory Structure

```
orchestration/
├── README.md                      ← You are here (system overview)
├── INVOCATION-GUIDE.md            ← How to invoke agents (start here!)
│
├── agents/
│   ├── README.md                  ← Agent details, invocation patterns
│   ├── META-AGENT-FRAMEWORK.md    ← How to create new agents
│   ├── readme-curator.md          ← Documentation management agent
│   ├── visual-essay-orchestrator.md   ← Top-level orchestrator
│   ├── meta-audit-orchestrator.md ← Comprehensive audit coordinator
│   ├── production-orchestrator.md   ← Content production orchestrator
│   ├── [15+ specialist agents]
│   ├── CitationReports/           ← Citation audit archives
│   └── VisualAuditReports/        ← Visual audit archives
│
├── audits/                        ← All audit reports (organized by essay)
│   ├── README.md                  ← Audit system overview
│   └── [essay-slug]/              ← Audits for specific essay
│       ├── README.md              ← Essay audit history
│       └── YYYY-MM-DD-*-audit.md  ← Timestamped audit reports
│
└── skills/
    ├── README.md                  ← Skills overview, creation guide
    ├── image-url-extraction/      ← URL extraction from archives
    │   ├── SKILL.md
    │   ├── references/
    │   └── examples/
    ├── seo-element-extraction/    ← SEO element extraction
    │   └── SKILL.md
    └── visual-essay-invocation/   ← Visual essay spec creation
        ├── SKILL.md               ← Core framework
        ├── README.md              ← Quick reference
        ├── examples/              ← Condensed format references
        ├── specs/                 ← Finished production-ready specs
        ├── references/            ← Templates, patterns
        └── lenses/                ← Subject-specific guidance
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

*Last Updated: December 2024*

