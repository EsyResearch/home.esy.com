# Orchestrator Invocation Examples

> Quick reference for invoking orchestrators. Focused on invocation patterns only.

---

## Visual Essay Orchestrator

### New Visual Essay Production
```
Using @agents/orchestrators/visual-essay-orchestrator.md, initiate production 
for a visual essay about "[TOPIC]".

Key details:
- Target audience: [audience]
- Visual treatment: [photorealistic/illustrated/mythological]
- Timeline: [if constrained]
```

### Pipeline Status Check
```
Using @agents/orchestrators/visual-essay-orchestrator.md, provide status update 
on the visual essay "[TITLE]" currently in production.
```

### Publication Approval
```
Using @agents/orchestrators/visual-essay-orchestrator.md, conduct final 
publication approval review for:

Essay: src/app/essays/visual/[slug]/
Spec: orchestration/skills/visual-essay-invocation/specs/[slug].md
```

---

## Meta Audit Orchestrator

### Comprehensive Audit
```
Using @agents/orchestrators/meta-audit-orchestrator.md, conduct comprehensive 
audit of the visual essay:

Essay: src/app/essays/visual/[slug]/
Spec: orchestration/skills/visual-essay-invocation/specs/[slug].md

Orchestrate all domain audits and produce unified certification report.
```

### Targeted Domain Audit
```
Using @agents/orchestrators/meta-audit-orchestrator.md, audit these domains only:

Essay: src/app/essays/visual/[slug]/
Spec: orchestration/skills/visual-essay-invocation/specs/[slug].md
Domains: Scroll, Experience, Spec Compliance

Skip citation and SEO (already certified).
```

### Re-Certification After Fixes
```
Using @agents/orchestrators/meta-audit-orchestrator.md, verify fixes:

Previous Report: orchestration/audits/[slug]/2025-12-10-comprehensive-audit.md
Fixed Issues: #1, #2, #5

Conduct targeted re-audits and update certification status.
```

---

## QA Remediation Orchestrator

### Full Essay Remediation (Auto Mode)
```
Using @agents/orchestrators/qa-remediation-orchestrator.md, conduct 
full QA remediation:

Essay: src/app/essays/visual/[slug]/
Spec: orchestration/skills/visual-essay-invocation/specs/[slug].md
Mode: --auto
Max iterations: 3

Fix all identified issues automatically and produce QA report.
```

### Targeted Section Remediation (Approval Mode)
```
Using @agents/orchestrators/qa-remediation-orchestrator.md, conduct 
targeted QA remediation:

Essay: src/app/essays/visual/[slug]/
Spec: orchestration/skills/visual-essay-invocation/specs/[slug].md
Sections: Hero, Ch1, Ch2
Mode: --approval

Present all issues for approval before fixing.
```

### Report-Only Assessment
```
Using @agents/orchestrators/qa-remediation-orchestrator.md, assess quality:

Essay: src/app/essays/visual/[slug]/
Spec: orchestration/skills/visual-essay-invocation/specs/[slug].md
Mode: --report-only

Do not fix anything. Produce comprehensive issue report.
```

### Single Section Deep-Dive
```
Using @agents/orchestrators/qa-remediation-orchestrator.md, focus on Ch4:

Essay: src/app/essays/visual/[slug]/
Spec: orchestration/skills/visual-essay-invocation/specs/[slug].md
Section: Ch4
Mode: --auto

This section has persistent scroll-lock issues. Fix and verify.
```

### Manual Issue Investigation
```
Using @agents/orchestrators/qa-remediation-orchestrator.md, investigate 
and fix this issue I found:

Essay: src/app/essays/visual/[slug]/
Spec: orchestration/skills/visual-essay-invocation/specs/[slug].md
Issue: "Chapter 3 scroll-lock doesn't release properly on mobile"
Mode: --auto

Cross-reference against spec and fix.
```

---

## Research Orchestrator

### Deep Research (Full Visual Essay)
```
Using @agents/orchestrators/research-orchestrator.md:

Topic: [Topic]
Depth: Deep
Domain: Auto

Conduct comprehensive research and produce research package.
```

### Standard Research
```
Using @agents/orchestrators/research-orchestrator.md:

Topic: [Topic]
Depth: Standard
Domain: History

Produce research package for visual essay production.
```

### Quick Research (Fact-Check)
```
Using @agents/orchestrators/research-orchestrator.md:

Topic: [Specific claim to verify]
Depth: Quick
Domain: Auto

Verify this claim with sources.
```

---

## Scrollytelling Expert

### New Visual Essay Content
```
Using @agents/orchestrators/scrollytelling-expert.md, create an immersive 
visual essay following this production brief:

[INSERT BRIEF]

Spec: orchestration/skills/visual-essay-invocation/specs/[slug].md
Research Package: [essay-slug]/research/

Requirements:
1. Begin with Design Research phase
2. Mobile-native first
3. Use sources from research/CITATIONS.md
4. Real mobile device testing required
```

### Design Research Only
```
Using @agents/orchestrators/scrollytelling-expert.md, conduct Design Research 
for the visual essay:

Spec: orchestration/skills/visual-essay-invocation/specs/[slug].md
Topic: [Topic]

Deliver Design Research Report with unique visual identity.
```

---

## Common Patterns

### After Manual Browser Testing
When you find an issue while testing in the browser:

```
Using @agents/orchestrators/qa-remediation-orchestrator.md:

Essay: src/app/essays/visual/[slug]/
Spec: orchestration/skills/visual-essay-invocation/specs/[slug].md
Issue: "[Describe what you observed]"
Section: [Where you saw it]
Mode: --auto

Investigate, cross-reference against spec, and fix.
```

### Pre-Publication Checklist
Before publishing any visual essay:

```
Using @agents/orchestrators/meta-audit-orchestrator.md:

Essay: src/app/essays/visual/[slug]/
Spec: orchestration/skills/visual-essay-invocation/specs/[slug].md

Run comprehensive audit. Require certification before publish.
```

### Post-Fix Verification
After applying fixes:

```
Using @agents/orchestrators/qa-remediation-orchestrator.md:

Essay: src/app/essays/visual/[slug]/
Spec: orchestration/skills/visual-essay-invocation/specs/[slug].md
Previous Report: orchestration/audits/[slug]/QA-REMEDIATION-[date].md
Sections: [Previously failing sections]

Re-audit and confirm fixes are working.
```

---

## Key Parameters Reference

### Autonomy Modes (QA Remediation)
| Mode | Flag | Behavior |
|------|------|----------|
| Auto | `--auto` | Fix immediately, report after |
| Approval | `--approval` | Present issues, await approval |
| Report Only | `--report-only` | Audit only, no fixes |

### Research Depths
| Depth | Sources | Use Case |
|-------|---------|----------|
| Deep | 15-25 | Full visual essay |
| Standard | 8-15 | Standard content |
| Quick | 3-5 | Fact-check |

### Audit Domains
| Domain | Checks |
|--------|--------|
| Scroll | Scroll-lock, 60fps, mobile |
| Experience | Animations, reveals |
| Visual | SVG, images |
| Citation | Sources, links |
| SEO | Metadata, schema |
| **Spec Compliance** | Output matches spec |

---

## Required Paths

Every orchestrator invocation should include:

| Parameter | Path Pattern |
|-----------|--------------|
| **Essay** | `src/app/essays/visual/[slug]/` |
| **Spec** | `orchestration/skills/visual-essay-invocation/specs/[slug].md` |
| **Research** | `src/app/essays/visual/[slug]/research/` (if exists) |
| **Reports** | `orchestration/audits/[slug]/` |

---

*Last Updated: December 11, 2025*
