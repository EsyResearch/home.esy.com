import React from 'react';
import { BookOpen, Search, TrendingUp, Star } from 'lucide-react';
import SearchBar from '@/components/SearchBar/SearchBar';

const BlogHero = ({ 
  title = "The Esy Blog",
  subtitle = "Insights, tutorials, and thought leadership on AI, academic writing, and the future of education",
  onSearch,
  searchQuery,
  setSearchQuery,
  isSearching = false,
  stats = null
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
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
  const isSmallMobile = typeof window !== 'undefined' && window.innerWidth < 480;
  const isTinyMobile = typeof window !== 'undefined' && window.innerWidth < 375;

  const styles = {
    heroSection: {
      padding: isMobile ? '2rem 1rem' : '4rem 2rem',
      textAlign: 'center',
      background: `linear-gradient(135deg, ${currentTheme.bg} 0%, ${currentTheme.elevated} 100%)`,
      borderBottom: `1px solid ${currentTheme.divider}`,
      position: 'relative',
      overflow: 'hidden'
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `
        radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)
      `,
      zIndex: 0
    },
    content: {
      position: 'relative',
      zIndex: 1,
      maxWidth: '800px',
      margin: '0 auto'
    },
    icon: {
      fontSize: isMobile ? '3rem' : '4rem',
      color: currentTheme.accent,
      marginBottom: '1rem',
      display: 'inline-block'
    },
    title: {
      fontSize: isTinyMobile ? '2.5rem' : isSmallMobile ? '2.75rem' : isMobile ? '3rem' : isTablet ? '3.5rem' : '4rem',
      fontWeight: 300,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      marginBottom: isMobile ? '1rem' : '1.5rem',
      fontFamily: 'var(--font-literata)',
      background: `linear-gradient(135deg, ${currentTheme.text} 0%, ${currentTheme.accent} 100%)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    subtitle: {
      fontSize: isMobile ? '1rem' : '1.25rem',
      color: currentTheme.muted,
      fontWeight: 300,
      maxWidth: '600px',
      margin: '0 auto 2rem',
      lineHeight: 1.6
    },
    searchContainer: {
      maxWidth: '600px',
      margin: '0 auto 2rem'
    },
    statsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: isMobile ? '1.5rem' : '2rem',
      marginTop: '2rem',
      padding: '1.5rem',
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      borderRadius: '16px',
      border: `1px solid ${currentTheme.border}`,
      backdropFilter: 'blur(10px)'
    },
    stat: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
      minWidth: '100px'
    },
    statValue: {
      fontSize: isMobile ? '1.5rem' : '2rem',
      fontWeight: '700',
      color: currentTheme.accent,
      lineHeight: 1
    },
    statLabel: {
      fontSize: '0.875rem',
      color: currentTheme.muted,
      fontWeight: '500',
      textAlign: 'center'
    },
    statIcon: {
      fontSize: '1.25rem',
      color: currentTheme.accent,
      opacity: 0.8
    }
  };

  return (
    <section style={styles.heroSection}>
      <div style={styles.backgroundPattern} />
      
      <div style={styles.content}>
        <BookOpen style={styles.icon} />
        
        <h1 style={styles.title}>
          {title}
        </h1>
        
        <p style={styles.subtitle}>
          {subtitle}
        </p>
        
        <div style={styles.searchContainer}>
          <SearchBar
            placeholder="Search articles, topics, or authors..."
            context="general"
            onSearch={onSearch}
            value={searchQuery}
            onChange={setSearchQuery}
            isLoading={isSearching}
          />
        </div>
        
        {stats && (
          <div style={styles.statsContainer}>
            <div style={styles.stat}>
              <div style={styles.statIcon}>
                <BookOpen size={20} />
              </div>
              <div style={styles.statValue}>{stats.totalPosts}</div>
              <div style={styles.statLabel}>Articles</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statIcon}>
                <Star size={20} />
              </div>
              <div style={styles.statValue}>{stats.featuredPosts}</div>
              <div style={styles.statLabel}>Featured</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statIcon}>
                <TrendingUp size={20} />
              </div>
              <div style={styles.statValue}>{stats.totalViews}</div>
              <div style={styles.statLabel}>Views</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statIcon}>
                <Search size={20} />
              </div>
              <div style={styles.statValue}>{stats.categories}</div>
              <div style={styles.statLabel}>Categories</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogHero;
