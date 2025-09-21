import React from 'react';
import BlogPostClient from './client';

export async function generateStaticParams() {
  // Return the blog post slugs that should be pre-rendered
  return [
    { slug: 'future-ai-academic-writing' },
    { slug: 'mastering-prompt-engineering' },
    { slug: 'research-methodology-digital-age' },
    { slug: 'ai-transforming-literature-analysis' },
    { slug: 'ethics-ai-assisted-academic-writing' },
    { slug: 'innovative-teaching-methods-ai-generation' }
  ];
}

export default function BlogPostPage({ params }) {
  return <BlogPostClient params={params} />;
}