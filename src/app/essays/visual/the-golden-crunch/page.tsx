import type { Metadata } from 'next';
import GoldenCrunchClient from './GoldenCrunchClient';
import { ScrollytellingLayout } from "@/components/Scrollytelling";

export const metadata: Metadata = {
  title: 'The Golden Crunch: Origins, Journey & Global Rise of Fried Chicken | Esy',
  description: 'An immersive journey through the complex history of fried chicken—from West African traditions and Scottish frying techniques to enslaved cooks in the American South, Jim Crow travel food, and the multi-hundred-billion-dollar global industry.',
  keywords: [
    'fried chicken history',
    'soul food origins',
    'African American cuisine',
    'West African cooking',
    'Scottish frying techniques',
    'KFC history',
    'Popeyes history',
    'Chick-fil-A',
    'fast food industry',
    'food history',
    'culinary anthropology',
    'African diaspora food',
    'Jim Crow era',
    'Green Book',
    'Korean fried chicken',
    'global fast food',
    'scrollytelling',
    'visual essay'
  ],
  openGraph: {
    title: 'The Golden Crunch: Origins, Journey & Global Rise of Fried Chicken | Esy',
    description: 'From West African traditions to global empire—the untold story of how fried chicken became one of the world\'s most iconic foods.',
    type: 'article',
    locale: 'en_US',
    siteName: 'Esy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Golden Crunch: Origins, Journey & Global Rise of Fried Chicken',
    description: 'Fried chicken is not "just a food"—it is a story of migration, oppression, creativity, identity, capitalism, and globalization.',
  }
};

export default function GoldenCrunchPage() {
  return (
    <ScrollytellingLayout
      title="The Golden Crunch: Origins, Journey & Global Rise of Fried Chicken"
      description="From West African traditions to global empire—the untold story of how fried chicken became one of the world's most iconic foods."
      readTime="20 min"
      storyId="the-golden-crunch"
    >
      <GoldenCrunchClient />
    </ScrollytellingLayout>
  );
}

