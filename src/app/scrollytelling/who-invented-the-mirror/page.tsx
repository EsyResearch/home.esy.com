import { Metadata } from 'next';
import MirrorHistoryClient from './MirrorHistoryClient';
import { ScrollytellingWrapper } from "@/components/Scrollytelling";

export const metadata: Metadata = {
  title: 'The History of the Mirror | 8,000 Years of Reflection | Esy',
  description: 'From polished obsidian to smart mirrors—humanity\'s eternal quest to see itself. Discover the fascinating 8,000-year history of the mirror.',
  keywords: [
    'history of mirrors',
    'mirror invention',
    'Venetian mirrors',
    'obsidian mirrors',
    'Justus von Liebig',
    'silvered glass',
    'reflection history',
    'mirror technology'
  ],
  openGraph: {
    title: 'The Mirror: 8,000 Years of Reflection',
    description: 'From polished obsidian to the screen in your pocket—humanity\'s eternal quest to see itself.',
    type: 'article',
    url: 'https://esy.com/scrollytelling/who-invented-the-mirror',
    images: [
      {
        url: '/og/mirror-history.jpg',
        width: 1200,
        height: 630,
        alt: 'The History of the Mirror'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Mirror',
    description: '8,000 years of humanity asking: Who is that looking back?'
  }
};

export default function MirrorHistoryPage() {
  return (
    <ScrollytellingWrapper
      title="The Mirror: 8,000 Years of Reflection"
      description="From polished obsidian to the screen in your pocket—humanity's eternal quest to see itself."
    >
      <MirrorHistoryClient />
    </ScrollytellingWrapper>
  );
}

