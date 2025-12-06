"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * ScrollytellingHeader - World-class minimal header for immersive stories
 * 
 * Design Philosophy (Mobile-First):
 * - Logo only, no distracting navigation
 * - Transparent by default, elegant frosted glass on scroll
 * - Proper safe area handling for notches and status bars
 * - Generous breathing room — logo never feels cramped
 * - Links to scrollytelling index (not home)
 * 
 * Mobile-First Dimensions:
 * - Safe area top padding (notch/status bar)
 * - 56px content height (touch-friendly)
 * - 20px horizontal padding
 * - Logo has visual breathing room
 * 
 * Anatomy:
 * ┌─────────────────────────────────────────────────┐
 * │ (safe area inset)                               │
 * ├─────────────────────────────────────────────────┤
 * │     [Logo]                                      │
 * │                                                 │
 * └─────────────────────────────────────────────────┘
 */
export default function ScrollytellingHeader() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style jsx>{`
        .st-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 90;
          
          /* Safe area: respect notch/status bar */
          padding-top: env(safe-area-inset-top, 0px);
          
          /* Content container */
          display: flex;
          align-items: center;
          
          /* Match main nav: Mobile padding 0.75rem 1rem */
          padding-left: 1rem;
          padding-right: 1rem;
          padding-bottom: 0;
          
          /* Match main nav height with safe area */
          min-height: calc(52px + env(safe-area-inset-top, 0px));
          
          background: transparent;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Frosted glass state on scroll */
        .st-header.scrolled {
          background: rgba(10, 10, 12, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* Logo container - match main nav .logo positioning */
        .st-header-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          padding: 0.5rem;
          margin: -0.5rem; /* Offset padding for larger touch target */
          border-radius: 8px;
          opacity: 0.95;
          transition: opacity 0.2s ease, background 0.2s ease;
        }

        .st-header-logo:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.05);
        }

        .st-header-logo:active {
          background: rgba(255, 255, 255, 0.08);
        }

        /* Tablet: match main nav padding */
        @media (min-width: 769px) {
          .st-header {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }

        /* Medium screens: match main nav 1rem 1.5rem */
        @media (min-width: 1024px) {
          .st-header {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
            min-height: calc(56px + env(safe-area-inset-top, 0px));
          }
        }

        /* Large screens: match main nav 1rem 2rem */
        @media (min-width: 1280px) {
          .st-header {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }

        /* Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
          .st-header,
          .st-header-logo {
            transition: none;
          }
        }
      `}</style>

      <header className={`st-header ${hasScrolled ? "scrolled" : ""}`}>
        <Link href="/scrollytelling" className="st-header-logo" aria-label="Back to Stories">
          <Image
            src="/esy-logos/logo-files/for-web/svg/color-no-bg.svg"
            alt="Esy"
            width={56}
            height={24}
            style={{ height: "auto" }}
            priority
          />
        </Link>
      </header>
    </>
  );
}

