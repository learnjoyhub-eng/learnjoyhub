import type { Metadata } from 'next';
import MathsOperationPractice from '../../../components/MathsOperationPractice';

export const metadata: Metadata = {
  title: 'Addition Practice',
  description: 'Practice 2-digit and 3-digit addition problems with instant scoring.',
  alternates: { canonical: '/maths/addition' },
};

export default function MathsAdditionPage() {
  return <MathsOperationPractice operation="addition" />;
}
