import { Metadata } from "next";
import DocsHomeClient from "./DocsHomeClient";

export const metadata: Metadata = {
  title: "How Esy Makes Things | Esy Documentation",
  description: "Esy's production methodology — the system, workflows, and design decisions behind every artifact we publish. Transparent by design.",
  keywords: "Esy documentation, artifact production, visual essays, AI transparency, research workflows, authorship provenance",
  openGraph: {
    title: "How Esy Makes Things | Esy Documentation",
    description: "The system, workflows, and design decisions behind every Esy artifact. Transparent by design.",
    url: "https://esy.com/docs",
  },
  twitter: {
    card: "summary_large_image",
    title: "How Esy Makes Things | Esy Documentation",
    description: "The system, workflows, and design decisions behind every Esy artifact. Transparent by design.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DocsHomePage() {
  return <DocsHomeClient />;
}
