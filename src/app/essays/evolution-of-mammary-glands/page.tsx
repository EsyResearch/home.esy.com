import type { Metadata } from 'next';
import MammaryGlandsClient from './MammaryGlandsClient';
import { ScrollytellingLayout } from "@/components/Scrollytelling";

export const metadata: Metadata = {
  title: 'Evolution of Mammary Glands | 310 Million Years of Milk | Esy',
  description: 'How a simple skin secretion evolved into the most sophisticated infant nutrition system on Earth. Explore 310 million years of mammary gland evolution with interactive SVG animations.',
  keywords: [
    'mammary gland evolution',
    'lactation history',
    'milk evolution',
    'mammal evolution',
    'α-lactalbumin',
    'lactase persistence',
    'human milk',
    'monotreme marsupial placental',
    'scrollytelling',
    'biology'
  ],
  openGraph: {
    title: 'Evolution of Mammary Glands | 310 Million Years of Milk',
    description: 'How a simple skin secretion became the defining feature of mammals. Interactive scrollytelling experience.',
    type: 'article',
    url: 'https://esy.com/scrollytelling/evolution-of-mammary-glands',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Evolution of Mammary Glands | 310 Million Years of Milk',
    description: 'How a simple skin secretion became the defining feature of mammals.',
  },
};

export default function EvolutionOfMammaryGlandsPage() {
  return (
    <ScrollytellingLayout
      title="Evolution of Mammary Glands: 310 Million Years of Milk"
      description="How a simple skin secretion became the defining feature of mammals."
      readTime="12 min"
      storyId="evolution-of-mammary-glands"
    >
      <MammaryGlandsClient />
    </ScrollytellingLayout>
  );
}

