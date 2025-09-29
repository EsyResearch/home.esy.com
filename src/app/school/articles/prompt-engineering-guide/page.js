"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import ArticleLayout from '@/components/SchoolArticle/ArticleLayout';
import ArticleHero from '@/components/SchoolArticle/ArticleHero';
import ArticleSidebarComponent from '@/components/ArticleSidebar/ArticleSidebarComponent';
import AuthorBox from '@/components/SchoolArticle/AuthorBox';
import ShareSection from '@/components/SchoolArticle/ShareSection';
import RelatedArticles from '@/components/SchoolArticle/RelatedArticles';
import SchoolNewsletter from '@/components/School/SchoolNewsletter';
import { articleContentStyles as styles } from '@/components/SchoolArticle/articleStyles';
import { elevatedDarkTheme } from '@/lib/theme';
import { lightTheme } from '@/lib/lightTheme';

export default function PromptEngineeringGuideArticle() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // Initialize theme based on stored preference or default to light for school articles
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme-school');
      if (storedTheme) {
        return storedTheme === 'dark';
      }
      // Default to light mode for school articles
      return false;
    }
    return false; // Default to light for SSR
  });
  
  // Update DOM when theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = elevatedDarkTheme.bg;
      document.body.className = document.body.className.replace('light', 'dark');
      localStorage.setItem('theme-school', 'dark');
    } else {
      document.body.style.backgroundColor = lightTheme.bg;
      document.body.className = document.body.className.replace('dark', 'light');
      localStorage.setItem('theme-school', 'light');
    }
    
    // Trigger navigation theme check
    window.dispatchEvent(new Event('themechange'));
  }, [isDarkMode]);
  const emailInputRef = useRef(null);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', emailInputRef.current?.value);
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1024);
      setIsMobile(width < 768);
    };

    checkScreenSize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const meta = {
    category: 'Prompt Engineering'
  };

  const author = {
    initials: 'ZU',
    name: 'Zev Uhuru',
    role: 'Founder, Esy',
    bio: 'Software Engineer with 5 years of experience, passionate about the intersection of AI and writing. Building tools that empower writers to create better content with the help of artificial intelligence.',
    meta: '15 articles published · Joined January 2024'
  };

  const theme = isDarkMode ? {
    // Dark theme uses elevated dark theme
    bg: elevatedDarkTheme.bg,
    contentBg: 'transparent',
    text: elevatedDarkTheme.text,
    textMuted: elevatedDarkTheme.textSecondary,
    textSubtle: elevatedDarkTheme.muted,
    heading: elevatedDarkTheme.text,
    border: elevatedDarkTheme.borderSubtle,
    accent: elevatedDarkTheme.accent,
    accentLight: elevatedDarkTheme.accentLight,
    accentBg: elevatedDarkTheme.accentGlow,
    accentBorder: elevatedDarkTheme.accentBorder,
    codeBg: elevatedDarkTheme.elevated,
    codeBorder: elevatedDarkTheme.border,
    calloutBg: elevatedDarkTheme.accentGlow,
    calloutBorder: elevatedDarkTheme.accent,
    buttonBg: elevatedDarkTheme.accentGlow,
    buttonHoverBg: elevatedDarkTheme.accentBorder,
    headerBg: 'rgba(24, 24, 27, 0.95)',
  } : {
    // Optimized light theme for readability
    bg: lightTheme.bg,
    contentBg: lightTheme.surface,
    text: lightTheme.text,
    textMuted: lightTheme.textSecondary,
    textSubtle: lightTheme.textMuted,
    heading: lightTheme.heading,
    border: lightTheme.borderSubtle,
    accent: lightTheme.accent,
    accentLight: lightTheme.accentLight,
    accentBg: lightTheme.accentGlow,
    accentBorder: lightTheme.accentBorder,
    codeBg: lightTheme.codeBg,
    codeBorder: lightTheme.codeBorder,
    calloutBg: lightTheme.calloutBg,
    calloutBorder: lightTheme.calloutBorder,
    buttonBg: lightTheme.buttonBg,
    buttonHoverBg: lightTheme.buttonHoverBg,
    headerBg: lightTheme.headerBg,
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
      author: 'Zev Uhuru',
      authorRole: 'Founder, Esy',
      readTime: '10 min',
      link: '#'
    },
    {
      category: 'Case Study',
      title: 'Real-World Applications of Prompt Engineering',
      author: 'Zev Uhuru',
      authorRole: 'Founder, Esy',
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
    <>
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        style={{
          position: 'fixed',
          bottom: isMobile ? '1.5rem' : '2rem',
          right: isMobile ? '1rem' : '2rem',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: isDarkMode ? elevatedDarkTheme.elevated : '#f9fafb',
          border: isDarkMode ? 'none' : `1px solid ${theme.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          backdropFilter: 'blur(10px)',
          boxShadow: isDarkMode ? '0 2px 8px rgba(0, 0, 0, 0.1)' : lightTheme.shadows?.md,
          zIndex: 100
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.backgroundColor = isDarkMode ? elevatedDarkTheme.surface : '#ffffff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = isDarkMode ? elevatedDarkTheme.elevated : '#f9fafb';
        }}
        aria-label="Toggle theme"
      >
        {isDarkMode ? <Sun size={20} color={theme.textMuted || 'rgba(255, 255, 255, 0.6)'} /> : <Moon size={20} color={theme.textMuted || 'rgba(0, 0, 0, 0.6)'} />}
      </button>

    <ArticleLayout meta={meta} theme={theme} isDarkMode={isDarkMode}>
      <ArticleHero 
        category="Prompt Engineering"
        title="What is Prompt Engineering? A Comprehensive Guide"
        author={author}
        date="March 22, 2025"
        readTime={`${readingProgress} / ${estimatedReadTime}`}
        theme={theme}
        isDarkMode={isDarkMode}
      />

      <div style={{
        maxWidth: isDesktop ? '1200px' : '100%',
        margin: '0 auto',
        padding: isMobile ? '0 1.5rem' : isDesktop ? '0 2rem' : '0 2rem',
        display: isDesktop ? 'grid' : 'block',
        gridTemplateColumns: isDesktop ? '1fr 280px' : '1fr',
        gap: isDesktop ? '2rem' : '0',
        alignItems: 'start',
        position: 'relative'
      }}>
      <div style={{
        lineHeight: '1.8',
        color: theme.text,
        maxWidth: isDesktop ? '100%' : '720px',
        margin: isDesktop ? '0' : '0 auto'
      }}>
        <p style={styles.paragraph}>
        In the rapidly evolving landscape of artificial intelligence, prompt engineering has emerged as a crucial skill for anyone looking to harness the full potential of large language models (LLMs). Whether you&apos;re a researcher, developer, writer, or simply an AI enthusiast, understanding how to craft effective prompts can dramatically improve your interactions with AI systems.
      </p>

      <div style={{...styles.calloutBox, backgroundColor: theme.calloutBg, borderColor: theme.calloutBorder}}>
        <h4 style={{...styles.calloutTitle, color: theme.accent}}>
          <span style={{ fontSize: '1.5rem' }}>💡</span>
          Key Insight
        </h4>
        <p style={{color: theme.text}}>
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
          backgroundColor: theme.accentBg,
          border: `1px solid ${theme.border}`,
          borderRadius: '12px',
          padding: '1.5rem'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🟣</div>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>1. Context Setting</h3>
          <p style={{ fontSize: '0.875rem', color: theme.textMuted }}>
            Providing relevant background information to guide the AI&apos;s response
          </p>
        </div>

        <div style={{
          backgroundColor: theme.accentBg,
          border: `1px solid ${theme.border}`,
          borderRadius: '12px',
          padding: '1.5rem'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>2. Clear Instructions</h3>
          <p style={{ fontSize: '0.875rem', color: theme.textMuted }}>
            Specifying exactly what you want the AI to do or produce
          </p>
        </div>

        <div style={{
          backgroundColor: theme.accentBg,
          border: `1px solid ${theme.border}`,
          borderRadius: '12px',
          padding: '1.5rem'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>3. Output Formatting</h3>
          <p style={{ fontSize: '0.875rem', color: theme.textMuted }}>
            Defining how you want the response structured or presented
          </p>
        </div>

        <div style={{
          backgroundColor: theme.accentBg,
          border: `1px solid ${theme.border}`,
          borderRadius: '12px',
          padding: '1.5rem'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✨</div>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>4. Examples</h3>
          <p style={{ fontSize: '0.875rem', color: theme.textMuted }}>
            Showing the AI what good outputs look like through demonstrations
          </p>
        </div>
      </div>

      <h2 style={styles.heading2} id="fundamental-techniques">Fundamental Techniques</h2>

      <h3 style={styles.heading3}>Zero-Shot Prompting</h3>
      
      <p style={styles.paragraph}>
        Zero-shot prompting involves asking the model to perform a task without providing any examples. This technique relies on the model&apos;s pre-trained knowledge and understanding.
      </p>

      <div style={{...styles.codeBlock, backgroundColor: theme.codeBg, border: `1px solid ${theme.codeBorder}`}}>
        <span style={{...styles.codeLabel, color: theme.textSubtle}}>Example</span>
        <code style={{color: theme.text}}>
          Classify the following text as positive, negative, or neutral:<br/>
          &quot;The product exceeded my expectations in every way.&quot;
        </code>
      </div>

      <h3 style={styles.heading3}>Few-Shot Prompting</h3>
      
      <p style={styles.paragraph}>
        Few-shot prompting provides the model with a few examples before asking it to perform the task. This helps the model understand the pattern and format you&apos;re looking for.
      </p>

      <div style={{...styles.codeBlock, backgroundColor: theme.codeBg, border: `1px solid ${theme.codeBorder}`}}>
        <span style={{...styles.codeLabel, color: theme.textSubtle}}>Example</span>
        <code style={{color: theme.text}}>
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

      <div style={{...styles.codeBlock, backgroundColor: theme.codeBg, border: `1px solid ${theme.codeBorder}`}}>
        <span style={{...styles.codeLabel, color: theme.textSubtle}}>Example</span>
        <code style={{color: theme.text}}>
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

      <div style={{
        ...styles.literaryExample,
        backgroundColor: isDarkMode ? 'rgba(139, 92, 246, 0.1)' : 'rgba(124, 58, 237, 0.05)',
        border: `1px solid ${theme.border}`
      }}>
        <div style={{...styles.exampleLabel, color: theme.accent}}>Role Example</div>
        <div style={{...styles.exampleText, color: theme.text}}>
          &quot;You are an experienced data scientist. Explain machine learning to a business executive who has no technical background.&quot;
        </div>
        <div style={{...styles.exampleAnalysis, color: theme.textMuted}}>
          This approach helps the AI adjust its language, examples, and focus to match the assigned role and target audience.
        </div>
      </div>

      <h3 style={styles.heading3}>Constraint-Based Prompting</h3>
      
      <p style={styles.paragraph}>
        Set specific constraints to guide the model&apos;s output within desired boundaries.
      </p>

      <div style={{...styles.codeBlock, backgroundColor: theme.codeBg, border: `1px solid ${theme.codeBorder}`}}>
        <span style={{...styles.codeLabel, color: theme.textSubtle}}>Constraints Example</span>
        <code style={{color: theme.text}}>
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

      <div style={{...styles.calloutBox, backgroundColor: theme.calloutBg, borderColor: theme.calloutBorder}}>
        <h4 style={{...styles.calloutTitle, color: theme.accent}}>
          <span style={{ fontSize: '1.5rem' }}>🚀</span>
          Pro Tip
        </h4>
        <p style={{color: theme.text}}>
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

      {isDesktop && (
        <ArticleSidebarComponent 
          tableOfContents={tableOfContents.map(item => ({
            id: item.id,
            title: item.title
          }))}
          scrollProgress={scrollProgress}
          showEmailCapture={true}
          emailCaptureTitle="Get Weekly AI Writing Tips"
          emailCaptureDescription="Join 10,000+ writers improving their craft with AI"
          onEmailSubmit={(email) => {
            console.log('Email submitted:', email);
            // Handle email submission
          }}
          isDarkMode={isDarkMode}
        />
      )}
      </div>

      <footer style={styles.articleFooter}>
        <AuthorBox author={author} theme={theme} isDarkMode={isDarkMode} />
        <ShareSection onShare={handleShare} copiedLink={copiedLink} theme={theme} isDarkMode={isDarkMode} />
      </footer>

      <RelatedArticles articles={relatedArticles} theme={theme} isDarkMode={isDarkMode} />

      <SchoolNewsletter 
        emailInputRef={emailInputRef}
        handleNewsletterSubmit={handleNewsletterSubmit}
        isMobile={false}
        isTablet={false}
        theme={theme}
        isDarkMode={isDarkMode}
      />
    </ArticleLayout>
    </>
  );
}