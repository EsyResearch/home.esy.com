import { Metadata } from 'next';
import CoursesListClient from './CoursesListClient';

export const metadata: Metadata = {
  title: 'Video Courses | Esy School',
  description: 'Master AI-powered research workflows with Esy\'s video courses. Learn Claude Code, ChatGPT for research, infographic creation, and more.',
  openGraph: {
    title: 'Video Courses | Esy School',
    description: 'Master AI-powered research workflows with Esy\'s video courses.',
    type: 'website',
  },
};

export default function CoursesPage() {
  return <CoursesListClient />;
}
