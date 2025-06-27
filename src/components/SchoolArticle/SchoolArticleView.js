"use client"

import { useState, useEffect } from 'react';
import styles from './SchoolArticleView.module.css';
import SchoolArticleHeader from './SchoolArticleHeader';
import SchoolArticleContent from './SchoolArticleContent';
import SchoolArticleSidebar from './SchoolArticleSidebar';
import SchoolArticleRightSidebar from './SchoolArticleRightSidebar';
import SchoolArticleAuthor from './SchoolArticleAuthor';
import RelatedSchoolArticles from './RelatedSchoolArticles';
import ScrollToTopButton from './ScrollToTopButton';

export default function SchoolArticleView({ article }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Update active section based on scroll
      const sections = document.querySelectorAll('.article-section');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.container}>
      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <SchoolArticleHeader article={article} />

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Left Sidebar - Table of Contents */}
        <SchoolArticleSidebar 
          activeSection={activeSection} 
          scrollProgress={scrollProgress}
          article={article}
        />

        {/* Article Content */}
        <article className={styles.articleContent}>
          <SchoolArticleContent content={article.content} />
          
          {/* Author Section */}
          <SchoolArticleAuthor author={article.author} />
          
          {/* Related Articles */}
          <RelatedSchoolArticles articles={article.relatedArticles} />
        </article>

        {/* Right Sidebar */}
        <SchoolArticleRightSidebar article={article} />
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTopButton scrollProgress={scrollProgress} />

      {/* Animation Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
} 