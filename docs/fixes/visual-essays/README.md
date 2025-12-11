# Visual Essays Fix Patterns

This directory contains fix patterns and solutions specific to **visual essays** (scrollytelling pages).

## Patterns

| Pattern | Description |
|---------|-------------|
| [PATTERN-global-css-hero-content-fix.md](./PATTERN-global-css-hero-content-fix.md) | Fix for invisible hero content caused by global CSS conflicts |
| [PATTERN-scroll-lock-unlock-transition.md](./PATTERN-scroll-lock-unlock-transition.md) | Fix for content disappearing when scroll-lock releases |

## Quick Reference

When creating a new visual essay and the hero is broken:

```
@docs/fixes/visual-essays/PATTERN-global-css-hero-content-fix.md
```

When scroll-locked content disappears abruptly on unlock:

```
@docs/fixes/visual-essays/PATTERN-scroll-lock-unlock-transition.md
```

## Related Documentation

- [orchestration/agents/immersive-experience-engineer.md](../../../orchestration/agents/immersive-experience-engineer.md) — Engineering standards
- [orchestration/agents/immersive-experience-auditor.md](../../../orchestration/agents/immersive-experience-auditor.md) — Audit checklist
- [orchestration/agents/immersive-scrolling-auditor.md](../../../orchestration/agents/immersive-scrolling-auditor.md) — Scroll-lock testing standards
- [orchestration/skills/visual-essay-invocation/references/scroll-lock-patterns.md](../../../orchestration/skills/visual-essay-invocation/references/scroll-lock-patterns.md) — Scroll-lock animation patterns
- [orchestration/agents/README.md](../../../orchestration/agents/README.md) — "Known Style Conflicts" section
