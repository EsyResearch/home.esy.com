"use client";

import Link from 'next/link';
import { ArrowRight, BookOpen, Sparkles, GitBranch, Workflow } from 'lucide-react';
import type { NavItem, PageType } from '@/lib/agents-navigation';

const theme = {
  bg: '#FFFFFF',
  surface: '#FFFFFF',
  elevated: '#F8FAFC',
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  border: 'rgba(10, 37, 64, 0.08)',
  borderHover: 'rgba(10, 37, 64, 0.12)',
  accent: '#00A896',
};

const typeConfig: Record<PageType, { icon: React.ReactNode; color: string }> = {
  hub: { icon: <BookOpen className="w-5 h-5" />, color: '#00A896' },
  canonical: { icon: <Sparkles className="w-5 h-5" />, color: '#00A896' },
  term: { icon: <BookOpen className="w-5 h-5" />, color: '#00A896' },
  pattern: { icon: <GitBranch className="w-5 h-5" />, color: '#00A896' },
  workflow: { icon: <Workflow className="w-5 h-5" />, color: '#00A896' },
  guide: { icon: <BookOpen className="w-5 h-5" />, color: '#00A896' },
};

interface AgentsPatternCardProps {
  item: NavItem;
}

export function AgentsPatternCard({ item }: AgentsPatternCardProps) {
  const config = typeConfig[item.type];
  
  return (
    <Link
      href={item.href}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '1.25rem',
        background: theme.surface,
        border: `1px solid ${theme.border}`,
        borderRadius: '12px',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = theme.borderHover;
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(10, 37, 64, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = theme.border;
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: `linear-gradient(90deg, ${config.color} 0%, transparent 100%)`,
        opacity: 0.5,
      }} />
      
      {/* Icon */}
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        background: `${config.color}15`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: config.color,
        marginBottom: '1rem',
      }}>
        {config.icon}
      </div>
      
      {/* Content */}
      <h3 style={{
        fontSize: '1rem',
        fontWeight: 600,
        color: theme.text,
        marginBottom: '0.375rem',
        letterSpacing: '-0.02em',
      }}>
        {item.title}
      </h3>
      
      <p style={{
        fontSize: '0.8125rem',
        lineHeight: 1.5,
        color: theme.subtle,
        flex: 1,
        marginBottom: '0.75rem',
      }}>
        {item.description}
      </p>
      
      {/* Arrow */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem',
        fontSize: '0.8125rem',
        fontWeight: 500,
        color: config.color,
      }}>
        Read more
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
      
      {/* New badge */}
      {item.isNew && (
        <span style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          padding: '0.125rem 0.5rem',
          background: `linear-gradient(135deg, ${theme.accent} 0%, #00D4AA 100%)`,
          color: theme.bg,
          borderRadius: '4px',
          fontSize: '0.5625rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}>
          New
        </span>
      )}
    </Link>
  );
}

interface AgentsSectionCardsProps {
  title: string;
  description?: string;
  items: NavItem[];
}

export function AgentsSectionCards({ title, description, items }: AgentsSectionCardsProps) {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 style={{
        fontSize: '1.25rem',
        fontWeight: 600,
        color: theme.text,
        marginBottom: description ? '0.375rem' : '1rem',
        letterSpacing: '-0.02em',
      }}>
        {title}
      </h2>
      {description && (
        <p style={{
          fontSize: '0.9375rem',
          color: theme.subtle,
          marginBottom: '1.25rem',
        }}>
          {description}
        </p>
      )}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1rem',
      }}>
        {items.map((item) => (
          <AgentsPatternCard key={item.href} item={item} />
        ))}
      </div>
    </section>
  );
}

export default AgentsPatternCard;
