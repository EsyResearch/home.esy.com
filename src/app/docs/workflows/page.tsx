import { Metadata } from "next";
import Link from "next/link";
import {
  Workflow,
  ArrowRight,
  CheckCircle,
  Layers,
  UserCog,
  FileText,
  GitBranch,
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
  title: "Workflows | Esy Documentation",
  description: "Understand Esy workflows: defined execution pipelines that transform user intent into artifacts through sequenced steps and role-bound agents.",
  openGraph: {
    title: "Workflows | Esy Documentation",
    description: "How Esy workflows orchestrate agent execution to produce reliable artifacts.",
    url: "https://esy.com/docs/workflows",
  },
};

const stepAnatomy = [
  {
    name: 'Input Schema',
    description: 'What data this step receives. May come from user context, prior step outputs, or system state.',
  },
  {
    name: 'Role Assignment',
    description: 'Which role executes this step. The role\'s contract determines agent behavior.',
  },
  {
    name: 'Execution Logic',
    description: 'What the step does: synthesis, analysis, generation, validation, or transformation.',
  },
  {
    name: 'Output Schema',
    description: 'What the step produces. Must satisfy structural requirements for downstream consumption.',
  },
  {
    name: 'Gates',
    description: 'Optional conditions that must be met before proceeding. Quality checks, validation rules, or user approvals.',
  },
];

const workflowExamples = [
  {
    name: 'Research Essay',
    steps: ['Source ingestion', 'Claim extraction', 'Synthesis', 'Drafting', 'Citation audit'],
    description: 'Transforms source materials into a structured essay with verified citations.',
  },
  {
    name: 'Infographic Brief',
    steps: ['Research', 'Structure analysis', 'Visual mapping', 'Copy generation'],
    description: 'Produces a design brief with visual hierarchy and concise copy blocks.',
  },
  {
    name: 'Literature Review',
    steps: ['Source categorization', 'Theme identification', 'Gap analysis', 'Synthesis', 'Writing'],
    description: 'Analyzes multiple sources to produce a thematic literature review.',
  },
];

export default function WorkflowsPage() {
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
          <Workflow style={{ width: 16, height: 16 }} />
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
          Workflows
        </h1>

        <p style={{
          fontSize: '1.1875rem',
          lineHeight: 1.7,
          color: colors.muted,
          maxWidth: '600px'
        }}>
          Defined execution pipelines that orchestrate how intent becomes artifact—through sequenced steps, role-bound agents, and structured outputs.
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
          What Is a Workflow?
        </h2>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.5rem'
        }}>
          A workflow is a defined sequence of steps that transforms user intent and context into a finished artifact. Each step has a specific purpose, receives specific inputs, produces specific outputs, and is executed by an agent bound to a specific <Link href="/docs/roles" style={{ color: colors.accentLight, textDecoration: 'underline', textUnderlineOffset: '3px' }}>role</Link>.
        </p>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.5rem'
        }}>
          Workflows are not ad-hoc prompt chains. They are authored artifacts—designed, tested, and versioned. A workflow encodes a repeatable process for producing a particular type of output.
        </p>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary
        }}>
          In Esy&apos;s <Link href="/docs/core-model" style={{ color: colors.accentLight, textDecoration: 'underline', textUnderlineOffset: '3px' }}>execution model</Link>, workflows sit between user input (intent + context) and the agents that perform work. The workflow determines <em style={{ color: colors.text, fontStyle: 'normal' }}>what</em> happens and <em style={{ color: colors.text, fontStyle: 'normal' }}>in what order</em>. Roles determine <em style={{ color: colors.text, fontStyle: 'normal' }}>how</em> each step executes.
        </p>
      </section>

      {/* Workflow vs Other Patterns */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="distinction"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text
          }}
        >
          Workflows vs. Prompt Chains
        </h2>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.5rem'
        }}>
          In prompt-chain systems, users link prompts together: the output of one becomes input to another. This is flexible but unpredictable. Each link depends on the user&apos;s prompt-writing skill, and there are no structural guarantees about what flows between steps.
        </p>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '2rem'
        }}>
          Esy workflows differ in key ways:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            {
              icon: <FileText style={{ width: 18, height: 18, color: colors.accent }} />,
              title: 'Schema-Defined Interfaces',
              description: 'Each step declares what it receives and produces. Inputs and outputs are typed and validated.'
            },
            {
              icon: <UserCog style={{ width: 18, height: 18, color: colors.accent }} />,
              title: 'Role-Bound Execution',
              description: 'Each step is executed by an agent with a defined role contract—not freeform prompts.'
            },
            {
              icon: <Shield style={{ width: 18, height: 18, color: colors.accent }} />,
              title: 'Quality Gates',
              description: 'Workflows can include validation steps that check outputs before proceeding.'
            },
            {
              icon: <GitBranch style={{ width: 18, height: 18, color: colors.accent }} />,
              title: 'Versioned Artifacts',
              description: 'Workflows are saved, versioned, and can be audited. Execution is reproducible.'
            },
          ].map((item) => (
            <div key={item.title} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              padding: '1rem 1.25rem',
              background: colors.elevated,
              borderRadius: '10px',
              border: `1px solid ${colors.border}`
            }}>
              <div style={{ flexShrink: 0, marginTop: '0.125rem' }}>
                {item.icon}
              </div>
              <div>
                <span style={{
                  fontWeight: 600,
                  color: colors.text,
                  fontSize: '0.9375rem'
                }}>
                  {item.title}
                </span>
                <p style={{
                  color: colors.muted,
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  marginTop: '0.25rem',
                  marginBottom: 0
                }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Step Anatomy */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="step-anatomy"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1rem',
            color: colors.text
          }}
        >
          Anatomy of a Step
        </h2>

        <p style={{
          fontSize: '1rem',
          lineHeight: 1.8,
          color: colors.muted,
          marginBottom: '2rem'
        }}>
          Each step in a workflow includes these components:
        </p>

        <div style={{ marginBottom: '2rem' }}>
          {stepAnatomy.map((component, index) => (
            <div key={component.name} style={{ marginBottom: index < stepAnatomy.length - 1 ? '1.25rem' : 0 }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}>
                {/* Number indicator */}
                <div style={{
                  width: '1.75rem',
                  height: '1.75rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
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
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    color: colors.text,
                    marginBottom: '0.25rem'
                  }}>
                    {component.name}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.7,
                    color: colors.muted,
                    margin: 0
                  }}>
                    {component.description}
                  </p>
                </div>
              </div>

              {/* Connector line */}
              {index < stepAnatomy.length - 1 && (
                <div style={{
                  marginLeft: '0.8125rem',
                  marginTop: '0.5rem',
                  marginBottom: '0.25rem',
                  width: '1px',
                  height: '0.75rem',
                  background: `linear-gradient(to bottom, ${colors.accent}30, ${colors.accent}10)`
                }} />
              )}
            </div>
          ))}
        </div>

        <DocsCallout type="info" title="Steps Are Not Prompts">
          A step definition does not include a user-written prompt. The prompt is generated internally by the system, constructed from the step&apos;s inputs, the assigned role&apos;s contract, and relevant context. Users define <em>what</em> a step should accomplish—not <em>how</em> to instruct the agent.
        </DocsCallout>
      </section>

      {/* Example Workflows */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="examples"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1rem',
            color: colors.text
          }}
        >
          Example Workflows
        </h2>

        <p style={{
          fontSize: '1rem',
          lineHeight: 1.8,
          color: colors.muted,
          marginBottom: '2rem'
        }}>
          These are representative workflows available in Esy. Each is a pre-built pipeline that standard users can invoke directly.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {workflowExamples.map((workflow) => (
            <div
              key={workflow.name}
              style={{
                padding: '1.5rem',
                background: colors.elevated,
                borderRadius: '12px',
                border: `1px solid ${colors.border}`
              }}
            >
              <h3 style={{
                fontSize: '1.0625rem',
                fontWeight: 600,
                color: colors.text,
                marginBottom: '0.5rem'
              }}>
                {workflow.name}
              </h3>
              <p style={{
                fontSize: '0.875rem',
                lineHeight: 1.7,
                color: colors.muted,
                marginBottom: '1rem'
              }}>
                {workflow.description}
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                {workflow.steps.map((step, i) => (
                  <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      color: colors.subtle,
                      padding: '0.25rem 0.625rem',
                      background: colors.surface,
                      borderRadius: '4px'
                    }}>
                      {step}
                    </span>
                    {i < workflow.steps.length - 1 && (
                      <ArrowRight style={{ width: 12, height: 12, color: colors.subtle }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pro Users */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="custom-workflows"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text
          }}
        >
          Designing Custom Workflows
        </h2>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.5rem'
        }}>
          Pro users can design workflows beyond the pre-built set. This means:
        </p>

        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: '0 0 1.5rem 0'
        }}>
          {[
            'Adding or removing steps from a workflow',
            'Selecting which role executes each step',
            'Defining input and output schemas for steps',
            'Configuring quality gates between steps',
            'Setting constraints on execution (token limits, format requirements)'
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

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.5rem'
        }}>
          Workflow design is structural work—defining what happens, not writing prompts. Pro users gain power by composing steps and roles in new combinations, not by crafting more sophisticated natural language instructions.
        </p>

        <DocsCallout type="note" title="Workflow Design vs. Prompt Writing">
          Even Pro users do not write raw prompts. The distinction matters: workflow design is about architecture—which steps, which roles, what constraints. Prompt generation remains an internal system function.
        </DocsCallout>
      </section>

      {/* Relation to Core Model */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="core-model"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text
          }}
        >
          Position in the Core Model
        </h2>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.5rem'
        }}>
          In Esy&apos;s execution order:
        </p>

        <ol style={{
          listStyle: 'none',
          padding: 0,
          margin: '0 0 1.5rem 0'
        }}>
          {[
            { label: 'Intent', desc: 'User declares what they want to produce' },
            { label: 'Context', desc: 'User provides or system retrieves relevant materials' },
            { label: 'Workflow', desc: 'System selects or user chooses the execution pipeline', highlight: true },
            { label: 'Agent Routing', desc: 'Each step routes to a role-bound agent' },
            { label: 'Execution', desc: 'Agents execute steps, producing outputs' },
            { label: 'Artifact', desc: 'Final output is synthesized with provenance' },
          ].map((item, i) => (
            <li key={item.label} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              marginBottom: '0.75rem',
              fontSize: '0.9375rem',
              color: item.highlight ? colors.text : colors.muted,
              fontWeight: item.highlight ? 500 : 400
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
                color: item.highlight ? colors.text : colors.accent,
                background: item.highlight ? colors.accent : `${colors.accent}15`,
                flexShrink: 0
              }}>
                {i + 1}
              </span>
              <div>
                <span style={{ fontWeight: 600 }}>{item.label}</span>
                <span style={{ color: colors.subtle }}> — </span>
                <span style={{ fontWeight: 400, color: colors.muted }}>{item.desc}</span>
              </div>
            </li>
          ))}
        </ol>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary
        }}>
          Workflows are the bridge between what users want and what agents do. They encode the process by which intent becomes artifact.
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
            { href: "/docs/roles", title: "Roles", desc: "Agent contracts that define behavior" },
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
