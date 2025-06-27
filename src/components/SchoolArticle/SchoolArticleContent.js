"use client"

import { useEffect } from 'react';
import styles from './SchoolArticleContent.module.css';

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
          return `<h1 id="introduction" class="article-section">${line.substring(2)}</h1>`;
        }
        if (line.startsWith('## ')) {
          const id = line.substring(3).toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return `<h2 id="${id}" class="article-section">${line.substring(3)}</h2>`;
        }
        if (line.startsWith('### ')) {
          return `<h3>${line.substring(4)}</h3>`;
        }
        
        // Paragraphs
        if (line.trim() && !line.startsWith('```') && !line.startsWith('- ') && !line.startsWith('1. ')) {
          return `<p>${line}</p>`;
        }
        
        // Lists
        if (line.startsWith('- ')) {
          return `<li>${line.substring(2)}</li>`;
        }
        if (line.startsWith('1. ')) {
          return `<li>${line.substring(3)}</li>`;
        }
        
        // Code blocks
        if (line.startsWith('```')) {
          return `<div class="${styles.codeBlock}"><div class="${styles.codeHeader}"><span class="${styles.codeLabel}">Code Example</span><button class="${styles.copyButton}">Copy</button></div><div class="${styles.codeContent}"><pre class="${styles.codePre}">`;
        }
        if (line === '```') {
          return '</pre></div></div>';
        }
        
        // Bold text
        if (line.includes('**')) {
          const boldLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          return `<p>${boldLine}</p>`;
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
    <div className={styles.prose}>
      <div 
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content) }}
      />
    </div>
  );
} 