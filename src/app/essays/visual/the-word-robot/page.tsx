import type { Metadata } from "next";
import TheWordRobotClient from "./TheWordRobotClient";

export const metadata: Metadata = {
  title: "ROBOT — The Word That Imagined Our Future | Esy Visual Essay",
  description:
    "From Karel Čapek's 1920 Czech play to ChatGPT—trace the 105-year journey of the word 'robot' through etymology, science fiction, industrial automation, and AI. A photorealistic visual essay with era-evolving typography.",
  keywords: [
    "robot etymology",
    "robot history",
    "Karel Čapek",
    "R.U.R.",
    "robota",
    "Isaac Asimov",
    "Three Laws of Robotics",
    "Terminator",
    "Roomba",
    "AI robots",
    "word origin robot",
    "robot perception",
    "automation history",
    "visual essay",
    "scrollytelling",
  ],
  openGraph: {
    title: "ROBOT — The Word That Imagined Our Future",
    description:
      "How a Czech word born in 1920 shaped humanity's relationship with machines for over a century. A visual essay tracing robot from etymology to AI.",
    type: "article",
    url: "https://esy.com/essays/visual/the-word-robot",
  },
  twitter: {
    card: "summary_large_image",
    title: "ROBOT — The Word That Imagined Our Future",
    description:
      "From 'robota' (forced labor) to ChatGPT—the 105-year journey of the word that imagined our technological future.",
  },
};

export default function TheWordRobotPage() {
  return <TheWordRobotClient />;
}

