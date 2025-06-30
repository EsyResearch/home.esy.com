"use client";

import React from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

interface NavigationProps {
  scrolled: boolean;
  currentTheme: {
    muted: string;
    border: string;
    accent: string;
  };
}

const Navigation: React.FC<NavigationProps> = ({ scrolled, currentTheme }) => {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backgroundColor: scrolled ? 'rgba(10, 10, 15, 0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: scrolled ? `1px solid ${currentTheme.border}` : '1px solid transparent',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
            <Link href="/" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.875rem', 
              textDecoration: 'none', 
              color: 'white' 
            }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: currentTheme.accent, 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <BookOpen size={20} color="white" strokeWidth={1.5} />
              </div>
              <span style={{ 
                fontSize: '1.25rem', 
                fontWeight: 600, 
                letterSpacing: '-0.02em' 
              }}>esy</span>
            </Link>

            <nav style={{ display: 'flex', gap: '2.5rem' }}>
              <a href="/write" style={{ 
                color: currentTheme.muted, 
                textDecoration: 'none',
                fontSize: '0.938rem',
                transition: 'color 0.2s'
              }}>
                Write
              </a>
              <a href="/prompts" style={{ 
                color: currentTheme.muted, 
                textDecoration: 'none',
                fontSize: '0.938rem',
                transition: 'color 0.2s'
              }}>
                Prompts
              </a>
              <a href="/learn" style={{ 
                color: currentTheme.muted, 
                textDecoration: 'none',
                fontSize: '0.938rem',
                transition: 'color 0.2s'
              }}>
                Learn
              </a>
              <a href="/about" style={{ 
                color: 'white', 
                textDecoration: 'none',
                fontSize: '0.938rem',
                fontWeight: 500
              }}>
                About
              </a>
            </nav>
          </div>

          <button style={{
            padding: '0.625rem 1.5rem',
            background: currentTheme.accent,
            border: 'none',
            borderRadius: '6px',
            color: 'white',
            fontSize: '0.938rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'opacity 0.2s'
          }}>
            Get Early Access
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 