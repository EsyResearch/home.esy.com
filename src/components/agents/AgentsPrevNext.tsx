"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { NavItem } from '@/lib/agents-navigation';
import { navyCalmDarkTheme } from '@/lib/theme';

// Light theme
const lightTheme = {
  bg: '#FFFFFF',
  surface: '#F8FAFC',
  elevated: '#F1F5F9',
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  border: 'rgba(10, 37, 64, 0.08)',
  borderHover: 'rgba(10, 37, 64, 0.12)',
  accent: '#00A896',
};

// Dark theme
const darkTheme = {
  bg: navyCalmDarkTheme.bg,
  surface: navyCalmDarkTheme.surface,
  elevated: navyCalmDarkTheme.bgElevated,
  text: navyCalmDarkTheme.text,
  muted: navyCalmDarkTheme.muted,
  subtle: navyCalmDarkTheme.subtle,
  border: navyCalmDarkTheme.border,
  borderHover: navyCalmDarkTheme.borderStrong,
  accent: navyCalmDarkTheme.accent,
};

interface AgentsPrevNextProps {
  prev: NavItem | null;
  next: NavItem | null;
}

export function AgentsPrevNext({ prev, next }: AgentsPrevNextProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const storedTheme = localStorage.getItem('theme-agents');
      setIsDarkMode(storedTheme === 'dark');
    };
    
    checkTheme();
    window.addEventListener('themechange', checkTheme);
    return () => window.removeEventListener('themechange', checkTheme);
  }, []);

  const theme = isDarkMode ? darkTheme : lightTheme;

  if (!prev && !next) return null;

  return (
    <nav 
      aria-label="Page navigation"
      style={{
        display: 'grid',
        gridTemplateColumns: prev && next ? '1fr 1fr' : '1fr',
        gap: '1rem',
        marginTop: '4rem',
        paddingTop: '2rem',
        borderTop: `1px solid ${theme.border}`,
      }}
    >
      {prev && (
        <Link
          href={prev.href}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 1.25rem',
            background: theme.surface,
            border: `1px solid ${theme.border}`,
            borderRadius: '10px',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = theme.borderHover;
            e.currentTarget.style.background = theme.elevated;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = theme.border;
            e.currentTarget.style.background = theme.surface;
          }}
        >
          <ChevronLeft className="w-5 h-5" style={{ color: theme.subtle, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '0.6875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: theme.subtle,
              marginBottom: '0.25rem',
            }}>
              Previous
            </div>
            <div style={{
              fontSize: '0.9375rem',
              fontWeight: 500,
              color: theme.text,
              letterSpacing: '-0.01em',
            }}>
              {prev.title}
            </div>
          </div>
        </Link>
      )}
      
      {next && (
        <Link
          href={next.href}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 1.25rem',
            background: theme.surface,
            border: `1px solid ${theme.border}`,
            borderRadius: '10px',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            marginLeft: prev ? 0 : 'auto',
            textAlign: 'right',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = theme.borderHover;
            e.currentTarget.style.background = theme.elevated;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = theme.border;
            e.currentTarget.style.background = theme.surface;
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '0.6875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: theme.subtle,
              marginBottom: '0.25rem',
            }}>
              Next
            </div>
            <div style={{
              fontSize: '0.9375rem',
              fontWeight: 500,
              color: theme.text,
              letterSpacing: '-0.01em',
            }}>
              {next.title}
            </div>
          </div>
          <ChevronRight className="w-5 h-5" style={{ color: theme.subtle, flexShrink: 0 }} />
        </Link>
      )}
    </nav>
  );
}

export default AgentsPrevNext;
