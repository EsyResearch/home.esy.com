import { Metadata } from "next";
import LedgerOfTrustClient from "./LedgerOfTrustClient";

export const metadata: Metadata = {
  title: "The Ledger of Trust — A Visual Journey Through the Blockchain | Esy",
  description:
    "An immersive, scroll-driven visual essay that demystifies blockchain technology through cinematic storytelling, intuitive metaphors, and sophisticated micro-interactions. Trace the lineage from humanity's earliest ledgers through the cypherpunk movement to Bitcoin's emergence.",
  openGraph: {
    title: "The Ledger of Trust — A Visual Journey Through the Blockchain",
    description:
      "Demystifying blockchain through cinematic storytelling. From cowrie shells to cryptography, discover how a chain of blocks rebuilt trust in a trustless world.",
    type: "article",
    authors: ["Esy"],
    images: [
      {
        url: "/og/ledger-of-trust.png",
        width: 1200,
        height: 630,
        alt: "The Ledger of Trust Visual Essay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Ledger of Trust — A Visual Journey Through the Blockchain",
    description:
      "Demystifying blockchain through cinematic storytelling. From cowrie shells to cryptography.",
  },
  keywords: [
    "blockchain",
    "bitcoin",
    "cryptocurrency",
    "Satoshi Nakamoto",
    "cypherpunk",
    "David Chaum",
    "Wei Dai",
    "Nick Szabo",
    "Hal Finney",
    "Eric Hughes",
    "Adam Back",
    "proof of work",
    "mining",
    "cryptography",
    "decentralization",
    "double spend",
    "genesis block",
    "consensus",
    "distributed ledger",
    "peer-to-peer",
  ],
};

export default function LedgerOfTrustPage() {
  return <LedgerOfTrustClient />;
}



