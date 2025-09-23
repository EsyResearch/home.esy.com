import React from 'react';
import BlogPageClient from './BlogPageClient';
import { getAllBlogPosts, getFeaturedBlogPost } from '@/lib/blogUtils';

export async function generateMetadata() {
  return {
    title: 'The Esy Blog - AI, Academic Writing & Education Insights',
    description: 'Insights, tutorials, and thought leadership on AI, academic writing, and the future of education',
  };
}

export default async function BlogPage() {
  const [allPosts, featuredPost] = await Promise.all([
    getAllBlogPosts(),
    getFeaturedBlogPost()
  ]);

  return <BlogPageClient allPosts={allPosts} featuredPost={featuredPost} />;
}
