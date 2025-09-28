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

// Export default theme (elevated dark)
export const defaultTheme = elevatedDarkTheme;
