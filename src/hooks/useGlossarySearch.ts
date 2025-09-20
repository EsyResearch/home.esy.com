import { useState, useEffect, useMemo } from 'react';
import type { SearchResult } from '../components/SearchBar/SearchBar';

interface GlossaryTerm {
  slug: string;
  title?: string;
  term?: string;
  definition?: string;
  category?: string;
  pronunciation?: string;
}

interface UseGlossarySearchProps {
  terms: GlossaryTerm[];
  debounceMs?: number;
  maxResults?: number;
}

export const useGlossarySearch = ({ 
  terms, 
  debounceMs = 300, 
  maxResults = 8 
}: UseGlossarySearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, debounceMs]);

  const searchResults = useMemo(() => {
    if (!debouncedSearchTerm || !terms || terms.length === 0) {
      return [];
    }

    const lowercasedSearchTerm = debouncedSearchTerm.toLowerCase();

    const filtered = terms.filter(term => {
      const termTitle = term.title || term.term || '';
      const termDefinition = term.definition || '';
      const termCategory = term.category || '';
      const termPronunciation = term.pronunciation || '';

      return (
        termTitle.toLowerCase().includes(lowercasedSearchTerm) ||
        termDefinition.toLowerCase().includes(lowercasedSearchTerm) ||
        termCategory.toLowerCase().includes(lowercasedSearchTerm) ||
        termPronunciation.toLowerCase().includes(lowercasedSearchTerm)
      );
    }).map(term => ({
      id: term.slug,
      title: term.title || term.term || '',
      description: term.definition?.substring(0, 100) + (term.definition && term.definition.length > 100 ? '...' : ''),
      category: term.category,
      slug: term.slug,
      type: 'glossary' as const,
      metadata: {
        pronunciation: term.pronunciation
      }
    }));

    return filtered.slice(0, maxResults);
  }, [debouncedSearchTerm, terms, maxResults]);

  // Update loading and dropdown states in effect
  useEffect(() => {
    if (!debouncedSearchTerm || !terms || terms.length === 0) {
      setIsLoading(false);
      setShowDropdown(false);
    } else {
      setIsLoading(false);
      setShowDropdown(searchResults.length > 0);
    }
  }, [debouncedSearchTerm, terms, searchResults.length]);

  return { 
    searchResults, 
    isLoading, 
    searchTerm, 
    setSearchTerm, 
    showDropdown 
  };
};
