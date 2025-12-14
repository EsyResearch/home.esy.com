import { Metadata } from "next";
import GridironClient from "./GridironClient";

export const metadata: Metadata = {
  title: "The Gridiron: How American Football Conquered America | Esy",
  description:
    "From deadly college brawls to 113 million Super Bowl viewers—the extraordinary story of how a chaotic rugby variant became America's most watched sport. Explore Walter Camp's revolution, the 1905 death crisis, and football's rise to cultural dominance.",
  keywords: [
    "american football history",
    "NFL history",
    "Walter Camp",
    "Super Bowl",
    "football origins",
    "gridiron",
    "college football",
    "football evolution",
    "sports history",
    "visual essay",
  ],
  openGraph: {
    title: "The Gridiron: How American Football Conquered America",
    description:
      "From deadly college brawls to 113 million Super Bowl viewers. The extraordinary story of American football.",
    url: "https://esy.com/essays/visual/the-gridiron",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Gridiron: How American Football Conquered America",
    description:
      "From deadly college brawls to 113 million Super Bowl viewers. The extraordinary story of American football.",
  },
};

export default function TheGridironPage() {
  return <GridironClient />;
}

