import type { Metadata } from "next";
import OrwellsClient from "./OrwellsClient";

export const metadata: Metadata = {
  title: "The Architecture of Unfreedom: George Orwell's 1984 | Esy.com",
  description:
    "A photorealistic visual essay revealing how George Orwell built 1984 from the horrors he witnessed — Burma, Spain, the BBC, and Stalin's USSR. Every element of Oceania traced to its real-world origin.",
  keywords: [
    "1984",
    "George Orwell",
    "Nineteen Eighty-Four",
    "Big Brother",
    "totalitarianism",
    "surveillance",
    "Spanish Civil War",
    "Stalin",
    "visual essay",
    "scrollytelling",
    "Ministry of Truth",
    "Room 101",
    "doublethink",
    "thoughtcrime",
    "BBC propaganda",
    "Jura Scotland",
    "literary analysis",
    "historical biography",
  ],
  openGraph: {
    title: "The Architecture of Unfreedom: George Orwell's 1984",
    description:
      "How George Orwell built 1984 from the horrors he witnessed. Every element of Oceania traced to its real-world origin — Burma, Spain, the BBC, Stalin's USSR.",
    type: "article",
    authors: ["Esy.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Architecture of Unfreedom: George Orwell's 1984",
    description:
      "A photorealistic visual essay revealing the real-world origins of Oceania.",
  },
};

export default function OrwellsPage() {
  return <OrwellsClient />;
}
