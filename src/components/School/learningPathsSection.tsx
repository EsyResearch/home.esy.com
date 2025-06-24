import styles from './learningPathsSection.module.css';
import PathCard from "@/components/School/pathCard";

export default function LearningPathsSection () {
    const paths = [
      {
        icon: '🚀',
        title: 'AI Writing Fundamentals',
        description: 'Start your journey with the basics of AI-assisted writing. Learn how LLMs work, basic prompting techniques, and ethical considerations.',
        stats: { lessons: 12, hours: 4, students: '2.1k' }
      },
      {
        icon: '🎯',
        title: 'Advanced Prompt Engineering',
        description: 'Master the art of crafting effective prompts. Learn advanced techniques, chain-of-thought reasoning, and model-specific optimizations.',
        stats: { lessons: 18, hours: 6, students: '1.5k' }
      },
      {
        icon: '📚',
        title: 'Research Excellence with AI',
        description: 'Transform your research workflow with AI. Learn literature review automation, data analysis with LLMs, and citation management.',
        stats: { lessons: 15, hours: 5, students: '890' }
      }
    ];
  
    return (
      <section className={styles.pathsSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>STRUCTURED LEARNING</span>
          <h2 className={styles.sectionTitle}>Choose Your Learning Path</h2>
          <p className={styles.sectionDesc}>
            Whether you're new to AI or looking to master advanced techniques, 
            we have a path designed for your journey.
          </p>
        </div>
        
        <div className={styles.pathsGrid}>
          {paths.map((path, index) => (
            <PathCard key={index} {...path} />
          ))}
        </div>
      </section>
    );
  };
  