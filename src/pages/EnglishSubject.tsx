import { useState } from 'react';
import ModeSelector from '../components/ModeSelector';
import { trackComponentAccess } from '../utils/analytics';
import type { GameMode } from '../types';
import './EnglishSubject.css';

interface EnglishSubjectProps {
  onBack: () => void;
  onSelectMode: (mode: GameMode) => void;
}

const EnglishSubject = ({ onBack, onSelectMode }: EnglishSubjectProps) => {
  const [showModeSelector, setShowModeSelector] = useState(false);

  if (showModeSelector) {
    return (
      <div className="english-subject-container">
        <button className="back-button-english" onClick={() => setShowModeSelector(false)}>
          ← Back to English
        </button>
        <ModeSelector onSelectMode={onSelectMode} />
      </div>
    );
  }

  return (
    <div className="english-subject-container">
      <div className="english-subject-content">
        <button className="back-button-english" onClick={onBack}>
          ← Back to Subjects
        </button>
        
        <div className="subject-header">
          <h1>📝 English - Spelling</h1>
          <p>Master the art of correct spelling with guided practice and audio support</p>
        </div>

        <div className="english-options">
          <div className="option-card" onClick={() => {
            trackComponentAccess('English Subject', 'Spelling Game');
            setShowModeSelector(true);
          }}>
            <div className="option-icon">🎮</div>
            <h2>Spelling Game</h2>
            <p>Practice spelling through an interactive game with audio pronunciation and hints</p>
            <div className="option-features">
              <span className="feature">🎵 Audio Support</span>
              <span className="feature">💡 Smart Hints</span>
              <span className="feature">⭐ Earn Stars</span>
            </div>
            <button className="start-button">Start Learning →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnglishSubject;
