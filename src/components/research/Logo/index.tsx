import Image from 'next/image';
import styles from './Logo.module.css';

interface LogoProps {
  suffix?: string;
  href?: string;
  className?: string;
  size?: number;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  suffix, 
  href, 
  className = '', 
  size = 60,
  showText = true 
}) => {
  // Use the actual SVG logo from esy.com
  const logoPath = '/esy-logos/logo-files/for-web/svg/color-no-bg.svg';

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
