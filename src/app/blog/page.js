"use client"

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  BookOpen, ArrowRight, ChevronRight,
  FileText, Brain, Sparkles, Quote,
  CheckCircle, Clock, Zap, Globe,
  BarChart, Edit3, BookMarked, Lightbulb,
  PenTool, Target, Layers, Award,
  Menu, X, TrendingUp, Shield
} from 'lucide-react';
import SearchBar from '@/components/SearchBar/SearchBar';
import { useBlogSearch } from '@/hooks/useBlogSearch';
import ContextAwareNavigation from '@/components/Navigation/ContextAwareNavigation';
import '@/app/globals.css';

const BlogPage = () => {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showHeaderSearch, setShowHeaderSearch] = useState(false);
  const searchBarRef = useRef(null);

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

  // Handle scroll to show/hide HeaderSearch
  useEffect(() => {
    const handleScroll = () => {
      if (searchBarRef.current) {
        const searchBarBottom = searchBarRef.current.getBoundingClientRect().bottom;
        setShowHeaderSearch(searchBarBottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['All', 'AI & Technology', 'Academic Writing', 'Research', 'Education'];

  const blogPosts = [
    {
      id: 1,
      slug: "future-ai-academic-writing",
      title: "The Future of AI in Academic Writing",
      excerpt: "Explore how artificial intelligence is revolutionizing academic writing, from research assistance to automated proofreading.",
      author: "Zev Uhuru",
      authorRole: "Founder, Esy",
      date: "March 28, 2025",
      readTime: 12,
      category: "AI & Technology"
    },
    {
      id: 2,
      slug: "mastering-prompt-engineering",
      title: "Mastering Prompt Engineering for Better AI Interactions",
      excerpt: "Learn the art and science of crafting effective prompts that unlock the full potential of AI language models.",
      author: "Zev Uhuru",
      authorRole: "Founder, Esy",
      date: "March 25, 2025",
      readTime: 8,
      category: "AI & Technology"
    },
    {
      id: 3,
      slug: "research-methodology-digital-age",
      title: "Research Methodology in the Digital Age",
      excerpt: "Discover modern research techniques that leverage digital tools while maintaining academic rigor.",
      author: "Zev Uhuru",
      authorRole: "Founder, Esy",
      date: "March 22, 2025",
      readTime: 15,
      category: "Research"
    },
    {
      id: 4,
      slug: "ai-transforming-literature-analysis",
      title: "How AI is Transforming Literature Analysis",
      excerpt: "A deep dive into computational literary analysis and how AI tools are uncovering new insights in classic texts.",
      author: "Zev Uhuru",
      authorRole: "Founder, Esy",
      date: "March 20, 2025",
      readTime: 10,
      category: "Education"
    }
  ];

  const filteredPosts = blogPosts
    .filter(post => selectedCategory === 'All' || post.category === selectedCategory)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Add tags to blog posts for better search
  const blogPostsWithTags = blogPosts.map(post => ({
    ...post,
    tags: post.category.split(' ').filter(tag => tag.length > 2)
  }));

  // Use the blog search hook for dropdown functionality
  const {
    searchResults,
    isLoading: searchLoading,
    searchTerm,
    setSearchTerm,
    showDropdown
  } = useBlogSearch({ 
    posts: blogPostsWithTags, 
    debounceMs: 300, 
    maxResults: 8 
  });

  // Handle search result selection
  const handleResultSelect = (result) => {
    if (result.type === 'article' && result.slug) {
      router.push(`/blog/${result.slug}`);
    }
  };

  const handleSearch = async (query) => {
    console.log('Searching for:', query);
  };

  return (
    <div style={{
      backgroundColor: currentTheme.bg,
      color: currentTheme.text,
      fontFamily: 'var(--font-inter)'
    }}>
      {/* Context-Aware Navigation with HeaderSearch */}
      <ContextAwareNavigation showHeaderSearch={showHeaderSearch} forceContext="blog" />
      
      {/* Hero Section - Same structure as homepage */}
      <section style={{ 
        minHeight: isMobile ? 'auto' : '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isSmallMobile ? '8rem 1rem 2rem' : isMobile ? '9rem 1.5rem 3rem' : isTablet ? '9rem 2rem 4rem' : '9rem 2rem',
        position: 'relative'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          width: '100%', 
          position: 'relative', 
          zIndex: 1 
        }}>
          {/* Hero Content */}
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '1.5rem' : '3rem' }}>
            
            {/* Main Headline */}
            <h1 style={{
              fontSize: isTinyMobile ? '2.5rem' : isSmallMobile ? '2.75rem' : isMobile ? '3rem' : isTablet ? '3.5rem' : '5rem',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: isMobile ? '1rem' : '2rem',
              padding: isTinyMobile ? '0 0.5rem' : isSmallMobile ? '0 0.75rem' : '0',
              fontFamily: 'var(--font-literata)'
            }}>
              <span style={{ fontWeight: 300 }}>The Esy</span>
              <br />
              <span style={{ color: currentTheme.accent, fontWeight: 400 }}>Blog</span>
            </h1>

            {/* Subheadline */}
            <p style={{
              fontSize: isMobile ? '1rem' : '1.25rem',
              color: currentTheme.muted,
              fontWeight: 300,
              maxWidth: '600px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.6,
              padding: isTinyMobile ? '0 0.5rem' : isSmallMobile ? '0 0.75rem' : '0'
            }}>
              Insights, tutorials, and thought leadership on AI, academic writing, and the future of education
            </p>

            {/* Search Bar */}
            <div ref={searchBarRef}>
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                onSearch={handleSearch}
                placeholder="Search articles, topics, or authors..."
                context="blog"
                inputFontSize="0.9rem"
                style={{ marginBottom: '0' }}
                autoFocus={false}
                showDropdown={showDropdown}
                searchResults={searchResults}
                onResultSelect={handleResultSelect}
                loadingResults={searchLoading}
                maxResults={8}
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.75rem',
            marginTop: '3rem'
          }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '50px',
                  backgroundColor: selectedCategory === category ? currentTheme.accent : 'transparent',
                  border: `1px solid ${selectedCategory === category ? currentTheme.accent : currentTheme.border}`,
                  color: selectedCategory === category ? '#ffffff' : currentTheme.muted,
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.borderColor = currentTheme.accent;
                    e.currentTarget.style.backgroundColor = `${currentTheme.accent}20`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.borderColor = currentTheme.border;
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {category}
              </button>
            ))}
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
            radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)
          `,
          zIndex: 0
        }} />
      </section>

        {/* Blog Posts Grid Section */}
      <section style={{
        padding: isMobile ? '3rem 1rem' : '5rem 2rem',
        backgroundColor: currentTheme.bg,
        borderTop: `1px solid ${currentTheme.divider}`
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* All Posts */}
          <div>
            <h2 style={{
              fontSize: isMobile ? '1.75rem' : '2.5rem',
              fontWeight: 300,
              marginBottom: '2rem',
              textAlign: 'center',
              fontFamily: 'var(--font-literata)'
            }}>
              Latest Articles
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: '1.5rem'
            }}>
              {filteredPosts.map(post => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    style={{
                      backgroundColor: currentTheme.elevated,
                      borderRadius: '16px',
                      padding: isMobile ? '1.25rem' : '1.5rem',
                      border: `1px solid ${hoveredCard === post.id ? currentTheme.accent : currentTheme.border}`,
                      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      cursor: 'pointer',
                      transform: hoveredCard === post.id ? 'translateY(-4px)' : 'translateY(0)',
                      boxShadow: hoveredCard === post.id 
                        ? `0 20px 40px rgba(139, 92, 246, 0.15)` 
                        : '0 4px 16px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseEnter={() => setHoveredCard(post.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                  <div style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: `${currentTheme.accent}20`,
                    color: currentTheme.accent,
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    display: 'inline-block',
                    marginBottom: '1rem'
                  }}>
                    {post.category}
                  </div>
                  
                  <h3 style={{
                    fontSize: isMobile ? '1.125rem' : '1.25rem',
                    fontWeight: 600,
                    marginBottom: '0.75rem',
                    lineHeight: 1.3
                  }}>{post.title}</h3>
                  
                  <p style={{
                    color: currentTheme.muted,
                    marginBottom: '1rem',
                    lineHeight: 1.5,
                    fontSize: '0.875rem'
                  }}>{post.excerpt}</p>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.75rem',
                    color: currentTheme.subtle
                  }}>
                    <div>
                      <div style={{ fontWeight: '600' }}>{post.author}</div>
                      <div style={{ fontSize: '0.7rem', color: currentTheme.subtle }}>{post.authorRole}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={12} />
                      <span>{post.readTime} min</span>
                    </div>
                  </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;