import { Metadata } from "next";
import HowToWriteAnInformativeEssayClient from "./HowToWriteAnInformativeEssayClient";

export const metadata: Metadata = {
  title: "How to Write an Informative Essay: Guide with Examples | Esy",
  description:
    "Master informative essay writing with our complete guide. Learn structure, research techniques, and objective writing. Includes examples and AI assistance.",
  keywords:
    "how to write an informative essay, informative essay structure, educational writing, factual essay, research essay",
  openGraph: {
    title: "How to Write an Informative Essay | Esy",
    description:
      "Master objective, factual writing with proven techniques and examples. Complete guide to informative essays.",
    url: "https://esy.com/docs/how-to-write-an-informative-essay",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Write an Informative Essay | Esy",
    description:
      "Master objective, factual writing with proven techniques.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HowToWriteAnInformativeEssayPage() {
  return <HowToWriteAnInformativeEssayClient />;
}


