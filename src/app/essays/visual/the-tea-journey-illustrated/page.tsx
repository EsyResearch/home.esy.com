import type { Metadata } from 'next';
import TeaJourneyIllustratedClient from './TeaJourneyIllustratedClient';
import { ScrollytellingLayout } from "@/components/Scrollytelling";

export const metadata: Metadata = {
  title: 'Leaves of Time: The Global Journey of Tea (Illustrated Edition) | Esy',
  description: 'An award-winning illustrated journey through 5,000 years of tea history—from wild mountain leaves in ancient China to the world\'s most consumed beverage after water. Featuring stunning SVG illustrations, animated trade routes, and interactive ceremonies.',
  keywords: [
    'history of tea',
    'tea origins',
    'Chinese tea illustration',
    'Japanese tea ceremony',
    'matcha history',
    'British tea culture',
    'tea trade routes',
    'Silk Road tea',
    'Assam tea',
    'Darjeeling',
    'Ceylon tea',
    'oolong',
    'pu-erh',
    'Camellia sinensis',
    'tea ceremony illustration',
    'chai history',
    'scrollytelling',
    'illustrated essay',
    'interactive story'
  ],
  openGraph: {
    title: 'Leaves of Time: The Global Journey of Tea (Illustrated Edition) | Esy',
    description: 'Stunning SVG illustrations trace 5,000 years of tea history across continents—animated trade routes, ceremonial traditions, and the empires built on a single leaf.',
    type: 'article',
    locale: 'en_US',
    siteName: 'Esy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leaves of Time: The Global Journey of Tea',
    description: 'One leaf. Five millennia. Every culture on Earth. An illustrated journey.',
  }
};

export default function TeaJourneyIllustratedPage() {
  return (
    <ScrollytellingLayout
      title="Leaves of Time: The Global Journey of Tea"
      description="Stunning SVG illustrations trace 5,000 years of tea history across continents."
      readTime="20 min"
      storyId="the-tea-journey-illustrated"
    >
      <TeaJourneyIllustratedClient />
    </ScrollytellingLayout>
  );
}



















