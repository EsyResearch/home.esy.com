"use client";

import React from 'react';
import { 
  Search, 
  Layers, 
  Feather, 
  BookOpen,
  Users,
  GraduationCap,
  Lightbulb,
  PenTool
} from 'lucide-react';

const AboutPage = () => {
  const theme = {
    bg: '#121215',
    elevated: '#1a1a1f',
    text: 'rgba(255, 255, 255, 0.95)',
    muted: 'rgba(255, 255, 255, 0.75)',
    subtle: 'rgba(255, 255, 255, 0.55)',
    faint: 'rgba(255, 255, 255, 0.25)',
    accent: '#3B82F6',
    border: 'rgba(255, 255, 255, 0.08)'
  };

  const differentiators = [
    {
      title: 'Research-driven, not prompt-driven',
      description: 'Esy emphasizes context, sources, and reasoning over one-shot generation.'
    },
    {
      title: 'Visual essays and scrollytelling',
      description: 'Essays can integrate images, structure, and narrative flow to communicate ideas more effectively.'
    },
    {
      title: 'Human-led, AI-assisted',
      description: 'AI is used to support thinking, exploration, and refinement — never to replace authorship.'
    },
    {
      title: 'Editorial integrity',
      description: 'Accuracy, citations, and transparency matter. Esy is built for credibility, not content farms.'
    }
  ];

  const capabilities = [
    { icon: Search, text: 'Research complex topics with structured workflows' },
    { icon: Layers, text: 'Organize sources, arguments, and narratives' },
    { icon: Feather, text: 'Develop essays with clarity and depth' },
    { icon: BookOpen, text: 'Create visual and scrollytelling essays where form enhances meaning' },
    { icon: Lightbulb, text: 'Use AI as a research and thinking tool — not a shortcut' }
  ];

  const audiences = [
    { icon: PenTool, text: 'Writers and independent researchers' },
    { icon: GraduationCap, text: 'Students who want to learn how to think and write better' },
    { icon: Users, text: 'Educators exploring new forms of essay-based learning' },
    { icon: BookOpen, text: 'Creators producing long-form, visual, or research-heavy essays' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.bg,
      color: theme.text,
      fontFamily: 'var(--font-inter)'
    }}>
      {/* Hero Section */}
      <section style={{
        padding: '10rem 2rem 6rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 300,
          marginBottom: '2.5rem',
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          fontFamily: 'var(--font-literata)'
        }}>
          About Esy
        </h1>

        <p style={{
          fontSize: '1.375rem',
          lineHeight: 1.8,
          color: theme.muted,
          marginBottom: '1.75rem',
          fontWeight: 400
        }}>
          Esy is a research-first writing platform built for people who think deeply and write seriously.
        </p>

        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.85,
          color: theme.subtle,
          marginBottom: '1.5rem'
        }}>
          We focus on essays as a medium for understanding — not just text generation, but research, 
          structure, visual storytelling, and intellectual clarity. Esy is designed to support the 
          full writing process: from idea formation and research, to synthesis, composition, and presentation.
        </p>

        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.85,
          color: theme.subtle
        }}>
          Rather than replacing the writer, Esy augments the way ideas are explored, organized, and expressed.
        </p>
      </section>

      {/* What Esy is For */}
      <section style={{
        padding: '5rem 2rem',
        backgroundColor: theme.elevated,
        borderTop: `1px solid ${theme.border}`,
        borderBottom: `1px solid ${theme.border}`
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 400,
            marginBottom: '2.5rem',
            letterSpacing: '-0.01em',
            fontFamily: 'var(--font-literata)'
          }}>
            What Esy is for
          </h2>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.muted,
            marginBottom: '2.5rem'
          }}>
            Esy helps you:
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            {capabilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    border: `1px solid ${theme.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.02)'
                  }}>
                    <Icon size={18} color={theme.subtle} strokeWidth={1.5} />
                  </div>
                  <p style={{
                    fontSize: '1.0625rem',
                    lineHeight: 1.7,
                    color: theme.muted,
                    paddingTop: '0.5rem'
                  }}>
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.subtle,
            marginTop: '2.5rem',
            paddingTop: '2rem',
            borderTop: `1px solid ${theme.border}`
          }}>
            The platform is built around process, not output. Essays produced with Esy are meant to be read, understood, and trusted.
          </p>
        </div>
      </section>

      {/* What Makes Esy Different */}
      <section style={{
        padding: '6rem 2rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 400,
          marginBottom: '3.5rem',
          letterSpacing: '-0.01em',
          fontFamily: 'var(--font-literata)'
        }}>
          What makes Esy different
        </h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '3rem'
        }}>
          {differentiators.map((item, index) => (
            <div key={index} style={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr',
              gap: '1.5rem',
              alignItems: 'start'
            }}>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: 300,
                color: theme.faint,
                paddingTop: '0.125rem'
              }}>
                {String(index + 1).padStart(2, '0')}
              </div>
              <div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.01em',
                  color: theme.text
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '1.0625rem',
                  lineHeight: 1.8,
                  color: theme.subtle
                }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who Esy is For */}
      <section style={{
        padding: '5rem 2rem',
        backgroundColor: theme.elevated,
        borderTop: `1px solid ${theme.border}`,
        borderBottom: `1px solid ${theme.border}`
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 400,
            marginBottom: '2.5rem',
            letterSpacing: '-0.01em',
            fontFamily: 'var(--font-literata)'
          }}>
            Who Esy is for
          </h2>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.muted,
            marginBottom: '2rem'
          }}>
            Esy is used by:
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.5rem'
          }}>
            {audiences.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1.25rem',
                  borderRadius: '12px',
                  border: `1px solid ${theme.border}`,
                  backgroundColor: 'rgba(255, 255, 255, 0.01)'
                }}>
                  <Icon size={20} color={theme.subtle} strokeWidth={1.5} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    color: theme.muted
                  }}>
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.subtle,
            marginTop: '2.5rem',
            fontStyle: 'italic'
          }}>
            If you care about ideas, structure, and meaning — Esy is built for you.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section style={{
        padding: '6rem 2rem 8rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 400,
          marginBottom: '2.5rem',
          letterSpacing: '-0.01em',
          fontFamily: 'var(--font-literata)'
        }}>
          Our philosophy
        </h2>

        <blockquote style={{
          fontSize: '1.5rem',
          lineHeight: 1.6,
          color: theme.text,
          fontWeight: 300,
          fontFamily: 'var(--font-literata)',
          marginBottom: '2rem',
          paddingLeft: '1.5rem',
          borderLeft: `2px solid ${theme.accent}`
        }}>
          Good writing is the result of clear thinking.
        </blockquote>

        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.85,
          color: theme.muted
        }}>
          Esy exists to make that thinking visible — through research, structure, and carefully designed 
          tools that respect both the reader and the writer.
        </p>
      </section>

      {/* Contact Footer */}
      <section style={{
        padding: '3rem 2rem',
        borderTop: `1px solid ${theme.border}`,
        backgroundColor: theme.elevated
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.subtle,
            textAlign: 'center'
          }}>
            Questions? Email us at{' '}
            <a 
              href="mailto:hello@esy.com" 
              style={{
                color: theme.accent,
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              hello@esy.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
