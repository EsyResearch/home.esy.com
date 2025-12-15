import type { Metadata } from 'next';
import MammaryGlandEvolutionClient from './MammaryGlandEvolutionClient';

export const metadata: Metadata = {
  title: 'Mammary Gland Evolution | Anatomical Journey | Esy',
  description: 'A detailed anatomical exploration of mammary gland evolution across species. From platypus milk patches to whale mammary slits — see how 310 million years shaped the defining organ of mammals.',
  keywords: [
    'mammary gland anatomy',
    'breast anatomy',
    'lactation evolution',
    'milk production',
    'alveoli',
    'mammal evolution',
    'comparative anatomy',
    'platypus milk',
    'whale nursing',
    'human lactation'
  ],
  openGraph: {
    title: 'Mammary Gland Evolution | Anatomical Journey',
    description: 'A detailed anatomical exploration of how mammary glands evolved across 6,400+ mammalian species.',
    type: 'article',
    url: 'https://esy.com/scrollytelling/mammary-gland-evolution',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mammary Gland Evolution | Anatomical Journey',
    description: 'A detailed anatomical exploration of mammary gland evolution.',
  },
};

export default function MammaryGlandEvolutionPage() {
  return <MammaryGlandEvolutionClient />;
}

