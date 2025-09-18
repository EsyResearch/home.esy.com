import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPromptBySlug, getAllPromptSlugs, getRelatedPrompts, getCategoryById } from '@/lib/prompts';
import PromptPageClient from './PromptPageClient';

interface PromptPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all prompts
export async function generateStaticParams() {
  const slugs = await getAllPromptSlugs();
  return slugs;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PromptPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const prompt = await getPromptBySlug(resolvedParams.slug);
  
  if (!prompt) {
    return {
      title: 'Prompt Not Found | Esy',
      description: 'The requested prompt could not be found.',
    };
  }

  const category = getCategoryById(prompt.category);
  
  return {
    title: `${prompt.title} - AI Prompt Template | Esy`,
    description: prompt.shortDescription,
    keywords: [
      ...prompt.variables.map(v => v.toLowerCase()),
      category?.name || '',
      'AI prompt',
      'prompt template',
      prompt.title.toLowerCase()
    ],
    openGraph: {
      title: prompt.title,
      description: prompt.shortDescription,
      type: 'article',
      authors: ['Esy AI'],
      tags: [category?.name || '', ...prompt.variables],
    },
    twitter: {
      card: 'summary_large_image',
      title: prompt.title,
      description: prompt.shortDescription,
    },
  };
}

export default async function PromptPage({ params }: PromptPageProps) {
  const resolvedParams = await params;
  const prompt = await getPromptBySlug(resolvedParams.slug);
  
  if (!prompt) {
    notFound();
  }

  const category = getCategoryById(prompt.category);
  const relatedPrompts = await getRelatedPrompts(prompt.id, prompt.category);

  return (
    <PromptPageClient 
      prompt={prompt}
      category={category}
      relatedPrompts={relatedPrompts}
    />
  );
}