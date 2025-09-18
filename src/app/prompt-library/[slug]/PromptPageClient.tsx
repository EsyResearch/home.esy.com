'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import PromptLibrarySidebar from '@/components/PromptLibrary/PromptLibrarySidebar';
import { Prompt, PromptCategory, getCategories } from '@/lib/prompts';

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
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
      <div className="breadcrumbs-section">
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
      <div className="prompt-view-wrapper">
        {/* Left Sidebar */}
        <PromptLibrarySidebar 
          categories={getCategories()}
          activeCategoryId={category?.id}
          showBackButton={false}
        />

        {/* Center: Main Content */}
        <div className="prompt-container">
            {/* Left: Prompt Display */}
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
                onClick={() => setIsDrawerOpen(true)}
                className="action-button customize-button"
              >
                Customize Prompt
              </button>
              <button
                onClick={handleShare}
                className="action-button try-esy-button"
              >
                Try in Esy
              </button>
            </div>
          </header>

          <div className="prompt-display">
            <div className="prompt-content">
              <pre className="prompt-text">{customizedPrompt}</pre>
            </div>
          </div>
        </main>

        {/* Right: Variable Customization - Commented out for drawer version */}
        {/* <aside className="variables-panel">
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
        </aside> */}
        </div>
      </div>

      {/* Customize Variables Drawer */}
      {isDrawerOpen && (
        <div className="drawer-overlay" onClick={() => setIsDrawerOpen(false)}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h2 className="drawer-title">Customize Variables</h2>
              <button 
                className="drawer-close"
                onClick={() => setIsDrawerOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className="drawer-content">
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
            </div>
          </div>
        </div>
      )}

      {/* Related Prompts */}
      {/* {relatedPrompts.length > 0 && (
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
      )} */}

      <style jsx>{`
        .prompt-page {
          min-height: 100vh;
          background-color: #0a0a0f;
          color: white;
          font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
          padding: 0;
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .breadcrumbs-section {
          padding: 6rem 0 0 0;
          margin-bottom: 0;
          width: 100%;
        }

        .breadcrumbs-section :global(.breadcrumbs) {
          margin-bottom: 0 !important;
        }

        .prompt-page .breadcrumbs-section :global(.breadcrumbs) {
          margin-bottom: 0 !important;
        }

        .prompt-page :global(.Breadcrumbs_breadcrumbs__DGlh4) {
          margin-bottom: 0 !important;
        }

        .prompt-view-wrapper {
          display: flex;
          flex: 1;
          width: 100%;
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
            0 4px 20px rgba(139, 92, 246, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
          transform: translateX(2px);
        }

        .category-link.active::before {
          background: linear-gradient(90deg, 
            transparent, 
            rgba(139, 92, 246, 0.2), 
            transparent);
        }

        .category-link.active::after {
          opacity: 1;
          background: linear-gradient(135deg, 
            rgba(139, 92, 246, 0.1) 0%, 
            transparent 50%, 
            rgba(59, 130, 246, 0.1) 100%);
        }

        .category-count {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.1) 0%, 
            rgba(255, 255, 255, 0.05) 100%);
          color: rgba(255, 255, 255, 0.6);
          padding: 6px 12px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 600;
          min-width: 28px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 
            0 1px 3px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
          margin-left: auto;
        }

        .category-link.active .category-count {
          background: linear-gradient(135deg, 
            rgba(139, 92, 246, 0.3) 0%, 
            rgba(139, 92, 246, 0.2) 100%);
          color: rgba(139, 92, 246, 1);
          border-color: rgba(139, 92, 246, 0.4);
          box-shadow: 
            0 0 12px rgba(139, 92, 246, 0.25),
            0 2px 8px rgba(139, 92, 246, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
        }

        .prompt-container {
          flex: 1;
          padding: 2rem 0 3rem 0;
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: none;
        }

        .variables-panel {
          background-color: rgba(22, 22, 31, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 2rem;
          position: sticky;
          top: 2rem;
          margin-right: 2rem;
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
          padding: 0 2rem;
        }

        .prompt-header {
          margin-bottom: 0;
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
          margin-bottom: 32px;
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

        .try-esy-button {
          background-color: #8b5cf6;
          color: white;
        }

        .try-esy-button:hover {
          background-color: #7c3aed;
        }

        .customize-button {
          background-color: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .customize-button:hover {
          background-color: rgba(255, 255, 255, 0.15);
          color: white;
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

        /* Drawer Styles */
        .drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          display: flex;
          justify-content: flex-end;
          align-items: stretch;
          animation: fadeIn 0.3s ease;
        }

        .drawer {
          width: 400px;
          max-width: 90vw;
          background-color: rgba(16, 16, 21, 0.95);
          backdrop-filter: blur(20px);
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          animation: slideInRight 0.3s ease;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.3);
        }

        .drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .drawer-title {
          font-family: Literata, Georgia, serif;
          font-size: 1.5rem;
          font-weight: 400;
          margin: 0;
          color: white;
        }

        .drawer-close {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          font-size: 2rem;
          cursor: pointer;
          padding: 0;
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .drawer-close:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .drawer-content {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInRight {
          from { 
            transform: translateX(100%);
            opacity: 0;
          }
          to { 
            transform: translateX(0);
            opacity: 1;
          }
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

        /* Sidebar scrollbar styles */
        .prompt-sidebar::-webkit-scrollbar {
          width: 6px;
        }

        .prompt-sidebar::-webkit-scrollbar-track {
          background: transparent;
          margin: 0.5rem 0;
        }

        .prompt-sidebar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, 
            rgba(139, 92, 246, 0.3) 0%, 
            rgba(139, 92, 246, 0.1) 100%);
          border-radius: 6px;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .prompt-sidebar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, 
            rgba(139, 92, 246, 0.5) 0%, 
            rgba(139, 92, 246, 0.2) 100%);
          box-shadow: 0 0 8px rgba(139, 92, 246, 0.3);
        }

        .category-list::-webkit-scrollbar {
          width: 4px;
        }

        .category-list::-webkit-scrollbar-track {
          background: transparent;
        }

        .category-list::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          transition: background 0.3s ease;
        }

        .category-list::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 1024px) {
          .prompt-sidebar {
            display: none;
          }

          .prompt-container {
            grid-template-columns: 1fr;
            padding: 2rem;
          }

          .variables-panel {
            position: relative;
            top: 0;
            margin-bottom: 2rem;
          }


          .sidebar-title {
            margin: 0 16px 20px 16px;
            font-size: 10px;
            padding-bottom: 10px;
          }

          .category-item {
            margin: 0 16px;
          }

          .category-link {
            padding: 10px 14px;
            font-size: 13px;
            min-height: 44px;
          }

          .category-count {
            padding: 5px 10px;
            font-size: 11px;
            min-width: 24px;
          }
        }

        @media (max-width: 768px) {
          .prompt-page {
            padding: 0;
          }


          .breadcrumbs-section {
            padding: 4.5rem 1rem 0 1rem;
            margin-bottom: 0;
          }

          .prompt-container {
            padding: 1rem;
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