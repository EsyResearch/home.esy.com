'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './artifact-detail.css';

/* ═══════════════════════════════════════════════════════════════
   Artifact Detail Wrapper — Inside a Black Hole
   
   Presents the essay as an artifact with metadata, spec access,
   and an immersive mode toggle. The default view is the artifact
   detail page; immersive mode recreates the current chromeless
   reading experience.
   
   Architecture:
   - Artifact Mode: Metadata hero + spec panel + framed essay + footer
   - Immersive Mode: Chromeless essay with floating exit button
   
   SSR Safety: All window/document access guarded with typeof checks.
   ═══════════════════════════════════════════════════════════════ */

const ESSAY_META = {
  title: 'Inside a Black Hole',
  subtitle: 'What physics actually tells us about the most extreme object in the universe',
  category: 'Science',
  subcategory: 'Physics',
  readTime: '25 min',
  sourceCount: 16,
  sourceTier: 'Tier-1',
  sectionCount: 9,
  visualizationCount: 7,
  designSystem: 'Subject-derived',
  published: 'February 8, 2026',
  model: 'Claude Opus 4.6',
  template: 'Visual Essay',
  palette: [
    { name: 'EHT Gold', color: '#c4922a' },
    { name: 'Lensing Blue', color: '#3d7ec7' },
    { name: 'Quantum Violet', color: '#6b4fa0' },
    { name: 'Horizon Teal', color: '#1a9e8f' },
    { name: 'Danger Red', color: '#b5382a' },
  ],
  visualizations: [
    { name: 'EHT Ring', type: 'Annotated CSS' },
    { name: 'Observer Duality', type: 'Split-screen' },
    { name: 'Horizon Crossing', type: 'Scroll-triggered' },
    { name: 'Spacetime Curvature', type: 'Three.js 3D' },
    { name: 'Tidal Comparison', type: 'Data Cards + SVG' },
    { name: 'Penrose Diagram', type: 'Interactive SVG' },
    { name: 'Information Flow', type: 'Programmatic SVG' },
  ],
  keySources: [
    'Penrose (1965)',
    'Hawking (1975)',
    'EHT Collaboration (2019)',
    'Schwarzschild (1916)',
  ],
};

/* ─── SVG Icons ───────────────────────────────────────────────── */
function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CollapseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 2v4H1M11 2v4h4M11 14v-4h4M5 14v-4H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Main Wrapper ────────────────────────────────────────────── */
export default function ArtifactDetailWrapper({ children }) {
  const [immersiveMode, setImmersiveMode] = useState(false);
  const [specExpanded, setSpecExpanded] = useState(false);

  // Escape key exits immersive mode
  useEffect(() => {
    if (!immersiveMode) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setImmersiveMode(false);
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [immersiveMode]);

  // Scroll to essay content when entering artifact mode from immersive
  useEffect(() => {
    if (!immersiveMode && typeof window !== 'undefined') {
      // Small delay to allow DOM to settle
      const t = setTimeout(() => {
        const el = document.getElementById('artifact-essay-content');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return () => clearTimeout(t);
    }
  }, [immersiveMode]);

  /* ─── Immersive Mode ─── */
  if (immersiveMode) {
    return (
      <div className="ad-immersive">
        <button
          className="ad-immersive__exit"
          onClick={() => setImmersiveMode(false)}
          aria-label="Exit immersive mode"
          title="Exit immersive mode (Esc)"
        >
          <CollapseIcon />
          <span className="ad-immersive__exit-text">Exit</span>
        </button>
        {children}
      </div>
    );
  }

  /* ─── Artifact Detail Mode ─── */
  return (
    <div className="ad-page">
      {/* ─── Toolbar ─── */}
      <header className="ad-toolbar">
        <Link href="/essays" className="ad-toolbar__back">
          <ChevronLeftIcon />
          <span>Essays</span>
        </Link>
        <div className="ad-toolbar__right">
          <span className="ad-toolbar__badge" style={{ '--badge-color': '#10B981' }}>
            {ESSAY_META.category}
          </span>
          <span className="ad-toolbar__badge ad-toolbar__badge--sub">
            {ESSAY_META.subcategory}
          </span>
          <button
            className="ad-toolbar__immersive"
            onClick={() => setImmersiveMode(true)}
            aria-label="Enter immersive reading mode"
          >
            <ExpandIcon />
            <span className="ad-toolbar__immersive-label">Immersive Mode</span>
          </button>
        </div>
      </header>

      {/* ─── Artifact Hero ─── */}
      <section className="ad-hero">
        <div className="ad-hero__inner">
          <div className="ad-hero__provenance">
            <span className="ad-hero__provenance-line" aria-hidden="true" />
            <span className="ad-hero__provenance-text">
              <span className="ad-hero__provenance-type">Artifact</span>
              <span className="ad-hero__provenance-sep" aria-hidden="true">·</span>
              <span className="ad-hero__provenance-template">{ESSAY_META.template}</span>
            </span>
            <span className="ad-hero__provenance-line" aria-hidden="true" />
          </div>
          <h1 className="ad-hero__title">{ESSAY_META.title}</h1>
          <p className="ad-hero__subtitle">{ESSAY_META.subtitle}</p>
          <div className="ad-hero__meta">
            <span className="ad-hero__meta-item">
              <span className="ad-hero__meta-value">{ESSAY_META.readTime}</span>
              <span className="ad-hero__meta-label">read</span>
            </span>
            <span className="ad-hero__meta-dot" aria-hidden="true" />
            <span className="ad-hero__meta-item">
              <span className="ad-hero__meta-value">{ESSAY_META.sourceCount}</span>
              <span className="ad-hero__meta-label">{ESSAY_META.sourceTier} sources</span>
            </span>
            <span className="ad-hero__meta-dot" aria-hidden="true" />
            <span className="ad-hero__meta-item">
              <span className="ad-hero__meta-value">{ESSAY_META.sectionCount}</span>
              <span className="ad-hero__meta-label">sections</span>
            </span>
            <span className="ad-hero__meta-dot" aria-hidden="true" />
            <span className="ad-hero__meta-item">
              <span className="ad-hero__meta-value">{ESSAY_META.visualizationCount}</span>
              <span className="ad-hero__meta-label">visualizations</span>
            </span>
          </div>
          <div className="ad-hero__actions">
            <a href="#artifact-essay-content" className="ad-hero__cta ad-hero__cta--primary">
              Read Essay
            </a>
            <button
              className="ad-hero__cta ad-hero__cta--secondary"
              onClick={() => setImmersiveMode(true)}
            >
              <ExpandIcon />
              Immersive Mode
            </button>
          </div>
        </div>
      </section>

      {/* ─── Spec Panel ─── */}
      <section className="ad-spec">
        <div className="ad-spec__inner">
          <button
            className="ad-spec__toggle"
            onClick={() => setSpecExpanded(!specExpanded)}
            aria-expanded={specExpanded}
          >
            <span className="ad-spec__toggle-label">Artifact Spec</span>
            <svg
              className={`ad-spec__toggle-icon ${specExpanded ? 'ad-spec__toggle-icon--open' : ''}`}
              width="12" height="12" viewBox="0 0 12 12" fill="none"
            >
              <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className={`ad-spec__content ${specExpanded ? 'ad-spec__content--open' : ''}`}>
            {/* Metadata Grid */}
            <div className="ad-spec__grid">
              <div className="ad-spec__card">
                <div className="ad-spec__card-label">Template</div>
                <div className="ad-spec__card-value">{ESSAY_META.template}</div>
              </div>
              <div className="ad-spec__card">
                <div className="ad-spec__card-label">Design System</div>
                <div className="ad-spec__card-value">{ESSAY_META.designSystem}</div>
              </div>
              <div className="ad-spec__card">
                <div className="ad-spec__card-label">Published</div>
                <div className="ad-spec__card-value">{ESSAY_META.published}</div>
              </div>
              <div className="ad-spec__card">
                <div className="ad-spec__card-label">Model</div>
                <div className="ad-spec__card-value">{ESSAY_META.model}</div>
              </div>
              <div className="ad-spec__card">
                <div className="ad-spec__card-label">Source Quality</div>
                <div className="ad-spec__card-value">{ESSAY_META.sourceCount} {ESSAY_META.sourceTier}</div>
              </div>
            </div>

            {/* Palette */}
            <div className="ad-spec__section">
              <div className="ad-spec__section-label">Color Palette</div>
              <div className="ad-spec__palette">
                {ESSAY_META.palette.map(p => (
                  <div key={p.name} className="ad-spec__palette-chip">
                    <span className="ad-spec__palette-swatch" style={{ background: p.color }} />
                    <span className="ad-spec__palette-name">{p.name}</span>
                    <span className="ad-spec__palette-hex">{p.color}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visualizations */}
            <div className="ad-spec__section">
              <div className="ad-spec__section-label">Visualizations</div>
              <div className="ad-spec__viz-list">
                {ESSAY_META.visualizations.map(v => (
                  <div key={v.name} className="ad-spec__viz-item">
                    <span className="ad-spec__viz-name">{v.name}</span>
                    <span className="ad-spec__viz-type">{v.type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Sources */}
            <div className="ad-spec__section">
              <div className="ad-spec__section-label">Key Sources</div>
              <div className="ad-spec__sources">
                {ESSAY_META.keySources.map(s => (
                  <span key={s} className="ad-spec__source-tag">{s}</span>
                ))}
                <span className="ad-spec__source-tag ad-spec__source-tag--more">
                  +{ESSAY_META.sourceCount - ESSAY_META.keySources.length} more
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Essay Content ─── */}
      <section className="ad-content" id="artifact-essay-content">
        <div className="ad-content__frame">
          {children}
        </div>
      </section>

      {/* ─── Artifact Footer ─── */}
      <footer className="ad-footer">
        <div className="ad-footer__inner">
          <Link href="/essays" className="ad-footer__link">
            <ChevronLeftIcon />
            Back to Essays
          </Link>
          <div className="ad-footer__meta">
            <span>{ESSAY_META.sourceCount} {ESSAY_META.sourceTier} sources</span>
            <span className="ad-footer__dot">·</span>
            <span>{ESSAY_META.template}</span>
            <span className="ad-footer__dot">·</span>
            <span>{ESSAY_META.published}</span>
          </div>
          <button
            className="ad-footer__immersive"
            onClick={() => setImmersiveMode(true)}
          >
            <ExpandIcon />
            Immersive Mode
          </button>
        </div>
      </footer>
    </div>
  );
}
