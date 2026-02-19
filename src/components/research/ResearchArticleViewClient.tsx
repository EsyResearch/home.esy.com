'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Heart, TrendingUp, Clock, ArrowRight, Sparkles
} from 'lucide-react';
import NewsletterSignup from './NewsletterSignup';

interface ArticleViewClientProps {
  frontmatter: {
    title: string;
    subtitle?: string;
    author?: {
      name: string;
      role?: string;
      avatar?: string;
      bio?: string;
    };
    date?: string;
    readTime?: number;
    featuredImage?: string;
    tags?: string[];
    stats?: {
      views?: string;
      likes?: number;
      comments?: number;
      shares?: number;
    };
    updateDate?: string;
    featuredImageCaption?: string;
  };
  content: React.ReactNode;
  slug: string;
  type: 'experiment' | 'build' | 'research' | string;
}

const ArticleViewClient: React.FC<ArticleViewClientProps> = ({ 
  frontmatter, 
  content, 
  type 
}) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [darkMode] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [liked, setLiked] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      // Calculate reading progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };
    
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    handleResize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const themes = {
    dark: {
      bg: '#0a0a0f',
      elevated: '#16161f',
      text: '#ffffff',
      muted: 'rgba(255, 255, 255, 0.7)',
      subtle: 'rgba(255, 255, 255, 0.5)',
      faint: 'rgba(255, 255, 255, 0.3)',
      border: 'rgba(255, 255, 255, 0.05)',
      accent: '#8b5cf6'
    },
    light: {
      bg: '#fafbfc',
      elevated: '#ffffff',
      text: '#0f1419',
      muted: '#334155',
      subtle: '#64748b',
      faint: '#94a3b8',
      border: '#e2e8f0',
      accent: '#7c3aed'
    }
  };

  const currentTheme = darkMode ? themes.dark : themes.light;

  const article = {
    title: frontmatter.title,
    subtitle: frontmatter.subtitle || "A daily practice of sharing thoughts, experiments, and progress in AI",
    author: "Zev",
    authorRole: "Workflow Designer, Esy",
    date: frontmatter.date || "March 28, 2025",
    readTime: frontmatter.readTime || 8,
    category: type === 'experiment' ? 'Experiments' : 
              type === 'research' ? 'Research' : 
              type === 'build' ? 'Product' : 'Journal',
    views: frontmatter.stats?.views || "2.4k",
    likes: frontmatter.stats?.likes || 47,
    comments: frontmatter.stats?.comments || 12,
    publishedAt: frontmatter.date || "2025-03-28T10:00:00Z",
    tags: frontmatter.tags || ["AI", "Experiments", "Learning"],
    excerpt: frontmatter.subtitle || "Starting today, I'm committing to writing something every day about building Esy, learning AI/ML, and navigating the strange world of AI startups. Not polished essays—just raw thoughts, experiments, and whatever's on my mind."
  };

  const recommendedArticles = [
    {
      id: 2,
      title: "The AI winter that never came",
      author: "Zev",
      date: "March 26, 2025",
      readTime: 4,
      category: "Thoughts",
      excerpt: "Everyone keeps predicting an AI winter. But what if we're actually in permanent summer?",
      trending: true,
      similarity: 85
    },
    {
      id: 3,
      title: "Experiment: RAG vs fine-tuning for research tasks",
      author: "Zev", 
      date: "March 25, 2025",
      readTime: 7,
      category: "Experiments",
      excerpt: "I spent the weekend testing different approaches for making LLMs better at research.",
      similarity: 72
    },
    {
      id: 4,
      title: "Why I'm betting everything on writing tools",
      author: "Zev",
      date: "March 24, 2025", 
      readTime: 6,
      category: "Vision",
      excerpt: "Most people think AI will replace writing. I think it will make writing more important than ever.",
      similarity: 68
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
      {/* Reading Progress Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        zIndex: 100
      }}>
        <div style={{
          height: '100%',
          background: `linear-gradient(90deg, ${currentTheme.accent}, ${currentTheme.accent}CC)`,
          width: `${readingProgress}%`,
          transition: 'width 0.1s ease'
        }} />
      </div>

      {/* Back Button */}
      <div style={{
        position: 'fixed',
        top: isMobile ? '5rem' : '6rem',
        left: isMobile ? '1rem' : '2rem',
        zIndex: 50
      }}>
        <Link href="/research/" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          color: currentTheme.muted,
          textDecoration: 'none',
          fontSize: '0.875rem',
          fontWeight: 400,
          transition: 'color 0.2s ease',
          padding: '0.5rem 0.75rem',
          borderRadius: '6px',
          border: `1px solid ${currentTheme.border}`,
          background: `${currentTheme.elevated}CC`,
          backdropFilter: 'blur(20px)'
        }}>
          <ArrowLeft size={16} />
          {!isMobile && <span>Back</span>}
        </Link>
      </div>

      {/* Article Hero */}
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
          left: '10%',
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
          right: '15%',
          width: isMobile ? '150px' : '200px',
          height: isMobile ? '150px' : '200px',
          background: `radial-gradient(circle, ${currentTheme.accent}12 0%, transparent 70%)`,
          borderRadius: '50%',
          zIndex: -1,
          filter: isMobile ? 'blur(30px)' : 'blur(40px)'
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)`,
          backgroundSize: isMobile ? '20px 20px' : isTablet ? '22px 22px' : '24px 24px',
          opacity: 0.3,
          zIndex: -1
        }} />

        {/* Hero Scaffold Container */}
        <div style={{
          width: '100%',
          margin: '0',
          padding: '0',
          position: 'relative'
        }}>
          {/* Outer Scaffold Frame - Full width, no border radius */}
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
            {/* Side decorative elements */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '3px',
              height: isMobile ? '60px' : isTablet ? '80px' : '120px',
              background: `linear-gradient(to bottom, transparent 0%, ${currentTheme.accent} 50%, transparent 100%)`,
              borderRadius: '2px'
            }} />
            
            <div style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '3px',
              height: isMobile ? '60px' : isTablet ? '80px' : '120px',
              background: `linear-gradient(to bottom, transparent 0%, ${currentTheme.accent} 50%, transparent 100%)`,
              borderRadius: '2px'
            }} />

            {/* Top and bottom accent lines */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: isMobile ? '60px' : isTablet ? '80px' : '120px',
              height: '3px',
              background: `linear-gradient(to right, transparent 0%, ${currentTheme.accent} 50%, transparent 100%)`,
              borderRadius: '2px'
            }} />
            
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: isMobile ? '60px' : isTablet ? '80px' : '120px',
              height: '3px',
              background: `linear-gradient(to right, transparent 0%, ${currentTheme.accent} 50%, transparent 100%)`,
              borderRadius: '2px'
            }} />

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
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  maxWidth: '800px',
                  margin: '0 auto'
                }}>
                  {/* Category Badge */}
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
                    {article.category}
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
                      {article.date}
                    </span>
                    <span style={{ color: currentTheme.border }}>•</span>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: currentTheme.muted
                    }}>
                      <Clock size={isMobile ? 12 : 13} />
                      {article.readTime} min read
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
                      {article.title}
                    </h1>

                    <p style={{
                      fontSize: isMobile ? '1.0625rem' : isTablet ? '1.1875rem' : '1.375rem',
                      lineHeight: isMobile ? 1.4 : 1.5,
                      color: currentTheme.muted,
                      marginBottom: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
                      fontWeight: 400,
                      letterSpacing: isMobile ? '-0.01em' : '-0.015em'
                    }}>
                      {article.subtitle}
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
                          {article.author}
                        </div>
                        <div style={{
                          fontSize: isMobile ? '0.75rem' : '0.8125rem',
                          color: currentTheme.subtle
                        }}>
                          {article.authorRole}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}>
                      <button
                        onClick={() => setLiked(!liked)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 1rem',
                          background: liked ? `${currentTheme.accent}15` : 'transparent',
                          border: `1px solid ${liked ? currentTheme.accent : currentTheme.border}`,
                          borderRadius: '8px',
                          color: liked ? currentTheme.accent : currentTheme.muted,
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Heart size={16} fill={liked ? currentTheme.accent : 'none'} />
                        {article.likes + (liked ? 1 : 0)}
                      </button>


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Article Content */}
      <article style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: isMobile ? '3rem 1rem' : isTablet ? '4rem 2rem' : '6rem 4rem',
        position: 'relative'
      }}>

        {/* Article Body */}
        <div className="research-article-body">
          {content}
        </div>

        {/* Article Tags */}
        <div style={{
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: `1px solid ${currentTheme.border}`
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            alignItems: 'center'
          }}>
            <span style={{
              fontSize: '0.875rem',
              color: currentTheme.subtle,
              fontWeight: 500
            }}>
              Tags:
            </span>
            {article.tags.map(tag => (
              <Link
                key={tag}
                href={`/research/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                style={{
                  fontSize: '0.75rem',
                  color: currentTheme.accent,
                  textDecoration: 'none',
                  padding: '0.375rem 0.875rem',
                  background: `${currentTheme.accent}10`,
                  border: `1px solid ${currentTheme.accent}20`,
                  borderRadius: '16px',
                  transition: 'all 0.2s ease'
                }}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </article>

      {/* Newsletter Section */}
      <NewsletterSignup currentTheme={currentTheme} />

      {/* Recommended Articles */}
      <section style={{ 
        padding: isMobile ? '3rem 0 6rem' : '6rem 0 8rem'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: isMobile ? '0 1rem' : isTablet ? '0 2rem' : '0 4rem' 
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: isMobile ? '2rem' : '3rem'
          }}>
            <h2 style={{
              fontSize: isMobile ? '1.5rem' : '2rem',
              fontWeight: 300,
              lineHeight: 1.2,
              color: currentTheme.text,
              fontFamily: 'Literata, serif'
            }}>
              More like this
            </h2>
            <Link href="/research/" style={{
              fontSize: '0.875rem',
              color: currentTheme.accent,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 400
            }}>
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: isMobile ? '2rem' : '2.5rem'
          }}>
            {recommendedArticles.map(article => (
              <article
                key={article.id}
                style={{
                  padding: isMobile ? '1.5rem' : '2rem',
                  background: currentTheme.elevated,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = darkMode ? 'none' : '0 12px 40px rgba(15, 23, 42, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  flexWrap: 'wrap'
                }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 400,
                    color: currentTheme.accent,
                    padding: '0.25rem 0.75rem',
                    background: `${currentTheme.accent}10`,
                    borderRadius: '12px'
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
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    fontSize: '0.75rem',
                    color: currentTheme.faint,
                    background: currentTheme.bg,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    border: `1px solid ${currentTheme.border}`
                  }}>
                    {article.similarity}% match
                  </div>
                </div>

                <h3 style={{
                  fontSize: isMobile ? '1.125rem' : '1.25rem',
                  fontWeight: 300,
                  lineHeight: 1.4,
                  marginBottom: '1rem',
                  color: currentTheme.text,
                  fontFamily: 'Literata, serif'
                }}>
                  {article.title}
                </h3>

                <p style={{
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  color: currentTheme.subtle,
                  marginBottom: '1.5rem'
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
            ))}
          </div>
        </div>
      </section>


      </div>
  );
};

export default ArticleViewClient;