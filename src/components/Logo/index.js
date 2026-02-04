import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styles from './Logo.module.css';

const Logo = ({ 
  suffix, 
  href, 
  className = '', 
  size = 60,
  showText = true,
  theme = 'dark', // Theme options: 'dark', 'light', 'navy-dark'
  priority = false // Whether this image should be preloaded (for LCP optimization)
}) => {
  const suffixRef = useRef(null);
  
  // Check if this is a dark theme variant (for suffix styling)
  const isDarkTheme = theme === 'dark' || theme === 'navy-dark';
  
  // Apply theme styles immediately when theme prop changes
  useEffect(() => {
    if (suffixRef.current && suffix) {
      const element = suffixRef.current;
      if (!isDarkTheme) {
        element.style.setProperty('color', 'rgba(30, 41, 59, 0.75)', 'important');
        element.style.setProperty('background', 'rgba(30, 41, 59, 0.03)', 'important');
        element.style.setProperty('border-color', 'rgba(30, 41, 59, 0.08)', 'important');
      } else {
        element.style.setProperty('color', 'rgba(255, 255, 255, 0.75)', 'important');
        element.style.setProperty('background', 'rgba(255, 255, 255, 0.03)', 'important');
        element.style.setProperty('border-color', 'rgba(255, 255, 255, 0.08)', 'important');
      }
    }
  }, [theme, suffix, isDarkTheme]);
  
  // Switch logo based on theme for better contrast
  const getLogoPath = () => {
    if (theme === 'light') {
      return '/esy-logos/logo-files/for-web/svg/black-logo-no-bg.svg';  // Black logo for light backgrounds
    } else if (theme === 'navy-dark') {
      return '/esy-logos/logo-files/for-web/png/white-logo-no-bg.png';  // White logo for navy dark
    }
    return '/esy-logos/logo-files/for-web/svg/color-no-bg.svg';         // Color logo for default dark
  };
  
  const logoPath = getLogoPath();

  const logoContent = (
    <div className={`${styles.logo} ${className}`}>
      <div className={styles.logoIcon}>
        <Image 
          src={logoPath} 
          alt="Esy Logo" 
          width={size} 
          height={size}
          priority={priority}
        />
      </div>
      {suffix && (
        <span 
          ref={suffixRef}
          className={styles.logoSubtitle}
          style={{
            color: isDarkTheme 
              ? 'rgba(255, 255, 255, 0.75) !important' // White text for dark modes
              : 'rgba(30, 41, 59, 0.75) !important',   // Dark text for light mode
            background: isDarkTheme
              ? 'rgba(255, 255, 255, 0.03) !important' // Dark background for dark modes
              : 'rgba(30, 41, 59, 0.03) !important',   // Light background for light mode
            borderColor: isDarkTheme
              ? 'rgba(255, 255, 255, 0.08) !important' // Light border for dark modes
              : 'rgba(30, 41, 59, 0.08) !important',   // Dark border for light mode
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (isDarkTheme) {
              e.target.style.setProperty('background', 'rgba(255, 255, 255, 0.06)', 'important');
              e.target.style.setProperty('border-color', 'rgba(255, 255, 255, 0.12)', 'important');
              e.target.style.setProperty('color', 'rgba(255, 255, 255, 0.9)', 'important');
            } else {
              e.target.style.setProperty('background', 'rgba(30, 41, 59, 0.06)', 'important');
              e.target.style.setProperty('border-color', 'rgba(30, 41, 59, 0.12)', 'important');
              e.target.style.setProperty('color', 'rgba(30, 41, 59, 0.9)', 'important');
            }
          }}
          onMouseLeave={(e) => {
            if (isDarkTheme) {
              e.target.style.setProperty('background', 'rgba(255, 255, 255, 0.03)', 'important');
              e.target.style.setProperty('border-color', 'rgba(255, 255, 255, 0.08)', 'important');
              e.target.style.setProperty('color', 'rgba(255, 255, 255, 0.75)', 'important');
            } else {
              e.target.style.setProperty('background', 'rgba(30, 41, 59, 0.03)', 'important');
              e.target.style.setProperty('border-color', 'rgba(30, 41, 59, 0.08)', 'important');
              e.target.style.setProperty('color', 'rgba(30, 41, 59, 0.75)', 'important');
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