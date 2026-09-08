import { NextResponse } from 'next/server';

import { EMAIL_REGEX, clientIp, detectBot } from '@/lib/botCheck';
import { verifyTurnstile } from '@/lib/turnstile';

/* The Make waitlist rides the existing Beehiiv publication rather than a second
   email service — one list, one set of credentials, and waitlist joiners are
   already the audience The Marketing Engineer is written for.
   
   Segmentation is the whole point of the route: intent and source are stamped
   at join time because neither can be reconstructed later. Intent goes into
   utm_campaign (always accepted, no publication setup) AND custom_fields (nicer
   to segment on in Beehiiv, but only if the fields exist) — see the retry
   below, which drops custom_fields rather than losing the subscriber. */

const INTENTS = new Set([
  'pinterest',
  'paid_social',
  'landing_pages',
  'full_campaigns',
  'agency',
]);

export async function POST(request) {
  try {
    const { email, name, company, intent, source, hp, elapsedMs, turnstileToken } = await request.json();

    if (!email || !EMAIL_REGEX.test(String(email).trim())) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    /* Same gates as the newsletter route, and needed just as badly: the bot run
       that filled this list submitted both forms, which is how newsletter-
       attributed subscribers ended up carrying waitlist custom fields.
       A rejection mimics success so the caller learns nothing. */
    const bot = detectBot({ hp, elapsedMs, ip: clientIp(request) });
    if (bot?.soft) {
      console.warn('[waitlist] soft-rejected:', bot.reason, { email });
      return NextResponse.json(
        { error: 'Too many signups from your network just now. Please try again in a few minutes.' },
        { status: 429 }
      );
    }
    if (bot) {
      console.warn('[waitlist] rejected as bot:', bot.reason, { email });
      return NextResponse.json({ success: true });
    }

    // Same ordering as the newsletter route: cheap local gates, then Turnstile.
    const turnstile = await verifyTurnstile(turnstileToken, clientIp(request));
    if (!turnstile.ok) {
      console.warn('[waitlist] turnstile rejected:', turnstile.reason, { email });
      return NextResponse.json(
        { error: 'We could not verify that you are human. Please refresh and try again.' },
        { status: 403 }
      );
    }

    // Unknown intents are recorded as "unspecified" rather than rejected — a
    // waitlist should never turn someone away over a segmentation field.
    const safeIntent = INTENTS.has(intent) ? intent : 'unspecified';
    const safeSource = typeof source === 'string' && source ? source.slice(0, 64) : 'waitlist_page';

    const apiKey = process.env.BEEHIIV_API_KEY;
    const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

    if (!apiKey || !publicationId) {
      console.error('Missing BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID');
      return NextResponse.json({ error: 'Waitlist is not configured.' }, { status: 500 });
    }

    const base = {
      email,
      reactivate_existing: true,
      send_welcome_email: true,
      referring_site: 'https://esy.com/waitlist',
      // utm_medium separates waitlist joiners from plain newsletter subscribers;
      // utm_campaign carries the intent so it segments without any setup.
      utm_source: 'esy_website',
      utm_medium: 'make_waitlist',
      utm_campaign: `intent_${safeIntent}`,
    };

    const customFields = [
      { name: 'Name', value: name || '' },
      { name: 'Company', value: company || '' },
      { name: 'Make Intent', value: safeIntent },
      { name: 'Signup Source', value: safeSource },
    ].filter((f) => f.value);

    async function subscribe(body) {
      return fetch(`https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify(body),
      });
    }

    let res = await subscribe({ ...base, custom_fields: customFields });

    // Beehiiv 400s when a custom field hasn't been created in the publication.
    // The subscriber matters more than the metadata, so retry without them —
    // intent still survives in utm_campaign.
    if (res.status === 400 && customFields.length) {
      console.warn('Beehiiv rejected custom_fields; retrying without them.');
      res = await subscribe(base);
    }

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('Beehiiv API error:', res.status, errorData);
      // Already on the list reads as success — re-submitting is the common path.
      if (res.status === 409) {
        return NextResponse.json({ success: true, alreadySubscribed: true });
      }
      return NextResponse.json({ error: 'Could not add you just then. Please try again.' }, { status: res.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist subscription error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
