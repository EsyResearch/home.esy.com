import { Metadata } from "next";
import { Suspense } from "react";
import StarsStoryClient from "./StarsStoryClient";
import { ScrollytellingLayout } from "@/components/Scrollytelling";

export const metadata: Metadata = {
  title: "The Night the Stars Fell — A Children's Story | Esy",
  description:
    "An interactive bedtime story about a brave little girl who helps a fallen star find its way home. Scroll to unfold the magic. A scrollytelling experience for children.",
  keywords:
    "children's story, bedtime story, interactive story, scrollytelling, stars, night sky, kids, picture book, digital story",
  openGraph: {
    title: "The Night the Stars Fell — A Children's Story",
    description:
      "An interactive bedtime story about a brave little girl who helps a fallen star find its way home. Scroll to unfold the magic.",
    url: "https://esy.com/scrollytelling/the-night-the-stars-fell",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Night the Stars Fell — A Children's Story",
    description:
      "An interactive bedtime story. Scroll to unfold the magic.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TheNightTheStarsFellPage() {
  return (
    <Suspense fallback={<div className="stars-story-loading" />}>
      <ScrollytellingLayout
        title="The Night the Stars Fell"
        description="A children's story"
        readTime="5 min"
        storyId="the-night-the-stars-fell"
      >
        <StarsStoryClient />
      </ScrollytellingLayout>
    </Suspense>
  );
}



