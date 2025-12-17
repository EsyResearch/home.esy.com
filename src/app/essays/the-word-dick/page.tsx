import { Metadata } from "next";
import TheWordDickClient from "./TheWordDickClient";

/**
 * THE WORD DICK: FROM ROYAL NICKNAME TO MODERN TABOO
 * ===================================================
 * A Typography-Forward Visual Essay on Etymology
 * 
 * Built from spec: orchestration/skills/visual-essay-invocation/specs/the-word-dick.md
 * Research package: src/app/essays/visual/the-word-dick/research/
 * 
 * Visual Treatment: Typography-forward with era-specific transformations
 * - Words themselves become visual elements
 * - 6 distinct era typography treatments
 * - Scroll-lock sequences drive typographic metamorphosis
 */

export const metadata: Metadata = {
  title: "The Word Dick: From Royal Nickname to Modern Taboo | Esy",
  description: "How did a medieval nickname for Richard become one of English's most loaded words? A scholarly visual essay tracing 800 years of semantic transformation.",
  keywords: [
    "etymology",
    "word origin",
    "dick etymology",
    "Richard nickname",
    "linguistic history",
    "English language history",
    "semantic change",
    "historical linguistics",
    "slang history"
  ],
  openGraph: {
    title: "The Word Dick | A Visual Etymology",
    description: "From medieval pet name to modern taboo—800 years of semantic transformation explored through typography and archival research.",
    type: "article",
    url: "https://esy.com/essays/the-word-dick",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Word Dick | Etymology Visual Essay",
    description: "How a 13th-century nickname became unspeakable. A scholarly etymology study.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TheWordDickPage() {
  return <TheWordDickClient />;
}



