import React from 'react';
import { notFound } from 'next/navigation';
import { getGlossaryTerm, getAllGlossarySlugs } from '@/lib/glossaryUtils';
import GlossaryTermRenderer from '@/components/Glossary/GlossaryTermRenderer';

// Generate static params for all known terms
export async function generateStaticParams() {
  const slugs = getAllGlossarySlugs();
  
  return slugs.map((slug) => ({
    id: slug,
  }));
}

const GlossaryTermPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;
    const termData = await getGlossaryTerm(id);
    
    if (!termData) {
      notFound();
    }
    
    const { meta, content, isCompiled } = termData;

    return (
      <GlossaryTermRenderer 
        meta={meta} 
        Content={isCompiled ? content : null}
        content={isCompiled ? null : content}
      />
    );
  } catch (error) {
    console.error('Glossary term page error:', error);
    notFound();
  }
};

export default GlossaryTermPage; 