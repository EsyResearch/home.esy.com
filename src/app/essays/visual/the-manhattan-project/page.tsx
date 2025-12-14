import ManhattanProjectClient from "./ManhattanProjectClient";
import { createVisualEssayMetadata } from "@/lib/visual-essay-metadata";

export const metadata = createVisualEssayMetadata({
  slug: "the-manhattan-project",
  title: "Now I Am Become Death: The Making of the Atomic Bomb | Esy",
  description:
    "A photo-driven visual essay chronicling humanity's most consequential scientific endeavor—the secret race to split the atom. From Einstein's 1939 letter to the ashes of Hiroshima, experience the Manhattan Project through declassified photographs and the faces of those who changed history.",
  ogTitle: "Now I Am Become Death: The Making of the Atomic Bomb",
  ogDescription:
    "The secret race to split the atom—told through declassified photographs and the faces of those who changed history forever.",
  twitterDescription:
    "The Manhattan Project—told through declassified photographs. A visual essay about science, secrecy, and the bomb that ended one war and started another.",
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
  imageAlt:
    "Now I Am Become Death: The Making of the Atomic Bomb - Visual Essay Preview",
});

export default function TheManhattanProjectPage() {
  return <ManhattanProjectClient />;
}

