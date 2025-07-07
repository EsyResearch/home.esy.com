import React from 'react';
import { BookOpen } from 'lucide-react';

const ContactFooter = ({ currentTheme }) => (
  <footer style={{ 
    borderTop: `1px solid ${currentTheme.border}`,
    padding: '3rem 0'
  }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            background: currentTheme.accent, 
            borderRadius: '6px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center'
          }}>
            <BookOpen size={16} color="white" strokeWidth={1.5} />
          </div>
          <span style={{ fontSize: '1rem', fontWeight: 600 }}>esy</span>
        </div>

        <p style={{ 
          fontSize: '0.813rem',
          color: currentTheme.faint
        }}>
          © 2025 Esy. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default ContactFooter; 