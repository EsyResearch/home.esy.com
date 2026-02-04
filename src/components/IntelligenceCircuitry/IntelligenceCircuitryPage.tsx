'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, FileText, Layers, BarChart3, FileSpreadsheet, Clock, Sun, Moon } from 'lucide-react';
import CircuitCanvas from './CircuitCanvas';
import { publishedVisualEssays, CATEGORY_COLORS, type VisualEssay } from '@/data/visualEssays';
import './IntelligenceCircuitryPage.css';

/**
 * Intelligence Circuitry Homepage
 * 
 * A flagship brand moment: "The Canva of defensible knowledge work"
 * with a systems/circuits visual metaphor.
 * 
 * Visual language:
 * - Circuit traces (thin conductive lines)
 * - Nodes with ports (templates, tools, gates)
 * - Signal pulses (intelligence propagation)
 * - Quality gates (logic gate glyphs)
 */

// Template definitions with circuit-inspired icons
const templates = [
  {
    id: 'academic-essay',
    title: 'Academic Essay',
    description: 'Structured argument with thesis, evidence, and analysis. Full citation chain.',
    timeSaved: '~15 min',
    automates: ['Research', 'Structure', 'Citations'],
    icon: FileText,
    accent: 'purple',
  },
  {
    id: 'research-brief',
    title: 'Research Brief',
    description: 'Synthesized findings from multiple sources. Key insights extracted and organized.',
    timeSaved: '~20 min',
    automates: ['Synthesis', 'Key Findings', 'Sources'],
    icon: FileSpreadsheet,
    accent: 'blue',
  },
  {
    id: 'visual-essay',
    title: 'Visual Essay',
    description: 'Interactive narrative with data visualizations and scroll-driven storytelling.',
    timeSaved: '~30 min',
    automates: ['Narrative', 'Visuals', 'Flow'],
    icon: Layers,
    accent: 'pink',
  },
  {
    id: 'infographic',
    title: 'Infographic',
    description: 'Data-driven visual summary. Facts verified, layout optimized for clarity.',
    timeSaved: '~25 min',
    automates: ['Data Viz', 'Layout', 'Fact Check'],
    icon: BarChart3,
    accent: 'amber',
  },
];

// How It Works - simplified to core value props
const howItWorksSteps = [
  { 
    number: '01', 
    title: 'Pick a Template',
    description: 'Essay, visual narrative, research brief, or infographic.'
  },
  { 
    number: '02', 
    title: 'Add Your Sources',
    description: 'PDFs, citations, notes — Esy uses only what you provide.'
  },
  { 
    number: '03', 
    title: 'Verified Output',
    description: 'Every claim traced to a source. Every source cited.'
  },
  { 
    number: '04', 
    title: 'Publish or Export',
    description: 'Download, share, or keep editing. It\'s yours.'
  },
];

// Featured artifacts for gallery - using essay data with source counts
const FEATURED_ESSAY_IDS = ['the-manhattan-project', 'the-complete-history-of-soda', 'the-word-robot'];

// Source counts for trust metadata (per artifact)
const ARTIFACT_SOURCE_COUNTS: Record<string, number> = {
  'the-manhattan-project': 7,
  'the-complete-history-of-soda': 12,
  'the-word-robot': 9,
};

const featuredArtifacts = FEATURED_ESSAY_IDS
  .map(id => publishedVisualEssays.find(e => e.id === id))
  .filter((e): e is VisualEssay => e !== undefined);

/**
 * Get the hero image for an essay with fallback chain:
 * 1. heroImage (if defined in data)
 * 2. OG image at /og/[slug].png
 */
const getEssayImage = (essay: VisualEssay): string => {
  if (essay.heroImage) return essay.heroImage;
  const slug = essay.href.split('/').pop();
  if (slug) return `/og/${slug}.png`;
  return '/og/default.png';
};

/**
 * HowItWorksSection Component
 * 
 * Clean, minimal 4-step process visualization.
 * Responsive: 4 columns on desktop, 2 on tablet, 1 on mobile.
 */
const HowItWorksSection: React.FC = () => {
  return (
    <section className="ic-hiw-section">
      <div className="ic-hiw-container">
        {/* Header */}
        <div className="ic-hiw-header">
          <span className="ic-hiw-eyebrow">How It Works</span>
          <h2 className="ic-hiw-title">Four steps to defensible work</h2>
        </div>

        {/* Steps Grid */}
        <div className="ic-hiw-grid">
          {howItWorksSteps.map((step) => (
            <div key={step.number} className="ic-hiw-step">
              <div className="ic-hiw-step-number">{step.number}</div>
              <h3 className="ic-hiw-step-title">{step.title}</h3>
              <p className="ic-hiw-step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const IntelligenceCircuitryPage: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  // Toggle theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`ic-page ${theme === 'light' ? 'ic-page--light' : ''}`}>
      {/* Theme Toggle Button */}
      <button 
        onClick={toggleTheme}
        className="ic-theme-toggle"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 100,
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: theme === 'light' ? '1px solid rgba(28, 25, 23, 0.1)' : '1px solid rgba(255, 255, 255, 0.1)',
          background: theme === 'light' ? '#ffffff' : '#1f1f23',
          color: theme === 'light' ? '#1c1917' : '#fafafa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: theme === 'light' 
            ? '0 4px 12px rgba(28, 25, 23, 0.1)' 
            : '0 4px 12px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      {/* ══════════════════════════════════════════════════════════════
          HERO SECTION
          Left: Headline + CTAs | Right: Circuit Visual
          ══════════════════════════════════════════════════════════════ */}
      <section className="ic-hero">
        <div className="ic-hero-background">
          <div className="ic-hero-gradient" />
          <div className="ic-hero-grid" />
        </div>

        <div className="ic-hero-container flex items-center justify-center px-4 lg:px-8 pt-16 lg:pt-36 pb-12 lg:pb-24">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 w-full max-w-[1400px] items-center">
            <div className="flex-1 text-white order-1 text-center lg:text-left">
              {/* Headline */}
              <h1 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '24px', color: '#fafafa' }}>
                <span style={{ display: 'block' }}>Choose a template.</span>
                <span style={{ display: 'block', background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Get a publishable artifact.</span>
              </h1>

              {/* Subheadline */}
              <p style={{ fontSize: '1.125rem', lineHeight: 1.7, color: 'rgba(250, 250, 250, 0.7)', marginBottom: '32px' }}>
                Start from real sources — PDFs, citations, or notes — and use citation-first templates to produce structured, publishable research artifacts.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <a 
                  href="https://app.esy.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 24px', background: '#9a3412', color: '#fafafa', fontWeight: 600, fontSize: '0.9375rem', borderRadius: '10px', textDecoration: 'none' }}
                >
                  <span>Start with a Template</span>
                  <ArrowRight size={18} />
                </a>
                <Link href="/essays/" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '14px 24px', background: 'rgba(154, 52, 18, 0.12)', border: '1px solid rgba(154, 52, 18, 0.25)', color: '#fafafa', fontWeight: 600, fontSize: '0.9375rem', borderRadius: '10px', textDecoration: 'none' }}>
                  <span>Explore Artifacts</span>
                </Link>
              </div>
            </div>

            {/* Circuit Visual - Desktop only */}
            <div className="flex-1 justify-center items-center order-2 hidden lg:flex">
              <CircuitCanvas theme={theme} />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="ic-scroll-indicator">
          <span>How it works</span>
          <div className="ic-scroll-line" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          TEMPLATE GRID SECTION
          ══════════════════════════════════════════════════════════════ */}
      <section id="templates" className="ic-templates-section">
        <div className="ic-section-container">
          <div className="ic-section-header">
            <span className="ic-section-eyebrow">Pick a Template</span>
            <h2 className="ic-section-title">
              Every artifact starts with <span className="ic-gradient-text">structure</span>
            </h2>
            <p className="ic-section-description">
              Templates define the shape of your output. Esy handles the research, 
              citations, and quality checks automatically.
            </p>
          </div>

          <div className="ic-templates-grid">
            {templates.map((template) => (
              <a
                key={template.id}
                href="https://app.esy.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`ic-template-card ic-template-card--${template.accent}`}
              >
                <div className="ic-template-header">
                  <div className={`ic-template-icon ic-template-icon--${template.accent}`}>
                    <template.icon size={24} />
                  </div>
                </div>
                
                <h3 className="ic-template-title">{template.title}</h3>
                <p className="ic-template-description">{template.description}</p>
                
                <div className="ic-template-meta">
                  <span className="ic-template-time">⏱ {template.timeSaved}</span>
                  <span className="ic-template-divider">•</span>
                  <span className="ic-template-automates">
                    Automates: {template.automates.join(', ')}
                  </span>
                </div>

                <div className="ic-template-hover-cta">
                  <span>Use Template</span>
                  <ArrowRight size={14} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          HOW IT WORKS SECTION (Redesigned)
          ══════════════════════════════════════════════════════════════ */}
      <HowItWorksSection />

      {/* ══════════════════════════════════════════════════════════════
          ARTIFACT GALLERY
          ══════════════════════════════════════════════════════════════ */}
      <section className="ic-gallery-section">
        <div className="ic-section-container">
          <div className="ic-section-header">
            <span className="ic-section-eyebrow">Proof of Method</span>
            <h2 className="ic-section-title">
              Artifacts built from <span className="ic-gradient-text">real sources</span>
            </h2>
            <p className="ic-section-description">
              Every visual essay carries its provenance. Every claim traces to evidence.
            </p>
          </div>

          <div className="ic-gallery-grid">
            {featuredArtifacts.map((essay) => (
              <Link
                key={essay.id}
                href={essay.href}
                className="ic-artifact-card"
              >
                {/* Hero Image */}
                <div className="ic-artifact-image">
                  <Image
                    src={getEssayImage(essay)}
                    alt={essay.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    unoptimized
                  />
                  <div className="ic-artifact-overlay" />
                </div>
                {/* Content */}
                <div className="ic-artifact-content">
                  <div className="ic-artifact-header">
                    <span 
                      className="ic-artifact-category"
                      style={{ color: CATEGORY_COLORS[essay.category] }}
                    >
                      {essay.category}
                    </span>
                    <span className="ic-artifact-badge">Artifact</span>
                    {essay.isNew && <span className="ic-artifact-new">New</span>}
                  </div>
                  <h3 className="ic-artifact-title">{essay.title}</h3>
                  <p className="ic-artifact-subtitle">{essay.subtitle}</p>
                  <div className="ic-artifact-meta">
                    <Clock size={12} />
                    <span>{essay.readTime}</span>
                    <ArrowRight size={12} className="ic-artifact-arrow" />
                  </div>
                  <div className="ic-artifact-trust">
                    <span className="ic-trust-sources">
                      <span className="ic-trust-count">{ARTIFACT_SOURCE_COUNTS[essay.id] || 0}</span>
                      <span className="ic-trust-label">sources</span>
                    </span>
                    <span className="ic-trust-divider" />
                    <span className="ic-trust-qa">
                      <span className="ic-trust-check">✓</span>
                      <span className="ic-trust-label">QA passed</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="ic-gallery-footer">
            <Link href="/essays/" className="ic-gallery-link">
              <span>View all artifacts</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FINAL CTA
          ══════════════════════════════════════════════════════════════ */}
      <section className="ic-final-cta-section">
        <div className="ic-final-cta-background" />
        <div className="ic-final-cta-container">
          <h2 className="ic-final-cta-headline">
            Ready to build something <span className="ic-gradient-text">defensible?</span>
          </h2>
          <p className="ic-final-cta-description">
            Start with a template. Add your sources. Let Esy handle the rigor.
          </p>
          <div className="ic-final-cta-buttons">
            <a 
              href="https://app.esy.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ic-cta-primary ic-cta-primary--large"
            >
              <span>Start with a Template</span>
              <ArrowRight size={20} />
            </a>
            <Link href="/essays/" className="ic-cta-secondary">
              <span>Explore Artifacts</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntelligenceCircuitryPage;
