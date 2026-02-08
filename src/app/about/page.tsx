"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  Users,
  GraduationCap,
  Wrench,
  FileText,
  Search,
  CheckCircle
} from 'lucide-react';

/* ─── Circuit Grid Animation — single subtle pulse ─── */
interface Pulse {
  x: number;
  y: number;
  dx: number;
  dy: number;
  speed: number;
  life: number;
  maxLife: number;
  trail: { x: number; y: number; alpha: number }[];
}

function CircuitGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pulseRef = useRef<Pulse | null>(null);
  const rafRef = useRef<number>(0);
  const gridSize = 60;

  const spawnPulse = useCallback((w: number, h: number): Pulse => {
    const cols = Math.floor(w / gridSize);
    const rows = Math.floor(h / gridSize);
    const col = Math.floor(Math.random() * cols);
    const row = Math.floor(Math.random() * rows);
    const horizontal = Math.random() > 0.5;
    const forward = Math.random() > 0.5 ? 1 : -1;
    return {
      x: col * gridSize,
      y: row * gridSize,
      dx: horizontal ? forward : 0,
      dy: horizontal ? 0 : forward,
      speed: 0.35 + Math.random() * 0.25,
      life: 0,
      maxLife: 500 + Math.random() * 400,
      trail: [],
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const rect = canvas.parentElement!.getBoundingClientRect();
    pulseRef.current = spawnPulse(rect.width, rect.height);

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);

      // ── Static grid ──
      ctx.strokeStyle = 'rgba(0, 212, 170, 0.045)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y <= h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // ── Single pulse ──
      const p = pulseRef.current!;
      p.life++;

      p.x += p.dx * p.speed;
      p.y += p.dy * p.speed;

      const lifeRatio = 1 - p.life / p.maxLife;
      p.trail.push({ x: p.x, y: p.y, alpha: lifeRatio });
      if (p.trail.length > 60) p.trail.shift();

      // Turn at intersections occasionally
      const atCol = Math.abs(p.x % gridSize) < p.speed + 0.5;
      const atRow = Math.abs(p.y % gridSize) < p.speed + 0.5;
      if (atCol && atRow && Math.random() < 0.25) {
        if (p.dx !== 0) {
          p.dx = 0;
          p.dy = Math.random() > 0.5 ? 1 : -1;
        } else {
          p.dy = 0;
          p.dx = Math.random() > 0.5 ? 1 : -1;
        }
      }

      // Respawn when expired or off-screen
      if (p.life >= p.maxLife || p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) {
        pulseRef.current = spawnPulse(w, h);
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      // Draw trail — soft fade
      for (let t = 0; t < p.trail.length; t++) {
        const pt = p.trail[t];
        const progress = t / p.trail.length;
        const a = pt.alpha * progress * 0.35;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 1 + progress * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 170, ${a})`;
        ctx.fill();
      }

      // Draw head — gentle glow
      const headAlpha = lifeRatio * 0.6;
      ctx.save();
      ctx.shadowColor = 'rgba(0, 212, 170, 0.5)';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 170, ${headAlpha})`;
      ctx.fill();
      ctx.restore();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [spawnPulse]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.8,
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
      }}
    />
  );
}

export default function AboutPage() {
  // Navy Calm Theme with Dark alternating sections
  const theme = {
    // Light sections - Clean whites with navy accents
    bg: '#FFFFFF',
    elevated: '#F8F9FA',
    surface: '#FFFFFF',
    text: '#0A2540',
    muted: '#6C757D',
    subtle: '#8E9AAF',
    faint: '#ADB5BD',
    accent: '#00A896',
    accentLight: '#00D4AA',
    border: '#E9ECEF',
    // Dark sections - Deep navy
    dark: {
      bg: '#0A2540',
      surface: '#0F3460',
      text: '#FFFFFF',
      muted: 'rgba(255, 255, 255, 0.8)',
      subtle: 'rgba(255, 255, 255, 0.6)',
      border: 'rgba(255, 255, 255, 0.1)',
      accent: '#00D4AA'
    }
  };

  const differentiators = [
    {
      title: 'Structured templates, not open-ended prompts',
      description: 'Select from workflows designed for real outputs — essays, research briefs, visual essays — and complete a guided intake. No prompt engineering required.'
    },
    {
      title: 'Publishable artifacts, not chat transcripts',
      description: 'Esy produces finished documents you can use, share, and return to. Not temporary conversations that vanish after a session.'
    },
    {
      title: 'Orchestrated process, not one-shot generation',
      description: 'Research, analysis, drafting, and quality assurance happen in sequence. Each step informs the next, producing outputs that are coherent and defensible.'
    },
    {
      title: 'Guided structure, not guesswork',
      description: 'Think of the difference between asking ChatGPT to "make a logo" versus using Canva. Esy provides the structure; you provide the intent.'
    }
  ];

  const audiences = [
    { icon: FileText, text: 'Anyone who needs a finished essay, brief, or document — not an AI draft to rewrite' },
    { icon: Search, text: 'Researchers who want organized, source-backed outputs without juggling prompts' },
    { icon: GraduationCap, text: 'Students learning to produce structured, credible academic work' },
    { icon: Users, text: 'Educators who need reliable materials for teaching complex topics' },
    { icon: Wrench, text: 'Professionals documenting ideas, processes, or analyses for real use' }
  ];

  const artifactTypes = [
    'Academic essays with proper structure and citations',
    'Research briefs that synthesize sources into clear takeaways',
    'Visual essays that combine narrative, analysis, and graphics',
    'Educational materials designed for learning and reference'
  ];

  const processSteps = [
    { label: 'Select a template', desc: 'Choose the type of artifact you need' },
    { label: 'Complete the intake', desc: 'Answer guided questions to capture your intent' },
    { label: 'Let Esy orchestrate', desc: 'Research, drafting, and QA happen automatically' },
    { label: 'Receive a finished artifact', desc: 'Publishable output, ready to use' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.bg,
      color: theme.text,
      fontFamily: 'var(--font-inter)'
    }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '10rem 2rem 6rem',
        maxWidth: '800px',
        margin: '0 auto',
        overflow: 'hidden'
      }}>
        {/* Grid Background Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(10, 37, 64, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10, 37, 64, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
        <h1 style={{
          fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
          fontWeight: 300,
          marginBottom: '1.25rem',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          fontFamily: 'var(--font-literata)',
          color: theme.text
        }}>
          About <span style={{ color: theme.accent }}>Esy</span>
        </h1>

        <p style={{
          fontSize: '1.375rem',
          lineHeight: 1.8,
          color: theme.muted,
          marginBottom: '1.75rem',
          fontWeight: 400
        }}>
          Esy (pronounced &quot;Eh-see&quot;) is a workflow-driven AI platform that turns intent into finished, publishable artifacts.
        </p>

        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.85,
          color: theme.muted,
          marginBottom: '1.5rem'
        }}>
          Instead of typing open-ended prompts, users select a structured template — such as an academic essay, research brief, or visual essay — and complete an intake designed to capture what they actually want.
        </p>

        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.85,
          color: theme.text,
          fontWeight: 500,
          fontStyle: 'italic'
        }}>
          Esy orchestrates research, analysis, drafting, and quality assurance to produce outputs that are defensible, coherent, and ready to use.
        </p>
        </div>
      </section>

      {/* The Difference - Dark Section */}
      <section style={{
        padding: '5rem 2rem',
        backgroundColor: theme.dark.bg,
        borderTop: `1px solid ${theme.dark.border}`,
        borderBottom: `1px solid ${theme.dark.border}`
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 400,
            marginBottom: '2.5rem',
            letterSpacing: '-0.01em',
            fontFamily: 'var(--font-literata)',
            color: theme.dark.text
          }}>
            Why Esy is different
          </h2>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.dark.muted,
            marginBottom: '1.5rem'
          }}>
            Most AI tools require you to learn prompt engineering — crafting the right question to get a useful answer. Even then, results are often experimental: drafts that need heavy editing, outputs that require fact-checking, conversations that disappear.
          </p>

          <div style={{
            padding: '1.75rem',
            borderRadius: '12px',
            border: `1px solid ${theme.dark.accent}`,
            backgroundColor: 'rgba(0, 212, 170, 0.08)',
            marginBottom: '1.5rem'
          }}>
          <p style={{
            fontSize: '1.125rem',
              lineHeight: 1.8,
            color: theme.dark.text,
            fontWeight: 500,
              marginBottom: '0.75rem'
          }}>
              Think of the difference between asking ChatGPT to &quot;make a logo&quot; and using Canva.
          </p>
          <p style={{
              fontSize: '1rem',
              lineHeight: 1.8,
              color: theme.dark.muted
            }}>
              Guided structure replaces guesswork, and the result is something real — not experimental.
          </p>
          </div>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.dark.muted
          }}>
            Esy provides that structure. You don&apos;t need to learn prompts or interact with a chat interface. You select what you want to create, answer guided questions, and receive a finished artifact.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section style={{
        padding: '6rem 2rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 400,
          marginBottom: '2.5rem',
          letterSpacing: '-0.01em',
          fontFamily: 'var(--font-literata)'
        }}>
          How Esy works
        </h2>

        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.85,
          color: theme.muted,
          marginBottom: '2rem'
        }}>
          Every Esy workflow follows a clear process — from your intent to a finished, usable result.
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          {processSteps.map((step, index) => (
            <div key={index} style={{
              display: 'grid',
              gridTemplateColumns: '48px 1fr',
              gap: '1.25rem',
              alignItems: 'start'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
          borderRadius: '12px',
          border: `1px solid ${theme.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: index === 3 ? theme.accent : 'rgba(0, 0, 0, 0.03)',
                flexShrink: 0
              }}>
                <span style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: index === 3 ? 'white' : theme.muted
                }}>
                  {index + 1}
                </span>
              </div>
              <div style={{ paddingTop: '0.25rem' }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  marginBottom: '0.375rem',
                  color: theme.text
        }}>
                  {step.label}
                </h3>
          <p style={{
            fontSize: '1rem',
                  lineHeight: 1.7,
                  color: theme.subtle
                }}>
                  {step.desc}
                </p>
              </div>
              </div>
            ))}
        </div>

        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.85,
          color: theme.subtle
        }}>
          Behind the scenes, Esy orchestrates multiple AI capabilities — research gathering, source verification, content structuring, drafting, and quality checks — so you don&apos;t have to manage them yourself.
        </p>
      </section>

      {/* What Esy Creates - Dark Section */}
      <section style={{
        padding: '5rem 2rem',
        backgroundColor: theme.dark.bg,
        borderTop: `1px solid ${theme.dark.border}`,
        borderBottom: `1px solid ${theme.dark.border}`
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 400,
            marginBottom: '2.5rem',
            letterSpacing: '-0.01em',
            fontFamily: 'var(--font-literata)',
            color: theme.dark.text
          }}>
            What Esy creates
          </h2>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.dark.muted,
            marginBottom: '1.5rem'
          }}>
            Esy produces structured, publishable artifacts — not rough drafts or chat outputs. Each workflow is designed to create something real:
          </p>

          <div style={{
            padding: '1.5rem',
            borderRadius: '12px',
            border: `1px solid ${theme.dark.border}`,
            backgroundColor: theme.dark.surface,
            marginBottom: '1.5rem'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {artifactTypes.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle size={18} color={theme.dark.accent} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '1rem', color: theme.dark.muted, lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.dark.muted,
            marginBottom: '1.5rem'
          }}>
            The name Esy comes from the word{' '}
            <Link 
              href="/essays/etymology/the-word-essay/" 
              style={{ 
                color: theme.dark.muted, 
                textDecoration: 'none',
                borderBottom: `1px solid ${theme.dark.subtle}`,
                fontStyle: 'italic',
                transition: 'border-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.dark.accent}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.dark.subtle}
            >
              essay
            </Link>, which originally meant an attempt — a way of thinking something through. Esy helps you move from attempt to artifact.
          </p>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.dark.subtle
          }}>
            <Link 
              href="/essays" 
              style={{ 
                color: theme.dark.text, 
                fontWeight: 500,
                textDecoration: 'none',
                borderBottom: `1px solid ${theme.dark.subtle}`,
                transition: 'border-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.dark.accent}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.dark.subtle}
            >
              Visual Essays
            </Link> — long-form pieces combining research, narrative, and graphics — represent Esy&apos;s most comprehensive workflow, demonstrating what&apos;s possible when multiple capabilities are composed into a single artifact.
          </p>
        </div>
      </section>

      {/* What Makes Esy Different */}
      <section style={{
        padding: '6rem 2rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 400,
          marginBottom: '3.5rem',
          letterSpacing: '-0.01em',
          fontFamily: 'var(--font-literata)'
        }}>
          What makes Esy different
        </h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '3rem'
        }}>
          {differentiators.map((item, index) => (
            <div key={index} style={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr',
              gap: '1.5rem',
              alignItems: 'start'
            }}>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: 300,
                color: theme.faint,
                paddingTop: '0.125rem'
              }}>
                {String(index + 1).padStart(2, '0')}
              </div>
              <div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.01em',
                  color: theme.text
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '1.0625rem',
                  lineHeight: 1.8,
                  color: theme.subtle
                }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who Esy is For - Dark Section with Circuit Grid */}
      <section style={{
        padding: '5rem 2rem',
        backgroundColor: theme.dark.bg,
        borderTop: `1px solid ${theme.dark.border}`,
        borderBottom: `1px solid ${theme.dark.border}`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <CircuitGrid />
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 400,
            marginBottom: '2.5rem',
            letterSpacing: '-0.01em',
            fontFamily: 'var(--font-literata)',
            color: theme.dark.text
          }}>
            Who Esy is for
          </h2>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.dark.muted,
            marginBottom: '2rem'
          }}>
            Esy is for anyone who needs to produce real work — without becoming a prompt engineer.
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            {audiences.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    border: `1px solid ${theme.dark.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    backgroundColor: theme.dark.surface
                  }}>
                    <Icon size={18} color={theme.dark.subtle} strokeWidth={1.5} />
                  </div>
                  <p style={{
                    fontSize: '1.0625rem',
                    lineHeight: 1.7,
                    color: theme.dark.muted,
                    paddingTop: '0.5rem'
                  }}>
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.85,
            color: theme.dark.subtle,
            marginTop: '2.5rem',
            paddingTop: '2rem',
            borderTop: `1px solid ${theme.dark.border}`
          }}>
            If you&apos;ve been frustrated by AI tools that require endless prompting and still produce unusable output, Esy offers a different path.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section style={{
        padding: '6rem 2rem 8rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 400,
          marginBottom: '2.5rem',
          letterSpacing: '-0.01em',
          fontFamily: 'var(--font-literata)'
        }}>
          Our philosophy
        </h2>

        <blockquote style={{
          fontSize: '1.5rem',
          lineHeight: 1.6,
          color: theme.text,
          fontWeight: 300,
          fontFamily: 'var(--font-literata)',
          marginBottom: '2.5rem',
          paddingLeft: '1.5rem',
          borderLeft: `2px solid ${theme.accent}`
        }}>
          AI should produce work you can use — not experiments you have to fix.
        </blockquote>

        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.85,
          color: theme.muted,
          marginBottom: '2rem'
        }}>
          Esy is built on a simple belief: the value of AI isn&apos;t in generating text faster — it&apos;s in producing artifacts that are actually usable.
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '2.5rem'
        }}>
          {[
            'Structure over prompting',
            'Artifacts over conversations',
            'Ready-to-use over requires-editing'
          ].map((value, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: theme.accent
              }} />
              <span style={{ 
                fontSize: '1.125rem', 
                color: theme.text,
                fontWeight: 500
              }}>{value}</span>
            </div>
          ))}
        </div>

        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.85,
          color: theme.subtle
        }}>
          Our goal is to make AI genuinely useful — not as a brainstorming partner or chat companion, but as a reliable system that transforms what you want into something finished.
        </p>
      </section>

      {/* Contact Footer - Dark Section */}
      <section style={{
        padding: '3rem 2rem',
        borderTop: `1px solid ${theme.dark.border}`,
        backgroundColor: theme.dark.bg
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: theme.dark.subtle,
            textAlign: 'center'
          }}>
            Questions? Email us at{' '}
            <a 
              href="mailto:hello@esy.com" 
              style={{
                color: theme.dark.accent,
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              hello@esy.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
