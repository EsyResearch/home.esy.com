import type { Metadata } from 'next';
import MammaryGlandsClient from './MammaryGlandsClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/evolution-of-mammary-glands/#article",
      "headline": "Evolution of Mammary Glands: 310 Million Years of Milk",
      "alternativeHeadline": "How a Simple Skin Secretion Became the Defining Feature of Mammals",
      "description": "How a simple skin secretion evolved into the most sophisticated infant nutrition system on Earth. Explore 310 million years of mammary gland evolution with interactive SVG animations.",
      "url": "https://esy.com/essays/evolution-of-mammary-glands/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/evolution-of-mammary-glands.png",
      "articleSection": "Science",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Evolution of Mammary Glands", "item": "https://esy.com/essays/evolution-of-mammary-glands/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How did mammary glands evolve?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Mammary glands evolved from modified sweat glands (apocrine glands) about 310 million years ago. Early proto-mammals likely secreted antimicrobial fluids to keep eggs moist. Over millions of years, these secretions became increasingly nutritious, eventually evolving into true milk."
          }
        },
        {
          "@type": "Question",
          "name": "What is α-lactalbumin and why is it important?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "α-lactalbumin is a key milk protein that evolved from lysozyme, an ancient antimicrobial enzyme. This evolutionary repurposing allowed milk to synthesize lactose, making it more nutritious. It's a remarkable example of how existing proteins can be modified for completely new functions."
          }
        },
        {
          "@type": "Question",
          "name": "How do monotremes produce milk without nipples?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Monotremes like platypuses and echidnas have mammary glands but no nipples—they represent an ancient stage of mammary evolution. Milk oozes through specialized skin patches, and babies lap it directly from the fur. This shows milk production evolved before the nipple did."
          }
        },
        {
          "@type": "Question",
          "name": "Why can some adults drink milk while others cannot?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Lactase persistence—the ability to digest lactose as an adult—evolved independently in several human populations that practiced dairy farming. Most mammals lose the ability to digest lactose after weaning. About 35% of humans worldwide can drink milk as adults, mostly those with Northern European, Middle Eastern, or East African ancestry."
          }
        },
        {
          "@type": "Question",
          "name": "How does milk composition vary between mammals?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Milk composition varies dramatically based on species needs. Whale milk is 50% fat (to insulate calves in cold water), while human milk is only 4% fat but rich in oligosaccharides that feed beneficial gut bacteria. Seal pups can gain 4 kg per day on their mother's ultra-rich milk."
          }
        },
        {
          "@type": "Question",
          "name": "What makes mammary glands unique among organs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Mammary glands are the only organ that defines an entire class of animals (Mammalia). They're also unique in being fully functional only part of the time—developing during pregnancy and lactation, then regressing afterward. This cycle can repeat multiple times throughout life."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'Evolution of Mammary Glands | 310 Million Years of Milk | Esy',
  description: 'How a simple skin secretion evolved into the most sophisticated infant nutrition system on Earth. Explore 310 million years of mammary gland evolution with interactive SVG animations.',
  keywords: [
    'mammary gland evolution',
    'lactation history',
    'milk evolution',
    'mammal evolution',
    'α-lactalbumin',
    'lactase persistence',
    'human milk',
    'monotreme marsupial placental',
    'scrollytelling',
    'biology'
  ],
  openGraph: {
    title: 'Evolution of Mammary Glands | 310 Million Years of Milk',
    description: 'How a simple skin secretion became the defining feature of mammals. Interactive scrollytelling experience.',
    type: 'article',
    url: 'https://esy.com/essays/evolution-of-mammary-glands/',
    siteName: 'Esy',
    locale: 'en_US',
    images: [
      {
        url: 'https://esy.com/og/evolution-of-mammary-glands.png',
        width: 1200,
        height: 630,
        alt: 'Evolution of Mammary Glands - 310 Million Years of Milk'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Evolution of Mammary Glands | 310 Million Years of Milk',
    description: 'How a simple skin secretion became the defining feature of mammals.',
    site: '@EsyResearch',
    images: ['https://esy.com/og/evolution-of-mammary-glands.png']
  },
  alternates: {
    canonical: 'https://esy.com/essays/evolution-of-mammary-glands/'
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function EvolutionOfMammaryGlandsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MammaryGlandsClient />
    </>
  );
}
