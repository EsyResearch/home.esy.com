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

### Six Pillars of Orchestration

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                         VISUAL ESSAY ORCHESTRATOR (Top Level)                            │
│                              Coordinates entire pipeline                                 │
│                                   Owns G1, G3, G9                                        │
└─────────────────────────────────────────────────────────────────────────────────────────┘
                                          │
  ┌───────────────┬───────────────┬───────┴───────┬───────────────┬───────────────┐
  │               │               │               │               │               │
  ▼               ▼               ▼               ▼               ▼               ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│  RESEARCH   │ │ INVOCATION  │ │SCROLLYTELL- │ │BIBLIOGRAPHY │ │   AUDIT     │ │  PUBLISH    │
│ORCHESTRATOR │ │   AGENT     │ │ ING EXPERT  │ │ORCHESTRATOR │ │ORCHESTRATOR │ │  ARTIFACT   │
│             │ │             │ │             │ │             │ │             │ │ORCHESTRATOR │
│  Phase 2    │ │  Phase 3    │ │  Phase 4    │ │  Phase 4    │ │  Phase 5    │ │  Phase 6    │
│  Research   │ │  Spec Build │ │  Production │ │  Bibliog.   │ │  Audit      │ │  Publish    │
│             │ │             │ │             │ │             │ │             │ │             │
│  Owns G2    │ │ Builds spec │ │ G4→G4.1→G4.5│ │  Owns G5.5  │ │  G6, G7     │ │  Owns G8    │
│             │ │ from res.   │ │ →G5→G5.2    │ │             │ │             │ │             │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
```

**Supporting Orchestrators:**
- **QA Remediation Orchestrator** — Auto-fix coordination for audit failures
- **SEO Orchestrator** — SEO pipeline management

---

## Visual Essay Pipeline

### Pipeline Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              VISUAL ESSAY ORCHESTRATOR                                   │
│                                  (13 Gates Pipeline)                                     │
└─────────────────────────────────────────────────────────────────────────────────────────┘
                                          │
  ┌─────────────┬─────────────┬───────────┼───────────┬─────────────┬─────────────┐
  │             │             │           │           │             │             │
  ▼             ▼             ▼           ▼           ▼             ▼             ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│ PHASE 1 │ │ PHASE 2 │ │ PHASE 3 │ │ PHASE 4 │ │ PHASE 5 │ │ PHASE 6 │
│         │ │         │ │         │ │         │ │         │ │         │
│ INTAKE  │►│RESEARCH │►│  SPEC   │►│PRODUCT- │►│  AUDIT  │►│ PUBLISH │
│         │ │         │ │ BUILD   │ │  ION    │ │         │ │         │
│   G1    │ │   G2    │ │   G3    │ │G4→G4.1  │ │ G6, G7  │ │ G8, G9  │
│         │ │         │ │         │ │→G4.5→G5 │ │         │ │         │
│         │ │         │ │         │ │→G5.2    │ │         │ │         │
│         │ │         │ │         │ │→G5.5    │ │         │ │         │
└─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘

Gate Flow:
G1 ─► G2 ─► G3 ─► G4 ─► G4.1 ─► G4.5 ─► G5 ─► G5.2 ─► G5.5 ─► G6 ─► G7 ─► G8 ─► G9
```

### Phase Descriptions

| Phase | Name | Owner | Gates | Output |
|-------|------|-------|-------|--------|
| 1 | Intake | Visual Essay Orchestrator | G1 | Scope + SKILL.md research requirements |
| 2 | Research | Research Orchestrator | G2 | `research/` package (maps to SKILL.md) |
| 3 | Spec Construction | Visual Essay Invocation Agent | G3 | 6-layer spec (built from research) |
| 4 | Production | Production Orchestrator | G4, G4.1, G4.5, G5, G5.2, G5.5 | Content, design, bibliography implementation |
| 5 | Audit | Audit Orchestrator | G6, G7 | Citation & scroll certification |
| 6 | Publish | Publish Artifact Orchestrator + Visual Essay Orchestrator | G8, G9 | Publication certification + deployed essay |

### Critical Flow: SKILL.md → Research → Spec → Production

```
SKILL.md defines           Research Orchestrator        Invocation Agent      Writers implement
what spec needs:           gathers:                     builds spec:          the spec:

┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│Layer 4: Figures  │─────►│ FIGURES.md       │─────►│ Figure profiles  │─────►│ Content uses     │
│Layer 4: Quotes   │─────►│ QUOTES.md        │─────►│ Verified quotes  │─────►│ verified data    │
│Layer 4: Timeline │─────►│ TIMELINE.md      │─────►│ Narrative arc    │─────►│ from spec        │
│Layer 5: Visuals  │─────►│ VISUALS.md       │─────►│ Asset specs      │─────►│ (which came from │
│Layer 5: Eras     │─────►│ ERA-GUIDE.md     │─────►│ Era treatments   │─────►│ research)        │
└──────────────────┘      └──────────────────┘      └──────────────────┘      └──────────────────┘
                                   │
                                   ▼
                          GAPS.md documents what
                          CANNOT be claimed →
                          spec avoids these
```

**Key Insight:** The spec is built FROM research, not before it. Writers implement the spec, which is already grounded in verified sources. No orphan claims possible.

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

| Agent | Location | Role in Pipeline |
|-------|----------|------------------|
| Brainstorming Agent | `research/brainstorming-agent.md` | Question formulation, angles, hypotheses |
| Research & Citations Expert | `research/research-citations-expert.md` | Source discovery, evaluation, synthesis |
| Design Researcher | `research/design-researcher.md` | G4: Visual identity from subject matter |
| Image Research Expert | `research/image-research-licensing-expert.md` | G4.5: Visual asset sourcing, licensing |
| Citation Audit Agent | `auditors/citation-audit-agent.md` | G6: Link verification, quote validation |
| Design Research Reconciliation Agent | `auditors/design-research-reconciliation-agent.md` | G4.1: Thematic authenticity, cross-essay novelty |
| Design Research Integration Agent | `auditors/design-research-integration-agent.md` | G5.2: CSS↔TSX binding verification |
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

| Gate | Name | Phase | Owner | Blocks | Pass Criteria |
|------|------|-------|-------|--------|---------------|
| **G1** | Intake Approval | 1→2 | Visual Essay Orchestrator | Research | Scope defined, SKILL.md requirements identified |
| **G2** | Research Complete | 2→3 | Research Orchestrator | Spec | Research package complete, maps to SKILL.md |
| **G3** | Spec Approval | 3→4 | Visual Essay Orchestrator | Production | 6-layer spec built from research, no orphan claims |
| **G4** | Design Research | 4 | Design Researcher | G4.1 | Visual identity derived from subject matter |
| **G4.1** | Design Research Reconciliation | 4 | Design Research Reconciliation Agent | G4.5 | Thematic authenticity verified, no cross-essay collisions, CSS implements design research |
| **G4.5** | Image Sourcing | 4 | Image Research Licensing Expert | G5 | All images sourced, URLs extracted, licenses verified |
| **G5** | Content Complete | 4→5 | Production Orchestrator | G5.2 | All sections drafted, fact-checked, uses research package |
| **G5.2** | Design Research Integration | 4 | Design Research Integration Agent | G5.5 | CSS selectors bind to TSX classNames (≥95%), no convention mismatches |
| **G5.5** | Bibliography Implementation | 4 | Bibliography Orchestrator | G6 | Bibliography section complete (Works Cited, Image Credits, A/V, Data Sources) |
| **G6** | Citation Audit | 5 | Citation Audit Agent | G7 | Citation certification achieved |
| **G7** | Scroll Certification | 5 | Immersive Scrolling Auditor | G8 | 60fps, scroll-lock verified, score ≥8.0/10 |
| **G8** | Publication Certification | 6 | Publish Artifact Orchestrator | G9 | Pre-publication certification (GO/CONDITIONAL) from all domain audits |
| **G9** | Publication Approval | 6 | Visual Essay Orchestrator | Deploy | Director sign-off, visualEssays.ts updated |

### G2 Requirements (Research Complete)

The Research Orchestrator must verify research package satisfies SKILL.md requirements:

- [ ] `research/` directory exists
- [ ] `FIGURES.md` has 5-15 figures with imagery availability confirmed
- [ ] `QUOTES.md` has 10+ verified quotes with sources
- [ ] `TIMELINE.md` maps major events chronologically
- [ ] `VISUALS.md` identifies archive/visual sources
- [ ] `CITATIONS.md` contains minimum sources (varies by depth)
- [ ] All sources are Tier 1-2 (or justified exceptions)
- [ ] All links verified working
- [ ] `GAPS.md` documents what cannot be verified
- [ ] Domain expert sign-off (if applicable)

### G3 Requirements (Spec Approval)

The Visual Essay Orchestrator must verify spec is research-backed:

- [ ] Spec follows 6-layer SKILL.md structure
- [ ] All figure profiles sourced from `research/FIGURES.md`
- [ ] All quotes verified in `research/QUOTES.md`
- [ ] Narrative arc matches `research/TIMELINE.md`
- [ ] No claims from `research/GAPS.md` appear in spec
- [ ] Appropriate lens applied (mythology, history, etc.)

---

## Agent Ecosystem

### Directory Structure

```
orchestration/agents/
├── orchestrators/           # 🎬 Top-level coordination
│   ├── visual-essay-orchestrator.md
│   ├── research-orchestrator.md
│   ├── audit-orchestrator.md         # Comprehensive quality audits
│   ├── bibliography-orchestrator.md  # G5.5 Bibliography implementation
│   ├── publish-artifact-orchestrator.md  # G8 Publication certification
│   ├── qa-remediation-orchestrator.md    # Auto-fix coordination
│   ├── seo-orchestrator.md           # SEO pipeline management
│   ├── production-orchestrator.md
│   └── childrens-fiction-scrollytelling-agent.md
│
├── research/                # 🔬 Research specialists
│   ├── brainstorming-agent.md
│   ├── research-citations-expert.md
│   ├── image-research-licensing-expert.md
│   └── design-researcher.md          # G4 Design research
│
├── auditors/                # 🔍 Quality verification
│   ├── citation-audit-agent.md
│   ├── quotes-audit-agent.md
│   ├── visual-auditor-agent.md
│   ├── scrollytelling-audit-agent.md
│   ├── immersive-scrolling-auditor.md
│   ├── immersive-experience-auditor.md
│   ├── seo-audit-agent.md
│   ├── spec-compliance-auditor.md    # Spec vs output verification
│   ├── hydration-audit-agent.md      # SSR/client mismatch detection
│   ├── content-audit-agent.md        # Word count, depth, tone
│   ├── design-research-reconciliation-agent.md  # G4.1 Design authenticity
│   └── design-research-integration-agent.md     # G5.2 CSS↔TSX binding
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
│   └── ... (additional agents)
│
└── utilities/               # 🔧 Support functions
    ├── scrollytelling-invocation-enhancer.md
    ├── visual-essay-invocation-agent.md
    └── readme-curator.md
```

### Agent Relationships

```
                                    ORCHESTRATORS
    ┌─────────────────────────────────────────────────────────────────────────────┐
    │                                                                              │
    │   Visual Essay    ───────►  Research      ───────►  Meta Audit              │
    │   Orchestrator              Orchestrator            Orchestrator            │
    │        │                         │                       │                  │
    └────────┼─────────────────────────┼───────────────────────┼──────────────────┘
             │                         │                       │
             │    SKILL.md as          │                       │
             │    research blueprint   │                       │
             │         │               │                       │
             │         ▼               │                       │
             │    ┌─────────────┐      │                       │
             │    │ SKILL.md    │──────┘ (guides research)     │
             │    │ Template    │                              │
             │    └──────┬──────┘                              │
             │           │                                     │
             │           │   research/                         │
             │           │   package                           │
             │           ▼                                     │
             │    ┌─────────────┐                              │
             │    │ Invocation  │◄─── builds spec from research│
             │    │   Agent     │                              │
             │    └──────┬──────┘                              │
             │           │                                     │
             │           │   6-layer spec                      │
             │           ▼                                     │
             │    ┌─────────────────────────────────────────────────────────────┐
             │    │                         PRODUCTION                          │
             │    │                                                             │
             └───►│   Production Orchestrator ──► Content Agents ──► Engineering  │
                  │   (implements the spec, which is research-backed)           │
                  └─────────────────────────────────────────────────────────────┘
                                          │
                                          ▼
    ┌─────────────────────────────────────────────────────────────────────────────┐
    │                              RESEARCH AGENTS                                 │
    │                                                                              │
    │    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐ │
    │    │Brainstm.│    │Research │    │Citation │    │Regional │    │ Image   │ │
    │    │ Agent   │    │Citations│    │ Audit   │    │Experts  │    │Research │ │
    │    │         │    │ Expert  │    │         │    │         │    │         │ │
    │    └─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘ │
    │                                                                              │
    └─────────────────────────────────────────────────────────────────────────────┘
```

---

## Research Package Specification

### Directory Structure

Every visual essay must have a `research/` directory. The structure maps to SKILL.md requirements:

```
src/app/essays/visual/[essay-slug]/
├── [Essay]Client.tsx
├── [essay].css
├── images.ts
├── page.tsx
└── research/                    ← REQUIRED
    ├── README.md                # Directory overview
    │
    │  SKILL.md-Aligned Files (for spec construction):
    ├── FIGURES.md               # 5-15 figures with imagery (Layer 4)
    ├── QUOTES.md                # 10+ verified quotes (Layer 4)
    ├── TIMELINE.md              # Chronological events (Layer 4)
    ├── VISUALS.md               # Archive/visual sources (Layer 4)
    ├── ERA-GUIDE.md             # Period treatments (Layer 5)
    │
    │  Standard Research Files:
    ├── CITATIONS.md             # All sources (REQUIRED)
    ├── SYNTHESIS.md             # Key findings (Standard+)
    ├── RESEARCH-BRIEF.md        # Questions, scope (Deep only)
    ├── GAPS.md                  # What cannot be verified (Deep only)
    └── CONFIDENCE-MATRIX.md     # Claim confidence (Deep only)
```

### SKILL.md Alignment

The research package is designed to directly feed the spec construction:

| Research File | SKILL.md Layer | Invocation Agent Uses For |
|---------------|----------------|---------------------------|
| `FIGURES.md` | Layer 4: Chapter Schema | Figure profiles with verified data |
| `QUOTES.md` | Layer 4: Chapter Schema | Key figure quotes with sources |
| `TIMELINE.md` | Layer 4: Chapter Schema | Narrative beats, chronological arc |
| `VISUALS.md` | Layer 4: Chapter Schema | Visual assets specification |
| `ERA-GUIDE.md` | Layer 5: Design System | Era/mood treatments |
| `GAPS.md` | All layers | What to AVOID claiming |

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
| v1.2 | January 1, 2025 | **13-gate pipeline update**: Added G4.1 (Design Research Reconciliation), G4.5 (Image Sourcing), G5.2 (Design Research Integration), G5.5 (Bibliography Implementation). Changed G8 from "Mobile Verification" to "Publication Certification" (owned by Publish Artifact Orchestrator). Added new orchestrators: audit-orchestrator, bibliography-orchestrator, publish-artifact-orchestrator, qa-remediation-orchestrator, seo-orchestrator. Added new auditors: spec-compliance-auditor, hydration-audit-agent, content-audit-agent, design-research-reconciliation-agent, design-research-integration-agent. Updated Four Pillars → Six Pillars diagram. Updated Agent Ecosystem directory structure. |
| v1.1 | December 11, 2024 | Research → Spec flow: SKILL.md now serves as research blueprint. Spec construction happens AFTER research, using verified data. Added Phase 3 (Spec Construction), renumbered to 6 phases. Added G3 (Spec Approval), G9 (Publication). Research package now includes SKILL.md-aligned files (FIGURES.md, QUOTES.md, TIMELINE.md, VISUALS.md, ERA-GUIDE.md). |
| v1.0 | December 11, 2024 | Initial framework documentation |

---

## See Also

- [AGENT-REGISTRY.md](./agents/AGENT-REGISTRY.md) — Complete agent index
- [agents/README.md](./agents/README.md) — Detailed agent documentation
- [META-AGENT-FRAMEWORK.md](./agents/META-AGENT-FRAMEWORK.md) — Agent creation guide
- [INVOCATION-GUIDE.md](./INVOCATION-GUIDE.md) — How to invoke agents

---

*This framework document defines the core architecture of the Esy orchestration system. For implementation details, see individual agent files.*


