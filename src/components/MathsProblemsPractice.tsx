'use client';

import { useRouter } from 'next/navigation';
import MultiDivWorksheet from './MultiDivWorksheet';

type OperationType = 'multiplication' | 'division';

interface MathsProblemsPracticeProps {
  operation: OperationType;
}

const MathsProblemsPractice = ({ operation }: MathsProblemsPracticeProps) => {
  const router = useRouter();

  return (
    <MultiDivWorksheet
      operation={operation}
      onBack={() => router.push(`/maths/${operation}`)}
    />
  );
};

export default MathsProblemsPractice;
