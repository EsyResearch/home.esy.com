import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPromptsByCategory, getCategories, getCategoryBySlug } from '@/lib/prompts';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map(cat => ({
    category: cat.slug
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.category);
  
  if (!category) {
    return {
      title: 'Category Not Found | Esy',
      description: 'The requested category could not be found.',
    };
  }
  
  return {
    title: `${category.name} Prompts - AI Prompt Library | Esy`,
    description: category.description,
    keywords: [category.name, 'AI prompts', 'prompt templates', params.category],
    openGraph: {
      title: `${category.name} Prompts`,
      description: category.description,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.category);
  
  if (!category) {
    notFound();
  }

  const prompts = await getPromptsByCategory(category.id);
  const categories = getCategories();

  return (
    <div className="category-page">
      {/* Breadcrumbs */}
      <nav className="breadcrumbs">
        <Link href="/prompt-library">Prompt Library</Link>
        <span className="separator">/</span>
        <span className="current">{category.name}</span>
      </nav>

      {/* Category Header */}
      <header className="category-header">
        <h1 className="category-title">{category.name}</h1>
        <p className="category-description">{category.description}</p>
        <div className="category-meta">
          <span>{prompts.length} prompt{prompts.length !== 1 ? 's' : ''}</span>
          <span>Academic Grade</span>
          <span>Research Tested</span>
        </div>
      </header>

      {/* Category Navigation */}
      <nav className="category-nav">
        <Link href="/prompt-library" className="category-link">
          All Prompts
        </Link>
        {categories.map(cat => (
          <Link 
            key={cat.id}
            href={`/prompt-library/category/${cat.slug}`}
            className={`category-link ${cat.id === category.id ? 'active' : ''}`}
          >
            {cat.name}
            <span className="category-count">{cat.count}</span>
          </Link>
        ))}
      </nav>

      {/* Prompts Grid */}
      <main className="prompts-grid">
        {prompts.map(prompt => (
          <Link
            key={prompt.id}
            href={`/prompt-library/${prompt.slug}`}
            className="prompt-card"
          >
            <div className="prompt-card-header">
              <h3 className="prompt-card-title">{prompt.title}</h3>
              <p className="prompt-card-description">{prompt.shortDescription}</p>
            </div>
            
            <div className="prompt-card-meta">
              {prompt.isPro && <span className="pro-badge">Pro</span>}
              {prompt.variables.length > 0 && (
                <span className="variables-count">
                  {prompt.variables.length} variables
                </span>
              )}
            </div>
          </Link>
        ))}
      </main>

      <style jsx>{`
        .category-page {
          min-height: 100vh;
          background-color: #0a0a0f;
          color: white;
          font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
          padding: 2rem 0 4rem 0;
        }

        .breadcrumbs {
          max-width: 1400px;
          margin: 0 auto 2rem auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          opacity: 0.6;
        }

        .breadcrumbs a {
          color: white;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }

        .breadcrumbs a:hover {
          opacity: 0.8;
        }

        .separator {
          opacity: 0.4;
        }

        .current {
          opacity: 1;
        }

        .category-header {
          max-width: 1400px;
          margin: 0 auto 3rem auto;
          padding: 0 2rem 2rem 2rem;
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
          max-width: 800px;
        }

        .category-meta {
          display: flex;
          gap: 2rem;
          font-size: 0.9rem;
          opacity: 0.6;
        }

        .category-nav {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          max-width: 1400px;
          margin: 0 auto 4rem auto;
          padding: 0 2rem;
        }

        .category-link {
          padding: clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem);
          background-color: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 25px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: all 0.2s ease;
          font-size: clamp(0.8rem, 2vw, 0.9rem);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .category-link:hover {
          background-color: rgba(255, 255, 255, 0.05);
          color: white;
        }

        .category-link.active {
          background-color: #8b5cf6;
          border-color: #8b5cf6;
          color: white;
        }

        .category-count {
          background-color: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.6);
          padding: 0.25rem 0.6rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .category-link.active .category-count {
          background-color: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .prompts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(350px, 100%), 1fr));
          gap: clamp(1rem, 3vw, 2rem);
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 clamp(1rem, 4vw, 2rem);
        }

        .prompt-card {
          background-color: rgba(22, 22, 31, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: clamp(1.5rem, 4vw, 2rem);
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
          text-decoration: none;
          color: white;
          display: block;
        }

        .prompt-card:hover {
          border-color: rgba(139, 92, 246, 0.3);
          transform: translateY(-4px);
          background-color: rgba(22, 22, 31, 1);
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
        }

        .prompt-card-meta {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          flex-wrap: wrap;
          font-size: clamp(0.75rem, 2vw, 0.85rem);
        }

        .pro-badge {
          background-color: rgba(251, 191, 36, 0.15);
          color: #fbbf24;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .variables-count {
          opacity: 0.5;
          font-size: 0.75rem;
        }

        @media (max-width: 768px) {
          .prompts-grid {
            grid-template-columns: 1fr;
            padding: 0 1rem;
          }
          
          .category-nav {
            gap: 0.25rem;
            padding: 0 1rem;
          }

          .category-header {
            padding: 0 1rem 2rem 1rem;
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