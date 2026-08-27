'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSettings } from '../hooks/useSettings';
import { getQuizQuestions } from '../utils/knowledgeQuestions';
import { trackComponentAccess } from '../utils/analytics';
import type { KnowledgeSubject, QuizQuestion } from '../types';
import './QuizPlayer.css';

const QUESTIONS_PER_SESSION = 10;

const shuffle = <T,>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const buildSession = (pool: QuizQuestion[]): QuizQuestion[] =>
  shuffle(pool).slice(0, Math.min(QUESTIONS_PER_SESSION, pool.length));

interface QuizPlayerProps {
  subject: KnowledgeSubject;
  title: string;
  icon: string;
}

const QuizPlayer = ({ subject, title, icon }: QuizPlayerProps) => {
  const router = useRouter();
  const { settings } = useSettings();
  const activeGrade = settings.grade ?? 'grade2';
  const pool = getQuizQuestions(subject, activeGrade);

  const [session, setSession] = useState<QuizQuestion[] | null>(null);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!session) {
    if (pool.length === 0) {
      return (
        <div className="quiz-container">
          <button className="quiz-back-button" onClick={() => router.push('/knowledge')}>← Back</button>
          <div className="quiz-empty">
            <p>No {title} questions available for this grade yet.</p>
          </div>
        </div>
      );
    }
    return (
      <div className="quiz-container">
        <button className="quiz-back-button" onClick={() => router.push('/knowledge')}>← Back</button>
        <div className="quiz-intro">
          <div className="quiz-intro-icon">{icon}</div>
          <h1>{title}</h1>
          <p>{Math.min(QUESTIONS_PER_SESSION, pool.length)} questions · Multiple choice & True/False</p>
          <button
            className="quiz-start-button"
            onClick={() => {
              trackComponentAccess('Knowledge Quiz', title);
              setSession(buildSession(pool));
              setIndex(0);
              setScore(0);
              setSelected(null);
              setFinished(false);
            }}
          >
            Start Quiz →
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const percentage = Math.round((score / session.length) * 100);
    const message =
      percentage === 100 ? '🌟 Perfect Score! You are amazing!' :
      percentage >= 80 ? '⭐ Excellent work! Keep it up!' :
      percentage >= 60 ? '👍 Good job! You are learning fast!' :
      percentage >= 40 ? '💪 Not bad! Keep practising!' :
      '🤔 Keep trying! You will get better!';

    return (
      <div className="quiz-container">
        <div className="quiz-score-card">
          <div className="quiz-score-icon">{icon}</div>
          <div className="quiz-final-score">{score}/{session.length}</div>
          <div className="quiz-score-percentage">({percentage}%)</div>
          <div className="quiz-score-message">{message}</div>
          <div className="quiz-final-actions">
            <button className="quiz-start-button" onClick={() => setSession(buildSession(pool))}>
              🔄 Play Again
            </button>
            <button className="quiz-back-button-inline" onClick={() => router.push('/knowledge')}>
              ← Back to Knowledge Hub
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = session[index];
  const isTrueFalse = question.type === 'truefalse';
  const answerOptions = isTrueFalse ? ['True', 'False'] : (question.options ?? []);
  const hasAnswered = selected !== null;
  const isCorrect = hasAnswered && selected === question.correctAnswer;

  const handleSelect = (option: string) => {
    if (hasAnswered) return;
    setSelected(option);
    if (option === question.correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (index + 1 >= session.length) {
      setFinished(true);
    } else {
      setIndex(index + 1);
      setSelected(null);
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <button className="quiz-back-button" onClick={() => router.push('/knowledge')}>← Exit</button>
        <div className="quiz-progress">Question {index + 1} of {session.length}</div>
        <div className="quiz-score-chip">⭐ {score}</div>
      </div>

      <div className="quiz-card">
        {question.category && <div className="quiz-category">{question.category}</div>}
        <h2 className="quiz-question">{question.question}</h2>

        <div className={`quiz-options ${isTrueFalse ? 'quiz-options-truefalse' : ''}`}>
          {answerOptions.map((option) => {
            let optionClass = 'quiz-option';
            if (hasAnswered) {
              if (option === question.correctAnswer) optionClass += ' correct';
              else if (option === selected) optionClass += ' incorrect';
            }
            return (
              <button
                key={option}
                className={optionClass}
                onClick={() => handleSelect(option)}
                disabled={hasAnswered}
              >
                {option}
              </button>
            );
          })}
        </div>

        {hasAnswered && (
          <div className={`quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            <div className="quiz-feedback-label">
              {isCorrect ? '✓ Correct!' : `✗ Not quite — the answer is "${question.correctAnswer}"`}
            </div>
            <p className="quiz-explanation">{question.explanation}</p>
            <button className="quiz-next-button" onClick={handleNext}>
              {index + 1 >= session.length ? 'See Results →' : 'Next Question →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPlayer;
