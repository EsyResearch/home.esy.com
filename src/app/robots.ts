import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

/**
 * Dynamic robots.txt
 * 
 * - Production (esy.com): Allow all crawlers
 * - QA (qa.esy.com): Block all crawlers and AI bots
 */
export default function robots(): MetadataRoute.Robots {
  // Check if we're on QA environment
  const headersList = headers();
  const host = headersList.get('host') || '';
  const isQA = host.includes('qa.esy.com') || host.includes('qa-esy') || host.includes('localhost');

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
      // Block AI training bots on production too (optional)
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
