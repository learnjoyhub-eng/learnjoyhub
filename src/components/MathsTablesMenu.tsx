'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import TableSelector from './TableSelector';

const MathsTablesMenu = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') === 'division' ? 'division' : 'multiplication';

  return (
    <TableSelector
      onSelectTable={(table) => router.push(`/maths/tables/${table}?from=${from}`)}
      onBack={() => router.push(`/maths/${from}`)}
    />
  );
};

export default MathsTablesMenu;
