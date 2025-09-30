"use client";

import React from 'react';
import { ArrowRight, Clock, Target, Zap } from 'lucide-react';

interface ProblemSectionProps {
  currentTheme: {
    muted: string;
    subtle: string;
    accent: string;
    elevated: string;
  };
}

const ProblemSection: React.FC<ProblemSectionProps> = ({ currentTheme }) => {
  const transformations = [
    {
      icon: Clock,
      before: '8 hrs/week',
      after: '1 hr/week',
      label: 'On prompt iteration'
    },
    {
      icon: Target,
      before: '42%',
      after: '89%',
      label: 'Publication-ready outputs'
    },
    {
      icon: Zap,
      before: '6 different',
      after: 'One intelligent',
      label: 'Tools vs workflow'
    }
  ];

  return (
    <section id="problem" style={{ 
      padding: '8rem 0',
      backgroundColor: currentTheme.elevated,
      position: 'relative'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Empathy Hook */}
        <div style={{
          fontSize: '1.125rem',
          fontWeight: 500,
          color: currentTheme.subtle,
          marginBottom: '2rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          textAlign: 'center'
        }}>
          You&apos;ve felt this before
        </div>

        {/* Story Narrative */}
        <div style={{
          fontSize: '2rem',
          fontWeight: 300,
          lineHeight: 1.6,
          color: 'white',
          marginBottom: '3rem',
          textAlign: 'center',
          fontFamily: 'var(--font-literata)',
          letterSpacing: '-0.01em'
        }}>
          You spend <span style={{ color: currentTheme.accent, fontWeight: 400 }}>3 hours</span> crafting the perfect prompt.
          <br />
          The AI gives you <span style={{ color: '#EF4444' }}>garbage</span>. You refine it. Try again.
          <br />
          More garbage. You wonder if you&apos;re doing it wrong.
        </div>

        <div style={{
          fontSize: '1.5rem',
          fontWeight: 400,
          lineHeight: 1.7,
          color: currentTheme.muted,
          marginBottom: '4rem',
          textAlign: 'center',
          padding: '2rem',
          background: `${currentTheme.accent}10`,
          borderLeft: `3px solid ${currentTheme.accent}`,
          borderRadius: '8px'
        }}>
          You&apos;re not. You just haven&apos;t been taught the framework.
        </div>

        {/* The Real Cost */}
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 300,
          letterSpacing: '-0.02em',
          marginBottom: '2rem',
          textAlign: 'center',
          color: 'white'
        }}>
          The <span style={{ color: '#EF4444' }}>real cost</span>
        </h2>

        <div style={{
          fontSize: '1.25rem',
          lineHeight: 1.8,
          color: currentTheme.muted,
          marginBottom: '4rem',
          textAlign: 'center',
          maxWidth: '700px',
          margin: '0 auto 4rem'
        }}>
          It&apos;s not just wasted time. It&apos;s the <span style={{ fontWeight: 600, color: 'white' }}>research paper you didn&apos;t finish</span>. 
          The <span style={{ fontWeight: 600, color: 'white' }}>grant proposal that fell short</span>. 
          The <span style={{ fontWeight: 600, color: 'white' }}>colleague who published first</span>.
        </div>

        <div style={{
          fontSize: '1.125rem',
          lineHeight: 1.7,
          color: currentTheme.subtle,
          marginBottom: '5rem',
          textAlign: 'center',
          fontStyle: 'italic'
        }}>
          While you were fighting with ChatGPT, elite researchers were producing{' '}
          <span style={{ color: currentTheme.accent, fontWeight: 600 }}>publishable insights</span>{' '}
          in a fraction of the time.
        </div>

        {/* Transformation Stats */}
        <div style={{
          marginBottom: '3rem',
          textAlign: 'center',
          fontSize: '1.375rem',
          fontWeight: 500,
          color: 'white'
        }}>
          Here&apos;s what they know that you don&apos;t:
        </div>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {transformations.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} style={{
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${currentTheme.subtle}20`,
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'default',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = `${currentTheme.accent}40`;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.borderColor = `${currentTheme.subtle}20`;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <Icon size={32} color={currentTheme.accent} style={{ marginBottom: '1rem' }} />
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{
                    fontSize: '0.875rem',
                    color: currentTheme.subtle,
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Before Esy
                  </div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: '#EF4444',
                    marginBottom: '0.25rem'
                  }}>
                    {item.before}
                  </div>
                </div>

                <ArrowRight size={20} color={currentTheme.accent} style={{ margin: '0.75rem auto' }} />

                <div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: currentTheme.subtle,
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    After Esy
                  </div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: '#10B981',
                    marginBottom: '0.25rem'
                  }}>
                    {item.after}
                  </div>
                </div>

                <div style={{
                  fontSize: '0.9375rem',
                  color: currentTheme.muted,
                  marginTop: '1rem'
                }}>
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <button style={{
            padding: '1rem 2.5rem',
            background: 'transparent',
            border: `2px solid ${currentTheme.accent}`,
            borderRadius: '8px',
            color: currentTheme.accent,
            fontSize: '1.0625rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = currentTheme.accent;
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = currentTheme.accent;
          }}
          >
            I&apos;m ready to work smarter →
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
