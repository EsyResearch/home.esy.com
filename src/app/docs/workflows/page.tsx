"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Workflow,
  ArrowRight,
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  Loader2,
  Zap,
} from "lucide-react";
import { DocsPageNav, DocsCallout } from "@/components/docs";

const colors = {
  bg: '#18181b',
  elevated: '#27272a',
  surface: '#1f1f23',
  text: '#fafafa',
  textSecondary: 'rgba(255, 255, 255, 0.85)',
  muted: 'rgba(255, 255, 255, 0.7)',
  subtle: 'rgba(255, 255, 255, 0.45)',
  border: 'rgba(255, 255, 255, 0.06)',
  accent: '#8b5cf6',
  accentHover: '#7c3aed',
  accentLight: '#a78bfa',
  success: '#22c55e',
};

const pipelineStages = [
  {
    id: 'intent',
    title: 'Intent',
    description: 'What you want to create. A research question, thesis, or creative goal that grounds the workflow.',
  },
  {
    id: 'context',
    title: 'Context',
    description: 'Your sources, constraints, and parameters. Ensures outputs are grounded in your materials.',
  },
  {
    id: 'workflow',
    title: 'Workflow',
    description: 'The sequence of steps: research, synthesis, drafting, refinement. Each step has defined inputs and outputs.',
  },
  {
    id: 'artifact',
    title: 'Artifact',
    description: 'The output: essay, timeline, brief. Includes provenance—trace every claim to its source.',
  },
  {
    id: 'quality',
    title: 'Quality Assurance',
    description: 'Validation against original intent. Citation verification, claim traceability, alignment checks.',
  },
];

// Demo workflow data
const demoWorkflow = {
  title: 'Infographic Brief',
  intent: 'Create an infographic about the water cycle',
  steps: [
    { name: 'Research', model: 'Research Model', duration: 1200, tokens: 450 },
    { name: 'Structure', model: 'Analysis Model', duration: 800, tokens: 320 },
    { name: 'Visual Mapping', model: 'Design Model', duration: 1000, tokens: 280 },
    { name: 'Copy Generation', model: 'Writing Model', duration: 900, tokens: 400 },
  ],
  artifact: `# The Water Cycle Infographic Brief

## Visual Sections

### 1. Evaporation
- Sun heating ocean/lake surface
- Water molecules rising as vapor
- Temperature indicator: 100°C / 212°F

### 2. Condensation
- Water vapor cooling in atmosphere
- Cloud formation visualization
- Altitude: 2,000-6,000 meters

### 3. Precipitation
- Rain, snow, sleet, hail variants
- Droplet size comparisons
- Annual global rainfall: 505,000 km³

### 4. Collection
- Rivers, lakes, groundwater
- Aquifer cross-section
- Ocean as primary reservoir (97%)

## Key Statistics
- 71% of Earth's surface is water
- 3% is freshwater (2.5% frozen)
- Average water molecule age: 3,200 years`
};

function WorkflowDemo() {
  const [status, setStatus] = useState<'idle' | 'running' | 'completed'>('idle');
  const [currentStep, setCurrentStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showArtifact, setShowArtifact] = useState(false);

  const runWorkflow = useCallback(async () => {
    setStatus('running');
    setCompletedSteps([]);
    setShowArtifact(false);

    for (let i = 0; i < demoWorkflow.steps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, demoWorkflow.steps[i].duration));
      setCompletedSteps(prev => [...prev, i]);
    }

    setCurrentStep(-1);
    setStatus('completed');
    setShowArtifact(true);
  }, []);

  const reset = () => {
    setStatus('idle');
    setCurrentStep(-1);
    setCompletedSteps([]);
    setShowArtifact(false);
  };

  const totalTokens = demoWorkflow.steps.reduce((sum, s) => sum + s.tokens, 0);

  return (
    <div style={{
      background: colors.elevated,
      borderRadius: '16px',
      border: `1px solid ${colors.border}`,
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '1.25rem 1.5rem',
        borderBottom: `1px solid ${colors.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: colors.subtle, marginBottom: '0.25rem' }}>
            Try it: Infographic Workflow
          </div>
          <div style={{ fontSize: '0.9375rem', color: colors.text, fontWeight: 500 }}>
            {demoWorkflow.intent}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {status === 'idle' && (
            <button
              onClick={runWorkflow}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: colors.accent,
                border: 'none',
                borderRadius: '6px',
                color: 'white',
                fontSize: '0.8125rem',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              <Play style={{ width: 14, height: 14 }} />
              Run Demo
            </button>
          )}
          {status === 'running' && (
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: `${colors.accent}20`,
              borderRadius: '6px',
              color: colors.accentLight,
              fontSize: '0.8125rem'
            }}>
              <Loader2 style={{ width: 14, height: 14, animation: 'spin 1s linear infinite' }} />
              Running...
            </span>
          )}
          {status === 'completed' && (
            <button
              onClick={reset}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: '6px',
                color: colors.muted,
                fontSize: '0.8125rem',
                cursor: 'pointer'
              }}
            >
              <RotateCcw style={{ width: 14, height: 14 }} />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Steps */}
      <div style={{ padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {demoWorkflow.steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            const isActive = currentStep === index;

            return (
              <div
                key={step.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  background: isActive ? `${colors.accent}15` : isCompleted ? `${colors.success}10` : colors.surface,
                  border: `1px solid ${isActive ? colors.accent + '40' : isCompleted ? colors.success + '30' : colors.border}`,
                  borderRadius: '6px',
                  transition: 'all 0.3s ease'
                }}
              >
                {isCompleted ? (
                  <CheckCircle style={{ width: 14, height: 14, color: colors.success }} />
                ) : isActive ? (
                  <Loader2 style={{ width: 14, height: 14, color: colors.accent, animation: 'spin 1s linear infinite' }} />
                ) : (
                  <div style={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    border: `1.5px solid ${colors.subtle}`,
                  }} />
                )}
                <span style={{
                  fontSize: '0.8125rem',
                  color: isActive ? colors.text : isCompleted ? colors.muted : colors.subtle
                }}>
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        {status === 'completed' && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: `1px solid ${colors.border}`,
            fontSize: '0.75rem',
            color: colors.subtle
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Zap style={{ width: 12, height: 12, color: colors.accent }} />
              {totalTokens.toLocaleString()} tokens
            </span>
            <span>4 steps completed</span>
            <span style={{ color: colors.success }}>Demo only — no API cost</span>
          </div>
        )}
      </div>

      {/* Artifact Preview */}
      {showArtifact && (
        <div style={{
          borderTop: `1px solid ${colors.border}`,
          padding: '1.25rem 1.5rem',
          background: colors.surface
        }}>
          <div style={{
            fontSize: '0.75rem',
            color: colors.subtle,
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Generated Artifact
          </div>
          <pre style={{
            fontSize: '0.75rem',
            color: colors.muted,
            whiteSpace: 'pre-wrap',
            lineHeight: 1.6,
            margin: 0,
            maxHeight: '200px',
            overflow: 'auto',
            fontFamily: 'var(--font-mono, monospace)'
          }}>
            {demoWorkflow.artifact}
          </pre>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function WorkflowsPage() {
  return (
    <article style={{
      maxWidth: '720px',
      margin: '0 auto',
      padding: '0 clamp(1.5rem, 5vw, 2rem)',
      paddingTop: 'clamp(5rem, 12vh, 7rem)',
      paddingBottom: 'clamp(4rem, 8vh, 6rem)'
    }}>
      {/* Header */}
      <header style={{ marginBottom: 'clamp(3rem, 8vh, 5rem)' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.25rem',
            fontSize: '0.8125rem',
            color: colors.accentLight,
            letterSpacing: '0.02em'
          }}
        >
          <Workflow style={{ width: 16, height: 16 }} />
          Core Concept
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            marginBottom: '1.5rem',
            color: colors.text
          }}
        >
          Workflow Design
        </h1>

        <p style={{
          fontSize: '1.1875rem',
          lineHeight: 1.7,
          color: colors.muted,
          maxWidth: '600px'
        }}>
          How Esy transforms intent into artifacts through structured, inspectable pipelines.
        </p>
      </header>

      {/* The Core Idea */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.5rem'
        }}>
          Most AI writing tools are black boxes: you prompt, you get output, you hope for the best.
          Esy works differently. Every artifact is produced through a <em style={{ color: colors.text, fontStyle: 'normal', fontWeight: 500 }}>visible,
          step-by-step workflow</em> that you can inspect, modify, and trust.
        </p>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary
        }}>
          When you can see how an output was created—what sources were used, what reasoning was applied—you
          can confidently use that output. You can also fix it when something goes wrong.
        </p>
      </section>

      {/* Interactive Demo */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="demo"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1rem',
            color: colors.text
          }}
        >
          See It In Action
        </h2>

        <p style={{
          fontSize: '1rem',
          lineHeight: 1.8,
          color: colors.muted,
          marginBottom: '1.5rem'
        }}>
          This demo shows a simplified workflow that generates an infographic brief. Watch the steps execute and see the artifact produced.
        </p>

        <WorkflowDemo />
      </section>

      {/* The Pipeline */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="pipeline"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1rem',
            color: colors.text
          }}
        >
          The Pipeline
        </h2>

        <p style={{
          fontSize: '1rem',
          lineHeight: 1.8,
          color: colors.muted,
          marginBottom: '2.5rem'
        }}>
          Every Esy workflow follows five stages:
        </p>

        {/* Minimal pipeline visualization */}
        <div style={{ marginBottom: '3rem' }}>
          {pipelineStages.map((stage, index) => (
            <div key={stage.id} style={{ marginBottom: index < pipelineStages.length - 1 ? '1.5rem' : 0 }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.25rem'
              }}>
                {/* Number indicator */}
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: colors.accent,
                  background: `${colors.accent}12`,
                  flexShrink: 0,
                  marginTop: '0.125rem'
                }}>
                  {index + 1}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '1.0625rem',
                    fontWeight: 600,
                    color: colors.text,
                    marginBottom: '0.375rem'
                  }}>
                    {stage.title}
                  </h3>
                  <p style={{
                    fontSize: '0.9375rem',
                    lineHeight: 1.7,
                    color: colors.muted,
                    margin: 0
                  }}>
                    {stage.description}
                  </p>
                </div>
              </div>

              {/* Connector line */}
              {index < pipelineStages.length - 1 && (
                <div style={{
                  marginLeft: '0.9375rem',
                  marginTop: '0.75rem',
                  marginBottom: '0.25rem',
                  width: '1px',
                  height: '1.25rem',
                  background: `linear-gradient(to bottom, ${colors.accent}40, ${colors.accent}10)`
                }} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Three Principles */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="principles"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '2rem',
            color: colors.text
          }}
        >
          Design Principles
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[
            {
              title: 'Traceable',
              description: 'Every output links back to its source. You can audit why any claim was made.'
            },
            {
              title: 'Composable',
              description: 'Workflows are built from reusable steps. Mix and match for different outputs.'
            },
            {
              title: 'Inspectable',
              description: 'See every intermediate step. Nothing is a black box—you control the process.'
            }
          ].map((principle) => (
            <div key={principle.title} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <CheckCircle style={{
                width: 20,
                height: 20,
                color: colors.accent,
                flexShrink: 0,
                marginTop: '0.125rem'
              }} />
              <div>
                <span style={{
                  fontWeight: 600,
                  color: colors.text
                }}>
                  {principle.title}
                </span>
                <span style={{ color: colors.subtle }}> — </span>
                <span style={{ color: colors.muted }}>
                  {principle.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Beyond Templates */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="beyond-templates"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text
          }}
        >
          Beyond Templates
        </h2>

        <p style={{
          fontSize: '1rem',
          lineHeight: 1.8,
          color: colors.muted,
          marginBottom: '1.5rem'
        }}>
          <Link href="/docs/templates" style={{ color: colors.accentLight, textDecoration: 'underline', textUnderlineOffset: '3px' }}>Templates</Link> are
          pre-built workflows for common tasks. But Esy is designed for users who want to go further—modify steps,
          add custom validation, chain workflows together, or create entirely new pipelines.
        </p>

        <DocsCallout type="info" title="Getting Started">
          Most users start with templates and gradually customize them. You don&apos;t need to design
          workflows from scratch—just understand the structure so you can modify when needed.
        </DocsCallout>
      </section>

      {/* CTA */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <div style={{
          padding: '2.5rem',
          background: `linear-gradient(135deg, ${colors.accent}08 0%, ${colors.accent}03 100%)`,
          borderRadius: '16px',
          border: `1px solid ${colors.accent}15`,
          textAlign: 'center'
        }}>
          <h2
            style={{
              fontFamily: 'var(--font-literata), Georgia, serif',
              fontSize: '1.5rem',
              fontWeight: 400,
              marginBottom: '0.75rem',
              color: colors.text
            }}
          >
            Ready to build?
          </h2>
          <p style={{
            fontSize: '0.9375rem',
            color: colors.muted,
            marginBottom: '1.75rem',
            maxWidth: '400px',
            margin: '0 auto 1.75rem'
          }}>
            Start with a template and see the pipeline in action.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="https://app.esy.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: colors.accent,
                borderRadius: '8px',
                color: 'white',
                fontSize: '0.9375rem',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              Open Esy
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
            <Link
              href="/docs/templates"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.75rem 1.5rem',
                background: colors.elevated,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                color: colors.text,
                fontSize: '0.9375rem',
                textDecoration: 'none'
              }}
            >
              Browse Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section>
        <h2 style={{
          fontFamily: 'var(--font-literata), Georgia, serif',
          fontSize: '1.25rem',
          fontWeight: 400,
          marginBottom: '1.25rem',
          color: colors.text
        }}>
          Related
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { href: "/docs/templates", title: "Templates Overview", desc: "Pre-built workflows" },
            { href: "/docs/specs", title: "Artifact Specifications", desc: "Structure & provenance" },
            { href: "/docs/quality", title: "Quality Assurance", desc: "How outputs are validated" },
            { href: "/docs/agent-workflows", title: "Agent Workflows", desc: "Advanced automation" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.875rem 1rem',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'background 0.15s',
                background: 'transparent'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = colors.elevated}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <div>
                <span style={{ fontSize: '0.9375rem', fontWeight: 500, color: colors.text }}>
                  {item.title}
                </span>
                <span style={{ color: colors.subtle, marginLeft: '0.75rem', fontSize: '0.875rem' }}>
                  {item.desc}
                </span>
              </div>
              <ArrowRight style={{ width: 16, height: 16, color: colors.subtle }} />
            </Link>
          ))}
        </div>
      </section>

      <DocsPageNav />
    </article>
  );
}
