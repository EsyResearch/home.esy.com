import type { Metadata } from "next";
import RwandaGenocideClient from "./RwandaGenocideClient";

export const metadata: Metadata = {
  title: "Kwibuka: A Hundred Days of Darkness, A Generation of Light | Esy",
  description:
    "How colonial division and international abandonment enabled the murder of one million Rwandans—and how a shattered nation chose reconciliation over revenge to become Africa's most remarkable transformation. A photorealistic visual essay bearing witness to the 1994 Genocide against the Tutsi.",
  keywords: [
    "Rwanda genocide",
    "1994 genocide",
    "Tutsi",
    "Hutu",
    "Kwibuka",
    "Paul Kagame",
    "Kigali",
    "genocide remembrance",
    "reconciliation",
    "Gacaca courts",
    "African history",
    "colonialism",
    "UN failure",
    "RPF",
    "East Africa",
    "never again",
    "visual essay",
    "scrollytelling",
  ],
  openGraph: {
    title: "Kwibuka: A Hundred Days of Darkness, A Generation of Light",
    description:
      "How colonial division and international abandonment enabled the murder of one million Rwandans—and how a shattered nation chose reconciliation over revenge.",
    type: "article",
    images: [
      {
        url: "/essays/rwanda-genocide-og.jpg",
        width: 1200,
        height: 630,
        alt: "Kwibuka - Rwanda Genocide Memorial Visual Essay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kwibuka: A Hundred Days of Darkness, A Generation of Light",
    description:
      "A photorealistic visual essay bearing witness to the 1994 Genocide against the Tutsi in Rwanda.",
  },
  authors: [{ name: "Esy" }],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RwandaGenocidePage() {
  return <RwandaGenocideClient />;
}

