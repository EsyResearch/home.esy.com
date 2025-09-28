import Image from 'next/image';
import styles from './Logo.module.css';

const Logo = ({ 
  suffix, 
  href, 
  className = '', 
  size = 60,
  showText = true,
  theme = 'dark' // New prop for theme
}) => {
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
          className={styles.logoSubtitle}
          style={{
            color: theme === 'light' 
              ? 'rgba(30, 41, 59, 0.75)'  // Dark text for light mode
              : 'rgba(255, 255, 255, 0.75)', // White text for dark mode
            background: theme === 'light'
              ? 'rgba(30, 41, 59, 0.03)'   // Light background for light mode
              : 'rgba(255, 255, 255, 0.03)', // Dark background for dark mode
            borderColor: theme === 'light'
              ? 'rgba(30, 41, 59, 0.08)'   // Dark border for light mode
              : 'rgba(255, 255, 255, 0.08)', // Light border for dark mode
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (theme === 'light') {
              e.target.style.background = 'rgba(30, 41, 59, 0.06)';
              e.target.style.borderColor = 'rgba(30, 41, 59, 0.12)';
              e.target.style.color = 'rgba(30, 41, 59, 0.9)';
            } else {
              e.target.style.background = 'rgba(255, 255, 255, 0.06)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              e.target.style.color = 'rgba(255, 255, 255, 0.9)';
            }
          }}
          onMouseLeave={(e) => {
            if (theme === 'light') {
              e.target.style.background = 'rgba(30, 41, 59, 0.03)';
              e.target.style.borderColor = 'rgba(30, 41, 59, 0.08)';
              e.target.style.color = 'rgba(30, 41, 59, 0.75)';
            } else {
              e.target.style.background = 'rgba(255, 255, 255, 0.03)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.target.style.color = 'rgba(255, 255, 255, 0.75)';
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