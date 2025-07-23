'use client';

import { useState, useEffect } from 'react';
import { getCookieConsent, hasConsent } from './cookieConsent';

export const useCookieConsent = (category = null) => {
  const [consent, setConsent] = useState(null);
  const [hasUserConsent, setHasUserConsent] = useState(false);

  useEffect(() => {
    // Initial check
    const checkConsent = () => {
      const consentData = getCookieConsent();
      setConsent(consentData);
      setHasUserConsent(hasConsent(category));
    };

    checkConsent();

    // Listen for storage changes (in case consent is updated in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'esy-cookie-consent') {
        checkConsent();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events (in case consent is updated in same tab)
    const handleConsentUpdate = () => {
      checkConsent();
    };

    window.addEventListener('cookie-consent-updated', handleConsentUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cookie-consent-updated', handleConsentUpdate);
    };
  }, [category]);

  return {
    consent,
    hasConsent: hasUserConsent,
    hasAnalyticsConsent: consent?.analytics || false,
    hasFunctionalConsent: consent?.functional || false,
    hasPersonalizationConsent: consent?.personalization || false,
    timestamp: consent?.timestamp,
    version: consent?.version
  };
}; 