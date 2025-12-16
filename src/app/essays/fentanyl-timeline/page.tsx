import type { Metadata } from "next";
import FentanylTimelineClient from "./FentanylTimelineClient";

export const metadata: Metadata = {
  title: "Fentanyl: A Timeline of a Synthetic Drug | Esy",
  description:
    "How did a hospital anesthetic become a leading cause of overdose deaths? A chronological examination of fentanyl's journey from medical innovation to public health crisis.",
  keywords: [
    "fentanyl",
    "opioid crisis",
    "synthetic opioids",
    "drug history",
    "public health",
    "overdose",
    "timeline",
  ],
  openGraph: {
    title: "Fentanyl: A Timeline of a Synthetic Drug",
    description:
      "How did a hospital anesthetic become a leading cause of overdose deaths?",
    type: "article",
    publishedTime: "2025-12-15",
    authors: ["Esy"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fentanyl: A Timeline of a Synthetic Drug",
    description:
      "How did a hospital anesthetic become a leading cause of overdose deaths?",
  },
};

export default function FentanylTimelinePage() {
  return <FentanylTimelineClient />;
}


