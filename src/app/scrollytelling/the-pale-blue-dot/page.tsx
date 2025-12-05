import type { Metadata } from 'next';
import PaleBlueDotClient from './PaleBlueDotClient';

export const metadata: Metadata = {
  title: 'The Pale Blue Dot: A Cosmic Perspective | Esy',
  description: 'Experience Carl Sagan\'s Pale Blue Dot like never before. Scroll to zoom out from Earth to 6 billion kilometers—the distance where Voyager 1 captured the most humbling photograph ever taken.',
  keywords: [
    'Pale Blue Dot',
    'Carl Sagan',
    'Voyager 1',
    'Earth from space',
    'cosmic perspective',
    'NASA',
    'space exploration',
    'astronomy',
    'humanity',
    'scrollytelling'
  ],
  openGraph: {
    title: 'The Pale Blue Dot: A Cosmic Perspective | Esy',
    description: 'Scroll to zoom out 6 billion kilometers. Experience Carl Sagan\'s Pale Blue Dot—the most humbling photograph ever taken.',
    type: 'article',
    locale: 'en_US',
    siteName: 'Esy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Pale Blue Dot: A Cosmic Perspective',
    description: 'Everyone you love, everyone you know, everyone who ever lived—on a mote of dust suspended in a sunbeam.',
  }
};

export default function PaleBlueDotPage() {
  return <PaleBlueDotClient />;
}

