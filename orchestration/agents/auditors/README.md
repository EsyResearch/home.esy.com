# 🔍 Auditors

Quality verification and certification agents that ensure content meets Esy standards before publication.

---

## Agents in This Category

| Agent | Domain | Gate Owned | Output |
|-------|--------|------------|--------|
| [Citation Audit Agent](./citation-audit-agent.md) | Sources & Links | G5 | Citation Certification |
| [Quotes Audit Agent](./quotes-audit-agent.md) | Quote Authenticity | — | Quote verdicts (✅⚠️🟡❌🚫) |
| [Visual Auditor Agent](./visual-auditor-agent.md) | SVG Quality | — | Grade A+ to F |
| [Scrollytelling Audit Agent](./scrollytelling-audit-agent.md) | Experience Quality | — | Improvement recommendations |
| [Immersive Scrolling Auditor](./immersive-scrolling-auditor.md) | Scroll Performance | G6 | Scroll Certification |
| [Immersive Experience Auditor](./immersive-experience-auditor.md) | Overall Experience | — | Experience Certification |
| [SEO Audit Agent](./seo-audit-agent.md) | Search Optimization | — | SEO Grade A+ to F |
| [Spec Compliance Auditor](./spec-compliance-auditor.md) | **Spec vs Output** | — | Compliance Score (%) |
| [Hydration Audit Agent](./hydration-audit-agent.md) | **React Hydration** | — | Hydration Compliance Report |
| [Design Slop Auditor](./design-slop-auditor.md) | **AI Slop Detection** | — | Slop Score (0-100), Design Research Report |
| [Gate Guard Auditor](./gate-guard-auditor.md) | **Pipeline Compliance** | G9 | Gate Verification Report, Publication Approval |
| [Content Audit Agent](./content-audit-agent.md) | **Content Quality** | — | Content Compliance Score (%), Word Count Analysis, Tone Assessment |
| [Content Research Reconciliation Agent](./content-research-reconciliation-agent.md) | **Research→Spec Verification** | G2.5 | Gap Report, Remediation Options |
| [Content Research Integration Agent](./content-research-integration-agent.md) | **Spec→Artifact Verification** | G5.1 | Integration Report, Implementation Hints |
| [Design Research Reconciliation Agent](./design-research-reconciliation-agent.md) | **Design Authenticity Verification** | G4.1 | Reconciliation Report, Collision Detection |
| [Design Research Implementation Auditor](./design-research-implementation-auditor.md) | **Design Fidelity Audit** | G5.2 | Design Fidelity Audit Report, Compliance Scores |
| [Accuracy Audit Agent](./accuracy-audit-agent.md) | **Scientific Claim Verification** | G6 (conceptual) | Accuracy Certification Report |
| [Pedagogy Audit Agent](./pedagogy-audit-agent.md) | **Learning Effectiveness** | G6.5 (conceptual) | Pedagogy Certification Report |
| [Diagram Clarity Auditor](./diagram-clarity-auditor.md) | **Diagram Comprehension** | G7 (conceptual) | Diagram Clarity Report |
| [Data Accuracy Auditor](./data-accuracy-auditor.md) | **Data-to-Visual Fidelity** | G6.1 (data journalism) | Data Accuracy Report |

---

## Report Storage

| Report Type | Location |
|-------------|----------|
| Citation Audits | `./CitationReports/` |
| Visual Audits | `./VisualAuditReports/` |

---

## When to Use

| Scenario | Agent |
|----------|-------|
| Verify source quality & links | Citation Audit Agent |
| Check quote authenticity | Quotes Audit Agent |
| Audit SVG assets | Visual Auditor Agent |
| Full experience review | Immersive Experience Auditor |
| Scroll-lock & 60fps check | Immersive Scrolling Auditor |
| SEO optimization check | SEO Audit Agent |
| **Verify output matches spec** | Spec Compliance Auditor |
| **Check SSR/client hydration** | Hydration Audit Agent |
| **Detect AI slop & enforce distinctiveness** | Design Slop Auditor |
| **Verify all gates G1-G9 are complete** | Gate Guard Auditor |
| **Block implementation until G1-G4 done** | Gate Guard Auditor (Pre-Phase mode) |
| **Audit content word count, depth, tone** | Content Audit Agent |
| **Evaluate genocide/atrocity content sensitivity** | Content Audit Agent (with genocide protocol) |
| **Verify research elevated into spec** | Content Research Reconciliation Agent (G2.5) |
| **Verify spec implemented in artifact** | Content Research Integration Agent (G5.1) |
| **Verify design is authentic & novel** | Design Research Reconciliation Agent (G4.1) |
| **Verify CSS binds to TSX classNames** | Design Research Integration Agent (G5.2) |
| **Verify scientific claims match sources** | Accuracy Audit Agent (G6 conceptual) |
| **Verify learning sequence & misconceptions** | Pedagogy Audit Agent (G6.5 conceptual) |
| **Verify diagram language consistency** | Diagram Clarity Auditor (G7 conceptual) |
| **Verify data-to-visual fidelity** | Data Accuracy Auditor (G6.1 data journalism) |
| **Comprehensive QA** | Use Meta Audit Orchestrator (orchestrators/) |

---

## Audit Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│  G1: Intake                                                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  G2: Research                                                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  G2.5: CONTENT RESEARCH RECONCILIATION (NEW)                     │
│  ► Ensures research findings are elevated into spec              │
│  ► Blocks spec approval for critical omissions                   │
│  ► Human-in-the-loop remediation decisions                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  G3: Spec Approval                                               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  G4: Design Research                                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  G4.1: DESIGN RESEARCH RECONCILIATION (NEW)                      │
│  ► Phase 1: Thematic authenticity (colors trace to artifacts)   │
│  ► Phase 2: Novelty/duplication (no cross-essay collisions)     │
│  ► Phase 3: CSS implementation (CSS implements design research)  │
│  ► Human-in-the-loop remediation decisions                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  GATE GUARD (Pre-Phase Mode) — Blocks premature advancement     │
│  ► Must pass G1-G4.1 before implementation can start            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    [G5: Implementation Phase]
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  G5.1: CONTENT RESEARCH INTEGRATION                              │
│  ► Ensures spec content is implemented in artifact               │
│  ► Blocks bibliography phase for critical omissions              │
│  ► Human-in-the-loop remediation decisions                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  G5.2: DESIGN RESEARCH INTEGRATION (NEW)                         │
│  ► Verifies CSS selectors bind to TSX classNames                 │
│  ► Requires ≥95% binding percentage                              │
│  ► Detects convention mismatches (hyphen vs underscore)          │
│  ► Catches Nakba-style failures where CSS isn't applied          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
Meta Audit Orchestrator (Post-Implementation)
├── Bibliography Orchestrator (G5.5)
├── Scrolling Auditor (G6)
├── Experience Auditor
├── Visual Auditor
├── Citation Audit (G5)
│   └── Quotes Audit
├── SEO Audit
├── Spec Compliance Auditor (verifies output matches spec)
├── Hydration Audit (verifies SSR/client consistency)
├── Design Slop Auditor (enforces distinctive, subject-derived design)
├── Content Audit Agent (verifies word count, depth, tone, sensitivity)
└── Gate Guard Auditor (G9) ← Final checkpoint before publication
        │
        ▼
   CERTIFICATION
   ✅ CERTIFIED / ⚠️ CONDITIONAL / ❌ REJECTED
```

### Gate Dependency Chain

| To Start... | Must First Complete |
|-------------|---------------------|
| G2 (Research) | G1 (Intake) |
| **G2.5 (Research Reconciliation)** | **G2** |
| G3 (Spec) | G1, G2, **G2.5** |
| G4 (Design Research) | G1, G2, G2.5, G3 |
| **G4.1 (Design Reconciliation)** | **G4** ← Design authenticity + novelty |
| **G5 (Implementation)** | **G1, G2, G2.5, G3, G4, G4.1** ← Critical checkpoint |
| **G5.1 (Content Integration)** | **G5** |
| **G5.2 (Design Integration)** | **G5** ← CSS→TSX binding verification |
| G5.5 (Bibliography) | G5, **G5.1, G5.2** |
| G6-G8 (Audits) | G5.5 |
| G9 (Publication) | G1-G8 |

---

## Invocation Patterns

```
Using @agents/auditors/citation-audit-agent.md, audit the citations for
/essays/visual/[SLUG]
```

```
Using @agents/auditors/spec-compliance-auditor.md, audit spec compliance:

Spec: orchestration/skills/visual-essay-invocation/specs/[slug].md
Essay: src/app/essays/visual/[slug]/
```

```
# Audit for AI slop
Using @agents/auditors/design-slop-auditor.md, audit the visual essay at:
src/app/essays/[essay-slug]/
Check for AI slop patterns and provide severity rating.

# Remediation after slop detection
Using @agents/auditors/design-slop-auditor.md, the design has been flagged as AI slop.
Subject: [describe subject]
Conduct design research and propose a distinctive, subject-derived aesthetic.
```

```
# Gate verification before publication
Using @agents/auditors/gate-guard-auditor.md, verify pipeline compliance for:
Essay: [essay-slug]
Check all 9 gates (G1-G9) have required artifacts.
```

```
# PRE-PHASE VERIFICATION (BLOCKING) — Use before starting implementation
Using @agents/auditors/gate-guard-auditor.md, verify prerequisites
for starting phase:

Target Phase: G5 (Implementation)
Essay Slug: [essay-slug]

BLOCK if prerequisite gates G1-G4 are incomplete.
```

```
# Content audit for word count, depth, and tone
Using @agents/auditors/content-audit-agent.md, audit content compliance for:

Spec: src/app/essays/history/[slug]/INVOCATION-SPEC.md
Essay: src/app/essays/history/[slug]/

Produce full content audit report.
```

```
# Content audit for sensitive/genocide content
Using @agents/auditors/content-audit-agent.md, audit content for:

Spec: src/app/essays/history/the-khmer-rouge-genocide/INVOCATION-SPEC.md
Essay: src/app/essays/history/the-khmer-rouge-genocide/
Sensitivity Level: Genocide/Atrocity

Apply genocide content protocol. Verify tone appropriateness.
```

```
# Research-to-Spec reconciliation (G2.5)
Using @agents/auditors/content-research-reconciliation-agent.md, reconcile:

Research: src/app/essays/rock-and-roll/research/
Spec: src/app/essays/rock-and-roll/SPEC.md

Identify all gaps where research significance exceeds spec representation.
Present remediation options for human decision.
```

```
# Spec-to-Artifact integration check (G5.1)
Using @agents/auditors/content-research-integration-agent.md, verify integration:

Spec: src/app/essays/rock-and-roll/SPEC.md
Artifact: src/app/essays/rock-and-roll/RockAndRollClient.tsx

Identify all gaps where spec content is missing from implementation.
Present remediation options for human decision.
```

```
# Design authenticity and novelty verification (G4.1)
Using @agents/auditors/design-research-reconciliation-agent.md, verify:

Design Research: src/app/essays/history/the-nakba-visualized/DESIGN-RESEARCH.md
CSS: src/app/essays/history/the-nakba-visualized/the-nakba-visualized.css
Compare Against: src/app/essays/**/DESIGN-RESEARCH.md

Run all three phases:
- Phase 1: Thematic Authenticity (colors trace to artifacts)
- Phase 2: Novelty/Duplication (no cross-essay collisions)
- Phase 3: CSS Implementation (CSS matches design research)
```

```
# CSS-to-TSX binding verification (G5.2)
Using @agents/auditors/design-research-implementation-auditor.md, verify:

CSS: src/app/essays/history/the-nakba-visualized/the-nakba-visualized.css
TSX: src/app/essays/history/the-nakba-visualized/page.tsx

Verify all CSS selectors bind to TSX classNames.
Report binding percentage and convention consistency.
Flag if <95% binding or convention mismatch detected.
```

---

## See Also

- [Agent Registry](../AGENT-REGISTRY.md) — Complete agent index
- [Meta Audit Orchestrator](../orchestrators/meta-audit-orchestrator.md) — Coordinates all auditors



