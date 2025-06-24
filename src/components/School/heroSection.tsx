import styles from './heroSection.module.css';

export default function HeroSection({ activeFilter, handleFilterClick }) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroBadge}>
          <div className={styles.heroBadgeDot}></div>
          <span>New courses added weekly</span>
        </div>
        
        <h1 className={styles.heroTitle}>Master AI-Powered<br/>Academic Writing</h1>
        
        <p className={styles.heroSubtitle}>
          Learn to leverage LLMs, prompt engineering, and cutting-edge AI tools 
          to transform your research and writing process.
        </p>
        
        <div className={styles.searchSection}>
          <div className={styles.searchContainer}>
            <input 
              type="text" 
              className={styles.searchInput} 
              placeholder="Search courses, tutorials, and guides..."
            />
            <svg className={styles.searchIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
          
          <div className={styles.searchFilters}>
            <button className={`${styles.filterChip} ${activeFilter === 'All Topics' ? styles.active : ''}`} onClick={() => handleFilterClick('All Topics')}>All Topics</button>
            <button className={`${styles.filterChip} ${activeFilter === 'LLM Basics' ? styles.active : ''}`} onClick={() => handleFilterClick('LLM Basics')}>LLM Basics</button>
            <button className={`${styles.filterChip} ${activeFilter === 'Prompt Engineering' ? styles.active : ''}`} onClick={() => handleFilterClick('Prompt Engineering')}>Prompt Engineering</button>
            <button className={`${styles.filterChip} ${activeFilter === 'Academic Writing' ? styles.active : ''}`} onClick={() => handleFilterClick('Academic Writing')}>Academic Writing</button>
            <button className={`${styles.filterChip} ${activeFilter === 'Research Methods' ? styles.active : ''}`} onClick={() => handleFilterClick('Research Methods')}>Research Methods</button>
            <button className={`${styles.filterChip} ${activeFilter === 'Ethics & AI' ? styles.active : ''}`} onClick={() => handleFilterClick('Ethics & AI')}>Ethics & AI</button>
          </div>
        </div>
      </div>
    </section>
  );
};