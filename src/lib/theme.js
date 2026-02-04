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
// WARM ACADEMIC LIGHT THEME (Terracotta)
// Legacy - Premium light theme with cream/parchment tones
// Created: February 2026
// Status: Archived - kept for reference
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
  text: '#1c1917',
  textSecondary: '#44403c',
  muted: '#78716c',
  subtle: '#a8a29e',
  faint: '#d6d3d1',
  
  // Borders - Warm subtle
  border: 'rgba(28, 25, 23, 0.1)',
  borderSubtle: 'rgba(28, 25, 23, 0.06)',
  divider: 'rgba(28, 25, 23, 0.04)',
  
  // Accent - Warm Orange/Terracotta
  accent: '#c2410c',
  accentHover: '#9a3412',
  accentDark: '#7c2d12',
  accentLight: '#ea580c',
  accentLighter: '#fdba74',
  accentGlow: 'rgba(194, 65, 12, 0.15)',
  accentBorder: 'rgba(194, 65, 12, 0.2)',
  
  // Semantic colors
  success: '#16a34a',
  successGlow: 'rgba(22, 163, 74, 0.1)',
  warning: '#d97706',
  warningGlow: 'rgba(217, 119, 6, 0.1)',
  error: '#dc2626',
  errorGlow: 'rgba(220, 38, 38, 0.1)',
  info: '#2563eb',
  infoGlow: 'rgba(37, 99, 235, 0.1)',
  
  // Gradients
  gradients: {
    hero: 'linear-gradient(135deg, #c2410c 0%, #ea580c 100%)',
    card: 'linear-gradient(180deg, #ffffff 0%, #fdfbf7 100%)',
    cta: 'linear-gradient(135deg, #9a3412 0%, #7c2d12 100%)',
    subtle: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(253,251,247,0.4) 100%)'
  },
  
  // Shadows
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
// VIOLET MIST LIGHT THEME
// Premium light theme with subtle violet tinting
// Created: February 2026
// Status: Active
// 
// Color Theory Foundation:
// - Subtle violet-tinted backgrounds create brand cohesion
// - Slate text palette (cool undertones) complements violet
// - Section delimitation through varying violet intensity
// - WCAG AA compliant contrast ratios throughout
// ============================================
export const violetMistLightTheme = {
  // Backgrounds - Subtle violet-tinted whites
  bg: '#faf8ff',                    // Very subtle violet tint
  bgElevated: '#ffffff',            // Pure white for cards
  bgAlternate: '#f5f3ff',           // Slightly more violet
  surface: '#ffffff',
  surfaceElevated: '#fefcff',       // Warmest white with violet hint
  hover: 'rgba(124, 58, 237, 0.04)',
  
  // Section backgrounds
  sections: {
    hero: 'linear-gradient(180deg, #faf8ff 0%, #f5f3ff 100%)',
    templates: '#f8fafc',
    howItWorks: 'linear-gradient(180deg, #fefcff 0%, #faf8ff 100%)',
    gallery: '#f1f5f9',
    finalCta: 'linear-gradient(180deg, #faf8ff 0%, #ede9fe 100%)',
    footer: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)'
  },
  
  // Text - Cool Slate palette (complements violet)
  text: '#0f172a',                  // Slate-900 - near black
  textSecondary: '#334155',         // Slate-700
  muted: '#64748b',                 // Slate-500
  subtle: '#94a3b8',                // Slate-400
  faint: '#cbd5e1',                 // Slate-300
  
  // Borders - Cool subtle
  border: 'rgba(15, 23, 42, 0.08)',
  borderSubtle: 'rgba(15, 23, 42, 0.05)',
  divider: 'rgba(15, 23, 42, 0.04)',
  
  // Accent - Violet optimized for light backgrounds
  accent: '#7c3aed',                // Violet-600
  accentHover: '#6d28d9',           // Violet-700
  accentDark: '#5b21b6',            // Violet-800 - for CTAs
  accentDarkest: '#4c1d95',         // Violet-900
  accentLight: '#a78bfa',           // Violet-400
  accentLighter: '#c4b5fd',         // Violet-300
  accentGlow: 'rgba(124, 58, 237, 0.1)',
  accentBorder: 'rgba(124, 58, 237, 0.15)',
  
  // Semantic colors
  success: '#16a34a',
  successGlow: 'rgba(22, 163, 74, 0.1)',
  warning: '#d97706',
  warningGlow: 'rgba(217, 119, 6, 0.1)',
  error: '#dc2626',
  errorGlow: 'rgba(220, 38, 38, 0.1)',
  info: '#2563eb',
  infoGlow: 'rgba(37, 99, 235, 0.1)',
  
  // Gradients - Violet spectrum
  gradients: {
    hero: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
    card: 'linear-gradient(180deg, #ffffff 0%, #faf8ff 100%)',
    cta: 'linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%)',
    subtle: 'linear-gradient(135deg, rgba(124, 58, 237, 0.06) 0%, rgba(139, 92, 246, 0.03) 100%)'
  },
  
  // Shadows - Cool violet-tinted
  shadows: {
    xs: '0 1px 2px rgba(124, 58, 237, 0.03)',
    sm: '0 1px 3px rgba(15, 23, 42, 0.05)',
    md: '0 2px 6px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(124, 58, 237, 0.04)',
    lg: '0 4px 12px rgba(15, 23, 42, 0.08), 0 2px 4px rgba(124, 58, 237, 0.04)',
    xl: '0 8px 24px rgba(124, 58, 237, 0.1), 0 4px 8px rgba(15, 23, 42, 0.06)',
    glow: '0 0 0 3px rgba(124, 58, 237, 0.1)',
    hover: '0 8px 32px rgba(124, 58, 237, 0.12)',
    cta: '0 4px 16px rgba(91, 33, 182, 0.25)'
  },
  
  // Navigation
  navBg: 'rgba(250, 248, 255, 0.9)',
  navBgScrolled: 'rgba(250, 248, 255, 0.98)',
  navBorder: 'rgba(124, 58, 237, 0.08)',
  
  // Footer
  footerBg: '#f8fafc',
  footerBgGradient: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
  footerText: '#334155',
  footerMuted: '#64748b',
  footerBorder: 'rgba(15, 23, 42, 0.08)',
  
  // Circuit Canvas specific
  circuit: {
    nodeFill: '#ffffff',
    nodeStroke: 'rgba(124, 58, 237, 0.1)',
    textPrimary: '#0f172a',
    textSecondary: 'rgba(15, 23, 42, 0.5)',
    traceStart: 'rgba(124, 58, 237, 0.15)',
    traceEnd: 'rgba(124, 58, 237, 0.25)',
    accentGlow: 'rgba(124, 58, 237, 0.2)',
    ballColor: '#7c3aed',
    gridColor: '#0f172a',
    gridOpacity: 0.03,
    checkColor: '#16a34a',
    checkGlowStroke: 'rgba(22, 163, 74, 0.5)'
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

// ============================================
// NAVY CALM LIGHT THEME
// Professional academic theme with deep navy primary
// Created: February 2026
// Status: Active
// 
// Design Philosophy:
// - Authority without coldness: Navy provides intellectual gravitas
// - Academic credibility: Mirrors scholarly publishing
// - Trust-first: Colors reinforce "reliable, auditable artifacts"
// - Calm professionalism: Reduced visual noise, content-focused
// ============================================
export const navyCalmLightTheme = {
  // Backgrounds - Clean whites for readability
  bg: '#FFFFFF',
  bgAlt: '#F8F9FA',
  bgElevated: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceElevated: '#F8F9FA',
  hover: 'rgba(10, 37, 64, 0.04)',
  
  // Section backgrounds
  sections: {
    hero: '#FFFFFF',
    templates: '#F8F9FA',
    howItWorks: '#0A2540',      // Navy - dark section
    gallery: '#FFFFFF',
    finalCta: '#0A2540',         // Navy - dark section
    footer: '#0A2540'
  },
  
  // Text - Professional hierarchy
  text: '#333333',
  textSecondary: '#6C757D',
  muted: '#8E9AAF',
  subtle: '#ADB5BD',
  faint: '#CED4DA',
  
  // Primary - Deep Navy
  primary: '#0A2540',
  primaryLight: '#0F3460',
  primaryDark: '#061527',
  
  // Accent - Teal (for CTAs, links, interactive elements)
  accent: '#00A896',
  accentHover: '#00D4AA',
  accentDark: '#008F7A',
  accentLight: '#5EEAD4',
  accentTint: 'rgba(0, 168, 150, 0.08)',
  accentGlow: 'rgba(0, 168, 150, 0.15)',
  accentBorder: 'rgba(0, 168, 150, 0.2)',
  
  // Success - Emerald (for verification, completed states)
  success: '#2A9D8F',
  successLight: '#3AB4A5',
  successGlow: 'rgba(42, 157, 143, 0.15)',
  
  // Premium - Gold (for quality badges)
  premium: '#D4A017',
  premiumLight: '#E8B92E',
  premiumGlow: 'rgba(212, 160, 23, 0.15)',
  
  // Semantic colors
  warning: '#F59E0B',
  warningGlow: 'rgba(245, 158, 11, 0.1)',
  error: '#EF4444',
  errorGlow: 'rgba(239, 68, 68, 0.1)',
  info: '#3B82F6',
  infoGlow: 'rgba(59, 130, 246, 0.1)',
  
  // Borders
  border: '#E9ECEF',
  borderStrong: '#DEE2E6',
  borderSubtle: 'rgba(10, 37, 64, 0.06)',
  divider: 'rgba(10, 37, 64, 0.08)',
  
  // Gradients
  gradients: {
    hero: 'linear-gradient(135deg, #00A896 0%, #00D4AA 100%)',
    card: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)',
    cta: 'linear-gradient(135deg, #00A896 0%, #008F7A 100%)',
    subtle: 'linear-gradient(180deg, rgba(10, 37, 64, 0.02) 0%, rgba(10, 37, 64, 0.04) 100%)',
    navy: 'linear-gradient(135deg, #0A2540 0%, #0F3460 100%)'
  },
  
  // Shadows - Navy-tinted
  shadows: {
    xs: '0 1px 2px rgba(10, 37, 64, 0.04)',
    sm: '0 1px 3px rgba(10, 37, 64, 0.06)',
    md: '0 4px 12px rgba(10, 37, 64, 0.08)',
    lg: '0 8px 24px rgba(10, 37, 64, 0.1)',
    xl: '0 12px 32px rgba(10, 37, 64, 0.12)',
    glow: '0 0 0 3px rgba(0, 168, 150, 0.15)',
    hover: '0 8px 24px rgba(10, 37, 64, 0.12)',
    cta: '0 4px 16px rgba(0, 168, 150, 0.25)'
  },
  
  // Navigation
  navBg: 'rgba(255, 255, 255, 0.95)',
  navBgScrolled: 'rgba(255, 255, 255, 0.98)',
  navBorder: 'rgba(10, 37, 64, 0.08)',
  
  // Footer (Navy background)
  footerBg: '#0A2540',
  footerBgGradient: 'linear-gradient(180deg, #0A2540 0%, #061527 100%)',
  footerText: '#FFFFFF',
  footerMuted: 'rgba(255, 255, 255, 0.7)',
  footerSubtle: 'rgba(255, 255, 255, 0.5)',
  footerBorder: 'rgba(255, 255, 255, 0.1)',
  
  // Circuit Canvas specific
  circuit: {
    nodeFill: '#FFFFFF',
    nodeStroke: 'rgba(10, 37, 64, 0.1)',
    textPrimary: '#333333',
    textSecondary: '#6C757D',
    traceStart: 'rgba(0, 168, 150, 0.15)',
    traceEnd: 'rgba(0, 168, 150, 0.3)',
    accentGlow: 'rgba(0, 168, 150, 0.2)',
    ballColor: '#00A896',
    gridColor: '#0A2540',
    gridOpacity: 0.03,
    checkColor: '#2A9D8F',
    checkGlowStroke: 'rgba(42, 157, 143, 0.4)'
  }
};

// ============================================
// NAVY CALM DARK THEME
// Dark mode variant with navy foundation
// Created: February 2026
// ============================================
export const navyCalmDarkTheme = {
  // Backgrounds - Deep navy
  bg: '#0A2540',
  bgAlt: '#061527',
  bgElevated: '#0F3460',
  surface: '#0F3460',
  surfaceElevated: '#143D6B',
  hover: 'rgba(0, 168, 150, 0.08)',
  
  // Text - White hierarchy
  text: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.85)',
  muted: 'rgba(255, 255, 255, 0.7)',
  subtle: 'rgba(255, 255, 255, 0.5)',
  faint: 'rgba(255, 255, 255, 0.3)',
  
  // Primary - Navy (for dark mode, teal becomes primary accent)
  primary: '#00A896',
  primaryLight: '#00D4AA',
  primaryDark: '#008F7A',
  
  // Accent - Teal (brighter for dark backgrounds)
  accent: '#00D4AA',
  accentHover: '#5EEAD4',
  accentDark: '#00A896',
  accentLight: '#99F6E4',
  accentTint: 'rgba(0, 212, 170, 0.1)',
  accentGlow: 'rgba(0, 212, 170, 0.2)',
  accentBorder: 'rgba(0, 212, 170, 0.25)',
  
  // Success - Emerald (brighter)
  success: '#3AB4A5',
  successLight: '#5EEAD4',
  successGlow: 'rgba(58, 180, 165, 0.2)',
  
  // Premium - Gold (brighter)
  premium: '#E8B92E',
  premiumLight: '#FCD34D',
  premiumGlow: 'rgba(232, 185, 46, 0.2)',
  
  // Semantic colors
  warning: '#FBBF24',
  warningGlow: 'rgba(251, 191, 36, 0.15)',
  error: '#F87171',
  errorGlow: 'rgba(248, 113, 113, 0.15)',
  info: '#60A5FA',
  infoGlow: 'rgba(96, 165, 250, 0.15)',
  
  // Borders
  border: 'rgba(255, 255, 255, 0.1)',
  borderStrong: 'rgba(255, 255, 255, 0.15)',
  borderSubtle: 'rgba(255, 255, 255, 0.06)',
  divider: 'rgba(255, 255, 255, 0.05)',
  
  // Gradients
  gradients: {
    hero: 'linear-gradient(135deg, #00D4AA 0%, #5EEAD4 100%)',
    card: 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)',
    cta: 'linear-gradient(135deg, #00A896 0%, #008F7A 100%)',
    subtle: 'linear-gradient(135deg, rgba(0, 212, 170, 0.1) 0%, rgba(0, 168, 150, 0.05) 100%)',
    navy: 'linear-gradient(135deg, #0F3460 0%, #0A2540 100%)'
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 12px rgba(0, 0, 0, 0.4)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.5)',
    xl: '0 12px 32px rgba(0, 0, 0, 0.6)',
    card: '0 4px 16px rgba(0, 0, 0, 0.3)',
    glow: '0 4px 16px rgba(0, 212, 170, 0.2)',
    hover: '0 8px 24px rgba(0, 212, 170, 0.15)',
    cta: '0 4px 16px rgba(0, 168, 150, 0.3)'
  },
  
  // Navigation (dark)
  navBg: 'rgba(10, 37, 64, 0.95)',
  navBgScrolled: 'rgba(10, 37, 64, 0.98)',
  navBorder: 'rgba(255, 255, 255, 0.08)',
  
  // Circuit Canvas specific
  circuit: {
    nodeFill: 'rgba(15, 52, 96, 0.9)',
    nodeStroke: 'rgba(0, 212, 170, 0.2)',
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    traceStart: 'rgba(0, 212, 170, 0.2)',
    traceEnd: 'rgba(0, 212, 170, 0.4)',
    accentGlow: 'rgba(0, 212, 170, 0.3)',
    ballColor: '#00D4AA',
    gridColor: '#FFFFFF',
    gridOpacity: 0.03,
    checkColor: '#3AB4A5',
    checkGlowStroke: 'rgba(58, 180, 165, 0.5)'
  }
};

// Export default theme (elevated dark)
export const defaultTheme = elevatedDarkTheme;
