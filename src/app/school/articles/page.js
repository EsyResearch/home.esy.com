"use client"

import React from 'react';
import Link from 'next/link';

export default function ArticlesIndexPage() {
  const articles = [
    {
      category: 'Literary Analysis',
      title: 'Unlocking Literary Depth: Using Prompt Engineering to Analyze "To Kill a Mockingbird"',
      excerpt: 'Discover how strategic prompt engineering can transform your literary analysis, revealing insights that might otherwise remain hidden in classic texts.',
      author: 'Dr. Emily Watson',
      date: 'Mar 25, 2025',
      readTime: 15,
      slug: 'to-kill-a-mockingbird'
    },
    {
      category: 'Prompt Engineering',
      title: 'What is Prompt Engineering? A Comprehensive Guide',
      excerpt: 'Discover the art and science of crafting effective prompts for AI models. Learn fundamental techniques that will transform your AI interactions.',
      author: 'Zev Uhuru',
      date: 'Mar 22, 2025',
      readTime: 8,
      slug: 'prompt-engineering-guide'
    },
    {
      category: 'LLM Basics',
      title: 'Understanding Large Language Models: From Theory to Practice',
      excerpt: 'Demystify the technology behind ChatGPT, Claude, and other LLMs. A beginner-friendly introduction to transformer architecture.',
      author: 'Zev Uhuru',
      date: 'Mar 20, 2025',
      readTime: 12,
      slug: 'understanding-llms'
    },
    {
      category: 'Academic Writing',
      title: '5 Ways AI is Revolutionizing Academic Research',
      excerpt: 'From literature reviews to data analysis, explore how AI tools are transforming every stage of the academic research process.',
      author: 'Zev Uhuru',
      date: 'Mar 18, 2025',
      readTime: 6,
      slug: 'ai-research-revolution'
    }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#0a0a0f',
      color: '#ffffff',
      paddingTop: '6rem'
    },
    header: {
      textAlign: 'center',
      padding: '4rem 2rem',
      maxWidth: '800px',
      margin: '0 auto'
    },
    title: {
      fontSize: '3rem',
      fontWeight: '300',
      letterSpacing: '-0.02em',
      marginBottom: '1rem'
    },
    subtitle: {
      fontSize: '1.25rem',
      color: 'rgba(255, 255, 255, 0.7)',
      lineHeight: '1.6'
    },
    articlesContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem 4rem'
    },
    articlesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '2rem'
    },
    articleCard: {
      backgroundColor: '#16161f',
      borderRadius: '12px',
      padding: '2rem',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: '1px solid transparent',
      textDecoration: 'none',
      color: 'inherit',
      display: 'block'
    },
    category: {
      fontSize: '0.875rem',
      color: '#8b5cf6',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      fontWeight: '500',
      marginBottom: '0.75rem'
    },
    articleTitle: {
      fontSize: '1.5rem',
      fontWeight: '400',
      marginBottom: '1rem',
      letterSpacing: '-0.01em',
      lineHeight: '1.3'
    },
    excerpt: {
      fontSize: '1rem',
      color: 'rgba(255, 255, 255, 0.7)',
      lineHeight: '1.6',
      marginBottom: '1.5rem'
    },
    meta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.5)'
    },
    author: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    readTime: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>All Articles</h1>
        <p style={styles.subtitle}>
          Explore our collection of in-depth articles on AI, academic writing, and literary analysis. 
          Learn from experts and enhance your understanding of cutting-edge technologies.
        </p>
      </header>

      <div style={styles.articlesContainer}>
        <div style={styles.articlesGrid}>
          {articles.map((article, index) => (
            <Link
              key={index}
              href={`/school/articles/${article.slug}`}
              style={styles.articleCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={styles.category}>{article.category}</div>
              <h2 style={styles.articleTitle}>{article.title}</h2>
              <p style={styles.excerpt}>{article.excerpt}</p>
              <div style={styles.meta}>
                <div style={styles.author}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  {article.author}
                </div>
                <div style={styles.readTime}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  {article.readTime} min read
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}