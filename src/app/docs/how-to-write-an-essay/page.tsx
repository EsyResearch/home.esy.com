import { Metadata } from "next";
import HowToWriteAnEssayClient from "./HowToWriteAnEssayClient";

export const metadata: Metadata = {
  title: "How to Write an Essay: Complete Guide for Students | Esy",
  description:
    "Master essay writing with our comprehensive guide. Learn structure, organization, and techniques for every essay type. Includes AI-assisted methods and 50+ examples.",
  keywords:
    "how to write an essay, essay writing guide, essay structure, academic writing, essay tips, student writing help",
  openGraph: {
    title: "How to Write an Essay: Complete Guide | Esy",
    description:
      "Master essay writing from brainstorming to final draft. Expert techniques, examples, and AI-assisted methods.",
    url: "https://esy.com/docs/how-to-write-an-essay",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Write an Essay: Complete Guide | Esy",
    description:
      "Master essay writing from brainstorming to final draft. Expert techniques, examples, and AI-assisted methods.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HowToWriteAnEssayPage() {
  return <HowToWriteAnEssayClient />;
}


