import { Metadata } from 'next';
import HighHeelsHistoryClient from './HighHeelsHistoryClient';
import { ScrollytellingLayout } from "@/components/Scrollytelling";

export const metadata: Metadata = {
  title: 'Who Invented High Heels? The Complete History | Esy',
  description: 'From Persian cavalry to Parisian runways—discover the extraordinary 500-year journey of the high heel, from military equipment to fashion icon.',
  keywords: [
    'high heels history',
    'who invented high heels',
    'stiletto history',
    'Louis XIV heels',
    'fashion history',
    'shoe history',
    'Louboutin history',
    'Persian heels',
    'Roger Vivier stiletto'
  ],
  openGraph: {
    title: 'Who Invented High Heels? A History in Five Centuries',
    description: 'From Persian cavalrymen to Parisian runways—the extraordinary journey of fashion\'s most provocative invention.',
    type: 'article',
    images: [
      {
        url: '/og/high-heels-history.jpg',
        width: 1200,
        height: 630,
        alt: 'The History of High Heels'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Who Invented High Heels?',
    description: 'From Persian cavalry to Parisian runways—the 500-year journey of the high heel.'
  }
};

export default function HighHeelsHistoryPage() {
  return (
    <ScrollytellingLayout
      title="The High Heels Story: From Persian Cavalry to Parisian Runways"
      description="The extraordinary 500-year journey of fashion's most provocative invention."
      readTime="14 min"
    >
      <HighHeelsHistoryClient />
    </ScrollytellingLayout>
  );
}

