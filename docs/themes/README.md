# Esy Theme Collection

This folder documents the branded theme variants available for Esy.com.

## Available Themes

| Theme | Codename | Primary Color | Accent | Status |
|-------|----------|---------------|--------|--------|
| [Terracotta Ink Dark](./TERRACOTTA_INK_DARK_THEME.md) | `terracotta-ink-dark` | Ink Black `#0a0a0c` | Orange `#ea580c` | ✅ Default |
| [Terracotta Cream Light](./TERRACOTTA_CREAM_LIGHT_THEME.md) | `terracotta-cream-light` | Cream `#fdfbf7` | Terracotta `#c2410c` | ✅ Toggleable |

## Color Naming Convention

### Backgrounds
- **Ink** — Near-black (`#0a0a0c`)
- **Cream** — Warm off-white (`#fdfbf7`)
- **Stone** — Warm gray (`#f5f3ef`)

### Accents
- **Terracotta** — Burnt orange (`#c2410c`, `#9a3412`)
- **Orange** — Bright orange (`#ea580c`)
- **Amber** — Yellow-orange (`#f59e0b`)

### Text
- **Stone palette** (Light mode): `#1c1917` → `#a8a29e`
- **Zinc palette** (Dark mode): `#fafafa` → `#52525b`

## Theme Files

### JavaScript Exports (`src/lib/theme.js`)

```javascript
import { 
  terracottaInkDarkTheme,      // Dark theme with orange accents
  warmAcademicLightTheme,      // Light theme with cream/terracotta
  elevatedDarkTheme,           // Original elevated dark (purple)
  lightTheme                   // Basic light theme (purple)
} from '@/lib/theme';
```

### CSS Variables

Located in `src/components/IntelligenceCircuitry/IntelligenceCircuitryPage.css`:

```css
/* Dark mode (default) */
.ic-page { ... }

/* Light mode */
.ic-page--light { ... }
```

## Quick Reference

### Terracotta Ink Dark
```css
--ic-bg: #0a0a0c;
--ic-accent: #ea580c;
--ic-text: #fafafa;
```

### Terracotta Cream Light
```css
--ic-bg: #fdfbf7;
--ic-accent: #c2410c;
--ic-text: #1c1917;
```

## Reverting Themes

Each theme document includes instructions for reverting to previous versions:

- **Terracotta → Purple**: See [TERRACOTTA_INK_DARK_THEME.md](./TERRACOTTA_INK_DARK_THEME.md#reverting-to-original-purple-theme)
- **Light → Dark only**: See [TERRACOTTA_CREAM_LIGHT_THEME.md](./TERRACOTTA_CREAM_LIGHT_THEME.md#reverting-to-dark-only-mode)

## Original Theme (Archive)

The original purple-accented themes are documented in:
- `src/lib/theme.js` — `elevatedDarkTheme` (purple accents)
- `src/lib/lightTheme.js` — Basic light theme (purple accents)

---

*Last updated: February 2026*
