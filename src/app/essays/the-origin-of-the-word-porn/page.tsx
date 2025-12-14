import { Metadata } from 'next';
import OriginOfPornClient from './OriginOfPornClient';

export const metadata: Metadata = {
  title: 'Πόρνη: The Etymology of a Forbidden Word | Esy Visual Essays',
  description: 'From ancient Greek slave markets to modern digital discourse—trace the 2,500-year journey of a word that society couldn\'t stop using or openly discuss.',
  keywords: [
    'etymology',
    'word origin',
    'pornography history',
    'Greek language',
    'linguistic history',
    'cultural history',
    'Victorian era',
    'word evolution',
    'visual essay',
  ],
  openGraph: {
    title: 'Πόρνη: The Etymology of a Forbidden Word',
    description: 'From ancient Greek slave markets to modern discourse—the linguistic journey of a word that shaped cultural taboos.',
    type: 'article',
    images: [
      {
        url: '/images/essays/origin-of-porn-og.jpg',
        width: 1200,
        height: 630,
        alt: 'The Origin of the Word Porn - A Visual Essay on Etymology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Πόρνη: Etymology of a Forbidden Word | Visual Essay',
    description: 'The 2,500-year journey of a word society couldn\'t stop using or openly discuss.',
  },
};

export default function OriginOfPornPage() {
  return <OriginOfPornClient />;
}



