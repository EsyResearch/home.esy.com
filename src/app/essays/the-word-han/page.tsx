/**
 * The Word "Han" — Etymology, Empire, and Identity Across East Asia
 * Visual Essay on the origin and evolution of "Han" (漢/韓)
 *
 * Created: December 14, 2025
 * @see /orchestration/skills/visual-essay-invocation/specs/the-word-han.md
 */
import { createVisualEssayMetadata } from "@/lib/visual-essay-metadata";
import TheWordHanClient from "./TheWordHanClient";

export const metadata = createVisualEssayMetadata({
  slug: "the-word-han",
  title: "漢 / 韓 — How One Word Shaped East Asia | Esy Visual Essay",
  description:
    "From a river's name to four civilizations: trace the 2,200-year journey of the word 'Han' through China, Korea, Japan, and Vietnam. Discover how one morpheme became embedded in ethnic identity, writing systems, and national consciousness—and why there are actually two etymologically distinct 'Hans.'",
  ogTitle: "漢 / 韓 — How One Word Shaped East Asia",
  ogDescription:
    "The 2,200-year journey of the word 'Han' from a river's name to four civilizations. Two words, same sound, different origins—shared heritage, distinct identity.",
  twitterDescription:
    "From Han River to Han Dynasty to Han Chinese to Hangul—how one word (and its Korean twin) shaped the identities of billions across East Asia.",
  keywords: [
    "Han etymology",
    "Han Dynasty",
    "Han Chinese",
    "Hangul",
    "Hanguk",
    "Hanja",
    "Kanji",
    "Korean Han",
    "Chinese Han",
    "漢",
    "韓",
    "King Sejong",
    "Liu Bang",
    "East Asian history",
    "Chinese characters",
    "visual essay",
    "scrollytelling",
    "typography",
    "etymology",
    "linguistics",
  ],
  imageAlt:
    "The Word Han — A visual essay exploring how one word shaped four East Asian civilizations over 2,200 years",
});

export default function TheWordHanPage() {
  return <TheWordHanClient />;
}
