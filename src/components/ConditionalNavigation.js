"use client"
import { usePathname } from 'next/navigation';
import ContextAwareNavigation from "@/components/Navigation/ContextAwareNavigation";
import { useHeaderSearch } from '@/contexts/HeaderSearchContext';
import { getSearchContextFromPath } from '@/lib/searchContexts';

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
  
  // Check if we're on scrollytelling story pages (individual stories, not index)
  // These pages have their own layout with ScrollytellingHeader + ScrollytellingTheatreBar
  const isScrollytellingStoryPage = normalizedPath?.startsWith('/scrollytelling/') && normalizedPath !== '/scrollytelling';
  
  // Check if we're on the photo-essays landing page (immersive experience with own header)
  const isPhotoEssaysPage = normalizedPath === '/photo-essays';
  
  // Check if we're on the homepage (gallery-first design with own navigation)
  const isHomePage = normalizedPath === '' || normalizedPath === '/';
  
  // Check if we're on prompt-library pages
  const isPromptLibraryPage = normalizedPath?.startsWith('/prompt-library');
  const isPromptLibraryIndex = normalizedPath === '/prompt-library';
  
  // Check if we're on glossary pages
  const isGlossaryPage = normalizedPath?.startsWith('/glossary');
  const isGlossaryIndex = normalizedPath === '/glossary';
  const isGlossaryViewPage = isGlossaryPage && !isGlossaryIndex;
  
  // Check if we're on school pages
  const isSchoolPage = normalizedPath?.startsWith('/school');
  const isSchoolIndex = normalizedPath === '/school';
  const isSchoolArticlePage = normalizedPath?.startsWith('/school/articles/');
  
  // Check if we're on essays page
  const isEssaysPage = normalizedPath === '/essays';
  
  // Check if we're on docs pages
  const isDocsPage = normalizedPath?.startsWith('/docs');
  
  // Don't render navigation on:
  // - Homepage (gallery-first design with own navigation)
  // - Essay view pages (focused reading)
  // - Docs pages (own navigation)
  // - Scrollytelling story pages (own header via ScrollytellingHeader)
  // - Photo essays landing page (immersive experience with own header)
  if (isHomePage || isEssayViewPage || isDocsPage || isScrollytellingStoryPage || isPhotoEssaysPage) {
    return null;
  }

  // Render the common navigation on all other pages
  // Show header search:
  // - Always on individual prompt pages (/prompt-library/*)
  // - On prompt library index only after scrolling past main search
  // - Always on glossary view pages (/glossary/*)
  // - On glossary index only after scrolling past main search
  // - Always on school article pages (/school/articles/*)
  // - On school index only after scrolling past main search
  // - On essays index only after scrolling past main search
  const shouldShowHeaderSearch = 
    (isPromptLibraryPage && (isPromptLibraryIndex ? showHeaderSearch : true)) ||
    (isGlossaryPage && (isGlossaryIndex ? showHeaderSearch : true)) ||
    (isSchoolPage && (isSchoolIndex ? showHeaderSearch : isSchoolArticlePage)) ||
    (isEssaysPage && showHeaderSearch);
  
  // Determine search context using centralized system
  const searchContext = getSearchContextFromPath(pathname);
  
  return <ContextAwareNavigation showHeaderSearch={shouldShowHeaderSearch} forceContext={searchContext} />;
};

export default ConditionalNavigation; 