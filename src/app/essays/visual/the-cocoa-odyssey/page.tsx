import type { Metadata } from 'next';
import CocoaOdysseyClient from './CocoaOdysseyClient';
import { ScrollytellingLayout } from "@/components/Scrollytelling";

export const metadata: Metadata = {
  title: 'The Cocoa Odyssey: From Ancient Ritual to Global Chocolate Empire | Esy',
  description: 'An immersive journey through 4,000 years of cocoa history—from Mesoamerican sacred rituals to the multi-billion dollar chocolate empires of today. Explore botanical origins, colonial transformation, and modern industry.',
  keywords: [
    'cocoa history',
    'chocolate history',
    'cacao origins',
    'Mesoamerican cocoa',
    'Maya chocolate',
    'Aztec cacao',
    'chocolate industry',
    'cocoa production',
    'bean to bar',
    'cocoa trade routes',
    'chocolate corporations',
    'Mars chocolate',
    'Hershey history',
    'cocoa sustainability',
    'scrollytelling',
    'visual essay'
  ],
  openGraph: {
    title: 'The Cocoa Odyssey: From Ancient Ritual to Global Chocolate Empire | Esy',
    description: 'From sacred Mesoamerican drink to billion-dollar empires—the untold story of how a bitter bean conquered the world.',
    type: 'article',
    locale: 'en_US',
    siteName: 'Esy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Cocoa Odyssey: From Ancient Ritual to Global Chocolate Empire',
    description: 'Before it was a candy bar, cocoa was currency, medicine, and divine gift. The story of civilization\'s sweetest obsession.',
  }
};

export default function CocoaOdysseyPage() {
  return (
    <ScrollytellingLayout
      title="The Cocoa Odyssey: From Ancient Ritual to Global Chocolate Empire"
      description="From sacred Mesoamerican drink to billion-dollar empires—the untold story of how a bitter bean conquered the world."
      readTime="18 min"
      storyId="the-cocoa-odyssey"
    >
      <CocoaOdysseyClient />
    </ScrollytellingLayout>
  );
}





















