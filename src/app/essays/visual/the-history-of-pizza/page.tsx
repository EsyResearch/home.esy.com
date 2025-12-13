import type { Metadata } from 'next';
import PizzaHistoryClient from './PizzaHistoryClient';

export const metadata: Metadata = {
  title: 'From Hearth to Heritage: The 10,000-Year Journey of Pizza | Esy',
  description: 'An immersive visual essay tracing pizza\'s complete history—from ancient flatbreads and the 997 CE first documentation through Naples street food, the Margherita legend, immigrant America, and the UNESCO-recognized artisanal renaissance.',
  keywords: [
    'history of pizza',
    'pizza origins',
    'Margherita pizza',
    'Raffaele Esposito',
    'Naples pizza',
    'Neapolitan pizza',
    'pizza etymology',
    'Lombardi pizza',
    'pizza history timeline',
    'UNESCO pizza',
    'visual essay',
    'food history'
  ],
  openGraph: {
    title: 'From Hearth to Heritage: The 10,000-Year Journey of Pizza',
    description: 'An immersive visual essay tracing humanity\'s most beloved food from ancient flatbreads to UNESCO cultural heritage.',
    type: 'article',
    images: [
      {
        url: '/images/pizza-history-og.jpg',
        width: 1200,
        height: 630,
        alt: 'The History of Pizza - A Visual Essay'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'From Hearth to Heritage: The 10,000-Year Journey of Pizza',
    description: 'An immersive visual essay tracing pizza\'s 10,000-year journey from ancient hearths to UNESCO recognition.'
  }
};

export default function PizzaHistoryPage() {
  return <PizzaHistoryClient />;
}


