import { Metadata } from 'next';
import BurmeseCuisineClient from './BurmeseCuisineClient';

export const metadata: Metadata = {
  title: 'The History, Evolution, and Authenticity of Burmese Cuisine | Esy',
  description:
    'From Pyu fermentation to diaspora tables: explore 2,000 years of Burmese culinary heritage through ngapi, mohinga, laphet thoke, and the crossroads flavors of Myanmar. မြန်မာအစားအစာ သမိုင်း',
  keywords: [
    'Burmese cuisine',
    'Myanmar food',
    'mohinga',
    'laphet thoke',
    'ngapi',
    'fermented fish paste',
    'tea leaf salad',
    'si pyan',
    'Burmese curry',
    'Southeast Asian food history',
    'Myanmar culinary traditions',
    'Burmese food culture',
    'Mandalay cuisine',
    'Yangon street food',
    'Shan noodles',
  ],
  authors: [{ name: 'Esy Visual Essays' }],
  openGraph: {
    title: 'The History, Evolution, and Authenticity of Burmese Cuisine',
    description:
      'A visual journey through 2,000 years of Myanmar\'s culinary heritage — from ancient fermentation to modern diaspora kitchens.',
    type: 'article',
    url: 'https://esy.com/essays/visual/the-history-of-burmese-cuisine',
    locale: 'en_US',
    siteName: 'Esy',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Myanmar%E2%80%99s_Traditional_Food_-_Mohinga.jpg',
        width: 1200,
        height: 630,
        alt: 'Mohinga - Myanmar\'s national dish, a fish-based rice noodle soup',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The History of Burmese Cuisine | Esy Visual Essay',
    description:
      'Explore 2,000 years of Myanmar\'s culinary heritage through an immersive visual journey.',
    site: '@EsyResearch',
    images: ['https://upload.wikimedia.org/wikipedia/commons/4/40/Myanmar%E2%80%99s_Traditional_Food_-_Mohinga.jpg'],
  },
  alternates: {
    canonical: 'https://esy.com/essays/visual/the-history-of-burmese-cuisine/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BurmeseCuisinePage() {
  return <BurmeseCuisineClient />;
}
