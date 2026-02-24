# Visual Essay Pipeline Guide

> Created: December 30, 2024
> Last Updated: January 18, 2026

## Purpose

This guide documents the complete Visual Essay production pipeline, including all quality gates, agent ownership, and the flow from intake to publication. It serves as the authoritative reference for understanding how visual essays progress through the Esy orchestration system.

---

## Pipeline Overview

The Visual Essay Pipeline consists of **6 phases** and **14+ quality gates** (G1-G9, plus G4.1, G4.5, G4.6, G4.7, G5.2, G5.3, G5.4, and G5.5). Every visual essay must pass through all applicable gates before publication.

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
G1 → G2 → G3 → G4 → G4.1 → G4.5 → G4.6 → G4.7 → G5 → G5.4 → G5.2 → G5.3 → G5.5 → G6 → G6.6 → G7 → G8 → G9
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
          │            G4.7                 │
          │      R2 IMAGE UPLOAD            │
          │  ───────────────────────────    │
          │  • Images uploaded to R2 CDN    │
          │  • images.ts rewritten to       │
          │    images.esy.com URLs          │
          │  • No hotlinked URLs remain     │
          │  • R2 URLs verified reachable   │
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
          │  • Markup rendering integrity   │
          │  • No raw Unicode escapes in    │
          │    JSX text content             │
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
| G4.7 | R2 Image Upload | Image Research Licensing Expert | Production |
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
| **G4.5** | All images sourced, URLs extracted, licenses verified | G4.7 |
| **G4.7** | All images uploaded to R2, images.ts rewritten to images.esy.com, no hotlinks remain | G5 |
| **G5** | All sections drafted, fact-checked, uses research package | G5.2 |
| **G5.2** | CSS selectors bind to TSX classNames (≥95%), no convention mismatches, markup rendering integrity passes (no raw Unicode escapes in JSX text) | G5.5 |
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
                   binding verified           Image Credits
                   + markup integrity
```

**Critical**: CSS must properly bind to TSX classNames (≥95% coverage) and markup rendering integrity must pass (no raw Unicode escapes in JSX text content) before bibliography implementation.

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

## Known Anti-Patterns

### Automated Validation

The following anti-patterns are caught by automated contract validations at their respective gates:

| Anti-Pattern | Gate | Contract | Severity | Detection |
|-------------|------|----------|----------|-----------|
| Emoji characters in client component | G5 | `G5.contract.json` | Error | Regex: Unicode emoji ranges |
| Raw `\uXXXX` escapes in JSX text content | G5 | `G5.contract.json` | Error | Regex: `>([^{<"]*\\u[0-9a-fA-F]{4})` |
| CSS↔TSX naming convention mismatch | G5.2 | Design Research Integration Agent | Error | Binding analysis |

### JSX Unicode Escape Anti-Pattern

**Problem**: Unicode escape sequences (`\u0113`, `\u2014`, `\u03c6\u03c9\u03bd\u03ae`, etc.) placed directly in JSX text content render as literal text in the browser, not as the intended characters.

**Root Cause**: JSX text content between tags is treated as raw text, not as a JavaScript string literal. JavaScript string escape processing only occurs inside `{}` expression containers or in attribute values.

**Example (Bug)**:
```tsx
{/* BAD — renders as literal "phon\u0113" */}
<div className="hero-transliteration">phon\u0113</div>
```

**Example (Fix — preferred)**:
```tsx
{/* GOOD — renders as "phonē" using actual UTF-8 character */}
<div className="hero-transliteration">phonē</div>
```

**Example (Fix — alternative)**:
```tsx
{/* GOOD — renders as "phonē" using JS expression container */}
<div className="hero-transliteration">{"phon\u0113"}</div>
```

**Caught At**: G5 (contract validation) and G5.2 (Design Research Integration Agent — Markup Rendering Integrity check).

**Origin**: Discovered during the "Phonē: From Voice to Device" essay (February 2026), where 40+ instances of Unicode escapes for macron-accented Latin characters, Greek text, and typographic dashes rendered as literal escape sequences in the browser.

### Anti-Pattern 3: Self-Certified Audits (Broken Images / Missing Bibliography)

**Problem**: Gate contracts validated only audit documents (`IMAGE_RESEARCH_AUDIT.md`, `CONTENT-BIBLIOGRAPHY-AUDIT.md`), not the actual source code. The same agent that produced the code also wrote the audit reports — self-certifying them as passing. Images used Wikimedia thumbnail URLs (`/commons/thumb/`) which return 404, and the bibliography section was entirely absent.

**Contract Validation**:
- `url_reachable` on `images.ts` — verifies image URLs return HTTP 2xx (G4.5, G8)
- `not_contains` for `/commons/thumb/` — catches thumbnail URLs (G4.5, G8)
- `min_regex_count` for `<img>` tags — catches missing photography (G5)
- `regex_match` for `from './images'` import — catches hardcoded URLs (G5)
- `contains_text` for `SOURCES` and `IMAGE_CREDITS` — catches missing bibliography (G5.5, G8)
- `required_skills` with `image-url-extraction` skill injected into prompt — ensures agent has correct URL extraction procedure in context (G4.5, G5)

**Caught At**: G4.5 (`url_reachable`, `not_contains`), G5 (`regex_match`, `min_regex_count`, `contains_text`), G5.5 (`contains_text`), G8 (`url_reachable` spot-check).

**Origin**: Discovered during the "Seven Million Years" essay (February 2026). All 17 images returned 404 because the skill for extracting correct Wikimedia URLs was never loaded into agent context, and no contract checked the actual URLs. See: [Gate Validation Standard](../../orchestration/standards/gate-validation-standard.md).

### Anti-Pattern 4: Hotlinking External Images

**Problem**: Images referenced directly from external archives (Wikimedia, LOC, etc.) via `images.ts`. Hotlinking creates reliability risks (external 404s, rate limiting, CORS issues), bandwidth theft, and violates best practices for production image delivery.

**Contract Validation**:
- G4.7 `not_contains` for `upload.wikimedia.org` — catches any remaining hotlinked URLs
- G4.7 `url_reachable` on `images.esy.com` URLs — verifies R2 upload succeeded
- G8 `not_contains` for `upload.wikimedia.org` — final defense against hotlinks reintroduced after G4.7
- G8 `url_reachable` on `images.esy.com` URLs — confirms R2 URLs are still live at publication time
- G4.7 `required_skills` injects R2 upload procedure — ensures agent knows `scan-hotlinked-images.mjs` + `r2-migrate-flat-url-map.mjs` workflow

**Caught At**: G4.7 (R2 Image Upload), G8 (Publication Certification).

**Origin**: Discovered during the "Seven Million Years" postmortem (February 2026). The `image-url-extraction` skill had no R2 upload phase, and no contract validated for `images.esy.com`. Images were served directly from Wikimedia, creating a dependency on external infrastructure. Fixed by adding G4.7 gate and updating the skill with R2 upload procedure.

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

### Validation & Contract System
- [Gate Validation Standard](../../orchestration/standards/gate-validation-standard.md) — Source-code validation, layered defense, skill injection
- [VALIDATION-REFERENCE.md](../../orchestration/gates/VALIDATION-REFERENCE.md) — Per-type contract schema and examples
- [Runner README](../../orchestration/runner/README.md) — CLI usage, validation types, required_skills

### Framework Documentation
- [FRAMEWORK.md](../../orchestration/FRAMEWORK.md)
- [META-AGENT-FRAMEWORK.md](../../orchestration/agents/META-AGENT-FRAMEWORK.md)

---

## Last Updated
February 24, 2026

### Recent Changes
- Added G4.7 (R2 Image Upload) gate to pipeline — eliminates hotlinking, enforces images.esy.com
- Added Anti-Pattern 4: Hotlinking External Images
- Added Anti-Pattern 3: Self-Certified Audits (broken images / missing bibliography from "Seven Million Years")
- Added Validation & Contract System to Related Documents (Gate Validation Standard, VALIDATION-REFERENCE, Runner README)
- Added Known Anti-Patterns section documenting automated validations
- Documented JSX Unicode escape anti-pattern (discovered in Phone essay)
- Updated G5.2 gate to include Markup Rendering Integrity verification
- Updated G5.2 pass criteria to require markup integrity check
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
