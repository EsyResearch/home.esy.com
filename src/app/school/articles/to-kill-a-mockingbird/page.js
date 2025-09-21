"use client"

import React, { useState, useEffect, useRef } from 'react';
import ArticleLayout from '@/components/SchoolArticle/ArticleLayout';
import ArticleHero from '@/components/SchoolArticle/ArticleHero';
import MockingbirdFeaturedImage from '@/components/SchoolArticle/MockingbirdFeaturedImage';
import TableOfContents from '@/components/SchoolArticle/TableOfContents';
import AuthorBox from '@/components/SchoolArticle/AuthorBox';
import ShareSection from '@/components/SchoolArticle/ShareSection';
import RelatedArticles from '@/components/SchoolArticle/RelatedArticles';
import SchoolNewsletter from '@/components/School/SchoolNewsletter';
import { articleContentStyles as styles } from '@/components/SchoolArticle/articleStyles';

export default function ToKillAMockingbirdArticle() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const meta = {
    category: 'Literary Analysis'
  };

  const author = {
    initials: 'EW',
    name: 'Zev Uhuru',
    role: 'Founder, Esy',
    bio: 'Professor of English Literature at Yale University, specializing in American literature and digital humanities. Author of "Reading in the Digital Age" and pioneer in applying AI tools to literary analysis while maintaining humanistic values.',
    meta: '38 articles published · Joined February 2024'
  };

  const tableOfContents = [
    { id: 'introduction', title: 'Introduction', active: scrollProgress < 15 },
    { id: 'symbolic-analysis', title: 'Symbolic Analysis', active: scrollProgress >= 15 && scrollProgress < 35 },
    { id: 'character-exploration', title: 'Character Deep Dives', active: scrollProgress >= 35 && scrollProgress < 55 },
    { id: 'thematic-prompts', title: 'Thematic Exploration', active: scrollProgress >= 55 && scrollProgress < 75 },
    { id: 'comparative-analysis', title: 'Comparative Analysis', active: scrollProgress >= 75 && scrollProgress < 90 },
    { id: 'conclusion', title: 'Advanced Techniques', active: scrollProgress >= 90 }
  ];

  const relatedArticles = [
    {
      category: 'Literary Analysis',
      title: 'AI-Powered Shakespeare: Analyzing The Tempest',
      author: 'Zev Uhuru',
      authorRole: 'Founder, Esy',
      readTime: '12 min',
      link: '#'
    },
    {
      category: 'Prompt Engineering',
      title: 'Deconstructing Modernist Poetry with GPT-4',
      author: 'Zev Uhuru',
      authorRole: 'Founder, Esy',
      readTime: '10 min',
      link: '#'
    },
    {
      category: 'Case Studies',
      title: 'From Text to Context: Historical Fiction Analysis',
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

  // Estimated reading time
  const estimatedReadTime = 15;
  const readingProgress = Math.min(Math.round((scrollProgress / 100) * estimatedReadTime), estimatedReadTime);

  return (
    <ArticleLayout meta={meta}>
      <MockingbirdFeaturedImage />
      
      <ArticleHero 
        category="Literary Analysis"
        title='Unlocking Literary Depth: Using Prompt Engineering to Analyze "To Kill a Mockingbird"'
        author={author}
        date="March 25, 2025"
        readTime={`${readingProgress} / ${estimatedReadTime}`}
      />

      <div style={styles.contentWrapper}>
        <p style={styles.paragraph}>
        Harper Lee&apos;s &quot;To Kill a Mockingbird&quot; remains one of American literature&apos;s most profound explorations of justice, morality, and coming-of-age. But what if we could unlock deeper layers of meaning using modern AI tools? This guide demonstrates how strategic prompt engineering can transform your literary analysis, revealing insights that might otherwise remain hidden.
      </p>

      <p style={styles.paragraph}>
        By combining traditional close reading techniques with AI-powered analysis, we can explore symbolism, character development, and thematic elements with unprecedented depth. This approach doesn&apos;t replace human interpretation—it enhances it, offering new perspectives and connections that enrich our understanding of this classic text.
      </p>

      <h2 style={styles.heading2} id="symbolic-analysis">Mastering Symbolic Analysis Through Prompts</h2>
      
      <p style={styles.paragraph}>
        The mockingbird symbol permeates Lee&apos;s novel, but its full significance often eludes first-time readers. Let&apos;s explore how carefully crafted prompts can illuminate this central metaphor and its various manifestations throughout the text.
      </p>

      <div style={styles.codeBlock}>
        <span style={styles.codeLabel}>Prompt Example</span>
        <code>
          Analyze the mockingbird as a symbol in Harper Lee&apos;s novel. Consider:<br/><br/>
          1. Direct references to mockingbirds in the text<br/>
          2. Characters who embody mockingbird-like qualities<br/>
          3. The progression of this symbol from innocence to destruction<br/>
          4. How Scout&apos;s understanding of the symbol evolves<br/><br/>
          Provide specific textual evidence and explore the symbol&apos;s connection to the novel&apos;s central themes of innocence, justice, and moral growth.
        </code>
      </div>

      <p style={styles.paragraph}>
        This prompt structure encourages comprehensive analysis while maintaining focus. The AI can help identify subtle connections between the mockingbird symbol and characters like Tom Robinson and Boo Radley, both of whom embody innocence destroyed by evil.
      </p>

      <div style={styles.literaryExample}>
        <div style={styles.exampleLabel}>Literary Insight</div>
        <div style={styles.exampleText}>
          &quot;Mockingbirds don&apos;t do one thing but make music for us to enjoy... they don&apos;t do one thing but sing their hearts out for us. That&apos;s why it&apos;s a sin to kill a mockingbird.&quot;
        </div>
        <div style={styles.exampleAnalysis}>
          The AI analysis reveals how this seemingly simple explanation from Atticus contains the novel&apos;s entire moral framework. The mockingbird becomes a test of character—those who would harm the innocent reveal their own moral corruption.
        </div>
      </div>

      <h3 style={styles.heading3}>Advanced Symbolic Connections</h3>
      
      <p style={styles.paragraph}>
        To deepen the analysis, we can use chain-of-thought prompting to explore interconnected symbols. Consider how the mockingbird relates to other symbolic elements: the tree gifts, the courthouse, Scout&apos;s ham costume. Each carries meaning that amplifies when examined in relation to the others.
      </p>

      <h2 style={styles.heading2} id="character-exploration">Character Deep Dives with AI Assistance</h2>
      
      <p style={styles.paragraph}>
        Character analysis benefits tremendously from AI&apos;s ability to track development across lengthy texts. Let&apos;s examine how to craft prompts that reveal character complexity and growth.
      </p>

      <div style={styles.codeBlock}>
        <span style={styles.codeLabel}>Character Analysis Prompt</span>
        <code>
          Trace Scout Finch&apos;s moral development throughout &quot;To Kill a Mockingbird&quot; by analyzing:<br/><br/>
          - Her initial worldview and assumptions about Maycomb<br/>
          - Key moments that challenge her perspective<br/>
          - Her evolving understanding of empathy (walking in someone&apos;s shoes)<br/>
          - The role of Atticus, Jem, and Calpurnia in shaping her growth<br/>
          - How her narration style reflects her changing maturity<br/><br/>
          Focus on specific scenes and dialogue that mark turning points in her development.
        </code>
      </div>

      <p style={styles.paragraph}>
        This structured approach helps identify Scout&apos;s transformation from innocent observer to empathetic participant in her community&apos;s moral struggles. The AI can track linguistic changes in her narration that reflect growing sophistication.
      </p>

      <div style={styles.calloutBox}>
        <h4 style={styles.calloutTitle}>
          <span style={{ fontSize: '1.5rem' }}>🎯</span>
          Prompt Engineering Tip
        </h4>
        <p>
          When analyzing character development, ask the AI to compare early and late appearances of the character. This contrast approach often reveals subtle growth that linear analysis might miss.
        </p>
      </div>

      <h3 style={styles.heading3}>Exploring Character Relationships</h3>
      
      <p style={styles.paragraph}>
        The relationships between characters often reveal more than individual analysis. Consider this approach to examining the complex dynamic between Scout and Boo Radley:
      </p>

      <div style={styles.literaryExample}>
        <div style={styles.exampleLabel}>Relationship Analysis</div>
        <div style={styles.exampleText}>
          &quot;Boo was our neighbor. He gave us two soap dolls, a broken watch and chain, a pair of good-luck pennies, and our lives.&quot;
        </div>
        <div style={styles.exampleAnalysis}>
          Through prompted analysis, we see how Scout&apos;s simple list represents a profound journey from childish curiosity to mature gratitude. Each gift marks a stage in their relationship, culminating in the ultimate gift of life itself.
        </div>
      </div>

      <h2 style={styles.heading2} id="thematic-prompts">Thematic Exploration Through Layered Prompts</h2>
      
      <p style={styles.paragraph}>
        The novel&apos;s themes interweave in complex patterns. AI analysis excels at identifying these connections when given properly structured prompts. Let&apos;s explore the intersection of prejudice, justice, and moral courage.
      </p>

      <div style={styles.codeBlock}>
        <span style={styles.codeLabel}>Thematic Analysis Framework</span>
        <code>
          Analyze how &quot;To Kill a Mockingbird&quot; presents the theme of moral courage:<br/><br/>
          Level 1: Identify explicit acts of courage (Atticus defending Tom, Mrs. Dubose&apos;s struggle)<br/>
          Level 2: Explore quiet courage (Miss Maudie&apos;s dignity, Link Deas supporting Helen)<br/>
          Level 3: Examine the courage required to change one&apos;s mind (Scout with Boo, Jem&apos;s disillusionment)<br/>
          Level 4: Connect courage to the novel&apos;s critique of social systems<br/><br/>
          How does Lee suggest that true courage exists in degrees and contexts?
        </code>
      </div>

      <p style={styles.paragraph}>
        This layered approach reveals how Lee constructs a nuanced argument about courage that goes beyond simple heroics. The AI can help identify patterns showing how different characters embody different types of courage, each valid and necessary.
      </p>

      <h2 style={styles.heading2} id="comparative-analysis">Comparative Analysis: Connecting Texts and Contexts</h2>
      
      <p style={styles.paragraph}>
        One of AI&apos;s greatest strengths lies in making connections across texts and contexts. We can use this capability to place &quot;To Kill a Mockingbird&quot; in broader literary and historical conversations.
      </p>

      <div style={styles.calloutBox}>
        <h4 style={styles.calloutTitle}>
          <span style={{ fontSize: '1.5rem' }}>🔄</span>
          Cross-Reference Prompt
        </h4>
        <p>
          Compare the treatment of justice in &quot;To Kill a Mockingbird&quot; with other American literary works addressing racial injustice. Consider narrative techniques, character archetypes, and how each work reflects its historical moment while speaking to universal themes.
        </p>
      </div>

      <p style={styles.paragraph}>
        This comparative approach can reveal how Lee&apos;s work both draws from and contributes to American literary traditions. The AI can identify echoes of earlier works while highlighting Lee&apos;s unique contributions to the ongoing dialogue about race and justice in America.
      </p>

      <h2 style={styles.heading2} id="conclusion">Advanced Techniques and Best Practices</h2>
      
      <p style={styles.paragraph}>
        As you develop your prompt engineering skills for literary analysis, remember that the goal is not to replace human insight but to augment it. The best analysis emerges from a dialogue between human creativity and AI capability.
      </p>

      <h3 style={styles.heading3}>Key Strategies for Success</h3>
      
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <strong>Iterative Refinement:</strong> Start with broad prompts and narrow based on initial results. Each response can inform more targeted questions.
        </li>
        <li style={styles.listItem}>
          <strong>Textual Grounding:</strong> Always request specific quotations and page references. This ensures analysis remains rooted in the text rather than generalities.
        </li>
        <li style={styles.listItem}>
          <strong>Multiple Perspectives:</strong> Ask the AI to argue different interpretations of the same passage. This develops critical thinking and reveals textual ambiguity.
        </li>
        <li style={styles.listItem}>
          <strong>Historical Context:</strong> Include prompts about the novel&apos;s historical moment and reception history. This adds crucial layers to interpretation.
        </li>
        <li style={styles.listItem}>
          <strong>Creative Connections:</strong> Encourage unexpected comparisons and metaphorical thinking. AI can suggest surprising but illuminating parallels.
        </li>
      </ul>

      <div style={styles.literaryExample}>
        <div style={styles.exampleLabel}>Final Reflection</div>
        <div style={styles.exampleText}>
          &quot;You never really understand a person until you consider things from his point of view... Until you climb inside of his skin and walk around in it.&quot;
        </div>
        <div style={styles.exampleAnalysis}>
          This central wisdom from Atticus applies equally to our approach to literary analysis with AI. By crafting thoughtful prompts, we climb inside the text, walking around in its meanings, discovering new paths through familiar territory.
        </div>
      </div>

      <p style={styles.paragraph}>
        The marriage of traditional literary analysis and modern AI tools opens new horizons for understanding classic texts. As you apply these techniques to &quot;To Kill a Mockingbird&quot; and beyond, you&apos;ll discover that prompt engineering is itself an art—one that rewards patience, creativity, and careful attention to language.
      </p>

      <p style={styles.paragraph}>
        Start with these frameworks, but don&apos;t stop there. The beauty of AI-assisted analysis lies in its ability to surprise us, revealing connections and insights we might never have discovered alone. In this collaboration between human insight and artificial intelligence, we find new ways to honor the complexity and continued relevance of great literature.
      </p>
      </div>

      <TableOfContents items={tableOfContents} scrollProgress={scrollProgress} />

      <footer style={styles.articleFooter}>
        <AuthorBox author={author} />
        <ShareSection onShare={handleShare} copiedLink={copiedLink} />
      </footer>

      <RelatedArticles articles={relatedArticles} />

      <SchoolNewsletter 
        emailInputRef={emailInputRef}
        handleNewsletterSubmit={handleNewsletterSubmit}
        isMobile={false}
        isTablet={false}
      />
    </ArticleLayout>
  );
}