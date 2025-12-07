import { Metadata } from "next";
import { Suspense } from "react";
import ScrollytellingClient from "./ScrollytellingClient";

export const metadata: Metadata = {
  title: "Scrollytelling - Immersive Narrative Experiences | Esy",
  description:
    "Explore captivating stories told through scroll-based interactive experiences. Discover historical narratives, cultural journeys, and educational tales that come alive as you scroll.",
  keywords:
    "scrollytelling, interactive stories, narrative design, immersive storytelling, visual narratives, educational stories, interactive journalism",
  openGraph: {
    title: "Scrollytelling - Immersive Narrative Experiences | Esy",
    description:
      "Stories that come alive as you scroll. Explore history, culture, and ideas through beautifully crafted interactive narratives.",
    url: "https://esy.com/scrollytelling",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scrollytelling - Immersive Narrative Experiences | Esy",
    description:
      "Stories that come alive as you scroll. Explore beautifully crafted interactive narratives.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ScrollytellingPage() {
  return (
    <Suspense fallback={<div className="scrollytelling-loading" />}>
      <ScrollytellingClient />
    </Suspense>
  );
}

