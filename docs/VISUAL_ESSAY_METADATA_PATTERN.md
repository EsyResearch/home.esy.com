# Visual Essay Metadata Pattern

> **Created**: December 13, 2025  
> **Authors**: Frontend Architecture Expert, Social Media Meta Expert  
> **Status**: Active

## Overview

This document describes the standardized metadata pattern for visual essays on Esy.com. The pattern was established after auditing 6 visual essays and finding consistent issues with social sharing metadata.

## Problem Statement

Before this pattern, each visual essay `page.tsx` had 40+ lines of repetitive metadata:

```tsx
// ❌ OLD PATTERN - Verbose, error-prone
export const metadata: Metadata = {
  title: "ROBOT — Grand Machina | Esy Visual Essay",
  description: "...",
  keywords: [...],
  openGraph: {
    title: "ROBOT — Grand Machina",
    description: "...",
    type: "article",           // ← Repeated in every file
    url: "https://esy.com/essays/visual/the-word-robot",
    siteName: "Esy",           // ← Repeated in every file
    locale: "en_US",           // ← Repeated in every file
    images: [{
      url: "https://esy.com/og/the-word-robot.png",
      width: 1200,
      height: 630,
      alt: "...",
    }],
  },
  twitter: {
    card: "summary_large_image", // ← Repeated in every file
    title: "ROBOT — Grand Machina",
    description: "...",
    site: "@EsyResearch",        // ← Often missing!
    images: ["https://esy.com/og/the-word-robot.png"],
  },
  alternates: {
    canonical: "https://esy.com/essays/visual/the-word-robot",
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### Issues Found During Audit (December 2025)

| Issue | Frequency | Impact |
|-------|-----------|--------|
| Missing `twitter:image` | 5/6 essays | No image on Twitter shares |
| Missing `twitter:site` | 5/6 essays | No brand attribution |
| Relative image URLs | 2/6 essays | Broken social previews |
| Inconsistent `og:siteName` | 3/6 essays | Inconsistent branding |
| Missing `canonical` | 2/6 essays | SEO issues |

## Solution Architecture

### Two-Part System

```
┌─────────────────────────────────────────────────────────────┐
│                    Visual Essay Page                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────┐    ┌─────────────────────────┐    │
│  │   layout.tsx        │    │   page.tsx              │    │
│  │   (Shared Defaults) │    │   (Page-Specific)       │    │
│  │                     │    │                         │    │
│  │ • og:type           │ +  │ • title                 │    │
│  │ • og:siteName       │    │ • description           │    │
│  │ • og:locale         │    │ • og:title              │    │
│  │ • twitter:card      │    │ • og:image              │    │
│  │ • twitter:site      │    │ • keywords              │    │
│  │ • robots            │    │ • canonical             │    │
│  └─────────────────────┘    └─────────────────────────┘    │
│                                                             │
│                    ↓ Uses ↓                                 │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │   createVisualEssayMetadata()                        │   │
│  │   (Helper Function)                                  │   │
│  │                                                      │   │
│  │   • Generates consistent metadata from config        │   │
│  │   • Ensures absolute URLs                            │   │
│  │   • Applies naming conventions                       │   │
│  │   • Type-safe configuration                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### File Locations

```
src/
├── app/
│   └── essays/
│       └── visual/
│           ├── layout.tsx                    ← Shared defaults
│           ├── the-word-robot/
│           │   └── page.tsx                  ← Uses helper
│           ├── the-origin-of-sex/
│           │   └── page.tsx                  ← Uses helper
│           └── ...
├── lib/
│   └── visual-essay-metadata.ts              ← Helper function
└── ...

public/
└── og/
    ├── the-word-robot.png                    ← OG images
    ├── the-origin-of-sex.png
    └── ...

docs/
└── VISUAL_ESSAY_METADATA_PATTERN.md          ← This document
```

## Implementation

### 1. Layout (`src/app/essays/visual/layout.tsx`)

Provides defaults inherited by all visual essay pages:

```tsx
export const metadata: Metadata = {
  openGraph: {
    type: 'article',
    siteName: 'Esy',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@EsyResearch',
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### 2. Helper Function (`src/lib/visual-essay-metadata.ts`)

Generates page-specific metadata with consistent patterns:

```tsx
import { createVisualEssayMetadata } from '@/lib/visual-essay-metadata';

export const metadata = createVisualEssayMetadata({
  slug: 'the-word-robot',
  title: 'ROBOT — Grand Machina | Esy Visual Essay',
  description: 'The Word That Built Our Future...',
  ogTitle: 'ROBOT — Grand Machina',
  ogDescription: '105 years of robot—from forced labor to intimate companion.',
  keywords: ['robot etymology', 'Karel Čapek', 'R.U.R.'],
  imageAlt: 'ROBOT — Grand Machina visual essay',
});
```

### 3. OG Image Convention

All visual essay OG images follow this pattern:

```
/public/og/[slug].png
```

Example:
- Slug: `the-word-robot`
- Image: `/public/og/the-word-robot.png`
- URL: `https://esy.com/og/the-word-robot.png`

**Image Requirements:**
- Dimensions: 1200×630 pixels
- Format: PNG (preferred) or JPEG
- File size: < 1MB for fast loading
- Design: Text centered, high contrast, works on dark backgrounds

## Usage Guide

### Creating a New Visual Essay

1. **Create the OG image** at `/public/og/[your-slug].png`

2. **Create the page** with minimal metadata:

```tsx
// src/app/essays/visual/your-essay/page.tsx
import { createVisualEssayMetadata } from '@/lib/visual-essay-metadata';
import YourEssayClient from './YourEssayClient';

export const metadata = createVisualEssayMetadata({
  slug: 'your-essay',
  title: 'Your Essay Title | Esy Visual Essay',
  description: 'Your full description for SEO (can be 150-300 chars).',
  ogTitle: 'Your Essay Title',  // Shorter, under 60 chars
  ogDescription: 'Shorter description for social cards (150-200 chars).',
  keywords: ['keyword1', 'keyword2'],
});

export default function YourEssayPage() {
  return <YourEssayClient />;
}
```

3. **Test social sharing** using:
   - [Facebook Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
   - [LinkedIn Inspector](https://www.linkedin.com/post-inspector/)

### Migrating Existing Essays

When migrating an existing essay:

1. Ensure OG image exists at `/public/og/[slug].png`
2. Replace verbose metadata with `createVisualEssayMetadata()`
3. Verify all page-specific content is preserved
4. Test social sharing

### Configuration Options

```typescript
interface VisualEssayMetadataConfig {
  // Required
  slug: string;           // URL slug, used for canonical and image path
  title: string;          // Full page title
  description: string;    // Full meta description
  
  // Optional (with smart defaults)
  ogTitle?: string;       // Defaults to title before " | "
  ogDescription?: string; // Defaults to description
  twitterDescription?: string;
  keywords?: string[];
  imageAlt?: string;      // Defaults to ogTitle
  ogImage?: string;       // Override default /og/[slug].png
  publishedTime?: string; // ISO 8601 date
  modifiedTime?: string;  // ISO 8601 date
  author?: string;
}
```

## Standards Reference

### Title Guidelines
- Page title: Under 70 chars, includes "| Esy" suffix
- OG title: Under 60 chars, no suffix

### Description Guidelines
- Page description: 150-300 chars, comprehensive
- OG description: 150-200 chars, compelling hook

### Image Guidelines
- Dimensions: 1200×630 (1.91:1 aspect ratio)
- Format: PNG for graphics/text, JPEG for photos
- Text: Centered, high contrast, avoid outer 10%
- File size: Under 1MB

### URL Guidelines
- All URLs absolute HTTPS
- Canonical: `https://esy.com/essays/visual/[slug]`
- OG image: `https://esy.com/og/[slug].png`

## Audit Checklist

Before publishing any visual essay, verify:

- [ ] OG image exists at `/public/og/[slug].png`
- [ ] OG image is 1200×630 pixels
- [ ] Page uses `createVisualEssayMetadata()` helper
- [ ] All required fields provided (slug, title, description)
- [ ] ogTitle is under 60 characters
- [ ] ogDescription is 150-200 characters
- [ ] Test passed on Facebook Debugger
- [ ] Test passed on Twitter Card Validator

## Related Documentation

- [Social Media Meta Expert Agent](/orchestration/agents/engineering/social-media-meta-expert.md)
- [Frontend Architecture Expert Agent](/orchestration/agents/engineering/frontend-architecture-expert.md)
- [Social Media Audit Reports](/orchestration/agents/engineering/SocialMediaAuditReports/)

## Changelog

### December 13, 2025
- Initial pattern created after auditing 6 visual essays
- Created `layout.tsx` for shared defaults
- Created `createVisualEssayMetadata()` helper
- Established OG image convention at `/public/og/[slug].png`
- Documented in this file

---

*This pattern was established by the Frontend Architecture Expert and Social Media Meta Expert agents to ensure consistent, high-quality social sharing across all Esy visual essays.*

