import { Metadata } from "next";
import { Suspense } from "react";
import AlphabetTrainClient from "./AlphabetTrainClient";
import { ScrollytellingLayout } from "@/components/Scrollytelling";

export const metadata: Metadata = {
  title: "The Alphabet Adventure Train — Learn Your ABCs | Esy",
  description:
    "Join the magical Alphabet Adventure Train! A fun, interactive scrollytelling experience that teaches children ages 3-5 all 26 letters through colorful train carts, friendly characters, and phonics sounds.",
  keywords:
    "alphabet, ABC, letters, phonics, children's story, interactive learning, scrollytelling, preschool, kindergarten, early literacy, learn to read, educational",
  openGraph: {
    title: "The Alphabet Adventure Train — Learn Your ABCs",
    description:
      "All aboard! A magical train journey through the alphabet for young learners.",
    url: "https://esy.com/scrollytelling/alphabet-adventure-train",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Alphabet Adventure Train — Learn Your ABCs",
    description:
      "A magical train journey through the alphabet for ages 3-5.",
  },
};

export default function AlphabetTrainPage() {
  return (
    <Suspense fallback={<div className="alphabet-train-loading" />}>
      <ScrollytellingLayout
        title="The Alphabet Adventure Train"
        description="Learn your ABCs with a magical train ride!"
        readTime="15 min"
        storyId="alphabet-adventure-train"
      >
        <AlphabetTrainClient />
      </ScrollytellingLayout>
    </Suspense>
  );
}

