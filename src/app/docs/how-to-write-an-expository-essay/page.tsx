import { Metadata } from "next";
import HowToWriteAnExpositoryEssayClient from "./HowToWriteAnExpositoryEssayClient";

export const metadata: Metadata = {
  title: "How to Write an Expository Essay: Guide with Examples | Esy",
  description:
    "Master expository essay writing with step-by-step guidance. Learn structure, techniques, and see examples. Includes AI-powered writing assistance.",
  keywords:
    "how to write an expository essay, expository essay structure, expository writing, explain essay, informational writing",
  openGraph: {
    title: "How to Write an Expository Essay: Complete Guide | Esy",
    description:
      "Master expository writing with expert techniques and examples. Learn to explain topics clearly and effectively.",
    url: "https://esy.com/docs/how-to-write-an-expository-essay",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Write an Expository Essay | Esy",
    description:
      "Master expository writing with expert techniques and examples.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HowToWriteAnExpositoryEssayPage() {
  return <HowToWriteAnExpositoryEssayClient />;
}


