import { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  Target,
  RefreshCw,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { DocsPageNav, DocsCallout, PromptCard } from "@/components/docs";

// Design system colors from DESIGN_SYSTEM.md
const colors = {
  bg: '#18181b',
  elevated: '#27272a',
  surface: '#1f1f23',
  text: '#fafafa',
  textSecondary: '#e4e4e7',
  muted: '#a1a1aa',
  subtle: '#71717a',
  border: 'rgba(63, 63, 70, 0.4)',
  accent: '#9f7aea',
  accentHover: '#8b5cf6',
  accentLight: '#c4b5fd',
};

export const metadata: Metadata = {
  title: "Prompt Engineering for Students",
  description:
    "Master prompt engineering for academic writing. Learn the CRISPE framework, iteration techniques, and get 20+ proven prompts for essays, research papers, and more.",
  keywords:
    "prompt engineering, student prompts, academic AI, essay prompts, ChatGPT for students, AI writing tips",
  openGraph: {
    title: "Prompt Engineering for Students | Esy Docs",
    description:
      "Master the art of crafting AI prompts that deliver A-grade essays and research papers.",
    url: "https://esy.com/docs/prompt-engineering",
  },
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

export default function PromptEngineeringPage() {
  return (
    <article>
      {/* Header */}
      <div className="mb-10">
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
          className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight"
          style={{ fontFamily: 'var(--font-literata), Georgia, serif', color: colors.text }}
        >
          Prompt Engineering for Students: The Complete Guide
        </h1>

        <p className="text-lg mb-6" style={{ color: colors.muted }}>
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
      <section className="mb-12">
        <h2
          id="what-is-prompt-engineering"
          className="text-2xl font-bold mb-4"
          style={{ color: colors.text, fontFamily: 'var(--font-literata), Georgia, serif' }}
        >
          What is Prompt Engineering?
        </h2>
        <p className="mb-4" style={{ color: colors.textSecondary }}>
          Prompt engineering is the skill of crafting instructions that help
          AI tools like ChatGPT, Claude, or Esy understand exactly what you
          need. Think of it as learning to communicate with a brilliant but
          literal-minded research assistant.
        </p>
        <p className="mb-4" style={{ color: colors.textSecondary }}>
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
      <section className="mb-12">
        <h2
          id="crispe-framework"
          className="text-2xl font-bold mb-4"
          style={{ color: colors.text, fontFamily: 'var(--font-literata), Georgia, serif' }}
        >
          The CRISPE Framework
        </h2>
        <p className="mb-6" style={{ color: colors.textSecondary }}>
          CRISPE is a simple framework for writing effective prompts. It
          stands for Context, Role, Instructions, Style, Parameters, and
          Examples. Not every prompt needs all six elements, but including
          more usually means better results.
        </p>

        <div className="space-y-4">
          {crispeFramework.map((item) => (
            <div
              key={item.letter}
              className="rounded-xl p-4"
              style={{ backgroundColor: colors.elevated, border: `1px solid ${colors.border}` }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' }}
                >
                  {item.letter}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1" style={{ color: colors.text }}>
                    {item.word}
                  </h3>
                  <p className="text-sm mb-2" style={{ color: colors.muted }}>
                    {item.description}
                  </p>
                  <p 
                    className="text-sm font-mono rounded-lg p-3"
                    style={{ color: colors.subtle, backgroundColor: colors.bg }}
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
      <section className="mb-12">
        <h2
          id="iteration-technique"
          className="text-2xl font-bold mb-4 flex items-center gap-2"
          style={{ color: colors.text, fontFamily: 'var(--font-literata), Georgia, serif' }}
        >
          <RefreshCw className="w-6 h-6" style={{ color: colors.accentHover }} />
          The Power of Iteration
        </h2>
        <p className="mb-4" style={{ color: colors.textSecondary }}>
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
      <section className="mb-12">
        <h2
          id="starter-prompts"
          className="text-2xl font-bold mb-4"
          style={{ color: colors.text, fontFamily: 'var(--font-literata), Georgia, serif' }}
        >
          Starter Prompts
        </h2>
        <p className="mb-6" style={{ color: colors.textSecondary }}>
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
      <section className="mb-12">
        <h2
          id="key-takeaways"
          className="text-2xl font-bold mb-4"
          style={{ color: colors.text, fontFamily: 'var(--font-literata), Georgia, serif' }}
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
      <section className="mb-12">
        <h2 id="next-steps" className="text-2xl font-bold mb-4" style={{ color: colors.text, fontFamily: 'var(--font-literata), Georgia, serif' }}>
          Next Steps
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/docs/chatgpt-prompts-for-academic-writing"
            className="group p-4 rounded-xl transition-all hover:bg-zinc-800/50"
            style={{ backgroundColor: colors.elevated, border: `1px solid ${colors.border}` }}
          >
            <h3 className="font-semibold mb-1" style={{ color: colors.text }}>50+ Academic Prompts →</h3>
            <p className="text-sm" style={{ color: colors.muted }}>Ready-to-use prompts for every type of assignment</p>
          </Link>
          <Link
            href="/docs/agent-workflows"
            className="group p-4 rounded-xl transition-all hover:bg-zinc-800/50"
            style={{ backgroundColor: colors.elevated, border: `1px solid ${colors.border}` }}
          >
            <h3 className="font-semibold mb-1" style={{ color: colors.text }}>Build Agent Workflows →</h3>
            <p className="text-sm" style={{ color: colors.muted }}>Automate your research with Esy&apos;s no-code tools</p>
          </Link>
        </div>
      </section>

      <DocsPageNav />
    </article>
  );
}
