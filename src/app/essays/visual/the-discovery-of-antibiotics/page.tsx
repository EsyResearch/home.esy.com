import type { Metadata } from "next";
import AntibioticsClient from "./AntibioticsClient";
import { ScrollytellingLayout } from "@/components/Scrollytelling";

export const metadata: Metadata = {
  title: "The Discovery of Antibiotics | How Penicillin Changed Medicine | Esy",
  description:
    "An immersive scrollytelling experience about Alexander Fleming's accidental discovery of penicillin in 1928—one of humanity's greatest medical breakthroughs that has saved over 200 million lives.",
  keywords: [
    "antibiotics history",
    "penicillin discovery",
    "Alexander Fleming",
    "medical breakthroughs",
    "history of medicine",
    "Howard Florey",
    "Ernst Chain",
    "bacterial infections",
    "Nobel Prize medicine",
    "scrollytelling",
  ],
  openGraph: {
    title: "The Discovery of Antibiotics | How Penicillin Changed Medicine",
    description:
      "How a contaminated petri dish in 1928 led to one of humanity's greatest medical breakthroughs—and saved over 200 million lives.",
    type: "article",
    url: "https://esy.com/scrollytelling/the-discovery-of-antibiotics",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Discovery of Antibiotics | How Penicillin Changed Medicine",
    description:
      "How a contaminated petri dish in 1928 led to one of humanity's greatest medical breakthroughs.",
  },
};

export default function TheDiscoveryOfAntibioticsPage() {
  return (
    <ScrollytellingLayout
      title="The Discovery of Antibiotics"
      description="How penicillin changed medicine and saved 200 million lives"
      readTime="10 min"
      storyId="the-discovery-of-antibiotics"
    >
      <AntibioticsClient />
    </ScrollytellingLayout>
  );
}

