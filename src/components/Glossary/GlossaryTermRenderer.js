"use client";
import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import GlossaryTermPageClient from '@/app/glossary/[id]/GlossaryTermPageClient';
import styles from '@/components/SchoolArticle/EnhancedMarkdownRenderer.module.css';

export default function GlossaryTermRenderer({ meta, Content, content }) {
  // Always call useMemo at the top level
  const processedContent = useMemo(() => {
    if (!content) return '';
    // Remove frontmatter if it's still in the content
    return content.replace(/^---[\s\S]*?---/, '').trim();
  }, [content]);

  // Transform meta data to match GlossaryTermDetail interface
  const termData = {
    id: meta.slug || meta.id,
    term: meta.title || meta.term,
    pronunciation: meta.pronunciation,
    category: meta.category ? meta.category.toLowerCase() : 'writing',
    definition: meta.definition,
    views: meta.views || 1000,
    readTime: meta.readTime || 2,
    popularity: meta.popularity || 3,
    lastUpdated: meta.date || meta.lastUpdated,
    extendedDefinition: meta.extendedDefinition || meta.content || processedContent,
    personalNote: meta.personalNote,
    usage: meta.usage,
    example: meta.example,
    relatedTerms: meta.relatedTerms || [],
    relatedPosts: meta.relatedPosts || [],
    etymology: meta.etymology,
    firstAdded: meta.firstAdded || meta.date,
    stats: meta.stats || {
      views: meta.views || 1000,
      avgReadTime: `${meta.readTime || 2} min`,
      bookmarks: meta.bookmarks || 50,
      shares: meta.shares || 20
    },
    updateHistory: meta.updateHistory || []
  };

  // If we have compiled MDX content, render it with the term client
  if (Content) {
    return (
      <GlossaryTermPageClient 
        term={termData}
        Content={Content}
        isCompiled={true}
      />
    );
  }
  
  // If we have raw content, render it as markdown
  if (content) {
    return (
      <GlossaryTermPageClient 
        term={termData}
        content={processedContent}
        isCompiled={false}
      />
    );
  }
  
  // Fallback to just the term data without content
  return (
    <GlossaryTermPageClient 
      term={termData}
    />
  );
} 