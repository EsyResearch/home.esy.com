"use client"

import { useState } from 'react';
import styles from './SchoolArticleRightSidebar.module.css';

export default function SchoolArticleRightSidebar({ article }) {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
  };

  return (
    <aside className={styles.rightSidebar}>
      <div className={styles.sidebarContent}>
        {/* Course CTA */}
        <div className={styles.courseCTA}>
          <h4 className={styles.courseTitle}>
            Master Prompt Engineering
          </h4>
          <p className={styles.courseDescription}>
            Take your AI skills to the next level with our comprehensive course on prompt engineering and LLM optimization.
          </p>
          <button className={styles.courseButton}>
            Enroll Now
          </button>
        </div>

        {/* Newsletter Signup */}
        <div className={styles.newsletterCard}>
          <h4 className={styles.newsletterTitle}>
            Stay Updated
          </h4>
          <p className={styles.newsletterDescription}>
            Get the latest insights on AI, prompt engineering, and emerging technologies delivered to your inbox.
          </p>
          <form onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.newsletterInput}
              required
            />
            <button type="submit" className={styles.newsletterButton}>
              Subscribe
            </button>
          </form>
        </div>

        {/* Tags */}
        <div className={styles.tagsCard}>
          <h4 className={styles.tagsTitle}>
            Related Topics
          </h4>
          <div className={styles.tagsContainer}>
            {(article.tags || []).map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
} 