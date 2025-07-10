"use client"

import React, { useState, useEffect } from 'react';
import ArticleLayout from '@/components/SchoolArticle/ArticleLayout';
import ArticleHero from '@/components/SchoolArticle/ArticleHero';
import TableOfContents from '@/components/SchoolArticle/TableOfContents';
import AuthorBox from '@/components/SchoolArticle/AuthorBox';
import ShareSection from '@/components/SchoolArticle/ShareSection';
import RelatedArticles from '@/components/SchoolArticle/RelatedArticles';
import { articleContentStyles as styles } from '@/components/SchoolArticle/articleStyles';

export default function PromptEngineeringGuideArticle() {
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
    category: 'Prompt Engineering'
  };

  const author = {
    initials: 'ZU',
    name: 'Zev Uhuru',
    role: 'AI Research Lead',
    bio: 'Zev Uhuru specializes in natural language processing and human-AI interaction. With over 10 years of experience in AI research, he has published numerous papers on prompt engineering and language model optimization.',
    meta: '15 articles published · Joined January 2024'
  };

  const tableOfContents = [
    { id: 'what-is-prompt-engineering', title: 'What is Prompt Engineering?', active: scrollProgress < 20 },
    { id: 'core-components', title: 'Core Components', active: scrollProgress >= 20 && scrollProgress < 40 },
    { id: 'fundamental-techniques', title: 'Fundamental Techniques', active: scrollProgress >= 40 && scrollProgress < 60 },
    { id: 'best-practices', title: 'Best Practices', active: scrollProgress >= 60 && scrollProgress < 80 },
    { id: 'advanced-strategies', title: 'Advanced Strategies', active: scrollProgress >= 80 }
  ];

  const relatedArticles = [
    {
      category: 'Prompt Engineering',
      title: 'Advanced Prompt Chaining Techniques',
      author: 'Zev Uhuru',
      readTime: '12 min',
      link: '#'
    },
    {
      category: 'Tutorial',
      title: 'Building Custom GPT Assistants',
      author: 'Dr. Sarah Chen',
      readTime: '10 min',
      link: '#'
    },
    {
      category: 'Case Study',
      title: 'Real-World Applications of Prompt Engineering',
      author: 'Marcus Johnson',
      readTime: '15 min',
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

  const estimatedReadTime = 8;
  const readingProgress = Math.min(Math.round((scrollProgress / 100) * estimatedReadTime), estimatedReadTime);

  return (
    <ArticleLayout meta={meta}>
      <ArticleHero 
        category="Prompt Engineering"
        title="What is Prompt Engineering? A Comprehensive Guide"
        author={author}
        date="March 22, 2025"
        readTime={`${readingProgress} / ${estimatedReadTime}`}
      />

      <div style={styles.contentWrapper}>
        <p style={styles.paragraph}>
        In the rapidly evolving landscape of artificial intelligence, prompt engineering has emerged as a crucial skill for anyone looking to harness the full potential of large language models (LLMs). Whether you&apos;re a researcher, developer, writer, or simply an AI enthusiast, understanding how to craft effective prompts can dramatically improve your interactions with AI systems.
      </p>

      <div style={styles.calloutBox}>
        <h4 style={styles.calloutTitle}>
          <span style={{ fontSize: '1.5rem' }}>💡</span>
          Key Insight
        </h4>
        <p>
          Prompt engineering is not just about asking questions—it&apos;s about understanding how AI models interpret and respond to different types of inputs.
        </p>
      </div>

      <h2 style={styles.heading2} id="what-is-prompt-engineering">What is Prompt Engineering?</h2>

      <p style={styles.paragraph}>
        Prompt engineering is the practice of designing and refining inputs (prompts) to elicit desired outputs from AI language models. It involves understanding the model&apos;s capabilities, limitations, and behavioral patterns to craft prompts that produce accurate, relevant, and useful responses.
      </p>

      <h2 style={styles.heading2} id="core-components">Core Components of Prompt Engineering</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          backgroundColor: 'rgba(139, 92, 246, 0.05)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '12px',
          padding: '1.5rem'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🟣</div>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>1. Context Setting</h3>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
            Providing relevant background information to guide the AI&apos;s response
          </p>
        </div>

        <div style={{
          backgroundColor: 'rgba(139, 92, 246, 0.05)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '12px',
          padding: '1.5rem'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>2. Clear Instructions</h3>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
            Specifying exactly what you want the AI to do or produce
          </p>
        </div>

        <div style={{
          backgroundColor: 'rgba(139, 92, 246, 0.05)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '12px',
          padding: '1.5rem'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>3. Output Formatting</h3>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
            Defining how you want the response structured or presented
          </p>
        </div>

        <div style={{
          backgroundColor: 'rgba(139, 92, 246, 0.05)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '12px',
          padding: '1.5rem'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✨</div>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>4. Examples</h3>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
            Showing the AI what good outputs look like through demonstrations
          </p>
        </div>
      </div>

      <h2 style={styles.heading2} id="fundamental-techniques">Fundamental Techniques</h2>

      <h3 style={styles.heading3}>Zero-Shot Prompting</h3>
      
      <p style={styles.paragraph}>
        Zero-shot prompting involves asking the model to perform a task without providing any examples. This technique relies on the model&apos;s pre-trained knowledge and understanding.
      </p>

      <div style={styles.codeBlock}>
        <span style={styles.codeLabel}>Example</span>
        <code>
          Classify the following text as positive, negative, or neutral:<br/>
          &quot;The product exceeded my expectations in every way.&quot;
        </code>
      </div>

      <h3 style={styles.heading3}>Few-Shot Prompting</h3>
      
      <p style={styles.paragraph}>
        Few-shot prompting provides the model with a few examples before asking it to perform the task. This helps the model understand the pattern and format you&apos;re looking for.
      </p>

      <div style={styles.codeBlock}>
        <span style={styles.codeLabel}>Example</span>
        <code>
          Classify the sentiment:<br/><br/>
          Text: &quot;I love this!&quot; → Positive<br/>
          Text: &quot;This is terrible.&quot; → Negative<br/>
          Text: &quot;It&apos;s okay, I guess.&quot; → Neutral<br/><br/>
          Text: &quot;Best purchase I&apos;ve ever made!&quot; → ?
        </code>
      </div>

      <h3 style={styles.heading3}>Chain-of-Thought Prompting</h3>
      
      <p style={styles.paragraph}>
        This technique encourages the model to show its reasoning process step by step, leading to more accurate and transparent results, especially for complex problems.
      </p>

      <div style={styles.codeBlock}>
        <span style={styles.codeLabel}>Example</span>
        <code>
          Let&apos;s solve this step by step:<br/><br/>
          If a train travels 120 miles in 2 hours, and then 180 miles in 3 hours, 
          what is its average speed for the entire journey?<br/><br/>
          Step 1: Calculate total distance...<br/>
          Step 2: Calculate total time...<br/>
          Step 3: Calculate average speed...
        </code>
      </div>

      <h2 style={styles.heading2} id="best-practices">Best Practices for Effective Prompts</h2>

      <ul style={styles.list}>
        <li style={styles.listItem}>
          <strong>Be Specific:</strong> Vague prompts lead to vague responses. Include all necessary details and constraints.
        </li>
        <li style={styles.listItem}>
          <strong>Use Clear Language:</strong> Avoid ambiguity and use simple, direct language when possible.
        </li>
        <li style={styles.listItem}>
          <strong>Provide Context:</strong> Give the model enough background information to understand the task fully.
        </li>
        <li style={styles.listItem}>
          <strong>Define the Format:</strong> Specify how you want the output structured (bullet points, paragraphs, JSON, etc.).
        </li>
        <li style={styles.listItem}>
          <strong>Iterate and Refine:</strong> Don&apos;t expect perfection on the first try. Refine your prompts based on the outputs.
        </li>
      </ul>

      <h2 style={styles.heading2} id="advanced-strategies">Advanced Strategies</h2>

      <h3 style={styles.heading3}>Role-Based Prompting</h3>
      
      <p style={styles.paragraph}>
        Assign a specific role or persona to the AI to get responses tailored to that perspective.
      </p>

      <div style={styles.literaryExample}>
        <div style={styles.exampleLabel}>Role Example</div>
        <div style={styles.exampleText}>
          &quot;You are an experienced data scientist. Explain machine learning to a business executive who has no technical background.&quot;
        </div>
        <div style={styles.exampleAnalysis}>
          This approach helps the AI adjust its language, examples, and focus to match the assigned role and target audience.
        </div>
      </div>

      <h3 style={styles.heading3}>Constraint-Based Prompting</h3>
      
      <p style={styles.paragraph}>
        Set specific constraints to guide the model&apos;s output within desired boundaries.
      </p>

      <div style={styles.codeBlock}>
        <span style={styles.codeLabel}>Constraints Example</span>
        <code>
          Write a product description with the following constraints:<br/>
          - Maximum 50 words<br/>
          - Include 3 key benefits<br/>
          - Use active voice<br/>
          - Target audience: young professionals<br/>
          - Tone: enthusiastic but professional
        </code>
      </div>

      <h3 style={styles.heading3}>Meta-Prompting</h3>
      
      <p style={styles.paragraph}>
        Ask the AI to help you improve your prompts or generate better prompts for specific tasks.
      </p>

      <div style={styles.calloutBox}>
        <h4 style={styles.calloutTitle}>
          <span style={{ fontSize: '1.5rem' }}>🚀</span>
          Pro Tip
        </h4>
        <p>
          Use meta-prompting when you&apos;re stuck: &quot;What would be a better way to ask you to [task]?&quot;
        </p>
      </div>

      <p style={styles.paragraph}>
        Prompt engineering is both an art and a science. While these techniques provide a solid foundation, the key to mastery lies in practice, experimentation, and developing an intuition for how different models respond to various prompting strategies.
      </p>

      <p style={styles.paragraph}>
        As AI models continue to evolve, so too will the techniques for interacting with them effectively. Stay curious, keep experimenting, and remember that the best prompt is often the one that clearly communicates your intent while leveraging the model&apos;s strengths.
      </p>
      </div>

      <TableOfContents items={tableOfContents} scrollProgress={scrollProgress} />

      <footer style={styles.articleFooter}>
        <AuthorBox author={author} />
        <ShareSection onShare={handleShare} copiedLink={copiedLink} />
      </footer>

      <RelatedArticles articles={relatedArticles} />
    </ArticleLayout>
  );
}