'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllPrompts, getCategories, type Prompt } from '@/lib/prompts';

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const categories = getCategories();

  useEffect(() => {
    getAllPrompts().then(setPrompts);
  }, []);

  return (
    <div className="prompts-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">Prompt Library</h1>
        <p className="hero-subtitle">
          Research-grade prompts engineered for academic excellence. 
          Explore our collection of {prompts.length} expertly crafted prompts.
        </p>
      </section>

      {/* Category Navigation */}
      <nav className="category-nav">
        <Link href="/prompts" className="category-link active">
          All Prompts
        </Link>
        {categories.map(category => (
          <Link 
            key={category.id}
            href={`/prompts/category/${category.slug}`}
            className="category-link"
          >
            {category.name}
            <span className="category-count">{category.count}</span>
          </Link>
        ))}
      </nav>

      {/* Prompts Grid */}
      <main className="prompts-grid">
        {prompts.map(prompt => (
          <Link
            key={prompt.id}
            href={`/prompts/${prompt.slug}`}
            className="prompt-card"
          >
            <div className="prompt-card-header">
              <h3 className="prompt-card-title">{prompt.title}</h3>
              <p className="prompt-card-description">{prompt.shortDescription}</p>
            </div>
            
            <div className="prompt-card-meta">
              <span className="category-badge">
                {categories.find(c => c.id === prompt.category)?.name}
              </span>
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
        .prompts-container {
          min-height: 100vh;
          background-color: #0a0a0f;
          color: white;
          font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .hero-section {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 2rem;
          text-align: center;
        }

        .hero-title {
          font-family: Literata, Georgia, serif;
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 300;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 4vw, 1.2rem);
          opacity: 0.7;
          max-width: 600px;
          margin: 0 auto 3rem auto;
          line-height: 1.6;
          padding: 0 1rem;
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
          padding: 0 clamp(1rem, 4vw, 2rem) 4rem clamp(1rem, 4vw, 2rem);
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

        .category-badge {
          background-color: rgba(139, 92, 246, 0.15);
          color: #8b5cf6;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
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
            padding: 0 1rem 3rem 1rem;
          }
          
          .category-nav {
            gap: 0.25rem;
            padding: 0 1rem;
          }
        }
      `}</style>
    </div>
  );
}