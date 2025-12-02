import { Metadata } from "next";
import HowToWriteAnEssayIntroductionClient from "./HowToWriteAnEssayIntroductionClient";

export const metadata: Metadata = {
  title: "How to Write an Essay Introduction: Hook Readers Effectively | Esy",
  description:
    "Master essay introductions with proven techniques. Learn to write hooks, provide context, and craft thesis statements that engage readers from the start.",
  keywords:
    "how to write an essay introduction, essay hooks, intro paragraph, thesis statement, opening paragraph",
  openGraph: {
    title: "How to Write an Essay Introduction | Esy",
    description:
      "Master the art of writing compelling essay introductions that hook readers and set up strong arguments.",
    url: "https://esy.com/docs/how-to-write-an-essay-introduction",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Write an Essay Introduction | Esy",
    description:
      "Master essay introductions with proven techniques and examples.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HowToWriteAnEssayIntroductionPage() {
  return <HowToWriteAnEssayIntroductionClient />;
}


