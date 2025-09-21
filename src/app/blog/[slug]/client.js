"use client"

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Calendar, Clock, User, Tag, Share2,
  BookOpen, Heart, BookMarked, MessageCircle,
  Twitter, Facebook, Linkedin, Copy, Check,
  ArrowRight, ChevronRight, TrendingUp, Star
} from 'lucide-react';
import '@/app/globals.css';

const BlogPostClient = ({ params }) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentTheme = {
    bg: '#0a0a0f',
    elevated: '#16161f',
    text: '#ffffff',
    muted: 'rgba(255, 255, 255, 0.7)',
    subtle: 'rgba(255, 255, 255, 0.5)',
    faint: 'rgba(255, 255, 255, 0.3)',
    border: 'rgba(255, 255, 255, 0.08)',
    divider: 'rgba(255, 255, 255, 0.05)',
    accent: '#8b5cf6'
  };

  // Enhanced responsive breakpoints
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;
  const isSmallMobile = windowWidth < 480;
  const isTinyMobile = windowWidth < 375;

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sample blog post data
  const post = {
    title: "The Future of AI in Academic Writing: A Comprehensive Analysis",
    excerpt: "Explore how artificial intelligence is revolutionizing academic writing, from research assistance to automated proofreading and beyond.",
    content: `
      <p>Artificial intelligence is transforming the landscape of academic writing in unprecedented ways. From automated research assistance to intelligent proofreading tools, AI technologies are reshaping how scholars approach the craft of writing.</p>
      
      <h2>The Current State of AI in Academic Writing</h2>
      <p>Today's AI writing tools offer capabilities that were unimaginable just a few years ago. These tools can help researchers:</p>
      <ul>
        <li>Generate literature reviews with comprehensive source analysis</li>
        <li>Assist with citation formatting and reference management</li>
        <li>Provide real-time grammar and style suggestions</li>
        <li>Offer alternative phrasing and vocabulary suggestions</li>
        <li>Detect potential plagiarism and ensure originality</li>
      </ul>
      
      <h2>Emerging Technologies and Their Impact</h2>
      <p>Recent advances in natural language processing have led to the development of more sophisticated writing assistants. These tools understand context, maintain consistency in tone, and can even suggest structural improvements to academic papers.</p>
      
      <blockquote>
        "The integration of AI in academic writing represents not a replacement of human creativity, but an enhancement of scholarly capabilities." - Dr. Sarah Chen
      </blockquote>
      
      <h2>Challenges and Considerations</h2>
      <p>While AI offers tremendous potential, it also presents challenges that academic institutions must address:</p>
      <ul>
        <li>Maintaining academic integrity and originality</li>
        <li>Ensuring proper attribution of AI-generated content</li>
        <li>Developing guidelines for AI tool usage</li>
        <li>Preserving critical thinking and analytical skills</li>
      </ul>
      
      <h2>The Road Ahead</h2>
      <p>As we look to the future, the relationship between AI and academic writing will continue to evolve. The key lies in finding the right balance between leveraging AI capabilities and maintaining the essential human elements of scholarly work.</p>
    `,
    author: "Dr. Sarah Chen",
    authorBio: "Dr. Sarah Chen is a leading researcher in educational technology and AI applications in higher education. She has published over 50 peer-reviewed articles on the intersection of technology and learning.",
    date: "March 28, 2025",
    readTime: 12,
    category: "AI & Technology",
    tags: ["AI", "Academic Writing", "Future Tech", "Education"]
  };

  const handleShare = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      backgroundColor: currentTheme.bg,
      color: currentTheme.text,
      fontFamily: 'var(--font-inter)',
      minHeight: '100vh'
    }}>
      {/* Hero Section */}
      <section style={{ 
        padding: isSmallMobile ? '8rem 1rem 3rem' : isMobile ? '9rem 1.5rem 4rem' : isTablet ? '9rem 2rem 4rem' : '9rem 2rem 4rem',
        position: 'relative',
        background: `linear-gradient(180deg, ${currentTheme.bg} 0%, ${currentTheme.elevated} 100%)`
      }}>
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto',
          position: 'relative', 
          zIndex: 1 
        }}>
          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.25rem',
              backgroundColor: 'transparent',
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '12px',
              color: currentTheme.muted,
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginBottom: '2rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = currentTheme.accent;
              e.currentTarget.style.color = currentTheme.accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = currentTheme.border;
              e.currentTarget.style.color = currentTheme.muted;
            }}
          >
            <ArrowLeft size={16} />
            Back to Blog
          </button>

          {/* Category Badge */}
          <div style={{
            padding: '0.5rem 1rem',
            backgroundColor: `${currentTheme.accent}20`,
            color: currentTheme.accent,
            borderRadius: '20px',
            fontSize: '0.875rem',
            fontWeight: '600',
            display: 'inline-block',
            marginBottom: '1.5rem'
          }}>
            {post.category}
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: isTinyMobile ? '2rem' : isSmallMobile ? '2.25rem' : isMobile ? '2.5rem' : isTablet ? '3rem' : '3.5rem',
            fontWeight: 300,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
            fontFamily: 'var(--font-literata)'
          }}>
            {post.title}
          </h1>

          {/* Excerpt */}
          <p style={{
            fontSize: isMobile ? '1rem' : '1.25rem',
            color: currentTheme.muted,
            fontWeight: 300,
            lineHeight: 1.6,
            marginBottom: '2rem'
          }}>
            {post.excerpt}
          </p>

          {/* Meta Info */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            fontSize: '0.875rem',
            color: currentTheme.subtle,
            paddingBottom: '2rem',
            borderBottom: `1px solid ${currentTheme.divider}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={16} />
              <span>{post.author}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={16} />
              <span>{post.date}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>

        {/* Background gradient effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)
          `,
          zIndex: 0
        }} />
      </section>

      {/* Content Section */}
      <section style={{
        padding: isMobile ? '3rem 1rem' : '4rem 2rem',
        backgroundColor: currentTheme.bg
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {/* Article Content */}
          <div 
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.8,
              color: currentTheme.text
            }}
            dangerouslySetInnerHTML={{ 
              __html: post.content
                .replace(/<h2>/g, `<h2 style="font-size: 1.75rem; font-weight: 600; margin: 2.5rem 0 1rem; color: ${currentTheme.text}; font-family: var(--font-literata);">`)
                .replace(/<p>/g, `<p style="margin-bottom: 1.5rem; color: ${currentTheme.text};">`)
                .replace(/<ul>/g, `<ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">`)
                .replace(/<li>/g, `<li style="margin-bottom: 0.5rem; color: ${currentTheme.text};">`)
                .replace(/<blockquote>/g, `<blockquote style="border-left: 4px solid ${currentTheme.accent}; padding-left: 1.5rem; margin: 2rem 0; font-style: italic; color: ${currentTheme.muted}; font-size: 1.125rem;">`)
            }}
          />

          {/* Author Bio */}
          <div style={{
            backgroundColor: currentTheme.elevated,
            borderRadius: '16px',
            padding: isMobile ? '1.5rem' : '2rem',
            marginTop: '3rem',
            border: `1px solid ${currentTheme.border}`
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '1rem'
            }}>About the Author</h3>
            <div style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: currentTheme.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '1.5rem',
                fontWeight: '600',
                flexShrink: 0
              }}>
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem'
                }}>{post.author}</div>
                <p style={{
                  color: currentTheme.muted,
                  fontSize: '0.875rem',
                  lineHeight: 1.5
                }}>{post.authorBio}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: `1px solid ${currentTheme.divider}`
          }}>
            <button
              onClick={() => setIsLiked(!isLiked)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                backgroundColor: isLiked ? currentTheme.accent : 'transparent',
                border: `1px solid ${isLiked ? currentTheme.accent : currentTheme.border}`,
                borderRadius: '12px',
                color: isLiked ? '#ffffff' : currentTheme.muted,
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Heart size={16} fill={isLiked ? '#ffffff' : 'none'} />
              Like
            </button>
            
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                backgroundColor: isBookmarked ? currentTheme.accent : 'transparent',
                border: `1px solid ${isBookmarked ? currentTheme.accent : currentTheme.border}`,
                borderRadius: '12px',
                color: isBookmarked ? '#ffffff' : currentTheme.muted,
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <BookMarked size={16} fill={isBookmarked ? '#ffffff' : 'none'} />
              Save
            </button>
            
            <button
              onClick={handleShare}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                backgroundColor: 'transparent',
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '12px',
                color: currentTheme.muted,
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {copied ? <Check size={16} /> : <Share2 size={16} />}
              {copied ? 'Copied!' : 'Share'}
            </button>
          </div>

          {/* Tags */}
          <div style={{
            marginTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            {post.tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  padding: '0.25rem 0.75rem',
                  backgroundColor: `${currentTheme.accent}20`,
                  color: currentTheme.accent,
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '500'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostClient;
