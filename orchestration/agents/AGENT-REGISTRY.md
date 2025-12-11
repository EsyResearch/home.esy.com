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
├── orchestrators/               # 🎬 Top-level coordination (4)
├── auditors/                    # 🔍 Quality verification (7)
├── content/                     # 📚 Content creation (5)
├── research/                    # 🔬 Source discovery (2)
├── regional/                    # 🌏 Regional specialists (2)
├── engineering/                 # ⚙️ Technical implementation (7)
└── utilities/                   # 🔧 Support & enhancement (3)
```

---

## Quick Index by Category

### 🎬 Orchestrators
*Top-level agents that coordinate multiple specialists*

| Agent | Purpose | Path |
|-------|---------|------|
| [Visual Essay Orchestrator](./orchestrators/visual-essay-orchestrator.md) | **TOP-LEVEL** — End-to-end production pipeline | `orchestrators/` |
| [Research Orchestrator](./orchestrators/research-orchestrator.md) | **Research pipeline** — Phase 2, domain routing, package assembly | `orchestrators/` |
| [Meta Audit Orchestrator](./orchestrators/meta-audit-orchestrator.md) | Multi-domain audit coordination | `orchestrators/` |
| [Scrollytelling Expert](./orchestrators/scrollytelling-expert.md) | Mobile-native immersive narratives | `orchestrators/` |

### 🔍 Auditors
*Quality verification and certification*

| Agent | Domain | Gate | Path |
|-------|--------|------|------|
| [Citation Audit Agent](./auditors/citation-audit-agent.md) | Sources & Links | G5 | `auditors/` |
| [Quotes Audit Agent](./auditors/quotes-audit-agent.md) | Quote Authenticity | — | `auditors/` |
| [Visual Auditor Agent](./auditors/visual-auditor-agent.md) | SVG Quality | — | `auditors/` |
| [Scrollytelling Audit Agent](./auditors/scrollytelling-audit-agent.md) | Experience Quality | — | `auditors/` |
| [Immersive Scrolling Auditor](./auditors/immersive-scrolling-auditor.md) | Scroll Performance | G6 | `auditors/` |
| [Immersive Experience Auditor](./auditors/immersive-experience-auditor.md) | Overall Experience | — | `auditors/` |
| [SEO Audit Agent](./auditors/seo-audit-agent.md) | Search Optimization | — | `auditors/` |

**Report Storage:**
- Citation Reports: `auditors/CitationReports/`
- Visual Reports: `auditors/VisualAuditReports/`

### 📚 Content Creators
*Content creation and editorial specialists*

| Agent | Domain | Path |
|-------|--------|------|
| [Historian Writer](./content/historian-writer-expert.md) | Historical Narrative | `content/` |
| [Historian Editor](./content/historian-editor-expert.md) | Fact-Checking (G3) | `content/` |
| [Essayist Expert](./content/essayist-expert.md) | Academic Writing | `content/` |
| [Copywriter Marketing](./content/copywriter-marketing-expert.md) | Conversion Copy | `content/` |

### 🔬 Research
*Source discovery and verification*

| Agent | Domain | Gate | Path |
|-------|--------|------|------|
| [Brainstorming Agent](./research/brainstorming-agent.md) | Research Design | — | `research/` |
| [Research & Citations](./research/research-citations-expert.md) | Tier 1-2 Sources | — | `research/` |
| [Image Research & Licensing](./research/image-research-licensing-expert.md) | Public Domain Images | — | `research/` |

> **Note**: These agents are orchestrated by the [Research Orchestrator](./orchestrators/research-orchestrator.md) which owns G2 (Research Complete).

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
| [Software Engineering](./engineering/software-engineering-expert.md) | Next.js Full-Stack | `engineering/` |
| [Frontend Debugging](./engineering/frontend-debugging-expert.md) | React/Next.js Debug | `engineering/` |
| [Immersive Experience Engineer](./engineering/immersive-experience-engineer.md) | 60fps Mobile | `engineering/` |
| [SVG Illustration & Animation](./engineering/svg-illustration-animation-expert.md) | Inline SVG | `engineering/` |
| [UI/UX Design](./engineering/ui-ux-design-expert.md) | Interface Design | `engineering/` |
| [Template Integration](./engineering/template-integration-engineer.md) | Template → Next.js | `engineering/` |
| [SEO Specialist](./engineering/seo-specialist-expert.md) | Technical SEO | `engineering/` |

### 🔧 Utilities
*Support and enhancement agents*

| Agent | Purpose | Path |
|-------|---------|------|
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
                        │   VISUAL ESSAY ORCHESTRATOR │
                        │        (TOP LEVEL)          │
                        └──────────────┬──────────────┘
                                       │
        ┌──────────────────────────────┼──────────────────────────────┐
        │                              │                              │
        ▼                              ▼                              ▼
   ┌─────────────┐              ┌─────────────┐              ┌─────────────┐
   │  RESEARCH   │              │ SCROLLY-    │              │ META AUDIT  │
   │ORCHESTRATOR │              │   TELLING   │              │ORCHESTRATOR │
   │  (Phase 2)  │              │   EXPERT    │              │  (Phase 4)  │
   │     G2      │              │  (Phase 3)  │              │             │
   └──────┬──────┘              └──────┬──────┘              └──────┬──────┘
          │                            │                            │
          │ Coordinates:               │ Coordinates:               │ Coordinates:
          ▼                            ▼                            ▼
   ┌─────────────────┐          ┌─────────────────┐          ┌─────────────────┐
   │ • Brainstorming │          │ • Historian     │          │ • Scrolling     │
   │ • Research &    │          │   Writer/Editor │          │   Auditor (G6)  │
   │   Citations     │          │ • UI/UX Design  │          │ • Citation      │
   │ • Citation Audit│          │ • SVG Expert    │          │   Audit (G5)    │
   │   (validation)  │          │ • Software Eng  │          │ • Visual Audit  │
   │ • Routes to:    │          │ • Immersive Eng │          │ • SEO Audit     │
   │   Regional/     │          │                 │          │                 │
   │   Historians    │          │ Uses research/  │          │                 │
   │                 │          │ package from    │          │                 │
   │ Outputs:        │          │ Phase 2         │          │                 │
   │ research/       │──────────▶                 │          │                 │
   │ package         │          │                 │          │                 │
   └─────────────────┘          └─────────────────┘          └─────────────────┘
```

### Audit Pipeline

```
┌─────────────────────────────────────────────────────────────────────┐
│                    META AUDIT ORCHESTRATOR                           │
│                    orchestrators/                                    │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
       ┌───────────┬───────────┼───────────┬───────────┬───────────┐
       │           │           │           │           │           │
       ▼           ▼           ▼           ▼           ▼           ▼
  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
  │SCROLLING│ │EXPERIENCE│ │ VISUAL  │ │CITATION │ │ QUOTES  │ │   SEO   │
  │ AUDITOR │ │ AUDITOR  │ │ AUDITOR │ │  AUDIT  │ │  AUDIT  │ │  AUDIT  │
  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘
       │           │           │           │           │           │
       └───────────┴───────────┴─────┬─────┴───────────┴───────────┘
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

| Gate | Name | Owner Agent | Category |
|------|------|-------------|----------|
| G1 | Brief Approval | Visual Essay Orchestrator | `orchestrators/` |
| G2 | **Research Complete** | **Research Orchestrator** | `orchestrators/` |
| G3 | Design Research | Scrollytelling Expert | `orchestrators/` |
| G4 | Content Complete | **Historian Editor** | `content/` |
| G5 | Citation Audit | **Citation Audit Agent** | `auditors/` |
| G6 | Scroll Certification | **Immersive Scrolling Auditor** | `auditors/` |
| G7 | Mobile Verification | Visual Essay Orchestrator | `orchestrators/` |
| G8 | Publication Approval | Visual Essay Orchestrator | `orchestrators/` |

> **Key Change**: G2 is now "Research Complete" owned by the Research Orchestrator. Research happens BEFORE production.

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
Using @agents/utilities/scrollytelling-invocation-enhancer.md, enhance this request:
"[ROUGH IDEA]"
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
| 🎬 Orchestrators | 4 | Multi-agent coordination |
| 🔍 Auditors | 7 | Quality verification |
| 📚 Content | 4 | Content creation |
| 🔬 Research | 3 | Source discovery |
| 🌏 Regional | 2 | Subject expertise |
| ⚙️ Engineering | 7 | Technical implementation |
| 🔧 Utilities | 3 | Support functions |
| **Total** | **30** | |

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

*Last Updated: December 11, 2024*
