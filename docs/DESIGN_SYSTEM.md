# Esy Design System & Brand Guidelines

## Color System

### Core Palette — Elevated Dark Theme

We use a sophisticated **elevated dark theme** with warm zinc grays instead of pitch black. This reduces eye strain and creates a premium, modern feel.

#### Background Colors
```css
--color-bg: #18181b;           /* Zinc-900 - Primary background */
--color-bg-elevated: #27272a;  /* Zinc-800 - Cards, elevated surfaces */
--color-bg-surface: #1f1f23;   /* Custom blend - Slight elevation */
--color-bg-hover: #3f3f46;     /* Zinc-700 - Interactive hover states */
```

#### Navigation Backgrounds
```css
--nav-bg: rgba(31, 31, 35, 0.85);        /* Elevated nav background */
--nav-bg-scrolled: rgba(24, 24, 27, 0.98); /* Nav when scrolled */
```

#### Text Colors
```css
--color-text: #fafafa;         /* Neutral-50 - Primary text (not pure white) */
--color-text-secondary: #e4e4e7; /* Zinc-200 - Secondary content */
--color-text-muted: #a1a1aa;   /* Zinc-400 - Muted text */
--color-text-subtle: #71717a;  /* Zinc-500 - Very subtle text */
--color-text-faint: #52525b;   /* Zinc-600 - Disabled/hint text */
```

#### Border & Divider Colors
```css
--color-border: rgba(63, 63, 70, 0.4);       /* Zinc-700 with opacity */
--color-border-subtle: rgba(63, 63, 70, 0.2);
--color-divider: rgba(63, 63, 70, 0.15);
```

### Primary Accent — Purple

Optimized for WCAG AA contrast on elevated backgrounds:

```css
--color-accent: #9f7aea;       /* Violet-400 - Primary (5.2:1 contrast) */
--color-accent-hover: #8b5cf6; /* Violet-500 - Hover state */
--color-accent-dark: #7c3aed;  /* Violet-600 - Emphasis */
--color-accent-light: #b794f4; /* Violet-300 - Highlights */
--color-accent-glow: rgba(159, 122, 234, 0.15);
--color-accent-border: rgba(159, 122, 234, 0.2);
```

### Gradient System

Our signature gradients that define the Esy brand:

#### Hero Gradient (Purple → Pink)
```css
--gradient-hero: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
```
**Usage:** Main headlines, hero sections, primary CTAs

#### Extended Gradient (Purple → Pink → Amber)
```css
--gradient-extended: linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f59e0b 100%);
```
**Usage:** Special emphasis, feature highlights

#### Subtle Gradient (Purple variations)
```css
--gradient-subtle: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
```
**Usage:** Buttons, cards, subtle emphasis

#### Card & Background Gradients
```css
--gradient-card: linear-gradient(180deg, rgba(31, 31, 35, 0.6) 0%, rgba(24, 24, 27, 0.4) 100%);
--gradient-featured: linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%);
--gradient-bg-subtle: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%);
--gradient-bg-glow: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
--gradient-ambient: radial-gradient(600px circle at 50% 0%, rgba(139, 92, 246, 0.02) 0%, transparent 100%);
```

### Secondary Accent Colors

#### Pink (Secondary)
```css
--color-pink: #ec4899;
--color-pink-light: #f9a8d4;
--color-pink-dark: #db2777;
```
**Usage:** Gradient endpoints, highlights, notifications

#### Amber (Tertiary)
```css
--color-amber: #f59e0b;
--color-amber-light: #fbbf24;
--color-amber-dark: #d97706;
```
**Usage:** Warnings, special features, third gradient point

### Semantic Colors

```css
--color-success: #22c55e;      /* Green-500 */
--color-success-glow: rgba(34, 197, 94, 0.15);

--color-warning: #fbbf24;      /* Amber-400 */
--color-warning-glow: rgba(251, 191, 36, 0.15);

--color-error: #f87171;        /* Red-400 */
--color-error-glow: rgba(248, 113, 113, 0.15);

--color-info: #60a5fa;         /* Blue-400 */
--color-info-glow: rgba(96, 165, 250, 0.15);
```

---

## Usage Guidelines

### 1. Landing Pages (esy.com)
- **Bold gradients encouraged** on headlines and CTAs
- **Animated gradient backgrounds** for hero sections
- **Multiple gradient elements** can coexist
- **Full saturation** colors acceptable

### 2. Application (app.esy.com)
- **Minimal gradient use** - only for key CTAs
- **Muted colors** for working interface
- **Single accent** color per view
- **Focus on readability** over aesthetics

### 3. Documentation (/docs)
- **Clean, scannable layout** - emphasize readability
- **Subtle gradients** only on hero and CTAs
- **Elevated cards** for content grouping
- **Consistent sidebar navigation**

### 4. Gradient Rules
- **Consistent angle:** Always use 135deg for linear gradients
- **Maximum colors:** No more than 3 colors per gradient
- **Opacity variations:** Use 10%, 15%, 20% for subtle backgrounds
- **Animation:** Only on landing pages, never in app

---

## Implementation Examples

### Hero Headline
```css
.hero-title {
  background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Primary Button
```css
.btn-primary {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
  color: #ffffff;
  border: none;
  border-radius: 12px;
}

.btn-primary:hover {
  box-shadow: 0 15px 35px rgba(139, 92, 246, 0.4);
  transform: translateY(-2px);
}
```

### Elevated Card
```css
.card {
  background-color: #27272a;
  border: 1px solid rgba(63, 63, 70, 0.4);
  border-radius: 16px;
}
```

### Card with Glow Effect
```css
.feature-card {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 16px;
  position: relative;
}

.feature-card::before {
  content: '';
  position: absolute;
  inset: -100px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
  filter: blur(100px);
  z-index: -1;
}
```

---

## Typography

### Font Families
```css
--font-literata: 'Literata', Georgia, serif;  /* Headlines, emphasis */
--font-inter: 'Inter', -apple-system, sans-serif; /* Body text */
--font-mono: 'JetBrains Mono', 'Courier New', monospace; /* Code, prompts */
```

### Font Scales
| Element | Desktop | Mobile |
|---------|---------|--------|
| Hero    | 4.5rem  | 2.5rem |
| H1      | 3.5rem  | 2rem   |
| H2      | 2.5rem  | 1.75rem|
| H3      | 1.75rem | 1.5rem |
| Body    | 1.125rem| 1rem   |
| Small   | 0.875rem| 0.8125rem |

### Typography Rules
- **Headlines (h1-h3):** Use `--font-literata` with `letter-spacing: 0.02em`
- **Body text:** System fonts for optimal rendering
- **Code/prompts:** Monospace for clear distinction

---

## Spacing System

Using an 8px base unit:

```css
--space-xs: 0.5rem;   /* 8px */
--space-sm: 1rem;     /* 16px */
--space-md: 1.5rem;   /* 24px */
--space-lg: 2rem;     /* 32px */
--space-xl: 3rem;     /* 48px */
--space-2xl: 4rem;    /* 64px */
--space-3xl: 6rem;    /* 96px */
```

---

## Border Radius

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-2xl: 24px;
--radius-full: 100px;
```

---

## Shadows

```css
/* Standard shadows */
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.2);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.3);
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.4);

/* Accent glow shadows */
--shadow-glow: 0 4px 16px rgba(159, 122, 234, 0.2);
--shadow-glow-hover: 0 12px 24px rgba(159, 122, 234, 0.15);
--shadow-glow-strong: 0 10px 30px rgba(139, 92, 246, 0.3);
```

---

## Component Patterns

### 1. Gradient Text
- Use for main headlines only
- Never for body text
- Maximum one gradient headline per viewport

### 2. Glowing Elements
- Reserve for CTAs and key interactions
- Use purple glow color (`rgba(139, 92, 246, 0.3)`)
- Subtle animation on hover only

### 3. Card Hierarchy
| Level | Background | Border | Use Case |
|-------|------------|--------|----------|
| Level 1 | Transparent | `--color-border` | Lists, subtle grouping |
| Level 2 | `--color-bg-elevated` | `--color-border` | Cards, sections |
| Level 3 | `--gradient-bg-subtle` | `--color-accent-border` | Featured, highlighted |

### 4. Button Priority
| Type | Style | Use Case |
|------|-------|----------|
| Primary | Gradient + glow shadow | Main CTAs |
| Secondary | Elevated bg + border | Secondary actions |
| Tertiary | Text only | Inline links, minor actions |

---

## Animation Guidelines

### Landing Pages
- **Entrance:** fadeIn, slideUp (0.6s ease-out)
- **Hover:** scale(1.02), translateY(-2px)
- **Background:** Slow float animation (15-20s)
- **Transitions:** 0.3s ease for color/shadow changes

### Application
- **Transitions:** 0.2s ease
- **No entrance animations**
- **Minimal hover effects**

---

## Accessibility

### Color Contrast (WCAG AA)
| Combination | Ratio | Status |
|-------------|-------|--------|
| `#fafafa` on `#18181b` | 15.4:1 | ✅ AAA |
| `#e4e4e7` on `#18181b` | 11.9:1 | ✅ AAA |
| `#a1a1aa` on `#18181b` | 6.3:1 | ✅ AA |
| `#9f7aea` on `#18181b` | 5.2:1 | ✅ AA |
| `#8b5cf6` on `#18181b` | 4.6:1 | ✅ AA |

### Focus States
```css
:focus-visible {
  outline: 2px solid #8b5cf6;
  outline-offset: 2px;
}
```

---

## Do's and Don'ts

### ✅ DO
- Use `#18181b` as primary background (not pitch black)
- Use `#fafafa` for text (not pure white)
- Apply gradients at 135deg consistently
- Use elevated surfaces (`#27272a`) for cards
- Test contrast on all text combinations
- Keep animations subtle and purposeful

### ❌ DON'T
- Use pure black (`#000000`) backgrounds
- Use pure white (`#ffffff`) text on dark
- Mix gradient angles (stick to 135deg)
- Overuse gradients (max 2-3 per view)
- Apply gradients to body text
- Animate colors in the application

---

## Theme Reference Files

| File | Purpose |
|------|---------|
| `src/lib/theme.js` | JavaScript theme constants |
| `src/lib/lightTheme.js` | Light mode constants |
| `src/app/globals.css` | CSS custom properties |

---

*Last Updated: November 2025*
*Version: 2.0 — Elevated Dark Theme*
