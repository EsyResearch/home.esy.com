import { Metadata } from "next";
import AnimalEtymologyClient from "./AnimalEtymologyClient";

/**
 * THE ORIGIN OF ANIMAL
 * ====================
 * A Photorealistic Visual Essay on the Etymology of "Animal"
 * 
 * From Latin "anima" (breath, soul) to modern zoological classification—
 * tracing 2,500 years of the word that defined life itself.
 */

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/visual/the-origin-of-animal#article",
      "headline": "ANIMA — The Origin of the Word Animal",
      "alternativeHeadline": "The Breath That Named the Living",
      "description": "From Latin 'anima' meaning breath and soul, to modern biology's kingdom classifications—trace the 2,500-year journey of the word 'animal' through philosophy, medieval bestiaries, and scientific revolution.",
      "url": "https://esy.com/essays/visual/the-origin-of-animal",
      "datePublished": "2025-12-12",
      "dateModified": "2025-12-12",
      "author": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com"
      },
      "image": "https://esy.com/og/animal-etymology.jpg",
      "articleSection": "History",
      "wordCount": 5000,
      "about": [
        {
          "@type": "Thing",
          "name": "Etymology"
        },
        {
          "@type": "Thing",
          "name": "Animal Kingdom"
        },
        {
          "@type": "Thing",
          "name": "Latin Language"
        }
      ],
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://esy.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Essays",
          "item": "https://esy.com/essays"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Visual Essays",
          "item": "https://esy.com/essays/visual"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "The Origin of Animal",
          "item": "https://esy.com/essays/visual/the-origin-of-animal"
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "ANIMA — The Origin of the Word Animal | Etymology Visual Essay",
  description: "From Latin 'anima' meaning breath and soul, to modern biology's kingdom classifications—trace the 2,500-year journey of the word 'animal' through philosophy, medieval bestiaries, and scientific revolution.",
  keywords: [
    "animal etymology",
    "origin of the word animal",
    "anima meaning",
    "Latin animal",
    "animalis",
    "word history",
    "etymology",
    "Aristotle animals",
    "medieval bestiary",
    "Linnaeus taxonomy",
    "biological classification",
    "visual essay"
  ],
  openGraph: {
    title: "ANIMA — The Origin of the Word Animal",
    description: "The word that named every creature that breathes. A 2,500-year etymology journey.",
    url: "https://esy.com/essays/visual/the-origin-of-animal",
    siteName: "Esy",
    type: "article",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/animal-etymology.jpg",
        width: 1200,
        height: 630,
        alt: "ANIMA — The etymology of the word Animal"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ANIMA — The Origin of the Word Animal",
    description: "From breath to beast: the 2,500-year journey of a word.",
    images: ["https://esy.com/og/animal-etymology.jpg"],
    creator: "@esywriting"
  },
  alternates: {
    canonical: "https://esy.com/essays/visual/the-origin-of-animal"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1
  },
  authors: [{ name: "Esy", url: "https://esy.com" }],
  publisher: "Esy",
  category: "education"
};

export default function AnimalEtymologyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnimalEtymologyClient />
    </>
  );
}


