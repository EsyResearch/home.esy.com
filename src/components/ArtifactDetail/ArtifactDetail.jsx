'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './artifact-detail.css';

/* ═══════════════════════════════════════════════════════════════
   Artifact Detail Wrapper — Shared Component
   
   Presents any essay as a produced artifact with metadata,
   spec access, and an immersive mode toggle.

   Props:
   - meta: ArtifactMeta object (title, subtitle, category, etc.)
   - children: The essay content to wrap

   Architecture:
   - Artifact Mode: Metadata hero + spec panel + framed essay + footer
   - Immersive Mode: Chromeless essay with floating exit button
   
   SSR Safety: All window/document access guarded with typeof checks.
   ═══════════════════════════════════════════════════════════════ */

/**
 * @typedef {Object} ArtifactMeta
 * @property {string} title
 * @property {string} subtitle
 * @property {string} category
 * @property {string} [subcategory]
 * @property {string} readTime
 * @property {number} sourceCount
 * @property {string} sourceTier
 * @property {number} sectionCount
 * @property {number} visualizationCount
 * @property {string} designSystem
 * @property {string} published
 * @property {string} model
 * @property {string} template
 * @property {string} [backLink='/essays'] - Where the back button navigates
 * @property {string} [backLabel='Essays'] - Label for the back button
 * @property {Array<{name: string, color: string}>} [palette]
 * @property {Array<{name: string, type: string}>} [visualizations]
 * @property {string[]} [keySources]
 */

/* ─── Category Colors ────────────────────────────────────────── */
const CATEGORY_COLORS = {
  'Science': '#10B981',
  'History': '#F59E0B',
  'Technology': '#3B82F6',
  'Culture': '#EC4899',
  'Space': '#8B5CF6',
  'Nature': '#06B6D4',
  'Education & Writing': '#14B8A6',
  'Economics': '#22C55E',
  'Etymology': '#F97316',
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

function CollapseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 2v4H1M11 2v4h4M11 14v-4h4M5 14v-4H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Main Wrapper ────────────────────────────────────────────── */
/**
 * ArtifactDetailWrapper
 * 
 * Wraps any visual essay in the Artifact Detail chrome layer:
 * toolbar, hero, spec panel, content frame, and footer.
 *
 * @param {{ meta: ArtifactMeta, children: React.ReactNode }} props
 */
export default function ArtifactDetailWrapper({ meta, children }) {
  const [immersiveMode, setImmersiveMode] = useState(false);
  const [specExpanded, setSpecExpanded] = useState(false);

  const backLink = meta.backLink || '/essays';
  const backLabel = meta.backLabel || 'Essays';
  const categoryColor = CATEGORY_COLORS[meta.category] || '#10B981';

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
        <Link href={backLink} className="ad-toolbar__back">
          <ChevronLeftIcon />
          <span>{backLabel}</span>
        </Link>
        <div className="ad-toolbar__right">
          <span className="ad-toolbar__badge" style={{ '--badge-color': categoryColor }}>
            {meta.category}
          </span>
          {meta.subcategory && (
            <span className="ad-toolbar__badge ad-toolbar__badge--sub">
              {meta.subcategory}
            </span>
          )}
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
              <span className="ad-hero__provenance-template">{meta.template}</span>
            </span>
            <span className="ad-hero__provenance-line" aria-hidden="true" />
          </div>
          <h1 className="ad-hero__title">{meta.title}</h1>
          <p className="ad-hero__subtitle">{meta.subtitle}</p>
          <div className="ad-hero__meta">
            <span className="ad-hero__meta-item">
              <span className="ad-hero__meta-value">{meta.readTime}</span>
              <span className="ad-hero__meta-label">read</span>
            </span>
            <span className="ad-hero__meta-dot" aria-hidden="true" />
            <span className="ad-hero__meta-item">
              <span className="ad-hero__meta-value">{meta.sourceCount}</span>
              <span className="ad-hero__meta-label">{meta.sourceTier} sources</span>
            </span>
            <span className="ad-hero__meta-dot" aria-hidden="true" />
            <span className="ad-hero__meta-item">
              <span className="ad-hero__meta-value">{meta.sectionCount}</span>
              <span className="ad-hero__meta-label">sections</span>
            </span>
            <span className="ad-hero__meta-dot" aria-hidden="true" />
            <span className="ad-hero__meta-item">
              <span className="ad-hero__meta-value">{meta.visualizationCount}</span>
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
                <div className="ad-spec__card-value">{meta.template}</div>
              </div>
              <div className="ad-spec__card">
                <div className="ad-spec__card-label">Design System</div>
                <div className="ad-spec__card-value">{meta.designSystem}</div>
              </div>
              <div className="ad-spec__card">
                <div className="ad-spec__card-label">Published</div>
                <div className="ad-spec__card-value">{meta.published}</div>
              </div>
              <div className="ad-spec__card">
                <div className="ad-spec__card-label">Model</div>
                <div className="ad-spec__card-value">{meta.model}</div>
              </div>
              <div className="ad-spec__card">
                <div className="ad-spec__card-label">Source Quality</div>
                <div className="ad-spec__card-value">{meta.sourceCount} {meta.sourceTier}</div>
              </div>
            </div>

            {/* Palette */}
            {meta.palette && meta.palette.length > 0 && (
              <div className="ad-spec__section">
                <div className="ad-spec__section-label">Color Palette</div>
                <div className="ad-spec__palette">
                  {meta.palette.map(p => (
                    <div key={p.name} className="ad-spec__palette-chip">
                      <span className="ad-spec__palette-swatch" style={{ background: p.color }} />
                      <span className="ad-spec__palette-name">{p.name}</span>
                      <span className="ad-spec__palette-hex">{p.color}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Visualizations */}
            {meta.visualizations && meta.visualizations.length > 0 && (
              <div className="ad-spec__section">
                <div className="ad-spec__section-label">Visualizations</div>
                <div className="ad-spec__viz-list">
                  {meta.visualizations.map(v => (
                    <div key={v.name} className="ad-spec__viz-item">
                      <span className="ad-spec__viz-name">{v.name}</span>
                      <span className="ad-spec__viz-type">{v.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Sources */}
            {meta.keySources && meta.keySources.length > 0 && (
              <div className="ad-spec__section">
                <div className="ad-spec__section-label">Key Sources</div>
                <div className="ad-spec__sources">
                  {meta.keySources.map(s => (
                    <span key={s} className="ad-spec__source-tag">{s}</span>
                  ))}
                  {meta.sourceCount > meta.keySources.length && (
                    <span className="ad-spec__source-tag ad-spec__source-tag--more">
                      +{meta.sourceCount - meta.keySources.length} more
                    </span>
                  )}
                </div>
              </div>
            )}
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
          <Link href={backLink} className="ad-footer__link">
            <ChevronLeftIcon />
            Back to {backLabel}
          </Link>
          <div className="ad-footer__meta">
            <span>{meta.sourceCount} {meta.sourceTier} sources</span>
            <span className="ad-footer__dot">·</span>
            <span>{meta.template}</span>
            <span className="ad-footer__dot">·</span>
            <span>{meta.published}</span>
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
