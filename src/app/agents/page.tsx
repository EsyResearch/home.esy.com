import { Metadata } from "next";
import { AgentsHubClient } from "./AgentsHubClient";

export const metadata: Metadata = {
  title: "Agents Reference - AI Agents, Workflows & Orchestration | Esy",
  description: "A comprehensive reference guide to AI agents, agentic workflows, and orchestration patterns. Learn core concepts, architecture patterns, and implementation examples.",
  keywords: "AI agents, agentic workflows, orchestration, LLM agents, agent patterns, tool use, planning, memory",
  openGraph: {
    title: "Agents Reference - AI Agents & Orchestration | Esy",
    description: "Reference guide to AI agents, agentic workflows, and orchestration patterns.",
    url: "https://esy.com/agents",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agents Reference | Esy",
    description: "Reference guide to AI agents, agentic workflows, and orchestration.",
  },
  alternates: {
    canonical: "https://esy.com/agents",
  },
};

export default function AgentsHubPage() {
  return <AgentsHubClient />;
}
