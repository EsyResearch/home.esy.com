"use client"
import React from 'react';
import { 
  FeaturedEssay, 
} from '@/components/Essays';
import { ClientHeroSection, ClientEssaysList } from '@/components/Essays';
import '@/app/globals.css';

const EsyEssaysHubClient = ({ essays, featuredEssay, filters }) => {
  return (
    <div className="academic-page" style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0a0a0f',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      lineHeight: 1.6
    }}>
      <ClientHeroSection filters={filters} />
      
      {featuredEssay && <FeaturedEssay featuredEssay={featuredEssay} />}
      
      <ClientEssaysList essays={essays} />
    </div>
  );
};

export default EsyEssaysHubClient; 