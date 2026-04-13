"use client";
import React from 'react';
import Link from 'next/link';
import { Theme } from '@/types';

interface GlossarySimpleNavigationProps {
  scrolled: boolean;
  currentTheme: Theme;
}

const GlossarySimpleNavigation: React.FC<GlossarySimpleNavigationProps> = ({
  scrolled,
  currentTheme
}) => (
  <nav style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: scrolled ? 'rgba(10, 10, 15, 0.95)' : 'rgba(10, 10, 15, 0.8)',
    backdropFilter: 'blur(10px)',
    borderBottom: scrolled ? `1px solid ${currentTheme.border}` : '1px solid transparent',
    transition: 'all 0.3s ease'
  }}>
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1rem 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <span style={{
            fontFamily: 'var(--font-black-ops-one), sans-serif',
            fontSize: '1.75rem',
            letterSpacing: '0.03em',
            lineHeight: 1,
            userSelect: 'none',
          }}>
            <span style={{ color: '#00A896' }}>e</span>
            <span style={{ color: currentTheme.text }}>sy</span>
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link
            href="/"
            style={{
              padding: '0.5rem 1rem',
              background: 'transparent',
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '6px',
              color: currentTheme.subtle,
              fontSize: '0.875rem',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = currentTheme.elevated;
              e.currentTarget.style.color = currentTheme.text;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = currentTheme.subtle;
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

export default GlossarySimpleNavigation; 