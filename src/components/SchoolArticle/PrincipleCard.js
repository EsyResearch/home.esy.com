import styles from './EnhancedMarkdownRenderer.module.css';

const PrincipleCard = ({ icon, title, children }) => (
  <div className={styles.principleCard}>
    <div className={styles.principleIcon}>{icon}</div>
    <h4 className={styles.principleTitle}>{title}</h4>
    <p className={styles.principleDescription}>{children}</p>
  </div>
);

export default PrincipleCard;
export { PrincipleCard }; 