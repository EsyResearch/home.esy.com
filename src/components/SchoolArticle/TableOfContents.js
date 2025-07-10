"use client"

import React from 'react';

const TableOfContents = ({ items, scrollProgress }) => {
  const styles = {
    stickyNav: {
      position: 'fixed',
      right: '3rem',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '200px'
    },
    tableOfContents: {
      backgroundColor: 'rgba(22, 22, 31, 0.4)',
      borderRadius: '12px',
      padding: '1.5rem',
      border: '1px solid rgba(255, 255, 255, 0.05)'
    },
    tocTitle: {
      fontSize: '0.875rem',
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: 'rgba(255, 255, 255, 0.5)',
      marginBottom: '1rem'
    },
    tocItem: {
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.6)',
      marginBottom: '0.75rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      paddingLeft: '1rem',
      position: 'relative'
    },
    tocItemActive: {
      color: '#8b5cf6'
    },
    tocIndicator: {
      position: 'absolute',
      left: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      width: '2px',
      height: '16px',
      backgroundColor: '#8b5cf6',
      opacity: 0,
      transition: 'opacity 0.2s ease'
    }
  };

  return (
    <nav style={styles.stickyNav}>
      <div style={styles.tableOfContents}>
        <h4 style={styles.tocTitle}>In this article</h4>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              ...styles.tocItem,
              ...(item.active ? styles.tocItemActive : {})
            }}
            onClick={() => {
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span 
              style={{
                ...styles.tocIndicator,
                opacity: item.active ? 1 : 0
              }} 
            />
            {item.title}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default TableOfContents;