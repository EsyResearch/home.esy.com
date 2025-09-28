import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styles from './Logo.module.css';

const Logo = ({ 
  suffix, 
  href, 
  className = '', 
  size = 60,
  showText = true,
  theme = 'dark' // New prop for theme
}) => {
  const suffixRef = useRef(null);
  
  // Apply theme styles immediately when theme prop changes
  useEffect(() => {
    if (suffixRef.current && suffix) {
      const element = suffixRef.current;
      if (theme === 'light') {
        element.style.setProperty('color', 'rgba(30, 41, 59, 0.75)', 'important');
        element.style.setProperty('background', 'rgba(30, 41, 59, 0.03)', 'important');
        element.style.setProperty('border-color', 'rgba(30, 41, 59, 0.08)', 'important');
      } else {
        element.style.setProperty('color', 'rgba(255, 255, 255, 0.75)', 'important');
        element.style.setProperty('background', 'rgba(255, 255, 255, 0.03)', 'important');
        element.style.setProperty('border-color', 'rgba(255, 255, 255, 0.08)', 'important');
      }
    }
  }, [theme, suffix]);
  // Switch logo based on theme for better contrast
  const logoPath = theme === 'light' 
    ? '/esy-logos/logo-files/for-web/svg/black-logo-no-bg.svg'  // Black logo for light backgrounds
    : '/esy-logos/logo-files/for-web/svg/color-no-bg.svg';      // Color logo for dark backgrounds

  const logoContent = (
    <div className={`${styles.logo} ${className}`}>
      <div className={styles.logoIcon}>
        <Image 
          src={logoPath} 
          alt="Esy Logo" 
          width={size} 
          height={size}
        />
      </div>
      {suffix && (
        <span 
          ref={suffixRef}
          className={styles.logoSubtitle}
          style={{
            color: theme === 'light' 
              ? 'rgba(30, 41, 59, 0.75) !important'  // Dark text for light mode
              : 'rgba(255, 255, 255, 0.75) !important', // White text for dark mode
            background: theme === 'light'
              ? 'rgba(30, 41, 59, 0.03) !important'   // Light background for light mode
              : 'rgba(255, 255, 255, 0.03) !important', // Dark background for dark mode
            borderColor: theme === 'light'
              ? 'rgba(30, 41, 59, 0.08) !important'   // Dark border for light mode
              : 'rgba(255, 255, 255, 0.08) !important', // Light border for dark mode
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (theme === 'light') {
              e.target.style.setProperty('background', 'rgba(30, 41, 59, 0.06)', 'important');
              e.target.style.setProperty('border-color', 'rgba(30, 41, 59, 0.12)', 'important');
              e.target.style.setProperty('color', 'rgba(30, 41, 59, 0.9)', 'important');
            } else {
              e.target.style.setProperty('background', 'rgba(255, 255, 255, 0.06)', 'important');
              e.target.style.setProperty('border-color', 'rgba(255, 255, 255, 0.12)', 'important');
              e.target.style.setProperty('color', 'rgba(255, 255, 255, 0.9)', 'important');
            }
          }}
          onMouseLeave={(e) => {
            if (theme === 'light') {
              e.target.style.setProperty('background', 'rgba(30, 41, 59, 0.03)', 'important');
              e.target.style.setProperty('border-color', 'rgba(30, 41, 59, 0.08)', 'important');
              e.target.style.setProperty('color', 'rgba(30, 41, 59, 0.75)', 'important');
            } else {
              e.target.style.setProperty('background', 'rgba(255, 255, 255, 0.03)', 'important');
              e.target.style.setProperty('border-color', 'rgba(255, 255, 255, 0.08)', 'important');
              e.target.style.setProperty('color', 'rgba(255, 255, 255, 0.75)', 'important');
            }
          }}
        >
          {suffix}
        </span>
      )}
      {showText && (
        <span className={styles.logoText}>esy</span>
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} className={styles.logoLink}>
        {logoContent}
      </a>
    );
  }

  return logoContent;
};

export default Logo;