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
  title: "Esy — Citation-First Research Platform",
  description: "Transform trusted sources into structured, defensible artifacts. Workflows for research synthesis, visual essays, and teaching materials. Citations first. Always.",
  keywords: [
    "citation-first research",
    "research platform",
    "academic research tools",
    "research synthesis",
    "visual essays",
    "source-verified research",
    "research workflows",
    "PDF research tools",
    "academic writing",
    "research artifacts"
  ],
  openGraph: {
    title: "Esy — Citation-First Research Platform",
    description: "Transform trusted sources into structured, defensible artifacts. Workflows for research synthesis, visual essays, and teaching materials.",
    type: "website",
    url: "https://esy.com",
    siteName: "Esy",
    locale: "en_US",
    images: [{
      url: "https://esy.com/og/homepage.png",
      width: 1200,
      height: 630,
      alt: "Esy — Citation-First Research Platform: Transform trusted sources into structured, defensible artifacts"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Esy — Citation-First Research Platform",
    description: "Transform trusted sources into structured, defensible artifacts. Workflows for research synthesis, visual essays, and teaching materials.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/homepage.png"],
  },
  alternates: {
    canonical: "https://esy.com",
  },
};

export default CitationFirstLandingPage;
