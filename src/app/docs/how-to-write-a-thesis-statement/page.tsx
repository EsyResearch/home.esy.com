import { Metadata } from "next";
import HowToWriteAThesisStatementClient from "./HowToWriteAThesisStatementClient";

export const metadata: Metadata = {
  title: "How to Write a Thesis Statement: Complete Guide | Esy",
  description:
    "Master thesis statement writing with proven techniques. Learn to craft clear, arguable, specific statements that anchor strong essays.",
  keywords:
    "how to write a thesis statement, thesis examples, strong thesis, essay thesis, argumentative thesis, thesis formula",
  openGraph: {
    title: "How to Write a Thesis Statement | Esy",
    description:
      "Craft clear, arguable thesis statements that anchor powerful essays. Complete guide with examples and formulas.",
    url: "https://esy.com/docs/how-to-write-a-thesis-statement",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Write a Thesis Statement | Esy",
    description:
      "Master thesis statement writing with proven techniques and examples.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HowToWriteAThesisStatementPage() {
  return <HowToWriteAThesisStatementClient />;
}


