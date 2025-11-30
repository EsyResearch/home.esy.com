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
      style={{ 
        minHeight: '100vh',
        backgroundColor: '#18181b',
        paddingTop: '73px',
      }}
    >
      {/* Main Content */}
      <div style={{ 
        display: 'flex',
        minHeight: 'calc(100vh - 73px)',
        position: 'relative'
      }}>
        {/* Sidebar */}
        <DocsSidebar />

        {/* Content Area */}
        <main style={{ 
          flex: 1,
          minWidth: 0,
          position: 'relative'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}
