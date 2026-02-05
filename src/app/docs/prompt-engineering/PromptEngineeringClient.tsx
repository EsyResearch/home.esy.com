"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Target,
  RefreshCw,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { DocsPageNav, DocsCallout, PromptCard } from "@/components/docs";

// Design system colors from DESIGN_SYSTEM.md - Updated for better contrast
const colors = {
  bg: '#FFFFFF',
  elevated: '#F8FAFC',
  surface: '#F1F5F9',
  text: '#0A2540',
  textSecondary: 'rgba(10, 37, 64, 0.85)',
  muted: 'rgba(10, 37, 64, 0.75)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  border: 'rgba(10, 37, 64, 0.08)',
  accent: '#00A896',
  accentHover: '#00D4AA',
  accentLight: '#00D4AA',
};

const crispeFramework = [
  {
    letter: "C",
    word: "Context",
    description: "Set the scene. What's the assignment? What class is this for?",
    example: "I'm writing a 2000-word essay for my AP History class on the causes of World War I.",
  },
  {
    letter: "R",
    word: "Role",
    description: "Tell the AI who to be.",
    example: "Act as an experienced history professor who specializes in early 20th century European conflicts.",
  },
  {
    letter: "I",
    word: "Instructions",
    description: "Be specific about what you want.",
    example: "Help me develop a thesis statement that argues nationalism was the primary cause.",
  },
  {
    letter: "S",
    word: "Style",
    description: "Define the tone and format.",
    example: "Use formal academic language appropriate for a high school AP course.",
  },
  {
    letter: "P",
    word: "Parameters",
    description: "Set constraints and requirements.",
    example: "Include at least 3 specific historical events as evidence. Avoid Wikipedia as a source.",
  },
  {
    letter: "E",
    word: "Examples",
    description: "Show what good output looks like.",
    example: "A strong thesis might look like: 'While economic factors contributed to WWI, nationalism was the driving force because...'",
  },
];

const starterPrompts = [
  {
    title: "Thesis Statement Generator",
    category: "Getting Started",
    prompt:
      "I'm writing a [LENGTH] essay for my [CLASS] on [TOPIC]. Help me develop 3 strong thesis statements that are: (1) arguable, not just factual, (2) specific enough to be proven in the word limit, (3) interesting to my target reader. For each thesis, explain what evidence would support it.",
  },
  {
    title: "Research Question Refiner",
    category: "Research",
    prompt:
      "My initial research question is: [YOUR QUESTION]. Help me refine this into a more focused, answerable question. Explain what makes a strong research question and suggest 2-3 alternatives that narrow the scope while maintaining academic rigor.",
  },
  {
    title: "Outline Builder",
    category: "Structure",
    prompt:
      "Create a detailed outline for my essay on [TOPIC] with thesis: [THESIS]. Include an introduction with hook ideas, 3-4 body paragraphs with topic sentences and evidence suggestions, and a conclusion that extends the argument. Mark where citations would be needed.",
  },
  {
    title: "Counterargument Developer",
    category: "Critical Thinking",
    prompt:
      "My essay argues that [YOUR ARGUMENT]. Identify the 2-3 strongest counterarguments to my position. For each, explain why someone might hold this view and suggest how I could address it in my essay while strengthening my original thesis.",
  },
];

export default function PromptEngineeringClient() {
  const [hoveredCrispe, setHoveredCrispe] = useState<string | null>(null);
  const [hoveredRelated, setHoveredRelated] = useState<string | null>(null);

  return (
    <article style={{ 
      maxWidth: '800px',
      margin: '0 auto',
      padding: '0 clamp(1.5rem, 5vw, 2rem)',
      paddingTop: 'clamp(4rem, 10vh, 6rem)',
      paddingBottom: 'clamp(4rem, 8vh, 6rem)'
    }}>
      {/* Header */}
      <div style={{ marginBottom: 'clamp(3rem, 6vh, 4rem)' }}>
        <div 
          className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full text-sm font-medium"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.1) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            color: colors.accentLight,
          }}
        >
          <Sparkles className="w-4 h-4" />
          Prompt Engineering
        </div>

        <h1 
          style={{ 
            fontFamily: 'var(--font-literata), Georgia, serif', 
            fontSize: 'clamp(2.25rem, 5vw, 3.25rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
            color: colors.text
          }}
        >
          Prompt Engineering for Students: The Complete Guide
        </h1>

        <p style={{ 
          fontSize: '1.125rem',                // 18px - lead paragraph
          lineHeight: 1.8,
          marginBottom: '1.5rem',
          color: colors.muted
        }}>
          Learn how to write AI prompts that actually work. This guide covers
          the fundamentals of prompt engineering tailored specifically for
          academic writing, research papers, and essay assignments.
        </p>

        <div className="flex flex-wrap gap-4 text-sm" style={{ color: colors.subtle }}>
          <span>📚 15 min read</span>
          <span>•</span>
          <span>Updated November 2025</span>
        </div>
      </div>

      <DocsCallout type="tip" title="Quick Win">
        Already know the basics? Jump to our{" "}
        <Link href="/docs/chatgpt-prompts-for-academic-writing" className="underline" style={{ color: colors.accentHover }}>
          50+ ready-to-use prompts
        </Link>{" "}
        for academic writing.
      </DocsCallout>

      {/* What is Prompt Engineering */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
        <h2
          id="what-is-prompt-engineering"
          style={{ 
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            marginBottom: 'clamp(1.5rem, 3vh, 2rem)',
            color: colors.text
          }}
        >
          What is Prompt Engineering?
        </h2>
        <p style={{ 
          fontSize: '1rem',
          lineHeight: 1.7,
          marginBottom: '1.25rem',
          color: colors.muted
        }}>
          Prompt engineering is the skill of crafting instructions that help
          AI tools like ChatGPT, Claude, or Esy understand exactly what you
          need. Think of it as learning to communicate with a brilliant but
          literal-minded research assistant.
        </p>
        <p style={{ 
          fontSize: '1rem',
          lineHeight: 1.7,
          marginBottom: '1.25rem',
          color: colors.muted
        }}>
          The difference between a mediocre AI response and a genuinely
          helpful one often comes down to how you ask the question. A vague
          prompt gets vague results. A specific, well-structured prompt gets
          output you can actually use.
        </p>

        <div 
          className="rounded-xl p-6 mt-6"
          style={{ backgroundColor: colors.elevated, border: `1px solid ${colors.border}` }}
        >
          <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color: colors.text }}>
            <Target className="w-5 h-5" style={{ color: colors.accentHover }} />
            Bad vs. Good Prompts
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div 
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.2)' }}
            >
              <p className="text-xs uppercase tracking-wider mb-2 font-semibold" style={{ color: '#f87171' }}>
                ❌ Vague
              </p>
              <p className="text-sm font-mono" style={{ color: colors.textSecondary }}>
                &ldquo;Write about climate change&rdquo;
              </p>
            </div>
            <div 
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)' }}
            >
              <p className="text-xs uppercase tracking-wider mb-2 font-semibold" style={{ color: '#22c55e' }}>
                ✓ Specific
              </p>
              <p className="text-sm font-mono" style={{ color: colors.textSecondary }}>
                &ldquo;I&apos;m writing a 1500-word argumentative essay for my
                Environmental Science class. Help me build an outline arguing
                that carbon pricing is the most effective policy tool for
                reducing emissions. Include counterarguments.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CRISPE Framework */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
        <h2
          id="crispe-framework"
          style={{ 
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            marginBottom: 'clamp(1.5rem, 3vh, 2rem)',
            color: colors.text
          }}
        >
          The CRISPE Framework
        </h2>
        <p style={{ 
          fontSize: '1.0625rem',
          lineHeight: 1.7,
          marginBottom: '2rem',
          color: colors.muted,
          fontWeight: 500
        }}>
          CRISPE is a simple framework for writing effective prompts. It
          stands for Context, Role, Instructions, Style, Parameters, and
          Examples. Not every prompt needs all six elements, but including
          more usually means better results.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {crispeFramework.map((item) => (
            <div
              key={item.letter}
              onMouseEnter={() => setHoveredCrispe(item.letter)}
              onMouseLeave={() => setHoveredCrispe(null)}
              style={{
                background: hoveredCrispe === item.letter
                  ? 'linear-gradient(135deg, rgba(39, 39, 42, 0.95) 0%, rgba(31, 31, 35, 0.8) 100%)'
                  : 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
                border: `1px solid ${hoveredCrispe === item.letter ? 'rgba(159, 122, 234, 0.3)' : colors.border}`,
                borderRadius: '16px',
                padding: '1.75rem',
                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                backdropFilter: 'blur(10px)',
                boxShadow: hoveredCrispe === item.letter
                  ? '0 12px 32px rgba(159, 122, 234, 0.2)'
                  : '0 4px 16px rgba(0, 0, 0, 0.15)',
                transform: hoveredCrispe === item.letter ? 'translateY(-4px)' : 'translateY(0)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                <div 
                  style={{
                    flexShrink: 0,
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                  }}
                >
                  {item.letter}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ 
                    fontWeight: 600, 
                    marginBottom: '0.5rem', 
                    color: colors.text,
                    fontSize: '1.125rem'
                  }}>
                    {item.word}
                  </h3>
                  <p style={{ 
                    fontSize: '0.9375rem', 
                    marginBottom: '0.875rem', 
                    color: colors.muted,
                    lineHeight: 1.6
                  }}>
                    {item.description}
                  </p>
                  <p 
                    style={{ 
                      fontSize: '0.875rem', 
                      fontFamily: 'monospace', 
                      borderRadius: '8px', 
                      padding: '0.875rem', 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      backgroundColor: colors.bg,
                      border: `1px solid ${colors.border}`,
                      lineHeight: 1.5
                    }}
                  >
                    {item.example}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Iteration */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
        <h2
          id="iteration-technique"
          className="flex items-center gap-2"
          style={{ 
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            marginBottom: 'clamp(1.5rem, 3vh, 2rem)',
            color: colors.text
          }}
        >
          <RefreshCw className="w-6 h-6" style={{ color: colors.accentHover }} />
          The Power of Iteration
        </h2>
        <p style={{ 
          fontSize: '1rem',
          lineHeight: 1.7,
          marginBottom: '1.25rem',
          color: colors.muted
        }}>
          Great prompts rarely happen on the first try. The best results come
          from iterating—refining your prompt based on what the AI gives you.
        </p>

        <div 
          className="rounded-xl p-6"
          style={{ backgroundColor: colors.elevated, border: `1px solid ${colors.border}` }}
        >
          <h3 className="font-semibold mb-4" style={{ color: colors.text }}>Iteration Workflow</h3>
          <div className="space-y-4">
            {[
              { step: "1", title: "Start with your best attempt", desc: "Write the most complete prompt you can" },
              { step: "2", title: "Evaluate the output", desc: "What's missing? What's off-topic?" },
              { step: "3", title: "Add constraints or clarifications", desc: "\"Focus more on X\" or \"Don't include Y\"" },
              { step: "4", title: "Repeat until satisfied", desc: "Usually takes 2-4 iterations for great results" },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div 
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    backgroundColor: 'rgba(139, 92, 246, 0.15)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    color: colors.accentHover,
                  }}
                >
                  {item.step}
                </div>
                <div>
                  <p className="font-medium" style={{ color: colors.text }}>{item.title}</p>
                  <p className="text-sm" style={{ color: colors.muted }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Starter Prompts */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
        <h2
          id="starter-prompts"
          style={{ 
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            marginBottom: 'clamp(1.5rem, 3vh, 2rem)',
            color: colors.text
          }}
        >
          Starter Prompts
        </h2>
        <p style={{ 
          fontSize: '1.0625rem',
          lineHeight: 1.7,
          marginBottom: '2rem',
          color: colors.muted,
          fontWeight: 500
        }}>
          Here are some templates to get you started. Replace the bracketed
          sections with your specific details.
        </p>

        <div className="grid gap-4">
          {starterPrompts.map((prompt) => (
            <PromptCard
              key={prompt.title}
              title={prompt.title}
              prompt={prompt.prompt}
              category={prompt.category}
            />
          ))}
        </div>

        <div className="mt-6">
          <Link href="/docs/chatgpt-prompts-for-academic-writing" className="inline-flex items-center gap-2 font-medium" style={{ color: colors.accentHover }}>
            See all 50+ academic prompts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Key Takeaways */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
        <h2
          id="key-takeaways"
          style={{ 
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            marginBottom: 'clamp(1.5rem, 3vh, 2rem)',
            color: colors.text
          }}
        >
          Key Takeaways
        </h2>
        <div 
          className="rounded-xl p-6"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
          }}
        >
          <ul className="space-y-3">
            {[
              "Be specific—vague prompts get vague results",
              "Use the CRISPE framework for comprehensive prompts",
              "Iterate and refine based on the output",
              "Include examples of what good output looks like",
              "Set constraints to keep responses focused",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: colors.accentHover }} />
                <span style={{ color: colors.textSecondary }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related Content */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
        <h2 id="next-steps" style={{ 
          fontFamily: 'var(--font-literata), Georgia, serif',
          fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
          fontWeight: 300,
          letterSpacing: '-0.01em',
          marginBottom: 'clamp(1.5rem, 3vh, 2rem)',
          color: colors.text
        }}>
          Next Steps
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          <Link
            href="/docs/chatgpt-prompts-for-academic-writing"
            onMouseEnter={() => setHoveredRelated('prompts')}
            onMouseLeave={() => setHoveredRelated(null)}
            style={{
              textDecoration: 'none',
              display: 'block'
            }}
          >
            <div style={{
              background: hoveredRelated === 'prompts'
                ? 'linear-gradient(135deg, rgba(39, 39, 42, 0.95) 0%, rgba(31, 31, 35, 0.8) 100%)'
                : 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
              border: `1px solid ${hoveredRelated === 'prompts' ? 'rgba(159, 122, 234, 0.3)' : colors.border}`,
              borderRadius: '16px',
              padding: '1.75rem',
              transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              backdropFilter: 'blur(10px)',
              boxShadow: hoveredRelated === 'prompts'
                ? '0 12px 32px rgba(159, 122, 234, 0.2)'
                : '0 4px 16px rgba(0, 0, 0, 0.15)',
              transform: hoveredRelated === 'prompts' ? 'translateY(-4px)' : 'translateY(0)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column' as const
            }}>
              <h3 style={{ 
                fontFamily: 'var(--font-literata)',
                fontSize: '1.25rem',
                fontWeight: 400,
                marginBottom: '0.75rem',
                color: colors.text
              }}>
                50+ Academic Prompts
              </h3>
              <p style={{ 
                fontSize: '0.9375rem', 
                color: colors.muted,
                lineHeight: 1.6,
                marginBottom: '1rem',
                flexGrow: 1
              }}>
                Ready-to-use prompts for every type of assignment
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: colors.accent,
                fontSize: '0.875rem',
                fontWeight: 500
              }}>
                View prompts
                <ArrowRight style={{
                  width: '16px',
                  height: '16px',
                  transform: hoveredRelated === 'prompts' ? 'translateX(4px)' : 'translateX(0)',
                  transition: 'transform 0.2s ease'
                }} />
              </div>
            </div>
          </Link>
          <Link
            href="/docs/agent-workflows"
            onMouseEnter={() => setHoveredRelated('workflows')}
            onMouseLeave={() => setHoveredRelated(null)}
            style={{
              textDecoration: 'none',
              display: 'block'
            }}
          >
            <div style={{
              background: hoveredRelated === 'workflows'
                ? 'linear-gradient(135deg, rgba(39, 39, 42, 0.95) 0%, rgba(31, 31, 35, 0.8) 100%)'
                : 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
              border: `1px solid ${hoveredRelated === 'workflows' ? 'rgba(159, 122, 234, 0.3)' : colors.border}`,
              borderRadius: '16px',
              padding: '1.75rem',
              transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              backdropFilter: 'blur(10px)',
              boxShadow: hoveredRelated === 'workflows'
                ? '0 12px 32px rgba(159, 122, 234, 0.2)'
                : '0 4px 16px rgba(0, 0, 0, 0.15)',
              transform: hoveredRelated === 'workflows' ? 'translateY(-4px)' : 'translateY(0)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column' as const
            }}>
              <h3 style={{ 
                fontFamily: 'var(--font-literata)',
                fontSize: '1.25rem',
                fontWeight: 400,
                marginBottom: '0.75rem',
                color: colors.text
              }}>
                Build Agent Workflows
              </h3>
              <p style={{ 
                fontSize: '0.9375rem', 
                color: colors.muted,
                lineHeight: 1.6,
                marginBottom: '1rem',
                flexGrow: 1
              }}>
                Automate your research with Esy&apos;s no-code tools
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: colors.accent,
                fontSize: '0.875rem',
                fontWeight: 500
              }}>
                Learn workflows
                <ArrowRight style={{
                  width: '16px',
                  height: '16px',
                  transform: hoveredRelated === 'workflows' ? 'translateX(4px)' : 'translateX(0)',
                  transition: 'transform 0.2s ease'
                }} />
              </div>
            </div>
          </Link>
        </div>
      </section>

      <DocsPageNav />
    </article>
  );
}

