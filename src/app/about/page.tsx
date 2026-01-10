"use client";

import React from 'react';
import { 
  Search,
  Users,
  GraduationCap,
  PenTool,
  BookOpen,
  Wrench
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
      title: 'Workflows, not prompts',
      description: 'Esy uses structured processes instead of one-off prompts. This helps people research more carefully and produce consistent, reliable results.'
    },
    {
      title: 'Artifacts, not chats',
      description: 'Esy produces real outputs — documents, analyses, and educational materials you can return to later. Not temporary chat conversations that disappear.'
    },
    {
      title: 'Research before writing',
      description: 'Information is gathered and organized first. Claims are connected to sources. Gaps and uncertainty are recorded instead of ignored.'
    },
    {
      title: 'Human-led, AI-assisted',
      description: 'AI helps explore sources, organize information, and refine drafts. People stay in control of decisions, conclusions, and authorship.'
    }
  ];

  const audiences = [
    { icon: Search, text: 'Researchers and analysts who need to explain how they reached a conclusion' },
    { icon: PenTool, text: 'Writers who want to think through structure before writing' },
    { icon: GraduationCap, text: 'Students learning how to research and reason, not just what to submit' },
    { icon: Users, text: 'Educators teaching structured inquiry and analysis' },
    { icon: Wrench, text: 'Builders documenting complex ideas or systems' }
  ];

  const workflowElements = [
    'what research to gather',
    'how to organize and check it',
    'what is produced at each stage'
  ];

  const visualEssayElements = [
    'researched narrative and explanation',
    'academic-style analysis with sources',
    'infographics, diagrams, or timelines',
    'charts or data-driven visuals'
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
          Esy (pronounced "Eh-see") is a workflow-based research platform.
        </p>

        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.85,
          color: theme.muted,
          marginBottom: '1.5rem'
        }}>
          It helps people research complex topics and turn that research into clear, publishable work.
        </p>

        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.85,
          color: theme.subtle,
          marginBottom: '1.5rem'
        }}>
          It's built for people who don't just want fast answers, but need to understand a subject, organize what they find, and produce work they can trust and return to later.
        </p>

        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.85,
          color: theme.text,
          fontWeight: 500,
          fontStyle: 'italic'
        }}>
          Esy keeps the research and the reasoning — not just the final text.
        </p>
      </section>

      {/* Why Esy Exists */}
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
            Why Esy exists
          </h2>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.muted,
            marginBottom: '1.5rem'
          }}>
            Most modern tools are built for speed.
          </p>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.muted,
            marginBottom: '1.5rem'
          }}>
            They jump straight to output, hide the research behind it, and use AI to generate text as quickly as possible. That can work for simple tasks — but it breaks down when accuracy, depth, or trust matter.
          </p>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.text,
            fontWeight: 500,
            marginBottom: '1.5rem'
          }}>
            Esy takes a different approach.
          </p>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.muted,
            marginBottom: '1.5rem'
          }}>
            Good work starts with doing the research properly, not just writing faster. Understanding where information comes from, how ideas connect, and why conclusions make sense is part of the work — not something to skip.
          </p>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.subtle
          }}>
            Esy is designed to support that full process, even when it takes more time.
          </p>
        </div>
      </section>

      {/* From Research to Publication */}
      <section style={{
        padding: '6rem 2rem',
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
          From research to publication
        </h2>

        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.85,
          color: theme.muted,
          marginBottom: '1.5rem'
        }}>
          The name Esy comes from the word{' '}
          <a 
            href="/essays/etymology/the-word-essay/" 
            style={{ 
              color: theme.muted, 
              textDecoration: 'none',
              borderBottom: `1px solid ${theme.faint}`,
              fontStyle: 'italic',
              transition: 'border-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.accent}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.faint}
          >
            essay
          </a>, which originally meant an attempt or a way of thinking something through.
        </p>

        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.85,
          color: theme.muted,
          marginBottom: '1.5rem'
        }}>
          Essays are still one way to present ideas. But Esy focuses on what comes before — and what supports — the final piece of writing.
        </p>

        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.85,
          color: theme.text,
          fontWeight: 500,
          marginBottom: '1.5rem'
        }}>
          At the core of Esy are workflows.
        </p>

        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.85,
          color: theme.muted,
          marginBottom: '1.5rem'
        }}>
          A workflow is a clear, repeatable process that guides work from research to a finished result without losing important steps along the way.
        </p>

        <div style={{
          padding: '1.5rem',
          borderRadius: '12px',
          border: `1px solid ${theme.border}`,
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          marginBottom: '1.5rem'
        }}>
          <p style={{
            fontSize: '1rem',
            lineHeight: 1.8,
            color: theme.subtle,
            marginBottom: '1rem'
          }}>
            Each workflow defines:
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {workflowElements.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: theme.accent
                }} />
                <span style={{ fontSize: '1rem', color: theme.muted }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.85,
          color: theme.subtle
        }}>
          This makes the research process easier to follow, easier to review, and easier to improve over time.
        </p>
      </section>

      {/* Visual Essays Section */}
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
            Visual Essays: the North Star artifact
          </h2>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.muted,
            marginBottom: '1.5rem'
          }}>
            At the center of Esy is a type of publishable work we call{' '}
            <a 
              href="/essays" 
              style={{ 
                color: theme.text, 
                fontWeight: 500,
                textDecoration: 'none',
                borderBottom: `1px solid ${theme.faint}`,
                transition: 'border-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.accent}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.faint}
            >
              Visual Essays
            </a>.
          </p>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.muted,
            marginBottom: '1.5rem'
          }}>
            Visual essays are long-form educational pieces that combine research, writing, and visuals into a single, coherent artifact. They are designed to explain complex topics clearly — not just through text, but through structure, layout, diagrams, and visual narrative.
          </p>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.text,
            fontWeight: 500,
            marginBottom: '1.5rem'
          }}>
            Visual essays are Esy's North Star artifact.
          </p>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.muted,
            marginBottom: '1.5rem'
          }}>
            Not because they are the only thing Esy produces — but because they best demonstrate what Esy makes possible when multiple workflows are combined into one finished piece.
          </p>

          <div style={{
            padding: '1.5rem',
            borderRadius: '12px',
            border: `1px solid ${theme.border}`,
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            marginBottom: '1.5rem'
          }}>
            <p style={{
              fontSize: '1rem',
              lineHeight: 1.8,
              color: theme.subtle,
              marginBottom: '1rem'
            }}>
              A visual essay might bring together:
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              {visualEssayElements.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: theme.accent
                  }} />
                  <span style={{ fontSize: '1rem', color: theme.muted }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.muted,
            marginBottom: '1.5rem'
          }}>
            Each of these elements can be developed through its own workflow. A visual essay brings them together into a single, publishable work — showing how research, analysis, and visuals can connect without losing clarity.
          </p>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.subtle
          }}>
            Visual essays are not a special mode or separate product. They are a demonstration of Esy's full range — a way to show how different kinds of work can be composed into major educational pieces.
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
            Esy is for people who need help researching complex topics and turning that research into clear, publishable work.
          </p>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.subtle,
            marginBottom: '2rem'
          }}>
            That includes:
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            {audiences.map((item, index) => {
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
            Esy is for anyone frustrated with shallow AI output and looking for work that lasts beyond a single session.
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
          marginBottom: '2.5rem',
          paddingLeft: '1.5rem',
          borderLeft: `2px solid ${theme.accent}`
        }}>
          Research and writing are processes, not shortcuts.
        </blockquote>

        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.85,
          color: theme.muted,
          marginBottom: '2rem'
        }}>
          Esy values:
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '2.5rem'
        }}>
          {[
            'clarity over speed',
            'understanding over volume',
            'trust over hype'
          ].map((value, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: theme.accent
              }} />
              <span style={{ 
                fontSize: '1.125rem', 
                color: theme.text,
                fontWeight: 500
              }}>{value}</span>
            </div>
          ))}
        </div>

        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.85,
          color: theme.subtle
        }}>
          Our goal is to become a reliable place for serious work — where research is preserved, reasoning is visible, and ideas can move from exploration to publication without losing their meaning.
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
