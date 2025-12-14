import type { Metadata } from 'next';
import ScrambleForAfricaClient from './ScrambleForAfricaClient';

export const metadata: Metadata = {
  title: 'The Scramble for Africa: How Europe Carved Up a Continent | Esy',
  description: 'An immersive visual essay chronicling how European powers went from controlling 10% of Africa in 1870 to 90% by 1914—the causes, the resistance, and the lasting legacy.',
  keywords: [
    'Scramble for Africa',
    'colonialism',
    'Berlin Conference',
    'African history',
    'European imperialism',
    'Battle of Adwa',
    'Congo Free State',
    'Leopold II',
    'Menelik II',
    'colonial borders',
    'partition of Africa',
  ],
  openGraph: {
    title: 'The Scramble for Africa: How Europe Carved Up a Continent',
    description: 'An immersive visual essay on the colonization of Africa (1870-1914)—the architects, the resisters, and the borders that remain.',
    type: 'article',
    publishedTime: '2025-12-12',
    authors: ['Esy'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Scramble for Africa',
    description: 'How Europe partitioned a continent in a single generation.',
  },
};

export default function ScrambleForAfricaPage() {
  return <ScrambleForAfricaClient />;
}



