/**
 * NewsletterModal Component
 * © 2025 Esy.com - All Rights Reserved
 * 
 * Designed by: World-Class Design Team
 * Architecture: Premium Conversion Design™
 * Philosophy: Authentic Excellence, Trust Through Transparency
 * 
 * This component represents 30 years of design expertise,
 * combining psychological conversion principles with aesthetic mastery.
 */

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowRight, Check } from 'lucide-react';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: 'nav-tips' | 'nav-school' | 'other';
}

const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onClose, source = 'other' }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus management
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Animation mounting
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    } else {
      const timer = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitted) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
    
    // Auto close after success
    setTimeout(() => {
      onClose();
      // Reset after modal closes
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 300);
    }, 2500);
  };

  if (!isMounted) return null;
  
  const styles = {
    overlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '1rem',
      opacity: isOpen ? 1 : 0,
      transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    modal: {
      position: 'relative' as const,
      width: '100%',
      maxWidth: '420px',
      background: '#ffffff',
      borderRadius: '20px',
      padding: '2.5rem',
      boxShadow: `
        0 25px 50px -12px rgba(0, 0, 0, 0.25),
        0 0 0 1px rgba(0, 0, 0, 0.03)
      `,
      transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
      opacity: isOpen ? 1 : 0,
      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
    closeButton: {
      position: 'absolute' as const,
      top: '1.5rem',
      right: '1.5rem',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      border: 'none',
      backgroundColor: 'transparent',
      color: '#94a3b8',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
      outline: 'none',
    },
    logoContainer: {
      marginBottom: '2rem',
      display: 'flex',
      justifyContent: 'center',
    },
    title: {
      fontSize: '1.75rem',
      fontWeight: '700',
      color: '#0f172a',
      marginBottom: '0.75rem',
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
      fontFamily: 'var(--font-literata)',
      textAlign: 'center' as const,
    },
    subtitle: {
      fontSize: '1.0625rem',
      color: '#64748b',
      marginBottom: '2rem',
      lineHeight: 1.6,
      textAlign: 'center' as const,
    },
    form: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.875rem',
    },
    inputWrapper: {
      position: 'relative' as const,
    },
    input: {
      width: '100%',
      padding: '0.875rem 1rem',
      fontSize: '0.9375rem',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      backgroundColor: '#ffffff',
      color: '#0f172a',
      outline: 'none',
      transition: 'all 0.2s ease',
      fontFamily: 'inherit',
    },
    button: {
      position: 'relative' as const,
      padding: '0.875rem 1.5rem',
      fontSize: '0.9375rem',
      fontWeight: '600',
      color: '#ffffff',
      background: isSubmitted 
        ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
        : 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      border: 'none',
      borderRadius: '12px',
      cursor: isLoading ? 'wait' : 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      overflow: 'hidden',
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
    features: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.75rem',
      marginTop: '1.5rem',
      paddingTop: '1.5rem',
      borderTop: '1px solid #e2e8f0',
      alignItems: 'center',
      justifyContent: 'center',
    },
    feature: {
      fontSize: '0.875rem',
      color: '#64748b',
      fontWeight: '500',
      fontStyle: 'italic',
      padding: '0.5rem 0',
      width: '100%',
      maxWidth: '280px',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    bullet: {
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: '#f1f5f9',
      color: '#64748b',
      fontSize: '0.75rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      border: '1px solid #e2e8f0',
    },
    checkIcon: {
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      backgroundColor: '#f0fdf4',
      color: '#10b981',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    loadingDot: {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      backgroundColor: '#ffffff',
      animation: 'pulse 1.4s infinite',
    },
    successMessage: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 0',
      gap: '1rem',
    },
    successIcon: {
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      backgroundColor: '#f0fdf4',
      color: '#10b981',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    },
  };

  // Mobile responsive adjustments
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  if (isMobile) {
    styles.modal.padding = '2rem 1.5rem';
    styles.title.fontSize = '1.5rem';
    styles.subtitle.fontSize = '0.9375rem';
  }

  return (
    <>
      <div 
        style={styles.overlay}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div ref={modalRef} style={styles.modal}>
          {/* Close Button */}
                <button
                  onClick={onClose}
                  style={styles.closeButton}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                {!isSubmitted ? (
                  <>
                    {/* Logo */}
                    <div style={styles.logoContainer}>
                      <img 
                        src="/esy-logos/logo-files/for-web/png/black-logo-no-bg.png"
                        alt="Esy"
                        width={56}
                        height={56}
                        style={{ display: 'block' }}
                      />
                    </div>

              {/* Content */}
              <h2 style={styles.title}>
                Transform Your Writing with AI
              </h2>
              <p style={styles.subtitle}>
                Weekly AI writing insights that actually work.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputWrapper}>
                  <input
                    ref={inputRef}
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#8b5cf6';
                          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = '#e2e8f0';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <button
                  type="submit"
                  style={styles.button}
                  disabled={isLoading || !email}
                  onMouseEnter={(e) => {
                    if (!isLoading && email) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px -4px rgba(139, 92, 246, 0.35)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {isLoading ? (
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      <div style={{ ...styles.loadingDot, animationDelay: '0s' }} />
                      <div style={{ ...styles.loadingDot, animationDelay: '0.2s' }} />
                      <div style={{ ...styles.loadingDot, animationDelay: '0.4s' }} />
                    </div>
                  ) : (
                    <>
                      Start Your Journey
                      <ArrowRight size={18} strokeWidth={2} />
                    </>
                  )}
                </button>
              </form>

              {/* Value Props */}
              <div style={styles.features}>
                <div style={styles.feature}>
                  <div style={styles.bullet}>1</div>
                  <span>Prompt Engineering Tutorials</span>
                </div>
                <div style={styles.feature}>
                  <div style={styles.bullet}>2</div>
                  <span>Agentic Workflows</span>
                </div>
                <div style={styles.feature}>
                  <div style={styles.bullet}>3</div>
                  <span>Weekly Essay Reviews</span>
                </div>
              </div>
            </>
          ) : (
            /* Success State */
            <div style={styles.successMessage}>
              <div style={styles.successIcon}>
                <Check size={32} strokeWidth={2.5} />
              </div>
              <h2 style={{ ...styles.title, marginBottom: '0.5rem', fontSize: '1.75rem' }}>
                You're In! 🎉
              </h2>
              <p style={{ ...styles.subtitle, marginBottom: 0, textAlign: 'center' }}>
                Welcome to a community of forward-thinking writers.
                Check your inbox for your first exclusive insights.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes pulse {
          0%, 80%, 100% {
            opacity: 1;
          }
          40% {
            opacity: 0.3;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default NewsletterModal;
