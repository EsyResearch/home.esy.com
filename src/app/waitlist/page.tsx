import WaitlistClient from "./client";

export const metadata = {
  title: "Join the waitlist — Esy",
  description:
    "Esy turns one brief into a coordinated campaign: research, angles, ad creative, copy at platform caps, and a landing page. Claim your place before it opens.",
  alternates: { canonical: "/waitlist/" },
  openGraph: {
    title: "Join the waitlist — Esy",
    description: "One brief in, a coordinated campaign package out. Claim your place before Esy opens.",
    url: "https://esy.com/waitlist/",
    siteName: "Esy",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Join the waitlist — Esy",
    description: "One brief in, a coordinated campaign package out. Claim your place before Esy opens.",
  },
};

export default function Page() {
  return <WaitlistClient />;
}
