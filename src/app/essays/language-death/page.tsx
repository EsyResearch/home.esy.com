import type { Metadata } from 'next';
import LanguageDeathClient from './LanguageDeathClient';
import { ScrollytellingLayout } from "@/components/Scrollytelling";

export const metadata: Metadata = {
  title: 'Language Death: The Silence of Extinction | Esy',
  description: 'An immersive scrollytelling experience exploring language endangerment. 7,168 languages exist today—half will disappear by 2100. Every 14 days, a language dies forever.',
  keywords: [
    'language death',
    'endangered languages',
    'linguistic diversity',
    'language extinction',
    'language preservation',
    'UNESCO endangered languages',
    'dying languages',
    'language revitalization',
    'linguistic heritage',
    'scrollytelling'
  ],
  openGraph: {
    title: 'Language Death: The Silence of Extinction | Esy',
    description: 'An immersive scrollytelling experience exploring language endangerment. 7,168 languages exist today—half will disappear by 2100.',
    type: 'article',
    locale: 'en_US',
    siteName: 'Esy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Language Death: The Silence of Extinction',
    description: 'An immersive scrollytelling experience. Every 14 days, a language dies forever.',
  }
};

export default function LanguageDeathPage() {
  return (
    <ScrollytellingLayout
      title="Language Death: The Silence of Extinction"
      description="7,168 languages exist today—half will disappear by 2100. Every 14 days, a language dies forever."
      readTime="9 min"
      storyId="language-death"
    >
      <LanguageDeathClient />
    </ScrollytellingLayout>
  );
}

