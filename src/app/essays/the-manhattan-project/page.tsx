import type { Metadata } from "next";
import ManhattanProjectClient from "./ManhattanProjectClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-manhattan-project/#article",
      "headline": "Now I Am Become Death: The Making of the Atomic Bomb",
      "alternativeHeadline": "The Secret Race to Split the Atom",
      "description":
        "A photo-driven visual essay chronicling humanity's most consequential scientific endeavor—the secret race to split the atom. From Einstein's 1939 letter to the ashes of Hiroshima, experience the Manhattan Project through declassified photographs and the faces of those who changed history.",
      "url": "https://esy.com/essays/the-manhattan-project/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-manhattan-project.png",
      "articleSection": "History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Manhattan Project", "item": "https://esy.com/essays/the-manhattan-project/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What was the Manhattan Project?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Manhattan Project was the secret U.S. government program (1942–1946) that developed the first nuclear weapons, involving over 125,000 workers at facilities across the country."
          }
        },
        {
          "@type": "Question",
          "name": "Who led the Manhattan Project?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "J. Robert Oppenheimer was the scientific director of the Los Alamos Laboratory, while General Leslie Groves oversaw the entire military-industrial operation."
          }
        },
        {
          "@type": "Question",
          "name": "What was the Trinity test?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Trinity was the code name for the first detonation of a nuclear device on July 16, 1945, in New Mexico. Its success confirmed the bomb's viability weeks before Hiroshima."
          }
        },
        {
          "@type": "Question",
          "name": "Why did Einstein write to Roosevelt?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In August 1939, Einstein signed a letter to President Roosevelt warning that Nazi Germany might develop atomic weapons, urging U.S. research—this letter helped launch the Manhattan Project."
          }
        },
        {
          "@type": "Question",
          "name": "What was the human cost of the atomic bombs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The atomic bombings of Hiroshima (August 6, 1945) and Nagasaki (August 9, 1945) killed an estimated 110,000–210,000 people immediately, with many more dying from radiation effects."
          }
        }
      ]
    }
  ]
};

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
    "historical documentary"
  ],
  openGraph: {
    title: "Now I Am Become Death: The Making of the Atomic Bomb",
    description:
      "The secret race to split the atom—told through declassified photographs and the faces of those who changed history forever.",
    type: "article",
    url: "https://esy.com/essays/the-manhattan-project/",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/the-manhattan-project.png",
        width: 1200,
        height: 630,
        alt: "Now I Am Become Death: The Making of the Atomic Bomb"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Now I Am Become Death: The Making of the Atomic Bomb",
    description:
      "The Manhattan Project—told through declassified photographs. A visual essay about science, secrecy, and the bomb that ended one war and started another.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/the-manhattan-project.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/the-manhattan-project/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  },
  category: "education",
  publisher: "Esy"
};

export default function TheManhattanProjectPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ManhattanProjectClient />
    </>
  );
}
