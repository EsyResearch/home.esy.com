import { usePathname } from 'next/navigation';
import { 
  getSearchContextFromPath, 
  getSearchContextConfigFromPath,
  type SearchContext 
} from '@/lib/searchContexts';

/**
 * Hook for managing search context across pages
 * Provides automatic context detection and configuration
 */
export const useSearchContext = (forceContext?: SearchContext) => {
  const pathname = usePathname();
  
  // Determine the search context
  const searchContext = forceContext || getSearchContextFromPath(pathname);
  const contextConfig = getSearchContextConfigFromPath(pathname);
  
  return {
    searchContext,
    contextConfig,
    isContextActive: (context: SearchContext) => searchContext === context,
    getSearchUrl: (searchTerm: string) => `${contextConfig.searchUrl}${encodeURIComponent(searchTerm)}`,
    getResultUrl: (slug: string) => contextConfig.resultUrlPattern ? `${contextConfig.resultUrlPattern}${slug}` : slug
  };
};
