// Cookie consent utility functions

export const getCookieConsent = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const consent = localStorage.getItem('esy-cookie-consent');
    return consent ? JSON.parse(consent) : null;
  } catch (error) {
    console.error('Error reading cookie consent:', error);
    return null;
  }
};

export const hasConsent = (category = null) => {
  const consent = getCookieConsent();
  if (!consent) return false;
  
  if (category) {
    return consent[category] === true;
  }
  
  return true; // User has given some form of consent
};

export const hasAnalyticsConsent = () => hasConsent('analytics');
export const hasFunctionalConsent = () => hasConsent('functional');
export const hasPersonalizationConsent = () => hasConsent('personalization');

export const clearCookieConsent = () => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('esy-cookie-consent');
  } catch (error) {
    console.error('Error clearing cookie consent:', error);
  }
};

export const updateAnalyticsConsent = (enabled) => {
  if (typeof window === 'undefined') return;
  
  try {
    const consent = getCookieConsent() || {
      necessary: true,
      analytics: false,
      functional: false,
      personalization: false,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    
    consent.analytics = enabled;
    consent.timestamp = new Date().toISOString();
    
    localStorage.setItem('esy-cookie-consent', JSON.stringify(consent));
    
    // Update Google Analytics consent if available
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: enabled ? 'granted' : 'denied'
      });
    }
  } catch (error) {
    console.error('Error updating analytics consent:', error);
  }
}; 