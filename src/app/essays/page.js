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

const EsyEssaysHub = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [selectedSort, setSelectedSort] = useState('relevance');
  const [essays, setEssays] = useState([]);
  const [featuredEssay, setFeaturedEssay] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadEssays = async () => {
      try {
        const response = await fetch('/api/essays');
        const data = await response.json();
        
        setEssays(data.essays);
        setFeaturedEssay(data.featuredEssay);
      } catch (error) {
        console.error('Error loading essays:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEssays();
  }, []);

  // Generate filters from essay tags
  const generateFilters = () => {
    const tagCounts = {};
    essays.forEach(essay => {
      if (essay.tags) {
        essay.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });

    const filters = [
      { id: 'all', label: 'All Essays', count: essays.length }
    ];

    Object.entries(tagCounts).forEach(([tag, count]) => {
      filters.push({ id: tag.toLowerCase().replace(' ', '-'), label: tag, count });
    });

    return filters;
  };

  const filters = generateFilters();

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#0a0a0f',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div>Loading essays...</div>
      </div>
    );
  }

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
        filters={filters}
      />
      
      {featuredEssay && <FeaturedEssay featuredEssay={featuredEssay} />}
      
      <EssaysList 
        essays={essays}
        hoveredCard={hoveredCard}
        setHoveredCard={setHoveredCard}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />
      
      <Footer />
    </div>
  );
};

export default EsyEssaysHub;