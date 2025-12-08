import { Metadata } from "next";
import { Suspense } from "react";
import NgapiFermentedSoulClient from "./NgapiFermentedSoulClient";
import { ScrollytellingLayout } from "@/components/Scrollytelling";

export const metadata: Metadata = {
  title: "Ngapi: The Fermented Soul of Myanmar | Esy",
  description:
    "Why did Myanmar become the land of fermented fish? Discover how geography, rivers, and ancient wisdom transformed simple fish into the umami backbone of Burmese cuisine. An illustrated journey through 2,000 years of preservation and flavor.",
  keywords: [
    "ngapi",
    "Myanmar fish paste",
    "Burmese cuisine",
    "fermented fish",
    "Irrawaddy River",
    "fish preservation",
    "Southeast Asian food",
    "umami",
    "dried fish Myanmar",
    "Mon civilization food",
    "Pyu cuisine",
    "traditional fermentation",
  ],
  openGraph: {
    title: "Ngapi: The Fermented Soul of Myanmar",
    description:
      "Why did Myanmar become the land of fermented fish? An illustrated journey through geography, rivers, and 2,000 years of culinary wisdom.",
    url: "https://esy.com/essays/visual/ngapi-fermented-soul",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ngapi: The Fermented Soul of Myanmar",
    description: "How geography and ancient wisdom created Myanmar's most essential ingredient.",
  },
};

export default function NgapiFermentedSoulPage() {
  return (
    <Suspense
      fallback={
        <div className="ngapi-soul-loading">
          <div className="loading-pot" />
        </div>
      }
    >
      <ScrollytellingLayout
        title="Ngapi: The Fermented Soul"
        description="Why Myanmar Became the Land of Fermented Fish"
        readTime="18 min"
        storyId="ngapi-fermented-soul"
      >
        <NgapiFermentedSoulClient />
      </ScrollytellingLayout>
    </Suspense>
  );
}

