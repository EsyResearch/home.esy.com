import { Metadata } from "next";
import BicycleHistoryClient from "./BicycleHistoryClient";
import { ScrollytellingLayout } from "@/components/Scrollytelling";

export const metadata: Metadata = {
  title: "Who Invented the Bicycle? The 200-Year Story of Two Wheels | Esy Scrollytelling",
  description:
    "From Karl von Drais's 1817 running machine to modern carbon fiber racers, discover the fascinating 200-year history of the bicycle. An immersive scrollytelling journey through the invention that changed the world.",
  keywords:
    "bicycle history, who invented the bicycle, Karl von Drais, velocipede, penny-farthing, safety bicycle, scrollytelling, cycling history, Tour de France, women's liberation bicycle",
  openGraph: {
    title: "Who Invented the Bicycle? | Esy Scrollytelling",
    description:
      "Discover the 200-year journey of the bicycle through an immersive scrollytelling experience.",
    url: "https://esy.com/scrollytelling/who-invented-the-bicycle",
  },
  twitter: {
    card: "summary_large_image",
    title: "Who Invented the Bicycle? | Esy Scrollytelling",
    description:
      "Discover the 200-year journey of the bicycle through an immersive scrollytelling experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function WhoInventedTheBicyclePage() {
  return (
    <ScrollytellingLayout
      title="Who Invented the Bicycle? The 200-Year Story"
      description="From Karl von Drais's running machine to modern carbon fiber racers."
      readTime="10 min"
      storyId="who-invented-the-bicycle"
    >
      <BicycleHistoryClient />
    </ScrollytellingLayout>
  );
}

