import { Metadata } from 'next';
import TestEssayClient from './TestEssayClient';

export const metadata: Metadata = {
  title: 'Test Essay',
  description: 'Missing the wrapper',
};

export default function Page() {
  return <TestEssayClient />;
}
