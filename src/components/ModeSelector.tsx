import { useState } from 'react';
import { trackComponentAccess } from '../utils/analytics';
import './ModeSelector.css';

interface ModeSelectorProps {
  onSelectMode: (mode: 'parent' | 'child') => void;
}

const ModeSelector = ({ onSelectMode }: ModeSelectorProps) => {
  const [hoveredMode, setHoveredMode] = useState<'parent' | 'child' | null>(null);

  const handleModeSelect = (mode: 'parent' | 'child') => {
    trackComponentAccess('Mode Selector', mode === 'parent' ? 'Parent Mode' : 'Child Mode');
    onSelectMode(mode);
  };

  return (
    <div className="mode-selector-container">
      <div className="mode-selector-content">
        <h1 className="app-title">🎯 Spelling Champion</h1>
        <p className="app-subtitle">Choose your mode to begin!</p>
        
        <div className="mode-cards">
          <div
            className={`mode-card parent-mode ${hoveredMode === 'parent' ? 'hovered' : ''}`}
            onClick={() => handleModeSelect('parent')}
            onMouseEnter={() => setHoveredMode('parent')}
            onMouseLeave={() => setHoveredMode(null)}
          >
            <div className="mode-icon">👨‍👩‍👧</div>
            <h2>Parent Mode</h2>
            <p>Manage words and track progress</p>
            <ul className="mode-features">
              <li>✓ Add/Edit words</li>
              <li>✓ View progress</li>
              <li>✓ Set priorities</li>
            </ul>
          </div>

          <div
            className={`mode-card child-mode ${hoveredMode === 'child' ? 'hovered' : ''}`}
            onClick={() => handleModeSelect('child')}
            onMouseEnter={() => setHoveredMode('child')}
            onMouseLeave={() => setHoveredMode(null)}
          >
            <div className="mode-icon">🎮</div>
            <h2>Play & Learn</h2>
            <p>Practice spelling in a fun way!</p>
            <ul className="mode-features">
              <li>⭐ Earn stars</li>
              <li>🎵 Audio hints</li>
              <li>🎉 Fun animations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeSelector;
