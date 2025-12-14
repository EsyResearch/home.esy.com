import type { Metadata } from 'next';
import DeepOceanClient from './DeepOceanClient';
import { ScrollytellingLayout } from "@/components/Scrollytelling";

export const metadata: Metadata = {
  title: 'The Deep Ocean: Earth\'s Final Frontier | Esy',
  description: 'An immersive descent into the ocean\'s depths. From the sunlit surface to Challenger Deep at 10,935 meters—explore the ocean zones, deep-sea creatures, and the history of human exploration.',
  keywords: [
    'deep ocean',
    'Mariana Trench',
    'Challenger Deep',
    'deep sea exploration',
    'ocean zones',
    'abyssal zone',
    'hadal zone',
    'deep sea creatures',
    'bioluminescence',
    'oceanography',
    'Jacques Piccard',
    'James Cameron',
    'Victor Vescovo',
    'scrollytelling'
  ],
  openGraph: {
    title: 'The Deep Ocean: Earth\'s Final Frontier | Esy',
    description: 'Descend 10,935 meters into the ocean\'s abyss. An immersive scrollytelling journey through ocean zones, deep-sea creatures, and exploration history.',
    type: 'article',
    locale: 'en_US',
    siteName: 'Esy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Deep Ocean: Earth\'s Final Frontier',
    description: 'Scroll down to descend into the abyss. 71% of Earth, less than 0.001% explored.',
  }
};

export default function DeepOceanPage() {
  return (
    <ScrollytellingLayout
      title="The Deep Ocean: Earth's Final Frontier"
      description="Descend 10,935 meters into the ocean's abyss. 71% of Earth, less than 0.001% explored."
      readTime="12 min"
      storyId="the-deep-ocean"
    >
      <DeepOceanClient />
    </ScrollytellingLayout>
  );
}

