import type { Metadata } from 'next';
import { Suspense } from 'react';
import MathsTablesMenu from '../../../components/MathsTablesMenu';

export const metadata: Metadata = {
  title: 'Multiplication Tables',
  description: 'Choose a multiplication table from 1 to 20 to practice.',
  alternates: { canonical: '/maths/tables' },
};

export default function MathsTablesPage() {
  return (
    <Suspense>
      <MathsTablesMenu />
    </Suspense>
  );
}
