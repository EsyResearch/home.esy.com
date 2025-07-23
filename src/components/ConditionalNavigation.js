"use client"
import { usePathname } from 'next/navigation';
import Navigation from "@/components/Home/navigation";

const ConditionalNavigation = () => {
  const pathname = usePathname();
  
  // Check if we're on an essay view page (individual essay page)
  // Only hide on individual essay pages, not the essays index page
  const isEssayViewPage = pathname?.startsWith('/essays/') && pathname.split('/').length > 2;
  
  // Don't render the common navigation on essay view pages
  if (isEssayViewPage) {
    return null;
  }
  
  // Render the common navigation on all other pages
  return <Navigation />;
};

export default ConditionalNavigation; 