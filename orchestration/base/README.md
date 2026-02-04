# Base Orchestration Patterns

> Created: February 2026

## Overview

This directory contains **universal patterns** shared by all artifact orchestrators. It is not invoked directly — domain-specific orchestrators reference this base and add their own profiles.

## Files

| File | Purpose |
|------|---------|
| `base-artifact-orchestrator.md` | Universal gates (G1, G5, G8-G9), quality framework, templates |

## Universal Gates

All artifact types share these foundational gates:

| Gate | Name | Purpose |
|------|------|---------|
| G1 | Intake Approval | Lock in WHAT before any work |
| G5 | Content Complete | All content drafted and reviewed |
| G8 | Publication Certification | All audits pass |
| G9 | Publication Approval | Final sign-off |

## How Orchestrators Use This

```markdown
# [Domain] Essay Orchestrator

Extends: @orchestration/base/base-artifact-orchestrator.md

## Profile Composition
- Research: @profiles/research/[domain]-research-profile.md
- Design: @profiles/design/[domain]-design-profile.md
```

## See Also

- [profiles/](../profiles/) — Domain-specific gate deliverables
- [visual-essay-orchestrator.md](../agents/orchestrators/visual-essay-orchestrator.md)
- [conceptual-essay-orchestrator.md](../agents/orchestrators/conceptual-essay-orchestrator.md)

---

*This base provides the foundational patterns shared by all Esy artifact orchestrators.*
