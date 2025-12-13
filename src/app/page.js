import GalleryHomePage from "../components/Home/GalleryHomePage";

/**
 * Homepage - Gallery-First Design
 * 
 * Strategic positioning: Visual essays as primary value, SaaS secondary.
 * This page leads with authority and trust, not product conversion.
 * 
 * SEO Strategy:
 * - Title focuses on "visual essays" not "AI essay writer"
 * - Description emphasizes research and storytelling
 * - Avoids generic SaaS positioning that competes with 1000s of tools
 * - Unique positioning: "essays that unfold"
 * 
 * @see /orchestration/agents/engineering/seo-specialist-expert.md
 */

export const metadata = {
  title: "Esy — Visual Essays That Unfold",
  description: "Cinematic, research-driven essays exploring history, language, power, and ideas. Interactive storytelling that brings knowledge to life.",
  keywords: [
    "visual essays",
    "interactive essays", 
    "scrollytelling",
    "history essays",
    "research essays",
    "educational content",
    "narrative journalism"
  ],
  openGraph: {
    title: "Esy — Visual Essays That Unfold",
    description: "Cinematic, research-driven essays exploring history, language, power, and ideas.",
    type: "website",
    url: "https://esy.com",
    siteName: "Esy",
    locale: "en_US",
    images: [{
      url: "https://esy.com/og/homepage.png",
      width: 1200,
      height: 630,
      alt: "Esy — Visual Essays That Unfold: Cinematic, research-driven essays exploring history, language, power, and ideas"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Esy — Visual Essays That Unfold",
    description: "Cinematic, research-driven essays exploring history, language, power, and ideas.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/homepage.png"],
  },
  alternates: {
    canonical: "https://esy.com",
  },
};

export default GalleryHomePage;
