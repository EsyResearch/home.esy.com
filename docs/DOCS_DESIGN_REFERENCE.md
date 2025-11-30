# Esy Docs Design Reference Guide

## Overview
This guide extracts the core design patterns from the successful Esy.com pages (essays, blog, school) and the refined docs homepage to establish consistent design standards for all documentation pages.

---

## 1. Typography System

### Heading Hierarchy
```javascript
// H1 - Page Titles
{
  fontFamily: 'var(--font-literata)',     // Literata serif font
  fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', // 40px → 56px responsive
  fontWeight: 300,                         // Light weight for elegance
  letterSpacing: '-0.02em',                // Tight tracking
  lineHeight: 1.2,                         // Compact line height
  marginBottom: '1.5rem',
  color: '#fafafa'                         // Primary text color
}

// H2 - Section Headings
{
  fontFamily: 'var(--font-literata)',
  fontSize: 'clamp(2rem, 5vw, 2.75rem)',  // 32px → 44px responsive
  fontWeight: 300,
  letterSpacing: '-0.02em',
  lineHeight: 1.2,
  marginBottom: '1rem',
  color: '#fafafa'
}

// H3 - Subsection/Card Titles
{
  fontFamily: 'var(--font-literata)',
  fontSize: '1.25rem',                     // 20px
  fontWeight: 400,                         // Normal weight
  letterSpacing: '-0.01em',
  lineHeight: 1.3,
  marginBottom: '0.75rem',
  color: '#fafafa'
}
```

### Body Text
```javascript
// Lead Paragraphs (Intros)
{
  fontFamily: 'var(--font-inter)',
  fontSize: '1.125rem',                    // 18px
  lineHeight: 1.8,                         // Generous for readability
  color: 'rgba(255, 255, 255, 0.7)',      // Muted text
  maxWidth: '800px'                        // Readable line length
}

// Regular Body Copy
{
  fontFamily: 'var(--font-inter)',
  fontSize: '0.9375rem',                   // 15px
  lineHeight: 1.6,
  color: 'rgba(255, 255, 255, 0.7)'
}

// Small Text (Captions, Metadata)
{
  fontSize: '0.875rem',                    // 14px
  color: 'rgba(255, 255, 255, 0.5)'       // Subtle text
}
```

### Text Treatment Rules
- **Bold emphasis**: `fontWeight: 600`, `color: '#fafafa'`
- **Links in prose**: 
  ```javascript
  {
    color: '#8b5cf6',                      // Accent purple
    textDecoration: 'none',
    borderBottom: '1px solid rgba(139, 92, 246, 0.4)',
    transition: 'border-color 0.2s ease'
  }
  // Hover: borderBottomColor = '#8b5cf6'
  ```

---

## 2. Spacing & Layout System

### Container Pattern
```javascript
// Page Container
{
  maxWidth: '1200px',                      // Content max width
  margin: '0 auto',                        // Center alignment
  padding: '0 clamp(1.5rem, 5vw, 3rem)'  // Responsive side padding
}

// Article Content (narrower for readability)
{
  maxWidth: '800px',
  margin: '0 auto',
  padding: '0 clamp(1.5rem, 5vw, 2rem)'
}
```

### Vertical Rhythm
```javascript
// Top Padding (Page/Section Start)
{
  paddingTop: 'clamp(4rem, 10vh, 6rem)'   // 64px → 96px
}

// Section Spacing
{
  paddingTop: 'clamp(4rem, 10vh, 6rem)',
  paddingBottom: 'clamp(4rem, 10vh, 6rem)'
}

// Between Major Sections
{
  marginBottom: 'clamp(4rem, 8vh, 6rem)'  // 64px → 96px
}

// Between Subsections
{
  marginBottom: 'clamp(2rem, 4vh, 3rem)'  // 32px → 48px
}

// After Headings
{
  marginBottom: 'clamp(1.5rem, 3vh, 2rem)' // 24px → 32px
}
```

### Grid Layouts
```javascript
// Card Grids (Essential Guides pattern)
{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '1.5rem'                            // 24px between cards
}
```

---

## 3. Color Palette (Elevated Dark Theme)

### Core Colors
```javascript
const elevatedDarkTheme = {
  bg: '#18181b',           // Primary background
  elevated: '#27272a',     // Elevated surfaces (cards)
  surface: '#1f1f23',      // Input/interactive surfaces
  text: '#fafafa',         // Primary text
  muted: 'rgba(255, 255, 255, 0.7)',  // Secondary text
  subtle: 'rgba(255, 255, 255, 0.5)', // Tertiary text
  border: 'rgba(255, 255, 255, 0.08)', // Default borders
  divider: 'rgba(255, 255, 255, 0.05)', // Section dividers
  accent: '#8b5cf6',       // Primary accent (purple)
  accentLight: '#a78bfa'   // Lighter accent variant
}
```

### Semantic Colors
```javascript
// Success (tips, completed)
success: '#22c55e'
successBg: 'rgba(34, 197, 94, 0.1)'
successBorder: 'rgba(34, 197, 94, 0.2)'

// Warning (important notes)
warning: '#f59e0b'
warningBg: 'rgba(245, 158, 11, 0.1)'
warningBorder: 'rgba(245, 158, 11, 0.2)'

// Error/Alert
error: '#f87171'
errorBg: 'rgba(248, 113, 113, 0.1)'
errorBorder: 'rgba(248, 113, 113, 0.2)'

// Info
info: '#8b5cf6'
infoBg: 'rgba(139, 92, 246, 0.1)'
infoBorder: 'rgba(139, 92, 246, 0.2)'
```

### Gradient Patterns
```javascript
// Primary gradient (CTAs, accents)
'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)'

// Subtle card backgrounds
'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)'

// Hover state cards
'linear-gradient(135deg, rgba(39, 39, 42, 0.95) 0%, rgba(31, 31, 35, 0.8) 100%)'

// Category badges
`${accent}20` with border `${accent}30`
```

---

## 4. Component Patterns

### Card Design (Essential Guides Pattern)
```javascript
{
  background: isHovered
    ? 'linear-gradient(135deg, rgba(39, 39, 42, 0.95) 0%, rgba(31, 31, 35, 0.8) 100%)'
    : 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
  border: `1px solid ${isHovered ? 'rgba(159, 122, 234, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
  borderRadius: '16px',
  padding: '1.75rem',
  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  backdropFilter: 'blur(10px)',
  boxShadow: isHovered
    ? '0 12px 32px rgba(159, 122, 234, 0.2)'
    : '0 4px 16px rgba(0, 0, 0, 0.15)',
  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
}
```

### Category Badge
```javascript
{
  padding: '0.25rem 0.75rem',
  background: 'rgba(139, 92, 246, 0.2)',
  color: '#8b5cf6',
  borderRadius: '12px',
  fontSize: '0.7rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  border: '1px solid rgba(139, 92, 246, 0.3)'
}
```

### "New" Badge
```javascript
{
  padding: '0.25rem 0.625rem',
  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
  color: '#ffffff',
  borderRadius: '8px',
  fontSize: '0.65rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
}
```

### Icon Container
```javascript
{
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  background: 'rgba(139, 92, 246, 0.15)',
  border: '1px solid rgba(139, 92, 246, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#a78bfa',
  marginBottom: '1.25rem',
  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.15)'
}
```

### Link with Arrow Pattern
```javascript
{
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: '#8b5cf6',
  fontSize: '0.875rem',
  fontWeight: 500
}
// Arrow translates on hover: translateX(4px)
```

---

## 5. Content Structure Patterns

### Page Header Pattern
```javascript
<div style={{ marginBottom: 'clamp(3rem, 6vh, 4rem)' }}>
  {/* Category Badge */}
  <div className="category-badge" style={{ marginBottom: '1rem' }}>
    <Icon /> Category Name
  </div>
  
  {/* H1 Title */}
  <h1 style={{ /* H1 styles from typography system */ }}>
    Page Title
  </h1>
  
  {/* Lead Paragraph */}
  <p style={{ /* Lead paragraph styles */ }}>
    Engaging description that hooks the reader and explains value.
  </p>
  
  {/* Metadata */}
  <div style={{ fontSize: '0.875rem', color: 'subtle' }}>
    📚 Reading time • Updated date
  </div>
</div>
```

### Section Pattern
```javascript
<section style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
  {/* Section Header */}
  <h2 id="section-slug" style={{ /* H2 styles */ }}>
    Section Title
  </h2>
  
  {/* Section Description (optional) */}
  <p style={{ marginBottom: '2rem', color: 'muted' }}>
    Brief intro to what this section covers.
  </p>
  
  {/* Section Content */}
  <div>
    {/* Cards, text, lists, etc. */}
  </div>
</section>
```

### Divider Pattern (Between Major Sections)
```javascript
{
  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  paddingTop: 'clamp(4rem, 10vh, 6rem)'
}
```

---

## 6. Interactive Patterns

### Hover States
```javascript
// Cards
{
  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 32px rgba(159, 122, 234, 0.2)',
    border: '1px solid rgba(159, 122, 234, 0.3)'
  }
}

// Links
{
  transition: 'all 0.2s ease',
  '&:hover': {
    borderBottomColor: accent,
    color: accentLight
  }
}

// Arrows in links
{
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'translateX(4px)'
  }
}
```

### Focus States (Accessibility)
```javascript
{
  outline: '2px solid #8b5cf6',
  outlineOffset: '2px'
}
```

---

## 7. Content Formatting

### Callout Boxes
```javascript
// Structure
<div style={{
  padding: '1rem 1.25rem',
  borderRadius: '12px',
  backgroundColor: semanticBg,
  border: `1px solid ${semanticBorder}`,
  marginBottom: '1.5rem'
}}>
  <div style={{ 
    display: 'flex', 
    alignItems: 'flex-start', 
    gap: '0.75rem' 
  }}>
    <Icon style={{ color: semanticColor }} />
    <div>
      <strong style={{ color: '#fafafa' }}>Title</strong>
      <p style={{ color: 'muted' }}>Content</p>
    </div>
  </div>
</div>
```

### Code/Prompt Blocks
```javascript
{
  fontFamily: 'monospace',
  fontSize: '0.875rem',
  padding: '1rem',
  borderRadius: '8px',
  backgroundColor: '#18181b',  // bg color
  color: 'rgba(255, 255, 255, 0.7)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  overflowX: 'auto'
}
```

### Lists
```javascript
// With icons (checkmarks, bullets)
<li style={{
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.75rem',
  marginBottom: '0.75rem'
}}>
  <Icon style={{ 
    width: '20px', 
    height: '20px', 
    color: accent,
    marginTop: '2px',
    flexShrink: 0
  }} />
  <span style={{ color: 'muted' }}>
    List item text
  </span>
</li>
```

---

## 8. Responsive Breakpoints

### Recommended Pattern
```javascript
// Mobile First
const isMobile = windowWidth < 768
const isTablet = windowWidth >= 768 && windowWidth < 1024
const isDesktop = windowWidth >= 1024

// Use clamp() for fluid sizing instead of breakpoints where possible
// This creates seamless responsive behavior
```

---

## 9. Accessibility Requirements

### Minimum Standards
- Color contrast ratio: 4.5:1 for body text, 3:1 for large text
- Focus indicators on all interactive elements
- Semantic HTML structure (proper heading hierarchy)
- Alt text for decorative icons (aria-hidden="true")
- Keyboard navigation support
- ARIA labels where needed

---

## 10. Anti-Patterns to Avoid

### ❌ Don't Do This:
1. **Heavy font weights for headings** - Use 300-400 max for Literata
2. **Fixed pixel spacing** - Always use clamp() for responsiveness
3. **Pure black backgrounds** - Use #18181b minimum
4. **High contrast borders** - Keep opacity low (0.05-0.1)
5. **Tight line heights on body text** - Minimum 1.6
6. **Narrow content width** - Min 300px for cards
7. **Abrupt spacing changes** - Use consistent clamp() patterns
8. **Cluttered layouts** - Generous whitespace is intentional
9. **Complex animations** - Keep transitions simple (0.2-0.3s)
10. **Inconsistent typography** - Stick to Literata + Inter

---

## 11. Page-Specific Patterns

### Docs Homepage Pattern (REFERENCE)
- **Structure**: Getting Started (prose) → Divider → Essential Guides (card grid)
- **No hero section** - Starts immediately with content
- **Prose-heavy intro** - Multiple paragraphs with inline links
- **Card grid** - 4 featured guides with hover effects
- **No sidebar** - Full width content (sidebar is global)

### Docs Subpage Pattern (TO IMPLEMENT)
- **Structure**: Header (badge + H1 + intro + metadata) → Multiple sections with H2s → Related content grid → Page nav
- **Article-style layout** - Narrower max-width for readability
- **Generous top padding** - Start content below fold
- **Section-based organization** - Clear H2 hierarchy
- **Inline code/prompts** - Formatted blocks with proper styling
- **Visual examples** - Cards, diagrams, step indicators
- **Related content** - Card grid at bottom linking to other pages

---

## 12. Implementation Checklist

When building/updating docs pages:
- [ ] Use Literata for all headings (H1, H2, H3)
- [ ] Use Inter for body text
- [ ] Implement responsive typography with clamp()
- [ ] Add generous vertical spacing with clamp()
- [ ] Use elevatedDarkTheme colors consistently
- [ ] Add category badge at top
- [ ] Include reading time/metadata
- [ ] Implement section dividers where appropriate
- [ ] Style links with underline hover effect
- [ ] Add hover states to all interactive elements
- [ ] Ensure proper heading hierarchy (H1 → H2 → H3)
- [ ] Test responsive behavior at all breakpoints
- [ ] Verify color contrast ratios
- [ ] Add focus states for accessibility
- [ ] Include related content grid at bottom
- [ ] Implement smooth transitions (0.2-0.3s)

---

## Last Updated
November 2025

---

*This reference guide is the source of truth for Esy Docs design implementation. All docs pages should follow these patterns for visual consistency and professional quality.*

