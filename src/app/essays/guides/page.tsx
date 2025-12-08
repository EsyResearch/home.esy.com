import { Metadata } from "next";
import { Suspense } from "react";
import GuidesClient from "./GuidesClient";

export const metadata: Metadata = {
  title: "Essay Writing Guides - Learn to Write Better Essays | Esy",
  description:
    "Step-by-step interactive guides to master essay writing. Learn structure, thesis statements, introductions, arguments, and more through visual tutorials.",
  keywords: [
    "how to write an essay",
    "essay writing guide",
    "essay structure guide",
    "thesis statement guide",
    "essay writing tips",
    "academic writing guide",
    "essay introduction",
    "essay conclusion",
    "argumentative essay guide",
  ],
  openGraph: {
    title: "Essay Writing Guides - Learn to Write Better Essays | Esy",
    description:
      "Master essay writing with interactive step-by-step guides. From brainstorming to final draft.",
    url: "https://esy.com/essays/guides",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Essay Writing Guides | Esy",
    description:
      "Master essay writing with interactive step-by-step guides.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GuidesPage() {
  return (
    <Suspense fallback={<div className="guides-loading" />}>
      <GuidesClient />
    </Suspense>
  );
}

