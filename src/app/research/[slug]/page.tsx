import React from 'react';
import { notFound } from 'next/navigation';
import ArticleViewClient from '@/components/research/ResearchArticleViewClient';
import { getResearchArticleBySlug, getAllResearchArticleSlugs } from '@/lib/research/mdx';

export async function generateStaticParams() {
  const slugs = getAllResearchArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

type ArticleType = 'experiment' | 'build' | 'research' | 'analysis' | string;

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

const ResearchArticlePage = async ({ params }: ArticlePageProps) => {
  const { slug } = await params;
  
  let article;
  try {
    article = await getResearchArticleBySlug(slug);
  } catch (err) {
    console.error('Failed to load research article:', slug, err);
    return notFound();
  }
  
  const { frontmatter, content } = article;
  
  const type: ArticleType = frontmatter.tags?.includes('experiment') ? 'experiment' :
               frontmatter.tags?.includes('build') ? 'build' :
               frontmatter.tags?.includes('analysis') ? 'analysis' :
               frontmatter.tags?.includes('research') ? 'research' : 'research';

  return (
    <ArticleViewClient 
      frontmatter={frontmatter}
      content={content}
      slug={slug}
      type={type}
    />
  );
};

export default ResearchArticlePage;

