"use client"

import { useState, useCallback, useRef } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Reusable hook for newsletter subscription via the /api/newsletter/subscribe endpoint.
 *
 * Returns { subscribe, status, errorMessage, reset }
 *   - subscribe(email): call to submit an email
 *   - status: 'idle' | 'loading' | 'success' | 'error'
 *   - errorMessage: string | null
 *   - reset(): manually reset to idle (e.g. when user starts typing)
 *
 * On error, status auto-resets to 'idle' after errorResetMs (default 5000ms).
 * On success, status persists until manually reset or the component unmounts.
 */
export function useNewsletterSubscribe({ errorResetMs = 5000 } = {}) {
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState(null);
  const errorTimerRef = useRef(null);

  const clearErrorTimer = () => {
    if (errorTimerRef.current) {
      clearTimeout(errorTimerRef.current);
      errorTimerRef.current = null;
    }
  };

  const reset = useCallback(() => {
    clearErrorTimer();
    setStatus('idle');
    setErrorMessage(null);
  }, []);

  const subscribe = useCallback(async (email) => {
    clearErrorTimer();

    if (!email || email.trim() === '') {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage(null);

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Subscription failed.');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');

      if (errorResetMs > 0) {
        errorTimerRef.current = setTimeout(() => {
          setStatus((prev) => (prev === 'error' ? 'idle' : prev));
          setErrorMessage((prev) => prev ? null : prev);
        }, errorResetMs);
      }
    }
  }, [errorResetMs]);

  return { subscribe, status, errorMessage, reset };
}
