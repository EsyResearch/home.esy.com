# Visual Essay Pipeline Guide

> Created: December 30, 2024

## Purpose

This guide documents the complete Visual Essay production pipeline, including all quality gates, agent ownership, and the flow from intake to publication. It serves as the authoritative reference for understanding how visual essays progress through the Esy orchestration system.

---

## Pipeline Overview

The Visual Essay Pipeline consists of **6 phases** and **11 quality gates** (G1-G9 plus G4.5 and G5.5). Every visual essay must pass through all applicable gates before publication.

### Phase Distribution

| Phase | Focus | Time Allocation |
|-------|-------|-----------------|
| Phase 1: Intake | Scope & intent | 5% |
| Phase 2: Research | Source gathering | 25% |
| Phase 3: Production | Content creation | 40% |
| Phase 4: Bibliography | Citation structure | 5% |
| Phase 5: Audit | Quality verification | 10% |
| Phase 6: Publication | Final certification | 15% |

---

## Complete Pipeline Diagram

```
╔══════════════════════════════════════════════════════════════════════════════════════╗
║                        VISUAL ESSAY ORCHESTRATOR PIPELINE                             ║
║                              (10 Gates + 1 Approval)                                  ║
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
                          └─────────────┬─────────────┘
                                        │
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                            PHASE 2: RESEARCH (25%)                                   │
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
                          │  • Primary sources        │
                          └─────────────┬─────────────┘
                                        │
                          ┌─────────────▼─────────────┐
                          │          G3               │
                          │     SPEC APPROVAL         │
                          │  ─────────────────────    │
                          │  • EXPERIENCE-SPEC.md     │
                          │  • specs/[slug].md        │
                          │  • SEO requirements       │
                          └─────────────┬─────────────┘
                                        │
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                            PHASE 3: PRODUCTION (40%)                                 │
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
          └────────────────┬────────────────┘
                           │
          ┌────────────────▼────────────────┐
          │            G4.5                 │
          │       IMAGE SOURCING            │
          │  ───────────────────────────    │
          │  • All images sourced           │
          │  • Licenses verified            │
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
          └────────────────┬────────────────┘
                           │
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                          PHASE 4: BIBLIOGRAPHY (5%)                                  │
└─────────────────────────────────────────────────────────────────────────────────────┘
                           │
          ┌────────────────▼────────────────┐
          │   Bibliography Orchestrator     │
          │  ───────────────────────────    │
          │  → Citation Audit Agent         │
          │  → Quotes Audit Agent           │
          │  → Image Research Expert        │
          │  Pattern: docs/artifact-        │
          │           patterns-guide/       │
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
          └────────────────┬────────────────┘
                           │
          ┌────────────────▼────────────────┐
          │    Immersive Scrolling Auditor  │
          │  ───────────────────────────    │
          │  • Scroll-lock behavior         │
          │  • 60fps performance            │
          │  • Mobile Safari compatibility  │
          └────────────────┬────────────────┘
                           │
          ┌────────────────▼────────────────┐
          │             G7                  │
          │     SCROLL CERTIFICATION        │
          │  ───────────────────────────    │
          │  • Score ≥ 8.0/10               │
          │  • No Tier 1 failures           │
          │  • Mobile verified              │
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
| G3 | Spec Approval | Visual Essay Orchestrator | Research |
| G4 | Design Research | Design Researcher | Production |
| G4.5 | Image Sourcing | Image Research Licensing Expert | Production |
| G5 | Content Complete | Scrollytelling Expert | Production |
| G5.5 | Bibliography Implementation | Bibliography Orchestrator | Bibliography |
| G6 | Citation Audit | Citation Audit Agent | Audit |
| G7 | Scroll Certification | Immersive Scrolling Auditor | Audit |
| G8 | Publication Certification | Publish Artifact Orchestrator | Publication |
| G9 | Publication Approval | Visual Essay Orchestrator | Publication |

### Gate Pass Criteria

| Gate | Pass Criteria | Blocking? |
|------|---------------|-----------|
| **G1** | Scope defined, SKILL.md requirements identified, research targets clear | Yes |
| **G2** | Research package complete: figures, quotes, timeline, visuals all verified | Yes |
| **G3** | 6-layer spec complete, all content research-backed, no orphan claims | Yes |
| **G4** | Unique visual identity derived from subject matter | Yes |
| **G4.5** | All images sourced, URLs extracted, licenses verified | Yes |
| **G5** | All sections drafted, fact-checked, uses research package | Yes |
| **G5.5** | Bibliography section complete (Works Cited, Image Credits, A/V, Data Sources) | Yes |
| **G6** | Citation Certification achieved (content vs. research match) | Yes |
| **G7** | Immersive Scrolling Auditor certification (≥8.0/10) | Yes |
| **G8** | Pre-publication certification (GO/CONDITIONAL) from all domain audits | Yes |
| **G9** | Director sign-off on complete package | Yes |

---

## Agent Ecosystem

### Orchestrators

| Orchestrator | Responsibility | Gates Owned |
|--------------|----------------|-------------|
| **Visual Essay Orchestrator** | Pipeline executive, editorial direction | G1, G3, G9 |
| **Research Orchestrator** | Research coordination | G2 |
| **Bibliography Orchestrator** | Bibliography implementation & audit | G5.5 |
| **Publish Artifact Orchestrator** | Pre-publication certification | G8 |
| **Audit Orchestrator** | Multi-domain quality assessment | (Invoked by G8) |
| **QA Remediation Orchestrator** | Issue resolution | (Invoked by G8) |

### Specialist Agents

| Agent | Domain | Role in Pipeline |
|-------|--------|------------------|
| **Brainstorming Agent** | Research | Question formulation (G2) |
| **Research Citations Expert** | Research | Source discovery (G2) |
| **Design Researcher** | Design | Visual identity research (G4) |
| **Image Research Licensing Expert** | Images | Image sourcing & licensing (G4.5) |
| **Scrollytelling Expert** | Production | Content creation coordination (G5) |
| **Historian Writer** | Content | Narrative writing (G5) |
| **Historian Editor** | Content | Fact-checking (G5) |
| **Citation Audit Agent** | Audit | Source verification (G6) |
| **Quotes Audit Agent** | Audit | Quote verification (via G6) |
| **Immersive Scrolling Auditor** | Audit | Scroll performance (G7) |
| **Social Media Meta Expert** | Publication | OG/Twitter meta (G8) |
| **SEO Audit Agent** | Publication | Search optimization (G8) |
| **Gate Guard Auditor** | Publication | Gate verification (G8) |

---

## Key Workflows

### Research → Spec Flow (G2 → G3)

```
SKILL.md (template) → Research Orchestrator → research/ package → Invocation Agent → specs/[slug].md
```

**Critical**: Research happens BEFORE spec construction. The spec is built FROM verified research, ensuring no orphan claims.

### Bibliography Flow (G5 → G5.5)

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

## Related Documents

### Orchestration Agents
- [Visual Essay Orchestrator](../../orchestration/agents/orchestrators/visual-essay-orchestrator.md)
- [Bibliography Orchestrator](../../orchestration/agents/orchestrators/bibliography-orchestrator.md)
- [Publish Artifact Orchestrator](../../orchestration/agents/orchestrators/publish-artifact-orchestrator.md)
- [Audit Orchestrator](../../orchestration/agents/orchestrators/audit-orchestrator.md)

### Implementation Guides
- [Bibliography Structure Guide](./BIBLIOGRAPHY_STRUCTURE_GUIDE.md)
- [Artifact Citation Patterns Guide](./ARTIFACT_CITATION_PATTERNS_GUIDE.md)

### Framework Documentation
- [META-AGENT-FRAMEWORK.md](../../orchestration/agents/META-AGENT-FRAMEWORK.md)
- [FRAMEWORK.md](../../orchestration/FRAMEWORK.md)

---

## Last Updated
December 30, 2024

### Recent Changes
- Initial creation documenting complete 11-gate pipeline
- Added Bibliography phase (G5.5) and Publication Certification (G8)
- Documented Publish Artifact Orchestrator and QA Remediation integration
- Added certification status definitions

---

*This guide serves as the authoritative reference for the Visual Essay production pipeline, documenting all gates, agent ownership, and workflows from intake to publication.*
