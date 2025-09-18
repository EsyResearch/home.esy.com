


'use client';

import React from 'react';
import Link from 'next/link';
import PromptLibrarySidebar from '@/components/PromptLibrary/PromptLibrarySidebar';
import PromptCard from '@/components/PromptLibrary/PromptCard';
import CopyrightFooter from '@/components/CopyrightFooter';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
}

interface Prompt {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  isPro: boolean;
  variables: string[];
}

interface CategoryViewProps {
  category: Category;
  prompts: Prompt[];
  categories: Category[];
}

export default function CategoryView({ category, prompts, categories }: CategoryViewProps) {
  // Get category descriptions based on category ID
  const getCategoryDescription = (categoryId: string) => {
    switch (categoryId) {
      case 'writing':
        return 'Master the art of creative writing with prompts designed for character development, scene construction, and narrative excellence.';
      case 'research':
        return 'Comprehensive frameworks for academic research, literature reviews, and scholarly analysis with methodological rigor.';
      case 'analysis':
        return 'Advanced analytical tools for literary criticism, textual analysis, and interpretive frameworks.';
      case 'essays':
        return 'Professional essay writing frameworks for argumentative, persuasive, and academic compositions.';
      case 'professional':
        return 'Executive-level communication tools for business writing, reports, and professional correspondence.';
      case 'ebooks':
        return 'Complete publishing frameworks for non-fiction books, guides, and educational content.';
      default:
        return 'Explore specialized prompts designed for your specific needs.';
    }
  };

  return (
    <div className="category-page">
      <div className="category-view">
        {/* Left Sidebar */}
        <PromptLibrarySidebar 
          categories={categories}
          activeCategorySlug={category.slug}
          showBackButton={false}
        />
        
        {/* Main Content */}
        <div className="category-view-main">
          <div className="category-header">
            <h1 className="category-title">{category.name}</h1>
            <p className="category-description">
              {getCategoryDescription(category.id)}
            </p>
            <div className="category-meta">
              <span>{prompts.length} prompt{prompts.length !== 1 ? 's' : ''}</span>
              <span>Academic Grade</span>
              <span>Research Tested</span>
            </div>
          </div>
          
          <div className="category-prompt-grid">
            {prompts.map(prompt => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
          
          {prompts.length === 0 && (
            <div className="no-prompts">
              <p className="no-prompts-title">No prompts found</p>
              <p>This category is coming soon with more prompts</p>
            </div>
          )}
          
          {/* Footer inside content area */}
          <CopyrightFooter />
        </div>
      </div>

      <style jsx>{`
        .category-page {
          background-color: #0a0a0f;
          min-height: 100vh;
          color: white;
          font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .category-view {
          min-height: 100vh;
        }

        .category-view-main {
          margin-left: 280px;
          min-height: 100vh;
          padding: 6rem 2rem 2rem 2rem;
          display: flex;
          flex-direction: column;
        }

        .category-header {
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .category-title {
          font-family: Literata, Georgia, serif;
          font-size: 2.5rem;
          font-weight: 400;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .category-description {
          font-size: 1.1rem;
          opacity: 0.8;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .category-meta {
          display: flex;
          gap: 2rem;
          font-size: 0.9rem;
          opacity: 0.6;
        }

        .category-prompt-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          flex: 1;
        }
        
        @media (max-width: 1200px) {
          .category-prompt-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }


        .no-prompts {
          text-align: center;
          padding: 4rem 2rem;
          opacity: 0.5;
        }

        .no-prompts-title {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }

        @media (max-width: 1024px) {
          .category-view-main {
            margin-left: 0;
          }
        }

        @media (max-width: 768px) {
          .category-prompt-grid {
            grid-template-columns: 1fr;
          }
          
          .category-view-main {
            padding: 5rem 1rem 1rem 1rem;
          }
          
          .sidebar-content {
            padding: 0 1rem;
          }
          
          .category-meta {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}