"use client";
/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  BookOpen,
  Sparkles,
  ArrowRight,
  Clock,
  AlertTriangle,
  Target,
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

const HowToWriteAnEssayConclusionClient = () => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const conclusionSteps = [
    {
      number: 1,
      title: 'Restate Your Thesis',
      description: 'Remind readers of your main argument, but don\'t just copy-paste. Rephrase it in light of the evidence you\'ve presented. Show how your argument has been proven.',
      example: 'Original thesis: "Universities should eliminate standardized tests." Restated: "Given their correlation with family income rather than academic potential, standardized testing requirements perpetuate educational inequality."'
    },
    {
      number: 2,
      title: 'Synthesize Key Points',
      description: 'Briefly recap your main arguments—but synthesize, don\'t just summarize. Show how your points work together to support your thesis.',
      example: 'Instead of "I discussed three problems," say "These factors—economic barriers, predictive invalidity, and available alternatives—converge to demonstrate why testing reform is essential."'
    },
    {
      number: 3,
      title: 'Address "So What?"',
      description: 'Explain why your argument matters beyond the essay. What are the broader implications? Why should readers care? This elevates your conclusion from summary to significance.',
      example: '"By rethinking admissions criteria, universities can identify true potential rather than privilege, creating pathways for diverse talent that benefits both students and society."'
    },
    {
      number: 4,
      title: 'End Memorably',
      description: 'Close with a thought-provoking statement, call to action, or compelling question. Leave readers thinking about your argument long after they finish reading.',
      example: '"The question is not whether we can afford to change our admissions systems—it\'s whether we can afford not to."'
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
            Essay Component
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
            How to Write an Essay Conclusion
          </h1>
          
          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.8,
            color: theme.muted,
            marginBottom: '1.5rem'
          }}>
            Your conclusion is your last impression—make it count. Learn to synthesize arguments, reinforce your thesis, and leave readers with lasting impact.
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
              7 min read
            </span>
            <span>•</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        {/* Why Conclusions Matter */}
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
            Why Conclusions Matter
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '1.25rem'
          }}>
            Your conclusion is your final opportunity to convince readers. A weak ending can undermine even the strongest arguments, while a powerful conclusion reinforces your thesis and leaves readers thinking about your ideas long after they finish reading.
          </p>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
          }}>
            Think of your conclusion as the inverse of your introduction—start specific (your thesis and arguments), then widen to broader significance. Most conclusions are 3-5 sentences (about 10% of total essay length) and accomplish four key goals: restate your thesis, synthesize your arguments, address significance, and end memorably.
          </p>
        </section>

        {/* The Four-Part Structure */}
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
            The Four-Part Structure
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '2rem'
          }}>
            Every strong conclusion follows this proven formula:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1rem' }}>
            {conclusionSteps.map((step) => (
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
                  padding: '1.75rem',
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
                      marginBottom: '0.75rem'
                    }}>
                      {step.description}
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
                        <strong style={{ color: theme.text, fontStyle: 'normal' }}>Example:</strong> {step.example}
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

        {/* Complete Example */}
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
            Complete Conclusion Example
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '2rem'
          }}>
            Here's how all four parts work together in a cohesive conclusion:
          </p>

          <div style={{
            padding: '2rem',
            background: 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
            border: `1px solid ${theme.border}`,
            borderRadius: '16px',
          }}>
            <div style={{
              fontSize: '1rem',
              lineHeight: 1.8,
              color: theme.muted,
              fontStyle: 'italic'
            }}>
              <p style={{ marginBottom: '1rem' }}>
                <span style={{ 
                  color: theme.accent, 
                  fontSize: '0.75rem', 
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.05em',
                  fontStyle: 'normal',
                  marginRight: '0.5rem'
                }}>
                  THESIS RESTATEMENT:
                </span>
                The evidence clearly demonstrates that standardized testing requirements perpetuate educational inequality rather than measure academic potential.
              </p>

              <p style={{ marginBottom: '1rem' }}>
                <span style={{ 
                  color: theme.accent, 
                  fontSize: '0.75rem', 
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.05em',
                  fontStyle: 'normal',
                  marginRight: '0.5rem'
                }}>
                  SYNTHESIS:
                </span>
                The correlation between test scores and family income, coupled with research showing poor predictive validity for college success, reveals that these exams measure privilege more than ability.
              </p>

              <p style={{ marginBottom: '1rem' }}>
                <span style={{ 
                  color: theme.accent, 
                  fontSize: '0.75rem', 
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.05em',
                  fontStyle: 'normal',
                  marginRight: '0.5rem'
                }}>
                  SIGNIFICANCE:
                </span>
                By eliminating these requirements, universities can identify genuine potential across socioeconomic backgrounds, creating more equitable pathways to higher education that benefit both students and society.
              </p>

              <p style={{ margin: 0 }}>
                <span style={{ 
                  color: theme.accent, 
                  fontSize: '0.75rem', 
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.05em',
                  fontStyle: 'normal',
                  marginRight: '0.5rem'
                }}>
                  MEMORABLE ENDING:
                </span>
                The question facing higher education is not whether standardized tests are convenient—it's whether we're willing to perpetuate inequality for the sake of tradition.
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
            Common Conclusion Mistakes
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
                    Introducing New Information
                  </h3>
                  <p style={{
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    color: theme.muted,
                    margin: 0
                  }}>
                    Avoid: Don't bring up new arguments, evidence, or ideas in your conclusion. If it's important enough to mention, it belongs in the body.
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
                    Copy-Pasting Your Thesis
                  </h3>
                  <p style={{
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    color: theme.muted,
                    margin: 0
                  }}>
                    Avoid: Don't repeat your thesis word-for-word. Rephrase it to show how your arguments have proven it. Let your evidence inform how you restate your position.
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
                    Using Clichéd Phrases
                  </h3>
                  <p style={{
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    color: theme.muted,
                    margin: 0
                  }}>
                    Avoid: "In conclusion," "To sum up," "In summary." These phrases are redundant—readers know it's the conclusion. Just start your final argument.
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
                    Ending Weakly
                  </h3>
                  <p style={{
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    color: theme.muted,
                    margin: 0
                  }}>
                    Avoid: Weak endings like "That's all I have to say" or apologetic tones. End confidently—your research and arguments speak for themselves.
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
            Craft Powerful Conclusions with AI
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '1.5rem'
          }}>
            Esy helps you write conclusions that synthesize arguments effectively and leave lasting impressions on readers.
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
                  <strong style={{ color: theme.text }}>Thesis rephrasing:</strong>
                  <span style={{ color: theme.muted }}> Restate your argument in fresh, compelling ways</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: theme.text }}>Synthesis generation:</strong>
                  <span style={{ color: theme.muted }}> Combine arguments into cohesive, powerful statements</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: theme.text }}>Significance framing:</strong>
                  <span style={{ color: theme.muted }}> Articulate broader implications of your argument</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: theme.text }}>Memorable endings:</strong>
                  <span style={{ color: theme.muted }}> Craft final sentences that resonate with readers</span>
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
                      Start strong with hooks and compelling openings
                    </p>
                  </div>
                  <ArrowRight style={{ width: '20px', height: '20px', color: theme.accent }} />
                </div>
              </div>
            </Link>

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
                      Craft clear, arguable thesis statements
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
                <strong style={{ color: theme.text }}>Harvard College Writing Center.</strong> (2024). <em>Conclusions</em>. Harvard University. Retrieved from{' '}
                <a 
                  href="https://writingcenter.fas.harvard.edu/pages/conclusions"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}40` }}
                >
                  writingcenter.fas.harvard.edu
                </a>
              </p>

              <p style={{ margin: 0 }}>
                <strong style={{ color: theme.text }}>The Writing Center, University of North Carolina at Chapel Hill.</strong> (2024). <em>Conclusions</em>. Retrieved from{' '}
                <a 
                  href="https://writingcenter.unc.edu/tips-and-tools/conclusions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}40` }}
                >
                  writingcenter.unc.edu
                </a>
              </p>

              <p style={{ margin: 0 }}>
                <strong style={{ color: theme.text }}>Grammarly.</strong> (2024). <em>How to Write a Conclusion</em>. Retrieved from{' '}
                <a 
                  href="https://www.grammarly.com/blog/how-to-end-an-essay"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}40` }}
                >
                  grammarly.com
                </a>
              </p>

              <p style={{ margin: 0 }}>
                <strong style={{ color: theme.text }}>Scribbr.</strong> (2024). <em>How to Write an Essay Conclusion</em>. Retrieved from{' '}
                <a 
                  href="https://www.scribbr.com/academic-essay/conclusion/"
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

export default HowToWriteAnEssayConclusionClient;

