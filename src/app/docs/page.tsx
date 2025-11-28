import { Metadata } from "next";
import Link from "next/link";
import { elevatedDarkTheme } from "@/lib/theme";
import {
  Sparkles,
  BookOpen,
  PenLine,
  Workflow,
  ArrowRight,
  Zap,
  Users,
  FileText,
} from "lucide-react";
import { FeatureCard, DocsPageNav } from "@/components/docs";

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
    description:
      "Master the art of crafting effective AI prompts for academic writing and research.",
    href: "/docs/prompt-engineering",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    title: "50+ ChatGPT Prompts for Academic Writing",
    description:
      "Copy-paste prompts for essays, research papers, thesis writing, and more.",
    href: "/docs/chatgpt-prompts-for-academic-writing",
    icon: <BookOpen className="w-6 h-6" />,
    isNew: true,
  },
  {
    title: "Write Better Essays with AI",
    description:
      "Transform your essay writing process with AI-powered research and drafting.",
    href: "/docs/how-to-write-better-essays-with-ai",
    icon: <PenLine className="w-6 h-6" />,
  },
  {
    title: "Agent Workflows in Esy",
    description:
      "Build no-code research automations that write essays for you.",
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

export default function DocsHomePage() {
  return (
    <article>
      {/* Hero Section */}
      <div className="mb-12">
        <div 
          className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full text-sm font-medium"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.1) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            color: '#c4b5fd',
          }}
        >
          <Sparkles className="w-4 h-4" />
          Documentation
        </div>

        <h1 
          className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight"
          style={{ 
            fontFamily: 'var(--font-literata), Georgia, serif',
            background: 'linear-gradient(135deg, #ffffff 0%, #c4b5fd 50%, #f9a8d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Master Research with Esy&apos;s Agentic Workflows
        </h1>

        <p 
          className="text-lg max-w-2xl mb-8"
          style={{ color: elevatedDarkTheme.muted }}
        >
          Skip the boring research. Learn how to use AI prompts, reference your
          documents, and build automated workflows that write essays for you.
        </p>

        {/* Quick stats */}
        <div className="flex flex-wrap gap-6 mb-8">
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 px-4 py-2 rounded-xl"
              style={{
                backgroundColor: elevatedDarkTheme.elevated,
                border: `1px solid ${elevatedDarkTheme.border}`,
              }}
            >
              <div style={{ color: '#8b5cf6' }}>{stat.icon}</div>
              <div>
                <div style={{ color: elevatedDarkTheme.text }} className="font-bold">
                  {stat.value}
                </div>
                <div className="text-xs" style={{ color: elevatedDarkTheme.subtle }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="https://app.esy.com"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl transition-all"
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
            className="inline-flex items-center gap-2 px-6 py-3 font-medium rounded-xl transition-colors"
            style={{
              backgroundColor: elevatedDarkTheme.elevated,
              color: elevatedDarkTheme.text,
            }}
          >
            Browse Prompt Library
          </Link>
        </div>
      </div>

      {/* Search Bar (placeholder) */}
      <div className="mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Search documentation..."
            className="w-full px-6 py-4 rounded-2xl text-white placeholder-zinc-500 focus:outline-none transition-all"
            style={{
              backgroundColor: elevatedDarkTheme.elevated,
              border: `1px solid ${elevatedDarkTheme.border}`,
            }}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <kbd 
              className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-mono rounded"
              style={{
                backgroundColor: elevatedDarkTheme.surface,
                color: elevatedDarkTheme.subtle,
              }}
            >
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Featured Guides Grid */}
      <section className="mb-16">
        <h2 
          id="featured-guides" 
          className="text-2xl font-bold mb-6"
          style={{ 
            color: elevatedDarkTheme.text,
            fontFamily: 'var(--font-literata), Georgia, serif',
          }}
        >
          Featured Guides
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
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

      {/* Quick Start Section */}
      <section className="mb-16">
        <h2 
          id="quick-start" 
          className="text-2xl font-bold mb-6"
          style={{ 
            color: elevatedDarkTheme.text,
            fontFamily: 'var(--font-literata), Georgia, serif',
          }}
        >
          Quick Start with Esy
        </h2>
        <div 
          className="rounded-2xl p-6"
          style={{
            backgroundColor: elevatedDarkTheme.elevated,
            border: `1px solid ${elevatedDarkTheme.border}`,
          }}
        >
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Open Esy and describe your essay",
                desc: "Tell Esy what you're writing about. Be specific—include your thesis, key arguments, and any sources you want to reference.",
              },
              {
                step: "2",
                title: "Let the agent research for you",
                desc: "Esy's agentic workflow searches sources, gathers evidence, and organizes findings—all in the background.",
              },
              {
                step: "3",
                title: "Write with AI assistance",
                desc: "Use the structured research to write faster. Esy suggests citations, improves clarity, and maintains your unique voice.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div 
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                  }}
                >
                  {item.step}
                </div>
                <div>
                  <h3 
                    className="font-semibold mb-1"
                    style={{ color: elevatedDarkTheme.text }}
                  >
                    {item.title}
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: elevatedDarkTheme.muted }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="mb-16">
        <h2 
          id="popular-topics" 
          className="text-2xl font-bold mb-6"
          style={{ 
            color: elevatedDarkTheme.text,
            fontFamily: 'var(--font-literata), Georgia, serif',
          }}
        >
          Popular Topics
        </h2>
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
          ].map((topic) => (
            <Link
              key={topic}
              href="/docs/prompt-engineering"
              className="px-4 py-2 rounded-xl text-sm transition-all"
              style={{
                backgroundColor: elevatedDarkTheme.elevated,
                border: `1px solid ${elevatedDarkTheme.border}`,
                color: elevatedDarkTheme.textSecondary,
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
