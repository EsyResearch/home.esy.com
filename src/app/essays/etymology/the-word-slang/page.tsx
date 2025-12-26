import type { Metadata } from 'next';
import TheWordSlangClient from './TheWordSlangClient';

export const metadata: Metadata = {
  title: 'SLANG: The Word That Names the Unnamed | Esy',
  description:
    'A visual etymology tracing "slang" from London\'s criminal underworld in 1756 to the digital present. The word began as insider vocabulary for thieves and beggars—itself a piece of slang—and gradually migrated toward respectability.',
  keywords: [
    'slang etymology',
    'slang origin',
    'slang history',
    'etymology',
    'word history',
    'linguistic history',
    'Francis Grose',
    'H.L. Mencken',
    'vulgar tongue',
    'cant',
    'thieves cant',
    'lexicography',
    'sociolinguistics',
  ],
  openGraph: {
    title: 'SLANG: The Word That Names the Unnamed',
    description:
      'A visual etymology tracing "slang" from London\'s criminal underworld in 1756 to the digital present.',
    type: 'article',
    images: [
      {
        url: '/essays/etymology/the-word-slang/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SLANG - Visual Etymology Essay',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SLANG: The Word That Names the Unnamed',
    description:
      'A visual etymology tracing "slang" from London\'s criminal underworld in 1756 to the digital present.',
    images: ['/essays/etymology/the-word-slang/og-image.jpg'],
  },
};

export default function TheWordSlangPage() {
  return <TheWordSlangClient />;
}
