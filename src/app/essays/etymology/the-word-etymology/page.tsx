import type { Metadata } from 'next';
import TheWordEtymologyClient from './TheWordEtymologyClient';

export const metadata: Metadata = {
  title: 'Etymology: The Word That Dug Up Words | Esy',
  description:
    'A 2,500-year journey tracing the word "etymology" from ancient Greek philosophy to modern digital dictionaries. Discover how a word meaning "true sense" became the study of word origins.',
  keywords: [
    'etymology',
    'word origins',
    'linguistics',
    'philology',
    'language history',
    'Plato Cratylus',
    'Oxford English Dictionary',
    'Grimm\'s Law',
    'historical linguistics',
  ],
  openGraph: {
    title: 'Etymology: The Word That Dug Up Words',
    description:
      'A visual essay tracing 2,500 years of the word "etymology" — from Plato to the digital age.',
    type: 'article',
    url: 'https://esy.com/essays/etymology/the-word-etymology/',
    siteName: 'Esy',
    locale: 'en_US',
    images: [
      {
        url: 'https://esy.com/og/the-word-etymology.png',
        width: 1200,
        height: 630,
        alt: 'Etymology: The Word That Dug Up Words — Visual Essay',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Etymology: The Word That Dug Up Words',
    description:
      'A visual essay tracing 2,500 years of the word "etymology" — from Plato to the digital age.',
    images: ['https://esy.com/og/the-word-etymology.png'],
    site: '@EsyResearch',
  },
  alternates: {
    canonical: 'https://esy.com/essays/etymology/the-word-etymology/',
  },
};

export default function TheWordEtymologyPage() {
  return <TheWordEtymologyClient />;
}
