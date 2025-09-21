"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ArrowLeft, Calendar, Clock, User, Tag, Share2,
  BookOpen, Heart, BookMarked, MessageCircle,
  Twitter, Facebook, Linkedin, Copy, Check,
  ArrowRight, ChevronRight, TrendingUp, Star,
  Sun, Moon, Maximize2, Minimize2, Volume2,
  Eye, ThumbsUp, Send, MoreVertical, Hash,
  Quote, Code, FileText, Sparkles, Zap,
  Award, TrendingDown, AlertCircle, Info,
  BarChart
} from 'lucide-react';
import ContextAwareNavigation from '@/components/Navigation/ContextAwareNavigation';
import '@/app/globals.css';

const BlogPostClient = ({ params }) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [fontSize, setFontSize] = useState('medium');
  const [showTableOfContents, setShowTableOfContents] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewCount] = useState(Math.floor(Math.random() * 10000) + 1000);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 500) + 50);
  const [shareCount] = useState(Math.floor(Math.random() * 200) + 20);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  const contentRef = useRef(null);
  const articleRef = useRef(null);

  const currentTheme = isDarkMode ? {
    bg: '#0a0a0f',
    elevated: '#16161f',
    card: '#1a1a24',
    text: '#ffffff',
    muted: 'rgba(255, 255, 255, 0.7)',
    subtle: 'rgba(255, 255, 255, 0.5)',
    faint: 'rgba(255, 255, 255, 0.3)',
    border: 'rgba(255, 255, 255, 0.08)',
    divider: 'rgba(255, 255, 255, 0.05)',
    accent: '#8b5cf6',
    accentLight: '#a78bfa',
    accentDark: '#7c3aed',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6'
  } : {
    bg: '#ffffff',
    elevated: '#f9fafb',
    card: '#f3f4f6',
    text: '#111827',
    muted: 'rgba(17, 24, 39, 0.7)',
    subtle: 'rgba(17, 24, 39, 0.5)',
    faint: 'rgba(17, 24, 39, 0.3)',
    border: 'rgba(17, 24, 39, 0.08)',
    divider: 'rgba(17, 24, 39, 0.05)',
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

  const currentFontSize = fontSizes[fontSize];

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

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { top, height } = contentRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const scrolled = Math.max(0, Math.min(1, (-top) / (height - windowHeight)));
        setReadingProgress(scrolled * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Time spent reading tracker
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Table of contents data
  const tableOfContents = [
    { id: 'intro', title: 'Introduction', level: 1 },
    { id: 'current-state', title: 'The Current State of AI', level: 1 },
    { id: 'emerging-tech', title: 'Emerging Technologies', level: 1 },
    { id: 'challenges', title: 'Challenges and Considerations', level: 1 },
    { id: 'road-ahead', title: 'The Road Ahead', level: 1 },
    { id: 'conclusion', title: 'Conclusion', level: 1 }
  ];

  // Enhanced blog post data with more metadata
  const post = {
    title: "The Future of AI in Academic Writing: A Comprehensive Analysis",
    subtitle: "How artificial intelligence is revolutionizing scholarly work and what it means for the future of research",
    excerpt: "Explore how artificial intelligence is revolutionizing academic writing, from research assistance to automated proofreading and beyond.",
    content: `
      <section id="intro">
        <p>Artificial intelligence is transforming the landscape of academic writing in unprecedented ways. From automated research assistance to intelligent proofreading tools, AI technologies are reshaping how scholars approach the craft of writing.</p>
        
        <p>This comprehensive analysis explores the current state of AI in academic writing, emerging technologies, and the challenges that lie ahead as we navigate this new frontier of scholarly work.</p>
      </section>
      
      <section id="current-state">
        <h2>The Current State of AI in Academic Writing</h2>
        <p>Today's AI writing tools offer capabilities that were unimaginable just a few years ago. These tools can help researchers:</p>
        <ul>
          <li>Generate literature reviews with comprehensive source analysis</li>
          <li>Assist with citation formatting and reference management</li>
          <li>Provide real-time grammar and style suggestions</li>
          <li>Offer alternative phrasing and vocabulary suggestions</li>
          <li>Detect potential plagiarism and ensure originality</li>
        </ul>
        
        <p>The integration of these tools has led to significant improvements in writing efficiency and quality across academic institutions worldwide.</p>
      </section>
      
      <section id="emerging-tech">
        <h2>Emerging Technologies and Their Impact</h2>
        <p>Recent advances in natural language processing have led to the development of more sophisticated writing assistants. These tools understand context, maintain consistency in tone, and can even suggest structural improvements to academic papers.</p>
        
        <blockquote>
          "The integration of AI in academic writing represents not a replacement of human creativity, but an enhancement of scholarly capabilities." - Zev Uhuru
        </blockquote>
        
        <p>Key emerging technologies include:</p>
        <ul>
          <li><strong>Contextual AI Assistants:</strong> Tools that understand the specific requirements of different academic disciplines</li>
          <li><strong>Research Synthesis Engines:</strong> Systems that can analyze and synthesize findings from multiple sources</li>
          <li><strong>Automated Peer Review:</strong> AI systems that provide initial feedback on academic papers</li>
        </ul>
      </section>
      
      <section id="challenges">
        <h2>Challenges and Considerations</h2>
        <p>While AI offers tremendous potential, it also presents challenges that academic institutions must address:</p>
        <ul>
          <li>Maintaining academic integrity and originality</li>
          <li>Ensuring proper attribution of AI-generated content</li>
          <li>Developing guidelines for AI tool usage</li>
          <li>Preserving critical thinking and analytical skills</li>
        </ul>
        
        <p>These challenges require careful consideration and the development of new frameworks for academic work in the AI age.</p>
      </section>
      
      <section id="road-ahead">
        <h2>The Road Ahead</h2>
        <p>As we look to the future, the relationship between AI and academic writing will continue to evolve. The key lies in finding the right balance between leveraging AI capabilities and maintaining the essential human elements of scholarly work.</p>
        
        <p>Future developments may include:</p>
        <ul>
          <li>More sophisticated AI research assistants</li>
          <li>Enhanced collaboration tools for academic teams</li>
          <li>Improved methods for verifying AI-assisted research</li>
          <li>New pedagogical approaches to teaching writing with AI</li>
        </ul>
      </section>
      
      <section id="conclusion">
        <h2>Conclusion</h2>
        <p>The integration of AI in academic writing is not just a technological shift—it's a fundamental reimagining of how knowledge is created, shared, and validated. As we embrace these new tools, we must remain mindful of the values that underpin academic work: rigor, originality, and the pursuit of truth.</p>
      </section>
    `,
    author: "Zev Uhuru",
    authorBio: "Zev Uhuru is the founder of Esy, specializing in AI-powered educational tools and academic writing assistance. He has extensive experience in developing innovative solutions for students and researchers.",
    authorTitle: "Founder, Esy",
    date: "March 28, 2025",
    readTime: 12,
    category: "AI & Technology",
    tags: ["AI", "Academic Writing", "Future Tech", "Education", "Research", "Innovation"],
    difficulty: "Intermediate",
    citations: 24,
    relatedPosts: [
      { id: 1, title: "Mastering Prompt Engineering", readTime: 8 },
      { id: 2, title: "Ethics in AI-Assisted Research", readTime: 10 },
      { id: 3, title: "The Evolution of Academic Publishing", readTime: 15 }
    ]
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleShare = async (platform) => {
    const url = window.location.href;
    const text = `${post.title} - Read this insightful article on Esy`;
    
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
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
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
      {/* Context-Aware Navigation with HeaderSearch */}
      <ContextAwareNavigation showHeaderSearch={true} forceContext="blog" />
      
      {/* Reading Progress Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        backgroundColor: currentTheme.divider,
        zIndex: 1000
      }}>
        <div style={{
          height: '100%',
          width: `${readingProgress}%`,
          background: `linear-gradient(90deg, ${currentTheme.accent} 0%, ${currentTheme.accentLight} 100%)`,
          transition: 'width 0.1s ease',
          boxShadow: `0 0 10px ${currentTheme.accent}40`
        }} />
      </div>

      {/* Floating Action Bar */}
      <div style={{
        position: 'fixed',
        top: '50%',
        right: isMobile ? '1rem' : '2rem',
        transform: 'translateY(-50%)',
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
            backdropFilter: 'blur(10px)'
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

        <button
          onClick={() => {
            const sizes = ['small', 'medium', 'large', 'xlarge'];
            const currentIndex = sizes.indexOf(fontSize);
            setFontSize(sizes[(currentIndex + 1) % sizes.length]);
          }}
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
            fontSize: fontSize === 'small' ? '14px' : fontSize === 'large' ? '18px' : fontSize === 'xlarge' ? '20px' : '16px',
            fontWeight: '600'
          }}
        >
          Aa
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
              backdropFilter: 'blur(10px)'
            }}
          >
            {isFullscreen ? <Minimize2 size={20} color={currentTheme.muted} /> : <Maximize2 size={20} color={currentTheme.muted} />}
          </button>
        )}
      </div>

      {/* Hero Section with Enhanced Design */}
      <section style={{ 
        padding: isSmallMobile ? '6rem 1rem 3rem' : isMobile ? '7rem 1.5rem 4rem' : isTablet ? '8rem 2rem 4rem' : '8rem 2rem 4rem',
        position: 'relative',
        background: `linear-gradient(180deg, ${currentTheme.bg} 0%, ${currentTheme.elevated} 100%)`,
        overflow: 'hidden'
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          zIndex: 0
        }}>
          <div style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${currentTheme.accent}20 0%, transparent 70%)`,
            top: '-300px',
            right: '-200px',
            animation: 'float 20s ease-in-out infinite'
          }} />
          <div style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${currentTheme.info}15 0%, transparent 70%)`,
            bottom: '-200px',
            left: '-100px',
            animation: 'float 15s ease-in-out infinite reverse'
          }} />
        </div>

        <div style={{ 
          maxWidth: '900px', 
          margin: '0 auto',
          position: 'relative', 
          zIndex: 1 
        }}>
          {/* Back Button with Enhanced Style */}
          <button
            onClick={() => window.history.back()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: currentTheme.elevated,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '50px',
              color: currentTheme.muted,
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              marginBottom: '2rem',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(-4px)';
              e.currentTarget.style.borderColor = currentTheme.accent;
              e.currentTarget.style.color = currentTheme.accent;
              e.currentTarget.style.backgroundColor = `${currentTheme.accent}10`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.borderColor = currentTheme.border;
              e.currentTarget.style.color = currentTheme.muted;
              e.currentTarget.style.backgroundColor = currentTheme.elevated;
            }}
          >
            <ArrowLeft size={16} />
            Back to Blog
          </button>

          {/* Category and Metadata Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              padding: '0.5rem 1rem',
              background: `linear-gradient(135deg, ${currentTheme.accent}30 0%, ${currentTheme.accentLight}20 100%)`,
              color: currentTheme.accent,
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: '600',
              display: 'inline-block',
              border: `1px solid ${currentTheme.accent}40`
            }}>
              {post.category}
            </div>
            
            <div style={{
              padding: '0.5rem 1rem',
              backgroundColor: currentTheme.success + '20',
              color: currentTheme.success,
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: '500',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              <TrendingUp size={14} />
              Trending
            </div>

            <div style={{
              padding: '0.5rem 1rem',
              backgroundColor: currentTheme.warning + '20',
              color: currentTheme.warning,
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              {post.difficulty}
            </div>
          </div>

          {/* Title with Gradient */}
          <h1 style={{
            fontSize: isTinyMobile ? '2rem' : isSmallMobile ? '2.25rem' : isMobile ? '2.5rem' : isTablet ? '3rem' : isLargeDesktop ? '4rem' : '3.5rem',
            fontWeight: 300,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
            fontFamily: 'var(--font-literata)',
            background: `linear-gradient(135deg, ${currentTheme.text} 0%, ${currentTheme.muted} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {post.title}
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
            {post.subtitle}
          </p>

          {/* Enhanced Meta Info Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            padding: '1.5rem',
            backgroundColor: currentTheme.card,
            borderRadius: '16px',
            border: `1px solid ${currentTheme.border}`,
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: currentTheme.accent + '20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <User size={18} color={currentTheme.accent} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: currentTheme.subtle }}>Author</div>
                <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>{post.author}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: currentTheme.info + '20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Calendar size={18} color={currentTheme.info} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: currentTheme.subtle }}>Published</div>
                <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>{post.date}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: currentTheme.success + '20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Clock size={18} color={currentTheme.success} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: currentTheme.subtle }}>Read Time</div>
                <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>{post.readTime} min</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: currentTheme.warning + '20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Eye size={18} color={currentTheme.warning} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: currentTheme.subtle }}>Views</div>
                <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>{viewCount.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Reading Stats Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: currentTheme.elevated,
            borderRadius: '12px',
            border: `1px solid ${currentTheme.border}`
          }}>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen size={16} color={currentTheme.accent} />
                <span style={{ fontSize: '0.875rem', color: currentTheme.muted }}>
                  {Math.round(readingProgress)}% Complete
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={16} color={currentTheme.info} />
                <span style={{ fontSize: '0.875rem', color: currentTheme.muted }}>
                  {formatTime(timeSpent)} reading
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <ThumbsUp size={16} color={currentTheme.subtle} />
              <span style={{ fontSize: '0.875rem', color: currentTheme.subtle }}>{likeCount}</span>
              <Share2 size={16} color={currentTheme.subtle} style={{ marginLeft: '1rem' }} />
              <span style={{ fontSize: '0.875rem', color: currentTheme.subtle }}>{shareCount}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area with Sidebar */}
      <section style={{
        padding: isMobile ? '2rem 1rem' : '3rem 2rem',
        backgroundColor: currentTheme.bg
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isDesktop ? '250px 1fr 250px' : '1fr',
          gap: '3rem'
        }}>
          {/* Left Sidebar - Table of Contents */}
          {isDesktop && (
            <aside style={{
              position: 'sticky',
              top: '100px',
              height: 'fit-content'
            }}>
              <div style={{
                backgroundColor: currentTheme.elevated,
                borderRadius: '16px',
                padding: '1.5rem',
                border: `1px solid ${currentTheme.border}`
              }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Hash size={16} />
                  Table of Contents
                </h3>
                <nav>
                  {tableOfContents.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.5rem 0.75rem',
                        marginBottom: '0.25rem',
                        backgroundColor: activeSection === item.id ? currentTheme.accent + '20' : 'transparent',
                        borderLeft: `3px solid ${activeSection === item.id ? currentTheme.accent : 'transparent'}`,
                        color: activeSection === item.id ? currentTheme.accent : currentTheme.muted,
                        fontSize: '0.875rem',
                        fontWeight: activeSection === item.id ? '600' : '400',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        border: 'none',
                        borderRadius: '8px'
                      }}
                      onMouseEnter={(e) => {
                        if (activeSection !== item.id) {
                          e.currentTarget.style.backgroundColor = currentTheme.card;
                          e.currentTarget.style.color = currentTheme.text;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeSection !== item.id) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = currentTheme.muted;
                        }
                      }}
                    >
                      {item.title}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Author Card */}
              <div style={{
                backgroundColor: currentTheme.elevated,
                borderRadius: '16px',
                padding: '1.5rem',
                marginTop: '1.5rem',
                border: `1px solid ${currentTheme.border}`
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${currentTheme.accent} 0%, ${currentTheme.accentLight} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '2rem',
                  fontWeight: '600',
                  margin: '0 auto 1rem'
                }}>
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{post.author}</div>
                  <div style={{ fontSize: '0.75rem', color: currentTheme.muted, marginBottom: '1rem' }}>{post.authorTitle}</div>
                  <button style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: currentTheme.accent,
                    color: '#ffffff',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    border: 'none',
                    transition: 'all 0.2s ease'
                  }}>
                    Follow
                  </button>
                </div>
              </div>
            </aside>
          )}

          {/* Main Article Content */}
          <article ref={contentRef} style={{ maxWidth: '750px' }}>
            <div 
              style={{
                fontSize: currentFontSize.body,
                lineHeight: currentFontSize.lineHeight,
                color: currentTheme.text
              }}
              dangerouslySetInnerHTML={{ 
                __html: post.content
                  .replace(/<h2>/g, `<h2 style="font-size: ${currentFontSize.heading}; font-weight: 600; margin: 3rem 0 1.5rem; color: ${currentTheme.text}; font-family: var(--font-literata);">`)
                  .replace(/<p>/g, `<p style="margin-bottom: 1.75rem; color: ${currentTheme.text}; line-height: ${currentFontSize.lineHeight};">`)
                  .replace(/<ul>/g, `<ul style="margin-bottom: 1.75rem; padding-left: 1.5rem; list-style: none;">`)
                  .replace(/<li>/g, `<li style="margin-bottom: 0.75rem; color: ${currentTheme.text}; position: relative; padding-left: 1.5rem;"><span style="position: absolute; left: 0; color: ${currentTheme.accent};">•</span>`)
                  .replace(/<blockquote>/g, `<blockquote style="border-left: 4px solid ${currentTheme.accent}; padding: 1.5rem; margin: 2.5rem 0; font-style: italic; color: ${currentTheme.muted}; font-size: ${currentFontSize.body}; background: ${currentTheme.elevated}; border-radius: 0 12px 12px 0; position: relative;">`)
                  .replace(/<strong>/g, `<strong style="color: ${currentTheme.accent}; font-weight: 600;">`)
                  .replace(/<section/g, `<section style="scroll-margin-top: 100px;"`)
              }}
            />

            {/* Enhanced Tags Section */}
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
                gap: '0.5rem'
              }}>
                <Tag size={16} />
                Topics Covered
              </h3>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                {post.tags.map((tag, index) => (
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

            {/* Engagement Actions */}
            <div style={{
              marginTop: '3rem',
              padding: '2rem',
              backgroundColor: currentTheme.elevated,
              borderRadius: '16px',
              border: `1px solid ${currentTheme.border}`
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                Did you find this article helpful?
              </h3>
              <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '1.5rem'
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
                      zIndex: 10
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
            </div>
          </article>

          {/* Right Sidebar - Related Content */}
          {isDesktop && (
            <aside style={{
              position: 'sticky',
              top: '100px',
              height: 'fit-content'
            }}>
              {/* Reading Stats Card */}
              <div style={{
                backgroundColor: currentTheme.elevated,
                borderRadius: '16px',
                padding: '1.5rem',
                border: `1px solid ${currentTheme.border}`,
                marginBottom: '1.5rem'
              }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <BarChart size={16} />
                  Article Stats
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: currentTheme.subtle, marginBottom: '0.25rem' }}>Citations</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '600', color: currentTheme.accent }}>{post.citations}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: currentTheme.subtle, marginBottom: '0.25rem' }}>Engagement</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '600', color: currentTheme.success }}>
                      {((likeCount / viewCount) * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: currentTheme.subtle, marginBottom: '0.25rem' }}>Shares</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '600', color: currentTheme.info }}>{shareCount}</div>
                  </div>
                </div>
              </div>

              {/* Related Articles */}
              <div style={{
                backgroundColor: currentTheme.elevated,
                borderRadius: '16px',
                padding: '1.5rem',
                border: `1px solid ${currentTheme.border}`
              }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Sparkles size={16} />
                  Related Articles
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {post.relatedPosts.map((related) => (
                    <button
                      key={related.id}
                      style={{
                        textAlign: 'left',
                        padding: '0.75rem',
                        backgroundColor: currentTheme.card,
                        borderRadius: '12px',
                        border: `1px solid ${currentTheme.border}`,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateX(-4px)';
                        e.currentTarget.style.borderColor = currentTheme.accent;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.borderColor = currentTheme.border;
                      }}
                    >
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        marginBottom: '0.25rem',
                        color: currentTheme.text
                      }}>{related.title}</div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: currentTheme.subtle,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        <Clock size={12} />
                        {related.readTime} min read
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

export default BlogPostClient;