import { Metadata } from "next";
import { Suspense } from "react";
import MonsterStoryClient from "./MonsterStoryClient";

export const metadata: Metadata = {
  title: "The Monster Under My Bed — A Children's Story | Esy",
  description:
    "An interactive bedtime story about a child who discovers the monster under their bed is actually afraid of the dark. A heartwarming tale of unlikely friendship.",
  keywords:
    "children's story, bedtime story, interactive story, scrollytelling, monster, friendship, fear of the dark, kids",
  openGraph: {
    title: "The Monster Under My Bed — A Children's Story",
    description:
      "An interactive bedtime story about a child who discovers the monster under their bed is actually afraid of the dark.",
    url: "https://esy.com/scrollytelling/the-monster-under-my-bed",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Monster Under My Bed — A Children's Story",
    description:
      "A heartwarming tale of unlikely friendship.",
  },
};

export default function MonsterStoryPage() {
  return (
    <Suspense fallback={<div className="monster-story-loading" />}>
      <MonsterStoryClient />
    </Suspense>
  );
}






