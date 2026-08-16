'use client';

import { useState, useEffect } from 'react';
import '../screens/MathWorksheet.css';

type OperationType = 'multiplication' | 'division';

interface Problem {
  id: number;
  num1: number;
  num2: number;
  correctAnswer: number;
  userAnswer: string;
  isCorrect: boolean | null;
}

interface MultiDivWorksheetProps {
  operation: OperationType;
  onBack: () => void;
}

const MultiDivWorksheet = ({ operation, onBack }: MultiDivWorksheetProps) => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Generate random problems
  const generateProblems = () => {
    const newProblems: Problem[] = [];

    for (let i = 0; i < 10; i++) {
      let num1: number;
      let num2: number;
      let correctAnswer: number;

      if (operation === 'multiplication') {
        // 2-digit × 1-digit
        num1 = Math.floor(Math.random() * 90) + 10; // 10-99
        num2 = Math.floor(Math.random() * 9) + 1;   // 1-9
        correctAnswer = num1 * num2;
      } else {
        // Division: 2-digit ÷ 1-digit (ensure whole number result)
        num2 = Math.floor(Math.random() * 9) + 1;   // 1-9 (divisor)
        correctAnswer = Math.floor(Math.random() * 10) + 2; // 2-11 (quotient)
        num1 = num2 * correctAnswer; // dividend (10-99)
      }

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
  }, [operation]);

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
            {operation === 'multiplication' ? '✖️ Multiplication' : '➗ Division'} - 2-Digit Problems
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
                      {operation === 'multiplication' ? '×' : '÷'}
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
                  <div>{operation === 'multiplication' ? '×' : '÷'}</div>
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

export default MultiDivWorksheet;
