import AIWritingToolsClient from './client';

export const metadata = {
  title: 'AI Writing Tools - Free Writing Assistant Suite | Esy',
  description: 'Access powerful AI writing tools for essays, research papers, and creative writing. Grammar checker, paraphraser, summarizer, and more - all free.',
  keywords: 'AI writing tools, writing assistant, grammar checker, paraphrasing tool, essay helper, AI writer',
  openGraph: {
    title: 'AI Writing Tools - Your Complete Writing Suite | Esy',
    description: 'Transform your writing with our comprehensive suite of AI-powered writing tools.',
    type: 'website',
  },
}

export default function Page() {
  return <AIWritingToolsClient />;
}