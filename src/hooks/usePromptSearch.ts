import { useState, useEffect, useMemo } from 'react';
import type { SearchResult } from '@/components/SearchBar/SearchBar';

interface Prompt {
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
}

interface UsePromptSearchProps {
  prompts: Prompt[];
  debounceMs?: number;
  maxResults?: number;
}

interface UsePromptSearchReturn {
  searchResults: SearchResult[];
  isLoading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showDropdown: boolean;
}

export const usePromptSearch = ({ 
  prompts, 
  debounceMs = 300, 
  maxResults = 8 
}: UsePromptSearchProps): UsePromptSearchReturn => {
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

  // Filter prompts based on search term
  const searchResults = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return [];
    }

    const filtered = prompts
      .filter(prompt => {
        const searchLower = debouncedSearchTerm.toLowerCase();
        return (
          prompt.title.toLowerCase().includes(searchLower) ||
          prompt.description.toLowerCase().includes(searchLower) ||
          prompt.shortDescription.toLowerCase().includes(searchLower) ||
          prompt.category.toLowerCase().includes(searchLower) ||
          (prompt.tags && prompt.tags.some(tag => 
            tag.toLowerCase().includes(searchLower)
          ))
        );
      })
      .slice(0, maxResults)
      .map(prompt => ({
        id: prompt.id,
        title: prompt.title,
        description: prompt.shortDescription,
        category: prompt.category,
        slug: prompt.slug,
        type: 'prompt' as const,
        isPro: prompt.isPro
      }));

    return filtered;
  }, [prompts, debouncedSearchTerm, maxResults]);

  const showDropdown = searchTerm.length > 0;

  return {
    searchResults,
    isLoading,
    searchTerm,
    setSearchTerm,
    showDropdown
  };
};
