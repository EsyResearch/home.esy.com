import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Home/navigation";
import Footer from "@/components/Home/footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleTagManager, { GoogleTagManagerBody } from "@/components/GoogleTagManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Esy: AI Research Assistant",
  description: "Write your next paper with Esy, an AI assistant that learns your writing style to create original, authentic essays.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
        <GoogleTagManager />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleTagManagerBody />
        <Navigation />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
