import { Metadata } from 'next';
import OriginOfBreadClient from './OriginOfBreadClient';

export const metadata: Metadata = {
  title: 'The Origin of Bread: A Cinematic History of Humanity\'s First Food | Esy',
  description: 'A mythic and scientific journey through 30,000 years. Grain falls through darkness, landing on stone. Civilization begins when hunger meets imagination.',
  keywords: [
    'bread history',
    'origin of bread',
    'ancient grains',
    'einkorn',
    'emmer',
    'fermentation discovery',
    'neolithic food',
    'first bread',
    'wild yeast',
    'saccharomyces',
    'culinary anthropology',
    'food history'
  ],
  openGraph: {
    title: 'The Origin of Bread: A Cinematic History',
    description: 'Grain falls through darkness. Civilization begins when hunger meets imagination.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Origin of Bread',
    description: 'A mythic journey through 30,000 years of humanity\'s first food.',
  },
};

export default function OriginOfBreadPage() {
  return <OriginOfBreadClient />;
}
