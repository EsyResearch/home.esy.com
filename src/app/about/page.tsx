"use client";

import React, { useState, useEffect } from 'react';
import {
  SideNavigation,
  HeroSection,
  ProblemSection,
  SolutionSection,
  SocialProofSection,
  PricingSection,
  TransformSection
} from '@/components/About';
import { elevatedDarkTheme } from '@/lib/theme';

const AboutPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      
      // Update active section based on scroll
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          setActiveSection(section.id);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentTheme = elevatedDarkTheme;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="origami-headers" style={{
      minHeight: '100vh',
      backgroundColor: currentTheme.bg,
      color: currentTheme.text,
      fontFamily: 'var(--font-inter)'
    }}>
      <SideNavigation 
        activeSection={activeSection} 
        currentTheme={currentTheme} 
        scrollToSection={scrollToSection} 
      />
      <HeroSection currentTheme={currentTheme} />
      <ProblemSection currentTheme={currentTheme} />
      <SolutionSection currentTheme={currentTheme} />
      <SocialProofSection currentTheme={currentTheme} />
      <PricingSection currentTheme={currentTheme} />
      <TransformSection currentTheme={currentTheme} />
    </div>
  );
};

export default AboutPage;
