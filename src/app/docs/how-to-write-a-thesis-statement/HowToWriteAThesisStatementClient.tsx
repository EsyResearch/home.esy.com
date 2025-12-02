"use client";
/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import Link from "next/link";
import {
  Target,
  CheckCircle,
  BookOpen,
  Sparkles,
  ArrowRight,
  Clock,
  AlertTriangle,
  Lightbulb,
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

const HowToWriteAThesisStatementClient = () => {
  const [hoveredQuality, setHoveredQuality] = useState<string | null>(null);

  const keyQualities = [
    {
      id: 'specific',
      title: 'Specific & Focused',
      description: 'Narrow your topic to something manageable. Avoid vague or overly broad statements.',
      weak: '"Social media affects society."',
      strong: '"Instagram\'s algorithmic feed design exploits dopamine responses to maximize user engagement, contributing to increased anxiety among teenage users."'
    },
    {
      id: 'arguable',
      title: 'Arguable & Debatable',
      description: 'Present a position others could reasonably disagree with. Pure facts make weak theses.',
      weak: '"Many students use ChatGPT." (fact, not arguable)',
      strong: '"Universities should integrate AI writing tools into curricula because banning them ignores the reality of how professional writing now happens." (debatable position)'
    },
    {
      id: 'assertive',
      title: 'Assertive & Clear',
      description: 'Take a definitive stance. Avoid hedging with "maybe," "might," or "could."',
      weak: '"Remote work might have some benefits and drawbacks."',
      strong: '"Remote work increases productivity for knowledge workers while reducing organizational cohesion, requiring companies to redesign collaboration strategies."'
    },
    {
      id: 'defensible',
      title: 'Defensible with Evidence',
      description: 'Ensure you can support your claim with credible sources and logical arguments.',
      weak: '"Aliens definitely visited ancient civilizations." (no credible evidence)',
      strong: '"The rise of authoritarianism correlates with economic inequality, as demonstrated by political shifts in Hungary, Turkey, and Brazil since 2010." (can cite studies)'
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
            Essay Foundation
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
            How to Write a Thesis Statement
          </h1>
          
          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.8,
            color: theme.muted,
            marginBottom: '1.5rem'
          }}>
            Your thesis statement is the most important sentence in your essay. Learn to craft clear, arguable, specific statements that anchor powerful arguments and guide readers through your writing.
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
              9 min read
            </span>
            <span>•</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        {/* What is a Thesis Statement */}
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
            What is a Thesis Statement?
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '1.25rem'
          }}>
            A thesis statement is a single sentence (occasionally two) that presents your essay's main argument or claim. It typically appears at the end of your introduction paragraph and acts as a roadmap—telling readers exactly what position you'll defend and often previewing your main supporting points.
          </p>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '1.25rem'
          }}>
            Think of your thesis as a promise to your reader: <em>"This is what I will prove to you."</em> Everything that follows in your essay should support this central claim. A weak thesis creates unfocused, meandering essays; a strong thesis produces clear, persuasive arguments.
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
              Quick Formula
            </h3>

            <div style={{
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '8px',
              borderLeft: `3px solid ${theme.accent}`,
              fontFamily: 'monospace',
              fontSize: '0.9375rem',
              lineHeight: 1.7,
              color: theme.muted
            }}>
              <strong style={{ color: theme.text }}>Basic Formula:</strong><br />
              [Topic] + [Position/Claim] + [Reasons/Support]
              <br /><br />
              <strong style={{ color: theme.text }}>Example:</strong><br />
              "Remote work [topic] increases productivity for knowledge workers [position] because it eliminates commute time, reduces office distractions, and allows for flexible scheduling [reasons]."
            </div>
          </div>
        </section>

        {/* Divider */}
        <div style={{
          borderTop: `1px solid ${theme.divider}`,
          margin: 'clamp(4rem, 8vh, 6rem) 0'
        }} />

        {/* Key Qualities */}
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
            4 Qualities of Strong Thesis Statements
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '2rem'
          }}>
            Every effective thesis statement shares these four characteristics:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1rem' }}>
            {keyQualities.map((quality) => (
              <div
                key={quality.id}
                onMouseEnter={() => setHoveredQuality(quality.id)}
                onMouseLeave={() => setHoveredQuality(null)}
                style={{
                  background: hoveredQuality === quality.id
                    ? 'linear-gradient(135deg, rgba(39, 39, 42, 0.95) 0%, rgba(31, 31, 35, 0.8) 100%)'
                    : 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
                  border: `1px solid ${hoveredQuality === quality.id ? 'rgba(159, 122, 234, 0.3)' : theme.border}`,
                  borderRadius: '16px',
                  padding: '1.5rem',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: hoveredQuality === quality.id
                    ? '0 12px 32px rgba(159, 122, 234, 0.2)'
                    : '0 4px 16px rgba(0, 0, 0, 0.15)',
                  transform: hoveredQuality === quality.id ? 'translateY(-2px)' : 'translateY(0)',
                }}
              >
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 500,
                  color: theme.text,
                  marginBottom: '0.75rem'
                }}>
                  <CheckCircle style={{ 
                    width: '20px', 
                    height: '20px', 
                    display: 'inline-block',
                    marginRight: '0.5rem',
                    color: '#22c55e',
                    verticalAlign: 'middle'
                  }} />
                  {quality.title}
                </h3>

                <p style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.6,
                  color: theme.muted,
                  marginBottom: '1rem'
                }}>
                  {quality.description}
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '0.75rem'
                }}>
                  <div style={{
                    padding: '0.75rem',
                    background: 'rgba(248, 113, 113, 0.05)',
                    border: '1px solid rgba(248, 113, 113, 0.2)',
                    borderRadius: '8px',
                  }}>
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.05em',
                      color: '#f87171',
                      marginBottom: '0.5rem'
                    }}>
                      ✗ WEAK
                    </div>
                    <p style={{
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      color: theme.muted,
                      margin: 0,
                      fontStyle: 'italic'
                    }}>
                      {quality.weak}
                    </p>
                  </div>

                  <div style={{
                    padding: '0.75rem',
                    background: 'rgba(34, 197, 94, 0.05)',
                    border: '1px solid rgba(34, 197, 94, 0.2)',
                    borderRadius: '8px',
                  }}>
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.05em',
                      color: '#22c55e',
                      marginBottom: '0.5rem'
                    }}>
                      ✓ STRONG
                    </div>
                    <p style={{
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      color: theme.muted,
                      margin: 0,
                      fontStyle: 'italic'
                    }}>
                      {quality.strong}
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

        {/* Types by Essay Type */}
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
            Thesis Statements by Essay Type
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '2rem'
          }}>
            Different essay types require different thesis approaches:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1.25rem' }}>
            {/* Argumentative */}
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
                marginBottom: '0.75rem',
                fontFamily: 'var(--font-literata)'
              }}>
                Argumentative Essay
              </h3>
              <p style={{
                fontSize: '0.9375rem',
                lineHeight: 1.6,
                color: theme.muted,
                marginBottom: '1rem'
              }}>
                Takes a clear position and previews your arguments. Often includes "because" or lists reasons.
              </p>
              <div style={{
                padding: '0.875rem',
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
                  "Universities should adopt test-optional admissions policies because standardized tests correlate with socioeconomic status rather than academic ability, alternative assessments exist, and early adopters report more diverse student bodies without sacrificing academic quality."
                </p>
              </div>
            </div>

            {/* Analytical */}
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
                marginBottom: '0.75rem',
                fontFamily: 'var(--font-literata)'
              }}>
                Analytical Essay
              </h3>
              <p style={{
                fontSize: '0.9375rem',
                lineHeight: 1.6,
                color: theme.muted,
                marginBottom: '1rem'
              }}>
                Breaks down a topic into components and explains relationships. Focus on "how" or "why."
              </p>
              <div style={{
                padding: '0.875rem',
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
                  "Shakespeare's use of light and dark imagery in Romeo and Juliet reinforces the play's central theme that passionate love exists in tension with societal constraints, ultimately suggesting that such love cannot survive in a world governed by family feuds."
                </p>
              </div>
            </div>

            {/* Expository */}
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
                marginBottom: '0.75rem',
                fontFamily: 'var(--font-literata)'
              }}>
                Expository/Informative Essay
              </h3>
              <p style={{
                fontSize: '0.9375rem',
                lineHeight: 1.6,
                color: theme.muted,
                marginBottom: '1rem'
              }}>
                States what you'll explain without arguing. Focuses on informing readers about a topic.
              </p>
              <div style={{
                padding: '0.875rem',
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
                  "Blockchain technology operates through three core mechanisms—distributed ledgers, cryptographic hashing, and consensus algorithms—that together enable secure, transparent transactions without centralized authority."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div style={{
          borderTop: `1px solid ${theme.divider}`,
          margin: 'clamp(4rem, 8vh, 6rem) 0'
        }} />

        {/* Step by Step */}
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
            How to Write Your Thesis Statement
          </h2>

          <div style={{
            padding: '1.75rem',
            background: 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
            border: `1px solid ${theme.border}`,
            borderRadius: '16px',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              background: 'rgba(139, 92, 246, 0.2)',
              color: theme.accent,
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: 700,
              marginBottom: '1rem'
            }}>
              STEP 1
            </div>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 500,
              color: theme.text,
              marginBottom: '0.5rem'
            }}>
              Start with a Question
            </h3>
            <p style={{
              fontSize: '0.9375rem',
              lineHeight: 1.6,
              color: theme.muted,
              marginBottom: '0.75rem'
            }}>
              Turn your topic into a question. Your thesis will be the answer.
            </p>
            <div style={{
              padding: '0.75rem',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '8px',
            }}>
              <p style={{
                fontSize: '0.875rem',
                color: theme.muted,
                margin: 0
              }}>
                <strong style={{ color: theme.text }}>Topic:</strong> Social media and mental health<br />
                <strong style={{ color: theme.text }}>Question:</strong> How does social media use affect teenage mental health?
              </p>
            </div>
          </div>

          <div style={{
            padding: '1.75rem',
            background: 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
            border: `1px solid ${theme.border}`,
            borderRadius: '16px',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              background: 'rgba(139, 92, 246, 0.2)',
              color: theme.accent,
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: 700,
              marginBottom: '1rem'
            }}>
              STEP 2
            </div>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 500,
              color: theme.text,
              marginBottom: '0.5rem'
            }}>
              Answer with a Position
            </h3>
            <p style={{
              fontSize: '0.9375rem',
              lineHeight: 1.6,
              color: theme.muted,
              marginBottom: '0.75rem'
            }}>
              Provide your answer. This becomes your claim.
            </p>
            <div style={{
              padding: '0.75rem',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '8px',
            }}>
              <p style={{
                fontSize: '0.875rem',
                color: theme.muted,
                margin: 0,
                fontStyle: 'italic'
              }}>
                "Excessive social media use negatively impacts teenage mental health."
              </p>
            </div>
          </div>

          <div style={{
            padding: '1.75rem',
            background: 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
            border: `1px solid ${theme.border}`,
            borderRadius: '16px',
          }}>
            <div style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              background: 'rgba(139, 92, 246, 0.2)',
              color: theme.accent,
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: 700,
              marginBottom: '1rem'
            }}>
              STEP 3
            </div>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 500,
              color: theme.text,
              marginBottom: '0.5rem'
            }}>
              Add Your Reasons
            </h3>
            <p style={{
              fontSize: '0.9375rem',
              lineHeight: 1.6,
              color: theme.muted,
              marginBottom: '0.75rem'
            }}>
              Strengthen your thesis by previewing your main supporting points.
            </p>
            <div style={{
              padding: '0.75rem',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '8px',
            }}>
              <p style={{
                fontSize: '0.875rem',
                color: theme.muted,
                margin: 0,
                fontStyle: 'italic'
              }}>
                "Excessive social media use negatively impacts teenage mental health <strong style={{ color: theme.text }}>by increasing anxiety through constant social comparison, disrupting sleep patterns with late-night scrolling, and reducing face-to-face social skills development</strong>."
              </p>
            </div>
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
            marginBottom: '1.5rem',
            color: theme.text,
          }}>
            Common Thesis Mistakes
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1.25rem' }}>
            <div style={{
              padding: '1.5rem',
              background: 'rgba(248, 113, 113, 0.05)',
              border: '1px solid rgba(248, 113, 113, 0.2)',
              borderRadius: '12px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem'
              }}>
                <AlertTriangle style={{
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
                    Too Broad
                  </h3>
                  <p style={{
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    color: theme.muted,
                    margin: 0
                  }}>
                    "Technology has changed society" is too vague. Narrow to specific technology, specific changes, and specific time periods or populations.
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              padding: '1.5rem',
              background: 'rgba(248, 113, 113, 0.05)',
              border: '1px solid rgba(248, 113, 113, 0.2)',
              borderRadius: '12px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem'
              }}>
                <AlertTriangle style={{
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
                    Just a Fact
                  </h3>
                  <p style={{
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    color: theme.muted,
                    margin: 0
                  }}>
                    "Shakespeare wrote many plays" states a fact, not an argument. You need a debatable interpretation or claim.
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              padding: '1.5rem',
              background: 'rgba(248, 113, 113, 0.05)',
              border: '1px solid rgba(248, 113, 113, 0.2)',
              borderRadius: '12px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem'
              }}>
                <AlertTriangle style={{
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
                    Announcement Format
                  </h3>
                  <p style={{
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    color: theme.muted,
                    margin: 0
                  }}>
                    Avoid "This essay will discuss..." or "I will prove..." Just state your argument directly.
                  </p>
                </div>
              </div>
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
            Craft Better Thesis Statements with AI
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '1.5rem'
          }}>
            Esy helps you refine vague ideas into sharp, arguable thesis statements that anchor powerful essays.
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
                  <strong style={{ color: theme.text }}>Specificity enhancement:</strong>
                  <span style={{ color: theme.muted }}> Transform broad topics into focused, manageable claims</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: theme.text }}>Arguability checking:</strong>
                  <span style={{ color: theme.muted }}> Identify whether your statement is debatable or merely factual</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: theme.text }}>Multiple variations:</strong>
                  <span style={{ color: theme.muted }}> Generate different ways to frame your central argument</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: theme.text }}>Supporting points:</strong>
                  <span style={{ color: theme.muted }}> Identify main reasons that strengthen your thesis</span>
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
                      Learn where and how to present your thesis effectively
                    </p>
                  </div>
                  <ArrowRight style={{ width: '20px', height: '20px', color: theme.accent }} />
                </div>
              </div>
            </Link>

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
                      Build compelling arguments around your thesis
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
                      Master the complete essay writing process
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
                <strong style={{ color: theme.text }}>Purdue Online Writing Lab (OWL).</strong> (2024). <em>Developing Strong Thesis Statements</em>. Purdue University. Retrieved from{' '}
                <a 
                  href="https://owl.purdue.edu/owl/general_writing/academic_writing/establishing_arguments/creating_a_thesis_statement.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}40` }}
                >
                  owl.purdue.edu
                </a>
              </p>

              <p style={{ margin: 0 }}>
                <strong style={{ color: theme.text }}>Harvard College Writing Center.</strong> (2024). <em>Developing a Thesis</em>. Harvard University. Retrieved from{' '}
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
                <strong style={{ color: theme.text }}>The Writing Center, University of North Carolina at Chapel Hill.</strong> (2024). <em>Thesis Statements</em>. Retrieved from{' '}
                <a 
                  href="https://writingcenter.unc.edu/tips-and-tools/thesis-statements/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}40` }}
                >
                  writingcenter.unc.edu
                </a>
              </p>

              <p style={{ margin: 0 }}>
                <strong style={{ color: theme.text }}>Grammarly.</strong> (2024). <em>How to Write a Thesis Statement</em>. Retrieved from{' '}
                <a 
                  href="https://www.grammarly.com/blog/thesis-statement"
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

export default HowToWriteAThesisStatementClient;

