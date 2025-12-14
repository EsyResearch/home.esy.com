/**
 * Visual Essay Metadata Helper
 * ============================
 * 
 * Created: December 13, 2025
 * Author: Frontend Architecture Expert + Social Media Meta Expert
 * 
 * This utility provides a standardized way to generate metadata for visual essays,
 * ensuring consistency across all essays while reducing boilerplate.
 * 
 * ## Why This Exists
 * 
 * Before this helper, each visual essay page.tsx had 40+ lines of repetitive metadata:
 * - og:siteName, og:locale, og:type were copy-pasted
 * - twitter:site was often missing or inconsistent
 * - Image URL patterns were manually constructed
 * - Canonical URLs were sometimes relative, sometimes absolute
 * 
 * ## Pattern Decision (December 2025)
 * 
 * After auditing 6 visual essays and finding consistent issues:
 * - Missing twitter:image (5/6 essays)
 * - Missing twitter:site (5/6 essays)
 * - Inconsistent og:siteName/og:locale
 * - Broken relative image URLs
 * 
 * We decided to:
 * 1. Create this helper for page-specific metadata
 * 2. Create a layout.tsx for shared defaults
 * 3. Standardize OG images at /og/[slug].png
 * 
 * ## Usage
 * 
 * ```tsx
 * import { createVisualEssayMetadata } from '@/lib/visual-essay-metadata';
 * 
 * export const metadata = createVisualEssayMetadata({
 *   slug: 'the-word-robot',
 *   title: 'ROBOT — Grand Machina | Esy Visual Essay',
 *   description: 'The full meta description...',
 *   ogTitle: 'ROBOT — Grand Machina',
 *   ogDescription: 'Shorter OG description...',
 *   keywords: ['robot etymology', 'Karel Čapek'],
 * });
 * ```
 * 
 * ## Standards
 * 
 * - OG images: /public/og/[slug].png (1200×630)
 * - Twitter handle: @EsyResearch
 * - All URLs are absolute HTTPS
 * - Titles under 60 chars for OG
 * - Descriptions 150-200 chars for OG
 * 
 * @see /docs/VISUAL_ESSAY_METADATA_PATTERN.md
 * @see /orchestration/agents/engineering/social-media-meta-expert.md
 */

import { Metadata } from 'next';

/**
 * Configuration for visual essay metadata
 */
export interface VisualEssayMetadataConfig {
  /** URL slug (e.g., 'the-word-robot') - used for canonical URL and default image path */
  slug: string;
  
  /** Full page title including "| Esy" suffix */
  title: string;
  
  /** Full meta description (can be longer, 150-300 chars) */
  description: string;
  
  /** Shorter OG title (under 60 chars), defaults to title before " | " */
  ogTitle?: string;
  
  /** Shorter OG description (150-200 chars), defaults to description */
  ogDescription?: string;
  
  /** Twitter-specific description, defaults to ogDescription */
  twitterDescription?: string;
  
  /** SEO keywords array */
  keywords?: string[];
  
  /** Alt text for OG image, defaults to ogTitle */
  imageAlt?: string;
  
  /** Override default image path (defaults to /og/[slug].png) */
  ogImage?: string;
  
  /** ISO 8601 date string for article:published_time */
  publishedTime?: string;
  
  /** ISO 8601 date string for article:modified_time */
  modifiedTime?: string;
  
  /** Author name or URL for article:author */
  author?: string;
}

/**
 * Base URL for the site - used for absolute URLs
 */
const SITE_URL = 'https://esy.com';

/**
 * Twitter handle for the site
 */
const TWITTER_SITE = '@EsyResearch';

/**
 * Creates standardized metadata for a visual essay page.
 * 
 * This function ensures:
 * - All OG and Twitter tags are present
 * - All URLs are absolute HTTPS
 * - Consistent patterns across all essays
 * - Proper image dimensions specified
 * 
 * @param config - The essay-specific configuration
 * @returns Complete Metadata object for Next.js
 * 
 * @example
 * ```tsx
 * export const metadata = createVisualEssayMetadata({
 *   slug: 'the-origin-of-sex',
 *   title: 'The Word That Divided Everything | An Etymology of Sex | Esy',
 *   description: 'From Latin "secare" to modern taboo...',
 *   ogTitle: 'The Word That Divided Everything',
 *   keywords: ['etymology', 'sex', 'Latin origins'],
 * });
 * ```
 */
export function createVisualEssayMetadata(config: VisualEssayMetadataConfig): Metadata {
  // Derive ogTitle from title if not provided (take part before " | ")
  const ogTitle = config.ogTitle || config.title.split(' | ')[0];
  
  // Use ogDescription or fall back to main description
  const ogDescription = config.ogDescription || config.description;
  
  // Twitter description defaults to OG description
  const twitterDescription = config.twitterDescription || ogDescription;
  
  // Default image path follows convention: /og/[slug].png
  const ogImageUrl = config.ogImage || `${SITE_URL}/og/${config.slug}.png`;
  
  // Image alt defaults to ogTitle
  const imageAlt = config.imageAlt || ogTitle;
  
  // Canonical URL
  const canonicalUrl = `${SITE_URL}/essays/visual/${config.slug}`;
  
  // Build the metadata object
  const metadata: Metadata = {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonicalUrl,
      siteName: 'Esy',
      type: 'article',
      locale: 'en_US',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      // Add article metadata if provided
      ...(config.publishedTime && { publishedTime: config.publishedTime }),
      ...(config.modifiedTime && { modifiedTime: config.modifiedTime }),
      ...(config.author && { authors: [config.author] }),
    },
    
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: twitterDescription,
      site: TWITTER_SITE,
      images: [ogImageUrl],
    },
    
    alternates: {
      canonical: canonicalUrl,
    },
    
    robots: {
      index: true,
      follow: true,
    },
  };
  
  return metadata;
}

/**
 * Type guard to check if a slug has a corresponding OG image
 * This can be expanded to validate against actual files
 */
export function hasOgImage(slug: string): boolean {
  // In a real implementation, this could check the filesystem
  // For now, we assume all slugs have images at /og/[slug].png
  return true;
}

/**
 * Generates the expected OG image path for a given slug
 */
export function getOgImagePath(slug: string): string {
  return `/og/${slug}.png`;
}

/**
 * Generates the full OG image URL for a given slug
 */
export function getOgImageUrl(slug: string): string {
  return `${SITE_URL}/og/${slug}.png`;
}

