import { Metadata } from "next";
import ChairHistoryClient from "./ChairHistoryClient";

export const metadata: Metadata = {
  title: "Who Invented the Chair? The 5,000-Year History of Seating | Esy Scrollytelling",
  description:
    "From pharaohs' thrones to IKEA flat-packs, discover the surprisingly radical 5,000-year history of the chair. An immersive scrollytelling journey through furniture design history.",
  keywords:
    "chair history, who invented the chair, furniture design history, Thonet Chair No. 14, klismos chair, Eames chair, Bauhaus furniture, scrollytelling, history of seating",
  openGraph: {
    title: "Who Invented the Chair? | Esy Scrollytelling",
    description:
      "Discover the 5,000-year journey of the chair through an immersive scrollytelling experience.",
    url: "https://esy.com/scrollytelling/who-invented-the-chair",
  },
  twitter: {
    card: "summary_large_image",
    title: "Who Invented the Chair? | Esy Scrollytelling",
    description:
      "Discover the 5,000-year journey of the chair through an immersive scrollytelling experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function WhoInventedTheChairPage() {
  return <ChairHistoryClient />;
}

