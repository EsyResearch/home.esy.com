import type { Metadata } from 'next';
import ChipManufacturingClient from './ChipManufacturingClient';

export const metadata: Metadata = {
  title: 'How a Chip Is Manufactured: From Sand to Silicon | Esy',
  description: 'A visual guide to the most precise industrial process on Earth. Learn how modern semiconductor chips are manufactured through 9 stages of atomic-scale precision, from raw quartz sand to finished silicon devices.',
  keywords: [
    'semiconductor manufacturing',
    'how chips are made',
    'silicon wafer',
    'photolithography',
    'transistor',
    'integrated circuit',
    'TSMC',
    'chip fabrication',
    'EUV lithography',
    'Moore\'s Law'
  ],
  openGraph: {
    title: 'How a Chip Is Manufactured: From Sand to Silicon',
    description: 'A visual guide to the most precise industrial process on Earth. 9 stages of atomic-scale precision.',
    type: 'article',
    images: [
      {
        url: '/og/chip-manufacturing.png',
        width: 1200,
        height: 630,
        alt: 'How a Chip Is Manufactured - Visual Essay',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How a Chip Is Manufactured: From Sand to Silicon',
    description: 'A visual guide to the most precise industrial process on Earth.',
    images: ['/og/chip-manufacturing.png'],
  },
};

export default function ChipManufacturingPage() {
  return <ChipManufacturingClient />;
}


