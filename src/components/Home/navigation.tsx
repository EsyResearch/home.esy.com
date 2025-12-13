"use client";

import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import Logo from "@/components/Logo";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import HeaderSearch from "@/components/HeaderSearch/HeaderSearch";
import NewsletterModal from "@/components/NewsletterModal/NewsletterModal";
import NavDropdown from "@/components/NavDropdown/NavDropdown";
import { VisualEssaysIcon, EssayExamplesIcon, WritingGuidesIcon, ChatGPTIcon, ClaudeIcon, GeminiIcon } from "@/components/NavDropdown/NavDropdownIcons";
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
  } else if (pathname?.startsWith('/research')) {
    return 'Research';
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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
    const [modalSource, setModalSource] = useState<'nav-tips' | 'nav-school' | 'other'>('other');
    const [isLightMode, setIsLightMode] = useState(false);

    // Detect theme from various sources with page-specific logic
    useEffect(() => {
      const checkTheme = () => {
        // Enhanced theme detection with page-specific storage
        let isLight = false;
        const debugInfo: string[] = [];
        
        // CRITICAL: Only apply theme to pages that ACTUALLY have theme toggles
        // Index pages (/school, /blog) NEVER have toggles and should ALWAYS be dark
        
        // Normalize pathname to handle trailing slashes
        const normalizedPath = pathname?.endsWith('/') && pathname.length > 1 
          ? pathname.slice(0, -1) 
          : pathname || '';
        
        // Determine if current page has a theme toggle
        // Only article pages have toggles, NOT index pages
        const isSchoolArticle = normalizedPath.includes('/school/articles/');
        const isBlogArticle = normalizedPath.includes('/blog/') && normalizedPath !== '/blog';
        const hasThemeToggle = isSchoolArticle || isBlogArticle;
        
        if (hasThemeToggle) {
          // Only article pages can have theme preferences
          const sectionKey = isSchoolArticle ? 'school' : 'blog';
          const themeStorageKey = `theme-${sectionKey}`;
          
          // Check localStorage for section-specific theme
          const storedTheme = localStorage.getItem(themeStorageKey);
          
          if (storedTheme === 'light') {
            // User has explicitly set light mode for this section's articles
            isLight = true;
            debugInfo.push(`localStorage-${sectionKey}`);
          } else if (storedTheme === 'dark') {
            // User has explicitly set dark mode for this section's articles
            isLight = false;
            debugInfo.push(`localStorage-${sectionKey}-dark`);
          } else {
            // No stored preference - articles default to light
            isLight = true;
            debugInfo.push(`default-${sectionKey}-article-light`);
          }
          
          // Check body classes as override (for real-time toggle updates)
          const bodyClasses = document.body.className;
          const htmlClasses = document.documentElement.className;
          if (bodyClasses?.includes('light') || htmlClasses?.includes('light')) {
            isLight = true;
            debugInfo.push('class-override');
          } else if (bodyClasses?.includes('dark') || htmlClasses?.includes('dark')) {
            isLight = false;
            debugInfo.push('class-override-dark');
          }
          
          // Check theme toggle button state for real-time updates
          const themeToggle = document.querySelector('[aria-label="Toggle theme"]');
          if (themeToggle) {
            const toggleHTML = themeToggle.innerHTML;
            // Moon icon visible = dark mode active (user sees moon to switch to dark)
            // Sun icon visible = light mode active (user sees sun to switch to light)
            if (toggleHTML?.includes('M12 3v1m0') || toggleHTML?.includes('Sun')) {
              isLight = true;
              debugInfo.push('toggle-light');
            } else if (toggleHTML?.includes('M12 2v2') || toggleHTML?.includes('Moon')) {
              isLight = false;
              debugInfo.push('toggle-dark');
            }
          }
        } else {
          // Pages without theme toggle ALWAYS use dark mode
          // This includes /school index, /blog index, and all other pages
          isLight = false;
          debugInfo.push('no-toggle-always-dark');
        }
        
        console.log(`[Navigation Theme] isLight: ${isLight}, hasToggle: ${hasThemeToggle}, detected via: ${debugInfo.join(', ') || 'none'}, path: ${normalizedPath}`);
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
      
      // IMMEDIATE CHECK: Run theme detection multiple times to catch timing issues
      // This ensures we catch the theme changes that happen during component mounting
      setTimeout(() => checkTheme(), 10);
      setTimeout(() => checkTheme(), 50);
      setTimeout(() => checkTheme(), 100);
      setTimeout(() => checkTheme(), 200);
      
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
      
      // Listen for custom theme change events
      const handleThemeChange = () => {
        checkTheme();
        window.dispatchEvent(new Event('scroll'));
      };
      window.addEventListener('themechange', handleThemeChange);
      
      // Also check on pathname changes
      const timeoutId = setTimeout(() => {
        checkTheme();
        window.dispatchEvent(new Event('scroll'));
      }, 100);
      
      return () => {
        observer.disconnect();
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClick);
        window.removeEventListener('themechange', handleThemeChange);
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
        if (!nav) return; // Guard clause if nav doesn't exist yet
        
        const navInner = nav.querySelector('.nav-inner');
        const scrollY = window.scrollY;
        
        // Normalize pathname to handle trailing slashes and undefined states
        const normalizedPath = pathname?.endsWith('/') && pathname.length > 1 
          ? pathname.slice(0, -1) 
          : pathname || '';
        
        const isHomepage = normalizedPath === '/' || normalizedPath === '';
        const isBlogIndexPage = normalizedPath === '/blog';
        const isScrollytellingPage = normalizedPath?.startsWith('/scrollytelling');
        const shouldBeTransparent = isHomepage || isBlogIndexPage || isScrollytellingPage;
        
        if (scrollY === 0) {
          if (shouldBeTransparent) {
            // Homepage/Blog index: Completely transparent - unified with hero
            nav.style.background = 'transparent';
            nav.style.boxShadow = 'none';
            nav.style.borderBottom = 'none';
            nav.style.backdropFilter = 'none';
            (nav.style as any).webkitBackdropFilter = 'none';
            // Text shadows for visibility - ALWAYS dark mode for blog index
            if (navInner) {
              (navInner as HTMLElement).style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.5), 0 4px 12px rgba(0, 0, 0, 0.3)';
            }
          } else {
            // Other pages: Theme-aware styling (but blog index never gets here)
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
          if (shouldBeTransparent) {
            // Homepage/Blog index: Progressive fade-in of header - ALWAYS DARK
            const progress = scrollY / 50;
            // Blog index page should ALWAYS show dark navigation when scrolling
            nav.style.background = `rgba(31, 31, 35, ${progress * 0.85})`;
            nav.style.boxShadow = `0 1px 3px rgba(0, 0, 0, ${progress * 0.2})`;
            nav.style.borderBottom = `1px solid rgba(255, 255, 255, ${progress * 0.1})`;
            nav.style.backdropFilter = `blur(${progress * 20}px)`;
            (nav.style as any).webkitBackdropFilter = `blur(${progress * 20}px)`;
            // Text shadow handling
            if (navInner) {
              const shadowOpacity = 1 - (progress * 0.5);
              (navInner as HTMLElement).style.textShadow = `0 2px 4px rgba(0, 0, 0, ${shadowOpacity * 0.5}), 0 4px 12px rgba(0, 0, 0, ${shadowOpacity * 0.3})`;
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
          // Blog index should ALWAYS be dark regardless of theme
          if (isBlogIndexPage || !isLightMode) {
            nav.style.background = 'rgba(31, 31, 35, 0.85)';
            nav.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.2)';
            nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
          } else if (isLightMode) {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = lightTheme.shadows?.sm || '0 1px 3px rgba(0, 0, 0, 0.06)';
            nav.style.borderBottom = `1px solid ${lightTheme.border}`;
          }
          nav.style.backdropFilter = 'blur(20px)';
              (nav.style as any).webkitBackdropFilter = 'blur(20px)';
          // Text shadow
            if (navInner) {
              (navInner as HTMLElement).style.textShadow = isLightMode ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.2)';
            }
        } else {
          // Fully scrolled - maximum elevation
          // Blog index should ALWAYS be dark regardless of theme
          if (isBlogIndexPage || !isLightMode) {
            nav.style.background = 'rgba(24, 24, 27, 0.98)';
            nav.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(0, 0, 0, 0.5)';
            nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
          } else if (isLightMode) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = lightTheme.shadows?.lg || '0 4px 10px rgba(0, 0, 0, 0.1)';
            nav.style.borderBottom = `1px solid ${lightTheme.border}`;
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
      
      // Force re-check when pathname changes and after hydration
      const timeoutId = setTimeout(() => {
        handleScroll();
      }, 50);
      
      // Additional check after hydration completes
      const hydrationTimeout = setTimeout(() => {
        handleScroll();
      }, 100);
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(timeoutId);
        clearTimeout(hydrationTimeout);
      };
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
              suffix="" // Disabled suffix in header - passing empty string
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
            {/* Homepage: Direct Essays link | Other pages: Essays Dropdown */}
            {(pathname === '/' || pathname === '') ? (
              <Link 
                href="/essays/visual" 
                className="nav-link homepage-essays-link"
                style={{
                  color: 'rgba(255, 255, 255, 0.92)',
                  fontWeight: 500,
                  opacity: 1,
                  textDecoration: 'none',
                  position: 'relative',
                  paddingBottom: '2px',
                  marginRight: '2rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderBottom = '1px solid rgba(180, 140, 255, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderBottom = 'none';
                }}
              >
                Essays
              </Link>
            ) : (
              <NavDropdown 
                label="Essays"
                items={[
                  {
                    href: '/essays/visual',
                    icon: <VisualEssaysIcon size={20} />,
                    title: 'Visual Essays',
                    description: 'Interactive storytelling experiences',
                    accent: 'purple'
                  },
                  {
                    href: '/essays',
                    icon: <EssayExamplesIcon size={20} />,
                    title: 'Essay Examples',
                    description: 'Academic writing samples',
                    accent: 'blue'
                  },
                  {
                    href: '/essays/guides',
                    icon: <WritingGuidesIcon size={20} />,
                    title: 'Writing Guides',
                    description: 'Step-by-step tutorials',
                    accent: 'emerald'
                  }
                ]}
                footerLink={{ href: '/essays', text: 'View all essays →' }}
                isLightMode={isLightMode} 
              />
            )}

            {/* Prompts Dropdown - Hidden on homepage */}
            {pathname !== '/' && pathname !== '' && (
              <NavDropdown 
                label="Prompts"
                items={[
                  {
                    href: '/templates/chatgpt-prompts',
                    icon: <ChatGPTIcon size={20} />,
                    title: 'ChatGPT Prompts',
                    description: 'Optimized for OpenAI models',
                    accent: 'emerald'
                  },
                  {
                    href: '/templates/claude-prompts',
                    icon: <ClaudeIcon size={20} />,
                    title: 'Claude Prompts',
                    description: 'Designed for Anthropic Claude',
                    accent: 'amber'
                  },
                  {
                    href: '/templates/gemini-prompts',
                    icon: <GeminiIcon size={20} />,
                    title: 'Gemini Prompts',
                    description: 'Built for Google Gemini',
                    accent: 'blue'
                  }
                ]}
                footerLink={{ href: '/templates', text: 'Browse all templates →' }}
                isLightMode={isLightMode} 
              />
            )}
            
            {/* CTA - Homepage: muted link | Other pages: button */}
            {(pathname === '/' || pathname === '') ? (
              <a 
                href={ctaConfig.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link homepage-app-link"
                style={{
                  color: 'rgba(255, 255, 255, 0.55)',
                  fontWeight: 400,
                  opacity: 0.65,
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)';
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.55)';
                  e.currentTarget.style.opacity = '0.65';
                }}
              >
                {responsiveCTA.text}
              </a>
            ) : ctaConfig.isNewsletter ? (
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
            ) : (
              <a 
                href={ctaConfig.ctaHref}
                target={ctaConfig.isProduct ? "_blank" : "_self"}
                rel={ctaConfig.isProduct ? "noopener noreferrer" : undefined}
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
                  color: '#ffffff',
                  textDecoration: 'none'
                }}
              >
                {responsiveCTA.text}
              </a>
            )}

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              style={{ color: isLightMode ? '#1e293b' : '#ffffff' }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-nav-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className={`mobile-nav-panel ${isLightMode ? 'light' : 'dark'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Homepage: Simple Essays link | Other pages: Full Essays section */}
            {(pathname === '/' || pathname === '') ? (
              <div className="mobile-nav-section">
                <Link href="/essays/visual" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="mobile-nav-icon purple"><VisualEssaysIcon size={20} /></div>
                  <div className="mobile-nav-text">
                    <span className="mobile-nav-item-title">Visual Essays</span>
                    <span className="mobile-nav-item-desc">Interactive storytelling experiences</span>
                  </div>
                </Link>
              </div>
            ) : (
              <>
                {/* Essays Section */}
                <div className="mobile-nav-section">
                  <h3 className="mobile-nav-section-title">Essays</h3>
                  <Link href="/essays/visual" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="mobile-nav-icon purple"><VisualEssaysIcon size={20} /></div>
                    <div className="mobile-nav-text">
                      <span className="mobile-nav-item-title">Visual Essays</span>
                      <span className="mobile-nav-item-desc">Interactive storytelling</span>
                    </div>
                  </Link>
                  <Link href="/essays" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="mobile-nav-icon blue"><EssayExamplesIcon size={20} /></div>
                    <div className="mobile-nav-text">
                      <span className="mobile-nav-item-title">Essay Examples</span>
                      <span className="mobile-nav-item-desc">Academic writing samples</span>
                    </div>
                  </Link>
                  <Link href="/essays/guides" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="mobile-nav-icon emerald"><WritingGuidesIcon size={20} /></div>
                    <div className="mobile-nav-text">
                      <span className="mobile-nav-item-title">Writing Guides</span>
                      <span className="mobile-nav-item-desc">Step-by-step tutorials</span>
                    </div>
                  </Link>
                </div>

                {/* Prompts Section - Hidden on homepage */}
                <div className="mobile-nav-section">
                  <h3 className="mobile-nav-section-title">Prompts</h3>
                  <Link href="/templates/chatgpt-prompts" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="mobile-nav-icon emerald"><ChatGPTIcon size={20} /></div>
                    <div className="mobile-nav-text">
                      <span className="mobile-nav-item-title">ChatGPT Prompts</span>
                      <span className="mobile-nav-item-desc">Optimized for OpenAI</span>
                    </div>
                  </Link>
                  <Link href="/templates/claude-prompts" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="mobile-nav-icon amber"><ClaudeIcon size={20} /></div>
                    <div className="mobile-nav-text">
                      <span className="mobile-nav-item-title">Claude Prompts</span>
                      <span className="mobile-nav-item-desc">Designed for Anthropic</span>
                    </div>
                  </Link>
                  <Link href="/templates/gemini-prompts" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="mobile-nav-icon blue"><GeminiIcon size={20} /></div>
                    <div className="mobile-nav-text">
                      <span className="mobile-nav-item-title">Gemini Prompts</span>
                      <span className="mobile-nav-item-desc">Built for Google</span>
                    </div>
                  </Link>
                </div>
              </>
            )}

            {/* CTA - Homepage: muted link | Other pages: button */}
            {(pathname === '/' || pathname === '') ? (
              <div className="mobile-nav-section" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                <a 
                  href={ctaConfig.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-nav-item"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ opacity: 0.6 }}
                >
                  <div className="mobile-nav-text">
                    <span className="mobile-nav-item-title">{ctaConfig.ctaText} →</span>
                  </div>
                </a>
              </div>
            ) : (
              <div className="mobile-nav-cta">
                <a 
                  href={ctaConfig.ctaHref}
                  target={ctaConfig.isProduct ? "_blank" : "_self"}
                  rel={ctaConfig.isProduct ? "noopener noreferrer" : undefined}
                  className="mobile-nav-cta-button"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {ctaConfig.ctaText}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Newsletter Modal */}
      <NewsletterModal 
        isOpen={isNewsletterModalOpen}
        onClose={() => setIsNewsletterModalOpen(false)}
        source={modalSource}
      />
    </>
    );
  };