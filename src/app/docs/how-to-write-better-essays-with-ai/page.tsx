import { Metadata } from "next";
import Link from "next/link";
import { elevatedDarkTheme } from "@/lib/theme";
import {
  PenLine,
  Lightbulb,
  Search,
  FileEdit,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { DocsPageNav, DocsCallout } from "@/components/docs";

export const metadata: Metadata = {
  title: "How to Write Better Essays with AI (Complete Guide)",
  description:
    "Learn how to use AI tools like ChatGPT and Esy to write better essays faster—without compromising academic integrity. Step-by-step guide for students.",
  keywords:
    "write essays with AI, AI essay writing, ChatGPT essays, AI writing assistant, essay writing tips, academic AI tools",
  openGraph: {
    title: "How to Write Better Essays with AI | Esy Docs",
    description:
      "The complete guide to ethically using AI tools to improve your essay writing process.",
    url: "https://esy.com/docs/how-to-write-better-essays-with-ai",
  },
};

const essayPhases = [
  {
    phase: "Brainstorming",
    icon: <Lightbulb className="w-5 h-5" />,
    aiRole: "Idea generator, not idea owner",
    tasks: [
      "Explore different angles on your topic",
      "Generate research questions",
      "Find connections you hadn't considered",
      "Narrow broad topics to arguable claims",
    ],
    prompt: "I'm writing about [TOPIC] for my [CLASS]. I don't know my angle yet. Ask me 5 questions about what interests me in this topic, then suggest 3 specific thesis directions based on my answers.",
  },
  {
    phase: "Research",
    icon: <Search className="w-5 h-5" />,
    aiRole: "Research assistant, not source",
    tasks: [
      "Identify search terms and databases",
      "Summarize complex sources",
      "Find gaps in your research",
      "Organize sources by theme",
    ],
    prompt: "I'm researching [TOPIC]. I've found sources about [LIST TOPICS]. Help me: (1) See what major perspectives I'm missing, (2) Organize these into themes, (3) Identify which sources might contradict each other.",
  },
  {
    phase: "Outlining",
    icon: <FileEdit className="w-5 h-5" />,
    aiRole: "Structural advisor",
    tasks: [
      "Create logical flow between arguments",
      "Develop topic sentences",
      "Plan transitions",
      "Ensure thesis is supported throughout",
    ],
    prompt: "My thesis is [THESIS]. My main evidence points are [LIST POINTS]. Create an outline that builds to my strongest argument, suggests transitions between sections, and identifies where I need more evidence.",
  },
  {
    phase: "Drafting",
    icon: <PenLine className="w-5 h-5" />,
    aiRole: "Writing coach, not ghostwriter",
    tasks: [
      "Get past writer's block",
      "See different ways to phrase ideas",
      "Integrate quotes smoothly",
      "Develop your analysis",
    ],
    prompt: "I wrote this paragraph but it feels weak: [PARAGRAPH]. My argument is [ARGUMENT]. Show me 2 ways to strengthen the analysis and connect it more clearly to my thesis—but keep my voice.",
  },
  {
    phase: "Revising",
    icon: <CheckCircle className="w-5 h-5" />,
    aiRole: "Critical reader",
    tasks: [
      "Identify unclear passages",
      "Find logical gaps",
      "Strengthen weak arguments",
      "Improve sentence variety",
    ],
    prompt: "Read my essay as a critical professor. Identify: (1) The weakest paragraph and why, (2) Any logical gaps in my argument, (3) Sentences that are unclear, (4) My strongest point that I should emphasize more. [PASTE ESSAY]",
  },
];

const dosAndDonts = {
  dos: [
    "Use AI to brainstorm and explore ideas",
    "Have AI explain concepts you don't understand",
    "Use AI to get feedback on your drafts",
    "Ask AI to suggest how to strengthen your arguments",
    "Use AI to help organize your research",
    "Let AI help you understand source material",
    "Use AI to improve clarity and fix grammar",
  ],
  donts: [
    "Submit AI-generated text as your own writing",
    "Use AI to write your thesis or conclusion",
    "Let AI replace your own critical thinking",
    "Copy AI output without verification",
    "Use AI-suggested sources without checking they exist",
    "Rely on AI for facts (it can hallucinate)",
    "Skip reading sources because AI summarized them",
  ],
};

export default function WriteBetterEssaysPage() {
  return (
    <article>
      {/* Header */}
      <div className="mb-10">
        <div 
          className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full text-sm font-medium"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.1) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            color: '#c4b5fd',
          }}
        >
          <PenLine className="w-4 h-4" />
          Essay Writing
        </div>

        <h1 
          className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight"
          style={{ 
            fontFamily: 'var(--font-literata), Georgia, serif',
            color: elevatedDarkTheme.text,
          }}
        >
          How to Write Better Essays with AI
        </h1>

        <p 
          className="text-lg mb-6"
          style={{ color: elevatedDarkTheme.muted }}
        >
          AI tools can transform your essay writing—making research faster,
          arguments stronger, and prose clearer. Here&apos;s how to use them
          effectively while maintaining academic integrity.
        </p>

        <div 
          className="flex flex-wrap gap-4 text-sm"
          style={{ color: elevatedDarkTheme.subtle }}
        >
          <span>📚 12 min read</span>
          <span>•</span>
          <span>Updated November 2025</span>
        </div>
      </div>

      <DocsCallout type="warning" title="Important">
        AI is a tool, not a replacement for your thinking. Always check your
        institution&apos;s AI policies. When in doubt, disclose your AI use
        to your professor.
      </DocsCallout>

      {/* Why Use AI */}
      <section className="mb-12">
        <h2
          id="why-use-ai-for-essays"
          className="text-2xl font-bold mb-4"
          style={{ 
            color: elevatedDarkTheme.text,
            fontFamily: 'var(--font-literata), Georgia, serif',
          }}
        >
          Why Use AI for Essay Writing?
        </h2>
        <p className="mb-4" style={{ color: elevatedDarkTheme.textSecondary }}>
          The students getting the best results with AI aren&apos;t using it
          to write their essays. They&apos;re using it to think better, research
          smarter, and revise more effectively. AI amplifies your effort—but
          you still need to put in the work.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          {[
            { title: "Speed Up Research", description: "Summarize papers, find related sources, identify key debates" },
            { title: "Strengthen Arguments", description: "Find counterarguments, develop analysis, test your logic" },
            { title: "Polish Your Prose", description: "Improve clarity, fix grammar, vary sentence structure" },
          ].map((item) => (
            <div
              key={item.title}
              className="p-4 rounded-xl"
              style={{
                backgroundColor: elevatedDarkTheme.elevated,
                border: `1px solid ${elevatedDarkTheme.border}`,
              }}
            >
              <h3 className="font-semibold mb-2" style={{ color: elevatedDarkTheme.text }}>
                {item.title}
              </h3>
              <p className="text-sm" style={{ color: elevatedDarkTheme.muted }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Essay Writing Phases */}
      <section className="mb-12">
        <h2
          id="ai-in-each-phase"
          className="text-2xl font-bold mb-4"
          style={{ 
            color: elevatedDarkTheme.text,
            fontFamily: 'var(--font-literata), Georgia, serif',
          }}
        >
          How to Use AI in Each Phase
        </h2>
        <p className="mb-6" style={{ color: elevatedDarkTheme.textSecondary }}>
          Different phases of essay writing benefit from AI in different
          ways. Here&apos;s what works at each stage.
        </p>

        <div className="space-y-6">
          {essayPhases.map((phase, index) => (
            <div
              key={phase.phase}
              className="rounded-xl overflow-hidden"
              style={{
                backgroundColor: elevatedDarkTheme.elevated,
                border: `1px solid ${elevatedDarkTheme.border}`,
              }}
            >
              <div 
                className="p-4 flex items-center gap-3"
                style={{ borderBottom: `1px solid ${elevatedDarkTheme.border}` }}
              >
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                  style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' }}
                >
                  {phase.icon}
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: elevatedDarkTheme.text }}>
                    Phase {index + 1}: {phase.phase}
                  </h3>
                  <p className="text-sm" style={{ color: elevatedDarkTheme.muted }}>
                    AI role: {phase.aiRole}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2" style={{ color: elevatedDarkTheme.textSecondary }}>
                    What AI can help with:
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {phase.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-2 text-sm" style={{ color: elevatedDarkTheme.muted }}>
                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#8b5cf6' }} />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2" style={{ color: elevatedDarkTheme.textSecondary }}>
                    Try this prompt:
                  </h4>
                  <p 
                    className="text-sm font-mono rounded-lg p-3"
                    style={{
                      color: elevatedDarkTheme.muted,
                      backgroundColor: elevatedDarkTheme.bg,
                    }}
                  >
                    {phase.prompt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Do's and Don'ts */}
      <section className="mb-12">
        <h2
          id="dos-and-donts"
          className="text-2xl font-bold mb-4"
          style={{ 
            color: elevatedDarkTheme.text,
            fontFamily: 'var(--font-literata), Georgia, serif',
          }}
        >
          Do&apos;s and Don&apos;ts
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div 
            className="rounded-xl p-6"
            style={{
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
            }}
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color: '#22c55e' }}>
              <CheckCircle className="w-5 h-5" />
              Do This
            </h3>
            <ul className="space-y-3">
              {dosAndDonts.dos.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: elevatedDarkTheme.textSecondary }}>
                  <span style={{ color: '#22c55e' }} className="mt-1">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div 
            className="rounded-xl p-6"
            style={{
              backgroundColor: 'rgba(248, 113, 113, 0.1)',
              border: '1px solid rgba(248, 113, 113, 0.2)',
            }}
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color: '#f87171' }}>
              <AlertTriangle className="w-5 h-5" />
              Avoid This
            </h3>
            <ul className="space-y-3">
              {dosAndDonts.donts.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: elevatedDarkTheme.textSecondary }}>
                  <span style={{ color: '#f87171' }} className="mt-1">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Esy Advantage */}
      <section className="mb-12">
        <h2
          id="esy-advantage"
          className="text-2xl font-bold mb-4"
          style={{ 
            color: elevatedDarkTheme.text,
            fontFamily: 'var(--font-literata), Georgia, serif',
          }}
        >
          The Esy Advantage
        </h2>
        <p className="mb-6" style={{ color: elevatedDarkTheme.textSecondary }}>
          While ChatGPT gives you generic responses, Esy&apos;s agentic
          workflows can reference your actual documents—PDFs, notes, research
          papers—giving you AI assistance grounded in your real sources.
        </p>

        <div 
          className="rounded-xl p-6"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
          }}
        >
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: "📚 Document Reference", desc: "Upload your sources and let Esy find relevant quotes and evidence" },
              { title: "🔗 Prompt Chaining", desc: "Build workflows that research, outline, and draft step-by-step" },
              { title: "✨ Citation-Aware", desc: "AI responses cite your actual sources, not hallucinated ones" },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-semibold mb-2" style={{ color: elevatedDarkTheme.text }}>
                  {item.title}
                </h3>
                <p className="text-sm" style={{ color: elevatedDarkTheme.muted }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Content */}
      <section className="mb-12">
        <h2 
          id="next-steps" 
          className="text-2xl font-bold mb-4"
          style={{ 
            color: elevatedDarkTheme.text,
            fontFamily: 'var(--font-literata), Georgia, serif',
          }}
        >
          Continue Learning
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { href: "/docs/prompt-engineering", title: "Prompt Engineering Guide →", desc: "Master the CRISPE framework for better prompts" },
            { href: "/docs/chatgpt-prompts-for-academic-writing", title: "50+ Academic Prompts →", desc: "Ready-to-use prompts for every assignment type" },
            { href: "/docs/agent-workflows", title: "Build Agent Workflows →", desc: "Automate research with Esy's no-code tools" },
            { href: "/prompt-library", title: "Prompt Library →", desc: "Browse hundreds of prompts in the app" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group p-4 rounded-xl transition-all"
              style={{
                backgroundColor: elevatedDarkTheme.elevated,
                border: `1px solid ${elevatedDarkTheme.border}`,
              }}
            >
              <h3 className="font-semibold mb-1 transition-colors" style={{ color: elevatedDarkTheme.text }}>
                {item.title}
              </h3>
              <p className="text-sm" style={{ color: elevatedDarkTheme.muted }}>
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <DocsPageNav />
    </article>
  );
}
