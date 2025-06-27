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

  // Enhanced markdown to HTML conversion with rich content support
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
        
        // Key Insight Blockquote
        if (line.startsWith('> 💡 **Key Insight**')) {
          return '<div class="' + styles.keyInsight + '"><p class="' + styles.keyInsightHeader + '">💡 Key Insight</p>';
        }
        if (line.startsWith('> ') && !line.includes('💡')) {
          return `<p>${line.substring(2)}</p>`;
        }
        if (line === '') {
          return '</div>';
        }
        
        // Numbered Components
        if (line.startsWith('**1. ') || line.startsWith('**2. ') || line.startsWith('**3. ')) {
          const number = line.match(/\*\*(\d+)\./)[1];
          const title = line.match(/\*\*(\d+)\. (.+?)\*\*/)[2];
          const desc = line.split('** - ')[1];
          return `<div class="${styles.componentItem}"><div class="${styles.componentNumber}">${number}</div><div class="${styles.componentContent}"><h4>${title}</h4><p>${desc}</p></div></div>`;
        }
        
        // Principles Grid
        if (line.startsWith('### 🎯') || line.startsWith('### 📝') || line.startsWith('### 💡') || line.startsWith('### 🔄')) {
          const icon = line.match(/### (🎯|📝|💡|🔄)/)[1];
          const title = line.substring(line.indexOf(' ') + 1);
          return `<div class="${styles.principleCard}"><div class="${styles.principleIcon}">${icon}</div><h3 class="${styles.principleTitle}">${title}</h3>`;
        }
        
        // Strategy Cards
        if (line.startsWith('### 1. ') || line.startsWith('### 2. ') || line.startsWith('### 3. ')) {
          const number = line.match(/### (\d+)\./)[1];
          const title = line.substring(line.indexOf('. ') + 2);
          return `<div class="${styles.strategyCard}"><h3 class="${styles.strategyHeader}"><div class="${styles.strategyNumber}">${number}</div>${title}</h3>`;
        }
        
        // Interactive Example
        if (line.startsWith('### Academic Writing Assistant')) {
          return `<div class="${styles.interactiveExample}"><h3 class="${styles.exampleHeader}">Academic Writing Assistant</h3><div class="${styles.exampleContent}">`;
        }
        
        // Video Tutorial
        if (line.startsWith('### Video Tutorial:')) {
          return `<div class="${styles.videoCard}"><div class="${styles.videoHeader}"><h3 class="${styles.videoTitle}">Watch: Prompt Engineering in Action</h3><span class="${styles.videoDuration}">12:34</span></div><div class="${styles.videoPlayer}"><button class="${styles.playButton}"><svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></button></div><p>See real examples of prompt engineering techniques applied to various use cases.</p></div>`;
        }
        
        // Call to Action
        if (line.startsWith('### Ready to Master Prompt Engineering?')) {
          return `<div class="${styles.ctaSection}"><h3 class="${styles.ctaTitle}">Ready to Master Prompt Engineering?</h3>`;
        }
        
        // CTA Button
        if (line.includes('**Enroll in the Course**')) {
          return `<p class="${styles.ctaDescription}">Join our comprehensive course and get hands-on experience with advanced prompting techniques, real-world projects, and expert guidance.</p><button class="${styles.ctaButton}">Enroll in the Course</button></div>`;
        }
        
        // Paragraphs
        if (line.trim() && !line.startsWith('```') && !line.startsWith('- ') && !line.startsWith('1. ') && !line.startsWith('**') && !line.startsWith('>')) {
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
        if (line.startsWith('```prompt')) {
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