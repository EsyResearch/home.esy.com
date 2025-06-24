"use client"
import React, { useState, useEffect } from 'react';
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
  essayContent = ""
}) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [selectedSort, setSelectedSort] = useState('relevance');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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