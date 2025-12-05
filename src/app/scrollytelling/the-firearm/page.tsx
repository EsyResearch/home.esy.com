import type { Metadata } from 'next';
import FirearmClient from './FirearmClient';

export const metadata: Metadata = {
  title: 'The Firearm | From Fire Lance to Modern Precision | Esy',
  description: 'From Chinese fire lances to AK-47s — the complete history of firearms with rotating revolver cylinder, ammunition counter, muzzle flash effects, and bullet trajectory animations.',
  keywords: [
    'firearm history',
    'gun history',
    'fire lance',
    'handgonne',
    'Colt revolver',
    'AK-47',
    'weapons history',
    'military history',
    'Samuel Colt',
    'scrollytelling'
  ],
  openGraph: {
    title: 'The Firearm | From Fire Lance to Modern Precision',
    description: '800 years of controlled explosions. Interactive scrollytelling with rotating cylinder and muzzle flash effects.',
    type: 'article',
    url: 'https://esy.com/scrollytelling/the-firearm',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Firearm | From Fire Lance to Modern Precision',
    description: 'The complete history of firearms from bamboo tubes to assault rifles.',
  },
};

export default function TheFirearmPage() {
  return <FirearmClient />;
}

