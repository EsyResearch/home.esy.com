import React from 'react';
import Link from 'next/link';
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = ({ items = [], className = '' }) => {
  return (
    <nav 
      aria-label="Breadcrumb"
      className={`${styles.breadcrumbs} ${className}`}
    >
      <div className={styles.breadcrumbsContainer}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.href ? (
              <Link 
                href={item.href}
                className={styles.breadcrumbLink}
              >
                {item.label}
              </Link>
            ) : (
              <span 
                className={`${styles.breadcrumbText} ${item.isCurrent ? styles.breadcrumbCurrent : ''}`}
                title={item.label}
              >
                {item.label}
              </span>
            )}
            
            {index < items.length - 1 && (
              <span className={styles.breadcrumbSeparator}>
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
