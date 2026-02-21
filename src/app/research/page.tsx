import ResearchClient from "./client";

export const metadata = {
  title: "Esy Research — AI Coding Tools & Workflow Architecture",
  description:
    "Engineering deep dives on building agentic workflows, AI coding tool breakdowns, and the architecture behind Esy's research pipeline.",
  keywords:
    "Esy Research, AI coding tools, Claude Code, Cursor, agentic workflows, multi-agent architecture, workflow engine",
  openGraph: {
    title: "Esy Research — AI Coding Tools & Workflow Architecture",
    description:
      "Engineering deep dives and AI tool breakdowns from the team building Esy.",
    type: "website",
  },
};

export default function Page() {
  return <ResearchClient />;
}
