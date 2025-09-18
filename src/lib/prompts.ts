// Utility functions for prompt data management

export interface Prompt {
  id: number;
  slug: string;
  category: string;
  title: string;
  description: string;
  shortDescription: string;
  variables: string[];
  prompt: string;
  isPro: boolean;
  tags?: string[];
  relatedPromptIds?: number[];
}

export interface PromptCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Import prompts data
import { prompts } from '@/content/prompts';

// Get all prompts
export async function getAllPrompts(): Promise<Prompt[]> {
  return prompts;
}

// Get prompt by slug
export async function getPromptBySlug(slug: string): Promise<Prompt | null> {
  const prompts = await getAllPrompts();
  return prompts.find(p => p.slug === slug) || null;
}

// Get prompts by category
export async function getPromptsByCategory(category: string): Promise<Prompt[]> {
  const prompts = await getAllPrompts();
  return category === 'all' 
    ? prompts 
    : prompts.filter(p => p.category === category);
}

// Get all unique prompt slugs for static generation
export async function getAllPromptSlugs(): Promise<{ slug: string }[]> {
  const prompts = await getAllPrompts();
  return prompts.map(p => ({ slug: p.slug }));
}

// Get all categories
export function getCategories(): PromptCategory[] {
  return [
    { 
      id: 'writing', 
      slug: 'creative-writing',
      name: 'Creative Writing', 
      description: 'Master the art of creative writing with prompts for character development, world-building, and narrative structure',
      count: 12 
    },
    { 
      id: 'research', 
      slug: 'academic-research',
      name: 'Academic Research', 
      description: 'Comprehensive frameworks for academic research, literature reviews, and scholarly analysis',
      count: 15 
    },
    { 
      id: 'analysis', 
      slug: 'literary-analysis',
      name: 'Literary Analysis', 
      description: 'Advanced analytical tools for literary criticism, textual analysis, and interpretive frameworks',
      count: 10 
    },
    { 
      id: 'essays', 
      slug: 'essay-writing',
      name: 'Essay Writing', 
      description: 'Professional essay writing frameworks for argumentative, persuasive, and academic compositions',
      count: 14 
    },
    { 
      id: 'professional', 
      slug: 'professional-writing',
      name: 'Professional Writing', 
      description: 'Executive-level communication tools for business writing, reports, and professional correspondence',
      count: 8 
    },
    { 
      id: 'ebooks', 
      slug: 'books-publication',
      name: 'Book & Publication', 
      description: 'Complete publishing frameworks for non-fiction books, guides, and educational content',
      count: 9 
    }
  ];
}

// Get category by slug
export function getCategoryBySlug(slug: string): PromptCategory | null {
  const categories = getCategories();
  return categories.find(c => c.slug === slug) || null;
}

// Get category by id
export function getCategoryById(id: string): PromptCategory | null {
  const categories = getCategories();
  return categories.find(c => c.id === id) || null;
}

// Get related prompts (basic implementation - can be enhanced with AI later)
export async function getRelatedPrompts(
  currentPromptId: number, 
  category: string, 
  limit: number = 3
): Promise<Prompt[]> {
  const prompts = await getAllPrompts();
  
  // First try to get prompts from the same category
  let related = prompts
    .filter(p => p.category === category && p.id !== currentPromptId)
    .slice(0, limit);
  
  // If not enough, add prompts from other categories
  if (related.length < limit) {
    const otherPrompts = prompts
      .filter(p => p.id !== currentPromptId && !related.includes(p))
      .slice(0, limit - related.length);
    related = [...related, ...otherPrompts];
  }
  
  return related;
}

// Search prompts
export async function searchPrompts(query: string): Promise<Prompt[]> {
  const prompts = await getAllPrompts();
  const searchTerm = query.toLowerCase();
  
  return prompts.filter(p => 
    p.title.toLowerCase().includes(searchTerm) ||
    p.description.toLowerCase().includes(searchTerm) ||
    p.shortDescription.toLowerCase().includes(searchTerm) ||
    p.prompt.toLowerCase().includes(searchTerm) ||
    p.variables.some(v => v.toLowerCase().includes(searchTerm))
  );
}