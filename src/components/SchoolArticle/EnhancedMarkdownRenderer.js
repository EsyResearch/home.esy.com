'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import styles from './EnhancedMarkdownRenderer.module.css';
import { visit } from 'unist-util-visit';

// Custom components for rich content
const KeyInsightBox = ({ children }) => (
  <div className={styles.keyInsightBox}>
    <div className={styles.keyInsightIcon}>💡</div>
    <div className={styles.keyInsightContent}>
      <strong>Key Insight</strong>
      <div>{children}</div>
    </div>
  </div>
);

const ComponentCard = ({ number, title, description, icon }) => (
  <div className={styles.componentCard}>
    <div className={styles.componentNumber}>{number}</div>
    <div className={styles.componentIcon}>{icon}</div>
    <h4 className={styles.componentTitle}>{title}</h4>
    <p className={styles.componentDescription}>{description}</p>
  </div>
);

const PrincipleCard = ({ icon, title, children }) => (
  <div className={styles.principleCard}>
    <div className={styles.principleIcon}>{icon}</div>
    <h4 className={styles.principleTitle}>{title}</h4>
    <p className={styles.principleDescription}>{children}</p>
  </div>
);

const StrategyCard = ({ title, description, example }) => (
  <div className={styles.strategyCard}>
    <h4 className={styles.strategyTitle}>{title}</h4>
    <p className={styles.strategyDescription}>{description}</p>
    {example && (
      <div className={styles.strategyExample}>
        <strong>Example:</strong> {example}
      </div>
    )}
  </div>
);

const VideoCard = ({ title, description, duration, thumbnail }) => (
  <div className={styles.videoCard}>
    <div className={styles.videoThumbnail}>
      {thumbnail && <img src={thumbnail} alt={title} />}
      <div className={styles.playButton}>▶</div>
    </div>
    <div className={styles.videoContent}>
      <h4 className={styles.videoTitle}>{title}</h4>
      <p className={styles.videoDescription}>{description}</p>
      <span className={styles.videoDuration}>{duration}</span>
    </div>
  </div>
);

const CallToAction = ({ title, description, buttonText, buttonLink }) => (
  <div className={styles.callToAction}>
    <h3 className={styles.ctaTitle}>{title}</h3>
    <p className={styles.ctaDescription}>{description}</p>
    <a href={buttonLink} className={styles.ctaButton}>
      {buttonText}
    </a>
  </div>
);

// Custom directive plugin for react-markdown
function directivePlugin() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'textDirective' || node.type === 'leafDirective' || node.type === 'containerDirective') {
        node.data = node.data || {};
        const hast = node.data.hName = node.name;
        node.data.hProperties = node.attributes || {};
      }
    });
  };
}

const components = {
  // Handle blockquotes as key insights
  blockquote: ({ children }) => {
    const text = React.Children.toArray(children).join('');
    if (text.includes('💡') || text.includes('Key Insight')) {
      return <KeyInsightBox>{children}</KeyInsightBox>;
    }
    return <blockquote className={styles.blockquote}>{children}</blockquote>;
  },
  
  // Handle code blocks with syntax highlighting
  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <div className={styles.codeBlockWrapper}>
        <div className={styles.codeHeader}>
          <span className={styles.codeLanguage}>{match[1]}</span>
          <button 
            className={styles.copyButton}
            onClick={() => {
              navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
            }}
          >
            Copy
          </button>
        </div>
        <pre className={styles.codeBlock}>
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </div>
    ) : (
      <code className={styles.inlineCode} {...props}>
        {children}
      </code>
    );
  },
  
  // Handle headings with better styling
  h1: ({ children }) => <h1 className={styles.h1}>{children}</h1>,
  h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
  h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
  h4: ({ children }) => <h4 className={styles.h4}>{children}</h4>,
  
  // Handle lists with better styling
  ul: ({ children }) => <ul className={styles.ul}>{children}</ul>,
  ol: ({ children }) => <ol className={styles.ol}>{children}</ol>,
  li: ({ children }) => <li className={styles.li}>{children}</li>,
  
  // Handle links with better styling
  a: ({ href, children }) => (
    <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  
  // Handle paragraphs with better spacing
  p: ({ children }) => <p className={styles.paragraph}>{children}</p>,
  
  // Handle tables with better styling
  table: ({ children }) => <table className={styles.table}>{children}</table>,
  thead: ({ children }) => <thead className={styles.thead}>{children}</thead>,
  tbody: ({ children }) => <tbody className={styles.tbody}>{children}</tbody>,
  tr: ({ children }) => <tr className={styles.tr}>{children}</tr>,
  th: ({ children }) => <th className={styles.th}>{children}</th>,
  td: ({ children }) => <td className={styles.td}>{children}</td>,
  keyinsight: ({ children }) => <KeyInsightBox>{children}</KeyInsightBox>,
  principle: ({ icon, title, children }) => <PrincipleCard icon={icon} title={title}>{children}</PrincipleCard>,
};

const EnhancedMarkdownRenderer = ({ content }) => {
  return (
    <div className={styles.markdownContainer}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkDirective, directivePlugin]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default EnhancedMarkdownRenderer; 