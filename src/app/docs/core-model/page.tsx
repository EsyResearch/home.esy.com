import { Metadata } from "next";
import Link from "next/link";
import {
  Layers,
  ArrowRight,
  Target,
  FileText,
  Workflow,
  Bot,
  Sparkles,
  CheckCircle,
  Shield,
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
};

export const metadata: Metadata = {
  title: "Core Model | Esy Documentation",
  description: "Understand Esy's execution architecture: how intent, context, and workflows produce reliable artifacts without user-written prompts.",
  openGraph: {
    title: "Core Model | Esy Documentation",
    description: "Esy's workflow-driven execution model explained.",
    url: "https://esy.com/docs/core-model",
  },
};

const executionStages = [
  {
    id: 'intent',
    number: 1,
    title: 'Intent',
    description: 'The user defines what they want to produce. This is a structured declaration—a research question, thesis, or creative goal—not a freeform prompt.',
    detail: 'Intent is captured through forms and schemas specific to each workflow type. The system validates intent before proceeding.',
  },
  {
    id: 'context',
    number: 2,
    title: 'Context',
    description: 'The user provides or the system retrieves relevant materials: sources, constraints, prior work, domain parameters.',
    detail: 'Context is indexed and made available to downstream agents. It grounds all subsequent generation in user-provided or verified materials.',
  },
  {
    id: 'workflow',
    number: 3,
    title: 'Workflow Selection',
    description: 'The system selects or the user chooses a workflow—a defined sequence of steps with specified inputs, outputs, and agent assignments.',
    detail: 'Workflows are authored artifacts, not ad-hoc chains. Each step has a contract: what it receives, what it produces, which role executes it.',
  },
  {
    id: 'routing',
    number: 4,
    title: 'Agent Routing',
    description: 'For each workflow step, the system routes execution to an agent bound by a specific role. Roles define behavior, constraints, and output expectations.',
    detail: 'Agents do not receive user prompts directly. They receive structured inputs as defined by the workflow step.',
  },
  {
    id: 'prompt-generation',
    number: 5,
    title: 'Prompt Generation',
    description: 'The system generates prompts internally. These are execution artifacts—constructed from role definitions, step context, and workflow state.',
    detail: 'Users do not write or see these prompts. They are an implementation detail of the execution layer.',
  },
  {
    id: 'execution',
    number: 6,
    title: 'Execution',
    description: 'The agent executes against the generated prompt, producing intermediate outputs that flow to subsequent steps or to final synthesis.',
    detail: 'Execution is observable. Users can inspect what each step produced, but they interact with structured outputs—not raw model responses.',
  },
  {
    id: 'synthesis',
    number: 7,
    title: 'Artifact Synthesis',
    description: 'Final outputs are assembled into a coherent artifact: an essay, timeline, brief, or other structured document with full provenance.',
    detail: 'Every claim in the artifact traces back to context sources or explicit reasoning chains. This is the output users receive and use.',
  },
];

export default function CoreModelPage() {
  return (
    <article style={{
      maxWidth: '760px',
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
          <Layers style={{ width: 16, height: 16 }} />
          Architecture
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
          Core Model
        </h1>

        <p style={{
          fontSize: '1.1875rem',
          lineHeight: 1.7,
          color: colors.muted,
          maxWidth: '600px'
        }}>
          How Esy transforms user intent into reliable artifacts through structured workflows—without requiring users to write prompts.
        </p>
      </header>

      {/* Premise */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="premise"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text
          }}
        >
          The Premise
        </h2>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.5rem'
        }}>
          Esy is not a prompt-based system. It is a workflow-driven intelligence platform.
        </p>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.5rem'
        }}>
          In prompt-based systems, users write natural language instructions and receive responses. This model places the burden of clarity, structure, and constraint on the user. Output quality depends heavily on prompt craftsmanship.
        </p>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary
        }}>
          Esy inverts this relationship. Users declare intent through structured inputs. The system determines how to fulfill that intent through pre-engineered workflows and agent contracts. Prompts exist, but they are internal execution artifacts—generated by the system, not authored by users.
        </p>
      </section>

      {/* Why This Matters */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="why-this-matters"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text
          }}
        >
          Why This Matters
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {[
            {
              icon: <CheckCircle style={{ width: 20, height: 20, color: colors.accent }} />,
              title: 'Repeatability',
              description: 'Workflows produce consistent outputs. The same intent and context yield comparable artifacts across runs.'
            },
            {
              icon: <Shield style={{ width: 20, height: 20, color: colors.accent }} />,
              title: 'Reliability',
              description: 'Role contracts constrain agent behavior. Outputs conform to defined schemas and quality gates.'
            },
            {
              icon: <Sparkles style={{ width: 20, height: 20, color: colors.accent }} />,
              title: 'Accessibility',
              description: 'Users need not master prompt engineering. They interact with structured forms designed for their task.'
            },
            {
              icon: <Layers style={{ width: 20, height: 20, color: colors.accent }} />,
              title: 'Traceability',
              description: 'Every output links to its sources. Claims can be audited against the context that produced them.'
            },
          ].map((item) => (
            <div key={item.title} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <div style={{ flexShrink: 0, marginTop: '0.125rem' }}>
                {item.icon}
              </div>
              <div>
                <span style={{
                  fontWeight: 600,
                  color: colors.text
                }}>
                  {item.title}
                </span>
                <span style={{ color: colors.subtle }}> — </span>
                <span style={{ color: colors.muted }}>
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Execution Order */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="execution-order"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1rem',
            color: colors.text
          }}
        >
          Execution Order
        </h2>

        <p style={{
          fontSize: '1rem',
          lineHeight: 1.8,
          color: colors.muted,
          marginBottom: '2.5rem'
        }}>
          Every Esy operation follows this sequence. Note that prompt generation occurs late in the pipeline—after intent, context, and workflow have been established.
        </p>

        {/* Execution stages */}
        <div style={{ marginBottom: '2rem' }}>
          {executionStages.map((stage, index) => (
            <div key={stage.id} style={{ marginBottom: index < executionStages.length - 1 ? '1.5rem' : 0 }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.25rem'
              }}>
                {/* Number indicator */}
                <div style={{
                  width: '2.25rem',
                  height: '2.25rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: stage.id === 'prompt-generation' ? colors.subtle : colors.accent,
                  background: stage.id === 'prompt-generation' ? `${colors.subtle}12` : `${colors.accent}12`,
                  border: stage.id === 'prompt-generation' ? `1px dashed ${colors.subtle}40` : 'none',
                  flexShrink: 0,
                  marginTop: '0.125rem'
                }}>
                  {stage.number}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '1.0625rem',
                    fontWeight: 600,
                    color: stage.id === 'prompt-generation' ? colors.subtle : colors.text,
                    marginBottom: '0.375rem',
                    fontStyle: stage.id === 'prompt-generation' ? 'italic' : 'normal'
                  }}>
                    {stage.title}
                    {stage.id === 'prompt-generation' && (
                      <span style={{
                        marginLeft: '0.5rem',
                        fontSize: '0.6875rem',
                        fontWeight: 500,
                        fontStyle: 'normal',
                        padding: '0.15rem 0.4rem',
                        background: `${colors.subtle}15`,
                        borderRadius: '4px',
                        color: colors.subtle,
                        textTransform: 'uppercase',
                        letterSpacing: '0.03em'
                      }}>
                        Internal
                      </span>
                    )}
                  </h3>
                  <p style={{
                    fontSize: '0.9375rem',
                    lineHeight: 1.7,
                    color: colors.muted,
                    marginBottom: '0.5rem'
                  }}>
                    {stage.description}
                  </p>
                  <p style={{
                    fontSize: '0.8125rem',
                    lineHeight: 1.6,
                    color: colors.subtle,
                    margin: 0
                  }}>
                    {stage.detail}
                  </p>
                </div>
              </div>

              {/* Connector line */}
              {index < executionStages.length - 1 && (
                <div style={{
                  marginLeft: '1.0625rem',
                  marginTop: '0.75rem',
                  marginBottom: '0.25rem',
                  width: '1px',
                  height: '1rem',
                  background: index === 4
                    ? `linear-gradient(to bottom, ${colors.subtle}30, ${colors.accent}40)`
                    : `linear-gradient(to bottom, ${colors.accent}40, ${colors.accent}20)`
                }} />
              )}
            </div>
          ))}
        </div>

        <DocsCallout type="info" title="Key Insight">
          Workflows precede prompts. This is the architectural decision that distinguishes Esy from prompt-first systems. By the time a prompt is generated, intent has been validated, context has been indexed, the workflow has been selected, and the executing agent&apos;s role has been determined. The prompt is a consequence of these prior decisions—not the starting point.
        </DocsCallout>
      </section>

      {/* Prompts as Implementation Detail */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="prompts-as-implementation"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text
          }}
        >
          Prompts as Implementation Detail
        </h2>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.5rem'
        }}>
          Prompts are generated per agent, per step. They are constructed from:
        </p>

        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: '0 0 1.5rem 0'
        }}>
          {[
            'The role definition bound to that agent',
            'The step\'s input schema and current values',
            'Relevant context retrieved for this step',
            'Workflow state from prior steps',
            'Output schema the step must satisfy'
          ].map((item) => (
            <li key={item} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              marginBottom: '0.625rem',
              fontSize: '0.9375rem',
              color: colors.muted
            }}>
              <span style={{ color: colors.accent, flexShrink: 0 }}>•</span>
              {item}
            </li>
          ))}
        </ul>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary
        }}>
          This construction is deterministic given the inputs. Users do not write, edit, or see these prompts under normal operation. Advanced users may inspect execution logs, but prompt authorship is not part of the user-facing interface.
        </p>
      </section>

      {/* User Interaction Model */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="user-interaction"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text
          }}
        >
          User Interaction Model
        </h2>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '2rem'
        }}>
          What users actually do varies by expertise level, but in neither case do users write raw prompts.
        </p>

        {/* Standard users */}
        <div style={{
          padding: '1.5rem',
          background: colors.elevated,
          borderRadius: '12px',
          border: `1px solid ${colors.border}`,
          marginBottom: '1rem'
        }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: colors.text,
            marginBottom: '0.75rem'
          }}>
            Standard Users
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {[
              'Use pre-designed workflows for common tasks',
              'Fill structured intent and context forms',
              'Review and refine generated artifacts',
              'Do not configure system behavior'
            ].map((item) => (
              <li key={item} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.625rem',
                marginBottom: '0.5rem',
                fontSize: '0.9375rem',
                color: colors.muted
              }}>
                <CheckCircle style={{ width: 14, height: 14, color: colors.accent, flexShrink: 0, marginTop: '0.2rem' }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Pro users */}
        <div style={{
          padding: '1.5rem',
          background: colors.elevated,
          borderRadius: '12px',
          border: `1px solid ${colors.border}`
        }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: colors.text,
            marginBottom: '0.75rem'
          }}>
            Pro Users
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {[
              'Design custom workflows with multiple steps',
              'Select which roles execute each step',
              'Define constraints, gates, and output schemas',
              'Add or remove workflow stages',
              'Still do not write raw prompts'
            ].map((item, i) => (
              <li key={item} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.625rem',
                marginBottom: '0.5rem',
                fontSize: '0.9375rem',
                color: i === 4 ? colors.text : colors.muted,
                fontWeight: i === 4 ? 500 : 400
              }}>
                <CheckCircle style={{ width: 14, height: 14, color: colors.accent, flexShrink: 0, marginTop: '0.2rem' }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p style={{
          fontSize: '0.9375rem',
          lineHeight: 1.8,
          color: colors.subtle,
          marginTop: '1.25rem'
        }}>
          Power in Esy comes from workflow design and constraint definition—not from prompt engineering.
        </p>
      </section>

      {/* Related Concepts */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2 style={{
          fontFamily: 'var(--font-literata), Georgia, serif',
          fontSize: '1.25rem',
          fontWeight: 400,
          marginBottom: '1.25rem',
          color: colors.text
        }}>
          Related Concepts
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { href: "/docs/roles", title: "Roles", desc: "Agent contracts that define behavior" },
            { href: "/docs/workflows", title: "Workflows", desc: "Execution pipelines and step design" },
            { href: "/docs/specs", title: "Artifact Specifications", desc: "Output structure and provenance" },
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
