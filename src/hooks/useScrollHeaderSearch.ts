"use client";

import { useEffect, RefObject } from 'react';
import { useHeaderSearch } from '@/contexts/HeaderSearchContext';

/**
 * Custom hook to show/hide header search based on scroll position.
 * 
 * When the referenced element scrolls out of view (bottom < 0),
 * the header search becomes visible. When the element is in view,
 * the header search is hidden.
 * 
 * @param ref - Reference to the element to track (typically a search bar or hero section)
 * 
 * @example
 * ```tsx
 * const searchBarRef = useRef<HTMLDivElement>(null);
 * useScrollHeaderSearch(searchBarRef);
 * 
 * return <div ref={searchBarRef}><SearchBar /></div>;
 * ```
 */
export function useScrollHeaderSearch(ref: RefObject<HTMLElement | null>) {
  const { setShowHeaderSearch } = useHeaderSearch();

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const shouldShow = rect.bottom < 0;
        setShowHeaderSearch(shouldShow);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
      setShowHeaderSearch(false); // Reset when unmounting
    };
  }, [ref, setShowHeaderSearch]);
}

export default useScrollHeaderSearch;
