"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface TransformSectionProps {
  currentTheme: {
    muted: string;
    subtle: string;
    accent: string;
    border: string;
    text: string;
  };
}

const TransformSection: React.FC<TransformSectionProps> = ({ currentTheme }) => {
  return (
    <section id="transform" style={{ 
      padding: '8rem 0',
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem', width: '100%', textAlign: 'center' }}>
        <h2 style={{
          fontSize: '3.5rem',
          fontWeight: 300,
          letterSpacing: '-0.02em',
          marginBottom: '3rem'
        }}>
          Ready to transform
          <br />
          your research?
        </h2>

        <p style={{
          fontSize: '1.375rem',
          lineHeight: 1.7,
          color: currentTheme.muted,
          marginBottom: '4rem',
          maxWidth: '600px',
          margin: '0 auto 4rem'
        }}>
          Join the waitlist and be among the first to experience the future 
          of AI-powered academic work. Limited spots available.
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '2rem' }}>
          <button style={{
            padding: '1.125rem 2.5rem',
            background: currentTheme.accent,
            border: 'none',
            borderRadius: '6px',
            color: 'white',
            fontSize: '1.063rem',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            transition: 'opacity 0.2s'
          }}>
            Claim Your Spot
            <ArrowRight size={20} strokeWidth={2} />
          </button>
          <button style={{
            padding: '1.125rem 2.5rem',
            background: 'transparent',
            border: `1px solid ${currentTheme.border}`,
            borderRadius: '6px',
            color: currentTheme.text,
            fontSize: '1.063rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}>
            Watch Demo
          </button>
        </div>

        <p style={{
          fontSize: '0.938rem',
          color: currentTheme.subtle
        }}>
          No credit card required • Early access benefits • Cancel anytime
        </p>

        <div style={{
          marginTop: '6rem',
          paddingTop: '4rem',
          borderTop: `1px solid ${currentTheme.border}`
        }}>
          <blockquote style={{
            fontSize: '1.5rem',
            fontWeight: 300,
            lineHeight: 1.6,
            color: currentTheme.muted,
            margin: '0 auto',
            maxWidth: '600px'
          }}>
            &quot;The prompt templates alone would have saved me six months of 
            trial and error. This is game-changing.&quot;
          </blockquote>
          <cite style={{
            display: 'block',
            fontSize: '1rem',
            color: currentTheme.subtle,
            marginTop: '1.5rem',
            fontStyle: 'normal'
          }}>
            — Early Access User
          </cite>
        </div>
      </div>
    </section>
  );
};

export default TransformSection; 