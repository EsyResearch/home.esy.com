import { Metadata } from 'next';
import { ArtifactDetailWrapper } from '@/components/ArtifactDetail';
import TestEssayClient from './TestEssayClient';

const ESSAY_META = {
  title: 'Test Essay',
  slug: 'test-fixture',
  number: '99',
  category: 'Science',
};

export const metadata: Metadata = {
  title: ESSAY_META.title,
  description: 'A test essay for regression testing',
};

export default function Page() {
  return (
    <ArtifactDetailWrapper meta={ESSAY_META}>
      <TestEssayClient />
    </ArtifactDetailWrapper>
  );
}
