import { Metadata } from "next";
import HowToWriteAnEssayConclusionClient from "./HowToWriteAnEssayConclusionClient";

export const metadata: Metadata = {
  title: "How to Write an Essay Conclusion: End with Impact | Esy",
  description:
    "Master essay conclusions that leave lasting impressions. Learn to synthesize arguments, restate thesis effectively, and end powerfully.",
  keywords:
    "how to write an essay conclusion, conclusion paragraph, ending an essay, final paragraph, concluding statements",
  openGraph: {
    title: "How to Write an Essay Conclusion | Esy",
    description:
      "End your essays with impact. Master synthesis, final thoughts, and powerful closing statements.",
    url: "https://esy.com/docs/how-to-write-an-essay-conclusion",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Write an Essay Conclusion | Esy",
    description:
      "End your essays with impact and leave readers convinced.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HowToWriteAnEssayConclusionPage() {
  return <HowToWriteAnEssayConclusionClient />;
}


