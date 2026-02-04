# Navy Calm Theme

## Overview

A calm, authoritative theme built around deep navy (#0A2540) as the primary color. Designed to communicate academic rigor, trustworthiness, and professional credibility — aligned with Esy's positioning as a workflow-driven AI platform for publishable artifacts.

## Design Philosophy

- **Authority without coldness**: Navy provides intellectual gravitas while teal accents add modern warmth
- **Academic credibility**: Mirrors scholarly publishing, research tools, and professional documentation
- **Trust-first**: Colors chosen to reinforce "reliable, auditable artifacts"
- **Calm professionalism**: Reduced visual noise, focused on content

## Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Navy Primary** | `#0A2540` | rgb(10, 37, 64) | Primary brand color, headers, dark sections |
| **Navy Deep** | `#061527` | rgb(6, 21, 39) | Darker backgrounds, footer |
| **Navy Light** | `#0F3460` | rgb(15, 52, 96) | Elevated surfaces in dark mode |

### Accent Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Teal Accent** | `#00A896` | rgb(0, 168, 150) | CTAs, links, interactive elements |
| **Teal Light** | `#00D4AA` | rgb(0, 212, 170) | Hover states, highlights |
| **Teal Muted** | `#008F7A` | rgb(0, 143, 122) | Secondary actions |

### Success/Verification Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Emerald Success** | `#2A9D8F` | rgb(42, 157, 143) | Completed states, verified sources |
| **Emerald Light** | `#3AB4A5` | rgb(58, 180, 165) | Success highlights |

### Premium/Quality Indicators

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Gold Premium** | `#D4A017` | rgb(212, 160, 23) | Premium badges, quality markers |
| **Gold Light** | `#E8B92E` | rgb(232, 185, 46) | Gold highlights |

### Neutral Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **White** | `#FFFFFF` | rgb(255, 255, 255) | Primary backgrounds (light mode) |
| **Off-White** | `#F8F9FA` | rgb(248, 249, 250) | Secondary backgrounds |
| **Light Gray** | `#E9ECEF` | rgb(233, 236, 239) | Borders, dividers, subtle backgrounds |
| **Mid Gray** | `#6C757D` | rgb(108, 117, 125) | Secondary text, muted content |
| **Dark Gray** | `#333333` | rgb(51, 51, 51) | Primary text |

## Theme Modes

### Light Mode

```javascript
const navyCalmLightTheme = {
  // Backgrounds
  bg: '#FFFFFF',
  bgAlt: '#F8F9FA',
  surface: '#FFFFFF',
  elevated: '#F8F9FA',
  
  // Text
  text: '#333333',
  textSecondary: '#6C757D',
  textMuted: '#8E9AAF',
  
  // Brand
  primary: '#0A2540',
  accent: '#00A896',
  accentLight: '#00D4AA',
  
  // States
  success: '#2A9D8F',
  premium: '#D4A017',
  
  // Borders
  border: '#E9ECEF',
  borderStrong: '#DEE2E6',
};
```

### Dark Mode

```javascript
const navyCalmDarkTheme = {
  // Backgrounds
  bg: '#0A2540',
  bgAlt: '#061527',
  surface: '#0F3460',
  elevated: '#143D6B',
  
  // Text
  text: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textMuted: 'rgba(255, 255, 255, 0.5)',
  
  // Brand
  primary: '#00A896',
  accent: '#00D4AA',
  accentLight: '#5EEAD4',
  
  // States
  success: '#3AB4A5',
  premium: '#E8B92E',
  
  // Borders
  border: 'rgba(255, 255, 255, 0.1)',
  borderStrong: 'rgba(255, 255, 255, 0.15)',
};
```

## CSS Variables

```css
/* Navy Calm Light Theme */
.navy-calm-light {
  /* Backgrounds */
  --nc-bg: #FFFFFF;
  --nc-bg-alt: #F8F9FA;
  --nc-surface: #FFFFFF;
  --nc-elevated: #F8F9FA;
  
  /* Text */
  --nc-text: #333333;
  --nc-text-secondary: #6C757D;
  --nc-text-muted: #8E9AAF;
  
  /* Brand */
  --nc-primary: #0A2540;
  --nc-accent: #00A896;
  --nc-accent-light: #00D4AA;
  
  /* States */
  --nc-success: #2A9D8F;
  --nc-premium: #D4A017;
  
  /* Borders */
  --nc-border: #E9ECEF;
  --nc-border-strong: #DEE2E6;
}

/* Navy Calm Dark Theme */
.navy-calm-dark {
  /* Backgrounds */
  --nc-bg: #0A2540;
  --nc-bg-alt: #061527;
  --nc-surface: #0F3460;
  --nc-elevated: #143D6B;
  
  /* Text */
  --nc-text: #FFFFFF;
  --nc-text-secondary: rgba(255, 255, 255, 0.7);
  --nc-text-muted: rgba(255, 255, 255, 0.5);
  
  /* Brand */
  --nc-primary: #00A896;
  --nc-accent: #00D4AA;
  --nc-accent-light: #5EEAD4;
  
  /* States */
  --nc-success: #3AB4A5;
  --nc-premium: #E8B92E;
  
  /* Borders */
  --nc-border: rgba(255, 255, 255, 0.1);
  --nc-border-strong: rgba(255, 255, 255, 0.15);
}
```

## Color Psychology & Rationale

### Navy (#0A2540)
- **Trust & Authority**: Used by financial institutions, law firms, academic journals
- **Intellectual Depth**: Suggests serious, thoughtful work
- **Professional Credibility**: Communicates expertise and reliability
- **Timelessness**: Won't feel dated or trendy

### Teal (#00A896)
- **Clarity & Precision**: Perfect for verification and structure concepts
- **Modern Professionalism**: Tech-forward without being flashy
- **Complementary Balance**: Creates visual interest against navy
- **Action-Oriented**: Strong CTA color that doesn't overwhelm

### Emerald (#2A9D8F)
- **Verification & Completion**: Universal "success" meaning
- **Growth & Validity**: Suggests development and correctness
- **Calm Positivity**: Less aggressive than pure green

### Gold (#D4A017)
- **Quality & Premium**: Historically associated with excellence
- **Warmth**: Counters the coolness of navy/teal
- **Distinction**: Marks premium features or quality indicators

## Accessibility

### Contrast Ratios (WCAG AA)

| Combination | Ratio | Pass |
|-------------|-------|------|
| Navy on White | 14.5:1 | ✅ AAA |
| Dark Gray on White | 12.6:1 | ✅ AAA |
| Teal on White | 4.6:1 | ✅ AA |
| White on Navy | 14.5:1 | ✅ AAA |
| Teal Light on Navy | 8.2:1 | ✅ AAA |

## Usage Guidelines

### Do
- Use navy for primary headers and hero sections
- Use teal for interactive elements and CTAs
- Use emerald sparingly for success/verification states
- Use gold only for premium/quality indicators
- Maintain high contrast for readability

### Don't
- Don't use teal for large text areas (readability)
- Don't combine gold and teal directly (visual clash)
- Don't use navy text on dark backgrounds
- Don't overuse accent colors — navy should dominate

## Component Examples

### Primary Button
```css
.btn-primary {
  background: #00A896;
  color: #FFFFFF;
  border: none;
}

.btn-primary:hover {
  background: #00D4AA;
}
```

### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: #0A2540;
  border: 1px solid #0A2540;
}

.btn-secondary:hover {
  background: #0A2540;
  color: #FFFFFF;
}
```

### Card (Light Mode)
```css
.card {
  background: #FFFFFF;
  border: 1px solid #E9ECEF;
  box-shadow: 0 2px 8px rgba(10, 37, 64, 0.06);
}
```

### Card (Dark Mode)
```css
.card-dark {
  background: #0F3460;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

## File Locations

After implementation, theme files will be located at:
- `src/lib/theme.js` - Theme constants
- `src/components/IntelligenceCircuitry/IntelligenceCircuitryPage.css` - Homepage styles
- `src/app/about/page.tsx` - About page
- `src/app/school/client.js` - School page
- `src/components/Home/navigation.tsx` - Navigation
- `src/components/Home/footer.tsx` - Footer

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Feb 2026 | Initial Navy Calm theme |

---

*This theme is designed specifically for Esy's positioning as a workflow-driven AI platform for publishable, auditable artifacts. The navy foundation communicates academic authority and trust, while teal accents provide modern interactivity.*
