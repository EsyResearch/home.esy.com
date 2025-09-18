import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getPromptsByCategory, getCategories, getCategoryBySlug } from '@/lib/prompts';
import CategoryView from './CategoryView';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map(cat => ({
    category: cat.slug
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.category);
  
  if (!category) {
    return {
      title: 'Category Not Found | Esy',
      description: 'The requested category could not be found.',
    };
  }
  
  return {
    title: `${category.name} Prompts - AI Prompt Library | Esy`,
    description: category.description,
    keywords: [category.name, 'AI prompts', 'prompt templates', params.category],
    openGraph: {
      title: `${category.name} Prompts`,
      description: category.description,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.category);
  
  if (!category) {
    notFound();
  }

  const prompts = await getPromptsByCategory(category.id);
  const categories = getCategories();

  return (
    <CategoryView 
      category={category}
      prompts={prompts}
      categories={categories}
    />
  );
}