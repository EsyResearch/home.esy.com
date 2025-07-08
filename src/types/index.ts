// src/types/index.ts

export interface Essay {
    id: number;
    title: string;
    type: string;
    words: number;
    progress: number;
    status: string;
    lastEdited: string;
  }
  
  export interface Template {
    id: number;
    title: string;
    desc: string;
  }
  
  export interface Prompt {
    id: number;
    title: string;
    desc: string;
  }
  
  export interface LLMProvider {
    [company: string]: string[];
  }

// Glossary Types
export type CategoryType = 'writing' | 'structure' | 'research' | 'citation' | 'grammar';

export interface GlossaryTerm {
  id: string;
  term: string;
  category: CategoryType;
  definition: string;
  views: number;
  readTime: number;
  popularity: number;
  lastUpdated: string;
}

export interface GlossaryTermDetail extends GlossaryTerm {
  pronunciation?: string;
  extendedDefinition: string;
  personalNote?: string;
  usage?: string;
  example?: {
    code: string;
    output: string;
  };
  relatedTerms: Array<{
    id: string;
    term: string;
  }>;
  relatedPosts: Array<{
    title: string;
    date: string;
    url: string;
  }>;
  relatedArticles?: Array<{
    title: string;
    description: string;
    type: string;
  }>;
  etymology?: string;
  firstAdded: string;
  stats: {
    views: number;
    avgReadTime: string;
    bookmarks: number;
    shares: number;
  };
  updateHistory: Array<{
    date: string;
    change: string;
  }>;
}

export interface GlossaryCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; color?: string }> | null;
  color: string;
}

export interface TermOfDay {
  term: string;
  definition: string;
  category: CategoryType;
  personalNote: string;
  views: number;
  isNew: boolean;
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