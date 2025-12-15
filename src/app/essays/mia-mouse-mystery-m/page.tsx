import type { Metadata } from "next";
import { Suspense } from "react";
import MiaMouseClient from "./MiaMouseClient";

export const metadata: Metadata = {
  title: "Mia Mouse and the Mystery M — A Children's Story | Esy",
  description:
    "Follow curious Mia Mouse as she discovers mysterious M-shaped crumbs leading to a wonderful surprise! An interactive scrollytelling story for ages 3-6.",
  keywords:
    "children's story, interactive story, letter M, ages 3-6, early reader, scrollytelling, friendship story, picture book, Mia Mouse, counting",
  openGraph: {
    title: "Mia Mouse and the Mystery M — A Children's Story",
    description:
      "An interactive scrollytelling adventure about curiosity and friendship for ages 3-6",
    url: "https://esy.com/scrollytelling/mia-mouse-mystery-m",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mia Mouse and the Mystery M — A Children's Story",
    description:
      "Follow curious Mia Mouse on an adventure of curiosity and friendship!",
  },
};

export default function MiaMousePage() {
  return (
    <Suspense fallback={<div className="mia-mouse-story-loading" />}>
      <MiaMouseClient />
    </Suspense>
  );
}

