/**
 * ROBOT — Grand Machina
 * Visual Essay on the Etymology of "Robot"
 * 
 * Migrated to createVisualEssayMetadata pattern: December 13, 2025
 * @see /docs/VISUAL_ESSAY_METADATA_PATTERN.md
 */
import { createVisualEssayMetadata } from "@/lib/visual-essay-metadata";
import TheWordRobotClient from "./TheWordRobotClient";

export const metadata = createVisualEssayMetadata({
  slug: "the-word-robot",
  title: "ROBOT — Grand Machina | Esy Visual Essay",
  description:
    "The Word That Built Our Future, and Now Shares Our Bed. From Karel Čapek's 1920 Czech play to human-robot intimacy—trace the 105-year journey of 'robot' through etymology, industry, fear, domestication, and coexistence.",
  ogTitle: "ROBOT — Grand Machina",
  ogDescription:
    "The Word That Built Our Future, and Now Shares Our Bed. 105 years of robot—from forced labor to intimate companion.",
  twitterDescription:
    "From 'robota' (forced labor) to living, working, and loving machines—the 105-year journey of the word that built our future.",
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
  // Uses custom image path (legacy) instead of /og/the-word-robot.png
  ogImage: "https://esy.com/images/robot/robot-hero.jpg",
  imageAlt:
    "ROBOT — Grand Machina: A visual essay exploring the 105-year journey of the word robot from Czech forced labor to intimate companion",
});

export default function TheWordRobotPage() {
  return <TheWordRobotClient />;
}


