'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Prompt, PromptCategory } from '@/lib/prompts';

interface PromptPageClientProps {
  prompt: Prompt;
  category: PromptCategory | null;
  relatedPrompts: Prompt[];
}

export default function PromptPageClient({ 
  prompt, 
  category, 
  relatedPrompts 
}: PromptPageClientProps) {
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [customizedPrompt, setCustomizedPrompt] = useState(prompt.prompt);
  
  // Initialize variables
  useEffect(() => {
    const initialVars: Record<string, string> = {};
    prompt.variables.forEach(v => {
      initialVars[v] = '';
    });
    setVariables(initialVars);
  }, [prompt.variables]);

  // Update customized prompt when variables change
  useEffect(() => {
    let updated = prompt.prompt;
    Object.entries(variables).forEach(([key, value]) => {
      const placeholder = `[${key}]`;
      updated = updated.replaceAll(placeholder, value || placeholder);
    });
    setCustomizedPrompt(updated);
  }, [variables, prompt.prompt]);

  const handleVariableChange = (variable: string, value: string) => {
    setVariables(prev => ({
      ...prev,
      [variable]: value
    }));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(customizedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: prompt.title,
          text: prompt.shortDescription,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled:', err);
      }
    } else {
      // Fallback to copying link
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="prompt-page">
      {/* Breadcrumbs */}
      <div style={{ marginBottom: '2rem' }}>
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Prompt Library', href: '/prompt-library' },
            ...(category ? [{ label: category.name, href: `/prompt-library/category/${category.slug}` }] : []),
            { label: prompt.title, isCurrent: true }
          ]}
        />
      </div>

      {/* Main Content */}
      <div className="prompt-container">
        {/* Left: Variable Customization */}
        <aside className="variables-panel">
          <h2 className="panel-title">Customize Variables</h2>
          {prompt.variables.length > 0 ? (
            <div className="variables-list">
              {prompt.variables.map(variable => (
                <div key={variable} className="variable-input-group">
                  <label htmlFor={variable} className="variable-label">
                    {variable.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                  </label>
                  <input
                    id={variable}
                    type="text"
                    value={variables[variable] || ''}
                    onChange={(e) => handleVariableChange(variable, e.target.value)}
                    placeholder={`Enter ${variable.toLowerCase()}`}
                    className="variable-input"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="no-variables">This prompt has no customizable variables.</p>
          )}

          <div className="prompt-meta">
            <h3 className="meta-title">About This Prompt</h3>
            <p className="meta-description">{prompt.description}</p>
            <div className="meta-tags">
              <span className="meta-tag category-tag">
                {category?.name}
              </span>
              {prompt.isPro && (
                <span className="meta-tag pro-tag">Pro</span>
              )}
            </div>
          </div>
        </aside>

        {/* Right: Prompt Display */}
        <main className="prompt-main">
          <header className="prompt-header">
            <h1 className="prompt-title">{prompt.title}</h1>
            <p className="prompt-description">{prompt.shortDescription}</p>
            
            <div className="prompt-actions">
              <button
                onClick={handleCopy}
                className={`action-button copy-button ${copied ? 'copied' : ''}`}
              >
                {copied ? '✓ Copied' : 'Copy Prompt'}
              </button>
              <button
                onClick={handleShare}
                className="action-button share-button"
              >
                Share
              </button>
            </div>
          </header>

          <div className="prompt-display">
            <div className="prompt-content">
              <pre className="prompt-text">{customizedPrompt}</pre>
            </div>
          </div>
        </main>
      </div>

      {/* Related Prompts */}
      {relatedPrompts.length > 0 && (
        <section className="related-prompts">
          <h2 className="related-title">Related Prompts</h2>
          <div className="related-grid">
            {relatedPrompts.map(related => (
              <Link
                key={related.id}
                href={`/prompt-library/${related.slug}`}
                className="related-card"
              >
                <h3 className="related-card-title">{related.title}</h3>
                <p className="related-card-description">{related.shortDescription}</p>
                <span className="related-card-category">
                  {category?.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <style jsx>{`
        .prompt-page {
          min-height: 100vh;
          background-color: #0a0a0f;
          color: white;
          font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
          padding: 6rem 0 2rem 0;
        }


        .prompt-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 3rem;
          align-items: start;
        }

        .variables-panel {
          background-color: rgba(22, 22, 31, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 2rem;
          position: sticky;
          top: 2rem;
        }

        .panel-title {
          font-family: Literata, Georgia, serif;
          font-size: 1.3rem;
          font-weight: 400;
          margin-bottom: 1.5rem;
        }

        .variables-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .variable-input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .variable-label {
          font-size: 0.9rem;
          opacity: 0.8;
          font-weight: 500;
        }

        .variable-input {
          width: 100%;
          padding: 1rem;
          background-color: rgba(10, 10, 15, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.2s ease;
        }

        .variable-input:focus {
          border-color: rgba(139, 92, 246, 0.4);
        }

        .variable-input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .no-variables {
          opacity: 0.6;
          font-style: italic;
          margin: 1rem 0;
        }

        .prompt-meta {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .meta-title {
          font-size: 1.1rem;
          font-weight: 500;
          margin-bottom: 0.75rem;
        }

        .meta-description {
          font-size: 0.9rem;
          opacity: 0.7;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .meta-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .meta-tag {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .category-tag {
          background-color: rgba(139, 92, 246, 0.15);
          color: #8b5cf6;
        }

        .pro-tag {
          background-color: rgba(251, 191, 36, 0.15);
          color: #fbbf24;
        }

        .prompt-main {
          flex: 1;
        }

        .prompt-header {
          margin-bottom: 2rem;
        }

        .prompt-title {
          font-family: Literata, Georgia, serif;
          font-size: clamp(1.8rem, 5vw, 2.5rem);
          font-weight: 400;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .prompt-description {
          font-size: clamp(1rem, 3vw, 1.1rem);
          opacity: 0.8;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .prompt-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .action-button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: Inter, sans-serif;
        }

        .copy-button {
          background-color: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .copy-button:hover {
          background-color: rgba(255, 255, 255, 0.15);
          color: white;
        }

        .copy-button.copied {
          background-color: #10b981;
          color: white;
          border-color: #10b981;
        }

        .share-button {
          background-color: #8b5cf6;
          color: white;
        }

        .share-button:hover {
          background-color: #7c3aed;
        }

        .prompt-display {
          background-color: rgba(10, 10, 15, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 2rem;
          position: relative;
        }

        .prompt-content {
          max-height: 600px;
          overflow-y: auto;
        }

        .prompt-text {
          font-size: clamp(0.8rem, 2vw, 0.95rem);
          line-height: 1.8;
          opacity: 0.9;
          white-space: pre-wrap;
          font-family: JetBrains Mono, Consolas, monospace;
          word-break: break-word;
          overflow-wrap: break-word;
          margin: 0;
        }

        .related-prompts {
          max-width: 1400px;
          margin: 4rem auto 0 auto;
          padding: 0 2rem;
        }

        .related-title {
          font-family: Literata, Georgia, serif;
          font-size: 1.8rem;
          font-weight: 400;
          margin-bottom: 2rem;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .related-card {
          background-color: rgba(22, 22, 31, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 1.5rem;
          text-decoration: none;
          color: white;
          transition: all 0.2s ease;
        }

        .related-card:hover {
          border-color: rgba(139, 92, 246, 0.3);
          transform: translateY(-2px);
        }

        .related-card-title {
          font-size: 1.1rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .related-card-description {
          font-size: 0.9rem;
          opacity: 0.6;
          line-height: 1.5;
          margin-bottom: 0.75rem;
        }

        .related-card-category {
          font-size: 0.75rem;
          opacity: 0.5;
        }

        /* Scrollbar styles */
        .prompt-content::-webkit-scrollbar {
          width: 8px;
        }

        .prompt-content::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }

        .prompt-content::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .prompt-content::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        @media (max-width: 1024px) {
          .prompt-container {
            grid-template-columns: 1fr;
          }

          .variables-panel {
            position: relative;
            top: 0;
            margin-bottom: 2rem;
          }
        }

        @media (max-width: 768px) {
          .prompt-page {
            padding: 5rem 0 1rem 0;
          }


          .prompt-container {
            padding: 0 1rem;
            gap: 2rem;
          }

          .variables-panel {
            padding: 1.5rem;
          }

          .prompt-actions {
            width: 100%;
          }

          .action-button {
            flex: 1;
            justify-content: center;
          }

          .related-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}