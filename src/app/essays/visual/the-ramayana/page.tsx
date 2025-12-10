import { Metadata } from "next";
import RamayanaClient from "./RamayanaClient";

export const metadata: Metadata = {
  title: "The Journey Home: The Ramayana in Art and Symbol | Esy",
  description:
    "Experience humanity's oldest quest narrative through 2,500 years of artistic interpretation—from Chola bronzes to Balinese shadow puppets, from Pahari miniatures to the temple walls of Angkor. An immersive scroll-driven visual essay.",
  keywords: [
    "Ramayana",
    "Hindu mythology",
    "Indian epic",
    "Rama",
    "Sita",
    "Hanuman",
    "Ravana",
    "dharma",
    "visual essay",
    "Indian art",
    "Pahari miniatures",
    "Chola bronze",
    "Angkor Wat",
    "mythology",
    "interactive storytelling",
    "Diwali",
    "Ram Lila",
    "Sanskrit epic",
    "Valmiki",
  ],
  openGraph: {
    title: "The Journey Home: The Ramayana in Art and Symbol",
    description:
      "Humanity's oldest quest narrative through 2,500 years of art—from Chola bronzes to Angkor reliefs. An immersive scroll-driven visual essay.",
    url: "https://esy.com/essays/visual/the-ramayana",
    type: "article",
    images: [
      {
        url: "/images/ramayana/og-ramayana.jpg",
        width: 1200,
        height: 630,
        alt: "The Journey Home: The Ramayana in Art and Symbol",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Journey Home: The Ramayana in Art and Symbol",
    description:
      "Experience the Ramayana through 2,500 years of art—an immersive visual essay.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RamayanaPage() {
  return <RamayanaClient />;
}







