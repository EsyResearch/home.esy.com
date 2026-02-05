"use client";

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import FooterColumn from "@/components/Home/footerColumn";
import Logo from "@/components/Logo";
import { getPageSuffix } from "./navigation";
import { elevatedDarkTheme } from '@/lib/theme';

// Light theme colors for footer - Navy Calm palette
const lightThemeFooter = {
  bg: '#F8FAFC',
  bgGradient: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)',
  border: 'rgba(10, 37, 64, 0.08)',
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  faint: 'rgba(10, 37, 64, 0.4)',
  accent: '#00A896',
  accentGlow: 'rgba(0, 168, 150, 0.2)',
};

// Navy Dark theme colors for footer
const navyDarkThemeFooter = {
  bg: '#061527',
  bgGradient: 'linear-gradient(180deg, #0A2540 0%, #061527 100%)',
  border: 'rgba(0, 212, 170, 0.15)',
  text: '#FFFFFF',
  muted: 'rgba(255, 255, 255, 0.7)',
  subtle: 'rgba(255, 255, 255, 0.5)',
  faint: 'rgba(255, 255, 255, 0.4)',
  accent: '#00D4AA',
  accentGlow: 'rgba(0, 212, 170, 0.2)',
};

export default function Footer () {
    const pathname = usePathname();
    const logoSuffix = getPageSuffix(pathname);
    const [isLightMode, setIsLightMode] = useState(false);
    const [isNavyDark, setIsNavyDark] = useState(false);

    // Detect light mode pages
    useEffect(() => {
      const checkTheme = () => {
        const normalizedPath = pathname?.endsWith('/') && pathname.length > 1 
          ? pathname.slice(0, -1) 
          : pathname || '';
        const isHomepage = normalizedPath === '/' || normalizedPath === '';
        const isEssaysPage = normalizedPath === '/essays' || normalizedPath.startsWith('/essays/');
        const isAboutPage = normalizedPath === '/about';
        const isSchoolPage = normalizedPath === '/school';
        const isSchoolArticle = normalizedPath.includes('/school/articles/');
        const isTemplatesPage = normalizedPath === '/templates' || normalizedPath.startsWith('/templates/');
        const isDocsPage = normalizedPath === '/docs' || normalizedPath.startsWith('/docs/');
        const isAgentsPage = normalizedPath === '/agents' || normalizedPath.startsWith('/agents/');
        const isContactPage = normalizedPath === '/contact';
        const isTermsPage = normalizedPath === '/terms';
        const isPrivacyPage = normalizedPath === '/privacy';
        const isGlossaryPage = normalizedPath === '/glossary' || normalizedPath.startsWith('/glossary/');
        
        // Pages that always use light theme (Navy Calm)
        const isAlwaysLightPage = isEssaysPage || isAboutPage || isSchoolPage || isTemplatesPage || isDocsPage || isAgentsPage || isContactPage || isTermsPage || isPrivacyPage || isGlossaryPage;
        
        if (isAlwaysLightPage) {
          setIsLightMode(true);
          setIsNavyDark(false);
        } else if (isHomepage) {
          const icPage = document.querySelector('.ic-page');
          const isNavyCalmLight = icPage?.classList.contains('ic-page--light') || icPage?.classList.contains('ic-page--navy-calm');
          const isNavyDarkMode = icPage?.classList.contains('ic-page--navy-dark');
          setIsLightMode(isNavyCalmLight || false);
          setIsNavyDark(isNavyDarkMode || false);
        } else if (isSchoolArticle) {
          // Check localStorage for school article theme
          const storedTheme = localStorage.getItem('theme-school');
          if (storedTheme === 'light') {
            setIsLightMode(true);
            setIsNavyDark(false);
          } else if (storedTheme === 'dark') {
            setIsLightMode(false);
            setIsNavyDark(true); // Use Navy Dark theme
          } else {
            // Default to light for school articles
            setIsLightMode(true);
            setIsNavyDark(false);
          }
          
          // Check body classes as override
          const bodyClasses = document.body.className;
          const htmlClasses = document.documentElement.className;
          if (bodyClasses?.includes('light') || htmlClasses?.includes('light')) {
            setIsLightMode(true);
            setIsNavyDark(false);
          } else if (bodyClasses?.includes('dark') || htmlClasses?.includes('dark')) {
            setIsLightMode(false);
            setIsNavyDark(true);
          }
        } else {
          setIsLightMode(false);
          setIsNavyDark(false);
        }
      };

      checkTheme();
      
      // Observe ic-page for theme changes (only on homepage)
      const observer = new MutationObserver(checkTheme);
      observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
      const icPage = document.querySelector('.ic-page');
      if (icPage) {
        observer.observe(icPage, { attributes: true, attributeFilter: ['class'] });
      }

      // Listen for theme change events from school article pages
      const handleThemeChange = () => {
        checkTheme();
      };
      window.addEventListener('themechange', handleThemeChange);

      return () => {
        observer.disconnect();
        window.removeEventListener('themechange', handleThemeChange);
      };
    }, [pathname]);

    // Select theme based on mode
    const theme = isLightMode ? lightThemeFooter : isNavyDark ? navyDarkThemeFooter : elevatedDarkTheme;

    // Footer-specific elevated styling
    const getFooterBg = () => {
      if (isLightMode) return lightThemeFooter.bgGradient;
      if (isNavyDark) return navyDarkThemeFooter.bgGradient;
      return `linear-gradient(180deg, ${elevatedDarkTheme.bg} 0%, rgba(15, 15, 18, 0.98) 100%)`;
    };

    const footerStyles = {
      footer: {
        background: getFooterBg(),
        borderTop: `1px solid ${theme.border}`,
        backdropFilter: 'blur(10px)',
        position: 'relative' as const,
        zIndex: 10
      },
      footerOverlay: {
        position: 'absolute' as const,
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: `linear-gradient(90deg, transparent 0%, ${theme.accentGlow} 50%, transparent 100%)`,
        opacity: isLightMode ? 0.5 : 0.3
      }
    };

    // Determine logo theme
    const logoTheme = isLightMode ? 'light' : isNavyDark ? 'navy-dark' : 'dark';

    return (
      <footer className={`footer ${isLightMode ? 'footer--light' : ''}`} style={footerStyles.footer}>
        {/* Subtle accent line at top */}
        <div style={footerStyles.footerOverlay} />
        
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <Logo suffix={logoSuffix} href="" showText={false} theme={logoTheme} />
            </div>
            <p className="footer-desc" style={{ color: theme.muted }}>
              Esy is a citation-first research platform for creating reliable, auditable artifacts — essays, visuals, and learning materials.
              <br />
              <strong style={{ color: isLightMode ? theme.text : 'inherit' }}>Experimentation, designed.</strong>
            </p>
            <div className="footer-socials">
              <a href="https://research.esy.com" target="_blank" className="social-link" aria-label="Substack">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ color: theme.subtle }}>
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24l9.56-5.39 9.52 5.39V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/esyresearch" target="_blank"className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: theme.subtle }}>
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="https://www.youtube.com/@esyresearch" target="_blank" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ color: theme.subtle }}>
                 <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <FooterColumn 
            title="Explore"
            links={[
              { href: "/templates/", text: "Templates" },
              { href: "/essays/", text: "Visual Essays" },
            ]}
          />
          
          <FooterColumn 
            title="Learn"
            links={[
              { href: "/school/", text: "School" },
              { href: "/agents/", text: "Agents" },
            ]}
          />
          
          <FooterColumn 
            title="Resources"
            links={[
              { href: "/docs/", text: "Docs" },
              { href: "/glossary/", text: "Glossary" },
            ]}
          />
          
          <FooterColumn 
            title="Company"
            links={[
              { href: "/about/", text: "About" },
              { href: "/privacy/", text: "Privacy" },
              { href: "/terms/", text: "Terms" }
            ]}
          />
        </div>
        
        <div className="footer-bottom" style={{ borderTopColor: theme.border }}>
          <p style={{ color: theme.faint }}>&copy; 2024-2026 Esy, LLC. All rights reserved.</p>
          <p style={{ color: theme.faint, marginTop: '0.5rem' }}>
            <a href="mailto:research@esy.com" style={{ color: theme.faint }}>research@esy.com</a>
          </p>
        </div>
      </footer>
    );
  };