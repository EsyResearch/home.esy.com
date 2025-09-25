"use client";

import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import Logo from "@/components/Logo";
import Link from "next/link";
import HeaderSearch from "@/components/HeaderSearch/HeaderSearch";
import NewsletterModal from "@/components/NewsletterModal/NewsletterModal";
import { getAllPrompts } from "@/lib/prompts";
import { getCTAConfig, getResponsiveCTAText } from "@/lib/ctaMapping";

// Shared suffix logic that can be used by both navigation and footer
export const getPageSuffix = (pathname) => {
  if (pathname?.startsWith('/essays')) {
    return 'Essays';
  } else if (pathname?.startsWith('/school')) {
    return 'School';
  } else if (pathname?.startsWith('/glossary')) {
    return 'Glossary';
  } else if (pathname?.startsWith('/blog')) {
    return 'Blog';
  }
  // No suffix for prompt-library
  return '';
};

interface NavigationProps {
  showHeaderSearch?: boolean;
  searchContext?: 'prompt-library' | 'glossary' | 'school' | 'essays' | 'blog' | 'general';
  pathname?: string;
}

export default function Navigation ({ 
  showHeaderSearch = false, 
  searchContext = 'general',
  pathname: propPathname
}: NavigationProps = {}) {
    const hookPathname = usePathname();
    const pathname = propPathname || hookPathname;
    const [searchData, setSearchData] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
    const [modalSource, setModalSource] = useState<'nav-tips' | 'nav-school' | 'other'>('other');

    // Use the shared suffix function
    const logoSuffix = getPageSuffix(pathname);
    
    // Get dynamic CTA configuration
    const ctaConfig = getCTAConfig(pathname);
    const responsiveCTA = getResponsiveCTAText(ctaConfig.ctaText, isMobile);
    
    
    // Mobile detection
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Load appropriate data based on search context
    useEffect(() => {
      if (showHeaderSearch) {
        if (searchContext === 'prompt-library') {
          getAllPrompts().then(setSearchData).catch(console.error);
        } else if (searchContext === 'glossary') {
          // Fetch glossary terms from static JSON
          fetch('/glossary-terms.json')
            .then(res => res.json())
            .then(terms => setSearchData(terms))
            .catch(console.error);
        } else if (searchContext === 'school') {
          // For school context, we'll pass empty data for now since school uses its own search
          setSearchData([]);
        } else if (searchContext === 'essays') {
          // Fetch essays data from static JSON
          fetch('/essays-data.json')
            .then(res => res.json())
            .then(essays => setSearchData(essays))
            .catch(console.error);
        } else if (searchContext === 'blog') {
          // Blog posts data
          const blogPosts = [
            {
              id: 1,
              slug: "future-ai-academic-writing",
              title: "The Future of AI in Academic Writing",
              excerpt: "Explore how artificial intelligence is revolutionizing academic writing, from research assistance to automated proofreading.",
              author: "Zev Uhuru",
              date: "March 28, 2025",
              readTime: 12,
              category: "AI & Technology",
              featured: true
            },
            {
              id: 2,
              slug: "mastering-prompt-engineering",
              title: "Mastering Prompt Engineering for Better AI Interactions",
              excerpt: "Learn the art and science of crafting effective prompts that unlock the full potential of AI language models.",
              author: "Zev Uhuru",
              date: "March 25, 2025",
              readTime: 8,
              category: "AI & Technology",
              featured: false
            },
            {
              id: 3,
              slug: "research-methodology-digital-age",
              title: "Research Methodology in the Digital Age",
              excerpt: "Discover modern research techniques that leverage digital tools while maintaining academic rigor.",
              author: "Zev Uhuru",
              date: "March 22, 2025",
              readTime: 15,
              category: "Research",
              featured: false
            },
            {
              id: 4,
              slug: "ai-transforming-literature-analysis",
              title: "How AI is Transforming Literature Analysis",
              excerpt: "A deep dive into computational literary analysis and how AI tools are uncovering new insights in classic texts.",
              author: "Zev Uhuru",
              date: "March 20, 2025",
              readTime: 10,
              category: "Education",
              featured: true
            }
          ];
          setSearchData(blogPosts);
        }
      }
    }, [showHeaderSearch, searchContext]);

    useEffect(() => {
      const handleScroll = () => {
        const nav = document.getElementById('nav');
        if (window.scrollY > 100) {
          nav.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
          nav.style.background = 'rgba(10, 10, 15, 1)';
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  
    return (
      <>
      <nav className="nav" id="nav">
        <div className="nav-inner">
          <Link href="/" className="logo">
            <Logo suffix={logoSuffix} href="" showText={false} />
          </Link>
          
          {/* Header Search - Show on prompt-library and glossary view pages */}
          {showHeaderSearch && (
            <HeaderSearch 
              prompts={searchData} 
              className="header-search"
              searchContext={searchContext}
            />
          )}
          
          {/* Navigation */}
          <div className="nav-links">
            {/* <a href="/essays" className="nav-link">Essays</a> */}
            {/* <a href="/research" className="nav-link">Research</a> */}
            {/* <a href="/school" className="nav-link">School</a> */}
            {/* <a href="/pricing" className="nav-link">Pricing</a> */}
            <button 
              onClick={(e) => {
                e.preventDefault();
                // Determine source based on CTA text
                const source = ctaConfig.ctaText.includes('School') ? 'nav-school' : 
                              ctaConfig.ctaText.includes('Tips') ? 'nav-tips' : 'other';
                setModalSource(source);
                setIsNewsletterModalOpen(true);
              }}
              className="nav-cta"
              style={{
                whiteSpace: responsiveCTA.shouldWrap ? 'normal' : 'nowrap',
                lineHeight: responsiveCTA.shouldWrap ? '1.2' : '1',
                textAlign: 'center',
                minHeight: responsiveCTA.shouldWrap ? 'auto' : '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
              {responsiveCTA.text}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Newsletter Modal */}
      <NewsletterModal 
        isOpen={isNewsletterModalOpen}
        onClose={() => setIsNewsletterModalOpen(false)}
        source={modalSource}
      />
    </>
    );
  };