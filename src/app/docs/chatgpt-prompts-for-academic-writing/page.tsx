import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";
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
  borderSubtle: 'rgba(63, 63, 70, 0.2)',
  accent: '#9f7aea',
  accentHover: '#8b5cf6',
  accentLight: '#c4b5fd',
};

export const metadata: Metadata = {
  title: "50+ ChatGPT Prompts for Academic Writing (2025)",
  description:
    "Copy-paste ChatGPT prompts for essays, research papers, thesis writing, literature reviews, and more. Tested prompts that work for students in 2025.",
  keywords:
    "ChatGPT prompts, academic writing prompts, essay prompts, research paper prompts, thesis prompts, student AI prompts, ChatGPT for students",
  openGraph: {
    title: "50+ ChatGPT Prompts for Academic Writing | Esy Docs",
    description:
      "Tested, ready-to-use ChatGPT prompts for every type of academic assignment.",
    url: "https://esy.com/docs/chatgpt-prompts-for-academic-writing",
  },
};

const promptCategories = [
  {
    id: "thesis-statements",
    title: "Thesis Statements & Arguments",
    description: "Develop strong, arguable thesis statements",
    prompts: [
      {
        title: "Thesis Generator",
        prompt: "I'm writing a [WORD COUNT] word essay for my [CLASS] on [TOPIC]. Generate 3 unique thesis statements that are: (1) arguable, not just factual, (2) specific enough to be proven in the word limit, (3) interesting to my target reader. For each thesis, explain what evidence would support it.",
      },
      {
        title: "Thesis Strengthener",
        prompt: "My current thesis is: '[YOUR THESIS]'. This is for a [CLASS] essay. Identify weaknesses in this thesis and suggest 3 ways to make it more specific, arguable, or impactful. Show me the improved versions.",
      },
      {
        title: "Argument Mapper",
        prompt: "My thesis is: '[YOUR THESIS]'. Create a logical map showing: (1) My main claim, (2) 3-4 supporting arguments, (3) The evidence each argument needs, (4) Potential counterarguments, (5) How to address those counterarguments.",
      },
    ],
  },
  {
    id: "research-analysis",
    title: "Research & Analysis",
    description: "Find sources and analyze evidence",
    prompts: [
      {
        title: "Source Finder Strategy",
        prompt: "I'm researching [TOPIC] for a [CLASS] assignment. Suggest: (1) 5 types of primary sources I should look for, (2) 5 types of secondary sources, (3) Specific databases or archives where I might find them, (4) Keywords to use in academic search engines like Google Scholar or JSTOR.",
      },
      {
        title: "Source Analyzer",
        prompt: "I found this source for my essay: [PASTE CITATION OR SUMMARY]. Analyze it for: (1) Credibility of the author/publication, (2) Potential biases, (3) How recent/relevant it is, (4) Key arguments I can cite, (5) How it supports or challenges my thesis.",
      },
      {
        title: "Evidence Integrator",
        prompt: "I want to use this quote in my essay: '[PASTE QUOTE]'. My argument is [YOUR ARGUMENT]. Show me 3 different ways to introduce this quote, integrate it into my paragraph, and explain its significance in my own words.",
      },
    ],
  },
  {
    id: "essay-structure",
    title: "Essay Structure & Outlines",
    description: "Organize your ideas effectively",
    prompts: [
      {
        title: "Complete Outline Builder",
        prompt: "Create a detailed outline for my [WORD COUNT] word essay. Topic: [TOPIC]. Thesis: [THESIS]. Include: (1) Introduction with 3 hook options, (2) 4-5 body paragraphs with topic sentences and evidence placeholders, (3) Transitions between sections, (4) Conclusion that extends the argument. Mark where I need citations.",
      },
      {
        title: "Paragraph Structure Coach",
        prompt: "I'm writing a body paragraph about [PARAGRAPH TOPIC] to support my thesis: [THESIS]. Create a paragraph structure using: (1) Topic sentence that advances my argument, (2) Context/setup for evidence, (3) Where to place my quote or evidence, (4) Analysis explaining the evidence's significance, (5) Transition to next paragraph.",
      },
      {
        title: "Introduction Crafter",
        prompt: "Write 3 different openings for my essay on [TOPIC] with thesis [THESIS]. Make them: (1) A surprising statistic or fact opening, (2) A narrative/anecdote opening, (3) A provocative question opening. Each should be 4-5 sentences and lead naturally to my thesis.",
      },
    ],
  },
  {
    id: "writing-improvement",
    title: "Writing Improvement",
    description: "Polish your prose and fix common issues",
    prompts: [
      {
        title: "Clarity Editor",
        prompt: "Edit this paragraph for clarity and concision. Keep my voice but: (1) Eliminate wordiness, (2) Strengthen weak verbs, (3) Break up run-on sentences, (4) Remove redundancy. Show me the edited version with brief notes on what you changed: [PASTE PARAGRAPH]",
      },
      {
        title: "Academic Tone Adjuster",
        prompt: "Rewrite this paragraph to sound more academically appropriate for a college-level essay, while keeping my main points intact. Explain what makes the new version more scholarly: [PASTE PARAGRAPH]",
      },
      {
        title: "Sentence Variety Coach",
        prompt: "Analyze this paragraph for sentence variety: [PASTE PARAGRAPH]. Then rewrite it with: (1) Mix of short and long sentences, (2) Different sentence openings, (3) Various sentence structures. Explain your changes.",
      },
    ],
  },
  {
    id: "specific-assignments",
    title: "Specific Assignment Types",
    description: "Prompts tailored to common assignment formats",
    prompts: [
      {
        title: "Comparative Essay Setup",
        prompt: "I'm writing a comparative essay on [SUBJECT A] vs [SUBJECT B] for my [CLASS]. Help me: (1) Identify 4-5 meaningful points of comparison, (2) Decide between point-by-point vs block structure, (3) Develop a thesis that goes beyond 'they're similar and different', (4) Create an outline.",
      },
      {
        title: "Literary Analysis Framework",
        prompt: "I'm analyzing [LITERARY WORK] by [AUTHOR] focusing on [THEME/TECHNIQUE]. Help me: (1) Develop an arguable thesis about how the author uses this element, (2) Identify 3-4 key passages to analyze, (3) Suggest literary terms and concepts to incorporate, (4) Create a paragraph-by-paragraph outline.",
      },
      {
        title: "Research Paper Proposal",
        prompt: "Help me write a research proposal for my [CLASS]. Topic: [TOPIC]. Include: (1) Research question, (2) Brief literature review of the debate, (3) My tentative thesis, (4) Methodology (what sources I'll use), (5) Significance—why this matters.",
      },
    ],
  },
  {
    id: "revision-feedback",
    title: "Revision & Feedback",
    description: "Improve your drafts systematically",
    prompts: [
      {
        title: "Draft Reviewer",
        prompt: "Review this essay draft as a college writing tutor. My assignment was [DESCRIBE ASSIGNMENT]. For my draft, assess: (1) Thesis clarity and arguability, (2) Evidence quality and integration, (3) Organization and flow, (4) Biggest weakness to address, (5) Specific revision suggestions. Be constructively critical: [PASTE DRAFT]",
      },
      {
        title: "Argument Strength Checker",
        prompt: "Read my essay and evaluate each body paragraph for argument strength: [PASTE ESSAY]. For each paragraph, rate 1-5 on: (1) Clear topic sentence, (2) Relevant evidence, (3) Sufficient analysis, (4) Connection to thesis. Suggest specific improvements for paragraphs rated below 4.",
      },
    ],
  },
];

export default function ChatGPTPromptsPage() {
  const totalPrompts = promptCategories.reduce((acc, cat) => acc + cat.prompts.length, 0);

  return (
    <article className="max-w-4xl">
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
          <BookOpen className="w-4 h-4" />
          Prompt Library
        </div>

        <h1 
          className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight"
          style={{ fontFamily: 'var(--font-literata), Georgia, serif', color: colors.text }}
        >
          {totalPrompts}+ ChatGPT Prompts for Academic Writing
        </h1>

        <p className="text-lg mb-6" style={{ color: colors.muted }}>
          Copy-paste prompts that actually work. Tested and refined for essays,
          research papers, thesis statements, and every type of academic
          assignment. Updated for 2025.
        </p>

        <div className="flex flex-wrap gap-4 text-sm" style={{ color: colors.subtle }}>
          <span>📝 {totalPrompts} prompts</span>
          <span>•</span>
          <span>6 categories</span>
          <span>•</span>
          <span>Updated November 2025</span>
        </div>
      </div>

      <DocsCallout type="tip" title="Pro Tip">
        Replace the [BRACKETED TEXT] with your specific details. The more
        specific you are, the better the AI response. For even better results,{" "}
        <Link href="https://app.esy.com" className="underline" style={{ color: colors.accentHover }}>
          use Esy&apos;s agentic workflows
        </Link>{" "}
        which can reference your own documents.
      </DocsCallout>

      {/* Quick Navigation */}
      <nav 
        className="mb-12 p-6 rounded-2xl"
        style={{ backgroundColor: colors.elevated, border: `1px solid ${colors.border}` }}
      >
        <h2 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
          Jump to Category
        </h2>
        <div className="flex flex-wrap gap-2">
          {promptCategories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="px-3 py-1.5 rounded-lg text-sm transition-all hover:bg-zinc-700/50"
              style={{
                backgroundColor: colors.surface,
                border: `1px solid ${colors.borderSubtle}`,
                color: colors.textSecondary,
              }}
            >
              {category.title} ({category.prompts.length})
            </a>
          ))}
        </div>
      </nav>

      {/* Prompt Categories */}
      {promptCategories.map((category) => (
        <section key={category.id} className="mb-16">
          <div id={category.id} className="scroll-mt-24 mb-6">
            <h2 
              className="text-2xl font-bold mb-2"
              style={{ color: colors.text, fontFamily: 'var(--font-literata), Georgia, serif' }}
            >
              {category.title}
            </h2>
            <p style={{ color: colors.muted }}>{category.description}</p>
          </div>

          <div className="grid gap-4">
            {category.prompts.map((prompt) => (
              <PromptCard key={prompt.title} title={prompt.title} prompt={prompt.prompt} />
            ))}
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="mb-12">
        <div 
          className="rounded-2xl p-8 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
          }}
        >
          <Sparkles className="w-10 h-10 mx-auto mb-4" style={{ color: colors.accentHover }} />
          <h2 
            className="text-2xl font-bold mb-3"
            style={{ color: colors.text, fontFamily: 'var(--font-literata), Georgia, serif' }}
          >
            Want Prompts That Know Your Documents?
          </h2>
          <p className="mb-6 max-w-lg mx-auto" style={{ color: colors.muted }}>
            Esy&apos;s agentic workflows can reference your uploaded PDFs, notes,
            and research—giving you AI responses grounded in your actual sources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://app.esy.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)',
              }}
            >
              Try Esy Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/prompt-library"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-xl transition-colors hover:bg-zinc-700/50"
              style={{ backgroundColor: colors.elevated, color: colors.text, border: `1px solid ${colors.border}` }}
            >
              Browse Full Prompt Library
            </Link>
          </div>
        </div>
      </section>

      {/* Related Content */}
      <section className="mb-12">
        <h2 
          className="text-2xl font-bold mb-4"
          style={{ color: colors.text, fontFamily: 'var(--font-literata), Georgia, serif' }}
        >
          Related Guides
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/docs/prompt-engineering"
            className="group p-4 rounded-xl transition-all hover:bg-zinc-800/50"
            style={{ backgroundColor: colors.elevated, border: `1px solid ${colors.border}` }}
          >
            <h3 className="font-semibold mb-1" style={{ color: colors.text }}>Prompt Engineering Guide →</h3>
            <p className="text-sm" style={{ color: colors.muted }}>Learn the CRISPE framework for better prompts</p>
          </Link>
          <Link
            href="/docs/how-to-write-better-essays-with-ai"
            className="group p-4 rounded-xl transition-all hover:bg-zinc-800/50"
            style={{ backgroundColor: colors.elevated, border: `1px solid ${colors.border}` }}
          >
            <h3 className="font-semibold mb-1" style={{ color: colors.text }}>Write Better Essays with AI →</h3>
            <p className="text-sm" style={{ color: colors.muted }}>Complete guide to AI-assisted essay writing</p>
          </Link>
        </div>
      </section>

      <DocsPageNav />
    </article>
  );
}
