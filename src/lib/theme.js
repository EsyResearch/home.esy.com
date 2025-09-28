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
  
  // Accent colors - Slightly lighter for accessibility
  accent: '#a78bfa',       // Violet-400 - More accessible
  accentHover: '#8b5cf6',  // Violet-500 - Original accent
  accentGlow: 'rgba(167, 139, 250, 0.15)',
  
  // Gradient overlays for depth
  gradientSubtle: 'linear-gradient(180deg, rgba(31, 31, 35, 0.4) 0%, rgba(24, 24, 27, 0.9) 40%, rgba(24, 24, 27, 1) 80%)',
  ambientGlow: 'radial-gradient(600px circle at 50% 0%, rgba(139, 92, 246, 0.02) 0%, transparent 100%)'
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
