import { Metadata } from "next";
import BasketballHistoryClient from "./BasketballHistoryClient";
import { ScrollytellingLayout } from "@/components/Scrollytelling";

export const metadata: Metadata = {
  title: "The History of Basketball: From Peach Baskets to Global Phenomenon | Esy Scrollytelling",
  description:
    "Experience the 134-year journey of basketball from Dr. James Naismith's invention in 1891 to the modern NBA. An immersive scrollytelling experience through sports history.",
  keywords:
    "basketball history, James Naismith, NBA history, scrollytelling, interactive story, basketball origins, sports history, Michael Jordan, Dream Team",
  openGraph: {
    title: "The History of Basketball: From Peach Baskets to Global Phenomenon | Esy",
    description:
      "Experience the 134-year journey of basketball through an immersive scrollytelling experience.",
    url: "https://esy.com/scrollytelling/who-invented-basketball",
  },
  twitter: {
    card: "summary_large_image",
    title: "The History of Basketball | Esy Scrollytelling",
    description:
      "Experience the 134-year journey of basketball through an immersive scrollytelling experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HistoryOfBasketballPage() {
  return (
    <ScrollytellingLayout
      title="The Basketball Story: From Peach Baskets to Global Phenomenon"
      description="Dr. James Naismith's 1891 invention becomes billion-dollar arenas and worldwide phenomenon."
      readTime="10 min"
      storyId="who-invented-basketball"
    >
      <BasketballHistoryClient />
    </ScrollytellingLayout>
  );
}

