'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  ChevronDown, 
  FileText, 
  Layers, 
  GraduationCap,
  CheckCircle2,
  Shield,
  Sparkles,
  BookOpen,
  Clock
} from 'lucide-react';
import { useScrollHeaderSearch } from '@/hooks/useScrollHeaderSearch';
import './CitationFirstLandingPage.css';

/**
 * CitationFirstLandingPage Component
 * 
 * World-class landing page positioning Esy as a Citation-First Research platform.
 * Visual essays are shown as proof of methodology, not the primary product.
 * 
 * Key messaging:
 * - "Citation-First Research" as a named methodology
 * - Workflows as the product
 * - Trust, rigor, and defensibility as core values
 * 
 * Design: Premium cinematic dark theme with editorial typography
 */

// Placeholder artifacts for showcase
const showcaseArtifacts = [
  {
    title: "The Manhattan Project",
    subtitle: "The Race for Atomic Power",
    category: "History",
    readTime: "12 min",
    sources: 8,
    image: "/images/great-fire/great-fire-london-1675.jpg",
    href: "/essays/history/the-manhattan-project/"
  },
  {
    title: "The Great Fire of London",
    subtitle: "How a City Rose from Ashes",
    category: "History",
    readTime: "10 min",
    sources: 6,
    image: "/images/great-fire/great-fire-london-1675.jpg",
    href: "/essays/history/great-fire-of-london/"
  },
  {
    title: "The Fork",
    subtitle: "A Tool That Changed Civilization",
    category: "Culture",
    readTime: "8 min",
    sources: 5,
    image: "/images/great-fire/great-fire-london-1675.jpg",
    href: "/scrollytelling/the-fork/"
  },
  {
    title: "The History of the Bicycle",
    subtitle: "Two Wheels, Infinite Freedom",
    category: "Technology",
    readTime: "11 min",
    sources: 7,
    image: "/images/great-fire/great-fire-london-1675.jpg",
    href: "/scrollytelling/bicycle-history/"
  }
];

// Workflow definitions
const workflows = [
  {
    id: 'research-pdf',
    icon: FileText,
    title: "Research PDF → Structured Package",
    tagline: "Flagship Workflow",
    description: "Transform academic PDFs into structured, defensible research packages with claims mapped to evidence.",
    outputs: [
      "Clean sectioned analysis",
      "Claim → evidence mapping",
      "Methods summary & limitations",
      "Normalized citations (BibTeX/APA)",
      "QA confidence indicators"
    ],
    accent: "purple"
  },
  {
    id: 'visual-essay',
    icon: Layers,
    title: "Synthesis → Visual Essay",
    tagline: "North Star Artifact",
    description: "Combine multiple research packages into narrative essays with visual storytelling and full traceability.",
    outputs: [
      "Narrative essay structure",
      "Charts, timelines, diagrams",
      "Source-balanced synthesis",
      "Publishable artifact",
      "Full provenance chain"
    ],
    accent: "pink"
  },
  {
    id: 'teaching',
    icon: GraduationCap,
    title: "Teaching Artifacts",
    tagline: "Educational Workflows",
    description: "Create worksheets, flashcards, and quizzes from verified sources with reading level and correctness QA.",
    outputs: [
      "Worksheets & answer keys",
      "Flashcards (Anki-ready)",
      "Quizzes with rubrics",
      "Reading level verified",
      "Curriculum alignment"
    ],
    accent: "amber"
  }
];

// Process steps
const processSteps = [
  {
    number: "01",
    title: "Build a Citation Set",
    description: "Start with PDFs, URLs, or curated references. Sources come first."
  },
  {
    number: "02",
    title: "Extract Claims & Evidence",
    description: "Esy maps assertions to their supporting evidence automatically."
  },
  {
    number: "03",
    title: "Apply Quality Gates",
    description: "Verify source balance, claim coverage, and citation accuracy."
  },
  {
    number: "04",
    title: "Generate Artifacts",
    description: "Produce essays, reports, or teaching materials with full traceability."
  },
  {
    number: "05",
    title: "Publish or Export",
    description: "Share publicly or export for academic and professional use."
  }
];

const CitationFirstLandingPage: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  
  // Show header search when hero scrolls out of view
  useScrollHeaderSearch(heroRef);

  return (
    <div className="citation-first-page">
      {/* ================== HERO SECTION ================== */}
      <section ref={heroRef} className="cf-hero" aria-labelledby="hero-title">
        {/* Atmospheric Background */}
        <div className="cf-hero-background" aria-hidden="true">
          <div className="cf-hero-gradient" />
          <div className="cf-hero-mesh" />
          <div className="cf-hero-noise" />
        </div>

        {/* Hero Content */}
        <div className="cf-hero-content">
          {/* Methodology Badge */}
          <div className="cf-hero-badge">
            <span className="cf-hero-badge-dot" />
            <span>Citation-First Research</span>
          </div>
          
          <h1 id="hero-title" className="cf-hero-title">
            <span className="cf-hero-title-line">You Bring the</span>
            <span className="cf-hero-title-line">
              <span className="cf-hero-title-emphasis">Sources.</span>
            </span>
            <span className="cf-hero-title-line cf-hero-title-secondary">Esy Enforces Rigor.</span>
          </h1>
          
          <p className="cf-hero-subtitle">
            A workflow-based research platform that turns trusted sources into structured, defensible artifacts. 
            Citations first. Always.
          </p>
          
          {/* CTA Group */}
          <div className="cf-hero-cta-group">
            <Link href="/agentic-workflows/" className="cf-hero-cta-primary">
              <span>Start a Workflow</span>
              <ArrowRight size={18} />
            </Link>
            <Link href="/essays/" className="cf-hero-cta-secondary">
              <span>Explore Artifacts</span>
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="cf-hero-trust">
            <div className="cf-hero-trust-item">
              <Shield size={16} />
              <span>Source-verified</span>
            </div>
            <div className="cf-hero-trust-item">
              <CheckCircle2 size={16} />
              <span>QA gates enforced</span>
            </div>
            <div className="cf-hero-trust-item">
              <Sparkles size={16} />
              <span>Publishable output</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="cf-scroll-indicator" aria-hidden="true">
          <span>Discover</span>
          <ChevronDown className="cf-scroll-arrow" />
        </div>
      </section>

      {/* ================== WHY CITATION-FIRST SECTION ================== */}
      <section className="cf-why-section" aria-labelledby="why-title">
        <div className="cf-why-container">
          <div className="cf-why-header">
            <span className="cf-section-eyebrow">The Esy Approach</span>
            <h2 id="why-title" className="cf-why-title">
              Why <span className="cf-gradient-text">Citation-First?</span>
            </h2>
            <p className="cf-why-description">
              Most AI tools are generation-first: they produce text immediately, citations optional. 
              The result? Outputs that are hard to trust, hard to verify, and hard to defend.
            </p>
          </div>

          <div className="cf-why-comparison">
            {/* Generation-First Column */}
            <div className="cf-why-column cf-why-column-generation">
              <div className="cf-why-column-header">
                <span className="cf-why-column-label cf-label-muted">Generation-First Tools</span>
              </div>
              <ul className="cf-why-list">
                <li className="cf-why-list-item cf-why-item-negative">
                  <span className="cf-why-icon">×</span>
                  <span>Text first, sources optional</span>
                </li>
                <li className="cf-why-list-item cf-why-item-negative">
                  <span className="cf-why-icon">×</span>
                  <span>Citations bolted on after</span>
                </li>
                <li className="cf-why-list-item cf-why-item-negative">
                  <span className="cf-why-icon">×</span>
                  <span>No provenance chain</span>
                </li>
                <li className="cf-why-list-item cf-why-item-negative">
                  <span className="cf-why-icon">×</span>
                  <span>Hallucination risk</span>
                </li>
              </ul>
            </div>

            {/* Citation-First Column */}
            <div className="cf-why-column cf-why-column-citation">
              <div className="cf-why-column-header">
                <span className="cf-why-column-label cf-label-accent">Esy: Citation-First</span>
              </div>
              <ul className="cf-why-list">
                <li className="cf-why-list-item cf-why-item-positive">
                  <span className="cf-why-icon">✓</span>
                  <span>Sources come first</span>
                </li>
                <li className="cf-why-list-item cf-why-item-positive">
                  <span className="cf-why-icon">✓</span>
                  <span>Claims bound to evidence</span>
                </li>
                <li className="cf-why-list-item cf-why-item-positive">
                  <span className="cf-why-icon">✓</span>
                  <span>Artifacts inherit provenance</span>
                </li>
                <li className="cf-why-list-item cf-why-item-positive">
                  <span className="cf-why-icon">✓</span>
                  <span>QA gates are explicit</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="cf-why-tagline">
            <strong>Citation-First Research</strong> is our methodology: no synthesis without a verified citation set.
          </p>
        </div>
      </section>

      {/* ================== WORKFLOWS SECTION ================== */}
      <section className="cf-workflows-section" aria-labelledby="workflows-title">
        <div className="cf-workflows-container">
          <div className="cf-workflows-header">
            <span className="cf-section-eyebrow">The Product</span>
            <h2 id="workflows-title" className="cf-workflows-title">
              Start with a <span className="cf-gradient-text">Workflow</span>
            </h2>
            <p className="cf-workflows-description">
              Three pathways to transform sources into defensible artifacts. 
              Each workflow enforces rigor through structured quality gates.
            </p>
          </div>

          <div className="cf-workflows-grid">
            {workflows.map((workflow) => (
              <div 
                key={workflow.id} 
                className={`cf-workflow-card cf-workflow-card--${workflow.accent}`}
              >
                <div className="cf-workflow-header">
                  <div className={`cf-workflow-icon cf-workflow-icon--${workflow.accent}`}>
                    <workflow.icon size={24} />
                  </div>
                  <span className="cf-workflow-tagline">{workflow.tagline}</span>
                </div>
                
                <h3 className="cf-workflow-title">{workflow.title}</h3>
                <p className="cf-workflow-description">{workflow.description}</p>
                
                <div className="cf-workflow-outputs">
                  <span className="cf-workflow-outputs-label">Outputs:</span>
                  <ul className="cf-workflow-outputs-list">
                    {workflow.outputs.map((output, index) => (
                      <li key={index} className="cf-workflow-output-item">
                        <CheckCircle2 size={12} />
                        <span>{output}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link 
                  href="/agentic-workflows/" 
                  className={`cf-workflow-cta cf-workflow-cta--${workflow.accent}`}
                >
                  <span>Start Workflow</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================== ARTIFACTS SECTION ================== */}
      <section className="cf-artifacts-section" aria-labelledby="artifacts-title">
        <div className="cf-artifacts-container">
          <div className="cf-artifacts-header">
            <span className="cf-section-eyebrow">Proof of Method</span>
            <h2 id="artifacts-title" className="cf-artifacts-title">
              What It <span className="cf-gradient-text">Produces</span>
            </h2>
            <p className="cf-artifacts-description">
              Visual essays are artifacts produced by Citation-First workflows. 
              Each one is built from verified sources with full traceability.
            </p>
          </div>

          <div className="cf-artifacts-grid">
            {showcaseArtifacts.map((artifact, index) => (
              <Link 
                key={index} 
                href={artifact.href}
                className="cf-artifact-card"
              >
                <div className="cf-artifact-image">
                  <Image
                    src={artifact.image}
                    alt={artifact.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="cf-artifact-overlay" />
                </div>
                
                <div className="cf-artifact-content">
                  <span className="cf-artifact-category">{artifact.category}</span>
                  <h3 className="cf-artifact-title">{artifact.title}</h3>
                  <p className="cf-artifact-subtitle">{artifact.subtitle}</p>
                  
                  <div className="cf-artifact-meta">
                    <span className="cf-artifact-meta-item">
                      <BookOpen size={12} />
                      {artifact.sources} sources
                    </span>
                    <span className="cf-artifact-meta-item">
                      <Clock size={12} />
                      {artifact.readTime}
                    </span>
                    <span className="cf-artifact-meta-badge">QA Passed</span>
                  </div>
                </div>

                <div className="cf-artifact-hover-cta">
                  <span>Read Essay</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>

          <div className="cf-artifacts-footer">
            <Link href="/essays/" className="cf-artifacts-view-all">
              <span>Explore All Essays</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================== HOW IT WORKS SECTION ================== */}
      <section className="cf-process-section" aria-labelledby="process-title">
        <div className="cf-process-container">
          <div className="cf-process-header">
            <span className="cf-section-eyebrow">The Method</span>
            <h2 id="process-title" className="cf-process-title">
              How It <span className="cf-gradient-text">Works</span>
            </h2>
          </div>

          <div className="cf-process-steps">
            <div className="cf-process-line" aria-hidden="true" />
            
            {processSteps.map((step, index) => (
              <div key={index} className="cf-process-step">
                <div className="cf-process-number">{step.number}</div>
                <h3 className="cf-process-step-title">{step.title}</h3>
                <p className="cf-process-step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================== TRUST SECTION ================== */}
      <section className="cf-trust-section" aria-labelledby="trust-title">
        <div className="cf-trust-container">
          <div className="cf-trust-content">
            <span className="cf-section-eyebrow">Trust & Rigor</span>
            <h2 id="trust-title" className="cf-trust-title">
              Built for <span className="cf-gradient-text">Defensibility</span>
            </h2>
            <p className="cf-trust-description">
              Every artifact carries its provenance. Every claim traces to evidence. 
              This is research you can stand behind.
            </p>
          </div>

          <div className="cf-trust-features">
            <div className="cf-trust-feature">
              <div className="cf-trust-feature-icon">
                <Shield size={24} />
              </div>
              <h3 className="cf-trust-feature-title">Full Traceability</h3>
              <p className="cf-trust-feature-description">
                Every claim links to its source. Provenance is preserved from input to output.
              </p>
            </div>

            <div className="cf-trust-feature">
              <div className="cf-trust-feature-icon">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="cf-trust-feature-title">Explicit QA Gates</h3>
              <p className="cf-trust-feature-description">
                Source balance, claim coverage, and citation accuracy are verified automatically.
              </p>
            </div>

            <div className="cf-trust-feature">
              <div className="cf-trust-feature-icon">
                <Sparkles size={24} />
              </div>
              <h3 className="cf-trust-feature-title">Publication Ready</h3>
              <p className="cf-trust-feature-description">
                Outputs are formatted for academic, professional, and public sharing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================== FINAL CTA SECTION ================== */}
      <section className="cf-final-cta-section" aria-labelledby="final-cta-title">
        <div className="cf-final-cta-background" aria-hidden="true" />
        
        <div className="cf-final-cta-container">
          <h2 id="final-cta-title" className="cf-final-cta-title">
            Ready to Work With <span className="cf-gradient-text">Real Sources?</span>
          </h2>
          <p className="cf-final-cta-description">
            Start with PDFs or build a citation set. Let Esy handle the rigor.
          </p>
          
          <div className="cf-final-cta-buttons">
            <Link href="/agentic-workflows/" className="cf-final-cta-primary">
              <span>Start a Workflow</span>
              <ArrowRight size={18} />
            </Link>
            <Link href="/docs/" className="cf-final-cta-secondary">
              <span>Learn More</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CitationFirstLandingPage;
