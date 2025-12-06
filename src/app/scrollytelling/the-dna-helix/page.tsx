import type { Metadata } from 'next';
import DNAHelixClient from './DNAHelixClient';
import { ScrollytellingWrapper } from "@/components/Scrollytelling";

export const metadata: Metadata = {
  title: 'DNA & The Double Helix | The Code of Life | Esy',
  description: 'Watch the double helix twist as you scroll — base pairs connect (A-T, G-C), Photo 51 reveals, and genetic sequences type out. The complete story of DNA from Miescher to CRISPR.',
  keywords: [
    'DNA discovery',
    'double helix',
    'Watson and Crick',
    'Rosalind Franklin',
    'Photo 51',
    'genetics history',
    'CRISPR',
    'Human Genome Project',
    'base pairs',
    'scrollytelling'
  ],
  openGraph: {
    title: 'DNA & The Double Helix | The Code of Life',
    description: 'The helix twists with your scroll. The complete story of DNA discovery.',
    type: 'article',
    url: 'https://esy.com/scrollytelling/the-dna-helix',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DNA & The Double Helix | The Code of Life',
    description: 'From Miescher\'s nuclein to CRISPR gene editing — the molecule that codes life.',
  },
};

export default function TheDNAHelixPage() {
  return (
    <ScrollytellingWrapper
      title="DNA & The Double Helix: The Code of Life"
      description="Watch the double helix twist as you scroll — base pairs connect, Photo 51 reveals, genetic sequences type out."
    >
      <DNAHelixClient />
    </ScrollytellingWrapper>
  );
}

