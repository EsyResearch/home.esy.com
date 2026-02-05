"use client";

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { NavItem } from '@/lib/agents-navigation';

const theme = {
  bg: '#0f0f12',
  surface: '#18181b',
  elevated: '#1f1f24',
  text: '#fafafa',
  muted: 'rgba(250, 250, 250, 0.7)',
  subtle: 'rgba(250, 250, 250, 0.45)',
  border: 'rgba(250, 250, 250, 0.06)',
  borderHover: 'rgba(250, 250, 250, 0.12)',
  accent: '#00A896',
};

interface AgentsPrevNextProps {
  prev: NavItem | null;
  next: NavItem | null;
}

export function AgentsPrevNext({ prev, next }: AgentsPrevNextProps) {
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
