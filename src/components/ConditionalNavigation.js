"use client"
import { usePathname } from 'next/navigation';
import Navigation from "@/components/Home/navigation";
import { useHeaderSearch } from '@/contexts/HeaderSearchContext';

const ConditionalNavigation = () => {
  const pathname = usePathname();
  const { showHeaderSearch } = useHeaderSearch();
  
  // Check if we're on an essay view page (individual essay page)
  // Only hide on individual essay pages, not the essays index page
  // Handle both trailing slash (production) and no trailing slash (development) cases
  const normalizedPath = pathname?.endsWith('/') && pathname.length > 1 
    ? pathname.slice(0, -1) 
    : pathname;
  const isEssayViewPage = normalizedPath?.startsWith('/essays/') && normalizedPath !== '/essays';
  
  // Check if we're on prompt-library pages
  const isPromptLibraryPage = normalizedPath?.startsWith('/prompt-library');
  const isPromptLibraryIndex = normalizedPath === '/prompt-library';
  
  // Check if we're on glossary pages
  const isGlossaryPage = normalizedPath?.startsWith('/glossary');
  const isGlossaryIndex = normalizedPath === '/glossary';
  const isGlossaryViewPage = isGlossaryPage && !isGlossaryIndex;
  
  // Don't render the common navigation on essay view pages
  if (isEssayViewPage) {
    return null;
  }

  // Render the common navigation on all other pages
  // Show header search:
  // - Always on individual prompt pages (/prompt-library/*)
  // - On prompt library index only after scrolling past main search
  // - Always on glossary view pages (/glossary/*)
  const shouldShowHeaderSearch = 
    (isPromptLibraryPage && (isPromptLibraryIndex ? showHeaderSearch : true)) ||
    isGlossaryViewPage;
  
  // Determine search context
  const searchContext = isGlossaryViewPage ? 'glossary' : 
                       isPromptLibraryPage ? 'prompt-library' : 
                       'general';
  
  return <Navigation showHeaderSearch={shouldShowHeaderSearch} searchContext={searchContext} />;
};

export default ConditionalNavigation; 