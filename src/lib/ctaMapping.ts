/**
 * CTA Mapping Configuration
 * Maps URL paths to their corresponding CTA text and links
 */

export interface CTAConfig {
  ctaText: string;
  ctaHref: string;
  isNewsletter?: boolean;
  isProduct?: boolean;
}

export interface CTAMapping {
  [pathPattern: string]: CTAConfig;
}

// CTA mapping configuration
export const ctaMapping: CTAMapping = {
  // Blog pages
  '/blog': {
    ctaText: 'Get Weekly AI Writing Tips',
    ctaHref: '#newsletter', // Newsletter signup route
    isNewsletter: true
  },
  
  // School pages
  '/school': {
    ctaText: 'Join Esy School',
    ctaHref: '#newsletter', // Newsletter signup route
    isNewsletter: true
  },
  
  // Essays pages
  '/essays': {
    ctaText: 'Join Esy School',
    ctaHref: '#newsletter', // Newsletter signup route
    isNewsletter: true
  },
  
  // Prompt library pages
  '/prompt-library': {
    ctaText: 'Use in Esy',
    ctaHref: 'https://app.esy.com/signup',
    isProduct: true
  },
  
  // Individual essay pages (bonus feature)
  '/essays/': {
    ctaText: 'Learn How We Wrote This',
    ctaHref: '/school', // Link to related tutorial
    isNewsletter: false
  }
};

// Default fallback CTA
export const defaultCTA: CTAConfig = {
  ctaText: 'Sign Up',
  ctaHref: 'https://app.esy.com/signup',
  isProduct: true
};

/**
 * Get CTA configuration based on current pathname
 * @param pathname - Current URL pathname
 * @returns CTA configuration object
 */
export function getCTAConfig(pathname: string): CTAConfig {
  if (!pathname) return defaultCTA;
  
  // Normalize pathname (remove trailing slash except for root)
  const normalizedPath = pathname.endsWith('/') && pathname.length > 1 
    ? pathname.slice(0, -1) 
    : pathname;
  
  // Check for exact matches first
  if (ctaMapping[normalizedPath]) {
    return ctaMapping[normalizedPath];
  }
  
  // Check for pattern matches (for sub-pages)
  for (const [pattern, config] of Object.entries(ctaMapping)) {
    // Match patterns that end with '/' or exact base paths
    if ((pattern.endsWith('/') && normalizedPath.startsWith(pattern)) || 
        (!pattern.endsWith('/') && normalizedPath.startsWith(pattern + '/'))) {
      return config;
    }
  }
  
  // Return default if no match found
  return defaultCTA;
}

/**
 * Get responsive CTA text that handles longer text gracefully
 * @param ctaText - The CTA text
 * @param isMobile - Whether the viewport is mobile
 * @returns Responsive CTA text configuration
 */
export function getResponsiveCTAText(ctaText: string, isMobile: boolean = false) {
  const maxMobileLength = 20; // Characters before wrapping
  
  return {
    text: ctaText,
    shouldWrap: isMobile && ctaText.length > maxMobileLength,
    maxLength: isMobile ? maxMobileLength : undefined
  };
}
