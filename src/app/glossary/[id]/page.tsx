import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGlossaryTerm, getAllGlossarySlugs } from '@/lib/glossaryUtils';
import GlossaryTermPage from '@/components/Glossary/GlossaryTermPage';

export async function generateStaticParams() {
  const slugs = getAllGlossarySlugs();
  return slugs.map((slug) => ({ id: slug }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params;
  const termData = await getGlossaryTerm(id);
  
  if (!termData) {
    return {
      title: 'Term Not Found | Esy AI Glossary',
    };
  }

  const { meta } = termData;
  const title = `${meta.title} — Definition | Esy AI Glossary`;
  const description = meta.description || `What is ${meta.title}? Definition, context, and how it relates to agentic workflows and AI infrastructure.`;

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
  const cleanContent = content?.replace(/^---[\s\S]*?---/, '').trim() || '';

  const term = {
    slug: id,
    title: meta.title || id.replace(/-/g, ' '),
    category: meta.category?.toLowerCase() || 'agents',
    description: meta.description || '',
    pronunciation: meta.pronunciation,
    tldr: meta.tldr,
    inEsy: meta.inEsy,
    relatedTerms: meta.relatedTerms || [],
    workflowStages: meta.workflowStages || undefined,
    content: cleanContent,
  };

  return <GlossaryTermPage term={term} />;
}
