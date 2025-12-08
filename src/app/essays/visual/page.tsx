import { Metadata } from "next";
import { Suspense } from "react";
import VisualEssaysClient from "./VisualEssaysClient";

export const metadata: Metadata = {
  title: "Visual Essays - Interactive Essay Examples | Esy",
  description:
    "Explore visual essays that bring ideas to life through interactive storytelling. History, science, culture, and technology—essays reimagined with animation and narrative design.",
  keywords: [
    "visual essays",
    "interactive essays",
    "visual essay examples",
    "multimedia essays",
    "illustrated essays",
    "essay examples",
    "interactive storytelling",
    "educational essays",
  ],
  openGraph: {
    title: "Visual Essays - Interactive Essay Examples | Esy",
    description:
      "Essays that come alive as you explore. Discover history, science, and culture through beautifully crafted interactive narratives.",
    url: "https://esy.com/essays/visual",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visual Essays - Interactive Essay Examples | Esy",
    description:
      "Essays that come alive as you explore. Beautifully crafted interactive narratives.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function VisualEssaysPage() {
  return (
    <Suspense fallback={<div className="visual-essays-loading" />}>
      <VisualEssaysClient />
    </Suspense>
  );
}

