# Esy Design System & Brand Guidelines

## Color System

### Core Palette

#### Base Colors
```css
--color-bg: #0a0a0f;        /* Deep black - primary background */
--color-bg-elevated: #16161f; /* Elevated surfaces */
--color-bg-subtle: #1a1a24;   /* Subtle elevation */
```

#### Text Colors
```css
--color-text: #ffffff;              /* Primary text */
--color-text-muted: rgba(255, 255, 255, 0.7);  /* Secondary text */
--color-text-subtle: rgba(255, 255, 255, 0.5); /* Tertiary text */
--color-text-faint: rgba(255, 255, 255, 0.3);  /* Disabled/hint text */
```

#### Primary Accent - Purple
```css
--color-primary: #8b5cf6;     /* Primary purple */
--color-primary-dark: #7c3aed; /* Darker purple for depth */
--color-primary-light: #a78bfa; /* Lighter purple for highlights */
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

#### Background Gradients (Low opacity)
```css
--gradient-bg-subtle: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%);
--gradient-bg-glow: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
```
**Usage:** Card backgrounds, section highlights, decorative elements

### Accent Colors

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

#### Success/Error/Info
```css
--color-success: #10b981;  /* Green */
--color-error: #ef4444;    /* Red */
--color-info: #3b82f6;     /* Blue */
```

### Usage Guidelines

#### 1. Landing Pages (esy.com)
- **Bold gradients encouraged** on headlines and CTAs
- **Animated gradient backgrounds** for hero sections
- **Multiple gradient elements** can coexist
- **Full saturation** colors acceptable

#### 2. Application (app.esy.com)
- **Minimal gradient use** - only for key CTAs
- **Muted colors** for working interface
- **Single accent** color per view
- **Focus on readability** over aesthetics

#### 3. Gradient Rules
- **Consistent angle:** Always use 135deg for linear gradients
- **Maximum colors:** No more than 3 colors per gradient
- **Opacity variations:** Use 10%, 20%, 30% for subtle backgrounds
- **Animation:** Only on landing pages, never in app

### Implementation Examples

#### Hero Headline
```css
.hero-title {
  background: var(--gradient-hero);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

#### Primary Button
```css
.btn-primary {
  background: var(--gradient-subtle);
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
}

.btn-primary:hover {
  box-shadow: 0 15px 35px rgba(139, 92, 246, 0.4);
  transform: translateY(-2px);
}
```

#### Card with Glow
```css
.feature-card {
  background: var(--gradient-bg-subtle);
  border: 1px solid rgba(139, 92, 246, 0.2);
  position: relative;
}

.feature-card::before {
  content: '';
  position: absolute;
  inset: -100px;
  background: var(--gradient-bg-glow);
  filter: blur(100px);
  z-index: -1;
}
```

### Typography

#### Font Families
```css
--font-literata: 'Literata', Georgia, serif;  /* Headlines, emphasis */
--font-inter: 'Inter', -apple-system, sans-serif; /* Body text */
--font-mono: 'JetBrains Mono', 'Courier New', monospace; /* Code, prompts */
```

#### Font Scales
- **Hero:** 4.5rem (desktop) / 2.5rem (mobile)
- **H1:** 3.5rem / 2rem
- **H2:** 2.5rem / 1.75rem
- **H3:** 1.75rem / 1.5rem
- **Body:** 1.125rem / 1rem
- **Small:** 0.875rem / 0.8125rem

### Spacing System

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

### Border Radius
```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-full: 100px;
```

### Shadows
```css
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
--shadow-md: 0 8px 16px rgba(0, 0, 0, 0.15);
--shadow-lg: 0 20px 40px rgba(0, 0, 0, 0.2);
--shadow-glow: 0 10px 30px rgba(139, 92, 246, 0.3);
```

## Component Patterns

### 1. Gradient Text
- Use for main headlines
- Never for body text
- Maximum one per viewport

### 2. Glowing Elements
- Reserve for CTAs and key interactions
- Use purple glow color
- Subtle animation on hover only

### 3. Card Hierarchy
- **Level 1:** Transparent with border
- **Level 2:** `bg-elevated` with border
- **Level 3:** Gradient background (rare)

### 4. Button Priority
- **Primary:** Gradient background
- **Secondary:** Border only
- **Tertiary:** Text only

## Animation Guidelines

### Landing Pages
- **Entrance:** fadeIn, slideUp (0.6s ease-out)
- **Hover:** scale(1.02), translateY(-2px)
- **Background:** Slow float animation (15-20s)

### Application
- **Transitions:** 0.2s ease
- **No entrance animations**
- **Minimal hover effects**

## Accessibility

### Color Contrast
- Text on dark: Minimum AA (4.5:1)
- Purple on black: Passes AA
- Pink on black: Passes AA
- Always test gradient text legibility

### Focus States
```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

## Do's and Don'ts

### ✅ DO
- Use gradients for emphasis
- Maintain consistent angles
- Test on both light and dark modes
- Keep animations subtle
- Use semantic color names

### ❌ DON'T
- Overuse gradients (max 2-3 per view)
- Animate in the application
- Use more than 3 colors in a gradient
- Apply gradients to body text
- Mix gradient angles

---

*Last Updated: September 2025*
*Version: 1.0*
