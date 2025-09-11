"use client"

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { StructuredLearningPaths, EssentialResources } from '@/components/School';

const EsySchool = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [email, setEmail] = useState('');
  const [newsletterHovered, setNewsletterHovered] = useState(false);
  const searchRef = useRef(null);

  // Rotating search suggestions
  const searchSuggestions = [
    "How to structure an academic paper",
    "Best practices for literature reviews",
    "Understanding citation styles",
    "Writing compelling abstracts",
    "AI tools for research"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuestion((prev) => (prev + 1) % searchSuggestions.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [searchSuggestions.length]);

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#0a0a0f',
      color: '#ffffff',
      fontFamily: 'var(--font-inter)',
      lineHeight: 1.6,
      position: 'relative'
    },
    progressBar: {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '2px',
      backgroundColor: '#8b5cf6',
      width: `${scrollProgress}%`,
      transition: 'width 0.1s ease',
      zIndex: 1001
    },
    header: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(10, 10, 15, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    },
    headerInner: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '1.25rem 3rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logoGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    logo: {
      fontSize: '1.375rem',
      fontWeight: '300',
      letterSpacing: '-0.02em',
      color: '#ffffff',
      textDecoration: 'none'
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.375rem',
      padding: '0.375rem 0.875rem',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      border: '1px solid rgba(139, 92, 246, 0.2)',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '500',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: '#8b5cf6'
    },
    badgeDot: {
      width: '6px',
      height: '6px',
      backgroundColor: '#8b5cf6',
      borderRadius: '50%',
      animation: 'pulse 2s ease-in-out infinite'
    },
    nav: {
      display: 'flex',
      gap: '3rem',
      alignItems: 'center'
    },
    navLink: {
      color: 'rgba(255, 255, 255, 0.7)',
      textDecoration: 'none',
      fontSize: '0.9375rem',
      transition: 'color 0.2s ease',
      position: 'relative'
    },
    hero: {
      padding: '2rem 3rem 3rem',
      maxWidth: '1400px',
      margin: '0 auto',
      position: 'relative'
    },
    heroContent: {
      maxWidth: '900px'
    },

    heroTitle: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: '300',
      lineHeight: '1.3',
      marginBottom: '1.5rem',
      letterSpacing: '0.01em',
      fontFamily: 'var(--font-literata)'
    },
    heroAccent: {
      color: '#8b5cf6',
      fontWeight: '400'
    },
    heroDescription: {
      fontSize: '1.25rem',
      color: 'rgba(255, 255, 255, 0.7)',
      lineHeight: '1.7',
      marginBottom: '3rem',
      fontWeight: '300'
    },
    searchContainer: {
      position: 'relative',
      maxWidth: '720px',
      marginBottom: '2rem'
    },
    searchWrapper: {
      position: 'relative',
      backgroundColor: searchFocused ? 'rgba(10, 10, 15, 0.8)' : 'rgba(22, 22, 31, 0.4)',
      border: `1px solid ${searchFocused ? 'transparent' : 'rgba(255, 255, 255, 0.08)'}`,
      borderRadius: '16px',
      transition: 'all 0.3s ease',
      overflow: 'hidden',
      boxShadow: searchFocused ? '0 0 0 3px rgba(139, 92, 246, 0.2), 0 20px 40px rgba(139, 92, 246, 0.1)' : 'none'
    },
    searchInner: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    searchIconWrapper: {
      padding: '0 0 0 1.75rem',
      display: 'flex',
      alignItems: 'center'
    },
    searchInput: {
      flex: 1,
      padding: '1.5rem 0',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#ffffff',
      fontSize: '1.25rem',
      fontWeight: '300',
      outline: 'none'
    },
    searchMeta: {
      padding: '0 1.75rem 0 0',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    searchDivider: {
      width: '1px',
      height: '24px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    },
    searchButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: searchFocused || searchQuery ? '#8b5cf6' : 'transparent',
      border: 'none',
      borderRadius: '8px',
      color: searchFocused || searchQuery ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
      fontSize: '0.9375rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    searchHint: {
      position: 'absolute',
      bottom: '-28px',
      left: '0',
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.4)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    mainContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '4rem 3rem'
    },
    contentHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '3rem'
    },
    contentTitle: {
      fontSize: '2.5rem',
      fontWeight: '200',
      letterSpacing: '-0.02em',
      fontFamily: 'var(--font-literata)'
    },
    contentMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '2rem'
    },
    viewToggle: {
      display: 'flex',
      gap: '0.5rem',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      padding: '0.25rem',
      borderRadius: '8px'
    },
    viewButton: {
      padding: '0.5rem 1rem',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '6px',
      color: 'rgba(255, 255, 255, 0.6)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: '0.875rem'
    },
    viewButtonActive: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#ffffff'
    },
    categoryTabs: {
      display: 'flex',
      gap: '2rem',
      marginBottom: '3rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      overflowX: 'auto'
    },
    categoryTab: {
      padding: '1rem 0',
      backgroundColor: 'transparent',
      border: 'none',
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '0.9375rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      position: 'relative',
      whiteSpace: 'nowrap'
    },
    categoryTabActive: {
      color: '#ffffff'
    },
    categoryIndicator: {
      position: 'absolute',
      bottom: '-1px',
      left: 0,
      right: 0,
      height: '2px',
      backgroundColor: '#8b5cf6',
      transform: 'scaleX(0)',
      transition: 'transform 0.3s ease'
    },
    categoryIndicatorActive: {
      transform: 'scaleX(1)'
    },
    articlesGrid: {
      display: 'grid',
      gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(380px, 1fr))' : '1fr',
      gap: '2rem'
    },
    articleCard: {
      backgroundColor: '#16161f',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: '1px solid transparent',
      display: viewMode === 'list' ? 'flex' : 'block',
      gap: viewMode === 'list' ? '2rem' : '0'
    },
    articleImage: {
      width: viewMode === 'list' ? '240px' : '100%',
      height: viewMode === 'list' ? '160px' : '200px',
      backgroundColor: 'rgba(139, 92, 246, 0.05)',
      position: 'relative',
      overflow: 'hidden',
      flexShrink: 0
    },
    articleImageOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to bottom, transparent 0%, rgba(10, 10, 15, 0.6) 100%)',
      display: 'flex',
      alignItems: 'flex-end',
      padding: '1.5rem'
    },
    articleType: {
      display: 'inline-block',
      padding: '0.25rem 0.75rem',
      backgroundColor: 'rgba(139, 92, 246, 0.2)',
      borderRadius: '4px',
      fontSize: '0.75rem',
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: '#8b5cf6'
    },
    articleContent: {
      padding: '1.5rem',
      flex: 1
    },
    articleCategory: {
      fontSize: '0.75rem',
      color: '#8b5cf6',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      fontWeight: '500',
      marginBottom: '0.5rem'
    },
    articleTitle: {
      fontSize: '1.25rem',
      fontWeight: '400',
      marginBottom: '0.75rem',
      letterSpacing: '-0.01em',
      lineHeight: '1.4'
    },
    articleExcerpt: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '0.9375rem',
      lineHeight: '1.6',
      marginBottom: '1rem'
    },
    articleMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.4)'
    },
    articleAuthor: {
      display: 'flex',
      gap: '0.5rem'
    },


    newsletter: {
      maxWidth: '800px',
      margin: '8rem auto',
      padding: '4rem',
      backgroundColor: 'rgba(139, 92, 246, 0.03)',
      border: '1px solid rgba(139, 92, 246, 0.1)',
      borderRadius: '16px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    newsletterGlow: {
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
      animation: newsletterHovered ? 'rotate 20s linear infinite' : 'none',
      opacity: newsletterHovered ? 1 : 0,
      transition: 'opacity 0.3s ease'
    },
    newsletterContent: {
      position: 'relative',
      zIndex: 1
    },
    newsletterTitle: {
      fontSize: '2.5rem',
      fontWeight: '200',
      marginBottom: '1rem',
      letterSpacing: '-0.02em',
      fontFamily: 'var(--font-literata)'
    },
    newsletterDescription: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '1.125rem',
      marginBottom: '2.5rem',
      lineHeight: '1.6'
    },
    newsletterForm: {
      display: 'flex',
      gap: '1rem',
      maxWidth: '480px',
      margin: '0 auto'
    },
    newsletterInput: {
      flex: 1,
      padding: '1rem 1.5rem',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      color: '#ffffff',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.3s ease'
    },
    newsletterButton: {
      padding: '1rem 2rem',
      backgroundColor: '#8b5cf6',
      border: 'none',
      borderRadius: '8px',
      color: '#ffffff',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    footer: {
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      padding: '3rem',
      textAlign: 'center'
    },
    footerText: {
      color: 'rgba(255, 255, 255, 0.4)',
      fontSize: '0.875rem'
    }
  };

  const categories = [
    { key: 'all', label: 'All Articles' },
    { key: 'getting-started', label: 'Getting Started' },
    { key: 'writing-guides', label: 'Writing Guides' },
    { key: 'research', label: 'Research Methods' },
    { key: 'ai-tools', label: 'AI Tools & Prompts' },
    { key: 'case-studies', label: 'Case Studies' }
  ];

  const articles = [
    {
      type: 'Article',
      category: 'AI Research',
      title: '5 Ways AI is Revolutionizing Academic Research',
      excerpt: 'Discover how artificial intelligence is transforming the landscape of academic research, from automated literature reviews to predictive modeling.',
      author: 'Zev Uhuru',
      readTime: '6 min',
      featured: true,
      link: '/school/articles/ai-research-revolution'
    },
    {
      type: 'Guide',
      category: 'Prompt Engineering',
      title: 'What is Prompt Engineering? A Comprehensive Guide',
      excerpt: 'Master the art and science of crafting effective prompts for AI systems. Learn techniques that will transform your interactions with language models.',
      author: 'Zev Uhuru',
      readTime: '8 min',
      link: '/school/articles/prompt-engineering-guide'
    },
    {
      type: 'Tutorial',
      category: 'LLM Basics',
      title: 'Understanding Large Language Models: From Theory to Practice',
      excerpt: 'Demystify the technology behind ChatGPT, Claude, and other LLMs. A beginner-friendly guide to transformer architecture and its applications.',
      author: 'Zev Uhuru',
      readTime: '12 min',
      link: '/school/articles/understanding-llms'
    },
    {
      type: 'Literature',
      category: 'Classic Literature',
      title: 'To Kill a Mockingbird: A Timeless Exploration of Justice',
      excerpt: 'Explore Harper Lee\'s masterpiece through the lens of moral courage, racial injustice, and the loss of innocence in 1930s Alabama.',
      author: 'Harper Lee Scholar',
      readTime: '15 min',
      link: '/school/articles/to-kill-a-mockingbird'
    }
  ];

  const featuredResources = [
    {
      icon: '📚',
      title: 'Research Templates',
      description: 'Pre-structured templates for papers, proposals, and dissertations'
    },
    {
      icon: '🎯',
      title: 'Prompt Library',
      description: 'Curated prompts for every academic discipline and writing stage'
    },
    {
      icon: '🎥',
      title: 'Video Workshops',
      description: 'Expert-led sessions on advanced AI writing techniques'
    }
  ];

  const courses = [
    {
      title: 'AI Writing Fundamentals',
      duration: '4 weeks',
      level: 'Beginner',
      students: '2.3k enrolled'
    },
    {
      title: 'Advanced Research Methods',
      duration: '6 weeks',
      level: 'Intermediate',
      students: '1.8k enrolled'
    },
    {
      title: 'Ethics in AI Academia',
      duration: '3 weeks',
      level: 'All levels',
      students: '3.1k enrolled'
    },
    {
      title: 'Dissertation Excellence',
      duration: '8 weeks',
      level: 'Advanced',
      students: '890 enrolled'
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.progressBar} />
      
      {/* Breadcrumbs */}
      <div style={{ marginTop: '6rem', marginBottom: '0.5rem' }}>
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'School', isCurrent: true }
          ]}
        />
      </div>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>

          <h1 style={styles.heroTitle}>
            <span style={{ fontWeight: 300 }}>Master academic writing</span>
            <br />
            <span style={styles.heroAccent}>in the age of AI</span>
          </h1>
          <p style={styles.heroDescription}>
            Expert guides, practical tutorials, and comprehensive courses designed to help you 
            write better, research faster, and think more clearly with AI assistance.
          </p>

          {/* Search */}
          <div style={styles.searchContainer}>
            <div style={styles.searchWrapper}>
              <div style={styles.searchInner}>
                <div style={styles.searchIconWrapper}>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke={searchFocused ? '#8b5cf6' : 'rgba(255, 255, 255, 0.4)'}
                    strokeWidth="2"
                    style={{ transition: 'stroke 0.3s ease' }}
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </div>
                <input
                  ref={searchRef}
                  type="text"
                  placeholder={searchSuggestions[activeQuestion]}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  style={styles.searchInput}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery) {
                      console.log('Searching for:', searchQuery);
                    }
                  }}
                />
                <div style={styles.searchMeta}>
                  <div style={styles.searchDivider} />
                  <button 
                    style={styles.searchButton}
                    onClick={() => searchQuery && console.log('Searching for:', searchQuery)}
                  >
                    <span>Search</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div style={styles.searchHint}>
              <kbd style={{
                padding: '0.125rem 0.375rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontFamily: 'monospace'
              }}>⌘K</kbd>
              <span>for quick search</span>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section id="articles" style={styles.mainContent}>
        <div style={styles.contentHeader}>
          <h2 style={styles.contentTitle}>Articles & Tutorials</h2>
          <div style={styles.contentMeta}>
            <span style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.5)' }}>
              156 articles
            </span>
            <div style={styles.viewToggle}>
              <button
                style={{
                  ...styles.viewButton,
                  ...(viewMode === 'grid' ? styles.viewButtonActive : {})
                }}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </button>
              <button
                style={{
                  ...styles.viewButton,
                  ...(viewMode === 'list' ? styles.viewButtonActive : {})
                }}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
            </div>
          </div>
        </div>

        <div style={styles.categoryTabs}>
          {categories.map((category) => (
            <button
              key={category.key}
              style={{
                ...styles.categoryTab,
                ...(activeCategory === category.key ? styles.categoryTabActive : {})
              }}
              onClick={() => setActiveCategory(category.key)}
            >
              {category.label}
              <span style={{
                ...styles.categoryIndicator,
                ...(activeCategory === category.key ? styles.categoryIndicatorActive : {})
              }} />
            </button>
          ))}
        </div>

        <div style={styles.articlesGrid}>
          {articles.map((article, index) => (
            <Link
              key={index}
              href={article.link}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <article
                style={styles.articleCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={styles.articleImage}>
                  <div style={styles.articleImageOverlay}>
                    <span style={styles.articleType}>{article.type}</span>
                  </div>
                </div>
                <div style={styles.articleContent}>
                  <div style={styles.articleCategory}>{article.category}</div>
                  <h3 style={styles.articleTitle}>{article.title}</h3>
                  <p style={styles.articleExcerpt}>{article.excerpt}</p>
                  <div style={styles.articleMeta}>
                    <div style={styles.articleAuthor}>
                      <span>{article.author}</span>
                      <span>·</span>
                      <span>{article.readTime} read</span>
                    </div>
                    <span style={{ color: '#8b5cf6' }}>→</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Essential Resources */}
      <EssentialResources featuredResources={featuredResources} />

      {/* Structured Learning Paths */}
      {/* <StructuredLearningPaths courses={courses} /> */}

      {/* Newsletter */}
      <section 
        style={styles.newsletter}
        onMouseEnter={() => setNewsletterHovered(true)}
        onMouseLeave={() => setNewsletterHovered(false)}
      >
        <div style={styles.newsletterGlow} />
        <div style={styles.newsletterContent}>
          <h2 style={styles.newsletterTitle}>Weekly learning digest</h2>
          <p style={styles.newsletterDescription}>
            Get the latest articles, tutorials, and AI writing insights delivered to your inbox every Thursday.
          </p>
          <div style={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.newsletterInput}
              onFocus={(e) => {
                e.target.style.borderColor = '#8b5cf6';
                e.target.style.backgroundColor = 'rgba(139, 92, 246, 0.08)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }}
            />
            <button
              style={styles.newsletterButton}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>


      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default EsySchool;