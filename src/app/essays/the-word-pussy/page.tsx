/**
 * Words Have Histories: The Curious Journey of "Pussy"
 * Visual Essay on Etymology and Semantic Evolution
 * 
 * A typography-forward visual essay exploring how a simple pet-name
 * for cats became one of the most controversial words in English.
 * 
 * Created via Visual Essay Orchestrator pipeline: December 14, 2025
 * @see /orchestration/skills/visual-essay-invocation/specs/the-word-pussy.md
 */
import { createVisualEssayMetadata } from "@/lib/visual-essay-metadata";
import TheWordPussyClient from "./TheWordPussyClient";

export const metadata = createVisualEssayMetadata({
  slug: "the-word-pussy",
  title: "Words Have Histories: The Curious Journey of 'Pussy' | Esy Visual Essay",
  description:
    "From Germanic pet-names for cats to modern taboo—trace the 500-year etymological journey of the word 'pussy' through affection, euphemism, and semantic evolution. A typography-forward visual essay.",
  ogTitle: "Words Have Histories: The Curious Journey of 'Pussy'",
  ogDescription:
    "How did a word for cats become one of the most controversial words in English? A visual essay on etymology, taboo, and the life of language.",
  twitterDescription:
    "From Old Norse to modern taboo—the fascinating 500-year etymology of the word 'pussy' through typography, linguistics, and cultural evolution.",
  keywords: [
    "pussy etymology",
    "word origin",
    "etymology",
    "linguistic history",
    "semantic evolution",
    "taboo words",
    "euphemism treadmill",
    "Old Norse",
    "Germanic languages",
    "Samuel Johnson dictionary",
    "typography history",
    "visual essay",
    "scrollytelling",
  ],
});

export default function TheWordPussyPage() {
  return <TheWordPussyClient />;
}


