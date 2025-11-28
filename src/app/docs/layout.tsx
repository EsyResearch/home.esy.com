import { Metadata } from "next";
import { DocsSidebar } from "@/components/docs";
import { elevatedDarkTheme } from "@/lib/theme";

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
        backgroundColor: elevatedDarkTheme.bg,
        paddingTop: '73px', // Account for fixed nav height
      }}
    >
      {/* Background effects matching Esy brand */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ top: '73px' }}>
        {/* Gradient orbs - signature Esy purple→pink */}
        <div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[128px] opacity-30"
          style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[128px] opacity-20"
          style={{ background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)' }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Main layout with sidebar */}
      <div className="relative flex">
        {/* Sidebar */}
        <DocsSidebar />

        {/* Content area */}
        <div className="flex-1 min-w-0">
          <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
