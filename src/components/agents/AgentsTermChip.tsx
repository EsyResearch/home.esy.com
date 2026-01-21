"use client";

import Link from 'next/link';

const theme = {
  text: '#fafafa',
  muted: 'rgba(250, 250, 250, 0.7)',
  subtle: 'rgba(250, 250, 250, 0.45)',
  border: 'rgba(250, 250, 250, 0.08)',
  accent: '#a78bfa',
};

interface AgentsTermChipProps {
  slug: string;
  label: string;
}

export function AgentsTermChip({ slug, label }: AgentsTermChipProps) {
  return (
    <Link
      href={`/agents/terms/${slug}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.25rem 0.625rem',
        background: 'rgba(167, 139, 250, 0.08)',
        border: '1px solid rgba(167, 139, 250, 0.15)',
        borderRadius: '6px',
        fontSize: '0.8125rem',
        fontWeight: 500,
        color: theme.accent,
        textDecoration: 'none',
        transition: 'all 0.15s ease',
        letterSpacing: '-0.01em',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(167, 139, 250, 0.15)';
        e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.25)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(167, 139, 250, 0.08)';
        e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.15)';
      }}
    >
      {label}
    </Link>
  );
}

interface AgentsRelatedTermsProps {
  terms: Array<{ slug: string; label: string }>;
}

export function AgentsRelatedTerms({ terms }: AgentsRelatedTermsProps) {
  if (terms.length === 0) return null;

  return (
    <div style={{
      marginTop: '2rem',
      paddingTop: '1.5rem',
      borderTop: `1px solid ${theme.border}`,
    }}>
      <h3 style={{
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        color: theme.subtle,
        marginBottom: '0.875rem',
      }}>
        Related Terms
      </h3>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}>
        {terms.map((term) => (
          <AgentsTermChip key={term.slug} slug={term.slug} label={term.label} />
        ))}
      </div>
    </div>
  );
}

export default AgentsTermChip;
