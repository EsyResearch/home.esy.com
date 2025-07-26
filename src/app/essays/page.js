import { getAllEssays, getFeaturedEssay } from '@/lib/essays';
import EsyEssaysHubClient from './EsyEssaysHubClient';

export const metadata = {
  title: 'Essay Examples & Samples - Free Essays Library',
  description: 'Browse our collection of high-quality essay examples across various topics. Find inspiration for argumentative, analytical, narrative, and research essays.',
  keywords: 'essay examples, free essays, sample essays, essay library, academic essays, essay inspiration',
  openGraph: {
    title: 'Essay Examples & Samples | Esy',
    description: 'Explore our curated collection of essay examples to inspire your writing.',
    type: 'website',
  },
}

export default async function EsyEssaysHub() {
  const essays = await getAllEssays();
  const featuredEssay = await getFeaturedEssay();

  // Generate filters from essay tags
  const generateFilters = () => {
    const tagCounts = {};
    essays.forEach(essay => {
      if (essay.tags) {
        essay.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });

    const filters = [
      { id: 'all', label: 'All Essays', count: essays.length }
    ];

    Object.entries(tagCounts).forEach(([tag, count]) => {
      filters.push({ id: tag.toLowerCase().replace(' ', '-'), label: tag, count });
    });

    return filters;
  };

  const filters = generateFilters();

  return <EsyEssaysHubClient essays={essays} featuredEssay={featuredEssay} filters={filters} />;
}