"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Sparkles,
  PenLine,
  Workflow,
  ArrowRight,
} from "lucide-react";
import { DocsPageNav } from "@/components/docs";

// Elevated Dark Theme
const theme = {
  bg: '#18181b',
  elevated: '#27272a',
  surface: '#1f1f23',
  text: '#fafafa',
  muted: 'rgba(255, 255, 255, 0.7)',
  subtle: 'rgba(255, 255, 255, 0.5)',
  border: 'rgba(255, 255, 255, 0.08)',
  divider: 'rgba(255, 255, 255, 0.05)',
  accent: '#8b5cf6',
};

const DocsHomeClient = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredJourney, setHoveredJourney] = useState<number | null>(null);

  const journeySteps = [
    {
      icon: '📚',
      label: 'Learn',
      subtitle: 'Core concepts',
      description: 'Understand how Esy works',
      href: '/docs/prompt-engineering'
    },
    {
      icon: '💡',
      label: 'Prompt',
      subtitle: '50+ examples',
      description: 'Ready-to-use prompts',
      href: '/docs/chatgpt-prompts-for-academic-writing'
    },
    {
      icon: '✍️',
      label: 'Write',
      subtitle: 'Better essays',
      description: 'AI-assisted writing',
      href: '/docs/how-to-write-better-essays-with-ai'
    },
    {
      icon: '🤖',
      label: 'Automate',
      subtitle: 'Workflows',
      description: 'Build no-code agents',
      href: '/docs/agent-workflows'
    }
  ];

  const guides = [
    {
      id: 'prompt-engineering',
      title: 'Prompt Engineering Guide',
      description: 'Learn the CRISPE framework and techniques for crafting effective AI prompts that deliver high-quality results.',
      href: '/docs/prompt-engineering',
      icon: <Sparkles className="w-6 h-6" />,
      category: 'Fundamentals'
    },
    {
      id: 'chatgpt-prompts',
      title: '50+ ChatGPT Prompts for Academic Writing',
      description: 'Battle-tested prompts for essays, research papers, thesis writing, and literature reviews.',
      href: '/docs/chatgpt-prompts-for-academic-writing',
      icon: <BookOpen className="w-6 h-6" />,
      category: 'Prompt Library',
      isNew: true
    },
    {
      id: 'better-essays',
      title: 'Write Better Essays with AI',
      description: 'Understand how to use AI assistance throughout your writing process—from brainstorming to final draft.',
      href: '/docs/how-to-write-better-essays-with-ai',
      icon: <PenLine className="w-6 h-6" />,
      category: 'Techniques'
    },
    {
      id: 'agent-workflows',
      title: 'Build No-Code Agent Workflows',
      description: 'Learn to create automated research workflows using Esy's visual builder—no programming required.',
      href: '/docs/agent-workflows',
      icon: <Workflow className="w-6 h-6" />,
      category: 'Advanced',
      isNew: true
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.bg,
      color: theme.text,
      fontFamily: 'var(--font-inter)',
      padding: 'clamp(3rem, 8vh, 5rem) clamp(1.5rem, 5vw, 3rem)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Visual Journey Map */}
        <section style={{ marginBottom: 'clamp(4rem, 10vh, 6rem)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            position: 'relative'
          }}>
            {journeySteps.map((step, index) => (
              <Link
                key={step.label}
                href={step.href}
                style={{
                  textDecoration: 'none',
                  position: 'relative'
                }}
                onMouseEnter={() => setHoveredJourney(index)}
                onMouseLeave={() => setHoveredJourney(null)}
              >
                <div style={{
                  padding: '2rem 1.5rem',
                  background: hoveredJourney === index
                    ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(139, 92, 246, 0.06) 100%)'
                    : 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
                  border: `1px solid ${hoveredJourney === index ? 'rgba(139, 92, 246, 0.3)' : theme.border}`,
                  borderRadius: '16px',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transform: hoveredJourney === index ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: hoveredJourney === index
                    ? '0 12px 32px rgba(139, 92, 246, 0.2)'
                    : '0 4px 16px rgba(0, 0, 0, 0.15)'
                }}>
                  {/* Icon */}
                  <div style={{
                    fontSize: '3rem',
                    marginBottom: '1rem',
                    transition: 'transform 0.3s ease',
                    transform: hoveredJourney === index ? 'scale(1.1)' : 'scale(1)'
                  }}>
                    {step.icon}
                  </div>

                  {/* Label */}
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: theme.text,
                    marginBottom: '0.5rem',
                    fontFamily: 'var(--font-literata)'
                  }}>
                    {step.label}
                  </div>

                  {/* Subtitle */}
                  <div style={{
                    fontSize: '0.875rem',
                    color: theme.accent,
                    marginBottom: '0.75rem',
                    fontWeight: 500
                  }}>
                    {step.subtitle}
                  </div>

                  {/* Description */}
                  <div style={{
                    fontSize: '0.8125rem',
                    color: theme.muted,
                    lineHeight: 1.5
                  }}>
                    {step.description}
                  </div>
                </div>

                {/* Arrow connector (except for last item) */}
                {index < journeySteps.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    right: '-0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: theme.subtle,
                    fontSize: '1.5rem',
                    pointerEvents: 'none',
                    display: window.innerWidth >= 768 ? 'block' : 'none'
                  }}>
                    →
                  </div>
                )}
              </Link>
            ))}
          </div>

          {/* Subtle connecting line (desktop only) */}
          <svg
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '2px',
              pointerEvents: 'none',
              opacity: 0.1,
              display: window.innerWidth >= 768 ? 'block' : 'none'
            }}
          >
            <line
              x1="0"
              y1="0"
              x2="100%"
              y2="0"
              stroke={theme.accent}
              strokeWidth="2"
              strokeDasharray="8 8"
            />
          </svg>
        </section>

        {/* Getting Started Section */}
        <section style={{
          marginBottom: 'clamp(4rem, 10vh, 6rem)',
          padding: '3rem 0'
        }}>
          <h2 style={{
            fontFamily: 'var(--font-literata)',
            fontSize: 'clamp(2rem, 5vw, 2.5rem)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
            color: theme.text
          }}>
            Getting Started
          </h2>

          <div style={{
            fontSize: '1.125rem',
            lineHeight: 1.8,
            color: theme.muted,
            maxWidth: '800px'
          }}>
            <p style={{ marginBottom: '1.5rem' }}>
              Esy is an AI-powered research platform that helps you write better essays, papers, and reports. 
              These docs will teach you how to use prompts effectively, reference your documents, and build 
              automated workflows.
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              <strong style={{ color: theme.text }}>New to Esy?</strong> Start with the{' '}
              <Link
                href="/docs/prompt-engineering"
                style={{
                  color: theme.accent,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${theme.accent}40`,
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = theme.accent}
                onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = `${theme.accent}40`}
              >
                Prompt Engineering Guide
              </Link>{' '}
              to understand how to communicate effectively with AI.
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              <strong style={{ color: theme.text }}>Need prompts right away?</strong> Jump to our{' '}
              <Link
                href="/docs/chatgpt-prompts-for-academic-writing"
                style={{
                  color: theme.accent,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${theme.accent}40`,
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderBottom = `1px solid ${theme.accent}`}
                onMouseLeave={(e) => e.currentTarget.style.borderBottom = `1px solid ${theme.accent}40`}
              >
                50+ ChatGPT Prompts
              </Link>{' '}
              for ready-to-use examples across different academic tasks.
            </p>

            <p>
              <strong style={{ color: theme.text }}>Ready to automate?</strong> Learn how to{' '}
              <Link
                href="/docs/agent-workflows"
                style={{
                  color: theme.accent,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${theme.accent}40`,
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderBottom = `1px solid ${theme.accent}`}
                onMouseLeave={(e) => e.currentTarget.style.borderBottom = `1px solid ${theme.accent}40`}
              >
                build agent workflows
              </Link>{' '}
              that reference your documents and chain prompts together.
            </p>
          </div>
        </section>

        {/* Essential Guides */}
        <section style={{
          padding: '3rem 0',
          borderTop: `1px solid ${theme.divider}`
        }}>
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontFamily: 'var(--font-literata)',
              fontSize: 'clamp(2rem, 5vw, 2.5rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
              color: theme.text
            }}>
              Essential Guides
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: theme.muted,
              maxWidth: '700px'
            }}>
              In-depth guides covering everything from prompt engineering fundamentals to building 
              advanced agent workflows.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {guides.map((guide) => (
              <Link
                key={guide.id}
                href={guide.href}
                style={{ textDecoration: 'none' }}
                onMouseEnter={() => setHoveredCard(guide.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={{
                  background: hoveredCard === guide.id
                    ? 'linear-gradient(135deg, rgba(39, 39, 42, 0.95) 0%, rgba(31, 31, 35, 0.8) 100%)'
                    : 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
                  border: `1px solid ${hoveredCard === guide.id ? 'rgba(159, 122, 234, 0.3)' : theme.border}`,
                  borderRadius: '16px',
                  padding: '1.75rem',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  boxShadow: hoveredCard === guide.id
                    ? '0 12px 32px rgba(159, 122, 234, 0.2)'
                    : '0 4px 16px rgba(0, 0, 0, 0.15)',
                  transform: hoveredCard === guide.id ? 'translateY(-4px)' : 'translateY(0)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column' as const
                }}>
                  {/* Category Badge + New Badge */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      padding: '0.25rem 0.75rem',
                      background: `${theme.accent}20`,
                      color: theme.accent,
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.05em',
                      border: `1px solid ${theme.accent}30`
                    }}>
                      {guide.category}
                    </div>
                    {guide.isNew && (
                      <div style={{
                        padding: '0.25rem 0.625rem',
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                        color: '#ffffff',
                        borderRadius: '8px',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        textTransform: 'uppercase' as const,
                        letterSpacing: '0.05em'
                      }}>
                        New
                      </div>
                    )}
                  </div>

                  {/* Icon */}
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(139, 92, 246, 0.15)',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#a78bfa',
                    marginBottom: '1.25rem',
                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.15)'
                  }}>
                    {guide.icon}
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 400,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.3,
                    marginBottom: '0.75rem',
                    color: theme.text,
                    fontFamily: 'var(--font-literata)'
                  }}>
                    {guide.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontSize: '0.9375rem',
                    color: theme.muted,
                    lineHeight: 1.6,
                    marginBottom: '1.25rem',
                    flexGrow: 1
                  }}>
                    {guide.description}
                  </p>

                  {/* Arrow */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: theme.accent,
                    fontSize: '0.875rem',
                    fontWeight: 500
                  }}>
                    Read guide
                    <ArrowRight style={{
                      width: '16px',
                      height: '16px',
                      transform: hoveredCard === guide.id ? 'translateX(4px)' : 'translateX(0)',
                      transition: 'transform 0.2s ease'
                    }} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <DocsPageNav />
      </div>
    </div>
  );
};

export default DocsHomeClient;
