'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DifficultySelector from './DifficultySelector';
import MathWorksheet from '../screens/MathWorksheet';

type OperationType = 'addition' | 'subtraction';
type DifficultyLevel = '2digit' | '3digit';

interface MathsOperationPracticeProps {
  operation: OperationType;
}

const MathsOperationPractice = ({ operation }: MathsOperationPracticeProps) => {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<DifficultyLevel | null>(null);

  if (difficulty) {
    return (
      <MathWorksheet
        operation={operation}
        difficulty={difficulty}
        onBack={() => setDifficulty(null)}
      />
    );
  }

  return (
    <DifficultySelector
      operation={operation}
      onSelectDifficulty={setDifficulty}
      onBack={() => router.push('/maths')}
    />
  );
};

export default MathsOperationPractice;
