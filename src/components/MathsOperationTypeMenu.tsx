'use client';

import { useRouter } from 'next/navigation';
import MathOperationTypeSelector from './MathOperationTypeSelector';

type MathOperation = 'multiplication' | 'division';
type OperationMode = 'tables' | 'problems';

interface MathsOperationTypeMenuProps {
  operation: MathOperation;
}

const MathsOperationTypeMenu = ({ operation }: MathsOperationTypeMenuProps) => {
  const router = useRouter();

  const handleSelectMode = (mode: OperationMode) => {
    if (mode === 'tables') {
      router.push(`/maths/tables?from=${operation}`);
    } else {
      router.push(`/maths/${operation}/problems`);
    }
  };

  return (
    <MathOperationTypeSelector
      operation={operation}
      onSelectMode={handleSelectMode}
      onBack={() => router.push('/maths')}
    />
  );
};

export default MathsOperationTypeMenu;
