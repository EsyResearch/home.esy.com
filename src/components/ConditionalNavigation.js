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
  const isEssayViewPage = normalizedPath?.startsWith('/essays/') && normalizedPath !== '/essays' && normalizedPath !== '/essays/guides';
  
  // Check if we're on scrollytelling story pages (individual stories, not index)
  // These pages have their own layout with ScrollytellingHeader + ScrollytellingTheatreBar
  const isScrollytellingStoryPage = normalizedPath?.startsWith('/scrollytelling/') && normalizedPath !== '/scrollytelling';
  
  // Check if we're on the photo-essays landing page (immersive experience with own header)
  const isPhotoEssaysPage = normalizedPath === '/photo-essays';
  
  
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
  
  // Check if we're on templates pages
  const isTemplatesPage = normalizedPath?.startsWith('/templates');
  const isTemplatesIndex = normalizedPath === '/templates';
  
  // Check if we're on the homepage
  const isHomepage = normalizedPath === '' || normalizedPath === '/';
  
  // Check if we're on scrollytelling index
  const isScrollytellingIndex = normalizedPath === '/scrollytelling';
  
  // Check if we're on static info pages (always show header search)
  const isAboutPage = normalizedPath === '/about';
  const isPrivacyPage = normalizedPath === '/privacy';
  const isTermsPage = normalizedPath === '/terms';
  const isAgenticWorkflowsPage = normalizedPath === '/agentic-workflows';
  
  // Check if we're on docs pages
  const isDocsPage = normalizedPath?.startsWith('/docs');
  
  // Don't render navigation on:
  // - Essay view pages (focused reading)
  // - Docs pages (own navigation)
  // - Scrollytelling story pages (own header via ScrollytellingHeader)
  // - Photo essays landing page (immersive experience with own header)
  if (isEssayViewPage || isDocsPage || isScrollytellingStoryPage || isPhotoEssaysPage) {
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
  // - Always on essays index (visible on page load)
  // - On templates index only after scrolling past main search
  // - On scrollytelling index only after scrolling past discovery bar
  // - NO search on about, privacy, terms, agentic-workflows (informational pages)
  const shouldShowHeaderSearch =
    (isPromptLibraryPage && (isPromptLibraryIndex ? showHeaderSearch : true)) ||
    (isGlossaryPage && (isGlossaryIndex ? showHeaderSearch : true)) ||
    (isSchoolPage && (isSchoolIndex ? showHeaderSearch : isSchoolArticlePage)) ||
    (isTemplatesPage && (isTemplatesIndex ? showHeaderSearch : true)) ||
    (isEssaysPage && showHeaderSearch) ||  // Essays: show after scroll (desktop only via HeaderSearch)
    (isHomepage && showHeaderSearch);
  
  // Determine search context using centralized system
  const searchContext = getSearchContextFromPath(pathname);
  
  return <ContextAwareNavigation showHeaderSearch={shouldShowHeaderSearch} forceContext={searchContext} />;
};

export default ConditionalNavigation; 