"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Calendar, Clock, User, Tag, Share2,
  BookOpen, Heart, BookMarked, MessageCircle,
  Twitter, Facebook, Linkedin, Copy, Check,
  ArrowRight, ChevronRight, TrendingUp, Star,
  Sun, Moon, Maximize2, Minimize2, Volume2,
  Eye, ThumbsUp, Send, MoreVertical, Hash,
  Quote, Code, FileText, Sparkles, Zap,
  Award, TrendingDown, AlertCircle, Info,
  BarChart, Menu, X, Settings, Type, AlignLeft
} from 'lucide-react';
import ContextAwareNavigation from '@/components/Navigation/ContextAwareNavigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import '@/app/globals.css';

const BlogPostClient = ({ post }) => {
  const [windowWidth, setWindowWidth] = useState(1200); // Default value to avoid hydration mismatch
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode by default for blog
  
  // Update DOM when theme changes (for navigation detection)
  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = '#121215'; // Enhanced dark theme
      document.body.className = document.body.className.replace('light', '');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.style.backgroundColor = '#ffffff'; // Light theme
      document.body.className = document.body.className + ' light';
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);
  const [fontSize, setFontSize] = useState('medium');
  const [showTableOfContents, setShowTableOfContents] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [shareCount] = useState(0);
  
  // Initialize with random values after hydration to avoid mismatch
  useEffect(() => {
    setLikeCount(Math.floor(Math.random() * 500) + 50);
    setShareCount(Math.floor(Math.random() * 200) + 20);
    
    // Set actual window width after hydration
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
    }
  }, []);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [lineHeight, setLineHeight] = useState('relaxed');
  const [maxWidth, setMaxWidth] = useState('comfortable');
  
  const contentRef = useRef(null);
  const articleRef = useRef(null);

  const currentTheme = isDarkMode ? {
    // Enhanced dark theme optimized for long-form reading
    bg: '#121215',           // Softer than pitch black for extended reading
    elevated: '#1a1a1f',     // Better card separation
    card: '#1f1f24',         // Clear content hierarchy
    text: '#f5f5f5',        // Reduced eye strain vs pure white
    muted: 'rgba(245, 245, 245, 0.7)',
    subtle: 'rgba(245, 245, 245, 0.5)',
    faint: 'rgba(245, 245, 245, 0.3)',
    border: 'rgba(255, 255, 255, 0.1)',
    divider: 'rgba(255, 255, 255, 0.06)',
    accent: '#8b5cf6',
    accentLight: '#a78bfa',
    accentDark: '#7c3aed',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6'
  } : {
    bg: '#ffffff',
    elevated: '#f8fafc',
    card: '#f1f5f9',
    text: '#0f172a',
    muted: 'rgba(15, 23, 42, 0.7)',
    subtle: 'rgba(15, 23, 42, 0.5)',
    faint: 'rgba(15, 23, 42, 0.3)',
    border: 'rgba(15, 23, 42, 0.08)',
    divider: 'rgba(15, 23, 42, 0.05)',
    accent: '#7c3aed',
    accentLight: '#8b5cf6',
    accentDark: '#6d28d9',
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    info: '#2563eb'
  };

  // Font size configurations
  const fontSizes = {
    small: { body: '0.875rem', heading: '1.5rem', subheading: '1.25rem', lineHeight: 1.6 },
    medium: { body: '1rem', heading: '1.75rem', subheading: '1.5rem', lineHeight: 1.8 },
    large: { body: '1.125rem', heading: '2rem', subheading: '1.75rem', lineHeight: 2 },
    xlarge: { body: '1.25rem', heading: '2.25rem', subheading: '2rem', lineHeight: 2.2 }
  };

  const lineHeights = {
    tight: 1.4,
    normal: 1.6,
    relaxed: 1.8,
    loose: 2.0
  };

  const maxWidths = {
    narrow: '600px',
    comfortable: '750px',
    wide: '900px',
    full: '100%'
  };

  const currentFontSize = fontSizes[fontSize];
  const currentLineHeight = lineHeights[lineHeight];
  const currentMaxWidth = maxWidths[maxWidth];

  // Enhanced responsive breakpoints
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;
  const isLargeDesktop = windowWidth >= 1440;
  const isSmallMobile = windowWidth < 480;
  const isTinyMobile = windowWidth < 375;

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Time spent reading tracker
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Use the dynamic post data passed as props
  const postData = {
    title: post.title,
    subtitle: post.subtitle || post.excerpt,
    excerpt: post.excerpt,
    content: post.contentHtml,
    author: post.author || "Zev Uhuru",
    authorBio: post.authorBio || "Software Engineer with 5 years of experience, passionate about the intersection of AI and writing. Building tools that empower writers to create better content with the help of artificial intelligence.",
    authorTitle: post.authorRole || "Founder, Esy",
    date: new Date(post.date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    readTime: post.readTime || 8,
    category: post.category || "AI & Technology",
    tags: post.tags || ["AI", "Technology"],
    difficulty: "Intermediate",
    citations: 24,
    relatedPosts: [
      { id: 1, title: "Mastering Prompt Engineering", readTime: 8 },
      { id: 2, title: "Ethics in AI-Assisted Research", readTime: 10 },
      { id: 3, title: "The Evolution of Academic Publishing", readTime: 15 }
    ]
  };

  // Dynamically generate table of contents from post content
  const tableOfContents = React.useMemo(() => {
    const toc = [];
    const content = postData.content;
    
    // Extract h2 and h3 headings from the content
    const headingRegex = /<h([23])>(.*?)<\/h[23]>/gi;
    let match;
    let hasIntro = false;
    
    while ((match = headingRegex.exec(content)) !== null) {
      const level = parseInt(match[1]) - 1; // h2 = level 1, h3 = level 2
      const title = match[2].replace(/<[^>]*>/g, '').trim(); // Remove any HTML tags
      
      // Generate ID from title
      let id = title.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      
      // Special handling for common section names
      if (title.toLowerCase().includes('introduction')) {
        id = 'intro';
        hasIntro = true;
      } else if (title.toLowerCase().includes('conclusion')) {
        id = 'conclusion';
      }
      
      toc.push({ id, title, level });
    }
    
    // If no headings found or content doesn't start with a heading, add Introduction
    if (!hasIntro && (toc.length === 0 || !content.trim().startsWith('<h'))) {
      toc.unshift({ id: 'intro', title: 'Introduction', level: 1 });
    }
    
    return toc;
  }, [postData.content]);

  // Combined progress tracker and section detection
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        // Calculate reading progress
        const { top, height } = contentRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const scrolled = Math.max(0, Math.min(1, (-top) / (height - windowHeight)));
        setReadingProgress(scrolled * 100);
        
        // Detect active section based on scroll position
        const sections = tableOfContents.map(item => ({
          id: item.id,
          element: document.getElementById(item.id)
        })).filter(section => section.element);
        
        if (sections.length > 0) {
          let currentSection = sections[0].id;
          
          // Check if we're near the bottom of the page (last 10%)
          const isNearBottom = scrolled > 0.9;
          
          if (isNearBottom && sections.length > 0) {
            // If near bottom, highlight the last section
            currentSection = sections[sections.length - 1].id;
          } else {
            // Find the section that's currently most visible
            for (let i = sections.length - 1; i >= 0; i--) {
              const rect = sections[i].element.getBoundingClientRect();
              const elementTop = rect.top;
              const elementBottom = rect.bottom;
              
              // Check if section is visible in viewport
              // A section is considered active if its top is in the upper 40% of viewport
              // OR if it spans across the middle of the viewport
              const threshold = window.innerHeight * 0.4;
              const isInView = elementTop <= threshold && elementBottom > 0;
              
              if (isInView) {
                currentSection = sections[i].id;
                break;
              }
            }
          }
          
          setActiveSection(currentSection);
        }
      }
    };

    // Initial call
    handleScroll();
    
    // Throttled scroll handler for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [tableOfContents]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleShare = async (platform) => {
    const url = window.location.href;
    const text = `${postData.title} - Read this insightful article on Esy`;
    
    if (platform === 'copy') {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    }
    setShowShareMenu(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      articleRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -120; // Offset for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      // Use a custom smooth scroll with easing
      const startY = window.pageYOffset;
      const distance = y - startY;
      const duration = 800; // Increased duration for smoother scroll
      let start = null;
      
      // Cubic easing function for smooth acceleration/deceleration
      const easeInOutCubic = (t) => {
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };
      
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const easeProgress = easeInOutCubic(progress);
        
        window.scrollTo(0, startY + distance * easeProgress);
        
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          // Set active section after scroll completes
      setActiveSection(sectionId);
        }
      };
      
      requestAnimationFrame(step);
    }
  };

  return (
    <div ref={articleRef} style={{
      backgroundColor: currentTheme.bg,
      color: currentTheme.text,
      fontFamily: 'var(--font-inter)',
      minHeight: '100vh',
      transition: 'all 0.3s ease'
    }}>
      {/* Context-Aware Navigation */}
      <ContextAwareNavigation showHeaderSearch={true} forceContext="blog" />
      
      {/* Reading Progress Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        backgroundColor: currentTheme.divider,
        zIndex: 1000
      }}>
        <div style={{
          height: '100%',
          width: `${readingProgress}%`,
          background: `linear-gradient(90deg, ${currentTheme.accent} 0%, ${currentTheme.accentLight} 100%)`,
          transition: 'width 0.1s ease',
          boxShadow: `0 0 8px ${currentTheme.accent}30`
        }} />
      </div>

      {/* Floating Controls */}
      <div style={{
        position: 'fixed',
        bottom: isMobile ? '1.5rem' : '2rem',
        right: isMobile ? '1rem' : '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        zIndex: 100
      }}>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: currentTheme.elevated,
            border: `1px solid ${currentTheme.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.backgroundColor = currentTheme.card;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = currentTheme.elevated;
          }}
        >
          {isDarkMode ? <Sun size={20} color={currentTheme.muted} /> : <Moon size={20} color={currentTheme.muted} />}
        </button>

        {/* <button
          onClick={() => setShowSettings(!showSettings)}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: currentTheme.elevated,
            border: `1px solid ${currentTheme.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Settings size={20} color={currentTheme.muted} />
        </button>

        {!isMobile && (
          <button
            onClick={toggleFullscreen}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: currentTheme.elevated,
              border: `1px solid ${currentTheme.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          >
            {isFullscreen ? <Minimize2 size={20} color={currentTheme.muted} /> : <Maximize2 size={20} color={currentTheme.muted} />}
          </button>
        )} */}
      </div>

      {/* Settings Panel */}
      {/* {showSettings && (
        <div style={{
          position: 'fixed',
          top: '50%',
          right: isMobile ? '5rem' : '6rem',
          transform: 'translateY(-50%)',
          backgroundColor: currentTheme.elevated,
          borderRadius: '16px',
          padding: '1.5rem',
          border: `1px solid ${currentTheme.border}`,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
          zIndex: 200,
          minWidth: '200px',
          backdropFilter: 'blur(20px)'
        }}>
          <h3 style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: currentTheme.text
          }}>Reading Settings</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              fontSize: '0.75rem',
              color: currentTheme.subtle,
              marginBottom: '0.5rem',
              display: 'block'
            }}>Font Size</label>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: currentTheme.card,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '8px',
                color: currentTheme.text,
                fontSize: '0.875rem'
              }}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="xlarge">Extra Large</option>
            </select>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              fontSize: '0.75rem',
              color: currentTheme.subtle,
              marginBottom: '0.5rem',
              display: 'block'
            }}>Line Height</label>
            <select
              value={lineHeight}
              onChange={(e) => setLineHeight(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: currentTheme.card,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '8px',
                color: currentTheme.text,
                fontSize: '0.875rem'
              }}
            >
              <option value="tight">Tight</option>
              <option value="normal">Normal</option>
              <option value="relaxed">Relaxed</option>
              <option value="loose">Loose</option>
            </select>
          </div>

          <div>
            <label style={{
              fontSize: '0.75rem',
              color: currentTheme.subtle,
              marginBottom: '0.5rem',
              display: 'block'
            }}>Max Width</label>
            <select
              value={maxWidth}
              onChange={(e) => setMaxWidth(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: currentTheme.card,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '8px',
                color: currentTheme.text,
                fontSize: '0.875rem'
              }}
            >
              <option value="narrow">Narrow</option>
              <option value="comfortable">Comfortable</option>
              <option value="wide">Wide</option>
              <option value="full">Full Width</option>
            </select>
          </div>
        </div>
      )} */}

      {/* Breadcrumbs - Connected to header */}
      <div style={{ position: 'relative', zIndex: 100, marginTop: '100px' }}>
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: postData.title, href: null, isCurrent: true }
          ]}
          isLight={!isDarkMode}
        />
      </div>

      {/* Hero Section */}
      <section style={{ 
        padding: isSmallMobile ? '2rem 1rem 3rem' : isMobile ? '2rem 1.5rem 4rem' : isTablet ? '2rem 2rem 4rem' : '2rem 2rem 4rem',
        position: 'relative',
        background: `linear-gradient(180deg, ${currentTheme.bg} 0%, ${currentTheme.elevated} 100%)`,
        overflow: 'hidden'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          position: 'relative', 
          zIndex: 1 
        }}>

          {/* Category Badge */}
          <div style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            background: `linear-gradient(135deg, ${currentTheme.accent}20 0%, ${currentTheme.accentLight}10 100%)`,
            color: currentTheme.accent,
            borderRadius: '20px',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '1.5rem',
            border: `1px solid ${currentTheme.accent}30`
          }}>
            {postData.category}
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: isTinyMobile ? '2rem' : isSmallMobile ? '2.25rem' : isMobile ? '2.5rem' : isTablet ? '3rem' : isLargeDesktop ? '4rem' : '3.5rem',
            fontWeight: 300,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
            fontFamily: 'var(--font-literata)',
            color: currentTheme.text
          }}>
            {postData.title}
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: isMobile ? '1rem' : '1.25rem',
            color: currentTheme.muted,
            fontWeight: 300,
            lineHeight: 1.6,
            marginBottom: '2rem',
            fontStyle: 'italic'
          }}>
            {postData.subtitle}
          </p>

          {/* Meta Info */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            padding: '1.5rem',
            backgroundColor: currentTheme.elevated,
            borderRadius: '16px',
            border: `1px solid ${currentTheme.border}`,
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={16} color={currentTheme.accent} />
              <span style={{ fontSize: '0.875rem', color: currentTheme.text }}>{postData.author}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={16} color={currentTheme.info} />
              <span style={{ fontSize: '0.875rem', color: currentTheme.muted }}>{postData.date}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} color={currentTheme.success} />
              <span style={{ fontSize: '0.875rem', color: currentTheme.muted }}>{postData.readTime} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section style={{
        padding: isMobile ? '2rem 1rem' : '3rem 2rem',
        backgroundColor: currentTheme.bg
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isDesktop ? '1fr 300px' : '1fr',
          gap: isDesktop ? '3rem' : '2rem',
          alignItems: 'start',
          position: 'relative'
        }}>
          {/* Main Article Content */}
          <article ref={contentRef} style={{ 
            width: '100%',
            overflow: 'hidden'
          }}>
            <div 
              style={{
                fontSize: currentFontSize.body,
                lineHeight: currentLineHeight,
                color: currentTheme.text,
                fontFamily: 'var(--font-inter)'
              }}
              dangerouslySetInnerHTML={{ 
                __html: (() => {
                  // Process content to add IDs to headings that match TOC
                  let processedContent = postData.content;
                  let hasIntro = false;
                  
                  // Add IDs to h2 and h3 headings based on their content
                  processedContent = processedContent.replace(/<h([23])>(.*?)<\/h[23]>/gi, (match, level, title) => {
                    const cleanTitle = title.replace(/<[^>]*>/g, '').trim();
                    
                    // Generate ID exactly as we do in TOC
                    let id = cleanTitle.toLowerCase()
                      .replace(/[^a-z0-9\s]/g, '')
                      .replace(/\s+/g, '-')
                      .trim();
                    
                    // Special handling for common section names
                    if (cleanTitle.toLowerCase().includes('introduction')) {
                      id = 'intro';
                      hasIntro = true;
                    } else if (cleanTitle.toLowerCase().includes('conclusion')) {
                      id = 'conclusion';
                    }
                    
                    const styles = level === '2' 
                      ? `font-size: ${currentFontSize.heading}; font-weight: 600; margin: 3rem 0 1.5rem; color: ${currentTheme.text}; font-family: var(--font-literata); line-height: 1.3; scroll-margin-top: 100px;`
                      : `font-size: ${currentFontSize.subheading}; font-weight: 600; margin: 2rem 0 1rem; color: ${currentTheme.text}; font-family: var(--font-literata); line-height: 1.3; scroll-margin-top: 100px;`;
                    
                    return `<h${level} id="${id}" style="${styles}">${title}</h${level}>`;
                  });
                  
                  // Add intro section if content doesn't start with h2/h3 and we don't have intro
                  if (!hasIntro && !processedContent.trim().match(/^<h[23]/)) {
                    processedContent = `<div id="intro">${processedContent}`;
                    // Find the first heading and close the intro div before it
                    processedContent = processedContent.replace(/<h[23]/, '</div>$&');
                  }
                  
                  // Apply other styles
                  processedContent = processedContent
                  .replace(/<p>/g, `<p style="margin-bottom: 1.75rem; color: ${currentTheme.text}; line-height: ${currentLineHeight}; font-size: ${currentFontSize.body};">`)
                  .replace(/<ul>/g, `<ul style="margin-bottom: 1.75rem; padding-left: 1.5rem; list-style: none;">`)
                  .replace(/<li>/g, `<li style="margin-bottom: 0.75rem; color: ${currentTheme.text}; position: relative; padding-left: 1.5rem; line-height: ${currentLineHeight};"><span style="position: absolute; left: 0; color: ${currentTheme.accent}; font-weight: 600;">•</span>`)
                  .replace(/<blockquote>/g, `<blockquote style="border-left: 4px solid ${currentTheme.accent}; padding: 1.5rem; margin: 2.5rem 0; font-style: italic; color: ${currentTheme.muted}; font-size: ${currentFontSize.body}; background: ${currentTheme.elevated}; border-radius: 0 12px 12px 0; position: relative; line-height: ${currentLineHeight};">`)
                    .replace(/<strong>/g, `<strong style="color: ${currentTheme.accent}; font-weight: 600;">`);
                  
                  return processedContent;
                })()
              }}
            />

            {/* Tags Section */}
            <div style={{
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: `1px solid ${currentTheme.divider}`
            }}>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: currentTheme.text
              }}>
                <Tag size={16} />
                Topics Covered
              </h3>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                {postData.tags.map((tag, index) => (
                  <button
                    key={index}
                    style={{
                      padding: '0.5rem 1rem',
                      background: `linear-gradient(135deg, ${currentTheme.elevated} 0%, ${currentTheme.card} 100%)`,
                      color: currentTheme.text,
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      border: `1px solid ${currentTheme.border}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.borderColor = currentTheme.accent;
                      e.currentTarget.style.color = currentTheme.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = currentTheme.border;
                      e.currentTarget.style.color = currentTheme.text;
                    }}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Author Card - Full Width at Bottom */}
            <div style={{
              marginTop: '4rem',
              padding: '3rem',
              background: `linear-gradient(135deg, ${currentTheme.elevated} 0%, ${currentTheme.card} 100%)`,
              borderRadius: '24px',
              border: `1px solid ${currentTheme.border}`,
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Background decoration */}
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '200px',
                height: '200px',
                background: `radial-gradient(circle, ${currentTheme.accent}10 0%, transparent 70%)`,
                borderRadius: '50%',
                filter: 'blur(40px)'
              }} />
              
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'center' : 'flex-start',
                gap: isMobile ? '2rem' : '3rem',
                position: 'relative',
                zIndex: 1
              }}>
                {/* Author Avatar */}
                <div style={{
                  flexShrink: 0
                }}>
                  <div style={{
                    width: isMobile ? '80px' : '100px',
                    height: isMobile ? '80px' : '100px',
                    borderRadius: '50%',
                    background: isDarkMode 
                      ? `linear-gradient(135deg, #374151 0%, #1f2937 100%)`
                      : `linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isDarkMode ? '#f3f4f6' : '#374151',
                    fontSize: isMobile ? '2rem' : '2.5rem',
                    fontWeight: '600',
                    boxShadow: isDarkMode 
                      ? `0 8px 24px rgba(0, 0, 0, 0.3)`
                      : `0 8px 24px rgba(0, 0, 0, 0.1)`
                  }}>
                    {postData.author.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                
                {/* Author Info */}
                <div style={{
                  flex: 1,
                  textAlign: isMobile ? 'center' : 'left'
                }}>
                  <div style={{
                    fontSize: isMobile ? '1.5rem' : '1.75rem',
                    fontWeight: '600',
                    marginBottom: '0.25rem',
                    color: currentTheme.text,
                    fontFamily: 'var(--font-literata)'
                  }}>
                    {postData.author}
                  </div>
                  <div style={{
                    fontSize: '1rem',
                    color: isDarkMode ? currentTheme.muted : '#6b7280',
                    marginBottom: '1rem',
                    fontWeight: '500'
                  }}>
                    {postData.authorTitle}
                  </div>
                  <p style={{
                    fontSize: '1rem',
                    color: currentTheme.muted,
                    lineHeight: 1.6,
                    marginBottom: '1.5rem',
                    maxWidth: '600px'
                  }}>
                    {postData.authorBio}
                  </p>
                  
                  {/* Action Buttons */}
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    justifyContent: isMobile ? 'center' : 'flex-start'
                  }}>
                    <Link 
                      href="/blog"
                      style={{
                        padding: '0.75rem 2rem',
                        background: `linear-gradient(135deg, ${currentTheme.accent} 0%, ${currentTheme.accentLight} 100%)`,
                        color: '#ffffff',
                        borderRadius: '50px',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        border: 'none',
                        transition: 'all 0.3s ease',
                        boxShadow: `0 4px 12px ${currentTheme.accent}30`,
                        textDecoration: 'none',
                        display: 'inline-block'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = `0 6px 16px ${currentTheme.accent}40`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = `0 4px 12px ${currentTheme.accent}30`;
                      }}
                    >
                      Read More Articles
                    </Link>
                    
                    <Link 
                      href="/ai-essay-writer"
                      style={{
                        padding: '0.75rem 2rem',
                        backgroundColor: 'transparent',
                        color: isDarkMode ? currentTheme.text : '#374151',
                        borderRadius: '50px',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        border: isDarkMode ? `2px solid ${currentTheme.border}` : `2px solid #d1d5db`,
                        transition: 'all 0.3s ease',
                        textDecoration: 'none',
                        display: 'inline-block'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = isDarkMode ? currentTheme.elevated : '#f3f4f6';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.borderColor = isDarkMode ? currentTheme.muted : '#9ca3af';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = isDarkMode ? currentTheme.border : '#d1d5db';
                      }}
                    >
                      Try AI Essay Writer
                    </Link>
                  </div>
                </div>
              </div>
              
            </div>

            {/* Continue Reading Section */}
            <div style={{
              marginTop: '6rem',
              position: 'relative',
              padding: '4rem 2rem',
              background: isDarkMode 
                ? 'linear-gradient(180deg, rgba(30, 30, 40, 0.5) 0%, rgba(25, 25, 35, 0.3) 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)',
              borderRadius: '24px',
              border: isDarkMode 
                ? '1px solid rgba(255, 255, 255, 0.06)'
                : '1px solid rgba(139, 92, 246, 0.05)',
              boxShadow: isDarkMode 
                ? '0 1px 0 rgba(255,255,255,0.03) inset, 0 0 0 1px rgba(0,0,0,0.2)'
                : 'inset 0 1px 0 rgba(255,255,255,0.9), 0 20px 40px -20px rgba(0,0,0,0.1)',
              backdropFilter: isDarkMode ? 'blur(20px) saturate(1.2)' : 'none',
              overflow: 'hidden'
            }}>
              {/* Decorative gradient orbs */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-10%',
                width: '300px',
                height: '300px',
                background: isDarkMode 
                  ? 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(80px)',
                pointerEvents: 'none',
                opacity: isDarkMode ? 0.5 : 1
              }} />
              <div style={{
                position: 'absolute',
                bottom: '-50%',
                right: '-10%',
                width: '300px',
                height: '300px',
                background: isDarkMode 
                  ? 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(80px)',
                pointerEvents: 'none',
                opacity: isDarkMode ? 0.5 : 1
              }} />

              {/* Top decorative line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: isDarkMode ? '2px' : '3px',
                background: isDarkMode 
                  ? `linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent)`
                  : `linear-gradient(90deg, transparent, ${currentTheme.accent}, transparent)`,
                borderRadius: '2px',
                opacity: isDarkMode ? 0.6 : 1
              }} />

              {/* Header with icon */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '3rem',
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '60px',
                  height: '60px',
                  background: isDarkMode 
                    ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%)'
                    : 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 100%)',
                  borderRadius: '16px',
                  marginBottom: '1.5rem',
                  border: isDarkMode 
                    ? '1px solid rgba(139, 92, 246, 0.2)'
                    : '1px solid rgba(139, 92, 246, 0.2)',
                  boxShadow: isDarkMode 
                    ? '0 4px 12px -4px rgba(139, 92, 246, 0.2)'
                    : '0 8px 16px -8px rgba(139, 92, 246, 0.3)'
                }}>
                  <BookOpen size={28} color={isDarkMode ? '#a78bfa' : currentTheme.accent} />
                </div>
                
                <h2 style={{
                  fontSize: isMobile ? '2rem' : '2.5rem',
                  fontWeight: '300',
                  marginBottom: '0.5rem',
                  textAlign: 'center',
                  fontFamily: 'var(--font-literata)',
                  color: currentTheme.text,
                  letterSpacing: '-0.02em'
                }}>
                  Continue Your Journey
                </h2>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginTop: '0.5rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '1px',
                    background: isDarkMode 
                      ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1))'
                      : `linear-gradient(90deg, transparent, ${currentTheme.divider})`,
                    opacity: isDarkMode ? 0.5 : 1
                  }} />
                  <p style={{
                    fontSize: '1.125rem',
                    color: isDarkMode ? 'rgba(255,255,255,0.6)' : currentTheme.muted,
                    textAlign: 'center',
                    margin: 0,
                    fontStyle: 'italic'
                  }}>
                    Handpicked articles to expand your knowledge
                  </p>
                  <div style={{
                    width: '40px',
                    height: '1px',
                    background: isDarkMode 
                      ? 'linear-gradient(90deg, rgba(255,255,255,0.1), transparent)'
                      : `linear-gradient(90deg, ${currentTheme.divider}, transparent)`,
                    opacity: isDarkMode ? 0.5 : 1
                  }} />
                </div>
              </div>

              {/* Related Articles Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '2rem',
                marginBottom: '3rem',
                maxWidth: '800px',
                margin: '0 auto 3rem',
                position: 'relative',
                zIndex: 1
              }}>
                {/* Related Article 1 */}
                <Link 
                  href="/blog/mastering-prompt-engineering"
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                    transform: 'translateY(0)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    backgroundColor: currentTheme.elevated,
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: `1px solid ${currentTheme.border}`,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = currentTheme.accent;
                    e.currentTarget.style.boxShadow = `0 10px 30px ${isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = currentTheme.border;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <div style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      backgroundColor: `${currentTheme.accent}20`,
                      color: currentTheme.accent,
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      marginBottom: '1rem'
                    }}>
                      Prompt Engineering
                    </div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      marginBottom: '0.75rem',
                      color: currentTheme.text,
                      lineHeight: 1.3
                    }}>
                      Mastering Prompt Engineering
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: currentTheme.muted,
                      lineHeight: 1.5,
                      marginBottom: '1rem'
                    }}>
                      Learn the art and science of crafting effective prompts that unlock the full potential of AI language models.
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.875rem',
                      color: currentTheme.subtle
                    }}>
                      <Clock size={14} />
                      <span>8 min read</span>
                    </div>
                  </div>
                </Link>

                {/* Related Article 2 */}
                <Link 
                  href="/blog/research-methodology-digital-age"
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                    transform: 'translateY(0)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    backgroundColor: currentTheme.elevated,
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: `1px solid ${currentTheme.border}`,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = currentTheme.accent;
                    e.currentTarget.style.boxShadow = `0 10px 30px ${isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = currentTheme.border;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <div style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      backgroundColor: `${currentTheme.accent}20`,
                      color: currentTheme.accent,
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      marginBottom: '1rem'
                    }}>
                      Research
                    </div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      marginBottom: '0.75rem',
                      color: currentTheme.text,
                      lineHeight: 1.3
                    }}>
                      Research Methodology in the Digital Age
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: currentTheme.muted,
                      lineHeight: 1.5,
                      marginBottom: '1rem'
                    }}>
                      Discover modern research techniques that leverage digital tools while maintaining academic rigor.
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.875rem',
                      color: currentTheme.subtle
                    }}>
                      <Clock size={14} />
                      <span>15 min read</span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* View All Articles CTA */}
              <div style={{
                textAlign: 'center',
                marginTop: '3rem',
                position: 'relative',
                zIndex: 1
              }}>
                <Link
                  href="/blog"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.875rem 2rem',
                    backgroundColor: 'transparent',
                    color: isDarkMode ? 'rgba(167, 139, 250, 0.8)' : currentTheme.accent,
                    border: isDarkMode 
                      ? '1.5px solid rgba(167, 139, 250, 0.3)'
                      : `2px solid ${currentTheme.accent}`,
                    borderRadius: '50px',
                    fontSize: '1rem',
                    fontWeight: isDarkMode ? '500' : '600',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (isDarkMode) {
                      e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.08)';
                      e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.5)';
                      e.currentTarget.style.color = 'rgba(167, 139, 250, 1)';
                    } else {
                      e.currentTarget.style.backgroundColor = `${currentTheme.accent}10`;
                    }
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                    if (isDarkMode) {
                      e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.3)';
                      e.currentTarget.style.color = 'rgba(167, 139, 250, 0.8)';
                    }
                  }}
                >
                  View All Articles
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Engagement Actions */}
            {/* <div style={{
              marginTop: '3rem',
              padding: '2rem',
              backgroundColor: currentTheme.elevated,
              borderRadius: '16px',
              border: `1px solid ${currentTheme.border}`,
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: currentTheme.text
              }}>
                Did you find this article helpful?
              </h3>
              <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '1.5rem',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={() => {
                    setIsLiked(!isLiked);
                    if (!isLiked) setLikeCount(prev => prev + 1);
                    else setLikeCount(prev => prev - 1);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    background: isLiked ? `linear-gradient(135deg, ${currentTheme.accent} 0%, ${currentTheme.accentLight} 100%)` : currentTheme.card,
                    border: `1px solid ${isLiked ? currentTheme.accent : currentTheme.border}`,
                    borderRadius: '12px',
                    color: isLiked ? '#ffffff' : currentTheme.text,
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Heart size={18} fill={isLiked ? '#ffffff' : 'none'} />
                  {isLiked ? 'Liked' : 'Like'} ({likeCount})
                </button>
                
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: isBookmarked ? currentTheme.info : currentTheme.card,
                    border: `1px solid ${isBookmarked ? currentTheme.info : currentTheme.border}`,
                    borderRadius: '12px',
                    color: isBookmarked ? '#ffffff' : currentTheme.text,
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <BookMarked size={18} fill={isBookmarked ? '#ffffff' : 'none'} />
                  {isBookmarked ? 'Saved' : 'Save'}
                </button>

                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.5rem',
                      backgroundColor: currentTheme.card,
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: '12px',
                      color: currentTheme.text,
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Share2 size={18} />
                    Share
                  </button>
                  
                  {showShareMenu && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      marginTop: '0.5rem',
                      backgroundColor: currentTheme.card,
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: '12px',
                      padding: '0.5rem',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                      zIndex: 10,
                      backdropFilter: 'blur(20px)'
                    }}>
                      <button
                        onClick={() => handleShare('twitter')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 1rem',
                          backgroundColor: 'transparent',
                          border: 'none',
                          color: currentTheme.text,
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          width: '100%',
                          textAlign: 'left',
                          borderRadius: '8px',
                          transition: 'background 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentTheme.elevated}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <Twitter size={16} />
                        Twitter
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 1rem',
                          backgroundColor: 'transparent',
                          border: 'none',
                          color: currentTheme.text,
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          width: '100%',
                          textAlign: 'left',
                          borderRadius: '8px',
                          transition: 'background 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentTheme.elevated}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <Linkedin size={16} />
                        LinkedIn
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 1rem',
                          backgroundColor: 'transparent',
                          border: 'none',
                          color: currentTheme.text,
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          width: '100%',
                          textAlign: 'left',
                          borderRadius: '8px',
                          transition: 'background 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentTheme.elevated}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? 'Copied!' : 'Copy Link'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div> */}
          </article>

          {/* Right Sidebar - Table of Contents */}
          {isDesktop && (
            <aside style={{
              position: 'sticky',
              top: '100px',
              height: 'fit-content',
              width: '300px',
              flexShrink: 0
            }}>
              <div style={{
                background: `linear-gradient(145deg, ${currentTheme.elevated} 0%, ${currentTheme.card} 100%)`,
                borderRadius: '20px',
                padding: '2rem',
                border: `1px solid ${currentTheme.border}`,
                backdropFilter: 'blur(20px)',
                boxShadow: `0 8px 32px ${currentTheme.accent}10`,
                position: 'relative',
                overflow: 'hidden'
              }}              >
                {/* Decorative corner accent - only in dark mode */}
                {isDarkMode && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '60px',
                  height: '60px',
                  background: `linear-gradient(135deg, ${currentTheme.accent}20 0%, transparent 50%)`,
                  borderRadius: '0 20px 0 20px'
                }} />
                )}
                
                <div style={{
                  position: 'relative',
                  zIndex: 1
                }}>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '300',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: currentTheme.text,
                    fontFamily: 'var(--font-literata)',
                    letterSpacing: '-0.01em'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: `linear-gradient(135deg, ${currentTheme.accent} 0%, ${currentTheme.accentLight} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      <Hash size={16} />
                    </div>
                    Contents
                  </h3>
                  
                  <nav style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}>
                    {tableOfContents.map((item, index) => {
                      const isActive = activeSection === item.id;
                      return (
                      <button
                        key={item.id}
                        onClick={(e) => {
                          // Add a subtle scale animation on click
                          e.currentTarget.style.transform = 'scale(0.98)';
                          setTimeout(() => {
                            e.currentTarget.style.transform = '';
                          }, 200);
                          scrollToSection(item.id);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.875rem 1rem',
                          backgroundColor: isActive 
                            ? (isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)')
                            : 'transparent',
                          border: 'none',
                          color: isActive 
                            ? (isDarkMode ? currentTheme.text : '#111827')
                            : currentTheme.muted,
                          fontSize: '0.875rem',
                          fontWeight: isActive ? '500' : '400',
                          cursor: 'pointer',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          borderRadius: '12px',
                          position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = `${currentTheme.card}80`;
                            e.currentTarget.style.color = currentTheme.text;
                            e.currentTarget.style.transform = 'translateX(2px)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = currentTheme.muted;
                            e.currentTarget.style.transform = 'translateX(0)';
                          }
                        }}
                      >
                        {/* Section number indicator */}
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: isActive 
                            ? currentTheme.accent 
                            : isDarkMode ? currentTheme.elevated : '#f3f4f6',
                          border: isActive
                            ? 'none'
                            : `1px solid ${currentTheme.border}`,
                          color: isActive 
                            ? '#ffffff' 
                            : isDarkMode ? currentTheme.subtle : '#6b7280',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          marginRight: '0.875rem',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          flexShrink: 0,
                          boxShadow: isActive 
                            ? `0 2px 8px ${currentTheme.accent}30`
                            : 'none',
                          transform: isActive ? 'scale(1.05)' : 'scale(1)'
                        }}>
                          {index + 1}
                        </div>
                        
                        {/* Section title */}
                        <span style={{
                          flex: 1,
                          lineHeight: '1.4',
                          letterSpacing: '-0.01em'
                        }}>
                          {item.title}
                        </span>
                        
                      </button>
                      );
                    })}
                  </nav>
                  
                  {/* Progress indicator */}
                  <div style={{
                    marginTop: '1.5rem',
                    paddingTop: '1.5rem',
                    borderTop: `1px solid ${currentTheme.divider}`
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.75rem'
                    }}>
                      <span style={{
                        fontSize: '0.75rem',
                        color: currentTheme.subtle,
                        fontWeight: '500'
                      }}>
                        Reading Progress
                      </span>
                      <span style={{
                        fontSize: '0.75rem',
                        color: currentTheme.accent,
                        fontWeight: '600'
                      }}>
                        {Math.round(readingProgress)}%
                      </span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '4px',
                      backgroundColor: currentTheme.divider,
                      borderRadius: '2px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${readingProgress}%`,
                        height: '100%',
                        background: `linear-gradient(90deg, ${currentTheme.accent} 0%, ${currentTheme.accentLight} 100%)`,
                        borderRadius: '2px',
                        transition: 'width 0.3s ease',
                        boxShadow: `0 0 8px ${currentTheme.accent}30`
                      }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Capture Card */}
              <div style={{
                background: isDarkMode 
                  ? `linear-gradient(135deg, ${currentTheme.elevated} 0%, ${currentTheme.card} 100%)`
                  : `linear-gradient(135deg, #fafafa 0%, #f9fafb 100%)`,
                borderRadius: '16px',
                padding: '1.5rem',
                marginTop: '1.5rem',
                border: `1px solid ${currentTheme.border}`,
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Decorative element */}
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '80px',
                  height: '80px',
                  background: isDarkMode 
                    ? `radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)`
                    : `radial-gradient(circle, rgba(0, 0, 0, 0.02) 0%, transparent 70%)`,
                  borderRadius: '50%',
                  filter: 'blur(20px)'
                }} />
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    fontSize: '1.125rem',
                  fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: currentTheme.text,
                    fontFamily: 'var(--font-literata)'
                }}>
                    Get Weekly AI Writing Tips
                </div>
                  <p style={{
                    fontSize: '0.875rem',
                    color: currentTheme.muted,
                    marginBottom: '1rem',
                    lineHeight: 1.4
                  }}>
                    Join 10,000+ writers improving their craft with AI
                  </p>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: `1px solid ${currentTheme.border}`,
                      backgroundColor: currentTheme.bg,
                      color: currentTheme.text,
                      fontSize: '0.875rem',
                      marginBottom: '0.75rem',
                      outline: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = currentTheme.accent;
                      e.target.style.boxShadow = `0 0 0 3px ${currentTheme.accent}15`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = currentTheme.border;
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <button style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: `linear-gradient(135deg, ${currentTheme.accent} 0%, ${currentTheme.accentLight} 100%)`,
                    color: '#ffffff',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    border: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: `0 4px 12px ${currentTheme.accent}30`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = `0 6px 16px ${currentTheme.accent}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 4px 12px ${currentTheme.accent}30`;
                  }}
                  >
                    Subscribe
                  </button>
                  <p style={{
                    fontSize: '0.75rem',
                    color: currentTheme.subtle,
                    marginTop: '0.75rem',
                    textAlign: 'center'
                  }}>
                    No spam. Unsubscribe anytime.
                  </p>
                </div>
              </div>
            </aside>
          )}
        </div>
      </section>

      {/* CSS Animations and Scrollbar Styling */}
      <style jsx>{`
        /* Custom scrollbar for sidebar */
        aside > div::-webkit-scrollbar {
          width: 4px;
        }
        
        aside > div::-webkit-scrollbar-track {
          background: transparent;
        }
        
        aside > div::-webkit-scrollbar-thumb {
          background: ${currentTheme.border};
          border-radius: 2px;
        }
        
        aside > div::-webkit-scrollbar-thumb:hover {
          background: ${currentTheme.accent}40;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2);
          }
        }
        
        @keyframes slideIn {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 3px;
            opacity: 1;
          }
        }
        
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 0 0 ${currentTheme.accent}40;
          }
          50% {
            box-shadow: 0 0 0 8px ${currentTheme.accent}00;
          }
        }
      `}</style>
    </div>
  );
};

export default BlogPostClient;