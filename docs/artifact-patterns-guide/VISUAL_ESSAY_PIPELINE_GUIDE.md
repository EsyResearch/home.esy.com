# Visual Essay Pipeline Guide

> Created: December 30, 2024
> Last Updated: January 18, 2026

## Purpose

This guide documents the complete Visual Essay production pipeline, including all quality gates, agent ownership, and the flow from intake to publication. It serves as the authoritative reference for understanding how visual essays progress through the Esy orchestration system.

---

## Pipeline Overview

The Visual Essay Pipeline consists of **6 phases** and **13 quality gates** (G1-G9, plus G4.1, G4.5, G5.2, and G5.5). Every visual essay must pass through all applicable gates before publication.

### Phase Distribution

| Phase | Focus | Time Allocation |
|-------|-------|-----------------|
| Phase 1: Intake | Scope & intent | 5% |
| Phase 2: Research | Source gathering | 20% |
| Phase 3: Spec Build | Content specification | 10% |
| Phase 4: Production | Content, design, implementation | 40% |
| Phase 5: Audit | Quality verification | 10% |
| Phase 6: Publication | Final certification | 15% |

### Gate Flow

```
G1 → G2 → G3 → G4 → G4.1 → G4.5 → G5 → G5.2 → G5.5 → G6 → G7 → G8 → G9
```

---

## Complete Pipeline Diagram

```
╔══════════════════════════════════════════════════════════════════════════════════════╗
║                        VISUAL ESSAY ORCHESTRATOR PIPELINE                             ║
║                                 (13 Gates Pipeline)                                   ║
╚══════════════════════════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              PHASE 1: INTAKE (5%)                                    │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                        │
                          ┌─────────────▼─────────────┐
                          │          G1               │
                          │    INTAKE APPROVAL        │
                          │  ─────────────────────    │
                          │  • Structured intake doc  │
                          │  • Scope & intent clear   │
                          │  • Editorial direction    │
                          │  • SKILL.md requirements  │
                          └─────────────┬─────────────┘
                                        │
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                            PHASE 2: RESEARCH (20%)                                   │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                        │
                          ┌─────────────▼─────────────┐
                          │   Research Orchestrator   │
                          │  ─────────────────────    │
                          │  → Brainstorming Agent    │
                          │  → Research Citations     │
                          │  → Regional Experts       │
                          │  → Historians             │
                          └─────────────┬─────────────┘
                                        │
                          ┌─────────────▼─────────────┐
                          │          G2               │
                          │   RESEARCH COMPLETE       │
                          │  ─────────────────────    │
                          │  • research/ package      │
                          │  • CITATIONS.md           │
                          │  • FIGURES.md             │
                          │  • QUOTES.md              │
                          │  • TIMELINE.md            │
                          │  • VISUALS.md             │
                          │  • GAPS.md                │
                          │  • Primary sources        │
                          └─────────────┬─────────────┘
                                        │
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                          PHASE 3: SPEC BUILD (10%)                                   │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                        │
                          ┌─────────────▼─────────────┐
                          │  Visual Essay Invocation  │
                          │         Agent             │
                          │  ─────────────────────    │
                          │  • Builds spec FROM       │
                          │    research package       │
                          │  • 6-layer structure      │
                          │  • No orphan claims       │
                          └─────────────┬─────────────┘
                                        │
                          ┌─────────────▼─────────────┐
                          │          G3               │
                          │     SPEC APPROVAL         │
                          │  ─────────────────────    │
                          │  • EXPERIENCE-SPEC.md     │
                          │  • specs/[slug].md        │
                          │  • SEO requirements       │
                          │  • Research-backed        │
                          └─────────────┬─────────────┘
                                        │
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                            PHASE 4: PRODUCTION (40%)                                 │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                        │
           ┌────────────────────────────┼────────────────────────────┐
           │                            │                            │
           ▼                            ▼                            ▼
┌───────────────────┐      ┌───────────────────┐      ┌───────────────────┐
│  Design Researcher │      │ Scrollytelling    │      │ Image Research    │
│  ─────────────────│      │     Expert        │      │ Licensing Expert  │
│  Subject-derived  │      │ ─────────────────│      │ ─────────────────│
│  visual identity  │      │ → Historian Writer│      │ Wikimedia API     │
│                   │      │ → Historian Editor│      │ Public domain     │
│                   │      │ → UI/UX Designer  │      │ License verify    │
│                   │      │ → SW Engineer     │      │                   │
│                   │      │ → Immersive Eng   │      │                   │
│                   │      │ → SVG Expert      │      │                   │
└─────────┬─────────┘      └─────────┬─────────┘      └─────────┬─────────┘
          │                          │                          │
          └────────────────┬─────────┴──────────────────────────┘
                           │
          ┌────────────────▼────────────────┐
          │             G4                  │
          │       DESIGN RESEARCH           │
          │  ───────────────────────────    │
          │  • Design system defined        │
          │  • Subject-derived aesthetics   │
          │  • Color, typography, motifs    │
          │  • DESIGN-RESEARCH.md complete  │
          └────────────────┬────────────────┘
                           │
          ┌────────────────▼────────────────┐
          │            G4.1                 │
          │   DESIGN RESEARCH RECONCILIATION│
          │  ───────────────────────────    │
          │  • Thematic authenticity        │
          │  • Cross-essay novelty          │
          │  • CSS implements design res.   │
          │  • No aesthetic collisions      │
          └────────────────┬────────────────┘
                           │
          ┌────────────────▼────────────────┐
          │            G4.5                 │
          │       IMAGE SOURCING            │
          │  ───────────────────────────    │
          │  • All images sourced           │
          │  • Licenses verified            │
          │  • URLs extracted               │
          │  • Attribution data ready       │
          └────────────────┬────────────────┘
                           │
          ┌────────────────▼────────────────┐
          │             G5                  │
          │       CONTENT COMPLETE          │
          │  ───────────────────────────    │
          │  • All narrative written        │
          │  • All visuals created          │
          │  • Component implemented        │
          │  • Fact-checked vs. research    │
          └────────────────┬────────────────┘
                           │
          ┌────────────────▼────────────────┐
          │            G5.2                 │
          │   DESIGN RESEARCH INTEGRATION   │
          │  ───────────────────────────    │
          │  • CSS selectors bind to TSX    │
          │  • ≥95% className coverage      │
          │  • No convention mismatches     │
          │  • Styling properly applied     │
          └────────────────┬────────────────┘
                           │
          ┌────────────────▼────────────────┐
          │            G5.5                 │
          │  BIBLIOGRAPHY IMPLEMENTATION    │
          │  ───────────────────────────    │
          │  • Works Cited section          │
          │  • Image Credits section        │
          │  • A/V Credits (if applicable)  │
          │  • Data Sources (if applicable) │
          │  • Inline ↔ Bibliography sync   │
          └────────────────┬────────────────┘
                           │
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                            PHASE 5: AUDIT (10%)                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
                           │
          ┌────────────────▼────────────────┐
          │      Citation Audit Agent       │
          │  ───────────────────────────    │
          │  → Quotes Audit Agent           │
          │  • Source verification          │
          │  • Link health                  │
          │  • Tier distribution (80% T1-2) │
          └────────────────┬────────────────┘
                           │
          ┌────────────────▼────────────────┐
          │             G6                  │
          │        CITATION AUDIT           │
          │  ───────────────────────────    │
          │  • All sources verified         │
          │  • Quotes authenticated         │
          │  • No broken links              │
          │  • Content matches research     │
          └────────────────┬────────────────┘
                           │
          ┌────────────────▼────────────────┐
          │    Immersive Scrolling Auditor  │
          │  ───────────────────────────    │
          │  • Scroll-lock behavior         │
          │  • 60fps performance            │
          │  • Mobile Safari compatibility  │
          │  • Real device testing          │
          └────────────────┬────────────────┘
                           │
          ┌────────────────▼────────────────┐
          │             G7                  │
          │     SCROLL CERTIFICATION        │
          │  ───────────────────────────    │
          │  • Score ≥ 8.0/10               │
          │  • No Tier 1 failures           │
          │  • Mobile verified              │
          │  • 60fps confirmed              │
          └────────────────┬────────────────┘
                           │
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                         PHASE 6: PUBLICATION (15%)                                   │
└─────────────────────────────────────────────────────────────────────────────────────┘
                           │
          ┌────────────────▼────────────────┐
          │  Publish Artifact Orchestrator  │◄───── G8 OWNER
          │  ───────────────────────────    │
          │  Parallel Audits:               │
          │  ┌─────────────────────────┐    │
          │  │ Bibliography Orchestrator│   │
          │  │ (audit mode)            │    │
          │  └─────────────────────────┘    │
          │  ┌─────────────────────────┐    │
          │  │ Audit Orchestrator      │    │
          │  │ (quality domains)       │    │
          │  │ → Scroll, Experience    │    │
          │  │ → Visual, Content       │    │
          │  │ → Hydration, Spec       │    │
          │  └─────────────────────────┘    │
          │  ┌─────────────────────────┐    │
          │  │ Social Media Meta Expert│    │
          │  │ (audit mode)            │    │
          │  └─────────────────────────┘    │
          │  ┌─────────────────────────┐    │
          │  │ SEO Audit Agent         │    │
          │  └─────────────────────────┘    │
          │  ┌─────────────────────────┐    │
          │  │ Gate Guard Auditor      │    │
          │  │ (G1-G7 verification)    │    │
          │  └─────────────────────────┘    │
          └────────────────┬────────────────┘
                           │
                ┌──────────┴──────────┐
                │                     │
           ISSUES?                 NO ISSUES
                │                     │
                ▼                     │
   ┌────────────────────────┐         │
   │ QA Remediation         │         │
   │ Orchestrator           │         │
   │ ────────────────────── │         │
   │ --auto for 🟡/🟢       │         │
   │ --approval for 🔴/🟠   │         │
   │ Max iterations: 2      │         │
   └───────────┬────────────┘         │
               │                      │
               └──────────┬───────────┘
                          │
          ┌───────────────▼───────────────┐
          │             G8                │
          │   PUBLICATION CERTIFICATION   │
          │  ─────────────────────────    │
          │  ┌───────────────────────┐    │
          │  │ ✅ GO                 │    │
          │  │ All audits pass       │    │
          │  └───────────────────────┘    │
          │  ┌───────────────────────┐    │
          │  │ ⚠️ CONDITIONAL        │    │
          │  │ Minor issues only     │    │
          │  └───────────────────────┘    │
          │  ┌───────────────────────┐    │
          │  │ ❌ NO-GO              │    │
          │  │ Blocking issues       │    │
          │  └───────────────────────┘    │
          └───────────────┬───────────────┘
                          │
                     GO or CONDITIONAL
                          │
          ┌───────────────▼───────────────┐
          │             G9                │
          │     PUBLICATION APPROVAL      │
          │  ─────────────────────────    │
          │  • Director sign-off          │
          │  • visualEssays.ts updated    │
          │  • Deployment triggered       │
          └───────────────┬───────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │     🚀 PUBLISHED      │
              │     esy.com/essays/   │
              └───────────────────────┘
```

---

## Gate Reference

### Gate Ownership

| Gate | Name | Owner | Phase |
|------|------|-------|-------|
| G1 | Intake Approval | Visual Essay Orchestrator | Intake |
| G2 | Research Complete | Research Orchestrator | Research |
| G3 | Spec Approval | Visual Essay Orchestrator | Spec Build |
| G4 | Design Research | Design Researcher | Production |
| G4.1 | Design Research Reconciliation | Design Research Reconciliation Agent | Production |
| G4.5 | Image Sourcing | Image Research Licensing Expert | Production |
| G5 | Content Complete | Production Orchestrator | Production |
| G5.2 | Design Research Integration | Design Research Integration Agent | Production |
| G5.5 | Bibliography Implementation | Bibliography Orchestrator | Production |
| G6 | Citation Audit | Citation Audit Agent | Audit |
| G7 | Scroll Certification | Immersive Scrolling Auditor | Audit |
| G8 | Publication Certification | Publish Artifact Orchestrator | Publication |
| G9 | Publication Approval | Visual Essay Orchestrator | Publication |

### Gate Pass Criteria

| Gate | Pass Criteria | Blocks |
|------|---------------|--------|
| **G1** | Scope defined, SKILL.md requirements identified, research targets clear | G2 |
| **G2** | Research package complete: figures, quotes, timeline, visuals all verified | G3 |
| **G3** | 6-layer spec complete, all content research-backed, no orphan claims | G4 |
| **G4** | Unique visual identity derived from subject matter, DESIGN-RESEARCH.md complete | G4.1 |
| **G4.1** | Thematic authenticity verified, no cross-essay collisions, CSS implements design research | G4.5 |
| **G4.5** | All images sourced, URLs extracted, licenses verified | G5 |
| **G5** | All sections drafted, fact-checked, uses research package | G5.2 |
| **G5.2** | CSS selectors bind to TSX classNames (≥95%), no convention mismatches | G5.5 |
| **G5.5** | Bibliography section complete (Works Cited, Image Credits, A/V, Data Sources) | G6 |
| **G6** | Citation Certification achieved (content vs. research match) | G7 |
| **G7** | Immersive Scrolling Auditor certification (≥8.0/10, 60fps, mobile verified) | G8 |
| **G8** | Pre-publication certification (GO/CONDITIONAL) from all domain audits | G9 |
| **G9** | Director sign-off on complete package | Deploy |

---

## Agent Ecosystem

### Orchestrators

| Orchestrator | Responsibility | Gates Owned |
|--------------|----------------|-------------|
| **Visual Essay Orchestrator** | Pipeline executive, editorial direction | G1, G3, G9 |
| **Research Orchestrator** | Research coordination | G2 |
| **Production Orchestrator** | Production coordination | G5 (participates in G4-G5.5) |
| **Bibliography Orchestrator** | Bibliography implementation & audit | G5.5 |
| **Publish Artifact Orchestrator** | Pre-publication certification | G8 |
| **Audit Orchestrator** | Multi-domain quality assessment | (Invoked by G8) |
| **QA Remediation Orchestrator** | Issue resolution | (Invoked by G8) |
| **SEO Orchestrator** | SEO pipeline management | (Invoked by G8) |

### Specialist Agents

| Agent | Domain | Role in Pipeline |
|-------|--------|------------------|
| **Brainstorming Agent** | Research | Question formulation (G2) |
| **Research Citations Expert** | Research | Source discovery (G2) |
| **Design Researcher** | Design | Visual identity research (G4) |
| **Design Research Reconciliation Agent** | Design | Thematic authenticity, cross-essay novelty (G4.1) |
| **Design Slop Auditor** | Design | AI pattern detection, subject-derived design verification (G4, G7) |
| **Image Research Licensing Expert** | Images | Image sourcing & licensing (G4.5) |
| **Production Orchestrator** | Production | Content creation coordination (G5) |
| **Historian Writer** | Content | Narrative writing (G5) |
| **Historian Editor** | Content | Fact-checking (G5) |
| **Content Research Reconciliation Agent** | Content | Research-to-spec gap analysis (post-G2) |
| **Content Research Integration Agent** | Content | Spec-to-artifact fidelity verification (post-G5) |
| **Design Research Integration Agent** | Engineering | CSS↔TSX binding verification (G5.2) |
| **Design Research Implementation Auditor** | Engineering | Spec-to-implementation compliance verification (post-G5) |
| **Animation Pattern Auditor** | Engineering | Scroll-lock pattern & animation taxonomy mapping (G5, G7) |
| **Citation Audit Agent** | Audit | Source verification (G6) |
| **Quotes Audit Agent** | Audit | Quote verification (via G6) |
| **Immersive Scrolling Auditor** | Audit | Scroll performance (G7) |
| **Rich Results Auditor** | SEO | Article/BreadcrumbList/FAQPage schema & OG/Twitter meta (G8) |
| **Social Media Meta Expert** | Publication | OG/Twitter meta (G8) |
| **SEO Audit Agent** | Publication | Search optimization (G8) |
| **Gate Guard Auditor** | Publication | G1-G9 pipeline compliance verification (G8) |

---

## Key Workflows

### Research → Spec Flow (G2 → G3)

```
SKILL.md (template) → Research Orchestrator → research/ package → Invocation Agent → specs/[slug].md
```

**Critical**: Research happens BEFORE spec construction. The spec is built FROM verified research, ensuring no orphan claims.

### Design Research Flow (G4 → G4.1 → G4.5)

```
Design Researcher → DESIGN-RESEARCH.md → Reconciliation Agent → Image Research Expert
                          │                      │                      │
                          ▼                      ▼                      ▼
                     G4: Visual           G4.1: CSS             G4.5: Images
                     identity              binds design          sourced
```

**Critical**: Design research must be reconciled (G4.1) before image sourcing (G4.5) to ensure visual assets match the design system.

### Content Integration Flow (G5 → G5.2 → G5.5)

```
Content Complete → Integration Agent → Bibliography Orchestrator
                         │                    │
                         ▼                    ▼
                   G5.2: CSS↔TSX        G5.5: Works Cited
                   binding verified      Image Credits
```

**Critical**: CSS must properly bind to TSX classNames (≥95% coverage) before bibliography implementation.

### Bibliography Flow (G5.5)

```
Content Complete → Bibliography Orchestrator → Works Cited + Image Credits + A/V + Data Sources
```

**Pattern References**:
- `docs/artifact-patterns-guide/BIBLIOGRAPHY_STRUCTURE_GUIDE.md`
- `docs/artifact-patterns-guide/ARTIFACT_CITATION_PATTERNS_GUIDE.md`

### Publication Certification Flow (G7 → G8 → G9)

```
Scroll Certified → Publish Artifact Orchestrator
                   ├─► Bibliography Audit
                   ├─► Audit Orchestrator (quality domains)
                   ├─► Social Media Meta
                   ├─► SEO Audit
                   └─► Gate Guard (G1-G7 verify)
                   │
                   ├─► Issues? → QA Remediation → Re-audit
                   │
                   └─► GO/CONDITIONAL/NO-GO → G9 Director Sign-off
```

---

## Certification Statuses

### G8 Publication Certification

| Status | Meaning | Action |
|--------|---------|--------|
| **✅ GO** | All audits pass, no blocking issues | Proceed to G9 |
| **⚠️ CONDITIONAL** | Minor issues (🟡/🟢) only | Proceed with documented conditions |
| **❌ NO-GO** | Blocking issues (🔴) remain | Return to remediation |

### Issue Severity

| Severity | Symbol | Impact |
|----------|--------|--------|
| Blocking | 🔴 | Must fix before any certification |
| Critical | 🟠 | Strongly recommended fix |
| Important | 🟡 | Should fix if time permits |
| Polish | 🟢 | Nice to have |

---

## G2 Requirements (Research Complete)

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

---

## G3 Requirements (Spec Approval)

The Visual Essay Orchestrator must verify spec is research-backed:

- [ ] Spec follows 6-layer SKILL.md structure
- [ ] All figure profiles sourced from `research/FIGURES.md`
- [ ] All quotes verified in `research/QUOTES.md`
- [ ] Narrative arc matches `research/TIMELINE.md`
- [ ] No claims from `research/GAPS.md` appear in spec
- [ ] Appropriate lens applied (mythology, history, etc.)

---

## Related Documents

### Orchestration Agents
- [Visual Essay Orchestrator](../../orchestration/agents/orchestrators/visual-essay-orchestrator.md)
- [Research Orchestrator](../../orchestration/agents/orchestrators/research-orchestrator.md)
- [Production Orchestrator](../../orchestration/agents/orchestrators/production-orchestrator.md)
- [Bibliography Orchestrator](../../orchestration/agents/orchestrators/bibliography-orchestrator.md)
- [Publish Artifact Orchestrator](../../orchestration/agents/orchestrators/publish-artifact-orchestrator.md)
- [Audit Orchestrator](../../orchestration/agents/orchestrators/audit-orchestrator.md)
- [QA Remediation Orchestrator](../../orchestration/agents/orchestrators/qa-remediation-orchestrator.md)

### Auditor Agents
- [Design Research Reconciliation Agent](../../orchestration/agents/auditors/design-research-reconciliation-agent.md)
- [Design Research Integration Agent](../../orchestration/agents/auditors/design-research-integration-agent.md)
- [Design Research Implementation Auditor](../../orchestration/agents/auditors/design-research-implementation-auditor.md)
- [Design Slop Auditor](../../orchestration/agents/auditors/design-slop-auditor.md)
- [Citation Audit Agent](../../orchestration/agents/auditors/citation-audit-agent.md)
- [Immersive Scrolling Auditor](../../orchestration/agents/auditors/immersive-scrolling-auditor.md)
- [Animation Pattern Auditor](../../orchestration/agents/auditors/animation-pattern-auditor.md)
- [Content Research Reconciliation Agent](../../orchestration/agents/auditors/content-research-reconciliation-agent.md)
- [Content Research Integration Agent](../../orchestration/agents/auditors/content-research-integration-agent.md)
- [Rich Results Auditor](../../orchestration/agents/auditors/rich-results-auditor.md)
- [Gate Guard Auditor](../../orchestration/agents/auditors/gate-guard-auditor.md)

### Implementation Guides
- [Bibliography Structure Guide](./BIBLIOGRAPHY_STRUCTURE_GUIDE.md)
- [Artifact Citation Patterns Guide](./ARTIFACT_CITATION_PATTERNS_GUIDE.md)
- [CSS TSX Binding Patterns Guide](./CSS_TSX_BINDING_PATTERNS_GUIDE.md)

### Framework Documentation
- [FRAMEWORK.md](../../orchestration/FRAMEWORK.md)
- [META-AGENT-FRAMEWORK.md](../../orchestration/agents/META-AGENT-FRAMEWORK.md)

---

## Last Updated
January 18, 2026

### Recent Changes
- Added missing auditor agents to Specialist Agents table:
  - Design Slop Auditor (AI pattern detection)
  - Content Research Reconciliation Agent (research→spec gaps)
  - Content Research Integration Agent (spec→artifact fidelity)
  - Design Research Implementation Auditor (spec compliance)
  - Animation Pattern Auditor (scroll-lock patterns)
  - Rich Results Auditor (SEO structured data)
- Expanded Auditor Agents links section with 7 additional agents
- Clarified Gate Guard Auditor role as G1-G9 pipeline compliance
- Updated to 13-gate pipeline (was 11 gates)
- Added G4.1: Design Research Reconciliation
- Added G5.2: Design Research Integration
- Updated phase descriptions and time allocations
- Added detailed G2/G3 requirements
- Added Design Research and Content Integration workflow diagrams
- Synchronized with FRAMEWORK.md

---

*This guide serves as the authoritative reference for the Visual Essay production pipeline, documenting all 13 gates, agent ownership, and workflows from intake to publication.*
