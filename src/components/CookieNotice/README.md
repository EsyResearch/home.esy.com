# Cookie Notice Component

This component provides a comprehensive cookie consent management system for the Esy application.

## Features

- **GDPR Compliant**: Follows privacy regulations with granular consent options
- **Academic Focus**: Tailored messaging for research and academic users
- **Customizable**: Users can choose which cookie categories to accept
- **Analytics Integration**: Automatically updates Google Analytics consent
- **Responsive Design**: Works on all device sizes
- **Accessible**: Built with accessibility in mind

## Cookie Categories

1. **Essential** (Always enabled)
   - Authentication and security
   - Core platform functionality
   - Cannot be disabled

2. **Analytics** (Optional)
   - Usage patterns and performance data
   - Helps improve the research experience
   - Retention: 13 months

3. **Functionality** (Optional)
   - User preferences and settings
   - Enhanced features
   - Retention: 12 months

4. **Personalization** (Optional)
   - Tailored content and recommendations
   - Research suggestions
   - Retention: 24 months

## Usage

### Basic Setup

The Cookie Notice is automatically included in the root layout and will appear for new users who haven't given consent.

### Checking Consent in Components

```javascript
import { useCookieConsent } from '@/lib/useCookieConsent';

function MyComponent() {
  const { hasAnalyticsConsent, hasFunctionalConsent } = useCookieConsent();
  
  if (hasAnalyticsConsent) {
    // Load analytics features
  }
  
  if (hasFunctionalConsent) {
    // Load functional features
  }
  
  return <div>...</div>;
}
```

### Using Utility Functions

```javascript
import { hasConsent, getCookieConsent } from '@/lib/cookieConsent';

// Check specific consent
const hasAnalytics = hasConsent('analytics');

// Get full consent data
const consent = getCookieConsent();
console.log(consent.analytics); // true/false
```

### Conditional Feature Loading

```javascript
import { useCookieConsent } from '@/lib/useCookieConsent';

function AnalyticsWidget() {
  const { hasAnalyticsConsent } = useCookieConsent();
  
  if (!hasAnalyticsConsent) {
    return <div>Analytics disabled by user preference</div>;
  }
  
  return <AnalyticsComponent />;
}
```

## Privacy Policy Links

The component includes links to:
- `/privacy` - Privacy Policy page
- `/cookies` - Cookie Policy page

Make sure these pages exist or update the links in the component.

## Styling

The component uses inline styles with a dark theme that matches the Esy brand. Colors are defined in the `colors` object within the component.

## Testing

To test the cookie notice:

1. Clear localStorage: `localStorage.removeItem('esy-cookie-consent')`
2. Refresh the page
3. The notice should appear after 1.2 seconds

To test different consent scenarios:
- Accept all cookies
- Accept essential only
- Customize preferences

## Analytics Integration

The component automatically:
- Sets default consent to 'denied' for all categories
- Updates Google Analytics consent when user makes choices
- Dispatches custom events for other components to listen to

## Events

The component dispatches a `cookie-consent-updated` event when consent is changed:

```javascript
window.addEventListener('cookie-consent-updated', (event) => {
  console.log('Consent updated:', event.detail);
});
``` 