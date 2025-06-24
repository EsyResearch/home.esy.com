import styles from './pathCard.module.css';

export default function PathCard ({ icon, title, description, stats }) {
    return (
      <div className={styles.pathCard}>
        <div className={styles.pathIcon}>{icon}</div>
        <h3 className={styles.pathTitle}>{title}</h3>
        <p className={styles.pathDesc}>{description}</p>
        <div className={styles.pathStats}>
          <div className={styles.pathStat}>
            <svg className={styles.pathStatIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <span>{stats.lessons} Lessons</span>
          </div>
          <div className={styles.pathStat}>
            <svg className={styles.pathStatIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>{stats.hours} Hours</span>
          </div>
          <div className={styles.pathStat}>
            <svg className={styles.pathStatIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span>{stats.students} Students</span>
          </div>
        </div>
      </div>
    );
  };