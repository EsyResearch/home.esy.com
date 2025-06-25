"use client"
import React, { useState } from 'react';
import HeroSection from './HeroSection';

const ClientHeroSection = ({ filters }) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <HeroSection 
      searchFocused={searchFocused}
      setSearchFocused={setSearchFocused}
      activeFilter={activeFilter}
      setActiveFilter={setActiveFilter}
      filters={filters}
    />
  );
};

export default ClientHeroSection; 