import type { Metadata } from 'next';
import MathsMenu from '../../components/MathsMenu';

export const metadata: Metadata = {
  title: 'Maths Practice',
  description: 'Practice addition, subtraction, multiplication, and division with interactive worksheets for 2nd Standard ICSE students.',
  alternates: { canonical: '/maths' },
};

export default function MathsPage() {
  return <MathsMenu />;
}
