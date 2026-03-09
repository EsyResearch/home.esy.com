'use client';

import React, { useEffect, useRef } from 'react';

interface FloatingActionButtonProps {
  position: { top: number; left: number };
  onClick: () => void;
  onDismiss: () => void;
}

export default function FloatingActionButton({
  position,
  onClick,
  onDismiss,
}: FloatingActionButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (btnRef.current && !btnRef.current.contains(e.target as Node)) {
        onDismiss();
      }
    };
    const handleScroll = () => onDismiss();

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, { once: true });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onDismiss]);

  return (
    <button
      ref={btnRef}
      className="inline-intel-fab"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label="Get insight for selected text"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>Explain</span>
    </button>
  );
}
