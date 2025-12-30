import type { Metadata } from 'next';
import { CambodiaBombingClient } from './CambodiaBombingClient';

export const metadata: Metadata = {
  title: 'Cambodia Bombed (1965–1973): The Air War You Weren\'t Meant to See | Esy',
  description: 'A visual essay exploring the secret U.S. bombing campaign in Cambodia—500,000 tons dropped on a neutral nation, hidden from Congress, leaked to the press, and still reverberating today as unexploded ordnance.',
  keywords: [
    'Cambodia bombing',
    'Operation Menu',
    'Operation Freedom Deal',
    'secret bombing',
    'Nixon Cambodia',
    'Kissinger Cambodia',
    'B-52 bombing',
    'Vietnam War',
    'Cambodia neutrality',
    'Khmer Rouge',
    'unexploded ordnance',
    'UXO Cambodia',
    'War Powers Resolution',
    'congressional oversight',
    'declassified documents',
    'visual essay',
    'history'
  ],
  openGraph: {
    title: 'Cambodia Bombed (1965–1973): The Air War You Weren\'t Meant to See',
    description: 'Approximately 500,000 tons of bombs. A neutral nation. A campaign hidden from Congress. An essay that traces secrecy to revelation.',
    type: 'article',
    url: 'https://esy.com/essays/history/cambodia-bombing',
    siteName: 'Esy',
    images: [
      {
        url: 'https://esy.com/og/B-52D-dropping-bombs-over-vietnam.jpg',
        width: 1798,
        height: 1605,
        alt: 'B-52D Stratofortress dropping bombs over Vietnam — Cambodia Bombed visual essay'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cambodia Bombed (1965–1973): The Secret Air War',
    description: '500,000 tons of bombs dropped on a neutral nation. The story of secrecy, revelation, and ongoing consequences.',
    images: ['https://esy.com/og/B-52D-dropping-bombs-over-vietnam.jpg']
  }
};

export default function CambodiaBombingPage() {
  return <CambodiaBombingClient />;
}
