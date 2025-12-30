import type { Metadata } from 'next';
import { KhmerRougeGenocideClient } from './KhmerRougeGenocideClient';

export const metadata: Metadata = {
  title: 'Year Zero, Visualized: Cambodia\'s Civil War and the Khmer Rouge Genocide | Esy',
  description: 'An immersive visual essay exploring the Khmer Rouge genocide (1975-1979) that killed approximately 1.7-2 million Cambodians. From Cold War context through justice and memory.',
  keywords: [
    'Khmer Rouge',
    'Cambodia genocide',
    'Pol Pot',
    'Democratic Kampuchea',
    'Year Zero',
    'Tuol Sleng',
    'S-21',
    'Choeung Ek',
    'Killing Fields',
    'ECCC',
    'Khmer Rouge Tribunal',
    'visual essay',
    'history'
  ],
  openGraph: {
    title: 'Year Zero, Visualized: Cambodia\'s Civil War and the Khmer Rouge Genocide',
    description: 'An immersive visual essay exploring the Khmer Rouge genocide that killed 1.7-2 million people in just 3 years, 8 months, and 20 days.',
    type: 'article',
    images: [
      {
        url: '/og/khmer-rouge-genocide.jpg',
        width: 1200,
        height: 630,
        alt: 'Choeung Ek Memorial Stupa - Year Zero, Visualized'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Year Zero, Visualized: Cambodia\'s Khmer Rouge Genocide',
    description: 'An immersive visual essay on the Khmer Rouge genocide (1975-1979).'
  }
};

export default function KhmerRougeGenocidePage() {
  return <KhmerRougeGenocideClient />;
}
