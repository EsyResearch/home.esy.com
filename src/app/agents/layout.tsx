"use client";

import { useState, useEffect } from "react";
import { AgentsSidebar, AgentsSearchModal } from "@/components/agents";
import "./agents.css";

export default function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Handle Cmd/Ctrl + K for search
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
    <div className="agents-layout">
      {/* Main container with sidebar */}
      <div className="agents-container">
        {/* Sidebar */}
        <AgentsSidebar onOpenSearch={() => setIsSearchOpen(true)} />

        {/* Content Area */}
        <main className="agents-main">
          {children}
        </main>
      </div>

      {/* Search Modal */}
      <AgentsSearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </div>
  );
}
