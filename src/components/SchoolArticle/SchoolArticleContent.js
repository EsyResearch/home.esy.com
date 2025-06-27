"use client"

import React from 'react';
import styles from './SchoolArticleContent.module.css';
import EnhancedMarkdownRenderer from './EnhancedMarkdownRenderer';

const SchoolArticleContent = ({ content }) => {
  return (
    <div className={styles.articleContent}>
      <div className={styles.contentWrapper}>
        <EnhancedMarkdownRenderer content={content} />
      </div>
    </div>
  );
};

export default SchoolArticleContent; 