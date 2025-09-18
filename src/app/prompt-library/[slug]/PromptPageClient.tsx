'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import PromptLibrarySidebar from '@/components/PromptLibrary/PromptLibrarySidebar';
import CopyrightFooter from '@/components/CopyrightFooter';
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
      {/* Main Content Wrapper with Sidebar */}
      <div className="prompt-layout">
        {/* Left Sidebar */}
        <PromptLibrarySidebar 
          categories={getCategories()}
          activeCategoryId={category?.id}
          showBackButton={false}
        />

        {/* Main Content Area */}
        <div className="prompt-content">
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

          {/* Prompt Container */}
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
            <div className="prompt-display-header">
              <span className="prompt-display-title">Prompt Template</span>
              <div className="prompt-display-actions">
                <div className="prompt-display-dot"></div>
                <div className="prompt-display-dot"></div>
                <div className="prompt-display-dot green"></div>
              </div>
            </div>
            <div className="prompt-content" onClick={(e) => {
              // Check if clicked element is a variable
              const target = e.target as HTMLElement;
              if (target.classList.contains('prompt-variable')) {
                setIsDrawerOpen(true);
              }
            }}>
              <pre className="prompt-text" dangerouslySetInnerHTML={{ 
                __html: customizedPrompt
                  .replace(/\[([^\]]+)\]/g, '<span class="prompt-variable" role="button" tabindex="0" title="Click to customize">[$1]</span>')
                  .replace(/^(\d+)\.\s+(.*)$/gm, '<span class="prompt-numbered-item">$2</span>')
                  .replace(/^[-•]\s+(.*)$/gm, '<span class="prompt-list-item">$1</span>')
                  .replace(/\*\*([^*]+)\*\*/g, '<span class="prompt-emphasis">$1</span>')
              }} />
            </div>
            {copied && (
              <div className="copy-indicator">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Copied to clipboard
              </div>
            )}
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
          
          {/* Footer inside content area */}
          <CopyrightFooter />
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
        }

        .prompt-layout {
          min-height: 100vh;
          display: block;
        }

        .prompt-content {
          margin-left: 280px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .breadcrumbs-section {
          padding: 6rem 2rem 0 2rem;
          margin-bottom: 0;
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
          padding: 2rem;
          display: flex;
          flex-direction: column;
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
          padding: 0 2rem;
          max-width: 900px;
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
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          font-family: Inter, sans-serif;
          position: relative;
          overflow: hidden;
          letter-spacing: 0.3px;
        }

        .action-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.1), 
            transparent);
          transition: left 0.5s ease;
        }

        .action-button:hover::before {
          left: 100%;
        }

        .copy-button {
          background: linear-gradient(135deg, 
            rgba(30, 30, 42, 0.9) 0%, 
            rgba(35, 35, 48, 0.9) 100%);
          color: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 
            0 4px 12px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.05) inset;
        }

        .copy-button:hover {
          background: linear-gradient(135deg, 
            rgba(40, 40, 55, 0.95) 0%, 
            rgba(45, 45, 60, 0.95) 100%);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 
            0 6px 20px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1) inset;
        }

        .copy-button.copied {
          background: linear-gradient(135deg, 
            rgba(34, 197, 94, 0.9) 0%, 
            rgba(34, 197, 94, 0.8) 100%);
          border: 1px solid rgba(34, 197, 94, 0.3);
          color: white;
          box-shadow: 
            0 4px 12px rgba(34, 197, 94, 0.3),
            0 0 20px rgba(34, 197, 94, 0.2);
        }

        .try-esy-button {
          background: linear-gradient(135deg, 
            rgba(139, 92, 246, 0.9) 0%, 
            rgba(124, 58, 237, 0.9) 100%);
          color: white;
          border: 1px solid transparent;
          box-shadow: 
            0 4px 15px rgba(139, 92, 246, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1) inset;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .try-esy-button:hover {
          background: linear-gradient(135deg, 
            rgba(147, 102, 251, 1) 0%, 
            rgba(132, 68, 242, 1) 100%);
          transform: translateY(-2px);
          box-shadow: 
            0 6px 25px rgba(139, 92, 246, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.15) inset;
        }

        .customize-button {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.08) 0%, 
            rgba(255, 255, 255, 0.05) 100%);
          color: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          box-shadow: 
            0 4px 12px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.05) inset;
        }

        .customize-button:hover {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.12) 0%, 
            rgba(255, 255, 255, 0.08) 100%);
          color: white;
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
          box-shadow: 
            0 6px 20px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1) inset;
        }

        .prompt-display {
          background: rgba(17, 17, 24, 0.98);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 4px 16px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.03);
          max-width: 100%;
        }

        .prompt-display-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.25rem;
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .prompt-display-title {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 500;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .prompt-display-actions {
          display: flex;
          gap: 0.5rem;
        }

        .prompt-display-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
        }

        .prompt-display-dot.green {
          background: rgba(34, 197, 94, 0.5);
        }

        .prompt-content {
          max-height: 400px;
          overflow-y: auto;
          padding: 1.5rem;
          position: relative;
          background: linear-gradient(180deg, 
            transparent 0%, 
            transparent calc(100% - 40px), 
            rgba(17, 17, 24, 0.98) 100%);
          counter-reset: prompt-counter;
          text-align: left !important;
        }

        .prompt-content::-webkit-scrollbar {
          width: 8px;
        }

        .prompt-content::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 4px;
        }

        .prompt-content::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .prompt-content::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .prompt-text {
          font-size: 0.925rem;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.9);
          white-space: pre-wrap;
          font-family: 'JetBrains Mono', 'SF Mono', 'Monaco', 'Inconsolata', monospace;
          word-break: break-word;
          overflow-wrap: break-word;
          margin: 0;
          padding: 0;
          letter-spacing: 0.3px;
          text-align: left !important;
          display: block;
          width: 100%;
          hyphens: none;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Force all content to be left-aligned */
        .prompt-content * {
          text-align: left !important;
        }

        /* Ensure pre element is properly aligned */
        .prompt-content pre {
          margin: 0;
          padding: 0;
          text-align: left !important;
          white-space: pre-wrap;
        }

        /* Ensure proper paragraph spacing */
        .prompt-text-paragraph {
          margin-bottom: 1rem;
          display: block;
        }

        .prompt-text-paragraph:last-child {
          margin-bottom: 0;
        }

        /* Highlight variables in brackets */
        :global(.prompt-variable) {
          color: #a78bfa;
          background: rgba(139, 92, 246, 0.08);
          padding: 3px 8px;
          border-radius: 5px;
          font-weight: 600;
          border: 1px solid rgba(139, 92, 246, 0.15);
          display: inline-block;
          margin: 0 3px;
          transition: all 0.2s ease;
          vertical-align: baseline;
          font-size: 0.95em;
          letter-spacing: 0.4px;
          box-shadow: 0 1px 3px rgba(139, 92, 246, 0.1);
          cursor: pointer;
          user-select: none;
          position: relative;
        }

        :global(.prompt-variable):hover {
          background: rgba(139, 92, 246, 0.18);
          border-color: rgba(139, 92, 246, 0.35);
          color: #c9b5fc;
          transform: translateY(-1px);
          box-shadow: 
            0 3px 8px rgba(139, 92, 246, 0.25),
            0 0 0 2px rgba(139, 92, 246, 0.1);
        }

        :global(.prompt-variable):active {
          transform: translateY(0);
          background: rgba(139, 92, 246, 0.25);
        }

        /* Add a subtle pulse animation on hover */
        :global(.prompt-variable)::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border-radius: 5px;
          background: rgba(139, 92, 246, 0.2);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        :global(.prompt-variable):hover::after {
          animation: variablePulse 0.6s ease-out;
        }

        @keyframes variablePulse {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1.1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        .prompt-text::selection {
          background: rgba(139, 92, 246, 0.25);
          color: white;
        }

        /* Format list items and indentation */
        :global(.prompt-list-item) {
          display: block;
          padding-left: 1.25rem;
          position: relative;
          margin: 0.5rem 0;
          text-align: left;
        }

        :global(.prompt-list-item)::before {
          content: '•';
          position: absolute;
          left: 0;
          color: rgba(139, 92, 246, 0.6);
          font-weight: bold;
        }

        :global(.prompt-numbered-item) {
          display: block;
          padding-left: 1.5rem;
          position: relative;
          margin: 0.5rem 0;
          counter-increment: prompt-counter;
          text-align: left;
        }

        :global(.prompt-numbered-item)::before {
          content: counter(prompt-counter) '.';
          position: absolute;
          left: 0;
          color: rgba(139, 92, 246, 0.6);
          font-weight: 600;
          font-size: 0.9em;
        }

        :global(.prompt-indent) {
          padding-left: 1.5rem;
          display: block;
          border-left: 2px solid rgba(139, 92, 246, 0.1);
          margin: 0.75rem 0;
          text-align: left;
        }

        :global(.prompt-emphasis) {
          color: rgba(255, 255, 255, 0.95);
          font-weight: 600;
          background: rgba(255, 255, 255, 0.03);
          padding: 1px 4px;
          border-radius: 3px;
        }

        /* Line numbers for better readability */
        .prompt-line-numbers {
          position: absolute;
          left: 0;
          top: 1.5rem;
          bottom: 1.5rem;
          width: 40px;
          background: rgba(255, 255, 255, 0.02);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          padding: 0;
          display: flex;
          flex-direction: column;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.3);
          line-height: 1.7;
          font-family: 'JetBrains Mono', monospace;
        }

        .prompt-line-number {
          padding: 0 0.5rem;
          text-align: right;
          user-select: none;
        }

        .prompt-content.with-line-numbers {
          padding-left: calc(40px + 1.5rem);
        }

        .copy-indicator {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(135deg, 
            rgba(139, 92, 246, 0.95) 0%, 
            rgba(109, 62, 216, 0.95) 100%);
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.95rem;
          font-weight: 500;
          box-shadow: 
            0 10px 40px rgba(139, 92, 246, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1) inset;
          animation: copyPulse 0.6s ease-out;
          z-index: 10;
        }

        @keyframes copyPulse {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.05);
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }

        .copy-indicator svg {
          color: white;
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
          .prompt-content {
            margin-left: 0;
          }
          
          .prompt-container {
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
          .breadcrumbs-section {
            padding: 4.5rem 1rem 0 1rem;
          }

          .prompt-container {
            padding: 1rem;
            gap: 2rem;
          }
          
          .prompt-main {
            padding: 0 1rem;
            max-width: 100%;
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