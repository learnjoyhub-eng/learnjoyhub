'use client';

import { useState } from 'react';
import './DifficultySelector.css';

type OperationType = 'addition' | 'subtraction';
type DifficultyLevel = '2digit' | '3digit' | '4digit';

interface DifficultySelectorProps {
  operation: OperationType;
  onSelectDifficulty: (difficulty: DifficultyLevel) => void;
  onBack: () => void;
}

const DifficultySelector = ({ operation, onSelectDifficulty, onBack }: DifficultySelectorProps) => {
  const [hoveredDifficulty, setHoveredDifficulty] = useState<DifficultyLevel | null>(null);

  const operationTitle = operation === 'addition' ? '➕ Addition' : '➖ Subtraction';

  return (
    <div className="difficulty-selector-container">
      <button className="back-button-difficulty" onClick={onBack}>
        ← Back to Maths
      </button>
      
      <div className="difficulty-selector-content">
        <h1>{operationTitle}</h1>
        <p>Choose your difficulty level</p>

        <div className="difficulty-cards">
          <div
            className={`difficulty-card ${hoveredDifficulty === '2digit' ? 'hovered' : ''}`}
            onClick={() => onSelectDifficulty('2digit')}
            onMouseEnter={() => setHoveredDifficulty('2digit')}
            onMouseLeave={() => setHoveredDifficulty(null)}
          >
            <div className="difficulty-grade-badge">🎓 2nd Std</div>
            <div className="difficulty-icon">2️⃣</div>
            <h2>2-Digit Numbers</h2>
            <p>Numbers from 10 to 99</p>
            <div className="example">Example: 25 + 34 = ?</div>
            <button className="start-button">Start</button>
          </div>

          <div
            className={`difficulty-card ${hoveredDifficulty === '3digit' ? 'hovered' : ''}`}
            onClick={() => onSelectDifficulty('3digit')}
            onMouseEnter={() => setHoveredDifficulty('3digit')}
            onMouseLeave={() => setHoveredDifficulty(null)}
          >
            <div className="difficulty-grade-badge">🎓 2nd–3rd Std</div>
            <div className="difficulty-icon">3️⃣</div>
            <h2>3-Digit Numbers</h2>
            <p>Numbers from 100 to 999</p>
            <div className="example">Example: 250 + 340 = ?</div>
            <button className="start-button">Start</button>
          </div>

          <div
            className={`difficulty-card ${hoveredDifficulty === '4digit' ? 'hovered' : ''}`}
            onClick={() => onSelectDifficulty('4digit')}
            onMouseEnter={() => setHoveredDifficulty('4digit')}
            onMouseLeave={() => setHoveredDifficulty(null)}
          >
            <div className="difficulty-grade-badge new">🎓 3rd Std</div>
            <div className="difficulty-icon">4️⃣</div>
            <h2>4-Digit Numbers</h2>
            <p>Numbers from 1000 to 9999</p>
            <div className="example">Example: 2500 + 3400 = ?</div>
            <button className="start-button">Start</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DifficultySelector;
