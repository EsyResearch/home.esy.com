import React from 'react';

const GA_MEASUREMENT_ID = 'G-FHDZHEDVL2';

export default function GoogleAnalytics() {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Check for existing cookie consent
            const consent = localStorage.getItem('esy-cookie-consent');
            const consentData = consent ? JSON.parse(consent) : null;
            
            // Default consent state - deny all until user gives consent
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              functionality_storage: 'denied',
              personalization_storage: 'denied'
            });
            
            // If user has given consent, update accordingly
            if (consentData) {
              gtag('consent', 'update', {
                analytics_storage: consentData.analytics ? 'granted' : 'denied',
                functionality_storage: consentData.functional ? 'granted' : 'denied',
                personalization_storage: consentData.personalization ? 'granted' : 'denied'
              });
            }
            
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
} 