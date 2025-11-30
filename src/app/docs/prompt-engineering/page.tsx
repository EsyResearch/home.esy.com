import { Metadata } from "next";
import PromptEngineeringClient from "./PromptEngineeringClient";

export const metadata: Metadata = {
  title: "Prompt Engineering for Students",
  description:
    "Master prompt engineering for academic writing. Learn the CRISPE framework, iteration techniques, and get 20+ proven prompts for essays, research papers, and more.",
  keywords:
    "prompt engineering, student prompts, academic AI, essay prompts, ChatGPT for students, AI writing tips",
  openGraph: {
    title: "Prompt Engineering for Students | Esy Docs",
    description:
      "Master the art of crafting AI prompts that deliver A-grade essays and research papers.",
    url: "https://esy.com/docs/prompt-engineering",
  },
};

export default function PromptEngineeringPage() {
  return <PromptEngineeringClient />;
}
