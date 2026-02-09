# Post-Production Reassessment Workflow

> Created: February 2026

## Purpose

A formal process for reassessing published or production-complete essays that were produced **before** certain audit agents or quality gates existed, or that need to be re-evaluated against current standards after significant content or structural changes.

This workflow addresses the gap between essays published under earlier pipeline versions and the current Conceptual Essay Orchestrator's full gate suite (G6–G6.6, G7–G7.5).

---

## When to Use This Workflow

| Trigger | Example |
|---------|---------|
| **Legacy essay** | Essay was produced before Prose Auditor (G6.6) or Pedagogy Audit Agent (G6.5) existed |
| **Post-fix reassessment** | Essay underwent significant structural or content changes (e.g., CSP fix, error boundary additions) |
| **New audit agent added** | A new auditor is added to the pipeline and existing essays need retroactive evaluation |
| **Quality concern** | Content quality questions arise post-publication (reader feedback, internal review) |
| **Periodic review** | Scheduled reassessment cycle for published essays |

---

## Workflow Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   POST-PRODUCTION REASSESSMENT WORKFLOW                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  STEP 1: SCOPE & TRIGGER ────────────────────────────────────────────────  │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  • Identify essay to reassess                                       │   │
│  │  • Document trigger (legacy gap, post-fix, new agent, concern)      │   │
│  │  • Identify which gates are missing or need re-evaluation           │   │
│  │  • Locate existing artifacts (spec, research/, intake, audits)      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  STEP 2: ARTIFACT INVENTORY ──────────────────────────────────────────    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Catalog what exists:                                               │   │
│  │  • G1-INTAKE.md  → Spec / scope definition                         │   │
│  │  • research/     → SEQUENCE, MISCONCEPTIONS, ANALOGIES, CLAIMS...  │   │
│  │  • DESIGN-RESEARCH.md → Visual design system                        │   │
│  │  • Existing audit reports                                           │   │
│  │  • The implementation itself (Client.jsx, CSS, etc.)                │   │
│  │                                                                      │   │
│  │  Determine audit mode:                                              │   │
│  │  • Full Audit (research package exists) → Cross-reference mode      │   │
│  │  • Internal Consistency (no research) → Self-referential mode       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  STEP 3: TARGETED AUDIT DISPATCH ─────────────────────────────────────    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Dispatch ONLY the audits that are missing or need re-evaluation:   │   │
│  │                                                                      │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │   │
│  │  │  Spec Compliance │  │  Pedagogy Audit │  │   Prose Audit   │     │   │
│  │  │   (G6 / G6.x)   │  │     (G6.5)      │  │     (G6.6)      │     │   │
│  │  │  spec-compliance │  │ pedagogy-audit  │  │ prose-auditor   │     │   │
│  │  │  -auditor.md     │  │ -agent.md       │  │ -agent.md       │     │   │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘     │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │   │
│  │  │  Accuracy Audit  │  │ Content Audit   │  │ Any Other Audit │     │   │
│  │  │     (G6)         │  │ (word count,    │  │ As Needed       │     │   │
│  │  │ accuracy-audit   │  │  depth, tone)   │  │                 │     │   │
│  │  │ -agent.md        │  │                 │  │                 │     │   │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  STEP 4: REASSESSMENT REPORT ─────────────────────────────────────────    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Synthesize findings into a single report:                          │   │
│  │  • Per-gate certification status (new)                              │   │
│  │  • Issues found with severity                                       │   │
│  │  • Comparison to original publication state                         │   │
│  │  • Remediation plan (if needed)                                     │   │
│  │                                                                      │   │
│  │  Store: orchestration/audits/[slug]/REASSESSMENT-[date].md          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  STEP 5: REMEDIATION (If Needed) ─────────────────────────────────────    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Route issues to appropriate fixers via QA Remediation Orchestrator │   │
│  │                                                                      │   │
│  │  Issue Type              →  Routed To                               │   │
│  │  ───────────────────────────────────────────────────────────────    │   │
│  │  Prose slop / voice drift →  Essayist Expert (rewrite)             │   │
│  │  Framework regression     →  Essayist Expert (with auditor notes)  │   │
│  │  Sequence violation       →  Content restructuring (orchestrator)  │   │
│  │  Missing misconception    →  Essayist Expert (add addressing)      │   │
│  │  Analogy without limits   →  Essayist Expert (add caveat)          │   │
│  │  Spec deviation           →  Production Orchestrator               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  STEP 6: RE-AUDIT & CERTIFICATION ────────────────────────────────────    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Re-run failed audits on remediated content                         │   │
│  │  Update certification status                                        │   │
│  │  Update AUDIT-HISTORY.md                                            │   │
│  │  Update orchestration/audits/CHANGELOG.md                           │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Invocation

### Standard Reassessment (Prose + Pedagogy)

```
Post-Production Reassessment for:

Essay: src/app/essays/[slug]/
Research Package: src/app/essays/[slug]/research/ (if exists)
Spec: G1-INTAKE.md (or invocation spec if exists)

Trigger: [Legacy gap / Post-fix / New agent / Quality concern]
Missing Gates: G6.5 (Pedagogy), G6.6 (Prose)

Run:
1. @agents/auditors/pedagogy-audit-agent.md — Full Audit mode
2. @agents/auditors/prose-auditor-agent.md — Full Audit mode

Produce: Post-Production Reassessment Report
Store: orchestration/audits/[slug]/REASSESSMENT-[date].md
```

### Full Reassessment (All Audit Domains)

```
Post-Production Reassessment for:

Essay: src/app/essays/[slug]/
Spec: [spec-path]

Trigger: [Major content changes]
Scope: Full — all audit domains

Run all applicable auditors:
- Spec Compliance, Accuracy, Pedagogy, Prose, Scroll, Experience, 
  Visual, Citation, SEO, Content, Hydration

Produce: Comprehensive Reassessment Report
```

### Targeted Reassessment (Single Domain)

```
Post-Production Reassessment for:

Essay: src/app/essays/[slug]/

Trigger: [Specific concern]
Scope: [Single auditor, e.g., Prose only]

Run: @agents/auditors/prose-auditor-agent.md — Slop Scan mode
Produce: Targeted Reassessment Report
```

---

## Report Template

```markdown
# Post-Production Reassessment Report

## Essay Information
- **Title**: [Title]
- **Path**: src/app/essays/[slug]/
- **Reassessment Date**: [Date]
- **Trigger**: [Legacy gap / Post-fix / New agent / Quality concern]
- **Orchestrator**: Post-Production Reassessment Workflow

---

## Scope

### Missing Gates Identified
| Gate | Status Before | Auditor |
|------|--------------|---------|
| G6.5 | ⏳ Never Run | Pedagogy Audit Agent |
| G6.6 | ⏳ Never Run | Prose Auditor Agent |

### Existing Artifacts
| Artifact | Exists? | Location |
|----------|---------|----------|
| G1-INTAKE.md | ✅/❌ | [path] |
| research/ | ✅/❌ | [path] |
| DESIGN-RESEARCH.md | ✅/❌ | [path] |
| Previous audits | ✅/❌ | [path] |

---

## Audit Results

### G6.5: Pedagogy Audit
**Status**: [✅ CERTIFIED / ⚠️ CONDITIONAL / ❌ REJECTED]
[Summary of findings — link to full report]

### G6.6: Prose Quality Audit
**Status**: [✅ CERTIFIED / ⚠️ CONDITIONAL / ❌ REJECTED]
[Summary of findings — link to full report]

### [Other audits as applicable]

---

## Gate Status Summary

| Gate | Pre-Reassessment | Post-Reassessment | Notes |
|------|-----------------|-------------------|-------|
| G6.5 | ⏳ Never Run | [New Status] | [Notes] |
| G6.6 | ⏳ Never Run | [New Status] | [Notes] |

---

## Remediation Plan (If Needed)

### 🔴 Critical (Blocking)
| # | Issue | Gate | Fix Agent | Priority |
|---|-------|------|-----------|----------|

### 🟡 Warning (Non-blocking)
| # | Issue | Gate | Fix Agent | Priority |
|---|-------|------|-----------|----------|

---

## Certification Decision

**Overall Reassessment Status**: [✅ PASS / ⚠️ CONDITIONAL / ❌ NEEDS REMEDIATION]

**Conditions** (if applicable):
1. [Required action]
2. [Required action]

**Reassessed by**: Post-Production Reassessment Workflow
**Date**: [Date]
```

---

## Integration Points

### With Existing Orchestrators

| Orchestrator | Integration |
|-------------|------------|
| **Conceptual Essay Orchestrator** | Defines G6.5 + G6.6 gates; this workflow retroactively applies them |
| **Audit Orchestrator** | Should include Prose + Pedagogy in its domain registry for future comprehensive audits |
| **QA Remediation Orchestrator** | Routes remediation for issues found during reassessment |
| **Publish Artifact Orchestrator** | May need to re-certify if reassessment finds blocking issues |

### With Auditor Agents

| Agent | Role in Reassessment |
|-------|---------------------|
| `pedagogy-audit-agent.md` | G6.5 — Framework consistency, sequence, prerequisites, cognitive load |
| `prose-auditor-agent.md` | G6.6 — Voice consistency, AI slop, transitions, craft |
| `spec-compliance-auditor.md` | Spec adherence (when spec exists) |
| `accuracy-audit-agent.md` | G6 — Claim verification (when CLAIMS.md exists) |
| `content-audit-agent.md` | Content completeness, depth, tone |

---

## Rules

1. **Never skip the artifact inventory** — know what you're working with before dispatching audits
2. **Use the correct audit mode** — Full Audit when research package exists, Internal Consistency when it doesn't
3. **Store all reports** — every reassessment produces artifacts in `orchestration/audits/[slug]/`
4. **Update CHANGELOG.md** — every reassessment is logged in the global audit changelog
5. **Route remediation properly** — prose issues to Essayist Expert, pedagogy issues need structural attention
6. **Don't re-audit what hasn't changed** — only re-run audits for gates that are missing or affected by changes

---

## See Also

- [conceptual-essay-orchestrator.md](../agents/orchestrators/conceptual-essay-orchestrator.md) — Defines G6.5 + G6.6 gates
- [audit-orchestrator.md](../agents/orchestrators/audit-orchestrator.md) — Comprehensive audit coordination
- [qa-remediation-orchestrator.md](../agents/orchestrators/qa-remediation-orchestrator.md) — Fix loop coordination
- [pedagogy-audit-agent.md](../agents/auditors/pedagogy-audit-agent.md) — G6.5 auditor
- [prose-auditor-agent.md](../agents/auditors/prose-auditor-agent.md) — G6.6 auditor

---

## Last Updated
February 2026
