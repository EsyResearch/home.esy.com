import type { Metadata } from 'next';
import { TheBluesHistoryClient } from './TheBluesHistoryClient';

export const metadata: Metadata = {
  title: "The Blues: America's Haunted Foundation | Esy",
  description:
    'A documentary visual history of the blues—from its emergence in the post-emancipation South through its transformation into the foundation of virtually all American popular music.',
  keywords: [
    'blues history',
    'delta blues',
    'chicago blues',
    'african american music',
    'visual essay',
    'robert johnson',
    'muddy waters',
    'bessie smith',
    'american music history',
  ],
  openGraph: {
    title: "The Blues: America's Haunted Foundation",
    description:
      'A documentary visual history of the music that built America—from Delta cotton fields to Chicago clubs.',
    type: 'article',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Bessie_Smith_%281936%29_by_Carl_Van_Vechten.jpg',
        width: 559,
        height: 768,
        alt: 'Bessie Smith, 1936, by Carl Van Vechten - The Blues: America\'s Haunted Foundation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Blues: America's Haunted Foundation",
    description:
      'A documentary visual history of the music that built America.',
  },
  authors: [{ name: 'Esy' }],
  category: 'History',
};

export default function TheBluesHistoryPage() {
  return <TheBluesHistoryClient />;
}
