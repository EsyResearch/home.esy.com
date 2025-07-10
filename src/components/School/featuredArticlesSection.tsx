import styles from './featuredArticlesSection.module.css';
import ArticleCard from "@/components/School/articleCard";

export default function FeaturedArticlesSection() {
    const articles = [
      {
        category: 'Literary Analysis',
        title: 'Unlocking Literary Depth: Using Prompt Engineering to Analyze "To Kill a Mockingbird"',
        excerpt: 'Discover how strategic prompt engineering can transform your literary analysis, revealing insights that might otherwise remain hidden in classic texts.',
        author: 'Dr. Emily Watson',
        date: 'Mar 25, 2025',
        readTime: 15,
        slug: 'to-kill-a-mockingbird'
      },
      {
        category: 'Prompt Engineering',
        title: 'What is Prompt Engineering? A Comprehensive Guide',
        excerpt: 'Discover the art and science of crafting effective prompts for AI models. Learn fundamental techniques that will transform your AI interactions.',
        author: 'Zev Uhuru',
        date: 'Mar 22, 2025',
        readTime: 8,
        slug: 'prompt-engineering-guide'
      },
      {
        category: 'LLM Basics',
        title: 'Understanding Large Language Models: From Theory to Practice',
        excerpt: 'Demystify the technology behind ChatGPT, Claude, and other LLMs. A beginner-friendly introduction to transformer architecture.',
        author: 'Zev Uhuru',
        date: 'Mar 20, 2025',
        readTime: 12,
        slug: 'understanding-llms'
      },
      {
        category: 'Academic Writing',
        title: '5 Ways AI is Revolutionizing Academic Research',
        excerpt: 'From literature reviews to data analysis, explore how AI tools are transforming every stage of the academic research process.',
        author: 'Zev Uhuru',
        date: 'Mar 18, 2025',
        readTime: 6,
        slug: 'ai-research-revolution'
      }
    ];
  
    return (
      <section className={styles.articlesSection}>
        <div className={styles.articlesContainer}>
          <div className={styles.articlesHeader}>
            <div>
              <span className={styles.sectionLabel}>LATEST INSIGHTS</span>
              <h2 className={styles.sectionTitle}>Featured Articles</h2>
            </div>
            <div className={styles.articlesNav}>
              <button className={styles.articleNavBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button className={styles.articleNavBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
          
          <div className={styles.articlesGrid}>
            {articles.map((article, index) => (
              <ArticleCard key={index} {...article} />
            ))}
          </div>
        </div>
      </section>
    );
  };