'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import MultiplicationWorksheet from './MultiplicationWorksheet';

interface MathsTableWorksheetProps {
  table: number;
}

const MathsTableWorksheet = ({ table }: MathsTableWorksheetProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') === 'division' ? 'division' : 'multiplication';

  return (
    <MultiplicationWorksheet
      selectedTable={table}
      onBack={() => router.push(`/maths/tables?from=${from}`)}
    />
  );
};

export default MathsTableWorksheet;
