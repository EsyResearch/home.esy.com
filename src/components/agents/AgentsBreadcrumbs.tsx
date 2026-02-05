"use client";

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

const theme = {
  text: '#fafafa',
  muted: 'rgba(250, 250, 250, 0.7)',
  subtle: 'rgba(250, 250, 250, 0.45)',
  accent: '#00A896',
};

interface BreadcrumbItem {
  title: string;
  href: string;
}

interface AgentsBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function AgentsBreadcrumbs({ items }: AgentsBreadcrumbsProps) {
  return (
    <nav 
      aria-label="Breadcrumb"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem',
        fontSize: '0.8125rem',
        color: theme.subtle,
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
      }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isFirst = index === 0;
        
        return (
          <span 
            key={item.href}
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
            {isLast ? (
              <span style={{ 
                color: theme.muted,
                fontWeight: 500,
              }}>
                {item.title}
              </span>
            ) : (
              <Link
                href={item.href}
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
                {item.title}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default AgentsBreadcrumbs;
