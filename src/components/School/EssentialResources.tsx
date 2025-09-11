"use client";

import React from 'react';

interface FeaturedResource {
  icon: string;
  title: string;
  description: string;
}

interface EssentialResourcesProps {
  featuredResources: FeaturedResource[];
}

const EssentialResources: React.FC<EssentialResourcesProps> = ({ featuredResources }) => {
  const styles = {
    featuredSection: {
      backgroundColor: '#16161f',
      padding: '5rem 0',
      marginTop: '6rem'
    },
    featuredInner: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 3rem'
    },
    featuredHeader: {
      textAlign: 'center',
      marginBottom: '4rem'
    },
    featuredTitle: {
      fontSize: '3rem',
      fontWeight: '200',
      marginBottom: '1rem',
      letterSpacing: '-0.02em',
      fontFamily: 'var(--font-literata)'
    },
    featuredSubtitle: {
      fontSize: '1.125rem',
      color: 'rgba(255, 255, 255, 0.6)',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: '1.7'
    },
    featuredGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      maxWidth: '800px',
      margin: '0 auto'
    },
    featuredCard: {
      textAlign: 'center',
      padding: '3rem 2rem',
      backgroundColor: 'rgba(139, 92, 246, 0.05)',
      borderRadius: '12px',
      border: '1px solid rgba(139, 92, 246, 0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    featuredIcon: {
      fontSize: '3rem',
      marginBottom: '1.5rem'
    },
    featuredCardTitle: {
      fontSize: '1.5rem',
      fontWeight: '400',
      marginBottom: '0.75rem'
    },
    featuredCardDescription: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '0.9375rem',
      lineHeight: '1.6'
    }
  };

  return (
    <section id="resources" style={styles.featuredSection}>
      <div style={styles.featuredInner}>
        <div style={styles.featuredHeader}>
          <h2 style={styles.featuredTitle}>Essential Resources</h2>
          <p style={styles.featuredSubtitle}>
            Practical tools and materials to accelerate your academic writing journey
          </p>
        </div>

        <div style={styles.featuredGrid}>
          {featuredResources.map((resource, index) => {
            // Temporarily comment out Video Workshops
            if (resource.title === 'Video Workshops') {
              return null;
            }
            
            return (
              <div
                key={index}
                style={styles.featuredCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.08)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={styles.featuredIcon}>{resource.icon}</div>
                <h3 style={styles.featuredCardTitle}>{resource.title}</h3>
                <p style={styles.featuredCardDescription}>{resource.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EssentialResources;
