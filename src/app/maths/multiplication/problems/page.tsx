import type { Metadata } from 'next';
import MathsProblemsPractice from '../../../../components/MathsProblemsPractice';

export const metadata: Metadata = {
  title: 'Multiplication Problems',
  description: '2-digit by 1-digit multiplication problem-solving practice.',
  alternates: { canonical: '/maths/multiplication/problems' },
};

export default function MathsMultiplicationProblemsPage() {
  return <MathsProblemsPractice operation="multiplication" />;
}
