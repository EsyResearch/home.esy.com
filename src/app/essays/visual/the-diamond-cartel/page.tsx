import type { Metadata } from 'next';
import DiamondCartelClient from './DiamondCartelClient';

export const metadata: Metadata = {
  title: 'A Diamond is Forever: The Manufactured Desire That Built an Empire | Esy',
  description: 'How De Beers convinced the world that love could be measured in carats—and built that illusion on colonial exploitation, artificial scarcity, and the blood of African miners.',
  keywords: [
    'De Beers',
    'diamond history',
    'blood diamonds',
    'diamond engagement rings',
    'a diamond is forever',
    'Cecil Rhodes',
    'diamond monopoly',
    'N.W. Ayer',
    'Frances Gerety',
    'conflict diamonds',
    'lab diamonds',
    'diamond industry',
    'manufactured desire',
    'marketing history'
  ],
  openGraph: {
    title: 'A Diamond is Forever: The Manufactured Desire That Built an Empire',
    description: 'How De Beers convinced the world that love could be measured in carats—and built that illusion on colonial exploitation, artificial scarcity, and the blood of African miners.',
    type: 'article',
    url: 'https://esy.com/essays/visual/the-diamond-cartel',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A Diamond is Forever: The Manufactured Desire That Built an Empire',
    description: 'The most successful marketing manipulation in history. A visual essay.',
  },
};

export default function DiamondCartelPage() {
  return <DiamondCartelClient />;
}




