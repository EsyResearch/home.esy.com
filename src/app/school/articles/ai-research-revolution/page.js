"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ArticleLayout from '@/components/SchoolArticle/ArticleLayout';
import ArticleHero from '@/components/SchoolArticle/ArticleHero';
import TableOfContents from '@/components/SchoolArticle/TableOfContents';
import AuthorBox from '@/components/SchoolArticle/AuthorBox';
import ShareSection from '@/components/SchoolArticle/ShareSection';
import RelatedArticles from '@/components/SchoolArticle/RelatedArticles';
import NewsletterSection from '@/components/SchoolArticle/NewsletterSection';
import { articleContentStyles as styles } from '@/components/SchoolArticle/articleStyles';

export default function AIResearchRevolutionArticle() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const meta = {
    category: 'Academic Writing'
  };

  const author = {
    initials: 'ZU',
    name: 'Zev Uhuru',
    role: 'Founder, Esy',
    bio: 'Explores the intersection of AI and academic research, helping researchers leverage cutting-edge technology to accelerate their work.',
    meta: '15 articles published · Joined January 2024'
  };

  const tableOfContents = [
    { id: 'literature-review', title: '1. Literature Review Automation', active: scrollProgress < 20 },
    { id: 'data-analysis', title: '2. Data Analysis', active: scrollProgress >= 20 && scrollProgress < 40 },
    { id: 'writing-assistance', title: '3. Automated Writing Assistance', active: scrollProgress >= 40 && scrollProgress < 60 },
    { id: 'predictive-analytics', title: '4. Predictive Analytics', active: scrollProgress >= 60 && scrollProgress < 80 },
    { id: 'collaboration', title: '5. Collaboration and Networking', active: scrollProgress >= 80 }
  ];

  const relatedArticles = [
    {
      category: 'Technology',
      title: 'Understanding Large Language Models: From Theory to Practice',
      author: 'Dr. Sarah Chen',
      readTime: '10 min',
      link: '/school/articles/understanding-llms'
    },
    {
      category: 'Prompt Engineering',
      title: 'What is Prompt Engineering? A Comprehensive Guide',
      author: 'Zev Uhuru',
      readTime: '8 min',
      link: '/school/articles/prompt-engineering-guide'
    },
    {
      category: 'Research Methods',
      title: 'Integrating AI Tools into Your Research Workflow',
      author: 'Prof. Michael Zhang',
      readTime: '12 min',
      link: '#'
    }
  ];

  const handleShare = (platform) => {
    if (platform === 'copy') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const estimatedReadTime = 6;
  const readingProgress = Math.min(Math.round((scrollProgress / 100) * estimatedReadTime), estimatedReadTime);

  return (
    <ArticleLayout meta={meta}>
      <ArticleHero 
        category="Academic Writing"
        title="5 Ways AI is Revolutionizing Academic Research"
        author={author}
        date="March 18, 2025"
        readTime={`${readingProgress} / ${estimatedReadTime}`}
      />

      <div style={styles.contentWrapper}>
        <p style={styles.paragraph}>
        AI is transforming every stage of the research process, from literature reviews to data analysis and beyond. Here are five key ways AI is making an impact:
      </p>

      <h2 style={styles.heading2} id="literature-review">1. Literature Review Automation</h2>

      <p style={styles.paragraph}>
        AI tools can scan thousands of papers in seconds, summarizing key findings and identifying trends that would take humans weeks to uncover.
      </p>

      <div style={styles.calloutBox}>
        <h4 style={styles.calloutTitle}>
          <span style={{ fontSize: '1.5rem' }}>📚</span>
          Key Benefits
        </h4>
        <ul style={{ ...styles.list, marginBottom: 0 }}>
          <li style={styles.listItem}>Comprehensive coverage of relevant literature</li>
          <li style={styles.listItem}>Automatic identification of research gaps</li>
          <li style={styles.listItem}>Time savings of up to 90% compared to manual reviews</li>
          <li style={styles.listItem}>Real-time updates as new papers are published</li>
        </ul>
      </div>

      <p style={styles.paragraph}>
        Modern AI-powered literature review tools use natural language processing to understand the context and relevance of research papers. They can identify methodological approaches, key findings, and even potential conflicts or contradictions across studies.
      </p>

      <h2 style={styles.heading2} id="data-analysis">2. Data Analysis</h2>

      <div style={{
        margin: '2rem 0',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#16161f',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Image 
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" 
          alt="AI Data Analysis" 
          width={800}
          height={400}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block'
          }}
        />
        <p style={{
          padding: '1rem',
          textAlign: 'center',
          fontSize: '0.875rem',
          color: 'rgba(255, 255, 255, 0.6)',
          fontStyle: 'italic',
          margin: 0
        }}>
          Figure 2: AI-driven data analysis in action.
        </p>
      </div>

      <p style={styles.paragraph}>
        AI algorithms can process and analyze large datasets, revealing patterns and insights that drive new discoveries. Machine learning models excel at:
      </p>

      <ul style={styles.list}>
        <li style={styles.listItem}>Pattern recognition in complex multidimensional data</li>
        <li style={styles.listItem}>Anomaly detection for quality control</li>
        <li style={styles.listItem}>Predictive modeling for hypothesis testing</li>
        <li style={styles.listItem}>Automated statistical analysis and visualization</li>
      </ul>

      <h2 style={styles.heading2} id="writing-assistance">3. Automated Writing Assistance</h2>

      <p style={styles.paragraph}>
        From grammar checking to generating entire sections of text, AI writing tools help researchers communicate their findings more clearly and efficiently.
      </p>

      <div style={styles.literaryExample}>
        <div style={styles.exampleLabel}>AI Writing Capabilities</div>
        <div style={styles.exampleText}>
          &quot;The integration of quantum computing principles into molecular dynamics simulations represents a paradigmatic shift in computational chemistry.&quot;
        </div>
        <div style={styles.exampleAnalysis}>
          AI can help refine complex academic prose, suggest clearer alternatives, and ensure consistency in terminology throughout lengthy documents.
        </div>
      </div>

      <p style={styles.paragraph}>
        Advanced AI writing assistants go beyond simple grammar checking. They can:
      </p>

      <ul style={styles.list}>
        <li style={styles.listItem}>Suggest improvements to logical flow and argumentation</li>
        <li style={styles.listItem}>Ensure consistency in citation formatting</li>
        <li style={styles.listItem}>Generate literature review summaries</li>
        <li style={styles.listItem}>Adapt writing style for different academic audiences</li>
      </ul>

      <h2 style={styles.heading2} id="predictive-analytics">4. Predictive Analytics</h2>

      <p style={styles.paragraph}>
        Machine learning models can predict research outcomes, suggest new hypotheses, and optimize experimental design.
      </p>

      <div style={styles.codeBlock}>
        <span style={styles.codeLabel}>Example: Predictive Model Input</span>
        <code>
          {`# Predicting experimental outcomes
model.predict({
  temperature: 298.15,  # Kelvin
  pressure: 101.325,    # kPa
  catalyst: 'Pd/C',
  substrate_concentration: 0.1  # mol/L
})

# Output: Predicted yield = 87.3% ± 2.1%`}
        </code>
      </div>

      <p style={styles.paragraph}>
        These predictive capabilities allow researchers to:
      </p>

      <ul style={styles.list}>
        <li style={styles.listItem}>Optimize experimental parameters before conducting costly trials</li>
        <li style={styles.listItem}>Identify promising research directions based on existing data</li>
        <li style={styles.listItem}>Reduce the number of experiments needed to validate hypotheses</li>
        <li style={styles.listItem}>Accelerate the pace of discovery through intelligent hypothesis generation</li>
      </ul>

      <h2 style={styles.heading2} id="collaboration">5. Collaboration and Networking</h2>

      <p style={styles.paragraph}>
        AI-powered platforms connect researchers across disciplines, fostering collaboration and accelerating the pace of innovation.
      </p>

      <div style={styles.calloutBox}>
        <h4 style={styles.calloutTitle}>
          <span style={{ fontSize: '1.5rem' }}>🌐</span>
          Collaboration Features
        </h4>
        <p>
          Modern AI platforms can match researchers based on complementary skills, identify potential collaborators working on related problems, and even suggest interdisciplinary approaches to complex challenges.
        </p>
      </div>

      <p style={styles.paragraph}>
        AI facilitates research collaboration through:
      </p>

      <ul style={styles.list}>
        <li style={styles.listItem}>Intelligent matching algorithms that identify complementary expertise</li>
        <li style={styles.listItem}>Automated translation for international collaborations</li>
        <li style={styles.listItem}>Real-time collaboration on data analysis and interpretation</li>
        <li style={styles.listItem}>Knowledge graphs that visualize connections between research areas</li>
      </ul>

      <h2 style={styles.heading2}>Conclusion</h2>

      <p style={styles.paragraph}>
        The integration of AI into academic research is not just improving existing processes—it&apos;s fundamentally changing how we approach scientific discovery. From accelerating literature reviews to enabling new forms of collaboration, AI is empowering researchers to tackle increasingly complex challenges.
      </p>

      <p style={styles.paragraph}>
        As these technologies continue to evolve, we can expect even more transformative changes in how research is conducted, shared, and applied. The key for researchers is to embrace these tools while maintaining the critical thinking and creativity that drive true innovation.
      </p>

      <div style={styles.calloutBox}>
        <h4 style={styles.calloutTitle}>
          <span style={{ fontSize: '1.5rem' }}>🚀</span>
          Looking Ahead
        </h4>
        <p>
          The future of academic research lies in the synergy between human insight and AI capabilities. By leveraging these tools effectively, researchers can focus on what they do best: asking the right questions and interpreting results in meaningful ways.
        </p>
      </div>
      </div>

      <TableOfContents items={tableOfContents} scrollProgress={scrollProgress} />

      <footer style={styles.articleFooter}>
        <AuthorBox author={author} />
        <ShareSection onShare={handleShare} copiedLink={copiedLink} />
      </footer>

      <RelatedArticles articles={relatedArticles} />

      <NewsletterSection />
    </ArticleLayout>
  );
}