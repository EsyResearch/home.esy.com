'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, TrendingUp, Clock, 
  ArrowRight, ChevronRight,
  FileText, Code, Sparkles
} from 'lucide-react';
import { Theme } from '@/app/research/types';
import NewsletterSignup from './NewsletterSignup';

interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
  readTime: number;
  category: string;
  excerpt: string;
  trending?: boolean;
  new?: boolean;
}

interface HomePageClientProps {
  featuredArticle: {
    id: number;
    title: string;
    subtitle: string;
    author: string;
    authorRole: string;
    date: string;
    readTime: number;
    category: string;
    excerpt: string;
    slug: string;
  } | null;
  leadArticles: Article[];
  recentArticles: Article[];
  secondaryFeatures: Array<{ slug: string }>;
  feedPosts: Array<{ slug: string }>;
  currentTheme: Theme;
}

const HomePageClient: React.FC<HomePageClientProps> = ({
  featuredArticle,
  leadArticles,
  recentArticles,
  secondaryFeatures,
  feedPosts,
  currentTheme
}) => {
  const [hoveredArticle, setHoveredArticle] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Use the currentTheme from props instead of local themes



  // Use the featured article from props or create a default one
  const featuredArticleData = featuredArticle || {
    id: 1,
    title: "Building in public: Why I'm documenting everything",
    subtitle: "A daily practice of sharing thoughts, experiments, and progress in AI",
    author: "Zev Uhuru",
    authorRole: "Founder, Esy",
    date: "March 28, 2025",
    readTime: 5,
    category: "Journal",
    excerpt: "Raw thoughts, experiments, and progress in AI. My research notebook, made public.",
    slug: "building-in-public"
  };

  // Use the articles from props
  const leadArticlesData = leadArticles.length > 0 ? leadArticles : [
    {
      id: 2,
      title: "The AI winter that never came",
      author: "Zev Uhuru",
      date: "March 26, 2025",
      readTime: 4,
      category: "Thoughts",
      excerpt: "Everyone keeps predicting an AI winter. But what if we're actually in permanent summer? Some thoughts on why the hype cycle feels different this time.",
      trending: true
    },
    {
      id: 3,
      title: "Experiment: RAG vs fine-tuning for research tasks",
      author: "Zev Uhuru",
      date: "March 25, 2025",
      readTime: 7,
      category: "Experiments",
      excerpt: "I spent the weekend testing different approaches for making LLMs better at research. Here's what I learned (spoiler: it's complicated).",
      new: true
    },
    {
      id: 4,
      title: "Why I'm betting everything on writing tools",
      author: "Zev Uhuru",
      date: "March 24, 2025",
      readTime: 6,
      category: "Vision",
      excerpt: "Most people think AI will replace writing. I think it will make writing more important than ever. Here's why Esy exists."
    }
  ];

  const recentArticlesData = recentArticles.length > 0 ? recentArticles : [
    {
      id: 5,
      title: "Learning Transformers: Week 2 of my AI deep dive",
      author: "Zev Uhuru",
      date: "March 23, 2025",
      readTime: 5,
      category: "Learning",
      excerpt: "Attention is all you need, but understanding attention is harder than I thought. Notes from my second week studying transformer architecture."
    },
    {
      id: 6,
      title: "User interview insights: How researchers actually write",
      author: "Zev Uhuru",
      date: "March 22, 2025",
      readTime: 8,
      category: "Product",
      excerpt: "Spent Friday talking to 5 PhD students about their writing process. The gap between how we think people write and how they actually write is huge."
    },
    {
      id: 7,
      title: "Weekend project: Fine-tuning a model for citations",
      author: "Zev Uhuru",
      date: "March 21, 2025",
      readTime: 6,
      category: "Experiments",
      excerpt: "What happens when you train a small model specifically on academic citation formats? Mixed results, but some interesting discoveries."
    },
    {
      id: 8,
      title: "Why every startup should have a research practice",
      author: "Zev Uhuru",
      date: "March 20, 2025",
      readTime: 4,
      category: "Thoughts",
      excerpt: "Most startups avoid research because it feels academic. But having a systematic way to test assumptions might be the most practical thing you can do."
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: currentTheme.bg,
      color: currentTheme.text,
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      transition: 'background-color 0.2s ease, color 0.2s ease'
    }}>
      {/* Hero Feature */}
      <section style={{ 
        position: 'relative',
        paddingTop: isMobile ? '4.75rem' : isTablet ? '5.25rem' : '5.75rem', 
        paddingBottom: isMobile ? '3rem' : isTablet ? '6rem' : '8rem',
        overflow: 'hidden'
      }}>
        {/* Background Elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: `linear-gradient(180deg, ${currentTheme.elevated}40 0%, transparent 100%)`,
          zIndex: -2
        }} />
        
        <div style={{
          position: 'absolute',
          top: '20%',
          left: isMobile ? '5%' : '10%',
          width: isMobile ? '200px' : '300px',
          height: isMobile ? '200px' : '300px',
          background: `radial-gradient(circle, ${currentTheme.accent}08 0%, transparent 70%)`,
          borderRadius: '50%',
          zIndex: -1,
          filter: isMobile ? 'blur(40px)' : 'blur(60px)'
        }} />
        
        <div style={{
          position: 'absolute',
          top: '60%',
          right: isMobile ? '5%' : '15%',
          width: isMobile ? '120px' : '200px',
          height: isMobile ? '120px' : '200px',
          background: `radial-gradient(circle, ${currentTheme.accent}12 0%, transparent 70%)`,
          borderRadius: '50%',
          zIndex: -1,
          filter: isMobile ? 'blur(30px)' : 'blur(40px)'
        }} />

        {/* Subtle grid pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, ${currentTheme.border} 1px, transparent 0)`,
          backgroundSize: isMobile ? '16px 16px' : isTablet ? '20px 20px' : '24px 24px',
          opacity: isMobile ? 0.2 : 0.3,
          zIndex: -1
        }} />

        {/* Hero Scaffold Container */}
        <div style={{
          width: '100%',
          margin: '0',
          padding: '0',
          position: 'relative'
        }}>
          {/* Outer Scaffold Frame */}
          <div style={{
            position: 'relative',
            padding: isMobile ? '1.5rem' : isTablet ? '3rem' : '4rem',
            background: `${currentTheme.elevated}20`,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${currentTheme.border}`,
            borderLeft: 'none',
            borderRight: 'none',
            borderRadius: '0',
            overflow: 'hidden'
          }}>


            {/* Side decorative elements - Hide on very small screens */}
            {!isMobile && (
              <>
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '3px',
                  height: isTablet ? '80px' : '120px',
                  background: `linear-gradient(to bottom, transparent 0%, ${currentTheme.accent} 50%, transparent 100%)`,
                  borderRadius: '2px'
                }} />
                
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '3px',
                  height: isTablet ? '80px' : '120px',
                  background: `linear-gradient(to bottom, transparent 0%, ${currentTheme.accent} 50%, transparent 100%)`,
                  borderRadius: '2px'
                }} />

                {/* Top and bottom accent lines */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: isTablet ? '80px' : '120px',
                  height: '3px',
                  background: `linear-gradient(to right, transparent 0%, ${currentTheme.accent} 50%, transparent 100%)`,
                  borderRadius: '2px'
                }} />
                
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: isTablet ? '80px' : '120px',
                  height: '3px',
                  background: `linear-gradient(to right, transparent 0%, ${currentTheme.accent} 50%, transparent 100%)`,
                  borderRadius: '2px'
                }} />
              </>
            )}

            {/* Inner Content Container */}
            <div style={{
              position: 'relative',
              padding: isMobile ? '1rem' : isTablet ? '1.5rem' : '2rem',
              background: `${currentTheme.bg}60`,
              backdropFilter: 'blur(10px)',
              border: `1px solid ${currentTheme.border}50`,
              borderRadius: isMobile ? '8px' : '12px',
              boxShadow: `0 8px 32px ${currentTheme.bg}40`,
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
            {/* Article Content */}
            <article style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              maxWidth: '900px',
              margin: '0 auto'
            }}>
              {/* Feature Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: isMobile ? '0.5rem 1rem' : '0.5rem 1rem',
                background: `${currentTheme.accent}15`,
                border: `1px solid ${currentTheme.accent}30`,
                borderRadius: '20px',
                fontSize: isMobile ? '0.75rem' : '0.75rem',
                fontWeight: 400,
                color: currentTheme.accent,
                letterSpacing: '0.025em',
                marginBottom: isMobile ? '1.5rem' : '2rem'
              }}>
                <Sparkles size={isMobile ? 12 : 12} />
                Featured Entry
              </div>

              {/* Meta Information */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: isMobile ? '1rem' : '2rem',
                fontSize: isMobile ? '0.8125rem' : '0.8125rem',
                color: currentTheme.subtle,
                letterSpacing: '0.01em',
                                flexWrap: 'wrap',
                marginBottom: isMobile ? '1.5rem' : '2rem'
              }}>
                <span style={{ 
                  fontWeight: 400,
                  color: currentTheme.muted
                }}>
                  {featuredArticleData.date}
                </span>
                <span style={{ color: currentTheme.border }}>•</span>
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: currentTheme.muted
                }}>
                  <Clock size={isMobile ? 12 : 13} />
                  {featuredArticleData.readTime} min read
                </span>
              </div>

              {/* Main Content */}
              <div style={{
                marginBottom: isMobile ? '2rem' : isTablet ? '3rem' : '3.5rem'
              }}>
                <h1 style={{
                  fontSize: isMobile ? '2.25rem' : isTablet ? '4rem' : '5rem',
                  fontWeight: 300,
                  lineHeight: isMobile ? 1.2 : 1.1,
                  letterSpacing: isMobile ? '-0.02em' : '-0.03em',
                  marginBottom: isMobile ? '1rem' : isTablet ? '1.5rem' : '2rem',
                  fontFamily: 'Literata, serif',
                  color: currentTheme.text,
                  background: `linear-gradient(135deg, ${currentTheme.text} 0%, ${currentTheme.muted} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {featuredArticleData.title}
                </h1>

                <p style={{
                  fontSize: isMobile ? '1.0625rem' : isTablet ? '1.1875rem' : '1.375rem',
                  lineHeight: isMobile ? 1.4 : 1.5,
                  color: currentTheme.muted,
                  marginBottom: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
                  fontWeight: 400,
                  letterSpacing: isMobile ? '-0.01em' : '-0.015em'
                }}>
                  {featuredArticleData.subtitle}
                </p>
              </div>

              {/* Author and CTA Section */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: isMobile ? '1.5rem' : '2rem',
                borderTop: `1px solid ${currentTheme.border}`,
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '1.5rem' : '2rem'
              }}>
                {/* Author Section */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: isMobile ? '40px' : '42px',
                    height: isMobile ? '40px' : '42px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${currentTheme.accent} 0%, ${currentTheme.accent}CC 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isMobile ? '0.875rem' : '0.9375rem',
                    fontWeight: 500,
                    color: 'white',
                    boxShadow: `0 4px 12px ${currentTheme.accent}20`
                  }}>
                    Z
                  </div>
                  <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
                    <div style={{
                      fontSize: isMobile ? '0.875rem' : '0.9375rem',
                      fontWeight: 500,
                      color: currentTheme.text,
                      marginBottom: '0.125rem'
                    }}>
                      {featuredArticleData.author}
                    </div>
                    <div style={{
                      fontSize: isMobile ? '0.75rem' : '0.8125rem',
                      color: currentTheme.subtle
                    }}>
                      {featuredArticleData.authorRole}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <Link href={`/research/${featuredArticleData.slug}`} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: currentTheme.text,
                  textDecoration: 'none',
                  fontSize: isMobile ? '0.8125rem' : '0.875rem',
                  fontWeight: 400,
                  padding: isMobile ? '0.5rem 1rem' : isTablet ? '0.5rem 1rem' : '0.75rem 1.25rem',
                  background: 'transparent',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                  transform: 'translateY(0)',
                  cursor: 'pointer',
                  minHeight: '44px',
                  minWidth: isMobile ? '140px' : 'auto'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    const target = e.target as HTMLElement;
                    target.style.transform = 'translateY(-1px)';
                    target.style.background = currentTheme.elevated;
                    target.style.borderColor = currentTheme.accent;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    const target = e.target as HTMLElement;
                    target.style.transform = 'translateY(0)';
                    target.style.background = 'transparent';
                    target.style.borderColor = currentTheme.border;
                  }
                }}
                >
                  Read Article
                  <ArrowRight size={isMobile ? 14 : 16} />
                </Link>
              </div>
            </article>
            </div>
          </div>
        </div>

        {/* Bottom fade separator */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '100px',
          background: `linear-gradient(to bottom, transparent 0%, ${currentTheme.bg} 100%)`,
          zIndex: 1
        }} />
      </section>



      {/* Recent Articles Grid */}
      <section style={{ 
        padding: isMobile ? '2rem 0' : '4rem 0'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: isMobile ? '0 1.5rem' : '0 4rem' 
        }}>
          <h2 style={{
            fontSize: '0.875rem',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: currentTheme.subtle,
            marginBottom: isMobile ? '1.5rem' : '2rem',
            fontFamily: 'Inter'
          }}>
            Recent Entries
          </h2>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: isMobile ? '1.5rem' : '2rem',
            marginBottom: isMobile ? '2rem' : '4rem'
          }}>
            {leadArticlesData.map(article => (
              <Link
                key={article.id}
                href={`/research/${secondaryFeatures[leadArticlesData.indexOf(article)]?.slug || article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                style={{ textDecoration: 'none' }}
              >
              <article
                onMouseEnter={() => !isMobile && setHoveredArticle(article.id)}
                onMouseLeave={() => !isMobile && setHoveredArticle(null)}
                style={{
                  padding: isMobile ? '1.25rem' : '1.5rem',
                  background: currentTheme.elevated,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  transform: hoveredArticle === article.id && !isMobile ? 'translateY(-2px)' : 'translateY(0)'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: isMobile ? '1rem' : '1.5rem',
                  flexWrap: 'wrap'
                }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 400,
                    color: currentTheme.accent
                  }}>
                    {article.category}
                  </span>
                  {article.trending && (
                    <>
                      <span style={{ color: currentTheme.faint }}>•</span>
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        fontSize: '0.75rem',
                        color: '#f59e0b'
                      }}>
                        <TrendingUp size={12} />
                        Trending
                      </span>
                    </>
                  )}
                  {article.new && (
                    <>
                      <span style={{ color: currentTheme.faint }}>•</span>
                      <span style={{
                        fontSize: '0.75rem',
                        color: '#10b981'
                      }}>
                        New
                      </span>
                    </>
                  )}
                </div>

                <h3 style={{
                  fontSize: isMobile ? '1.125rem' : '1.25rem',
                  fontWeight: 300,
                  lineHeight: 1.4,
                  marginBottom: '1.5rem',
                  color: hoveredArticle === article.id && !isMobile ? currentTheme.text : currentTheme.muted,
                  transition: 'color 0.2s ease',
                  fontFamily: 'Literata, serif'
                }}>
                  {article.title}
                </h3>

                <p style={{
                  fontSize: '0.875rem',
                  lineHeight: 1.7,
                  color: currentTheme.subtle,
                  marginBottom: isMobile ? '1.5rem' : '2rem'
                }}>
                  {article.excerpt}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.75rem',
                  color: currentTheme.faint,
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span>{article.author}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem'
                  }}>
                    <Clock size={12} />
                    {article.readTime} min
                  </span>
                </div>
              </article>
              </Link>
            ))}
          </div>

          {/* Newsletter Subscription Section */}
          <NewsletterSignup currentTheme={currentTheme} />

          {/* Article List */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', 
            gap: isMobile ? '3rem' : '6rem'
          }}>
            <div>
              <h2 style={{
                fontSize: '0.875rem',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: currentTheme.subtle,
                marginBottom: isMobile ? '2rem' : '3rem'
              }}>
                More Entries
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {recentArticlesData.map((article, index) => (
                  <Link
                    key={article.id}
                    href={`/research/${feedPosts[recentArticlesData.indexOf(article)]?.slug || article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    style={{ textDecoration: 'none' }}
                  >
                  <article
                    onMouseEnter={() => !isMobile && setHoveredArticle(article.id)}
                    onMouseLeave={() => !isMobile && setHoveredArticle(article.id)}
                    style={{
                      padding: isMobile ? '2rem 1rem' : '3rem 2rem',
                      borderTop: index === 0 ? 'none' : `1px solid ${currentTheme.border}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      background: hoveredArticle === article.id && !isMobile ? currentTheme.elevated : 'transparent',
                      borderRadius: '8px',
                      margin: isMobile ? '0 -1rem' : '0 -2rem'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      gap: isMobile ? '1rem' : '2rem'
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          marginBottom: '1.5rem',
                          fontSize: '0.75rem',
                          color: currentTheme.subtle,
                          flexWrap: 'wrap'
                        }}>
                          <span style={{ 
                            color: currentTheme.accent,
                            padding: '0.25rem 0.75rem',
                            background: hoveredArticle === article.id && !isMobile ? `${currentTheme.accent}15` : 'transparent',
                            borderRadius: '12px',
                            transition: 'background 0.2s ease'
                          }}>
                            {article.category}
                          </span>
                          <span>•</span>
                          <span>{article.date}</span>
                          <span>•</span>
                          <span style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.375rem'
                          }}>
                            <Clock size={12} />
                            {article.readTime} min
                          </span>
                        </div>

                        <h3 style={{
                          fontSize: isMobile ? '1.125rem' : '1.25rem',
                          fontWeight: 300,
                          lineHeight: 1.4,
                          color: hoveredArticle === article.id && !isMobile ? currentTheme.text : currentTheme.muted,
                          transition: 'color 0.2s ease',
                          fontFamily: 'Literata, serif',
                          marginBottom: '1rem'
                        }}>
                          {article.title}
                        </h3>

                        {article.excerpt && (
                          <p style={{
                            fontSize: '0.875rem',
                            lineHeight: 1.6,
                            color: currentTheme.subtle,
                            marginBottom: '1rem'
                          }}>
                            {article.excerpt}
                          </p>
                        )}

                        <div style={{
                          fontSize: '0.75rem',
                          color: currentTheme.faint,
                          fontWeight: 400
                        }}>
                          by {article.author}
                        </div>
                      </div>

                      {!isMobile && (
                        <ChevronRight 
                          size={18} 
                          style={{ 
                            color: currentTheme.faint,
                            marginTop: '2rem',
                            opacity: hoveredArticle === article.id ? 1 : 0.3,
                            transform: hoveredArticle === article.id ? 'translateX(4px)' : 'translateX(0)',
                            transition: 'all 0.2s ease'
                          }} 
                        />
                      )}
                    </div>
                  </article>
                  </Link>
                ))}
              </div>

              <Link href="/research" style={{
                display: 'inline-block',
                marginTop: isMobile ? '2rem' : '4rem',
                color: currentTheme.text,
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 400,
                borderBottom: `1px solid ${currentTheme.border}`,
                paddingBottom: '0.25rem',
                transition: 'border-color 0.2s ease'
              }}>
                View All Entries
              </Link>
            </div>

            {/* Sidebar */}
            <aside>
              {/* About Section */}
              <div style={{ marginBottom: isMobile ? '3rem' : '6rem' }}>
                <h2 style={{
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: currentTheme.subtle,
                  marginBottom: isMobile ? '2rem' : '3rem'
                }}>
                  About This Journal
                </h2>

                <div style={{
                  padding: isMobile ? '1.5rem' : '2rem',
                  background: currentTheme.elevated,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '8px'
                }}>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: 300,
                    marginBottom: '1.5rem',
                    fontFamily: 'Literata, serif'
                  }}>
                    Daily Writing Practice
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.7,
                    color: currentTheme.subtle,
                    marginBottom: '2rem'
                  }}>
                    My commitment to writing something every day about building Esy, learning AI/ML, and navigating startup life. Raw thoughts, not polished essays.
                  </p>
                  
                  <h4 style={{
                    fontSize: '0.75rem',
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: currentTheme.accent,
                    marginBottom: '1rem'
                  }}>
                    What You&apos;ll Find
                  </h4>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '0.75rem',
                    fontSize: '0.75rem',
                    color: currentTheme.subtle
                  }}>
                    <span>• AI/ML experiments and learnings</span>
                    <span>• Product decisions and insights</span>
                    <span>• Industry observations</span>
                    <span>• Building in public updates</span>
                  </div>
                </div>
              </div>

              {/* Links to Other Properties */}
              <div style={{
                padding: isMobile ? '1.5rem' : '2rem',
                background: currentTheme.elevated,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '8px'
              }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 300,
                  marginBottom: '1.5rem',
                  fontFamily: 'Literata, serif'
                }}>
                  Deeper Dives
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  lineHeight: 1.7,
                  color: currentTheme.subtle,
                  marginBottom: '2rem'
                }}>
                  For more structured content, check out my other writing:
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <a href="https://eng.esy.com" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    background: currentTheme.bg,
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '6px',
                    color: currentTheme.text,
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'all 0.2s ease'
                  }}>
                    <div>
                      <div style={{ fontWeight: 400, marginBottom: '0.25rem' }}>Engineering Blog</div>
                      <div style={{ fontSize: '0.75rem', color: currentTheme.subtle }}>Deep technical write-ups</div>
                    </div>
                    <Code size={16} style={{ color: currentTheme.subtle }} />
                  </a>
                  
                  <a href="https://esy.com/essays" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    background: currentTheme.bg,
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '6px',
                    color: currentTheme.text,
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'all 0.2s ease'
                  }}>
                    <div>
                      <div style={{ fontWeight: 400, marginBottom: '0.25rem' }}>Essays</div>
                      <div style={{ fontSize: '0.75rem', color: currentTheme.subtle }}>Polished long-form pieces</div>
                    </div>
                    <FileText size={16} style={{ color: currentTheme.subtle }} />
                  </a>
                  
                  <a href="https://esy.com/school" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    background: currentTheme.bg,
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '6px',
                    color: currentTheme.text,
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'all 0.2s ease'
                  }}>
                    <div>
                      <div style={{ fontWeight: 400, marginBottom: '0.25rem' }}>School</div>
                      <div style={{ fontSize: '0.75rem', color: currentTheme.subtle }}>Structured tutorials</div>
                    </div>
                    <BookOpen size={16} style={{ color: currentTheme.subtle }} />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Footer handled by Layout component */}
    </div>
  );
};

export default HomePageClient;