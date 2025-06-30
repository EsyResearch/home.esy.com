"use client";

import React from 'react';
import { Brain, Layers, MessageSquare, Sparkles } from 'lucide-react';

interface Feature {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  currentTheme: {
    muted: string;
    subtle: string;
    border: string;
    elevated: string;
  };
  features: Feature[];
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ currentTheme, features }) => {
  return (
    <section id="features" style={{ 
      padding: '8rem 0',
      backgroundColor: currentTheme.elevated
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ maxWidth: '720px', marginBottom: '6rem' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            marginBottom: '3rem'
          }}>
            Everything you need to
            <br />
            excel with AI
          </h2>

          <p style={{
            fontSize: '1.25rem',
            lineHeight: 1.8,
            color: currentTheme.muted
          }}>
            From your first prompt to your hundredth paper, Esy provides the 
            tools, templates, and training to make AI your most powerful research ally.
          </p>
        </div>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '4rem'
        }}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  border: `1px solid ${currentTheme.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '2rem'
                }}>
                  <Icon size={24} color={currentTheme.subtle} strokeWidth={1.5} />
                </div>
                <h3 style={{
                  fontSize: '1.375rem',
                  fontWeight: 400,
                  marginBottom: '1rem'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '1.063rem',
                  lineHeight: 1.8,
                  color: currentTheme.subtle
                }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 