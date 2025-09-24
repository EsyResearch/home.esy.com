"use client"

import React, { useState, useEffect, useRef } from 'react';

const TableOfContents = ({ items, scrollProgress }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [tocPosition, setTocPosition] = useState('fixed');
  const [tocTop, setTocTop] = useState('120px');
  const [tocOpacity, setTocOpacity] = useState(1);
  const [activeSection, setActiveSection] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const tocRef = useRef(null);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      // Show TOC on screens wider than 1024px (laptop and above)
      setIsVisible(width >= 1024);
    };

    const handleScroll = () => {
      if (!isVisible) return;
      
      // Show TOC immediately without requiring scroll
      setTocOpacity(1);
      
      // Get the main content boundaries - look for main content area
      const contentArea = document.querySelector('main') || document.querySelector('article') || document.body;
      
      const contentRect = contentArea.getBoundingClientRect();
      const contentBottom = contentRect.bottom;
      const windowHeight = window.innerHeight;
      
      // Smart sticky behavior
      if (scrollY > 200) {
        const tocHeight = tocRef.current?.offsetHeight || 400;
        const spaceFromBottom = contentBottom - tocHeight - 120; // 120px from top
        
        if (spaceFromBottom < 100) {
          // Stop before footer
          setTocPosition('absolute');
          const contentHeight = contentArea?.offsetHeight || document.body.scrollHeight;
          setTocTop(`${contentHeight - tocHeight - 200}px`);
        } else {
          setTocPosition('fixed');
          setTocTop('120px');
        }
      } else {
        // Keep it fixed when at top of page
        setTocPosition('fixed');
        setTocTop('120px');
      }
      
      // Update active section based on scroll
      updateActiveSection();
    };
    
    const updateActiveSection = () => {
      const sections = items.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      })).filter(section => section.element);
      
      const viewportMiddle = window.innerHeight / 2;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].element.getBoundingClientRect();
        if (rect.top <= viewportMiddle) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    // Initialize on mount
    checkDevice();
    setIsInitialized(true);
    
    // Set up event listeners
    window.addEventListener('resize', checkDevice);
    window.addEventListener('scroll', handleScroll);
    
    // Initial scroll check after a brief delay
    const initTimer = setTimeout(() => {
      handleScroll();
    }, 100);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(initTimer);
    };
  }, [isVisible, items]);


  // Don't render on mobile or tablet
  if (!isVisible) {
    return null;
  }

  const styles = {
    container: {
      position: 'fixed',
      right: '1rem',
      top: tocTop,
      width: '280px',
      zIndex: 100,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: tocOpacity,
      pointerEvents: tocOpacity < 0.3 ? 'none' : 'auto',
    },
    progressWrapper: {
      marginBottom: '1rem',
      opacity: isExpanded ? 1 : 0,
      transition: 'opacity 0.3s ease',
      height: isExpanded ? 'auto' : 0,
      overflow: 'hidden'
    },
    progressBar: {
      height: '2px',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      borderRadius: '2px',
      overflow: 'hidden',
      position: 'relative'
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #8b5cf6 0%, #a78bfa 100%)',
      width: `${scrollProgress}%`,
      borderRadius: '2px',
      transition: 'width 0.2s ease',
      boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)'
    },
    progressText: {
      fontSize: '0.75rem',
      color: 'rgba(167, 139, 250, 0.7)',
      marginTop: '0.5rem',
      fontWeight: '500',
      letterSpacing: '0.025em'
    },
    tableOfContents: {
      background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.7) 0%, rgba(30, 41, 55, 0.5) 100%)',
      backdropFilter: 'blur(12px) saturate(1.5)',
      borderRadius: '16px',
      padding: isExpanded ? '1.5rem' : '1rem',
      border: '1px solid rgba(139, 92, 246, 0.1)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
      maxHeight: isExpanded ? '420px' : '60px',
      overflowY: isExpanded ? 'auto' : 'hidden',
      overflowX: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: isExpanded ? '1.25rem' : 0
    },
    tocTitle: {
      fontSize: '0.8125rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      background: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    toggleButton: {
      background: 'rgba(139, 92, 246, 0.1)',
      border: '1px solid rgba(139, 92, 246, 0.2)',
      borderRadius: '8px',
      width: '28px',
      height: '28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      color: 'rgba(167, 139, 250, 0.7)'
    },
    tocList: {
      display: isExpanded ? 'block' : 'none'
    },
    tocItem: {
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.5)',
      marginBottom: '0.5rem',
      cursor: 'pointer',
      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      padding: '0.625rem 0.75rem',
      borderRadius: '10px',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      overflow: 'hidden'
    },
    tocItemActive: {
      color: '#ffffff',
      backgroundColor: 'rgba(139, 92, 246, 0.15)',
      transform: 'translateX(4px)'
    },
    tocItemHover: {
      color: 'rgba(255, 255, 255, 0.8)',
      backgroundColor: 'rgba(139, 92, 246, 0.08)'
    },
    tocNumber: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '24px',
      height: '24px',
      borderRadius: '8px',
      fontSize: '0.75rem',
      fontWeight: '600',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      color: 'rgba(167, 139, 250, 0.6)',
      flexShrink: 0,
      transition: 'all 0.25s ease'
    },
    tocNumberActive: {
      backgroundColor: 'rgba(139, 92, 246, 0.3)',
      color: '#a78bfa',
      boxShadow: '0 0 12px rgba(139, 92, 246, 0.3)'
    },
    tocText: {
      lineHeight: 1.4,
      flex: 1
    },
    activeIndicator: {
      position: 'absolute',
      left: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      width: '0px',
      height: '0%',
      background: 'transparent',
      borderRadius: '2px',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      display: 'none'
    }
  };

  const handleItemClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Extract section numbers from titles
  const getItemNumber = (title) => {
    const match = title.match(/^(\d+)\./);
    return match ? match[1] : '•';
  };

  const getItemText = (title) => {
    return title.replace(/^\d+\.\s*/, '');
  };

  return (
    <>
      <nav ref={tocRef} style={styles.container}>
        {/* Progress Bar */}
        <div style={styles.progressWrapper}>
          <div style={styles.progressBar}>
            <div style={styles.progressFill} />
          </div>
          <div style={styles.progressText}>
            {Math.round(scrollProgress)}% Complete
          </div>
        </div>

        {/* TOC Card */}
        <div style={styles.tableOfContents}>
          {/* Header */}
          <div style={styles.header}>
            <h4 style={styles.tocTitle}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
              Contents
            </h4>
            <button
              style={styles.toggleButton}
              onClick={() => setIsExpanded(!isExpanded)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
              }}
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                style={{
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>

          {/* TOC Items */}
          <div style={styles.tocList}>
            {items.map((item, index) => {
              const isActive = activeSection === item.id;
              const itemNumber = getItemNumber(item.title);
              const itemText = getItemText(item.title);
              
              return (
                <div
                  key={item.id}
                  style={{
                    ...styles.tocItem,
                    ...(isActive ? styles.tocItemActive : {}),
                  }}
                  onClick={() => handleItemClick(item.id)}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      Object.assign(e.currentTarget.style, styles.tocItemHover);
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span 
                    style={{
                      ...styles.activeIndicator,
                      opacity: isActive ? 1 : 0
                    }} 
                  />
                  <span style={{
                    ...styles.tocNumber,
                    ...(isActive ? styles.tocNumberActive : {})
                  }}>
                    {itemNumber}
                  </span>
                  <span style={styles.tocText}>
                    {itemText}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </nav>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Custom scrollbar for TOC */
        nav div::-webkit-scrollbar {
          width: 3px;
        }
        
        nav div::-webkit-scrollbar-track {
          background: transparent;
        }
        
        nav div::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.3));
          border-radius: 3px;
        }
        
        nav div::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(139, 92, 246, 0.3), rgba(139, 92, 246, 0.5));
        }
        
        /* Smooth animations for all transitions */
        nav * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Pulse animation for active number */
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 12px rgba(139, 92, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
          }
        }
      `}</style>
    </>
  );
};

export default TableOfContents;