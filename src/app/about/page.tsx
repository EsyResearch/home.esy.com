"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Users,
  GraduationCap,
  Wrench,
  FileText,
  Search,
  CheckCircle
} from 'lucide-react';

export default function AboutPage() {
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
      title: 'Structured templates, not open-ended prompts',
      description: 'Select from workflows designed for real outputs — essays, research briefs, visual essays — and complete a guided intake. No prompt engineering required.'
    },
    {
      title: 'Publishable artifacts, not chat transcripts',
      description: 'Esy produces finished documents you can use, share, and return to. Not temporary conversations that vanish after a session.'
    },
    {
      title: 'Orchestrated process, not one-shot generation',
      description: 'Research, analysis, drafting, and quality assurance happen in sequence. Each step informs the next, producing outputs that are coherent and defensible.'
    },
    {
      title: 'Guided structure, not guesswork',
      description: 'Think of the difference between asking ChatGPT to "make a logo" versus using Canva. Esy provides the structure; you provide the intent.'
    }
  ];

  const audiences = [
    { icon: FileText, text: 'Anyone who needs a finished essay, brief, or document — not an AI draft to rewrite' },
    { icon: Search, text: 'Researchers who want organized, source-backed outputs without juggling prompts' },
    { icon: GraduationCap, text: 'Students learning to produce structured, credible academic work' },
    { icon: Users, text: 'Educators who need reliable materials for teaching complex topics' },
    { icon: Wrench, text: 'Professionals documenting ideas, processes, or analyses for real use' }
  ];

  const artifactTypes = [
    'Academic essays with proper structure and citations',
    'Research briefs that synthesize sources into clear takeaways',
    'Visual essays that combine narrative, analysis, and graphics',
    'Educational materials designed for learning and reference'
  ];

  const processSteps = [
    { label: 'Select a template', desc: 'Choose the type of artifact you need' },
    { label: 'Complete the intake', desc: 'Answer guided questions to capture your intent' },
    { label: 'Let Esy orchestrate', desc: 'Research, drafting, and QA happen automatically' },
    { label: 'Receive a finished artifact', desc: 'Publishable output, ready to use' }
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
          Esy (pronounced &quot;Eh-see&quot;) is a workflow-driven AI platform that turns intent into finished, publishable artifacts.
        </p>

        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.85,
          color: theme.muted,
          marginBottom: '1.5rem'
        }}>
          Instead of typing open-ended prompts, users select a structured template — such as an academic essay, research brief, or visual essay — and complete an intake designed to capture what they actually want.
        </p>

        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.85,
          color: theme.text,
          fontWeight: 500,
          fontStyle: 'italic'
        }}>
          Esy orchestrates research, analysis, drafting, and quality assurance to produce outputs that are defensible, coherent, and ready to use.
        </p>
      </section>

      {/* The Difference */}
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
            Why Esy is different
          </h2>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.muted,
            marginBottom: '1.5rem'
          }}>
            Most AI tools require you to learn prompt engineering — crafting the right question to get a useful answer. Even then, results are often experimental: drafts that need heavy editing, outputs that require fact-checking, conversations that disappear.
          </p>

          <div style={{
            padding: '1.75rem',
            borderRadius: '12px',
            border: `1px solid ${theme.accent}`,
            backgroundColor: 'rgba(59, 130, 246, 0.05)',
            marginBottom: '1.5rem'
          }}>
          <p style={{
            fontSize: '1.125rem',
              lineHeight: 1.8,
            color: theme.text,
            fontWeight: 500,
              marginBottom: '0.75rem'
          }}>
              Think of the difference between asking ChatGPT to &quot;make a logo&quot; and using Canva.
          </p>
          <p style={{
              fontSize: '1rem',
              lineHeight: 1.8,
              color: theme.muted
            }}>
              Guided structure replaces guesswork, and the result is something real — not experimental.
          </p>
          </div>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.muted
          }}>
            Esy provides that structure. You don&apos;t need to learn prompts or interact with a chat interface. You select what you want to create, answer guided questions, and receive a finished artifact.
          </p>
        </div>
      </section>

      {/* How It Works */}
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
          How Esy works
        </h2>

        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.85,
          color: theme.muted,
          marginBottom: '2rem'
        }}>
          Every Esy workflow follows a clear process — from your intent to a finished, usable result.
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          {processSteps.map((step, index) => (
            <div key={index} style={{
              display: 'grid',
              gridTemplateColumns: '48px 1fr',
              gap: '1.25rem',
              alignItems: 'start'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
          borderRadius: '12px',
          border: `1px solid ${theme.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: index === 3 ? theme.accent : 'rgba(255, 255, 255, 0.02)',
                flexShrink: 0
              }}>
                <span style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: index === 3 ? 'white' : theme.muted
                }}>
                  {index + 1}
                </span>
              </div>
              <div style={{ paddingTop: '0.25rem' }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  marginBottom: '0.375rem',
                  color: theme.text
        }}>
                  {step.label}
                </h3>
          <p style={{
            fontSize: '1rem',
                  lineHeight: 1.7,
                  color: theme.subtle
                }}>
                  {step.desc}
                </p>
              </div>
              </div>
            ))}
        </div>

        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.85,
          color: theme.subtle
        }}>
          Behind the scenes, Esy orchestrates multiple AI capabilities — research gathering, source verification, content structuring, drafting, and quality checks — so you don&apos;t have to manage them yourself.
        </p>
      </section>

      {/* What Esy Creates */}
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
            What Esy creates
          </h2>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.muted,
            marginBottom: '1.5rem'
          }}>
            Esy produces structured, publishable artifacts — not rough drafts or chat outputs. Each workflow is designed to create something real:
          </p>

          <div style={{
            padding: '1.5rem',
            borderRadius: '12px',
            border: `1px solid ${theme.border}`,
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {artifactTypes.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle size={18} color={theme.accent} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '1rem', color: theme.muted, lineHeight: 1.6 }}>{item}</span>
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
            The name Esy comes from the word{' '}
            <Link 
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
            </Link>, which originally meant an attempt — a way of thinking something through. Esy helps you move from attempt to artifact.
          </p>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.subtle
          }}>
            <Link 
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
            </Link> — long-form pieces combining research, narrative, and graphics — represent Esy&apos;s most comprehensive workflow, demonstrating what&apos;s possible when multiple capabilities are composed into a single artifact.
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
            Esy is for anyone who needs to produce real work — without becoming a prompt engineer.
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
            If you&apos;ve been frustrated by AI tools that require endless prompting and still produce unusable output, Esy offers a different path.
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
          AI should produce work you can use — not experiments you have to fix.
        </blockquote>

        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.85,
          color: theme.muted,
          marginBottom: '2rem'
        }}>
          Esy is built on a simple belief: the value of AI isn&apos;t in generating text faster — it&apos;s in producing artifacts that are actually usable.
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '2.5rem'
        }}>
          {[
            'Structure over prompting',
            'Artifacts over conversations',
            'Ready-to-use over requires-editing'
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
          Our goal is to make AI genuinely useful — not as a brainstorming partner or chat companion, but as a reliable system that transforms what you want into something finished.
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
}
