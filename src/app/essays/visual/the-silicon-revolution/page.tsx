import { Metadata } from "next";
import SiliconRevolutionClient from "./SiliconRevolutionClient";
import { ogImage } from "./images";

export const metadata: Metadata = {
  title: "The Silicon Revolution: How a Tiny Switch Changed Everything | Esy",
  description:
    "A visual essay tracing the semiconductor industry from the 1947 transistor invention at Bell Labs to today's geopolitical chip wars. Explore the science, the visionaries, and why these tiny switches now shape the fate of nations.",
  keywords: [
    "semiconductor",
    "transistor",
    "silicon",
    "Moore's Law",
    "Intel",
    "TSMC",
    "chip manufacturing",
    "integrated circuit",
    "Bell Labs",
    "Gordon Moore",
    "Morris Chang",
    "CHIPS Act",
    "visual essay",
    "technology history",
    "microprocessor",
    "EUV lithography",
  ],
  openGraph: {
    title: "The Silicon Revolution: How a Tiny Switch Changed Everything",
    description:
      "From Bell Labs to billion-transistor chips—the visual story of the invention that powers everything.",
    url: "https://esy.com/essays/visual/the-silicon-revolution",
    type: "article",
    images: [
      {
        url: ogImage.src,
        width: 1200,
        height: 630,
        alt: ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Silicon Revolution",
    description:
      "How a laboratory curiosity became the foundation of modern civilization. A visual essay on semiconductors, science, and geopolitics.",
    images: [ogImage.src],
  },
};

export default function TheSiliconRevolutionPage() {
  return <SiliconRevolutionClient />;
}






