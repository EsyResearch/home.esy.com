import { Metadata } from "next";
import { Suspense } from "react";
import FlavorsOfTheEastClient from "./FlavorsOfTheEastClient";

export const metadata: Metadata = {
  title: "Flavors of the East: A Culinary Journey Through Asia | Esy",
  description:
    "Explore the rich culinary history of China, Thailand, and Myanmar through an immersive scrollytelling experience. Discover how soy sauce, fish sauce, and fermented ingredients shaped Asian cuisine across centuries.",
  keywords:
    "Asian cuisine, culinary history, Chinese food, Thai food, Myanmar food, Pad Thai, Tom Yum, Mohinga, Lahpet, scrollytelling, food history, fermented foods, wok cooking",
  openGraph: {
    title: "Flavors of the East: A Culinary Journey Through Asia",
    description:
      "From ancient Chinese soy fermentation to Myanmar's fermented tea salad — taste is history, flavor is culture.",
    url: "https://esy.com/scrollytelling/flavors-of-the-east",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flavors of the East",
    description: "An immersive journey through Asian culinary history.",
  },
};

export default function FlavorsOfTheEastPage() {
  return (
    <Suspense
      fallback={
        <div className="flavors-loading">
          <div className="loading-steam" />
        </div>
      }
    >
      <FlavorsOfTheEastClient />
    </Suspense>
  );
}



