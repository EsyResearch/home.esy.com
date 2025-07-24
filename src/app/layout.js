import { Geist, Geist_Mono, Newsreader, Inter, Literata } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Home/navigation";
import Footer from "@/components/Home/footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleTagManager, { GoogleTagManagerBody } from "@/components/GoogleTagManager";
import EsyCookieNotice from "@/components/CookieNotice";
import ConditionalNavigation from "@/components/ConditionalNavigation";
import ConditionalFooter from "@/components/ConditionalFooter";

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
  title: "Esy: AI Research Assistant",
  description: "Write your next paper with Esy, an AI assistant that learns your writing style to create original, authentic essays.",
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
        <ConditionalNavigation />
        <main>
          {children}
        </main>
        <ConditionalFooter />
        <EsyCookieNotice />
      </body>
    </html>
  );
}
