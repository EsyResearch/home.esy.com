import SchoolClient from './client';

export const metadata = {
  title: 'Esy School - Free Academic Resources & Study Guides',
  description: 'Access free study guides, academic resources, and educational content. Learn writing techniques, research methods, and improve your academic skills.',
  keywords: 'study guides, academic resources, educational content, learning resources, writing guides, research methods',
  openGraph: {
    title: 'Esy School - Your Academic Learning Hub',
    description: 'Master academic writing and research with our comprehensive educational resources.',
    type: 'website',
  },
}

export default function Page() {
  return <SchoolClient />;
}