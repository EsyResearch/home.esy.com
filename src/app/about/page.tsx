"use client";

import React, { useState, useEffect } from 'react';
import { Brain, Layers, MessageSquare, Sparkles } from 'lucide-react';
import {
  SideNavigation,
  HeroSection,
  ProblemSection,
  PrinciplesSection,
  FeaturesSection,
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

  const principles = [
    {
      number: '01',
      title: 'Intelligence amplified',
      description: 'The best research happens when human creativity meets AI capability. We teach you to orchestrate this partnership—maintaining your voice while leveraging unprecedented computational intelligence.'
    },
    {
      number: '02',
      title: 'Precision through prompting',
      description: 'A perfectly crafted prompt can unlock insights that would take weeks to discover manually. Master the subtle art of AI communication and watch your research transform.'
    },
    {
      number: '03',
      title: 'Collective advancement',
      description: 'Every breakthrough prompt becomes a gift to the community. Share what works, learn from others, and accelerate the pace of academic discovery together.'
    }
  ];

  const features = [
    {
      icon: Brain,
      title: 'Intelligent Prompting',
      description: 'Transform vague ideas into precise AI instructions that yield publication-ready insights'
    },
    {
      icon: Layers,
      title: 'Academic Templates',
      description: 'Start with battle-tested prompts refined by leading researchers in your field'
    },
    {
      icon: MessageSquare,
      title: 'Prompt Evolution',
      description: 'Track, version, and refine your prompts based on output quality metrics'
    },
    {
      icon: Sparkles,
      title: 'AI Mastery Path',
      description: 'Progress from basic queries to advanced research methodologies with guided learning'
    }
  ];

  const benefits = [
    {
      metric: '10x',
      title: 'Faster Literature Reviews',
      description: 'What took weeks now takes hours'
    },
    {
      metric: '73%',
      title: 'Better First Drafts',
      description: 'Higher quality initial outputs'
    },
    {
      metric: '5hrs',
      title: 'Weekly Time Saved',
      description: 'On average per researcher'
    }
  ];

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
      <ProblemSection currentTheme={currentTheme} benefits={benefits} />
      <PrinciplesSection currentTheme={currentTheme} principles={principles} />
      <FeaturesSection currentTheme={currentTheme} features={features} />
      <TransformSection currentTheme={currentTheme} />
    </div>
  );
};

export default AboutPage; 