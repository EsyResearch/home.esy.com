"use client";
import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import SchoolArticleView from "./SchoolArticleView";
import StyleInspector from '../StyleInspector';
import styles from './EnhancedMarkdownRenderer.module.css';

export default function MdxClientRenderer({ meta, Content, content }) {
  // Always call useMemo at the top level
  const processedContent = useMemo(() => {
    if (!content) return '';
    // Remove frontmatter if it's still in the content
    return content.replace(/^---[\s\S]*?---/, '').trim();
  }, [content]);

  // If we have compiled MDX content, render it
  if (Content) {
    return (
      <>
        <SchoolArticleView article={{ ...meta, Content }}>
          <div className={styles.markdownContainer}>
            {Content}
          </div>
        </SchoolArticleView>
        <StyleInspector />
      </>
    );
  }
  
  // If we have raw content, render it as markdown
  if (content) {
    return (
      <>
        <SchoolArticleView article={meta}>
          <div className={styles.markdownContainer}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkDirective]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
              components={{
                // Let the CSS handle the styling through .markdownContainer selectors
                h1: ({ children }) => <h1>{children}</h1>,
                h2: ({ children }) => <h2>{children}</h2>,
                h3: ({ children }) => <h3>{children}</h3>,
                h4: ({ children }) => <h4>{children}</h4>,
                p: ({ children }) => <p>{children}</p>,
                ul: ({ children }) => <ul>{children}</ul>,
                ol: ({ children }) => <ol>{children}</ol>,
                li: ({ children }) => <li>{children}</li>,
                blockquote: ({ children }) => <blockquote>{children}</blockquote>,
                code: ({ children, className }) => {
                  const language = className ? className.replace('language-', '') : '';
                  return (
                    <code className={language ? `language-${language}` : ''}>
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => <pre>{children}</pre>,
              }}
            >
              {processedContent}
            </ReactMarkdown>
          </div>
        </SchoolArticleView>
        <StyleInspector />
      </>
    );
  }
  
  return (
    <>
      <SchoolArticleView article={meta} />
      <StyleInspector />
    </>
  );
} 