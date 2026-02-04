# Violet Ink Dark Theme

> **Codename:** `violet-ink-dark`  
> **Primary Colors:** Ink black backgrounds (`#0a0a0f`) + Violet accents (`#8b5cf6`)  
> **Created:** February 2026  
> **Status:** Production-ready (default homepage theme)

## Overview

A sophisticated dark theme with violet/purple accents. This creates a unique, premium academic aesthetic that stands out while maintaining excellent readability. This is Esy's original brand color scheme.

## Design Philosophy

- **Deep Ink Backgrounds** — Near-black with subtle violet undertone
- **Violet Accents** — Brand-consistent purple gradients
- **Circuit Aesthetic** — Traces and pulses in violet
- **WCAG AA Compliant** — All text meets accessibility standards

---

## Color Palette

### Primary Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Ink** | `#0a0a0f` | Primary background |
| **Violet** | `#8b5cf6` | Primary accent |
| **Off-White** | `#fafafa` | Primary text |

### Backgrounds

| Token | Hex | Usage |
|-------|-----|-------|
| `--ic-bg` | `#0a0a0f` | Primary page background |
| `--ic-bg-elevated` | `#12121a` | Elevated surfaces |
| `--ic-bg-alternate` | `#08080c` | Alternate sections |
| `--ic-surface` | `#18181f` | Card backgrounds |
| `--ic-surface-elevated` | `#1f1f28` | Elevated cards |

### Text Colors (Zinc Palette)

| Token | Hex | Usage |
|-------|-----|-------|
| `--ic-text` | `#fafafa` | Primary text (off-white) |
| `--ic-text-secondary` | `#e4e4e7` | Secondary content |
| `--ic-text-muted` | `#a1a1aa` | Muted text |
| `--ic-text-subtle` | `#71717a` | Subtle/decorative |

### Accent Colors (Violet/Purple)

| Token | Hex | Usage |
|-------|-----|-------|
| `--ic-accent` | `#8b5cf6` | Primary accent (Violet-500) |
| `--ic-accent-darker` | `#7c3aed` | CTA buttons, hover |
| `--ic-accent-light` | `#c4b5fd` | Highlights, glows |
| `--ic-accent-violet` | `#a78bfa` | Gradient end |
| `--ic-accent-tint` | `rgba(139, 92, 246, 0.08)` | Subtle backgrounds |

### Circuit Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--ic-trace` | `rgba(139, 92, 246, 0.25)` | Circuit trace lines |
| `--ic-trace-active` | `rgba(139, 92, 246, 0.6)` | Active traces |
| `--ic-signal` | `#c4b5fd` | Signal pulse color |
| `--ic-signal-glow` | `rgba(196, 181, 253, 0.5)` | Pulse glow |
| `--ic-node-bg` | `rgba(24, 24, 31, 0.9)` | Node backgrounds |
| `--ic-node-border` | `rgba(139, 92, 246, 0.2)` | Node borders |
| `--ic-gate-pass` | `#22c55e` | Verification checkmark |

### Gradients

| Name | Value | Usage |
|------|-------|-------|
| Hero Gradient | `linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)` | Hero text gradient |
| Subtle Gradient | `linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(167, 139, 250, 0.05) 100%)` | Subtle backgrounds |

---

## CSS Implementation

### Design Tokens (CSS Variables)

```css
/* ============================================
   DARK MODE - VIOLET INK THEME (Default)
   ============================================ */

.ic-page {
  /* Background - Deep ink with violet undertone */
  --ic-bg: #0a0a0f;
  --ic-bg-elevated: #12121a;
  --ic-bg-alternate: #08080c;
  --ic-surface: #18181f;
  --ic-surface-elevated: #1f1f28;
  
  /* Circuit colors - Violet/Purple */
  --ic-trace: rgba(139, 92, 246, 0.25);
  --ic-trace-active: rgba(139, 92, 246, 0.6);
  --ic-signal: #c4b5fd;
  --ic-signal-glow: rgba(196, 181, 253, 0.5);
  --ic-node-bg: rgba(24, 24, 31, 0.9);
  --ic-node-border: rgba(139, 92, 246, 0.2);
  --ic-gate-pass: #22c55e;
  
  /* Accents - Violet/Purple Primary */
  --ic-accent: #8b5cf6;
  --ic-accent-darker: #7c3aed;
  --ic-accent-light: #c4b5fd;
  --ic-accent-violet: #a78bfa;
  --ic-accent-tint: rgba(139, 92, 246, 0.08);
  
  /* Gradients - Violet */
  --ic-gradient-hero: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%);
}
```

### CTA Buttons

```css
/* Primary CTA - Violet */
.ic-cta-primary {
  background: #7c3aed;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
}

.ic-cta-primary:hover {
  background: #6d28d9;
  box-shadow: 0 6px 16px rgba(124, 58, 237, 0.4);
}

/* Secondary CTA */
.ic-cta-secondary {
  background: rgba(139, 92, 246, 0.12);
  color: #fafafa;
  border: 1px solid rgba(139, 92, 246, 0.25);
}
```

---

## JavaScript Theme Constants

```javascript
// From src/lib/theme.js - elevatedDarkTheme
const violetInkDark = {
  // Backgrounds
  bg: '#0a0a0f',
  bgElevated: '#12121a',
  surface: '#18181f',
  
  // Text
  text: '#fafafa',
  textSecondary: '#e4e4e7',
  muted: '#a1a1aa',
  subtle: '#71717a',
  
  // Accent - Violet
  accent: '#8b5cf6',
  accentDarker: '#7c3aed',
  accentLight: '#c4b5fd',
  accentViolet: '#a78bfa',
  accentGlow: 'rgba(139, 92, 246, 0.15)',
  
  // Gradients
  gradients: {
    hero: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
  },
  
  // Circuit specific
  circuit: {
    trace: 'rgba(139, 92, 246, 0.25)',
    traceActive: 'rgba(139, 92, 246, 0.6)',
    signal: '#c4b5fd',
    ballColor: '#8b5cf6',
    gatePass: '#22c55e'
  }
};
```

---

## Logo Assets

| Mode | Logo Path |
|------|-----------|
| Dark (Ink) | `/esy-logos/logo-files/for-web/svg/color-logo-no-bg.svg` |
| Light | `/esy-logos/logo-files/for-web/svg/black-logo-no-bg.svg` |

---

## Related Files

- `src/components/IntelligenceCircuitry/IntelligenceCircuitryPage.css` — CSS variables
- `src/components/IntelligenceCircuitry/IntelligenceCircuitryPage.tsx` — Main component
- `src/components/IntelligenceCircuitry/CircuitCanvas.tsx` — Circuit animation
- `src/components/IntelligenceCircuitry/HowItWorksSection.css` — How It Works styles
- `src/lib/theme.js` — `elevatedDarkTheme` export

---

*See also: [VIOLET_MIST_LIGHT_THEME.md](./VIOLET_MIST_LIGHT_THEME.md)*
