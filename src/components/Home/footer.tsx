"use client";

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import FooterColumn from "@/components/Home/footerColumn";
import Logo from "@/components/Logo";
import { getPageSuffix } from "./navigation";
import { elevatedDarkTheme } from '@/lib/theme';

// Light theme colors for footer
const lightThemeFooter = {
  bg: '#f5f3ef',
  bgGradient: 'linear-gradient(180deg, #f5f3ef 0%, #ece9e3 100%)',
  border: 'rgba(28, 25, 23, 0.1)',
  text: '#1c1917',
  muted: '#44403c',
  subtle: '#78716c',
  faint: '#a8a29e',
  accent: '#c2410c',
  accentGlow: 'rgba(194, 65, 12, 0.3)',
};

export default function Footer () {
    const pathname = usePathname();
    const logoSuffix = getPageSuffix(pathname);
    const [isLightMode, setIsLightMode] = useState(false);

    // Detect homepage light mode
    useEffect(() => {
      const checkTheme = () => {
        const normalizedPath = pathname?.endsWith('/') && pathname.length > 1 
          ? pathname.slice(0, -1) 
          : pathname || '';
        const isHomepage = normalizedPath === '/' || normalizedPath === '';
        
        if (isHomepage) {
          const icPage = document.querySelector('.ic-page');
          setIsLightMode(icPage?.classList.contains('ic-page--light') || false);
        } else {
          setIsLightMode(false);
        }
      };

      checkTheme();
      
      // Observe ic-page for theme changes
      const observer = new MutationObserver(checkTheme);
      const icPage = document.querySelector('.ic-page');
      if (icPage) {
        observer.observe(icPage, { attributes: true, attributeFilter: ['class'] });
      }

      return () => observer.disconnect();
    }, [pathname]);

    // Select theme based on mode
    const theme = isLightMode ? lightThemeFooter : elevatedDarkTheme;

    // Footer-specific elevated styling
    const footerStyles = {
      footer: {
        background: isLightMode 
          ? lightThemeFooter.bgGradient
          : `linear-gradient(180deg, ${elevatedDarkTheme.bg} 0%, rgba(15, 15, 18, 0.98) 100%)`,
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
        background: `linear-gradient(90deg, transparent 0%, ${isLightMode ? lightThemeFooter.accentGlow : elevatedDarkTheme.accentGlow} 50%, transparent 100%)`,
        opacity: isLightMode ? 0.5 : 0.3
      }
    };

    return (
      <footer className={`footer ${isLightMode ? 'footer--light' : ''}`} style={footerStyles.footer}>
        {/* Subtle accent line at top */}
        <div style={footerStyles.footerOverlay} />
        
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <Logo suffix={logoSuffix} href="" showText={false} theme={isLightMode ? 'light' : 'dark'} />
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
              { href: "/essays/", text: "Visual Essays" },
              { href: "/scrollytelling/", text: "Scrollytelling" },
              { href: "/templates/essay", text: "Essay Templates" },
            ]}
          />
          
          <FooterColumn 
            title="Learn"
            links={[
              { href: "/school/", text: "School" },
              { href: "/agentic-workflows/", text: "Agentic Workflows" },
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