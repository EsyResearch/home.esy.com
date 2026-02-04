# Terracotta Ink Dark Theme

> **Codename:** `terracotta-ink-dark`  
> **Primary Colors:** Ink black backgrounds (`#0a0a0c`) + Terracotta/Orange accents (`#ea580c`)  
> **Created:** February 2026  
> **Status:** Production-ready (default homepage theme)

## Overview

A sophisticated dark theme that replaces the original purple accents with warm terracotta/orange tones. This creates a unique, premium aesthetic that stands out from typical tech-focused dark themes while maintaining excellent readability.

## Design Philosophy

- **Deep Ink Backgrounds** — Near-black with subtle warmth
- **Warm Orange Accents** — Terracotta to amber gradient
- **Circuit Aesthetic** — Traces and pulses in warm orange
- **WCAG AA Compliant** — All text meets accessibility standards

---

## Color Palette

### Primary Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Ink** | `#0a0a0c` | Primary background |
| **Orange** | `#ea580c` | Primary accent |
| **Off-White** | `#fafafa` | Primary text |

### Backgrounds

| Token | Hex | Usage |
|-------|-----|-------|
| `--ic-bg` | `#0a0a0c` | Primary page background |
| `--ic-bg-elevated` | `#111113` | Elevated surfaces |
| `--ic-bg-alternate` | `#08080a` | Alternate sections |
| `--ic-surface` | `#18181b` | Card backgrounds |
| `--ic-surface-elevated` | `#1f1f23` | Elevated cards |

### Text Colors (Zinc Palette)

| Token | Hex | Usage |
|-------|-----|-------|
| `--ic-text` | `#fafafa` | Primary text (off-white) |
| `--ic-text-secondary` | `#e4e4e7` | Secondary content |
| `--ic-text-muted` | `#a1a1aa` | Muted text |
| `--ic-text-subtle` | `#71717a` | Subtle/decorative |

### Accent Colors (Terracotta/Orange)

| Token | Hex | Usage |
|-------|-----|-------|
| `--ic-accent` | `#ea580c` | Primary accent (Orange-600) |
| `--ic-accent-darker` | `#9a3412` | CTA buttons, hover |
| `--ic-accent-light` | `#fdba74` | Highlights, glows |
| `--ic-accent-amber` | `#f59e0b` | Gradient end |
| `--ic-accent-tint` | `rgba(234, 88, 12, 0.08)` | Subtle backgrounds |

### Circuit Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--ic-trace` | `rgba(234, 88, 12, 0.25)` | Circuit trace lines |
| `--ic-trace-active` | `rgba(234, 88, 12, 0.6)` | Active traces |
| `--ic-signal` | `#fdba74` | Signal pulse color |
| `--ic-signal-glow` | `rgba(253, 186, 116, 0.5)` | Pulse glow |
| `--ic-node-bg` | `rgba(24, 24, 27, 0.9)` | Node backgrounds |
| `--ic-node-border` | `rgba(234, 88, 12, 0.2)` | Node borders |
| `--ic-gate-pass` | `#22c55e` | Verification checkmark |

### Gradients

| Name | Value | Usage |
|------|-------|-------|
| Hero Gradient | `linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)` | Hero text gradient |
| Subtle Gradient | `linear-gradient(135deg, rgba(234, 88, 12, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)` | Subtle backgrounds |

---

## CSS Implementation

### Design Tokens (CSS Variables)

```css
/* ============================================
   DARK MODE - TERRACOTTA INK THEME (Default)
   ============================================ */

.ic-page {
  /* Background - Deep ink */
  --ic-bg: #0a0a0c;
  --ic-bg-elevated: #111113;
  --ic-bg-alternate: #08080a;
  --ic-surface: #18181b;
  --ic-surface-elevated: #1f1f23;
  
  /* Circuit colors - Warm Orange */
  --ic-trace: rgba(234, 88, 12, 0.25);
  --ic-trace-active: rgba(234, 88, 12, 0.6);
  --ic-signal: #fdba74;
  --ic-signal-glow: rgba(253, 186, 116, 0.5);
  --ic-node-bg: rgba(24, 24, 27, 0.9);
  --ic-node-border: rgba(234, 88, 12, 0.2);
  --ic-gate-pass: #22c55e;
  
  /* Text - Off-white */
  --ic-text: #fafafa;
  --ic-text-secondary: #e4e4e7;
  --ic-text-muted: #a1a1aa;
  --ic-text-subtle: #71717a;
  
  /* Borders */
  --ic-border: rgba(63, 63, 70, 0.3);
  --ic-border-subtle: rgba(63, 63, 70, 0.15);
  
  /* Shadows */
  --ic-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --ic-shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
  --ic-shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
  --ic-shadow-card: 0 4px 16px rgba(0, 0, 0, 0.3);
  
  /* Accents - Terracotta/Orange */
  --ic-accent: #ea580c;
  --ic-accent-darker: #9a3412;
  --ic-accent-light: #fdba74;
  --ic-accent-amber: #f59e0b;
  --ic-accent-tint: rgba(234, 88, 12, 0.08);
  
  /* Gradients */
  --ic-gradient-hero: linear-gradient(135deg, #ea580c 0%, #f59e0b 100%);
  --ic-gradient-subtle: linear-gradient(135deg, rgba(234, 88, 12, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%);
}
```

### Hero Section

```css
.ic-hero-section {
  background: var(--ic-bg);
}

/* Gradient text */
.ic-hero-title span {
  background: var(--ic-gradient-hero);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### CTA Buttons

```css
/* Primary CTA - Terracotta */
.ic-cta-primary {
  background: #9a3412;
  color: #ffffff;
  box-shadow: 0 2px 12px rgba(154, 52, 18, 0.3);
}

.ic-cta-primary:hover {
  background: #7c2d12;
  box-shadow: 0 4px 16px rgba(154, 52, 18, 0.4);
}

/* Secondary CTA */
.ic-cta-secondary {
  background: rgba(234, 88, 12, 0.1);
  color: #fafafa;
  border: 1px solid rgba(234, 88, 12, 0.2);
}

.ic-cta-secondary:hover {
  background: rgba(234, 88, 12, 0.15);
  border-color: rgba(234, 88, 12, 0.3);
}
```

### Template Cards

```css
.ic-template-card {
  background: var(--ic-card-bg);
  border: 1px solid var(--ic-card-border);
}

.ic-template-card:hover {
  border-color: rgba(234, 88, 12, 0.3);
  box-shadow: 0 8px 32px rgba(234, 88, 12, 0.1);
}
```

---

## JavaScript Theme Constants

```javascript
// Add to src/lib/theme.js
export const terracottaInkDarkTheme = {
  // Backgrounds - Deep ink
  bg: '#0a0a0c',
  bgElevated: '#111113',
  bgAlternate: '#08080a',
  surface: '#18181b',
  surfaceElevated: '#1f1f23',
  
  // Text - Off-white
  text: '#fafafa',
  textSecondary: '#e4e4e7',
  muted: '#a1a1aa',
  subtle: '#71717a',
  
  // Accent - Terracotta/Orange
  accent: '#ea580c',
  accentDarker: '#9a3412',
  accentLight: '#fdba74',
  accentAmber: '#f59e0b',
  accentTint: 'rgba(234, 88, 12, 0.08)',
  accentGlow: 'rgba(234, 88, 12, 0.15)',
  
  // Borders
  border: 'rgba(63, 63, 70, 0.3)',
  borderSubtle: 'rgba(63, 63, 70, 0.15)',
  
  // Gradients
  gradients: {
    hero: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
    subtle: 'linear-gradient(135deg, rgba(234, 88, 12, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
    card: 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)'
  },
  
  // Circuit specific
  circuit: {
    trace: 'rgba(234, 88, 12, 0.25)',
    traceActive: 'rgba(234, 88, 12, 0.6)',
    signal: '#fdba74',
    signalGlow: 'rgba(253, 186, 116, 0.5)',
    nodeBg: 'rgba(24, 24, 27, 0.9)',
    nodeBorder: 'rgba(234, 88, 12, 0.2)',
    gatePass: '#22c55e',
    ballColor: '#ea580c'
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 12px rgba(0, 0, 0, 0.4)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.5)',
    card: '0 4px 16px rgba(0, 0, 0, 0.3)',
    glow: '0 4px 16px rgba(234, 88, 12, 0.2)',
    cta: '0 2px 12px rgba(154, 52, 18, 0.3)'
  }
};
```

---

## CircuitCanvas Colors

```javascript
const darkThemeCircuit = {
  nodeFill: '#16161f',
  nodeStroke: '#2a2a3a',
  textPrimary: '#fafafa',
  textSecondary: 'rgba(250, 250, 250, 0.5)',
  traceStart: 'rgba(234, 88, 12, 0.3)',
  traceEnd: 'rgba(234, 88, 12, 0.4)',
  accentGlow: 'rgba(234, 88, 12, 0.3)',
  ballColor: '#ea580c',
  gridColor: '#fff',
  gridOpacity: 0.025,
  checkColor: '#22c55e',
  checkGlowStroke: 'rgba(34, 197, 94, 0.5)',
};
```

---

## Logo Assets

| Mode | Logo Path |
|------|-----------|
| Dark (Ink) | `/esy-logos/logo-files/for-web/svg/color-logo-no-bg.svg` |
| Light | `/esy-logos/logo-files/for-web/svg/black-logo-no-bg.svg` |

---

## Comparison: Original Purple vs Terracotta

| Element | Original (Purple) | Terracotta |
|---------|-------------------|------------|
| Primary Accent | `#8b5cf6` | `#ea580c` |
| Accent Hover | `#7c3aed` | `#9a3412` |
| Gradient Start | `#8b5cf6` | `#ea580c` |
| Gradient End | `#a78bfa` | `#f59e0b` |
| Glow Color | `rgba(139, 92, 246, 0.15)` | `rgba(234, 88, 12, 0.15)` |
| Trace Color | `rgba(139, 92, 246, 0.25)` | `rgba(234, 88, 12, 0.25)` |

---

## Reverting to Original Purple Theme

To revert from terracotta to purple accents:

1. **Update CSS variables in `IntelligenceCircuitryPage.css`:**
   ```css
   --ic-accent: #8b5cf6;
   --ic-accent-darker: #7c3aed;
   --ic-accent-light: #a78bfa;
   --ic-trace: rgba(139, 92, 246, 0.25);
   --ic-gradient-hero: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%);
   ```

2. **Update `CircuitCanvas.tsx`** theme colors

3. **Update `HowItWorksSection.css`** accent colors

---

## Related Files

- `src/components/IntelligenceCircuitry/IntelligenceCircuitryPage.css` — CSS variables
- `src/components/IntelligenceCircuitry/IntelligenceCircuitryPage.tsx` — Main component
- `src/components/IntelligenceCircuitry/CircuitCanvas.tsx` — Circuit animation
- `src/components/IntelligenceCircuitry/HowItWorksSection.css` — How It Works styles
- `src/lib/theme.js` — Theme exports

---

*See also: [TERRACOTTA_CREAM_LIGHT_THEME.md](./TERRACOTTA_CREAM_LIGHT_THEME.md)*
