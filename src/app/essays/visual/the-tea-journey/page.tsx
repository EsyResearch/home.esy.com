import type { Metadata } from 'next';
import TeaJourneyClient from './TeaJourneyClient';
import { ScrollytellingLayout } from "@/components/Scrollytelling";

export const metadata: Metadata = {
  title: 'Leaves of Time: The Global Journey of Tea | Esy',
  description: 'An immersive journey through 5,000 years of tea history—from wild mountain leaves in ancient China to the world\'s most consumed beverage after water. Discover how a simple leaf shaped empires, sparked revolutions, and connected cultures across continents.',
  keywords: [
    'history of tea',
    'tea origins',
    'Chinese tea',
    'Japanese tea ceremony',
    'matcha history',
    'British tea culture',
    'Boston Tea Party',
    'Silk Road tea trade',
    'Assam tea',
    'Darjeeling',
    'Ceylon tea',
    'oolong',
    'pu-erh',
    'Camellia sinensis',
    'tea ceremony',
    'chai',
    'scrollytelling'
  ],
  openGraph: {
    title: 'Leaves of Time: The Global Journey of Tea | Esy',
    description: 'From wild mountain leaves to world dominance—5,000 years of tea history in one immersive journey.',
    type: 'article',
    locale: 'en_US',
    siteName: 'Esy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leaves of Time: The Global Journey of Tea',
    description: 'One leaf. Five millennia. Every culture on Earth.',
  }
};

export default function TeaJourneyPage() {
  return (
    <ScrollytellingLayout
      title="Leaves of Time: The Global Journey of Tea"
      description="From wild mountain leaves to world dominance—5,000 years of tea history in one immersive journey."
      readTime="18 min"
      storyId="the-tea-journey"
    >
      <TeaJourneyClient />
    </ScrollytellingLayout>
  );
}


