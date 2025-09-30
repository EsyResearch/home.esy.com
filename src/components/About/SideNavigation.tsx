"use client";

import React from 'react';

interface SideNavigationProps {
  activeSection: string;
  currentTheme: {
    accent: string;
    border: string;
  };
  scrollToSection: (sectionId: string) => void;
}

const SideNavigation: React.FC<SideNavigationProps> = ({ 
  activeSection, 
  currentTheme, 
  scrollToSection 
}) => {
  const sections = ['hero', 'problem', 'solution', 'social-proof', 'pricing', 'transform'];

  return (
    <aside style={{
      position: 'fixed',
      left: '2rem',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 40,
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    }}>
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => scrollToSection(section)}
          style={{
            width: '3px',
            height: '40px',
            background: activeSection === section ? currentTheme.accent : currentTheme.border,
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s',
            padding: 0
          }}
        />
      ))}
    </aside>
  );
};

export default SideNavigation; 