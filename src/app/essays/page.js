"use client"
import React, { useState, useEffect } from 'react';
import { 
  Navigation, 
  HeroSection, 
  FeaturedEssay, 
  EssaysList, 
  Footer 
} from '@/components/Essays';

const EsyEssaysHub = () => {
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

  const filters = [
    { id: 'all', label: 'All Essays', count: 1247 },
    { id: 'climate', label: 'Climate & Environment', count: 234 },
    { id: 'politics', label: 'Political Science', count: 189 },
    { id: 'economics', label: 'Economics', count: 267 },
    { id: 'tech', label: 'Technology & Society', count: 342 },
    { id: 'philosophy', label: 'Philosophy', count: 215 }
  ];

  const featuredEssay = {
    id: 'featured',
    title: "The Geopolitics of Renewable Energy: Power Shifts in a Decarbonizing World",
    authors: ["Dr. Sarah Chen", "Prof. Michael Torres"],
    institution: "MIT Energy Initiative",
    publishDate: "March 15, 2025",
    readTime: 45,
    abstract: "This comprehensive analysis examines how the global transition to renewable energy is fundamentally reshaping international power dynamics. Through examination of energy infrastructure investments, rare earth mineral dependencies, and emerging energy alliances, we argue that traditional petrostates face unprecedented challenges while new forms of resource competition emerge.",
    metrics: {
      citations: 87,
      views: 23456,
      impact: 9.7
    }
  };

  const essays = [
    {
      id: 1,
      title: "Algorithmic Governance: Democratic Implications of AI in Public Policy",
      authors: ["Emily Watson"],
      institution: "Stanford Democracy Lab",
      publishDate: "March 22, 2025",
      readTime: 32,
      abstract: "This paper investigates the increasing role of artificial intelligence in governmental decision-making processes, examining case studies from Estonia's e-governance system.",
      metrics: { citations: 42, views: 15234 },
      tags: ["Political Science", "AI Ethics"],
      trending: true
    },
    {
      id: 2,
      title: "Post-Pandemic Labor Markets: Remote Work and Urban Economic Restructuring",
      authors: ["Dr. James Liu", "Anna Martinez"],
      institution: "Harvard Business School",
      publishDate: "March 20, 2025",
      readTime: 38,
      abstract: "Drawing on data from 15 major metropolitan areas across three continents, this study examines how the normalization of remote work has fundamentally altered urban labor markets.",
      metrics: { citations: 58, views: 18976 },
      tags: ["Economics", "Urban Studies"],
      editorsChoice: true
    },
    {
      id: 3,
      title: "Digital Sovereignty: Nation-States in the Age of Cloud Computing",
      authors: ["Prof. Maria Petrova"],
      institution: "Oxford Internet Institute",
      publishDate: "March 18, 2025",
      readTime: 35,
      abstract: "As data becomes the primary economic resource, nations grapple with maintaining sovereignty while participating in a globalized digital economy.",
      metrics: { citations: 12, views: 8543 },
      tags: ["Technology Policy", "International Relations"],
      new: true
    }
  ];

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
      
      <FeaturedEssay featuredEssay={featuredEssay} />
      
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