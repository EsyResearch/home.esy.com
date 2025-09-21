import styles from './newsletterSection.module.css';

export default function WeeklyNewsletter({ emailInputRef, handleNewsletterSubmit }) {
    return (
      <section className={styles.newsletterSection}>
        <div className={styles.newsletterContainer}>
          <span className={styles.sectionLabel}>STAY UPDATED</span>
          <h2 className={styles.sectionTitle}>Get Weekly AI Writing Tips</h2>
          <p className={styles.sectionDesc}>
            Join thousands of researchers and writers. Get exclusive tips, 
            new course announcements, and early access to features.
          </p>
          <div className={styles.newsletterForm}>
            <input 
              type="email" 
              className={styles.newsletterInput} 
              placeholder="Enter your email..."
              ref={emailInputRef}
              required
            />
            <button className={styles.newsletterBtn} onClick={handleNewsletterSubmit}>Subscribe</button>
          </div>
        </div>
      </section>
    );
  };
