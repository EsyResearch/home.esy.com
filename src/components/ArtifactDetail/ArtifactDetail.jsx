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
   - Artifact Mode: Metadata hero + spec panel + framed essay
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
 * @property {boolean} [citationFirst=false] - Whether the essay was written citation-first (all claims sourced before prose)
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
 * toolbar, hero, spec panel, and content frame.
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

  /* ─── Immersive Mode (Lite Chrome) ─── */
  if (immersiveMode) {
    return (
      <div className="artifact-detail-immersive">
        {/* ─── Lite Toolbar ─── */}
        <header className="artifact-detail-immersive__toolbar">
          <Link href={backLink} className="artifact-detail-toolbar__back">
            <ChevronLeftIcon />
            <span>{backLabel}</span>
          </Link>
          <div className="artifact-detail-toolbar__right">
            <span className="artifact-detail-toolbar__badge" style={{ '--badge-color': categoryColor }}>
              {meta.category}
            </span>
            <button
              className="artifact-detail-toolbar__immersive artifact-detail-toolbar__immersive--exit"
              onClick={() => setImmersiveMode(false)}
              aria-label="Exit immersive mode"
              title="Exit immersive mode (Esc)"
            >
              <CollapseIcon />
              <span className="artifact-detail-toolbar__immersive-label">Exit</span>
            </button>
          </div>
        </header>

        {/* ─── Essay Content ─── */}
        <div className="artifact-detail-immersive__content">
          {children}
        </div>
      </div>
    );
  }

  /* ─── Artifact Detail Mode ─── */
  return (
    <div className="artifact-detail-page">
      {/* ─── Toolbar ─── */}
      <header className="artifact-detail-toolbar">
        <Link href={backLink} className="artifact-detail-toolbar__back">
          <ChevronLeftIcon />
          <span>{backLabel}</span>
        </Link>
        <div className="artifact-detail-toolbar__right">
          <span className="artifact-detail-toolbar__badge" style={{ '--badge-color': categoryColor }}>
            {meta.category}
          </span>
          {meta.subcategory && (
            <span className="artifact-detail-toolbar__badge artifact-detail-toolbar__badge--sub">
              {meta.subcategory}
            </span>
          )}
          <button
            className="artifact-detail-toolbar__immersive"
            onClick={() => setImmersiveMode(true)}
            aria-label="Enter immersive reading mode"
          >
            <ExpandIcon />
            <span className="artifact-detail-toolbar__immersive-label">Immersive Mode</span>
          </button>
        </div>
      </header>

      {/* ─── Artifact Hero ─── */}
      <section className="artifact-detail-hero">
        <div className="artifact-detail-hero__inner">
          <div className="artifact-detail-hero__provenance">
            <span className="artifact-detail-hero__provenance-line" aria-hidden="true" />
            <span className="artifact-detail-hero__provenance-text">
              <span className="artifact-detail-hero__provenance-type">Artifact</span>
              <span className="artifact-detail-hero__provenance-sep" aria-hidden="true">·</span>
              <span className="artifact-detail-hero__provenance-template">{meta.template}</span>
            </span>
            <span className="artifact-detail-hero__provenance-line" aria-hidden="true" />
          </div>
          <h1 className="artifact-detail-hero__title">{meta.title}</h1>
          <p className="artifact-detail-hero__subtitle">{meta.subtitle}</p>
          <div className="artifact-detail-hero__meta">
            <span className="artifact-detail-hero__meta-item">
              <span className="artifact-detail-hero__meta-value">{meta.readTime}</span>
              <span className="artifact-detail-hero__meta-label">read</span>
            </span>
            <span className="artifact-detail-hero__meta-dot" aria-hidden="true" />
            <span className="artifact-detail-hero__meta-item">
              <span className="artifact-detail-hero__meta-value">{meta.sourceCount}</span>
              <span className="artifact-detail-hero__meta-label">{meta.sourceTier} sources</span>
            </span>
            <span className="artifact-detail-hero__meta-dot" aria-hidden="true" />
            <span className="artifact-detail-hero__meta-item">
              <span className="artifact-detail-hero__meta-value">{meta.sectionCount}</span>
              <span className="artifact-detail-hero__meta-label">sections</span>
            </span>
            <span className="artifact-detail-hero__meta-dot" aria-hidden="true" />
            <span className="artifact-detail-hero__meta-item">
              <span className="artifact-detail-hero__meta-value">{meta.visualizationCount}</span>
              <span className="artifact-detail-hero__meta-label">visualizations</span>
            </span>
          </div>
          <div className="artifact-detail-hero__actions">
            <a href="#artifact-essay-content" className="artifact-detail-hero__cta artifact-detail-hero__cta--primary">
              Read Essay
            </a>
            <button
              className="artifact-detail-hero__cta artifact-detail-hero__cta--secondary"
              onClick={() => setImmersiveMode(true)}
            >
              <ExpandIcon />
              Immersive Mode
            </button>
          </div>
        </div>
      </section>

      {/* ─── Spec Panel ─── */}
      <section className="artifact-detail-spec">
        <div className="artifact-detail-spec__inner">
          <button
            className="artifact-detail-spec__toggle"
            onClick={() => setSpecExpanded(!specExpanded)}
            aria-expanded={specExpanded}
          >
            <span className="artifact-detail-spec__toggle-label">Artifact Spec</span>
            <svg
              className={`artifact-detail-spec__toggle-icon ${specExpanded ? 'artifact-detail-spec__toggle-icon--open' : ''}`}
              width="12" height="12" viewBox="0 0 12 12" fill="none"
            >
              <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className={`artifact-detail-spec__content ${specExpanded ? 'artifact-detail-spec__content--open' : ''}`}>
            {/* Metadata Grid */}
            <div className="artifact-detail-spec__grid">
              <div className="artifact-detail-spec__card">
                <div className="artifact-detail-spec__card-label">Template</div>
                <div className="artifact-detail-spec__card-value">{meta.template}</div>
              </div>
              <div className="artifact-detail-spec__card">
                <div className="artifact-detail-spec__card-label">Design System</div>
                <div className="artifact-detail-spec__card-value">{meta.designSystem}</div>
              </div>
              <div className="artifact-detail-spec__card">
                <div className="artifact-detail-spec__card-label">Published</div>
                <div className="artifact-detail-spec__card-value">{meta.published}</div>
              </div>
              <div className="artifact-detail-spec__card">
                <div className="artifact-detail-spec__card-label">Model</div>
                <div className="artifact-detail-spec__card-value">{meta.model}</div>
              </div>
              <div className="artifact-detail-spec__card">
                <div className="artifact-detail-spec__card-label">Source Quality</div>
                <div className="artifact-detail-spec__card-value">{meta.sourceCount} {meta.sourceTier}</div>
              </div>
              <div className="artifact-detail-spec__card">
                <div className="artifact-detail-spec__card-label">Citation-First</div>
                <div className="artifact-detail-spec__card-value artifact-detail-spec__card-value--bool">
                  {meta.citationFirst ? (
                    <span className="artifact-detail-spec__bool artifact-detail-spec__bool--yes">Yes</span>
                  ) : (
                    <span className="artifact-detail-spec__bool artifact-detail-spec__bool--no">No</span>
                  )}
                </div>
              </div>
            </div>

            {/* Palette */}
            {meta.palette && meta.palette.length > 0 && (
              <div className="artifact-detail-spec__section">
                <div className="artifact-detail-spec__section-label">Color Palette</div>
                <div className="artifact-detail-spec__palette">
                  {meta.palette.map(p => (
                    <div key={p.name} className="artifact-detail-spec__palette-chip">
                      <span className="artifact-detail-spec__palette-swatch" style={{ background: p.color }} />
                      <span className="artifact-detail-spec__palette-name">{p.name}</span>
                      <span className="artifact-detail-spec__palette-hex">{p.color}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Visualizations */}
            {meta.visualizations && meta.visualizations.length > 0 && (
              <div className="artifact-detail-spec__section">
                <div className="artifact-detail-spec__section-label">Visualizations</div>
                <div className="artifact-detail-spec__viz-list">
                  {meta.visualizations.map(v => (
                    <div key={v.name} className="artifact-detail-spec__viz-item">
                      <span className="artifact-detail-spec__viz-name">{v.name}</span>
                      <span className="artifact-detail-spec__viz-type">{v.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Sources */}
            {meta.keySources && meta.keySources.length > 0 && (
              <div className="artifact-detail-spec__section">
                <div className="artifact-detail-spec__section-label">Key Sources</div>
                <div className="artifact-detail-spec__sources">
                  {meta.keySources.map(s => (
                    <span key={s} className="artifact-detail-spec__source-tag">{s}</span>
                  ))}
                  {meta.sourceCount > meta.keySources.length && (
                    <span className="artifact-detail-spec__source-tag artifact-detail-spec__source-tag--more">
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
      <section className="artifact-detail-content" id="artifact-essay-content">
        <div className="artifact-detail-content__frame">
          {children}
        </div>
      </section>

    </div>
  );
}
