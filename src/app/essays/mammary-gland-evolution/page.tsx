import type { Metadata } from 'next';
import MammaryGlandEvolutionClient from './MammaryGlandEvolutionClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/mammary-gland-evolution/#article",
      "headline": "Mammary Gland Evolution: An Anatomical Journey",
      "alternativeHeadline": "310 Million Years of the Organ That Defines Mammals",
      "description": "A detailed anatomical exploration of mammary gland evolution across species. From platypus milk patches to whale mammary slits — see how 310 million years shaped the defining organ of mammals.",
      "url": "https://esy.com/essays/mammary-gland-evolution/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/mammary-gland-evolution.png",
      "articleSection": "Science",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Mammary Gland Evolution", "item": "https://esy.com/essays/mammary-gland-evolution/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why are mammals called mammals?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The word 'mammal' comes from the Latin 'mamma' meaning breast. Linnaeus named the class Mammalia in 1758 because mammary glands—the ability to produce milk—are the defining characteristic shared by all 6,400+ mammal species, from platypuses to whales to humans."
          }
        },
        {
          "@type": "Question",
          "name": "How do platypuses produce milk without nipples?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Platypuses and echidnas (monotremes) have mammary glands but no nipples. Milk oozes through specialized skin patches where the fur is thinner. Babies lick milk directly off their mother's belly. This represents the ancient, transitional form of lactation before nipples evolved."
          }
        },
        {
          "@type": "Question",
          "name": "How do whales nurse underwater?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Whale mothers have mammary slits that protect the nipples. The mother actively squirts thick, fatty milk (up to 50% fat) into the calf's mouth. Nursing bouts are brief but frequent—baby blue whales consume 150+ gallons of milk daily and gain 200 pounds per day."
          }
        },
        {
          "@type": "Question",
          "name": "How did mammary glands evolve?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Mammary glands likely evolved from apocrine sweat glands about 310 million years ago. Early secretions may have kept eggs moist or provided antimicrobial protection. Over millions of years, these secretions became increasingly nutritious, eventually becoming true milk."
          }
        },
        {
          "@type": "Question",
          "name": "Why do male mammals have nipples?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nipples develop early in embryonic development before sex differentiation occurs. Both male and female embryos develop nipples from the same tissue (the mammary ridge or 'milk line'). Males keep nipples because there's no evolutionary pressure to lose them—they don't harm survival."
          }
        },
        {
          "@type": "Question",
          "name": "What is colostrum?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Colostrum is the first milk produced after birth, thick and yellowish with high concentrations of antibodies, immune cells, and growth factors. It provides passive immunity to newborns whose own immune systems aren't yet functional. All mammals produce colostrum before transitioning to mature milk."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'Mammary Gland Evolution | Anatomical Journey | Esy',
  description: 'A detailed anatomical exploration of mammary gland evolution across species. From platypus milk patches to whale mammary slits — see how 310 million years shaped the defining organ of mammals.',
  keywords: [
    'mammary gland anatomy',
    'breast anatomy',
    'lactation evolution',
    'milk production',
    'alveoli',
    'mammal evolution',
    'comparative anatomy',
    'platypus milk',
    'whale nursing',
    'human lactation'
  ],
  openGraph: {
    title: 'Mammary Gland Evolution | Anatomical Journey',
    description: 'A detailed anatomical exploration of how mammary glands evolved across 6,400+ mammalian species.',
    type: 'article',
    url: 'https://esy.com/essays/mammary-gland-evolution/',
    siteName: 'Esy',
    locale: 'en_US',
    images: [
      {
        url: 'https://esy.com/og/mammary-gland-evolution.png',
        width: 1200,
        height: 630,
        alt: 'Mammary Gland Evolution - Anatomical Journey'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mammary Gland Evolution | Anatomical Journey',
    description: 'A detailed anatomical exploration of mammary gland evolution.',
    site: '@EsyResearch',
    images: ['https://esy.com/og/mammary-gland-evolution.png']
  },
  alternates: {
    canonical: 'https://esy.com/essays/mammary-gland-evolution/'
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function MammaryGlandEvolutionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MammaryGlandEvolutionClient />
    </>
  );
}
