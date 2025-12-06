import type { Metadata } from 'next';
import WineHistoryClient from './WineHistoryClient';
import { ScrollytellingLayout } from "@/components/Scrollytelling";

export const metadata: Metadata = {
  title: 'The Invention of Wine: 8,000 Years in a Glass | Esy',
  description: 'An immersive journey through 8,000 years of winemaking—from Neolithic Georgia to modern Bordeaux. Discover how fermented grapes became humanity\'s most civilized beverage.',
  keywords: [
    'history of wine',
    'wine invention',
    'ancient wine',
    'Georgia wine origin',
    'viticulture history',
    'Dionysus',
    'winemaking',
    'wine regions',
    'Bordeaux',
    'scrollytelling'
  ],
  openGraph: {
    title: 'The Invention of Wine: 8,000 Years in a Glass | Esy',
    description: 'From Neolithic Georgia to billion-dollar châteaux—the story of humanity\'s oldest fermented beverage.',
    type: 'article',
    locale: 'en_US',
    siteName: 'Esy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Invention of Wine: 8,000 Years in a Glass',
    description: 'Before writing, before the wheel—there was wine.',
  }
};

export default function WineHistoryPage() {
  return (
    <ScrollytellingLayout
      title="The Invention of Wine: 8,000 Years in a Glass"
      description="From Neolithic Georgia to billion-dollar châteaux—the story of humanity's oldest fermented beverage."
      readTime="11 min"
    >
      <WineHistoryClient />
    </ScrollytellingLayout>
  );
}

