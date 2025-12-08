import { Metadata } from "next";
import { Suspense } from "react";
import NgapiJourneyClient from "./NgapiJourneyClient";
import { ScrollytellingLayout } from "@/components/Scrollytelling";

export const metadata: Metadata = {
  title: "The Ngapi Journey: History & Evolution of Fish Paste in Myanmar | Esy",
  description:
    "Discover the ancient origins of ngapi, Myanmar's soul ingredient. From prehistoric fish fermentation to the umami backbone of Burmese cuisine — explore how geography, culture, and preservation shaped a nation's flavor.",
  keywords: [
    "ngapi",
    "Myanmar cuisine",
    "Burmese food",
    "fish paste",
    "fermentation",
    "Southeast Asian cuisine",
    "food history",
    "umami",
    "Mon civilization",
    "Pyu city-states",
    "Bamar kingdom",
    "mohinga",
    "Rakhine ngapi",
    "fermented fish",
    "Asian condiments",
  ],
  openGraph: {
    title: "The Ngapi Journey: History & Evolution of Fish Paste in Myanmar",
    description:
      "Ngapi is not just a seasoning — it is the historical, cultural, and emotional heart of Myanmar cuisine. Discover its ancient origins.",
    url: "https://esy.com/essays/visual/the-ngapi-journey",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Ngapi Journey",
    description: "Myanmar's soul ingredient: 2,000+ years of fermented fish paste history.",
  },
};

export default function NgapiJourneyPage() {
  return (
    <Suspense
      fallback={
        <div className="ngapi-loading">
          <div className="loading-ferment" />
        </div>
      }
    >
      <ScrollytellingLayout
        title="The Ngapi Journey"
        description="The History & Evolution of Fish Paste in Myanmar"
        readTime="16 min"
        storyId="the-ngapi-journey"
      >
        <NgapiJourneyClient />
      </ScrollytellingLayout>
    </Suspense>
  );
}

