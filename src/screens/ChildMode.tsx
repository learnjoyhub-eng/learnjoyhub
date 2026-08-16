'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useWords } from '../hooks/useWords';
import { useProgress } from '../hooks/useProgress';
import { useSettings } from '../hooks/useSettings';
import type { Word } from '../types';
import { addAttemptResult, getProgress, resetProgress } from '../utils/localStorage';
import { speakWord, getCharacterClue, compareWords, getRandomWord, getStarRating } from '../utils/gameHelpers';
import './ChildMode.css';

const ChildMode = () => {
  const router = useRouter();
  const { words, loading } = useWords();
  const { progress, updateProgress } = useProgress();
  const { settings } = useSettings();
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [userInput, setUserInput] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [revealedPositions, setRevealedPositions] = useState<number[]>([]);
  const [cluesTaken, setCluesTaken] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'correct' | 'incorrect'>('playing');
  const [usedWordIds, setUsedWordIds] = useState<string[]>([]);
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });
  const [showCelebration, setShowCelebration] = useState(false);
  const [earnedStars, setEarnedStars] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const MAX_CLUES = 3;

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Ref for input field to maintain focus
  const inputRef = useRef<HTMLInputElement>(null);

  const startNewWord = () => {
    if (words.length === 0) {
      return;
    }

    // Filter words based on selected category and difficulty
    let filteredWords = words;

    if (selectedCategory !== 'all') {
      filteredWords = filteredWords.filter(w => w.category === selectedCategory);
    }

    if (selectedDifficulty !== 'all') {
      filteredWords = filteredWords.filter(w => w.difficulty === selectedDifficulty);
    }

    if (filteredWords.length === 0) {
      alert('No words match the selected filters. Please choose different options.');
      return;
    }

    const newWord = getRandomWord(filteredWords, usedWordIds);
    if (!newWord) {
      // All words used in this filter, reset
      setUsedWordIds([]);
      const freshWord = getRandomWord(filteredWords, []);
      setCurrentWord(freshWord);
    } else {
      setCurrentWord(newWord);
    }

    setUserInput('');
    setAttemptCount(0);
    setFeedback([]);
    setRevealedPositions([]);
    setCluesTaken(0);
    setGameState('playing');
    setShowCelebration(false);
    setEarnedStars(0);

    // Refocus input when starting new word
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  useEffect(() => {
    // Load voices for text-to-speech
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  useEffect(() => {
    // Start game only after words are loaded and only once
    if (!loading && words.length > 0 && !isInitialized) {
      setIsInitialized(true);
      startNewWord();
    }
  }, [loading, words, isInitialized]);

  const handleSpeak = () => {
    if (currentWord && settings.audioEnabled) {
      speakWord(currentWord.word, settings.preferredVoice);
      // Refocus input after speaking
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleGetClue = () => {
    if (!currentWord || cluesTaken >= MAX_CLUES) return;

    const clue = getCharacterClue(currentWord.word, revealedPositions, userInput);
    if (clue) {
      setRevealedPositions([...revealedPositions, clue.position]);
      setCluesTaken(cluesTaken + 1);
      // Refocus input after getting clue
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleSubmit = () => {
    if (!currentWord || !userInput.trim()) return;

    const newAttemptCount = attemptCount + 1;
    setAttemptCount(newAttemptCount);

    const result = compareWords(userInput, currentWord.word);

    if (result.isCorrect) {
      // Correct!
      const stars = getStarRating(newAttemptCount, settings.maxAttempts, cluesTaken);
      setEarnedStars(stars);
      setGameState('correct');
      setShowCelebration(true);

      // Save result
      addAttemptResult({
        wordId: currentWord.id,
        word: currentWord.word,
        attempts: newAttemptCount,
        correct: true,
        timestamp: new Date().toISOString(),
      });
      updateProgress(getProgress());

      // Update used words list
      const updatedUsedWords = [...usedWordIds, currentWord.id];
      setUsedWordIds(updatedUsedWords);

      setSessionStats({
        correct: sessionStats.correct + 1,
        total: sessionStats.total + 1,
      });

      // Auto-advance after celebration - no timeout, user clicks button
    } else {
      // Incorrect
      if (newAttemptCount >= settings.maxAttempts) {
        // Max attempts reached
        setGameState('incorrect');
        setFeedback([`The correct spelling is: ${currentWord.word}`]);

        addAttemptResult({
          wordId: currentWord.id,
          word: currentWord.word,
          attempts: newAttemptCount,
          correct: false,
          timestamp: new Date().toISOString(),
        });
        updateProgress(getProgress());

        // Update used words list
        const updatedUsedWords = [...usedWordIds, currentWord.id];
        setUsedWordIds(updatedUsedWords);

        setSessionStats({
          correct: sessionStats.correct,
          total: sessionStats.total + 1,
        });
      } else {
        // Still have attempts left
        setFeedback(result.feedback);
        // Refocus input for next attempt
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (gameState === 'playing') {
        handleSubmit();
      } else if (gameState === 'correct' || gameState === 'incorrect') {
        // Allow Enter to go to next word after result screen
        startNewWord();
      }
    }
  };

  // Global keyboard listener for Enter key on result screens
  useEffect(() => {
    const handleGlobalKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && (gameState === 'correct' || gameState === 'incorrect')) {
        startNewWord();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyPress);
    return () => window.removeEventListener('keydown', handleGlobalKeyPress);
  }, [gameState]);

  const handleSkipWord = () => {
    if (currentWord) {
      // Mark as used but don't record attempt
      setUsedWordIds([...usedWordIds, currentWord.id]);
    }
    startNewWord();
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
      resetProgress();
      updateProgress(getProgress());
      setSessionStats({ correct: 0, total: 0 });
      setUsedWordIds([]);
      startNewWord();
    }
  };

  const handleExit = () => router.push('/english');

  const attemptsLeft = settings.maxAttempts - attemptCount;

  // Get unique categories from words
  const categories = ['all', ...Array.from(new Set(words.map(w => w.category).filter(Boolean)))];
  const difficulties = ['all', 'easy', 'medium', 'hard'];

  return (
    <div className="child-mode-container">
      <div className="game-header">
        <button className="back-button-child" onClick={handleExit}>← Exit</button>
        <div className="session-stats">
          <span className="stat">Session: {sessionStats.correct}/{sessionStats.total}</span>
          <span className="stat">⭐ Total Stars: {progress.stars}</span>
        </div>
        <button className="reset-button-child" onClick={handleResetProgress}>🔄 Reset</button>
      </div>

      {/* Filters Section */}
      {!loading && words.length > 0 && (
        <div className="filters-section">
          <div className="filter-group">
            <label htmlFor="category-filter">📁 Category:</label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setUsedWordIds([]); // Reset used words when filter changes
              }}
              className="filter-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="difficulty-filter">🎯 Difficulty:</label>
            <select
              id="difficulty-filter"
              value={selectedDifficulty}
              onChange={(e) => {
                setSelectedDifficulty(e.target.value);
                setUsedWordIds([]); // Reset used words when filter changes
              }}
              className="filter-select"
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff}>
                  {diff === 'all' ? 'All Levels' : diff.charAt(0).toUpperCase() + diff.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <button className="skip-word-button" onClick={handleSkipWord} title="Skip to a new word">
            ⏭️ New Word
          </button>
        </div>
      )}

      <div className="game-content">
        <div className="game-card">
          {loading && (
            <div className="loading-state">
              <div className="loading-spinner">🎯</div>
              <h2>Loading words...</h2>
            </div>
          )}

          {!loading && words.length === 0 && (
            <div className="no-words-state">
              <div className="empty-icon">📚</div>
              <h2>No words available!</h2>
              <p>Please add words in Parent Mode first.</p>
              <button className="next-button" onClick={() => router.push('/english/parent')}>
                Go to Parent Mode
              </button>
            </div>
          )}

          {!loading && words.length > 0 && currentWord && (
            <>
              <div className="word-category">
                {currentWord.category && (
                  <span className="category-tag">📁 {currentWord.category}</span>
                )}
                <span className={`difficulty-tag ${currentWord.difficulty}`}>
                  {currentWord.difficulty}
                </span>
              </div>

              {gameState === 'playing' && (
                <>
                  <div className="attempts-indicator">
                    {Array.from({ length: settings.maxAttempts }).map((_, i) => (
                      <div
                        key={i}
                        className={`attempt-dot ${i < attemptCount ? 'used' : ''}`}
                      />
                    ))}
                  </div>

                  <h2 className="instruction">Spell this word:</h2>

                  <button className="speak-button" onClick={handleSpeak}>
                    🔊 Listen to the word
                  </button>

                  <div className="input-section">
                    <input
                      ref={inputRef}
                      type="text"
                      className="spelling-input"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type the spelling here..."
                      autoFocus
                    />
                    <button className="submit-button" onClick={handleSubmit}>
                      Check ✓
                    </button>
                  </div>

                  {/* Character Clue Display */}
                  {currentWord && revealedPositions.length > 0 && (
                    <div className="clue-display">
                      <div className="clue-letters">
                        {currentWord.word.split('').map((char, idx) => (
                          <span
                            key={idx}
                            className={`clue-letter ${revealedPositions.includes(idx) ? 'revealed' : 'hidden'}`}
                          >
                            {revealedPositions.includes(idx) ? char.toUpperCase() : '_'}
                          </span>
                        ))}
                      </div>
                      <p className="clue-info">
                        💡 {cluesTaken} clue{cluesTaken > 1 ? 's' : ''} taken (reduces stars)
                      </p>
                    </div>
                  )}

                  {/* Get Clue Button */}
                  {settings.hintsEnabled && cluesTaken < MAX_CLUES && (
                    <button
                      className="hint-button"
                      onClick={handleGetClue}
                      disabled={cluesTaken >= MAX_CLUES}
                    >
                      💡 Get a Clue ({MAX_CLUES - cluesTaken} left)
                    </button>
                  )}

                  {cluesTaken >= MAX_CLUES && (
                    <p className="max-clues-message">
                      No more clues available! You can do it! 💪
                    </p>
                  )}

                  <button className="skip-word-button-playing" onClick={handleSkipWord} title="Skip to a new word">
                    ⏭️ Skip This Word
                  </button>

                  {feedback.length > 0 && (
                    <div className="feedback-box">
                      {feedback.map((msg, idx) => (
                        <div key={idx} className="feedback-message">
                          {msg}
                        </div>
                      ))}
                      {attemptsLeft > 0 && (
                        <p className="attempts-left">
                          {attemptsLeft} attempt{attemptsLeft > 1 ? 's' : ''} left!
                        </p>
                      )}
                    </div>
                  )}
                </>
              )}

              {gameState === 'correct' && (
                <div className="result-screen success">
                  {showCelebration && (
                    <div className="celebration">
                      <div className="confetti">🎉</div>
                      <div className="confetti">🎊</div>
                      <div className="confetti">✨</div>
                      <div className="confetti">⭐</div>
                      <div className="confetti">🌟</div>
                    </div>
                  )}
                  <div className="result-emoji">🎉</div>
                  <h2>Perfect!</h2>
                  <p className="result-word">{currentWord.word}</p>
                  <p className="result-message">
                    You got it in {attemptCount} attempt{attemptCount > 1 ? 's' : ''}!
                  </p>
                  <div className="stars-earned">
                    {Array.from({ length: earnedStars }).map((_, i) => (
                      <span key={i} className="star-icon">⭐</span>
                    ))}
                  </div>
                  <button className="next-button" onClick={startNewWord}>
                    Next Word →
                  </button>
                </div>
              )}

              {gameState === 'incorrect' && (
                <div className="result-screen failure">
                  <div className="result-emoji">😊</div>
                  <h2>Let's try again!</h2>
                  <p className="result-word">The correct spelling is:</p>
                  <p className="correct-spelling">{currentWord.word}</p>
                  <button className="speak-button" onClick={handleSpeak}>
                    🔊 Listen again
                  </button>
                  <button className="next-button" onClick={startNewWord}>
                    Next Word →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChildMode;
