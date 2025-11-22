import { useState } from 'react';
import DifficultySelector from '../components/DifficultySelector';
import MathWorksheet from './MathWorksheet';
import TableSelector from '../components/TableSelector';
import MultiplicationWorksheet from '../components/MultiplicationWorksheet';
import MathOperationTypeSelector from '../components/MathOperationTypeSelector';
import MultiDivWorksheet from '../components/MultiDivWorksheet';
import { trackComponentAccess } from '../utils/analytics';
import type { MathsSubtopic } from '../types';
import './MathsSubject.css';

type OperationType = 'addition' | 'subtraction';
type MathOperation = 'multiplication' | 'division';
type OperationMode = 'tables' | 'problems';
type DifficultyLevel = '2digit' | '3digit';
type MathsPage = 'menu' | 'difficulty' | 'worksheet' | 'operationTypeSelector' | 'tableSelector' | 'multiplicationWorksheet' | 'multiDivWorksheet';

interface MathsSubjectProps {
  onBack: () => void;
}

const MathsSubject = ({ onBack }: MathsSubjectProps) => {
  const [currentPage, setCurrentPage] = useState<MathsPage>('menu');
  const [selectedOperation, setSelectedOperation] = useState<OperationType | null>(null);
  const [selectedMathOperation, setSelectedMathOperation] = useState<MathOperation | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | null>(null);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  const handleSelectOperation = (operation: OperationType) => {
    setSelectedOperation(operation);
    setCurrentPage('difficulty');
  };

  const handleSelectDifficulty = (difficulty: DifficultyLevel) => {
    setSelectedDifficulty(difficulty);
    setCurrentPage('worksheet');
  };

  const handleBackFromDifficulty = () => {
    setCurrentPage('menu');
    setSelectedOperation(null);
  };

  const handleBackFromWorksheet = () => {
    setCurrentPage('menu');
    setSelectedOperation(null);
    setSelectedDifficulty(null);
  };

  const handleSelectMultiplicationOrDivision = (operation: MathOperation) => {
    setSelectedMathOperation(operation);
    setCurrentPage('operationTypeSelector');
  };

  const handleSelectMode = (mode: OperationMode) => {
    if (mode === 'tables') {
      setCurrentPage('tableSelector');
    } else {
      setCurrentPage('multiDivWorksheet');
    }
  };

  const handleBackFromOperationTypeSelector = () => {
    setCurrentPage('menu');
    setSelectedMathOperation(null);
  };

  const handleSelectTable = (table: number) => {
    setSelectedTable(table);
    setCurrentPage('multiplicationWorksheet');
  };

  const handleBackFromTableSelector = () => {
    setCurrentPage('operationTypeSelector');
  };

  const handleBackFromMultiplicationWorksheet = () => {
    setCurrentPage('tableSelector');
    setSelectedTable(null);
  };

  const handleBackFromMultiDivWorksheet = () => {
    setCurrentPage('menu');
    setSelectedMathOperation(null);
  };

  if (currentPage === 'difficulty' && selectedOperation) {
    return (
      <DifficultySelector
        operation={selectedOperation}
        onSelectDifficulty={handleSelectDifficulty}
        onBack={handleBackFromDifficulty}
      />
    );
  }

  if (currentPage === 'worksheet' && selectedOperation && selectedDifficulty) {
    return (
      <MathWorksheet
        operation={selectedOperation}
        difficulty={selectedDifficulty}
        onBack={handleBackFromWorksheet}
      />
    );
  }

  if (currentPage === 'operationTypeSelector' && selectedMathOperation) {
    return (
      <MathOperationTypeSelector
        operation={selectedMathOperation}
        onSelectMode={handleSelectMode}
        onBack={handleBackFromOperationTypeSelector}
      />
    );
  }

  if (currentPage === 'tableSelector') {
    return (
      <TableSelector
        onSelectTable={handleSelectTable}
        onBack={handleBackFromTableSelector}
      />
    );
  }

  if (currentPage === 'multiplicationWorksheet' && selectedTable) {
    return (
      <MultiplicationWorksheet
        selectedTable={selectedTable}
        onBack={handleBackFromMultiplicationWorksheet}
      />
    );
  }

  if (currentPage === 'multiDivWorksheet' && selectedMathOperation) {
    return (
      <MultiDivWorksheet
        operation={selectedMathOperation}
        onBack={handleBackFromMultiDivWorksheet}
      />
    );
  }

  // Menu page
  const topics: { id: MathsSubtopic; title: string; icon: string; description: string; color: string }[] = [
    {
      id: 'addition',
      title: 'Addition',
      icon: '➕',
      description: 'Learn to add numbers and build counting skills',
      color: 'addition-topic',
    },
    {
      id: 'subtraction',
      title: 'Subtraction',
      icon: '➖',
      description: 'Master subtraction and develop problem-solving skills',
      color: 'subtraction-topic',
    },
    {
      id: 'multiplication',
      title: 'Multiplication',
      icon: '✖️',
      description: 'Understand multiplication tables and patterns',
      color: 'multiplication-topic',
    },
    {
      id: 'division',
      title: 'Division',
      icon: '➗',
      description: 'Learn division concepts and long division',
      color: 'division-topic',
    },
  ];

  return (
    <div className="maths-subject-container">
      <div className="maths-subject-content">
        <button className="back-button-maths" onClick={onBack}>
          ← Back to Subjects
        </button>
        
        <div className="subject-header">
          <h1>🔢 Maths - Arithmetic</h1>
          <p>Build strong mathematical foundations with interactive practice</p>
        </div>

        <div className="maths-topics">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className={`topic-card ${topic.color}`}
              onClick={() => {
                trackComponentAccess('Maths Subject', topic.title);
                if (topic.id === 'addition' || topic.id === 'subtraction') {
                  handleSelectOperation(topic.id);
                } else if (topic.id === 'multiplication' || topic.id === 'division') {
                  handleSelectMultiplicationOrDivision(topic.id);
                }
              }}
            >
              <div className="topic-icon">{topic.icon}</div>
              <h2>{topic.title}</h2>
              <p>{topic.description}</p>
              <button className="start-button">Start Practice →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MathsSubject;
