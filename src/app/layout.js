import { Geist, Geist_Mono, Newsreader, Inter, Literata } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Home/navigation";
import Footer from "@/components/Home/footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleTagManager, { GoogleTagManagerBody } from "@/components/GoogleTagManager";
import MicrosoftClarity from "@/components/MicrosoftClarity";
import EsyCookieNotice from "@/components/CookieNotice";
import ConditionalNavigation from "@/components/ConditionalNavigation";
import ConditionalFooter from "@/components/ConditionalFooter";
import { HeaderSearchProvider } from "@/contexts/HeaderSearchContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
});

// Check if QA environment (set via NEXT_PUBLIC_IS_QA=true)
const isQA = process.env.NEXT_PUBLIC_IS_QA === 'true';

export const metadata = {
  title: {
    template: '%s | Esy',
    default: 'Esy — Citation-First Research Workflows',
  },
  description: "Esy is a citation-first research platform that turns trusted sources into structured, reliable, and auditable artifacts — essays, visuals, and learning materials.",
  keywords: 'citation-first research, research platform, research workflows, visual essays, auditable artifacts, academic research, research synthesis',
  metadataBase: new URL('https://esy.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Esy — Citation-First Research Workflows',
    description: 'Esy is a citation-first research platform that turns trusted sources into structured, reliable, and auditable artifacts — essays, visuals, and learning materials.',
    url: 'https://esy.com',
    siteName: 'Esy',
    locale: 'en_US',
    type: 'website',
  },
  // Block crawlers and AI bots on QA environment
  ...(isQA && {
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'none',
        'max-snippet': -1,
      },
    },
  }),
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
        <GoogleTagManager />
        <MicrosoftClarity />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} ${inter.variable} ${literata.variable} antialiased`}
      >
        <GoogleTagManagerBody />
        <HeaderSearchProvider>
          <ConditionalNavigation />
          <main>
            {children}
          </main>
          <ConditionalFooter />
        </HeaderSearchProvider>
        <EsyCookieNotice />
      </body>
    </html>
  );
}
