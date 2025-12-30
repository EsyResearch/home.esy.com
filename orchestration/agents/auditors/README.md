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
| **Comprehensive QA** | Use Meta Audit Orchestrator (orchestrators/) |

---

## Audit Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│  GATE GUARD (Pre-Phase Mode) — Blocks premature advancement     │
│  ► Must pass G1-G4 before implementation can start              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    [Implementation Phase]
                              │
                              ▼
Meta Audit Orchestrator (Post-Implementation)
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
| G3 (Spec) | G1, G2 |
| G4 (Design Research) | G1, G2, G3 |
| **G5 (Implementation)** | **G1, G2, G3, G4** ← Critical checkpoint |
| G6-G8 (Audits) | G5 |
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

---

## See Also

- [Agent Registry](../AGENT-REGISTRY.md) — Complete agent index
- [Meta Audit Orchestrator](../orchestrators/meta-audit-orchestrator.md) — Coordinates all auditors



