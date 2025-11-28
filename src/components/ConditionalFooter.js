"use client"
import { usePathname } from 'next/navigation';
import Footer from "@/components/Home/footer";
import CopyrightFooter from "@/components/CopyrightFooter";

const ConditionalFooter = () => {
  const pathname = usePathname();
  
  // Check if we're on an essay view page (individual essay page)
  // Only hide on individual essay pages, not the essays index page
  // Handle both trailing slash (production) and no trailing slash (development) cases
  const normalizedPath = pathname?.endsWith('/') && pathname.length > 1 
    ? pathname.slice(0, -1) 
    : pathname;
  const isEssayViewPage = normalizedPath?.startsWith('/essays/') && normalizedPath !== '/essays';
  
  // Don't render the common footer on essay view pages for a focused reading experience
  if (isEssayViewPage) {
    return null;
  }
  
  // Check if we're on a prompt library page (individual prompt or category page)
  const isPromptPage = normalizedPath?.startsWith('/prompt-library/') && normalizedPath !== '/prompt-library';
  
  // Don't render footer on prompt pages (they handle their own footer)
  if (isPromptPage) {
    return null;
  }
  
  // Check if we're on docs pages (they handle their own footer via DocsPageNav)
  const isDocsPage = normalizedPath?.startsWith('/docs');
  if (isDocsPage) {
    return null;
  }
  
  // Render the common footer on all other pages
  return <Footer />;
};

export default ConditionalFooter; 