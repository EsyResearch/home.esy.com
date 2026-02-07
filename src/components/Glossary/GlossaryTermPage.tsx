'use client';

import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FileText, Brain, Globe, Lightbulb, Code, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import styles from './GlossaryTermPage.module.css';

interface GlossaryTermData {
  slug: string;
  title: string;
  category: string;
  description: string;
  pronunciation?: string;
  relatedTerms?: string[];
  content: string;
}

interface GlossaryTermPageProps {
  term: GlossaryTermData;
}

const categoryConfig: Record<string, { name: string; icon: React.ElementType; color: string }> = {
  writing: { name: 'Writing', icon: FileText, color: '#00A896' },
  structure: { name: 'Structure', icon: Brain, color: '#0A2540' },
  research: { name: 'Research', icon: Globe, color: '#2A9D8F' },
  citation: { name: 'Citation', icon: Lightbulb, color: '#F59E0B' },
  grammar: { name: 'Grammar', icon: Code, color: '#6C757D' },
};

export default function GlossaryTermPage({ term }: GlossaryTermPageProps) {
  const category = categoryConfig[term.category] || categoryConfig.writing;
  const IconComponent = category.icon;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.title,
    description: term.description,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Esy Writing Glossary',
      url: 'https://esy.com/glossary',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className={styles.page}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            {/* Grid Background Pattern */}
            <div className={styles.gridPattern} />
            
            <div className={styles.heroContent}>
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Glossary', href: '/glossary' },
                  { label: term.title, isCurrent: true },
                ]}
              />

              <div
                className={styles.badge}
                style={{ '--badge-color': category.color } as React.CSSProperties}
              >
                <IconComponent size={14} />
                {category.name}
              </div>

              <h1 className={styles.title}>{term.title}</h1>

              {term.pronunciation && (
                <p className={styles.pronunciation}>{term.pronunciation}</p>
              )}

              {term.description && (
                <p className={styles.description}>{term.description}</p>
              )}
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className={styles.article}>
          {term.content && (
            <section className={styles.prose}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{term.content}</ReactMarkdown>
            </section>
          )}

          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <footer className={styles.footer}>
              <h2>Related Terms</h2>
              <nav className={styles.related}>
                {term.relatedTerms.map((slug) => (
                  <Link key={slug} href={`/glossary/${slug}`}>
                    {slug.replace(/-/g, ' ')}
                    <ArrowRight size={12} style={{ opacity: 0.5 }} />
                  </Link>
                ))}
              </nav>
            </footer>
          )}

          {/* Back to Glossary */}
          <div className={styles.backLink}>
            <Link href="/glossary">
              ← Browse all terms
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
