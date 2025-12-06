import { Metadata } from 'next';
import SneakerHistoryClient from './SneakerHistoryClient';
import { ScrollytellingLayout } from "@/components/Scrollytelling";

export const metadata: Metadata = {
  title: 'The History of the Sneaker | From Plimsolls to $75 Billion | Esy',
  description: 'How a rubber-soled shoe designed for silence became a $75 billion cultural force. From Charles Goodyear to Michael Jordan—the complete sneaker story.',
  keywords: [
    'sneaker history',
    'history of sneakers',
    'Air Jordan history',
    'Nike history',
    'Converse Chuck Taylor',
    'sneaker culture',
    'sneakerhead',
    'Run-DMC Adidas',
    'athletic footwear history'
  ],
  openGraph: {
    title: 'The Sneaker Story: From Plimsolls to Phenomenon',
    description: 'How a rubber-soled shoe designed for silence became a $75 billion cultural force that defines identity, status, and style.',
    type: 'article',
    url: 'https://esy.com/scrollytelling/who-invented-the-sneaker',
    images: [
      {
        url: '/og/sneaker-history.jpg',
        width: 1200,
        height: 630,
        alt: 'The History of the Sneaker'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Sneaker Story',
    description: 'From Charles Goodyear to Michael Jordan—the complete sneaker history.'
  }
};

export default function SneakerHistoryPage() {
  return (
    <ScrollytellingLayout
      title="The Sneaker Story: From Plimsolls to Phenomenon"
      description="How a rubber-soled shoe designed for silence became a $75 billion cultural force."
      readTime="12 min"
    >
      <SneakerHistoryClient />
    </ScrollytellingLayout>
  );
}

