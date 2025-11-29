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
      {/* Background effects - fixed position below nav */}
      <div 
        className="fixed inset-x-0 bottom-0 pointer-events-none overflow-hidden"
        style={{ top: '73px' }}
      >
        {/* Gradient orbs - signature Esy purple→pink at 135deg */}
        <div 
          className="absolute -top-32 left-1/4 w-[700px] h-[700px] rounded-full"
          style={{ 
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div 
          className="absolute -bottom-32 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{ 
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
            opacity: 0.5,
          }}
        />
      </div>

      {/* Main layout with sidebar */}
      <div className="relative flex min-h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <DocsSidebar />

        {/* Content area */}
        <main className="flex-1 min-w-0">
          <div className="px-6 sm:px-8 lg:px-12 py-10 max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
