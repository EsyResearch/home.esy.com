import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, User, Tag, Star, BookOpen } from 'lucide-react';

const BlogCard = ({ 
  post, 
  variant = 'default', 
  hovered = false, 
  onMouseEnter, 
  onMouseLeave,
  onClick 
}) => {
  const currentTheme = {
    bg: '#0a0a0f',
    elevated: '#16161f',
    text: '#ffffff',
    muted: 'rgba(255, 255, 255, 0.7)',
    subtle: 'rgba(255, 255, 255, 0.5)',
    faint: 'rgba(255, 255, 255, 0.3)',
    border: 'rgba(255, 255, 255, 0.08)',
    divider: 'rgba(255, 255, 255, 0.05)',
    accent: '#8b5cf6'
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;

  const styles = {
    card: {
      backgroundColor: currentTheme.elevated,
      borderRadius: variant === 'featured' ? '20px' : '16px',
      overflow: 'hidden',
      border: `1px solid ${currentTheme.border}`,
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      cursor: 'pointer',
      position: 'relative',
      transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      boxShadow: hovered 
        ? `0 20px 40px rgba(139, 92, 246, 0.15)`
        : variant === 'featured'
        ? `0 8px 32px rgba(139, 92, 246, 0.1)`
        : '0 4px 16px rgba(0, 0, 0, 0.1)',
      borderColor: hovered ? currentTheme.accent : currentTheme.border
    },
    imageContainer: {
      width: '100%',
      height: variant === 'featured' ? (isMobile ? '200px' : '280px') : (isMobile ? '180px' : '220px'),
      backgroundColor: currentTheme.divider,
      backgroundImage: 'linear-gradient(45deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    featuredBadge: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      backgroundColor: currentTheme.accent,
      color: '#ffffff',
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    content: {
      padding: variant === 'featured' ? (isMobile ? '1.5rem' : '2rem') : (isMobile ? '1.25rem' : '1.5rem')
    },
    category: {
      display: 'inline-block',
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      backgroundColor: `${currentTheme.accent}20`,
      color: currentTheme.accent,
      fontSize: '0.75rem',
      fontWeight: '600',
      marginBottom: '0.75rem'
    },
    title: {
      fontSize: variant === 'featured' 
        ? (isMobile ? '1.25rem' : '1.5rem')
        : (isMobile ? '1.125rem' : '1.25rem'),
      fontWeight: '600',
      lineHeight: 1.3,
      marginBottom: '0.75rem',
      color: currentTheme.text,
      display: '-webkit-box',
      WebkitLineClamp: variant === 'featured' ? 3 : 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    },
    excerpt: {
      fontSize: variant === 'featured' ? '1rem' : '0.875rem',
      color: currentTheme.muted,
      lineHeight: 1.5,
      marginBottom: '1rem',
      display: '-webkit-box',
      WebkitLineClamp: variant === 'featured' ? 4 : 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    },
    meta: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '0.75rem',
      color: currentTheme.subtle,
      marginBottom: '1rem'
    },
    author: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    authorAvatar: {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      backgroundColor: currentTheme.accent,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      fontSize: '0.75rem',
      fontWeight: '600'
    },
    readTime: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    tags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      marginBottom: '1rem'
    },
    tag: {
      padding: '0.125rem 0.5rem',
      backgroundColor: `${currentTheme.accent}15`,
      color: currentTheme.accent,
      borderRadius: '8px',
      fontSize: '0.625rem',
      fontWeight: '500'
    },
    stats: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      fontSize: '0.75rem',
      color: currentTheme.subtle
    },
    stat: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    }
  };

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    } else {
      window.location.href = `/blog/${post.slug}`;
    }
  };

  return (
    <div
      style={styles.card}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
    >
      <div style={styles.imageContainer}>
        <BookOpen size={variant === 'featured' ? 64 : 48} color={currentTheme.accent} />
        {post.featured && (
          <div style={styles.featuredBadge}>
            <Star size={12} />
            Featured
          </div>
        )}
      </div>
      
      <div style={styles.content}>
        <span style={styles.category}>{post.category}</span>
        <h3 style={styles.title}>{post.title}</h3>
        <p style={styles.excerpt}>{post.excerpt}</p>
        
        <div style={styles.meta}>
          <div style={styles.author}>
            <div style={styles.authorAvatar}>
              {post.author.split(' ').map(n => n[0]).join('')}
            </div>
            <span>{post.author}</span>
          </div>
          <div style={styles.readTime}>
            <Clock size={12} />
            {post.readTime} min
          </div>
        </div>
        
        {variant === 'featured' && post.tags && (
          <div style={styles.tags}>
            {post.tags.slice(0, 3).map((tag, index) => (
              <span key={index} style={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
        
        <div style={styles.stats}>
          <div style={styles.stat}>
            <Calendar size={12} />
            {post.date}
          </div>
          {post.views && (
            <div style={styles.stat}>
              <BookOpen size={12} />
              {post.views} views
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
