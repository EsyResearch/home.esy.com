/* Server-side Turnstile verification.

   Runs inside the existing signup routes rather than behind a separate Worker:
   this app already has a server, so the extra hop and the extra deploy target
   would buy nothing. The secret lives in Vercel env beside BEEHIIV_API_KEY. */

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/* Verifies a widget token. Returns { ok } or { ok: false, reason }.

   Fails OPEN when TURNSTILE_SECRET_KEY is unset, so this can merge and deploy
   before the widget exists without taking signups down. Once the secret is set,
   a missing or bad token is rejected — but visibly, never silently, because a
   widget that failed to load is a real user's problem, not a bot's. */
export async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { ok: true, skipped: true };

  if (!token) return { ok: false, reason: 'missing token' };

  try {
    const body = new URLSearchParams({ secret, response: token });
    // Cloudflare uses the IP only to score the challenge; omitted when unknown.
    if (ip && ip !== 'unknown') body.set('remoteip', ip);

    const res = await fetch(SITEVERIFY_URL, { method: 'POST', body });
    const data = await res.json().catch(() => ({}));

    if (data.success) return { ok: true };
    return { ok: false, reason: (data['error-codes'] || ['unknown']).join(',') };
  } catch (err) {
    /* Cloudflare unreachable. Fail open: a siteverify outage must not become a
       signup outage, and the honeypot and timing gates still apply underneath. */
    console.error('[turnstile] siteverify unreachable, allowing through:', err);
    return { ok: true, degraded: true };
  }
}
