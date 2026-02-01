import CitationFirstLandingPage from "../components/Home/CitationFirstLandingPage";

/**
 * Homepage - Citation-First Research Platform
 * 
 * Strategic positioning: Esy as a workflow-based research platform
 * where citations come first and artifacts are defensible.
 * 
 * Key messaging:
 * - "Citation-First Research" as a methodology
 * - Workflows as the product (not visual essays)
 * - Visual essays as proof of the method
 * - Trust, rigor, and defensibility as core values
 * 
 * SEO Strategy:
 * - Title focuses on research platform positioning
 * - Description emphasizes workflow-based, citation-first approach
 * - Unique positioning: research platform, not AI essay generator
 * 
 * @see /orchestration/agents/engineering/seo-specialist-expert.md
 */

export const metadata = {
  title: "Esy — Citation-First Research Workflows",
  description: "Esy is a citation-first research platform that turns trusted sources into structured, reliable, and auditable artifacts — essays, visuals, and learning materials.",
  keywords: [
    "citation-first research",
    "research platform",
    "research workflows",
    "visual essays",
    "auditable artifacts",
    "academic research",
    "research synthesis",
    "reliable research",
    "learning materials"
  ],
  openGraph: {
    title: "Esy — Citation-First Research Workflows",
    description: "Esy is a citation-first research platform that turns trusted sources into structured, reliable, and auditable artifacts — essays, visuals, and learning materials.",
    type: "website",
    url: "https://esy.com",
    siteName: "Esy",
    locale: "en_US",
    images: [{
      url: "https://esy.com/og/homepage.png",
      width: 1200,
      height: 630,
      alt: "Esy — Citation-First Research Workflows"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Esy — Citation-First Research Workflows",
    description: "Esy is a citation-first research platform that turns trusted sources into structured, reliable, and auditable artifacts — essays, visuals, and learning materials.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/homepage.png"],
  },
  alternates: {
    canonical: "https://esy.com",
  },
};

export default CitationFirstLandingPage;
