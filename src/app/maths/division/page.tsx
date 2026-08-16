import type { Metadata } from 'next';
import MathsOperationTypeMenu from '../../../components/MathsOperationTypeMenu';

export const metadata: Metadata = {
  title: 'Division Practice',
  description: 'Practice division tables and 2-digit division problems.',
  alternates: { canonical: '/maths/division' },
};

export default function MathsDivisionPage() {
  return <MathsOperationTypeMenu operation="division" />;
}
