// Elevated Dark Theme Constants
// Professional dark theme with sophisticated grays instead of pitch black

export const elevatedDarkTheme = {
  // Primary backgrounds - Using sophisticated grays instead of pitch black
  bg: '#18181b',           // Zinc-900 - Much lighter than #0a0a0f
  elevated: '#27272a',     // Zinc-800 - Card backgrounds
  surface: '#1f1f23',      // Custom blend - Slightly elevated
  hover: '#3f3f46',        // Zinc-700 - Interactive states
  
  // Navigation specific
  navBg: 'rgba(31, 31, 35, 0.85)',      // Elevated nav background
  navBgScrolled: 'rgba(24, 24, 27, 0.98)', // Nav when scrolled
  
  // Text hierarchy - Softer whites for reduced eye strain
  text: '#fafafa',         // Neutral-50 - Not pure white
  textSecondary: '#e4e4e7', // Zinc-200 - Secondary content
  muted: '#a1a1aa',        // Zinc-400 - Muted text
  subtle: '#71717a',       // Zinc-500 - Very subtle text
  faint: '#52525b',        // Zinc-600 - Faintest text
  
  // Borders & Dividers - More visible but still subtle
  border: 'rgba(63, 63, 70, 0.4)',    // Zinc-700 with opacity
  borderSubtle: 'rgba(63, 63, 70, 0.2)',
  divider: 'rgba(63, 63, 70, 0.15)',
  
  // Enhanced accent colors - optimized for WCAG AA on elevated backgrounds
  accent: '#9f7aea',       // Violet-400 - Better contrast (5.2:1)
  accentHover: '#8b5cf6',  // Violet-500 - Original as hover
  accentDark: '#7c3aed',   // Violet-600 - For emphasis
  accentLight: '#b794f4',  // Violet-300 - For highlights
  accentGlow: 'rgba(159, 122, 234, 0.15)',
  accentBorder: 'rgba(159, 122, 234, 0.2)',
  
  // Enhanced semantic colors - improved contrast
  success: '#22c55e',      // Green-500 - brighter
  successGlow: 'rgba(34, 197, 94, 0.15)',
  warning: '#fbbf24',      // Amber-400 - brighter
  warningGlow: 'rgba(251, 191, 36, 0.15)',
  error: '#f87171',        // Red-400 - softer
  errorGlow: 'rgba(248, 113, 113, 0.15)',
  info: '#60a5fa',         // Blue-400 - lighter
  infoGlow: 'rgba(96, 165, 250, 0.15)',
  
  // Gradient overlays for depth
  gradientSubtle: 'linear-gradient(180deg, rgba(31, 31, 35, 0.4) 0%, rgba(24, 24, 27, 0.9) 40%, rgba(24, 24, 27, 1) 80%)',
  ambientGlow: 'radial-gradient(600px circle at 50% 0%, rgba(139, 92, 246, 0.02) 0%, transparent 100%)',
  
  // Card gradients
  gradients: {
    primary: 'linear-gradient(135deg, #9f7aea 0%, #8b5cf6 100%)',
    card: 'linear-gradient(180deg, rgba(31, 31, 35, 0.6) 0%, rgba(24, 24, 27, 0.4) 100%)',
    featured: 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
    hover: 'linear-gradient(135deg, rgba(39, 39, 42, 0.8) 0%, rgba(31, 31, 35, 0.6) 100%)'
  },
  
  // Elevation shadows
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.2)',
    md: '0 4px 12px rgba(0, 0, 0, 0.3)',
    lg: '0 8px 32px rgba(0, 0, 0, 0.4)',
    glow: '0 4px 16px rgba(159, 122, 234, 0.2)',
    hover: '0 12px 24px rgba(159, 122, 234, 0.15)'
  }
};

// Legacy dark theme (for comparison/fallback)
export const legacyDarkTheme = {
  bg: '#0a0a0f',
  elevated: '#16161f',
  text: '#ffffff',
  muted: 'rgba(255, 255, 255, 0.7)',
  subtle: 'rgba(255, 255, 255, 0.5)',
  faint: 'rgba(255, 255, 255, 0.3)',
  border: 'rgba(255, 255, 255, 0.08)',
  divider: 'rgba(255, 255, 255, 0.05)',
  accent: '#8b5cf6'
};

// Light theme (for future implementation)
export const lightTheme = {
  bg: '#ffffff',
  elevated: '#f8fafc',
  surface: '#f1f5f9',
  hover: '#e2e8f0',
  text: '#0f172a',
  textSecondary: '#475569',
  muted: '#64748b',
  subtle: '#94a3b8',
  faint: '#cbd5e1',
  border: 'rgba(15, 23, 42, 0.12)',
  borderSubtle: 'rgba(15, 23, 42, 0.08)',
  divider: 'rgba(15, 23, 42, 0.05)',
  accent: '#7c3aed',
  accentHover: '#6d28d9',
  accentGlow: 'rgba(124, 58, 237, 0.15)'
};

// ============================================
// WARM ACADEMIC LIGHT THEME
// Premium light theme with cream/parchment tones
// Created: February 2026
// ============================================
export const warmAcademicLightTheme = {
  // Backgrounds - Warm cream/parchment tones
  bg: '#fdfbf7',
  bgGradient: 'linear-gradient(180deg, #fdfbf7 0%, #f8f5ef 100%)',
  elevated: '#f7f5f0',
  surface: '#ffffff',
  surfaceElevated: '#fffefa',
  hover: 'rgba(28, 25, 23, 0.04)',
  
  // Section backgrounds
  sections: {
    hero: 'linear-gradient(180deg, #fdfbf7 0%, #f8f5ef 100%)',
    templates: '#f7f5f0',
    howItWorks: 'linear-gradient(180deg, #fffefa 0%, #fdfbf7 100%)',
    gallery: '#f5f3ef',
    finalCta: 'linear-gradient(180deg, #fdfbf7 0%, #fff7ed 100%)',
    footer: 'linear-gradient(180deg, #f5f3ef 0%, #ece9e3 100%)'
  },
  
  // Text - Warm dark tones (Stone palette)
  text: '#1c1917',           // Stone-900 - Primary
  textSecondary: '#44403c',  // Stone-700 - Secondary
  muted: '#78716c',          // Stone-500 - Muted
  subtle: '#a8a29e',         // Stone-400 - Subtle
  faint: '#d6d3d1',          // Stone-300 - Faint
  
  // Borders - Warm subtle
  border: 'rgba(28, 25, 23, 0.1)',
  borderSubtle: 'rgba(28, 25, 23, 0.06)',
  divider: 'rgba(28, 25, 23, 0.04)',
  
  // Accent - Warm Orange/Terracotta
  accent: '#c2410c',         // Orange-700 - Primary accent
  accentHover: '#9a3412',    // Orange-800 - Hover/CTA
  accentDark: '#7c2d12',     // Orange-900 - Dark accent
  accentLight: '#ea580c',    // Orange-600 - Bright accent
  accentLighter: '#fdba74',  // Orange-300 - Highlights
  accentGlow: 'rgba(194, 65, 12, 0.15)',
  accentBorder: 'rgba(194, 65, 12, 0.2)',
  
  // Semantic colors (optimized for light bg)
  success: '#16a34a',        // Green-600
  successGlow: 'rgba(22, 163, 74, 0.1)',
  warning: '#d97706',        // Amber-600
  warningGlow: 'rgba(217, 119, 6, 0.1)',
  error: '#dc2626',          // Red-600
  errorGlow: 'rgba(220, 38, 38, 0.1)',
  info: '#2563eb',           // Blue-600
  infoGlow: 'rgba(37, 99, 235, 0.1)',
  
  // Gradients
  gradients: {
    hero: 'linear-gradient(135deg, #c2410c 0%, #ea580c 100%)',
    card: 'linear-gradient(180deg, #ffffff 0%, #fdfbf7 100%)',
    cta: 'linear-gradient(135deg, #9a3412 0%, #7c2d12 100%)',
    subtle: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(253,251,247,0.4) 100%)'
  },
  
  // Shadows - Warm, light
  shadows: {
    xs: '0 1px 2px rgba(28, 25, 23, 0.03)',
    sm: '0 1px 3px rgba(28, 25, 23, 0.05)',
    md: '0 2px 6px rgba(28, 25, 23, 0.06)',
    lg: '0 4px 12px rgba(28, 25, 23, 0.08)',
    xl: '0 8px 24px rgba(28, 25, 23, 0.1)',
    glow: '0 0 0 3px rgba(194, 65, 12, 0.1)',
    hover: '0 8px 24px rgba(28, 25, 23, 0.08)',
    cta: '0 2px 8px rgba(154, 52, 18, 0.25)'
  },
  
  // Navigation
  navBg: 'rgba(253, 251, 247, 0.9)',
  navBgScrolled: 'rgba(253, 251, 247, 0.98)',
  navBorder: 'rgba(28, 25, 23, 0.08)',
  
  // Footer
  footerBg: '#f5f3ef',
  footerBgGradient: 'linear-gradient(180deg, #f5f3ef 0%, #ece9e3 100%)',
  footerText: '#44403c',
  footerMuted: '#78716c',
  footerBorder: 'rgba(28, 25, 23, 0.1)',
  
  // Circuit Canvas specific
  circuit: {
    nodeFill: '#ffffff',
    nodeStroke: 'rgba(28, 25, 23, 0.12)',
    textPrimary: '#1c1917',
    textSecondary: 'rgba(28, 25, 23, 0.5)',
    traceStart: 'rgba(194, 65, 12, 0.2)',
    traceEnd: 'rgba(194, 65, 12, 0.3)',
    accentGlow: 'rgba(194, 65, 12, 0.2)',
    ballColor: '#ea580c',
    gridColor: '#1c1917',
    gridOpacity: 0.03,
    checkColor: '#16a34a',
    checkGlowStroke: 'rgba(22, 163, 74, 0.4)'
  }
};

// ============================================
// TERRACOTTA INK DARK THEME
// Dark theme with warm orange/terracotta accents
// Created: February 2026
// ============================================
export const terracottaInkDarkTheme = {
  // Backgrounds - Deep ink
  bg: '#0a0a0c',
  bgElevated: '#111113',
  bgAlternate: '#08080a',
  surface: '#18181b',
  surfaceElevated: '#1f1f23',
  
  // Text - Off-white (Zinc palette)
  text: '#fafafa',
  textSecondary: '#e4e4e7',
  muted: '#a1a1aa',
  subtle: '#71717a',
  faint: '#52525b',
  
  // Accent - Terracotta/Orange
  accent: '#ea580c',
  accentDarker: '#9a3412',
  accentDark: '#7c2d12',
  accentLight: '#fdba74',
  accentAmber: '#f59e0b',
  accentTint: 'rgba(234, 88, 12, 0.08)',
  accentGlow: 'rgba(234, 88, 12, 0.15)',
  accentBorder: 'rgba(234, 88, 12, 0.2)',
  
  // Borders
  border: 'rgba(63, 63, 70, 0.3)',
  borderSubtle: 'rgba(63, 63, 70, 0.15)',
  divider: 'rgba(63, 63, 70, 0.1)',
  
  // Gradients
  gradients: {
    hero: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
    subtle: 'linear-gradient(135deg, rgba(234, 88, 12, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
    card: 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)',
    cta: 'linear-gradient(135deg, #9a3412 0%, #7c2d12 100%)'
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
    ballColor: '#ea580c',
    gridColor: '#fff',
    gridOpacity: 0.025
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 12px rgba(0, 0, 0, 0.4)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.5)',
    xl: '0 12px 32px rgba(0, 0, 0, 0.6)',
    card: '0 4px 16px rgba(0, 0, 0, 0.3)',
    glow: '0 4px 16px rgba(234, 88, 12, 0.2)',
    hover: '0 8px 24px rgba(234, 88, 12, 0.15)',
    cta: '0 2px 12px rgba(154, 52, 18, 0.3)'
  },
  
  // Semantic colors
  success: '#22c55e',
  successGlow: 'rgba(34, 197, 94, 0.15)',
  warning: '#fbbf24',
  warningGlow: 'rgba(251, 191, 36, 0.15)',
  error: '#f87171',
  errorGlow: 'rgba(248, 113, 113, 0.15)',
  info: '#60a5fa',
  infoGlow: 'rgba(96, 165, 250, 0.15)'
};

// Export default theme (elevated dark)
export const defaultTheme = elevatedDarkTheme;
