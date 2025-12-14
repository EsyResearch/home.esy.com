import { Metadata } from 'next';
import SoldClient from './SoldClient';

export const metadata: Metadata = {
  title: 'SOLD: The Etymology of Pornography | Esy Visual Essays',
  description: 'From ancient Greek slave markets to modern search bars—trace the 2,500-year journey of a word born in commerce, shaped by scandal, and transformed by technology. A scholarly visual essay on etymology.',
  keywords: [
    'etymology',
    'pornography etymology',
    'Greek language',
    'linguistic history',
    'word origin',
    'cultural history',
    'visual essay',
    'Victorian era',
    'Supreme Court obscenity',
  ],
  openGraph: {
    title: 'SOLD: The Etymology of Pornography',
    description: 'From ancient Greek πόρνη to modern search bar—the 2,500-year journey of a word society couldn\'t stop using or openly discuss.',
    type: 'article',
    images: [
      {
        url: '/images/essays/sold-etymology-og.jpg',
        width: 1200,
        height: 630,
        alt: 'SOLD: The Etymology of Pornography - A Visual Essay',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOLD: The Etymology of Pornography',
    description: 'From ancient Greek πόρνη to modern search bar—the 2,500-year journey of a forbidden word.',
  },
};

export default function SoldPage() {
  return <SoldClient />;
}



