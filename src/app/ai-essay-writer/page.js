import AIEssayWriterClient from './client';

export const metadata = {
  title: 'AI Essay Writer - Free Essay Generator | Esy',
  description: 'Write better essays faster with Esy\'s AI essay writer. Generate original, plagiarism-free essays on any topic. Perfect for students and professionals.',
  keywords: 'AI essay writer, essay generator, free essay writer, AI writing assistant, academic writing, essay help',
  openGraph: {
    title: 'AI Essay Writer - Free Essay Generator | Esy',
    description: 'Transform your writing with AI. Create original, well-structured essays in minutes.',
    type: 'website',
  },
}

export default function Page() {
  return <AIEssayWriterClient />;
}