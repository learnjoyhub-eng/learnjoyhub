import { useState } from 'react';
import { trackComponentAccess } from '../utils/analytics';
import type { Subject } from '../types';
import './SubjectSelector.css';

interface SubjectSelectorProps {
  onSelectSubject: (subject: Subject) => void;
  onBackHome?: () => void;
}

const SubjectSelector = ({ onSelectSubject, onBackHome }: SubjectSelectorProps) => {
  const [hoveredSubject, setHoveredSubject] = useState<Subject | null>(null);

  const handleSubjectSelect = (subject: Subject) => {
    trackComponentAccess('Subject Selector', subject === 'english' ? 'English' : 'Maths');
    onSelectSubject(subject);
  };

  return (
    <div className="subject-selector-container">
      <div className="subject-selector-content">
        {onBackHome && (
          <button className="back-button-home" onClick={onBackHome}>
            ← Back Home
          </button>
        )}
        <h1 className="app-title">📚 Learning Hub</h1>
        <p className="app-subtitle">Select a subject to begin!</p>
        
        <div className="subject-cards">
          <div
            className={`subject-card english-subject ${hoveredSubject === 'english' ? 'hovered' : ''}`}
            onClick={() => handleSubjectSelect('english')}
            onMouseEnter={() => setHoveredSubject('english')}
            onMouseLeave={() => setHoveredSubject(null)}
          >
            <div className="subject-icon">📝</div>
            <h2>English</h2>
            <p>Master spelling and vocabulary</p>
            <ul className="subject-features">
              <li>✓ Spelling practice</li>
              <li>✓ Learn new words</li>
              <li>✓ Build confidence</li>
            </ul>
            <div className="subject-arrow">→</div>
          </div>

          <div
            className={`subject-card maths-subject ${hoveredSubject === 'maths' ? 'hovered' : ''}`}
            onClick={() => handleSubjectSelect('maths')}
            onMouseEnter={() => setHoveredSubject('maths')}
            onMouseLeave={() => setHoveredSubject(null)}
          >
            <div className="subject-icon">🔢</div>
            <h2>Maths</h2>
            <p>Develop numerical skills</p>
            <ul className="subject-features">
              <li>✓ Addition & Subtraction</li>
              <li>✓ Multiplication & Division</li>
              <li>✓ Build skills step by step</li>
            </ul>
            <div className="subject-arrow">→</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectSelector;
