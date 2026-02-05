"use client";

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

// Light theme (Navy Calm)
const theme = {
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  accent: '#00A896',
};

interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav 
      aria-label="Breadcrumb"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem',
        fontSize: '0.8125rem',
        color: theme.subtle,
        flexWrap: 'wrap',
      }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isFirst = index === 0;
        
        return (
          <span 
            key={item.href || item.label}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.375rem',
            }}
          >
            {index > 0 && (
              <ChevronRight 
                className="w-3 h-3" 
                style={{ color: theme.subtle, opacity: 0.5 }} 
              />
            )}
            {isLast || item.isCurrent ? (
              <span style={{ 
                color: theme.muted,
                fontWeight: 500,
              }}>
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href || '#'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  color: theme.subtle,
                  textDecoration: 'none',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.muted;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme.subtle;
                }}
              >
                {isFirst && <Home className="w-3 h-3" />}
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
