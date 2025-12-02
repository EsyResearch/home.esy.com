"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Lightbulb,
  BookOpen,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Clock,
  FileText,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import { DocsPageNav } from "@/components/docs";

// Elevated Dark Theme
const theme = {
  bg: '#18181b',
  elevated: '#27272a',
  surface: '#1f1f23',
  text: '#fafafa',
  muted: 'rgba(255, 255, 255, 0.75)',
  subtle: 'rgba(255, 255, 255, 0.5)',
  border: 'rgba(255, 255, 255, 0.08)',
  divider: 'rgba(255, 255, 255, 0.05)',
  accent: '#8b5cf6',
  accentLight: '#a78bfa',
};

const HowToWriteAnInformativeEssayClient = () => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const writingSteps = [
    {
      number: 1,
      title: 'Select an Educational Topic',
      description: 'Choose a subject that educates readers about something interesting or important. Your topic should be specific enough to cover thoroughly but broad enough to have substance.',
    },
    {
      number: 2,
      title: 'Research Comprehensively',
      description: 'Gather factual information from credible sources. Focus on verifiable facts, statistics, expert opinions, and documented evidence. Take organized notes with proper citation details.',
    },
    {
      number: 3,
      title: 'Craft an Informative Thesis',
      description: 'State what readers will learn from your essay. Your thesis should preview main points without taking a stance or making an argument. Focus on education, not persuasion.',
    },
    {
      number: 4,
      title: 'Organize Logically',
      description: 'Structure information in a way that\'s easy to follow. Use chronological order, categorical organization, or order of importance depending on your topic.',
    },
    {
      number: 5,
      title: 'Write with Clarity',
      description: 'Present information objectively using clear, accessible language. Define technical terms, provide context, and use examples to illustrate concepts. Maintain a neutral, educational tone.',
    },
    {
      number: 6,
      title: 'Revise for Accuracy',
      description: 'Verify all facts are correct and properly cited. Ensure explanations are clear and complete. Check that your essay maintains objectivity throughout.',
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.bg,
      color: theme.text,
      fontFamily: 'var(--font-inter)',
    }}>
      <article style={{ 
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 clamp(1.5rem, 5vw, 2rem)',
        paddingTop: 'clamp(4rem, 10vh, 6rem)',
        paddingBottom: 'clamp(4rem, 8vh, 6rem)'
      }}>
        
        {/* Header */}
        <header style={{ marginBottom: 'clamp(3rem, 6vh, 4rem)' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.375rem 0.875rem',
            background: `${theme.accent}20`,
            color: theme.accent,
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.05em',
            border: `1px solid ${theme.accent}30`,
            marginBottom: '1.25rem'
          }}>
            <Lightbulb style={{ width: '14px', height: '14px' }} />
            Essay Type Guide
          </div>
          
          <h1 style={{
            fontFamily: 'var(--font-literata)',
            fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
            color: theme.text,
          }}>
            How to Write an Informative Essay
          </h1>
          
          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.8,
            color: theme.muted,
            marginBottom: '1.5rem'
          }}>
            Learn to educate readers through clear, factual writing. Master the art of presenting balanced information that informs without persuading, using credible research and objective language.
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.875rem',
            color: theme.subtle,
            flexWrap: 'wrap' as const
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <Clock style={{ width: '14px', height: '14px' }} />
              10 min read
            </span>
            <span>•</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        {/* What is an Informative Essay */}
        <section style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
          <h2 style={{
            fontFamily: 'var(--font-literata)',
            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
            color: theme.text,
          }}>
            What is an Informative Essay?
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '1.25rem'
          }}>
            An informative essay educates readers about a specific topic by presenting factual, balanced information in a clear, accessible way. The goal is purely educational—you're teaching your audience about something, not trying to convince them of anything.
          </p>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '1.25rem'
          }}>
            Think of informative essays as textbook chapters or encyclopedia entries—they prioritize clarity, accuracy, and comprehensive coverage. Unlike argumentative essays that take a stance or persuasive essays that use emotional appeals, informative essays maintain strict neutrality while thoroughly explaining their subject.
          </p>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
          }}>
            You'll encounter informative writing in academic papers, research reports, news articles, instructional guides, and anywhere the goal is purely to educate. Mastering this style teaches you to research thoroughly, present information objectively, and communicate complex ideas clearly.
          </p>

          <div style={{
            padding: '1.5rem',
            background: 'rgba(139, 92, 246, 0.08)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '12px',
            marginTop: '2rem'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: theme.text,
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <CheckCircle style={{ width: '20px', height: '20px', color: theme.accent }} />
              Key Characteristics
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ color: theme.muted, fontSize: '0.9375rem', lineHeight: 1.6 }}>
                  <strong style={{ color: theme.text }}>Objective tone:</strong> Present information without bias, opinions, or persuasion
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ color: theme.muted, fontSize: '0.9375rem', lineHeight: 1.6 }}>
                  <strong style={{ color: theme.text }}>Factual content:</strong> Use verified facts, statistics, and credible sources exclusively
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ color: theme.muted, fontSize: '0.9375rem', lineHeight: 1.6 }}>
                  <strong style={{ color: theme.text }}>Clear organization:</strong> Logical structure that guides readers through information
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ color: theme.muted, fontSize: '0.9375rem', lineHeight: 1.6 }}>
                  <strong style={{ color: theme.text }}>Educational purpose:</strong> Goal is to inform and teach, not entertain or persuade
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div style={{
          borderTop: `1px solid ${theme.divider}`,
          margin: 'clamp(4rem, 8vh, 6rem) 0'
        }} />

        {/* Structure */}
        <section style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
          <h2 style={{
            fontFamily: 'var(--font-literata)',
            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
            color: theme.text,
          }}>
            Informative Essay Structure
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '2rem'
          }}>
            Informative essays follow a standard academic structure designed to present information clearly and systematically:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1.5rem' }}>
            {/* Introduction */}
            <div style={{
              padding: '1.75rem',
              background: 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
              border: `1px solid ${theme.border}`,
              borderRadius: '16px',
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 500,
                color: theme.text,
                marginBottom: '1rem',
                fontFamily: 'var(--font-literata)'
              }}>
                1. Introduction
              </h3>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column' as const,
                gap: '0.75rem'
              }}>
                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: theme.accent,
                    marginTop: '8px',
                    flexShrink: 0
                  }} />
                  <span style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: theme.muted }}>
                    <strong style={{ color: theme.text }}>Hook:</strong> Engage readers with an interesting fact, question, or statistic related to your topic
                  </span>
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: theme.accent,
                    marginTop: '8px',
                    flexShrink: 0
                  }} />
                  <span style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: theme.muted }}>
                    <strong style={{ color: theme.text }}>Background:</strong> Provide context to help readers understand why this topic matters
                  </span>
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: theme.accent,
                    marginTop: '8px',
                    flexShrink: 0
                  }} />
                  <span style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: theme.muted }}>
                    <strong style={{ color: theme.text }}>Thesis statement:</strong> Clearly state what readers will learn and preview your main points
                  </span>
                </li>
              </ul>
            </div>

            {/* Body Paragraphs */}
            <div style={{
              padding: '1.75rem',
              background: 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
              border: `1px solid ${theme.border}`,
              borderRadius: '16px',
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 500,
                color: theme.text,
                marginBottom: '1rem',
                fontFamily: 'var(--font-literata)'
              }}>
                2. Body Paragraphs (3-5)
              </h3>

              <p style={{
                fontSize: '0.9375rem',
                lineHeight: 1.6,
                color: theme.muted,
                marginBottom: '1rem'
              }}>
                Each paragraph presents one main piece of information about your topic:
              </p>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column' as const,
                gap: '0.75rem'
              }}>
                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: theme.accent,
                    marginTop: '8px',
                    flexShrink: 0
                  }} />
                  <span style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: theme.muted }}>
                    <strong style={{ color: theme.text }}>Topic sentence:</strong> Introduce the specific aspect you'll explain
                  </span>
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: theme.accent,
                    marginTop: '8px',
                    flexShrink: 0
                  }} />
                  <span style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: theme.muted }}>
                    <strong style={{ color: theme.text }}>Factual information:</strong> Present verifiable facts, statistics, and expert testimony
                  </span>
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: theme.accent,
                    marginTop: '8px',
                    flexShrink: 0
                  }} />
                  <span style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: theme.muted }}>
                    <strong style={{ color: theme.text }}>Explanation:</strong> Clarify complex concepts and define technical terms
                  </span>
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: theme.accent,
                    marginTop: '8px',
                    flexShrink: 0
                  }} />
                  <span style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: theme.muted }}>
                    <strong style={{ color: theme.text }}>Examples:</strong> Use concrete examples to illustrate abstract ideas
                  </span>
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: theme.accent,
                    marginTop: '8px',
                    flexShrink: 0
                  }} />
                  <span style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: theme.muted }}>
                    <strong style={{ color: theme.text }}>Transition:</strong> Connect smoothly to the next topic
                  </span>
                </li>
              </ul>
            </div>

            {/* Conclusion */}
            <div style={{
              padding: '1.75rem',
              background: 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
              border: `1px solid ${theme.border}`,
              borderRadius: '16px',
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 500,
                color: theme.text,
                marginBottom: '1rem',
                fontFamily: 'var(--font-literata)'
              }}>
                3. Conclusion
              </h3>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column' as const,
                gap: '0.75rem'
              }}>
                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: theme.accent,
                    marginTop: '8px',
                    flexShrink: 0
                  }} />
                  <span style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: theme.muted }}>
                    <strong style={{ color: theme.text }}>Restate thesis:</strong> Remind readers what they learned (in different words)
                  </span>
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: theme.accent,
                    marginTop: '8px',
                    flexShrink: 0
                  }} />
                  <span style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: theme.muted }}>
                    <strong style={{ color: theme.text }}>Summarize key points:</strong> Briefly recap main information covered
                  </span>
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: theme.accent,
                    marginTop: '8px',
                    flexShrink: 0
                  }} />
                  <span style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: theme.muted }}>
                    <strong style={{ color: theme.text }}>Broader significance:</strong> Explain why this information matters or how it applies
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div style={{
          borderTop: `1px solid ${theme.divider}`,
          margin: 'clamp(4rem, 8vh, 6rem) 0'
        }} />

        {/* Writing Process */}
        <section style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
          <h2 style={{
            fontFamily: 'var(--font-literata)',
            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
            color: theme.text,
          }}>
            Step-by-Step Writing Process
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1rem' }}>
            {writingSteps.map((step) => (
              <div
                key={step.number}
                onMouseEnter={() => setHoveredStep(step.number)}
                onMouseLeave={() => setHoveredStep(null)}
                style={{
                  background: hoveredStep === step.number
                    ? 'linear-gradient(135deg, rgba(39, 39, 42, 0.95) 0%, rgba(31, 31, 35, 0.8) 100%)'
                    : 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
                  border: `1px solid ${hoveredStep === step.number ? 'rgba(159, 122, 234, 0.3)' : theme.border}`,
                  borderRadius: '16px',
                  padding: '1.5rem',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: hoveredStep === step.number
                    ? '0 12px 32px rgba(159, 122, 234, 0.2)'
                    : '0 4px 16px rgba(0, 0, 0, 0.15)',
                  transform: hoveredStep === step.number ? 'translateY(-2px)' : 'translateY(0)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: 'rgba(139, 92, 246, 0.15)',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.accentLight,
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    flexShrink: 0,
                    fontFamily: 'var(--font-literata)'
                  }}>
                    {step.number}
                  </div>

                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: 500,
                      color: theme.text,
                      marginBottom: '0.5rem'
                    }}>
                      {step.title}
                    </h3>

                    <p style={{
                      fontSize: '0.9375rem',
                      lineHeight: 1.6,
                      color: theme.muted,
                      margin: 0
                    }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div style={{
          borderTop: `1px solid ${theme.divider}`,
          margin: 'clamp(4rem, 8vh, 6rem) 0'
        }} />

        {/* Example Thesis */}
        <section style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
          <h2 style={{
            fontFamily: 'var(--font-literata)',
            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
            color: theme.text,
          }}>
            Example Thesis Statements
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '2rem'
          }}>
            A strong informative thesis previews what you'll teach readers without arguing for a position:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1.25rem' }}>
            <div style={{
              padding: '1.5rem',
              background: 'rgba(34, 197, 94, 0.05)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: '12px',
            }}>
              <p style={{
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                color: theme.muted,
                margin: 0,
                fontStyle: 'italic'
              }}>
                "The human brain processes and stores memories through three distinct stages: encoding, storage, and retrieval, each involving different neural mechanisms and brain regions."
              </p>
            </div>

            <div style={{
              padding: '1.5rem',
              background: 'rgba(34, 197, 94, 0.05)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: '12px',
            }}>
              <p style={{
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                color: theme.muted,
                margin: 0,
                fontStyle: 'italic'
              }}>
                "Blockchain technology operates through decentralized networks, cryptographic security, and consensus mechanisms that enable secure, transparent transactions without intermediaries."
              </p>
            </div>

            <div style={{
              padding: '1.5rem',
              background: 'rgba(34, 197, 94, 0.05)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: '12px',
            }}>
              <p style={{
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                color: theme.muted,
                margin: 0,
                fontStyle: 'italic'
              }}>
                "The Renaissance emerged in 14th-century Italy due to factors including the rediscovery of classical texts, the rise of merchant wealth, and patronage from powerful families like the Medici."
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div style={{
          borderTop: `1px solid ${theme.divider}`,
          margin: 'clamp(4rem, 8vh, 6rem) 0'
        }} />

        {/* AI Enhancement */}
        <section style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
          <h2 style={{
            fontFamily: 'var(--font-literata)',
            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginBottom: '1rem',
            color: theme.text,
          }}>
            Research Faster with AI
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '1.5rem'
          }}>
            Esy helps you write informative essays faster by assisting with research, organization, and clarity—ensuring your information educates effectively.
          </p>

          <div style={{
            padding: '2rem',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '16px',
            marginBottom: '2rem'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 500,
              color: theme.text,
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Sparkles style={{ width: '24px', height: '24px', color: theme.accent }} />
              How Esy Helps
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: theme.text }}>Research summaries:</strong>
                  <span style={{ color: theme.muted }}> Distill complex academic papers into clear, usable facts</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: theme.text }}>Information organization:</strong>
                  <span style={{ color: theme.muted }}> Structure complex topics into logical, teachable sections</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: theme.text }}>Clarity enhancement:</strong>
                  <span style={{ color: theme.muted }}> Simplify jargon and make technical concepts accessible</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: theme.text }}>Example generation:</strong>
                  <span style={{ color: theme.muted }}> Find relevant examples to illustrate abstract concepts</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '1rem',
            alignItems: 'flex-start'
          }}>
            <Link
              href="https://app.esy.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 1.75rem',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                color: '#ffffff',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(139, 92, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.3)';
              }}
            >
              Try Esy Free
              <ArrowRight style={{ width: '18px', height: '18px' }} />
            </Link>

            <Link
              href="/docs/how-to-write-better-essays-with-ai"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: theme.accent,
                fontSize: '0.9375rem',
                fontWeight: 500,
                textDecoration: 'none',
                borderBottom: `1px solid ${theme.accent}40`,
                paddingBottom: '2px',
                transition: 'border-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = theme.accent}
              onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = `${theme.accent}40`}
            >
              Learn more about writing with AI
              <ArrowRight style={{ width: '16px', height: '16px' }} />
            </Link>
          </div>
        </section>

        {/* Divider */}
        <div style={{
          borderTop: `1px solid ${theme.divider}`,
          margin: 'clamp(4rem, 8vh, 6rem) 0'
        }} />

        {/* Related Content */}
        <section style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
          <h2 style={{
            fontFamily: 'var(--font-literata)',
            fontSize: '1.75rem',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
            marginBottom: '1.5rem',
            color: theme.text,
          }}>
            Continue Learning
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1rem' }}>
            <Link
              href="/docs/how-to-write-an-expository-essay"
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                padding: '1.25rem',
                background: 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
                border: `1px solid ${theme.border}`,
                borderRadius: '12px',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(159, 122, 234, 0.3)';
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.border;
                e.currentTarget.style.transform = 'translateX(0)';
              }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{
                      fontSize: '1.0625rem',
                      fontWeight: 500,
                      color: theme.text,
                      marginBottom: '0.25rem'
                    }}>
                      How to Write an Expository Essay
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: theme.muted,
                      margin: 0
                    }}>
                      Learn different types of expository writing
                    </p>
                  </div>
                  <ArrowRight style={{ width: '20px', height: '20px', color: theme.accent }} />
                </div>
              </div>
            </Link>

            <Link
              href="/docs/how-to-write-an-essay"
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                padding: '1.25rem',
                background: 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
                border: `1px solid ${theme.border}`,
                borderRadius: '12px',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(159, 122, 234, 0.3)';
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.border;
                e.currentTarget.style.transform = 'translateX(0)';
              }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{
                      fontSize: '1.0625rem',
                      fontWeight: 500,
                      color: theme.text,
                      marginBottom: '0.25rem'
                    }}>
                      Back to Essay Writing Guide
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: theme.muted,
                      margin: 0
                    }}>
                      Master the fundamentals of essay writing
                    </p>
                  </div>
                  <ArrowRight style={{ width: '20px', height: '20px', color: theme.accent }} />
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Divider */}
        <div style={{
          borderTop: `1px solid ${theme.divider}`,
          margin: 'clamp(4rem, 8vh, 6rem) 0'
        }} />

        {/* References */}
        <section style={{ marginBottom: 'clamp(3rem, 6vh, 4rem)' }}>
          <h2 style={{
            fontFamily: 'var(--font-literata)',
            fontSize: '1.75rem',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
            marginBottom: '1.5rem',
            color: theme.text,
          }}>
            References & Further Reading
          </h2>

          <div style={{
            padding: '1.5rem',
            background: 'rgba(255, 255, 255, 0.02)',
            border: `1px solid ${theme.border}`,
            borderRadius: '12px',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column' as const,
              gap: '1rem',
              fontSize: '0.9375rem',
              lineHeight: 1.7,
              color: theme.muted
            }}>
              <p style={{ margin: 0 }}>
                <strong style={{ color: theme.text }}>Purdue Online Writing Lab (OWL).</strong> (2024). <em>Informative and Explanatory Writing</em>. Purdue University. Retrieved from{' '}
                <a 
                  href="https://owl.purdue.edu/owl/general_writing/academic_writing/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}40` }}
                >
                  owl.purdue.edu
                </a>
              </p>

              <p style={{ margin: 0 }}>
                <strong style={{ color: theme.text }}>The Writing Center, University of North Carolina at Chapel Hill.</strong> (2024). <em>Writing Informative Essays</em>. Retrieved from{' '}
                <a 
                  href="https://writingcenter.unc.edu/tips-and-tools/paragraphs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}40` }}
                >
                  writingcenter.unc.edu
                </a>
              </p>

              <p style={{ margin: 0 }}>
                <strong style={{ color: theme.text }}>Grammarly.</strong> (2024). <em>How to Write an Informative Essay</em>. Retrieved from{' '}
                <a 
                  href="https://www.grammarly.com/blog/informative-essay"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}40` }}
                >
                  grammarly.com
                </a>
              </p>

              <p style={{ margin: 0 }}>
                <strong style={{ color: theme.text }}>Scribbr.</strong> (2024). <em>Informative Essay Guide</em>. Retrieved from{' '}
                <a 
                  href="https://www.scribbr.com/academic-writing/informative-writing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}40` }}
                >
                  scribbr.com
                </a>
              </p>
            </div>
          </div>
        </section>

        <DocsPageNav />
      </article>
    </div>
  );
};

export default HowToWriteAnInformativeEssayClient;

