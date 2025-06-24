import styles from './interactiveCard.module.css';

export default function InteractiveCard({ icon, title, description }) {
    return (
      <div className={styles.interactiveCard}>
        <div className={styles.interactiveIcon}>{icon}</div>
        <h3 className={styles.interactiveTitle}>{title}</h3>
        <p className={styles.interactiveDesc}>{description}</p>
      </div>
    );
  };
  