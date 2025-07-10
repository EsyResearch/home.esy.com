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

export default function UnderstandingLLMsArticle() {
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
    category: 'LLM Basics'
  };

  const author = {
    initials: 'ZU',
    name: 'Zev Uhuru',
    role: 'AI Research Lead',
    bio: 'Zev Uhuru is a leading expert in natural language processing and deep learning, with over a decade of experience in developing and deploying AI systems.',
    meta: '15 articles published · Joined January 2024'
  };

  const tableOfContents = [
    { id: 'introduction', title: 'Introduction', active: scrollProgress < 15 },
    { id: 'what-is-transformer', title: 'What is a Transformer?', active: scrollProgress >= 15 && scrollProgress < 35 },
    { id: 'key-innovations', title: 'Key Innovations', active: scrollProgress >= 35 && scrollProgress < 55 },
    { id: 'real-world-applications', title: 'Real-World Applications', active: scrollProgress >= 55 && scrollProgress < 75 },
    { id: 'technical-deep-dive', title: 'Technical Deep Dive', active: scrollProgress >= 75 && scrollProgress < 90 },
    { id: 'future-directions', title: 'Future Directions', active: scrollProgress >= 90 }
  ];

  const relatedArticles = [
    {
      category: 'Prompt Engineering',
      title: 'What is Prompt Engineering? A Comprehensive Guide',
      author: 'Zev Uhuru',
      readTime: '8 min',
      link: '/school/articles/prompt-engineering-guide'
    },
    {
      category: 'Academic Writing',
      title: '5 Ways AI is Revolutionizing Academic Research',
      author: 'Zev Uhuru',
      readTime: '6 min',
      link: '/school/articles/ai-research-revolution'
    },
    {
      category: 'Tutorial',
      title: 'Building Your First AI Application with LLMs',
      author: 'Dr. Sarah Chen',
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

  const estimatedReadTime = 12;
  const readingProgress = Math.min(Math.round((scrollProgress / 100) * estimatedReadTime), estimatedReadTime);

  return (
    <ArticleLayout meta={meta}>
      <ArticleHero 
        category="LLM Basics"
        title="Understanding Large Language Models: From Theory to Practice"
        author={author}
        date="March 20, 2025"
        readTime={`${readingProgress} / ${estimatedReadTime}`}
      />

      <div style={styles.contentWrapper}>
        <p style={styles.paragraph}>
        Large Language Models (LLMs) like GPT-4 and Claude have revolutionized the field of AI, enabling machines to understand and generate human-like text at scale. But how do these models work, and what makes them so powerful?
      </p>

      <h2 style={styles.heading2} id="what-is-transformer">What is a Transformer?</h2>

      <div style={{
        margin: '2rem 0',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#16161f',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Image 
          src="https://upload.wikimedia.org/wikipedia/commons/1/10/Transformer.png" 
          alt="Transformer Architecture" 
          width={800}
          height={600}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            backgroundColor: 'white'
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
          Figure 1: The Transformer architecture enables parallel processing of sequences.
        </p>
      </div>

      <p style={styles.paragraph}>
        Transformers are a type of neural network architecture introduced in 2017. They use self-attention mechanisms to process input data in parallel, making them highly efficient for language tasks.
      </p>

      <div style={styles.calloutBox}>
        <h4 style={styles.calloutTitle}>
          <span style={{ fontSize: '1.5rem' }}>🧠</span>
          Core Concept
        </h4>
        <p>
          Unlike traditional sequential models, Transformers can process entire sequences simultaneously, dramatically improving training efficiency and enabling the creation of much larger models.
        </p>
      </div>

      <h2 style={styles.heading2} id="key-innovations">Key Innovations</h2>

      <h3 style={styles.heading3}>Self-Attention Mechanism</h3>
      
      <p style={styles.paragraph}>
        Self-attention allows the model to weigh the importance of different words in a sentence. This mechanism enables the model to understand context and relationships between words, regardless of their distance in the text.
      </p>

      <div style={styles.codeBlock}>
        <span style={styles.codeLabel}>Attention Calculation</span>
        <code>
          {`# Simplified attention mechanism
Attention(Q, K, V) = softmax(QK^T / √d_k)V

Where:
- Q = Query matrix
- K = Key matrix  
- V = Value matrix
- d_k = Dimension of key vectors`}
        </code>
      </div>

      <h3 style={styles.heading3}>Pretraining and Fine-tuning</h3>
      
      <p style={styles.paragraph}>
        Models are trained on massive datasets before being fine-tuned for specific tasks. This two-stage approach allows LLMs to develop a broad understanding of language before specializing.
      </p>

      <ul style={styles.list}>
        <li style={styles.listItem}>
          <strong>Pretraining:</strong> Models learn from terabytes of text data, developing general language understanding
        </li>
        <li style={styles.listItem}>
          <strong>Fine-tuning:</strong> Models are adapted for specific tasks with smaller, curated datasets
        </li>
        <li style={styles.listItem}>
          <strong>Few-shot learning:</strong> Modern LLMs can adapt to new tasks with just a few examples
        </li>
      </ul>

      <h3 style={styles.heading3}>Scalability</h3>
      
      <p style={styles.paragraph}>
        LLMs can have billions of parameters, enabling them to capture complex patterns in language. This scalability has been crucial to their success.
      </p>

      <div style={styles.literaryExample}>
        <div style={styles.exampleLabel}>Model Scale Comparison</div>
        <div style={styles.exampleText}>
          GPT-3: 175 billion parameters<br/>
          GPT-4: Estimated 1.7 trillion parameters<br/>
          Claude 2: Undisclosed (likely 100B+ parameters)
        </div>
        <div style={styles.exampleAnalysis}>
          The dramatic increase in model size has led to emergent capabilities—abilities that appear only at certain scales and weren&apos;t explicitly programmed.
        </div>
      </div>

      <h2 style={styles.heading2} id="real-world-applications">Real-World Applications</h2>

      <p style={styles.paragraph}>
        LLMs have found applications across virtually every industry and domain:
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          backgroundColor: 'rgba(139, 92, 246, 0.05)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '8px',
          padding: '1.5rem'
        }}>
          <h4 style={{ marginBottom: '0.5rem' }}>💬 Communication</h4>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
            Chatbots, virtual assistants, and customer service automation
          </p>
        </div>

        <div style={{
          backgroundColor: 'rgba(139, 92, 246, 0.05)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '8px',
          padding: '1.5rem'
        }}>
          <h4 style={{ marginBottom: '0.5rem' }}>✍️ Content Creation</h4>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
            Article writing, marketing copy, and creative storytelling
          </p>
        </div>

        <div style={{
          backgroundColor: 'rgba(139, 92, 246, 0.05)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '8px',
          padding: '1.5rem'
        }}>
          <h4 style={{ marginBottom: '0.5rem' }}>👨‍💻 Code Generation</h4>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
            Code completion, debugging, and automated programming
          </p>
        </div>

        <div style={{
          backgroundColor: 'rgba(139, 92, 246, 0.05)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '8px',
          padding: '1.5rem'
        }}>
          <h4 style={{ marginBottom: '0.5rem' }}>🔬 Research</h4>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
            Literature review, hypothesis generation, and data analysis
          </p>
        </div>
      </div>

      <h2 style={styles.heading2} id="technical-deep-dive">Technical Deep Dive</h2>

      <h3 style={styles.heading3}>Tokenization</h3>
      
      <p style={styles.paragraph}>
        Before processing text, LLMs break it down into tokens—smaller units that can be words, subwords, or characters.
      </p>

      <div style={styles.codeBlock}>
        <span style={styles.codeLabel}>Tokenization Example</span>
        <code>
          {`Input: "Understanding LLMs is fascinating!"
Tokens: ["Under", "standing", " LL", "Ms", " is", " fascinating", "!"]
Token IDs: [8100, 5646, 27140, 16101, 318, 13899, 0]`}
        </code>
      </div>

      <h3 style={styles.heading3}>Positional Encoding</h3>
      
      <p style={styles.paragraph}>
        Since Transformers process sequences in parallel, they need a way to understand word order. Positional encoding adds information about the position of each token in the sequence.
      </p>

      <h3 style={styles.heading3}>Multi-Head Attention</h3>
      
      <p style={styles.paragraph}>
        Instead of using a single attention mechanism, Transformers use multiple &quot;attention heads&quot; that can focus on different aspects of the input simultaneously.
      </p>

      <div style={styles.calloutBox}>
        <h4 style={styles.calloutTitle}>
          <span style={{ fontSize: '1.5rem' }}>💡</span>
          Key Takeaway
        </h4>
        <p>
          LLMs are powerful, but understanding their inner workings helps you use them more effectively. By knowing how they process information, you can craft better prompts and understand their limitations.
        </p>
      </div>

      <h2 style={styles.heading2} id="future-directions">Future Directions</h2>

      <p style={styles.paragraph}>
        The field of LLMs is rapidly evolving, with several exciting directions:
      </p>

      <ul style={styles.list}>
        <li style={styles.listItem}>
          <strong>Multimodal Models:</strong> Combining text with images, audio, and video understanding
        </li>
        <li style={styles.listItem}>
          <strong>Efficiency Improvements:</strong> Making models smaller and faster without sacrificing performance
        </li>
        <li style={styles.listItem}>
          <strong>Specialized Models:</strong> Domain-specific LLMs for medicine, law, and other fields
        </li>
        <li style={styles.listItem}>
          <strong>Improved Reasoning:</strong> Better logical reasoning and mathematical capabilities
        </li>
        <li style={styles.listItem}>
          <strong>Ethical AI:</strong> Addressing bias, safety, and alignment challenges
        </li>
      </ul>

      <h2 style={styles.heading2}>Further Reading</h2>

      <p style={styles.paragraph}>
        For those interested in diving deeper into the technical details:
      </p>

      <ul style={styles.list}>
        <li style={styles.listItem}>
          <a href="https://arxiv.org/abs/1706.03762" style={{ color: '#8b5cf6' }}>
            Attention Is All You Need (Vaswani et al., 2017)
          </a> - The paper that introduced Transformers
        </li>
        <li style={styles.listItem}>
          <a href="https://arxiv.org/abs/2005.14165" style={{ color: '#8b5cf6' }}>
            Language Models are Few-Shot Learners (Brown et al., 2020)
          </a> - GPT-3 paper
        </li>
        <li style={styles.listItem}>
          <a href="https://arxiv.org/abs/2203.02155" style={{ color: '#8b5cf6' }}>
            Training Compute-Optimal Large Language Models (Hoffmann et al., 2022)
          </a> - Chinchilla scaling laws
        </li>
      </ul>

      <p style={styles.paragraph}>
        Understanding LLMs is an ongoing journey. As these models continue to evolve, staying informed about their capabilities and limitations will be crucial for anyone working with AI technology.
      </p>
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