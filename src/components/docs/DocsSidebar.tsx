"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
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
  Search,
  Edit3,
  LayoutTemplate,
  FileCode,
  ShieldCheck,
  Layers,
  UserCog,
  Lock,
} from "lucide-react";

// Navy Calm Light Theme
const theme = {
  bg: '#FFFFFF',
  elevated: '#F8FAFC',
  surface: '#F1F5F9',
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  border: 'rgba(10, 37, 64, 0.08)',
  accent: '#00A896',
};

const iconMap: Record<string, React.ReactNode> = {
  home: <Home className="w-4 h-4" />,
  sparkles: <Sparkles className="w-4 h-4" />,
  book: <BookOpen className="w-4 h-4" />,
  pencil: <PenLine className="w-4 h-4" />,
  workflow: <Workflow className="w-4 h-4" />,
  prompt: <FileText className="w-4 h-4" />,
  essay: <Edit3 className="w-4 h-4" />,
  template: <LayoutTemplate className="w-4 h-4" />,
  spec: <FileCode className="w-4 h-4" />,
  quality: <ShieldCheck className="w-4 h-4" />,
  layers: <Layers className="w-4 h-4" />,
  'user-cog': <UserCog className="w-4 h-4" />,
  lock: <Lock className="w-4 h-4" />,
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
          ? 'linear-gradient(135deg, rgba(0, 168, 150, 0.15) 0%, rgba(0, 168, 150, 0.08) 100%)'
          : 'transparent',
        border: `1px solid ${isActive ? 'rgba(0, 168, 150, 0.25)' : 'transparent'}`,
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
          background: isActive ? 'rgba(0, 168, 150, 0.2)' : theme.elevated,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isActive ? '#00A896' : theme.subtle,
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
            background: 'linear-gradient(135deg, #00A896 0%, #00D4AA 100%)',
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

export function DocsSidebar({ onOpenSearch }: { onOpenSearch?: () => void }) {
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
          background: `linear-gradient(135deg, ${theme.accent} 0%, rgba(0, 168, 150, 0.9) 100%)`,
          color: '#ffffff',
          border: 'none',
          boxShadow: '0 8px 24px rgba(0, 168, 150, 0.4)',
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
          top: 0,
          left: 0,
          height: '100vh',
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
        {/* Header with Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem',
          borderBottom: `1px solid ${theme.border}`
        }}>
          <Logo 
            suffix="Docs"
            href="/docs/"
            size={50}
            showText={false}
            theme="light"
          />
          
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

        {/* Search Section */}
        <div style={{
          padding: '1rem',
          borderBottom: `1px solid ${theme.border}`
        }}>
          {/* Search Input (triggers modal) */}
          <button
            onClick={onOpenSearch}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              position: 'relative' as const,
              padding: '0.625rem 0.875rem 0.625rem 2.5rem',
              background: theme.surface,
              border: `1px solid ${theme.border}`,
              borderRadius: '8px',
              fontSize: '0.875rem',
              color: theme.muted,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'left' as const
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 168, 150, 0.3)';
              e.currentTarget.style.background = theme.elevated;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.border;
              e.currentTarget.style.background = theme.surface;
            }}
          >
            <Search style={{
              position: 'absolute' as const,
              left: '0.875rem',
              width: '16px',
              height: '16px',
              color: theme.subtle
            }} />
            <span>Search docs...</span>
            <kbd style={{
              position: 'absolute' as const,
              right: '0.75rem',
              padding: '0.125rem 0.375rem',
              background: theme.elevated,
              border: `1px solid ${theme.border}`,
              borderRadius: '4px',
              fontSize: '0.7rem',
              color: theme.subtle
            }}>
              ⌘K
            </kbd>
          </button>

          {/* Quick Links */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginTop: '0.75rem',
            flexWrap: 'wrap'
          }}>
            {[
              { label: 'Core Model', href: '/docs/core-model' },
              { label: 'Roles', href: '/docs/roles' },
              { label: 'Workflows', href: '/docs/workflows' },
              { label: 'Templates', href: '/docs/templates' }
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  padding: '0.375rem 0.75rem',
                  background: 'transparent',
                  border: `1px solid ${theme.border}`,
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  color: theme.muted,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.accent;
                  e.currentTarget.style.color = theme.text;
                  e.currentTarget.style.background = 'rgba(0, 168, 150, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme.border;
                  e.currentTarget.style.color = theme.muted;
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
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
              background: `linear-gradient(135deg, ${theme.accent} 0%, rgba(0, 168, 150, 0.9) 100%)`,
              color: '#ffffff',
              borderRadius: '10px',
              textAlign: 'center' as const,
              fontSize: '0.9375rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(0, 168, 150, 0.25)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 168, 150, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 168, 150, 0.25)';
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
