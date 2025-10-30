import React from 'react';
import ResearchHomeClient from '@/components/research/ResearchHomeClient';
import { getFeaturedResearchArticle, getSecondaryResearchFeatures, getFeedResearchArticles } from '@/lib/research/articles';

const ResearchPage = async () => {
  // Get dynamic data from MDX files
  const featuredPost = getFeaturedResearchArticle();
  const secondaryFeatures = getSecondaryResearchFeatures(3);
  const feedPosts = getFeedResearchArticles(4);

  // Transform featured post data to match design
  const featuredArticle = featuredPost ? {
    id: 1,
    title: featuredPost.title,
    subtitle: featuredPost.subtitle || "Research insights and experiments in AI and machine learning",
    author: featuredPost.author.name,
    authorRole: featuredPost.author.role,
    date: featuredPost.date,
    readTime: featuredPost.readTime,
    category: "Research",
    excerpt: featuredPost.excerpt || "Exploring the frontiers of artificial intelligence, machine learning, and their applications in academic research.",
    slug: featuredPost.slug
  } : null;

  // Transform secondary features to lead articles
  const leadArticles = secondaryFeatures.map((post, index) => ({
    id: index + 2,
    title: post.title,
    author: post.author.name,
    date: post.date,
    readTime: post.readTime,
    category: post.type === 'experiment' ? 'Experiments' : 
              post.type === 'research' ? 'Research' : 
              post.type === 'build' ? 'Build' : 
              post.type === 'analysis' ? 'Analysis' : 'Research',
    excerpt: post.excerpt || '',
    trending: index === 0,
    new: index === 1
  }));

  // Transform feed posts to recent articles
  const recentArticles = feedPosts.map((post, index) => ({
    id: index + 5,
    title: post.title,
    author: post.author.name,
    date: post.date,
    readTime: post.readTime,
    category: post.type === 'experiment' ? 'Experiments' : 
              post.type === 'research' ? 'Research' : 
              post.type === 'build' ? 'Build' : 
              post.type === 'analysis' ? 'Analysis' : 'Research',
    excerpt: post.excerpt || ''
  }));

  return (
      <ResearchHomeClient
        featuredArticle={featuredArticle}
        leadArticles={leadArticles}
        recentArticles={recentArticles}
        secondaryFeatures={secondaryFeatures}
        feedPosts={feedPosts}
        currentTheme={{
          bg: '#0a0a0f',
          elevated: '#16161f',
          text: '#ffffff',
          muted: 'rgba(255, 255, 255, 0.7)',
          subtle: 'rgba(255, 255, 255, 0.5)',
          faint: 'rgba(255, 255, 255, 0.3)',
          border: 'rgba(255, 255, 255, 0.05)',
          accent: '#8b5cf6'
        }}
      />
  );
};

export default ResearchPage;

