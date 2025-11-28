"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAdjacentPages } from "@/lib/docs-navigation";
import { elevatedDarkTheme } from "@/lib/theme";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export function DocsPageNav() {
  const pathname = usePathname();
  const normalizedPath = pathname?.endsWith('/') && pathname.length > 1 
    ? pathname.slice(0, -1) 
    : pathname;
  const { prev, next } = getAdjacentPages(normalizedPath || '');

  return (
    <footer className="mt-16 pt-8" style={{ borderTop: `1px solid ${elevatedDarkTheme.border}` }}>
      {/* Prev/Next Navigation */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-12">
        {prev ? (
          <Link
            href={prev.href}
            className="group flex-1 flex items-center gap-4 p-4 rounded-xl transition-all"
            style={{
              backgroundColor: elevatedDarkTheme.elevated,
              border: `1px solid ${elevatedDarkTheme.border}`,
            }}
          >
            <ChevronLeft 
              className="w-5 h-5 group-hover:-translate-x-1 transition-all" 
              style={{ color: elevatedDarkTheme.subtle }}
            />
            <div>
              <p 
                className="text-xs uppercase tracking-wider mb-1"
                style={{ color: elevatedDarkTheme.subtle }}
              >
                Previous
              </p>
              <p 
                className="text-sm font-medium transition-colors"
                style={{ color: elevatedDarkTheme.text }}
              >
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
            className="group flex-1 flex items-center justify-end gap-4 p-4 rounded-xl transition-all text-right"
            style={{
              backgroundColor: elevatedDarkTheme.elevated,
              border: `1px solid ${elevatedDarkTheme.border}`,
            }}
          >
            <div>
              <p 
                className="text-xs uppercase tracking-wider mb-1"
                style={{ color: elevatedDarkTheme.subtle }}
              >
                Next
              </p>
              <p 
                className="text-sm font-medium transition-colors"
                style={{ color: elevatedDarkTheme.text }}
              >
                {next.title}
              </p>
            </div>
            <ChevronRight 
              className="w-5 h-5 group-hover:translate-x-1 transition-all" 
              style={{ color: elevatedDarkTheme.subtle }}
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
            color: elevatedDarkTheme.text,
            fontFamily: 'var(--font-literata), Georgia, serif',
          }}
        >
          Ready to write smarter essays?
        </h3>
        <p 
          className="mb-6 max-w-md mx-auto"
          style={{ color: elevatedDarkTheme.muted }}
        >
          Join thousands of students using Esy&apos;s agentic research tools to
          skip the boring work.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="https://app.esy.com/signup"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-xl transition-all"
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
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-xl transition-colors"
            style={{
              backgroundColor: elevatedDarkTheme.elevated,
              color: elevatedDarkTheme.text,
            }}
          >
            Browse Prompt Library
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div 
        className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm"
        style={{ color: elevatedDarkTheme.subtle }}
      >
        <p>© {new Date().getFullYear()} Esy. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default DocsPageNav;

