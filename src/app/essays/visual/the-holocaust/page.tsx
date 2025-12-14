import { Metadata } from "next";
import HolocaustClient from "./HolocaustClient";

export const metadata: Metadata = {
  title: "Never Forget: Bearing Witness to the Holocaust | Esy",
  description:
    "The systematic murder of six million Jews and millions of others—told through the faces who lived it, died in it, and survived to testify. A photorealistic visual essay bearing witness to humanity's darkest chapter.",
  keywords: [
    "Holocaust",
    "Shoah",
    "Nazi Germany",
    "World War II",
    "genocide",
    "Anne Frank",
    "Elie Wiesel",
    "Auschwitz",
    "concentration camps",
    "Jewish history",
    "remembrance",
    "never forget",
    "antisemitism",
    "visual essay",
    "historical documentary",
  ],
  openGraph: {
    title: "Never Forget: Bearing Witness to the Holocaust",
    description:
      "The systematic murder of six million Jews—told through the faces who lived it, died in it, and survived to testify.",
    url: "https://esy.com/essays/visual/the-holocaust",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Never Forget: Bearing Witness to the Holocaust",
    description:
      "A visual essay bearing witness to humanity's darkest chapter. Six million names. Six million stories. Never forget.",
  },
};

export default function TheHolocaustPage() {
  return <HolocaustClient />;
}













