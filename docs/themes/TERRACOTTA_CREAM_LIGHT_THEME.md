# Terracotta Cream Light Theme

> **Codename:** `terracotta-cream-light`  
> **Primary Colors:** Cream backgrounds (`#fdfbf7`) + Terracotta accents (`#c2410c`)  
> **Created:** February 2026  
> **Status:** Production-ready, toggleable via homepage theme switch

## Overview

A sophisticated, warm light theme designed for academic reading and research workflows. This theme uses cream and stone undertones instead of pure whites, paired with terracotta/burnt orange accents for a scholarly, premium aesthetic.

## Design Philosophy

Following the UI/UX Design Expert principles:
- **Minimal & Academic** — Clean layouts with scholarly sophistication
- **Premium Sophistication** — Warm undertones, refined typography
- **WCAG AA Compliant** — All text meets accessibility standards
- **Section Delimitation** — Clear visual separation between page sections

---

## Color Palette

### Primary Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Cream** | `#fdfbf7` | Primary background |
| **Terracotta** | `#c2410c` | Primary accent |
| **Stone** | `#1c1917` | Primary text |

### Backgrounds

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--ic-bg` | `#fdfbf7` | `253, 251, 247` | Primary page background |
| `--ic-bg-elevated` | `#f7f5f0` | `247, 245, 240` | Elevated surface (templates section) |
| `--ic-surface` | `#ffffff` | `255, 255, 255` | Card backgrounds |
| `--ic-surface-elevated` | `#fffefa` | `255, 254, 250` | Elevated cards |

### Section-Specific Backgrounds

| Section | Gradient/Color | Purpose |
|---------|----------------|---------|
| Hero | `#fdfbf7 → #f8f5ef` | Warm cream gradient |
| Templates | `#f7f5f0` (solid) | Subtle distinction from hero |
| How It Works | `#fffefa → #fdfbf7` | Warmest white gradient |
| Gallery | `#f5f3ef` | Stone undertone |
| Final CTA | `#fdfbf7 → #fff7ed` | Warm with accent tint |
| Footer | `#f5f3ef → #ece9e3` | Stone gradient |

### Text Colors (Stone Palette)

| Token | Hex | Contrast | Usage |
|-------|-----|----------|-------|
| `--ic-text` | `#1c1917` | 15.6:1 | Primary text (warm black) |
| `--ic-text-secondary` | `#44403c` | 9.8:1 | Secondary content |
| `--ic-text-muted` | `#78716c` | 5.1:1 | Muted text |
| `--ic-text-subtle` | `#a8a29e` | 3.2:1 | Decorative only |

### Accent Colors (Terracotta/Orange)

| Token | Hex | Usage |
|-------|-----|-------|
| Primary Accent | `#c2410c` | CTAs, links, highlights |
| Accent Hover | `#9a3412` | Hover states, CTA buttons |
| Accent Dark | `#7c2d12` | Dark emphasis |
| Accent Light | `#ea580c` | Bright accents |
| Accent Lighter | `#fdba74` | Highlights, glows |
| Accent Glow | `rgba(194, 65, 12, 0.15)` | Subtle glows |

### Border Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--ic-border` | `rgba(28, 25, 23, 0.1)` | Primary borders |
| `--ic-border-subtle` | `rgba(28, 25, 23, 0.06)` | Subtle borders |
| `--ic-border-divider` | `rgba(28, 25, 23, 0.04)` | Section dividers |

---

## CSS Implementation

### Design Tokens (CSS Variables)

```css
/* ============================================
   LIGHT MODE - TERRACOTTA CREAM THEME
   ============================================ */

.ic-page--light {
  /* Backgrounds - Warm cream/parchment tones */
  --ic-bg: #fdfbf7;
  --ic-bg-elevated: #f7f5f0;
  --ic-surface: #ffffff;
  --ic-surface-elevated: #fffefa;
  
  /* Circuit colors - Terracotta Orange */
  --ic-trace: rgba(194, 65, 12, 0.15);
  --ic-trace-active: rgba(194, 65, 12, 0.4);
  --ic-signal: #ea580c;
  --ic-signal-glow: rgba(234, 88, 12, 0.3);
  --ic-node-bg: rgba(255, 255, 255, 0.95);
  --ic-node-border: rgba(28, 25, 23, 0.12);
  --ic-gate-pass: #16a34a;
  
  /* Text - Stone palette */
  --ic-text: #1c1917;
  --ic-text-secondary: #44403c;
  --ic-text-muted: #78716c;
  --ic-text-subtle: #a8a29e;
  
  /* Borders - Warm subtle */
  --ic-border: rgba(28, 25, 23, 0.1);
  --ic-border-subtle: rgba(28, 25, 23, 0.06);
  
  /* Accent - Terracotta */
  --ic-accent: #c2410c;
  --ic-accent-hover: #9a3412;
  --ic-accent-light: #fdba74;
  --ic-accent-glow: rgba(194, 65, 12, 0.15);
  
  /* Hero gradient */
  --ic-gradient-hero: linear-gradient(135deg, #c2410c 0%, #ea580c 100%);
}
```

### CTA Buttons

```css
/* Primary CTA - Terracotta */
.ic-page--light .ic-cta-primary {
  background: #9a3412;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(154, 52, 18, 0.25);
}

.ic-page--light .ic-cta-primary:hover {
  background: #7c2d12;
  box-shadow: 0 4px 12px rgba(154, 52, 18, 0.3);
}

/* Secondary CTA - Outlined */
.ic-page--light .ic-cta-secondary {
  background: transparent;
  color: #1c1917;
  border: 1px solid rgba(28, 25, 23, 0.2);
}

.ic-page--light .ic-cta-secondary:hover {
  background: rgba(28, 25, 23, 0.04);
  border-color: rgba(28, 25, 23, 0.3);
}
```

---

## JavaScript Theme Constants

```javascript
// Import from theme.js
import { warmAcademicLightTheme } from '@/lib/theme';

// Or use directly:
const terracottaCreamLight = {
  // Backgrounds
  bg: '#fdfbf7',
  bgGradient: 'linear-gradient(180deg, #fdfbf7 0%, #f8f5ef 100%)',
  elevated: '#f7f5f0',
  surface: '#ffffff',
  
  // Text (Stone palette)
  text: '#1c1917',
  textSecondary: '#44403c',
  muted: '#78716c',
  subtle: '#a8a29e',
  
  // Accent (Terracotta)
  accent: '#c2410c',
  accentHover: '#9a3412',
  accentDark: '#7c2d12',
  accentLight: '#ea580c',
  accentGlow: 'rgba(194, 65, 12, 0.15)',
  
  // Borders
  border: 'rgba(28, 25, 23, 0.1)',
  borderSubtle: 'rgba(28, 25, 23, 0.06)',
  
  // Footer
  footerBg: '#f5f3ef',
  footerBgGradient: 'linear-gradient(180deg, #f5f3ef 0%, #ece9e3 100%)',
};
```

---

## Logo Assets

| Mode | Logo Path |
|------|-----------|
| Light (Cream) | `/esy-logos/logo-files/for-web/svg/black-logo-no-bg.svg` |
| Dark | `/esy-logos/logo-files/for-web/svg/color-logo-no-bg.svg` |

---

## Accessibility

### Contrast Ratios (WCAG AA Compliant)

| Element | Foreground | Background | Ratio | Status |
|---------|------------|------------|-------|--------|
| Primary Text | `#1c1917` | `#fdfbf7` | 15.6:1 | ✅ AAA |
| Secondary Text | `#44403c` | `#fdfbf7` | 9.8:1 | ✅ AAA |
| Muted Text | `#78716c` | `#fdfbf7` | 5.1:1 | ✅ AA |
| CTA Button | `#ffffff` | `#9a3412` | 7.2:1 | ✅ AAA |
| Accent Text | `#c2410c` | `#fdfbf7` | 5.8:1 | ✅ AA |

---

## Reverting to Dark-Only Mode

To remove the light theme toggle and revert to dark-only:

1. **In `IntelligenceCircuitryPage.tsx`:**
   - Remove `useState` for theme
   - Remove toggle button JSX
   - Change `className="ic-page"` (remove conditional)
   - Remove `theme` prop from `<CircuitCanvas />`

2. **CSS can remain** — `.ic-page--light` styles are only activated when the class is present

---

## Related Files

- `src/components/IntelligenceCircuitry/IntelligenceCircuitryPage.css` — CSS variables
- `src/components/IntelligenceCircuitry/IntelligenceCircuitryPage.tsx` — Theme toggle
- `src/components/IntelligenceCircuitry/CircuitCanvas.tsx` — Circuit colors
- `src/components/Home/footer.tsx` — Footer theme detection
- `src/lib/theme.js` — `warmAcademicLightTheme` export

---

*See also: [TERRACOTTA_INK_DARK_THEME.md](./TERRACOTTA_INK_DARK_THEME.md)*
