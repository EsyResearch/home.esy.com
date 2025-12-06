import type { Metadata } from 'next';
import TrainClient from './TrainClient';
import { ScrollytellingWrapper } from "@/components/Scrollytelling";

export const metadata: Metadata = {
  title: 'The Train | Iron Horse of Industry | Esy',
  description: 'From Trevithick\'s first steam locomotive to 375 mph maglev trains — the complete history of rail transport with interactive SVG animations and wheel mechanics.',
  keywords: [
    'train history',
    'railroad history',
    'locomotive',
    'steam engine',
    'Stephenson Rocket',
    'transcontinental railroad',
    'Shinkansen',
    'bullet train',
    'maglev',
    'scrollytelling'
  ],
  openGraph: {
    title: 'The Train | Iron Horse of Industry',
    description: 'From 1804 steam locomotives to 375 mph maglev trains. Interactive scrollytelling experience.',
    type: 'article',
    url: 'https://esy.com/scrollytelling/the-train',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Train | Iron Horse of Industry',
    description: 'The complete history of rail transport from steam to maglev.',
  },
};

export default function TheTrainPage() {
  return (
    <ScrollytellingWrapper
      title="The Train: Iron Horse of Industry"
      description="From Trevithick's first steam locomotive to 375 mph maglev trains — the complete history of rail."
    >
      <TrainClient />
    </ScrollytellingWrapper>
  );
}

