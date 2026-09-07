"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import LightHeader from "@/components/LightHeader/LightHeader";

import "./waitlist.css";

/* Intent is the one field worth the extra friction. It tells us which channel
   to open first and which content the joiner actually wants — and unlike an
   email, it can never be reconstructed after the fact. Values must match the
   INTENTS set in /api/waitlist/subscribe. */
const INTENTS = [
  { value: "full_campaigns", label: "Full campaigns — creative, copy, and pages together" },
  { value: "pinterest", label: "Pinterest and organic social" },
  { value: "paid_social", label: "Ad creative for paid channels" },
  { value: "landing_pages", label: "SEO and landing pages" },
  { value: "agency", label: "Producing for clients (agency)" },
];

export default function WaitlistClient() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [intent, setIntent] = useState("full_campaigns");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [joined, setJoined] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      // Which CTA sent them — stamped now because acquisition source is the
      // other thing that can never be reconstructed later.
      const source =
        new URLSearchParams(window.location.search).get("src") || "waitlist_page";
      const res = await fetch("/api/waitlist/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, company, intent, source }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not add you just then.");
      }
      setJoined(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setBusy(false);
    }
  }

  return (
    <div className="wl">
      <LightHeader />
      <main className="wl-main">
        {joined ? (
          <>
            <div className="wl-done-mark" aria-hidden>
              <Check size={24} strokeWidth={2.5} />
            </div>
            <h1 className="wl-title">You&apos;re on the list</h1>
            <p className="wl-lede">
              We saved your place under <strong>{email}</strong>. Esy Make is still in production — we&apos;ll email you
              the moment it opens.
            </p>
            <p className="wl-fineprint">
              In the meantime you&apos;ll get The Marketing Engineer: how we run production on our own products, broken
              down step by step. Unsubscribe any time.
            </p>
          </>
        ) : (
          <>
            <p className="wl-eyebrow">Opening soon</p>
            <h1 className="wl-title">Put marketing production on autopilot.</h1>
            <p className="wl-lede">
              One brief in — research, angles, ad creative, copy at platform caps, and a landing page out, all sharing
              one brand. Esy Make isn&apos;t open to everyone yet. Claim your place and we&apos;ll open your studio
              first.
            </p>

            <form className="wl-form" onSubmit={submit}>
              <div className="wl-field">
                <label className="wl-label" htmlFor="wl-email">Email</label>
                <input id="wl-email" className="wl-input" type="email" required autoComplete="email"
                  value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="wl-row">
                <div className="wl-field">
                  <label className="wl-label" htmlFor="wl-name">
                    Your name <span className="wl-optional">(optional)</span>
                  </label>
                  <input id="wl-name" className="wl-input" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="wl-field">
                  <label className="wl-label" htmlFor="wl-company">
                    Company <span className="wl-optional">(optional)</span>
                  </label>
                  <input id="wl-company" className="wl-input" value={company}
                    onChange={(e) => setCompany(e.target.value)} />
                </div>
              </div>

              <div className="wl-field">
                <label className="wl-label" htmlFor="wl-intent">What do you most want produced?</label>
                <select id="wl-intent" className="wl-select" value={intent} onChange={(e) => setIntent(e.target.value)}>
                  {INTENTS.map((i) => (
                    <option key={i.value} value={i.value}>{i.label}</option>
                  ))}
                </select>
              </div>

              {error && <p className="wl-error" role="alert">{error}</p>}

              <button className="wl-submit" type="submit" disabled={busy}>
                {busy ? "Adding you…" : "Join the waitlist"}
              </button>
              <p className="wl-fineprint">
                We&apos;ll email you when your studio opens. Until then you&apos;ll get The Marketing Engineer — how we
                run production on our own products. Unsubscribe any time.
              </p>
            </form>
          </>
        )}
      </main>
    </div>
  );
}
