import { MetadataRoute } from 'next';

/**
 * Static robots.txt generation
 * 
 * For static export (output: export), we check the env var at build time.
 * - QA builds (NEXT_PUBLIC_IS_QA=true): Block all crawlers
 * - Production builds: Allow crawlers, block AI training bots
 */

// Check QA environment at build time
const isQA = process.env.NEXT_PUBLIC_IS_QA === 'true';

export default function robots(): MetadataRoute.Robots {
  if (isQA) {
    // Block everything on QA
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
        // Explicitly block AI crawlers
        {
          userAgent: 'GPTBot',
          disallow: '/',
        },
        {
          userAgent: 'ChatGPT-User',
          disallow: '/',
        },
        {
          userAgent: 'CCBot',
          disallow: '/',
        },
        {
          userAgent: 'anthropic-ai',
          disallow: '/',
        },
        {
          userAgent: 'Claude-Web',
          disallow: '/',
        },
        {
          userAgent: 'Google-Extended',
          disallow: '/',
        },
        {
          userAgent: 'Bytespider',
          disallow: '/',
        },
        {
          userAgent: 'cohere-ai',
          disallow: '/',
        },
      ],
    };
  }

  // Production: Allow crawlers with sitemap
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/'],
      },
      // Block AI training bots on production too
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'Google-Extended',
        disallow: '/',
      },
    ],
    sitemap: 'https://esy.com/sitemap.xml',
  };
}
