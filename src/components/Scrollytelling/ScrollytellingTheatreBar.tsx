"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface ScrollytellingTheatreBarProps {
  title: string;
  description?: string;
  readTime?: string;
  backHref?: string;
  backLabel?: string;
}

/**
 * ScrollytellingTheatreBar - Elegant fixed bottom bar for scrollytelling
 * 
 * Design Philosophy (UI/UX + Immersive Experience):
 * - Fixed bottom bar creates "theatre frame" around content
 * - All actions within natural thumb reach
 * - Clean, uncluttered with proper safe area padding
 * - Universal back arrow (←) is clearer than abstract grid icon
 * - Share options accessible but non-intrusive
 * - Mobile-first with graceful desktop enhancement
 * 
 * Anatomy:
 * ┌──────────────────────────────────────────────────────────────┐
 * │  ← Stories  │     ████████░░░░░░  42%  •  10 min    │ Share │
 * └──────────────────────────────────────────────────────────────┘
 */
export default function ScrollytellingTheatreBar({
  title,
  description = "",
  readTime,
  backHref = "/scrollytelling",
  backLabel = "Stories",
}: ScrollytellingTheatreBarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((window.scrollY / scrollHeight) * 100, 100);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close share panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".theatre-share-area")) {
        setIsShareOpen(false);
      }
    };

    if (isShareOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isShareOpen]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsShareOpen(false);
      }, 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [shareUrl]);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(shareUrl);

  return (
    <>
      <style jsx>{`
        /* ==========================================
           THEATRE BAR — Redesigned for Elegance
           Mobile-first, safe area aware, uncluttered
           ==========================================*/
        
        .theatre-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 100;
          
          /* Height + safe area for home indicator */
          height: calc(52px + env(safe-area-inset-bottom, 0px));
          padding-bottom: env(safe-area-inset-bottom, 0px);
          
          /* Flex layout */
          display: flex;
          align-items: center;
          justify-content: space-between;
          
          /* Safe edge padding - never get cut off */
          padding-left: max(1rem, env(safe-area-inset-left, 1rem));
          padding-right: max(1rem, env(safe-area-inset-right, 1rem));
          
          /* Elegant frosted glass */
          background: rgba(10, 10, 12, 0.94);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        /* Progress Line — Subtle gradient */
        .theatre-progress {
          position: absolute;
          top: 0;
          left: 0;
          height: 2px;
          background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%);
          transition: width 0.15s ease-out;
          border-radius: 0 1px 1px 0;
        }

        /* ==========================================
           BACK BUTTON — Universal arrow, always labeled
           ==========================================*/
        .theatre-back {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          border-radius: 10px;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.8);
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
          min-height: 40px; /* Touch target */
        }

        .theatre-back:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
        }

        .theatre-back:active {
          background: rgba(255, 255, 255, 0.12);
          transform: scale(0.98);
        }

        .theatre-back-arrow {
          font-size: 1.125rem;
          font-weight: 300;
          opacity: 0.7;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .theatre-back:hover .theatre-back-arrow {
          transform: translateX(-2px);
          opacity: 1;
        }

        .theatre-back-text {
          /* Always visible — clarity over minimalism */
        }

        /* ==========================================
           CENTER — Progress info (elegant, minimal)
           ==========================================*/
        .theatre-center {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 0.625rem;
          color: rgba(255, 255, 255, 0.45);
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          font-variant-numeric: tabular-nums;
        }

        .theatre-progress-text {
          min-width: 32px;
          text-align: right;
        }

        .theatre-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
        }

        .theatre-read-time {
          color: rgba(255, 255, 255, 0.35);
        }

        /* ==========================================
           SHARE BUTTON — Clean, accessible
           ==========================================*/
        .theatre-share-area {
          position: relative;
          display: flex;
          align-items: center;
        }

        .theatre-share-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.5rem 0.875rem;
          min-height: 40px; /* Touch target */
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.85);
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .theatre-share-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.15);
          color: #fff;
        }

        .theatre-share-btn:active {
          transform: scale(0.98);
        }

        .theatre-share-btn svg {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }

        .theatre-share-label {
          /* Visible on mobile too for clarity */
        }

        /* ==========================================
           SHARE PANEL — Elegant dropdown
           ==========================================*/
        .theatre-share-panel {
          position: absolute;
          bottom: calc(100% + 12px);
          right: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 6px;
          min-width: 180px;
          background: rgba(24, 24, 28, 0.98);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          box-shadow: 
            0 -4px 24px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.05) inset;
          opacity: 0;
          transform: translateY(8px) scale(0.96);
          pointer-events: none;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .theatre-share-panel.open {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        /* Share Options */
        .theatre-share-option {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.9);
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
          font-size: 0.8125rem;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.15s ease;
          text-align: left;
          width: 100%;
        }

        .theatre-share-option:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .theatre-share-option:active {
          background: rgba(255, 255, 255, 0.12);
        }

        .theatre-share-option svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        /* Branded icon colors */
        .theatre-share-option.twitter svg { color: #fff; }
        .theatre-share-option.facebook svg { color: #1877f2; }
        .theatre-share-option.linkedin svg { color: #0a66c2; }
        .theatre-share-option.copy svg { color: rgba(255, 255, 255, 0.6); }
        
        .theatre-share-option.copy.copied {
          color: #22c55e;
        }
        .theatre-share-option.copy.copied svg {
          color: #22c55e;
        }

        /* ==========================================
           RESPONSIVE — Mobile refinements
           ==========================================*/
        @media (max-width: 480px) {
          .theatre-bar {
            /* Slightly smaller on very small screens */
            height: calc(50px + env(safe-area-inset-bottom, 0px));
          }

          .theatre-back {
            padding: 0.5rem 0.625rem;
            font-size: 0.8125rem;
          }

          .theatre-share-btn {
            padding: 0.5rem 0.75rem;
            font-size: 0.8125rem;
          }

          /* Keep center visible but compact */
          .theatre-center {
            font-size: 0.6875rem;
            gap: 0.5rem;
          }

          .theatre-read-time {
            display: none;
          }

          .theatre-dot {
            display: none;
          }

          /* Panel stays on screen */
          .theatre-share-panel {
            right: 0;
            min-width: 160px;
          }
        }

        /* Tablet+ */
        @media (min-width: 768px) {
          .theatre-bar {
            height: calc(56px + env(safe-area-inset-bottom, 0px));
            padding-left: max(1.5rem, env(safe-area-inset-left, 1.5rem));
            padding-right: max(1.5rem, env(safe-area-inset-right, 1.5rem));
          }

          .theatre-back {
            padding: 0.5rem 1rem;
          }

          .theatre-share-btn {
            padding: 0.5rem 1rem;
          }

          .theatre-share-panel {
            min-width: 200px;
          }
        }

        /* Desktop */
        @media (min-width: 1024px) {
          .theatre-bar {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }

        /* ==========================================
           REDUCED MOTION
           ==========================================*/
        @media (prefers-reduced-motion: reduce) {
          .theatre-bar,
          .theatre-back,
          .theatre-share-btn,
          .theatre-share-panel,
          .theatre-share-option,
          .theatre-progress,
          .theatre-back-arrow {
            transition: none;
          }
          
          .theatre-back:active,
          .theatre-share-btn:active {
            transform: none;
          }
        }
      `}</style>

      <div className="theatre-bar">
        {/* Progress Line */}
        <div 
          className="theatre-progress" 
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Back Button — Simple arrow + text */}
        <Link href={backHref} className="theatre-back">
          <span className="theatre-back-arrow">←</span>
          <span className="theatre-back-text">{backLabel}</span>
        </Link>

        {/* Center — Progress & Read Time */}
        <div className="theatre-center">
          <span className="theatre-progress-text">{Math.round(scrollProgress)}%</span>
          {readTime && (
            <>
              <span className="theatre-dot" />
              <span className="theatre-read-time">{readTime}</span>
            </>
          )}
        </div>

        {/* Share Area */}
        <div className="theatre-share-area">
          <button
            className="theatre-share-btn"
            onClick={() => setIsShareOpen(!isShareOpen)}
            aria-label="Share this story"
            aria-expanded={isShareOpen}
          >
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
            <span className="theatre-share-label">Share</span>
          </button>

          {/* Share Panel */}
          <div 
            className={`theatre-share-panel ${isShareOpen ? "open" : ""}`}
            role="menu"
            aria-hidden={!isShareOpen}
          >
            {/* X/Twitter */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="theatre-share-option twitter"
              onClick={() => setIsShareOpen(false)}
              role="menuitem"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>X</span>
            </a>

            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="theatre-share-option facebook"
              onClick={() => setIsShareOpen(false)}
              role="menuitem"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </a>

            {/* LinkedIn */}
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="theatre-share-option linkedin"
              onClick={() => setIsShareOpen(false)}
              role="menuitem"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>LinkedIn</span>
            </a>

            {/* Copy Link */}
            <button
              className={`theatre-share-option copy ${copied ? "copied" : ""}`}
              onClick={handleCopyLink}
              role="menuitem"
            >
              {copied ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
              <span>{copied ? "Copied!" : "Copy link"}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
