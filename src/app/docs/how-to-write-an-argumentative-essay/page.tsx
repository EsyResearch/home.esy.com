import { Metadata } from "next";
import HowToWriteAnArgumentativeEssayClient from "./HowToWriteAnArgumentativeEssayClient";

export const metadata: Metadata = {
  title: "How to Write an Argumentative Essay: Complete Guide | Esy",
  description:
    "Master argumentative essay writing with proven techniques. Learn structure, counterarguments, and evidence-based persuasion. Includes examples and AI assistance.",
  keywords:
    "how to write an argumentative essay, argumentative essay structure, persuasive writing, thesis argument, counterargument",
  openGraph: {
    title: "How to Write an Argumentative Essay | Esy",
    description:
      "Master persuasive writing with evidence, counterarguments, and strong thesis statements. Complete guide with examples.",
    url: "https://esy.com/docs/how-to-write-an-argumentative-essay",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Write an Argumentative Essay | Esy",
    description:
      "Master persuasive writing with evidence and counterarguments.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HowToWriteAnArgumentativeEssayPage() {
  return <HowToWriteAnArgumentativeEssayClient />;
}


