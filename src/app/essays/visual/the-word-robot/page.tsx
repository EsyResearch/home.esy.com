import type { Metadata } from "next";
import TheWordRobotClient from "./TheWordRobotClient";

export const metadata: Metadata = {
  title: "ROBOT — Grand Machina | Esy Visual Essay",
  description:
    "The Word That Built Our Future, and Now Shares Our Bed. From Karel Čapek's 1920 Czech play to human-robot intimacy—trace the 105-year journey of 'robot' through etymology, industry, fear, domestication, and coexistence.",
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
    "human robot relationships",
    "robot intimacy",
    "uncanny valley",
    "AI robots",
    "humanoid robots",
    "visual essay",
    "scrollytelling",
  ],
  openGraph: {
    title: "ROBOT — Grand Machina",
    description:
      "The Word That Built Our Future, and Now Shares Our Bed. 105 years of robot—from forced labor to intimate companion.",
    type: "article",
    url: "https://esy.com/essays/visual/the-word-robot",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/images/robot/robot-hero.jpg",
        width: 1200,
        height: 630,
        alt: "ROBOT — Grand Machina: A visual essay exploring the 105-year journey of the word robot from Czech forced labor to intimate companion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ROBOT — Grand Machina",
    description:
      "From 'robota' (forced labor) to living, working, and loving machines—the 105-year journey of the word that built our future.",
    site: "@esy",
    images: ["https://esy.com/images/robot/robot-hero.jpg"],
  },
  alternates: {
    canonical: "https://esy.com/essays/visual/the-word-robot",
  },
};

export default function TheWordRobotPage() {
  return <TheWordRobotClient />;
}


