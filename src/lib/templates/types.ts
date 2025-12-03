// Templates Marketplace Type Definitions

export type TemplateCategory = 'prompt' | 'template' | 'bundle';

export type TemplateDifficulty = 'beginner' | 'intermediate' | 'advanced';

// AI Model targeting for SEO
export type AIModel = 'ChatGPT' | 'Claude' | 'Gemini' | null;

// Pricing for premium prompts
export interface TemplatePricing {
  type: 'free' | 'premium';
  price?: number; // Price in USD
}

export interface Template {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  category: TemplateCategory;
  subcategory: string;
  tags: string[];
  content: string;
  difficulty?: TemplateDifficulty;
  isPro?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  variables?: string[];
  expectedOutput?: string;
  useCases?: string[];
  relatedSlugs?: string[];
  author?: string;
  createdAt?: string;
  updatedAt?: string;
  // New fields for SEO expansion
  model?: AIModel;
  pricing?: TemplatePricing;
}

export interface TemplateSubcategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  count: number;
  icon?: string;
}

export interface TemplateCategoryInfo {
  id: TemplateCategory;
  name: string;
  slug: string;
  description: string;
  subcategories: TemplateSubcategory[];
  count: number;
  isComingSoon?: boolean;
}

export interface TemplateFilter {
  category?: TemplateCategory;
  subcategory?: string;
  difficulty?: TemplateDifficulty;
  tags?: string[];
  search?: string;
  isPro?: boolean;
}

// Utility function to generate slug
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

