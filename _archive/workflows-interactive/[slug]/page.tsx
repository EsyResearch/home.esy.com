import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getWorkflowBySlug, workflows } from '@/data/workflows';
import WorkflowDetailClient from './WorkflowDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return workflows.map((workflow) => ({
    slug: workflow.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const workflow = getWorkflowBySlug(slug);

  if (!workflow) {
    return {
      title: 'Workflow Not Found | Esy',
    };
  }

  return {
    title: `${workflow.title} | Workflow Demo | Esy`,
    description: workflow.description,
    openGraph: {
      title: `${workflow.title} | Esy Workflow Demo`,
      description: workflow.description,
      type: 'website',
    },
  };
}

export default async function WorkflowDetailPage({ params }: Props) {
  const { slug } = await params;
  const workflow = getWorkflowBySlug(slug);

  if (!workflow) {
    notFound();
  }

  return <WorkflowDetailClient workflow={workflow} />;
}
