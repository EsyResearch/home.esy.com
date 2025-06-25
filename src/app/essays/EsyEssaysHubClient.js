"use client"
import React from 'react';
import { 
  FeaturedEssay, 
} from '@/components/Essays';
import { ClientNavigation, ClientHeroSection, ClientEssaysList } from '@/components/Essays';
import Footer from '@/components/Home/footer';
import '@/app/globals.css';

const EsyEssaysHubClient = ({ essays, featuredEssay, filters }) => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0a0a0f',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      lineHeight: 1.6
    }}>
      <ClientNavigation />
      
      <ClientHeroSection filters={filters} />
      
      {featuredEssay && <FeaturedEssay featuredEssay={featuredEssay} />}
      
      <ClientEssaysList essays={essays} />
      
      <Footer />
    </div>
  );
};

export default EsyEssaysHubClient; 