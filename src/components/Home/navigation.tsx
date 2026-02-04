"use client";

import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import Logo from "@/components/Logo";
import Link from "next/link";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import HeaderSearch from "@/components/HeaderSearch/HeaderSearch";
import NewsletterModal from "@/components/NewsletterModal/NewsletterModal";
import { getAllPrompts } from "@/lib/prompts";
import { getAllTemplates } from "@/lib/templates";
import { getCTAConfig, getResponsiveCTAText } from "@/lib/ctaMapping";
import { lightTheme } from "@/lib/lightTheme";

/**
 * Navigation Component - Redesigned for Citation-First Platform
 * 
 * Mental model to teach:
 * - Esy is a workflow-based research platform
 * - Artifacts are outputs (Essays are a subtype)
 * - Workflows are how you create things
 * 
 * Design: Museum guide aesthetic - minimal, editorial, no heavy borders
 */

// Shared suffix logic
export const getPageSuffix = (pathname) => {
  if (pathname?.startsWith('/essays')) return 'Essays';
  if (pathname?.startsWith('/school')) return 'School';
  if (pathname?.startsWith('/glossary')) return 'Glossary';
  if (pathname?.startsWith('/blog')) return 'Blog';
  if (pathname?.startsWith('/research')) return 'Research';
  return '';
};

interface NavigationProps {
  showHeaderSearch?: boolean;
  searchContext?: 'prompt-library' | 'templates' | 'glossary' | 'school' | 'essays' | 'scrollytelling' | 'blog' | 'general';
  pathname?: string;
}

export default function Navigation({ 
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
  const [isArtifactsOpen, setIsArtifactsOpen] = useState(false);
  const [isArtifactsClosing, setIsArtifactsClosing] = useState(false);
  const [mobileArtifactsExpanded, setMobileArtifactsExpanded] = useState(false);
    
  // Normalize pathname
    const normalizedPathForNav = pathname?.endsWith('/') && pathname.length > 1
      ? pathname.slice(0, -1)
      : pathname || '';
    
  // Get CTA config
  const ctaConfig = getCTAConfig(pathname);
  const responsiveCTA = getResponsiveCTAText(ctaConfig.ctaText, isMobile);
  
  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Theme detection
    useEffect(() => {
      const checkTheme = () => {
        let isLight = false;
        const normalizedPath = pathname?.endsWith('/') && pathname.length > 1 
          ? pathname.slice(0, -1) 
          : pathname || '';
        
        const isHomepage = normalizedPath === '/' || normalizedPath === '';
        const isSchoolArticle = normalizedPath.includes('/school/articles/');
        const isBlogArticle = normalizedPath.includes('/blog/') && normalizedPath !== '/blog';
        const hasThemeToggle = isSchoolArticle || isBlogArticle;
        
        // Check for homepage light mode (ic-page--light class)
        if (isHomepage) {
          const icPage = document.querySelector('.ic-page');
          if (icPage?.classList.contains('ic-page--light')) {
            isLight = true;
          } else {
            isLight = false;
          }
        } else if (hasThemeToggle) {
          const sectionKey = isSchoolArticle ? 'school' : 'blog';
        const storedTheme = localStorage.getItem(`theme-${sectionKey}`);
          
          if (storedTheme === 'light') {
            isLight = true;
          } else if (storedTheme === 'dark') {
            isLight = false;
          } else {
          isLight = true; // Default to light for articles
          }
          
        // Check body classes as override
          const bodyClasses = document.body.className;
          const htmlClasses = document.documentElement.className;
          if (bodyClasses?.includes('light') || htmlClasses?.includes('light')) {
            isLight = true;
          } else if (bodyClasses?.includes('dark') || htmlClasses?.includes('dark')) {
          isLight = false;
        }
          } else {
        isLight = false; // Pages without toggle always dark
      }
      
      setIsLightMode(isLight);
      };
      
      checkTheme();
      setTimeout(() => checkTheme(), 100);
    
    // Also observe the ic-page element for class changes (homepage theme toggle)
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    // Observe ic-page for homepage theme changes
    const icPage = document.querySelector('.ic-page');
    if (icPage) {
      observer.observe(icPage, { attributes: true, attributeFilter: ['class'] });
    }
    
    return () => observer.disconnect();
    }, [pathname]);

  // Load search data
    useEffect(() => {
      if (showHeaderSearch) {
        if (searchContext === 'prompt-library') {
          getAllPrompts().then(setSearchData).catch(console.error);
        } else if (searchContext === 'glossary') {
          fetch('/glossary-terms.json')
            .then(res => res.json())
          .then(setSearchData)
            .catch(console.error);
        } else if (searchContext === 'templates') {
          const templates = getAllTemplates().map(t => ({
          id: t.slug, slug: t.slug, title: t.title,
          description: t.description, category: t.category,
          }));
          setSearchData(templates);
        } else if (searchContext === 'essays') {
          fetch('/essays-data.json')
            .then(res => res.json())
          .then(setSearchData)
            .catch(console.error);
        }
      }
    }, [showHeaderSearch, searchContext]);

  // Scroll handler for nav background
    useEffect(() => {
      const handleScroll = () => {
        const nav = document.getElementById('nav');
      if (!nav) return;
        
        const navInner = nav.querySelector('.nav-inner');
        const scrollY = window.scrollY;
        const normalizedPath = pathname?.endsWith('/') && pathname.length > 1 
          ? pathname.slice(0, -1) 
          : pathname || '';
        
        const isHomepage = normalizedPath === '/' || normalizedPath === '';
        const isBlogIndexPage = normalizedPath === '/blog';
        const isScrollytellingPage = normalizedPath?.startsWith('/scrollytelling');
        const isTemplatesPage = normalizedPath?.startsWith('/templates');
        const shouldBeTransparent = (isHomepage && !isLightMode) || isBlogIndexPage || isScrollytellingPage || isTemplatesPage;
        
        if (scrollY === 0) {
          if (shouldBeTransparent) {
            nav.style.background = 'transparent';
            nav.style.boxShadow = 'none';
            nav.style.borderBottom = 'none';
            nav.style.backdropFilter = 'none';
            if (navInner) {
            (navInner as HTMLElement).style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.5)';
            }
          } else if (isHomepage && isLightMode) {
            // Homepage light mode - warm cream transparent
            nav.style.background = 'transparent';
            nav.style.boxShadow = 'none';
            nav.style.borderBottom = 'none';
            nav.style.backdropFilter = 'none';
            if (navInner) {
              (navInner as HTMLElement).style.textShadow = 'none';
            }
          } else {
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
        }
      } else if (scrollY > 50) {
          if (isBlogIndexPage || (!isLightMode && !isHomepage)) {
          nav.style.background = 'rgba(24, 24, 27, 0.98)';
          nav.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
            nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        } else if (isLightMode) {
            // Light mode scrolled - warm white
            nav.style.background = 'rgba(253, 251, 247, 0.98)';
            nav.style.boxShadow = '0 2px 8px rgba(28, 25, 23, 0.08)';
            nav.style.borderBottom = '1px solid rgba(28, 25, 23, 0.08)';
          } else {
            nav.style.background = 'rgba(24, 24, 27, 0.98)';
            nav.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
            nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
          }
          nav.style.backdropFilter = 'blur(20px) saturate(150%)';
      } else {
        // Transition zone
        const progress = scrollY / 50;
        if (shouldBeTransparent) {
          nav.style.background = `rgba(31, 31, 35, ${progress * 0.85})`;
          nav.style.backdropFilter = `blur(${progress * 20}px)`;
        } else if (isHomepage && isLightMode) {
          // Homepage light mode transition
          nav.style.background = `rgba(253, 251, 247, ${progress * 0.98})`;
          nav.style.backdropFilter = `blur(${progress * 20}px)`;
        }
      }
    };
    
        handleScroll();
      window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname, isLightMode]);

  // Artifacts dropdown handlers
  const handleArtifactsEnter = () => {
    setIsArtifactsClosing(false);
    setIsArtifactsOpen(true);
  };

  const handleArtifactsLeave = () => {
    setIsArtifactsClosing(true);
    setTimeout(() => {
      setIsArtifactsOpen(false);
      setIsArtifactsClosing(false);
    }, 150);
  };
  
    return (
      <>
      <nav className="nav" id="nav">
        <div className="nav-inner">
          {/* Logo */}
          <Link href="/" className="logo">
            <Logo
              suffix=""
              href=""
              showText={false}
              theme={isLightMode ? 'light' : 'dark'}
              size={isMobile ? 36 : 60}
              priority
            />
          </Link>
          
          {/* Header Search */}
          {showHeaderSearch && (
            <HeaderSearch 
              prompts={searchData} 
              className="header-search"
              searchContext={searchContext}
              isLightMode={isLightMode}
            />
          )}
          
          {/* Desktop Navigation */}
          <div className="nav-links">
            {/* Artifacts Dropdown - Primary content concept */}
            <div 
              className="nav-dropdown-container"
              onMouseEnter={handleArtifactsEnter}
              onMouseLeave={handleArtifactsLeave}
              >
              <button 
                className={`nav-dropdown-trigger ${isArtifactsOpen ? 'active' : ''}`}
                aria-expanded={isArtifactsOpen}
                aria-haspopup="true"
                onClick={() => setIsArtifactsOpen(!isArtifactsOpen)}
                style={{
                  color: isLightMode ? '#475569' : 'rgba(255, 255, 255, 0.85)',
                }}
              >
                <span>Artifacts</span>
                <ChevronDown 
                  size={14} 
                  className={`nav-dropdown-chevron ${isArtifactsOpen ? 'rotated' : ''}`}
                />
              </button>

              {isArtifactsOpen && (
                <div 
                  className={`nav-artifacts-dropdown ${isArtifactsClosing ? 'closing' : ''}`}
                  role="menu"
                >
                  {/* Dropdown Header */}
                  <div className="nav-artifacts-header">
                    <span className="nav-artifacts-label">Browse by type</span>
                  </div>
                  
                  {/* Artifact Types */}
                  <div className="nav-artifacts-list">
                    <Link 
                      href="/essays/" 
                      className="nav-artifact-item"
                      onClick={() => setIsArtifactsOpen(false)}
                    >
                      <div className="nav-artifact-content">
                        <span className="nav-artifact-title">Essays</span>
                        <span className="nav-artifact-desc">Visual research narratives</span>
                      </div>
                    </Link>
                  </div>
                  
                  {/* Footer */}
                  <div className="nav-artifacts-footer">
                    <Link 
                      href="/essays/" 
                      className="nav-artifacts-footer-link"
                      onClick={() => setIsArtifactsOpen(false)}
                    >
                      View all artifacts →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Templates - First-class nav item (hidden on mobile, available in hamburger menu) */}
            {!isMobile && (
              <Link
                href="/templates/"
                className="nav-link"
                style={{
                  color: isLightMode ? '#475569' : 'rgba(255, 255, 255, 0.85)',
                }}
              >
                Templates
              </Link>
            )}

            {/* App CTA - toned down (hidden on mobile, available in hamburger menu) */}
            {!isMobile && (
              <a 
                href={ctaConfig.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
                className="nav-cta-muted"
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: isLightMode ? '#6b7280' : 'rgba(255, 255, 255, 0.6)',
                  background: 'transparent',
                  border: isLightMode ? '1px solid #e5e7eb' : '1px solid rgba(255, 255, 255, 0.15)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = isLightMode ? '#374151' : 'rgba(255, 255, 255, 0.9)';
                  e.currentTarget.style.borderColor = isLightMode ? '#d1d5db' : 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isLightMode ? '#6b7280' : 'rgba(255, 255, 255, 0.6)';
                  e.currentTarget.style.borderColor = isLightMode ? '#e5e7eb' : 'rgba(255, 255, 255, 0.15)';
                }}
              >
              App
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
            {/* Artifacts Section - Expandable */}
              <div className="mobile-nav-section">
              <button
                className="mobile-nav-section-header"
                onClick={() => setMobileArtifactsExpanded(!mobileArtifactsExpanded)}
                aria-expanded={mobileArtifactsExpanded}
              >
                <span className="mobile-nav-section-title">Artifacts</span>
                <ChevronRight 
                  size={18} 
                  className={`mobile-nav-chevron ${mobileArtifactsExpanded ? 'expanded' : ''}`}
                />
              </button>
              
              {mobileArtifactsExpanded && (
                <div className="mobile-nav-subitems">
                  <Link 
                    href="/essays/" 
                    className="mobile-nav-subitem"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mobile-nav-subitem-title">Essays</span>
                    <span className="mobile-nav-subitem-desc">Visual research narratives</span>
                  </Link>
                </div>
              )}
                </div>

            {/* Templates */}
                <div className="mobile-nav-section">
              <Link 
                href="/templates/" 
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Templates
                  </Link>
                </div>

            {/* App CTA */}
            <div className="mobile-nav-cta">
                <a 
                  href={ctaConfig.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-nav-cta-button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                Open App
                </a>
              </div>
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
}
