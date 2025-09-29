"use client"

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
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

export default function AIResearchRevolutionArticle() {
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
      setIsDesktop(width >= 1024); // Lowered from 1280px to show on laptops
      setIsMobile(width < 768);
      console.log('Screen width:', width, 'Desktop:', width >= 1024);
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
      author: 'Zev Uhuru',
      authorRole: 'Founder, Esy',
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
      author: 'Zev Uhuru',
      authorRole: 'Founder, Esy',
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

  // Theme configuration
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
        category="Academic Writing"
        title="5 Ways AI is Revolutionizing Academic Research"
        author={author}
        date="March 18, 2025"
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
          <p style={{...styles.paragraph, color: theme.text}}>
        AI is transforming every stage of the research process, from literature reviews to data analysis and beyond. Here are five key ways AI is making an impact:
      </p>

      <h2 style={{...styles.heading2, color: theme.heading}} id="literature-review">1. Literature Review Automation</h2>

      <p style={{...styles.paragraph, color: theme.text}}>
        AI tools can scan thousands of papers in seconds, summarizing key findings and identifying trends that would take humans weeks to uncover.
      </p>

      <div style={{...styles.calloutBox, backgroundColor: theme.calloutBg, borderColor: theme.calloutBorder}}>
        <h4 style={{...styles.calloutTitle, color: theme.accent}}>
          <span style={{ fontSize: '1.5rem' }}>📚</span>
          Key Benefits
        </h4>
        <ul style={{ ...styles.list, marginBottom: 0, color: theme.text }}>
          <li style={{...styles.listItem, color: theme.text}}>Comprehensive coverage of relevant literature</li>
          <li style={{...styles.listItem, color: theme.text}}>Automatic identification of research gaps</li>
          <li style={{...styles.listItem, color: theme.text}}>Time savings of up to 90% compared to manual reviews</li>
          <li style={{...styles.listItem, color: theme.text}}>Real-time updates as new papers are published</li>
        </ul>
      </div>

      <p style={{...styles.paragraph, color: theme.text}}>
        Modern AI-powered literature review tools use natural language processing to understand the context and relevance of research papers. They can identify methodological approaches, key findings, and even potential conflicts or contradictions across studies.
      </p>

      <h2 style={{...styles.heading2, color: theme.heading}} id="data-analysis">2. Data Analysis</h2>

      <div style={{
        margin: '2rem 0',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: theme.codeBg,
        border: `1px solid ${theme.codeBorder}`
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
          color: theme.textSubtle,
          fontStyle: 'italic',
          margin: 0
        }}>
          Figure 2: AI-driven data analysis in action.
        </p>
      </div>

      <p style={{...styles.paragraph, color: theme.text}}>
        AI algorithms can process and analyze large datasets, revealing patterns and insights that drive new discoveries. Machine learning models excel at:
      </p>

      <ul style={{...styles.list, color: theme.text}}>
        <li style={{...styles.listItem, color: theme.text}}>Pattern recognition in complex multidimensional data</li>
        <li style={{...styles.listItem, color: theme.text}}>Anomaly detection for quality control</li>
        <li style={{...styles.listItem, color: theme.text}}>Predictive modeling for hypothesis testing</li>
        <li style={{...styles.listItem, color: theme.text}}>Automated statistical analysis and visualization</li>
      </ul>

      <h2 style={{...styles.heading2, color: theme.heading}} id="writing-assistance">3. Automated Writing Assistance</h2>

      <p style={{...styles.paragraph, color: theme.text}}>
        From grammar checking to generating entire sections of text, AI writing tools help researchers communicate their findings more clearly and efficiently.
      </p>

      <div style={{
        ...styles.literaryExample,
        backgroundColor: isDarkMode ? 'rgba(139, 92, 246, 0.05)' : 'rgba(124, 58, 237, 0.05)',
        border: `1px solid ${theme.border}`
      }}>
        <div style={{...styles.exampleLabel, color: theme.accent}}>AI Writing Capabilities</div>
        <div style={{...styles.exampleText, color: theme.text}}>
          &quot;The integration of quantum computing principles into molecular dynamics simulations represents a paradigmatic shift in computational chemistry.&quot;
        </div>
        <div style={{...styles.exampleAnalysis, color: theme.textMuted}}>
          AI can help refine complex academic prose, suggest clearer alternatives, and ensure consistency in terminology throughout lengthy documents.
        </div>
      </div>

      <p style={{...styles.paragraph, color: theme.text}}>
        Advanced AI writing assistants go beyond simple grammar checking. They can:
      </p>

      <ul style={{...styles.list, color: theme.text}}>
        <li style={{...styles.listItem, color: theme.text}}>Suggest improvements to logical flow and argumentation</li>
        <li style={{...styles.listItem, color: theme.text}}>Ensure consistency in citation formatting</li>
        <li style={{...styles.listItem, color: theme.text}}>Generate literature review summaries</li>
        <li style={{...styles.listItem, color: theme.text}}>Adapt writing style for different academic audiences</li>
      </ul>

      <h2 style={{...styles.heading2, color: theme.heading}} id="predictive-analytics">4. Predictive Analytics</h2>

      <p style={{...styles.paragraph, color: theme.text}}>
        Machine learning models can predict research outcomes, suggest new hypotheses, and optimize experimental design.
      </p>

      <div style={{...styles.codeBlock, backgroundColor: theme.codeBg, border: `1px solid ${theme.codeBorder}`}}>
        <span style={{...styles.codeLabel, color: theme.textSubtle}}>Example: Predictive Model Input</span>
        <code style={{color: theme.text}}>
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

      <p style={{...styles.paragraph, color: theme.text}}>
        These predictive capabilities allow researchers to:
      </p>

      <ul style={{...styles.list, color: theme.text}}>
        <li style={{...styles.listItem, color: theme.text}}>Optimize experimental parameters before conducting costly trials</li>
        <li style={{...styles.listItem, color: theme.text}}>Identify promising research directions based on existing data</li>
        <li style={{...styles.listItem, color: theme.text}}>Reduce the number of experiments needed to validate hypotheses</li>
        <li style={{...styles.listItem, color: theme.text}}>Accelerate the pace of discovery through intelligent hypothesis generation</li>
      </ul>

      <h2 style={{...styles.heading2, color: theme.heading}} id="collaboration">5. Collaboration and Networking</h2>

      <p style={{...styles.paragraph, color: theme.text}}>
        AI-powered platforms connect researchers across disciplines, fostering collaboration and accelerating the pace of innovation.
      </p>

      <div style={{...styles.calloutBox, backgroundColor: theme.calloutBg, borderColor: theme.calloutBorder}}>
        <h4 style={{...styles.calloutTitle, color: theme.accent}}>
          <span style={{ fontSize: '1.5rem' }}>🌐</span>
          Collaboration Features
        </h4>
        <p style={{color: theme.text, marginBottom: 0}}>
          Modern AI platforms can match researchers based on complementary skills, identify potential collaborators working on related problems, and even suggest interdisciplinary approaches to complex challenges.
        </p>
      </div>

      <p style={{...styles.paragraph, color: theme.text}}>
        AI facilitates research collaboration through:
      </p>

      <ul style={{...styles.list, color: theme.text}}>
        <li style={{...styles.listItem, color: theme.text}}>Intelligent matching algorithms that identify complementary expertise</li>
        <li style={{...styles.listItem, color: theme.text}}>Automated translation for international collaborations</li>
        <li style={{...styles.listItem, color: theme.text}}>Real-time collaboration on data analysis and interpretation</li>
        <li style={{...styles.listItem, color: theme.text}}>Knowledge graphs that visualize connections between research areas</li>
      </ul>

      <h2 style={{...styles.heading2, color: theme.heading}}>Conclusion</h2>

      <p style={{...styles.paragraph, color: theme.text}}>
        The integration of AI into academic research is not just improving existing processes—it&apos;s fundamentally changing how we approach scientific discovery. From accelerating literature reviews to enabling new forms of collaboration, AI is empowering researchers to tackle increasingly complex challenges.
      </p>

      <p style={{...styles.paragraph, color: theme.text}}>
        As these technologies continue to evolve, we can expect even more transformative changes in how research is conducted, shared, and applied. The key for researchers is to embrace these tools while maintaining the critical thinking and creativity that drive true innovation.
      </p>

      <div style={{...styles.calloutBox, backgroundColor: theme.calloutBg, borderColor: theme.calloutBorder}}>
        <h4 style={{...styles.calloutTitle, color: theme.accent}}>
          <span style={{ fontSize: '1.5rem' }}>🚀</span>
          Looking Ahead
        </h4>
        <p style={{color: theme.text, marginBottom: 0}}>
          The future of academic research lies in the synergy between human insight and AI capabilities. By leveraging these tools effectively, researchers can focus on what they do best: asking the right questions and interpreting results in meaningful ways.
        </p>
      </div>
        </div>

        {isDesktop && (
          <ArticleSidebarComponent 
            tableOfContents={tableOfContents.map(item => ({
              id: item.id,
              title: item.title.replace(/^\d+\.\s*/, '') // Remove number prefix from title
            }))}
            scrollProgress={scrollProgress}
            showEmailCapture={true}
            emailCaptureTitle="Get Weekly AI Writing Tips"
            emailCaptureDescription="Join 10,000+ writers improving their craft with AI"
            onEmailSubmit={(email) => {
              console.log('Email submitted:', email);
              // Handle email submission
            }}
            currentTheme={theme}
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