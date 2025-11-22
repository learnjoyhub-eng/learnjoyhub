import { useState } from 'react';
import './TableSelector.css';

interface TableSelectorProps {
  onSelectTable: (tableNumber: number) => void;
  onBack: () => void;
}

const TableSelector = ({ onSelectTable, onBack }: TableSelectorProps) => {
  const [hoveredTable, setHoveredTable] = useState<number | null>(null);

  const tables = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="table-selector-container">
      <button className="back-button-table" onClick={onBack}>
        ← Back to Multiplication
      </button>
      
      <div className="table-selector-content">
        <h1>📊 Tables Practice</h1>
        <p>Choose a multiplication table to practice (1 to 20)</p>

        <div className="table-grid">
          {tables.map((num) => (
            <div
              key={num}
              className={`table-card ${hoveredTable === num ? 'hovered' : ''}`}
              onClick={() => onSelectTable(num)}
              onMouseEnter={() => setHoveredTable(num)}
              onMouseLeave={() => setHoveredTable(null)}
            >
              <div className="table-number">{num}</div>
              <div className="table-label">Table of {num}</div>
              <button className="select-table-btn">Select</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableSelector;
