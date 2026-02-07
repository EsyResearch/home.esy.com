"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Theme, GlossaryTerm, GlossaryCategory } from '@/types';

interface GlossaryGridProps {
  terms: GlossaryTerm[];
  categories: GlossaryCategory[];
  currentTheme: Theme;
  hoveredTerm: string | null;
  setHoveredTerm: (term: string | null) => void;
  getCategoryColor: (category: string) => string;
  windowWidth: number;
}

const GlossaryGrid: React.FC<GlossaryGridProps> = ({
  terms,
  categories,
  currentTheme,
  hoveredTerm,
  setHoveredTerm,
  getCategoryColor,
  windowWidth
}) => {
  // Group terms alphabetically
  const grouped: Record<string, GlossaryTerm[]> = {};
  terms.forEach(term => {
    const letter = term.term[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(term);
  });
  const sortedLetters = Object.keys(grouped).sort();

  return (
    <div>
      {sortedLetters.map(letter => (
        <div key={letter} id={`letter-${letter}`} style={{ marginBottom: '2.5rem' }}>
          {/* Letter Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem',
            scrollMarginTop: '6rem'
          }}>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              fontFamily: 'var(--font-literata)',
              color: currentTheme.accent,
              width: '2rem',
              textAlign: 'center'
            }}>
              {letter}
            </span>
            <div style={{
              flex: 1,
              height: '1px',
              background: currentTheme.border
            }} />
          </div>

          {/* Terms for this letter */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: windowWidth < 640
              ? '1fr'
              : windowWidth < 1024
                ? 'repeat(2, 1fr)'
                : 'repeat(3, 1fr)',
            gap: '0.5rem'
          }}>
            {grouped[letter].map(term => {
              const isHovered = hoveredTerm === term.id;
              const catName = categories.find(c => c.id === term.category)?.name;

              return (
                <Link
                  key={term.id}
                  href={`/glossary/${term.id}/`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.375rem',
                    padding: '1rem 1.25rem',
                    borderRadius: '12px',
                    border: `1px solid ${isHovered ? currentTheme.border : 'transparent'}`,
                    background: isHovered ? currentTheme.elevated : 'transparent',
                    textDecoration: 'none',
                    color: currentTheme.text,
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={() => setHoveredTerm(term.id)}
                  onMouseLeave={() => setHoveredTerm(null)}
                >
                  {/* Term + Arrow */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <h3 style={{
                      fontSize: '0.9375rem',
                      fontWeight: 500,
                      lineHeight: 1.3,
                      margin: 0
                    }}>
                      {term.term}
                    </h3>
                    <ArrowRight
                      size={14}
                      style={{
                        color: currentTheme.accent,
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 0.2s ease',
                        flexShrink: 0,
                        marginLeft: '0.5rem'
                      }}
                    />
                  </div>

                  {/* Category label */}
                  <span style={{
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    color: getCategoryColor(term.category),
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em'
                  }}>
                    {catName}
                  </span>

                  {/* Definition preview */}
                  <p style={{
                    fontSize: '0.8125rem',
                    lineHeight: 1.55,
                    color: currentTheme.muted,
                    margin: 0,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {term.definition}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      ))}

      {/* Empty State */}
      {terms.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          color: currentTheme.subtle
        }}>
          <p style={{ marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: 400 }}>
            No terms found
          </p>
          <p style={{ fontSize: '0.875rem' }}>
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default GlossaryGrid;
