import { Metadata } from 'next';
import SodaHistoryClient from './SodaHistoryClient';

export const metadata: Metadata = {
  title: 'The Origins of Soda | From Pharmacy to Phenomenon | Esy',
  description: 'How carbonated water became humanity\'s favorite way to celebrate, refresh, and rebel. From Joseph Priestley\'s 1767 discovery to the Cola Wars—the complete fizzy history.',
  keywords: [
    'history of soda',
    'carbonated beverages history',
    'Coca-Cola history',
    'Pepsi history',
    'Joseph Priestley carbonation',
    'soda fountain history',
    'soft drink origins',
    'Cola Wars'
  ],
  openGraph: {
    title: 'The Origins of Soda: From Pharmacy to Phenomenon',
    description: 'How carbonated water became humanity\'s favorite way to celebrate, refresh, and rebel—one bubble at a time.',
    type: 'article',
    url: 'https://esy.com/scrollytelling/who-invented-soda',
    images: [
      {
        url: '/og/soda-history.jpg',
        width: 1200,
        height: 630,
        alt: 'The Origins of Soda'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Origins of Soda',
    description: 'From Joseph Priestley to the Cola Wars—the complete fizzy history.'
  }
};

export default function SodaHistoryPage() {
  return <SodaHistoryClient />;
}

