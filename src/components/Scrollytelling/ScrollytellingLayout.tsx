"use client";

import React from "react";
import ScrollytellingHeader from "./ScrollytellingHeader";
import ScrollytellingTheatreBar from "./ScrollytellingTheatreBar";
import "./scrollytelling-layout.css";

interface ScrollytellingLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  readTime?: string;
}

/**
 * SCROLLYTELLING LAYOUT
 * =====================
 * 
 * App-like wrapper for immersive scrollytelling experiences.
 * Provides consistent header and footer across all story pages.
 * 
 * Anatomy (Mobile-First):
 * ┌─────────────────────────────────────────────┐
 * │ [Logo]                          (Header)    │  48px mobile / 56px desktop
 * ├─────────────────────────────────────────────┤
 * │                                             │
 * │           Story Content Area                │  Full viewport minus bars
 * │         (scrolls independently)             │
 * │                                             │
 * ├─────────────────────────────────────────────┤
 * │ ← Back │ ███░░░ 45% │ Share ↗   (Footer)   │  52px mobile / 56px desktop
 * └─────────────────────────────────────────────┘
 * 
 * Design Philosophy:
 * - App-like immersive experience
 * - No traditional site navigation during story
 * - Logo links back to scrollytelling index
 * - Theatre Bar provides all actions (back, progress, share)
 * - Mobile-first: thumb-reachable actions at bottom
 * - Content breathes between header and footer
 * 
 * Usage:
 * ```tsx
 * <ScrollytellingLayout
 *   title="Story Title"
 *   description="Brief description for sharing"
 *   readTime="12 min"
 * >
 *   <YourStoryClient />
 * </ScrollytellingLayout>
 * ```
 */
export default function ScrollytellingLayout({
  children,
  title,
  description = "",
  readTime,
}: ScrollytellingLayoutProps) {
  return (
    <div className="scrollytelling-layout">
      {/* Minimal Header - Logo only */}
      <ScrollytellingHeader />
      
      {/* Story Content - padded for header/footer */}
      <div className="scrollytelling-content">
        {children}
      </div>
      
      {/* Theatre Bar Footer - Back, Progress, Share */}
      <ScrollytellingTheatreBar
        title={title}
        description={description}
        readTime={readTime}
      />
    </div>
  );
}

