# Esy Research Section

This directory contains the `/research` subdirectory implementation, based on the journal.esy.com template.

## Overview

The research section is a dedicated space for publishing research articles, experiments, and analysis related to AI, machine learning, and academic research methodologies.

## Directory Structure

```
/research
├── README.md                 # This file
├── layout.tsx                # Metadata and layout wrapper
├── page.tsx                  # Main research homepage
└── entry/
    └── [slug]/
        └── page.tsx          # Dynamic article pages
```

## Content Structure

Research articles are stored as MDX files in:
```
/src/content/research/articles/
└── [article-name].mdx
```

### Article Frontmatter

Each MDX article requires the following frontmatter:

```yaml
---
title: "Article Title"
subtitle: "Article subtitle or tagline"
author:
  name: "Author Name"
  role: "Author Role/Title"
  bio: "Short author biography (optional)"
date: "Month DD, YYYY"
readTime: 10                  # Reading time in minutes
featuredImage: "https://..."  # Featured image URL
tags:
  - tag1
  - tag2
  - research                  # Type tag: research, experiment, build, or analysis
slug: article-slug-name
placement: "featured"          # Options: featured, secondary, feed, none
---
```

## Component Architecture

### Library Functions

Located in `/src/lib/research/`:

- **articles.ts**: Article listing and filtering functions
  - `getAllResearchArticles()`: Get all articles sorted by date
  - `getFeaturedResearchArticle()`: Get the featured article
  - `getSecondaryResearchFeatures(limit)`: Get secondary featured articles
  - `getFeedResearchArticles(limit)`: Get feed articles
  - `getRecentResearchArticles(limit)`: Get recent articles

- **mdx.ts**: MDX compilation and rendering
  - `getResearchArticleBySlug(slug)`: Compile and return a single article
  - `getAllResearchArticleSlugs()`: Get all article slugs for static generation

### Components

Located in `/src/components/research/`:

- **ResearchLayout.tsx**: Main layout with header, footer, and navigation
- **ResearchHomeClient.tsx**: Homepage component displaying featured and recent articles
- **ResearchArticleViewClient.tsx**: Individual article view component
- **ResearchArticle.module.css**: Styling for article content

## Adding New Articles

1. Create a new `.mdx` file in `/src/content/research/articles/`
2. Add required frontmatter (see template above)
3. Write your article content using Markdown/MDX
4. Set appropriate tags and placement for homepage display

### Article Placement Options

- **featured**: Displays as hero article on homepage (only one)
- **secondary**: Shows in "Featured Research" section
- **feed**: Shows in "Recent Articles" section
- **none**: Not displayed on homepage (accessible via direct URL)

## Article Types

Determined by tags:

- **research**: General research articles
- **experiment**: Experimental results and findings
- **build**: Product/feature development articles
- **analysis**: Deep-dive analysis pieces

## Styling

The research section uses a dark theme with purple accents:

- Background: `#0a0a0f`
- Elevated: `#16161f`
- Accent: `#8b5cf6` (purple)
- Text: White with various opacity levels

Custom styles for article content are in `ResearchArticle.module.css`.

## Navigation

- Homepage: `/research`
- Individual articles: `/research/entry/[slug]`

## Development

### Running Locally

```bash
npm run dev
```

Visit `http://localhost:3000/research`

### Building

```bash
npm run build
```

### Static Export

```bash
npm run build:static
```

## Dependencies

Required packages (already installed):

- `next-mdx-remote`: MDX compilation
- `gray-matter`: Frontmatter parsing
- `rehype-slug`: Heading ID generation
- `lucide-react`: Icons

## Best Practices

1. **Consistent Frontmatter**: Always include all required fields
2. **Quality Images**: Use high-quality featured images (800x400 recommended)
3. **Read Time**: Estimate 200 words per minute for accurate read times
4. **Tags**: Use consistent, lowercase tags
5. **Slugs**: Keep slugs short, descriptive, and URL-friendly
6. **Content**: Write for academic/technical audience with proper citations

## Future Enhancements

Potential improvements:

- Search functionality
- Category/tag filtering
- Article series/collections
- Related articles suggestions
- Social sharing integration
- Reading progress tracking
- Comments/discussion system
- Newsletter integration

## Troubleshooting

### Articles Not Appearing

1. Check frontmatter formatting (valid YAML)
2. Verify file has `.mdx` extension
3. Ensure file is in correct directory
4. Check placement field is set
5. Rebuild application

### Styling Issues

1. Verify CSS module import
2. Check class name matches module export
3. Clear build cache and rebuild

### MDX Compilation Errors

1. Check for invalid JSX in content
2. Verify component imports
3. Review console for specific error messages

## Support

For issues or questions about the research section, refer to the main project documentation or contact the development team.

---

*Created: January 2025*
*Based on: journal.esy.com template*

