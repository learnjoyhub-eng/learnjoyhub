import { useState } from 'react';
import './MathOperationSelector.css';

type OperationType = 'addition' | 'subtraction';
type DifficultyLevel = '2digit' | '3digit';

interface MathOperationSelectorProps {
  onSelectOperation: (operation: OperationType, difficulty: DifficultyLevel) => void;
  onBack: () => void;
}

const MathOperationSelector = ({ onSelectOperation, onBack }: MathOperationSelectorProps) => {
  const [selectedOperation, setSelectedOperation] = useState<OperationType | null>(null);
  const [hoveredDifficulty, setHoveredDifficulty] = useState<DifficultyLevel | null>(null);

  if (selectedOperation === null) {
    return (
      <div className="operation-selector-container">
        <button className="back-button-op" onClick={onBack}>
          ← Back
        </button>
        
        <div className="operation-selector-content">
          <h1>🧮 Choose an Operation</h1>
          <p>Select what you'd like to practice</p>

          <div className="operation-cards">
            <div
              className="operation-card addition-op"
              onClick={() => setSelectedOperation('addition')}
            >
              <div className="op-icon">➕</div>
              <h2>Addition</h2>
              <p>Learn to add numbers</p>
              <button className="select-op-btn">Select</button>
            </div>

            <div
              className="operation-card subtraction-op"
              onClick={() => setSelectedOperation('subtraction')}
            >
              <div className="op-icon">➖</div>
              <h2>Subtraction</h2>
              <p>Practice taking away</p>
              <button className="select-op-btn">Select</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="difficulty-selector-container">
      <button 
        className="back-button-op" 
        onClick={() => setSelectedOperation(null)}
      >
        ← Back
      </button>
      
      <div className="difficulty-selector-content">
        <h1>📊 Choose Difficulty</h1>
        <p>
          {selectedOperation === 'addition' ? 'Addition' : 'Subtraction'} - How many digits would you like?
        </p>

        <div className="difficulty-cards">
          <div
            className={`difficulty-card ${hoveredDifficulty === '2digit' ? 'hovered' : ''}`}
            onClick={() => onSelectOperation(selectedOperation, '2digit')}
            onMouseEnter={() => setHoveredDifficulty('2digit')}
            onMouseLeave={() => setHoveredDifficulty(null)}
          >
            <div className="difficulty-icon">2️⃣</div>
            <h2>2-Digit Numbers</h2>
            <p>Numbers from 10 to 99</p>
            <div className="example">Example: 25 + 34</div>
            <button className="select-difficulty-btn">Start</button>
          </div>

          <div
            className={`difficulty-card ${hoveredDifficulty === '3digit' ? 'hovered' : ''}`}
            onClick={() => onSelectOperation(selectedOperation, '3digit')}
            onMouseEnter={() => setHoveredDifficulty('3digit')}
            onMouseLeave={() => setHoveredDifficulty(null)}
          >
            <div className="difficulty-icon">3️⃣</div>
            <h2>3-Digit Numbers</h2>
            <p>Numbers from 100 to 999</p>
            <div className="example">Example: 250 + 340</div>
            <button className="select-difficulty-btn">Start</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathOperationSelector;
