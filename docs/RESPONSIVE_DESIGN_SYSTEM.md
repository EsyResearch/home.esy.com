# Esy Responsive Design System
**Version 1.0** | Last Updated: September 2025

## Table of Contents
1. [Core Philosophy](#core-philosophy)
2. [Breakpoint System](#breakpoint-system)
3. [Fluid Typography](#fluid-typography)
4. [Spacing System](#spacing-system)
5. [Container System](#container-system)
6. [Component Patterns](#component-patterns)
7. [Implementation Examples](#implementation-examples)
8. [Testing Guidelines](#testing-guidelines)

---

## Core Philosophy

### Principles
- **Fluid First**: Use `clamp()`, `min()`, `max()` for smooth scaling
- **Mobile First**: Design for smallest screens, enhance upward
- **Content Driven**: Breakpoints based on content, not devices
- **Performance**: CSS-only solutions, no JavaScript for layout

### Approach
```css
/* Instead of this (stepped) */
font-size: 16px;
@media (min-width: 768px) { font-size: 18px; }
@media (min-width: 1024px) { font-size: 20px; }

/* Use this (fluid) */
font-size: clamp(1rem, 2vw + 0.5rem, 1.25rem);
```

---

## Breakpoint System

### Core Breakpoints
```javascript
const breakpoints = {
  xs: 320,   // iPhone SE - minimum supported
  sm: 375,   // iPhone 12/13 standard
  md: 768,   // iPad Portrait
  lg: 1024,  // iPad Pro / Small Laptop
  xl: 1440,  // Desktop
  '2xl': 1920 // Large Desktop
};
```

### Usage Strategy
```javascript
// Detection hooks
const isMobile = width < 768;
const isTablet = width >= 768 && width < 1024;
const isDesktop = width >= 1024;
const isLargeDesktop = width >= 1440;

// Special cases
const isTinyMobile = width < 375;  // Extra small devices
const isSmallMobile = width < 480; // Older phones
const isFoldable = width < 320;    // Galaxy Fold
```

### Breakpoint Usage Guidelines
- **320-767px**: Single column, stacked layout
- **768-1023px**: Two column, side-by-side elements
- **1024px+**: Full desktop experience with sidebars

---

## Fluid Typography

### Scale System
```css
/* Hero Title */
--font-hero: clamp(2rem, 7vw, 5.5rem);
--font-hero-tablet: clamp(3rem, 5vw, 4rem);
--font-hero-mobile: clamp(2rem, 7vw, 3rem);

/* Subtitle */
--font-subtitle: clamp(1rem, 2.5vw, 1.75rem);
--font-subtitle-tablet: clamp(1.25rem, 2vw, 1.5rem);
--font-subtitle-mobile: clamp(1rem, 2.5vw, 1.25rem);

/* Body Text */
--font-body: clamp(0.875rem, 1.5vw, 1rem);
--font-body-large: clamp(1rem, 1.5vw, 1.125rem);
--font-body-small: clamp(0.75rem, 1.5vw, 0.875rem);

/* UI Elements */
--font-button: clamp(0.875rem, 1.5vw, 1rem);
--font-caption: clamp(0.75rem, 1.5vw, 0.875rem);
--font-label: clamp(0.625rem, 1vw, 0.75rem);
```

### Implementation
```javascript
// Hero Title
fontSize: `clamp(
  ${isMobile ? '2rem' : '3rem'},      // minimum
  ${isMobile ? '7vw' : '5vw'},        // preferred
  ${isDesktop ? '5.5rem' : '4rem'}    // maximum
)`

// Line Height Scaling
lineHeight: isMobile ? 1.15 : 1.05

// Letter Spacing
letterSpacing: `${isMobile ? '-0.02em' : isTablet ? '-0.03em' : '-0.04em'}`
```

### Typography Hierarchy Ratios
```css
/* Desktop (Golden Ratio) */
--ratio-desktop: 1.618;
--title: 1;
--subtitle: calc(1 / var(--ratio-desktop)); /* 0.618 */
--body: calc(1 / var(--ratio-desktop) / var(--ratio-desktop)); /* 0.382 */

/* Mobile (Perfect Fourth) */
--ratio-mobile: 1.333;
--title-mobile: 1;
--subtitle-mobile: calc(1 / var(--ratio-mobile)); /* 0.75 */
--body-mobile: calc(1 / var(--ratio-mobile) / 1.2); /* 0.625 */
```

---

## Spacing System

### Fluid Spacing Scale
```css
/* Base unit: 8px */
--space-xs: clamp(0.25rem, 1vw, 0.5rem);    /* 4-8px */
--space-sm: clamp(0.5rem, 1.5vw, 0.75rem);  /* 8-12px */
--space-md: clamp(1rem, 2vw, 1.5rem);       /* 16-24px */
--space-lg: clamp(1.5rem, 3vw, 2rem);       /* 24-32px */
--space-xl: clamp(2rem, 4vw, 3rem);         /* 32-48px */
--space-2xl: clamp(3rem, 5vw, 4rem);        /* 48-64px */
--space-3xl: clamp(4rem, 6vw, 6rem);        /* 64-96px */
```

### Padding System
```javascript
// Hero Section Padding (with navigation clearance)
paddingTop: `clamp(${
  isTinyMobile ? '7rem' :     // ~112px - small phones
  isSmallMobile ? '7.5rem' :   // ~120px - standard phones  
  isMobile ? '8rem' :          // ~128px - large phones
  isTablet ? '9rem' :          // ~144px - tablets
  '10rem'                      // ~160px - desktop
}, 12vh, 12rem)`,
paddingBottom: `clamp(${isMobile ? '2rem' : '3rem'}, 5vh, 5rem)`,
paddingLeft: `clamp(1rem, 5vw, 4rem)`,
paddingRight: `clamp(1rem, 5vw, 4rem)`

// Important: Always account for fixed navigation height
// Typical nav heights: Mobile: 64px, Tablet: 72px, Desktop: 80px

// Component Padding
padding: `clamp(1.25rem, 3vw, 2rem)`

// Safe Area Padding (for notched devices)
paddingLeft: 'env(safe-area-inset-left, 0)',
paddingRight: 'env(safe-area-inset-right, 0)'
```

### Margin System
```javascript
// Section Margins
marginBottom: `clamp(1.5rem, 4vh, 4rem)`

// Element Margins
marginTop: `clamp(1rem, 3vh, 2.5rem)`

// Inline Margins
marginInline: 'auto'
```

---

## Container System

### Fluid Container Widths
```css
/* Container sizes */
--container-xs: 100%;
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;

/* Fluid container */
.container {
  width: min(100%, var(--container-xl));
  margin-inline: auto;
  padding-inline: clamp(1rem, 5vw, 4rem);
}
```

### Implementation
```javascript
// Fluid container width
width: `min(100%, ${isDesktop ? '1280px' : isTablet ? '1024px' : '100%'})`

// Responsive max width
maxWidth: `min(90%, ${isMobile ? '500px' : '650px'})`

// Essay Generator Container
maxWidth: `min(100%, ${isDesktop ? '840px' : isTablet ? '720px' : '100%'})`
```

---

## Component Patterns

### Hero Section Pattern
```javascript
const heroStyles = {
  section: {
    minHeight: isMobile ? 'auto' : '100vh',
    paddingTop: `clamp(6rem, 10vh, 8rem)`,
    paddingBottom: `clamp(2rem, 5vh, 5rem)`,
    paddingInline: `clamp(1rem, 5vw, 4rem)`
  },
  title: {
    fontSize: `clamp(2rem, 7vw, 5.5rem)`,
    lineHeight: isMobile ? 1.15 : 1.05,
    letterSpacing: isMobile ? '-0.02em' : '-0.04em',
    marginBottom: `clamp(1rem, 3vh, 2.5rem)`
  },
  subtitle: {
    fontSize: `clamp(1rem, 2.5vw, 1.75rem)`,
    lineHeight: isMobile ? 1.5 : 1.6,
    maxWidth: `min(90%, 650px)`,
    paddingInline: `clamp(0.5rem, 2vw, 2rem)`
  }
};
```

### Card Component Pattern
```javascript
const cardStyles = {
  container: {
    borderRadius: `clamp(16px, 2.5vw, 24px)`,
    padding: `clamp(1.25rem, 3vw, 2rem)`,
    gap: `clamp(1rem, 2vw, 1.5rem)`
  },
  title: {
    fontSize: `clamp(1.125rem, 2vw, 1.5rem)`,
    marginBottom: `clamp(0.5rem, 1vw, 1rem)`
  },
  content: {
    fontSize: `clamp(0.875rem, 1.5vw, 1rem)`,
    lineHeight: 1.6
  }
};
```

### Grid Layout Pattern
```javascript
const gridStyles = {
  // Responsive grid
  display: 'grid',
  gridTemplateColumns: isMobile 
    ? '1fr' 
    : `repeat(auto-fit, minmax(${isTablet ? '280px' : '320px'}, 1fr))`,
  gap: `clamp(1rem, 3vw, 2rem)`,
  
  // Alternative: Fixed columns
  gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'
};
```

### Button Pattern
```javascript
const buttonStyles = {
  // Touch-friendly sizing
  minHeight: isMobile ? '48px' : '44px',
  padding: `${isMobile ? '0.75rem' : '0.625rem'} clamp(1.5rem, 3vw, 2.5rem)`,
  fontSize: `clamp(0.875rem, 1.5vw, 1rem)`,
  borderRadius: `clamp(8px, 1vw, 12px)`,
  
  // Full width on mobile
  width: isMobile ? '100%' : 'auto'
};
```

---

## Implementation Examples

### Complete Hero Implementation
```javascript
// NewHomepage.js Hero Section
<section style={{ 
  minHeight: isMobile ? 'auto' : '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: `clamp(${isMobile ? '6rem' : '5rem'}, 10vh, 8rem)`,
  paddingBottom: `clamp(${isMobile ? '2rem' : '3rem'}, 5vh, 5rem)`,
  paddingLeft: `clamp(1rem, 5vw, 4rem)`,
  paddingRight: `clamp(1rem, 5vw, 4rem)`
}}>
  <div style={{ 
    width: `min(100%, ${isDesktop ? '1280px' : isTablet ? '1024px' : '100%'})`,
    position: 'relative', 
    zIndex: 1 
  }}>
    <h1 style={{
      fontSize: `clamp(${
        isTinyMobile ? '2rem' : 
        isSmallMobile ? '2.25rem' : 
        isMobile ? '2.5rem' : '3rem'
      }, ${
        isMobile ? '7vw' : '5vw'
      }, ${
        isDesktop ? '5.5rem' : isTablet ? '4rem' : '3.5rem'
      })`,
      lineHeight: isMobile ? 1.15 : 1.05,
      letterSpacing: `${isMobile ? '-0.02em' : isTablet ? '-0.03em' : '-0.04em'}`,
      marginBottom: `clamp(1rem, 3vh, 2.5rem)`,
      paddingLeft: 'env(safe-area-inset-left, 0)',
      paddingRight: 'env(safe-area-inset-right, 0)'
    }}>
      Your Personal AI Essay Writer
    </h1>
  </div>
</section>
```

### Essay Generator Responsive Layout
```javascript
// Mobile: Stacked
<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
  <textarea style={{ width: '100%' }} />
  <button style={{ width: '100%' }} />
</div>

// Desktop: Side-by-side
<div style={{ display: 'flex', gap: '1rem', alignItems: 'stretch' }}>
  <textarea style={{ flex: 1 }} />
  <button style={{ width: 'auto' }} />
</div>
```

---

## Testing Guidelines

### Device Testing Matrix
| Device | Width | Test Focus |
|--------|-------|------------|
| iPhone SE | 375px | Minimum layout |
| iPhone 12/13 | 390px | Standard mobile |
| iPhone 14 Pro Max | 430px | Large mobile |
| iPad Mini | 768px | Small tablet |
| iPad Pro 11" | 834px | Standard tablet |
| iPad Pro 12.9" | 1024px | Large tablet |
| MacBook Air | 1440px | Small desktop |
| iMac 27" | 2560px | Large desktop |

### Critical Test Points
1. **Typography scaling** - Ensure readable at all sizes
2. **Touch targets** - Minimum 44x44px on mobile
3. **Content reflow** - No horizontal scroll
4. **Image scaling** - Proper aspect ratios
5. **Form inputs** - Accessible on all devices

### Performance Metrics
- **LCP** < 2.5s on 3G
- **CLS** < 0.1
- **FID** < 100ms
- **TTI** < 3.5s on mobile

### Accessibility Requirements
```css
/* Minimum touch target */
.interactive-element {
  min-width: 44px;
  min-height: 44px;
}

/* Focus indicators */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Best Practices

### Do's ✅
- Use `clamp()` for fluid scaling
- Test on real devices
- Design mobile-first
- Use CSS Grid and Flexbox
- Implement safe area insets
- Cache breakpoint calculations
- **Always add sufficient top padding for fixed navigation**
  - Mobile: minimum 7rem (112px)
  - Tablet: minimum 9rem (144px)  
  - Desktop: minimum 10rem (160px)

### Don'ts ❌
- Don't use fixed pixel values for layout
- Don't rely on device-specific breakpoints
- Don't use JavaScript for responsive layout
- Don't forget landscape orientation
- Don't ignore accessibility
- Don't use viewport units alone (combine with clamp)

### Quick Reference
```javascript
// Fluid font size
fontSize: `clamp(min, preferred, max)`

// Fluid spacing
padding: `clamp(1rem, 3vw, 2rem)`

// Fluid container
width: `min(100%, maxWidth)`

// Safe area padding
padding: 'env(safe-area-inset-left, fallback)'

// Responsive grid
gridTemplateColumns: `repeat(auto-fit, minmax(minWidth, 1fr))`
```

---

## Migration Guide

### Converting Fixed to Fluid
```javascript
// Before (fixed)
fontSize: isMobile ? '16px' : '20px'

// After (fluid)
fontSize: 'clamp(1rem, 2vw + 0.5rem, 1.25rem)'

// Before (media queries)
@media (min-width: 768px) {
  padding: 32px;
}

// After (fluid)
padding: 'clamp(1rem, 4vw, 2rem)'
```

### Component Conversion Checklist
- [ ] Replace fixed font sizes with clamp()
- [ ] Convert padding/margins to fluid values
- [ ] Update container widths to use min()
- [ ] Add safe area insets for mobile
- [ ] Test all breakpoints
- [ ] Verify touch targets ≥ 44px
- [ ] Check landscape orientation
- [ ] Validate accessibility

---

*This responsive design system ensures Esy delivers a world-class experience across all devices, from the smallest phones to the largest displays.*
