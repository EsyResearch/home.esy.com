import { Metadata } from 'next';
import CoursesListClient from './CoursesListClient';

export const metadata: Metadata = {
  title: 'Courses | Esy',
  description: 'Learn to create with AI: build agents, design agentic workflows, and ship at scale. Each course pairs a video walkthrough with a runnable template — finish every lesson with a real artifact you can run.',
  openGraph: {
    title: 'Courses | Esy',
    description: 'Learn to create with AI: build agents, design agentic workflows, and ship at scale. Each course pairs a walkthrough with a runnable template.',
    type: 'website',
  },
};

export default function CoursesPage() {
  return <CoursesListClient />;
}
