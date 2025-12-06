"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * ScrollytellingHeader - Minimal header for immersive story experience
 * 
 * Design Philosophy (Mobile-First):
 * - Logo only, no distracting navigation
 * - Transparent by default, becomes frosted on scroll
 * - Compact height (48px mobile, 56px desktop)
 * - Links to scrollytelling index (not home)
 * - Unobtrusive, lets content breathe
 * 
 * Anatomy:
 * ┌─────────────────────────────────────────────────┐
 * │ [Logo]                                          │
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
          height: 48px;
          display: flex;
          align-items: center;
          padding: 0 1rem;
          background: transparent;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .st-header.scrolled {
          background: rgba(10, 10, 12, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .st-header-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          opacity: 0.9;
          transition: opacity 0.2s ease;
        }

        .st-header-logo:hover {
          opacity: 1;
        }

        @media (min-width: 768px) {
          .st-header {
            height: 56px;
            padding: 0 1.5rem;
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
            width={50}
            height={20}
            style={{ height: "auto" }}
            priority
          />
        </Link>
      </header>
    </>
  );
}

