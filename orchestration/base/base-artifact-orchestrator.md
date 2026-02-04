# Base Artifact Orchestrator

> Created: February 2026

## Overview

This document defines the **universal patterns** shared by all artifact orchestrators in the Esy ecosystem. It is not invoked directly — instead, domain-specific orchestrators (Visual Essay, Conceptual Essay, Infographic, etc.) compose their pipelines by referencing this base and adding domain-specific profiles.

## Purpose

Extract and centralize:
- Universal quality gates (G1, G5, G5.5, G8-G9)
- Quality assurance framework patterns
- Collaboration protocol structures
- Red flags and red lines patterns
- Gate state machine logic

---

## Universal Gate Architecture

All artifact pipelines share these foundational gates:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        ARTIFACT ORCHESTRATOR (Base)                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  G1: INTAKE APPROVAL ─────────────────────────────────────────────────     │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  • Receive request from user                                        │   │
│  │  • Define scope, audience, timeline                                 │   │
│  │  • Identify research/design requirements                            │   │
│  │  • Route to appropriate research profile                            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  G2-G4: DOMAIN-SPECIFIC GATES ────────────────────────────────────────     │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Defined by domain-specific orchestrator                            │   │
│  │  (Research, Design, Domain Audits)                                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  G5: CONTENT COMPLETE ────────────────────────────────────────────────     │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  • All content drafted and reviewed                                 │   │
│  │  • Implementation functional                                        │   │
│  │  • Mobile/responsive testing performed                              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  G5.5: BIBLIOGRAPHY IMPLEMENTATION ──────────────────────────────────     │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  • Sources & Further Reading section implemented                    │   │
│  │  • All claims properly attributed                                   │   │
│  │  • Source categorization complete                                   │   │
│  │  • Verification date noted                                          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  G6-G7: DOMAIN-SPECIFIC AUDITS ───────────────────────────────────────     │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Defined by domain-specific orchestrator                            │   │
│  │  (Citation Audit, Accuracy Audit, Pedagogy Audit, etc.)             │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  G8: PUBLICATION CERTIFICATION ───────────────────────────────────────     │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  • All domain audits pass                                           │   │
│  │  • SEO/Social meta verified                                         │   │
│  │  • Gate compliance verified (G1-G7 have artifacts)                  │   │
│  │  • QA Remediation completed if needed                               │   │
│  │  • GO / CONDITIONAL / NO-GO certification                           │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  G9: PUBLICATION APPROVAL ────────────────────────────────────────────     │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  • Orchestrator sign-off                                            │   │
│  │  • Index/catalog updated                                            │   │
│  │  • Deployment triggered                                             │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Universal Gates

### G1: Intake Approval

**Purpose**: Lock in WHAT the artifact will be before any work begins.

**Universal Pass Criteria**:
- [ ] Artifact type identified
- [ ] Scope and boundaries defined
- [ ] Target audience specified
- [ ] Research/design requirements identified
- [ ] User has approved scope

**Gate Status**: ⏳ Pending / ✅ Approved / ❌ Rejected

---

### G5: Content Complete

**Purpose**: Verify all content has been created and reviewed.

**Universal Pass Criteria**:
- [ ] All content sections drafted
- [ ] Editorial review complete
- [ ] Implementation functional
- [ ] Mobile/responsive testing performed
- [ ] Accessibility baseline met

**Gate Status**: ⏳ Pending / ✅ Approved / ❌ Rejected

---

### G5.5: Bibliography Implementation

**Purpose**: Ensure all artifacts include proper source attribution and further reading.

**Owner**: Bibliography Orchestrator (or Production Orchestrator)

**Universal Pass Criteria**:
- [ ] Sources & Further Reading section exists
- [ ] All claims from research package have corresponding sources
- [ ] Sources organized into logical categories
- [ ] Source count badge displayed
- [ ] Verification date noted
- [ ] Further reading / accessible resources included
- [ ] CSS styling complete and responsive

**Required Components**:
| Component | Description |
|-----------|-------------|
| **Section Header** | "Bibliography" eyebrow + "Sources & Further Reading" title |
| **Source Blocks** | Categorized groups (Primary, Secondary, etc.) |
| **Source Items** | Author, year, title, journal/publisher |
| **Footer** | Source count badge + verification date |

**Gate Status**: ⏳ Pending / ✅ Approved / ❌ Rejected

---

### G8: Publication Certification

**Purpose**: Pre-publication verification that all quality standards are met.

**Owner**: Publish Artifact Orchestrator

**Universal Pass Criteria**:
- [ ] All domain-specific audits pass (G6-G7)
- [ ] SEO audit passes (grade ≥ C)
- [ ] Social meta tags valid (OG, Twitter Cards)
- [ ] Gate compliance verified (G1-G7 have artifacts)
- [ ] QA Remediation completed (if issues found)

**Certification Status**: ✅ GO / ⚠️ CONDITIONAL / ❌ NO-GO

**Gate Status**: ⏳ Pending / ✅ Certified / ❌ Rejected

---

### G9: Publication Approval

**Purpose**: Final sign-off from orchestrator before deployment.

**Owner**: Domain-specific orchestrator

**Universal Pass Criteria**:
- [ ] G8 certification is GO or CONDITIONAL
- [ ] Orchestrator has reviewed all gate statuses
- [ ] Index/catalog entry prepared
- [ ] Deployment verified successful

**Gate Status**: ⏳ Pending / ✅ Approved / ❌ Rejected

---

## Quality Assurance Framework

### Universal Three-Tier Review

All artifact orchestrators implement this tiered review pattern:

**Tier 1: Pipeline Integrity (CRITICAL)**
- [ ] All quality gates completed in sequence
- [ ] No gates skipped without exception approval
- [ ] Domain-specific certification achieved
- [ ] All blockers resolved before proceeding

**Tier 2: Content Excellence (IMPORTANT)**
- [ ] Unique identity (no copied designs/patterns)
- [ ] Content complete and coherent
- [ ] Source quality meets Esy standards
- [ ] Accessibility compliance verified

**Tier 3: Publication Polish (REFINEMENT)**
- [ ] Index integration complete
- [ ] Metadata optimized for discovery
- [ ] Performance metrics within budget
- [ ] Post-publication monitoring scheduled

---

### Universal Red Flags

Warning signs that indicate quality issues (all orchestrators should watch for):

- Quality gates being rushed or skipped
- Audit returning critical issues repeatedly
- Testing deferred or simulated only
- Missing required sections at publication
- Same identity/patterns across multiple artifacts
- Index update forgotten after deployment

---

### Universal Red Lines (Never Cross)

**These apply to ALL artifact orchestrators:**

- ❌ **NEVER publish without completing all required gates**
- ❌ **NEVER skip domain-specific certification**
- ❌ **NEVER publish without required sections complete**
- ❌ **NEVER skip quality gates for speed**
- ❌ **NEVER approve broken or inaccessible content**
- ❌ **NEVER deploy without proper index/catalog update**

---

## Gate State Machine

All gates follow this state transition pattern:

```
┌──────────┐    Start    ┌──────────┐
│          │────────────▶│          │
│  (none)  │             │ PENDING  │
│          │             │    ⏳    │
└──────────┘             └────┬─────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               │               ▼
       ┌──────────┐           │        ┌──────────┐
       │          │           │        │          │
       │ APPROVED │◀──────────┘        │ REJECTED │
       │    ✅    │   Resubmit         │    ❌    │
       └──────────┘                    └──────────┘
```

**State Definitions**:
- **Pending (⏳)**: Work in progress, awaiting completion
- **Approved (✅)**: Gate criteria met, can proceed to next gate
- **Rejected (❌)**: Gate criteria not met, requires remediation

---

## Collaboration Protocol Template

When defining collaboration with other agents, use this structure:

```markdown
### Working With [agent-name].md
**Role**: [Agent's role in this orchestrator's pipeline]

**Division of Responsibilities**
- **This Orchestrator**: [What this orchestrator handles]
- **[Other Agent]**: [What the other agent handles]
- **Shared**: [Joint responsibilities]

**Invocation Protocol**
```
Using @agents/[path]/[agent-name].md:

[Invocation template with placeholders]
```

**Handoff Protocol**
1. [Step 1]
2. [Step 2]
3. [Step 3]
...

**Blocking Conditions**
- [Condition that blocks progress]
- [Another blocking condition]
```

---

## Publication Approval Template

All orchestrators use this sign-off template:

```markdown
## Publication Approval

**Artifact**: [Title]
**Path**: [File path]
**Publication Date**: [Date]

### Quality Gate Summary
| Gate | Status |
|------|--------|
| G1: Intake Approval | ⏳/✅/❌ |
| G2: [Domain-specific] | ⏳/✅/❌ |
| G3: [Domain-specific] | ⏳/✅/❌ |
| G4: [Domain-specific] | ⏳/✅/❌ |
| G5: Content Complete | ⏳/✅/❌ |
| G5.5: Bibliography Implementation | ⏳/✅/❌ |
| G6: [Domain-specific Audit] | ⏳/✅/❌ |
| G7: [Domain-specific Audit] | ⏳/✅/❌ |
| G8: Publication Certification | ⏳/✅/❌ |
| G9: Publication Approval | ⏳/✅/❌ |

### Publication Certification (G8)
- **Certification Status**: ✅ GO / ⚠️ CONDITIONAL / ❌ NO-GO
- **SEO Grade**: [Grade]
- **Remediation**: N/A / Completed

### Orchestrator Notes
[Any observations, concerns, or commendations]

### Approval
**Status**: ✅ APPROVED FOR PUBLICATION
**Orchestrator**: [Orchestrator Name]
**Date**: [Date]
```

---

## Deliverables Template

All orchestrators produce these standard deliverables:

### Standard Output
1. **Intake Document**: Scope and requirements specification
2. **Gate Status Reports**: Pass/fail status for each quality gate
3. **Domain-Specific Certification**: Research/audit results
4. **Publication Approval Document**: Final sign-off with all certifications
5. **Deployment Confirmation**: Verification of successful publication

### Quality Indicators
- **Pipeline Compliance**: % of gates completed
- **Domain Certification**: Achieved before publication
- **Timeline Adherence**: % of milestones hit on schedule
- **First-Pass Rate**: % passing audit first time
- **Post-Publish Issues**: Count requiring correction

---

## Profile Composition Pattern

Domain-specific orchestrators compose their pipeline by referencing:

1. **This Base Orchestrator** — Universal gates and patterns
2. **Research Profile** — What G2 produces
3. **Design Profile** — What G4 produces
4. **Audit Profiles** — What G6-G7 verify

```markdown
# [Domain] Orchestrator

Extends: @orchestration/base/base-artifact-orchestrator.md

## Profile Composition
- Research: @profiles/research/[domain]-research-profile.md
- Design: @profiles/design/[domain]-design-profile.md
- Audit: @profiles/audit/[domain]-audit-profile.md

## Custom Gates
[Define domain-specific gates G2, G3, G4, G6, G7]
```

---

## Project Context

- **Primary Focus**: Esy.com artifact production pipelines
- **Content Types**: Visual Essays, Conceptual Essays, Infographics, Research Briefs, Web Templates
- **Target Audience**: Orchestrator developers, editorial teams, production stakeholders
- **Standards**: Academic rigor with editorial excellence
- **Goal**: Provide consistent quality framework across all artifact types

---

## See Also

- [META-AGENT-FRAMEWORK.md](../agents/META-AGENT-FRAMEWORK.md) — Agent creation blueprint
- [AGENT-REGISTRY.md](../agents/AGENT-REGISTRY.md) — Complete agent listing
- [visual-essay-orchestrator.md](../agents/orchestrators/visual-essay-orchestrator.md) — Historical/Etymology essays
- [conceptual-essay-orchestrator.md](../agents/orchestrators/conceptual-essay-orchestrator.md) — Conceptual explainer essays

---

## Last Updated
February 2026

---

*This base orchestrator provides the foundational patterns shared by all Esy artifact orchestrators. It is not invoked directly — domain-specific orchestrators compose their pipelines by extending this base with research, design, and audit profiles appropriate to their artifact type. The universal gates (G1, G5, G5.5, G8-G9) ensure consistent quality standards across all artifact types, while allowing flexibility in domain-specific gates (G2-G4, G6-G7). Note: G5.5 (Bibliography Implementation) is UNIVERSAL — all artifacts require proper source attribution.*
