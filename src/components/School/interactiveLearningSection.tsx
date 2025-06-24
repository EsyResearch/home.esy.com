import styles from './interactiveLearningSection.module.css';
import InteractiveCard from "@/components/School/interactiveCard";

export default function InteractiveLearningSection () {
    const resources = [
      {
        icon: '🧪',
        title: 'Prompt Playground',
        description: 'Experiment with different prompting techniques in our interactive sandbox. Compare outputs across multiple models.'
      },
      {
        icon: '📊',
        title: 'Research Assistant',
        description: 'Try our AI-powered research assistant. Upload papers, generate summaries, and discover related work instantly.'
      },
      {
        icon: '✍️',
        title: 'Writing Workshop',
        description: 'Join live workshops where experts demonstrate AI-assisted writing techniques in real-time.'
      },
      {
        icon: '🎓',
        title: 'Certification Tests',
        description: 'Test your knowledge and earn certificates in AI writing, prompt engineering, and research methods.'
      }
    ];
  
    return (
      <section className={styles.interactiveSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>HANDS-ON LEARNING</span>
          <h2 className={styles.sectionTitle}>Interactive Resources</h2>
          <p className={styles.sectionDesc}>
            Practice your skills with our interactive tools and resources designed 
            for real-world application.
          </p>
        </div>
        
        <div className={styles.interactiveGrid}>
          {resources.map((resource, index) => (
            <InteractiveCard key={index} {...resource} />
          ))}
        </div>
      </section>
    );
  };