"use client"

import { useState } from 'react';

export default function SchoolArticleActions({ article }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(342);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div style={{ display: 'flex', gap: '0.75rem' }}>
      <button
        onClick={handleLike}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: isLiked ? 'rgba(239, 68, 68, 0.1)' : '#16161f',
          border: `1px solid ${isLiked ? 'rgba(239, 68, 68, 0.2)' : '#2a2a3a'}`,
          borderRadius: '8px',
          color: isLiked ? '#ef4444' : '#94a3b8',
          cursor: 'pointer',
          transition: 'all 0.3s'
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <span>{likeCount}</span>
      </button>

      <button style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        background: '#16161f',
        border: '1px solid #2a2a3a',
        borderRadius: '8px',
        color: '#94a3b8',
        cursor: 'pointer',
        transition: 'all 0.3s'
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span>24</span>
      </button>

      <button
        onClick={() => setIsBookmarked(!isBookmarked)}
        style={{
          padding: '0.5rem',
          background: isBookmarked ? 'rgba(99, 102, 241, 0.1)' : '#16161f',
          border: `1px solid ${isBookmarked ? 'rgba(99, 102, 241, 0.2)' : '#2a2a3a'}`,
          borderRadius: '8px',
          color: isBookmarked ? '#6366f1' : '#94a3b8',
          cursor: 'pointer',
          transition: 'all 0.3s'
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>

      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowShareMenu(!showShareMenu)}
          style={{
            padding: '0.5rem',
            background: '#16161f',
            border: '1px solid #2a2a3a',
            borderRadius: '8px',
            color: '#94a3b8',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
        </button>

        {showShareMenu && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: '0.5rem',
            width: '200px',
            background: '#16161f',
            border: '1px solid #2a2a3a',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.8)',
            overflow: 'hidden',
            zIndex: 100
          }}>
            <button 
              style={{ 
                width: '100%', 
                padding: '0.75rem 1rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                background: 'transparent', 
                border: 'none', 
                color: '#ffffff', 
                cursor: 'pointer', 
                transition: 'background 0.2s' 
              }}
              onMouseEnter={(e) => e.target.style.background = '#1e1e2a'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#1DA1F2">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
              Share on Twitter
            </button>
            <button 
              style={{ 
                width: '100%', 
                padding: '0.75rem 1rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                background: 'transparent', 
                border: 'none', 
                color: '#ffffff', 
                cursor: 'pointer', 
                transition: 'background 0.2s' 
              }}
              onMouseEnter={(e) => e.target.style.background = '#1e1e2a'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              Share on LinkedIn
            </button>
            <button 
              onClick={handleCopyLink}
              style={{ 
                width: '100%', 
                padding: '0.75rem 1rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                background: 'transparent', 
                border: 'none', 
                borderTop: '1px solid #2a2a3a', 
                color: '#ffffff', 
                cursor: 'pointer', 
                transition: 'background 0.2s' 
              }}
              onMouseEnter={(e) => e.target.style.background = '#1e1e2a'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              {copiedLink ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              )}
              {copiedLink ? 'Copied!' : 'Copy link'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 