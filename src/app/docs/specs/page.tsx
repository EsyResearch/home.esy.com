import { Metadata } from "next";
import Link from "next/link";
import {
  FileCode,
  ArrowRight,
  User,
  Bot,
  UserCog,
  CheckCircle,
  Palette,
  BarChart3,
  BookOpen,
} from "lucide-react";
import { DocsPageNav, DocsCallout } from "@/components/docs";

const colors = {
  bg: '#FFFFFF',
  elevated: '#F8FAFC',
  surface: '#F1F5F9',
  text: '#0A2540',
  textSecondary: 'rgba(10, 37, 64, 0.85)',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  border: 'rgba(10, 37, 64, 0.08)',
  accent: '#00A896',
  accentLight: '#00D4AA',
  human: '#6366f1',
  aiAssisted: '#f59e0b',
  aiDirected: '#00A896',
};

export const metadata: Metadata = {
  title: "Artifact Specifications | Esy Documentation",
  description: "Structure, metadata, authorship provenance, and the spec panel that makes every Esy artifact inspectable and transparent.",
  openGraph: {
    title: "Artifact Specifications | Esy Documentation",
    description: "How Esy artifacts declare what they are, how they were made, and who made them.",
    url: "https://esy.com/docs/specs",
  },
};

const specFields = [
  { field: 'title', type: 'string', description: 'Artifact title displayed as the page heading' },
  { field: 'subtitle', type: 'string', description: 'Secondary title line below the heading' },
  { field: 'category', type: 'string', description: 'Primary category (Science, History, Etymology, etc.)' },
  { field: 'readTime', type: 'string', description: 'Estimated reading time (e.g., "25 min")' },
  { field: 'sourceCount', type: 'number', description: 'Total number of sources cited' },
  { field: 'sourceTier', type: 'string', description: 'Source quality tier (e.g., "Tier-1" for peer-reviewed)' },
  { field: 'sectionCount', type: 'number', description: 'Number of major sections' },
  { field: 'visualizationCount', type: 'number', description: 'Number of interactive visualizations' },
  { field: 'designSystem', type: 'string', description: 'Design approach (e.g., "Subject-derived")' },
  { field: 'published', type: 'string', description: 'Publication date' },
  { field: 'model', type: 'ModelId', description: 'AI model that produced the artifact (legacy; prefer authorship)' },
  { field: 'template', type: 'string', description: 'Production template (e.g., "Visual Essay")' },
];

const optionalFields = [
  { field: 'authorship', type: 'ArtifactAuthorship', description: 'Authorship provenance — who made it and how' },
  { field: 'palette', type: 'Array<{name, color}>', description: 'Named color palette used in the design' },
  { field: 'visualizations', type: 'Array<{name, type}>', description: 'List of visualizations with implementation type' },
  { field: 'keySources', type: 'string[]', description: 'Highlighted primary sources' },
  { field: 'citationFirst', type: 'boolean', description: 'Whether the essay was written citation-first' },
];

const authorshipModes = [
  {
    mode: 'human',
    label: 'Human',
    color: colors.human,
    icon: <User style={{ width: 20, height: 20 }} />,
    description: 'A named person wrote the essay. No meaningful AI involvement in the writing.',
    specDisplay: 'Author: [Name]',
    example: `authorship: {
  mode: 'human',
  author: { name: 'Zev Uhuru', role: 'Editor-in-Chief' },
}`,
  },
  {
    mode: 'ai-assisted',
    label: 'AI-Assisted',
    color: colors.aiAssisted,
    icon: <UserCog style={{ width: 20, height: 20 }} />,
    description: 'A named person wrote the essay. AI assisted with specific contributions like research, visualization code, or fact-checking.',
    specDisplay: 'Author: [Name] + AI Assist: [Model] · [Contributions]',
    example: `authorship: {
  mode: 'ai-assisted',
  author: { name: 'Zev Uhuru', role: 'Editor-in-Chief' },
  model: 'claude-opus-4.6',
  aiContributions: ['research', 'visualization', 'fact-checking'],
}`,
  },
  {
    mode: 'ai-directed',
    label: 'AI-Directed',
    color: colors.aiDirected,
    icon: <Bot style={{ width: 20, height: 20 }} />,
    description: 'AI produced the artifact under human editorial direction — the standard pipeline. A human chose the topic, approved the brief, reviewed gates, and published.',
    specDisplay: 'Model: [Model label]',
    example: `authorship: {
  mode: 'ai-directed',
  model: 'claude-opus-4.6',
}`,
  },
];

const aiContributions = [
  { key: 'research', description: 'Source discovery, synthesis, or research packages' },
  { key: 'code', description: 'Visualization code, components, or CSS' },
  { key: 'editing', description: 'Prose editing, structure, or tone' },
  { key: 'fact-checking', description: 'Claim verification, date and attribution checks' },
  { key: 'visualization', description: 'Data visualization design or implementation' },
];

export default function ArtifactSpecsPage() {
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
          <FileCode style={{ width: 16, height: 16 }} />
          Reference
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(2.25rem, 5vw, 3rem)',
            fontWeight: 300,
            lineHeight: 1.15,
            letterSpacing: '-0.025em',
            marginBottom: '1.5rem',
            color: colors.text
          }}
        >
          Artifact Specifications
        </h1>

        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.7,
          color: colors.muted,
          maxWidth: '600px'
        }}>
          Every artifact published on Esy carries a specification — structured metadata that describes what it is, how it was made, and who made it. The spec panel makes this provenance inspectable by any reader.
        </p>
      </header>

      {/* What Is an Artifact Spec? */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="what-is-a-spec"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text
          }}
        >
          What Is an Artifact Spec?
        </h2>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.5rem'
        }}>
          An artifact spec is the metadata object attached to every published piece — visual essays, briefs, infographics. It appears in the collapsible &ldquo;Artifact Spec&rdquo; panel beneath the hero section and includes production details: template, design system, source quality, model, authorship, palette, and visualization inventory.
        </p>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.5rem'
        }}>
          The spec serves two purposes: it gives readers transparency into how the artifact was produced, and it gives the production pipeline a structured contract to validate against.
        </p>

        <DocsCallout type="info" title="Implementation">
          Each essay defines its spec as an <code style={{ fontSize: '0.875em', padding: '0.15em 0.4em', background: colors.surface, borderRadius: '4px' }}>ESSAY_META</code> object in its <code style={{ fontSize: '0.875em', padding: '0.15em 0.4em', background: colors.surface, borderRadius: '4px' }}>page.tsx</code>, passed to the <code style={{ fontSize: '0.875em', padding: '0.15em 0.4em', background: colors.surface, borderRadius: '4px' }}>ArtifactDetailWrapper</code> component. The TypeScript interface lives at <code style={{ fontSize: '0.875em', padding: '0.15em 0.4em', background: colors.surface, borderRadius: '4px' }}>src/lib/artifact-spec/schema.ts</code>.
        </DocsCallout>
      </section>

      {/* Schema */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="schema"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text
          }}
        >
          Schema
        </h2>

        <h3 style={{
          fontSize: '1.0625rem',
          fontWeight: 600,
          color: colors.text,
          marginBottom: '1rem'
        }}>
          Required Fields
        </h3>

        <div style={{
          borderRadius: '12px',
          border: `1px solid ${colors.border}`,
          overflow: 'hidden',
          marginBottom: '2rem'
        }}>
          {specFields.map((f, i) => (
            <div key={f.field} style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '1rem',
              padding: '0.75rem 1.25rem',
              background: i % 2 === 0 ? colors.elevated : colors.bg,
              borderBottom: i < specFields.length - 1 ? `1px solid ${colors.border}` : 'none',
            }}>
              <code style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: colors.accent,
                flexShrink: 0,
                minWidth: '160px'
              }}>
                {f.field}
              </code>
              <span style={{
                fontSize: '0.75rem',
                color: colors.subtle,
                flexShrink: 0,
                minWidth: '80px'
              }}>
                {f.type}
              </span>
              <span style={{
                fontSize: '0.8125rem',
                color: colors.muted
              }}>
                {f.description}
              </span>
            </div>
          ))}
        </div>

        <h3 style={{
          fontSize: '1.0625rem',
          fontWeight: 600,
          color: colors.text,
          marginBottom: '1rem'
        }}>
          Optional Fields
        </h3>

        <div style={{
          borderRadius: '12px',
          border: `1px solid ${colors.border}`,
          overflow: 'hidden',
          marginBottom: '1.5rem'
        }}>
          {optionalFields.map((f, i) => (
            <div key={f.field} style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '1rem',
              padding: '0.75rem 1.25rem',
              background: i % 2 === 0 ? colors.elevated : colors.bg,
              borderBottom: i < optionalFields.length - 1 ? `1px solid ${colors.border}` : 'none',
            }}>
              <code style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: colors.accent,
                flexShrink: 0,
                minWidth: '160px'
              }}>
                {f.field}
              </code>
              <span style={{
                fontSize: '0.75rem',
                color: colors.subtle,
                flexShrink: 0,
                minWidth: '80px'
              }}>
                {f.type}
              </span>
              <span style={{
                fontSize: '0.8125rem',
                color: colors.muted
              }}>
                {f.description}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Authorship */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="authorship"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text
          }}
        >
          Authorship
        </h2>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.5rem'
        }}>
          The <code style={{ fontSize: '0.875em', padding: '0.15em 0.4em', background: colors.surface, borderRadius: '4px' }}>authorship</code> field describes who made the artifact and what role AI played. It separates two things that are often conflated: who is the creative author, and what tools were used in production.
        </p>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '2rem'
        }}>
          Every artifact falls into one of three modes. The naming encodes directionality — in <strong style={{ color: colors.text, fontWeight: 600 }}>AI-Assisted</strong>, the human is the author and AI is the tool. In <strong style={{ color: colors.text, fontWeight: 600 }}>AI-Directed</strong>, AI is the production engine and the human is the director.
        </p>

        {/* Three Modes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
          {authorshipModes.map((m) => (
            <div key={m.mode} style={{
              padding: '1.5rem',
              background: colors.elevated,
              borderRadius: '12px',
              borderLeft: `4px solid ${m.color}`,
              border: `1px solid ${colors.border}`,
              borderLeftWidth: '4px',
              borderLeftColor: m.color,
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.75rem'
              }}>
                <div style={{ color: m.color, flexShrink: 0 }}>
                  {m.icon}
                </div>
                <h3 style={{
                  fontSize: '1.0625rem',
                  fontWeight: 600,
                  color: colors.text,
                  margin: 0
                }}>
                  {m.label}
                </h3>
                <code style={{
                  fontSize: '0.7rem',
                  padding: '0.15rem 0.5rem',
                  background: `${m.color}15`,
                  color: m.color,
                  borderRadius: '4px',
                  fontWeight: 600,
                }}>
                  {m.mode}
                </code>
              </div>

              <p style={{
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                color: colors.muted,
                marginBottom: '1rem'
              }}>
                {m.description}
              </p>

              <div style={{
                fontSize: '0.8125rem',
                color: colors.subtle,
                marginBottom: '0.75rem'
              }}>
                <strong style={{ color: colors.muted }}>Spec panel:</strong> {m.specDisplay}
              </div>

              <pre style={{
                fontSize: '0.78rem',
                lineHeight: 1.6,
                padding: '1rem',
                background: '#0A2540',
                color: '#E2E8F0',
                borderRadius: '8px',
                overflow: 'auto',
                margin: 0,
                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
              }}>
                {m.example}
              </pre>
            </div>
          ))}
        </div>

        {/* AI Contributions */}
        <h3
          id="ai-contributions"
          style={{
            fontSize: '1.125rem',
            fontWeight: 600,
            color: colors.text,
            marginBottom: '1rem'
          }}
        >
          AI Contributions
        </h3>

        <p style={{
          fontSize: '1rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.25rem'
        }}>
          When an essay is <code style={{ fontSize: '0.875em', padding: '0.15em 0.4em', background: colors.surface, borderRadius: '4px' }}>ai-assisted</code>, the <code style={{ fontSize: '0.875em', padding: '0.15em 0.4em', background: colors.surface, borderRadius: '4px' }}>aiContributions</code> array describes what AI helped with. These render in the spec panel as a comma-separated list.
        </p>

        <div style={{
          borderRadius: '12px',
          border: `1px solid ${colors.border}`,
          overflow: 'hidden',
          marginBottom: '1.5rem'
        }}>
          {aiContributions.map((c, i) => (
            <div key={c.key} style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '1rem',
              padding: '0.75rem 1.25rem',
              background: i % 2 === 0 ? colors.elevated : colors.bg,
              borderBottom: i < aiContributions.length - 1 ? `1px solid ${colors.border}` : 'none',
            }}>
              <code style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: colors.aiAssisted,
                flexShrink: 0,
                minWidth: '120px'
              }}>
                {c.key}
              </code>
              <span style={{
                fontSize: '0.8125rem',
                color: colors.muted
              }}>
                {c.description}
              </span>
            </div>
          ))}
        </div>

        {/* Backward Compatibility */}
        <DocsCallout type="info" title="Backward Compatibility">
          The <code style={{ fontSize: '0.875em', padding: '0.15em 0.4em', background: colors.surface, borderRadius: '4px' }}>authorship</code> field is optional. When absent, the system derives <code style={{ fontSize: '0.875em', padding: '0.15em 0.4em', background: colors.surface, borderRadius: '4px' }}>{'{ mode: \'ai-directed\', model: meta.model }'}</code> from the legacy <code style={{ fontSize: '0.875em', padding: '0.15em 0.4em', background: colors.surface, borderRadius: '4px' }}>model</code> field. Every existing essay works without modification.
        </DocsCallout>
      </section>

      {/* Spec Panel Sections */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="spec-panel"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text
          }}
        >
          The Spec Panel
        </h2>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.5rem'
        }}>
          The spec panel is the collapsible detail section rendered by <code style={{ fontSize: '0.875em', padding: '0.15em 0.4em', background: colors.surface, borderRadius: '4px' }}>ArtifactDetailWrapper</code>. It exposes five areas of information:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            {
              icon: <FileCode style={{ width: 18, height: 18 }} />,
              title: 'Metadata Grid',
              description: 'Template, design system, publication date, authorship/model, source quality, and citation-first status.'
            },
            {
              icon: <Palette style={{ width: 18, height: 18 }} />,
              title: 'Color Palette',
              description: 'Named color swatches used in the essay\'s design system, with hex values.'
            },
            {
              icon: <BarChart3 style={{ width: 18, height: 18 }} />,
              title: 'Visualizations',
              description: 'Inventory of every interactive visualization with its implementation type (e.g., "D3 Scatter + Voronoi").'
            },
            {
              icon: <BookOpen style={{ width: 18, height: 18 }} />,
              title: 'Key Sources',
              description: 'Highlighted primary sources, with a "+N more" indicator when the full bibliography is larger.'
            },
          ].map((item) => (
            <div key={item.title} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              padding: '1rem',
              background: colors.elevated,
              borderRadius: '10px',
              border: `1px solid ${colors.border}`
            }}>
              <div style={{ color: colors.accent, flexShrink: 0, marginTop: '0.125rem' }}>
                {item.icon}
              </div>
              <div>
                <span style={{ fontWeight: 600, color: colors.text, fontSize: '0.9375rem' }}>
                  {item.title}
                </span>
                <span style={{ color: colors.subtle }}> — </span>
                <span style={{ fontSize: '0.9375rem', color: colors.muted }}>
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Model Registry */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="model-registry"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text
          }}
        >
          Model Registry
        </h2>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.5rem'
        }}>
          Model IDs follow the pattern <code style={{ fontSize: '0.875em', padding: '0.15em 0.4em', background: colors.surface, borderRadius: '4px' }}>{'{family}-{subfamily}-{version}'}</code> and are registered in the model registry. The spec panel resolves IDs to display labels at render time.
        </p>

        <div style={{
          borderRadius: '12px',
          border: `1px solid ${colors.border}`,
          overflow: 'hidden',
          marginBottom: '1.5rem'
        }}>
          {[
            { id: 'claude-opus-4.6', label: 'Claude Opus 4.6', vendor: 'Anthropic', status: 'Recommended' },
            { id: 'claude-sonnet-4.5', label: 'Claude Sonnet 4.5', vendor: 'Anthropic', status: 'Supported' },
            { id: 'gpt-5.2', label: 'GPT 5.2', vendor: 'OpenAI', status: 'Recommended' },
          ].map((m, i) => (
            <div key={m.id} style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '1rem',
              padding: '0.75rem 1.25rem',
              background: i % 2 === 0 ? colors.elevated : colors.bg,
              borderBottom: i < 2 ? `1px solid ${colors.border}` : 'none',
            }}>
              <code style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: colors.accent,
                flexShrink: 0,
                minWidth: '160px'
              }}>
                {m.id}
              </code>
              <span style={{ fontSize: '0.8125rem', color: colors.muted, flexShrink: 0, minWidth: '120px' }}>
                {m.label}
              </span>
              <span style={{ fontSize: '0.8125rem', color: colors.subtle, flexShrink: 0, minWidth: '80px' }}>
                {m.vendor}
              </span>
              <span style={{
                fontSize: '0.7rem',
                padding: '0.15rem 0.5rem',
                background: m.status === 'Recommended' ? `${colors.accent}15` : colors.surface,
                color: m.status === 'Recommended' ? colors.accent : colors.subtle,
                borderRadius: '4px',
                fontWeight: 600,
              }}>
                {m.status}
              </span>
            </div>
          ))}
        </div>

        <p style={{
          fontSize: '0.9375rem',
          lineHeight: 1.8,
          color: colors.subtle,
        }}>
          Legacy essays using unrecognized strings (e.g., <code style={{ fontSize: '0.875em', padding: '0.15em 0.4em', background: colors.surface, borderRadius: '4px' }}>&apos;Claude&apos;</code>) display the string as-is for backward compatibility.
        </p>
      </section>

      {/* Pipeline Enforcement */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="pipeline"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text
          }}
        >
          Pipeline Enforcement
        </h2>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.5rem'
        }}>
          Artifact specs are validated at multiple gates in the production pipeline:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { gate: 'G5', name: 'Content Complete', check: 'page.tsx exists with ESSAY_META and ArtifactDetailWrapper' },
            { gate: 'G8', name: 'Publication Certification', check: 'Cross-checks metadata completeness before publication' },
          ].map((g) => (
            <div key={g.gate} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              padding: '1rem',
              background: colors.elevated,
              borderRadius: '10px',
              border: `1px solid ${colors.border}`
            }}>
              <CheckCircle style={{ width: 16, height: 16, color: colors.accent, flexShrink: 0, marginTop: '0.15rem' }} />
              <div>
                <strong style={{ color: colors.text, fontWeight: 600 }}>{g.gate}: {g.name}</strong>
                <span style={{ color: colors.subtle }}> — </span>
                <span style={{ color: colors.muted, fontSize: '0.9375rem' }}>{g.check}</span>
              </div>
            </div>
          ))}
        </div>
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
            { href: "/docs/designing-visual-essays", title: "Designing Visual Essays", desc: "Design doctrine and interaction patterns" },
            { href: "/docs/core-model", title: "Core Model", desc: "Esy's execution architecture" },
            { href: "/docs/workflows", title: "Workflows", desc: "Execution pipelines for content creation" },
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
