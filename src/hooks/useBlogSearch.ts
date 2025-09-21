import { useState, useMemo } from 'react';

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
}

interface UseBlogSearchProps {
  posts: BlogPost[];
  debounceMs?: number;
  maxResults?: number;
}

export const useBlogSearch = ({ 
  posts = [], 
  debounceMs = 200, 
  maxResults = 6 
}: UseBlogSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];

    const term = searchTerm.toLowerCase();
    
    return posts
      .filter(post => 
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.author.toLowerCase().includes(term) ||
        post.category.toLowerCase().includes(term)
      )
      .slice(0, maxResults)
      .map(post => ({
        id: post.id,
        title: post.title,
        description: post.excerpt,
        author: post.author,
        category: post.category,
        readTime: post.readTime,
        slug: post.slug,
        type: 'blog-post'
      }));
  }, [searchTerm, posts, maxResults]);

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isLoading: false,
    showDropdown: searchTerm.length > 0
  };
};
