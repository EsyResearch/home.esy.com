import { useState, useEffect, useMemo } from 'react';
import type { SearchResult } from '@/components/SearchBar/SearchBar';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: number;
  category: string;
  featured: boolean;
  tags?: string[];
}

interface UseBlogSearchProps {
  posts: BlogPost[];
  debounceMs?: number;
  maxResults?: number;
}

interface UseBlogSearchReturn {
  searchResults: SearchResult[];
  isLoading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showDropdown: boolean;
}

export const useBlogSearch = ({ 
  posts = [], 
  debounceMs = 300, 
  maxResults = 8 
}: UseBlogSearchProps): UseBlogSearchReturn => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Debounce search term
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setIsLoading(false);
    }, debounceMs);

    return () => {
      clearTimeout(timer);
      setIsLoading(false);
    };
  }, [searchTerm, debounceMs]);

  // Filter blog posts based on search term
  const searchResults = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return [];
    }

    const searchLower = debouncedSearchTerm.toLowerCase();
    
    const filtered = posts
      .filter(post => {
        return (
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower) ||
          post.category.toLowerCase().includes(searchLower) ||
          post.author.toLowerCase().includes(searchLower) ||
          (post.tags && post.tags.some(tag => 
            tag.toLowerCase().includes(searchLower)
          ))
        );
      })
      .slice(0, maxResults)
      .map(post => ({
        id: post.id,
        title: post.title,
        description: post.excerpt,
        category: post.category,
        slug: post.slug,
        type: 'article' as const,
        metadata: {
          author: post.author,
          date: post.date,
          readTime: post.readTime,
          featured: post.featured
        }
      }));

    return filtered;
  }, [posts, debouncedSearchTerm, maxResults]);

  const showDropdown = searchTerm.length > 0;

  return {
    searchResults,
    isLoading,
    searchTerm,
    setSearchTerm,
    showDropdown
  };
};
