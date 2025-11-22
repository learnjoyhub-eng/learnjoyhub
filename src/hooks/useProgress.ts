import { useState, useEffect } from 'react';
import type { GameProgress } from '../types';
import { getProgress, saveProgress } from '../utils/localStorage';

export const useProgress = () => {
  const [progress, setProgress] = useState<GameProgress>({
    totalWordsPlayed: 0,
    correctWords: 0,
    totalAttempts: 0,
    recentResults: [],
    stars: 0,
  });

  useEffect(() => {
    const loadProgress = () => {
      const loadedProgress = getProgress();
      setProgress(loadedProgress);
    };

    loadProgress();
  }, []);

  const updateProgress = (newProgress: GameProgress) => {
    setProgress(newProgress);
    saveProgress(newProgress);
  };

  return {
    progress,
    updateProgress,
  };
};
