import type { Metadata } from 'next';
import MathsProblemsPractice from '../../../../components/MathsProblemsPractice';

export const metadata: Metadata = {
  title: 'Division Problems',
  description: '2-digit by 1-digit division problem-solving practice.',
  alternates: { canonical: '/maths/division/problems' },
};

export default function MathsDivisionProblemsPage() {
  return <MathsProblemsPractice operation="division" />;
}
