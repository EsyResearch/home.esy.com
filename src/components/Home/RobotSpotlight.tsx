'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * RobotSpotlight Component
 * 
 * Cinematic spotlight section for the ROBOT etymology essay.
 * Dramatic full-bleed design with era-evolving typography aesthetics.
 * 
 * Design Philosophy:
 * - Museum-quality presentation
 * - Gradient typography (white to warm copper)
 * - Bold, cinematic feel matching the essay itself
 * - Stats showcase the scope of the essay
 * 
 * Positioned after "Explore" section, before Early Access.
 */

const RobotSpotlight: React.FC = () => {
  return (
    <section className="robot-spotlight" aria-labelledby="robot-spotlight-title">
      {/* Background Effects */}
      <div className="robot-spotlight-bg" aria-hidden="true">
        <div className="robot-spotlight-gradient" />
        <div className="robot-spotlight-glow" />
        <div className="robot-spotlight-noise" />
      </div>

      {/* Content */}
      <div className="robot-spotlight-content">
        {/* Eyebrow */}
        <span className="robot-spotlight-eyebrow">
          <span className="eyebrow-line" />
          Forged in Fiction • Built in Reality
          <span className="eyebrow-line" />
        </span>

        {/* Title */}
        <h2 id="robot-spotlight-title" className="robot-spotlight-title">
          ROBOT
        </h2>

        {/* Subtitle */}
        <p className="robot-spotlight-subtitle">Grand Machina</p>

        {/* Tagline */}
        <p className="robot-spotlight-tagline">
          The Word That Built Our Future, and Now Shares Our Bed
        </p>

        {/* Stats */}
        <div className="robot-spotlight-stats">
          <div className="robot-stat">
            <span className="robot-stat-number">105</span>
            <span className="robot-stat-label">Years Since R.U.R.</span>
          </div>
          <div className="robot-stat">
            <span className="robot-stat-number">14</span>
            <span className="robot-stat-label">Key Figures</span>
          </div>
          <div className="robot-stat">
            <span className="robot-stat-number">6</span>
            <span className="robot-stat-label">Cultural Eras</span>
          </div>
        </div>

        {/* CTA */}
        <Link href="/essays/visual/the-word-robot" className="robot-spotlight-cta">
          <span>Begin the Journey</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};

export default RobotSpotlight;

