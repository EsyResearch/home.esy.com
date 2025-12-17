import { Metadata } from "next";
import ThinkingMachineClient from "./ThinkingMachineClient";

export const metadata: Metadata = {
  title: "The Thinking Machine: A Visual History of AI | Esy",
  description:
    "From Alan Turing's wartime imaginings to ChatGPT—an immersive visual journey through 80 years of artificial intelligence. Experience the dreamers, the winters, and the revolution through archival photography and cinematic scroll-driven storytelling.",
  keywords: [
    "artificial intelligence history",
    "AI history",
    "Alan Turing",
    "machine learning",
    "neural networks",
    "deep learning",
    "Geoffrey Hinton",
    "ChatGPT",
    "OpenAI",
    "Dartmouth conference",
    "AI winter",
    "computer science history",
    "Turing test",
    "visual essay",
    "interactive history",
  ],
  openGraph: {
    title: "The Thinking Machine: A Visual History of Artificial Intelligence",
    description:
      "From Turing's question to ChatGPT's answer—80 years of humanity's quest to build minds from mathematics. An immersive photo-driven visual essay.",
    url: "https://esy.com/essays/the-thinking-machine",
    type: "article",
    images: [
      {
        url: "/images/ai-history/og-thinking-machine.jpg",
        width: 1200,
        height: 630,
        alt: "The Thinking Machine: A Visual History of AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Thinking Machine: A Visual History of AI",
    description:
      "From Turing to ChatGPT—80 years of artificial intelligence history through immersive visual storytelling.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ThinkingMachinePage() {
  return <ThinkingMachineClient />;
}

