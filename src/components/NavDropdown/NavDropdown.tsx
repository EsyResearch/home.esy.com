"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import './NavDropdown.css';

export interface DropdownItem {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  accent?: 'purple' | 'blue' | 'emerald' | 'amber' | 'cyan' | 'rose';
}

interface NavDropdownProps {
  label: string;
  items: DropdownItem[];
  footerLink?: {
    href: string;
    text: string;
  };
  isLightMode?: boolean;
}

export default function NavDropdown({ 
  label,
  items,
  footerLink,
  isLightMode = false 
}: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsClosing(false);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 150); // Match animation duration
    }, 100); // Small delay before closing
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="nav-dropdown-container"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`nav-dropdown-trigger ${isOpen ? 'active' : ''} ${isLightMode ? 'light' : 'dark'}`}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{label}</span>
        <ChevronDown 
          size={14} 
          className={`nav-dropdown-chevron ${isOpen ? 'rotated' : ''}`}
        />
      </button>

      {isOpen && (
        <div 
          className={`nav-dropdown-menu ${isClosing ? 'closing' : ''} ${isLightMode ? 'light' : 'dark'}`}
          role="menu"
          aria-orientation="vertical"
        >
          <div className="nav-dropdown-content">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-dropdown-item ${item.accent || ''}`}
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                <div className={`nav-dropdown-icon ${item.accent || ''}`}>
                  {item.icon}
                </div>
                <div className="nav-dropdown-text">
                  <span className="nav-dropdown-title">{item.title}</span>
                  <span className="nav-dropdown-desc">{item.description}</span>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Footer link */}
          {footerLink && (
            <div className="nav-dropdown-footer">
              <Link 
                href={footerLink.href} 
                className="nav-dropdown-footer-link"
                onClick={() => setIsOpen(false)}
              >
                {footerLink.text}
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
