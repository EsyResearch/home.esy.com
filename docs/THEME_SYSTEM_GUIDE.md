# Theme System Implementation Guide

## Overview
This guide provides comprehensive documentation for the sophisticated light/dark theme system implemented across Esy.com. The system ensures WCAG AA compliance, premium user experience, and seamless theme switching across all components.

## Theme Architecture

### Core Theme Files
```
src/lib/
├── theme.js           # Elevated dark theme constants
├── lightTheme.js      # Optimized light theme constants
└── searchContexts.js  # Context-aware search configurations
```

### Theme Detection Flow
```
Component Mount → Multi-Method Detection → State Update → DOM Sync → Re-render
     ↓                    ↓                    ↓           ↓         ↓
Theme Detection    →  Fallback System   →  isLightMode  → DOM   → Styling
```

## Implementation Patterns

### 1. Basic Theme-Aware Component

```javascript
import { elevatedDarkTheme } from '@/lib/theme';
import { lightTheme } from '@/lib/lightTheme';

const MyComponent = ({ isLightMode = false, ...props }) => {
  // Theme selection
  const currentTheme = isLightMode ? lightTheme : elevatedDarkTheme;
  
  const styles = {
    container: {
      backgroundColor: currentTheme.bg,
      color: currentTheme.text,
      border: `1px solid ${currentTheme.border}`,
      boxShadow: currentTheme.shadows?.md
    },
    button: {
      backgroundColor: currentTheme.accent,
      color: currentTheme.bg, // High contrast
      '&:hover': {
        backgroundColor: currentTheme.accentHover
      }
    }
  };
  
  return <div style={styles.container}>...</div>;
};
```

### 2. Advanced Theme Detection

```javascript
const useThemeDetection = () => {
  const [isLightMode, setIsLightMode] = useState(false);
  
  useEffect(() => {
    const checkTheme = () => {
      let isLight = false;
      const debugInfo = [];
      
      // Method 1: DOM Classes
      const bodyClasses = document.body.className;
      const htmlClasses = document.documentElement.className;
      if (bodyClasses?.includes('light') || htmlClasses?.includes('light')) {
        isLight = true;
        debugInfo.push('class-based');
      }
      
      // Method 2: localStorage
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'light') {
        isLight = true;
        debugInfo.push('localStorage');
      }
      
      // Method 3: Background Color Analysis
      const bgColor = window.getComputedStyle(document.body).backgroundColor;
      const bgColorRgb = bgColor.match(/\d+/g);
      if (bgColorRgb) {
        const r = parseInt(bgColorRgb[0]);
        const g = parseInt(bgColorRgb[1]);
        const b = parseInt(bgColorRgb[2]);
        const avg = (r + g + b) / 3;
        
        if (avg > 200) { // Light background detected
          isLight = true;
          debugInfo.push(`bg-color(${r},${g},${b})`);
        }
      }
      
      // Method 4: Theme Toggle Button State
      const themeToggle = document.querySelector('[aria-label="Toggle theme"]');
      if (themeToggle) {
        const toggleHTML = themeToggle.innerHTML;
        if (toggleHTML?.includes('M12 3v1m0') || toggleHTML?.includes('Sun')) {
          isLight = true;
          debugInfo.push('toggle-sun-icon');
        }
      }
      
      console.log(`[Theme Detection] isLight: ${isLight}, detected via: ${debugInfo.join(', ')}`);
      setIsLightMode(isLight);
    };
    
    // Initial check
    checkTheme();
    
    // Listen for changes
    const observer = new MutationObserver(() => {
      checkTheme();
      window.dispatchEvent(new Event('scroll')); // Trigger nav updates
    });
    
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['class', 'style'],
      subtree: true 
    });
    
    // Listen for clicks (theme toggle)
    const handleClick = () => setTimeout(checkTheme, 50);
    document.addEventListener('click', handleClick);
    
    return () => {
      observer.disconnect();
      document.removeEventListener('click', handleClick);
    };
  }, []);
  
  return { isLightMode, setIsLightMode };
};
```

### 3. DOM Synchronization Pattern

```javascript
// For pages with theme toggles (e.g., school articles)
const ThemeAwarePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Sync theme state with DOM
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
  
  const theme = isDarkMode ? elevatedDarkTheme : lightTheme;
  
  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text }}>
      {/* Theme toggle button */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        style={{
          backgroundColor: theme.elevated,
          color: theme.text,
          border: `1px solid ${theme.border}`
        }}
        aria-label="Toggle theme"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
};
```

## Color System Reference

### Elevated Dark Theme Colors

```javascript
export const elevatedDarkTheme = {
  // Backgrounds - Sophisticated grays instead of pitch black
  bg: '#18181b',           // Zinc-900 - Much lighter than #0a0a0f
  elevated: '#27272a',     // Zinc-800 - Card backgrounds
  surface: '#1f1f23',      // Custom blend - Slightly elevated
  hover: '#3f3f46',        // Zinc-700 - Interactive states

  // Text hierarchy - Softer whites for reduced eye strain
  text: '#fafafa',         // Neutral-50 - Not pure white
  textSecondary: '#e4e4e7', // Zinc-200 - Secondary content
  muted: '#a1a1aa',        // Zinc-400 - Muted text
  subtle: '#71717a',       // Zinc-500 - Very subtle text
  faint: '#52525b',        // Zinc-600 - Faintest text

  // Borders & Dividers
  border: 'rgba(63, 63, 70, 0.4)',    // Zinc-700 with opacity
  borderSubtle: 'rgba(63, 63, 70, 0.2)',
  divider: 'rgba(63, 63, 70, 0.15)',

  // Enhanced accent colors - WCAG AA compliant
  accent: '#9f7aea',       // Violet-400 - Better contrast (5.2:1)
  accentHover: '#8b5cf6',  // Violet-500 - Original as hover
  accentDark: '#7c3aed',   // Violet-600 - For emphasis
  accentLight: '#b794f4',  // Violet-300 - For highlights
  accentGlow: 'rgba(159, 122, 234, 0.15)',
  accentBorder: 'rgba(159, 122, 234, 0.2)',

  // Semantic colors
  success: '#22c55e',      // Green-500
  warning: '#fbbf24',      // Amber-400
  error: '#f87171',        // Red-400
  info: '#60a5fa',         // Blue-400

  // Shadows
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.2)',
    md: '0 4px 12px rgba(0, 0, 0, 0.3)',
    lg: '0 8px 32px rgba(0, 0, 0, 0.4)',
    glow: '0 4px 16px rgba(159, 122, 234, 0.2)',
    hover: '0 12px 24px rgba(159, 122, 234, 0.15)'
  }
};
```

### Optimized Light Theme Colors

```javascript
export const lightTheme = {
  // Backgrounds - Off-white for reduced glare
  bg: '#fafafa',           // Neutral-50
  elevated: '#ffffff',     // Pure white for elevated elements
  surface: '#f8fafc',      // Slate-50 - Card backgrounds
  hover: '#f1f5f9',        // Slate-100 - Interactive states

  // Text hierarchy - Darker for contrast
  text: '#1e293b',         // Slate-800
  textSecondary: '#334155',// Slate-700
  muted: '#64748b',        // Slate-500
  subtle: '#94a3b8',       // Slate-400
  faint: '#cbd5e1',        // Slate-300

  // Borders & Dividers - Subtle grays
  border: 'rgba(203, 213, 225, 0.6)', // Slate-300 with opacity
  borderSubtle: 'rgba(203, 213, 225, 0.3)',
  divider: 'rgba(203, 213, 225, 0.2)',

  // Accent colors - optimized for WCAG AA on light backgrounds
  accent: '#7c3aed',       // Violet-600
  accentHover: '#6d28d9',  // Violet-700
  accentDark: '#5b21b6',   // Violet-800
  accentLight: '#a78bfa',  // Violet-400
  accentGlow: 'rgba(124, 58, 237, 0.1)',
  accentBorder: 'rgba(124, 58, 237, 0.2)',

  // Semantic colors
  success: '#16a34a',      // Green-600
  warning: '#d97706',      // Amber-600
  error: '#dc2626',        // Red-600
  info: '#2563eb',         // Blue-600

  // Shadows - Lighter for light backgrounds
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 2px 6px rgba(0, 0, 0, 0.08)',
    lg: '0 4px 12px rgba(0, 0, 0, 0.1)',
    glow: '0 2px 8px rgba(124, 58, 237, 0.1)',
    hover: '0 6px 16px rgba(124, 58, 237, 0.08)'
  }
};
```

## Accessibility & Contrast Ratios

### WCAG AA Compliance
```javascript
// Contrast ratio examples
const contrastRatios = {
  // Light Theme
  lightText: 13.5,         // #1e293b on #fafafa - Exceeds WCAG AAA
  lightSecondary: 7.8,     // #334155 on #fafafa - Exceeds WCAG AA
  lightMuted: 5.4,         // #64748b on #fafafa - Exceeds WCAG AA
  
  // Dark Theme
  darkText: 17.6,          // #fafafa on #18181b - Maximum contrast
  darkSecondary: 9.2,      // #e4e4e7 on #18181b - Exceeds WCAG AAA
  darkMuted: 6.1,          // #a1a1aa on #18181b - Exceeds WCAG AA
  
  // Accent Colors
  accentLight: 4.5,        // #7c3aed on #fafafa - Meets WCAG AA
  accentDark: 5.2,         // #9f7aea on #18181b - Exceeds WCAG AA
};
```

### Color Usage Guidelines
```javascript
// Good: High contrast combinations
const goodCombinations = {
  light: {
    text: lightTheme.text,        // Dark text on light background
    background: lightTheme.bg,    // Light background
    accent: lightTheme.accent     // Purple accent
  },
  dark: {
    text: elevatedDarkTheme.text, // Light text on dark background
    background: elevatedDarkTheme.bg, // Dark background
    accent: elevatedDarkTheme.accent  // Brighter purple accent
  }
};

// Avoid: Low contrast combinations
const avoidCombinations = {
  light: {
    text: lightTheme.subtle,      // Too light for primary text
    background: lightTheme.elevated // Too similar to text
  },
  dark: {
    text: elevatedDarkTheme.faint, // Too dark for primary text
    background: elevatedDarkTheme.elevated // Too similar to text
  }
};
```

## CSS-in-JS Patterns

### Styled-JSX with Theme Variables
```javascript
const ThemedComponent = ({ isLightMode }) => {
  const currentTheme = isLightMode ? lightTheme : elevatedDarkTheme;
  
  return (
    <>
      <style jsx>{`
        .themed-input {
          background-color: ${currentTheme.surface};
          color: ${currentTheme.text};
          border: 1px solid ${currentTheme.border};
          box-shadow: ${currentTheme.shadows?.sm};
        }
        
        .themed-input::placeholder {
          color: ${isLightMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
        }
        
        .themed-input:focus {
          border-color: ${currentTheme.accent};
          box-shadow: ${currentTheme.shadows?.glow};
        }
        
        .themed-button {
          background-color: ${currentTheme.accent};
          color: ${currentTheme.bg};
          border: none;
          box-shadow: ${currentTheme.shadows?.md};
        }
        
        .themed-button:hover {
          background-color: ${currentTheme.accentHover};
          box-shadow: ${currentTheme.shadows?.hover};
        }
      `}</style>
      
      <input className="themed-input" placeholder="Enter text..." />
      <button className="themed-button">Submit</button>
    </>
  );
};
```

### Dynamic Style Objects
```javascript
const getDynamicStyles = (isLightMode) => {
  const currentTheme = isLightMode ? lightTheme : elevatedDarkTheme;
  
  return {
    container: {
      backgroundColor: currentTheme.bg,
      color: currentTheme.text,
      minHeight: '100vh',
      transition: 'background-color 0.3s ease, color 0.3s ease'
    },
    card: {
      backgroundColor: currentTheme.elevated,
      border: `1px solid ${currentTheme.border}`,
      borderRadius: '12px',
      padding: '24px',
      boxShadow: currentTheme.shadows?.md,
      '&:hover': {
        boxShadow: currentTheme.shadows?.hover,
        transform: 'translateY(-2px)'
      }
    },
    button: {
      backgroundColor: currentTheme.accent,
      color: currentTheme.bg,
      border: 'none',
      borderRadius: '8px',
      padding: '12px 24px',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      boxShadow: currentTheme.shadows?.sm,
      '&:hover': {
        backgroundColor: currentTheme.accentHover,
        boxShadow: currentTheme.shadows?.glow
      },
      '&:active': {
        transform: 'translateY(1px)'
      }
    }
  };
};
```

## Performance Optimization

### Memoization Patterns
```javascript
import { useMemo } from 'react';

const OptimizedThemedComponent = ({ isLightMode, data }) => {
  // Memoize theme selection
  const currentTheme = useMemo(() => 
    isLightMode ? lightTheme : elevatedDarkTheme, 
    [isLightMode]
  );
  
  // Memoize computed styles
  const styles = useMemo(() => ({
    container: {
      backgroundColor: currentTheme.bg,
      color: currentTheme.text
    },
    // ... other styles
  }), [currentTheme]);
  
  // Memoize expensive computations
  const processedData = useMemo(() => 
    data.map(item => ({
      ...item,
      theme: currentTheme
    })), 
    [data, currentTheme]
  );
  
  return <div style={styles.container}>...</div>;
};
```

### Re-render Optimization
```javascript
// Force re-render only when theme actually changes
const ThemedLogo = ({ isLightMode }) => {
  const logoPath = isLightMode 
    ? '/logos/black-logo.svg'
    : '/logos/color-logo.svg';
    
  return (
    <Image 
      key={`logo-${isLightMode ? 'light' : 'dark'}`} // Force re-render
      src={logoPath} 
      alt="Logo" 
    />
  );
};
```

## Testing & Debugging

### Development Tools
```javascript
// Theme debugging utility
const debugTheme = () => {
  console.group('🎨 Theme Debug Information');
  console.log('Stored theme:', localStorage.getItem('theme'));
  console.log('Body classes:', document.body.className);
  console.log('HTML classes:', document.documentElement.className);
  console.log('Body background:', window.getComputedStyle(document.body).backgroundColor);
  
  const themeToggle = document.querySelector('[aria-label="Toggle theme"]');
  if (themeToggle) {
    console.log('Theme toggle HTML:', themeToggle.innerHTML);
    console.log('Theme toggle classes:', themeToggle.className);
  }
  
  console.groupEnd();
};

// Usage in development
if (process.env.NODE_ENV === 'development') {
  window.debugTheme = debugTheme;
}
```

### Manual Testing Checklist
- [ ] Theme toggle works on all pages
- [ ] Logo switches correctly between themes
- [ ] All text has sufficient contrast
- [ ] Interactive elements are clearly visible
- [ ] Transitions are smooth and performant
- [ ] Theme persists across page navigation
- [ ] Mobile responsiveness maintained
- [ ] Screen reader compatibility
- [ ] Keyboard navigation works
- [ ] No visual glitches during theme switching

## Common Patterns & Best Practices

### 1. Always Provide Fallbacks
```javascript
// Good: Multiple detection methods
const isLight = 
  bodyClasses?.includes('light') || 
  localStorage.getItem('theme') === 'light' ||
  isLightBg ||
  false; // Default fallback

// Avoid: Single detection method
const isLight = bodyClasses?.includes('light'); // Can fail
```

### 2. Use Semantic Color Names
```javascript
// Good: Semantic naming
const styles = {
  backgroundColor: currentTheme.bg,
  color: currentTheme.text,
  borderColor: currentTheme.border
};

// Avoid: Hardcoded colors
const styles = {
  backgroundColor: '#18181b',
  color: '#fafafa',
  borderColor: 'rgba(63, 63, 70, 0.4)'
};
```

### 3. Maintain Consistent Transitions
```javascript
// Good: Consistent transition timing
const transitionStyles = {
  transition: 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease'
};

// Avoid: Inconsistent transitions
const inconsistentStyles = {
  transition: 'background-color 0.1s, color 0.5s, box-shadow 0.2s linear'
};
```

### 4. Test Both Themes Thoroughly
```javascript
// Development helper
const ThemeTester = () => (
  <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 9999 }}>
    <button onClick={() => {
      const isLight = document.body.className.includes('light');
      if (isLight) {
        document.body.className = document.body.className.replace('light', '');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.className += ' light';
        localStorage.setItem('theme', 'light');
      }
      window.dispatchEvent(new Event('scroll'));
    }}>
      Toggle Theme
    </button>
  </div>
);
```

## Future Enhancements

### Planned Features
- [ ] System preference detection (`prefers-color-scheme`)
- [ ] Smooth theme transition animations
- [ ] Custom theme creation
- [ ] High contrast mode
- [ ] Reduced motion support
- [ ] Theme-aware image optimization

### Extension Points
- Additional theme variants
- User preference persistence
- Theme-based icon sets
- Dynamic color palette generation
- Accessibility enhancements

---

*This guide ensures consistent, accessible, and maintainable theme implementation across the Esy.com platform. All new components should follow these established patterns.*
