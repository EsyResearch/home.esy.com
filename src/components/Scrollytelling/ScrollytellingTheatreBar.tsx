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
 * ScrollytellingTheatreBar - App-like fixed bottom bar for scrollytelling
 * 
 * Design Philosophy:
 * - Fixed bottom bar creates "theatre frame" around content
 * - All actions at thumb reach (mobile ergonomics)
 * - Progress indicator is minimal, primary focus is actions
 * - Share expands inline, doesn't obstruct story
 * - Consistent across all scrollytelling experiences
 * 
 * Anatomy:
 * ┌──────────────────────────────────────────────────────┐
 * │ ← Back to Stories │ ████████░░░░░░ │ Share ↗        │
 * └──────────────────────────────────────────────────────┘
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
           THEATRE BAR - App-like Bottom Navigation
           ==========================================*/
        
        .theatre-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 56px;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1rem;
          background: rgba(10, 10, 12, 0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* Progress Line */
        .theatre-progress {
          position: absolute;
          top: 0;
          left: 0;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          transition: width 0.1s ease-out;
          border-radius: 0 1px 1px 0;
        }

        /* Back Button - Elegant Pill */
        .theatre-back {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 0.875rem;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.7);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 0.8125rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .theatre-back:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          color: #fff;
          transform: translateX(-2px);
        }

        .theatre-back:active {
          transform: scale(0.97);
        }

        .theatre-back svg {
          width: 14px;
          height: 14px;
          opacity: 0.8;
          transition: opacity 0.2s ease;
        }

        .theatre-back:hover svg {
          opacity: 1;
        }

        .theatre-back-label {
          display: inline;
        }

        /* Center Info */
        .theatre-center {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: rgba(255, 255, 255, 0.5);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .theatre-progress-text {
          font-variant-numeric: tabular-nums;
          min-width: 36px;
        }

        .theatre-divider {
          width: 1px;
          height: 16px;
          background: rgba(255, 255, 255, 0.15);
        }

        .theatre-read-time {
          color: rgba(255, 255, 255, 0.4);
        }

        /* Share Area */
        .theatre-share-area {
          position: relative;
          display: flex;
          align-items: center;
        }

        /* Share Button */
        .theatre-share-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.9);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .theatre-share-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .theatre-share-btn svg {
          width: 16px;
          height: 16px;
        }

        /* Share Panel (Expands Upward) */
        .theatre-share-panel {
          position: absolute;
          bottom: calc(100% + 8px);
          right: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 8px;
          background: rgba(20, 20, 24, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.4);
          opacity: 0;
          transform: translateY(8px) scale(0.95);
          pointer-events: none;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          min-width: 200px;
        }

        .theatre-share-panel.open {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        .theatre-share-panel-title {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
          padding: 4px 8px 8px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 4px;
        }

        /* Share Options */
        .theatre-share-option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 8px;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.85);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
        }

        .theatre-share-option:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .theatre-share-option svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        /* Branded Colors */
        .theatre-share-option.twitter svg { color: #fff; }
        .theatre-share-option.twitter:hover { background: rgba(0, 0, 0, 0.8); }
        
        .theatre-share-option.facebook svg { color: #1877f2; }
        .theatre-share-option.facebook:hover { background: rgba(24, 119, 242, 0.15); }
        
        .theatre-share-option.linkedin svg { color: #0a66c2; }
        .theatre-share-option.linkedin:hover { background: rgba(10, 102, 194, 0.15); }
        
        .theatre-share-option.copy svg { color: rgba(255, 255, 255, 0.7); }
        .theatre-share-option.copy:hover { background: rgba(255, 255, 255, 0.1); }
        
        .theatre-share-option.copy.copied {
          color: #22c55e;
        }
        .theatre-share-option.copy.copied svg {
          color: #22c55e;
        }

        /* Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
          .theatre-bar,
          .theatre-back,
          .theatre-share-btn,
          .theatre-share-panel,
          .theatre-share-option {
            transition: none;
          }
          .theatre-back:hover {
            transform: none;
          }
          .theatre-back:active {
            transform: none;
          }
        }

        /* Responsive */
        @media (max-width: 640px) {
          .theatre-bar {
            height: 52px;
            padding: 0 0.75rem;
          }

          .theatre-back {
            padding: 0.5rem 0.625rem;
          }

          .theatre-back-label {
            display: none;
          }

          .theatre-center {
            display: none;
          }

          .theatre-share-btn span {
            display: none;
          }

          .theatre-share-btn {
            padding: 0.5rem 0.75rem;
          }

          .theatre-share-panel {
            right: -8px;
          }
        }

        /* Tablet and up - show labels */
        @media (min-width: 641px) {
          .theatre-back {
            padding: 0.5rem 1rem 0.5rem 0.75rem;
          }
        }
      `}</style>

      <div className="theatre-bar">
        {/* Progress Line */}
        <div 
          className="theatre-progress" 
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Back Button - Elegant Pill */}
        <Link href={backHref} className="theatre-back">
          {/* Grid/Collection Icon */}
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          <span className="theatre-back-label">All Stories</span>
        </Link>

        {/* Center - Progress & Read Time */}
        <div className="theatre-center">
          <span className="theatre-progress-text">{Math.round(scrollProgress)}%</span>
          {readTime && (
            <>
              <div className="theatre-divider" />
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
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{ flexShrink: 0 }}
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            <span>Share</span>
          </button>

          {/* Share Panel */}
          <div className={`theatre-share-panel ${isShareOpen ? "open" : ""}`}>
            <div className="theatre-share-panel-title">Share this story</div>
            
            {/* X/Twitter */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="theatre-share-option twitter"
              onClick={() => setIsShareOpen(false)}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>Share on X</span>
            </a>

            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="theatre-share-option facebook"
              onClick={() => setIsShareOpen(false)}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Share on Facebook</span>
            </a>

            {/* LinkedIn */}
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="theatre-share-option linkedin"
              onClick={() => setIsShareOpen(false)}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>Share on LinkedIn</span>
            </a>

            {/* Copy Link */}
            <button
              className={`theatre-share-option copy ${copied ? "copied" : ""}`}
              onClick={handleCopyLink}
            >
              {copied ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              )}
              <span>{copied ? "Link copied!" : "Copy link"}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

