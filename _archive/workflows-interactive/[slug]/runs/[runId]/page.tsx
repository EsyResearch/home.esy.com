import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getWorkflowBySlug, workflows } from '@/data/workflows';
import RunReplayClient from './RunReplayClient';

interface Props {
  params: Promise<{ slug: string; runId: string }>;
}

export async function generateStaticParams() {
  // Generate example run IDs for each workflow
  return workflows.flatMap((workflow) => [
    { slug: workflow.slug, runId: 'example-run-1' },
    { slug: workflow.slug, runId: 'example-run-2' },
  ]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, runId } = await params;
  const workflow = getWorkflowBySlug(slug);

  if (!workflow) {
    return {
      title: 'Run Not Found | Esy',
    };
  }

  return {
    title: `Run ${runId.slice(0, 8)} | ${workflow.title} | Esy`,
    description: `Replay of ${workflow.title} workflow run. See the complete execution timeline and generated artifact.`,
    openGraph: {
      title: `${workflow.title} Run Replay | Esy`,
      description: `View the execution details and artifact from this ${workflow.title} workflow run.`,
      type: 'website',
    },
  };
}

export default async function RunReplayPage({ params }: Props) {
  const { slug, runId } = await params;
  const workflow = getWorkflowBySlug(slug);

  if (!workflow) {
    notFound();
  }

  return <RunReplayClient workflow={workflow} runId={runId} />;
}
