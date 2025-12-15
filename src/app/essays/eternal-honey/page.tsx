import { Metadata } from "next";
import EternalHoneyClient from "./EternalHoneyClient";

export const metadata: Metadata = {
  title: "Eternal Honey: Into the Pyramid | Esy",
  description:
    "Descend into the Great Pyramid of Giza where 3,000-year-old honey was discovered still perfectly edible. A parallax journey through Egyptian tombs and the science of honey's immortality.",
  keywords: [
    "eternal honey",
    "Egyptian pyramid",
    "Tutankhamun tomb",
    "honey never spoils",
    "Great Pyramid of Giza",
    "Howard Carter discovery",
    "ancient Egypt honey",
    "honey preservation science",
    "archaeological discovery",
    "scrollytelling",
    "parallax experience",
    "interactive history",
  ],
  openGraph: {
    title: "Eternal Honey: Into the Pyramid",
    description:
      "Descend into the Great Pyramid where 3,000-year-old honey was found still edible. A parallax journey through tombs and science.",
    type: "article",
    images: [
      {
        url: "/og-images/eternal-honey.jpg",
        width: 1200,
        height: 630,
        alt: "Eternal Honey - Pyramid Edition",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eternal Honey: Into the Pyramid",
    description:
      "Descend into the Great Pyramid where 3,000-year-old honey was found still edible.",
  },
};

export default function EternalHoneyPage() {
  return <EternalHoneyClient />;
}

