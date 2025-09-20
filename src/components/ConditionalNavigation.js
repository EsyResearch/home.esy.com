"use client"
import { usePathname } from 'next/navigation';
import Navigation from "@/components/Home/navigation";

const ConditionalNavigation = () => {
  const pathname = usePathname();
  
  // Check if we're on an essay view page (individual essay page)
  // Only hide on individual essay pages, not the essays index page
  // Handle both trailing slash (production) and no trailing slash (development) cases
  const normalizedPath = pathname?.endsWith('/') && pathname.length > 1 
    ? pathname.slice(0, -1) 
    : pathname;
  const isEssayViewPage = normalizedPath?.startsWith('/essays/') && normalizedPath !== '/essays';
  
  // Check if we're on prompt-library pages
  const isPromptLibraryPage = normalizedPath?.startsWith('/prompt-library');
  
  // Don't render the common navigation on essay view pages
  if (isEssayViewPage) {
    return null;
  }

  // Render the common navigation on all other pages
  return <Navigation showHeaderSearch={isPromptLibraryPage} />;
};

export default ConditionalNavigation; 