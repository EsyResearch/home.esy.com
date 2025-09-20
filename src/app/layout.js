import { Geist, Geist_Mono, Newsreader, Inter, Literata } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Home/navigation";
import Footer from "@/components/Home/footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleTagManager, { GoogleTagManagerBody } from "@/components/GoogleTagManager";
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

export const metadata = {
  title: {
    template: '%s | Esy',
    default: 'Esy - AI Essay Writer & Research Assistant',
  },
  description: "Write better essays with Esy's AI assistant. Generate original, authentic academic papers that match your writing style. Free essay writer for students.",
  keywords: 'AI essay writer, research assistant, academic writing, essay generator, AI writing tool',
  metadataBase: new URL('https://esy.com'),
  openGraph: {
    title: 'Esy - AI Essay Writer & Research Assistant',
    description: 'Transform your academic writing with AI that learns your style.',
    url: 'https://esy.com',
    siteName: 'Esy',
    locale: 'en_US',
    type: 'website',
  },
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
