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

const theme = {
  bg: '#18181b',
  elevated: '#27272a',
  surface: '#1f1f23',
  text: '#fafafa',
  textSecondary: '#e4e4e7',
  muted: '#a1a1aa',
  subtle: '#71717a',
  border: 'rgba(63, 63, 70, 0.4)',
  borderSubtle: 'rgba(63, 63, 70, 0.2)',
  accent: '#9f7aea',
  accentHover: '#8b5cf6',
  accentLight: '#c4b5fd',
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
      className="group relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
      style={{
        background: isActive 
          ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(236, 72, 153, 0.06) 100%)'
          : 'transparent',
        color: isActive ? theme.text : theme.muted,
        border: isActive ? '1px solid rgba(139, 92, 246, 0.25)' : '1px solid transparent',
      }}
    >
      {/* Active Indicator Bar */}
      {isActive && (
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
          style={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
          }}
        />
      )}

      <span
        className="shrink-0 p-2 rounded-lg transition-all duration-200"
        style={{
          background: isActive 
            ? 'rgba(139, 92, 246, 0.2)' 
            : theme.surface,
          color: isActive 
            ? theme.accentLight 
            : theme.subtle,
        }}
      >
        {item.icon && iconMap[item.icon]}
      </span>
      
      <span className="flex-1 truncate">{item.title}</span>
      
      {item.isNew && (
        <span 
          className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full text-white shrink-0"
          style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' }}
        >
          New
        </span>
      )}
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
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] transition-colors hover:text-zinc-300"
        style={{ color: theme.subtle }}
      >
        {isOpen ? (
          <ChevronDown className="w-3.5 h-3.5" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5" />
        )}
        {section.title}
      </button>
      {isOpen && (
        <div className="space-y-1 mt-2">
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
      {/* Mobile FAB */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-8 right-8 z-50 p-4 rounded-full text-white transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        style={{
          background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
          boxShadow: '0 10px 40px rgba(139, 92, 246, 0.4)',
        }}
        aria-label="Open navigation"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed lg:sticky z-[70] lg:z-auto
          h-screen lg:h-[calc(100vh-73px)]
          w-80 lg:w-72
          border-r flex flex-col
          transform transition-transform duration-300 ease-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{
          top: isMobileOpen ? 0 : '73px',
          left: 0,
          backgroundColor: theme.bg,
          borderColor: theme.border,
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Header */}
        <div 
          className="shrink-0 p-6 border-b"
          style={{ borderColor: theme.border }}
        >
          <div className="flex items-center justify-between">
            <Link href="/docs" className="flex items-center gap-3 group">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                  boxShadow: '0 4px 16px rgba(139, 92, 246, 0.3)',
                }}
              >
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span 
                className="text-xl font-bold"
                style={{ 
                  color: theme.text,
                  fontFamily: 'var(--font-literata), Georgia, serif',
                }}
              >
                Docs
              </span>
            </Link>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-2 rounded-lg transition-colors hover:bg-zinc-800"
              style={{ color: theme.muted }}
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
          {docsNavigation.map((section) => (
            <NavSectionComponent key={section.title} section={section} />
          ))}
        </nav>

        {/* Footer CTA */}
        <div className="shrink-0 p-4 border-t" style={{ borderColor: theme.border }}>
          <Link
            href="https://app.esy.com"
            className="block w-full py-3.5 px-5 text-white text-sm font-semibold rounded-xl text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              boxShadow: '0 8px 24px rgba(139, 92, 246, 0.3)',
            }}
          >
            Try Esy Free →
          </Link>
        </div>
      </aside>
    </>
  );
}

export default DocsSidebar;
