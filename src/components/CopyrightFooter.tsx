'use client';

import React from 'react';

export default function CopyrightFooter() {
  return (
    <footer className="copyright-footer">
      <div className="copyright-content">
        <p>&copy; 2025 Esy, LLC. All rights reserved.</p>
      </div>

      <style jsx>{`
        .copyright-footer {
          padding: 2rem 2rem 3rem 2rem;
          background: transparent;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          margin-top: auto;
        }

        .copyright-content {
          text-align: center;
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.875rem;
          font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .copyright-content p {
          margin: 0;
        }

        @media (max-width: 768px) {
          .copyright-footer {
            padding: 1.5rem 1rem;
          }

          .copyright-content {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </footer>
  );
}
