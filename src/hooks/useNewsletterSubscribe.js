"use client"

import { useState, useCallback, useRef } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Reusable hook for newsletter subscription.
 *
 * @param {Object} opts
 * @param {string} [opts.endpoint='/api/newsletter/subscribe'] - API endpoint to POST to
 * @param {number} [opts.errorResetMs=5000] - ms before auto-resetting error state
 *
 * Returns { subscribe, status, errorMessage, reset }
 */
export function useNewsletterSubscribe({ endpoint = '/api/newsletter/subscribe', errorResetMs = 5000 } = {}) {
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
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      let data = {};
      try {
        const text = await res.text();
        if (text) {
          data = JSON.parse(text);
        }
      } catch {
        if (!res.ok) {
          throw new Error('Subscription failed. Please try again.');
        }
      }

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
  }, [endpoint, errorResetMs]);

  return { subscribe, status, errorMessage, reset };
}
