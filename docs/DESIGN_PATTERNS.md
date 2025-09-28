# Design Patterns & Architecture

## Overview
This document outlines the sophisticated design patterns and architectural decisions established for Esy.com's academic research platform. These patterns ensure consistency, maintainability, and premium user experience across all components.

## 1. Theme System Architecture

### Core Principles
- **Dual Theme Support**: Sophisticated light and dark modes with academic elegance
- **Centralized Theme Constants**: Single source of truth for all color values
- **Dynamic Theme Detection**: Robust fallback system for theme state
- **WCAG AA Compliance**: All contrast ratios meet accessibility standards

### Theme Files
```
src/lib/
├── theme.js           # Elevated dark theme constants
├── lightTheme.js      # Optimized light theme constants
└── searchContexts.js  # Context-aware search configurations
```

### Theme Detection Pattern
```javascript
// Multi-method theme detection with fallbacks
const checkTheme = () => {
  let isLight = false;
  const debugInfo = [];
  
  // Method 1: Body/HTML classes
  if (bodyClasses?.includes('light') || htmlClasses?.includes('light')) {
    isLight = true;
    debugInfo.push('class-based');
  }
  
  // Method 2: localStorage persistence
  if (localStorage.getItem('theme') === 'light') {
    isLight = true;
    debugInfo.push('localStorage');
  }
  
  // Method 3: Computed background color
  const bgColor = window.getComputedStyle(document.body).backgroundColor;
  const bgColorRgb = bgColor.match(/\d+/g);
  if (bgColorRgb) {
    const avg = (parseInt(bgColorRgb[0]) + parseInt(bgColorRgb[1]) + parseInt(bgColorRgb[2])) / 3;
    if (avg > 200) { // Light background detected
      isLight = true;
      debugInfo.push(`bg-color(${r},${g},${b})`);
    }
  }
  
  // Method 4: Theme toggle button state
  const themeToggle = document.querySelector('[aria-label="Toggle theme"]');
  if (themeToggle) {
    const toggleHTML = themeToggle.innerHTML;
    if (toggleHTML?.includes('M12 3v1m0') || toggleHTML?.includes('Sun')) {
      isLight = true;
      debugInfo.push('toggle-sun-icon');
    }
  }
  
  console.log(`[Theme Detection] isLight: ${isLight}, detected via: ${debugInfo.join(', ')}`);
  return isLight;
};
```

### DOM Synchronization Pattern
```javascript
// School article pages - synchronize theme with DOM
useEffect(() => {
  if (isDarkMode) {
    document.body.style.backgroundColor = elevatedDarkTheme.bg;
    document.body.className = document.body.className.replace('light', '');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.style.backgroundColor = lightTheme.bg;
    document.body.className = document.body.className + ' light';
    localStorage.setItem('theme', 'light');
  }
}, [isDarkMode]);
```

## 2. Navigation Architecture

### Component Hierarchy
```
RootLayout
└── HeaderSearchProvider
    └── ConditionalNavigation
        └── ContextAwareNavigation
            └── Navigation (Main Component)
                ├── Logo (Dynamic theme-based)
                ├── HeaderSearch (Theme-aware)
                └── CTA Button (Dynamic styling)
```

### Navigation Flow Logic
```javascript
// Conditional rendering based on page type
const shouldShowNavigation = !isEssayViewPage;
const shouldShowHeaderSearch = 
  (isPromptLibraryPage && (isPromptLibraryIndex ? showHeaderSearch : true)) ||
  (isGlossaryPage && (isGlossaryIndex ? showHeaderSearch : true)) ||
  (isSchoolPage && (isSchoolIndex ? showHeaderSearch : isSchoolArticlePage)) ||
  (isEssaysPage && showHeaderSearch);
```

### Dynamic Header Behavior
```javascript
// Scroll-based header elevation
const handleScroll = () => {
  const scrollY = window.scrollY;
  const isHomepage = pathname === '/' || pathname === '';
  
  if (scrollY === 0) {
    if (isHomepage) {
      // Homepage: Transparent - unified with hero
      nav.style.background = 'transparent';
      nav.style.boxShadow = 'none';
      nav.style.borderBottom = 'none';
    } else {
      // Other pages: Elevated with gradient and border
      nav.style.background = isLightMode 
        ? 'rgba(255, 255, 255, 0.98)'
        : 'linear-gradient(180deg, rgba(31, 31, 35, 0.95) 0%, rgba(24, 24, 27, 0.85) 100%)';
      nav.style.borderBottom = `1px solid ${currentTheme.border}`;
    }
  }
  // Progressive elevation on scroll...
};
```

## 3. Component Theming Patterns

### Theme-Aware Component Structure
```javascript
// Standard pattern for theme-aware components
const MyComponent = ({ isLightMode = false, ...props }) => {
  const currentTheme = isLightMode ? lightTheme : elevatedDarkTheme;
  
  const styles = {
    container: {
      backgroundColor: currentTheme.bg,
      color: currentTheme.text,
      border: `1px solid ${currentTheme.border}`,
      boxShadow: currentTheme.shadows?.md
    },
    // ... other theme-aware styles
  };
  
  return <div style={styles.container}>...</div>;
};
```

### Logo Dynamic Switching
```javascript
// Logo component with theme-based asset selection
const Logo = ({ theme = 'dark', ...props }) => {
  const logoPath = theme === 'light' 
    ? '/esy-logos/logo-files/for-web/svg/black-logo-no-bg.svg'
    : '/esy-logos/logo-files/for-web/svg/color-no-bg.svg';
    
  return (
    <Image 
      src={logoPath} 
      alt="Esy Logo" 
      width={size} 
      height={size}
      key={`logo-${theme}`} // Force re-render on theme change
    />
  );
};
```

### Search Component Theming
```javascript
// HeaderSearch with comprehensive theme support
const HeaderSearch = ({ isLightMode = false, ...props }) => {
  const currentTheme = isLightMode ? lightTheme : elevatedDarkTheme;
  
  const styles = {
    searchWrapper: {
      backgroundColor: isLightMode 
        ? 'rgba(255, 255, 255, 0.95)' 
        : 'rgba(31, 31, 35, 0.95)',
      border: `1px solid ${currentTheme.border}`,
      boxShadow: currentTheme.shadows?.glow
    },
    searchInput: {
      color: currentTheme.text,
      '::placeholder': {
        color: isLightMode 
          ? 'rgba(30, 41, 59, 0.5)' 
          : 'rgba(255, 255, 255, 0.5)'
      }
    }
  };
  
  return (
    <>
      <style jsx>{`
        .search-input::placeholder {
          color: ${isLightMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
        }
      `}</style>
      <input className="search-input" style={styles.searchInput} />
    </>
  );
};
```

## 4. Color System

### Elevated Dark Theme
```javascript
export const elevatedDarkTheme = {
  // Sophisticated grays instead of pitch black
  bg: '#18181b',           // Zinc-900 - Much lighter than #0a0a0f
  elevated: '#27272a',     // Zinc-800 - Card backgrounds
  surface: '#1f1f23',      // Custom blend - Slightly elevated
  
  // Navigation specific
  navBg: 'rgba(31, 31, 35, 0.85)',
  navBgScrolled: 'rgba(24, 24, 27, 0.98)',
  
  // Enhanced accent colors - optimized for WCAG AA
  accent: '#9f7aea',       // Violet-400 - Better contrast (5.2:1)
  accentHover: '#8b5cf6',  // Violet-500 - Original as hover
  
  // Elevation shadows
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.2)',
    md: '0 4px 12px rgba(0, 0, 0, 0.3)',
    lg: '0 8px 32px rgba(0, 0, 0, 0.4)',
    glow: '0 4px 16px rgba(159, 122, 234, 0.2)'
  }
};
```

### Optimized Light Theme
```javascript
export const lightTheme = {
  // Off-white for reduced eye strain
  bg: '#fafafa',              // Neutral-50
  surface: '#ffffff',         // Card backgrounds
  elevated: '#f8fafc',        // Raised surfaces
  
  // Text hierarchy - optimized contrast ratios
  text: '#1e293b',            // Primary text (13.5:1 contrast)
  textSecondary: '#475569',   // Secondary content (7.8:1 contrast)
  textMuted: '#64748b',       // Muted text (5.4:1 contrast)
  
  // Accent colors - refined purple usage
  accent: '#7c3aed',          // Primary purple
  accentGlow: 'rgba(124,58,237,0.08)', // Very subtle background
  
  // Shadows - Lighter for light theme
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.06)',
    md: '0 2px 6px rgba(0, 0, 0, 0.08)',
    lg: '0 4px 10px rgba(0, 0, 0, 0.1)',
    glow: '0 0 0 3px rgba(124,58,237,0.1)'
  }
};
```

## 5. Performance Patterns

### Component Re-rendering Optimization
```javascript
// Force re-render on theme change
<Logo 
  key={`logo-${isLightMode ? 'light' : 'dark'}`}
  theme={isLightMode ? 'light' : 'dark'} 
/>

// Theme change event propagation
const observer = new MutationObserver(() => {
  checkTheme();
  window.dispatchEvent(new Event('scroll')); // Force nav style update
});
```

### CSS-in-JS with styled-jsx
```javascript
// Cross-browser placeholder styling
<style jsx>{`
  .search-input::placeholder {
    color: ${isLightMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
  }
  
  .search-input:-ms-input-placeholder {
    color: ${isLightMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
  }
  
  .search-input::-ms-input-placeholder {
    color: ${isLightMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
  }
`}</style>
```

## 6. Debugging & Development Patterns

### Comprehensive Theme Debugging
```javascript
// Enhanced debugging with multiple detection methods
console.log(`[Navigation Theme] isLight: ${isLight}, detected via: ${debugInfo.join(', ') || 'none'}, path: ${pathname}`);

// Manual debugging commands
console.log('Stored theme:', localStorage.getItem('theme'));
console.log('Body background:', window.getComputedStyle(document.body).backgroundColor);
console.log('Theme toggle HTML:', document.querySelector('[aria-label="Toggle theme"]')?.innerHTML);
```

### Error Handling & Fallbacks
```javascript
// Robust theme detection with fallbacks
const isLight = 
  bodyClasses?.includes('light') || 
  htmlClasses?.includes('light') ||
  localStorage.getItem('theme') === 'light' ||
  isLightBg ||
  (pathname?.includes('/school/articles') && 
   document.querySelector('[aria-label="Toggle theme"]')?.innerHTML?.includes('Sun'));
```

## 7. Design Philosophy Integration

### Academic Elegance Principles
- **Transformative & Minimal**: Outstanding layouts with perfect space usage
- **Premium Sophistication**: "Suave and silk, not bulk, old school widget infested"
- **Academic Focus**: Design specifically for scholarly writing and research
- **Conversion Optimization**: Professional design that converts free users to paid users

### Brand Consistency
- Maintained across all theme states
- Consistent typography and spacing
- Professional academic aesthetic
- Premium user experience standards

## 8. Implementation Checklist

When implementing new theme-aware components:

- [ ] Import both `lightTheme` and `elevatedDarkTheme`
- [ ] Accept `isLightMode` prop with default value
- [ ] Use `currentTheme = isLightMode ? lightTheme : elevatedDarkTheme`
- [ ] Apply theme constants to all style properties
- [ ] Include proper contrast ratios (WCAG AA compliance)
- [ ] Add cross-browser compatibility (placeholder styling, etc.)
- [ ] Include debugging console logs for development
- [ ] Test in both light and dark modes
- [ ] Verify theme switching works immediately
- [ ] Document any new patterns in this file

## 9. Future Enhancements

### Planned Improvements
- [ ] System preference detection (`prefers-color-scheme`)
- [ ] Theme persistence across sessions
- [ ] Smooth theme transition animations
- [ ] Accessibility improvements (reduced motion support)
- [ ] Performance monitoring for theme switching

### Extension Points
- Additional theme variants (high contrast, sepia, etc.)
- Custom theme creation for users
- Theme-aware image optimization
- Dynamic theme based on time of day

---

*This document serves as the definitive guide for implementing sophisticated theming in the Esy.com academic research platform. All new components should follow these established patterns to maintain consistency and quality.*
