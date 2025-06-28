"use client"

import styles from './RelatedSchoolArticles.module.css';

export default function RelatedSchoolArticles({ articles = [] }) {
  return (
    <div className={styles.relatedSection}>
      <h3 className={styles.relatedTitle}>
        Continue Learning
      </h3>
      <div className={styles.relatedGrid}>
        {articles.map((article, index) => (
          <a 
            key={index}
            href="#" 
            className={styles.relatedCard}
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardType}>
                {article.type}
              </span>
              <svg className={styles.cardArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
            <h4 className={styles.cardTitle}>
              {article.title}
            </h4>
            <p className={styles.cardDescription}>
              {article.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
} 