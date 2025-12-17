import { Metadata } from 'next';
import HowMoneyIsCreatedClient from './HowMoneyIsCreatedClient';

export const metadata: Metadata = {
  title: 'How Money Is Created: The Mechanics of Credit, Banking, and Monetary Systems | Esy',
  description: 'A mechanical, step-by-step explanation of how money is actually created in modern economies. Learn how commercial banks create money through lending, how central banks influence the system, and why "printing money" is an incomplete explanation.',
  keywords: [
    'money creation',
    'credit creation',
    'banking system',
    'central banking',
    'monetary policy',
    'quantitative easing',
    'money supply',
    'endogenous money',
    'fractional reserve banking',
    'economics',
    'visual essay',
    'process essay',
  ],
  openGraph: {
    title: 'How Money Is Created: The Mechanics of Credit, Banking, and Monetary Systems',
    description: 'A mechanical explanation of how money is actually created—through credit, not printing presses.',
    type: 'article',
    images: [
      {
        url: '/og/how-money-is-created.png',
        width: 1200,
        height: 630,
        alt: 'How Money Is Created - Visual Essay',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Money Is Created | Visual Essay',
    description: 'A mechanical explanation of how money is actually created—through credit, not printing presses.',
  },
};

export default function HowMoneyIsCreatedPage() {
  return <HowMoneyIsCreatedClient />;
}


