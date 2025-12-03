import { Metadata } from 'next';
import TemplatesClient from './TemplatesClient';

export const metadata: Metadata = {
  title: 'Templates Marketplace - AI Prompts & Writing Frameworks | Esy',
  description:
    'Discover a growing library of AI prompts and writing frameworks for academic writing, research, creative projects, and professional communication. Copy, customize, and use in the Esy editor.',
  keywords: [
    'AI prompts',
    'writing templates',
    'academic writing prompts',
    'essay writing templates',
    'research prompts',
    'creative writing prompts',
    'professional writing',
    'ChatGPT prompts',
    'AI writing assistant',
  ],
  openGraph: {
    title: 'Templates Marketplace - AI Prompts & Writing Frameworks | Esy',
    description:
      'Discover a growing library of AI prompts and writing frameworks. Copy, customize, and use in the Esy editor.',
    url: 'https://esy.com/templates',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Templates Marketplace - AI Prompts & Writing Frameworks | Esy',
    description:
      'Discover a growing library of AI prompts and writing frameworks. Copy, customize, and use in the Esy editor.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TemplatesPage() {
  return <TemplatesClient />;
}

