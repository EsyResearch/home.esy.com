import { Metadata } from 'next';
import TheForkClient from './TheForkClient';

export const metadata: Metadata = {
  title: 'The Distance Between | A History of the Fork | Esy',
  description: 'The fork was once condemned as satanic vanity. Now it\'s invisible. An immersive photorealistic journey through 2,000 years of the utensil that measured civilization itself.',
  keywords: [
    'fork history',
    'eating utensils',
    'Byzantine Empire',
    'Catherine de Medici',
    'Thomas Coryat',
    'dining etiquette',
    'cultural history',
    'material culture',
    'visual essay',
    'photorealistic',
  ],
  openGraph: {
    title: 'The Distance Between: A History of the Fork',
    description: 'The fork was once condemned as satanic vanity. Now it\'s invisible. 2,000 years of civilization on a prong.',
    type: 'article',
    images: [
      {
        url: '/images/essays/the-fork-og.jpg',
        width: 1200,
        height: 630,
        alt: 'The Distance Between - A Visual Essay on the History of the Fork',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Distance Between | Visual Essay',
    description: 'The fork was once condemned as satanic vanity. Now it\'s invisible.',
  },
};

export default function TheForkPage() {
  return <TheForkClient />;
}








