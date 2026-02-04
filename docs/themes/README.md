# Esy Theme Collection

This folder documents the branded theme variants available for Esy.com.

## Current Active Themes

| Theme | Codename | Primary Color | Accent | Status |
|-------|----------|---------------|--------|--------|
| [Violet Ink Dark](./VIOLET_INK_DARK_THEME.md) | `violet-ink-dark` | Ink Black `#0a0a0f` | Violet `#8b5cf6` | ✅ Default |
| [Violet Mist Light](./VIOLET_MIST_LIGHT_THEME.md) | `violet-mist-light` | Violet Mist `#faf8ff` | Violet `#7c3aed` | ✅ Toggleable |

## Archived Themes

| Theme | Codename | Primary Color | Accent | Status |
|-------|----------|---------------|--------|--------|
| [Terracotta Ink Dark](./TERRACOTTA_INK_DARK_THEME.md) | `terracotta-ink-dark` | Ink Black `#0a0a0c` | Orange `#ea580c` | 📁 Archived |
| [Terracotta Cream Light](./TERRACOTTA_CREAM_LIGHT_THEME.md) | `terracotta-cream-light` | Cream `#fdfbf7` | Terracotta `#c2410c` | 📁 Archived |

## Color Naming Convention

### Backgrounds
- **Ink** — Near-black (`#0a0a0f`)
- **Violet Mist** — Subtle violet-tinted white (`#faf8ff`)
- **Cream** — Warm off-white (`#fdfbf7`) [archived]

### Accents
- **Violet** — Purple (`#8b5cf6`, `#7c3aed`)
- **Terracotta** — Burnt orange (`#c2410c`, `#9a3412`) [archived]

### Text
- **Slate palette** (Light mode): `#0f172a` → `#94a3b8`
- **Zinc palette** (Dark mode): `#fafafa` → `#52525b`

## Theme Files

### JavaScript Exports (`src/lib/theme.js`)

```javascript
import { 
  elevatedDarkTheme,            // Violet dark theme (original)
  violetMistLightTheme,         // Violet light theme (current)
  terracottaInkDarkTheme,       // Orange dark theme (archived)
  warmAcademicLightTheme,       // Orange light theme (archived)
} from '@/lib/theme';
```

### CSS Variables

Located in `src/components/IntelligenceCircuitry/IntelligenceCircuitryPage.css`:

```css
/* Dark mode (default) - Violet */
.ic-page { ... }

/* Light mode - Violet Mist */
.ic-page--light { ... }
```

## Quick Reference

### Violet Ink Dark (Active)
```css
--ic-bg: #0a0a0f;
--ic-accent: #8b5cf6;
--ic-text: #fafafa;
```

### Violet Mist Light (Active)
```css
--ic-bg: #faf8ff;
--ic-accent: #7c3aed;
--ic-text: #0f172a;
```

## Switching Between Themes

### To Use Violet (Current)
The current default. No changes needed.

### To Use Terracotta (Archived)
Reference the archived documentation:
- Update CSS variables in `IntelligenceCircuitryPage.css`
- Update `CircuitCanvas.tsx` colors
- Update `HowItWorksSection.css`
- Update `footer.tsx` and `navigation.tsx`

See [TERRACOTTA_INK_DARK_THEME.md](./TERRACOTTA_INK_DARK_THEME.md) for detailed values.

## Design Philosophy

Based on the UI/UX Design Expert principles:
- **Minimal & Academic** — Clean layouts with scholarly sophistication
- **Premium Sophistication** — Refined color palette
- **WCAG AA Compliant** — All text meets accessibility standards
- **Section Delimitation** — Clear visual separation between sections

---

*Last updated: February 2026*
