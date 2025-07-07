import React from 'react';
import { ArrowRight, HelpCircle } from 'lucide-react';

const ContactHero = ({ 
  currentTheme, 
  contactPaths, 
  selectedPath, 
  setSelectedPath, 
  setShowForm 
}) => (
  <div>
    <h1 style={{
      fontSize: '4rem',
      fontWeight: 300,
      lineHeight: 1.1,
      letterSpacing: '-0.03em',
      marginBottom: '2rem'
    }}>
      Ready to transform
      <br />
      your research?
    </h1>
    
    <p style={{
      fontSize: '1.5rem',
      lineHeight: 1.6,
      color: currentTheme.muted,
      marginBottom: '3rem'
    }}>
      Choose how you&apos;d like to connect with us.
    </p>

    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      {contactPaths.map(path => {
        const Icon = path.icon;
        return (
          <button
            key={path.id}
            onClick={() => setSelectedPath(path.id)}
            style={{
              padding: '1.5rem',
              background: selectedPath === path.id ? currentTheme.elevated : 'transparent',
              border: `1px solid ${selectedPath === path.id ? currentTheme.accent : currentTheme.border}`,
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              textAlign: 'left'
            }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              background: selectedPath === path.id ? currentTheme.accent : 'transparent',
              border: `1px solid ${selectedPath === path.id ? currentTheme.accent : currentTheme.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Icon size={24} color={selectedPath === path.id ? 'white' : currentTheme.subtle} strokeWidth={1.5} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 400,
                marginBottom: '0.25rem'
              }}>
                {path.title}
              </h3>
              <p style={{
                fontSize: '0.938rem',
                color: currentTheme.subtle
              }}>
                {path.description}
              </p>
            </div>
            <ArrowRight size={20} color={currentTheme.subtle} />
          </button>
        );
      })}
    </div>

    <div style={{
      marginTop: '3rem',
      paddingTop: '3rem',
      borderTop: `1px solid ${currentTheme.border}`
    }}>
      <button
        onClick={() => setShowForm(true)}
        style={{
          color: currentTheme.subtle,
          background: 'transparent',
          border: 'none',
          fontSize: '0.938rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          transition: 'color 0.2s'
        }}
      >
        <HelpCircle size={16} />
        Have a different question? Send us a message
      </button>
    </div>
  </div>
);

export default ContactHero; 