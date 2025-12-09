import { Metadata } from "next";
import LedgerClient from "./LedgerClient";

export const metadata: Metadata = {
  title: "The Ledger - How Humanity Learned to Trust an Idea | Esy",
  description:
    "From cowrie shells to cryptocurrency, explore 5,000 years of money's evolution. Discover how worthless objects became the foundation of civilization through trust, standardization, and abstraction.",
  keywords: [
    "history of money",
    "evolution of currency",
    "cowrie shells",
    "first coins",
    "Lydian coins",
    "paper money history",
    "Song Dynasty currency",
    "Bitcoin origins",
    "cryptocurrency history",
    "fiat money",
    "gold standard",
    "visual essay",
    "interactive storytelling",
  ],
  openGraph: {
    title: "The Ledger - How Humanity Learned to Trust an Idea | Esy",
    description:
      "From cowrie shells to cryptocurrency — 5,000 years of money's evolution in one immersive visual journey.",
    url: "https://esy.com/essays/visual/the-ledger",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Ledger - How Humanity Learned to Trust an Idea | Esy",
    description:
      "From cowrie shells to cryptocurrency — 5,000 years of money's evolution in one immersive visual journey.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LedgerPage() {
  return <LedgerClient />;
}

