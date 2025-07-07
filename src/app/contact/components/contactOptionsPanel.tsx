import React from 'react';
import { ArrowRight, Clock, Mail } from 'lucide-react';

const ContactOptionsPanel = ({
  currentTheme,
  contactPaths,
  selectedPath,
  showForm,
  setShowForm,
  setSelectedPath,
  formData,
  handleInputChange,
  handleSubmit
}) => (
  <div style={{
    background: currentTheme.elevated,
    borderRadius: '12px',
    padding: '3rem',
    minHeight: '500px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }}>
    {!selectedPath && !showForm && (
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: currentTheme.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem'
        }}>
          <Mail size={36} color={currentTheme.subtle} strokeWidth={1.5} />
        </div>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: 300,
          marginBottom: '1rem'
        }}>
          Select an option to get started
        </h3>
        <p style={{
          fontSize: '1rem',
          color: currentTheme.subtle,
          lineHeight: 1.6
        }}>
          Choose how you&apos;d like to connect with us, and we&apos;ll guide you through the next steps.
        </p>
      </div>
    )}

    {selectedPath && !showForm && (
      <div>
        {(() => {
          const path = contactPaths.find(p => p.id === selectedPath);
          if (!path) return null;
          const Icon = path.icon;
          return (
            <>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '12px',
                background: currentTheme.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2rem'
              }}>
                <Icon size={32} color="white" strokeWidth={1.5} />
              </div>
              
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 300,
                marginBottom: '1rem'
              }}>
                {path.title}
              </h2>
              
              <p style={{
                fontSize: '1.125rem',
                color: currentTheme.muted,
                marginBottom: '2.5rem',
                lineHeight: 1.6
              }}>
                {path.description}
              </p>

              <div style={{
                marginBottom: '2.5rem'
              }}>
                <h4 style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: currentTheme.subtle,
                  marginBottom: '1rem'
                }}>
                  What you&apos;ll get
                </h4>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  {path.details.map((detail, index) => (
                    <li key={index} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      fontSize: '0.938rem',
                      color: currentTheme.muted
                    }}>
                      <span style={{ color: currentTheme.accent, marginTop: '2px' }}>•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => {
                  if (path.id === 'early-access') {
                    window.location.href = '/waitlist';
                  } else if (path.id === 'demo') {
                    window.location.href = '/book-demo';
                  } else {
                    setShowForm(true);
                  }
                }}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: currentTheme.accent,
                  border: 'none',
                  borderRadius: '6px',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  transition: 'opacity 0.2s'
                }}
              >
                {path.action}
                <ArrowRight size={18} />
              </button>

              <div style={{
                marginTop: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                color: currentTheme.subtle,
                justifyContent: 'center'
              }}>
                <Clock size={14} />
                Response within 24 hours
              </div>
            </>
          );
        })()}
      </div>
    )}

    {showForm && (
      <div>
        <button
          onClick={() => {
            setShowForm(false);
            setSelectedPath(null);
          }}
          style={{
            background: 'transparent',
            border: 'none',
            color: currentTheme.subtle,
            fontSize: '0.875rem',
            cursor: 'pointer',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          ← Back to options
        </button>

        <h2 style={{
          fontSize: '2rem',
          fontWeight: 300,
          marginBottom: '2rem'
        }}>
          Send us a message
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <input
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            style={{
              padding: '0.875rem',
              background: currentTheme.bg,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '6px',
              color: currentTheme.text,
              fontSize: '0.938rem',
              outline: 'none'
            }}
          />
          
          <input
            type="email"
            placeholder="your.email@university.edu"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            style={{
              padding: '0.875rem',
              background: currentTheme.bg,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '6px',
              color: currentTheme.text,
              fontSize: '0.938rem',
              outline: 'none'
            }}
          />
          
          <textarea
            placeholder="How can we help you?"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={6}
            style={{
              padding: '0.875rem',
              background: currentTheme.bg,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '6px',
              color: currentTheme.text,
              fontSize: '0.938rem',
              outline: 'none',
              resize: 'vertical',
              lineHeight: 1.6
            }}
          />

          <button
            onClick={handleSubmit}
            style={{
              padding: '0.875rem',
              background: currentTheme.accent,
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              fontSize: '0.938rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}
          >
            Send Message
          </button>
        </div>
      </div>
    )}
  </div>
);

export default ContactOptionsPanel; 