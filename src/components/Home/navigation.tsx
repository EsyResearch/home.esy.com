"use client";

import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import Logo from "@/components/Logo";
import Link from "next/link";
import HeaderSearch from "@/components/HeaderSearch/HeaderSearch";
import NewsletterModal from "@/components/NewsletterModal/NewsletterModal";
import { getAllPrompts } from "@/lib/prompts";
import { getCTAConfig, getResponsiveCTAText } from "@/lib/ctaMapping";
import { lightTheme } from "@/lib/lightTheme";

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
    const [isLightMode, setIsLightMode] = useState(false);

    // Detect theme from various sources
    useEffect(() => {
      const checkTheme = () => {
        // Enhanced theme detection with debugging
        let isLight = false;
        const debugInfo: string[] = [];
        
        // Check body classes
        const bodyClasses = document.body.className;
        const htmlClasses = document.documentElement.className;
        if (bodyClasses?.includes('light') || htmlClasses?.includes('light')) {
          isLight = true;
          debugInfo.push('class-based');
        }
        
        // Check localStorage
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'light') {
          isLight = true;
          debugInfo.push('localStorage');
        }
        
        // Check computed background color
        const bgColor = window.getComputedStyle(document.body).backgroundColor;
        const bgColorRgb = bgColor.match(/\d+/g);
        
        if (bgColorRgb) {
          const r = parseInt(bgColorRgb[0]);
          const g = parseInt(bgColorRgb[1]);
          const b = parseInt(bgColorRgb[2]);
          const avg = (r + g + b) / 3;
          
          // Light background = high RGB values (typically > 200 average)
          if (avg > 200) {
            isLight = true;
            debugInfo.push(`bg-color(${r},${g},${b})`);
          }
        }
        
        // Special check for school articles with theme toggle
        if (pathname?.includes('/school/articles')) {
          const themeToggle = document.querySelector('[aria-label="Toggle theme"]');
          if (themeToggle) {
            const toggleHTML = themeToggle.innerHTML;
            // Sun icon visible = light mode active
            if (toggleHTML?.includes('M12 3v1m0') || toggleHTML?.includes('Sun')) {
              isLight = true;
              debugInfo.push('toggle-sun-icon');
            }
          }
        }
        
        console.log(`[Navigation Theme] isLight: ${isLight}, detected via: ${debugInfo.join(', ') || 'none'}, path: ${pathname}`);
        setIsLightMode(isLight);
        
        // Update nav link and logo colors based on theme
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
          const element = link as HTMLElement;
          if (isLight) {
            element.style.color = '#475569';
            element.style.textShadow = 'none';
          } else {
            element.style.color = '#94a3b8';  // var(--text-muted) equivalent
            element.style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.2)';
          }
        });
        
        // Update logo text color
        const logoElements = document.querySelectorAll('.logo');
        logoElements.forEach(logo => {
          const element = logo as HTMLElement;
          if (isLight) {
            element.style.color = '#1e293b';
            element.style.textShadow = 'none';
          } else {
            element.style.color = '#ffffff';
            element.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)';
          }
        });
        
        // Update CTA button
        const ctaButtons = document.querySelectorAll('.nav-cta');
        ctaButtons.forEach(btn => {
          const element = btn as HTMLElement;
          if (isLight) {
            element.style.backgroundColor = '#7c3aed';
            element.style.color = '#ffffff';
          } else {
            element.style.backgroundColor = '#8b5cf6';
            element.style.color = '#ffffff';
          }
        });
        
        // Update mobile menu elements
        const mobileNav = document.querySelector('.mobile-nav') as HTMLElement;
        if (mobileNav) {
          if (isLight) {
            mobileNav.style.background = 'rgba(255, 255, 255, 0.98)';
          } else {
            mobileNav.style.background = 'rgba(10, 10, 15, 0.98)';
          }
        }
        
        const mobileMenuButton = document.querySelector('.mobile-menu-button') as HTMLElement;
        if (mobileMenuButton) {
          mobileMenuButton.style.color = isLight ? '#1e293b' : '#ffffff';
        }
        
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
          const element = link as HTMLElement;
          if (isLight) {
            element.style.color = '#1e293b';
            element.style.borderBottom = '1px solid rgba(203, 213, 225, 0.3)';
          } else {
            element.style.color = '#ffffff';
            element.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
          }
        });
      };
      
      checkTheme();
      // Listen for theme changes
      const observer = new MutationObserver(() => {
        checkTheme();
        // Force update nav styles when theme changes
        window.dispatchEvent(new Event('scroll'));
      });
      observer.observe(document.body, { 
        attributes: true, 
        attributeFilter: ['class', 'style'],
        subtree: true 
      });
      observer.observe(document.documentElement, { 
        attributes: true, 
        attributeFilter: ['class', 'style'] 
      });
      
      // Also check when clicking anywhere (to catch theme toggle clicks)
      const handleClick = () => {
        setTimeout(() => {
          checkTheme();
          // Force update nav styles when theme changes
          window.dispatchEvent(new Event('scroll'));
        }, 50);
      };
      document.addEventListener('click', handleClick);
      
      // Also check on pathname changes
      const timeoutId = setTimeout(() => {
        checkTheme();
        window.dispatchEvent(new Event('scroll'));
      }, 100);
      
      return () => {
        observer.disconnect();
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClick);
      };
    }, [pathname]);

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
        const navInner = nav?.querySelector('.nav-inner');
        const scrollY = window.scrollY;
        const isHomepage = pathname === '/' || pathname === '';
        
        if (scrollY === 0) {
          if (isHomepage) {
            // Homepage: Completely transparent - unified with hero
            nav.style.background = 'transparent';
            nav.style.boxShadow = 'none';
            nav.style.borderBottom = 'none';
            nav.style.backdropFilter = 'none';
            nav.style.webkitBackdropFilter = 'none';
            // Text shadows based on theme
            if (navInner) {
              navInner.style.textShadow = isLightMode 
                ? 'none'  // No shadow needed on light backgrounds
                : '0 2px 4px rgba(0, 0, 0, 0.5), 0 4px 12px rgba(0, 0, 0, 0.3)';
            }
          } else {
            // Other pages: Theme-aware styling
            if (isLightMode) {
              nav.style.background = 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 250, 250, 0.95) 100%)';
              nav.style.boxShadow = lightTheme.shadows?.sm || '0 1px 3px rgba(0, 0, 0, 0.06)';
              nav.style.borderBottom = `1px solid ${lightTheme.border}`;
            } else {
              nav.style.background = 'linear-gradient(180deg, rgba(31, 31, 35, 0.95) 0%, rgba(24, 24, 27, 0.85) 100%)';
              nav.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.2)';
              nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            }
            nav.style.backdropFilter = 'blur(20px)';
              (nav.style as any).webkitBackdropFilter = 'blur(20px)';
            // Text shadow
            if (navInner) {
              (navInner as HTMLElement).style.textShadow = isLightMode ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.2)';
            }
          }
        } else if (scrollY < 50) {
          if (isHomepage) {
            // Homepage: Progressive fade-in of header
            const progress = scrollY / 50;
            if (isLightMode) {
              nav.style.background = `rgba(255, 255, 255, ${progress * 0.98})`;
              nav.style.boxShadow = `0 1px 3px rgba(0, 0, 0, ${progress * 0.06})`;
              nav.style.borderBottom = `1px solid rgba(0, 0, 0, ${progress * 0.08})`;
            } else {
              nav.style.background = `rgba(31, 31, 35, ${progress * 0.85})`;
              nav.style.boxShadow = `0 1px 3px rgba(0, 0, 0, ${progress * 0.2})`;
              nav.style.borderBottom = `1px solid rgba(255, 255, 255, ${progress * 0.1})`;
            }
            nav.style.backdropFilter = `blur(${progress * 20}px)`;
              (nav.style as any).webkitBackdropFilter = `blur(${progress * 20}px)`;
            // Text shadow handling
            if (navInner) {
              if (isLightMode) {
                (navInner as HTMLElement).style.textShadow = 'none';
              } else {
                const shadowOpacity = 1 - (progress * 0.5);
                (navInner as HTMLElement).style.textShadow = `0 2px 4px rgba(0, 0, 0, ${shadowOpacity * 0.5}), 0 4px 12px rgba(0, 0, 0, ${shadowOpacity * 0.3})`;
              }
            }
          } else {
            // Other pages: Already have full header, just subtle enhancement
            if (isLightMode) {
              nav.style.background = 'rgba(255, 255, 255, 0.98)';
              nav.style.boxShadow = lightTheme.shadows?.md || '0 2px 6px rgba(0, 0, 0, 0.08)';
              nav.style.borderBottom = `1px solid ${lightTheme.border}`;
            } else {
              nav.style.background = 'linear-gradient(180deg, rgba(31, 31, 35, 0.95) 0%, rgba(24, 24, 27, 0.9) 100%)';
              nav.style.boxShadow = '0 1px 4px rgba(0, 0, 0, 0.25)';
              nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            }
            nav.style.backdropFilter = 'blur(20px)';
              (nav.style as any).webkitBackdropFilter = 'blur(20px)';
            if (navInner) {
              (navInner as HTMLElement).style.textShadow = isLightMode ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.2)';
            }
          }
        } else if (scrollY < 100) {
          // Both homepage and other pages converge to similar style
          if (isLightMode) {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = lightTheme.shadows?.sm || '0 1px 3px rgba(0, 0, 0, 0.06)';
            nav.style.borderBottom = `1px solid ${lightTheme.border}`;
          } else {
            nav.style.background = 'rgba(31, 31, 35, 0.85)';
            nav.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.2)';
            nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
          }
          nav.style.backdropFilter = 'blur(20px)';
              (nav.style as any).webkitBackdropFilter = 'blur(20px)';
          // Text shadow
            if (navInner) {
              (navInner as HTMLElement).style.textShadow = isLightMode ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.2)';
            }
        } else {
          // Fully scrolled - maximum elevation
          if (isLightMode) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = lightTheme.shadows?.lg || '0 4px 10px rgba(0, 0, 0, 0.1)';
            nav.style.borderBottom = `1px solid ${lightTheme.border}`;
          } else {
            nav.style.background = 'rgba(24, 24, 27, 0.98)';
            nav.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(0, 0, 0, 0.5)';
            nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
          }
          nav.style.backdropFilter = 'blur(20px) saturate(150%)';
              (nav.style as any).webkitBackdropFilter = 'blur(20px) saturate(150%)';
          // Text shadow
            if (navInner) {
              (navInner as HTMLElement).style.textShadow = isLightMode ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.2)';
            }
        }
      };
      
      // Set initial state
      handleScroll();
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname, isLightMode]);

  
    return (
      <>
      <nav className="nav" id="nav">
        <div className="nav-inner">
          <Link 
            href="/" 
            className="logo"
            style={{
              color: isLightMode ? '#1e293b' : '#ffffff',
              textShadow: isLightMode ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)'
            }}
          >
            <Logo 
              key={`logo-${isLightMode ? 'light' : 'dark'}`} // Force re-render on theme change
              suffix={logoSuffix} 
              href="" 
              showText={false} 
              theme={isLightMode ? 'light' : 'dark'} 
            />
          </Link>
          
          {/* Header Search - Show on prompt-library and glossary view pages */}
          {showHeaderSearch && (
            <HeaderSearch 
              prompts={searchData} 
              className="header-search"
              searchContext={searchContext}
              isLightMode={isLightMode}
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
                fontFamily: 'inherit',
                backgroundColor: isLightMode ? '#7c3aed' : '#8b5cf6',
                color: '#ffffff'
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