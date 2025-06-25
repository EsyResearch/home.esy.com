import { getAllEssays, getFeaturedEssay } from '@/lib/essays';
import EsyEssaysHubClient from './EsyEssaysHubClient';

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