"use client"

import React, { useState } from 'react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [newsletterHovered, setNewsletterHovered] = useState(false);

  const styles = {
    newsletter: {
      maxWidth: '800px',
      margin: '8rem auto',
      padding: '4rem',
      backgroundColor: 'rgba(0, 168, 150, 0.03)',
      border: '1px solid rgba(0, 168, 150, 0.1)',
      borderRadius: '16px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    newsletterGlow: {
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      background: 'radial-gradient(circle, rgba(0, 168, 150, 0.1) 0%, transparent 70%)',
      animation: newsletterHovered ? 'rotate 20s linear infinite' : 'none',
      opacity: newsletterHovered ? 1 : 0,
      transition: 'opacity 0.3s ease'
    },
    newsletterContent: {
      position: 'relative',
      zIndex: 1
    },
    newsletterTitle: {
      fontSize: '2.5rem',
      fontWeight: '200',
      marginBottom: '1rem',
      letterSpacing: '-0.02em',
      fontFamily: 'OrigamiIncised, sans-serif'
    },
    newsletterDescription: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '1.125rem',
      marginBottom: '2.5rem',
      lineHeight: '1.6'
    },
    newsletterForm: {
      display: 'flex',
      gap: '1rem',
      maxWidth: '480px',
      margin: '0 auto'
    },
    newsletterInput: {
      flex: 1,
      padding: '1rem 1.5rem',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      color: '#ffffff',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.3s ease'
    },
    newsletterButton: {
      padding: '1rem 2rem',
      backgroundColor: '#00A896',
      border: 'none',
      borderRadius: '8px',
      color: '#ffffff',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    }
  };

  return (
    <section 
      style={styles.newsletter}
      onMouseEnter={() => setNewsletterHovered(true)}
      onMouseLeave={() => setNewsletterHovered(false)}
    >
      <div style={styles.newsletterGlow} />
      <div style={styles.newsletterContent}>
        <h2 style={styles.newsletterTitle}>Weekly learning digest</h2>
        <p style={styles.newsletterDescription}>
          Get the latest articles, tutorials, and AI writing insights delivered to your inbox every Thursday.
        </p>
        <div style={styles.newsletterForm}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.newsletterInput}
            onFocus={(e) => {
              e.target.style.borderColor = '#00A896';
              e.target.style.backgroundColor = 'rgba(0, 168, 150, 0.08)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            }}
          />
          <button
            style={styles.newsletterButton}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Subscribe
          </button>
        </div>
      </div>

      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default NewsletterSection; 