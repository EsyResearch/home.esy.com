"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight, Play } from 'lucide-react';

interface HeroSectionProps {
  currentTheme: {
    muted: string;
    subtle: string;
    accent: string;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({ currentTheme }) => {
  const [researcherCount, setResearcherCount] = useState(2800);
  const [spotsRemaining, setSpotsRemaining] = useState(247);

  // Animated counter effect
  useEffect(() => {
    let start = 2800;
    const end = 2847;
    const duration = 2000;
    const increment = (end - start) / (duration / 50);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setResearcherCount(end);
        clearInterval(timer);
      } else {
        setResearcherCount(Math.floor(start));
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" style={{ 
      paddingTop: '10rem', 
      paddingBottom: '6rem',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
        <div style={{ maxWidth: '900px' }}>
          {/* Pattern Interrupt Stat */}
          <div style={{
            fontSize: '1rem',
            fontWeight: 500,
            color: currentTheme.subtle,
            marginBottom: '1rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            Research Productivity Crisis
          </div>

          <div style={{
            fontSize: '6rem',
            fontWeight: 200,
            color: currentTheme.muted,
            marginBottom: '2rem',
            lineHeight: 1,
            opacity: 0.3
          }}>
            40%
          </div>

          <div style={{
            fontSize: '1.5rem',
            fontWeight: 500,
            color: currentTheme.accent,
            marginBottom: '3rem',
            letterSpacing: '-0.01em'
          }}>
            Most researchers waste 40% of their time fighting with AI tools.
            <br />
            <span style={{ color: currentTheme.muted }}>The top 1% have learned something different.</span>
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontSize: '4.5rem',
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '2rem',
            fontFamily: 'var(--font-literata)',
            background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(255,255,255,0.7) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            They&apos;ve mastered the invisible skill that separates groundbreaking research from mediocre outputs.
          </h1>
          
          {/* Subheadline */}
          <p style={{
            fontSize: '1.375rem',
            lineHeight: 1.7,
            color: currentTheme.muted,
            marginBottom: '3rem',
            maxWidth: '750px',
            fontFamily: 'var(--font-inter)'
          }}>
            Esy teaches you what elite researchers already know: AI is only as good as your ability to direct it. Join the platform where prompt engineering meets academic rigor.
          </p>

          {/* CTA Cluster */}
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button style={{
              padding: '1.125rem 2.5rem',
              background: currentTheme.accent,
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '1.0625rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all 0.3s ease',
              boxShadow: `0 4px 20px ${currentTheme.accent}33`,
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 6px 30px ${currentTheme.accent}55`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 4px 20px ${currentTheme.accent}33`;
            }}
            >
              Unlock Early Access
              <ArrowRight size={20} strokeWidth={2.5} />
            </button>

            <button style={{
              padding: '1.125rem 2rem',
              background: 'transparent',
              border: `1px solid ${currentTheme.subtle}40`,
              borderRadius: '8px',
              color: currentTheme.muted,
              fontSize: '1.0625rem',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = currentTheme.accent;
              e.currentTarget.style.color = currentTheme.accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${currentTheme.subtle}40`;
              e.currentTarget.style.color = currentTheme.muted;
            }}
            >
              <Play size={18} fill="currentColor" />
              See How It Works
            </button>
          </div>

          {/* Social Proof */}
          <div style={{
            marginTop: '3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              fontSize: '0.9375rem',
              color: currentTheme.subtle,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <div style={{
                display: 'flex',
                marginRight: '0.5rem'
              }}>
                {[1,2,3,4].map((i) => (
                  <div key={i} style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${currentTheme.accent}40 0%, ${currentTheme.accent}20 100%)`,
                    border: '2px solid #121215',
                    marginLeft: i > 1 ? '-8px' : '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}>
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span style={{ fontWeight: 500, color: 'white' }}>
                {researcherCount.toLocaleString()}
              </span> researchers from{' '}
              <span style={{ fontWeight: 500, color: 'white' }}>340+</span> institutions waiting
            </div>
            
            <div style={{
              padding: '0.375rem 0.875rem',
              background: `${currentTheme.accent}15`,
              borderRadius: '20px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: currentTheme.accent,
              border: `1px solid ${currentTheme.accent}30`
            }}>
              {spotsRemaining} spots remaining
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
