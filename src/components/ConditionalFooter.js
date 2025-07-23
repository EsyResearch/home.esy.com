"use client"
import { usePathname } from 'next/navigation';
import Footer from "@/components/Home/footer";

const ConditionalFooter = () => {
  const pathname = usePathname();
  
  // Check if we're on an essay view page (individual essay page)
  const isEssayViewPage = pathname?.startsWith('/essays/') && pathname !== '/essays';
  
  // Don't render the common footer on essay view pages for a focused reading experience
  if (isEssayViewPage) {
    return null;
  }
  
  // Render the common footer on all other pages
  return <Footer />;
};

export default ConditionalFooter; 