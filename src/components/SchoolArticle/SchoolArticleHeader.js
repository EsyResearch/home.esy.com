"use client"

import { useState } from 'react';
import Navigation from '@/components/Home/navigation';
import SchoolArticleActions from './SchoolArticleActions';

export default function SchoolArticleHeader({ article }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    // You could add a toast notification here
  };

  return (
    <>
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section style={{ position: 'relative', paddingTop: '8rem', paddingBottom: '4rem', overflow: 'hidden' }}>
        {/* Background Effects */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-20%',
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
            animation: 'float 20s ease-in-out infinite'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-50%',
            left: '-20%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)',
            animation: 'float 25s ease-in-out infinite reverse'
          }} />
        </div>

        <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
          {/* Back to School Link */}
          <div style={{ marginBottom: '1.5rem' }}>
            <a href="/school" style={{ 
              color: '#94a3b8', 
              textDecoration: 'none', 
              transition: 'color 0.2s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              Back to School
            </a>
          </div>

          {/* Category Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: '24px',
              color: '#6366f1',
              fontSize: '0.875rem',
              fontWeight: 600
            }}>
              <div style={{ width: '8px', height: '8px', background: '#6366f1', borderRadius: '50%', animation: 'pulse 2s ease-in-out infinite' }} />
              {article.category}
            </span>
            <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Featured Article</span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: '4rem',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {article.title}
          </h1>

          {/* Subtitle */}
          <p style={{ fontSize: '1.5rem', color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.5 }}>
            {article.subtitle}
          </p>

          {/* Meta Info */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img 
                src={article.author.avatar}
                alt={article.author.name}
                style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #2a2a3a' }}
              />
              <div>
                <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{article.author.name}</p>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{article.author.title}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem', color: '#64748b' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                {article.metadata.date}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {article.metadata.readTime}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                {article.metadata.readCount}
              </span>
            </div>
          </div>

          {/* Action Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 0', borderTop: '1px solid #2a2a3a', borderBottom: '1px solid #2a2a3a' }}>
            <SchoolArticleActions article={article} />

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1.5rem',
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 12px -2px rgba(99, 102, 241, 0.3)'
              }}
            >
              {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <line x1="23" y1="9" x2="17" y2="15"></line>
                  <line x1="17" y1="9" x2="23" y2="15"></line>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
              )}
              {isPlaying ? 'Stop' : 'Listen'}
            </button>
          </div>
        </div>
      </section>
    </>
  );
} 