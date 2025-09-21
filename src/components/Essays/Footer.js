import React from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ 
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      padding: '3rem 0',
      marginTop: '6rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              background: '#8b5cf6', 
              borderRadius: '6px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <BookOpen size={16} color="white" />
            </div>
            <span style={{ fontSize: '1rem', fontWeight: 600 }}>esy</span>
          </div>

          <nav style={{ 
            display: 'flex', 
            gap: '2rem',
            fontSize: '0.813rem'
          }}>
            <Link href="/about" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none' }}>About</Link>
            <Link href="/blog" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none' }}>Blog</Link>
            <Link href="/privacy" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none' }}>Privacy</Link>
            <Link href="/terms" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none' }}>Terms</Link>
            <Link href="/contact" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none' }}>Contact</Link>
          </nav>

          <p style={{ 
            fontSize: '0.813rem',
            color: 'rgba(255, 255, 255, 0.4)'
          }}>
            © 2025 Esy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 