import { Metadata } from "next";
import { FlashlightBuilderClient } from "./FlashlightBuilderClient";

export const metadata: Metadata = {
  title: "Build Your Own LED Flashlight | Esy",
  description:
    "An interactive experience where you choose components, understand the physics, and build a working digital flashlight. Your decisions shape the final artifact.",
  openGraph: {
    title: "Build Your Own LED Flashlight",
    description:
      "Choose components, understand the tradeoffs, and create a working digital flashlight.",
    type: "article",
    images: [
      {
        url: "/og/build-a-flashlight.png",
        width: 1200,
        height: 630,
        alt: "Build Your Own LED Flashlight - Interactive Essay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Build Your Own LED Flashlight",
    description:
      "Choose components, understand the tradeoffs, and create a working digital flashlight.",
    images: ["/og/build-a-flashlight.png"],
  },
  keywords: [
    "LED flashlight",
    "electronics",
    "Ohm's law",
    "interactive learning",
    "circuit design",
    "educational",
    "STEM",
    "maker",
  ],
};

export default function BuildAFlashlightPage() {
  return <FlashlightBuilderClient />;
}
