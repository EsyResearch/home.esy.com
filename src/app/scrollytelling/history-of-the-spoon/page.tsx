import { Metadata } from "next";
import SpoonHistoryClient from "./SpoonHistoryClient";

export const metadata: Metadata = {
  title: "The History of the Spoon: 30,000 Years of Humanity's Essential Tool | Esy Scrollytelling",
  description:
    "From prehistoric bone carvings to modern stainless steel, discover the extraordinary 30,000-year journey of the spoon—humanity's oldest and most universal eating utensil. An immersive scrollytelling experience.",
  keywords:
    "spoon history, history of cutlery, eating utensils history, scrollytelling, interactive story, silver spoon origin, apostle spoons, teaspoon history, ancient spoons, medieval spoons",
  openGraph: {
    title: "The History of the Spoon: 30,000 Years | Esy Scrollytelling",
    description:
      "Discover the 30,000-year journey of the spoon through an immersive scrollytelling experience.",
    url: "https://esy.com/scrollytelling/history-of-the-spoon",
  },
  twitter: {
    card: "summary_large_image",
    title: "The History of the Spoon | Esy Scrollytelling",
    description:
      "Discover the 30,000-year journey of the spoon through an immersive scrollytelling experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HistoryOfTheSpoonPage() {
  return <SpoonHistoryClient />;
}

