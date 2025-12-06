import { Metadata } from "next";
import HoneyNeverSpoilsClient from "./HoneyNeverSpoilsClient";
import { ScrollytellingLayout } from "@/components/Scrollytelling";

export const metadata: Metadata = {
  title: "Honey Never Spoils: The Eternal Elixir | Esy",
  description:
    "Discover why 3,000-year-old honey found in Egyptian tombs is still perfectly edible. Explore the science behind honey's eternal shelf life through interactive animations and historical discovery.",
  keywords: [
    "honey never spoils",
    "eternal food",
    "Egyptian honey",
    "Tutankhamun tomb",
    "honey science",
    "why honey lasts forever",
    "honey antimicrobial",
    "honeycomb",
    "bees",
    "food preservation",
    "ancient Egypt",
    "natural preservative",
    "scrollytelling",
    "interactive history",
  ],
  openGraph: {
    title: "Honey Never Spoils: The Eternal Elixir",
    description:
      "3,000-year-old honey from Egyptian tombs is still edible. Discover the science behind honey's immortality.",
    type: "article",
    images: [
      {
        url: "/og-images/honey-never-spoils.jpg",
        width: 1200,
        height: 630,
        alt: "Honey Never Spoils - The Eternal Elixir",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Honey Never Spoils: The Eternal Elixir",
    description:
      "3,000-year-old honey from Egyptian tombs is still edible. Discover the science behind honey's immortality.",
  },
};

export default function HoneyNeverSpoilsPage() {
  return (
    <ScrollytellingLayout
      title="Honey Never Spoils: The Eternal Elixir"
      description="Discover why 3,000-year-old honey found in Egyptian tombs is still perfectly edible."
      readTime="11 min"
    >
      <HoneyNeverSpoilsClient />
    </ScrollytellingLayout>
  );
}

