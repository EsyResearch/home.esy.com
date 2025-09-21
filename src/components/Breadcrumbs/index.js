import React from 'react';
import Link from 'next/link';
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = ({ items = [], className = '', isLight = false }) => {
  const breadcrumbClass = isLight ? styles.breadcrumbsLight : styles.breadcrumbs;
  const linkClass = isLight ? styles.breadcrumbLinkLight : styles.breadcrumbLink;
  const textClass = isLight ? styles.breadcrumbTextLight : styles.breadcrumbText;
  const currentClass = isLight ? styles.breadcrumbCurrentLight : styles.breadcrumbCurrent;
  const separatorClass = isLight ? styles.breadcrumbSeparatorLight : styles.breadcrumbSeparator;

  return (
    <nav 
      aria-label="Breadcrumb"
      className={`${breadcrumbClass} ${className}`}
    >
      <div className={styles.breadcrumbsContainer}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.href ? (
              <Link 
                href={item.href}
                className={linkClass}
              >
                {item.label}
              </Link>
            ) : (
              <span 
                className={`${textClass} ${item.isCurrent ? currentClass : ''}`}
                title={item.label}
              >
                {item.label}
              </span>
            )}
            
            {index < items.length - 1 && (
              <span className={separatorClass}>
                /
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default Breadcrumbs;
