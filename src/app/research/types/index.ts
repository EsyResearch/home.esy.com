export type PostType = 'experiment' | 'build' | 'research' | 'analysis';
export type CategoryType = 'ml' | 'tech' | 'writing' | 'academic';

export interface Post {
  id: number;
  type: PostType;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  image: string;
  featuredImage?: string;
  stats: { views: string; likes: number; comments?: number };
  mediaType?: string;
  glossaryHighlight?: string;
  relatedTerms?: string[];
  author?: string;
  subtitle?: string;
  tags?: string[];
  slug?: string;
}

export interface Theme {
  bg: string;
  elevated: string;
  text: string;
  muted: string;
  subtle: string;
  faint: string;
  border: string;
  accent: string;
}

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  author: {
    name: string;
    role: string;
  };
  date: string;
  readTime: number;
  featuredImage: string;
  tags: string[];
  content: string;
}

