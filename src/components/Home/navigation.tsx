"use client";

import { useEffect, useState } from "react";
import Logo from "../../../public/esy-logos/logo-files/for-web/svg/color-no-bg.svg"
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navigation () {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const nav = document.getElementById('nav');
        if (window.scrollY > 100) {
          nav.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
          nav.style.background = 'rgba(10, 10, 15, 0.85)';
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
      // Close mobile menu on resize to desktop
      const handleResize = () => {
        if (window.innerWidth > 768) {
          setMobileMenuOpen(false);
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
      if (mobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }

      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [mobileMenuOpen]);
  
    return (
      <nav className="nav" id="nav">
        <div className="nav-inner">
          <Link href="/" className="logo">
            <Image src={Logo.src} alt="Esy Logo" className="logo-icon" width={40} height={40} />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="nav-links desktop-nav">
            {/* <a href="/essays" className="nav-link">Essays</a> */}
            {/* <a href="/research" className="nav-link">Research</a> */}
            {/* <a href="/school" className="nav-link">School</a> */}
            {/* <a href="/pricing" className="nav-link">Pricing</a> */}
            <a href="https://app.esy.com" className="nav-cta">Start Writing</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`mobile-nav ${mobileMenuOpen ? 'mobile-nav-open' : ''}`}>
          <div className="mobile-nav-links">
            {/* <a href="/essays" className="mobile-nav-link">Essays</a> */}
            {/* <a href="/research" className="mobile-nav-link">Research</a> */}
            {/* <a href="/school" className="mobile-nav-link">School</a> */}
            {/* <a href="/pricing" className="mobile-nav-link">Pricing</a> */}
            <a href="https://app.esy.com" className="mobile-nav-cta">Start Writing</a>
          </div>
        </div>
      </nav>
    );
  };
