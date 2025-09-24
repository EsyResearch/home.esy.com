"use client"

import React, { useState, useEffect } from 'react';

const MockingbirdFeaturedImage = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Simulate image loading
    setTimeout(() => setImageLoaded(true), 500);
  }, []);

  const styles = {
    featuredImage: {
      position: 'relative',
      width: '100%',
      height: '600px',
      overflow: 'hidden',
      marginTop: '1rem',
      backgroundColor: '#16161f'
    },
    imageOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to bottom, rgba(10, 10, 15, 0) 0%, rgba(10, 10, 15, 0.4) 60%, rgba(10, 10, 15, 0.9) 100%)',
      zIndex: 1
    },
    imageContent: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 0
    },
    imageGraphic: {
      width: '100%',
      height: '100%',
      background: 'radial-gradient(circle at 30% 50%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: imageLoaded ? 1 : 0,
      transition: 'opacity 1s ease'
    },
    bookVisualization: {
      position: 'relative',
      width: '400px',
      height: '500px',
      transform: 'perspective(1000px) rotateY(-15deg)',
      transformStyle: 'preserve-3d'
    },
    bookCover: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #2a2a3a 0%, #16161f 100%)',
      borderRadius: '8px',
      border: '1px solid rgba(139, 92, 246, 0.3)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
    },
    bookTitle: {
      fontSize: '2.5rem',
      fontWeight: '200',
      textAlign: 'center',
      marginBottom: '1rem',
      letterSpacing: '-0.02em',
      color: '#ffffff'
    },
    bookAuthor: {
      fontSize: '1.125rem',
      color: 'rgba(255, 255, 255, 0.6)',
      marginBottom: '2rem'
    },
    codeFloating: {
      position: 'absolute',
      padding: '0.5rem 1rem',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      border: '1px solid rgba(139, 92, 246, 0.3)',
      borderRadius: '6px',
      fontFamily: 'Monaco, Consolas, monospace',
      fontSize: '0.875rem',
      color: '#8b5cf6',
      whiteSpace: 'nowrap'
    }
  };

  return (
    <div style={styles.featuredImage}>
      <div style={styles.imageOverlay} />
      <div style={styles.imageContent}>
        <div style={styles.imageGraphic}>
          <div style={styles.bookVisualization}>
            <div style={styles.bookCover}>
              <h2 style={styles.bookTitle}>To Kill a Mockingbird</h2>
              <p style={styles.bookAuthor}>Harper Lee</p>
              <div style={{ 
                width: '100px', 
                height: '2px', 
                backgroundColor: '#8b5cf6',
                margin: '0 auto'
              }} />
            </div>
            
            {/* Floating literary elements */}
            <div style={{
              ...styles.codeFloating,
              top: '20%',
              left: '-150px',
              transform: 'rotate(-5deg)',
              animation: 'float 6s ease-in-out infinite'
            }}>
              Symbolism & Metaphor
            </div>
            
            <div style={{
              ...styles.codeFloating,
              bottom: '30%',
              right: '-140px',
              transform: 'rotate(3deg)',
              animation: 'float 8s ease-in-out infinite reverse'
            }}>
              Character Analysis
            </div>
            
            <div style={{
              ...styles.codeFloating,
              top: '60%',
              left: '-120px',
              transform: 'rotate(-3deg)',
              animation: 'float 7s ease-in-out infinite'
            }}>
              Themes & Justice
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockingbirdFeaturedImage;