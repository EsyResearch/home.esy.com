import { useState, useEffect, useMemo } from 'react';
import type { SearchResult } from '@/components/SearchBar/SearchBar';
import { visualEssays, searchVisualEssays, type VisualEssay } from '@/data/visualEssays';

interface Essay {
  id: string;
  title: string;
  abstract: string;
  authors?: string[];
  tags?: string[];
  publishDate?: string;
  featured?: boolean;
}

interface UseEssaySearchProps {
  essays: Essay[];
  debounceMs?: number;
  maxResults?: number;
}

interface UseEssaySearchReturn {
  searchResults: SearchResult[];
  isLoading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showDropdown: boolean;
}

export const useEssaySearch = ({ 
  essays, 
  debounceMs = 300, 
  maxResults = 8 
}: UseEssaySearchProps): UseEssaySearchReturn => {
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

  // Filter essays based on search term (includes both text essays and visual essays)
  const searchResults = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return [];
    }

    const searchLower = debouncedSearchTerm.toLowerCase();
    
    // Search text essays
    const textEssayResults = essays
      .filter(essay => {
        return (
          essay.title.toLowerCase().includes(searchLower) ||
          essay.abstract.toLowerCase().includes(searchLower) ||
          (essay.authors && essay.authors.some(author => 
            author.toLowerCase().includes(searchLower)
          )) ||
          (essay.tags && essay.tags.some(tag => 
            tag.toLowerCase().includes(searchLower)
          ))
        );
      })
      .map(essay => ({
        id: essay.id,
        title: essay.title,
        description: essay.abstract,
        category: essay.tags?.[0] || 'Essay',
        slug: `/essays/${essay.id}`,
        type: 'article' as const,
        isPro: essay.featured || false,
        metadata: {
          authors: essay.authors,
          publishDate: essay.publishDate,
          tags: essay.tags
        }
      }));
    
    // Search visual essays
    const visualEssayResults = searchVisualEssays(debouncedSearchTerm)
      .map((essay: VisualEssay) => ({
        id: essay.id,
        title: essay.title,
        description: essay.subtitle,
        category: `Visual Essay · ${essay.category}`,
        slug: essay.href,
        type: 'article' as const,
        isPro: essay.isNew || false,
        metadata: {
          tags: essay.tags,
          readTime: essay.readTime
        }
      }));
    
    // Combine and limit results (visual essays first, then text essays)
    return [...visualEssayResults, ...textEssayResults].slice(0, maxResults);
  }, [essays, debouncedSearchTerm, maxResults]);

  const showDropdown = searchTerm.length > 0;

  return {
    searchResults,
    isLoading,
    searchTerm,
    setSearchTerm,
    showDropdown
  };
};