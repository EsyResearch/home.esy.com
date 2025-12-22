import { Metadata } from "next";
import Link from "next/link";
import {
  UserCog,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Layers,
  Shield,
  FileText,
  Workflow,
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
  title: "Roles | Esy Documentation",
  description: "Understand roles in Esy: structured agent contracts that define responsibility, constraints, and output expectations—distinct from user-written prompts.",
  openGraph: {
    title: "Roles | Esy Documentation",
    description: "How Esy defines agent behavior through structured role contracts.",
    url: "https://esy.com/docs/roles",
  },
};

const roleComponents = [
  {
    name: 'Responsibility',
    description: 'What this agent is accountable for producing. Defines the scope of work and success criteria.',
    example: '"Synthesize source materials into a structured literature review with thematic organization."'
  },
  {
    name: 'Scope',
    description: 'What the agent may and may not do. Establishes boundaries on behavior and output.',
    example: '"May not introduce claims unsupported by provided sources. May not exceed 2000 words."'
  },
  {
    name: 'Biases',
    description: 'Intentional stylistic or epistemic orientations. How the agent should approach ambiguity or emphasis.',
    example: '"Prefer primary sources over secondary. When evidence conflicts, present both positions."'
  },
  {
    name: 'Constraints',
    description: 'Hard limits on execution. Format requirements, forbidden patterns, mandatory inclusions.',
    example: '"All factual claims must include inline citations. Output must be valid Markdown."'
  },
  {
    name: 'Output Schema',
    description: 'The structure the agent\'s output must satisfy. May include required sections, fields, or format specifications.',
    example: '"Must include: summary, methodology, findings, limitations, references."'
  },
];

const differenceTable = [
  {
    aspect: 'Authorship',
    prompt: 'Written by user for each request',
    role: 'Pre-defined by workflow designers'
  },
  {
    aspect: 'Stability',
    prompt: 'Varies with each invocation',
    role: 'Stable across all invocations'
  },
  {
    aspect: 'Scope',
    prompt: 'Often task-specific instructions',
    role: 'General behavioral contract'
  },
  {
    aspect: 'Validation',
    prompt: 'No systematic validation',
    role: 'Tested and versioned'
  },
  {
    aspect: 'Visibility',
    prompt: 'User-facing interface element',
    role: 'System-level configuration'
  },
];

export default function RolesPage() {
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
          <UserCog style={{ width: 16, height: 16 }} />
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
          Roles
        </h1>

        <p style={{
          fontSize: '1.1875rem',
          lineHeight: 1.7,
          color: colors.muted,
          maxWidth: '600px'
        }}>
          Structured agent contracts that define how agents behave—independent of the task-specific inputs they receive.
        </p>
      </header>

      {/* Definition */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="definition"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text
          }}
        >
          What Is a Role?
        </h2>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.5rem'
        }}>
          A role is a structured contract that defines an agent&apos;s behavior. It specifies what the agent is responsible for, what it may and may not do, and what form its output must take.
        </p>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.5rem'
        }}>
          Roles are not prompts. They are not written by users at request time. They are stable, tested configurations that constrain agent behavior across all invocations.
        </p>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary
        }}>
          When a workflow step executes, the system binds an agent to a role. The role determines <em style={{ color: colors.text, fontStyle: 'normal' }}>how</em> the agent behaves. The workflow determines <em style={{ color: colors.text, fontStyle: 'normal' }}>when</em> the agent acts and <em style={{ color: colors.text, fontStyle: 'normal' }}>what</em> inputs it receives.
        </p>
      </section>

      {/* Role Components */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="components"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1rem',
            color: colors.text
          }}
        >
          Role Components
        </h2>

        <p style={{
          fontSize: '1rem',
          lineHeight: 1.8,
          color: colors.muted,
          marginBottom: '2rem'
        }}>
          Every role definition includes these elements:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {roleComponents.map((component) => (
            <div
              key={component.name}
              style={{
                padding: '1.25rem 1.5rem',
                background: colors.elevated,
                borderRadius: '12px',
                border: `1px solid ${colors.border}`
              }}
            >
              <h3 style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: colors.text,
                marginBottom: '0.5rem'
              }}>
                {component.name}
              </h3>
              <p style={{
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                color: colors.muted,
                marginBottom: '0.75rem'
              }}>
                {component.description}
              </p>
              <div style={{
                fontSize: '0.8125rem',
                fontFamily: 'var(--font-mono, monospace)',
                color: colors.subtle,
                padding: '0.625rem 0.875rem',
                background: colors.surface,
                borderRadius: '6px',
                fontStyle: 'italic'
              }}>
                {component.example}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Roles vs Prompts */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="roles-vs-prompts"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text
          }}
        >
          Roles vs. Prompts
        </h2>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '2rem'
        }}>
          In many AI systems, users write prompts that begin with role-like instructions: &ldquo;You are a world-class researcher...&rdquo; This pattern conflates identity, instruction, and constraints into a single user-authored string.
        </p>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '2rem'
        }}>
          Esy separates these concerns:
        </p>

        {/* Comparison table */}
        <div style={{
          borderRadius: '12px',
          border: `1px solid ${colors.border}`,
          overflow: 'hidden',
          marginBottom: '2rem'
        }}>
          {/* Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            background: colors.surface,
            borderBottom: `1px solid ${colors.border}`
          }}>
            <div style={{
              padding: '0.875rem 1rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: colors.subtle,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Aspect
            </div>
            <div style={{
              padding: '0.875rem 1rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: colors.subtle,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              borderLeft: `1px solid ${colors.border}`
            }}>
              Prompt-Based Systems
            </div>
            <div style={{
              padding: '0.875rem 1rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: colors.accentLight,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              borderLeft: `1px solid ${colors.border}`
            }}>
              Esy Roles
            </div>
          </div>
          {/* Rows */}
          {differenceTable.map((row, i) => (
            <div
              key={row.aspect}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                borderBottom: i < differenceTable.length - 1 ? `1px solid ${colors.border}` : 'none'
              }}
            >
              <div style={{
                padding: '0.875rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: colors.text
              }}>
                {row.aspect}
              </div>
              <div style={{
                padding: '0.875rem 1rem',
                fontSize: '0.8125rem',
                color: colors.muted,
                borderLeft: `1px solid ${colors.border}`
              }}>
                {row.prompt}
              </div>
              <div style={{
                padding: '0.875rem 1rem',
                fontSize: '0.8125rem',
                color: colors.textSecondary,
                borderLeft: `1px solid ${colors.border}`
              }}>
                {row.role}
              </div>
            </div>
          ))}
        </div>

        <DocsCallout type="info" title="Key Distinction">
          Users select roles; they do not write them. A role like &ldquo;Research Synthesizer&rdquo; or &ldquo;Citation Auditor&rdquo; is a pre-engineered contract—not a text field for users to author &ldquo;You are a...&rdquo; instructions.
        </DocsCallout>
      </section>

      {/* How Roles Relate to Workflows */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="roles-and-workflows"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text
          }}
        >
          Roles and Workflows
        </h2>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.5rem'
        }}>
          Roles and workflows are complementary but distinct:
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            padding: '1.5rem',
            background: colors.elevated,
            borderRadius: '12px',
            border: `1px solid ${colors.border}`
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.75rem'
            }}>
              <Workflow style={{ width: 20, height: 20, color: colors.accent }} />
              <h3 style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: colors.text
              }}>
                Workflows
              </h3>
            </div>
            <p style={{
              fontSize: '0.9375rem',
              lineHeight: 1.7,
              color: colors.muted,
              marginBottom: '1rem'
            }}>
              Define the sequence of operations: which steps execute, in what order, with what inputs and outputs.
            </p>
            <p style={{
              fontSize: '0.8125rem',
              color: colors.subtle
            }}>
              Workflows decide <strong style={{ color: colors.text }}>when</strong> agents act.
            </p>
          </div>

          <div style={{
            padding: '1.5rem',
            background: colors.elevated,
            borderRadius: '12px',
            border: `1px solid ${colors.border}`
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.75rem'
            }}>
              <UserCog style={{ width: 20, height: 20, color: colors.accent }} />
              <h3 style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: colors.text
              }}>
                Roles
              </h3>
            </div>
            <p style={{
              fontSize: '0.9375rem',
              lineHeight: 1.7,
              color: colors.muted,
              marginBottom: '1rem'
            }}>
              Define agent behavior: what responsibilities the agent has, what constraints it operates under, what outputs it produces.
            </p>
            <p style={{
              fontSize: '0.8125rem',
              color: colors.subtle
            }}>
              Roles decide <strong style={{ color: colors.text }}>how</strong> agents behave.
            </p>
          </div>
        </div>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary
        }}>
          A single role may be used across many workflows. A single workflow may invoke many different roles at different steps. This separation allows both to be designed, tested, and versioned independently.
        </p>
      </section>

      {/* Role Selection */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="selection"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text
          }}
        >
          Role Selection
        </h2>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.5rem'
        }}>
          For most users, role selection is handled automatically. When you use a pre-built workflow, roles are already assigned to each step.
        </p>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.5rem'
        }}>
          Pro users designing custom workflows may select which role executes each step. This is selection from a curated set—not freeform authorship. Available roles are:
        </p>

        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: '0 0 1.5rem 0'
        }}>
          {[
            'Tested for behavioral consistency',
            'Documented with clear scope definitions',
            'Versioned to track changes over time',
            'Constrained to prevent scope creep'
          ].map((item) => (
            <li key={item} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              marginBottom: '0.625rem',
              fontSize: '0.9375rem',
              color: colors.muted
            }}>
              <CheckCircle style={{ width: 14, height: 14, color: colors.accent, flexShrink: 0, marginTop: '0.25rem' }} />
              {item}
            </li>
          ))}
        </ul>

        <DocsCallout type="warning" title="Roles Are Not Endlessly Customizable">
          Unlike prompt-first systems where users can write any instruction, Esy&apos;s roles are fixed contracts. This is intentional. Reliability comes from constraint. If you need behavior a role doesn&apos;t support, the solution is a different role—not ad-hoc prompt modification.
        </DocsCallout>
      </section>

      {/* Internal Prompt Generation */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="prompt-generation"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text
          }}
        >
          How Roles Become Prompts
        </h2>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.5rem'
        }}>
          At execution time, the system generates prompts from role definitions. This is an internal process:
        </p>

        <ol style={{
          listStyle: 'none',
          padding: 0,
          margin: '0 0 1.5rem 0',
          counterReset: 'step-counter'
        }}>
          {[
            'The workflow step identifies which role should execute',
            'The role definition is retrieved (responsibility, scope, constraints, output schema)',
            'Step inputs are prepared from workflow state and user context',
            'The system constructs a prompt that encodes the role\'s contract plus the step\'s inputs',
            'The agent executes against this prompt',
            'Output is validated against the role\'s output schema'
          ].map((item, i) => (
            <li key={item} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              marginBottom: '0.875rem',
              fontSize: '0.9375rem',
              color: colors.muted
            }}>
              <span style={{
                width: '1.5rem',
                height: '1.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: colors.accent,
                background: `${colors.accent}15`,
                flexShrink: 0
              }}>
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary
        }}>
          Users never see or edit these generated prompts. The role contract, not user prompt-writing skill, determines output quality.
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
            { href: "/docs/core-model", title: "Core Model", desc: "Execution architecture overview" },
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
