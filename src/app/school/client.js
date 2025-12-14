"use client"

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import SearchBar from '@/components/SearchBar/SearchBar';
import { StructuredLearningPaths, EssentialResources } from '@/components/School';
import SchoolNewsletter from '@/components/School/SchoolNewsletter';
import { useSchoolSearch } from '@/hooks/useSchoolSearch';
import { useScrollHeaderSearch } from '@/hooks/useScrollHeaderSearch';
import { elevatedDarkTheme } from '@/lib/theme';

const EsySchool = () => {
  const router = useRouter();
  const searchBarRef = useRef(null);
  const emailInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [email, setEmail] = useState('');

  // Show header search when in-page search scrolls out of view
  useScrollHeaderSearch(searchBarRef);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', emailInputRef.current?.value);
  };
  
  // Responsive breakpoints
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
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
      backgroundColor: elevatedDarkTheme.bg,
      color: elevatedDarkTheme.text,
      fontFamily: 'var(--font-inter)',
      lineHeight: 1.6,
      position: 'relative'
    },
    progressBar: {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '2px',
      backgroundColor: elevatedDarkTheme.accent,
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
      backgroundColor: 'rgba(24, 24, 27, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${elevatedDarkTheme.borderSubtle}`
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
      backgroundColor: 'rgba(139, 92, 246, 0.15)',  // Increased opacity for better contrast
      border: '1px solid rgba(139, 92, 246, 0.25)',  // Slightly more visible border
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '500',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: '#a78bfa',  // Lighter purple for better readability
      boxShadow: '0 2px 8px rgba(139, 92, 246, 0.15)'  // Subtle glow
    },
    badgeDot: {
      width: '6px',
      height: '6px',
      backgroundColor: elevatedDarkTheme.accent,
      borderRadius: '50%',
      animation: 'pulse 2s ease-in-out infinite'
    },
    nav: {
      display: 'flex',
      gap: '3rem',
      alignItems: 'center'
    },
    navLink: {
      color: elevatedDarkTheme.muted,
      textDecoration: 'none',
      fontSize: '0.9375rem',
      transition: 'color 0.2s ease',
      position: 'relative'
    },
    heroContent: {
      display: 'grid',
      gridTemplateColumns: isTablet ? '1fr' : '1.2fr 0.8fr',
      gap: isTablet ? '3rem' : '4rem',
      alignItems: 'center',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      textAlign: isTablet ? 'center' : 'left'
    },
    heroLeft: {
      maxWidth: '720px',
      margin: isTablet ? '0 auto' : '0'
    },
    heroTitle: {
      fontFamily: 'Literata, Georgia, serif',
      fontSize: 'clamp(3rem, 7vw, 6rem)',
      fontWeight: '300',
      lineHeight: '1.15',
      marginBottom: '2rem',
      opacity: '1',
      letterSpacing: '-0.02em'
    },
    heroTitleAccent: {
      display: 'block',
      fontSize: 'clamp(2.5rem, 6vw, 5rem)',
      fontWeight: '400',
      marginTop: '0.5rem',
      color: '#8b5cf6'
    },
    heroSubtitle: {
      fontSize: 'clamp(1rem, 2vw, 1.2rem)',
      fontWeight: '400',
      opacity: '0.8',
      lineHeight: '1.6',
      marginBottom: '3rem',
      maxWidth: '500px'
    },
    heroSearchSection: {
      marginTop: '0',
      maxWidth: '500px'
    },
    heroRight: {
      position: 'relative',
      display: isTablet ? 'none' : 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    },
    featureCard: {
      background: elevatedDarkTheme.gradients?.featured || `linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)`,
      border: `1px solid ${elevatedDarkTheme.accentBorder || 'rgba(159, 122, 234, 0.2)'}`,
      borderRadius: '10px',
      padding: '1rem',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      cursor: 'pointer',
      boxShadow: elevatedDarkTheme.shadows?.sm || '0 2px 4px rgba(0, 0, 0, 0.2)'
    },
    featureTitle: {
      fontFamily: 'Literata, Georgia, serif',
      fontSize: '1rem',
      fontWeight: '400',
      marginBottom: '0.5rem',
      opacity: '0.9'
    },
    featureDescription: {
      fontSize: '0.8rem',
      opacity: '0.6',
      lineHeight: '1.5'
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
      backgroundColor: elevatedDarkTheme.accent,
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
      background: elevatedDarkTheme.gradients?.card || `linear-gradient(180deg, rgba(31, 31, 35, 0.6) 0%, rgba(24, 24, 27, 0.4) 100%)`,
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      cursor: 'pointer',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      display: viewMode === 'list' ? 'flex' : 'block',
      gap: viewMode === 'list' ? '2rem' : '0',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
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
      author: 'Zev Uhuru',
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
      description: 'Curated prompts for every academic discipline and writing stage',
      link: '/prompt-library'
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

  // Use the search hook for dropdown functionality
  const {
    searchResults,
    isLoading: searchLoading,
    searchTerm: dropdownSearchTerm,
    setSearchTerm: setDropdownSearchTerm,
    showDropdown
  } = useSchoolSearch({ 
    articles, 
    resources: featuredResources, 
    courses, 
    debounceMs: 300, 
    maxResults: 8 
  });

  // Handle search result selection
  const handleResultSelect = (result) => {
    if (result.type === 'article' && result.slug) {
      router.push(result.slug);
    } else if (result.type === 'resource' && result.slug) {
      router.push(result.slug);
    } else if (result.type === 'course') {
      // For courses, we could scroll to the courses section or show a modal
      const coursesSection = document.getElementById('courses');
      if (coursesSection) {
        coursesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.progressBar} />
      
      {/* Breadcrumbs */}
      {/* <div style={{ marginTop: '6rem', marginBottom: '0.5rem' }}>
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'School', isCurrent: true }
          ]}
        />
      </div> */}

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        maxWidth: '1200px',
        margin: '0 auto',
        marginTop: '5rem',
        padding: '2rem 2rem 2rem 2rem',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={styles.heroContent}>
          <div style={styles.heroLeft}>
            <h1 style={styles.heroTitle}>
              Esy
              <span style={styles.heroTitleAccent}>School</span>
            </h1>
            <p style={styles.heroSubtitle}>
              Master essay writing with AI agents<br />
              and prompt engineering.
            </p>
            
            {/* Search Bar in Hero */}
            <div ref={searchBarRef} style={styles.heroSearchSection}>
              <SearchBar
                placeholder="Search articles & guides..."
                value={searchQuery}
                onChange={(value) => {
                  setSearchQuery(value);
                  setDropdownSearchTerm(value);
                }}
                onSearch={(query) => console.log('Searching for:', query)}
                context="school"
                inputFontSize="0.9rem"
                style={{ marginBottom: '0' }}
                autoFocus={true}
                showDropdown={showDropdown}
                searchResults={searchResults}
                onResultSelect={handleResultSelect}
                loadingResults={searchLoading}
                maxResults={8}
              />
            </div>
          </div>

          <div style={styles.heroRight}>
            <div 
              style={styles.featureCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = elevatedDarkTheme.accentBorder || 'rgba(159, 122, 234, 0.3)';
                e.currentTarget.style.boxShadow = `${elevatedDarkTheme.shadows?.glow || '0 4px 16px rgba(159, 122, 234, 0.2)'}, ${elevatedDarkTheme.shadows?.hover || '0 12px 24px rgba(159, 122, 234, 0.15)'}`;
                e.currentTarget.style.background = elevatedDarkTheme.gradients?.hover || `linear-gradient(135deg, rgba(39, 39, 42, 0.95) 0%, rgba(31, 31, 35, 0.8) 100%)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = elevatedDarkTheme.accentBorder || 'rgba(159, 122, 234, 0.2)';
                e.currentTarget.style.boxShadow = elevatedDarkTheme.shadows?.sm || '0 2px 4px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.background = elevatedDarkTheme.gradients?.featured || `linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)`;
              }}
            >
              <h3 style={styles.featureTitle}>AI Agent Workflows</h3>
              <p style={styles.featureDescription}>
                Learn to build and deploy AI agents that research, outline, and draft essays with academic rigor.
              </p>
            </div>
            <div 
              style={styles.featureCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = elevatedDarkTheme.accentBorder || 'rgba(159, 122, 234, 0.3)';
                e.currentTarget.style.boxShadow = `${elevatedDarkTheme.shadows?.glow || '0 4px 16px rgba(159, 122, 234, 0.2)'}, ${elevatedDarkTheme.shadows?.hover || '0 12px 24px rgba(159, 122, 234, 0.15)'}`;
                e.currentTarget.style.background = elevatedDarkTheme.gradients?.hover || `linear-gradient(135deg, rgba(39, 39, 42, 0.95) 0%, rgba(31, 31, 35, 0.8) 100%)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = elevatedDarkTheme.accentBorder || 'rgba(159, 122, 234, 0.2)';
                e.currentTarget.style.boxShadow = elevatedDarkTheme.shadows?.sm || '0 2px 4px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.background = elevatedDarkTheme.gradients?.featured || `linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)`;
              }}
            >
              <h3 style={styles.featureTitle}>Prompt Engineering</h3>
              <p style={styles.featureDescription}>
                Master the art of crafting <Link href="/prompt-library" style={{ color: elevatedDarkTheme.accent, textDecoration: 'underline', textUnderlineOffset: '0.2em' }}>prompts</Link> that generate scholarly content, citations, and critical analysis.
              </p>
            </div>
            <div 
              style={styles.featureCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = elevatedDarkTheme.accentBorder || 'rgba(159, 122, 234, 0.3)';
                e.currentTarget.style.boxShadow = `${elevatedDarkTheme.shadows?.glow || '0 4px 16px rgba(159, 122, 234, 0.2)'}, ${elevatedDarkTheme.shadows?.hover || '0 12px 24px rgba(159, 122, 234, 0.15)'}`;
                e.currentTarget.style.background = elevatedDarkTheme.gradients?.hover || `linear-gradient(135deg, rgba(39, 39, 42, 0.95) 0%, rgba(31, 31, 35, 0.8) 100%)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = elevatedDarkTheme.accentBorder || 'rgba(159, 122, 234, 0.2)';
                e.currentTarget.style.boxShadow = elevatedDarkTheme.shadows?.sm || '0 2px 4px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.background = elevatedDarkTheme.gradients?.featured || `linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)`;
              }}
            >
              <h3 style={styles.featureTitle}>Research Automation</h3>
              <p style={styles.featureDescription}>
                Discover how to use AI to find sources, synthesize literature, and build compelling arguments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section id="articles" style={{ 
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '4rem 3rem'
      }}>
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
                  e.currentTarget.style.borderColor = elevatedDarkTheme.accentBorder || 'rgba(159, 122, 234, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  e.currentTarget.style.background = elevatedDarkTheme.gradients?.hover || `linear-gradient(135deg, rgba(39, 39, 42, 0.8) 0%, rgba(31, 31, 35, 0.6) 100%)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.background = elevatedDarkTheme.gradients?.card || `linear-gradient(180deg, rgba(31, 31, 35, 0.6) 0%, rgba(24, 24, 27, 0.4) 100%)`;
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

      <SchoolNewsletter 
        emailInputRef={emailInputRef}
        handleNewsletterSubmit={handleNewsletterSubmit}
        isMobile={isMobile}
        isTablet={isTablet}
      />


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