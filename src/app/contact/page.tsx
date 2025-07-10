'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, Calendar, Users
} from 'lucide-react';
import ContactNav from './components/navigation';
import ContactHero from './components/contactHero';
import ContactOptionsPanel from './components/contactOptionsPanel';
import ContactFAQ from './components/contactFaq';

const ContactPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [selectedPath, setSelectedPath] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentTheme = {
    bg: '#0a0a0f',
    elevated: '#16161f',
    text: '#ffffff',
    muted: 'rgba(255, 255, 255, 0.7)',
    subtle: 'rgba(255, 255, 255, 0.5)',
    faint: 'rgba(255, 255, 255, 0.3)',
    border: 'rgba(255, 255, 255, 0.05)',
    accent: '#8b5cf6'
  };

  const contactPaths = [
    {
      id: 'early-access',
      icon: Sparkles,
      title: 'Get Early Access',
      description: 'Join 500+ researchers already on the waitlist',
      action: 'Join Waitlist',
      details: [
        'First access when we launch in Q2 2025',
        'Exclusive onboarding session',
        'Founding member pricing',
        'Direct input on feature development'
      ]
    },
    {
      id: 'demo',
      icon: Calendar,
      title: 'Book a Demo',
      description: 'See Esy in action with your research team',
      action: 'Schedule Demo',
      details: [
        '30-minute personalized walkthrough',
        'Custom prompt examples for your field',
        'Team collaboration features',
        'Pricing and implementation discussion'
      ]
    },
    {
      id: 'partnership',
      icon: Users,
      title: 'Partner With Us',
      description: 'Integrate Esy into your institution or research',
      action: 'Explore Partnership',
      details: [
        'Institutional licensing',
        'API access and integration',
        'Co-development opportunities',
        'Research collaboration'
      ]
    }
  ];

  const faqs = [
    {
      question: "What exactly is Esy?",
      answer: "Esy is a specialized platform that teaches researchers how to effectively use AI for academic work. We provide prompt engineering education, field-specific templates, and tools to manage your AI-assisted research workflow while maintaining scholarly rigor."
    },
    {
      question: "When are you launching?",
      answer: "We're currently in private beta with select research groups. Public access begins in Q2 2025. Join the waitlist to secure your spot and get exclusive early access benefits."
    },
    {
      question: "How is this different from ChatGPT or Claude?",
      answer: "While those are general-purpose AI tools, Esy is built specifically for academic research. We provide structured workflows, citation management, version control for prompts, and templates designed to maintain scholarly standards."
    },
    {
      question: "What fields do you support?",
      answer: "We currently have specialized templates for STEM fields, social sciences, and humanities. Our prompt engineering principles work across all disciplines, and we're constantly adding field-specific resources based on user feedback."
    },
    {
      question: "Is there a free tier?",
      answer: "Yes! We'll offer a free tier for individual researchers with access to basic features and templates. Institutional plans will include advanced collaboration tools and unlimited usage."
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle submission
  };

  return (
    <div className="origami-headers" style={{
      minHeight: '100vh',
      backgroundColor: currentTheme.bg,
      color: currentTheme.text,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Navigation */}
      <ContactNav scrolled={scrolled} currentTheme={currentTheme} />

      {/* Hero Section - Split Screen */}
      <section style={{ 
        paddingTop: '6rem',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '0 2rem',
          width: '100%'
        }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '6rem',
            alignItems: 'center'
          }}>
            {/* Left Side - Content */}
            <ContactHero 
              currentTheme={currentTheme}
              contactPaths={contactPaths}
              selectedPath={selectedPath}
              setSelectedPath={setSelectedPath}
              setShowForm={setShowForm}
            />

            {/* Right Side - Dynamic Content */}
            <ContactOptionsPanel 
              currentTheme={currentTheme}
              contactPaths={contactPaths}
              selectedPath={selectedPath}
              showForm={showForm}
              setShowForm={setShowForm}
              setSelectedPath={setSelectedPath}
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <ContactFAQ 
        currentTheme={currentTheme}
        faqs={faqs}
        expandedFaq={expandedFaq}
        setExpandedFaq={setExpandedFaq}
        setShowForm={setShowForm}
      />
    </div>
  );
};

export default ContactPage; 