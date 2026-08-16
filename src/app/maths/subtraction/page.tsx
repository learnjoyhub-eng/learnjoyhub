import type { Metadata } from 'next';
import MathsOperationPractice from '../../../components/MathsOperationPractice';

export const metadata: Metadata = {
  title: 'Subtraction Practice',
  description: 'Practice 2-digit and 3-digit subtraction problems with instant scoring.',
  alternates: { canonical: '/maths/subtraction' },
};

export default function MathsSubtractionPage() {
  return <MathsOperationPractice operation="subtraction" />;
}
