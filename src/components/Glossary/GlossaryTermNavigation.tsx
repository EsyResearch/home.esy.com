"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Bookmark, Share2, Link2, Twitter, Linkedin } from 'lucide-react';
import { Theme } from '@/types';

interface GlossaryTermNavigationProps {
  scrolled: boolean;
  termId: string;
  isBookmarked: boolean;
  setIsBookmarked: (bookmarked: boolean) => void;
  showShareMenu: boolean;
  setShowShareMenu: (show: boolean) => void;
  linkCopied: boolean;
  currentTheme: Theme;
  handleShare: (platform: string) => void;
}

const GlossaryTermNavigation: React.FC<GlossaryTermNavigationProps> = ({
  scrolled,
  termId,
  isBookmarked,
  setIsBookmarked,
  showShareMenu,
  setShowShareMenu,
  linkCopied,
  currentTheme,
  handleShare
}) => (
  <nav style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: scrolled ? 'rgba(10, 10, 15, 0.95)' : 'rgba(10, 10, 15, 0.8)',
    backdropFilter: 'blur(10px)',
    borderBottom: scrolled ? `1px solid ${currentTheme.border}` : '1px solid transparent',
    transition: 'all 0.3s ease'
  }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Left side - Logo and Back button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'white' }}>
            <Image 
              src="/esy-logo.png" 
              alt="Esy Logo" 
              width={32} 
              height={32}
              style={{ flexShrink: 0 }}
            />
            <span style={{ fontSize: '1.1rem', fontWeight: 600, color: currentTheme.text }}>
              Esy
            </span>
          </Link>
          
          <Link
            href="/glossary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: currentTheme.muted,
              textDecoration: 'none',
              fontSize: '0.875rem',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = currentTheme.text;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = currentTheme.muted;
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Glossary</span>
          </Link>
        </div>
        
        {/* Right side - Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Bookmark Button */}
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: isBookmarked ? currentTheme.accent : 'transparent',
              border: `1px solid ${isBookmarked ? currentTheme.accent : currentTheme.border}`,
              borderRadius: '6px',
              color: isBookmarked ? 'white' : currentTheme.text,
              fontSize: '0.875rem',
              cursor: 'pointer',
              outline: 'none',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (!isBookmarked) {
                e.currentTarget.style.background = currentTheme.elevated;
                e.currentTarget.style.borderColor = currentTheme.accent;
              }
            }}
            onMouseLeave={(e) => {
              if (!isBookmarked) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = currentTheme.border;
              }
            }}
          >
            <Bookmark size={16} fill={isBookmarked ? 'white' : 'none'} />
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
          
          {/* Share Button */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: showShareMenu ? currentTheme.accent : 'transparent',
                border: `1px solid ${showShareMenu ? currentTheme.accent : currentTheme.border}`,
                borderRadius: '6px',
                color: showShareMenu ? 'white' : currentTheme.text,
                fontSize: '0.875rem',
                cursor: 'pointer',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!showShareMenu) {
                  e.currentTarget.style.background = currentTheme.elevated;
                  e.currentTarget.style.borderColor = currentTheme.accent;
                }
              }}
              onMouseLeave={(e) => {
                if (!showShareMenu) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = currentTheme.border;
                }
              }}
            >
              <Share2 size={16} />
              Share
            </button>
            
            {/* Share Menu */}
            {showShareMenu && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '0.5rem',
                padding: '0.5rem',
                background: currentTheme.elevated,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '8px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                minWidth: '160px',
                zIndex: 10
              }}>
                <button
                  onClick={() => handleShare('link')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    padding: '0.75rem',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    color: linkCopied ? currentTheme.accent : currentTheme.text,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'all 0.2s',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = currentTheme.bg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <Link2 size={16} />
                  {linkCopied ? 'Copied!' : 'Copy Link'}
                </button>
                
                <button
                  onClick={() => handleShare('twitter')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    padding: '0.75rem',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    color: currentTheme.text,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'all 0.2s',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = currentTheme.bg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <Twitter size={16} />
                  Twitter
                </button>
                
                <button
                  onClick={() => handleShare('linkedin')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    padding: '0.75rem',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    color: currentTheme.text,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'all 0.2s',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = currentTheme.bg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <Linkedin size={16} />
                  LinkedIn
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </nav>
);

export default GlossaryTermNavigation; 