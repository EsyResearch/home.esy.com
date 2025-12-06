import { Metadata } from "next";
import TheForkClient from "./TheForkClient";
import { ScrollytellingLayout } from "@/components/Scrollytelling";

export const metadata: Metadata = {
  title: "Who Invented the Fork? A Journey Through Time | Esy Scrollytelling",
  description:
    "From ancient Mesopotamia to modern tables, discover the extraordinary 4,000-year journey of humanity's most revolutionary eating utensil. An immersive scrollytelling experience.",
  keywords:
    "who invented the fork, fork history, scrollytelling, interactive story, cutlery history, Byzantine Empire, Renaissance Italy, table manners history",
  openGraph: {
    title: "Who Invented the Fork? A Journey Through Time | Esy",
    description:
      "Discover the 4,000-year journey of the fork through an immersive scrollytelling experience.",
    url: "https://esy.com/scrollytelling/who-invented-the-fork",
  },
  twitter: {
    card: "summary_large_image",
    title: "Who Invented the Fork? A Journey Through Time | Esy",
    description:
      "Discover the 4,000-year journey of the fork through an immersive scrollytelling experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TheForkPage() {
  return (
    <ScrollytellingLayout
      title="The Fork: 4,000 Years of Revolution"
      description="From ancient Mesopotamia through Byzantine courts to your dinner table."
      readTime="12 min"
    >
      <TheForkClient />
    </ScrollytellingLayout>
  );
}

