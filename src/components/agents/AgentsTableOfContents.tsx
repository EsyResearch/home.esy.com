"use client";

import { useState, useEffect } from 'react';
import { List } from 'lucide-react';

const theme = {
  text: '#fafafa',
  muted: 'rgba(250, 250, 250, 0.7)',
  subtle: 'rgba(250, 250, 250, 0.45)',
  border: 'rgba(250, 250, 250, 0.06)',
  accent: '#00A896',
};

interface TOCItem {
  id: string;
  title: string;
  level?: number;
}

interface AgentsTableOfContentsProps {
  items: TOCItem[];
}

export function AgentsTableOfContents({ items }: AgentsTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  // Observe which section is currently visible
  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav 
      aria-label="Table of contents"
      style={{
        position: 'sticky',
        top: '6rem',
        width: '200px',
        flexShrink: 0,
        alignSelf: 'flex-start',
      }}
      className="agents-toc"
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '0.75rem',
        fontSize: '0.6875rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        color: theme.subtle,
      }}>
        <List className="w-3 h-3" />
        On this page
      </div>
      
      <ul style={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
        borderLeft: `1px solid ${theme.border}`,
      }}>
        {items.map((item) => {
          const isActive = activeId === item.id;
          
          return (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '0.375rem 0 0.375rem 0.875rem',
                  marginLeft: '-1px',
                  background: 'transparent',
                  border: 'none',
                  borderLeft: `2px solid ${isActive ? theme.accent : 'transparent'}`,
                  fontSize: '0.8125rem',
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? theme.text : theme.subtle,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  letterSpacing: '-0.01em',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = theme.muted;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = theme.subtle;
                  }
                }}
              >
                {item.title}
              </button>
            </li>
          );
        })}
      </ul>

      <style jsx global>{`
        @media (max-width: 1279px) {
          .agents-toc {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}

export default AgentsTableOfContents;
