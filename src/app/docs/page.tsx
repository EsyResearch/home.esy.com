import { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  BookOpen,
  PenLine,
  Workflow,
  ArrowRight,
  Search,
  FileText,
  Users,
  Zap,
} from "lucide-react";
import { FeatureCard, DocsPageNav } from "@/components/docs";

// Elevated Dark Theme from DESIGN_SYSTEM.md
const theme = {
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
    description: "Master the CRISPE framework to craft powerful AI prompts that deliver exceptional results for any academic task.",
    href: "/docs/prompt-engineering",
    icon: <Sparkles className="w-6 h-6" />,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    title: "50+ ChatGPT Prompts for Academic Writing",
    description: "Copy-paste battle-tested prompts for essays, research papers, thesis writing, and literature reviews.",
    href: "/docs/chatgpt-prompts-for-academic-writing",
    icon: <BookOpen className="w-6 h-6" />,
    isNew: true,
    gradient: "from-pink-500 to-rose-600",
  },
  {
    title: "Write Better Essays with AI",
    description: "Transform your writing process from brainstorming to final draft with AI-powered research assistance.",
    href: "/docs/how-to-write-better-essays-with-ai",
    icon: <PenLine className="w-6 h-6" />,
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    title: "Build No-Code Agent Workflows",
    description: "Automate complex research tasks with Esy's visual workflow builder—no programming required.",
    href: "/docs/agent-workflows",
    icon: <Workflow className="w-6 h-6" />,
    isNew: true,
    gradient: "from-amber-500 to-orange-600",
  },
];

const stats = [
  { value: "50+", label: "Ready-to-use prompts", icon: <FileText className="w-5 h-5" /> },
  { value: "10k+", label: "Students & researchers", icon: <Users className="w-5 h-5" /> },
  { value: "5min", label: "To build your first workflow", icon: <Zap className="w-5 h-5" /> },
];

const learningPaths = [
  {
    title: "Prompt Engineering Track",
    description: "Master AI communication",
    color: theme.accentHover,
    steps: [
      { label: "Learn CRISPE Framework", href: "/docs/prompt-engineering#crispe-framework" },
      { label: "Practice with 50+ Prompts", href: "/docs/chatgpt-prompts-for-academic-writing" },
      { label: "Apply to Essay Writing", href: "/docs/how-to-write-better-essays-with-ai" },
    ],
  },
  {
    title: "Agentic Workflows Track",
    description: "Automate your research",
    color: "#ec4899",
    steps: [
      { label: "Understand Agent Workflows", href: "/docs/agent-workflows#what-are-agent-workflows" },
      { label: "Build Your First Workflow", href: "/docs/agent-workflows#build-research-workflow" },
      { label: "Explore Real Examples", href: "/docs/agent-workflows#real-examples" },
    ],
  },
];

export default function DocsHomePage() {
  return (
    <div className="relative">
      {/* Ambient Glow Effects - Sophisticated depth */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -1 }}
      >
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            top: '-200px',
            right: '10%',
            background: `radial-gradient(circle, ${theme.accentHover}0A 0%, transparent 70%)`,
            filter: 'blur(100px)',
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            bottom: '20%',
            left: '5%',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.06) 0%, transparent 70%)',
            filter: 'blur(80px)',
            opacity: 0.4,
          }}
        />
      </div>

      <article className="space-y-24">
        {/* ===== HERO SECTION - Transformative & Minimal ===== */}
        <section className="relative pt-12 pb-16">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.1) 100%)',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                color: theme.accentLight,
              }}
            >
              <Sparkles className="h-4 w-4" />
              Documentation
            </div>

            {/* Hero Headline - Bold & Impactful */}
            <h1
              className="font-bold tracking-tight leading-[1.1]"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                fontFamily: 'var(--font-literata), Georgia, serif',
                background: 'linear-gradient(135deg, #fafafa 0%, #c4b5fd 60%, #f9a8d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em',
              }}
            >
              Master Research with
              <br />
              Agentic AI Workflows
            </h1>

            {/* Subtitle - Elegant & Clear */}
            <p
              className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: theme.textSecondary }}
            >
              Learn prompt engineering, build no-code automations, and write smarter essays with Esy&apos;s AI research tools.
            </p>

            {/* Stats Bar - Integrated Social Proof */}
            <div className="flex flex-wrap justify-center gap-8 pt-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.1) 100%)',
                      color: theme.accentLight,
                    }}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold" style={{ color: theme.text }}>{stat.value}</p>
                    <p className="text-sm" style={{ color: theme.subtle }}>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Primary CTA - Prominent & Elegant */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link
                href="https://app.esy.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl text-white transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                  boxShadow: '0 10px 40px rgba(139, 92, 246, 0.3)',
                }}
              >
                Try Esy Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/prompt-library"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium rounded-xl transition-all duration-300 hover:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                style={{
                  backgroundColor: theme.surface,
                  border: `1px solid ${theme.border}`,
                  color: theme.text,
                }}
              >
                Browse Prompt Library
              </Link>
            </div>
          </div>
        </section>

        {/* ===== SEARCH - Prominent Discovery Tool ===== */}
        <section className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5" style={{ color: theme.subtle }} />
            </div>
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full pl-14 pr-6 py-5 text-lg rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all duration-200"
              style={{
                backgroundColor: theme.elevated,
                border: `1px solid ${theme.border}`,
                color: theme.text,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
              }}
            />
            <kbd
              className="hidden sm:inline-flex absolute right-5 top-1/2 -translate-y-1/2 items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium"
              style={{
                backgroundColor: theme.surface,
                border: `1px solid ${theme.borderSubtle}`,
                color: theme.subtle,
              }}
            >
              ⌘K
            </kbd>
          </div>
        </section>

        {/* ===== FEATURED GUIDES - Premium Card Design ===== */}
        <section className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: theme.accent }}>
              Essential Resources
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight"
              style={{
                fontFamily: 'var(--font-literata), Georgia, serif',
                color: theme.text,
              }}
            >
              Start Here
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: theme.muted }}>
              Four comprehensive guides to transform your research and writing workflow.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
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

        {/* ===== LEARNING PATHS - Clear Journey Visualization ===== */}
        <section className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: theme.accent }}>
              Structured Learning
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight"
              style={{
                fontFamily: 'var(--font-literata), Georgia, serif',
                color: theme.text,
              }}
            >
              Choose Your Path
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: theme.muted }}>
              Follow these guided tracks to go from first prompt to fully automated workflows.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {learningPaths.map((path) => (
              <div
                key={path.title}
                className="group rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: theme.elevated,
                  border: `1px solid ${theme.border}`,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Path Header */}
                <div className="mb-6">
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{
                      fontFamily: 'var(--font-literata), Georgia, serif',
                      color: path.color,
                    }}
                  >
                    {path.title}
                  </h3>
                  <p style={{ color: theme.muted }}>{path.description}</p>
                </div>

                {/* Steps */}
                <div className="space-y-4">
                  {path.steps.map((step, index) => (
                    <Link
                      key={step.href}
                      href={step.href}
                      className="flex items-start gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-zinc-800/50"
                      style={{
                        border: `1px solid ${theme.borderSubtle}`,
                      }}
                    >
                      <div
                        className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                        style={{ backgroundColor: path.color }}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium" style={{ color: theme.text }}>
                          {step.label}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: path.color }} />
                    </Link>
                  ))}
                </div>

                {/* Path CTA */}
                <div className="mt-6 pt-6" style={{ borderTop: `1px solid ${theme.borderSubtle}` }}>
                  <Link
                    href={path.steps[0].href}
                    className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                    style={{ color: path.color }}
                  >
                    Start this track
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== FINAL CTA - Conversion Optimized ===== */}
        <section className="max-w-4xl mx-auto">
          <div
            className="relative rounded-3xl p-12 text-center overflow-hidden"
            style={{
              background: `linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)`,
              border: `1px solid rgba(139, 92, 246, 0.2)`,
              boxShadow: '0 20px 60px rgba(139, 92, 246, 0.15)',
            }}
          >
            {/* Background Pattern */}
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '32px 32px',
              }}
            />

            <div className="relative space-y-6">
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{
                  fontFamily: 'var(--font-literata), Georgia, serif',
                  background: 'linear-gradient(135deg, #fafafa 0%, #c4b5fd 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Ready to Transform Your Research?
              </h2>
              <p className="text-xl max-w-2xl mx-auto" style={{ color: theme.textSecondary }}>
                Join thousands of students and researchers mastering their academic work with Esy.
              </p>
              <Link
                href="https://app.esy.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 text-lg font-semibold rounded-xl text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                  boxShadow: '0 20px 60px rgba(139, 92, 246, 0.4)',
                }}
              >
                Start Your Free Trial
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </section>

        <DocsPageNav />
      </article>
    </div>
  );
}
