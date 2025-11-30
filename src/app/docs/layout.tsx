"use client";

import { useState, useEffect } from "react";
import { DocsSidebar, DocsSearchModal } from "@/components/docs";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Handle Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      style={{ 
        minHeight: '100vh',
        backgroundColor: '#18181b',
      }}
    >
      {/* Main Content */}
      <div style={{ 
        display: 'flex',
        minHeight: '100vh',
      }}>
        {/* Sidebar */}
        <DocsSidebar onOpenSearch={() => setIsSearchOpen(true)} />

        {/* Content Area */}
        <main style={{ 
          flex: 1,
          minWidth: 0,
        }}>
          {children}
        </main>
      </div>

      {/* Search Modal */}
      <DocsSearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </div>
  );
}
