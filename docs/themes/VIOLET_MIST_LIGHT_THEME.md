# Violet Mist Light Theme

> **Codename:** `violet-mist-light`  
> **Primary Colors:** Violet-tinted white backgrounds (`#faf8ff`) + Violet accents (`#7c3aed`)  
> **Created:** February 2026  
> **Status:** Production-ready, toggleable via homepage theme switch

## Overview

A sophisticated, premium light theme designed for academic reading and research workflows. This theme uses subtle violet-tinted backgrounds instead of pure whites, paired with violet accents for brand cohesion.

## Design Philosophy

Following the UI/UX Design Expert principles:
- **Minimal & Academic** — Clean layouts with scholarly sophistication
- **Premium Sophistication** — Violet undertones, refined typography
- **WCAG AA Compliant** — All text meets accessibility standards
- **Section Delimitation** — Clear visual separation through varying violet intensity

## Color Theory Foundation

- **Subtle violet-tinted backgrounds** create brand cohesion
- **Slate text palette** (cool undertones) complements violet
- **Section delimitation** through varying violet intensity
- Backgrounds progress from subtle (`#faf8ff`) to stronger (`#ede9fe`) for visual hierarchy

---

## Color Palette

### Primary Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Violet Mist** | `#faf8ff` | Primary background |
| **Violet** | `#7c3aed` | Primary accent |
| **Slate** | `#0f172a` | Primary text |

### Backgrounds

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--ic-bg` | `#faf8ff` | `250, 248, 255` | Primary page background |
| `--ic-bg-elevated` | `#ffffff` | `255, 255, 255` | Card backgrounds |
| `--ic-bg-alternate` | `#f5f3ff` | `245, 243, 255` | Slightly more violet |
| `--ic-surface` | `#ffffff` | Pure white for cards |
| `--ic-surface-elevated` | `#fefcff` | Warmest white with violet hint |

### Section-Specific Backgrounds

| Section | Gradient/Color | Purpose |
|---------|----------------|---------|
| Hero | `#faf8ff → #f5f3ff` | Subtle violet gradient |
| Templates | `#f8fafc` (Slate-50) | Clean contrast |
| How It Works | `#fefcff → #faf8ff` | Warmest white gradient |
| Gallery | `#f1f5f9` (Slate-100) | Neutral visual break |
| Final CTA | `#faf8ff → #ede9fe` | Stronger violet emphasis |
| Footer | `#f8fafc → #f1f5f9` | Cool slate gradient |

### Text Colors (Slate Palette)

| Token | Hex | Contrast | Usage |
|-------|-----|----------|-------|
| `--ic-text` | `#0f172a` | 15.6:1 | Primary text (Slate-900) |
| `--ic-text-secondary` | `#334155` | 9.8:1 | Secondary content (Slate-700) |
| `--ic-text-muted` | `#64748b` | 5.1:1 | Muted text (Slate-500) |
| `--ic-text-subtle` | `#94a3b8` | 3.2:1 | Decorative only (Slate-400) |

### Accent Colors (Violet)

| Token | Hex | Usage |
|-------|-----|-------|
| Primary Accent | `#7c3aed` | Links, highlights (Violet-600) |
| Accent Hover | `#6d28d9` | Hover states (Violet-700) |
| Accent Darkest | `#5b21b6` | CTA buttons (Violet-800) |
| Accent Light | `#a78bfa` | Highlights (Violet-400) |
| Accent Lighter | `#c4b5fd` | Glows (Violet-300) |
| Accent Glow | `rgba(124, 58, 237, 0.1)` | Subtle backgrounds |

### Border Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--ic-border` | `rgba(15, 23, 42, 0.08)` | Primary borders |
| `--ic-border-subtle` | `rgba(15, 23, 42, 0.05)` | Subtle borders |
| `--ic-border-divider` | `rgba(15, 23, 42, 0.04)` | Section dividers |

---

## CSS Implementation

### Design Tokens (CSS Variables)

```css
/* ============================================
   LIGHT MODE - VIOLET MIST THEME
   ============================================ */

.ic-page--light {
  /* Backgrounds - Subtle violet-tinted whites */
  --ic-bg: #faf8ff;
  --ic-bg-elevated: #ffffff;
  --ic-bg-alternate: #f5f3ff;
  --ic-surface: #ffffff;
  --ic-surface-elevated: #fefcff;
  
  /* Circuit colors - Violet */
  --ic-trace: rgba(124, 58, 237, 0.12);
  --ic-trace-active: rgba(124, 58, 237, 0.35);
  --ic-signal: #7c3aed;
  --ic-signal-glow: rgba(124, 58, 237, 0.25);
  --ic-node-bg: rgba(255, 255, 255, 0.98);
  --ic-node-border: rgba(124, 58, 237, 0.15);
  --ic-gate-pass: #16a34a;
  
  /* Text - Cool Slate palette */
  --ic-text: #0f172a;
  --ic-text-secondary: #334155;
  --ic-text-muted: #64748b;
  --ic-text-subtle: #94a3b8;
  
  /* Accent - Violet */
  --ic-accent: #7c3aed;
  --ic-accent-darker: #6d28d9;
  --ic-accent-darkest: #5b21b6;
  --ic-accent-light: #a78bfa;
  --ic-accent-glow: rgba(124, 58, 237, 0.1);
  
  /* Hero gradient */
  --ic-gradient-hero: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%);
}
```

### CTA Buttons

```css
/* Primary CTA - Deep Violet */
.ic-page--light .ic-cta-primary {
  background: #5b21b6;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(91, 33, 182, 0.25);
}

.ic-page--light .ic-cta-primary:hover {
  background: #4c1d95;
  box-shadow: 0 6px 16px rgba(91, 33, 182, 0.35);
}

/* Secondary CTA - Outlined */
.ic-page--light .ic-cta-secondary {
  background: rgba(124, 58, 237, 0.08);
  color: #5b21b6;
  border: 1px solid rgba(124, 58, 237, 0.2);
}

.ic-page--light .ic-cta-secondary:hover {
  background: rgba(124, 58, 237, 0.12);
}
```

---

## JavaScript Theme Constants

```javascript
// From src/lib/theme.js
import { violetMistLightTheme } from '@/lib/theme';

// Or use directly:
const violetMistLight = {
  // Backgrounds
  bg: '#faf8ff',
  bgElevated: '#ffffff',
  bgAlternate: '#f5f3ff',
  surface: '#ffffff',
  
  // Text (Slate palette)
  text: '#0f172a',
  textSecondary: '#334155',
  muted: '#64748b',
  subtle: '#94a3b8',
  
  // Accent (Violet)
  accent: '#7c3aed',
  accentHover: '#6d28d9',
  accentDark: '#5b21b6',
  accentDarkest: '#4c1d95',
  accentGlow: 'rgba(124, 58, 237, 0.1)',
  
  // Section backgrounds
  sections: {
    hero: 'linear-gradient(180deg, #faf8ff 0%, #f5f3ff 100%)',
    templates: '#f8fafc',
    howItWorks: 'linear-gradient(180deg, #fefcff 0%, #faf8ff 100%)',
    gallery: '#f1f5f9',
    finalCta: 'linear-gradient(180deg, #faf8ff 0%, #ede9fe 100%)',
    footer: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)'
  }
};
```

---

## Logo Assets

| Mode | Logo Path |
|------|-----------|
| Light (Violet Mist) | `/esy-logos/logo-files/for-web/svg/black-logo-no-bg.svg` |
| Dark | `/esy-logos/logo-files/for-web/svg/color-logo-no-bg.svg` |

---

## Accessibility

### Contrast Ratios (WCAG AA Compliant)

| Element | Foreground | Background | Ratio | Status |
|---------|------------|------------|-------|--------|
| Primary Text | `#0f172a` | `#faf8ff` | 15.6:1 | ✅ AAA |
| Secondary Text | `#334155` | `#faf8ff` | 9.8:1 | ✅ AAA |
| Muted Text | `#64748b` | `#faf8ff` | 5.1:1 | ✅ AA |
| CTA Button | `#ffffff` | `#5b21b6` | 10.2:1 | ✅ AAA |
| Accent Text | `#7c3aed` | `#faf8ff` | 5.8:1 | ✅ AA |

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
- `src/lib/theme.js` — `violetMistLightTheme` export

---

*See also: [VIOLET_INK_DARK_THEME.md](./VIOLET_INK_DARK_THEME.md)*
