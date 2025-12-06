import type { Metadata } from 'next';
import CarHistoryClient from './CarHistoryClient';
import { ScrollytellingWrapper } from "@/components/Scrollytelling";

export const metadata: Metadata = {
  title: 'The Invention of the Car | A Sketch-Style History | Esy',
  description: 'A hand-drawn journey through the invention of the automobile. From Karl Benz\'s 1886 patent to the electric future — discover how the car changed civilization.',
  keywords: [
    'automobile history',
    'Karl Benz',
    'Ford Model T',
    'assembly line',
    'car invention',
    'automotive history',
    'scrollytelling',
    'electric vehicles',
    'Henry Ford'
  ],
  openGraph: {
    title: 'The Invention of the Car | A Sketch-Style History',
    description: 'A hand-drawn journey through the invention that changed civilization. Interactive scrollytelling experience.',
    type: 'article',
    url: 'https://esy.com/scrollytelling/the-invention-of-the-car',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Invention of the Car | A Sketch-Style History',
    description: 'A hand-drawn journey through the invention that changed civilization.',
  },
};

export default function TheInventionOfTheCarPage() {
  return (
    <ScrollytellingWrapper
      title="The Automobile: A Sketch-Style Journey"
      description="A hand-drawn journey through the invention that changed civilization."
    >
      <CarHistoryClient />
    </ScrollytellingWrapper>
  );
}

