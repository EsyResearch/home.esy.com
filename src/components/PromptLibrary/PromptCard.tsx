'use client';

import React from 'react';
import Link from 'next/link';

interface Prompt {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  isPro: boolean;
}

interface PromptCardProps {
  prompt: Prompt;
}

export default function PromptCard({ prompt }: PromptCardProps) {
  return (
    <Link
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

      <style jsx>{`
        :global(.prompt-card) {
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

        @media (max-width: 768px) {
          .prompt-card-meta {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.5rem !important;
          }
        }

        @media (max-width: 320px) {
          :global(.prompt-card) {
            padding: 1rem !important;
          }
        }
      `}</style>
    </Link>
  );
}
