import type { Metadata } from 'next';
import WhyVenezuelaMattersClient from './WhyVenezuelaMattersClient';

export const metadata: Metadata = {
  title: 'Why Venezuela Matters: Oil, Refineries, and Power in the Western Hemisphere | Esy',
  description:
    'A visual systems essay on Venezuela\'s heavy crude, Gulf Coast refining, sovereignty norms, and Operation Absolute Resolve — clear, rigorous, updated as facts evolve.',
  keywords: [
    'Venezuela',
    'Operation Absolute Resolve',
    'Maduro',
    'heavy crude oil',
    'Gulf Coast refineries',
    'Monroe Doctrine',
    'PDVSA',
    'Orinoco Belt',
    'U.S. foreign policy',
    'international law',
  ],
  openGraph: {
    title: 'Why Venezuela Matters: Oil, Refineries, and Power in the Western Hemisphere',
    description:
      'A visual systems essay explaining the forces behind Operation Absolute Resolve and the capture of Nicolas Maduro.',
    type: 'article',
    publishedTime: '2026-01-03T23:00:00Z',
    modifiedTime: '2026-01-03T23:00:00Z',
    authors: ['Esy'],
    tags: ['Venezuela', 'Oil', 'Geopolitics', 'International Law'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Venezuela Matters',
    description:
      'A visual systems essay on Venezuela\'s oil, Gulf Coast refining, and Operation Absolute Resolve.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function WhyVenezuelaMattersPage() {
  return <WhyVenezuelaMattersClient />;
}
