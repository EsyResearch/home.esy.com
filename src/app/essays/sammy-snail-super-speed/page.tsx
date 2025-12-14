import { Metadata } from "next";
import { Suspense } from "react";
import SammySnailClient from "./SammySnailClient";
import { ScrollytellingLayout } from "@/components/Scrollytelling";

export const metadata: Metadata = {
  title: "Sammy Snail's Super Speed Day — A Children's Adventure | Esy",
  description:
    "Join Sammy Snail on his magical super-speed adventure through the forest! A fun, interactive scrollytelling story about excitement, silliness, and learning that slow can be special too.",
  keywords:
    "children's story, interactive story, scrollytelling, Sammy Snail, speed, adventure, friendship, forest, ages 4-5, preschool",
  openGraph: {
    title: "Sammy Snail's Super Speed Day — A Children's Adventure",
    description:
      "A magical adventure where a tiny snail discovers super speed!",
    url: "https://esy.com/scrollytelling/sammy-snail-super-speed",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sammy Snail's Super Speed Day",
    description: "A fun adventure for ages 4-5 about a snail with super speed!",
  },
};

export default function SammySnailPage() {
  return (
    <Suspense fallback={<div className="sammy-loading" />}>
      <ScrollytellingLayout
        title="Sammy Snail's Super Speed Day"
        description="A magical speed adventure!"
        readTime="8 min"
        storyId="sammy-snail-super-speed"
      >
        <SammySnailClient />
      </ScrollytellingLayout>
    </Suspense>
  );
}

