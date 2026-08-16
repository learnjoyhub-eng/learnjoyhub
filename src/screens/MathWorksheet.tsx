'use client';

import { useState, useEffect } from 'react';
import './MathWorksheet.css';

type OperationType = 'addition' | 'subtraction';
type DifficultyLevel = '2digit' | '3digit' | '4digit';

const DIGIT_RANGES: Record<DifficultyLevel, { min: number; max: number; label: string }> = {
  '2digit': { min: 10, max: 99, label: '2-Digit' },
  '3digit': { min: 100, max: 999, label: '3-Digit' },
  '4digit': { min: 1000, max: 9999, label: '4-Digit' },
};

interface Problem {
  id: number;
  num1: number;
  num2: number;
  correctAnswer: number;
  userAnswer: string;
  isCorrect: boolean | null;
}

interface MathWorksheetProps {
  operation: OperationType;
  difficulty: DifficultyLevel;
  onBack: () => void;
}

const MathWorksheet = ({ operation, difficulty, onBack }: MathWorksheetProps) => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Generate random problems
  const generateProblems = () => {
    const newProblems: Problem[] = [];
    const { min, max } = DIGIT_RANGES[difficulty];

    for (let i = 0; i < 10; i++) {
      let num1 = Math.floor(Math.random() * (max - min + 1)) + min;
      let num2 = Math.floor(Math.random() * (max - min + 1)) + min;

      // For subtraction, ensure num1 >= num2 to avoid negative results
      if (operation === 'subtraction' && num1 < num2) {
        [num1, num2] = [num2, num1];
      }

      const correctAnswer = operation === 'addition' ? num1 + num2 : num1 - num2;

      newProblems.push({
        id: i + 1,
        num1,
        num2,
        correctAnswer,
        userAnswer: '',
        isCorrect: null,
      });
    }

    setProblems(newProblems);
    setSubmitted(false);
    setScore(0);
    setTimeElapsed(0);
  };

  // Initialize problems on component mount
  useEffect(() => {
    generateProblems();
  }, [operation, difficulty]);

  // Timer effect
  useEffect(() => {
    if (!submitted) {
      const timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [submitted]);

  const handleAnswerChange = (problemId: number, value: string) => {
    if (submitted) return;

    const updated = problems.map((p) =>
      p.id === problemId ? { ...p, userAnswer: value } : p
    );
    setProblems(updated);
  };

  const handleSubmit = () => {
    let correctCount = 0;
    const updatedProblems = problems.map((p) => {
      const isCorrect = parseInt(p.userAnswer) === p.correctAnswer;
      if (isCorrect) correctCount++;
      return { ...p, isCorrect };
    });

    setProblems(updatedProblems);
    setScore(correctCount);
    setSubmitted(true);
  };

  const handleRefresh = () => {
    generateProblems();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getEncouragingMessage = () => {
    const percentage = (score / 10) * 100;
    if (percentage === 100) return '🌟 Perfect Score! You are amazing!';
    if (percentage >= 80) return '⭐ Excellent work! Keep it up!';
    if (percentage >= 60) return '👍 Good job! You are improving!';
    if (percentage >= 40) return '💪 Not bad! Keep practicing!';
    return '🤔 Keep trying! You will get better!';
  };

  return (
    <div className="math-worksheet-container">
      <div className="worksheet-header">
        <button className="back-button-worksheet" onClick={onBack}>
          ← Back to Maths
        </button>
        <div className="header-info">
          <h1>
            {operation === 'addition' ? '➕ Addition' : '➖ Subtraction'} -{' '}
            {DIGIT_RANGES[difficulty].label} Numbers
          </h1>
          <div className="timer">⏱️ Time: {formatTime(timeElapsed)}</div>
        </div>
      </div>

      {!submitted ? (
        <>
          <div className="worksheet-grid">
            {problems.map((problem, index) => (
              <div key={problem.id} className="problem-card">
                <div className="problem-number">Q{problem.id}</div>
                <div className="problem-content">
                  <div className="numbers">
                    <div className="number">{problem.num1}</div>
                    <div className="operator">
                      {operation === 'addition' ? '+' : '−'}
                    </div>
                    <div className="number">{problem.num2}</div>
                  </div>
                  <div className="answer-line">
                    <input
                      type="number"
                      className="answer-input"
                      value={problem.userAnswer}
                      onChange={(e) => handleAnswerChange(problem.id, e.target.value)}
                      placeholder="?"
                      autoFocus={index === 0}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="worksheet-actions">
            <button className="submit-button" onClick={handleSubmit}>
              ✓ Submit Answers
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="score-section">
            <div className="score-card">
              <div className="score-display">
                <div className="final-score">{score}/10</div>
                <div className="score-percentage">({Math.round((score / 10) * 100)}%)</div>
              </div>
              <div className="score-message">{getEncouragingMessage()}</div>
              <div className="time-info">Time taken: {formatTime(timeElapsed)}</div>
            </div>
          </div>

          <div className="results-grid">
            {problems.map((problem) => (
              <div
                key={problem.id}
                className={`result-card ${problem.isCorrect ? 'correct' : 'incorrect'}`}
              >
                <div className="result-header">
                  <span className="result-number">Q{problem.id}</span>
                  <span className={`result-icon ${problem.isCorrect ? 'check' : 'cross'}`}>
                    {problem.isCorrect ? '✓' : '✗'}
                  </span>
                </div>
                <div className="result-problem">
                  <div>{problem.num1}</div>
                  <div>{operation === 'addition' ? '+' : '−'}</div>
                  <div>{problem.num2}</div>
                </div>
                <div className="result-answer">
                  <div className="user-answer">
                    Your answer: <span className="highlight">{problem.userAnswer || '—'}</span>
                  </div>
                  <div className="correct-answer">
                    Correct answer: <span className="highlight">{problem.correctAnswer}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="final-actions">
            <button className="refresh-button" onClick={handleRefresh}>
              🔄 Try New Problems
            </button>
            <button className="back-button-final" onClick={onBack}>
              ← Back to Maths
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MathWorksheet;
