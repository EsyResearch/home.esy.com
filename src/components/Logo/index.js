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
        <span className={styles.logoSubtitle}>{suffix}</span>
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