// Centralized theme system for journal.esy.com
// This replaces scattered theme objects and provides a single source of truth

export interface Theme {
  // Core colors
  background: string;
  surface: string;
  elevated: string;
  accent: string;
  
  // Text colors
  text: string;
  textSecondary: string;
  textTertiary: string;
  textQuaternary: string;
  
  // UI colors
  border: string;
  borderHover: string;
  
  // Code colors
  code: string;
  codeBorder: string;
  
  // Status colors
  success: string;
  warning: string;
  error: string;
  
  // Gradients
  gradientPrimary: string;
  gradientDark: string;
  gradientGlow: string;
}

// Dark theme (primary theme)
export const darkTheme: Theme = {
  // Core colors
  background: '#0a0a0f',
  surface: '#16161f',
  elevated: '#1e1e2a',
  accent: '#8b5cf6',
  
  // Text colors
  text: 'rgba(255, 255, 255, 1)',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textTertiary: 'rgba(255, 255, 255, 0.5)',
  textQuaternary: 'rgba(255, 255, 255, 0.3)',
  
  // UI colors
  border: 'rgba(255, 255, 255, 0.08)',
  borderHover: 'rgba(255, 255, 255, 0.12)',
  
  // Code colors
  code: '#1e1e2e',
  codeBorder: 'rgba(255, 255, 255, 0.1)',
  
  // Status colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  
  // Gradients
  gradientPrimary: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  gradientDark: 'linear-gradient(180deg, #0a0a0f 0%, #16161f 100%)',
  gradientGlow: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
};

// Light theme (for future use)
export const lightTheme: Theme = {
  // Core colors
  background: '#ffffff',
  surface: '#f8f9fa',
  elevated: '#ffffff',
  accent: '#8b5cf6',
  
  // Text colors
  text: 'rgba(0, 0, 0, 1)',
  textSecondary: 'rgba(0, 0, 0, 0.7)',
  textTertiary: 'rgba(0, 0, 0, 0.5)',
  textQuaternary: 'rgba(0, 0, 0, 0.3)',
  
  // UI colors
  border: 'rgba(0, 0, 0, 0.08)',
  borderHover: 'rgba(0, 0, 0, 0.12)',
  
  // Code colors
  code: '#f8f9fa',
  codeBorder: 'rgba(0, 0, 0, 0.1)',
  
  // Status colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  
  // Gradients
  gradientPrimary: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  gradientDark: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
  gradientGlow: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
};

// Current theme (can be switched based on user preference)
export const currentTheme = darkTheme;

// Theme utility functions
export const getTheme = (): Theme => currentTheme;

// CSS-in-JS style helpers
export const createStyles = (theme: Theme) => ({
  // Common component styles
  card: {
    background: theme.surface,
    border: `1px solid ${theme.border}`,
    borderRadius: '8px',
    padding: '2rem',
    margin: '2rem 0',
  },
  
  codeBlock: {
    background: theme.code,
    border: `1px solid ${theme.codeBorder}`,
    borderRadius: '8px',
    margin: '2rem 0',
    overflow: 'hidden',
  },
  
  codeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: theme.surface,
    borderBottom: `1px solid ${theme.border}`,
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    color: theme.textSecondary,
  },
  
  codeContent: {
    padding: '1.5rem',
    color: theme.text,
    fontSize: '0.875rem',
    lineHeight: 1.6,
    background: 'none',
    whiteSpace: 'pre-wrap' as const,
    wordBreak: 'break-word' as const,
    overflow: 'auto' as const,
  },
  
  aside: {
    background: theme.surface,
    borderLeft: `4px solid ${theme.accent}`,
    borderRadius: '8px',
    color: theme.textSecondary,
    fontSize: '1rem',
    fontStyle: 'italic' as const,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: `1px solid ${theme.border}`,
  },
  
  pullQuote: {
    background: `${theme.accent}10`,
    borderRadius: '8px',
    fontSize: '1.25rem',
    fontStyle: 'italic' as const,
    color: theme.text,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: `1px solid ${theme.accent}20`,
  },
  
  marginNote: {
    background: theme.surface,
    borderLeft: `3px solid ${theme.border}`,
    borderRadius: '6px',
    color: theme.textSecondary,
    fontSize: '0.98rem',
    fontStyle: 'italic' as const,
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
    border: `1px solid ${theme.border}`,
  },
  
  nextArticle: {
    background: theme.surface,
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: `1px solid ${theme.border}`,
  },
  
  authorBox: {
    background: theme.surface,
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  
  // Chart styles
  chart: {
    background: theme.surface,
    border: `1px solid ${theme.border}`,
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  
  chartTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: theme.text,
    marginBottom: '1.5rem',
    textAlign: 'center' as const,
  },
  
  // Performance metrics
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '2rem',
    margin: '3rem 0',
    padding: '2rem',
    background: theme.surface,
    border: `1px solid ${theme.border}`,
    borderRadius: '8px',
  },
  
  metricItem: {
    textAlign: 'center' as const,
  },
  
  metricValue: {
    fontSize: '2.5rem',
    fontWeight: 300,
    color: theme.accent,
    fontFamily: 'Literata, Georgia, serif',
    marginBottom: '0.5rem',
  },
  
  metricLabel: {
    fontSize: '14px',
    color: theme.textTertiary,
  },
});

// Export the current theme and styles
export const theme = currentTheme;
export const styles = createStyles(currentTheme);
