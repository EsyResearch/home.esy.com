# Agent Registry
## Complete Index of Esy.com Expert Agents

> **Quick Navigation:** This registry provides a scannable overview of all agents, their purposes, patterns, and relationships. For detailed documentation, tutorials, and invocation examples, see [README.md](./README.md).

---

## Directory Structure

```
agents/
├── README.md                    # Main documentation
├── AGENT-REGISTRY.md            # This file
├── META-AGENT-FRAMEWORK.md      # Agent creation template
│
├── orchestrators/               # 🎬 Top-level coordination (6)
├── auditors/                    # 🔍 Quality verification (21)
├── content/                     # 📚 Content creation (5)
├── research/                    # 🔬 Source discovery (5)
├── regional/                    # 🌏 Regional specialists (2)
├── engineering/                 # ⚙️ Technical implementation (9)
└── utilities/                   # 🔧 Support & enhancement (5)
```

---

## Quick Index by Category

### 🎬 Orchestrators
*Top-level agents that coordinate multiple specialists*

| Agent | Purpose | Path |
|-------|---------|------|
| [Visual Essay Orchestrator](./orchestrators/visual-essay-orchestrator.md) | **TOP-LEVEL** — End-to-end pipeline for historical/etymology essays | `orchestrators/` |
| [Conceptual Essay Orchestrator](./orchestrators/conceptual-essay-orchestrator.md) | **TOP-LEVEL** — End-to-end pipeline for conceptual/educational essays | `orchestrators/` |
| [Research Orchestrator](./orchestrators/research-orchestrator.md) | **Research pipeline** — Phase 2, domain routing, package assembly | `orchestrators/` |
| [Meta Audit Orchestrator](./orchestrators/meta-audit-orchestrator.md) | Multi-domain audit coordination | `orchestrators/` |
| [QA Remediation Orchestrator](./orchestrators/qa-remediation-orchestrator.md) | **Iterative fix loop** — Audit→Fix→Reaudit until passing | `orchestrators/` |
| [Production Orchestrator](./orchestrators/production-orchestrator.md) | Mobile-native immersive narratives | `orchestrators/` |

### 🔍 Auditors
*Quality verification and certification*

| Agent | Domain | Gate | Path |
|-------|--------|------|------|
| [Citation Audit Agent](./auditors/citation-audit-agent.md) | Sources & Links | G6 | `auditors/` |
| [Quotes Audit Agent](./auditors/quotes-audit-agent.md) | Quote Authenticity | — | `auditors/` |
| [Visual Auditor Agent](./auditors/visual-auditor-agent.md) | SVG Quality | — | `auditors/` |
| [Scrollytelling Audit Agent](./auditors/scrollytelling-audit-agent.md) | Experience Quality | — | `auditors/` |
| [Immersive Scrolling Auditor](./auditors/immersive-scrolling-auditor.md) | Scroll Performance | G7 | `auditors/` |
| [Immersive Experience Auditor](./auditors/immersive-experience-auditor.md) | Overall Experience | — | `auditors/` |
| [SEO Audit Agent](./auditors/seo-audit-agent.md) | Search Optimization | — | `auditors/` |
| [Spec Compliance Auditor](./auditors/spec-compliance-auditor.md) | **Spec vs Output** | — | `auditors/` |
| [Hydration Audit Agent](./auditors/hydration-audit-agent.md) | **React Hydration** | — | `auditors/` |
| [Design Slop Auditor](./auditors/design-slop-auditor.md) | **AI Slop Detection** | — | `auditors/` |
| [Gate Guard Auditor](./auditors/gate-guard-auditor.md) | **Pipeline Compliance** | G9 | `auditors/` |
| [Content Audit Agent](./auditors/content-audit-agent.md) | **Content Quality** | — | `auditors/` |
| [Content Research Reconciliation Agent](./auditors/content-research-reconciliation-agent.md) | **Research→Spec Verification** | G2.5 | `auditors/` |
| [Content Research Integration Agent](./auditors/content-research-integration-agent.md) | **Spec→Artifact Verification** | G5.1 | `auditors/` |
| [Design Research Reconciliation Agent](./auditors/design-research-reconciliation-agent.md) | **Design Authenticity** | G4.1 | `auditors/` |
| [Design Research Implementation Auditor](./auditors/design-research-implementation-auditor.md) | **Design Fidelity Audit** | G5.2 | `auditors/` |
| [Accuracy Audit Agent](./auditors/accuracy-audit-agent.md) | **Scientific Claims** | G6 (conceptual) | `auditors/` |
| [Pedagogy Audit Agent](./auditors/pedagogy-audit-agent.md) | **Learning Effectiveness** | G6.5 (conceptual) | `auditors/` |
| [Diagram Clarity Auditor](./auditors/diagram-clarity-auditor.md) | **Diagram Comprehension** | G7 (conceptual) | `auditors/` |
| [Data Accuracy Auditor](./auditors/data-accuracy-auditor.md) | **Data-to-Visual Fidelity** | G6.1 (data journalism) | `auditors/` |
| [Prose Auditor Agent](./auditors/prose-auditor-agent.md) | **Writing Craft & AI Slop Detection** | G6.6 | `auditors/` |

**Report Storage:**
- Citation Reports: `auditors/CitationReports/`
- Visual Reports: `auditors/VisualAuditReports/`

### 📚 Content Creators
*Content creation and editorial specialists*

| Agent | Domain | Path |
|-------|--------|------|
| [Historian Writer](./content/historian-writer-expert.md) | Historical Narrative | `content/` |
| [Historian Editor](./content/historian-editor-expert.md) | Fact-Checking (G5) | `content/` |
| [Essayist Expert](./content/essayist-expert.md) | Academic Writing | `content/` |
| [Copywriter Marketing](./content/copywriter-marketing-expert.md) | Conversion Copy | `content/` |
| [Data Journalist Writer](./content/data-journalist-writer-expert.md) | Data Journalism Prose | `content/` |

### 🔬 Research
*Source discovery and verification*

| Agent | Domain | Gate | Path |
|-------|--------|------|------|
| [Brainstorming Agent](./research/brainstorming-agent.md) | Research Design | — | `research/` |
| [Research & Citations](./research/research-citations-expert.md) | Tier 1-2 Sources | — | `research/` |
| [Image Research & Licensing](./research/image-research-licensing-expert.md) | Public Domain Images | — | `research/` |
| [Design Researcher](./research/design-researcher.md) | Visual Identity Research | G4 | `research/` |
| [Concept Research Agent](./research/concept-research-agent.md) | Concept Verification | G2 (conceptual) | `research/` |
| [Visualization Research Agent](./research/visualization-research-agent.md) | Visualization Blueprints | G4.V | `research/` |

> **Note**: Research agents are orchestrated by specialized orchestrators. The [Research Orchestrator](./orchestrators/research-orchestrator.md) owns G2 for historical essays. The [Concept Research Agent](./research/concept-research-agent.md) owns G2 for conceptual essays. Design Researcher supports both pipelines (with Archival or Pedagogical lens).

### 🌏 Regional Experts
*Subject matter specialists by region*

| Agent | Region | Path |
|-------|--------|------|
| [Burmese Historian Expert](./regional/burmese-historian-expert.md) | 🇲🇲 Myanmar/Burma | `regional/` |
| [Thai Historian Expert](./regional/thai-historian-expert.md) | 🇹🇭 Thailand | `regional/` |

### ⚙️ Engineering
*Technical implementation specialists*

| Agent | Domain | Path |
|-------|--------|------|
| [Frontend Architecture Expert](./engineering/frontend-architecture-expert.md) | **Library Selection & Architecture** | `engineering/` |
| [Software Engineering](./engineering/software-engineering-expert.md) | Next.js Full-Stack | `engineering/` |
| [Frontend Debugging](./engineering/frontend-debugging-expert.md) | React/Next.js Debug | `engineering/` |
| [Immersive Experience Engineer](./engineering/immersive-experience-engineer.md) | 60fps Mobile | `engineering/` |
| [SVG Illustration & Animation](./engineering/svg-illustration-animation-expert.md) | Inline SVG | `engineering/` |
| [UI/UX Design](./engineering/ui-ux-design-expert.md) | Interface Design | `engineering/` |
| [Template Integration](./engineering/template-integration-engineer.md) | Template → Next.js | `engineering/` |
| [SEO Specialist](./engineering/seo-specialist-expert.md) | Technical SEO | `engineering/` |
| [Data Visualization Architect](./engineering/data-visualization-architect-expert.md) | Programmatic Data Viz | `engineering/` |

### 🔧 Utilities
*Support and enhancement agents*

| Agent | Purpose | Path |
|-------|---------|------|
| [Visual Essay Intake Enhancer](./utilities/visual-essay-intake-enhancer.md) | Rough Request → Structured Intake | `utilities/` |
| [Visual Essay Refurbish Agent](./utilities/visual-essay-refurbish-agent.md) | Legacy Essay → Pipeline Compliance | `utilities/` |
| [Scrollytelling Invocation Enhancer](./utilities/scrollytelling-invocation-enhancer.md) | Request → Structured Brief | `utilities/` |
| [Visual Essay Invocation Agent](./utilities/visual-essay-invocation-agent.md) | Generate Visual Essay Specs | `utilities/` |
| [README Curator](./utilities/readme-curator.md) | Documentation Routing | `utilities/` |

**Resources:**
- Invocation Templates: `utilities/InvocationTemplates/`

---

## Relationship Diagrams

### Visual Essay Production Pipeline

```
                    ┌─────────────────────────────┐
                    │  VISUAL ESSAY INTAKE        │
                    │  ENHANCER (PRE-PHASE)       │
                    │  utilities/                 │
                    │                             │
                    │  Rough request → Structured │
                    │  intake document            │
                    └──────────────┬──────────────┘
                                   │
                                   ▼
                        ┌─────────────────────────────┐
                        │   VISUAL ESSAY ORCHESTRATOR │
                        │        (TOP LEVEL)          │
                        └──────────────┬──────────────┘
                                       │
   ┌───────────────────────────────────┼───────────────────────────────────┐
   │                    │                    │                              │
   ▼                    ▼                    ▼                              ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐              ┌─────────────┐
│  RESEARCH   │  │ INVOCATION  │  │ SCROLLY-    │              │ META AUDIT  │
│ORCHESTRATOR │  │   AGENT     │  │   TELLING   │              │ORCHESTRATOR │
│  (Phase 2)  │  │  (Phase 3)  │  │   EXPERT    │              │  (Phase 5)  │
│     G2      │  │     G3      │  │  (Phase 4)  │              │   G6, G7    │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘              └──────┬──────┘
       │                │                │                            │
       │ Uses SKILL.md  │ Builds spec    │ Implements                 │ Verifies
       │ as blueprint   │ from research  │ the spec                   │ everything
       ▼                ▼                ▼                            ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ • Brainstorming │  │ • Ingests res.  │  │ • Historian     │  │ • Scrolling     │
│ • Research &    │  │   package       │  │   Writer/Editor │  │   Auditor (G7)  │
│   Citations     │  │ • Applies       │  │ • UI/UX Design  │  │ • Citation      │
│ • Citation Audit│  │   SKILL.md      │  │ • SVG Expert    │  │   Audit (G6)    │
│   (validation)  │  │ • Populates     │  │ • Software Eng  │  │ • Visual Audit  │
│ • Routes to:    │  │   6-layer spec  │  │ • Immersive Eng │  │ • SEO Audit     │
│   Regional/     │  │ • Avoids GAPS   │  │                 │  │                 │
│   Historians    │  │                 │  │                 │  │                 │
│                 │  │ Outputs:        │  │ Implements      │  │                 │
│ Outputs:        │  │ specs/          │  │ the spec        │  │                 │
│ research/       │──▶ [topic].md     │──▶ (research-      │  │                 │
│ package         │  │                 │  │  backed)        │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘

Flow: Intake Enhancer → Orchestrator → Research → Spec → Implementation
      (structures)      (coordinates)   (fills)    (grounds)  (realizes)
```

### Conceptual Essay Pipeline (Data Journalism Mode)

```
                        ┌─────────────────────────────┐
                        │  CONCEPTUAL ESSAY            │
                        │  ORCHESTRATOR                │
                        │  (Data Journalism Mode)      │
                        └──────────────┬──────────────┘
                                       │
   ┌───────────────────────────────────┼───────────────────────────────────┐
   │                    │                    │                              │
   ▼                    ▼                    ▼                              ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐              ┌─────────────┐
│  CONCEPT    │  │ INVOCATION  │  │  PRODUCTION │              │ AUDIT SUITE │
│  RESEARCH   │  │   AGENT     │  │  (Phase 5)  │              │  (Phase 6)  │
│  AGENT      │  │  (Phase 3)  │  │             │              │             │
│  (Phase 2)  │  │  + Layer 4b │  │             │              │             │
│  + Data     │  │    data viz │  │             │              │             │
│  Journalism │  │    specs    │  │             │              │             │
│  Profile    │  │             │  │             │              │             │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘              └──────┬──────┘
       │                │                │                            │
       │ Produces:      │ Produces:      │ Team:                      │ Includes:
       │ DATASETS.md    │ Layer 4b viz   │ Data Journalist Writer     │ Accuracy Audit
       │ STATISTICS.md  │ specs for      │ Data Viz Architect         │ Data Accuracy
       │ COMPARISONS.md │ choropleths,   │ SVG Expert                 │   Auditor (G6.1)
       │ PROJECTIONS.md │ Sankey, etc.   │ Software Engineer          │ Pedagogy Audit
       │ + standard     │                │ Immersive Experience       │ Diagram Clarity
       │   deliverables │                │ UI/UX Design               │ Scroll Audit
       ▼                ▼                ▼                            ▼
```

### Gate Dependency Chain (Enforced by Gate Guard Auditor)

```
┌─────────────────────────────────────────────────────────────────────┐
│  GATE GUARD: PRE-PHASE VERIFICATION MODE                           │
│  Blocks premature advancement to prevent "build first, doc later"  │
└─────────────────────────────────────────────────────────────────────┘

G1 (Intake) ──► G2 (Research) ──► G3 (Spec) ──► G4 (Design Research)
                                                         │
                                    ┌────────────────────┘
                                    │
                              ═══════════════
                              ║ GATE GUARD  ║ ← Critical checkpoint
                              ║ MUST PASS   ║   before ANY code
                              ║ G1-G4       ║
                              ═══════════════
                                    │
                                    ▼
                           G5 (Implementation)
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
              G6 (Citation)   G7 (Scroll)    G8 (Mobile)
                    │               │               │
                    └───────────────┼───────────────┘
                                    ▼
                           ═══════════════
                           ║ GATE GUARD  ║ ← Final checkpoint
                           ║ G9 PUBLISH  ║   before publication
                           ═══════════════

❌ ANTI-PATTERN PREVENTED:
   Build → Audit → Retroactively create research/spec (spec describes code)

✅ CORRECT FLOW:
   Research → Spec → Design → Build → Audit (spec guides code)
```

### Audit Pipeline

```
┌─────────────────────────────────────────────────────────────────────┐
│                    META AUDIT ORCHESTRATOR                           │
│                    orchestrators/                                    │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
   ┌─────────┬─────────┬───────┼───────┬─────────┬─────────┬─────────┐
   │         │         │       │       │         │         │         │
   ▼         ▼         ▼       ▼       ▼         ▼         ▼         ▼
┌───────┐┌───────┐┌───────┐┌───────┐┌───────┐┌───────┐┌───────┐┌───────┐
│SCROLL-││EXPER- ││VISUAL ││CITA-  ││QUOTES ││ SEO   ││ SPEC  ││       │
│ ING   ││ IENCE ││AUDITOR││ TION  ││ AUDIT ││ AUDIT ││COMPLI-││  ...  │
│AUDITOR││AUDITOR││       ││ AUDIT ││       ││       ││ ANCE  ││       │
└───────┘└───────┘└───────┘└───────┘└───────┘└───────┘└───────┘└───────┘
   │         │         │       │       │         │         │
   └─────────┴─────────┴───────┴───────┴─────────┴─────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ UNIFIED CERTIFICATION│
                    │ ✅ CERTIFIED         │
                    │ ⚠️ CONDITIONAL       │
                    │ ❌ REJECTED          │
                    └─────────────────────┘
```

---

## Quality Gate Ownership

| Gate | Name | Phase | Owner Agent | Category |
|------|------|-------|-------------|----------|
| G1 | Intake Approval | 1→2 | Visual Essay Orchestrator | `orchestrators/` |
| G2 | **Research Complete** | 2→3 | **Research Orchestrator** | `orchestrators/` |
| G3 | **Spec Approval** | 3→4 | Visual Essay Orchestrator | `orchestrators/` |
| G4 | Design Research | 4 | **Design Researcher** | `research/` |
| G4.1 | Design Research Reconciliation | 4 | **Design Research Reconciliation Agent** | `auditors/` |
| G5 | Content Complete | 4→5 | **Historian Editor** | `content/` |
| G5.2 | Design Research Integration | 5 | **Design Research Integration Agent** | `auditors/` |
| G6 | Citation Audit | 5 | **Citation Audit Agent** | `auditors/` |
| G7 | Scroll Certification | 5 | **Immersive Scrolling Auditor** | `auditors/` |
| G8 | Mobile Verification | 5→6 | Visual Essay Orchestrator | `orchestrators/` |
| G9 | Publication Approval | 6 | Visual Essay Orchestrator | `orchestrators/` |

> **Key Change (v1.1)**: Research (G2) now happens BEFORE Spec construction (G3). SKILL.md serves as the research blueprint—research gathers what the spec template requires. The Invocation Agent builds the spec from verified research. 6 phases, 9 gates.

---

## Invocation Pattern Quick Reference

### Orchestrator Invocation
```
Using @agents/orchestrators/visual-essay-orchestrator.md, initiate production for 
a visual essay about "[TOPIC]".
```

### Auditor Invocation
```
Using @agents/auditors/citation-audit-agent.md, audit the citations for
/essays/visual/[SLUG]
```

### Content Invocation
```
Using @agents/content/historian-writer-expert.md, create a compelling 
narrative about [TOPIC] based on the research provided.
```

### Research Invocation
```
Using @agents/research/research-citations-expert.md, find Tier 1-2 sources 
for claims about [TOPIC].
```

### Regional Invocation
```
Using @agents/regional/burmese-historian-expert.md, provide the complete history 
of [BURMESE DISH] including origins, evolution, and regional variations.
```

### Engineering Invocation
```
Using @agents/engineering/immersive-experience-engineer.md, optimize the 
scroll performance for [ESSAY] to achieve 60fps on mobile.
```

### Utility Invocation
```
# Visual essay intake enhancement
Using @agents/utilities/visual-essay-intake-enhancer.md, enhance this request:
"[ROUGH VISUAL ESSAY IDEA]"

# Legacy essay refurbish
Using @agents/utilities/visual-essay-refurbish-agent.md, evaluate and
prepare a refurbish intake for the visual essay at:
src/app/essays/[essay-slug]/

# Scrollytelling request enhancement
Using @agents/utilities/scrollytelling-invocation-enhancer.md, enhance this request:
"[ROUGH SCROLLYTELLING IDEA]"
```

---

## Adding New Agents

When creating a new agent:

1. **Follow META-AGENT-FRAMEWORK.md** — Use the template and checklist
2. **Place in correct category** — Choose the appropriate subdirectory
3. **Update category README** — Add to the category's agent table
4. **Update this registry** — Add to the appropriate category section
5. **Update main README.md** — Add Quick Reference entry and detailed section
6. **Define relationships** — Document collaboration with other agents

See [META-AGENT-FRAMEWORK.md](./META-AGENT-FRAMEWORK.md) for the complete agent creation guide.

---

## Category Statistics

| Category | Count | Key Responsibility |
|----------|-------|-------------------|
| 🎬 Orchestrators | 6 | Multi-agent coordination |
| 🔍 Auditors | 21 | Quality verification |
| 📚 Content | 5 | Content creation |
| 🔬 Research | 6 | Source discovery |
| 🌏 Regional | 2 | Subject expertise |
| ⚙️ Engineering | 9 | Technical implementation |
| 🔧 Utilities | 5 | Support functions |
| **Total** | **54** | |

---

## See Also

- **[README.md](./README.md)** — Detailed documentation, tutorials, invocation examples
- **[META-AGENT-FRAMEWORK.md](./META-AGENT-FRAMEWORK.md)** — Agent creation framework
- **[Orchestration Overview](../README.md)** — System architecture
- **[Skills README](../skills/README.md)** — Procedural knowledge
- **Category READMEs:**
  - [orchestrators/README.md](./orchestrators/README.md)
  - [auditors/README.md](./auditors/README.md)
  - [content/README.md](./content/README.md)
  - [research/README.md](./research/README.md)
  - [regional/README.md](./regional/README.md)
  - [engineering/README.md](./engineering/README.md)
  - [utilities/README.md](./utilities/README.md)

---

*Last Updated: February 2026*

### Recent Changes
- Added **Prose Auditor Agent** to auditors — AI slop detection, voice consistency auditing, transition quality, writing craft certification for G6.6
- Upgraded **Pedagogy Audit Agent** — added internal framework consistency checking (paradigm regression detection), operating modes, misconception introduction detection
- Updated category statistics (Auditors: 20→21, Total: 53→54)
- Added **Visualization Research Agent** to research — domain-specific diagram research, reference exemplar curation, comprehension test design for G4.V
- Added **Data Journalist Writer Expert** to content — publication-quality data journalism prose for Data Journalism mode
- Added **Data Visualization Architect Expert** to engineering — programmatic data viz (choropleths, Sankey, comparison widgets) for Data Journalism mode
- Added **Data Accuracy Auditor** to auditors — G6.1 data-to-visual fidelity verification for Data Journalism mode
- Extended **Conceptual Essay Orchestrator** with Data Journalism operating mode for data-driven argumentative essays
- Added `orchestration/profiles/research/data-journalism-research-profile.md` with DATASETS.md, STATISTICS.md, COMPARISONS.md, PROJECTIONS.md deliverables
- Extended **Conceptual Essay Invocation SKILL** with Layer 4b Data Visualization Specifications
- Promoted scroll-lock patterns 18 (Map Journey) and 19 (Data Build) from 🔮 Future to 📋 Spec Only
- Updated category statistics (Content: 4→5, Engineering: 8→9, Auditors: 19→20, Total: 49→52)
- Added **Conceptual Essay Orchestrator** to orchestrators — end-to-end pipeline for conceptual/educational essays with diagram-first design
- Added **Concept Research Agent** to research — verifies scientific claims, designs learning sequences, documents misconceptions for G2 (conceptual)
- Added **Accuracy Audit Agent** to auditors — verifies all claims match CLAIMS.md for G6 (conceptual essays)
- Added **Pedagogy Audit Agent** to auditors — verifies learning sequence and misconception coverage for G6.5 (conceptual essays)
- Added **Diagram Clarity Auditor** to auditors — verifies diagram language consistency and accessibility for G7 (conceptual essays)
- Extended **Design Researcher** with Pedagogical Lens for conceptual essay design research
- Added `orchestration/base/` directory with base-artifact-orchestrator.md for shared gate patterns
- Added `orchestration/profiles/` directory with research and design profiles for compositional workflows
- Updated category statistics (Orchestrators: 5→6, Research: 4→5, Auditors: 16→19, Total: 44→49)
- Added **Design Research Reconciliation Agent** (G4.1) to auditors category — three-phase audit verifying thematic authenticity, cross-essay novelty, and CSS implementation fidelity
- Added **Design Research Integration Agent** (G5.2) to auditors category — CSS-to-TSX binding verification requiring ≥95% selector binding; catches convention mismatches
- Updated Quality Gate Ownership table with G4.1 and G5.2 gates
- Updated category statistics (Auditors: 12 → 16, Total: 37 → 44)
- Added **Visual Essay Refurbish Agent** to utilities category — evaluates legacy essays without research packages, extracts design/content intent, proposes expansions, formalizes intake documents for orchestrator processing
- Added **Design Slop Auditor** to auditors category — detects AI-generated generic design patterns, enforces subject-derived aesthetics, provides remediation through Design Research Reports
- Updated category statistics (Auditors: 9 → 10, Total: 35 → 36)
- Added **Hydration Audit Agent** to auditors category — detects SSR/client hydration mismatches (IntersectionObserver race conditions, useState initialization, browser API access)
- Added **Frontend Architecture Expert** to engineering category — world-class advisor for library selection and complex front-end experiences
- Added **Visual Essay Intake Enhancer** to utilities category
- Updated visual essay pipeline diagram to show intake enhancer as pre-phase
- Added **Spec Compliance Auditor** to auditors category
- Updated audit pipeline diagram to include spec compliance
