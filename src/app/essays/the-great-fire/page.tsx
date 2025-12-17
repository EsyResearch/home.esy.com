import { Metadata } from "next";
import GreatFireClient from "./GreatFireClient";

export const metadata: Metadata = {
  title: "The Great Fire of London: From Ashes to Empire | Esy",
  description:
    "Experience the catastrophic beauty of 1666—when a spark in Pudding Lane consumed medieval London and gave birth to the modern city. A visual essay of destruction, resilience, and Christopher Wren's architectural phoenix.",
  keywords:
    "Great Fire of London, 1666, Samuel Pepys, Christopher Wren, Pudding Lane, St Paul's Cathedral, Thomas Farriner, London history, fire history, city rebuilding, scrollytelling, visual essay",
  openGraph: {
    title: "The Great Fire of London: From Ashes to Empire | Esy",
    description:
      "Experience the catastrophic beauty of 1666—when a spark consumed medieval London and gave birth to the modern city.",
    type: "article",
    url: "https://esy.com/essays/the-great-fire",
    images: [
      {
        url: "/esy-logo.png",
        width: 1200,
        height: 630,
        alt: "The Great Fire of London Visual Essay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Great Fire of London: From Ashes to Empire",
    description:
      "Experience the catastrophic beauty of 1666 in this immersive visual essay.",
  },
};

export default function TheGreatFirePage() {
  return <GreatFireClient />;
}

