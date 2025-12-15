import { Metadata } from "next";
import OriginOfDickClient from "./OriginOfDickClient";

/**
 * THE WORD THAT CHANGED ITS STRIPES
 * ==================================
 * A Visual Etymology Essay on the Word "Dick"
 * 
 * From medieval pet name to modern taboo—tracing 600 years
 * of semantic transformation through rhyming slang, military
 * jargon, and cultural anxiety.
 * 
 * This is a scholarly etymology study—educational, not sensational.
 */

export const metadata: Metadata = {
  title: "The Origin of the Word Dick | Etymology & History | Esy",
  description: "How did a medieval nickname for Richard become one of English's most versatile words? A scholarly visual essay tracing 600 years of linguistic transformation.",
  keywords: [
    "etymology",
    "word origin",
    "linguistic history",
    "English language",
    "name etymology",
    "slang history",
    "semantic change",
    "historical linguistics"
  ],
  openGraph: {
    title: "The Origin of the Word Dick | A Visual Etymology",
    description: "From medieval pet name to modern taboo—600 years of semantic transformation explored through typography and archival research.",
    type: "article",
    url: "https://esy.com/essays/visual/the-origin-of-the-word-dick",
  },
};

export default function OriginOfDickPage() {
  return <OriginOfDickClient />;
}



