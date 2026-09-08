import { NextResponse } from 'next/server';

import { EMAIL_REGEX, clientIp, detectBot } from '@/lib/botCheck';
import { verifyTurnstile } from '@/lib/turnstile';

// Only these are forwarded to Beehiiv as referring_site, so a spoofed `source`
// in the request body cannot write arbitrary text into subscriber records.
const KNOWN_SOURCES = new Set([
  '/', '/engineer', '/agentic', '/school', '/research', '/courses', '/about', '/waitlist',
]);

// Bots learn from error messages, so a rejection returns the same shape a real
// success does. The signup simply never reaches Beehiiv.
function silentlyAccept(reason, meta) {
  console.warn('[newsletter] rejected as bot:', reason, meta);
  return NextResponse.json({ success: true });
}

export async function POST(request) {
  try {
    const { email, hp, elapsedMs, source, turnstileToken } = await request.json();

    if (!email || !EMAIL_REGEX.test(String(email).trim())) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const address = String(email).trim().toLowerCase();
    const ip = clientIp(request);

    const bot = detectBot({ hp, elapsedMs, ip });
    if (bot?.soft) {
      // A shared IP can catch a real person, so say so rather than fake success.
      console.warn('[newsletter] soft-rejected:', bot.reason, { address });
      return NextResponse.json(
        { error: 'Too many signups from your network just now. Please try again in a few minutes.' },
        { status: 429 }
      );
    }
    if (bot) return silentlyAccept(bot.reason, { address });

    /* Turnstile last: it costs a network round trip, so the free local gates
       above run first. Rejections here are visible — a blocked or failed widget
       is a real user's problem and they need to know the signup didn't land. */
    const turnstile = await verifyTurnstile(turnstileToken, ip);
    if (!turnstile.ok) {
      console.warn('[newsletter] turnstile rejected:', turnstile.reason, { address });
      return NextResponse.json(
        { error: 'We could not verify that you are human. Please refresh and try again.' },
        { status: 403 }
      );
    }

    const apiKey = process.env.BEEHIIV_API_KEY;
    const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

    if (!apiKey || !publicationId) {
      console.error('Missing BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID');
      return NextResponse.json(
        { error: 'Newsletter service is not configured.' },
        { status: 500 }
      );
    }

    // Real attribution: this used to hardcode /engineer, which mislabelled every
    // signup from every other page. Unknown paths fall back to the bare domain.
    const path = KNOWN_SOURCES.has(source) ? source : '';
    const referringSite = `https://esy.com${path === '/' ? '' : path}`;

    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email: address,
          reactivate_existing: true,
          send_welcome_email: true,
          referring_site: referringSite,
          utm_source: 'esy_website',
          utm_medium: 'organic',
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('Beehiiv API error:', res.status, errorData);

      if (res.status === 409) {
        return NextResponse.json({ success: true, alreadySubscribed: true });
      }

      return NextResponse.json(
        { error: 'Subscription failed. Please try again.' },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
