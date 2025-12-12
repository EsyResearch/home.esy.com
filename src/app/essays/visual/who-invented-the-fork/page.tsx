import type { Metadata } from 'next';
import WhoInventedTheForkClient from './WhoInventedTheForkClient';

export const metadata: Metadata = {
  title: 'Who Invented the Fork? A History of the World\'s Most Controversial Utensil | Esy',
  description: 'Discover how a simple pronged tool went from "devil\'s instrument" to dining essential. A visual journey through 4,000 years of fork history, scandals, and surprising evolution.',
  keywords: [
    'who invented the fork',
    'fork history',
    'fork origin',
    'which fork is the salad fork',
    'what side does the fork go on',
    'Byzantine fork',
    'Catherine de Medici fork',
    'Thomas Coryat fork',
    'fork scandal',
    'dining utensil history',
    'culinary history',
    'table etiquette'
  ],
  openGraph: {
    title: 'Who Invented the Fork? | Esy Visual Essay',
    description: 'A 4,000-year journey from devil\'s tool to dinner essential. The surprising, scandalous history of the fork.',
    type: 'article',
    siteName: 'Esy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Who Invented the Fork?',
    description: 'The scandalous history of the world\'s most civilizing utensil.',
  },
};

export default function WhoInventedTheForkPage() {
  return <WhoInventedTheForkClient />;
}
