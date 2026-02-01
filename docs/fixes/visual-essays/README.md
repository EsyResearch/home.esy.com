# Visual Essays Fix Patterns

This directory contains fix patterns and solutions specific to **visual essays** (scrollytelling pages).

## File Naming Convention

All pattern files follow this format:

```
PATTERN-[kebab-case-description].md
```

**Guidelines:**
- Prefix with `PATTERN-` (all caps)
- Use kebab-case for the description
- Be descriptive about the problem or solution
- Keep it concise but clear

**Examples:**
- `PATTERN-base-visible-animate-class-animations.md` — Describes the technique
- `PATTERN-global-css-hero-invisible-title-client-navigation.md` — Describes the problem context

---

## Patterns

| Pattern | Description |
|---------|-------------|
| [PATTERN-base-visible-animate-class-animations.md](./PATTERN-base-visible-animate-class-animations.md) | Robust animation pattern: base visible, `.animate` class triggers effects |
| [PATTERN-global-css-hero-content-fix.md](./PATTERN-global-css-hero-content-fix.md) | Fix for invisible hero content caused by global CSS conflicts |
| [PATTERN-global-css-hero-invisible-title-client-navigation.md](./PATTERN-global-css-hero-invisible-title-client-navigation.md) | Fix for hero titles invisible on client-side navigation |
| [PATTERN-scroll-lock-unlock-transition.md](./PATTERN-scroll-lock-unlock-transition.md) | Fix for content disappearing when scroll-lock releases |

## Quick Reference

### Hero title invisible on client-side navigation (but shows on refresh):

```
@docs/fixes/visual-essays/PATTERN-global-css-hero-invisible-title-client-navigation.md
```

### Adding entrance animations that work reliably:

```
@docs/fixes/visual-essays/PATTERN-base-visible-animate-class-animations.md
```

### Hero content broken or misaligned:

```
@docs/fixes/visual-essays/PATTERN-global-css-hero-content-fix.md
```

### Scroll-locked content disappears abruptly on unlock:

```
@docs/fixes/visual-essays/PATTERN-scroll-lock-unlock-transition.md
```

## Related Documentation

- [orchestration/agents/immersive-experience-engineer.md](../../../orchestration/agents/immersive-experience-engineer.md) — Engineering standards
- [orchestration/agents/immersive-experience-auditor.md](../../../orchestration/agents/immersive-experience-auditor.md) — Audit checklist
- [orchestration/agents/immersive-scrolling-auditor.md](../../../orchestration/agents/immersive-scrolling-auditor.md) — Scroll-lock testing standards
- [orchestration/skills/visual-essay-invocation/references/scroll-lock-patterns.md](../../../orchestration/skills/visual-essay-invocation/references/scroll-lock-patterns.md) — Scroll-lock animation patterns
- [orchestration/agents/README.md](../../../orchestration/agents/README.md) — "Known Style Conflicts" section
