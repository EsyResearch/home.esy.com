# Esy Orchestration Framework

> **Stability Notice:** This document defines the core architecture of the Esy orchestration system. It should only be updated when fundamental framework changes occur. For day-to-day documentation, see individual agent files and READMEs.

---

## Table of Contents

1. [Framework Overview](#framework-overview)
2. [Visual Essay Pipeline](#visual-essay-pipeline)
3. [Research Orchestrator](#research-orchestrator)
4. [Domain Routing System](#domain-routing-system)
5. [Depth Modes](#depth-modes)
6. [Quality Gates](#quality-gates)
7. [Agent Ecosystem](#agent-ecosystem)
8. [Research Package Specification](#research-package-specification)
9. [Invocation Patterns](#invocation-patterns)

---

## Framework Overview

The Esy orchestration framework is a multi-agent system designed to produce high-quality visual essays with verifiable research foundations. The framework enforces a **research-first** approach where source discovery precedes content creation.

### Core Principles

| Principle | Description |
|-----------|-------------|
| **Research First** | Sources are discovered and validated before writing begins |
| **Domain Awareness** | Research adapts to subject domain (history, science, culinary, etc.) |
| **Quality Gates** | Each phase must pass verification before proceeding |
| **Single Source of Truth** | Every essay has a `research/` directory with canonical citations |
| **Orchestrator Pattern** | Complex tasks are coordinated by orchestrator agents |

### Three Pillars of Orchestration

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    VISUAL ESSAY ORCHESTRATOR (Top Level)                     │
│                         Coordinates entire pipeline                          │
└─────────────────────────────────────┬───────────────────────────────────────┘
                                      │
            ┌─────────────────────────┼─────────────────────────┐
            │                         │                         │
            ▼                         ▼                         ▼
   ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
   │    RESEARCH     │       │  SCROLLYTELLING │       │   META AUDIT    │
   │  ORCHESTRATOR   │       │     EXPERT      │       │  ORCHESTRATOR   │
   │                 │       │                 │       │                 │
   │  Phase 2:       │       │  Phase 3:       │       │  Phase 4:       │
   │  Research       │       │  Production     │       │  Audit          │
   └─────────────────┘       └─────────────────┘       └─────────────────┘
```

---

## Visual Essay Pipeline

### Pipeline Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              VISUAL ESSAY ORCHESTRATOR                                   │
└─────────────────────────────────────────────────────────────────────────────────────────┘
                                          │
        ┌─────────────┬───────────────────┼───────────────────┬─────────────┐
        │             │                   │                   │             │
        ▼             ▼                   ▼                   ▼             ▼
  ┌───────────┐ ┌───────────┐       ┌───────────┐       ┌───────────┐ ┌───────────┐
  │  PHASE 1  │ │  PHASE 2  │       │  PHASE 3  │       │  PHASE 4  │ │  PHASE 5  │
  │           │ │           │       │           │       │           │ │           │
  │  INTAKE   │ │ RESEARCH  │       │PRODUCTION │       │   AUDIT   │ │  PUBLISH  │
  │ PLANNING  │►│ORCHESTRAT.│──────►│           │──────►│           │►│           │
  │           │ │           │       │           │       │           │ │           │
  │    G1     │ │    G2     │       │  G3, G4   │       │  G5, G6   │ │  G7, G8   │
  └───────────┘ └─────┬─────┘       └─────┬─────┘       └───────────┘ └───────────┘
                      │                   │
                      │   research/       │
                      │   package         │
                      └──────────────────►│
                                          │
                                    Writers reference
                                    research during
                                    production
```

### Phase Descriptions

| Phase | Name | Owner | Gates | Output |
|-------|------|-------|-------|--------|
| 1 | Intake & Planning | Visual Essay Orchestrator | G1 | Brief, scope, timeline |
| 2 | Research | Research Orchestrator | G2 | `research/` package |
| 3 | Production | Scrollytelling Expert | G3, G4 | Content & design |
| 4 | Audit | Meta Audit Orchestrator | G5, G6 | Certification |
| 5 | Publish | Visual Essay Orchestrator | G7, G8 | Deployed essay |

### Critical Flow: Research → Production

```
Research Orchestrator produces:          Writers consume during production:
                                         
research/                                ┌─────────────────────────────────┐
├── RESEARCH-BRIEF.md    ───────────────►│ Understand scope & questions    │
├── CITATIONS.md         ───────────────►│ Cite these sources (not invent) │
├── SYNTHESIS.md         ───────────────►│ Build narrative from findings   │
├── GAPS.md              ───────────────►│ Know what to avoid claiming     │
└── CONFIDENCE-MATRIX.md ───────────────►│ Match confidence to language    │
```

**Key Insight:** Writers cannot fabricate sources because real sources already exist in the research package.

---

## Research Orchestrator

### Purpose

The Research Orchestrator coordinates the complete research pipeline, ensuring that comprehensive, validated sources are discovered before content creation begins.

### Internal Structure

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              RESEARCH ORCHESTRATOR                                       │
│                           orchestrators/research-orchestrator.md                         │
│                                                                                          │
│   Capabilities:                                                                          │
│   • Domain Detection (History, Science, Culinary, etc.)                                  │
│   • Depth Modes (Quick, Standard, Deep)                                                  │
│   • Phase Coordination                                                                   │
│   • Domain Routing to Specialists                                                        │
│   • Research Package Assembly                                                            │
│   • Browser Tools (when needed for verification)                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
                                          │
    ┌─────────────────────────────────────┼─────────────────────────────────────┐
    │                                     │                                     │
    │  PHASE 0: DOMAIN DETECTION          │                                     │
    │  ─────────────────────────          │                                     │
    │  • Analyze topic for domain signals │                                     │
    │  • Auto-detect: History, Science,   │                                     │
    │    Culinary, Art, Legal, Technical  │                                     │
    │  • Confirm with user                │                                     │
    │  • Apply appropriate lenses         │                                     │
    │                                     │                                     │
    │  PHASE 1: BRAINSTORMING             │                                     │
    │  ──────────────────────             │                                     │
    │  Agent: research/brainstorming-agent.md                                   │
    │  • Formulate research questions     │                                     │
    │  • Explore angles & hypotheses      │                                     │
    │  • Identify keywords & concepts     │                                     │
    │  • Output: Research Brief           │                                     │
    │                                     │                                     │
    │  PHASE 2: DISCOVERY & EVALUATION    │                                     │
    │  ───────────────────────────────    │                                     │
    │  Agent: research/research-citations-expert.md                             │
    │  • Discover sources (Scholar, archives, .edu)                             │
    │  • Evaluate (Tier 1-4, bias, currency)                                    │
    │  • Synthesize (triangulation, gaps)  │                                    │
    │  • Format citations                  │                                    │
    │  • Route to domain experts if needed │                                    │
    │                                     │                                     │
    │  PHASE 3: VALIDATION                │                                     │
    │  ──────────────────                 │                                     │
    │  Agent: auditors/citation-audit-agent.md                                  │
    │  • Verify all links work            │                                     │
    │  • Validate quote authenticity      │                                     │
    │  • Confirm tier classifications     │                                     │
    │  • Check coverage completeness      │                                     │
    │                                     │                                     │
    │  PHASE 4: PACKAGE ASSEMBLY          │                                     │
    │  ────────────────────────           │                                     │
    │  • Assemble research/ directory     │                                     │
    │  • Generate all output files        │                                     │
    │  • Pass G2 gate                     │                                     │
    │                                     │                                     │
    └─────────────────────────────────────┴─────────────────────────────────────┘
```

### Child Agents

| Agent | Location | Role in Research |
|-------|----------|------------------|
| Brainstorming Agent | `research/brainstorming-agent.md` | Question formulation, angles, hypotheses |
| Research & Citations Expert | `research/research-citations-expert.md` | Source discovery, evaluation, synthesis |
| Citation Audit Agent | `auditors/citation-audit-agent.md` | Link verification, quote validation |
| Image Research Expert | `research/image-research-licensing-expert.md` | Visual asset sourcing |
| Regional Experts | `regional/*.md` | Domain-specific knowledge |
| Historian Writer/Editor | `content/historian-*.md` | Historical methodology |

---

## Domain Routing System

### Purpose

Different research domains require different methodologies, source landscapes, and expert knowledge. The domain routing system detects the subject area and applies appropriate lenses.

### Detection Flow

```
┌─────────────────┐
│  Topic Input    │
│                 │
│ "The origins of │
│  Burmese mohinga│
│  noodle soup"   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ DOMAIN DETECTOR │
│                 │
│ Analyzes topic  │
│ for signals     │
└────────┬────────┘
         │
         ├──► History detected ("origins")
         ├──► Regional detected ("Burmese" → 🇲🇲)
         └──► Culinary detected ("noodle soup")
         │
         ▼
┌─────────────────┐
│  USER CONFIRM   │
│                 │
│ "Detected:      │
│  History +      │
│  Regional (🇲🇲) +│
│  Culinary       │
│                 │
│  Confirm?"      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  APPLY LENSES   │
└─────────────────┘
```

### Available Domains

| Domain | Signals | Lens Applied | Experts Invoked |
|--------|---------|--------------|-----------------|
| **History** | "origins", "history of", dates, eras | Historical methodology, primary/secondary distinction | Historian Writer/Editor |
| **Regional** | Country names, regional terms | Cultural nuance, native language verification | Burmese/Thai Historian |
| **Culinary** | Food terms, cooking, cuisine | Ethnographic sources, cookbooks, agricultural | Regional experts |
| **Science** | Scientific terms, experiments | Scientific method, peer review, replication | (Future) |
| **Art** | Art terms, artists, movements | Provenance, museum sources, criticism | (Future) |
| **Legal** | Legal terms, cases, statutes | Case law, jurisdiction awareness | (Future) |

### Lens Stacking

Multiple lenses can be applied simultaneously:

```
Topic: "The history of Burmese mohinga"

Lenses Applied:
├── Historical Methodology
│   • Primary/secondary source distinction
│   • Period-appropriate sources
│   • Historiographic context
│
├── Regional: Myanmar (🇲🇲)
│   • Burmese Historian Expert consulted
│   • Native language (ဗမာစာ) verification
│   • Cultural nuance checking
│
└── Culinary
    • Ethnographic sources prioritized
    • Cookbook references included
    • Agricultural/trade context
```

---

## Depth Modes

### Overview

Research depth adapts to content type and complexity. Three modes are available:

```
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│       QUICK         │    │      STANDARD       │    │        DEEP         │
│                     │    │                     │    │                     │
│  Use for:           │    │  Use for:           │    │  Use for:           │
│  • Blog posts       │    │  • Short essays     │    │  • Full visual essay│
│  • Simple topics    │    │  • Standard topics  │    │  • Complex topics   │
│  • Time-sensitive   │    │  • Most content     │    │  • Controversial    │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
```

### Mode Comparison

| Aspect | Quick | Standard | Deep |
|--------|-------|----------|------|
| **Brainstorming** | Skip | Brief | Comprehensive |
| **Sources** | 3-5 | 8-12 | 15-25 |
| **Domain Routing** | No | Yes | Yes + multiple experts |
| **Validation** | Links only | Links + quotes | Full cross-reference |
| **Time** | ~15 min | ~45 min | ~90+ min |
| **Output Files** | CITATIONS.md | CITATIONS + SYNTHESIS | All 5 files |

### Output by Mode

| Mode | BRIEF | CITATIONS | SYNTHESIS | GAPS | CONFIDENCE |
|------|-------|-----------|-----------|------|------------|
| Quick | ❌ | ✅ | ❌ | ❌ | ❌ |
| Standard | ❌ | ✅ | ✅ | ❌ | ❌ |
| Deep | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Quality Gates

### Gate Definitions

| Gate | Name | Owner | Blocks | Pass Criteria |
|------|------|-------|--------|---------------|
| **G1** | Brief Approval | Visual Essay Orchestrator | Research | Complete brief with scope, timeline |
| **G2** | Research Complete | Research Orchestrator | Production | Research package exists, minimum sources met |
| **G3** | Design Research | Scrollytelling Expert | Content | Visual identity from subject matter |
| **G4** | Content Complete | Historian Editor | Audit | All sections drafted, fact-checked |
| **G5** | Citation Audit | Citation Audit Agent | Scroll | Citation certification achieved |
| **G6** | Scroll Certification | Immersive Scrolling Auditor | Mobile | 60fps, scroll-lock verified |
| **G7** | Mobile Verification | Visual Essay Orchestrator | Publish | Real device tested |
| **G8** | Publication Approval | Visual Essay Orchestrator | Deploy | Director sign-off |

### G2 Requirements (Research Complete)

The Research Orchestrator must verify:

- [ ] `research/` directory exists
- [ ] `CITATIONS.md` contains minimum sources (varies by depth)
- [ ] All sources are Tier 1-2 (or justified exceptions)
- [ ] All links verified working
- [ ] No critical gaps for core claims
- [ ] Domain expert sign-off (if applicable)
- [ ] Quote authenticity validated

---

## Agent Ecosystem

### Directory Structure

```
orchestration/agents/
├── orchestrators/           # 🎬 Top-level coordination
│   ├── visual-essay-orchestrator.md
│   ├── research-orchestrator.md      ← NEW
│   ├── meta-audit-orchestrator.md
│   ├── scrollytelling-expert.md
│   └── childrens-fiction-scrollytelling-agent.md
│
├── research/                # 🔬 Research specialists
│   ├── brainstorming-agent.md        ← NEW
│   ├── research-citations-expert.md
│   └── image-research-licensing-expert.md
│
├── auditors/                # 🔍 Quality verification
│   ├── citation-audit-agent.md
│   ├── quotes-audit-agent.md
│   ├── visual-auditor-agent.md
│   ├── scrollytelling-audit-agent.md
│   ├── immersive-scrolling-auditor.md
│   ├── immersive-experience-auditor.md
│   └── seo-audit-agent.md
│
├── content/                 # 📚 Content creation
│   ├── historian-writer-expert.md
│   ├── historian-editor-expert.md
│   ├── childrens-books-writer-expert.md
│   ├── essayist-expert.md
│   └── copywriter-marketing-expert.md
│
├── regional/                # 🌏 Regional specialists
│   ├── burmese-historian-expert.md
│   └── thai-historian-expert.md
│
├── engineering/             # ⚙️ Technical implementation
│   ├── software-engineering-expert.md
│   ├── immersive-experience-engineer.md
│   ├── svg-illustration-animation-expert.md
│   └── ... (7 agents)
│
└── utilities/               # 🔧 Support functions
    ├── scrollytelling-invocation-enhancer.md
    ├── visual-essay-invocation-agent.md
    └── readme-curator.md
```

### Agent Relationships

```
                              ORCHESTRATORS
    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                      │
    │   Visual Essay    ───────►  Research      ───────►  Meta Audit      │
    │   Orchestrator              Orchestrator            Orchestrator    │
    │        │                         │                       │          │
    └────────┼─────────────────────────┼───────────────────────┼──────────┘
             │                         │                       │
             │         ┌───────────────┼───────────────┐       │
             │         │               │               │       │
             │         ▼               ▼               ▼       │
             │    ┌─────────┐    ┌─────────┐    ┌─────────┐   │
             │    │Brainstm.│    │Research │    │Citation │   │
             │    │ Agent   │    │Citations│    │ Audit   │◄──┘
             │    └─────────┘    │ Expert  │    └─────────┘
             │                   └────┬────┘
             │                        │
             │         ┌──────────────┼──────────────┐
             │         │              │              │
             │         ▼              ▼              ▼
             │    ┌─────────┐   ┌─────────┐   ┌─────────┐
             │    │Regional │   │Historian│   │ Image   │
             │    │Experts  │   │Writer/  │   │Research │
             │    │         │   │Editor   │   │         │
             │    └─────────┘   └─────────┘   └─────────┘
             │
             │
             ▼
    ┌─────────────────────────────────────────────────────────────────────┐
    │                         PRODUCTION                                   │
    │                                                                      │
    │   Scrollytelling Expert ──► Content Agents ──► Engineering Agents   │
    │                                                                      │
    └─────────────────────────────────────────────────────────────────────┘
```

---

## Research Package Specification

### Directory Structure

Every visual essay must have a `research/` directory:

```
src/app/essays/visual/[essay-slug]/
├── [Essay]Client.tsx
├── [essay].css
├── images.ts
├── page.tsx
└── research/                    ← REQUIRED
    ├── README.md                # Directory overview
    ├── CITATIONS.md             # All sources (REQUIRED)
    ├── SYNTHESIS.md             # Key findings (Standard+)
    ├── RESEARCH-BRIEF.md        # Questions, scope (Deep only)
    ├── GAPS.md                  # Unanswered questions (Deep only)
    └── CONFIDENCE-MATRIX.md     # Claim confidence (Deep only)
```

### CITATIONS.md Specification

```markdown
# Citation Log: [Essay Title]

## Citation Standards
| Status | Icon | Meaning |
|--------|------|---------|
| Verified | ✅ | URL confirmed, content confirmed |
| Pending | ⏳ | Needs verification |
| Broken | ❌ | URL no longer works |

## Sources

### Source 1: [Title]
| Field | Value |
|-------|-------|
| **Title** | [Full title] |
| **URL** | [Full URL] |
| **Type** | [Tier 1/2/3] |
| **Accessed** | [Date] |
| **Status** | ✅ / ⏳ / ❌ |
| **Supports Claims** | [What this source supports] |

[... additional sources ...]

## Quotes & Attributions
| Figure | Quote | Status |
|--------|-------|--------|
| [Name] | [Quote] | ✅ Verified / ⚠️ Attributed |

## Version History
| Version | Date | Changes |
|---------|------|---------|
| v1.0 | YYYY-MM-DD | Initial |
```

---

## Invocation Patterns

### Research Orchestrator

```
Using @agents/orchestrators/research-orchestrator.md:

Topic: [Your topic]
Depth: Quick | Standard | Deep
Domain: Auto | History | Science | Culinary | [specify]
```

### Visual Essay Pipeline

```
Using @agents/orchestrators/visual-essay-orchestrator.md:

Initiate production for a visual essay about "[Topic]".

Key details:
- Target read time: [X] minutes
- Visual style: [description]
- Special requirements: [any]
```

### Direct Research (Skip Orchestration)

```
Using @agents/research/research-citations-expert.md:

Find Tier 1-2 sources for: [Topic]
Focus: [specific aspects]
Minimum sources: [number]
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | December 11, 2024 | Initial framework documentation |

---

## See Also

- [AGENT-REGISTRY.md](./agents/AGENT-REGISTRY.md) — Complete agent index
- [agents/README.md](./agents/README.md) — Detailed agent documentation
- [META-AGENT-FRAMEWORK.md](./agents/META-AGENT-FRAMEWORK.md) — Agent creation guide
- [INVOCATION-GUIDE.md](./INVOCATION-GUIDE.md) — How to invoke agents

---

*This framework document defines the core architecture of the Esy orchestration system. For implementation details, see individual agent files.*

