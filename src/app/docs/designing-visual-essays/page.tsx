import { Metadata } from "next";
import Link from "next/link";
import {
  Palette,
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  MousePointer,
  Layers,
  Clock,
  Shield,
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
  accentHover: '#00D4AA',
  accentLight: '#00D4AA',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
};

export const metadata: Metadata = {
  title: "Designing Visual Essays | Esy Documentation",
  description: "Design philosophy and principles for creating visual essays in Esy. Interaction patterns, reader trust, and narrative design.",
  openGraph: {
    title: "Designing Visual Essays | Esy Documentation",
    description: "How Esy thinks about designing visual essays.",
    url: "https://esy.com/docs/designing-visual-essays",
  },
};

export default function DesigningVisualEssaysPage() {
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
          <Palette style={{ width: 16, height: 16 }} />
          Design Doctrine
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
          Designing Visual Essays
        </h1>

        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.7,
          color: colors.muted,
          maxWidth: '600px'
        }}>
          Visual essays are designed, not decorated. This document establishes the philosophy, constraints, and patterns that govern how Esy approaches interactive narrative design.
        </p>
      </header>

      {/* Core Philosophy */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="philosophy"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text
          }}
        >
          Core Philosophy
        </h2>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.5rem'
        }}>
          Esy visual essays exist to serve thinking. Every design decision must answer to this principle.
        </p>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.5rem'
        }}>
          Visual elements—motion, interaction, layout—are not ornaments. They are instruments of clarity. When a visual choice does not advance understanding, it is removed.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: <Eye style={{ width: 18, height: 18 }} />, text: 'Reader comprehension takes precedence over aesthetic ambition' },
            { icon: <Shield style={{ width: 18, height: 18 }} />, text: 'Trust is preserved through predictable, bounded interactions' },
            { icon: <Layers style={{ width: 18, height: 18 }} />, text: 'Complexity is hidden; simplicity is surfaced' },
            { icon: <Clock style={{ width: 18, height: 18 }} />, text: 'Reader time is respected; friction is minimized' },
          ].map((item) => (
            <div key={item.text} style={{
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
              <span style={{ fontSize: '0.9375rem', color: colors.textSecondary }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary
        }}>
          A visual essay succeeds when the reader forgets they are interacting and remembers only what they learned.
        </p>
      </section>

      {/* Design Principles */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="principles"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text
          }}
        >
          Design Principles
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Principle 1 */}
          <div>
            <h3 style={{
              fontSize: '1.0625rem',
              fontWeight: 600,
              color: colors.text,
              marginBottom: '0.75rem'
            }}>
              Content Before Interaction
            </h3>
            <p style={{
              fontSize: '0.9375rem',
              lineHeight: 1.8,
              color: colors.muted
            }}>
              The essay must function as a readable document before any interactivity is added. If removing all JavaScript leaves an incoherent page, the design has failed. Interaction enhances; it does not constitute.
            </p>
          </div>

          {/* Principle 2 */}
          <div>
            <h3 style={{
              fontSize: '1.0625rem',
              fontWeight: 600,
              color: colors.text,
              marginBottom: '0.75rem'
            }}>
              Earned Complexity
            </h3>
            <p style={{
              fontSize: '0.9375rem',
              lineHeight: 1.8,
              color: colors.muted
            }}>
              Interactive elements are introduced only after the reader has demonstrated intent through engagement. The opening of an essay establishes credibility and clarity; complexity follows.
            </p>
          </div>

          {/* Principle 3 */}
          <div>
            <h3 style={{
              fontSize: '1.0625rem',
              fontWeight: 600,
              color: colors.text,
              marginBottom: '0.75rem'
            }}>
              Bounded Interactions
            </h3>
            <p style={{
              fontSize: '0.9375rem',
              lineHeight: 1.8,
              color: colors.muted
            }}>
              Every interactive sequence has a visible beginning, a predictable duration, and a clear end. Readers should never wonder how long an interaction will last or whether they can exit.
            </p>
          </div>

          {/* Principle 4 */}
          <div>
            <h3 style={{
              fontSize: '1.0625rem',
              fontWeight: 600,
              color: colors.text,
              marginBottom: '0.75rem'
            }}>
              Progressive Disclosure
            </h3>
            <p style={{
              fontSize: '0.9375rem',
              lineHeight: 1.8,
              color: colors.muted
            }}>
              Information is revealed in service of narrative, not spectacle. Each reveal must advance the reader&apos;s understanding. Reveals that exist purely for visual effect are removed.
            </p>
          </div>

          {/* Principle 5 */}
          <div>
            <h3 style={{
              fontSize: '1.0625rem',
              fontWeight: 600,
              color: colors.text,
              marginBottom: '0.75rem'
            }}>
            Device-Appropriate Design
            </h3>
            <p style={{
              fontSize: '0.9375rem',
              lineHeight: 1.8,
              color: colors.muted
            }}>
              Mobile and desktop are different media. Interactions that work on desktop may fail on mobile. Each device receives a design appropriate to its input modality and screen constraints.
            </p>
          </div>
        </div>
      </section>

      {/* Interaction Patterns */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="interaction-patterns"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text
          }}
        >
          Interaction Patterns
        </h2>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '2rem'
        }}>
          Visual essays employ a vocabulary of interaction patterns. Each pattern has appropriate uses and inherent costs.
        </p>

        {/* Scroll-Reactive */}
        <div style={{
          padding: '1.5rem',
          background: colors.elevated,
          borderRadius: '12px',
          border: `1px solid ${colors.success}25`,
          marginBottom: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: colors.success
            }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: colors.text, margin: 0 }}>
              Scroll-Reactive (Preferred)
            </h3>
          </div>
          <p style={{ fontSize: '0.9375rem', color: colors.muted, marginBottom: '0.75rem' }}>
            Elements respond to scroll position without restricting navigation. Animations trigger, sticky elements persist, parallax effects create depth—all while the reader maintains full control.
          </p>
          <p style={{ fontSize: '0.8125rem', color: colors.subtle }}>
            Use for: Visual emphasis, transitions, progressive reveals, ambient motion.
          </p>
        </div>

        {/* Hover/Focus */}
        <div style={{
          padding: '1.5rem',
          background: colors.elevated,
          borderRadius: '12px',
          border: `1px solid ${colors.success}25`,
          marginBottom: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: colors.success
            }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: colors.text, margin: 0 }}>
              Hover and Focus States
            </h3>
          </div>
          <p style={{ fontSize: '0.9375rem', color: colors.muted, marginBottom: '0.75rem' }}>
            Interactive elements reveal additional information or visual states on hover (desktop) or focus. These are reversible and non-blocking.
          </p>
          <p style={{ fontSize: '0.8125rem', color: colors.subtle }}>
            Use for: Annotations, definitions, visual comparisons, optional depth.
          </p>
        </div>

        {/* Click/Tap */}
        <div style={{
          padding: '1.5rem',
          background: colors.elevated,
          borderRadius: '12px',
          border: `1px solid ${colors.warning}25`,
          marginBottom: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: colors.warning
            }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: colors.text, margin: 0 }}>
              Click/Tap Interactions
            </h3>
          </div>
          <p style={{ fontSize: '0.9375rem', color: colors.muted, marginBottom: '0.75rem' }}>
            User-initiated actions that change state or reveal content. Require clear affordances and should produce immediate, visible results.
          </p>
          <p style={{ fontSize: '0.8125rem', color: colors.subtle }}>
            Use for: Expanding sections, toggling views, triggering animations, navigating steps.
          </p>
        </div>

        {/* Scroll-Lock */}
        <div style={{
          padding: '1.5rem',
          background: colors.elevated,
          borderRadius: '12px',
          border: `1px solid ${colors.error}25`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: colors.error
            }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: colors.text, margin: 0 }}>
              Scroll-Locking (Constrained)
            </h3>
          </div>
          <p style={{ fontSize: '0.9375rem', color: colors.muted, marginBottom: '0.75rem' }}>
            Temporarily intercepts scroll to drive a sequence. High-impact but high-risk. Governed by strict rules detailed below.
          </p>
          <p style={{ fontSize: '0.8125rem', color: colors.subtle }}>
            Use for: Rare narrative moments, symbolic transitions, conceptual synthesis.
          </p>
        </div>
      </section>

      {/* Scroll-Locking Philosophy */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="scroll-locking"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text
          }}
        >
          Scroll-Locking Philosophy & Patterns
        </h2>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.5rem'
        }}>
          Scroll-locking is one of the most powerful—and most dangerous—interaction tools available. Used correctly, it elevates an essay into a memorable experience. Used incorrectly, it breaks trust, blocks reading, and alienates serious readers.
        </p>

        <DocsCallout type="info" title="Core Principle">
          Scroll-locking is <strong>narrative punctuation</strong>, not navigation. It exists to mark moments of synthesis, not to control the reader.
        </DocsCallout>

        {/* The Trust Model */}
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: 600,
          color: colors.text,
          marginTop: '2.5rem',
          marginBottom: '1rem'
        }}>
          The Trust Model
        </h3>

        <p style={{
          fontSize: '1rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.5rem'
        }}>
          Scroll-locking consumes reader trust. Trust accumulates through reading and is spent through interaction friction.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            padding: '1.25rem',
            background: colors.surface,
            borderRadius: '10px',
            borderLeft: `3px solid ${colors.error}`
          }}>
            <h4 style={{ fontSize: '0.8125rem', fontWeight: 600, color: colors.error, marginBottom: '0.625rem' }}>
              Trust is Lowest
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['On first page load', 'Above the fold', 'On mobile devices', 'For research content'].map((item) => (
                <li key={item} style={{ fontSize: '0.8125rem', color: colors.muted, marginBottom: '0.25rem' }}>
                  • {item}
                </li>
              ))}
            </ul>
          </div>
          <div style={{
            padding: '1.25rem',
            background: colors.surface,
            borderRadius: '10px',
            borderLeft: `3px solid ${colors.success}`
          }}>
            <h4 style={{ fontSize: '0.8125rem', fontWeight: 600, color: colors.success, marginBottom: '0.625rem' }}>
              Trust is Highest
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['After meaningful reading', 'Near essay end', 'When intent is demonstrated', 'When interaction is declared'].map((item) => (
                <li key={item} style={{ fontSize: '0.8125rem', color: colors.muted, marginBottom: '0.25rem' }}>
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Hard Rules */}
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: 600,
          color: colors.text,
          marginTop: '2.5rem',
          marginBottom: '1rem'
        }}>
          Hard Rules
        </h3>

        <div style={{
          padding: '1.5rem',
          background: colors.elevated,
          borderRadius: '12px',
          border: `1px solid ${colors.border}`,
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <XCircle style={{ width: 18, height: 18, color: colors.error, flexShrink: 0, marginTop: '0.125rem' }} />
              <div>
                <span style={{ fontWeight: 600, color: colors.text }}>Never above the fold.</span>
                <span style={{ color: colors.muted }}> The opening must scroll normally, establish credibility, and allow immediate access to text.</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <XCircle style={{ width: 18, height: 18, color: colors.error, flexShrink: 0, marginTop: '0.125rem' }} />
              <div>
                <span style={{ fontWeight: 600, color: colors.text }}>Never on mobile.</span>
                <span style={{ color: colors.muted }}> Touch scrolling is too imprecise and habitual to intercept safely. Use tap-to-advance or auto-playing sequences instead.</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <XCircle style={{ width: 18, height: 18, color: colors.error, flexShrink: 0, marginTop: '0.125rem' }} />
              <div>
                <span style={{ fontWeight: 600, color: colors.text }}>Never on page load or first scroll.</span>
                <span style={{ color: colors.muted }}> Scroll-lock is earned through demonstrated reader intent, not assumed.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Budget */}
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: 600,
          color: colors.text,
          marginTop: '2.5rem',
          marginBottom: '1rem'
        }}>
          Scroll-Lock Budget
        </h3>

        <p style={{
          fontSize: '1rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1rem'
        }}>
          Each essay has a limited budget for scroll-locking. Readers experience total friction, not isolated interactions.
        </p>

        <div style={{
          padding: '1.25rem',
          background: colors.surface,
          borderRadius: '10px',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.9375rem', color: colors.muted }}>Ideal</span>
              <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: colors.success }}>1–2 sequences</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.9375rem', color: colors.muted }}>Maximum</span>
              <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: colors.warning }}>3 sequences (rare)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.9375rem', color: colors.muted }}>Not permitted</span>
              <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: colors.error }}>5+ sequences</span>
            </div>
          </div>
        </div>

        <p style={{
          fontSize: '0.9375rem',
          fontStyle: 'italic',
          color: colors.subtle,
          marginBottom: '1.5rem'
        }}>
          If everything is interactive, nothing is special.
        </p>

        {/* Duration & Constraints */}
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: 600,
          color: colors.text,
          marginTop: '2.5rem',
          marginBottom: '1rem'
        }}>
          Duration & Constraints
        </h3>

        <p style={{
          fontSize: '1rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1rem'
        }}>
          Each scroll-lock sequence must be short, predictable, and finite.
        </p>

        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
          {[
            '1–2 scroll gestures preferred',
            '3 gestures maximum per sequence',
            '5 gestures only if declared in advance, late in essay, and optional'
          ].map((item) => (
            <li key={item} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              marginBottom: '0.5rem',
              fontSize: '0.9375rem',
              color: colors.muted
            }}>
              <CheckCircle style={{ width: 14, height: 14, color: colors.accent, flexShrink: 0, marginTop: '0.25rem' }} />
              {item}
            </li>
          ))}
        </ul>

        {/* Requirements */}
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: 600,
          color: colors.text,
          marginTop: '2.5rem',
          marginBottom: '1rem'
        }}>
          Required Elements
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            padding: '1.25rem',
            background: colors.elevated,
            borderRadius: '10px',
            border: `1px solid ${colors.border}`
          }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: colors.text, marginBottom: '0.5rem' }}>
              Declaration
            </h4>
            <p style={{ fontSize: '0.8125rem', color: colors.muted, margin: 0 }}>
              Announce that an interactive sequence is starting, its purpose, and approximate duration.
            </p>
          </div>
          <div style={{
            padding: '1.25rem',
            background: colors.elevated,
            borderRadius: '10px',
            border: `1px solid ${colors.border}`
          }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: colors.text, marginBottom: '0.5rem' }}>
              Progress Visibility
            </h4>
            <p style={{ fontSize: '0.8125rem', color: colors.muted, margin: 0 }}>
              Show where the reader is, how much remains, and that control will be returned.
            </p>
          </div>
          <div style={{
            padding: '1.25rem',
            background: colors.elevated,
            borderRadius: '10px',
            border: `1px solid ${colors.border}`
          }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: colors.text, marginBottom: '0.5rem' }}>
              Escape Hatch
            </h4>
            <p style={{ fontSize: '0.8125rem', color: colors.muted, margin: 0 }}>
              Provide a visible exit: &ldquo;Skip interactive,&rdquo; &ldquo;Continue reading,&rdquo; or auto-release on completion.
            </p>
          </div>
        </div>

        {/* Appropriate Uses */}
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: 600,
          color: colors.text,
          marginTop: '2.5rem',
          marginBottom: '1rem'
        }}>
          Appropriate & Inappropriate Uses
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <h4 style={{ fontSize: '0.8125rem', fontWeight: 600, color: colors.success, marginBottom: '0.625rem' }}>
              Appropriate
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'Single conceptual transition',
                'Historical compression/expansion',
                'Symbolic synthesis',
                'Final interactive epilogue'
              ].map((item) => (
                <li key={item} style={{ fontSize: '0.8125rem', color: colors.muted, marginBottom: '0.25rem' }}>
                  • {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '0.8125rem', fontWeight: 600, color: colors.error, marginBottom: '0.625rem' }}>
              Inappropriate
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'Definitions or lists',
                'Citations or arguments',
                'Core explanatory content',
                'Decorative transitions'
              ].map((item) => (
                <li key={item} style={{ fontSize: '0.8125rem', color: colors.muted, marginBottom: '0.25rem' }}>
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The Canonical Rule */}
        <div style={{
          padding: '1.5rem',
          background: `linear-gradient(135deg, ${colors.accent}08 0%, ${colors.accent}03 100%)`,
          borderRadius: '12px',
          border: `1px solid ${colors.accent}20`,
          marginTop: '2rem'
        }}>
          <h4 style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: colors.accentLight,
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            The Esy Scroll-Lock Rule
          </h4>
          <p style={{
            fontSize: '1rem',
            lineHeight: 1.8,
            color: colors.textSecondary,
            margin: 0
          }}>
            Scroll-locking is a rare, intentional narrative tool. An essay may contain no more than two mandatory sequences, never above the fold, never on mobile, and only after reader intent is established. All sequences must be declared, bounded, short, and escapable.
          </p>
        </div>
      </section>

      {/* Scroll-Reactive Alternative */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="scroll-reactive"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text
          }}
        >
          Prefer Scroll-Reactive Design
        </h2>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1.5rem'
        }}>
          When interaction is desired but control is unnecessary, scroll-reactive patterns achieve visual impact without restricting navigation:
        </p>

        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
          {[
            'Scroll-triggered animations',
            'Sticky elements that persist through sections',
            'Parallax motion and depth effects',
            'Progressive reveals tied to scroll position'
          ].map((item) => (
            <li key={item} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              marginBottom: '0.5rem',
              fontSize: '0.9375rem',
              color: colors.muted
            }}>
              <CheckCircle style={{ width: 14, height: 14, color: colors.success, flexShrink: 0, marginTop: '0.25rem' }} />
              {item}
            </li>
          ))}
        </ul>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary
        }}>
          Most visual impact can be achieved without scroll-locking. The question to ask: does this interaction do something text alone cannot? If not, remove the lock.
        </p>
      </section>

      {/* Design Heuristic */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 5rem)' }}>
        <h2
          id="heuristic"
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.625rem, 3.5vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem',
            color: colors.text
          }}
        >
          The Design Heuristic
        </h2>

        <p style={{
          fontSize: '1.25rem',
          fontStyle: 'italic',
          color: colors.text,
          textAlign: 'center',
          padding: '2rem',
          background: colors.elevated,
          borderRadius: '12px',
          marginBottom: '1.5rem'
        }}>
          Does this interaction do something text alone cannot?
        </p>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary,
          marginBottom: '1rem'
        }}>
          If the answer is no, the interaction should be removed or simplified.
        </p>

        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: colors.textSecondary
        }}>
          Scroll-locking should feel like a reward for attention, not a test of patience. When used sparingly and intentionally, it elevates Esy essays. When overused, it undermines the thinking Esy is built to support.
        </p>

        <p style={{
          fontSize: '1.125rem',
          fontWeight: 500,
          color: colors.text,
          marginTop: '1.5rem'
        }}>
          Design for trust first. Interaction comes second.
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
            { href: "/docs/workflows", title: "Workflows", desc: "Execution pipelines for content creation" },
            { href: "/docs/specs", title: "Artifact Specifications", desc: "Output structure and provenance" },
            { href: "/docs/core-model", title: "Core Model", desc: "Esy's execution architecture" },
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
