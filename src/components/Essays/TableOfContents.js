"use client"
import React from 'react';
import { X } from 'lucide-react';
import styles from './TableOfContents.module.css';

const TableOfContents = ({
  sections,
  activeSection,
  showTOC,
  setShowTOC,
  theme,
  currentTheme
}) => {
  const sidebarClass = `${styles.sidebar} ${theme === 'dark' ? styles.sidebarDark : styles.sidebarLight}`;
  const titleClass = `${styles.title} ${theme === 'dark' ? styles.titleDark : styles.titleLight}`;
  const closeButtonClass = `${styles.closeButton} ${theme === 'dark' ? styles.closeButtonDark : styles.closeButtonLight}`;

  return (
    <div className={sidebarClass}>
      <div className={styles.header}>
        <h3 className={titleClass}>Contents</h3>
        <button
          className={closeButtonClass}
          onClick={() => setShowTOC(false)}
        >
          <X size={18} />
        </button>
      </div>
      
      <nav className={styles.nav}>
        {sections.map(section => {
          const isActive = activeSection === section.id;
          const navLinkClass = `${styles.navLink} ${theme === 'dark' ? styles.navLinkDark : styles.navLinkLight} ${isActive ? styles.navLinkActive : ''} ${isActive ? (theme === 'dark' ? styles.navLinkActiveDark : styles.navLinkActiveLight) : ''} ${theme === 'dark' ? styles.navLinkHoverDark : styles.navLinkHoverLight}`;
          
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => setShowTOC(false)}
              className={navLinkClass}
            >
              <span>{section.title}</span>
              <span className={styles.readTime}>
                {section.readTime} min
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default TableOfContents; 