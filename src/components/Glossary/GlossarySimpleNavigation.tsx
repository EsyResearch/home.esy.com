"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'white' }}>
          <Image 
            src="/esy-logo.png" 
            alt="Esy Logo" 
            width={36} 
            height={36}
            style={{ flexShrink: 0 }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 600, color: currentTheme.text }}>
              Esy
            </span>
            <span style={{ 
              fontSize: '0.75rem', 
              color: currentTheme.subtle,
              marginTop: '-0.1rem'
            }}>
              AI Research Assistant
            </span>
          </div>
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