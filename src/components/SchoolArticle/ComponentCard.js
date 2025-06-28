import styles from './EnhancedMarkdownRenderer.module.css';

const ComponentCard = ({ number, title, description, icon }) => (
  <div className={styles.componentCard}>
    <div className={styles.componentNumber}>{number}</div>
    <div className={styles.componentIcon}>{icon}</div>
    <h4 className={styles.componentTitle}>{title}</h4>
    <p className={styles.componentDescription}>{description}</p>
  </div>
);

export default ComponentCard;
export { ComponentCard }; 