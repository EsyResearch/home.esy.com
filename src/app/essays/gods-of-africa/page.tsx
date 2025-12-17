import { Metadata } from "next";
import GodsOfAfricaClient from "./GodsOfAfricaClient";

export const metadata: Metadata = {
  title: "Gods of Africa — A Journey from Light to Terror | Esy",
  description:
    "Explore the majestic creator deities, cunning tricksters, and terrifying entities of African mythology. From Olodumare's divine radiance to the nightmare of Popobawa—a visual journey across the continent's sacred traditions.",
  keywords: [
    "African mythology",
    "African gods",
    "Olodumare",
    "Nyame",
    "Anansi",
    "Eshu",
    "Yoruba religion",
    "Akan mythology",
    "Egyptian mythology",
    "Apophis",
    "Anubis",
    "Tikoloshe",
    "Popobawa",
    "African religion",
    "creator gods",
    "trickster gods",
    "visual essay",
    "mythology",
    "African art",
    "sacred traditions",
  ],
  openGraph: {
    title: "Gods of Africa — A Journey from Light to Terror",
    description:
      "From radiant creators to nightmare entities—explore African mythology through an immersive visual essay.",
    url: "https://esy.com/essays/gods-of-africa",
    type: "article",
    images: [
      {
        url: "/images/gods-of-africa/og-gods-of-africa.jpg",
        width: 1200,
        height: 630,
        alt: "Gods of Africa — A Journey from Light to Terror",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gods of Africa — A Journey from Light to Terror",
    description:
      "From radiant creators to nightmare entities—explore African mythology through an immersive visual essay.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GodsOfAfricaPage() {
  return <GodsOfAfricaClient />;
}

