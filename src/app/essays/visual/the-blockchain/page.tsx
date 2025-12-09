import { Metadata } from "next";
import BlockchainClient from "./BlockchainClient";

export const metadata: Metadata = {
  title: "The Blockchain — How Digital Trust Transformed Money | Esy",
  description:
    "From cypherpunk dreams to global financial revolution. Explore the origins of P2P money, the mechanics of miners, and how blockchains work — through immersive animations and intuitive metaphors. Featuring David Chaum, Wei Dai, Satoshi Nakamoto, and the pioneers who reimagined trust.",
  openGraph: {
    title: "The Blockchain — How Digital Trust Transformed Money",
    description:
      "From cypherpunk dreams to global financial revolution. An immersive visual essay exploring P2P money, miners, and how blockchains work.",
    type: "article",
    authors: ["Esy"],
    images: [
      {
        url: "/og/the-blockchain.png",
        width: 1200,
        height: 630,
        alt: "The Blockchain Visual Essay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Blockchain — How Digital Trust Transformed Money",
    description:
      "From cypherpunk dreams to global financial revolution. An immersive visual essay exploring P2P money, miners, and how blockchains work.",
  },
  keywords: [
    "blockchain",
    "bitcoin",
    "cryptocurrency",
    "Satoshi Nakamoto",
    "peer-to-peer",
    "mining",
    "cryptography",
    "digital currency",
    "cypherpunk",
    "David Chaum",
    "Wei Dai",
    "hash",
    "decentralization",
    "ledger",
    "proof of work",
  ],
};

export default function BlockchainPage() {
  return <BlockchainClient />;
}

