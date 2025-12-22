import { Metadata } from 'next';
import WorkflowsClient from './WorkflowsClient';

export const metadata: Metadata = {
  title: 'Workflow Demonstrations | Esy',
  description: 'Run demo workflows to see how Esy transforms intent into artifacts. Experience the pipeline: Intent → Research → Synthesis → Artifact.',
  openGraph: {
    title: 'Workflow Demonstrations | Esy',
    description: 'Run demo workflows to see how Esy transforms intent into artifacts.',
    type: 'website',
  },
};

export default function WorkflowsPage() {
  return <WorkflowsClient />;
}
