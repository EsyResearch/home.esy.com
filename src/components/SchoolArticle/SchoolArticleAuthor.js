"use client"

import styles from './SchoolArticleAuthor.module.css';

export default function SchoolArticleAuthor({ author }) {
  return (
    <div className={styles.authorSection}>
      <div className={styles.authorContent}>
        <img 
          src={author.avatar}
          alt={author.name}
          className={styles.authorAvatar}
        />
        <div className={styles.authorInfo}>
          <h3 className={styles.authorName}>
            {author.name}
          </h3>
          <p className={styles.authorTitle}>{author.title}</p>
          <p className={styles.authorBio}>
            {author.bio}
          </p>
          <div className={styles.authorActions}>
            <button className={styles.followButton}>
              Follow
            </button>
            <button className={styles.profileButton}>
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 