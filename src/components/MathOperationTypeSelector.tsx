import { useState } from 'react';
import './MathOperationTypeSelector.css';

type MathOperation = 'multiplication' | 'division';
type OperationMode = 'tables' | 'problems';

interface MathOperationTypeSelectorProps {
  operation: MathOperation;
  onSelectMode: (mode: OperationMode) => void;
  onBack: () => void;
}

const MathOperationTypeSelector = ({ operation, onSelectMode, onBack }: MathOperationTypeSelectorProps) => {
  const [hoveredMode, setHoveredMode] = useState<OperationMode | null>(null);

  const operationTitle = operation === 'multiplication' ? '✖️ Multiplication' : '➗ Division';
  const operationSymbol = operation === 'multiplication' ? '×' : '÷';

  return (
    <div className="operation-type-selector-container">
      <button className="back-button-operation-type" onClick={onBack}>
        ← Back to Maths
      </button>
      
      <div className="operation-type-selector-content">
        <h1>{operationTitle}</h1>
        <p>Choose your practice mode</p>

        <div className="operation-type-cards">
          <div
            className={`operation-type-card ${hoveredMode === 'tables' ? 'hovered' : ''}`}
            onClick={() => onSelectMode('tables')}
            onMouseEnter={() => setHoveredMode('tables')}
            onMouseLeave={() => setHoveredMode(null)}
          >
            <div className="operation-type-icon">📊</div>
            <h2>Tables Practice</h2>
            <p>Learn {operation} tables from 1 to 10</p>
            <div className="example">Example: 5 {operationSymbol} 6 = ?</div>
            <button className="start-button">Start</button>
          </div>

          <div
            className={`operation-type-card ${hoveredMode === 'problems' ? 'hovered' : ''}`}
            onClick={() => onSelectMode('problems')}
            onMouseEnter={() => setHoveredMode('problems')}
            onMouseLeave={() => setHoveredMode(null)}
          >
            <div className="operation-type-icon">🎯</div>
            <h2>Problem Solving</h2>
            <p>2-digit number {operationSymbol} 1-digit number</p>
            <div className="example">Example: 48 {operationSymbol} 6 = ?</div>
            <button className="start-button">Start</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathOperationTypeSelector;
