'use client';

import React from 'react';
import { elevatedDarkTheme } from '@/lib/theme';
import { ExternalLink, Sparkles } from 'lucide-react';

interface TemplateCTAProps {
  slug: string;
  title?: string;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

export default function TemplateCTA({
  slug,
  title = 'Use in Esy Editor',
  variant = 'primary',
  fullWidth = false,
}: TemplateCTAProps) {
  // Construct the URL to load the prompt in Esy
  const esyEditorUrl = `https://app.esy.com?loadPrompt=${slug}`;

  const isPrimary = variant === 'primary';

  return (
    <a
      href={esyEditorUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.625rem',
        padding: isPrimary ? '1rem 2rem' : '0.75rem 1.5rem',
        background: isPrimary
          ? 'linear-gradient(135deg, rgba(0, 168, 150, 0.9) 0%, rgba(0, 168, 150, 1) 100%)'
          : 'transparent',
        color: isPrimary ? '#ffffff' : elevatedDarkTheme.accent,
        border: isPrimary
          ? 'none'
          : `1px solid ${elevatedDarkTheme.accent}50`,
        borderRadius: '12px',
        fontSize: isPrimary ? '1rem' : '0.9375rem',
        fontWeight: 600,
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        boxShadow: isPrimary
          ? `0 4px 15px ${elevatedDarkTheme.accent}40`
          : 'none',
        width: fullWidth ? '100%' : 'auto',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        if (isPrimary) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = `0 8px 25px ${elevatedDarkTheme.accent}50`;
        } else {
          e.currentTarget.style.background = `${elevatedDarkTheme.accent}10`;
        }
      }}
      onMouseLeave={(e) => {
        if (isPrimary) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = `0 4px 15px ${elevatedDarkTheme.accent}40`;
        } else {
          e.currentTarget.style.background = 'transparent';
        }
      }}
    >
      {isPrimary ? <Sparkles size={18} /> : <ExternalLink size={16} />}
      {title}
    </a>
  );
}

