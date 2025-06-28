import React from 'react';
import styles from './EnhancedMarkdownRenderer.module.css';

const CardGroup = ({ title, children }) => (
  <section className={styles.cardGroup}>
    {title && <h2 className={styles.cardGroupTitle}>{title}</h2>}
    <div className={styles.cardGroupContent}>{children}</div>
  </section>
);

export default CardGroup; 