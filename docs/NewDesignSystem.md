# Esy Design System
## Extracted Design Patterns from Homepage & Essays Index

> **Created**: December 15, 2025  
> **Source Pages**: `/` (GalleryHomePage), `/essays` (VisualEssaysClient)  
> **Extraction Method**: UI/UX Design Expert Analysis

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography System](#typography-system)
4. [Spacing System](#spacing-system)
5. [Layout Patterns](#layout-patterns)
6. [Component Patterns](#component-patterns)
7. [Animation & Motion](#animation--motion)
8. [Responsive Design](#responsive-design)
9. [CSS Variables Reference](#css-variables-reference)
10. [Implementation Guidelines](#implementation-guidelines)

---

## Design Philosophy

### Core Principles

| Principle | Description |
|-----------|-------------|
| **Editorial Aesthetic** | Museum-quality, NYT scrollytelling energy |
| **Confidence Through Restraint** | High contrast, strong typography, no clutter |
| **No SaaS Patterns** | No growth marketing, fake metrics, or purple gradients |
| **Premium Sophistication** | "Suave and silk, not bulk, old school widget infested" |
| **Authority Through Content** | Visual essays as primary value, not product conversion |

### What's Intentionally Removed

- AI mentions in headlines
- "Productivity," "speed," "writing faster" messaging
- Fake metrics (e.g., "2.5M+ papers")
- SaaS purple gradients
- Feature grids
- Process steps
- Pricing anywhere above the fold
- "Get Free" language
- App promotion above the fold

---

## Color System

### Elevated Dark Theme (Primary)

The design system uses an **Elevated Dark Theme** with sophisticated grays instead of pitch black for reduced eye strain.

#### Background Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#18181b` (Zinc-900) | Primary page background |
| `--color-surface` | `#1f1f23` | Slight elevation |
| `--color-elevated` | `#27272a` (Zinc-800) | Cards, elevated surfaces |
| `--color-card` | `#27272a` | Card backgrounds |

#### Text Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-text` | `#fafafa` (Neutral-50) | Primary text |
| `--color-text-secondary` | `#e4e4e7` (Zinc-200) | Secondary content |
| `--color-text-tertiary` | `#a1a1aa` (Zinc-400) | Muted text |
| `--color-text-muted` | `#71717a` (Zinc-500) | Very subtle text |
| `--color-text-faint` | `#52525b` (Zinc-600) | Faintest text |

#### Border Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-border` | `rgba(63, 63, 70, 0.4)` | Default borders |
| `--color-border-subtle` | `rgba(63, 63, 70, 0.2)` | Subtle borders |
| `--color-border-strong` | `rgba(63, 63, 70, 0.6)` | Strong/hover borders |

#### Accent Colors (Purple Brand)

| Token | Value | Contrast Ratio | Usage |
|-------|-------|----------------|-------|
| `--color-accent` | `#9f7aea` (Violet-400) | 5.2:1 | Primary accent |
| `--color-accent-hover` | `#8b5cf6` (Violet-500) | — | Hover state |
| `--color-accent-dark` | `#7c3aed` (Violet-600) | — | Emphasis |
| `--color-accent-muted` | `rgba(159, 122, 234, 0.15)` | — | Subtle backgrounds |
| `--color-accent-glow` | `rgba(139, 92, 246, 0.15)` | — | Glow effects |
| `--color-accent-border` | `rgba(159, 122, 234, 0.2)` | — | Accent borders |

#### Secondary Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-pink` | `#ec4899` | Secondary accent |
| `--color-pink-light` | `#f9a8d4` | Pink highlights |

#### Semantic Colors

| Token | Value | Glow Version | Usage |
|-------|-------|--------------|-------|
| `--color-success` | `#22c55e` | `rgba(34, 197, 94, 0.15)` | Success states |
| `--color-warning` | `#fbbf24` | `rgba(251, 191, 36, 0.15)` | Warnings |
| `--color-error` | `#f87171` | `rgba(248, 113, 113, 0.15)` | Errors |
| `--color-info` | `#60a5fa` | `rgba(96, 165, 250, 0.15)` | Information |

#### Category Colors (Essays)

```javascript
const CATEGORY_COLORS = {
  'Science': '#10B981',      // Emerald
  'History': '#F59E0B',      // Amber
  'Technology': '#3B82F6',   // Blue
  'Culture': '#EC4899',      // Pink
  'Space': '#8B5CF6',        // Purple
  'Nature': '#06B6D4',       // Cyan
  'Education & Writing': '#14B8A6',  // Teal
  "Children's Fiction": '#FFD700',   // Gold
};
```

### Brand Gradients

```css
/* Primary Hero Gradient */
--gradient-hero: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);

/* Subtle Button Gradient */
--gradient-subtle: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);

/* Extended Gradient */
--gradient-extended: linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f59e0b 100%);

/* Background Glow */
--gradient-bg-glow: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);

/* Hero Atmosphere */
.hero-gradient-overlay {
  background: 
    radial-gradient(ellipse 120% 80% at 70% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse 100% 70% at 30% 70%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0, 0, 0, 0.6) 0%, transparent 50%);
}
```

---

## Typography System

### Font Families

| Token | Font Stack | Usage |
|-------|------------|-------|
| `--font-editorial` | `'Cormorant Garamond', Georgia, 'Times New Roman', serif` | Headlines, editorial content |
| `--font-sans` | `'Inter', -apple-system, BlinkMacSystemFont, sans-serif` | Body text, UI |
| `--font-mono` | `'JetBrains Mono', 'SF Mono', Consolas, monospace` | Labels, badges, code |

### Type Scale

| Token | Size | Usage |
|-------|------|-------|
| `--text-xs` | `0.75rem` (12px) | Small labels |
| `--text-sm` | `0.875rem` (14px) | Captions |
| `--text-base` | `1rem` (16px) | Body text |
| `--text-lg` | `1.125rem` (18px) | Large body |
| `--text-xl` | `1.25rem` (20px) | Subheadings |
| `--text-2xl` | `1.5rem` (24px) | Section titles |
| `--text-3xl` | `1.875rem` (30px) | Large headings |
| `--text-4xl` | `2.25rem` (36px) | Hero subheadings |
| `--text-5xl` | `3rem` (48px) | Featured headings |
| `--text-6xl` | `3.75rem` (60px) | Large display |
| `--text-hero` | `4.5rem` (72px) | Hero titles |

### Typography Patterns

#### Hero Title (Homepage)
```css
.hero-title {
  font-family: var(--font-editorial);
  font-size: clamp(3.5rem, 10vw, 6.5rem);
  font-weight: 300;
  line-height: 1.05;
  letter-spacing: -0.03em;
}

.hero-title-emphasis {
  font-style: italic;
  font-weight: 400;
  background: var(--gradient-hero);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

#### Section Titles
```css
.featured-heading {
  font-family: var(--font-editorial);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.02em;
}
```

#### Eyebrow/Labels
```css
.hero-eyebrow {
  font-family: var(--font-mono);
  font-size: clamp(0.75rem, 1.5vw, 0.875rem);
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-accent);
}
```

#### Category Labels
```css
.essay-category {
  font-family: var(--font-mono);
  font-size: 0.5625rem; /* 9px */
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
```

#### Editorial Body Text
```css
.hero-subtitle {
  font-family: var(--font-editorial);
  font-size: clamp(1.125rem, 3vw, 1.5rem);
  font-weight: 300;
  line-height: 1.7;
  color: var(--color-text-secondary);
}
```

---

## Spacing System

### Base Unit
```css
--space-unit: 8px;
```

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` (0.5 × unit) | Tight gaps |
| `--space-sm` | `8px` (1 × unit) | Small gaps |
| `--space-md` | `16px` (2 × unit) | Medium gaps |
| `--space-lg` | `24px` (3 × unit) | Large gaps |
| `--space-xl` | `32px` (4 × unit) | Extra large |
| `--space-2xl` | `48px` (6 × unit) | Section padding |
| `--space-3xl` | `64px` (8 × unit) | Major sections |
| `--space-4xl` | `96px` (12 × unit) | Page sections |

### Container Widths

| Token | Value | Usage |
|-------|-------|-------|
| `--max-width` | `1400px` | Maximum container width |
| `--content-width` | `900px` | Content-focused layouts |

---

## Layout Patterns

### Grid Systems

#### Essay Card Grid (Essays Index)
```css
.essays-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: calc(var(--space-unit) * 2);
}

@media (min-width: 640px) {
  .essays-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: calc(var(--space-unit) * 3);
  }
}

@media (min-width: 1024px) {
  .essays-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1280px) {
  .essays-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

#### Showcase Grid (Homepage)
```css
.showcase-grid {
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
}

@media (min-width: 640px) {
  .showcase-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 1fr;
    gap: var(--space-lg);
  }
}

@media (min-width: 1024px) {
  .showcase-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 380px;
  }
}
```

#### Featured Section (Split Layout)
```css
.featured-container {
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 1024px) {
  .featured-container {
    grid-template-columns: 1fr 1fr;
  }
}
```

### Hero Layout Pattern

```css
.gallery-hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.hero-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: var(--space-3xl) var(--space-lg);
  padding-top: calc(var(--space-4xl) + 80px); /* Account for nav */
  position: relative;
  z-index: 1;
  max-width: var(--content-width);
  margin: 0 auto;
}
```

### Editorial Hero (Essays Index)
```css
.editorial-hero {
  display: grid;
  grid-template-columns: 1fr;
  min-height: auto;
  border-bottom: 1px solid var(--color-border);
}

@media (min-width: 1024px) {
  .editorial-hero {
    grid-template-columns: 1fr 1fr;
    min-height: 75vh;
  }
}
```

---

## Component Patterns

### Card Patterns

#### Essay Card (Grid View)
```css
.essay-card {
  display: flex;
  flex-direction: column;
  padding: calc(var(--space-unit) * 3);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all var(--transition);
  position: relative;
  overflow: hidden;
}

.essay-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--color-accent), var(--color-accent-glow));
  opacity: 0;
  transition: opacity var(--transition);
}

.essay-card:hover {
  background: var(--color-elevated);
  border-color: var(--color-border-strong);
  transform: translateY(-2px);
}

.essay-card:hover::before {
  opacity: 1;
}
```

#### Showcase Card (Image-Based)
```css
.showcase-card {
  position: relative;
  display: block;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  cursor: pointer;
}

.showcase-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.3) 40%,
    rgba(0, 0, 0, 0.85) 100%
  );
  transition: all var(--transition);
}

.showcase-card:hover .showcase-card-overlay {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.4) 40%,
    rgba(0, 0, 0, 0.9) 100%
  );
}
```

### Button Patterns

#### Primary CTA Button
```css
.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md) var(--space-xl);
  background: var(--gradient-subtle);
  border: none;
  color: #fff;
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: all var(--transition);
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
}

.hero-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(139, 92, 246, 0.4);
}

.hero-cta svg {
  transition: transform var(--transition);
}

.hero-cta:hover svg {
  transform: translateX(4px);
}
```

#### Ghost/Outline Button
```css
.showcase-view-all {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md) var(--space-xl);
  background: transparent;
  border: 1px solid var(--color-border-strong);
  color: var(--color-text-secondary);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  transition: all var(--transition);
  border-radius: 8px;
}

.showcase-view-all:hover {
  background: var(--color-accent-muted);
  border-color: var(--color-accent);
  color: var(--color-text);
}
```

#### Load More Button (Pill Style)
```css
.load-more-btn {
  display: flex;
  align-items: center;
  gap: calc(var(--space-unit) * 1);
  padding: calc(var(--space-unit) * 2) calc(var(--space-unit) * 4);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 100px;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
  cursor: pointer;
  transition: all var(--transition);
}

.load-more-btn:hover {
  background: var(--color-surface);
  border-color: var(--color-accent);
}
```

### Badge Patterns

#### New Badge
```css
.new-badge {
  background: var(--color-accent);
  color: var(--color-bg);
  padding: 0.125rem 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.5625rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-radius: 4px;
}
```

#### Category Badge
```css
.essay-category {
  font-family: var(--font-mono);
  font-size: 0.5625rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  /* Color set dynamically via CATEGORY_COLORS */
}
```

### Discovery Bar (Search & Filters)

```css
.discovery-bar {
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  padding: calc(var(--space-unit) * 2) calc(var(--space-unit) * 3);
  position: relative;
  z-index: 100;
}

.discovery-bar.sticky {
  position: sticky;
  top: var(--header-height);
  background: rgba(10, 10, 11, 0.95);
  backdrop-filter: blur(12px);
  border-bottom-color: var(--color-border-strong);
}

.discovery-search {
  flex: 1;
  display: flex;
  align-items: center;
  gap: calc(var(--space-unit) * 1.5);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: calc(var(--space-unit) * 1.25) calc(var(--space-unit) * 2);
  transition: border-color var(--transition-fast);
}

.discovery-search:focus-within {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-muted);
}
```

### View Toggle
```css
.discovery-view-toggle {
  display: flex;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
}

.discovery-view-toggle button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: transparent;
  border: none;
  color: var(--color-text-tertiary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.discovery-view-toggle button:first-child {
  border-right: 1px solid var(--color-border);
}

.discovery-view-toggle button:hover {
  color: var(--color-text);
  background: var(--color-surface);
}

.discovery-view-toggle button.active {
  color: var(--color-accent);
  background: var(--color-accent-muted);
}
```

---

## Animation & Motion

### Timing Functions

```css
--transition: 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
--transition-fast: 0.2s ease;
--transition-slow: 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

### Keyframe Animations

#### Fade In Up (Hero Entrance)
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Usage with staggered delays */
.hero-eyebrow { animation: fadeInUp 0.8s ease forwards; animation-delay: 0.2s; }
.hero-title { animation: fadeInUp 0.8s ease forwards; animation-delay: 0.4s; }
.hero-subtitle { animation: fadeInUp 0.8s ease forwards; animation-delay: 0.6s; }
.hero-cta { animation: fadeInUp 0.8s ease forwards; animation-delay: 0.8s; }
```

#### Hero Breath (Atmospheric)
```css
@keyframes heroBreath {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.02); }
}

.hero-gradient-overlay {
  animation: heroBreath 12s ease-in-out infinite;
}
```

#### Scroll Bounce
```css
@keyframes scrollBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
}

.scroll-arrow {
  animation: scrollBounce 2s ease-in-out infinite;
}
```

#### Mobile Filter Sheet
```css
@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.mobile-filter-sheet {
  animation: slideUp 0.3s ease;
}
```

### Hover Interactions

```css
/* Card Lift */
.essay-card:hover {
  transform: translateY(-2px);
}

/* Button Lift */
.hero-cta:hover {
  transform: translateY(-2px);
}

/* Arrow Slide */
.hero-cta:hover svg {
  transform: translateX(4px);
}

/* Image Scale */
.showcase-card:hover .showcase-card-image img {
  transform: scale(1.05);
}
```

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  .gallery-homepage *,
  .gallery-homepage *::before,
  .gallery-homepage *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Responsive Design

### Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| Mobile (default) | `< 640px` | Single column |
| Tablet (sm) | `≥ 640px` | 2-column grids |
| Desktop (md) | `≥ 768px` | Full nav, larger spacing |
| Large Desktop (lg) | `≥ 1024px` | Split layouts |
| XL Desktop | `≥ 1280px` | 4-column grids |

### Responsive Typography

```css
/* Hero Title - Fluid sizing */
.hero-title {
  font-size: clamp(3.5rem, 10vw, 6.5rem);
}

/* Section Heading */
.featured-heading {
  font-size: clamp(2.5rem, 6vw, 4rem);
}

/* Subtitle */
.hero-subtitle {
  font-size: clamp(1.125rem, 3vw, 1.5rem);
}
```

### Mobile-First Patterns

```css
/* Navigation */
.desktop-nav { display: none; }
.mobile-only { display: flex; }

@media (min-width: 768px) {
  .desktop-nav { display: flex; }
  .mobile-only { display: none; }
}

/* Grid Progressive Enhancement */
.essays-grid {
  grid-template-columns: 1fr; /* Mobile: single column */
}

@media (min-width: 640px) {
  .essays-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .essays-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 1280px) {
  .essays-grid { grid-template-columns: repeat(4, 1fr); }
}
```

---

## CSS Variables Reference

### Complete Variable Set

```css
.gallery-homepage,
.visual-essays-index {
  /* === COLORS === */
  /* Backgrounds */
  --color-bg: #18181b;
  --color-surface: #1f1f23;
  --color-elevated: #27272a;
  --color-card: #27272a;
  
  /* Borders */
  --color-border: rgba(63, 63, 70, 0.4);
  --color-border-subtle: rgba(63, 63, 70, 0.2);
  --color-border-strong: rgba(63, 63, 70, 0.6);
  
  /* Text */
  --color-text: #fafafa;
  --color-text-secondary: #e4e4e7;
  --color-text-tertiary: #a1a1aa;
  --color-text-muted: #71717a;
  
  /* Accent */
  --color-accent: #9f7aea;
  --color-accent-hover: #8b5cf6;
  --color-accent-dark: #7c3aed;
  --color-accent-muted: rgba(159, 122, 234, 0.15);
  --color-accent-glow: rgba(139, 92, 246, 0.15);
  --color-accent-border: rgba(159, 122, 234, 0.2);
  
  /* Secondary */
  --color-pink: #ec4899;
  --color-pink-light: #f9a8d4;
  
  /* Gradients */
  --gradient-hero: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
  --gradient-subtle: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  --gradient-bg-glow: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
  
  /* === TYPOGRAPHY === */
  --font-editorial: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
  
  /* === SPACING === */
  --space-unit: 8px;
  --space-xs: calc(var(--space-unit) * 0.5);
  --space-sm: var(--space-unit);
  --space-md: calc(var(--space-unit) * 2);
  --space-lg: calc(var(--space-unit) * 3);
  --space-xl: calc(var(--space-unit) * 4);
  --space-2xl: calc(var(--space-unit) * 6);
  --space-3xl: calc(var(--space-unit) * 8);
  --space-4xl: calc(var(--space-unit) * 12);
  
  /* === LAYOUT === */
  --max-width: 1400px;
  --content-width: 900px;
  --header-height: 80px;
  
  /* === TIMING === */
  --transition: 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --transition-fast: 0.2s ease;
  --transition-slow: 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

---

## Implementation Guidelines

### When to Use Editorial Font (Cormorant Garamond)
- Hero titles and major headlines
- Essay titles and subtitles
- Featured content headings
- Pull quotes

### When to Use Sans Font (Inter)
- Body text
- UI elements (buttons, labels)
- Navigation
- Form inputs
- Meta information

### When to Use Mono Font (JetBrains Mono)
- Category labels
- Badge text
- Timestamps
- Technical metadata
- All-caps labels

### Component Composition Rules

1. **Cards always have**:
   - Border radius: `12px`
   - Border: `1px solid var(--color-border)`
   - Padding: `calc(var(--space-unit) * 3)` minimum
   - Hover state with lift and border color change

2. **CTAs always have**:
   - Icon with `transform: translateX(4px)` on hover
   - Box shadow for depth
   - Rounded corners (`8px` for rectangles, `100px` for pills)

3. **Section structure**:
   - Border-top for section separation
   - Consistent padding using `--space-4xl`
   - Max-width container with auto margins

4. **Sticky elements**:
   - Background with `backdrop-filter: blur(12px)`
   - Slightly stronger border on scroll
   - Z-index from scale (`--z-sticky: 200`)

---

## Quick Reference: Color Palette

```
BACKGROUNDS
───────────────────────────────
Primary:   #18181b  ████████████
Surface:   #1f1f23  ████████████
Elevated:  #27272a  ████████████

TEXT
───────────────────────────────
Primary:   #fafafa  ████████████
Secondary: #e4e4e7  ████████████
Tertiary:  #a1a1aa  ████████████
Muted:     #71717a  ████████████

ACCENT
───────────────────────────────
Primary:   #9f7aea  ████████████
Hover:     #8b5cf6  ████████████
Pink:      #ec4899  ████████████

CATEGORY COLORS
───────────────────────────────
Science:   #10B981  ████████████
History:   #F59E0B  ████████████
Tech:      #3B82F6  ████████████
Culture:   #EC4899  ████████████
Space:     #8B5CF6  ████████████
Nature:    #06B6D4  ████████████
```

---

*Document generated via UI/UX Design Expert pattern extraction from GalleryHomePage and VisualEssaysClient components.*

