import type { Metadata } from "next";
import './article-styles.css';

export const metadata: Metadata = {
  title: "Esy Research - AI and Machine Learning Insights",
  description: "Exploring AI, machine learning, and the future of academic research through experiments, analysis, and insights.",
  keywords: ["AI research", "machine learning", "academic research", "prompt engineering", "LLM evaluation", "peer review"],
};

export default function ResearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

