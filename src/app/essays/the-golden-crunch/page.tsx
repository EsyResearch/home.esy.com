import type { Metadata } from 'next';
import GoldenCrunchClient from './GoldenCrunchClient';
import { ScrollytellingLayout } from "@/components/Scrollytelling";

export const metadata: Metadata = {
  title: 'The Golden Crunch: The Origins, Journey & Global Rise of Fried Chicken | Esy',
  description: 'An immersive journey into the deep, complex origins of fried chicken—from West African traditions and Scottish frying techniques to its role in American soul food and its transformation into a multi-hundred-billion-dollar global industry.',
  keywords: [
    'fried chicken history',
    'soul food origins',
    'African American cuisine',
    'West African culinary traditions',
    'Scottish frying techniques',
    'Jim Crow era food',
    'Green Book',
    'KFC history',
    'Popeyes history',
    'Chick-fil-A history',
    'fast food industry',
    'global fried chicken market',
    'culinary anthropology',
    'Maillard reaction',
    'scrollytelling',
    'visual essay',
    'food history',
    'cultural migration'
  ],
  openGraph: {
    title: 'The Golden Crunch: The Origins, Journey & Global Rise of Fried Chicken | Esy',
    description: 'From survival food to global empire: the untold story of fried chicken.',
    type: 'article',
    locale: 'en_US',
    siteName: 'Esy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Golden Crunch: The Origins, Journey & Global Rise of Fried Chicken',
    description: 'Explore the migration, oppression, creativity, identity, capitalism, and globalization behind America\'s most iconic food.',
  }
};

export default function GoldenCrunchPage() {
  return (
    <ScrollytellingLayout
      title="The Golden Crunch: The Origins, Journey & Global Rise of Fried Chicken"
      description="An immersive journey into the deep, complex origins of fried chicken—from West African traditions and Scottish frying techniques to its role in American soul food and its transformation into a multi-hundred-billion-dollar global industry."
      readTime="20 min"
      storyId="the-golden-crunch"
    >
      <GoldenCrunchClient />
    </ScrollytellingLayout>
  );
}

