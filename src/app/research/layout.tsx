import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Esy Research — AI Coding Tools & Workflow Architecture",
  description:
    "Engineering deep dives on building agentic workflows, AI coding tool breakdowns, and the architecture behind Esy's research pipeline. Video-first content with full transcripts.",
  keywords: [
    "AI coding tools",
    "Claude Code",
    "Cursor",
    "agentic workflows",
    "multi-agent architecture",
    "LLM orchestration",
    "workflow engine",
    "research pipeline",
    "Next.js",
    "MUX video",
  ],
};

export default function ResearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
