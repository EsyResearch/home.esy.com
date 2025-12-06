import type { Metadata } from 'next';
import GunpowderClient from './GunpowderClient';
import { ScrollytellingWrapper } from "@/components/Scrollytelling";

export const metadata: Metadata = {
  title: 'Gunpowder | The Discovery That Changed Everything | Esy',
  description: 'From Tang Dynasty alchemy to modern rocketry — the complete history of gunpowder with burning fuse progress, explosive animations, and the 75:15:10 formula visualization.',
  keywords: [
    'gunpowder history',
    'gunpowder invention',
    'Tang Dynasty',
    'Chinese alchemy',
    'fire lance',
    'cannon history',
    'Silk Road',
    'explosives history',
    'fireworks origin',
    'scrollytelling'
  ],
  openGraph: {
    title: 'Gunpowder | The Discovery That Changed Everything',
    description: 'Taoist alchemists sought immortality. They found the most transformative substance in history.',
    type: 'article',
    url: 'https://esy.com/scrollytelling/the-gunpowder',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gunpowder | The Discovery That Changed Everything',
    description: 'The complete history of gunpowder — from Chinese alchemy to modern warfare.',
  },
};

export default function TheGunpowderPage() {
  return (
    <ScrollytellingWrapper
      title="Gunpowder: The Discovery That Changed Everything"
      description="From Tang Dynasty alchemy to modern warfare — the 75:15:10 formula that reshaped history."
    >
      <GunpowderClient />
    </ScrollytellingWrapper>
  );
}

