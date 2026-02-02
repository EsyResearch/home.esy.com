import IntelligenceCircuitryPage from '@/components/IntelligenceCircuitry/IntelligenceCircuitryPage';

export const metadata = {
  title: 'Esy — Template-Driven Research Workflows',
  description: 'Choose a template, provide structured intake, and get publish-ready artifacts. Esy runs quality gates so every claim is sourced, every structure is sound.',
  keywords: 'research templates, AI writing, citation-first, defensible artifacts, visual essays, academic writing',
  openGraph: {
    title: 'Esy — Template-Driven Research Workflows',
    description: 'Choose a template, provide structured intake, and get publish-ready artifacts.',
    url: 'https://esy.com',
    siteName: 'Esy',
    locale: 'en_US',
    type: 'website',
  },
};

export default function HomepageV2() {
  return <IntelligenceCircuitryPage />;
}
