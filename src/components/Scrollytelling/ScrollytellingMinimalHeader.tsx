"use client";

import React from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';

const ScrollytellingMinimalHeader: React.FC = () => {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: 'transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '1.5rem 2rem',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            textDecoration: 'none',
          }}
        >
          <Logo 
            showText={false}
            theme="dark"
          />
        </Link>
      </div>
    </nav>
  );
};

export default ScrollytellingMinimalHeader;

