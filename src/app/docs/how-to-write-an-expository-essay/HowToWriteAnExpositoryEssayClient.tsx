"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Lightbulb,
  FileText,
  CheckCircle,
  Target,
  Sparkles,
  ArrowRight,
  Clock,
  List,
  Search,
  TrendingUp,
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

const HowToWriteAnExpositoryEssayClient = () => {
  const [hoveredType, setHoveredType] = useState<string | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const expositoryTypes = [
    {
      id: 'definition',
      title: 'Definition Essay',
      description: 'Explains the meaning of a term, concept, or idea in depth. Goes beyond dictionary definitions to explore nuances and contexts.',
      icon: <BookOpen className="w-5 h-5" />,
      example: 'What is social entrepreneurship and how does it differ from traditional business?'
    },
    {
      id: 'classification',
      title: 'Classification Essay',
      description: 'Organizes subjects into categories or groups based on shared characteristics. Explains criteria for each group.',
      icon: <List className="w-5 h-5" />,
      example: 'The three main types of renewable energy sources: solar, wind, and hydroelectric.'
    },
    {
      id: 'process',
      title: 'Process Essay',
      description: 'Explains how something works or how to do something step-by-step. Clear, sequential instructions or explanations.',
      icon: <TrendingUp className="w-5 h-5" />,
      example: 'How photosynthesis converts sunlight into chemical energy in plants.'
    },
    {
      id: 'compare-contrast',
      title: 'Compare and Contrast',
      description: 'Examines similarities and differences between two or more subjects to draw meaningful conclusions.',
      icon: <Target className="w-5 h-5" />,
      example: 'Comparing traditional education with online learning: benefits and drawbacks.'
    },
    {
      id: 'cause-effect',
      title: 'Cause and Effect',
      description: 'Explores the reasons why something happened and/or the consequences of an event or phenomenon.',
      icon: <Search className="w-5 h-5" />,
      example: 'The causes and effects of climate change on coastal ecosystems.'
    },
  ];

  const writingSteps = [
    {
      number: 1,
      title: 'Choose Your Topic and Type',
      description: 'Select a topic that can be explained objectively with facts. Determine which expository type best suits your subject (definition, process, cause-effect, etc.).',
    },
    {
      number: 2,
      title: 'Research Thoroughly',
      description: 'Gather credible facts, statistics, examples, and expert opinions. Expository essays require evidence, not opinions. Use academic sources, studies, and verified data.',
    },
    {
      number: 3,
      title: 'Create a Clear Thesis',
      description: 'State what you will explain and how. Your thesis should preview your main points without taking a debatable position. Focus on informing, not persuading.',
    },
    {
      number: 4,
      title: 'Outline Your Structure',
      description: 'Organize your explanation logically. Each body paragraph should cover one aspect of your topic. Arrange in a sequence that makes sense (chronological, importance, or categorical).',
    },
    {
      number: 5,
      title: 'Write with Clarity',
      description: 'Use clear, straightforward language. Define technical terms, provide examples, and use transitions to guide readers through your explanation. Avoid personal opinions.',
    },
    {
      number: 6,
      title: 'Revise for Coherence',
      description: 'Ensure each paragraph connects to your thesis. Check that explanations are clear and complete. Verify all facts are accurate and properly cited.',
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
            <BookOpen style={{ width: '14px', height: '14px' }} />
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
            How to Write an Expository Essay
          </h1>
          
          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.8,
            color: theme.muted,
            marginBottom: '1.5rem'
          }}>
            Master the art of explaining complex topics clearly. Learn the structure, techniques, and types of expository writing that inform and educate your readers with facts and logical organization.
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
              12 min read
            </span>
            <span>•</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        {/* What is an Expository Essay */}
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
            What is an Expository Essay?
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '1.25rem'
          }}>
            An expository essay is a type of academic writing that explains, describes, or informs the reader about a specific topic using factual information. The word "expository" comes from "expose," meaning to present or explain. Unlike argumentative or persuasive essays, expository writing doesn't argue for a position—it clarifies a concept, explains a process, or provides information in a balanced, objective manner.
          </p>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '1.25rem'
          }}>
            Think of expository essays as the teaching tools of academic writing. They answer questions like "What is this?" "How does this work?" or "Why did this happen?" You'll encounter expository writing frequently in textbooks, news articles, how-to guides, and encyclopedia entries—anywhere the goal is to inform rather than persuade.
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
              <Lightbulb style={{ width: '20px', height: '20px', color: theme.accent }} />
              Key Characteristics
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ color: theme.muted, fontSize: '0.9375rem', lineHeight: 1.6 }}>
                  <strong style={{ color: theme.text }}>Objective tone:</strong> Present facts without personal bias or emotional language
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ color: theme.muted, fontSize: '0.9375rem', lineHeight: 1.6 }}>
                  <strong style={{ color: theme.text }}>Evidence-based:</strong> Support every point with facts, statistics, examples, or expert testimony
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
                  <strong style={{ color: theme.text }}>Third-person perspective:</strong> Typically avoid "I" or "you"—focus on the subject
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Expository Essays */}
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
            5 Types of Expository Essays
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '2rem'
          }}>
            Expository essays come in several forms, each serving a specific explanatory purpose. Understanding these types helps you choose the right approach for your topic.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1rem' }}>
            {expositoryTypes.map((type) => (
              <div
                key={type.id}
                onMouseEnter={() => setHoveredType(type.id)}
                onMouseLeave={() => setHoveredType(null)}
                style={{
                  background: hoveredType === type.id
                    ? 'linear-gradient(135deg, rgba(39, 39, 42, 0.95) 0%, rgba(31, 31, 35, 0.8) 100%)'
                    : 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
                  border: `1px solid ${hoveredType === type.id ? 'rgba(159, 122, 234, 0.3)' : theme.border}`,
                  borderRadius: '16px',
                  padding: '1.5rem',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: hoveredType === type.id
                    ? '0 12px 32px rgba(159, 122, 234, 0.2)'
                    : '0 4px 16px rgba(0, 0, 0, 0.15)',
                  transform: hoveredType === type.id ? 'translateY(-2px)' : 'translateY(0)',
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
                    {type.icon}
                  </div>

                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: 500,
                      color: theme.text,
                      marginBottom: '0.5rem'
                    }}>
                      {type.title}
                    </h3>

                    <p style={{
                      fontSize: '0.9375rem',
                      lineHeight: 1.6,
                      color: theme.muted,
                      marginBottom: '0.75rem'
                    }}>
                      {type.description}
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
                        <strong style={{ color: theme.text, fontStyle: 'normal' }}>Example topic:</strong> {type.example}
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
            Expository Essay Structure
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '2rem'
          }}>
            Like most academic essays, expository essays follow a standard five-paragraph structure (or longer for complex topics). Each section serves a specific purpose in your explanation.
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
                    <strong style={{ color: theme.text }}>Hook:</strong> Start with an interesting fact, statistic, or question to engage readers
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
                    <strong style={{ color: theme.text }}>Background:</strong> Provide necessary context to understand your topic
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
                    <strong style={{ color: theme.text }}>Thesis statement:</strong> Clearly state what you will explain and preview your main points
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
                2. Body Paragraphs (3+)
              </h3>

              <p style={{
                fontSize: '0.9375rem',
                lineHeight: 1.6,
                color: theme.muted,
                marginBottom: '1rem'
              }}>
                Each body paragraph should focus on one main point that supports your thesis. Use this structure:
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
                    <strong style={{ color: theme.text }}>Topic sentence:</strong> Introduce the paragraph's main idea
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
                    <strong style={{ color: theme.text }}>Evidence:</strong> Present facts, statistics, examples, or expert quotes
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
                    <strong style={{ color: theme.text }}>Explanation:</strong> Clarify how the evidence relates to your topic
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
                    <strong style={{ color: theme.text }}>Transition:</strong> Connect smoothly to the next paragraph
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
                    <strong style={{ color: theme.text }}>Restate thesis:</strong> Summarize what you explained (in different words)
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
                    <strong style={{ color: theme.text }}>Recap key points:</strong> Briefly review your main explanations
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
                    <strong style={{ color: theme.text }}>Closing thought:</strong> Leave readers with significance or broader implications
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

        {/* Example Thesis Statements */}
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
            A strong expository thesis clearly states what you will explain and often previews your main points. Notice how these examples inform without arguing:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1.25rem' }}>
            <div style={{
              padding: '1.5rem',
              background: 'rgba(34, 197, 94, 0.05)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: '12px',
            }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.05em',
                color: '#22c55e',
                marginBottom: '0.75rem'
              }}>
                Definition Essay
              </div>
              <p style={{
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                color: theme.muted,
                margin: 0,
                fontStyle: 'italic'
              }}>
                "Sustainable agriculture encompasses farming practices that meet current food needs without compromising future generations' ability to produce food, focusing on environmental health, economic profitability, and social equity."
              </p>
            </div>

            <div style={{
              padding: '1.5rem',
              background: 'rgba(34, 197, 94, 0.05)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: '12px',
            }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.05em',
                color: '#22c55e',
                marginBottom: '0.75rem'
              }}>
                Process Essay
              </div>
              <p style={{
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                color: theme.muted,
                margin: 0,
                fontStyle: 'italic'
              }}>
                "Photosynthesis occurs in three main stages: light absorption by chlorophyll, conversion of light energy into chemical energy, and synthesis of glucose from carbon dioxide and water."
              </p>
            </div>

            <div style={{
              padding: '1.5rem',
              background: 'rgba(34, 197, 94, 0.05)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: '12px',
            }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.05em',
                color: '#22c55e',
                marginBottom: '0.75rem'
              }}>
                Cause and Effect Essay
              </div>
              <p style={{
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                color: theme.muted,
                margin: 0,
                fontStyle: 'italic'
              }}>
                "The Industrial Revolution resulted from several key factors including technological innovations in textile manufacturing, abundant natural resources, and a growing urban workforce, leading to unprecedented economic growth and social transformation."
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
            Write Expository Essays Faster with AI
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '1.5rem'
          }}>
            Esy helps you at every stage of writing expository essays—from researching complex topics to organizing clear explanations.
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
                  <strong style={{ color: theme.text }}>Research assistance:</strong>
                  <span style={{ color: theme.muted }}> Summarize academic papers and extract key facts quickly</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: theme.text }}>Outline generation:</strong>
                  <span style={{ color: theme.muted }}> Create logical structures for complex explanations</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: theme.text }}>Clarity checking:</strong>
                  <span style={{ color: theme.muted }}> Ensure your explanations are clear and easy to understand</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: theme.text }}>Example generation:</strong>
                  <span style={{ color: theme.muted }}> Get relevant examples to illustrate complex concepts</span>
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
              Browse 50+ prompts for academic writing
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
              href="/docs/how-to-write-an-argumentative-essay"
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
                      How to Write an Argumentative Essay
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: theme.muted,
                      margin: 0
                    }}>
                      Take a position and defend it with evidence and reasoning
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
                <strong style={{ color: theme.text }}>Purdue Online Writing Lab (OWL).</strong> (2024). <em>Expository Essays</em>. Purdue University. Retrieved from{' '}
                <a 
                  href="https://owl.purdue.edu/owl/general_writing/academic_writing/essay_writing/expository_essays.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}40` }}
                >
                  owl.purdue.edu
                </a>
              </p>

              <p style={{ margin: 0 }}>
                <strong style={{ color: theme.text }}>The Writing Center, University of North Carolina at Chapel Hill.</strong> (2024). <em>What is an Expository Essay?</em> Retrieved from{' '}
                <a 
                  href="https://writingcenter.unc.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}40` }}
                >
                  writingcenter.unc.edu
                </a>
              </p>

              <p style={{ margin: 0 }}>
                <strong style={{ color: theme.text }}>Grammarly.</strong> (2024). <em>How to Write an Expository Essay</em>. Retrieved from{' '}
                <a 
                  href="https://www.grammarly.com/blog/expository-essay"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}40` }}
                >
                  grammarly.com
                </a>
              </p>

              <p style={{ margin: 0 }}>
                <strong style={{ color: theme.text }}>Scribbr.</strong> (2024). <em>How to Write an Expository Essay</em>. Retrieved from{' '}
                <a 
                  href="https://www.scribbr.com/academic-essay/expository-essay/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}40` }}
                >
                  scribbr.com
                </a>
              </p>

              <p style={{ margin: 0 }}>
                <strong style={{ color: theme.text }}>Literary Devices.</strong> (2024). <em>Expository Writing</em>. Retrieved from{' '}
                <a 
                  href="https://literarydevices.net/expository-writing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}40` }}
                >
                  literarydevices.net
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

export default HowToWriteAnExpositoryEssayClient;

