import type { Metadata } from 'next';
import MathsOperationTypeMenu from '../../../components/MathsOperationTypeMenu';

export const metadata: Metadata = {
  title: 'Multiplication Practice',
  description: 'Practice multiplication tables and 2-digit multiplication problems.',
  alternates: { canonical: '/maths/multiplication' },
};

export default function MathsMultiplicationPage() {
  return <MathsOperationTypeMenu operation="multiplication" />;
}
