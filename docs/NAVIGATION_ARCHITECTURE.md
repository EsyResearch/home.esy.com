# Navigation Architecture & Implementation

## Overview
This document details the sophisticated navigation system architecture implemented for Esy.com, focusing on the multi-layered component structure, theme integration, and dynamic behavior patterns.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    RootLayout (layout.js)                   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │            HeaderSearchProvider (Context)               │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │         ConditionalNavigation (Wrapper)             │ │ │
│  │  │  ┌─────────────────────────────────────────────────┐ │ │ │
│  │  │  │      ContextAwareNavigation (Router)            │ │ │ │
│  │  │  │  ┌─────────────────────────────────────────────┐ │ │ │ │
│  │  │  │  │         Navigation (Main Component)         │ │ │ │ │
│  │  │  │  │                                             │ │ │ │ │
│  │  │  │  │  ┌─────────────┐ ┌─────────────┐ ┌─────────┐ │ │ │ │ │
│  │  │  │  │  │    Logo     │ │ HeaderSearch│ │   CTA   │ │ │ │ │ │
│  │  │  │  │  │ (Dynamic)   │ │ (Theme-aware│ │ Button  │ │ │ │ │ │
│  │  │  │  │  │             │ │             │ │         │ │ │ │ │ │
│  │  │  │  │  └─────────────┘ └─────────────┘ └─────────┘ │ │ │ │ │
│  │  │  │  └─────────────────────────────────────────────┘ │ │ │ │
│  │  │  └─────────────────────────────────────────────────┘ │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

### 1. RootLayout (`src/app/layout.js`)
**Purpose**: Application shell and global providers
**Responsibilities**:
- Font loading and global styles
- Analytics and tracking setup
- Provider wrapper for navigation context

```javascript
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ... antialiased`}>
        <HeaderSearchProvider>
          <ConditionalNavigation />
          <main>{children}</main>
          <ConditionalFooter />
        </HeaderSearchProvider>
      </body>
    </html>
  );
}
```

### 2. ConditionalNavigation (`src/components/ConditionalNavigation.js`)
**Purpose**: Page-specific navigation logic
**Responsibilities**:
- Determine when to show/hide navigation
- Configure header search behavior per page type
- Handle essay detail page exceptions

```javascript
const ConditionalNavigation = () => {
  const pathname = usePathname();
  
  // Hide navigation on individual essay pages
  const isEssayViewPage = normalizedPath?.startsWith('/essays/') && normalizedPath !== '/essays';
  if (isEssayViewPage) return null;
  
  // Configure header search per page type
  const shouldShowHeaderSearch = 
    (isPromptLibraryPage && (isPromptLibraryIndex ? showHeaderSearch : true)) ||
    (isSchoolPage && (isSchoolIndex ? showHeaderSearch : isSchoolArticlePage));
    
  return <ContextAwareNavigation showHeaderSearch={shouldShowHeaderSearch} />;
};
```

### 3. ContextAwareNavigation (`src/components/Navigation/ContextAwareNavigation.tsx`)
**Purpose**: Search context determination and routing
**Responsibilities**:
- Determine search context from pathname
- Pass context to main navigation component
- Handle search routing logic

```javascript
export default function ContextAwareNavigation({ showHeaderSearch, forceContext }) {
  const pathname = usePathname();
  const searchContext = forceContext || getSearchContextFromPath(pathname);

  return (
    <Navigation 
      showHeaderSearch={showHeaderSearch} 
      searchContext={searchContext}
      pathname={pathname}
    />
  );
}
```

### 4. Navigation (`src/components/Home/navigation.tsx`)
**Purpose**: Core navigation component with theme integration
**Responsibilities**:
- Theme detection and state management
- Dynamic header styling based on scroll
- Logo rendering with theme switching
- HeaderSearch integration
- Mobile responsiveness

## Navigation Flow Logic

### Page Type Detection
```javascript
const navigationRules = {
  // Always show navigation
  'homepage': { show: true, headerSearch: false },
  'school-index': { show: true, headerSearch: 'after-scroll' },
  'school-articles': { show: true, headerSearch: true },
  'prompt-library': { show: true, headerSearch: 'after-scroll' },
  'prompt-detail': { show: true, headerSearch: true },
  'essays-index': { show: true, headerSearch: 'after-scroll' },
  
  // Never show navigation
  'essay-detail': { show: false, headerSearch: false }
};
```

### Header Search Behavior Matrix
| Page Type | Always Show | After Scroll | Never Show |
|-----------|-------------|--------------|------------|
| Homepage | ❌ | ❌ | ✅ |
| School Index | ❌ | ✅ | ❌ |
| School Articles | ✅ | ❌ | ❌ |
| Prompt Library Index | ❌ | ✅ | ❌ |
| Prompt Detail | ✅ | ❌ | ❌ |
| Essays Index | ❌ | ✅ | ❌ |
| Essay Detail | ❌ | ❌ | ✅ |

## Theme Integration Architecture

### Theme Detection Pipeline
```javascript
// 1. Component State
const [isLightMode, setIsLightMode] = useState(false);

// 2. Multi-method Detection
const checkTheme = () => {
  let isLight = false;
  
  // Method 1: DOM Classes
  if (document.body.className.includes('light')) isLight = true;
  
  // Method 2: localStorage
  if (localStorage.getItem('theme') === 'light') isLight = true;
  
  // Method 3: Background Color Analysis
  const bgColor = window.getComputedStyle(document.body).backgroundColor;
  const rgb = bgColor.match(/\d+/g);
  if (rgb && (parseInt(rgb[0]) + parseInt(rgb[1]) + parseInt(rgb[2])) / 3 > 200) {
    isLight = true;
  }
  
  // Method 4: Theme Toggle State
  const toggle = document.querySelector('[aria-label="Toggle theme"]');
  if (toggle?.innerHTML?.includes('Sun')) isLight = true;
  
  setIsLightMode(isLight);
};

// 3. Event Listeners
useEffect(() => {
  const observer = new MutationObserver(() => {
    checkTheme();
    window.dispatchEvent(new Event('scroll')); // Force nav update
  });
  
  observer.observe(document.body, { 
    attributes: true, 
    attributeFilter: ['class', 'style'],
    subtree: true 
  });
  
  const handleClick = () => setTimeout(checkTheme, 50);
  document.addEventListener('click', handleClick);
  
  return () => {
    observer.disconnect();
    document.removeEventListener('click', handleClick);
  };
}, [pathname]);
```

### Dynamic Header Styling
```javascript
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
      // Other pages: Elevated with theme-aware styling
      nav.style.background = isLightMode 
        ? 'rgba(255, 255, 255, 0.98)'
        : 'linear-gradient(180deg, rgba(31, 31, 35, 0.95) 0%, rgba(24, 24, 27, 0.85) 100%)';
      nav.style.borderBottom = `1px solid ${isLightMode ? lightTheme.border : elevatedDarkTheme.border}`;
    }
  } else if (scrollY < 50) {
    // Progressive fade-in
    const progress = scrollY / 50;
    nav.style.background = isLightMode
      ? `rgba(255, 255, 255, ${progress * 0.98})`
      : `rgba(31, 31, 35, ${progress * 0.85})`;
  } else {
    // Fully scrolled - maximum elevation
    nav.style.background = isLightMode
      ? 'rgba(255, 255, 255, 0.98)'
      : 'rgba(24, 24, 27, 0.98)';
  }
};
```

## Logo Dynamic Switching

### Asset Selection Logic
```javascript
const Logo = ({ theme = 'dark', ...props }) => {
  // Theme-based asset selection
  const logoPath = theme === 'light' 
    ? '/esy-logos/logo-files/for-web/svg/black-logo-no-bg.svg'  // Black for light backgrounds
    : '/esy-logos/logo-files/for-web/svg/color-no-bg.svg';      // Color for dark backgrounds

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

### Integration in Navigation
```javascript
<Logo 
  key={`logo-${isLightMode ? 'light' : 'dark'}`}
  suffix={logoSuffix} 
  href="" 
  showText={false} 
  theme={isLightMode ? 'light' : 'dark'} 
/>
```

## HeaderSearch Integration

### Props Flow
```javascript
// Navigation passes theme state to HeaderSearch
<HeaderSearch 
  prompts={searchData} 
  className="header-search"
  searchContext={searchContext}
  isLightMode={isLightMode}  // Theme state passed down
/>
```

### Theme-Aware Styling
```javascript
// HeaderSearch uses theme state for styling
const HeaderSearch = ({ isLightMode = false, ...props }) => {
  const currentTheme = isLightMode ? lightTheme : elevatedDarkTheme;
  
  const styles = {
    searchWrapper: {
      backgroundColor: isLightMode 
        ? 'rgba(255, 255, 255, 0.95)' 
        : 'rgba(31, 31, 35, 0.95)',
      border: `1px solid ${currentTheme.border}`,
      boxShadow: currentTheme.shadows?.glow
    }
    // ... other theme-aware styles
  };
};
```

## Mobile Responsiveness

### Breakpoint Handling
```javascript
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => setIsMobile(window.innerWidth < 768);
  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
}, []);

// Mobile-specific styling
const mobileStyles = {
  container: {
    width: isMobile ? 'calc(100vw - 4rem)' : '500px',
    maxWidth: '90vw'
  }
};
```

## Performance Optimizations

### Re-render Optimization
```javascript
// Force re-render only when theme actually changes
<Logo 
  key={`logo-${isLightMode ? 'light' : 'dark'}`}
  theme={isLightMode ? 'light' : 'dark'} 
/>

// Debounced theme detection
const handleClick = () => setTimeout(checkTheme, 50);
```

### Event Listener Management
```javascript
useEffect(() => {
  // Cleanup on unmount
  return () => {
    observer.disconnect();
    document.removeEventListener('click', handleClick);
    window.removeEventListener('scroll', handleScroll);
  };
}, [pathname]);
```

## Debugging & Development

### Console Debugging
```javascript
console.log(`[Navigation Theme] isLight: ${isLight}, detected via: ${debugInfo.join(', ')}, path: ${pathname}`);

// Manual debugging commands
console.log('Stored theme:', localStorage.getItem('theme'));
console.log('Body background:', window.getComputedStyle(document.body).backgroundColor);
```

### Development Tools
- Theme detection logging
- Scroll behavior visualization
- Component re-render tracking
- Performance monitoring

## Future Enhancements

### Planned Improvements
- [ ] System preference detection (`prefers-color-scheme`)
- [ ] Smooth theme transition animations
- [ ] Advanced mobile navigation patterns
- [ ] Keyboard navigation support
- [ ] Accessibility improvements (ARIA labels, screen reader support)

### Extension Points
- Additional navigation variants
- Custom navigation layouts per page type
- Advanced search integration
- Multi-language support
- Progressive Web App navigation patterns

---

*This architecture ensures a sophisticated, maintainable, and performant navigation system that scales with the application's growth while maintaining premium user experience standards.*
