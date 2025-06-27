"use client"

import styles from './SchoolArticleSidebar.module.css';

export default function SchoolArticleSidebar({ activeSection, scrollProgress, article }) {
  // Extract sections from the article content
  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'what-is-prompt-engineering', title: 'What is Prompt Engineering?' },
    { id: 'key-principles', title: 'Key Principles' },
    { id: 'basic-techniques', title: 'Basic Techniques' },
    { id: 'advanced-strategies', title: 'Advanced Strategies' },
    { id: 'practical-examples', title: 'Practical Examples' },
    { id: 'conclusion', title: 'Conclusion' }
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <h3 className={styles.sidebarTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          Table of Contents
        </h3>
        <nav className={styles.navigation}>
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`${styles.navLink} ${activeSection === section.id ? styles.active : ''}`}
            >
              {section.title}
            </a>
          ))}
        </nav>

        <div className={styles.progressContainer}>
          <div className={styles.progressHeader}>
            <span className={styles.progressLabel}>Reading Progress</span>
            <span className={styles.progressPercentage}>{Math.round(scrollProgress)}%</span>
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
} 