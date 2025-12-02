"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap,
  BookOpen,
  CheckCircle,
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

const HowToWriteAnEssayIntroductionClient = () => {
  const [hoveredHook, setHoveredHook] = useState<string | null>(null);

  const hookTypes = [
    {
      id: 'question',
      title: 'Thought-Provoking Question',
      description: 'Start with a question that makes readers think about your topic. Works well for argumentative essays.',
      example: '"What if artificial intelligence could predict your decisions before you make them? This question is no longer science fiction—it\'s the reality facing us today."'
    },
    {
      id: 'statistic',
      title: 'Surprising Statistic',
      description: 'Lead with data that shocks or intrigues. Immediately establishes credibility and grabs attention.',
      example: '"Over 90% of the world\'s data was created in the last two years alone, fundamentally changing how we understand information overload."'
    },
    {
      id: 'anecdote',
      title: 'Brief Anecdote',
      description: 'Tell a short, relevant story. Humanizes your topic and creates emotional connection.',
      example: '"When Marie Curie began her research on radioactivity, she had no laboratory—just a converted shed. Yet her persistence revolutionized physics."'
    },
    {
      id: 'quote',
      title: 'Relevant Quote',
      description: 'Open with words from an expert or notable figure. Choose quotes that genuinely connect to your argument.',
      example: '"\'The only way to do great work is to love what you do,\' Steve Jobs famously said—a philosophy that reshapes our understanding of career success."'
    },
    {
      id: 'contradiction',
      title: 'Contradictory Statement',
      description: 'Present something that seems paradoxical or challenges common assumptions. Creates immediate curiosity.',
      example: '"The greatest threat to democracy might not be authoritarianism—it could be too much freedom of choice creating decision paralysis."'
    },
    {
      id: 'vivid',
      title: 'Vivid Description',
      description: 'Paint a scene that immerses readers in your topic. Especially effective for narrative or descriptive essays.',
      example: '"The Amazon rainforest burns at a rate of one football field every minute, turning the world\'s lungs into ash."'
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
            <Zap style={{ width: '14px', height: '14px' }} />
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
            How to Write an Essay Introduction
          </h1>
          
          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.8,
            color: theme.muted,
            marginBottom: '1.5rem'
          }}>
            Your introduction is your first—and sometimes only—chance to hook readers. Learn to craft openings that engage, provide context, and set up powerful thesis statements.
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
              8 min read
            </span>
            <span>•</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        {/* Why Introductions Matter */}
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
            Why Introductions Matter
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '1.25rem'
          }}>
            Your introduction sets the tone for your entire essay. A strong opening accomplishes three critical goals: it <strong style={{ color: theme.text }}>hooks readers'</strong> attention, <strong style={{ color: theme.text }}>provides necessary context</strong> to understand your topic, and <strong style={{ color: theme.text }}>presents your thesis statement</strong> clearly.
          </p>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '1.25rem'
          }}>
            Think of your introduction as a funnel—starting broad to draw readers in, then narrowing to your specific argument. Most introductions are 3-5 sentences (about 10-15% of your total essay length) and follow a predictable but effective structure.
          </p>

          <div style={{
            padding: '1.25rem',
            background: 'rgba(139, 92, 246, 0.08)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '12px',
          }}>
            <p style={{
              fontSize: '0.9375rem',
              lineHeight: 1.6,
              color: theme.muted,
              margin: 0,
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'flex-start'
            }}>
              <Lightbulb style={{ width: '18px', height: '18px', color: theme.accent, marginTop: '2px', flexShrink: 0 }} />
              <span><strong style={{ color: theme.text }}>Pro tip:</strong> Many experienced writers draft their introduction <em>after</em> writing body paragraphs. Once you know exactly what you've argued, it's easier to write an introduction that accurately previews your essay.</span>
            </p>
          </div>
        </section>

        {/* The Three-Part Structure */}
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
            The Three-Part Structure
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '2rem'
          }}>
            Every strong introduction follows this proven formula:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1.25rem' }}>
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
                STEP 1
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 500,
                color: theme.text,
                marginBottom: '0.75rem',
                fontFamily: 'var(--font-literata)'
              }}>
                The Hook (1-2 sentences)
              </h3>
              <p style={{
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                color: theme.muted,
                marginBottom: '0.75rem'
              }}>
                Grab attention immediately with something interesting, surprising, or thought-provoking. This is your "don't scroll away" moment.
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
                  <strong style={{ color: theme.text, fontStyle: 'normal' }}>Example:</strong> "Every year, 8 million tons of plastic enter our oceans—the equivalent of dumping one garbage truck of plastic every minute."
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
                STEP 2
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 500,
                color: theme.text,
                marginBottom: '0.75rem',
                fontFamily: 'var(--font-literata)'
              }}>
                Context & Background (2-3 sentences)
              </h3>
              <p style={{
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                color: theme.muted,
                marginBottom: '0.75rem'
              }}>
                Provide necessary information readers need to understand your topic. Build a bridge between your hook and your thesis. Explain why this topic matters.
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
                  <strong style={{ color: theme.text, fontStyle: 'normal' }}>Example:</strong> "This pollution crisis threatens marine ecosystems, contaminates food chains, and poses long-term risks to human health. Despite growing awareness, single-use plastics remain deeply embedded in global consumption patterns."
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
                fontSize: '1.25rem',
                fontWeight: 500,
                color: theme.text,
                marginBottom: '0.75rem',
                fontFamily: 'var(--font-literata)'
              }}>
                Thesis Statement (1 sentence)
              </h3>
              <p style={{
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                color: theme.muted,
                marginBottom: '0.75rem'
              }}>
                State your main argument clearly and specifically. This is the roadmap for your entire essay—everything that follows should support this statement.
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
                  <strong style={{ color: theme.text, fontStyle: 'normal' }}>Example:</strong> "Governments must implement comprehensive bans on single-use plastics because voluntary measures have proven ineffective, alternative materials exist, and the environmental cost of inaction far exceeds short-term economic concerns."
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

        {/* Hook Types */}
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
            6 Types of Effective Hooks
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '2rem'
          }}>
            Different hooks work for different essays. Choose based on your topic, audience, and essay type:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1rem' }}>
            {hookTypes.map((hook) => (
              <div
                key={hook.id}
                onMouseEnter={() => setHoveredHook(hook.id)}
                onMouseLeave={() => setHoveredHook(null)}
                style={{
                  background: hoveredHook === hook.id
                    ? 'linear-gradient(135deg, rgba(39, 39, 42, 0.95) 0%, rgba(31, 31, 35, 0.8) 100%)'
                    : 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
                  border: `1px solid ${hoveredHook === hook.id ? 'rgba(159, 122, 234, 0.3)' : theme.border}`,
                  borderRadius: '16px',
                  padding: '1.5rem',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: hoveredHook === hook.id
                    ? '0 12px 32px rgba(159, 122, 234, 0.2)'
                    : '0 4px 16px rgba(0, 0, 0, 0.15)',
                  transform: hoveredHook === hook.id ? 'translateY(-2px)' : 'translateY(0)',
                }}
              >
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 500,
                  color: theme.text,
                  marginBottom: '0.5rem'
                }}>
                  {hook.title}
                </h3>

                <p style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.6,
                  color: theme.muted,
                  marginBottom: '0.75rem'
                }}>
                  {hook.description}
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
                    {hook.example}
                  </p>
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
            Common Introduction Mistakes
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
                    Starting Too Broadly
                  </h3>
                  <p style={{
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    color: theme.muted,
                    marginBottom: '0.5rem'
                  }}>
                    Avoid: "Throughout history, humans have always..." or "Since the beginning of time..."
                  </p>
                  <p style={{
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    color: theme.muted,
                    margin: 0
                  }}>
                    <strong style={{ color: theme.text }}>Instead:</strong> Start with something specific to your topic. Overly broad openings are boring and add no value.
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
                    Dictionary Definitions
                  </h3>
                  <p style={{
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    color: theme.muted,
                    marginBottom: '0.5rem'
                  }}>
                    Avoid: "According to Merriam-Webster, leadership is defined as..."
                  </p>
                  <p style={{
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    color: theme.muted,
                    margin: 0
                  }}>
                    <strong style={{ color: theme.text }}>Instead:</strong> Only use definitions if the term is genuinely specialized or ambiguous. Use your own words.
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
                    Announcing Your Intentions
                  </h3>
                  <p style={{
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    color: theme.muted,
                    marginBottom: '0.5rem'
                  }}>
                    Avoid: "In this essay, I will discuss..." or "This paper will explain..."
                  </p>
                  <p style={{
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    color: theme.muted,
                    margin: 0
                  }}>
                    <strong style={{ color: theme.text }}>Instead:</strong> Just state your thesis. The essay itself shows what you're discussing—you don't need to announce it.
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
            Craft Better Introductions with AI
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.muted,
            marginBottom: '1.5rem'
          }}>
            Esy helps you write compelling introductions faster by generating hooks, refining context, and ensuring your opening sets up your thesis effectively.
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
                  <strong style={{ color: theme.text }}>Hook generation:</strong>
                  <span style={{ color: theme.muted }}> Get multiple attention-grabbing opening options for your topic</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: theme.text }}>Context refinement:</strong>
                  <span style={{ color: theme.muted }}> Ensure your background information flows logically to your thesis</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: theme.text }}>Thesis optimization:</strong>
                  <span style={{ color: theme.muted }}> Craft clear, specific statements that preview your argument</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: theme.text }}>Tone adjustment:</strong>
                  <span style={{ color: theme.muted }}> Match your introduction's style to your essay type and audience</span>
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
                      Master the most important sentence in your essay
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
                      End with impact and leave readers convinced
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
                <strong style={{ color: theme.text }}>Harvard College Writing Center.</strong> (2024). <em>Introductions</em>. Harvard University. Retrieved from{' '}
                <a 
                  href="https://writingcenter.fas.harvard.edu/pages/introductions"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}40` }}
                >
                  writingcenter.fas.harvard.edu
                </a>
              </p>

              <p style={{ margin: 0 }}>
                <strong style={{ color: theme.text }}>The Writing Center, University of North Carolina at Chapel Hill.</strong> (2024). <em>Introductions</em>. Retrieved from{' '}
                <a 
                  href="https://writingcenter.unc.edu/tips-and-tools/introductions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}40` }}
                >
                  writingcenter.unc.edu
                </a>
              </p>

              <p style={{ margin: 0 }}>
                <strong style={{ color: theme.text }}>Grammarly.</strong> (2024). <em>How to Write an Essay Introduction</em>. Retrieved from{' '}
                <a 
                  href="https://www.grammarly.com/blog/how-to-start-an-essay"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}40` }}
                >
                  grammarly.com
                </a>
              </p>

              <p style={{ margin: 0 }}>
                <strong style={{ color: theme.text }}>Scribbr.</strong> (2024). <em>How to Write an Essay Introduction</em>. Retrieved from{' '}
                <a 
                  href="https://www.scribbr.com/academic-essay/introduction/"
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

export default HowToWriteAnEssayIntroductionClient;

