'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

/**
 * GalleryNavigation Component
 * 
 * Minimal, essay-focused navigation. No SaaS elements like "Pricing",
 * "Dashboard", or "Get Free AI Essay Writer".
 * 
 * Nav Structure:
 * - Logo (left)
 * - Essays (primary)
 * - Early Access (subtle)
 * - App (de-emphasized, external link)
 * 
 * Behavior: Transparent on hero, solid on scroll
 */

const GalleryNavigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav 
      className={`gallery-nav ${isScrolled ? 'scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="gallery-nav-inner">
        {/* Logo */}
        <Link href="/" className="gallery-logo" aria-label="Esy homepage">
          <Image
            src="/esy-logos/logo-files/for-web/png/white-logo-no-bg.png"
            alt="Esy"
            width={100}
            height={40}
            className="gallery-logo-icon"
            priority
            style={{ objectFit: 'contain' }}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="gallery-nav-links">
          <Link href="/essays/visual" className="gallery-nav-link">
            Essays
          </Link>
          <Link href="/essays/visual#early-access" className="gallery-nav-link">
            Early Access
          </Link>
          <a 
            href="https://app.esy.com" 
            className="gallery-nav-link muted"
            target="_blank"
            rel="noopener noreferrer"
          >
            App
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="gallery-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? (
            <X size={24} aria-hidden="true" />
          ) : (
            <Menu size={24} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu"
          className="gallery-mobile-menu"
          role="menu"
        >
          <Link 
            href="/essays/visual" 
            className="gallery-mobile-link"
            onClick={() => setIsMobileMenuOpen(false)}
            role="menuitem"
          >
            Essays
          </Link>
          <Link 
            href="/essays/visual#early-access" 
            className="gallery-mobile-link"
            onClick={() => setIsMobileMenuOpen(false)}
            role="menuitem"
          >
            Early Access
          </Link>
          <a 
            href="https://app.esy.com" 
            className="gallery-mobile-link muted"
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
          >
            App →
          </a>
        </div>
      )}
    </nav>
  );
};

export default GalleryNavigation;

