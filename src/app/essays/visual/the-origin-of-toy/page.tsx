import type { Metadata } from "next";
import OriginOfToyClient from "./OriginOfToyClient";

export const metadata: Metadata = {
  title: "The Etymology of Play | How 'Toy' Traveled from Sin to Innocence | Esy",
  description:
    "Unravel the surprising etymology of 'toy'—a word that once meant amorous dalliance and worthless trifles before becoming synonymous with children's playthings. An immersive visual essay spanning seven centuries.",
  keywords: [
    "toy etymology",
    "word history",
    "plaything",
    "etymology",
    "language history",
    "medieval English",
    "Shakespeare",
    "childhood history",
    "toymaking",
    "Nuremberg toys",
    "dictionary history",
    "word origins",
    "linguistic evolution",
    "visual essay",
  ],
  openGraph: {
    title: "The Etymology of Play | Esy Visual Essay",
    description:
      "How 'toy' traveled from medieval scandal to childhood innocence—an immersive journey through seven centuries of linguistic transformation.",
    type: "article",
    url: "https://esy.com/essays/visual/the-origin-of-toy",
    images: [
      {
        url: "/og/the-origin-of-toy.jpg",
        width: 1200,
        height: 630,
        alt: "The Etymology of Play - Visual Essay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Etymology of Play | Esy",
    description:
      "Before 'toy' meant plaything, it meant scandal. An immersive visual essay on the word's surprising journey.",
  },
};

export default function OriginOfToyPage() {
  return <OriginOfToyClient />;
}




