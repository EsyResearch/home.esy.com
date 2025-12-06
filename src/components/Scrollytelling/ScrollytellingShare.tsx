"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Share2, Link2, Twitter, Linkedin, Mail, Facebook, Check, X } from "lucide-react";

interface ScrollytellingShareProps {
  title: string;
  description?: string;
  /**
   * Optional custom URL. If not provided, uses window.location.href
   */
  url?: string;
  /**
   * Scroll threshold (0-1) before showing the share button
   * Default: 0.1 (10% scrolled)
   */
  showAfterScroll?: number;
  /**
   * Theme variant for different story aesthetics
   */
  theme?: "dark" | "light" | "auto";
}

/**
 * ScrollytellingShare - A minimal, non-intrusive share widget
 * 
 * Design Philosophy:
 * - Appears subtly after user has engaged with content
 * - Expands on interaction, doesn't clutter by default
 * - Uses Web Share API on mobile for native experience
 * - Matches scrollytelling aesthetic
 */
export default function ScrollytellingShare({
  title,
  description = "",
  url,
  showAfterScroll = 0.1,
  theme = "dark",
}: ScrollytellingShareProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  // Set URL on client side
  useEffect(() => {
    setShareUrl(url || window.location.href);
  }, [url]);

  // Show/hide based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / scrollHeight;
      setIsVisible(progress > showAfterScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfterScroll]);

  // Close expanded state when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".scrollytelling-share")) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isExpanded]);

  // Copy link to clipboard
  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [shareUrl]);

  // Native share (mobile)
  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or error - fall back to expanded view
        if ((err as Error).name !== "AbortError") {
          setIsExpanded(true);
        }
      }
    } else {
      setIsExpanded(true);
    }
  }, [title, description, shareUrl]);

  // Social share URLs
  const socialLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\n${shareUrl}`)}`,
  };

  const themeClass = theme === "auto" ? "" : theme;

  return (
    <>
      <style jsx>{`
        .scrollytelling-share {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 90;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        .scrollytelling-share.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .share-trigger {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .dark .share-trigger {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          color: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .dark .share-trigger:hover {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          transform: scale(1.05);
        }

        .light .share-trigger {
          background: rgba(0, 0, 0, 0.05);
          backdrop-filter: blur(10px);
          color: rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .light .share-trigger:hover {
          background: rgba(0, 0, 0, 0.1);
          color: rgba(0, 0, 0, 0.9);
          transform: scale(1.05);
        }

        .share-panel {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 0.5rem;
          border-radius: 16px;
          opacity: 0;
          transform: translateY(10px) scale(0.95);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }

        .dark .share-panel {
          background: rgba(20, 20, 30, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .light .share-panel {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .share-panel.expanded {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        .share-option {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
          min-width: 160px;
        }

        .dark .share-option {
          background: transparent;
          color: rgba(255, 255, 255, 0.8);
        }

        .dark .share-option:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .light .share-option {
          background: transparent;
          color: rgba(0, 0, 0, 0.7);
        }

        .light .share-option:hover {
          background: rgba(0, 0, 0, 0.05);
          color: rgba(0, 0, 0, 0.9);
        }

        .share-option.copied {
          color: #22c55e;
        }

        .share-option svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        .share-divider {
          height: 1px;
          margin: 0.25rem 0.5rem;
        }

        .dark .share-divider {
          background: rgba(255, 255, 255, 0.1);
        }

        .light .share-divider {
          background: rgba(0, 0, 0, 0.1);
        }

        .share-close {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .dark .share-close {
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.6);
        }

        .dark .share-close:hover {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .light .share-close {
          background: rgba(0, 0, 0, 0.1);
          color: rgba(0, 0, 0, 0.6);
        }

        .light .share-close:hover {
          background: rgba(0, 0, 0, 0.15);
          color: rgba(0, 0, 0, 0.9);
        }

        @media (max-width: 640px) {
          .scrollytelling-share {
            bottom: 1.5rem;
            right: 1.5rem;
          }

          .share-trigger {
            width: 44px;
            height: 44px;
          }
        }
      `}</style>

      <div
        className={`scrollytelling-share ${themeClass} ${isVisible ? "visible" : ""}`}
      >
        {/* Expanded Panel */}
        <div
          className={`share-panel ${isExpanded ? "expanded" : ""}`}
          style={{ position: "relative" }}
        >
          {isExpanded && (
            <button
              className="share-close"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              aria-label="Close share menu"
            >
              <X size={14} />
            </button>
          )}

          <button
            className={`share-option ${copied ? "copied" : ""}`}
            onClick={handleCopyLink}
          >
            {copied ? <Check size={18} /> : <Link2 size={18} />}
            <span>{copied ? "Copied!" : "Copy Link"}</span>
          </button>

          <div className="share-divider" />

          <a
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="share-option"
            onClick={() => setIsExpanded(false)}
          >
            <Twitter size={18} />
            <span>Twitter / X</span>
          </a>

          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="share-option"
            onClick={() => setIsExpanded(false)}
          >
            <Facebook size={18} />
            <span>Facebook</span>
          </a>

          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="share-option"
            onClick={() => setIsExpanded(false)}
          >
            <Linkedin size={18} />
            <span>LinkedIn</span>
          </a>

          <div className="share-divider" />

          <a href={socialLinks.email} className="share-option">
            <Mail size={18} />
            <span>Email</span>
          </a>
        </div>

        {/* Share Trigger Button */}
        <button
          className="share-trigger"
          onClick={handleNativeShare}
          aria-label="Share this story"
          title="Share"
        >
          <Share2 size={20} />
        </button>
      </div>
    </>
  );
}

