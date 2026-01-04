import type { Metadata } from 'next';
import WhyVenezuelaMattersClient from './WhyVenezuelaMattersClient';

export const metadata: Metadata = {
  title: 'Why Venezuela Matters: Oil, Refineries & Power | Esy',
  description:
    'Why does Venezuela matter? A visual essay explaining heavy crude oil, Gulf Coast refineries, and Operation Absolute Resolve. Clear analysis, cited sources.',
  keywords: [
    'Venezuela',
    'Operation Absolute Resolve',
    'Maduro',
    'heavy crude oil',
    'Gulf Coast refineries',
    'Monroe Doctrine',
    'PDVSA',
    'Orinoco Belt',
    'U.S. foreign policy',
    'international law',
  ],
  openGraph: {
    title: 'Why Venezuela Matters: Oil, Refineries & Power',
    description:
      'A visual systems essay explaining the forces behind Operation Absolute Resolve and the capture of Nicolas Maduro.',
    type: 'article',
    publishedTime: '2026-01-03T23:00:00Z',
    modifiedTime: '2026-01-03T23:00:00Z',
    authors: ['Esy'],
    tags: ['Venezuela', 'Oil', 'Geopolitics', 'International Law'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Venezuela Matters: Oil, Refineries & Power',
    description:
      'A visual essay on Venezuela\'s oil, Gulf Coast refining, and Operation Absolute Resolve.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/essays/why-venezuela-matters',
  },
};

// Article Schema
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Why Venezuela Matters: Oil, Refineries, and Power in the Western Hemisphere',
  description:
    'A visual systems essay explaining the forces behind Operation Absolute Resolve and the capture of Nicolas Maduro.',
  image: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Orinoco_Oil_Belt.png',
  author: {
    '@type': 'Organization',
    name: 'Esy',
    url: 'https://esy.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Esy',
    logo: {
      '@type': 'ImageObject',
      url: 'https://esy.com/logo.png',
    },
  },
  datePublished: '2026-01-03',
  dateModified: '2026-01-03',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://esy.com/essays/why-venezuela-matters',
  },
  articleSection: 'Visual Essays',
  keywords: ['Venezuela', 'Oil', 'Heavy Crude', 'Gulf Coast Refineries', 'Operation Absolute Resolve', 'Maduro'],
};

// FAQ Schema
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Was the Venezuela operation legal under U.S. law and international law?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Both are contested. U.S. law: The administration claims Article II authority; critics say Congress should have authorized. International law: The UN Charter prohibits use of force except in self-defense or with Security Council authorization. Neither applies here.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the Venezuela intervention about oil, drugs, democracy, or all three?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All three. The formal justification is narco-terrorism. The political justification is restoring democracy after disputed elections. The structural reality is that Venezuela has oil U.S. refineries need. These motives are not mutually exclusive.',
      },
    },
    {
      '@type': 'Question',
      name: 'What changes if leaders can be seized abroad?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This is the precedent question. If sovereignty can be violated for drug charges, what limits exist? The UN Security Council will debate this. The answer will emerge over years, not days.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens to PDVSA, ports, and exports?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Uncertain. PDVSA facilities reportedly operated normally after the strikes. But exports were already halted under the blockade. Who controls export decisions remains unclear.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do refineries care about heavy crude specifically?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gulf Coast refineries were built with billions in specialized equipment (cokers, hydrocrackers) designed for heavy sour crude. U.S. shale produces light sweet crude — a different product. They are not interchangeable.',
      },
    },
    {
      '@type': 'Question',
      name: 'What would a clean exit from Venezuela require?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'At minimum: legitimate successor government, military cooperation, PDVSA operational control, clarified sanctions, international recognition, and resolution of legal challenges. Each has dependencies.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the risks of escalation in Venezuela?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Military fragmentation, proxy resistance from Cuba/Russia/China, cyber attacks on U.S. infrastructure, migration surge, regional diplomatic breakdown, and extended occupation costs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How should I evaluate social media videos and images about Venezuela right now?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'With extreme skepticism. AI-generated images of Maduro\'s arrest have been confirmed circulating. Old footage from 2024 has been recycled as current. Look for wire service (Reuters, AP) sourcing. When in doubt, wait.',
      },
    },
  ],
};

export default function WhyVenezuelaMattersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <WhyVenezuelaMattersClient />
    </>
  );
}
