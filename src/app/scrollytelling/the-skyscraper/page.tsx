import type { Metadata } from 'next';
import SkyscraperClient from './SkyscraperClient';

export const metadata: Metadata = {
  title: 'The Skyscraper | Reaching for the Sky | Esy',
  description: 'From the 10-story Home Insurance Building to 163-floor Burj Khalifa — watch buildings construct floor-by-floor with elevator progress, steel frame animations, and height comparisons.',
  keywords: [
    'skyscraper history',
    'tall buildings',
    'Empire State Building',
    'Burj Khalifa',
    'architecture history',
    'Otis elevator',
    'steel frame construction',
    'Chicago school',
    'Art Deco',
    'scrollytelling'
  ],
  openGraph: {
    title: 'The Skyscraper | Reaching for the Sky',
    description: 'An elevator rises as you scroll through 139 years of vertical ambition — from 42m to 828m.',
    type: 'article',
    url: 'https://esy.com/scrollytelling/the-skyscraper',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Skyscraper | Reaching for the Sky',
    description: 'The complete history of skyscrapers from Chicago 1885 to Dubai 2010.',
  },
};

export default function TheSkyscraperPage() {
  return <SkyscraperClient />;
}

