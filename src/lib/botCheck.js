/* Shared bot gates for the public signup routes.
   Extracted rather than duplicated because the newsletter and waitlist forms
   are hit by the same traffic — the September 2026 run submitted both, which is
   why subscribers showed newsletter attribution with waitlist custom fields. */

// Stricter than `includes('@')`: a bare "@" used to be enough to reach Beehiiv.
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Deliberately loose. A real person using browser autofill can submit in well
   under two seconds, and a false positive here is invisible to them — so this
   is tuned only to catch instant scripted POSTs, not to be the main defence.
   Double opt-in is what actually separates humans from bots. */
const MIN_HUMAN_FILL_MS = 1200;

/* Ten, not three: universities, offices and mobile carriers put many real
   people behind one NAT address. tamu.edu and kcl.ac.uk in the September 2026
   batch are exactly the shape of traffic a tight per-IP limit would punish. */
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

// Best-effort only: this Map lives in one serverless instance, so it throttles a
// burst hitting a warm instance but not a slow drip across cold starts. The
// cheap 80%; durable limiting would need Redis or the platform WAF.
const recentByIp = new Map();

export function clientIp(request) {
  const fwd = request.headers.get('x-forwarded-for');
  return (fwd ? fwd.split(',')[0] : '').trim() || request.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const hits = (recentByIp.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  hits.push(now);
  recentByIp.set(ip, hits);

  // Opportunistic sweep so the Map cannot grow unbounded on a warm instance.
  if (recentByIp.size > 5000) {
    for (const [key, times] of recentByIp) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) recentByIp.delete(key);
    }
  }
  return hits.length > RATE_LIMIT_MAX;
}

/* Returns { reason, soft } or null when the submission looks human.

   `soft: true` means the caller should show a real, retryable error instead of
   pretending to succeed. Silence is right for gates a human can never trip, but
   wrong for the rate limit, where a shared IP can catch a genuine person — they
   need to know the signup did not land so they can try again. */
export function detectBot({ hp, elapsedMs, ip }) {
  // Gate 1 — honeypot. Humans never see the field, so any value is a filler bot.
  if (hp) return { reason: 'honeypot filled', soft: false };

  // Gate 2 — fill speed. A missing elapsedMs means an out-of-band POST, not our form.
  if (typeof elapsedMs !== 'number' || elapsedMs < MIN_HUMAN_FILL_MS) {
    return { reason: `submitted too fast (${elapsedMs}ms)`, soft: false };
  }

  // Gate 3 — per-IP burst throttle.
  if (isRateLimited(ip)) return { reason: 'rate limited', soft: true };

  return null;
}
