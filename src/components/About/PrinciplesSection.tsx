"use client";

import React from 'react';

interface Principle {
  number: string;
  title: string;
  description: string;
}

interface PrinciplesSectionProps {
  currentTheme: {
    muted: string;
    faint: string;
  };
  principles: Principle[];
}

const PrinciplesSection: React.FC<PrinciplesSectionProps> = ({ currentTheme, principles }) => {
  return (
    <section id="principles" style={{ 
      padding: '8rem 0',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
        <h2 style={{
          fontSize: '3rem',
          fontWeight: 300,
          letterSpacing: '-0.02em',
          marginBottom: '6rem',
          maxWidth: '720px'
        }}>
          A new philosophy for
          <br />
          academic AI collaboration
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {principles.map((principle, index) => (
            <div key={index} style={{ 
              display: 'grid',
              gridTemplateColumns: '120px 1fr',
              gap: '3rem',
              maxWidth: '900px'
            }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: 300,
                color: currentTheme.faint,
                lineHeight: 1
              }}>
                {principle.number}
              </div>
              <div>
                <h3 style={{
                  fontSize: '1.75rem',
                  fontWeight: 400,
                  marginBottom: '1.5rem',
                  letterSpacing: '-0.01em'
                }}>
                  {principle.title}
                </h3>
                <p style={{
                  fontSize: '1.125rem',
                  lineHeight: 1.8,
                  color: currentTheme.muted
                }}>
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection; 