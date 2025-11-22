import React, { useState, useEffect } from 'react';
import '../pages/MathWorksheet.css';

interface MultiplicationProblem {
  table: number;
  multiplier: number;
  userAnswer: string;
  correctAnswer: number;
  isCorrect?: boolean;
}

interface MultiplicationWorksheetProps {
  selectedTable: number;
  onBack: () => void;
}

const MultiplicationWorksheet: React.FC<MultiplicationWorksheetProps> = ({
  selectedTable,
  onBack,
}) => {
  const [problems, setProblems] = useState<MultiplicationProblem[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    generateProblems();
  }, [selectedTable]);

  useEffect(() => {
    if (!submitted) {
      const timer = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
        setElapsedTime(elapsed);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [submitted, startTime]);

  const generateProblems = () => {
    const newProblems: MultiplicationProblem[] = [];
    for (let i = 1; i <= 10; i++) {
      newProblems.push({
        table: selectedTable,
        multiplier: i,
        userAnswer: '',
        correctAnswer: selectedTable * i,
      });
    }
    setProblems(newProblems);
    setSubmitted(false);
    setScore(0);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const updatedProblems = [...problems];
    updatedProblems[index].userAnswer = value;
    setProblems(updatedProblems);
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

  const handleClear = () => {
    if (!submitted) {
      const clearedProblems = problems.map((p) => ({
        ...p,
        userAnswer: '',
      }));
      setProblems(clearedProblems);
    }
  };

  const getEncouragingMessage = () => {
    if (score === 10) return '🌟 Perfect! You are a multiplication master! 🌟';
    if (score >= 9) return '🎉 Excellent! Almost perfect! 🎉';
    if (score >= 8) return '👏 Great job! Well done! 👏';
    if (score >= 6) return '💪 Good effort! Keep practicing! 💪';
    return '📚 Keep trying! You will improve! 📚';
  };

  const percentage = Math.round((score / 10) * 100);

  return (
    <div className="worksheet-container">
      <button className="back-button-worksheet" onClick={onBack}>
        ← Back
      </button>

      <div className="worksheet-content">
        <h1>Table of {selectedTable}</h1>
        <p className="worksheet-subtitle">
          Answer all the multiplication problems below
        </p>

        {!submitted ? (
          <div className="problems-section">
            <div className="problems-grid-compact">
              {problems.map((problem, index) => (
                <div key={index} className="problem-card-compact">
                  <div className="problem-text-compact">
                    {problem.table} × {problem.multiplier} =
                  </div>
                  <input
                    type="number"
                    value={problem.userAnswer}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    placeholder="?"
                    className="answer-input-compact"
                  />
                </div>
              ))}
            </div>

            <div className="worksheet-actions">
              <button className="clear-button" onClick={handleClear}>
                🗑️ Clear All
              </button>
              <button className="submit-button" onClick={handleSubmit}>
                Submit Answers
              </button>
            </div>
          </div>
        ) : (
          <div className="results-section">
            <div className="score-card">
              <div className="score-display">
                <span className="score-number">{score}</span>
                <span className="score-total">/ 10</span>
              </div>
              <div className="score-percentage">{percentage}%</div>
              <div className="encouraging-message">{getEncouragingMessage()}</div>
            </div>

            <div className="results-grid">
              {problems.map((problem, index) => (
                <div
                  key={index}
                  className={`result-card ${problem.isCorrect ? 'correct' : 'incorrect'}`}
                >
                  <div className="result-problem">
                    {problem.table} × {problem.multiplier} = ?
                  </div>
                  <div className="result-answer">
                    <span className="user-answer">Your answer: {problem.userAnswer || '-'}</span>
                    <span className="correct-answer">Correct: {problem.correctAnswer}</span>
                  </div>
                  <div className="result-indicator">
                    {problem.isCorrect ? '✅ Correct' : '❌ Incorrect'}
                  </div>
                </div>
              ))}
            </div>

            <div className="timer-section">
              <span>⏱️ Time taken: {elapsedTime} seconds</span>
            </div>

            <button className="try-new-button" onClick={generateProblems}>
              Try New Problems
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiplicationWorksheet;
