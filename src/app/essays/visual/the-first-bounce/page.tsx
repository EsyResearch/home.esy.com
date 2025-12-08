import { Metadata } from "next";
import FirstBounceClient from "./FirstBounceClient";
import { ScrollytellingLayout } from "@/components/Scrollytelling";

export const metadata: Metadata = {
  title: "The First Bounce: A Cinematic History of Basketball's Invention | Esy",
  description:
    "Experience the mythic story of basketball's birth in a winter gymnasium. From James Naismith's desperate search for an indoor game to a global phenomenon—an immersive visual essay.",
  keywords:
    "basketball invention, James Naismith, 1891, Springfield Massachusetts, YMCA, peach basket, sports history, scrollytelling, visual essay, basketball origins",
  openGraph: {
    title: "The First Bounce: A Cinematic History of Basketball's Invention | Esy",
    description:
      "Experience the mythic story of basketball's birth through an immersive visual essay.",
    url: "https://esy.com/essays/visual/the-first-bounce",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "The First Bounce | Esy Visual Essay",
    description:
      "A cinematic journey through basketball's invention—from peach baskets to global phenomenon.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TheFirstBouncePage() {
  return (
    <ScrollytellingLayout
      title="The First Bounce"
      description="A cinematic history of basketball's invention—from desperate necessity to global phenomenon."
      readTime="15 min"
      storyId="the-first-bounce"
    >
      <FirstBounceClient />
    </ScrollytellingLayout>
  );
}

