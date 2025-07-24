"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  currentTheme: {
    muted: string;
    subtle: string;
    accent: string;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({ currentTheme }) => {
  return (
    <section id="hero" style={{ 
      paddingTop: '10rem', 
      paddingBottom: '6rem',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
        <div style={{ maxWidth: '820px' }}>
          <h1 style={{
            fontSize: '4rem',
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '3rem',
            fontFamily: 'var(--font-literata)'
          }}>
            Where breakthrough
            <br />
            research meets
            <br />
            <span style={{ fontWeight: 400 }}>artificial intelligence</span>
          </h1>
          
          <p style={{
            fontSize: '1.5rem',
            lineHeight: 1.6,
            color: currentTheme.muted,
            marginBottom: '3rem',
            maxWidth: '680px',
            fontFamily: 'var(--font-inter)'
          }}>
            Esy transforms how academics work with AI. Master prompt engineering, 
            access field-tested templates, and produce exceptional research—faster 
            than ever before.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <button style={{
              padding: '1rem 2rem',
              background: currentTheme.accent,
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'opacity 0.2s'
            }}>
              Request Early Access
              <ArrowRight size={18} strokeWidth={2} />
            </button>
            <span style={{
              fontSize: '0.938rem',
              color: currentTheme.subtle
            }}>
              Join 500+ researchers on the waitlist
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 