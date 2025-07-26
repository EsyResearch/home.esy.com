"use client";

import React, { useState, useEffect } from 'react';
import { 
  Calculator, Type, BarChart3, Sparkles, CheckCircle, 
  FileText, BookOpen, Search, Zap, Target, 
  ArrowRight, Star, Users, TrendingUp, Clock,
  PenTool, Brain, Award, Globe, Eye, Hash, Lightbulb
} from 'lucide-react';
import Link from 'next/link';

const AIWritingToolsHub = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [hoveredTool, setHoveredTool] = useState(null);

  const isMobile = windowWidth < 768;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stats = [
    { number: '500K+', label: 'Writers helped monthly' },
    { number: '15+', label: 'Free AI tools' },
    { number: '4.9/5', label: 'User satisfaction' },
    { number: '24/7', label: 'Available access' }
  ];

  const writingTools = [
    {
      id: 'ai-essay-writer',
      title: 'AI Essay Writer',
      description: 'Generate high-quality, plagiarism-free essays with proper citations and academic structure',
      icon: PenTool,
      category: 'AI-Powered',
      features: ['Academic writing focus', 'Citation integration', 'Multiple essay types', 'Grade-level matching'],
      stats: '165K+ uses',
      difficulty: 'Intermediate',
      premium: false,
      href: '/ai-essay-writer',
      highlight: 'Most Popular'
    },
    {
      id: 'writing-prompt-generator',
      title: 'Writing Prompt Generator',
      description: 'Generate creative writing prompts and story ideas to spark your imagination',
      icon: Lightbulb,
      category: 'AI-Powered',
      features: ['Genre customization', 'Difficulty levels', 'Creative inspiration', 'Story starters'],
      stats: '94K+ uses',
      difficulty: 'Beginner',
      premium: false,
      href: '/writing-prompt-generator'
    },
    {
      id: 'word-counter',
      title: 'Word Counter',
      description: 'Count words, characters, paragraphs, and reading time instantly',
      icon: Calculator,
      category: 'Essential',
      features: ['Real-time counting', 'Reading time estimate', 'Character limits', 'Paragraph analysis'],
      stats: '2.1M+ uses',
      difficulty: 'Beginner',
      premium: false,
      href: '/tools/word-counter'
    },
    {
      id: 'ai-paraphraser',
      title: 'AI Paraphrasing Tool',
      description: 'Rewrite text while maintaining meaning and academic tone',
      icon: Brain,
      category: 'AI-Powered',
      features: ['Academic style', 'Plagiarism avoidance', 'Multiple versions', 'Context preservation'],
      stats: '890K+ uses',
      difficulty: 'Intermediate',
      premium: false,
      href: '/tools/paraphraser'
    },
    {
      id: 'readability-analyzer',
      title: 'Readability Analyzer',
      description: 'Analyze text complexity and improve clarity for your audience',
      icon: BarChart3,
      category: 'Analytics',
      features: ['Flesch-Kincaid score', 'Grade level', 'Sentence analysis', 'Improvement tips'],
      stats: '654K+ uses',
      difficulty: 'Intermediate',
      premium: false,
      href: '/tools/readability'
    },
    {
      id: 'citation-generator',
      title: 'Citation Generator',
      description: 'Generate perfect citations in APA, MLA, Chicago formats',
      icon: BookOpen,
      category: 'Academic',
      features: ['Multiple formats', 'Auto-formatting', 'URL citations', 'Book & journal support'],
      stats: '1.2M+ uses',
      difficulty: 'Beginner',
      premium: false,
      href: '/tools/citations'
    },
    {
      id: 'text-summarizer',
      title: 'AI Text Summarizer',
      description: 'Extract key points and create concise summaries automatically',
      icon: FileText,
      category: 'AI-Powered',
      features: ['Key point extraction', 'Custom length', 'Academic focus', 'Bullet points'],
      stats: '445K+ uses',
      difficulty: 'Intermediate',
      premium: false,
      href: '/tools/summarizer'
    },
    {
      id: 'grammar-checker',
      title: 'Grammar & Style Checker',
      description: 'Advanced grammar checking with academic writing focus',
      icon: CheckCircle,
      category: 'Essential',
      features: ['Grammar corrections', 'Style suggestions', 'Academic tone', 'Clarity improvements'],
      stats: '1.8M+ uses',
      difficulty: 'Beginner',
      premium: false,
      href: '/tools/grammar'
    },
    {
      id: 'title-generator',
      title: 'Essay Title Generator',
      description: 'Generate compelling titles for essays and research papers',
      icon: Sparkles,
      category: 'AI-Powered',
      features: ['Multiple suggestions', 'Field-specific', 'SEO optimized', 'Academic style'],
      stats: '287K+ uses',
      difficulty: 'Beginner',
      premium: false,
      href: '/tools/title-generator'
    },
    {
      id: 'outline-generator',
      title: 'Essay Outline Generator',
      description: 'Create structured outlines for academic papers and essays',
      icon: Target,
      category: 'Academic',
      features: ['Structured format', 'Topic development', 'Thesis integration', 'Source planning'],
      stats: '193K+ uses',
      difficulty: 'Intermediate',
      premium: true,
      href: '/tools/outline-generator'
    },
    {
      id: 'plagiarism-checker',
      title: 'Plagiarism Checker',
      description: 'Detect potential plagiarism and ensure originality',
      icon: Search,
      category: 'Academic',
      features: ['Similarity detection', 'Source identification', 'Originality report', 'Citation suggestions'],
      stats: '756K+ uses',
      difficulty: 'Intermediate',
      premium: true,
      href: '/tools/plagiarism'
    },
    {
      id: 'thesis-generator',
      title: 'Thesis Statement Generator',
      description: 'Craft strong thesis statements for academic arguments',
      icon: Zap,
      category: 'AI-Powered',
      features: ['Argument structure', 'Topic analysis', 'Multiple angles', 'Academic format'],
      stats: '334K+ uses',
      difficulty: 'Advanced',
      premium: true,
      href: '/tools/thesis-generator'
    },
    {
      id: 'tone-converter',
      title: 'Academic Tone Converter',
      description: 'Convert casual writing to formal academic style',
      icon: PenTool,
      category: 'AI-Powered',
      features: ['Formal conversion', 'Academic vocabulary', 'Style consistency', 'Professional tone'],
      stats: '121K+ uses',
      difficulty: 'Advanced',
      premium: true,
      href: '/tools/tone-converter'
    },
    {
      id: 'abstract-generator',
      title: 'Research Abstract Generator',
      description: 'Generate professional abstracts for research papers',
      icon: Eye,
      category: 'Academic',
      features: ['Structured format', 'Key findings', 'Methodology summary', 'Publication ready'],
      stats: '89K+ uses',
      difficulty: 'Advanced',
      premium: true,
      href: '/tools/abstract-generator'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Tools', count: writingTools.length },
    { id: 'Essential', name: 'Essential', count: writingTools.filter(t => t.category === 'Essential').length },
    { id: 'AI-Powered', name: 'AI-Powered', count: writingTools.filter(t => t.category === 'AI-Powered').length },
    { id: 'Academic', name: 'Academic', count: writingTools.filter(t => t.category === 'Academic').length },
    { id: 'Analytics', name: 'Analytics', count: writingTools.filter(t => t.category === 'Analytics').length }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = writingTools.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const testimonials = [
    {
      text: "These tools saved me hours on my dissertation. The citation generator is a lifesaver!",
      author: "Sarah Chen",
      role: "PhD Student, Stanford",
      rating: 5
    },
    {
      text: "The AI paraphrasing tool helped me improve my writing style significantly.",
      author: "Marcus Rodriguez",
      role: "Professor, MIT",
      rating: 5
    },
    {
      text: "Essential tools for any serious academic writer. The readability analyzer is brilliant.",
      author: "Dr. Aisha Patel",
      role: "Research Scientist",
      rating: 5
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0f',
      color: '#ffffff',
      fontFamily: 'var(--font-inter)'
    }}>
      {/* Hero Section */}
      <section style={{
        padding: isMobile ? '6rem 1.5rem 3rem' : '9rem 2rem 6rem',
        textAlign: 'center',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: isMobile ? '3rem' : '4.5rem',
          fontWeight: 300,
          lineHeight: 1.3,
          letterSpacing: '0.01em',
          marginBottom: '1.5rem',
          fontFamily: 'var(--font-newsreader)'
        }}>
          Free AI Writing
          <br />
          <span style={{ color: '#8b5cf6', fontWeight: 400 }}>Tools for Everyone</span>
        </h1>
        
        <p style={{
          fontSize: isMobile ? '1.125rem' : '1.375rem',
          color: 'rgba(255, 255, 255, 0.7)',
          lineHeight: 1.6,
          marginBottom: '3rem',
          maxWidth: '700px',
          margin: '0 auto 3rem',
          fontFamily: 'var(--font-inter)'
        }}>
          Professional writing tools powered by AI. Improve your writing, 
          save time, and create better content with our comprehensive suite of free tools.
        </p>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: '1.5rem',
          marginBottom: '4rem'
        }}>
          {stats.map((stat, index) => (
            <div key={index} style={{
              padding: '1.5rem',
              backgroundColor: 'rgba(139, 92, 246, 0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(139, 92, 246, 0.1)'
            }}>
              <div style={{
                fontSize: '1.875rem',
                fontWeight: 300,
                color: '#8b5cf6',
                marginBottom: '0.25rem'
              }}>
                {stat.number}
              </div>
              <div style={{
                fontSize: '0.813rem',
                color: 'rgba(255, 255, 255, 0.5)'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '1rem',
          marginBottom: '2rem',
          maxWidth: '800px',
          margin: '0 auto 2rem'
        }}>
          <div style={{
            flex: 1,
            position: 'relative'
          }}>
            <Search size={20} style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(255, 255, 255, 0.5)'
            }} />
            <input
              type="text"
              placeholder="Search writing tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.875rem 1rem 0.875rem 3rem',
                backgroundColor: '#16161f',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '0.938rem',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '3rem',
          flexWrap: 'wrap'
        }}>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                padding: '0.75rem 1.25rem',
                backgroundColor: selectedCategory === category.id ? '#8b5cf6' : 'transparent',
                border: `1px solid ${selectedCategory === category.id ? '#8b5cf6' : 'rgba(255, 255, 255, 0.1)'}`,
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </section>

      {/* Tools Grid */}
      <section style={{
        padding: isMobile ? '2rem 1.5rem' : '4rem 2rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredTools.map(tool => (
            <Link
              key={tool.id}
              href={tool.href}
              onMouseEnter={() => setHoveredTool(tool.id)}
              onMouseLeave={() => setHoveredTool(null)}
              style={{
                display: 'block',
                padding: '2rem',
                backgroundColor: hoveredTool === tool.id ? '#1a1a25' : '#16161f',
                border: `1px solid ${hoveredTool === tool.id ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
                borderRadius: '12px',
                textDecoration: 'none',
                color: '#ffffff',
                transition: 'all 0.2s',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Premium Badge */}
              {tool.premium && (
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  padding: '0.25rem 0.75rem',
                  backgroundColor: '#8b5cf6',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 500
                }}>
                  Pro
                </div>
              )}

              {/* Highlight Badge */}
              {tool.highlight && !tool.premium && (
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  padding: '0.25rem 0.75rem',
                  backgroundColor: 'rgba(74, 222, 128, 0.2)',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: '#4ade80',
                  border: '1px solid rgba(74, 222, 128, 0.3)'
                }}>
                  {tool.highlight}
                </div>
              )}

              {/* Tool Header */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  padding: '0.75rem',
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(139, 92, 246, 0.2)'
                }}>
                  <tool.icon size={24} style={{ color: '#8b5cf6' }} />
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.5rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '4px',
                      color: 'rgba(255, 255, 255, 0.7)'
                    }}>
                      {tool.category}
                    </span>
                    <span style={{
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.5)'
                    }}>
                      {tool.difficulty}
                    </span>
                  </div>
                  
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 500,
                    marginBottom: '0.5rem'
                  }}>
                    {tool.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p style={{
                fontSize: '0.938rem',
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: 1.6,
                marginBottom: '1.5rem'
              }}>
                {tool.description}
              </p>

              {/* Features */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                marginBottom: '1.5rem'
              }}>
                {tool.features.slice(0, 3).map((feature, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.813rem',
                      color: 'rgba(255, 255, 255, 0.6)'
                    }}
                  >
                    <div style={{
                      width: '4px',
                      height: '4px',
                      backgroundColor: '#8b5cf6',
                      borderRadius: '50%'
                    }} />
                    {feature}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <span style={{
                  fontSize: '0.813rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <Users size={12} />
                  {tool.stats}
                </span>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  color: '#8b5cf6',
                  fontWeight: 500
                }}>
                  Try Now
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{
        padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
        backgroundColor: '#16161f',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            fontWeight: 300,
            marginBottom: '3rem',
            fontFamily: 'var(--font-literata)'
          }}>
            Trusted by Writers Worldwide
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                style={{
                  padding: '2rem',
                  backgroundColor: '#0a0a0f',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <div style={{
                  display: 'flex',
                  gap: '0.25rem',
                  marginBottom: '1rem',
                  justifyContent: 'center'
                }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#8b5cf6" color="#8b5cf6" />
                  ))}
                </div>
                
                <p style={{
                  fontSize: '0.938rem',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                
                <div>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    marginBottom: '0.25rem'
                  }}>
                    {testimonial.author}
                  </div>
                  <div style={{
                    fontSize: '0.813rem',
                    color: 'rgba(255, 255, 255, 0.5)'
                  }}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            fontWeight: 300,
            marginBottom: '1rem',
            fontFamily: 'var(--font-literata)'
          }}>
            Ready for More Advanced AI?
          </h2>
          
          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '2rem'
          }}>
            Get full access to Esy AI for comprehensive writing assistance, 
            research tools, and advanced features.
          </p>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link
              href="/app"
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#8b5cf6',
                border: 'none',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none'
              }}
            >
              Try Esy AI Free
              <ArrowRight size={18} />
            </Link>
            
            <Link
              href="/writing-prompts"
              style={{
                padding: '1rem 2rem',
                backgroundColor: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1rem',
                cursor: 'pointer',
                textDecoration: 'none'
              }}
            >
              Browse Writing Prompts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIWritingToolsHub; 