"use client";

import React, { useState } from 'react';
import { Layers, TrendingUp, Users, Check, ChevronDown } from 'lucide-react';

interface SolutionSectionProps {
  currentTheme: {
    muted: string;
    subtle: string;
    accent: string;
  };
}

const SolutionSection: React.FC<SolutionSectionProps> = ({ currentTheme }) => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const layers = [
    {
      icon: Layers,
      number: '01',
      title: 'Precision Scaffolding',
      subtitle: 'Build prompts with academic rigor',
      description: 'Learn to build prompts with the same rigor you apply to experimental design.',
      features: [
        'Academic template library with 500+ field-tested prompts',
        'Field-specific frameworks for every discipline',
        'Peer-reviewed prompt patterns from published research'
      ],
      accentColor: '#3B82F6'
    },
    {
      icon: TrendingUp,
      number: '02',
      title: 'Iterative Intelligence',
      subtitle: 'Track, version, and optimize',
      description: 'Track what works. Version your prompts. Build a personal research toolkit.',
      features: [
        'Output quality scoring with academic standards',
        'Prompt version control and A/B testing',
        'Success pattern recognition using ML'
      ],
      accentColor: '#8B5CF6'
    },
    {
      icon: Users,
      number: '03',
      title: 'Collective Mastery',
      subtitle: 'Learn from 1000+ researchers',
      description: 'Access breakthroughs from 1000+ researchers. Contribute your own. Accelerate together.',
      features: [
        'Community prompt library with real-world results',
        'Expert-curated collections by field leaders',
        'Cross-disciplinary discovery and collaboration'
      ],
      accentColor: '#10B981'
    }
  ];

  return (
    <section id="solution" style={{ 
      padding: '8rem 0',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '6rem', maxWidth: '800px', margin: '0 auto 6rem' }}>
          <div style={{
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: currentTheme.accent,
            marginBottom: '1.5rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            The Esy Method
          </div>
          
          <h2 style={{
            fontSize: '3.5rem',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginBottom: '2rem',
            fontFamily: 'var(--font-literata)'
          }}>
            The 3-Layer Framework That Separates{' '}
            <span style={{ color: '#EF4444' }}>Amateur Prompting</span>{' '}
            from{' '}
            <span style={{ color: currentTheme.accent }}>Professional Research</span>
          </h2>
        </div>

        {/* Layer Cards */}
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {layers.map((layer, index) => {
            const Icon = layer.icon;
            const isExpanded = expandedCard === index;
            
            return (
              <div key={index} style={{
                background: isExpanded ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isExpanded ? layer.accentColor : `${currentTheme.subtle}20`}`,
                borderRadius: '16px',
                padding: '2.5rem',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onClick={() => setExpandedCard(isExpanded ? null : index)}
              onMouseEnter={(e) => {
                if (!isExpanded) {
                  e.currentTarget.style.borderColor = `${layer.accentColor}40`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isExpanded) {
                  e.currentTarget.style.borderColor = `${currentTheme.subtle}20`;
                }
              }}
              >
                {/* Background Gradient */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, ${layer.accentColor} 0%, transparent 100%)`,
                  opacity: isExpanded ? 1 : 0,
                  transition: 'opacity 0.3s ease'
                }} />

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
                  {/* Layer Number */}
                  <div style={{
                    fontSize: '4rem',
                    fontWeight: 200,
                    color: `${layer.accentColor}30`,
                    lineHeight: 1,
                    minWidth: '100px'
                  }}>
                    {layer.number}
                  </div>

                  <div style={{ flex: 1 }}>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: `${layer.accentColor}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `1px solid ${layer.accentColor}30`
                      }}>
                        <Icon size={24} color={layer.accentColor} />
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: '0.875rem',
                          color: currentTheme.subtle,
                          marginBottom: '0.25rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          fontWeight: 600
                        }}>
                          Layer {index + 1}
                        </div>
                        <h3 style={{
                          fontSize: '1.75rem',
                          fontWeight: 500,
                          letterSpacing: '-0.01em',
                          color: 'white'
                        }}>
                          {layer.title}
                        </h3>
                      </div>

                      <ChevronDown 
                        size={24} 
                        color={currentTheme.subtle}
                        style={{
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                          transition: 'transform 0.3s ease'
                        }}
                      />
                    </div>

                    {/* Subtitle */}
                    <p style={{
                      fontSize: '1.125rem',
                      color: currentTheme.muted,
                      marginBottom: '1.5rem',
                      lineHeight: 1.6
                    }}>
                      {layer.description}
                    </p>

                    {/* Features (Expanded State) */}
                    <div style={{
                      maxHeight: isExpanded ? '500px' : '0',
                      opacity: isExpanded ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'all 0.4s ease'
                    }}>
                      <div style={{
                        paddingTop: '1.5rem',
                        borderTop: `1px solid ${currentTheme.subtle}20`
                      }}>
                        {layer.features.map((feature, fIndex) => (
                          <div key={fIndex} style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.75rem',
                            marginBottom: '1rem'
                          }}>
                            <div style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              background: `${layer.accentColor}20`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              marginTop: '2px'
                            }}>
                              <Check size={14} color={layer.accentColor} strokeWidth={3} />
                            </div>
                            <span style={{
                              fontSize: '1rem',
                              color: currentTheme.muted,
                              lineHeight: 1.6
                            }}>
                              {feature}
                            </span>
                          </div>
                        ))}

                        <button style={{
                          marginTop: '1.5rem',
                          padding: '0.75rem 1.5rem',
                          background: `${layer.accentColor}15`,
                          border: `1px solid ${layer.accentColor}30`,
                          borderRadius: '6px',
                          color: layer.accentColor,
                          fontSize: '0.9375rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = layer.accentColor;
                          e.currentTarget.style.color = 'white';
                          e.stopPropagation();
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = `${layer.accentColor}15`;
                          e.currentTarget.style.color = layer.accentColor;
                        }}
                        onClick={(e) => e.stopPropagation()}
                        >
                          {index === 2 ? 'Explore Library →' : 'See Example →'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing Statement */}
        <div style={{
          marginTop: '6rem',
          textAlign: 'center',
          maxWidth: '700px',
          margin: '6rem auto 0'
        }}>
          <p style={{
            fontSize: '1.75rem',
            fontWeight: 300,
            lineHeight: 1.6,
            color: currentTheme.muted,
            fontFamily: 'var(--font-literata)',
            fontStyle: 'italic'
          }}>
            This isn&apos;t another AI tool.
            <br />
            <span style={{ color: 'white', fontWeight: 400 }}>
              It&apos;s a new operating system for academic thought.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;

