import { Metadata } from "next";
import { DocsSidebar } from "@/components/docs";

export const metadata: Metadata = {
  title: {
    template: "%s | Esy Docs",
    default: "Documentation | Esy",
  },
  description:
    "Learn how to use Esy's agentic research tools, prompt engineering, and AI-powered writing workflows.",
  openGraph: {
    title: "Esy Documentation",
    description:
      "Master AI-powered research and writing with Esy's comprehensive documentation.",
    type: "website",
    siteName: "Esy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Esy Documentation",
    description:
      "Master AI-powered research and writing with Esy's comprehensive documentation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundColor: '#18181b',
        paddingTop: '73px',
      }}
    >
      {/* Sophisticated Background Effects - Layered for Depth */}
      <div 
        className="fixed inset-x-0 bottom-0 pointer-events-none overflow-hidden"
        style={{ top: '73px', zIndex: 0 }}
      >
        {/* Primary Ambient Glow - Top Right */}
        <div 
          style={{
            position: 'absolute',
            width: '800px',
            height: '800px',
            top: '-200px',
            right: '10%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.04) 0%, transparent 70%)',
            filter: 'blur(100px)',
            opacity: 0.8,
          }}
        />
        
        {/* Secondary Glow - Bottom Left */}
        <div 
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            bottom: '-100px',
            left: '5%',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.03) 0%, transparent 70%)',
            filter: 'blur(80px)',
            opacity: 0.6,
          }}
        />

        {/* Tertiary Accent - Middle */}
        <div 
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            top: '40%',
            right: '30%',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.02) 0%, transparent 70%)',
            filter: 'blur(60px)',
            opacity: 0.4,
          }}
        />
        
        {/* Subtle Grid Texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.015) 1px, transparent 0)',
            backgroundSize: '48px 48px',
            opacity: 0.5,
          }}
        />

        {/* Gradient Overlay for Cohesion */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(24, 24, 27, 0.3) 0%, rgba(24, 24, 27, 0.1) 40%, transparent 100%)',
          }}
        />
      </div>

      {/* Main Content - Elevated Above Background */}
      <div className="relative flex min-h-[calc(100vh-73px)]" style={{ zIndex: 1 }}>
        {/* Sidebar */}
        <DocsSidebar />

        {/* Content Area - Generous Spacing */}
        <main className="flex-1 min-w-0">
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem)',
            }}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
