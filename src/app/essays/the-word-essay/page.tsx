import { createVisualEssayMetadata } from '@/lib/visual-essay-metadata';
import TheWordEssayClient from './TheWordEssayClient';

export const metadata = createVisualEssayMetadata({
  slug: 'the-word-essay',
  title: 'Essay — A History of Attempting to Think | Esy Visual Essay',
  description: 'From Latin "exigere" (to weigh) through Michel de Montaigne\'s 1580 "Essais" to modern blogs and video essays—trace the 450-year journey of the word that means "to try." A typography-forward visual essay featuring era-evolving typefaces from Garamond to Gill Sans.',
  ogTitle: 'Essay — A History of Attempting to Think',
  ogDescription: 'How a humble French word meaning "to try" became the form that thinks out loud. 450 years of etymology, from Montaigne to Didion.',
  keywords: [
    'essay etymology',
    'origin of the word essay',
    'Michel de Montaigne',
    'Essais',
    'Francis Bacon',
    'Virginia Woolf',
    'James Baldwin',
    'Joan Didion',
    'literary history',
    'typography history',
    'Garamond',
    'essay form',
    'word origin',
    'visual essay',
  ],
  publishedTime: '2025-12-14T00:00:00.000Z',
});

export default function TheWordEssayPage() {
  return <TheWordEssayClient />;
}
