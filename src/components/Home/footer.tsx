"use client";

import { usePathname } from 'next/navigation';
import FooterColumn from "@/components/Home/footerColumn";
import Logo from "@/components/Logo";
import { getPageSuffix } from "./navigation";

export default function Footer () {
    const pathname = usePathname();
    const logoSuffix = getPageSuffix(pathname);

    return (
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <Logo suffix={logoSuffix} href="" showText={false} />
            </div>
            <p className="footer-desc">
            Write your next paper with Esy, an AI assistant that learns your writing style to create original, authentic essays.
            </p>
            <div className="footer-socials">
              <a href="https://www.x.com/@esyResearch" target="_blank" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ color: "rgba(255,255,255,0.3)" }}>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              </a>
              <a href="https://www.linkedin.com/company/esyresearch" target="_blank"className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: "rgba(255,255,255,0.3)" }}>
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="https://www.youtube.com/@esyresearch" target="_blank" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ color: "rgba(255,255,255,0.3)" }}>
                 <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <FooterColumn 
            title="Explore"
            links={[
              { href: "/essays", text: "Essays" },
              { href: "/ai-writing-tools", text: "AI Writing Tools" },
              { href: "/writing-prompts", text: "Writing Prompts" },
              // { href: "/pricing", text: "Pricing" },
              // { href: "/research", text: "Research" },
              // { href: "/school", text: "School" }
            ]}
          />
          
          <FooterColumn 
            title="Learn"
            links={[
              { href: "/school", text: "School" },
              { href: "/glossary", text: "Glossary" },
              { href: "/how-to-write", text: "How to Write" },
              { href: "/guide", text: "How to Write an Essay" },
              // { href: "/guides", text: "Guides" },
              // { href: "/templates", text: "Templates" },
              // { href: "/api", text: "API Docs" }
            ]}
          />
          
          <FooterColumn 
            title="Resources"
            links={[
              { href: "/ai-essay-writer", text: "AI Essay Writer" },
              { href: "/agentic-workflows", text: "Agentic Workflows" },
              { href: "/extended-school-year", text: "Extended School Year" },
              { href: "/prompt-library", text: "Prompt Library" },
            ]}
          />
          
          <FooterColumn 
            title="Company"
            links={[
              { href: "/about", text: "About Us" },
              { href: "/blog", text: "Blog" },
              { href: "/contact", text: "Contact" },
              { href: "/privacy", text: "Privacy" },
              { href: "/cookies", text: "Cookies" },
              { href: "/terms", text: "Terms" }
            ]}
          />
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Esy, LLC. All rights reserved.</p>
        </div>
      </footer>
    );
  };