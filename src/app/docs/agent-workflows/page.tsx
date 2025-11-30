import { Metadata } from "next";
import Link from "next/link";
import {
  Workflow,
  Upload,
  MessageSquare,
  Zap,
  FileText,
  BookOpen,
  Quote,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Play,
} from "lucide-react";
import { DocsPageNav, DocsCallout, WorkflowStep } from "@/components/docs";

// Design system colors from DESIGN_SYSTEM.md - Updated for better contrast
const colors = {
  bg: '#18181b',
  elevated: '#27272a',
  surface: '#1f1f23',
  text: '#fafafa',
  textSecondary: 'rgba(255, 255, 255, 0.85)',
  muted: 'rgba(255, 255, 255, 0.75)',
  subtle: 'rgba(255, 255, 255, 0.5)',
  border: 'rgba(255, 255, 255, 0.08)',
  borderSubtle: 'rgba(255, 255, 255, 0.05)',
  accent: '#8b5cf6',
  accentHover: '#7c3aed',
  accentLight: '#a78bfa',
};

export const metadata: Metadata = {
  title: "Agent Workflows in Esy: Build No-Code Research Flows That Write Essays for You (2025 Guide)",
  description: "Learn agent workflows with Esy — reference your docs, chain prompts, and automate research. Perfect for students and researchers. No coding required.",
  keywords: "agent workflows, Esy workflows, AI research automation, no-code AI, prompt chaining, document reference AI, automated essay writing",
  openGraph: {
    title: "Agent Workflows in Esy: No-Code Research Automation | Esy Docs",
    description: "Build AI workflows that reference your documents, chain prompts, and automate research—no coding required.",
    url: "https://esy.com/docs/agent-workflows",
  },
};

const workflowCapabilities = [
  {
    icon: <Upload className="w-5 h-5" />,
    title: "Document Reference",
    description: "Upload PDFs, notes, or research papers. The agent reads and cites your actual sources.",
  },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    title: "Prompt Chaining",
    description: "Connect multiple prompts in sequence. Output from one becomes input for the next.",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Automated Execution",
    description: "Set up once, run anytime. Perfect for recurring research tasks.",
  },
  {
    icon: <FileText className="w-5 h-5" />,
    title: "Structured Output",
    description: "Get organized results: outlines, annotated bibliographies, draft sections.",
  },
];

const litReviewSteps = [
  {
    title: "Upload Your Sources",
    description: "Drag and drop your PDFs, articles, or notes into Esy. The agent indexes everything for instant retrieval.",
    details: ["Supports PDF, DOCX, TXT, and web links", "Auto-extracts key metadata", "Organizes by theme automatically"],
  },
  {
    title: "Set Your Research Question",
    description: "Tell Esy what you're investigating. For example: \"What do scholars say about the effectiveness of remote learning on student outcomes?\"",
    details: ["Can be a thesis or open question", "AI suggests refinements", "Saves for reuse"],
  },
  {
    title: "Configure the Workflow",
    description: "Choose what you want: source summaries, theme identification, quote extraction, or full literature review draft.",
    details: ["Pre-built templates available", "Customize output format", "Add follow-up prompts"],
  },
  {
    title: "Run and Review",
    description: "Hit play. Esy reads your sources, synthesizes findings, and generates your literature review with proper citations.",
    details: ["Real-time progress tracking", "Edit and regenerate sections", "Export to Word/Google Docs"],
  },
];

const realExamples = [
  {
    title: "Literature Review Agent",
    description: "Reads 10+ sources, identifies themes, synthesizes arguments, generates a structured lit review with citations.",
    useCase: "Research papers, thesis chapters",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    title: "Citation Agent",
    description: "Scans your documents for claims that need support, finds relevant quotes from your sources, formats citations.",
    useCase: "Any assignment requiring evidence",
    icon: <Quote className="w-5 h-5" />,
  },
  {
    title: "Counterargument Agent",
    description: "Takes your thesis, finds opposing viewpoints in your sources, helps you address them in your essay.",
    useCase: "Argumentative essays",
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    title: "Research Gap Finder",
    description: "Analyzes your sources to identify what questions haven't been answered—perfect for original research.",
    useCase: "Thesis proposals, original research",
    icon: <Sparkles className="w-5 h-5" />,
  },
];

export default function AgentWorkflowsPage() {
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
          <Workflow className="w-4 h-4" />
          Agentic Workflows
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
          What Are Agent Workflows?{" "}
          <span style={{ color: colors.muted }}>(And How Esy Makes Them Easy)</span>
        </h1>

        <p style={{ 
          fontSize: '1.125rem',
          lineHeight: 1.8,
          marginBottom: '1.5rem',
          color: colors.muted
        }}>
          Agent workflows automate multi-step research tasks. Upload your
          documents, chain prompts together, and let Esy do the heavy
          lifting—while you stay in control. No coding required.
        </p>

        <div className="flex flex-wrap gap-4 text-sm" style={{ color: colors.subtle }}>
          <span>🤖 No-code AI automation</span>
          <span>•</span>
          <span>Updated November 2025</span>
        </div>
      </div>

      <DocsCallout type="note" title="2025 Guide">
        This guide covers Esy&apos;s latest agentic features. If you&apos;re
        new to Esy, start with our{" "}
        <Link href="/docs/prompt-engineering" className="underline" style={{ color: colors.accentHover }}>
          prompt engineering guide
        </Link>{" "}
        first.
      </DocsCallout>

      {/* What Are Agent Workflows */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
        <h2
          id="what-are-agent-workflows"
          style={{ 
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            marginBottom: 'clamp(1.5rem, 3vh, 2rem)',
            color: colors.text
          }}
        >
          What Are Agent Workflows?
        </h2>
        <p className="mb-4" style={{ color: colors.textSecondary }}>
          Traditional AI chat is one question, one answer. Agent workflows are
          different: they&apos;re sequences of AI actions that work together to
          complete complex tasks. Think of it like having a research assistant
          who can:
        </p>

        <ul className="space-y-3 mb-6">
          {[
            "Read and remember your documents",
            "Break big tasks into smaller steps",
            "Pass information between steps automatically",
            "Generate structured, citation-backed output",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3" style={{ color: colors.textSecondary }}>
              <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: colors.accentHover }} />
              {item}
            </li>
          ))}
        </ul>

        <p style={{ color: colors.textSecondary }}>
          The &ldquo;agentic&rdquo; part means the AI takes initiative—it
          doesn&apos;t just respond to prompts, it plans and executes research
          strategies based on your goals.
        </p>
      </section>

      {/* How Esy's Agent Works */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
        <h2
          id="how-esy-agent-works"
          style={{ 
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            marginBottom: 'clamp(1.5rem, 3vh, 2rem)',
            color: colors.text
          }}
        >
          How Esy&apos;s Agent Works
        </h2>
        <p className="mb-6" style={{ color: colors.textSecondary }}>
          Esy&apos;s workflow system is built for students and researchers who
          want powerful AI without the complexity. Here&apos;s what makes it
          different:
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {workflowCapabilities.map((cap) => (
            <div
              key={cap.title}
              className="p-4 rounded-xl"
              style={{ backgroundColor: colors.elevated, border: `1px solid ${colors.border}` }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', color: colors.accentHover }}
                >
                  {cap.icon}
                </div>
                <h3 className="font-semibold" style={{ color: colors.text }}>{cap.title}</h3>
              </div>
              <p className="text-sm" style={{ color: colors.muted }}>{cap.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Step-by-Step: Build a Research Workflow */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
        <h2
          id="build-research-workflow"
          style={{ 
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            marginBottom: 'clamp(1.5rem, 3vh, 2rem)',
            color: colors.text
          }}
        >
          Step-by-Step: Build a Literature Review Workflow
        </h2>
        <p className="mb-6" style={{ color: colors.textSecondary }}>
          Let&apos;s walk through building a workflow that automatically creates
          a literature review from your sources. This would take hours
          manually—Esy does it in minutes.
        </p>

        <div 
          className="rounded-2xl p-6"
          style={{ backgroundColor: colors.elevated, border: `1px solid ${colors.border}` }}
        >
          {litReviewSteps.map((step, index) => (
            <WorkflowStep
              key={step.title}
              number={index + 1}
              title={step.title}
              description={step.description}
            >
              <ul className="space-y-1">
                {step.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-2 text-sm" style={{ color: colors.muted }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.accentHover }} />
                    {detail}
                  </li>
                ))}
              </ul>
            </WorkflowStep>
          ))}
        </div>
      </section>

      {/* UI Preview */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
        <h2
          id="esy-interface"
          style={{ 
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            marginBottom: 'clamp(1.5rem, 3vh, 2rem)',
            color: colors.text
          }}
        >
          The Esy Interface
        </h2>
        <p className="mb-6" style={{ color: colors.textSecondary }}>
          Esy&apos;s workflow builder is visual and intuitive. No command lines,
          no code—just drag, drop, and configure.
        </p>

        {/* Stylized UI representation */}
        <div 
          className="rounded-2xl overflow-hidden"
          style={{ backgroundColor: colors.elevated, border: `1px solid ${colors.border}` }}
        >
          <div 
            className="flex items-center gap-2 px-4 py-3"
            style={{ borderBottom: `1px solid ${colors.border}`, backgroundColor: colors.surface }}
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(248, 113, 113, 0.5)' }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(251, 191, 36, 0.5)' }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(34, 197, 94, 0.5)' }} />
            <span className="ml-2 text-sm" style={{ color: colors.subtle }}>Esy Workflow Builder</span>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { icon: <Upload className="w-6 h-6" />, label: "Sources", sub: "12 documents" },
                { icon: <MessageSquare className="w-6 h-6" />, label: "Prompts", sub: "4 chained" },
                { icon: <FileText className="w-6 h-6" />, label: "Output", sub: "Lit review" },
              ].map((item) => (
                <div 
                  key={item.label}
                  className="p-4 rounded-xl text-center"
                  style={{ backgroundColor: colors.surface, border: `1px solid ${colors.borderSubtle}` }}
                >
                  <div className="mx-auto mb-2" style={{ color: colors.accentHover }}>{item.icon}</div>
                  <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>{item.label}</p>
                  <p className="text-xs" style={{ color: colors.subtle }}>{item.sub}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4">
              {[Upload, BookOpen, Sparkles, FileText].map((Icon, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: 'rgba(139, 92, 246, 0.15)',
                      border: '2px solid rgba(139, 92, 246, 0.3)',
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: colors.accentHover }} />
                  </div>
                  {idx < 3 && <ArrowRight className="w-4 h-4" style={{ color: colors.subtle }} />}
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button 
                className="inline-flex items-center gap-2 px-6 py-2 text-white text-sm font-semibold rounded-xl"
                style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' }}
              >
                <Play className="w-4 h-4" />
                Run Workflow
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Real Examples */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
        <h2
          id="real-examples"
          style={{ 
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            marginBottom: 'clamp(1.5rem, 3vh, 2rem)',
            color: colors.text
          }}
        >
          Real Examples: Workflows You Can Build
        </h2>
        <p className="mb-6" style={{ color: colors.textSecondary }}>
          Here are workflows our users have built. Each takes 5-10 minutes to
          set up and saves hours per assignment.
        </p>

        <div className="grid gap-4">
          {realExamples.map((example) => (
            <div
              key={example.title}
              className="p-4 rounded-xl"
              style={{ backgroundColor: colors.elevated, border: `1px solid ${colors.border}` }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                  style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' }}
                >
                  {example.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1" style={{ color: colors.text }}>{example.title}</h3>
                  <p className="text-sm mb-2" style={{ color: colors.muted }}>{example.description}</p>
                  <p className="text-xs" style={{ color: colors.accentHover }}>Best for: {example.useCase}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
        <div 
          className="rounded-2xl p-8 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
          }}
        >
          <Workflow className="w-12 h-12 mx-auto mb-4" style={{ color: colors.accentHover }} />
          <h2 
            style={{ 
              fontFamily: 'var(--font-literata), Georgia, serif',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
              fontWeight: 300,
              letterSpacing: '-0.01em',
              marginBottom: '1rem',
              color: colors.text
            }}
          >
            Ready to Automate Your Research?
          </h2>
          <p className="mb-6 max-w-lg mx-auto" style={{ color: colors.muted }}>
            Build your first workflow in minutes. Upload your sources, chain
            your prompts, and let Esy do the tedious work while you focus on
            thinking.
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
              Start Building Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/prompt-library"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-xl transition-colors hover:bg-zinc-700/50"
              style={{ backgroundColor: colors.elevated, color: colors.text, border: `1px solid ${colors.border}` }}
            >
              Browse Prompt Library
            </Link>
          </div>
        </div>
      </section>

      {/* Related Content */}
      <section style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
        <h2 id="learn-more" style={{ 
          fontFamily: 'var(--font-literata), Georgia, serif',
          fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
          fontWeight: 300,
          letterSpacing: '-0.01em',
          marginBottom: 'clamp(1.5rem, 3vh, 2rem)',
          color: colors.text
        }}>
          Learn More
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { href: "/docs/prompt-engineering", title: "Prompt Engineering Guide →", desc: "Master the prompts that power your workflows" },
            { href: "/docs/chatgpt-prompts-for-academic-writing", title: "50+ Academic Prompts →", desc: "Copy-paste prompts to use in your workflows" },
            { href: "/docs/how-to-write-better-essays-with-ai", title: "Write Better Essays with AI →", desc: "Complete guide to AI-assisted writing" },
            { href: "/docs", title: "All Documentation →", desc: "Browse all Esy guides and tutorials" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group p-4 rounded-xl transition-all hover:bg-zinc-800/50"
              style={{ backgroundColor: colors.elevated, border: `1px solid ${colors.border}` }}
            >
              <h3 className="font-semibold mb-1" style={{ color: colors.text }}>{item.title}</h3>
              <p className="text-sm" style={{ color: colors.muted }}>{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <DocsPageNav />
    </article>
  );
}
