"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  docsNavigation,
  type NavSection,
  type NavItem,
} from "@/lib/docs-navigation";
import {
  Home,
  Sparkles,
  BookOpen,
  PenLine,
  Workflow,
  ChevronDown,
  ChevronRight,
  X,
  Menu,
  FileText,
} from "lucide-react";

// Elevated Dark Theme
const theme = {
  bg: '#18181b',
  elevated: '#27272a',
  surface: '#1f1f23',
  text: '#fafafa',
  muted: 'rgba(255, 255, 255, 0.7)',
  subtle: 'rgba(255, 255, 255, 0.5)',
  border: 'rgba(255, 255, 255, 0.08)',
  accent: '#8b5cf6',
};

const iconMap: Record<string, React.ReactNode> = {
  home: <Home className="w-4 h-4" />,
  sparkles: <Sparkles className="w-4 h-4" />,
  book: <BookOpen className="w-4 h-4" />,
  pencil: <PenLine className="w-4 h-4" />,
  workflow: <Workflow className="w-4 h-4" />,
  prompt: <FileText className="w-4 h-4" />,
};

function NavItemComponent({ item, isActive }: { item: NavItem; isActive: boolean }) {
  return (
    <Link
      href={item.href}
      className="group block"
      style={{ textDecoration: 'none' }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem 1rem',
        borderRadius: '10px',
        transition: 'all 0.2s ease',
        background: isActive 
          ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.08) 100%)'
          : 'transparent',
        border: `1px solid ${isActive ? 'rgba(139, 92, 246, 0.25)' : 'transparent'}`,
        position: 'relative' as const
      }}>
        {/* Active indicator bar */}
        {isActive && (
          <div style={{
            position: 'absolute' as const,
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '3px',
            height: '60%',
            background: theme.accent,
            borderRadius: '0 4px 4px 0'
          }} />
        )}
        
        {/* Icon */}
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '8px',
          background: isActive ? 'rgba(139, 92, 246, 0.2)' : theme.elevated,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isActive ? '#a78bfa' : theme.subtle,
          transition: 'all 0.2s ease',
          flexShrink: 0
        }}>
          {item.icon && iconMap[item.icon]}
        </div>

        {/* Text */}
        <span style={{
          fontSize: '0.875rem',
          fontWeight: isActive ? 500 : 400,
          color: isActive ? theme.text : theme.muted,
          transition: 'color 0.2s ease',
          flex: 1
        }}>
          {item.title}
        </span>

        {/* New Badge */}
        {item.isNew && (
          <span style={{
            padding: '0.125rem 0.375rem',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
            color: '#ffffff',
            borderRadius: '6px',
            fontSize: '0.625rem',
            fontWeight: 700,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.05em'
          }}>
            New
          </span>
        )}
      </div>
    </Link>
  );
}

function NavSectionComponent({ section }: { section: NavSection }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const normalizedPath = pathname?.endsWith('/') && pathname.length > 1
    ? pathname.slice(0, -1)
    : pathname;

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          width: '100%',
          padding: '0.5rem 1rem',
          background: 'transparent',
          border: 'none',
          color: theme.subtle,
          fontSize: '0.75rem',
          fontWeight: 600,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.05em',
          cursor: 'pointer',
          transition: 'color 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = theme.muted}
        onMouseLeave={(e) => e.currentTarget.style.color = theme.subtle}
      >
        {isOpen ? (
          <ChevronDown className="w-3 h-3" />
        ) : (
          <ChevronRight className="w-3 h-3" />
        )}
        {section.title}
      </button>
      {isOpen && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.5rem' }}>
          {section.items.map((item) => (
            <NavItemComponent
              key={item.href}
              item={item}
              isActive={normalizedPath === item.href}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function DocsSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        style={{
          position: 'fixed' as const,
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 50,
          padding: '1rem',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.accent} 0%, rgba(139, 92, 246, 0.9) 100%)`,
          color: '#ffffff',
          border: 'none',
          boxShadow: '0 8px 24px rgba(139, 92, 246, 0.4)',
          cursor: 'pointer',
          display: 'none'
        }}
        className="lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          style={{
            position: 'fixed' as const,
            inset: 0,
            zIndex: 50,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'none'
          }}
          className="lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          position: 'sticky' as const,
          top: '73px',
          left: 0,
          height: 'calc(100vh - 73px)',
          width: '280px',
          backgroundColor: theme.bg,
          borderRight: `1px solid ${theme.border}`,
          overflowY: 'auto' as const,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column' as const
        }}
        className={isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem',
          borderBottom: `1px solid ${theme.border}`
        }}>
          <Link
            href="/docs"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textDecoration: 'none'
            }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: `linear-gradient(135deg, ${theme.accent} 0%, rgba(139, 92, 246, 0.9) 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
            }}>
              <BookOpen className="w-5 h-5" />
            </div>
            <span style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: theme.text,
              fontFamily: 'var(--font-literata)',
              letterSpacing: '-0.01em'
            }}>
              Docs
            </span>
          </Link>
          <button
            onClick={() => setIsMobileOpen(false)}
            style={{
              padding: '0.5rem',
              borderRadius: '8px',
              background: theme.elevated,
              color: theme.muted,
              border: 'none',
              cursor: 'pointer',
              display: 'none'
            }}
            className="lg:hidden"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav style={{
          flex: 1,
          overflowY: 'auto' as const,
          padding: '1.5rem 1rem'
        }}>
          {docsNavigation.map((section) => (
            <NavSectionComponent key={section.title} section={section} />
          ))}
        </nav>

        {/* Footer CTA */}
        <div style={{
          padding: '1.5rem',
          borderTop: `1px solid ${theme.border}`
        }}>
          <Link
            href="https://app.esy.com/signup"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              width: '100%',
              padding: '0.875rem 1.25rem',
              background: `linear-gradient(135deg, ${theme.accent} 0%, rgba(139, 92, 246, 0.9) 100%)`,
              color: '#ffffff',
              borderRadius: '10px',
              textAlign: 'center' as const,
              fontSize: '0.9375rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(139, 92, 246, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.25)';
            }}
          >
            Try Esy Free →
          </Link>
        </div>
      </aside>

      <style jsx global>{`
        /* Mobile sidebar overlay */
        @media (max-width: 1023px) {
          aside {
            position: fixed !important;
            z-index: 51;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }
          
          aside.translate-x-0 {
            transform: translateX(0);
          }
          
          button.lg\\:hidden {
            display: flex !important;
          }
          
          div.lg\\:hidden {
            display: block !important;
          }
        }
        
        /* Scrollbar styling */
        aside::-webkit-scrollbar {
          width: 6px;
        }
        
        aside::-webkit-scrollbar-track {
          background: transparent;
        }
        
        aside::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        
        aside::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </>
  );
}

export default DocsSidebar;
