import { Metadata } from "next";
import DocsHomeClient from "./DocsHomeClient";

export const metadata: Metadata = {
  title: "Documentation - Master Research with Agentic AI | Esy",
  description: "Learn prompt engineering, build no-code automations, and write smarter essays with Esy's AI research tools. 50+ ready-to-use prompts.",
  keywords: "Esy documentation, AI research, prompt engineering, agentic workflows, essay writing, academic AI",
  openGraph: {
    title: "Master Research with Agentic AI | Esy Docs",
    description: "Learn prompt engineering, build no-code research automations, and write smarter essays.",
    url: "https://esy.com/docs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Master Research with Agentic AI | Esy Docs",
    description: "Learn prompt engineering, build no-code research automations, and write smarter essays.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DocsHomePage() {
  return <DocsHomeClient />;
}
