import { Metadata } from 'next';
import OriginOfSexClient from './OriginOfSexClient';

export const metadata: Metadata = {
  title: 'The Word That Divided Everything | An Etymology of Sex | Esy',
  description: 'From Latin "secare" (to cut) to modern taboo—trace the 2,000-year journey of the word "sex" through civilizations, science, and scandal. A visual essay on language and desire.',
  keywords: [
    'etymology',
    'word history',
    'sex etymology',
    'linguistics',
    'Latin origins',
    'Linnaeus',
    'Freud',
    'language evolution',
    'word meaning',
    'visual essay',
    'typography',
  ],
  openGraph: {
    title: 'The Word That Divided Everything: An Etymology of Sex',
    description: 'How a Latin word meaning "to divide" became the most charged word in the English language. 2,000 years of transformation.',
    type: 'article',
    url: 'https://esy.com/essays/visual/the-origin-of-sex',
    siteName: 'Esy',
    locale: 'en_US',
    images: [
      {
        url: 'https://esy.com/og/the-origin-of-sex.png',
        width: 1200,
        height: 630,
        alt: 'SEX — In the beginning, there was division. A visual essay on the etymology of the word sex.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Word That Divided Everything | Visual Essay',
    description: 'The 2,000-year evolution of a single word—from sorting to scandal.',
    site: '@EsyResearch',
    images: ['https://esy.com/og/the-origin-of-sex.png'],
  },
  alternates: {
    canonical: 'https://esy.com/essays/visual/the-origin-of-sex/',
  },
};

export default function OriginOfSexPage() {
  return <OriginOfSexClient />;
}




