"use client";

import React, { useState, useEffect } from 'react';
import { Lock, Check, ArrowRight } from 'lucide-react';

interface PricingSectionProps {
  currentTheme: {
    muted: string;
    subtle: string;
    accent: string;
  };
}

const PricingSection: React.FC<PricingSectionProps> = ({ currentTheme }) => {
  const [spotsRemaining, setSpotsRemaining] = useState(247);
  const [daysUntilLaunch, setDaysUntilLaunch] = useState(18);

  const features = [
    'Unlimited prompt library access',
    'AI output quality tracking',
    'Priority support & onboarding',
    'Early feature access',
    'Exclusive community access',
    'Lifetime early adopter pricing'
  ];

  return (
    <section id="pricing" style={{ 
      padding: '8rem 0',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
            lineHeight: 1.3,
            fontFamily: 'var(--font-literata)'
          }}>
            We&apos;re deliberately
            <br />
            starting small.
          </h2>

          <p style={{
            fontSize: '1.25rem',
            lineHeight: 1.7,
            color: currentTheme.muted,
            maxWidth: '650px',
            margin: '0 auto'
          }}>
            Esy launches in private beta <span style={{ fontWeight: 600, color: 'white' }}>February 2025</span>. 
            We&apos;re limiting initial access to <span style={{ fontWeight: 600, color: currentTheme.accent }}>500 researchers</span> to 
            ensure exceptional onboarding quality.
          </p>
        </div>

        {/* Waitlist Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '3rem',
          marginBottom: '4rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '0.875rem',
              color: currentTheme.subtle,
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 600
            }}>
              Current Waitlist
            </div>
            <div style={{
              fontSize: '3rem',
              fontWeight: 300,
              color: 'white'
            }}>
              2,847
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: currentTheme.muted
            }}>
              researchers
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '0.875rem',
              color: currentTheme.subtle,
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 600
            }}>
              Spots Remaining
            </div>
            <div style={{
              fontSize: '3rem',
              fontWeight: 300,
              color: '#EF4444'
            }}>
              {spotsRemaining}
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: currentTheme.muted
            }}>
              of 500
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{
          width: '100%',
          height: '8px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '4px',
          marginBottom: '4rem',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${((500 - spotsRemaining) / 500) * 100}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${currentTheme.accent} 0%, #10B981 100%)`,
            transition: 'width 0.5s ease'
          }} />
        </div>

        {/* Pricing Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
          border: `2px solid ${currentTheme.accent}40`,
          borderRadius: '20px',
          padding: '3rem',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: `0 20px 60px ${currentTheme.accent}20`
        }}>
          {/* Badge */}
          <div style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            padding: '0.5rem 1rem',
            background: `linear-gradient(135deg, ${currentTheme.accent} 0%, #10B981 100%)`,
            borderRadius: '20px',
            fontSize: '0.8125rem',
            fontWeight: 700,
            color: 'white',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Lock size={14} />
            Locked for Life
          </div>

          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: currentTheme.accent,
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Early Access Pricing
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: currentTheme.subtle
            }}>
              Lock in this rate forever
            </div>
          </div>

          {/* Pricing */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.5rem' }}>
              <span style={{
                fontSize: '4rem',
                fontWeight: 300,
                color: 'white',
                lineHeight: 1
              }}>
                $29
              </span>
              <span style={{
                fontSize: '1.25rem',
                color: currentTheme.muted
              }}>
                /month
              </span>
            </div>
            <div style={{
              fontSize: '1.125rem',
              color: currentTheme.subtle,
              textDecoration: 'line-through'
            }}>
              Regular price: $79/month
            </div>
          </div>

          {/* Features */}
          <div style={{
            marginBottom: '2.5rem',
            padding: '2rem 0',
            borderTop: `1px solid ${currentTheme.subtle}20`,
            borderBottom: `1px solid ${currentTheme.subtle}20`
          }}>
            {features.map((feature, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: `${currentTheme.accent}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Check size={16} color={currentTheme.accent} strokeWidth={3} />
                </div>
                <span style={{
                  fontSize: '1.0625rem',
                  color: currentTheme.muted
                }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button style={{
            width: '100%',
            padding: '1.25rem 2rem',
            background: `linear-gradient(135deg, ${currentTheme.accent} 0%, #10B981 100%)`,
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            fontSize: '1.125rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            transition: 'all 0.3s ease',
            boxShadow: `0 8px 24px ${currentTheme.accent}40`,
            marginBottom: '1.5rem'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 12px 32px ${currentTheme.accent}60`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 8px 24px ${currentTheme.accent}40`;
          }}
          >
            Secure My Spot
            <ArrowRight size={20} strokeWidth={2.5} />
          </button>

          {/* Warning */}
          <div style={{
            textAlign: 'center',
            fontSize: '0.9375rem',
            color: '#EF4444',
            fontWeight: 600
          }}>
            Price increases to $49 after first 500 users
          </div>
        </div>

        {/* Trust Statement */}
        <div style={{
          marginTop: '3rem',
          textAlign: 'center',
          fontSize: '0.9375rem',
          color: currentTheme.subtle,
          lineHeight: 1.7
        }}>
          <div style={{ marginBottom: '0.5rem' }}>
            ✓ No credit card required for waitlist
          </div>
          <div>
            ✓ 30-day money-back guarantee at launch
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

