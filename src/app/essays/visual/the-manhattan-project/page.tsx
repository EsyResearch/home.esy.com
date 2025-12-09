import { Metadata } from "next";
import ManhattanProjectClient from "./ManhattanProjectClient";

export const metadata: Metadata = {
  title: "Now I Am Become Death: The Making of the Atomic Bomb | Esy",
  description:
    "A photo-driven visual essay chronicling humanity's most consequential scientific endeavor—the secret race to split the atom. From Einstein's 1939 letter to the ashes of Hiroshima, experience the Manhattan Project through declassified photographs and the faces of those who changed history.",
  keywords: [
    "Manhattan Project",
    "atomic bomb",
    "nuclear weapons",
    "Oppenheimer",
    "Trinity test",
    "Hiroshima",
    "Nagasaki",
    "Los Alamos",
    "World War II",
    "nuclear history",
    "Enrico Fermi",
    "Einstein letter",
    "visual essay",
    "historical documentary",
  ],
  openGraph: {
    title: "Now I Am Become Death: The Making of the Atomic Bomb",
    description:
      "The secret race to split the atom—told through declassified photographs and the faces of those who changed history forever.",
    url: "https://esy.com/essays/visual/the-manhattan-project",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Now I Am Become Death: The Making of the Atomic Bomb",
    description:
      "The Manhattan Project—told through declassified photographs. A visual essay about science, secrecy, and the bomb that ended one war and started another.",
  },
};

export default function TheManhattanProjectPage() {
  return <ManhattanProjectClient />;
}

