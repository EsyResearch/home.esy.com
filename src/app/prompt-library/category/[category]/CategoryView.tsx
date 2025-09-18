'use client';

import React from 'react';
import Link from 'next/link';
import PromptLibrarySidebar from '@/components/PromptLibrary/PromptLibrarySidebar';

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
          activeCategoryId={category.id}
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
              <Link
                key={prompt.id}
                href={`/prompt-library/${prompt.slug}`}
                className="prompt-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.backgroundColor = 'rgba(22, 22, 31, 1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.backgroundColor = 'rgba(22, 22, 31, 0.8)';
                }}
              >
                <div className="prompt-card-header">
                  <h3 className="prompt-card-title">{prompt.title}</h3>
                  <p className="prompt-card-description">{prompt.shortDescription}</p>
                </div>
                
                <div className="prompt-card-meta">
                  {prompt.isPro && <span className="pro-label">Pro</span>}
                </div>
              </Link>
            ))}
          </div>
          
          {prompts.length === 0 && (
            <div className="no-prompts">
              <p className="no-prompts-title">No prompts found</p>
              <p>This category is coming soon with more prompts</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .category-page {
          background-color: #0a0a0f;
          min-height: 100vh;
          color: white;
          font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
          padding-top: 80px; /* Account for header height */
        }

        .category-view {
          display: flex;
          min-height: calc(100vh - 80px);
        }


        .category-view-main {
          flex: 1;
          padding: 2rem;
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
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          max-width: 1200px;
        }

        .prompt-card {
          background-color: rgba(22, 22, 31, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: clamp(1.5rem, 4vw, 2rem);
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
          width: 100%;
          box-sizing: border-box;
          text-decoration: none;
          color: white;
          display: block;
        }

        .prompt-card-header {
          margin-bottom: 1.5rem;
        }

        .prompt-card-title {
          font-family: Literata, Georgia, serif;
          font-size: clamp(1.1rem, 3vw, 1.3rem);
          font-weight: 400;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }

        .prompt-card-description {
          opacity: 0.7;
          font-size: clamp(0.85rem, 2.5vw, 0.95rem);
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .prompt-card-meta {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          font-size: clamp(0.75rem, 2vw, 0.85rem);
          opacity: 0.5;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .pro-label {
          background-color: rgba(139, 92, 246, 0.15);
          color: #8b5cf6;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
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
          .category-view {
            flex-direction: column;
          }
          
          .prompt-sidebar {
            width: 100%;
            height: auto;
            position: relative;
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }
          
          .category-prompt-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .category-view-main {
            padding: 1rem;
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