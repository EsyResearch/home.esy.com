import { getAllEssays } from '@/lib/essays';
import EssaysGatewayClient from './EssaysGatewayClient';

export const metadata = {
  title: 'Essays - Examples, Visual Essays & Writing Guides | Esy',
  description: 'Explore essay examples, interactive visual essays, and step-by-step writing guides. Find inspiration and learn to write better academic essays.',
  keywords: 'essay examples, visual essays, essay writing guide, sample essays, academic essays, how to write an essay, essay samples, essay inspiration',
  openGraph: {
    title: 'Essays - Examples, Visual Essays & Writing Guides | Esy',
    description: 'Explore essay examples, interactive visual essays, and step-by-step writing guides. Find inspiration and learn to write better.',
    type: 'website',
    url: 'https://esy.com/essays',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Essays - Examples & Guides | Esy',
    description: 'Explore essay examples, interactive visual essays, and step-by-step writing guides.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function EssaysHub() {
  const essays = await getAllEssays();

  // Transform essays to match the expected format
  const textEssays = essays.map(essay => ({
    id: essay.id,
    title: essay.title,
    abstract: essay.abstract || '',
    authors: essay.authors || [],
    readTime: essay.readTime || 10,
    tags: essay.tags || [],
  }));

  return <EssaysGatewayClient textEssays={textEssays} />;
}
