import { Metadata } from "next";
import LanguagesClient from "./LanguagesClient";

export const metadata: Metadata = {
  title: "The History of Languages: Humanity's Greatest Invention | Esy",
  description:
    "From the first human utterance to 7,000 living tongues—journey through the evolution of language, the rise and fall of writing systems, and the voices that connect us across time and space. A photographic visual essay.",
  keywords: [
    "history of languages",
    "language evolution",
    "linguistics",
    "writing systems",
    "ancient languages",
    "Proto-Indo-European",
    "Sumerian cuneiform",
    "Egyptian hieroglyphics",
    "Rosetta Stone",
    "endangered languages",
    "language families",
    "babel",
    "communication",
    "human speech",
    "visual essay",
    "educational",
  ],
  openGraph: {
    title: "The History of Languages: Humanity's Greatest Invention",
    description:
      "From cave paintings to emoji—7,000 languages, 100,000 years, one human story. An immersive visual journey.",
    url: "https://esy.com/essays/visual/the-history-of-languages",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "The History of Languages: Humanity's Greatest Invention",
    description:
      "From the first word spoken to the last language endangered—the story of how humans learned to share their minds.",
  },
};

export default function TheHistoryOfLanguagesPage() {
  return <LanguagesClient />;
}
