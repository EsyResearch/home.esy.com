"use client";

import React from 'react';
import { Star, Award, TrendingUp } from 'lucide-react';

interface SocialProofSectionProps {
  currentTheme: {
    muted: string;
    subtle: string;
    accent: string;
    elevated: string;
  };
}

const SocialProofSection: React.FC<SocialProofSectionProps> = ({ currentTheme }) => {
  const institutions = [
    'MIT', 'Stanford', 'Oxford', 'Cambridge', 'Harvard', 'Yale'
  ];

  const testimonials = [
    {
      quote: "I cut my literature review time from 3 weeks to 4 days. My advisor asked what changed.",
      name: "Dr. Sarah Chen",
      title: "PhD Candidate, Neuroscience",
      institution: "Stanford University",
      verified: true
    },
    {
      quote: "Finally, a platform that treats prompt engineering with academic seriousness. Game changer.",
      name: "Prof. James Morrison",
      title: "Associate Professor, Economics",
      institution: "MIT Sloan School",
      verified: true
    },
    {
      quote: "The prompt library alone is worth the subscription. I've saved 50+ hours this semester.",
      name: "Dr. Maria Rodriguez",
      title: "Postdoctoral Researcher",
      institution: "Max Planck Institute",
      verified: true
    }
  ];

  const stats = [
    {
      icon: Star,
      value: '92%',
      label: 'Report better AI outputs in week 1'
    },
    {
      icon: Award,
      value: '4.9/5',
      label: 'Average rating after 30 days'
    },
    {
      icon: TrendingUp,
      value: 'Featured in',
      label: 'Nature, Science, The Chronicle'
    }
  ];

  return (
    <section id="social-proof" style={{ 
      padding: '8rem 0',
      backgroundColor: currentTheme.elevated
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: currentTheme.subtle,
            marginBottom: '2rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            Trusted by Researchers at
          </div>

          {/* University Logos */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '3rem',
            marginBottom: '1rem'
          }}>
            {institutions.map((inst, index) => (
              <div key={index} style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: currentTheme.subtle,
                opacity: 0.5,
                transition: 'opacity 0.3s ease',
                cursor: 'default',
                letterSpacing: '0.05em'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
              >
                {inst}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '5rem'
        }}>
          {testimonials.map((testimonial, index) => (
            <div key={index} style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${currentTheme.subtle}20`,
              borderRadius: '12px',
              padding: '2rem',
              transition: 'all 0.3s ease',
              position: 'relative',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.borderColor = `${currentTheme.accent}30`;
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              e.currentTarget.style.borderColor = `${currentTheme.subtle}20`;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              {/* Quote Mark */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1.5rem',
                fontSize: '4rem',
                color: `${currentTheme.accent}15`,
                lineHeight: 1,
                fontFamily: 'Georgia, serif'
              }}>
                &ldquo;
              </div>

              {/* Quote */}
              <p style={{
                fontSize: '1.0625rem',
                lineHeight: 1.7,
                color: 'white',
                marginBottom: '2rem',
                position: 'relative',
                zIndex: 1
              }}>
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Avatar Placeholder */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${currentTheme.accent}40 0%, ${currentTheme.accent}20 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: currentTheme.accent,
                  border: `2px solid ${currentTheme.accent}30`
                }}>
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'white',
                    marginBottom: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    {testimonial.name}
                    {testimonial.verified && (
                      <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: currentTheme.accent,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ fontSize: '10px', color: 'white' }}>✓</span>
                      </div>
                    )}
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: currentTheme.subtle,
                    lineHeight: 1.5
                  }}>
                    {testimonial.title}
                    <br />
                    {testimonial.institution}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div style={{
          borderTop: `1px solid ${currentTheme.subtle}20`,
          paddingTop: '4rem'
        }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
            textAlign: 'center'
          }}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index}>
                  <Icon size={32} color={currentTheme.accent} style={{ marginBottom: '1rem', display: 'inline-block' }} />
                  <div style={{
                    fontSize: '2.5rem',
                    fontWeight: 300,
                    color: 'white',
                    marginBottom: '0.5rem'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '1rem',
                    color: currentTheme.muted,
                    lineHeight: 1.5
                  }}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;

