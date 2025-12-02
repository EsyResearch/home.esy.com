"use client";
/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Lightbulb,
  FileText,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Clock,
  Target,
  Edit3,
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

const HowToWriteAnEssayClient = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const essayTypes = [
    {
      id: 'expository',
      title: 'Expository Essay',
      description: 'Explain or inform about a topic using facts, statistics, and examples. Clear, logical presentation of information.',
      href: '/docs/how-to-write-an-expository-essay',
      icon: <BookOpen className="w-6 h-6" />,
      searchVolume: '1.0K',
      difficulty: 'Easy'
    },
    {
      id: 'argumentative',
      title: 'Argumentative Essay',
      description: 'Take a position on an issue and support it with evidence. Address counterarguments and persuade readers.',
      href: '/docs/how-to-write-an-argumentative-essay',
      icon: <Target className="w-6 h-6" />,
      searchVolume: '5.6K',
      difficulty: 'Medium'
    },
    {
      id: 'informative',
      title: 'Informative Essay',
      description: 'Educate readers about a topic without opinions. Present balanced, factual information clearly.',
      href: '/docs/how-to-write-an-informative-essay',
      icon: <Lightbulb className="w-6 h-6" />,
      searchVolume: '2.0K',
      difficulty: 'Easy'
    },
    {
      id: 'narrative',
      title: 'Narrative Essay',
      description: 'Tell a story with a clear point or lesson. Use descriptive language and personal experience.',
      href: '#',
      icon: <Edit3 className="w-6 h-6" />,
      searchVolume: '1.5K',
      difficulty: 'Easy',
      comingSoon: true
    },
  ];

  const writingSteps = [
    {
      number: 1,
      title: 'Understand the Assignment',
      description: 'Read the prompt carefully. Identify the essay type, required length, formatting guidelines, and deadline. Clarify any questions with your instructor.',
      icon: <FileText className="w-5 h-5" />,
      aiHelp: 'Use AI to analyze complex prompts and identify key requirements.'
    },
    {
      number: 2,
      title: 'Choose Your Topic',
      description: 'Select a topic that interests you and fits the assignment. Narrow broad subjects to specific, manageable angles. Consider available research sources.',
      icon: <Target className="w-5 h-5" />,
      aiHelp: 'Generate topic ideas and evaluate their potential for research.'
    },
    {
      number: 3,
      title: 'Conduct Research',
      description: 'Gather credible sources from academic databases, books, and scholarly articles. Take organized notes and document citations as you research.',
      icon: <BookOpen className="w-5 h-5" />,
      aiHelp: 'Summarize research papers and extract key arguments quickly.'
    },
    {
      number: 4,
      title: 'Create an Outline',
      description: 'Organize your main ideas and supporting evidence logically. Structure with introduction, body paragraphs (one idea each), and conclusion.',
      icon: <CheckCircle className="w-5 h-5" />,
      aiHelp: 'Generate outline structures and organize research findings.'
    },
            {
              number: 5,
              title: 'Write Your Thesis',
              description: 'Craft a clear, specific statement that presents your main argument. It should be debatable and guide the entire essay. Note: Your thesis may evolve as you research and write—that\'s normal!',
              icon: <Lightbulb className="w-5 h-5" />,
              aiHelp: 'Refine and strengthen thesis statements for clarity and impact.'
            },
    {
      number: 6,
      title: 'Write the First Draft',
      description: 'Start with body paragraphs—expand your outline with evidence and analysis. Write the introduction and conclusion last.',
      icon: <Edit3 className="w-5 h-5" />,
      aiHelp: 'Overcome writer\'s block and generate paragraph drafts.'
    },
            {
              number: 7,
              title: 'Revise and Edit',
              description: 'Review for clarity, coherence, and argument strength. Revision means rethinking and reorganizing ideas, not just fixing errors. Check transitions, eliminate redundancy, and verify all citations. Then proofread for grammar and style.',
              icon: <CheckCircle className="w-5 h-5" />,
              aiHelp: 'Get suggestions for improving clarity, flow, and argumentation.'
            },
  ];

  const commonMistakes = [
    {
      mistake: 'Weak or Vague Thesis',
      solution: 'Make your thesis specific, debatable, and clear. Avoid statements that are too broad or merely factual.',
      example: 'Weak: "Social media is popular." Strong: "Social media platforms exploit psychological triggers to maximize user engagement, leading to addiction-like behaviors among young adults."'
    },
    {
      mistake: 'Lack of Clear Structure',
      solution: 'Each paragraph should have one main idea with topic sentence, evidence, analysis, and transition.',
      example: 'Use signposting: "First," "Furthermore," "In contrast," "Therefore"'
    },
    {
      mistake: 'Insufficient Evidence',
      solution: 'Support every claim with specific evidence: statistics, expert quotes, research findings, or examples.',
      example: 'Instead of "Many people agree," use "A 2023 Pew Research study of 2,000 participants found that 67% agreed..."'
    },
    {
      mistake: 'Plagiarism or Poor Citations',
      solution: 'Always cite sources properly using the required format (MLA, APA, Chicago). Paraphrase in your own words and use quotes sparingly.',
      example: 'Use citation management tools and run plagiarism checks before submission.'
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
            Essential Guide
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
            How to Write an Essay
          </h1>
          
          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.8,
            color: theme.muted,
            marginBottom: '1.5rem'
          }}>
            A comprehensive guide to mastering essay writing—from understanding the assignment to submitting a polished final draft. Learn traditional techniques and discover how AI can enhance your writing process.
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
              15 min read
            </span>
            <span>•</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        {/* Introduction */}
        <section style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '1.25rem'
          }}>
            Essay writing is a fundamental skill that extends far beyond academic settings. Whether you're a high school student tackling your first analytical essay, a college student crafting research papers, or a professional communicating complex ideas, mastering the essay format opens doors to clearer thinking and more persuasive communication.
          </p>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '1.25rem'
          }}>
            At its core, an essay is a structured piece of writing that presents and supports a central argument or explores a specific topic. The word "essay" comes from the French word <em>essayer</em>, meaning "to try" or "to attempt"—and that's precisely what you're doing: attempting to convince, inform, or engage your reader through well-organized prose.
          </p>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
          }}>
            This guide walks you through the entire essay writing process, from decoding the assignment prompt to polishing your final draft. You'll learn proven techniques used by successful writers, discover how to avoid common pitfalls, and explore how modern AI tools can enhance (not replace) your writing process.
          </p>
        </section>

        {/* The Essay Writing Process */}
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
            The Essay Writing Process
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '2rem'
          }}>
            Writing a strong essay isn't a linear process—it involves multiple stages of planning, drafting, and revision. Here's a proven framework that breaks down the process into manageable steps:
          </p>

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
                  {/* Step Number */}
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <div style={{ color: theme.accent }}>
                        {step.icon}
                      </div>
                      <h3 style={{
                        fontSize: '1.125rem',
                        fontWeight: 500,
                        color: theme.text,
                        margin: 0
                      }}>
                        {step.title}
                      </h3>
                    </div>

                    <p style={{
                      fontSize: '0.9375rem',
                      lineHeight: 1.6,
                      color: theme.muted,
                      marginBottom: '0.75rem'
                    }}>
                      {step.description}
                    </p>

                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                      padding: '0.75rem',
                      background: 'rgba(139, 92, 246, 0.08)',
                      borderRadius: '8px',
                      border: '1px solid rgba(139, 92, 246, 0.15)'
                    }}>
                      <Sparkles style={{ 
                        width: '16px', 
                        height: '16px', 
                        color: theme.accent,
                        marginTop: '2px',
                        flexShrink: 0
                      }} />
                      <p style={{
                        fontSize: '0.875rem',
                        lineHeight: 1.5,
                        color: theme.muted,
                        margin: 0
                      }}>
                        <strong style={{ color: theme.text }}>AI Assist:</strong> {step.aiHelp}
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

        {/* Types of Essays */}
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
            Types of Essays
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '2rem'
          }}>
            Different essays serve different purposes. Understanding the characteristics of each type helps you approach your assignment with the right strategy and structure.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.25rem'
          }}>
            {essayTypes.map((type) => (
              <Link
                key={type.id}
                href={type.href}
                style={{ textDecoration: 'none', pointerEvents: type.comingSoon ? 'none' : 'auto' }}
                onMouseEnter={() => !type.comingSoon && setHoveredCard(type.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={{
                  background: hoveredCard === type.id
                    ? 'linear-gradient(135deg, rgba(39, 39, 42, 0.95) 0%, rgba(31, 31, 35, 0.8) 100%)'
                    : 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
                  border: `1px solid ${hoveredCard === type.id ? 'rgba(159, 122, 234, 0.3)' : theme.border}`,
                  borderRadius: '16px',
                  padding: '1.75rem',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  cursor: type.comingSoon ? 'default' : 'pointer',
                  backdropFilter: 'blur(10px)',
                  boxShadow: hoveredCard === type.id
                    ? '0 12px 32px rgba(159, 122, 234, 0.2)'
                    : '0 4px 16px rgba(0, 0, 0, 0.15)',
                  transform: hoveredCard === type.id ? 'translateY(-4px)' : 'translateY(0)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column' as const,
                  opacity: type.comingSoon ? 0.6 : 1
                }}>
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
                    color: theme.accentLight,
                    marginBottom: '1.25rem',
                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.15)'
                  }}>
                    {type.icon}
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
                    {type.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontSize: '0.9375rem',
                    color: theme.muted,
                    lineHeight: 1.6,
                    marginBottom: '1.25rem',
                    flexGrow: 1
                  }}>
                    {type.description}
                  </p>

                  {/* Footer */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1rem',
                    borderTop: `1px solid ${theme.border}`
                  }}>
                    <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem' }}>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        background: 'rgba(139, 92, 246, 0.15)',
                        color: theme.accent,
                        borderRadius: '6px',
                        fontWeight: 600
                      }}>
                        {type.difficulty}
                      </span>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: theme.subtle,
                        borderRadius: '6px',
                        fontWeight: 600
                      }}>
                        {type.searchVolume}
                      </span>
                    </div>

                    {type.comingSoon ? (
                      <span style={{
                        fontSize: '0.75rem',
                        color: theme.subtle,
                        fontWeight: 500
                      }}>
                        Coming Soon
                      </span>
                    ) : (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        color: theme.accent,
                        fontSize: '0.875rem',
                        fontWeight: 500
                      }}>
                        Read guide
                        <ArrowRight style={{
                          width: '14px',
                          height: '14px',
                          transform: hoveredCard === type.id ? 'translateX(4px)' : 'translateX(0)',
                          transition: 'transform 0.2s ease'
                        }} />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div style={{
          borderTop: `1px solid ${theme.divider}`,
          margin: 'clamp(4rem, 8vh, 6rem) 0'
        }} />

        {/* Common Mistakes */}
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
            Common Mistakes to Avoid
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '2rem'
          }}>
            Even experienced writers fall into these traps. Recognizing them helps you produce clearer, more persuasive essays.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1.25rem' }}>
            {commonMistakes.map((item, index) => (
              <div
                key={index}
                style={{
                  padding: '1.5rem',
                  background: 'rgba(248, 113, 113, 0.05)',
                  border: '1px solid rgba(248, 113, 113, 0.2)',
                  borderRadius: '12px',
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  marginBottom: '0.75rem'
                }}>
                  <AlertCircle style={{
                    width: '20px',
                    height: '20px',
                    color: '#f87171',
                    marginTop: '2px',
                    flexShrink: 0
                  }} />
                  <div>
                    <h3 style={{
                      fontSize: '1.0625rem',
                      fontWeight: 600,
                      color: theme.text,
                      marginBottom: '0.5rem'
                    }}>
                      {item.mistake}
                    </h3>
                    <p style={{
                      fontSize: '0.9375rem',
                      lineHeight: 1.6,
                      color: theme.muted,
                      marginBottom: '0.75rem'
                    }}>
                      <strong style={{ color: theme.text }}>Solution:</strong> {item.solution}
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
                        {item.example}
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

        {/* Essential Components */}
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
            Master the Essential Components
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '2rem'
          }}>
            Every strong essay is built from these fundamental building blocks. Master each component to elevate your writing.
          </p>

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
                      Craft clear, arguable statements that guide your entire essay
                    </p>
                  </div>
                  <ArrowRight style={{ width: '20px', height: '20px', color: theme.accent }} />
                </div>
              </div>
            </Link>

            <Link
              href="/docs/how-to-write-an-essay-introduction"
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
                      How to Write an Essay Introduction
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: theme.muted,
                      margin: 0
                    }}>
                      Hook readers and set up your argument effectively
                    </p>
                  </div>
                  <ArrowRight style={{ width: '20px', height: '20px', color: theme.accent }} />
                </div>
              </div>
            </Link>

            <Link
              href="/docs/how-to-write-an-essay-conclusion"
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
                      How to Write an Essay Conclusion
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: theme.muted,
                      margin: 0
                    }}>
                      End with impact and reinforce your main arguments
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

        {/* Modern Approach with AI */}
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
            The Modern Approach: Writing with AI
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '1.5rem'
          }}>
            AI tools like Esy can significantly enhance your essay writing process—not by doing the work for you, but by helping you think more clearly, overcome writer's block, and refine your ideas faster.
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
              How Esy Enhances Each Stage
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: theme.text }}>Brainstorming:</strong>
                  <span style={{ color: theme.muted }}> Generate topic ideas, explore angles, and identify research questions</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: theme.text }}>Research:</strong>
                  <span style={{ color: theme.muted }}> Summarize complex papers, extract key arguments, and synthesize findings</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: theme.text }}>Outlining:</strong>
                  <span style={{ color: theme.muted }}> Create structured outlines and organize evidence logically</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: theme.text }}>Drafting:</strong>
                  <span style={{ color: theme.muted }}> Overcome writer's block, expand ideas, and refine paragraphs</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: theme.text }}>Revision:</strong>
                  <span style={{ color: theme.muted }}> Get feedback on clarity, strengthen arguments, and improve flow</span>
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
                <strong style={{ color: theme.text }}>The Writing Center, University of North Carolina at Chapel Hill.</strong> (2024). <em>Essays</em>. Retrieved from{' '}
                <a 
                  href="https://writingcenter.unc.edu/tips-and-tools/essays/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}40` }}
                >
                  writingcenter.unc.edu
                </a>
              </p>

              <p style={{ margin: 0 }}>
                <strong style={{ color: theme.text }}>Purdue Online Writing Lab (OWL).</strong> (2024). <em>Essay Writing</em>. Purdue University. Retrieved from{' '}
                <a 
                  href="https://owl.purdue.edu/owl/general_writing/academic_writing/essay_writing/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}40` }}
                >
                  owl.purdue.edu
                </a>
              </p>

              <p style={{ margin: 0 }}>
                <strong style={{ color: theme.text }}>Harvard College Writing Center.</strong> (2024). <em>Strategies for Essay Writing</em>. Harvard University. Retrieved from{' '}
                <a 
                  href="https://writingcenter.fas.harvard.edu/pages/strategies-essay-writing"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}40` }}
                >
                  writingcenter.fas.harvard.edu
                </a>
              </p>

              <p style={{ margin: 0 }}>
                <strong style={{ color: theme.text }}>Scribbr.</strong> (2024). <em>How to Write an Academic Essay</em>. Retrieved from{' '}
                <a 
                  href="https://www.scribbr.com/category/academic-essay/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}40` }}
                >
                  scribbr.com
                </a>
              </p>

              <p style={{ margin: 0 }}>
                <strong style={{ color: theme.text }}>Grammarly.</strong> (2024). <em>How to Write an Essay</em>. Retrieved from{' '}
                <a 
                  href="https://www.grammarly.com/blog/how-to-write-an-essay"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}40` }}
                >
                  grammarly.com
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

export default HowToWriteAnEssayClient;

