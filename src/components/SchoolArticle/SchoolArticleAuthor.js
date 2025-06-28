"use client"

import styles from './SchoolArticleAuthor.module.css';
import Image from 'next/image';

export default function SchoolArticleAuthor({ author }) {
  return (
    <div className={styles.authorSection}>
      <div className={styles.authorContent}>
        <Image 
          src={author.avatar}
          alt={`Dr. ${author.name}`}
          width={48}
          height={48}
          style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #2a2a3a' }}
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