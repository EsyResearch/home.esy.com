"use client"

import { useEffect } from 'react';

export default function SchoolArticleContent({ article }) {
  useEffect(() => {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }, []);

  // Simple markdown to HTML conversion for demonstration
  // In a real implementation, you'd use a proper markdown parser like react-markdown
  const renderMarkdown = (content) => {
    return content
      .split('\n')
      .map((line, index) => {
        // Headers
        if (line.startsWith('# ')) {
          return `<h1 id="introduction" class="article-section" style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1.5rem; color: #ffffff;">${line.substring(2)}</h1>`;
        }
        if (line.startsWith('## ')) {
          const id = line.substring(3).toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return `<h2 id="${id}" class="article-section" style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1.5rem; color: #ffffff;">${line.substring(3)}</h2>`;
        }
        if (line.startsWith('### ')) {
          return `<h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #ffffff;">${line.substring(4)}</h3>`;
        }
        
        // Paragraphs
        if (line.trim() && !line.startsWith('```') && !line.startsWith('- ') && !line.startsWith('1. ')) {
          return `<p style="margin-bottom: 1.5rem; line-height: 1.8;">${line}</p>`;
        }
        
        // Lists
        if (line.startsWith('- ')) {
          return `<li style="margin-bottom: 0.5rem;">${line.substring(2)}</li>`;
        }
        if (line.startsWith('1. ')) {
          return `<li style="margin-bottom: 0.5rem;">${line.substring(3)}</li>`;
        }
        
        // Code blocks
        if (line.startsWith('```')) {
          return '<div style="background: #16161f; border: 1px solid #2a2a3a; border-radius: 12px; overflow: hidden; margin-bottom: 2rem;"><div style="background: #1e1e2a; padding: 0.75rem 1.5rem; border-bottom: 1px solid #2a2a3a; display: flex; justify-content: space-between; align-items: center;"><span style="font-size: 0.875rem; font-weight: 500; color: #94a3b8;">Code Example</span><button style="font-size: 0.875rem; color: #6366f1; background: transparent; border: none; cursor: pointer;">Copy</button></div><div style="padding: 1.5rem;"><pre style="font-size: 0.875rem; color: #e0e7ff; font-family: monospace; margin: 0; white-space: pre-wrap;">';
        }
        if (line === '```') {
          return '</pre></div></div>';
        }
        
        // Bold text
        if (line.includes('**')) {
          const boldLine = line.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #ffffff;">$1</strong>');
          return `<p style="margin-bottom: 1.5rem; line-height: 1.8;">${boldLine}</p>`;
        }
        
        // Empty lines
        if (!line.trim()) {
          return '<br>';
        }
        
        return line;
      })
      .join('');
  };

  return (
    <div className="prose" style={{ maxWidth: 'none', color: '#94a3b8', lineHeight: 1.8 }}>
      <div 
        dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content) }}
        style={{
          fontSize: '1.125rem',
          lineHeight: 1.8
        }}
      />
    </div>
  );
} 