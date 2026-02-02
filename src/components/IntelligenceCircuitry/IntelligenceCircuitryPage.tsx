'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, FileText, Layers, BarChart3, FileSpreadsheet } from 'lucide-react';
import CircuitCanvas from './CircuitCanvas';
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
    gateSymbol: '∧',
    accent: 'purple',
  },
  {
    id: 'research-brief',
    title: 'Research Brief',
    description: 'Synthesized findings from multiple sources. Key insights extracted and organized.',
    timeSaved: '~20 min',
    automates: ['Synthesis', 'Key Findings', 'Sources'],
    icon: FileSpreadsheet,
    gateSymbol: '∨',
    accent: 'blue',
  },
  {
    id: 'visual-essay',
    title: 'Visual Essay',
    description: 'Interactive narrative with data visualizations and scroll-driven storytelling.',
    timeSaved: '~30 min',
    automates: ['Narrative', 'Visuals', 'Flow'],
    icon: Layers,
    gateSymbol: '⊕',
    accent: 'pink',
  },
  {
    id: 'infographic',
    title: 'Infographic',
    description: 'Data-driven visual summary. Facts verified, layout optimized for clarity.',
    timeSaved: '~25 min',
    automates: ['Data Viz', 'Layout', 'Fact Check'],
    icon: BarChart3,
    gateSymbol: '≡',
    accent: 'amber',
  },
];

// Quality gates for the pipeline section
const qualityGates = [
  {
    symbol: '∧',
    name: 'Evidence Gate',
    description: 'Every claim requires supporting source',
  },
  {
    symbol: '∨',
    name: 'Structure Gate',
    description: 'Argument flow validated against template',
  },
  {
    symbol: '¬',
    name: 'Citation Gate',
    description: 'No unsourced assertions pass through',
  },
  {
    symbol: '≡',
    name: 'Consistency Gate',
    description: 'Style and voice remain coherent',
  },
];

// Process steps
const processSteps = [
  { number: '01', title: 'Choose Template', description: 'Select the artifact type you need' },
  { number: '02', title: 'Provide Intake', description: 'Add your sources and parameters' },
  { number: '03', title: 'QA Gates Run', description: 'Esy verifies claims and structure' },
  { number: '04', title: 'Get Artifact', description: 'Publish-ready, fully sourced output' },
];

// Sample artifacts for gallery
const sampleArtifacts = [
  {
    title: 'The Manhattan Project',
    type: 'Visual Essay',
    sources: 8,
    readTime: '12 min',
    image: '/images/manhattan-project/trinity-gadget-assembled.jpg',
    href: '/essays/history/the-manhattan-project/',
  },
  {
    title: 'The History of Soda',
    type: 'Visual Essay',
    sources: 12,
    readTime: '15 min',
    image: '/og/the-complete-history-of-soda.png',
    href: '/essays/history/the-complete-history-of-soda/',
  },
  {
    title: 'The Word Robot',
    type: 'Visual Essay',
    sources: 8,
    readTime: '10 min',
    image: '/images/robot/robot-hero.jpg',
    href: '/essays/etymology/the-word-robot/',
  },
];

const IntelligenceCircuitryPage: React.FC = () => {
  return (
    <div className="ic-page">
      {/* ══════════════════════════════════════════════════════════════
          HERO SECTION
          Left: Headline + CTAs | Right: Circuit Visual
          ══════════════════════════════════════════════════════════════ */}
      <section className="ic-hero">
        <div className="ic-hero-background">
          <div className="ic-hero-gradient" />
          <div className="ic-hero-grid" />
        </div>

        <div className="ic-hero-container flex items-center justify-center px-4 lg:px-8 pt-24 lg:pt-36 pb-16 lg:pb-24">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full max-w-[1400px] items-center">
            <div className="flex-1 text-white order-2 lg:order-1 text-center lg:text-left">
              {/* Eyebrow */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.15)', borderRadius: '24px', fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8b5cf6', marginBottom: '24px' }}>
                <span style={{ width: '8px', height: '8px', background: '#8b5cf6', borderRadius: '50%' }} />
                <span>Template-Driven Research Engine</span>
              </div>

              {/* Headline */}
              <h1 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '24px', color: '#fafafa' }}>
                <span style={{ display: 'block' }}>Choose a template.</span>
                <span style={{ display: 'block', background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Get a publishable artifact.</span>
              </h1>

              {/* Subheadline */}
              <p style={{ fontSize: '1.125rem', lineHeight: 1.7, color: '#e4e4e7', marginBottom: '32px' }}>
                Esy routes your sources through quality gates—verifying claims, 
                enforcing structure, and producing defensible artifacts you can 
                actually stand behind.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <a 
                  href="https://app.esy.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 24px', background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)', color: '#fff', fontWeight: 600, fontSize: '0.9375rem', borderRadius: '10px', textDecoration: 'none' }}
                >
                  <span>Start with a Template</span>
                  <ArrowRight size={18} />
                </a>
                <Link href="#templates" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '14px 24px', background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.2)', color: '#fafafa', fontWeight: 600, fontSize: '0.9375rem', borderRadius: '10px', textDecoration: 'none' }}>
                  <span>See Templates</span>
                </Link>
              </div>
            </div>

            {/* Circuit Visual */}
            <div className="flex-1 flex justify-center items-center order-1 lg:order-2 max-w-[350px] lg:max-w-none mx-auto lg:mx-0">
              <CircuitCanvas />
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
                  <span className="ic-template-gate">{template.gateSymbol}</span>
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
          HOW IT WORKS / QUALITY GATES
          ══════════════════════════════════════════════════════════════ */}
      <section className="ic-process-section">
        <div className="ic-section-container">
          <div className="ic-section-header">
            <span className="ic-section-eyebrow">How It Works</span>
            <h2 className="ic-section-title">
              Intelligence flows through <span className="ic-gradient-text">quality gates</span>
            </h2>
          </div>

          {/* Process Steps */}
          <div className="ic-process-steps">
            <div className="ic-process-line" />
            {processSteps.map((step, index) => (
              <div key={step.number} className="ic-process-step">
                <div className="ic-process-node">
                  <span className="ic-process-number">{step.number}</span>
                </div>
                <h3 className="ic-process-title">{step.title}</h3>
                <p className="ic-process-description">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Quality Gates */}
          <div className="ic-gates-container">
            <div className="ic-gates-header">
              <span className="ic-gates-label">Quality Gates</span>
              <p className="ic-gates-tagline">
                Every artifact passes through verification before output
              </p>
            </div>
            <div className="ic-gates-grid">
              {qualityGates.map((gate) => (
                <div key={gate.name} className="ic-gate-card">
                  <div className="ic-gate-symbol">{gate.symbol}</div>
                  <div className="ic-gate-content">
                    <h4 className="ic-gate-name">{gate.name}</h4>
                    <p className="ic-gate-description">{gate.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          TRUST STRIP
          ══════════════════════════════════════════════════════════════ */}
      <section className="ic-trust-section">
        <div className="ic-trust-container">
          <p className="ic-trust-headline">
            &ldquo;Sources tracked. Claims checked. Structure enforced.&rdquo;
          </p>
          <div className="ic-trust-stats">
            <div className="ic-trust-stat">
              <span className="ic-trust-stat-value">12+</span>
              <span className="ic-trust-stat-label">Sources Indexed</span>
            </div>
            <div className="ic-trust-divider" />
            <div className="ic-trust-stat">
              <span className="ic-trust-stat-value">8</span>
              <span className="ic-trust-stat-label">Claims Verified</span>
            </div>
            <div className="ic-trust-divider" />
            <div className="ic-trust-stat">
              <span className="ic-trust-stat-value">94%</span>
              <span className="ic-trust-stat-label">QA Score</span>
            </div>
          </div>
        </div>
      </section>

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
            {sampleArtifacts.map((artifact, index) => (
              <Link
                key={index}
                href={artifact.href}
                className="ic-artifact-card"
              >
                <div className="ic-artifact-image">
                  <Image
                    src={artifact.image}
                    alt={artifact.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="ic-artifact-overlay" />
                </div>
                <div className="ic-artifact-content">
                  <span className="ic-artifact-type">{artifact.type}</span>
                  <h3 className="ic-artifact-title">{artifact.title}</h3>
                  <div className="ic-artifact-meta">
                    <span>{artifact.sources} sources</span>
                    <span>•</span>
                    <span>{artifact.readTime}</span>
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
