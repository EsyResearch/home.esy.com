"use client";

import React from 'react';

interface Benefit {
  metric: string;
  title: string;
  description: string;
}

interface ProblemSectionProps {
  currentTheme: {
    muted: string;
    subtle: string;
    accent: string;
    elevated: string;
  };
  benefits: Benefit[];
}

const ProblemSection: React.FC<ProblemSectionProps> = ({ currentTheme, benefits }) => {
  return (
    <section id="problem" style={{ 
      padding: '8rem 0',
      backgroundColor: currentTheme.elevated
    }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem' }}>
        <h2 style={{
          fontSize: '3rem',
          fontWeight: 300,
          letterSpacing: '-0.02em',
          marginBottom: '4rem',
          textAlign: 'center'
        }}>
          The hidden cost of
          <br />
          <span style={{ color: currentTheme.muted }}>AI trial and error</span>
        </h2>

        <div style={{
          fontSize: '1.25rem',
          lineHeight: 1.8,
          color: currentTheme.muted,
          marginBottom: '4rem',
          textAlign: 'center'
        }}>
          Every researcher using AI faces the same struggle: hours spent crafting 
          prompts, inconsistent results, and the nagging feeling they&apos;re only 
          scratching the surface of what&apos;s possible.
        </div>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '3rem'
        }}>
          {benefits.map((benefit, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 300,
                color: currentTheme.accent,
                marginBottom: '0.75rem'
              }}>
                {benefit.metric}
              </div>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 500,
                marginBottom: '0.5rem'
              }}>
                {benefit.title}
              </h3>
              <p style={{
                fontSize: '0.875rem',
                color: currentTheme.subtle
              }}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection; 