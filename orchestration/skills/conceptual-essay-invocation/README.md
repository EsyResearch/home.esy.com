# Conceptual Essay Invocation Skill

> Created: February 2026

## Quick Reference

**Purpose**: Build 6-layer invocation specs for conceptual/educational visual essays.

**Use When**: Creating essays that explain abstract concepts through diagrams.

## Key Files

| File | Purpose |
|------|---------|
| `SKILL.md` | Complete skill definition and 6-layer architecture |
| `examples/` | Example invocation specs |
| `specs/` | Production specs for conceptual essays |
| `references/` | Diagram patterns and templates |

## Core Difference from Visual Essay Invocation

| Visual Essay | Conceptual Essay |
|--------------|------------------|
| Historical figures | Abstract concepts |
| Archival photos | SVG diagrams |
| Timeline events | Learning sequence |
| Era treatments | Concept sections |
| Quote verification | Claim verification |

## 6-Layer Summary

1. **Meta**: Topic, thesis, audience, learning objectives
2. **Research Foundation**: Reference to concept research package
3. **Section Architecture**: Learning sequence from SEQUENCE.md
4. **Diagram Specifications**: SVG blueprints with animation
5. **Content Specifications**: Text that supports diagrams
6. **Technical Implementation**: File structure, tokens, accessibility

## Invocation Example

```
Using @skills/conceptual-essay-invocation/SKILL.md:

Topic: The Brain as a Prediction Machine
Research Package: brain-prediction/research/
Design Research: brain-prediction/DESIGN-RESEARCH.md

Build complete 6-layer spec following the learning sequence.
```

## See Also

- [SKILL.md](./SKILL.md) — Full specification
- [conceptual-essay-orchestrator.md](../../agents/orchestrators/conceptual-essay-orchestrator.md)

---

*This skill enables creation of educational visual essays that explain complex concepts through diagram-first design.*
