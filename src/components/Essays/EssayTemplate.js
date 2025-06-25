"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Clock, Calendar, Share2, Bookmark, 
  ChevronUp, ChevronRight, Hash, User, Building, Quote,
  Twitter, Linkedin, Link as LinkIcon, Check, Menu, X,
  Sun, Moon, Type, Minus, Plus
} from 'lucide-react';
import { 
  HeroSection, 
  FeaturedEssay, 
  EssaysList
} from '@/components/Essays';
import Navigation from '@/components/Home/navigation';
import Footer from '@/components/Home/footer';
import '@/app/globals.css';

const EssayTemplate = ({ 
  pageTitle = "Academic Essays",
  pageSubtitle = "& Research",
  pageDescription = "A collection of academic essays exploring contemporary issues. Each piece invites critical thinking, analysis, and continued exploration of ideas.",
  filters = [],
  featuredEssay = null,
  essays = [],
  searchPlaceholder = "Search essays...",
  showFullContent = false,
  essayContent = "",
  isEssayReader = false,
  essay = null
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [showTOC, setShowTOC] = useState(false);
  const [fontSize, setFontSize] = useState('default');
  const [theme, setTheme] = useState('dark');
  const [activeSection, setActiveSection] = useState('introduction');
  
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [selectedSort, setSelectedSort] = useState('relevance');
  
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (isEssayReader) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);

        // Update active section based on scroll position
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id);
          }
        });
      } else {
        setScrolled(window.scrollY > 10);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isEssayReader]);

  const handleShare = async (platform) => {
    if (platform === 'link') {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } else if (platform === 'twitter') {
      const title = essay?.title || pageTitle;
      const author = essay?.authors?.[0] || 'Esy Essays';
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title} - An insightful essay by ${author}`)}&url=${encodeURIComponent(window.location.href)}`);
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`);
    }
    setShowShareMenu(false);
  };

  const fontSizes = {
    small: { body: '0.875rem', heading: '1.875rem', lineHeight: 1.6 },
    default: { body: '1.063rem', heading: '2.25rem', lineHeight: 1.7 },
    large: { body: '1.25rem', heading: '2.5rem', lineHeight: 1.8 }
  };

  const currentTheme = theme === 'dark' 
    ? { bg: '#0a0a0f', text: '#ffffff', muted: 'rgba(255, 255, 255, 0.7)', border: 'rgba(255, 255, 255, 0.05)' }
    : { bg: '#ffffff', text: '#000000', muted: 'rgba(0, 0, 0, 0.7)', border: 'rgba(0, 0, 0, 0.05)' };

  // Default filters if none provided
  const defaultFilters = [
    { id: 'all', label: 'All Essays', count: 1247 },
    { id: 'climate', label: 'Climate & Environment', count: 234 },
    { id: 'politics', label: 'Political Science', count: 189 },
    { id: 'economics', label: 'Economics', count: 267 },
    { id: 'tech', label: 'Technology & Society', count: 342 },
    { id: 'philosophy', label: 'Philosophy', count: 215 }
  ];

  const displayFilters = filters.length > 0 ? filters : defaultFilters;

  // Default essay data for essay reader mode
  const defaultEssay = {
    title: "The Geopolitics of Renewable Energy: Power Shifts in a Decarbonizing World",
    authors: ["Dr. Sarah Chen", "Prof. Michael Torres"],
    institution: "MIT Energy Initiative",
    publishDate: "March 15, 2025",
    readTime: 45,
    wordCount: 12450,
    abstract: "This comprehensive analysis examines how the global transition to renewable energy is fundamentally reshaping international power dynamics. Through examination of energy infrastructure investments, rare earth mineral dependencies, and emerging energy alliances, we argue that traditional petrostates face unprecedented challenges while new forms of resource competition emerge around lithium, cobalt, and renewable technology patents.",
    sections: [
      { id: 'introduction', title: 'Introduction', readTime: 5 },
      { id: 'historical-context', title: 'Historical Context', readTime: 8 },
      { id: 'current-landscape', title: 'Current Landscape', readTime: 12 },
      { id: 'emerging-dynamics', title: 'Emerging Power Dynamics', readTime: 10 },
      { id: 'case-studies', title: 'Case Studies', readTime: 8 },
      { id: 'conclusion', title: 'Conclusion', readTime: 2 }
    ]
  };

  const essayData = essay || defaultEssay;

  // Extract sections from essay content if available
  const extractSectionsFromContent = (content) => {
    if (!content) return essayData.sections || [];
    
    const headingRegex = /<h[2-3][^>]*id="([^"]*)"[^>]*>(.*?)<\/h[2-3]>/g;
    const sections = [];
    let match;
    
    while ((match = headingRegex.exec(content)) !== null) {
      sections.push({
        id: match[1],
        title: match[2].replace(/<[^>]*>/g, ''), // Remove any HTML tags
        readTime: Math.floor(Math.random() * 8) + 3 // Estimate read time
      });
    }
    
    return sections.length > 0 ? sections : essayData.sections || [];
  };

  const sections = extractSectionsFromContent(essayContent);

  if (isEssayReader) {
    return (
      <div style={{ 
        minHeight: '100vh',
        backgroundColor: currentTheme.bg,
        color: currentTheme.text,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        transition: 'all 0.3s ease'
      }}>
        {/* Progress Bar */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          zIndex: 100
        }}>
          <div style={{
            height: '100%',
            background: '#6366f1',
            width: `${scrollProgress}%`,
            transition: 'width 0.1s ease'
          }} />
        </div>

        {/* Header */}
        <header style={{
          position: 'sticky',
          top: 0,
          backgroundColor: currentTheme.bg,
          borderBottom: `1px solid ${currentTheme.border}`,
          zIndex: 50,
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <Link href="/essays" style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: currentTheme.muted,
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s'
                }}>
                  <ArrowLeft size={16} />
                  Back to Essays
                </Link>
                
                <button
                  onClick={() => setShowTOC(!showTOC)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: 'transparent',
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '6px',
                    color: currentTheme.muted,
                    fontSize: '0.813rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <Menu size={14} />
                  Contents
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Font Size Controls */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.25rem',
                  background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                  borderRadius: '6px'
                }}>
                  <button
                    onClick={() => setFontSize('small')}
                    disabled={fontSize === 'small'}
                    style={{
                      padding: '0.375rem',
                      background: 'transparent',
                      border: 'none',
                      color: fontSize === 'small' ? currentTheme.muted : currentTheme.text,
                      cursor: fontSize === 'small' ? 'default' : 'pointer',
                      opacity: fontSize === 'small' ? 0.5 : 1
                    }}
                  >
                    <Minus size={14} />
                  </button>
                  <Type size={14} style={{ color: currentTheme.muted }} />
                  <button
                    onClick={() => setFontSize('large')}
                    disabled={fontSize === 'large'}
                    style={{
                      padding: '0.375rem',
                      background: 'transparent',
                      border: 'none',
                      color: fontSize === 'large' ? currentTheme.muted : currentTheme.text,
                      cursor: fontSize === 'large' ? 'default' : 'pointer',
                      opacity: fontSize === 'large' ? 0.5 : 1
                    }}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Theme Toggle */}
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  style={{
                    padding: '0.5rem',
                    background: 'transparent',
                    border: 'none',
                    color: currentTheme.muted,
                    cursor: 'pointer'
                  }}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                {/* Actions */}
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  style={{
                    padding: '0.5rem',
                    background: 'transparent',
                    border: 'none',
                    color: isBookmarked ? '#6366f1' : currentTheme.muted,
                    cursor: 'pointer',
                    transition: 'color 0.2s'
                  }}
                >
                  <Bookmark size={18} fill={isBookmarked ? '#6366f1' : 'none'} />
                </button>

                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    style={{
                      padding: '0.5rem',
                      background: 'transparent',
                      border: 'none',
                      color: currentTheme.muted,
                      cursor: 'pointer'
                    }}
                  >
                    <Share2 size={18} />
                  </button>

                  {showShareMenu && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '0.5rem',
                      padding: '0.5rem',
                      background: currentTheme.bg,
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: '8px',
                      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)',
                      minWidth: '160px'
                    }}>
                      <button
                        onClick={() => handleShare('twitter')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          width: '100%',
                          padding: '0.5rem 0.75rem',
                          background: 'transparent',
                          border: 'none',
                          color: currentTheme.text,
                          fontSize: '0.813rem',
                          cursor: 'pointer',
                          borderRadius: '6px',
                          transition: 'background 0.2s'
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
                          padding: '0.5rem 0.75rem',
                          background: 'transparent',
                          border: 'none',
                          color: currentTheme.text,
                          fontSize: '0.813rem',
                          cursor: 'pointer',
                          borderRadius: '6px',
                          transition: 'background 0.2s'
                        }}
                      >
                        <Linkedin size={16} />
                        LinkedIn
                      </button>
                      <button
                        onClick={() => handleShare('link')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          width: '100%',
                          padding: '0.5rem 0.75rem',
                          background: 'transparent',
                          border: 'none',
                          color: currentTheme.text,
                          fontSize: '0.813rem',
                          cursor: 'pointer',
                          borderRadius: '6px',
                          transition: 'background 0.2s'
                        }}
                      >
                        {linkCopied ? <Check size={16} /> : <LinkIcon size={16} />}
                        {linkCopied ? 'Copied!' : 'Copy Link'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Table of Contents Sidebar */}
        {showTOC && (
          <div style={{
            position: 'fixed',
            top: '65px',
            left: 0,
            bottom: 0,
            width: '300px',
            background: currentTheme.bg,
            borderRight: `1px solid ${currentTheme.border}`,
            padding: '2rem',
            overflowY: 'auto',
            zIndex: 40
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Contents</h3>
              <button
                onClick={() => setShowTOC(false)}
                style={{
                  padding: '0.25rem',
                  background: 'transparent',
                  border: 'none',
                  color: currentTheme.muted,
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>
            
            <nav>
              {sections.map(section => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setShowTOC(false)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    marginBottom: '0.5rem',
                    background: activeSection === section.id 
                      ? theme === 'dark' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.05)'
                      : 'transparent',
                    borderLeft: activeSection === section.id ? '3px solid #6366f1' : '3px solid transparent',
                    borderRadius: '0 6px 6px 0',
                    textDecoration: 'none',
                    color: activeSection === section.id ? currentTheme.text : currentTheme.muted,
                    fontSize: '0.875rem',
                    transition: 'all 0.2s'
                  }}
                >
                  <span>{section.title}</span>
                  <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>
                    {section.readTime} min
                  </span>
                </a>
              ))}
            </nav>
          </div>
        )}

        {/* Main Content */}
        <article style={{ 
          maxWidth: '720px', 
          margin: '0 auto', 
          padding: '4rem 2rem 6rem'
        }}>
          {/* Essay Header */}
          <header style={{ marginBottom: '4rem' }}>
            <h1 style={{ 
              fontSize: fontSizes[fontSize].heading,
              fontWeight: 300,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: '2rem'
            }}>
              {essayData.title}
            </h1>

            <div style={{ 
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              fontSize: '0.875rem',
              color: currentTheme.muted,
              paddingBottom: '2rem',
              borderBottom: `1px solid ${currentTheme.border}`
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={14} />
                {essayData.authors.join(', ')}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Building size={14} />
                {essayData.institution}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={14} />
                {essayData.publishDate}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={14} />
                {essayData.readTime} min read
              </span>
            </div>
          </header>

          {/* Abstract */}
          <section style={{ 
            marginBottom: '3rem',
            padding: '2rem',
            background: theme === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
            borderLeft: `3px solid #6366f1`,
            borderRadius: '0 8px 8px 0'
          }}>
            <h2 style={{ 
              fontSize: '0.875rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#6366f1',
              marginBottom: '1rem'
            }}>
              Abstract
            </h2>
            <p style={{ 
              fontSize: fontSizes[fontSize].body,
              lineHeight: fontSizes[fontSize].lineHeight,
              color: currentTheme.muted
            }}>
              {essayData.abstract}
            </p>
          </section>

          {/* Essay Content */}
          <div ref={contentRef} style={{ 
            fontSize: fontSizes[fontSize].body,
            lineHeight: fontSizes[fontSize].lineHeight,
            color: currentTheme.muted
          }}>
            {essayContent ? (
              <div 
                dangerouslySetInnerHTML={{ __html: essayContent }}
                style={{
                  fontSize: fontSizes[fontSize].body,
                  lineHeight: fontSizes[fontSize].lineHeight,
                  color: currentTheme.muted
                }}
              />
            ) : (
              <>
                <section id="introduction" style={{ marginBottom: '3rem', scrollMarginTop: '80px' }}>
                  <h2 style={{ 
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    marginBottom: '1.5rem',
                    color: currentTheme.text
                  }}>
                    Introduction
                  </h2>
                  <p style={{ marginBottom: '1.5rem' }}>
                    The global energy landscape is undergoing a transformation unprecedented in both scale and speed. 
                    As nations race to decarbonize their economies, the traditional geopolitical order—built on fossil 
                    fuel dependencies—is being fundamentally challenged. This shift toward renewable energy is not merely 
                    a technological transition; it represents a profound reorganization of global power structures.
                  </p>
                  <p style={{ marginBottom: '1.5rem' }}>
                    For decades, oil and natural gas have served as the primary currencies of international influence. 
                    Nations blessed with abundant fossil fuel reserves leveraged these resources to project power, 
                    forge alliances, and shape global affairs. However, the renewable energy revolution is disrupting 
                    these established patterns, creating new winners and losers in the international system.
                  </p>
                </section>

                <section id="historical-context" style={{ marginBottom: '3rem', scrollMarginTop: '80px' }}>
                  <h2 style={{ 
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    marginBottom: '1.5rem',
                    color: currentTheme.text
                  }}>
                    Historical Context
                  </h2>
                  <p style={{ marginBottom: '1.5rem' }}>
                    To understand the magnitude of the current transition, we must first examine how fossil fuels 
                    shaped the 20th century&apos;s geopolitical landscape. The discovery of oil in the Middle East 
                    transformed desert kingdoms into global powers, while natural gas pipelines became tools of 
                    political leverage across Europe and Asia.
                  </p>
                  
                  <blockquote style={{
                    marginLeft: 0,
                    paddingLeft: '2rem',
                    borderLeft: `3px solid ${currentTheme.border}`,
                    fontStyle: 'italic',
                    margin: '2rem 0'
                  }}>
                    <p style={{ marginBottom: '1rem' }}>
                      &ldquo;Control oil and you control nations; control food and you control the people.&rdquo;
                    </p>
                    <cite style={{ 
                      display: 'block', 
                      fontSize: '0.875rem', 
                      color: currentTheme.muted,
                      fontStyle: 'normal'
                    }}>
                      — Henry Kissinger
                    </cite>
                  </blockquote>

                  <p style={{ marginBottom: '1.5rem' }}>
                    This paradigm, established in the post-World War II era, created a system where energy security 
                    became synonymous with national security. The oil crises of the 1970s demonstrated the vulnerability 
                    of industrialized nations to supply disruptions, leading to decades of foreign policy decisions 
                    aimed at securing stable access to fossil fuels.
                  </p>
                </section>

                <section id="current-landscape" style={{ marginBottom: '3rem', scrollMarginTop: '80px' }}>
                  <h2 style={{ 
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    marginBottom: '1.5rem',
                    color: currentTheme.text
                  }}>
                    Current Landscape
                  </h2>
                  <p style={{ marginBottom: '1.5rem' }}>
                    Today&apos;s energy transition is characterized by several key factors that distinguish it from 
                    previous shifts in the global energy system. Unlike fossil fuels, which are geographically 
                    concentrated, renewable energy resources are more evenly distributed across the globe. 
                    This democratization of energy access has profound implications for international relations.
                  </p>
                  
                  <h3 style={{ 
                    fontSize: '1.125rem',
                    fontWeight: 500,
                    marginBottom: '1rem',
                    color: currentTheme.text
                  }}>
                    The Technology Factor
                  </h3>
                  <p style={{ marginBottom: '1.5rem' }}>
                    The rapid advancement of renewable energy technologies has fundamentally changed the economics 
                    of energy production. Solar and wind power are now cost-competitive with fossil fuels in many 
                    regions, making the transition not just environmentally necessary but economically attractive.
                  </p>
                </section>

                <section id="emerging-dynamics" style={{ marginBottom: '3rem', scrollMarginTop: '80px' }}>
                  <h2 style={{ 
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    marginBottom: '1.5rem',
                    color: currentTheme.text
                  }}>
                    Emerging Power Dynamics
                  </h2>
                  <p style={{ marginBottom: '1.5rem' }}>
                    The shift toward renewable energy is creating new geopolitical dynamics that challenge traditional 
                    power structures. Nations that were once energy-dependent are now becoming energy-independent, 
                    while new energy powers are emerging based on their control of renewable technology and resources.
                  </p>
                </section>

                <section id="case-studies" style={{ marginBottom: '3rem', scrollMarginTop: '80px' }}>
                  <h2 style={{ 
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    marginBottom: '1.5rem',
                    color: currentTheme.text
                  }}>
                    Case Studies
                  </h2>
                  <p style={{ marginBottom: '1.5rem' }}>
                    Several nations provide compelling examples of how renewable energy is reshaping geopolitical 
                    relationships. China&apos;s dominance in solar panel manufacturing, Germany&apos;s Energiewende 
                    policy, and Denmark&apos;s wind energy leadership all demonstrate different approaches to the 
                    renewable energy transition.
                  </p>
                </section>

                <section id="conclusion" style={{ marginBottom: '3rem', scrollMarginTop: '80px' }}>
                  <h2 style={{ 
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    marginBottom: '1.5rem',
                    color: currentTheme.text
                  }}>
                    Conclusion
                  </h2>
                  <p style={{ marginBottom: '1.5rem' }}>
                    The geopolitics of renewable energy represents both an opportunity and a challenge for the 
                    international community. While the transition offers the promise of a more equitable distribution 
                    of energy resources, it also introduces new vulnerabilities and dependencies that must be carefully 
                    managed.
                  </p>
                  <p>
                    As we move forward, policymakers must recognize that the renewable energy transition is not just 
                    about replacing one energy source with another—it is about reimagining the fundamental structures 
                    of global power and cooperation. The nations that successfully navigate this transition will shape 
                    the geopolitical landscape of the 21st century.
                  </p>
                </section>
              </>
            )}
          </div>

          {/* Author Bio */}
          <section style={{ 
            marginTop: '4rem',
            paddingTop: '3rem',
            borderTop: `1px solid ${currentTheme.border}`
          }}>
            <h3 style={{ 
              fontSize: '0.875rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#6366f1',
              marginBottom: '2rem'
            }}>
              About the Authors
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h4 style={{ fontWeight: 500, marginBottom: '0.5rem' }}>Dr. Sarah Chen</h4>
                <p style={{ fontSize: '0.875rem', color: currentTheme.muted, lineHeight: 1.6 }}>
                  Director of Energy Policy Research at MIT Energy Initiative. Dr. Chen specializes in the 
                  intersection of renewable energy technology and international relations, with a focus on 
                  Asia-Pacific energy markets.
                </p>
              </div>
              <div>
                <h4 style={{ fontWeight: 500, marginBottom: '0.5rem' }}>Prof. Michael Torres</h4>
                <p style={{ fontSize: '0.875rem', color: currentTheme.muted, lineHeight: 1.6 }}>
                  Professor of International Relations at MIT. His research examines how technological 
                  transitions reshape global power structures, with particular attention to energy geopolitics.
                </p>
              </div>
            </div>
          </section>

          {/* Related Essays */}
          <section style={{ 
            marginTop: '4rem',
            paddingTop: '3rem',
            borderTop: `1px solid ${currentTheme.border}`
          }}>
            <h3 style={{ 
              fontSize: '1.25rem',
              fontWeight: 400,
              marginBottom: '2rem'
            }}>
              Related Essays
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { title: "Critical Minerals and the New Resource Competition", author: "Dr. Lisa Park", readTime: 25 },
                { title: "Energy Storage: The Missing Link in Renewable Geopolitics", author: "Prof. James Liu", readTime: 30 },
                { title: "Digital Infrastructure and Energy Sovereignty", author: "Dr. Maria Petrova", readTime: 20 }
              ].map((related, index) => (
                <a
                  key={index}
                  href="#"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    background: theme === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: currentTheme.text,
                    transition: 'all 0.2s'
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                      {related.title}
                    </h4>
                    <p style={{ fontSize: '0.813rem', color: currentTheme.muted }}>
                      {related.author} · {related.readTime} min read
                    </p>
                  </div>
                  <ChevronRight size={18} style={{ color: currentTheme.muted }} />
                </a>
              ))}
            </div>
          </section>
        </article>

        {/* Back to Top Button */}
        {scrollProgress > 20 && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              width: '48px',
              height: '48px',
              background: '#6366f1',
              border: 'none',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 24px rgba(99, 102, 241, 0.3)',
              transition: 'transform 0.2s'
            }}
          >
            <ChevronUp size={20} color="white" />
          </button>
        )}
      </div>
    );
  }

  // Original template layout for non-essay reader mode
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0a0a0f',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      lineHeight: 1.6
    }}>
      <Navigation scrolled={scrolled} />
      
      <HeroSection 
        searchFocused={searchFocused}
        setSearchFocused={setSearchFocused}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        filters={displayFilters}
        pageTitle={pageTitle}
        pageSubtitle={pageSubtitle}
        pageDescription={pageDescription}
        searchPlaceholder={searchPlaceholder}
      />
      
      {featuredEssay && <FeaturedEssay featuredEssay={featuredEssay} />}
      
      {showFullContent && essayContent && (
        <section style={{ 
          padding: '4rem 0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
            <div 
              dangerouslySetInnerHTML={{ __html: essayContent }}
              style={{
                fontSize: '1.063rem',
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: 1.8,
                textAlign: 'justify'
              }}
            />
          </div>
        </section>
      )}
      
      {essays.length > 0 && (
        <EssaysList 
          essays={essays}
          hoveredCard={hoveredCard}
          setHoveredCard={setHoveredCard}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default EssayTemplate; 