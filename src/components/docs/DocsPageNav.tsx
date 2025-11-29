"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAdjacentPages } from "@/lib/docs-navigation";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

// Design system colors from DESIGN_SYSTEM.md
const colors = {
  bg: '#18181b',
  elevated: '#27272a',
  surface: '#1f1f23',
  text: '#fafafa',
  muted: '#a1a1aa',
  subtle: '#71717a',
  border: 'rgba(63, 63, 70, 0.4)',
};

export function DocsPageNav() {
  const pathname = usePathname();
  const normalizedPath = pathname?.endsWith('/') && pathname.length > 1 
    ? pathname.slice(0, -1) 
    : pathname;
  const { prev, next } = getAdjacentPages(normalizedPath || '');

  return (
    <footer className="mt-16 pt-8" style={{ borderTop: `1px solid ${colors.border}` }}>
      {/* Prev/Next Navigation */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-12">
        {prev ? (
          <Link
            href={prev.href}
            className="group flex-1 flex items-center gap-4 p-4 rounded-xl transition-all hover:bg-zinc-800/50"
            style={{
              backgroundColor: colors.elevated,
              border: `1px solid ${colors.border}`,
            }}
          >
            <ChevronLeft 
              className="w-5 h-5 shrink-0 group-hover:-translate-x-1 transition-transform" 
              style={{ color: colors.subtle }}
            />
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: colors.subtle }}>
                Previous
              </p>
              <p className="text-sm font-medium truncate" style={{ color: colors.text }}>
                {prev.title}
              </p>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {next ? (
          <Link
            href={next.href}
            className="group flex-1 flex items-center justify-end gap-4 p-4 rounded-xl transition-all hover:bg-zinc-800/50 text-right"
            style={{
              backgroundColor: colors.elevated,
              border: `1px solid ${colors.border}`,
            }}
          >
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: colors.subtle }}>
                Next
              </p>
              <p className="text-sm font-medium truncate" style={{ color: colors.text }}>
                {next.title}
              </p>
            </div>
            <ChevronRight 
              className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" 
              style={{ color: colors.subtle }}
            />
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>

      {/* CTA Section */}
      <div 
        className="rounded-2xl p-8 text-center mb-8"
        style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
        }}
      >
        <h3 
          className="text-xl font-bold mb-3"
          style={{ 
            color: colors.text,
            fontFamily: 'var(--font-literata), Georgia, serif',
          }}
        >
          Ready to write smarter essays?
        </h3>
        <p className="mb-6 max-w-md mx-auto" style={{ color: colors.muted }}>
          Join thousands of students using Esy&apos;s agentic research tools to skip the boring work.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="https://app.esy.com/signup"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
              boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)',
            }}
          >
            Start Free Trial
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/prompt-library"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-xl transition-colors hover:bg-zinc-700/50"
            style={{
              backgroundColor: colors.elevated,
              color: colors.text,
              border: `1px solid ${colors.border}`,
            }}
          >
            Browse Prompt Library
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div 
        className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm"
        style={{ color: colors.subtle }}
      >
        <p>© {new Date().getFullYear()} Esy. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

export default DocsPageNav;
