/**
 * Visual Essay Layout
 * ===================
 * 
 * Created: December 13, 2025
 * Author: Frontend Architecture Expert
 * 
 * This layout provides shared metadata defaults for ALL visual essays.
 * Individual page.tsx files inherit these defaults and can override as needed.
 * 
 * ## What This Layout Provides
 * 
 * 1. Default Open Graph settings (type, siteName, locale)
 * 2. Default Twitter Card settings (card type, site handle)
 * 3. Default robots settings (index, follow)
 * 
 * ## Architecture Decision
 * 
 * This layout works in conjunction with `createVisualEssayMetadata()` helper:
 * - Layout: Provides defaults that rarely change
 * - Helper: Generates page-specific metadata with consistent patterns
 * 
 * Together, they reduce boilerplate from ~40 lines to ~10 lines per essay.
 * 
 * @see /src/lib/visual-essay-metadata.ts
 * @see /docs/VISUAL_ESSAY_METADATA_PATTERN.md
 */

import { Metadata } from 'next';

/**
 * Shared metadata defaults for all visual essays.
 * 
 * These values are inherited by all pages under /essays/visual/*
 * Individual pages can override any of these values.
 * 
 * Note: Images and URLs must be set per-page as they are unique.
 */
export const metadata: Metadata = {
  // Open Graph defaults
  openGraph: {
    type: 'article',
    siteName: 'Esy',
    locale: 'en_US',
  },
  
  // Twitter Card defaults
  twitter: {
    card: 'summary_large_image',
    site: '@EsyResearch',
  },
  
  // SEO defaults
  robots: {
    index: true,
    follow: true,
  },
  
  // Default author
  authors: [{ name: 'Esy', url: 'https://esy.com' }],
};

/**
 * Layout component for visual essays.
 * 
 * Currently a pass-through layout (no additional UI).
 * Can be extended in the future to add:
 * - Shared navigation for essays
 * - Progress indicators
 * - Essay-specific analytics
 * - Social sharing buttons
 */
export default function VisualEssayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

