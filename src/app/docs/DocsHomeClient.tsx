"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Sparkles,
  PenLine,
  Workflow,
  ArrowRight,
  FileText,
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
      id: 'essay-writing',
      title: 'How to Write an Essay',
      description: 'Complete guide to essay writing—from understanding assignments to polishing final drafts. Covers all essay types, structure, and essential components.',
      href: '/docs/how-to-write-an-essay',
      icon: <FileText className="w-6 h-6" />,
      category: 'Writing Guides',
      isNew: true
    },
    {
      id: 'agent-workflows',
      title: 'Build No-Code Agent Workflows',
      description: 'Learn to create automated research workflows using Esy&apos;s visual builder—no programming required.',
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
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        padding: '0 clamp(1.5rem, 5vw, 3rem)'
      }}>
        
        {/* Getting Started Section */}
        <section style={{
          paddingTop: 'clamp(4rem, 10vh, 6rem)',
          paddingBottom: 'clamp(4rem, 10vh, 6rem)'
        }}>
          <h1 style={{
            fontFamily: 'var(--font-literata)',
            fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
            color: theme.text,
            lineHeight: 1.2
          }}>
            Getting Started
          </h1>

          {/* TL;DR */}
          <div style={{
            padding: '1.25rem 1.5rem',
            background: `${theme.accent}08`,
            border: `1px solid ${theme.accent}20`,
            borderRadius: '12px',
            marginBottom: '3rem',
            maxWidth: '800px'
          }}>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              fontSize: '1rem',
              lineHeight: 1.7,
              color: theme.muted
            }}>
              <li style={{ marginBottom: '0.5rem' }}>
                • Esy is a system for designing <strong style={{ color: theme.text, fontWeight: 500 }}>research workflows</strong>, not a chatbot.
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                • The workflow is the author — you design the process, Esy executes it.
              </li>
              <li>
                • Start with <Link href="/templates" style={{ color: theme.accent, textDecoration: 'none' }}>templates</Link> to see results quickly.
              </li>
            </ul>
          </div>

          {/* What Is Esy? */}
          <div style={{
            fontSize: '1.125rem',
            lineHeight: 1.8,
            color: theme.muted,
            maxWidth: '800px',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-literata)',
              fontSize: '1.5rem',
              fontWeight: 400,
              color: theme.text,
              marginBottom: '1rem'
            }}>
              What Is Esy?
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Esy is a research platform for designing <strong style={{ color: theme.text, fontWeight: 600 }}>intent-driven workflows</strong> that produce reliable, inspectable written artifacts.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              Instead of writing directly in an editor or issuing isolated prompts, you design a process — and Esy executes it.
            </p>
            <blockquote style={{
              borderLeft: `3px solid ${theme.accent}`,
              paddingLeft: '1.5rem',
              margin: '1.5rem 0',
              fontStyle: 'italic',
              color: theme.text
            }}>
              In Esy, the workflow is the author.
            </blockquote>
          </div>

          {/* The Esy Research Model */}
          <div style={{
            fontSize: '1.125rem',
            lineHeight: 1.8,
            color: theme.muted,
            maxWidth: '800px',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-literata)',
              fontSize: '1.5rem',
              fontWeight: 400,
              color: theme.text,
              marginBottom: '1rem'
            }}>
              The Esy Research Model
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Every artifact produced with Esy follows the same underlying structure:
            </p>
            <p style={{
              marginBottom: '1.5rem',
              color: theme.text,
              fontWeight: 500
            }}>
              Intent → Context → Workflows → Artifacts → Quality Assurance
            </p>
            <p style={{ marginBottom: '1rem' }}>
              This model replaces ad-hoc prompting with a repeatable research methodology.
            </p>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '1.5rem 0'
            }}>
              <li style={{ marginBottom: '0.75rem' }}>
                <strong style={{ color: theme.text, fontWeight: 600 }}>Intent</strong> — what you are trying to produce and why
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <strong style={{ color: theme.text, fontWeight: 600 }}>Context</strong> — constraints on information, scope, and assumptions
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <strong style={{ color: theme.text, fontWeight: 600 }}>Workflows</strong> — orchestration of actions across agents and tools
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <strong style={{ color: theme.text, fontWeight: 600 }}>Artifacts</strong> — outputs evaluated against original intent
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <strong style={{ color: theme.text, fontWeight: 600 }}>Quality Assurance</strong> — secondary passes for rigor, accuracy, and refinement
              </li>
            </ul>
            <p style={{ marginBottom: '1rem' }}>
              Most AI writing failures happen because these steps are implicit or skipped.
            </p>
            <p>
              Esy exists to make them <strong style={{ color: theme.text, fontWeight: 600 }}>explicit, inspectable, and reusable</strong>.
            </p>
          </div>

          {/* Why Esy Is Structured This Way - Secondary/Background section */}
          <div style={{
            fontSize: '1rem',
            lineHeight: 1.8,
            color: theme.subtle,
            maxWidth: '800px',
            marginBottom: '3rem',
            padding: '1.5rem',
            background: theme.surface,
            borderRadius: '12px',
            border: `1px solid ${theme.border}`
          }}>
            <h3 style={{
              fontFamily: 'var(--font-literata)',
              fontSize: '1.125rem',
              fontWeight: 400,
              color: theme.muted,
              marginBottom: '1rem'
            }}>
              Why Esy Is Structured This Way
            </h3>
            <p style={{ marginBottom: '1rem' }}>
              Modern AI tools are excellent at generating text — but poor at preserving reasoning.
              Without structure: intent drifts, context balloons, decisions disappear, and outputs become difficult to trust or reproduce.
            </p>
            <p style={{ margin: 0 }}>
              Esy treats research and writing as a <strong style={{ color: theme.muted, fontWeight: 600 }}>designed system</strong>, not a conversation.
            </p>
          </div>

          {/* Start Here */}
          <div style={{
            fontSize: '1.125rem',
            lineHeight: 1.8,
            color: theme.muted,
            maxWidth: '800px',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-literata)',
              fontSize: '1.5rem',
              fontWeight: 400,
              color: theme.text,
              marginBottom: '1rem'
            }}>
              Start Here (Based on What You Need)
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              This section provides clear paths into Esy without requiring prior knowledge.
            </p>

            <h3 style={{
              fontFamily: 'var(--font-literata)',
              fontSize: '1.125rem',
              fontWeight: 500,
              color: theme.text,
              marginBottom: '0.75rem',
              marginTop: '2rem'
            }}>
              Learn the Methodology
            </h3>
            <p style={{ marginBottom: '0.5rem' }}>
              If you want to understand how intent, context, workflows, and evaluation interact before producing artifacts:
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              → <Link
                href="/research/overview"
                style={{
                  color: theme.accent,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${theme.accent}40`,
                  transition: 'border-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = theme.accent}
                onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = `${theme.accent}40`}
              >
                Esy Research Overview
              </Link>
            </p>

            <h3 style={{
              fontFamily: 'var(--font-literata)',
              fontSize: '1.125rem',
              fontWeight: 500,
              color: theme.text,
              marginBottom: '0.75rem',
              marginTop: '2rem'
            }}>
              Produce Your First Artifact
            </h3>
            <p style={{ marginBottom: '0.5rem' }}>
              If you want to see the system in action, run a complete, end-to-end workflow that generates a research-backed essay from a single intent:
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              → <Link
                href="/workflows/first-artifact"
                style={{
                  color: theme.accent,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${theme.accent}40`,
                  transition: 'border-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = theme.accent}
                onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = `${theme.accent}40`}
              >
                First Essay Workflow
              </Link>
            </p>

            <h3 style={{
              fontFamily: 'var(--font-literata)',
              fontSize: '1.125rem',
              fontWeight: 500,
              color: theme.text,
              marginBottom: '0.75rem',
              marginTop: '2rem'
            }}>
              Use Templates (Recommended)
            </h3>
            <p style={{ marginBottom: '0.5rem' }}>
              Templates are <strong style={{ color: theme.text, fontWeight: 600 }}>pre-designed research systems</strong> that encode best-practice defaults.
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              They are not prompts. They are executable workflows with bounded inputs.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              → <Link
                href="/templates"
                style={{
                  color: theme.accent,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${theme.accent}40`,
                  transition: 'border-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = theme.accent}
                onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = `${theme.accent}40`}
              >
                Templates Library
              </Link>
            </p>

            <h3 style={{
              fontFamily: 'var(--font-literata)',
              fontSize: '1.125rem',
              fontWeight: 500,
              color: theme.text,
              marginBottom: '0.75rem',
              marginTop: '2rem'
            }}>
              Customize or Design Workflows
            </h3>
            <p style={{ marginBottom: '0.5rem' }}>
              If you want to adjust stages, add quality checks, or design reusable pipelines:
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              → <Link
                href="/docs/workflows"
                style={{
                  color: theme.accent,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${theme.accent}40`,
                  transition: 'border-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = theme.accent}
                onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = `${theme.accent}40`}
              >
                Workflow Design Guide
              </Link>
            </p>

            <h3 style={{
              fontFamily: 'var(--font-literata)',
              fontSize: '1.125rem',
              fontWeight: 500,
              color: theme.text,
              marginBottom: '0.75rem',
              marginTop: '2rem'
            }}>
              Understand Artifact Structure
            </h3>
            <p style={{ marginBottom: '0.5rem' }}>
              Artifacts in Esy are not just documents — they include structure, metadata, and provenance.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              → <Link
                href="/specs"
                style={{
                  color: theme.accent,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${theme.accent}40`,
                  transition: 'border-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = theme.accent}
                onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = `${theme.accent}40`}
              >
                Artifact Specifications
              </Link>
            </p>

            <h3 style={{
              fontFamily: 'var(--font-literata)',
              fontSize: '1.125rem',
              fontWeight: 500,
              color: theme.text,
              marginBottom: '0.75rem',
              marginTop: '2rem'
            }}>
              Learn About Quality & Evaluation
            </h3>
            <p style={{ marginBottom: '0.5rem' }}>
              To understand how outputs are checked, refined, and validated:
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              → <Link
                href="/docs/quality"
                style={{
                  color: theme.accent,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${theme.accent}40`,
                  transition: 'border-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = theme.accent}
                onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = `${theme.accent}40`}
              >
                Quality Assurance & Evals
              </Link>
            </p>
          </div>

          {/* What Esy Is Not */}
          <div style={{
            fontSize: '1.125rem',
            lineHeight: 1.8,
            color: theme.muted,
            maxWidth: '800px',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-literata)',
              fontSize: '1.5rem',
              fontWeight: 400,
              color: theme.text,
              marginBottom: '1rem'
            }}>
              What Esy Is Not
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              To avoid confusion:
            </p>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 1.5rem 0'
            }}>
              <li style={{ marginBottom: '0.5rem' }}>• Esy is <strong style={{ color: theme.text, fontWeight: 600 }}>not</strong> a one-click essay generator</li>
              <li style={{ marginBottom: '0.5rem' }}>• Esy is <strong style={{ color: theme.text, fontWeight: 600 }}>not</strong> a prompt marketplace</li>
              <li style={{ marginBottom: '0.5rem' }}>• Esy is <strong style={{ color: theme.text, fontWeight: 600 }}>not</strong> a chat-first writing tool</li>
            </ul>
            <p>
              Esy is a platform for <strong style={{ color: theme.text, fontWeight: 600 }}>thinking before generating</strong> — and for making that thinking durable.
            </p>
          </div>

          {/* About These Docs - Footer-level section */}
          <div style={{
            fontSize: '0.9375rem',
            lineHeight: 1.7,
            color: theme.subtle,
            maxWidth: '800px',
            paddingTop: '2rem',
            borderTop: `1px solid ${theme.divider}`
          }}>
            <h4 style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: theme.subtle,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.05em',
              marginBottom: '0.75rem'
            }}>
              About These Docs
            </h4>
            <p style={{ marginBottom: '0.75rem' }}>
              These docs are a <strong style={{ color: theme.muted, fontWeight: 500 }}>living specification</strong> of how research workflows are designed, tested, and evolved inside Esy.
              They exist to align users, contributors, and the product itself over time.
            </p>
            <p style={{ margin: 0 }}>
              If you are ever unsure what Esy is or should be, these docs are the reference point.
            </p>
          </div>
        </section>

        {/* Essential Guides */}
        <section style={{
          paddingTop: 'clamp(4rem, 10vh, 6rem)',
          paddingBottom: 'clamp(4rem, 10vh, 6rem)',
          borderTop: `1px solid ${theme.divider}`
        }}>
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontFamily: 'var(--font-literata)',
              fontSize: 'clamp(2rem, 5vw, 2.75rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
              color: theme.text,
              lineHeight: 1.2
            }}>
              Essential Guides
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: theme.muted,
              maxWidth: '700px',
              lineHeight: 1.6
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
