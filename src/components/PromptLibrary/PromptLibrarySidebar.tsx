'use client';

import React from 'react';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
}

interface PromptLibrarySidebarProps {
  categories: Category[];
  activeCategoryId?: string;
  showBackButton?: boolean;
  backButtonHref?: string;
  backButtonText?: string;
}

export default function PromptLibrarySidebar({
  categories,
  activeCategoryId,
  showBackButton = true,
  backButtonHref = '/prompt-library',
  backButtonText = '← Back to Library'
}: PromptLibrarySidebarProps) {
  return (
    <aside className="prompt-sidebar">
      <div className="sidebar-content">
        {showBackButton && (
          <Link 
            href={backButtonHref}
            className="back-button"
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = 'transparent';
              target.style.color = 'rgba(255, 255, 255, 0.7)';
            }}
          >
            {backButtonText}
          </Link>
        )}
        
        <h3 className="sidebar-title">Categories</h3>
        <ul className="category-list">
          <li className="category-item">
            <Link
              href="/prompt-library"
              className={`category-link ${!activeCategoryId ? 'active' : ''}`}
              onMouseEnter={(e) => {
                if (!activeCategoryId) return;
                const target = e.target as HTMLElement;
                target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                if (!activeCategoryId) return;
                const target = e.target as HTMLElement;
                target.style.backgroundColor = 'transparent';
                target.style.color = 'rgba(255, 255, 255, 0.7)';
              }}
            >
              <span>All Prompts</span>
              {/* <span className="category-count">68</span> */}
            </Link>
          </li>
          {categories.map(cat => (
            <li key={cat.id} className="category-item">
              <Link
                href={`/prompt-library/category/${cat.slug}`}
                className={`category-link ${cat.id === activeCategoryId ? 'active' : ''}`}
                onMouseEnter={(e) => {
                  if (cat.id === activeCategoryId) return;
                  const target = e.target as HTMLElement;
                  target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  if (cat.id === activeCategoryId) return;
                  const target = e.target as HTMLElement;
                  target.style.backgroundColor = 'transparent';
                  target.style.color = 'rgba(255, 255, 255, 0.7)';
                }}
              >
                <span>{cat.name}</span>
                {/* <span className="category-count">{cat.count}</span> */}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .prompt-sidebar {
          width: 280px;
          background: linear-gradient(180deg, 
            rgba(8, 8, 12, 0.98) 0%, 
            rgba(12, 12, 18, 0.95) 30%, 
            rgba(16, 16, 21, 0.92) 70%, 
            rgba(20, 20, 26, 0.95) 100%);
          backdrop-filter: blur(24px) saturate(1.2);
          border-right: none;
          box-shadow: 
            inset -1px 0 0 rgba(255, 255, 255, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.02),
            0 0 60px rgba(0, 0, 0, 0.4),
            0 0 120px rgba(139, 92, 246, 0.05);
          padding: 0;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
          z-index: 10;
          position: relative;
        }

        .prompt-sidebar::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 0.5px;
          height: 100%;
          background: linear-gradient(180deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.03) 30%, 
            rgba(255, 255, 255, 0.05) 50%, 
            rgba(255, 255, 255, 0.03) 70%, 
            transparent 100%);
          z-index: 1;
        }

        .prompt-sidebar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            rgba(139, 92, 246, 0.02) 0%, 
            transparent 50%, 
            rgba(59, 130, 246, 0.02) 100%);
          pointer-events: none;
          z-index: -1;
        }

        .sidebar-content {
          padding: 32px 0;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background-color: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.9rem;
          margin-bottom: 2rem;
          font-family: Inter, sans-serif;
          text-decoration: none;
        }

        .sidebar-title {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255, 255, 255, 0.3);
          margin: 0 20px 40px 20px;
          padding-top: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
        }

        .sidebar-title::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 32px;
          height: 1px;
          background: linear-gradient(90deg, 
            rgba(139, 92, 246, 0.6) 0%, 
            transparent 100%);
        }

        .category-list {
          list-style: none;
          padding: 0;
          margin: 0;
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 0 0 40px 0;
        }

        .category-item {
          margin: 0 20px;
        }

        .category-item:not(:first-child) {
          margin-left: 32px;
          opacity: 0.85;
        }

        .category-item:first-child {
          margin-top: 0;
          font-weight: 600;
          border-left: 2px solid rgba(139, 92, 246, 0.4);
          padding-left: 8px;
        }

        .category-item:first-child .category-link {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.06) 0%, 
            rgba(255, 255, 255, 0.03) 100%);
          border-color: rgba(255, 255, 255, 0.12);
          font-weight: 600;
        }

        .category-item:last-child {
          margin-bottom: 0;
        }

        .category-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          border-radius: 12px;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.06);
          width: 100%;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.02) 0%, 
            rgba(255, 255, 255, 0.01) 100%);
          box-shadow: 
            0 1px 3px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          min-height: 56px;
          gap: 20px;
        }

        .category-link > span:first-child {
          flex: 1;
          text-align: left;
        }

        .category-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.12), 
            transparent);
          transition: left 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .category-link::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            rgba(139, 92, 246, 0.05) 0%, 
            transparent 50%, 
            rgba(59, 130, 246, 0.05) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
          border-radius: 12px;
        }

        .category-link:hover::before {
          left: 100%;
        }

        .category-link:hover::after {
          opacity: 1;
        }

        .category-link:hover {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.08) 0%, 
            rgba(255, 255, 255, 0.04) 100%);
          color: rgba(255, 255, 255, 0.95);
          border-color: rgba(255, 255, 255, 0.12);
          transform: translateX(3px) translateY(-1px);
          box-shadow: 
            0 4px 16px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .category-link.active {
          background: linear-gradient(135deg, 
            rgba(139, 92, 246, 0.15) 0%, 
            rgba(139, 92, 246, 0.08) 50%,
            rgba(139, 92, 246, 0.12) 100%);
          color: white;
          border: 1px solid rgba(139, 92, 246, 0.3);
          box-shadow: 
            0 0 0 1px rgba(139, 92, 246, 0.2),
            0 4px 16px rgba(139, 92, 246, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </aside>
  );
}
