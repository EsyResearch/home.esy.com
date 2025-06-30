import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Clock, Calendar, ArrowRight, Code, 
  Image, Video, FileText, Play, Share2, Eye,
  Beaker, Wrench, Brain, TrendingUp, Star,
  MessageSquare, GitBranch, Zap, Search, X,
  ChevronRight, Bookmark, ThumbsUp, RefreshCw,
  Hash, Sparkles, Book
} from 'lucide-react';

const EsyJournalModernEditorial = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showShareMenu, setShowShareMenu] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const currentTheme = {
    bg: '#0a0a0f',
    elevated: '#16161f',
    text: '#ffffff',
    muted: 'rgba(255, 255, 255, 0.7)',
    subtle: 'rgba(255, 255, 255, 0.5)',
    faint: 'rgba(255, 255, 255, 0.3)',
    border: 'rgba(255, 255, 255, 0.05)',
    accent: '#6366f1'
  };

  // Featured post
  const featuredPost = {
    id: 1,
    type: 'experiment',
    title: 'Creating Impossible Architecture with AI',
    subtitle: 'Exploring the boundaries between physical constraints and digital imagination',
    excerpt: 'What happens when you ask AI to design buildings that defy physics? I spent a week generating architectural concepts that could never exist in reality, revealing fascinating biases in how models understand space and structure.',
    author: 'Your Name',
    date: 'March 28, 2025',
    readTime: 12,
    image: '/api/placeholder/840/472',
    tags: ['dall-e-3', 'architecture', 'experiments'],
    stats: { views: '3.2k', likes: 89, comments: 23 },
    relatedTerms: ['embeddings', 'latent-space', 'diffusion-models']
  };

  // Secondary features
  const secondaryFeatures = [
    {
      id: 2,
      type: 'build',
      title: 'Shipping Semantic Search',
      excerpt: 'How I implemented vector search in Esy using embeddings and learned about the challenges of semantic similarity.',
      date: 'March 26, 2025',
      readTime: 8,
      image: '/api/placeholder/400/225',
      stats: { views: '1.8k', likes: 45 },
      glossaryHighlight: 'embeddings'
    },
    {
      id: 3,
      type: 'research',
      title: 'Emergent Tool Use in GPT-4',
      excerpt: 'Systematic analysis of how language models spontaneously learn to use external tools with minimal prompting.',
      date: 'March 24, 2025',
      readTime: 18,
      image: '/api/placeholder/400/225',
      stats: { views: '2.1k', likes: 67 },
      glossaryHighlight: 'chain-of-thought'
    },
    {
      id: 4,
      type: 'experiment',
      title: 'Real-time Video Generation Tests',
      excerpt: 'First attempts at generating coherent video loops using Runway Gen-2. The results are... interesting.',
      date: 'March 22, 2025',
      readTime: 6,
      image: '/api/placeholder/400/225',
      mediaType: 'video',
      stats: { views: '4.5k', likes: 112 }
    }
  ];

  // Term of the Day
  const termOfDay = {
    term: 'Cosine Similarity',
    definition: 'A measure of similarity between two vectors that calculates the cosine of the angle between them.',
    category: 'ml',
    personalNote: 'Think of it as measuring how much two arrows point in the same direction, regardless of their length.',
    views: 234,
    isNew: true
  };

  // Recent glossary additions
  const recentTerms = [
    { term: 'RLHF', category: 'ml', views: 156 },
    { term: 'API Rate Limiting', category: 'tech', views: 89 },
    { term: 'Thesis Statement', category: 'writing', views: 203 },
    { term: 'Vector Database', category: 'ml', views: 412 }
  ];

  // Main feed posts
  const feedPosts = [
    {
      id: 5,
      type: 'build',
      title: 'Why I Chose Boring Technology for Esy',
      excerpt: 'Sometimes the best technical decision is the boring one. Here\'s why I picked React and PostgreSQL over the shiny new alternatives.',
      date: 'March 20, 2025',
      readTime: 10,
      image: '/api/placeholder/200/150',
      stats: { views: '980', likes: 34 }
    },
    {
      id: 6,
      type: 'experiment',
      title: 'Training a LoRA on My Writing Style',
      excerpt: 'I fine-tuned Llama 2 on three years of my blog posts. The results were uncomfortably accurate.',
      date: 'March 18, 2025',
      readTime: 15,
      image: '/api/placeholder/200/150',
      stats: { views: '2.3k', likes: 78 }
    },
    {
      id: 7,
      type: 'research',
      title: 'Benchmarking Chain-of-Thought Prompting',
      excerpt: 'Comprehensive analysis of CoT effectiveness across different model sizes and task types.',
      date: 'March 16, 2025',
      readTime: 22,
      image: '/api/placeholder/200/150',
      stats: { views: '1.4k', likes: 56 }
    },
    {
      id: 8,
      type: 'experiment',
      title: 'AI-Generated Music: First Attempts',
      excerpt: 'Using MusicGen to create ambient soundscapes. Some are hauntingly beautiful, others are just haunting.',
      date: 'March 14, 2025',
      readTime: 8,
      image: '/api/placeholder/200/150',
      mediaType: 'audio',
      stats: { views: '3.1k', likes: 92 }
    }
  ];

  // Popular posts
  const popularPosts = [
    { title: 'Building a Personal AI Assistant', views: '12.3k', trend: '+23%' },
    { title: 'The Hidden Costs of RAG Systems', views: '8.7k', trend: '+15%' },
    { title: 'Prompt Engineering: A Visual Guide', views: '7.2k', trend: '+41%' },
    { title: 'Why Your LLM Needs a Memory', views: '6.1k', trend: '+8%' }
  ];

  // Quick experiments
  const quickExperiments = [
    { id: 1, image: '/api/placeholder/150/150', title: 'Glitch portraits' },
    { id: 2, image: '/api/placeholder/150/150', title: 'Abstract landscapes' },
    { id: 3, image: '/api/placeholder/150/150', title: 'Code visualization' },
    { id: 4, image: '/api/placeholder/150/150', title: 'Data sculptures' },
    { id: 5, image: '/api/placeholder/150/150', title: 'Neural dreams' },
    { id: 6, image: '/api/placeholder/150/150', title: 'Typography play' }
  ];

  const getTypeIcon = (type) => {
    switch(type) {
      case 'experiment': return <Beaker size={14} />;
      case 'build': return <Wrench size={14} />;
      case 'research': return <Brain size={14} />;
      default: return <FileText size={14} />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'experiment': return '#10b981';
      case 'build': return currentTheme.accent;
      case 'research': return '#f59e0b';
      default: return currentTheme.subtle;
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'ml': return '#f59e0b';
      case 'tech': return '#6366f1';
      case 'writing': return '#10b981';
      default: return currentTheme.subtle;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: currentTheme.bg,
      color: currentTheme.text,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: scrolled ? 'rgba(10, 10, 15, 0.95)' : 'rgba(10, 10, 15, 0)',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? `1px solid ${currentTheme.border}` : '1px solid transparent',
        transition: 'all 0.3s ease'
      }}>
                  <div style={{ maxWidth: '1400px', margin: '0 auto', padding: windowWidth < 640 ? '1rem' : '1rem 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'white' }}>
              <div style={{ 
                width: '36px', 
                height: '36px', 
                background: currentTheme.accent, 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <BookOpen size={18} color="white" />
              </div>
              <div>
                <span style={{ fontSize: '1.125rem', fontWeight: 600, letterSpacing: '-0.02em' }}>
                  Esy Journal
                </span>
                <span style={{ 
                  display: windowWidth < 640 ? 'none' : 'block', 
                  fontSize: '0.75rem', 
                  color: currentTheme.subtle,
                  marginTop: '-0.125rem'
                }}>
                  Experimenting with Large Language Models
                </span>
              </div>
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: windowWidth < 768 ? '1rem' : '2rem' }}>
              {/* Filter Pills */}
              <div style={{ 
                display: windowWidth < 640 ? 'none' : 'flex', 
                gap: '0.5rem' 
              }}>
                {['all', 'experiments', 'building', 'research'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    style={{
                      padding: '0.375rem 0.875rem',
                      background: activeFilter === filter ? currentTheme.accent : 'transparent',
                      border: `1px solid ${activeFilter === filter ? currentTheme.accent : currentTheme.border}`,
                      borderRadius: '20px',
                      color: activeFilter === filter ? 'white' : currentTheme.subtle,
                      fontSize: '0.813rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>

              <button style={{
                padding: '0.5rem',
                background: 'transparent',
                border: 'none',
                color: currentTheme.subtle,
                cursor: 'pointer'
              }}>
                <Search size={18} />
              </button>

              <a
                href="/glossary"
                style={{
                  display: windowWidth < 640 ? 'none' : 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: 'transparent',
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '6px',
                  color: currentTheme.subtle,
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
              >
                <Book size={16} />
                <span style={{ display: windowWidth < 768 ? 'none' : 'inline' }}>Glossary</span>
              </a>

              <button style={{
                padding: '0.5rem 1.25rem',
                background: currentTheme.accent,
                border: 'none',
                borderRadius: '6px',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}>
                <span style={{ display: windowWidth < 480 ? 'none' : 'inline' }}>Subscribe</span>
                <span style={{ display: windowWidth >= 480 ? 'none' : 'inline' }}>Join</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ paddingTop: '6rem', marginBottom: '4rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: windowWidth < 768 ? '1fr' : '1fr 380px', 
            gap: '3rem', 
            alignItems: 'start' 
          }}>
            {/* Featured Post */}
            <article style={{
              position: 'relative',
              cursor: 'pointer'
            }}>
              <div style={{
                position: 'relative',
                marginBottom: '2rem',
                borderRadius: '12px',
                overflow: 'hidden',
                aspectRatio: '16/9',
                background: currentTheme.elevated
              }}>
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '1.5rem',
                  left: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: 'rgba(0, 0, 0, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '6px',
                  fontSize: '0.813rem'
                }}>
                  {getTypeIcon(featuredPost.type)}
                  <span style={{ color: getTypeColor(featuredPost.type) }}>
                    Featured {featuredPost.type}
                  </span>
                </div>
              </div>

              <div>
                <h1 style={{
                  fontSize: windowWidth < 640 ? '2rem' : '2.5rem',
                  fontWeight: 300,
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  marginBottom: '1rem'
                }}>
                  {featuredPost.title}
                </h1>

                <p style={{
                  fontSize: windowWidth < 640 ? '1.125rem' : '1.25rem',
                  lineHeight: 1.6,
                  color: currentTheme.muted,
                  marginBottom: '1.5rem'
                }}>
                  {featuredPost.subtitle}
                </p>

                <p style={{
                  fontSize: '1.063rem',
                  lineHeight: 1.8,
                  color: currentTheme.subtle,
                  marginBottom: '2rem'
                }}>
                  {featuredPost.excerpt}
                </p>

                {/* Related Terms */}
                {featuredPost.relatedTerms && (
                  <div style={{
                    marginBottom: '2rem',
                    padding: '1rem',
                    background: currentTheme.elevated,
                    borderRadius: '8px'
                  }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: currentTheme.subtle,
                      marginRight: '0.75rem'
                    }}>
                      Key Terms:
                    </span>
                    {featuredPost.relatedTerms.map((term, i) => (
                      <a
                        key={term}
                        href={`/glossary/${term}`}
                        style={{
                          display: 'inline-block',
                          padding: '0.25rem 0.625rem',
                          marginRight: '0.5rem',
                          background: currentTheme.bg,
                          borderRadius: '12px',
                          color: currentTheme.accent,
                          fontSize: '0.813rem',
                          textDecoration: 'none',
                          transition: 'all 0.2s'
                        }}
                      >
                        {term}
                      </a>
                    ))}
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: windowWidth < 640 ? '1rem' : '2rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2rem',
                    fontSize: '0.875rem',
                    color: currentTheme.subtle
                  }}>
                    <span>{featuredPost.author}</span>
                    <span>{featuredPost.date}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <Clock size={14} />
                      {featuredPost.readTime} min
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    fontSize: '0.813rem'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: currentTheme.subtle }}>
                      <Eye size={14} />
                      {featuredPost.stats.views}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: currentTheme.subtle }}>
                      <ThumbsUp size={14} />
                      {featuredPost.stats.likes}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: currentTheme.subtle }}>
                      <MessageSquare size={14} />
                      {featuredPost.stats.comments}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowShareMenu(showShareMenu === featuredPost.id ? null : featuredPost.id);
                      }}
                      style={{
                        padding: '0.375rem',
                        background: 'transparent',
                        border: 'none',
                        color: currentTheme.subtle,
                        cursor: 'pointer'
                      }}
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar - Hidden on mobile, shows after main content */}
            {windowWidth >= 768 && (
              <aside>
                {/* Term of the Day */}
                <div style={{
                  padding: '1.5rem',
                  background: currentTheme.elevated,
                  border: `1px solid ${currentTheme.accent}`,
                  borderRadius: '12px',
                  marginBottom: '2rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {termOfDay.isNew && (
                    <span style={{
                      position: 'absolute',
                      top: '0.75rem',
                      right: '0.75rem',
                      padding: '0.25rem 0.5rem',
                      background: currentTheme.accent,
                      borderRadius: '4px',
                      fontSize: '0.625rem',
                      fontWeight: 600,
                      textTransform: 'uppercase'
                    }}>
                      New
                    </span>
                  )}
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <Sparkles size={18} style={{ color: currentTheme.accent }} />
                    <h3 style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: currentTheme.subtle
                    }}>
                      Term of the Day
                    </h3>
                  </div>

                  <a
                    href={`/glossary/${termOfDay.term.toLowerCase().replace(/\s+/g, '-')}`}
                    style={{
                      textDecoration: 'none',
                      color: currentTheme.text
                    }}
                  >
                    <h4 style={{
                      fontSize: '1.25rem',
                      fontWeight: 400,
                      marginBottom: '0.5rem',
                      color: currentTheme.text
                    }}>
                      {termOfDay.term}
                    </h4>
                  </a>

                  <p style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    color: currentTheme.muted,
                    marginBottom: '1rem'
                  }}>
                    {termOfDay.definition}
                  </p>

                  <div style={{
                    padding: '0.75rem',
                    background: currentTheme.bg,
                    borderRadius: '8px',
                    fontSize: '0.813rem',
                    lineHeight: 1.5,
                    color: currentTheme.subtle,
                    fontStyle: 'italic'
                  }}>
                    💭 {termOfDay.personalNote}
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '1rem',
                    paddingTop: '1rem',
                    borderTop: `1px solid ${currentTheme.border}`,
                    fontSize: '0.813rem'
                  }}>
                    <span style={{ color: getCategoryColor(termOfDay.category), fontWeight: 500 }}>
                      {termOfDay.category.toUpperCase()}
                    </span>
                    <a
                      href={`/glossary/${termOfDay.term.toLowerCase().replace(/\s+/g, '-')}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        color: currentTheme.accent,
                        textDecoration: 'none',
                        fontSize: '0.813rem'
                      }}
                    >
                      Learn more
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>

                {/* Recent Glossary Terms */}
                <div style={{
                  padding: '1.5rem',
                  background: currentTheme.elevated,
                  borderRadius: '12px',
                  marginBottom: '2rem'
                }}>
                  <h3 style={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Hash size={16} style={{ color: currentTheme.accent }} />
                    Recent Terms
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {recentTerms.map((term, i) => (
                      <a
                        key={i}
                        href={`/glossary/${term.term.toLowerCase().replace(/\s+/g, '-')}`}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0.5rem 0',
                          borderBottom: i < recentTerms.length - 1 ? `1px solid ${currentTheme.border}` : 'none',
                          textDecoration: 'none',
                          color: currentTheme.text,
                          fontSize: '0.875rem',
                          transition: 'all 0.2s'
                        }}
                      >
                        <span style={{ flex: 1 }}>{term.term}</span>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem'
                        }}>
                          <span style={{
                            fontSize: '0.75rem',
                            color: getCategoryColor(term.category),
                            fontWeight: 500
                          }}>
                            {term.category}
                          </span>
                          <ChevronRight size={14} style={{ color: currentTheme.faint }} />
                        </div>
                      </a>
                    ))}
                  </div>
                  <a
                    href="/glossary"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      marginTop: '1rem',
                      padding: '0.625rem',
                      background: currentTheme.bg,
                      borderRadius: '6px',
                      color: currentTheme.accent,
                      textDecoration: 'none',
                      fontSize: '0.813rem',
                      fontWeight: 500,
                      transition: 'all 0.2s'
                    }}
                  >
                    Browse all terms
                    <ArrowRight size={14} />
                  </a>
                </div>

                {/* Currently Building Widget */}
                <div style={{
                  padding: '1.5rem',
                  background: currentTheme.elevated,
                  borderRadius: '12px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem'
                  }}>
                    <h3 style={{
                      fontSize: '1rem',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <Zap size={18} style={{ color: currentTheme.accent }} />
                      Currently Building
                    </h3>
                    <RefreshCw size={14} style={{ color: currentTheme.accent }} />
                  </div>

                  <div style={{
                    padding: '1rem',
                    background: currentTheme.bg,
                    borderRadius: '8px',
                    marginBottom: '1rem'
                  }}>
                    <h4 style={{
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      marginBottom: '0.5rem'
                    }}>
                      Collaborative Essay Editing
                    </h4>
                    <p style={{
                      fontSize: '0.813rem',
                      color: currentTheme.subtle,
                      marginBottom: '0.75rem',
                      lineHeight: 1.5
                    }}>
                      Adding real-time collaboration features to Esy. Think Google Docs meets academic publishing.
                    </p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.75rem'
                    }}>
                      <span style={{ color: currentTheme.faint }}>Progress</span>
                      <span style={{ color: currentTheme.accent }}>67%</span>
                    </div>
                    <div style={{
                      height: '4px',
                      background: currentTheme.border,
                      borderRadius: '2px',
                      marginTop: '0.5rem',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: '67%',
                        background: currentTheme.accent,
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>

                  <button style={{
                    width: '100%',
                    padding: '0.5rem',
                    background: 'transparent',
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '6px',
                    color: currentTheme.text,
                    fontSize: '0.813rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}>
                    View build log
                    <ArrowRight size={14} />
                  </button>
                </div>
              </aside>
            )}
          </div>

          {/* Mobile Sidebar Content - Shows below main content on mobile */}
          {windowWidth < 768 && (
            <div style={{ marginTop: '3rem' }}>
              {/* Term of the Day */}
              <div style={{
                padding: '1.5rem',
                background: currentTheme.elevated,
                border: `1px solid ${currentTheme.accent}`,
                borderRadius: '12px',
                marginBottom: '2rem',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {termOfDay.isNew && (
                  <span style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    padding: '0.25rem 0.5rem',
                    background: currentTheme.accent,
                    borderRadius: '4px',
                    fontSize: '0.625rem',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}>
                    New
                  </span>
                )}
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <Sparkles size={18} style={{ color: currentTheme.accent }} />
                  <h3 style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: currentTheme.subtle
                  }}>
                    Term of the Day
                  </h3>
                </div>

                <a
                  href={`/glossary/${termOfDay.term.toLowerCase().replace(/\s+/g, '-')}`}
                  style={{
                    textDecoration: 'none',
                    color: currentTheme.text
                  }}
                >
                  <h4 style={{
                    fontSize: '1.25rem',
                    fontWeight: 400,
                    marginBottom: '0.5rem',
                    color: currentTheme.text
                  }}>
                    {termOfDay.term}
                  </h4>
                </a>

                <p style={{
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  color: currentTheme.muted,
                  marginBottom: '1rem'
                }}>
                  {termOfDay.definition}
                </p>

                <div style={{
                  padding: '0.75rem',
                  background: currentTheme.bg,
                  borderRadius: '8px',
                  fontSize: '0.813rem',
                  lineHeight: 1.5,
                  color: currentTheme.subtle,
                  fontStyle: 'italic'
                }}>
                  💭 {termOfDay.personalNote}
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '1rem',
                  paddingTop: '1rem',
                  borderTop: `1px solid ${currentTheme.border}`,
                  fontSize: '0.813rem'
                }}>
                  <span style={{ color: getCategoryColor(termOfDay.category), fontWeight: 500 }}>
                    {termOfDay.category.toUpperCase()}
                  </span>
                  <a
                    href={`/glossary/${termOfDay.term.toLowerCase().replace(/\s+/g, '-')}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      color: currentTheme.accent,
                      textDecoration: 'none',
                      fontSize: '0.813rem'
                    }}
                  >
                    Learn more
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              {/* Currently Building Widget */}
              <div style={{
                padding: '1.5rem',
                background: currentTheme.elevated,
                borderRadius: '12px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Zap size={18} style={{ color: currentTheme.accent }} />
                    Currently Building
                  </h3>
                  <RefreshCw size={14} style={{ color: currentTheme.accent }} />
                </div>

                <div style={{
                  padding: '1rem',
                  background: currentTheme.bg,
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}>
                  <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    marginBottom: '0.5rem'
                  }}>
                    Collaborative Essay Editing
                  </h4>
                  <p style={{
                    fontSize: '0.813rem',
                    color: currentTheme.subtle,
                    marginBottom: '0.75rem',
                    lineHeight: 1.5
                  }}>
                    Adding real-time collaboration features to Esy. Think Google Docs meets academic publishing.
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.75rem'
                  }}>
                    <span style={{ color: currentTheme.faint }}>Progress</span>
                    <span style={{ color: currentTheme.accent }}>67%</span>
                  </div>
                  <div style={{
                    height: '4px',
                    background: currentTheme.border,
                    borderRadius: '2px',
                    marginTop: '0.5rem',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: '67%',
                      background: currentTheme.accent,
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>

                <button style={{
                  width: '100%',
                  padding: '0.5rem',
                  background: 'transparent',
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '6px',
                  color: currentTheme.text,
                  fontSize: '0.813rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  View build log
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Secondary Features */}
      <section style={{ marginBottom: '4rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: windowWidth < 640 ? '1fr' : windowWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', 
            gap: '2rem' 
          }}>
            {secondaryFeatures.map(post => (
              <article 
                key={post.id}
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
              >
                <div style={{
                  position: 'relative',
                  marginBottom: '1rem',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  aspectRatio: '16/9',
                  background: currentTheme.elevated
                }}>
                  <img 
                    src={post.image} 
                    alt={post.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  {post.mediaType === 'video' && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '48px',
                      height: '48px',
                      background: 'rgba(0, 0, 0, 0.8)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Play size={20} color="white" style={{ marginLeft: '2px' }} />
                    </div>
                  )}
                  <div style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    padding: '0.25rem 0.625rem',
                    background: 'rgba(0, 0, 0, 0.8)',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    color: getTypeColor(post.type)
                  }}>
                    {getTypeIcon(post.type)}
                    {post.type}
                  </div>
                  {post.glossaryHighlight && (
                    <div style={{
                      position: 'absolute',
                      bottom: '0.75rem',
                      left: '0.75rem',
                      padding: '0.25rem 0.625rem',
                      background: 'rgba(99, 102, 241, 0.9)',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      color: 'white',
                      fontWeight: 500
                    }}>
                      <a
                        href={`/glossary/${post.glossaryHighlight}`}
                        style={{
                          color: 'white',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Hash size={12} />
                        {post.glossaryHighlight}
                      </a>
                    </div>
                  )}
                </div>

                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 400,
                  lineHeight: 1.3,
                  marginBottom: '0.75rem'
                }}>
                  {post.title}
                </h3>

                <p style={{
                  fontSize: '0.938rem',
                  lineHeight: 1.6,
                  color: currentTheme.subtle,
                  marginBottom: '1rem'
                }}>
                  {post.excerpt}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.813rem',
                  color: currentTheme.faint
                }}>
                  <span>{post.date} • {post.readTime} min</span>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Eye size={12} />
                      {post.stats.views}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <ThumbsUp size={12} />
                      {post.stats.likes}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section style={{ marginBottom: '6rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: windowWidth < 1024 ? '1fr' : '1fr 320px', 
            gap: '4rem' 
          }}>
            {/* Main Feed */}
            <div>
              <h2 style={{
                fontSize: '1rem',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: currentTheme.subtle,
                marginBottom: '2rem',
                paddingBottom: '1rem',
                borderBottom: `1px solid ${currentTheme.border}`
              }}>
                Latest Posts
              </h2>

              {feedPosts.map((post, index) => (
                <article 
                  key={post.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: windowWidth < 640 ? '1fr' : '200px 1fr',
                    gap: windowWidth < 640 ? '1rem' : '2rem',
                    paddingBottom: '2rem',
                    marginBottom: '2rem',
                    borderBottom: index < feedPosts.length - 1 ? `1px solid ${currentTheme.border}` : 'none',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    position: 'relative',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    aspectRatio: '4/3',
                    background: currentTheme.elevated
                  }}>
                    <img 
                      src={post.image} 
                      alt={post.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    {post.mediaType && (
                      <div style={{
                        position: 'absolute',
                        bottom: '0.5rem',
                        right: '0.5rem',
                        padding: '0.25rem 0.5rem',
                        background: 'rgba(0, 0, 0, 0.8)',
                        borderRadius: '4px',
                        fontSize: '0.75rem'
                      }}>
                        {post.mediaType}
                      </div>
                    )}
                  </div>

                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '0.75rem',
                      fontSize: '0.813rem',
                      color: currentTheme.subtle
                    }}>
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        color: getTypeColor(post.type)
                      }}>
                        {getTypeIcon(post.type)}
                        {post.type}
                      </span>
                      <span>{post.date}</span>
                      <span>{post.readTime} min</span>
                    </div>

                    <h3 style={{
                      fontSize: '1.375rem',
                      fontWeight: 400,
                      lineHeight: 1.3,
                      marginBottom: '0.75rem'
                    }}>
                      {post.title}
                    </h3>

                    <p style={{
                      fontSize: '0.938rem',
                      lineHeight: 1.6,
                      color: currentTheme.subtle,
                      marginBottom: '1rem'
                    }}>
                      {post.excerpt}
                    </p>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.5rem',
                      fontSize: '0.813rem',
                      color: currentTheme.faint
                    }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <Eye size={14} />
                        {post.stats.views}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <ThumbsUp size={14} />
                        {post.stats.likes}
                      </span>
                      <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        padding: '0',
                        background: 'transparent',
                        border: 'none',
                        color: currentTheme.faint,
                        cursor: 'pointer'
                      }}>
                        <Bookmark size={14} />
                        Save
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              <button style={{
                width: '100%',
                padding: '0.875rem',
                background: 'transparent',
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '8px',
                color: currentTheme.text,
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
                Load more posts
              </button>
            </div>

            {/* Sidebar - Desktop only */}
            {windowWidth >= 1024 && (
              <aside>
              {/* Popular This Week */}
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <TrendingUp size={18} style={{ color: currentTheme.accent }} />
                  Popular This Week
                </h3>
                {popularPosts.map((post, index) => (
                  <div 
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 0',
                      borderBottom: index < popularPosts.length - 1 ? `1px solid ${currentTheme.border}` : 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: '0.875rem',
                        fontWeight: 400,
                        marginBottom: '0.25rem',
                        lineHeight: 1.4
                      }}>
                        {post.title}
                      </h4>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.75rem',
                        color: currentTheme.faint
                      }}>
                        <span>{post.views} views</span>
                        <span style={{ color: '#10b981' }}>{post.trend}</span>
                      </div>
                    </div>
                    <ChevronRight size={16} style={{ color: currentTheme.faint }} />
                  </div>
                ))}
              </div>

              {/* Quick Experiments */}
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Beaker size={18} style={{ color: '#10b981' }} />
                  Quick Experiments
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.5rem'
                }}>
                  {quickExperiments.map(exp => (
                    <div 
                      key={exp.id}
                      style={{
                        position: 'relative',
                        aspectRatio: '1',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        background: currentTheme.elevated
                      }}
                    >
                      <img 
                        src={exp.image} 
                        alt={exp.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '0.5rem',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                        fontSize: '0.75rem',
                        color: 'white'
                      }}>
                        {exp.title}
                      </div>
                    </div>
                  ))}
                </div>
                <button style={{
                  width: '100%',
                  marginTop: '1rem',
                  padding: '0.625rem',
                  background: 'transparent',
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '6px',
                  color: currentTheme.text,
                  fontSize: '0.813rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  View all experiments
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Newsletter */}
              <div style={{
                padding: '1.5rem',
                background: currentTheme.elevated,
                borderRadius: '12px'
              }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  marginBottom: '0.75rem'
                }}>
                  Weekly Digest
                </h3>
                <p style={{
                  fontSize: '0.813rem',
                  color: currentTheme.subtle,
                  marginBottom: '1rem',
                  lineHeight: 1.5
                }}>
                  Get my latest experiments and research delivered to your inbox.
                </p>
                <input
                  type="email"
                  placeholder="Your email"
                  style={{
                    width: '100%',
                    padding: '0.625rem',
                    background: currentTheme.bg,
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '6px',
                    color: currentTheme.text,
                    fontSize: '0.813rem',
                    marginBottom: '0.75rem',
                    outline: 'none'
                  }}
                />
                <button style={{
                  width: '100%',
                  padding: '0.625rem',
                  background: currentTheme.accent,
                  border: 'none',
                  borderRadius: '6px',
                  color: 'white',
                  fontSize: '0.813rem',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}>
                  Subscribe
                </button>
                <p style={{
                  fontSize: '0.75rem',
                  color: currentTheme.faint,
                  marginTop: '0.5rem',
                  textAlign: 'center'
                }}>
                  Join 2,847 readers
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        borderTop: `1px solid ${currentTheme.border}`,
        padding: '4rem 0'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: windowWidth < 640 ? '1fr' : windowWidth < 768 ? 'repeat(2, 1fr)' : '2fr 1fr 1fr 1fr',
            gap: windowWidth < 640 ? '2rem' : '4rem',
            marginBottom: '3rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  background: currentTheme.accent, 
                  borderRadius: '6px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center'
                }}>
                  <BookOpen size={16} color="white" />
                </div>
                <span style={{ fontSize: '1rem', fontWeight: 600 }}>Esy Journal</span>
              </div>
              <p style={{
                fontSize: '0.875rem',
                lineHeight: 1.6,
                color: currentTheme.subtle,
                maxWidth: '320px'
              }}>
                Experimenting with Large Language Models. Building in public, 
                sharing research, and exploring the future of AI.
              </p>
            </div>

            <div>
              <h4 style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                marginBottom: '1rem',
                color: currentTheme.subtle
              }}>
                Content
              </h4>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href="/experiments" style={{ fontSize: '0.813rem', color: currentTheme.faint, textDecoration: 'none' }}>Experiments</a>
                <a href="/building" style={{ fontSize: '0.813rem', color: currentTheme.faint, textDecoration: 'none' }}>Build Log</a>
                <a href="/research" style={{ fontSize: '0.813rem', color: currentTheme.faint, textDecoration: 'none' }}>Research</a>
                <a href="/glossary" style={{ fontSize: '0.813rem', color: currentTheme.faint, textDecoration: 'none' }}>Glossary</a>
              </nav>
            </div>

            <div>
              <h4 style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                marginBottom: '1rem',
                color: currentTheme.subtle
              }}>
                Connect
              </h4>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href="/twitter" style={{ fontSize: '0.813rem', color: currentTheme.faint, textDecoration: 'none' }}>Twitter</a>
                <a href="/github" style={{ fontSize: '0.813rem', color: currentTheme.faint, textDecoration: 'none' }}>GitHub</a>
                <a href="/linkedin" style={{ fontSize: '0.813rem', color: currentTheme.faint, textDecoration: 'none' }}>LinkedIn</a>
                <a href="/rss" style={{ fontSize: '0.813rem', color: currentTheme.faint, textDecoration: 'none' }}>RSS Feed</a>
              </nav>
            </div>

            <div>
              <h4 style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                marginBottom: '1rem',
                color: currentTheme.subtle
              }}>
                Platform
              </h4>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href="https://esy.com" style={{ fontSize: '0.813rem', color: currentTheme.faint, textDecoration: 'none' }}>Esy Main</a>
                <a href="/about" style={{ fontSize: '0.813rem', color: currentTheme.faint, textDecoration: 'none' }}>About</a>
                <a href="/privacy" style={{ fontSize: '0.813rem', color: currentTheme.faint, textDecoration: 'none' }}>Privacy</a>
                <a href="/api" style={{ fontSize: '0.813rem', color: currentTheme.faint, textDecoration: 'none' }}>API</a>
              </nav>
            </div>
          </div>

          <div style={{
            paddingTop: '2rem',
            borderTop: `1px solid ${currentTheme.border}`,
            display: 'flex',
            flexDirection: windowWidth < 640 ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.75rem',
            color: currentTheme.faint
          }}>
            <p>© 2025 Esy Journal. Part of the Esy platform.</p>
            <p>Made with curiosity and code.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EsyJournalModernEditorial;