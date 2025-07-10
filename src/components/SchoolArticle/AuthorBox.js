"use client"

import React from 'react';

const AuthorBox = ({ author }) => {
  const styles = {
    authorBox: {
      backgroundColor: 'rgba(139, 92, 246, 0.03)',
      border: '1px solid rgba(139, 92, 246, 0.1)',
      borderRadius: '12px',
      padding: '2rem',
      marginTop: '3rem',
      display: 'flex',
      gap: '2rem',
      alignItems: 'center'
    },
    authorBoxAvatar: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      backgroundColor: 'rgba(139, 92, 246, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2rem',
      fontWeight: '300',
      flexShrink: 0
    },
    authorBoxContent: {
      flex: 1
    },
    authorBoxName: {
      fontSize: '1.25rem',
      fontWeight: '400',
      marginBottom: '0.5rem'
    },
    authorBoxBio: {
      color: 'rgba(255, 255, 255, 0.7)',
      lineHeight: '1.6',
      marginBottom: '1rem'
    },
    authorBoxMeta: {
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.5)'
    }
  };

  return (
    <div style={styles.authorBox}>
      <div style={styles.authorBoxAvatar}>{author.initials}</div>
      <div style={styles.authorBoxContent}>
        <h3 style={styles.authorBoxName}>{author.name}</h3>
        <p style={styles.authorBoxBio}>{author.bio}</p>
        <div style={styles.authorBoxMeta}>{author.meta}</div>
      </div>
    </div>
  );
};

export default AuthorBox;