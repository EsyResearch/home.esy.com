"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Sparkles,
  PenLine,
  Workflow,
  Search,
  ArrowRight,
  FileText,
  Zap,
  Target,
} from "lucide-react";
import { DocsPageNav } from "@/components/docs";

// Elevated Dark Theme (from existing pages)
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
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const guides = [
    {
      id: 'prompt-engineering',
      title: 'Prompt Engineering Guide',
      description: 'Master the CRISPE framework to craft powerful AI prompts that deliver exceptional results for any academic task.',
      href: '/docs/prompt-engineering',
      icon: <Sparkles className="w-6 h-6" />,
      category: 'Fundamentals'
    },
    {
      id: 'chatgpt-prompts',
      title: '50+ ChatGPT Prompts for Academic Writing',
      description: 'Copy-paste battle-tested prompts for essays, research papers, thesis writing, and literature reviews.',
      href: '/docs/chatgpt-prompts-for-academic-writing',
      icon: <BookOpen className="w-6 h-6" />,
      category: 'Prompt Library',
      isNew: true
    },
    {
      id: 'better-essays',
      title: 'Write Better Essays with AI',
      description: 'Transform your writing process from brainstorming to final draft with AI-powered research assistance.',
      href: '/docs/how-to-write-better-essays-with-ai',
      icon: <PenLine className="w-6 h-6" />,
      category: 'Techniques'
    },
    {
      id: 'agent-workflows',
      title: 'Build No-Code Agent Workflows',
      description: 'Automate complex research tasks with Esy&apos;s visual workflow builder—no programming required.',
      href: '/docs/agent-workflows',
      icon: <Workflow className="w-6 h-6" />,
      category: 'Advanced',
      isNew: true
    }
  ];

  const quickLinks = [
    { icon: <Target className="w-4 h-4" />, label: 'Getting Started', href: '/docs/prompt-engineering' },
    { icon: <FileText className="w-4 h-4" />, label: '50+ Prompts', href: '/docs/chatgpt-prompts-for-academic-writing' },
    { icon: <Zap className="w-4 h-4" />, label: 'Workflows', href: '/docs/agent-workflows' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.bg,
      color: theme.text,
      fontFamily: 'var(--font-inter)',
      position: 'relative'
    }}>
      {/* Subtle Background Effects */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.04) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />

      {/* Hero Section - Unique for Docs */}
      <section style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: 'clamp(3rem, 8vh, 5rem) clamp(1.5rem, 5vw, 3rem)',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.375rem 0.875rem',
            background: 'rgba(139, 92, 246, 0.15)',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '500',
            color: '#a78bfa',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '2rem',
            boxShadow: '0 2px 8px rgba(139, 92, 246, 0.15)'
          }}>
            <BookOpen style={{ width: '14px', height: '14px' }} />
            Documentation
          </div>

          {/* Massive Headline */}
          <h1 style={{
            fontFamily: 'var(--font-literata)',
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem'
          }}>
            Master Research with{' '}
            <span style={{ color: theme.accent, fontWeight: 400 }}>
              Agentic AI
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            color: theme.muted,
            fontWeight: 300,
            lineHeight: 1.6,
            marginBottom: '3rem',
            maxWidth: '700px',
            margin: '0 auto 3rem'
          }}>
            Learn prompt engineering, build no-code automations, and write smarter essays with Esy&apos;s AI research tools.
          </p>

          {/* Search Bar - Prominent */}
          <div style={{
            position: 'relative',
            maxWidth: '600px',
            margin: '0 auto 3rem'
          }}>
            <Search style={{
              position: 'absolute',
              left: '1.25rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '20px',
              color: theme.subtle,
              pointerEvents: 'none'
            }} />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '1.25rem 1.25rem 1.25rem 3.5rem',
                background: theme.elevated,
                border: `2px solid ${theme.border}`,
                borderRadius: '16px',
                fontSize: '1rem',
                color: theme.text,
                outline: 'none',
                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                e.currentTarget.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.1), 0 8px 24px rgba(0, 0, 0, 0.15)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = theme.border;
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
              }}
            />
            <kbd style={{
              position: 'absolute',
              right: '1.25rem',
              top: '50%',
              transform: 'translateY(-50%)',
              padding: '0.25rem 0.5rem',
              background: theme.surface,
              border: `1px solid ${theme.border}`,
              borderRadius: '6px',
              fontSize: '0.75rem',
              color: theme.subtle,
              fontFamily: 'var(--font-inter)',
              pointerEvents: 'none'
            }}>
              ⌘K
            </kbd>
          </div>

          {/* Quick Links */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.625rem 1.25rem',
                  background: 'transparent',
                  border: `1px solid ${theme.border}`,
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  color: theme.muted,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.08)';
                  e.currentTarget.style.color = theme.text;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme.border;
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = theme.muted;
                }}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="https://app.esy.com/signup"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2rem',
              background: `linear-gradient(135deg, ${theme.accent} 0%, rgba(139, 92, 246, 0.9) 100%)`,
              color: '#ffffff',
              borderRadius: '12px',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              boxShadow: '0 4px 16px rgba(139, 92, 246, 0.25)',
              border: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 92, 246, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 92, 246, 0.25)';
            }}
          >
            Try Esy Free
            <ArrowRight style={{ width: '18px', height: '18px' }} />
          </Link>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 clamp(1.5rem, 5vw, 3rem) 4rem',
        borderBottom: `1px solid ${theme.divider}`
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {[
            { value: '50+', label: 'Ready-to-use prompts' },
            { value: '10k+', label: 'Students & researchers' },
            { value: '5min', label: 'To build your first workflow' }
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 600,
                color: theme.text,
                marginBottom: '0.5rem',
                fontFamily: 'var(--font-literata)'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: theme.subtle
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Guides */}
      <section style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: 'clamp(4rem, 10vh, 6rem) clamp(1.5rem, 5vw, 3rem)',
        borderBottom: `1px solid ${theme.divider}`
      }}>
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'var(--font-literata)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            marginBottom: '1rem'
          }}>
            Essential Guides
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: theme.muted,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Four comprehensive resources to transform your research and writing workflow.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto'
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
                  Learn more
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

      {/* CTA Section */}
      <section style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: 'clamp(4rem, 10vh, 6rem) clamp(1.5rem, 5vw, 3rem)'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(59, 130, 246, 0.04) 100%)',
          border: `1px solid rgba(139, 92, 246, 0.2)`,
          borderRadius: '24px',
          padding: 'clamp(3rem, 8vw, 5rem) clamp(2rem, 5vw, 3rem)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 60px rgba(139, 92, 246, 0.1)'
        }}>
          <h2 style={{
            fontFamily: 'var(--font-literata)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            marginBottom: '1rem'
          }}>
            Ready to transform your research?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: theme.muted,
            marginBottom: '2.5rem',
            lineHeight: 1.6
          }}>
            Join thousands of students and researchers mastering their academic work with Esy.
          </p>
          <Link
            href="https://app.esy.com/signup"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1.125rem 2.5rem',
              background: `linear-gradient(135deg, ${theme.accent} 0%, rgba(139, 92, 246, 0.9) 100%)`,
              color: '#ffffff',
              borderRadius: '14px',
              textDecoration: 'none',
              fontSize: '1.0625rem',
              fontWeight: 600,
              transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              boxShadow: '0 8px 24px rgba(139, 92, 246, 0.3)',
              border: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(139, 92, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 92, 246, 0.3)';
            }}
          >
            Start Your Free Trial
            <ArrowRight style={{ width: '20px', height: '20px' }} />
          </Link>
        </div>
      </section>

      <DocsPageNav />
    </div>
  );
};

export default DocsHomeClient;

