'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { Template } from '@/lib/templates';
import { elevatedDarkTheme } from '@/lib/theme';

interface TemplateCardProps {
  template: Template;
  showCategory?: boolean;
}

export default function TemplateCard({ template, showCategory = true }: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'prompt':
        return elevatedDarkTheme.accent;
      case 'template':
        return elevatedDarkTheme.info;
      case 'bundle':
        return elevatedDarkTheme.success;
      default:
        return elevatedDarkTheme.accent;
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner':
        return elevatedDarkTheme.success;
      case 'intermediate':
        return elevatedDarkTheme.warning;
      case 'advanced':
        return elevatedDarkTheme.error;
      default:
        return elevatedDarkTheme.muted;
    }
  };

  const categoryColor = getCategoryColor(template.category);

  return (
    <Link
      href={`/templates/${template.slug}`}
      style={{ textDecoration: 'none' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <article
        style={{
          background: isHovered
            ? 'linear-gradient(135deg, rgba(39, 39, 42, 0.95) 0%, rgba(31, 31, 35, 0.8) 100%)'
            : 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
          border: `1px solid ${isHovered ? `${categoryColor}50` : elevatedDarkTheme.border}`,
          borderRadius: '16px',
          padding: 'clamp(1.25rem, 3vw, 1.75rem)',
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          boxShadow: isHovered
            ? `0 12px 32px ${categoryColor}30`
            : elevatedDarkTheme.shadows.md,
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header with badges */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {showCategory && (
              <span
                style={{
                  padding: '0.25rem 0.75rem',
                  background: `${categoryColor}20`,
                  color: categoryColor,
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  border: `1px solid ${categoryColor}30`,
                }}
              >
                {template.category}
              </span>
            )}
            {template.difficulty && (
              <span
                style={{
                  padding: '0.25rem 0.625rem',
                  background: `${getDifficultyColor(template.difficulty)}15`,
                  color: getDifficultyColor(template.difficulty),
                  borderRadius: '8px',
                  fontSize: '0.65rem',
                  fontWeight: 500,
                  textTransform: 'capitalize',
                }}
              >
                {template.difficulty}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {template.isNew && (
              <span
                style={{
                  padding: '0.25rem 0.625rem',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                  color: '#ffffff',
                  borderRadius: '8px',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                New
              </span>
            )}
            {template.isPro && (
              <span
                style={{
                  padding: '0.25rem 0.625rem',
                  background: `${elevatedDarkTheme.warning}20`,
                  color: elevatedDarkTheme.warning,
                  borderRadius: '8px',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <Star size={10} fill="currentColor" />
                {template.pricing?.price ? `$${template.pricing.price}` : 'Pro'}
              </span>
            )}
            {template.isFeatured && !template.isNew && !template.isPro && (
              <Sparkles
                size={16}
                style={{ color: elevatedDarkTheme.accent, opacity: 0.8 }}
              />
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
            marginBottom: '0.75rem',
            color: elevatedDarkTheme.text,
            fontFamily: 'var(--font-literata)',
          }}
        >
          {template.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: 'clamp(0.85rem, 2vw, 0.9375rem)',
            color: elevatedDarkTheme.muted,
            lineHeight: 1.6,
            marginBottom: '1rem',
            flexGrow: 1,
          }}
        >
          {template.shortDescription}
        </p>

        {/* Tags */}
        {template.tags && template.tags.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.375rem',
              marginBottom: '1rem',
            }}
          >
            {template.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '0.2rem 0.5rem',
                  background: elevatedDarkTheme.borderSubtle,
                  color: elevatedDarkTheme.subtle,
                  borderRadius: '6px',
                  fontSize: '0.7rem',
                }}
              >
                {tag}
              </span>
            ))}
            {template.tags.length > 3 && (
              <span
                style={{
                  padding: '0.2rem 0.5rem',
                  color: elevatedDarkTheme.subtle,
                  fontSize: '0.7rem',
                }}
              >
                +{template.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: categoryColor,
            fontSize: '0.875rem',
            fontWeight: 500,
            marginTop: 'auto',
          }}
        >
          View Details
          <ArrowRight
            size={16}
            style={{
              transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
              transition: 'transform 0.2s ease',
            }}
          />
        </div>
      </article>
    </Link>
  );
}

