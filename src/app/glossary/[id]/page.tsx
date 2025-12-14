import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGlossaryTerm, getAllGlossarySlugs } from '@/lib/glossaryUtils';
import GlossaryTermPage from '@/components/Glossary/GlossaryTermPage';

// Generate static params for all known terms
export async function generateStaticParams() {
  const slugs = getAllGlossarySlugs();
  return slugs.map((slug) => ({ id: slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params;
  const termData = await getGlossaryTerm(id);
  
  if (!termData) {
    return {
      title: 'Term Not Found | Esy Glossary',
    };
  }

  const { meta } = termData;
  const title = `${meta.title} - Definition & Examples | Esy Glossary`;
  const description = meta.description || `Learn about ${meta.title} in academic writing. Clear definition, usage examples, and related terms.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://esy.com/glossary/${id}`,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export default async function Page({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
    const { id } = await params;
    const termData = await getGlossaryTerm(id);
    
    if (!termData) {
      notFound();
    }
    
  const { meta, content } = termData;

  // Remove frontmatter from content if present
  const cleanContent = content?.replace(/^---[\s\S]*?---/, '').trim() || '';

  const term = {
    slug: id,
    title: meta.title || id.replace(/-/g, ' '),
    category: meta.category?.toLowerCase() || 'writing',
    description: meta.description || '',
    pronunciation: meta.pronunciation,
    relatedTerms: meta.relatedTerms || [],
    content: cleanContent,
  };

  return <GlossaryTermPage term={term} />;
}
