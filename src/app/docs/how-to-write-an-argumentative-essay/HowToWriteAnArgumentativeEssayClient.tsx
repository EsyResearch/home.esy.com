"use client";
/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import Link from "next/link";
import {
  Target,
  Shield,
  Scale,
  CheckCircle,
  BookOpen,
  Sparkles,
  ArrowRight,
  Clock,
  AlertTriangle,
  TrendingUp,
  Search,
} from "lucide-react";
import { DocsPageNav } from "@/components/docs";

// Elevated Dark Theme
const theme = {
  bg: '#FFFFFF',
  elevated: '#F8FAFC',
  surface: '#F1F5F9',
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.75)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  border: 'rgba(10, 37, 64, 0.08)',
  divider: 'rgba(10, 37, 64, 0.05)',
  accent: '#00A896',
  accentLight: '#00D4AA',
};

const HowToWriteAnArgumentativeEssayClient = () => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  const keyComponents = [
    {
      id: 'claim',
      title: 'Clear Claim (Thesis)',
      description: 'Your position on the issue—specific, debatable, and defensible. This is what your entire essay argues for.',
      icon: <Target className="w-5 h-5" />,
      example: '"Universities should eliminate standardized test requirements because they perpetuate inequality and fail to predict academic success."'
    },
    {
      id: 'evidence',
      title: 'Strong Evidence',
      description: 'Facts, statistics, expert opinions, research studies, and real-world examples that support your claim.',
      icon: <Search className="w-5 h-5" />,
      example: 'Cite peer-reviewed studies showing test score correlation with family income rather than college performance.'
    },
    {
      id: 'reasoning',
      title: 'Logical Reasoning',
      description: 'Explanation of how your evidence supports your claim. Connect the dots for your reader.',
      icon: <TrendingUp className="w-5 h-5" />,
      example: '"Since standardized test prep courses cost thousands of dollars, these tests measure wealth more than ability."'
    },
    {
      id: 'counterargument',
      title: 'Counterarguments',
      description: 'Acknowledge opposing views and refute them with evidence. This strengthens your credibility.',
      icon: <Shield className="w-5 h-5" />,
      example: '"While some argue tests provide objective measures, research shows they actually correlate more with zip code than aptitude."'
    },
    {
      id: 'conclusion',
      title: 'Call to Action',
      description: 'Synthesize your argument and explain implications or next steps. Leave readers convinced.',
      icon: <Scale className="w-5 h-5" />,
      example: '"Eliminating test requirements would create more equitable admissions and better predict student success."'
    },
  ];

  const writingSteps = [
    {
      number: 1,
      title: 'Choose a Debatable Issue',
      description: 'Select a topic with multiple valid perspectives. Avoid topics that are purely factual or where there\'s universal agreement. Your issue should matter and have real-world implications.',
    },
    {
      number: 2,
      title: 'Research All Sides',
      description: 'Investigate your position AND opposing views thoroughly. Find credible sources: peer-reviewed journals, expert testimony, verified statistics. Understanding counterarguments makes your case stronger.',
    },
    {
      number: 3,
      title: 'Craft Your Thesis',
      description: 'State your position clearly and specifically. Your thesis should be arguable (not a fact), defensible (you can support it), and specific (not vague). Preview your main reasons if appropriate.',
    },
    {
      number: 4,
      title: 'Outline Your Arguments',
      description: 'Organize your strongest evidence into clear points. Decide where to address counterarguments (separate section or within body paragraphs). Arrange points logically—weakest to strongest often works well.',
    },
    {
      number: 5,
      title: 'Write with Evidence',
      description: 'Each body paragraph should present one main argument with specific evidence. Explain how evidence supports your claim. Use transitions to show logical connections between ideas.',
    },
    {
      number: 6,
      title: 'Address Counterarguments',
      description: 'Present opposing views fairly, then refute them with evidence. This demonstrates thorough thinking and strengthens your credibility. Use phrases like "While some argue..." or "Critics contend..."',
    },
    {
      number: 7,
      title: 'Conclude Powerfully',
      description: 'Restate your thesis in light of the evidence presented. Synthesize your arguments. Explain the broader significance or call readers to action. End memorably.',
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
            <Target style={{ width: '14px', height: '14px' }} />
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
            How to Write an Argumentative Essay
          </h1>
          
          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.8,
            color: theme.muted,
            marginBottom: '1.5rem'
          }}>
            Learn to construct compelling arguments that persuade readers through evidence and logic. Master thesis development, counterarguments, and the art of building a defensible position on complex issues.
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
              14 min read
            </span>
            <span>•</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        {/* What is an Argumentative Essay */}
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
            What is an Argumentative Essay?
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '1.25rem'
          }}>
            An argumentative essay takes a clear position on a debatable issue and defends that position using evidence, logic, and persuasion. Unlike expository essays that simply explain, argumentative essays aim to convince readers that your viewpoint is valid and superior to alternative perspectives.
          </p>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '1.25rem'
          }}>
            Think of argumentative essays as structured debates in written form. You're making a case like a lawyer presenting to a jury—presenting evidence, addressing counterarguments, and guiding readers to accept your conclusion. The key difference from persuasive writing is the emphasis on <em>logical reasoning</em> and <em>credible evidence</em> over emotional appeals.
          </p>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
          }}>
            These essays appear frequently in academic settings, opinion pieces, policy recommendations, and anywhere rigorous debate occurs. They teach critical thinking by requiring you to research thoroughly, consider multiple perspectives, and build airtight arguments.
          </p>
        </section>

        {/* Key Components */}
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
            5 Essential Components
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '2rem'
          }}>
            Every strong argumentative essay contains these elements. Master each to build persuasive, credible arguments.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1rem' }}>
            {keyComponents.map((component) => (
              <div
                key={component.id}
                onMouseEnter={() => setHoveredComponent(component.id)}
                onMouseLeave={() => setHoveredComponent(null)}
                style={{
                  background: hoveredComponent === component.id
                    ? 'linear-gradient(135deg, rgba(39, 39, 42, 0.95) 0%, rgba(31, 31, 35, 0.8) 100%)'
                    : 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
                  border: `1px solid ${hoveredComponent === component.id ? 'rgba(159, 122, 234, 0.3)' : theme.border}`,
                  borderRadius: '16px',
                  padding: '1.5rem',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: hoveredComponent === component.id
                    ? '0 12px 32px rgba(159, 122, 234, 0.2)'
                    : '0 4px 16px rgba(0, 0, 0, 0.15)',
                  transform: hoveredComponent === component.id ? 'translateY(-2px)' : 'translateY(0)',
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
                    flexShrink: 0
                  }}>
                    {component.icon}
                  </div>

                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: 500,
                      color: theme.text,
                      marginBottom: '0.5rem'
                    }}>
                      {component.title}
                    </h3>

                    <p style={{
                      fontSize: '0.9375rem',
                      lineHeight: 1.6,
                      color: theme.muted,
                      marginBottom: '0.75rem'
                    }}>
                      {component.description}
                    </p>

                    <div style={{
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '8px',
                      borderLeft: `3px solid ${theme.accent}`
                    }}>
                      <p style={{
                        fontSize: '0.875rem',
                        lineHeight: 1.6,
                        color: theme.muted,
                        margin: 0,
                        fontStyle: 'italic'
                      }}>
                        {component.example}
                      </p>
                    </div>
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
            Argumentative Essay Structure
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '2rem'
          }}>
            Argumentative essays follow a clear structure designed to build your case systematically. Here's the most effective organization:
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
                    <strong style={{ color: theme.text }}>Hook:</strong> Grab attention with a provocative question, surprising statistic, or relevant anecdote
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
                    <strong style={{ color: theme.text }}>Context:</strong> Provide background on the issue and why it matters
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
                    <strong style={{ color: theme.text }}>Thesis statement:</strong> State your position clearly and preview your main supporting arguments
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
                2. Body Paragraphs: Your Arguments (3-5)
              </h3>

              <p style={{
                fontSize: '0.9375rem',
                lineHeight: 1.6,
                color: theme.muted,
                marginBottom: '1rem'
              }}>
                Each paragraph presents one reason supporting your thesis:
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
                    <strong style={{ color: theme.text }}>Topic sentence:</strong> State your argument for this paragraph
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
                    <strong style={{ color: theme.text }}>Evidence:</strong> Present specific facts, statistics, expert quotes, or examples
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
                    <strong style={{ color: theme.text }}>Analysis:</strong> Explain how this evidence supports your claim
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
                    <strong style={{ color: theme.text }}>Link:</strong> Connect to your thesis and transition to next point
                  </span>
                </li>
              </ul>
            </div>

            {/* Counterargument */}
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
                3. Counterargument & Rebuttal
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
                    <strong style={{ color: theme.text }}>Acknowledge:</strong> Present opposing viewpoints fairly and accurately
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
                    <strong style={{ color: theme.text }}>Refute:</strong> Use evidence to show why counterarguments are weak or flawed
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
                    <strong style={{ color: theme.text }}>Reinforce:</strong> Strengthen your original position by comparison
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
                4. Conclusion
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
                    <strong style={{ color: theme.text }}>Restate thesis:</strong> Remind readers of your position (don't just copy-paste)
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
                    <strong style={{ color: theme.text }}>Synthesize:</strong> Briefly recap your strongest arguments
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
                    <strong style={{ color: theme.text }}>Broader implications:</strong> Explain why your argument matters beyond the essay
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
                    <strong style={{ color: theme.text }}>Call to action (optional):</strong> Suggest what readers should do or think
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

        {/* Thesis Examples */}
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
            Strong vs. Weak Thesis Statements
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '2rem'
          }}>
            Your thesis is the backbone of your argumentative essay. Compare these examples to understand what makes a thesis strong:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1.5rem' }}>
            {/* Example 1 */}
            <div>
              <div style={{
                padding: '1.25rem',
                background: 'rgba(248, 113, 113, 0.05)',
                border: '1px solid rgba(248, 113, 113, 0.2)',
                borderRadius: '12px 12px 0 0',
                borderBottom: 'none'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem'
                }}>
                  <AlertTriangle style={{ width: '18px', height: '18px', color: '#f87171' }} />
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.05em',
                    color: '#f87171'
                  }}>
                    Weak Thesis
                  </span>
                </div>
                <p style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: theme.muted,
                  margin: 0,
                  fontStyle: 'italic'
                }}>
                  "Social media has both good and bad effects on teenagers."
                </p>
              </div>
              <div style={{
                padding: '1.25rem',
                background: 'rgba(34, 197, 94, 0.05)',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                borderRadius: '0 0 12px 12px',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem'
                }}>
                  <CheckCircle style={{ width: '18px', height: '18px', color: '#22c55e' }} />
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.05em',
                    color: '#22c55e'
                  }}>
                    Strong Thesis
                  </span>
                </div>
                <p style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: theme.muted,
                  margin: 0,
                  fontStyle: 'italic'
                }}>
                  "Schools should implement mandatory digital literacy programs because excessive social media use correlates with increased anxiety, reduced attention spans, and cyberbullying among teenagers."
                </p>
              </div>
            </div>

            {/* Example 2 */}
            <div>
              <div style={{
                padding: '1.25rem',
                background: 'rgba(248, 113, 113, 0.05)',
                border: '1px solid rgba(248, 113, 113, 0.2)',
                borderRadius: '12px 12px 0 0',
                borderBottom: 'none'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem'
                }}>
                  <AlertTriangle style={{ width: '18px', height: '18px', color: '#f87171' }} />
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.05em',
                    color: '#f87171'
                  }}>
                    Weak Thesis
                  </span>
                </div>
                <p style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: theme.muted,
                  margin: 0,
                  fontStyle: 'italic'
                }}>
                  "Climate change is happening and we should do something about it."
                </p>
              </div>
              <div style={{
                padding: '1.25rem',
                background: 'rgba(34, 197, 94, 0.05)',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                borderRadius: '0 0 12px 12px',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem'
                }}>
                  <CheckCircle style={{ width: '18px', height: '18px', color: '#22c55e' }} />
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.05em',
                    color: '#22c55e'
                  }}>
                    Strong Thesis
                  </span>
                </div>
                <p style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: theme.muted,
                  margin: 0,
                  fontStyle: 'italic'
                }}>
                  "Governments must prioritize renewable energy investment over fossil fuels because transitioning to clean energy within the next decade is essential to prevent catastrophic climate tipping points, as demonstrated by IPCC reports and economic analyses showing long-term cost savings."
                </p>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'rgba(139, 92, 246, 0.08)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '12px',
          }}>
            <h3 style={{
              fontSize: '1.0625rem',
              fontWeight: 600,
              color: theme.text,
              marginBottom: '0.75rem'
            }}>
              What Makes a Thesis Strong?
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column' as const,
              gap: '0.5rem'
            }}>
              <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9375rem', lineHeight: 1.6, color: theme.muted }}>
                <CheckCircle style={{ width: '18px', height: '18px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <span><strong style={{ color: theme.text }}>Specific:</strong> Not vague or general—makes a clear, definable claim</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9375rem', lineHeight: 1.6, color: theme.muted }}>
                <CheckCircle style={{ width: '18px', height: '18px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <span><strong style={{ color: theme.text }}>Debatable:</strong> Others could reasonably disagree with your position</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9375rem', lineHeight: 1.6, color: theme.muted }}>
                <CheckCircle style={{ width: '18px', height: '18px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <span><strong style={{ color: theme.text }}>Defensible:</strong> You can support it with credible evidence</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9375rem', lineHeight: 1.6, color: theme.muted }}>
                <CheckCircle style={{ width: '18px', height: '18px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <span><strong style={{ color: theme.text }}>Assertive:</strong> Takes a clear stance rather than sitting on the fence</span>
              </li>
            </ul>
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
            Build Stronger Arguments with AI
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '1.5rem'
          }}>
            Esy helps you craft more persuasive argumentative essays by strengthening your research, refining your reasoning, and identifying weak points in your arguments.
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
                  <strong style={{ color: theme.text }}>Find counterarguments:</strong>
                  <span style={{ color: theme.muted }}> Identify opposing viewpoints you might have missed</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: theme.text }}>Strengthen thesis statements:</strong>
                  <span style={{ color: theme.muted }}> Refine vague claims into specific, defensible positions</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: theme.text }}>Research evidence:</strong>
                  <span style={{ color: theme.muted }}> Quickly find credible sources and statistics to support arguments</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: theme.text }}>Logical flow checking:</strong>
                  <span style={{ color: theme.muted }}> Identify gaps in reasoning or weak connections between ideas</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: theme.text }}>Rebuttal development:</strong>
                  <span style={{ color: theme.muted }}> Generate effective responses to counterarguments</span>
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
              href="/docs/chatgpt-prompts-for-academic-writing"
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
              Browse argumentative essay prompts
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
              href="/docs/how-to-write-a-thesis-statement"
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
                      How to Write a Thesis Statement
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: theme.muted,
                      margin: 0
                    }}>
                      Craft strong, arguable thesis statements that anchor your essay
                    </p>
                  </div>
                  <ArrowRight style={{ width: '20px', height: '20px', color: theme.accent }} />
                </div>
              </div>
            </Link>

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
                      Learn to explain topics clearly without arguing for a position
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
                      Learn the fundamentals of essay writing
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
                <strong style={{ color: theme.text }}>Purdue Online Writing Lab (OWL).</strong> (2024). <em>Argumentative Essays</em>. Purdue University. Retrieved from{' '}
                <a 
                  href="https://owl.purdue.edu/owl/general_writing/academic_writing/essay_writing/argumentative_essays.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}40` }}
                >
                  owl.purdue.edu
                </a>
              </p>

              <p style={{ margin: 0 }}>
                <strong style={{ color: theme.text }}>Harvard College Writing Center.</strong> (2024). <em>Developing a Thesis and Supporting Arguments</em>. Harvard University. Retrieved from{' '}
                <a 
                  href="https://writingcenter.fas.harvard.edu/pages/developing-thesis"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}40` }}
                >
                  writingcenter.fas.harvard.edu
                </a>
              </p>

              <p style={{ margin: 0 }}>
                <strong style={{ color: theme.text }}>The Writing Center, University of North Carolina at Chapel Hill.</strong> (2024). <em>Argument</em>. Retrieved from{' '}
                <a 
                  href="https://writingcenter.unc.edu/tips-and-tools/argument/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}40` }}
                >
                  writingcenter.unc.edu
                </a>
              </p>

              <p style={{ margin: 0 }}>
                <strong style={{ color: theme.text }}>Grammarly.</strong> (2024). <em>How to Write an Argumentative Essay</em>. Retrieved from{' '}
                <a 
                  href="https://www.grammarly.com/blog/argumentative-essay"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}40` }}
                >
                  grammarly.com
                </a>
              </p>

              <p style={{ margin: 0 }}>
                <strong style={{ color: theme.text }}>Scribbr.</strong> (2024). <em>How to Write an Argumentative Essay</em>. Retrieved from{' '}
                <a 
                  href="https://www.scribbr.com/academic-essay/argumentative-essay/"
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

export default HowToWriteAnArgumentativeEssayClient;

