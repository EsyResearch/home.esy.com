import { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  BookOpen,
  PenLine,
  Workflow,
  ArrowRight,
  Zap,
  Users,
  FileText,
  Search,
  Compass,
  Brain,
} from "lucide-react";
import { FeatureCard, DocsPageNav, WorkflowStep } from "@/components/docs";

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
  title: "Documentation",
  description:
    "Master research with Esy's agentic workflows. Learn prompt engineering, build no-code research automations, and write better essays with AI.",
  keywords:
    "Esy documentation, AI research, prompt engineering, agentic workflows, essay writing, academic AI",
  openGraph: {
    title: "Master Research with Esy's Agentic Workflows | Esy Docs",
    description:
      "Learn prompt engineering, build no-code research automations, and write smarter essays with AI.",
    url: "https://esy.com/docs",
  },
};

const featuredGuides = [
  {
    title: "Prompt Engineering Guide",
    description: "Master the art of crafting effective AI prompts for academic writing and research.",
    href: "/docs/prompt-engineering",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    title: "50+ ChatGPT Prompts for Academic Writing",
    description: "Copy-paste prompts for essays, research papers, thesis writing, and more.",
    href: "/docs/chatgpt-prompts-for-academic-writing",
    icon: <BookOpen className="w-6 h-6" />,
    isNew: true,
  },
  {
    title: "Write Better Essays with AI",
    description: "Transform your essay writing process with AI-powered research and drafting.",
    href: "/docs/how-to-write-better-essays-with-ai",
    icon: <PenLine className="w-6 h-6" />,
  },
  {
    title: "Agent Workflows in Esy",
    description: "Build no-code research automations that write essays for you.",
    href: "/docs/agent-workflows",
    icon: <Workflow className="w-6 h-6" />,
    isNew: true,
  },
];

const quickStats = [
  { value: "50+", label: "Ready-to-use prompts", icon: <FileText className="w-5 h-5" /> },
  { value: "10k+", label: "Students using Esy", icon: <Users className="w-5 h-5" /> },
  { value: "5min", label: "Average essay start time", icon: <Zap className="w-5 h-5" /> },
];

const discoveryTracks = [
  {
    title: "Prompt Engineering Basics",
    icon: <Sparkles className="w-5 h-5" />,
    description: "CRISPE framework, iteration playbook, ready-made prompts.",
    links: [
      { label: "CRISPE Framework", href: "/docs/prompt-engineering#crispe-framework" },
      { label: "Starter Prompts", href: "/docs/prompt-engineering#starter-prompts" },
    ],
  },
  {
    title: "Build Agentic Workflows",
    icon: <Workflow className="w-5 h-5" />,
    description: "Reference your docs, chain prompts, automate research.",
    links: [
      { label: "Agent Workflows Guide", href: "/docs/agent-workflows" },
      { label: "Workflow Examples", href: "/docs/agent-workflows#real-examples" },
    ],
  },
  {
    title: "Ship Better Essays",
    icon: <PenLine className="w-5 h-5" />,
    description: "Brainstorm, draft, revise, and cite with AI assistance.",
    links: [
      { label: "Essay Playbook", href: "/docs/how-to-write-better-essays-with-ai" },
      { label: "50+ Prompts", href: "/docs/chatgpt-prompts-for-academic-writing" },
    ],
  },
];

export default function DocsHomePage() {
  return (
    <article className="space-y-16">
      {/* ===== HERO SECTION ===== */}
      <section
        className="relative overflow-hidden rounded-2xl p-8 sm:p-10"
        style={{
          background: `linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(236, 72, 153, 0.06) 100%), ${colors.elevated}`,
          border: `1px solid rgba(139, 92, 246, 0.2)`,
          boxShadow: '0 20px 60px rgba(139, 92, 246, 0.15)',
        }}
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
          }}
        />
        
        <div className="relative space-y-8">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
            style={{
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(196, 181, 253, 0.3)',
              color: colors.accentLight,
            }}
          >
            <Sparkles className="h-4 w-4" />
            Esy Documentation
          </div>

          {/* Title & Description */}
          <div className="space-y-4 max-w-3xl">
            <h1
              className="text-4xl sm:text-5xl font-bold leading-tight"
              style={{
                fontFamily: 'var(--font-literata), Georgia, serif',
                background: 'linear-gradient(135deg, #fafafa 0%, #c4b5fd 50%, #f9a8d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Master research with Esy&apos;s agentic workflows
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: colors.textSecondary }}>
              Learn how to orchestrate AI prompts, reference your documents, and build
              no-code workflows that source, synthesize, and help you write polished essays.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="https://app.esy.com"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-semibold text-white transition-all hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)',
              }}
            >
              Try Esy Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/prompt-library"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-medium transition-colors hover:bg-zinc-700/50"
              style={{
                backgroundColor: colors.surface,
                border: `1px solid ${colors.border}`,
                color: colors.text,
              }}
            >
              Browse Prompt Library
            </Link>
          </div>

          {/* Stats Row */}
          <div className="grid gap-4 sm:grid-cols-3 pt-4">
            {quickStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-4"
                style={{
                  backgroundColor: 'rgba(24, 24, 27, 0.6)',
                  border: `1px solid ${colors.borderSubtle}`,
                }}
              >
                <div
                  className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', color: colors.accentLight }}
                >
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold" style={{ color: colors.text }}>{stat.value}</p>
                <p className="text-sm" style={{ color: colors.muted }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
              <Search className="h-5 w-5" style={{ color: colors.subtle }} />
            </div>
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full rounded-xl border px-12 py-4 text-base placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              style={{
                backgroundColor: colors.bg,
                borderColor: colors.border,
                color: colors.text,
              }}
            />
            <kbd
              className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-lg px-2.5 py-1 text-xs font-medium sm:inline-flex"
              style={{
                backgroundColor: colors.surface,
                border: `1px solid ${colors.borderSubtle}`,
                color: colors.subtle,
              }}
            >
              ⌘K
            </kbd>
          </div>
        </div>
      </section>

      {/* ===== FEATURED GUIDES ===== */}
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: colors.accent }}>
            Spotlighted Resources
          </p>
          <h2
            id="featured-guides"
            className="text-2xl sm:text-3xl font-bold"
            style={{ fontFamily: 'var(--font-literata), Georgia, serif', color: colors.text }}
          >
            Featured Guides
          </h2>
          <p style={{ color: colors.muted }}>
            The fastest way to get value from Esy. Start with a playbook and expand into agentic workflows.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {featuredGuides.map((guide) => (
            <FeatureCard
              key={guide.href}
              title={guide.title}
              description={guide.description}
              href={guide.href}
              icon={guide.icon}
              isNew={guide.isNew}
            />
          ))}
        </div>
      </section>

      {/* ===== QUICK START TRACKS ===== */}
      <section className="space-y-8">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: colors.accent }}>
            Choose Your Journey
          </p>
          <h2
            id="quick-start"
            className="text-2xl sm:text-3xl font-bold"
            style={{ fontFamily: 'var(--font-literata), Georgia, serif', color: colors.text }}
          >
            Quick Start Tracks
          </h2>
          <p style={{ color: colors.muted }}>
            Follow these guided paths to go from first prompt to fully automated workflows.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Field Manual */}
          <div
            className="rounded-2xl p-6"
            style={{ backgroundColor: colors.elevated, border: `1px solid ${colors.border}` }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div
                className="h-9 w-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', color: colors.accentLight }}
              >
                <Compass className="h-5 w-5" />
              </div>
              <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: colors.subtle }}>
                Field Manual
              </p>
            </div>
            <div className="space-y-6">
              <WorkflowStep
                number={1}
                title="Describe your essay brief"
                description="Upload docs and outline deliverables so the agent knows exactly what 'done' means."
              />
              <WorkflowStep
                number={2}
                title="Let Esy gather the sources"
                description="The agent surfaces evidence, quotes, and counterpoints pulled directly from your documents."
              />
              <WorkflowStep
                number={3}
                title="Draft, revise, and cite with confidence"
                description="Work in Esy's editor to combine AI drafts with your voice while keeping citations accurate."
              />
            </div>
          </div>

          {/* Discovery Tracks */}
          <div className="grid gap-4 content-start">
            {discoveryTracks.map((track) => (
              <div
                key={track.title}
                className="rounded-xl p-5"
                style={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}` }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', color: colors.accentLight }}
                  >
                    {track.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold" style={{ color: colors.text }}>{track.title}</p>
                    <p className="text-sm mt-0.5" style={{ color: colors.muted }}>{track.description}</p>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                      {track.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="text-sm font-medium hover:underline"
                          style={{ color: colors.accent }}
                        >
                          {link.label} →
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WORKFLOW TOOLBOX ===== */}
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: colors.accent }}>
            Workflow Toolbox
          </p>
          <h2
            className="text-2xl sm:text-3xl font-bold"
            style={{ fontFamily: 'var(--font-literata), Georgia, serif', color: colors.text }}
          >
            Recommended Resources
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Prompt Blueprints",
              desc: "High-converting structures for literature reviews, argumentative essays, and more.",
              href: "/docs/chatgpt-prompts-for-academic-writing",
              icon: <Brain className="h-5 w-5" />,
            },
            {
              title: "Workflow Gallery",
              desc: "See how students chain Esy tools to run entire research cycles.",
              href: "/docs/agent-workflows#real-examples",
              icon: <Workflow className="h-5 w-5" />,
            },
            {
              title: "Writing Coach",
              desc: "AI-assisted revision techniques without losing your voice.",
              href: "/docs/how-to-write-better-essays-with-ai#ai-in-each-phase",
              icon: <PenLine className="h-5 w-5" />,
            },
          ].map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-xl p-5 transition-all hover:-translate-y-1"
              style={{ backgroundColor: colors.elevated, border: `1px solid ${colors.border}` }}
            >
              <div
                className="mb-4 h-10 w-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', color: colors.accentLight }}
              >
                {card.icon}
              </div>
              <p className="font-semibold mb-1" style={{ color: colors.text }}>{card.title}</p>
              <p className="text-sm mb-3" style={{ color: colors.muted }}>{card.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: colors.accent }}>
                Explore <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== POPULAR TOPICS ===== */}
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: colors.accent }}>
            Browse Topics
          </p>
          <h2
            id="popular-topics"
            className="text-2xl sm:text-3xl font-bold"
            style={{ fontFamily: 'var(--font-literata), Georgia, serif', color: colors.text }}
          >
            Popular Topics
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {[
            "Prompt Engineering",
            "Essay Structure",
            "Research Methods",
            "Citation Styles",
            "Thesis Writing",
            "Literature Review",
            "AI Ethics",
            "Academic Integrity",
            "Agent Workflows",
            "Citation Automation",
          ].map((topic) => (
            <Link
              key={topic}
              href="/docs/prompt-engineering"
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-700/50"
              style={{
                backgroundColor: colors.surface,
                border: `1px solid ${colors.border}`,
                color: colors.textSecondary,
              }}
            >
              {topic}
            </Link>
          ))}
        </div>
      </section>

      <DocsPageNav />
    </article>
  );
}
