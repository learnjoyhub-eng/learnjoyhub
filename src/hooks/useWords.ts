import { useState, useEffect } from 'react';
import type { Word } from '../types';
import { getWords, saveWords } from '../utils/localStorage';

export const useWords = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWords = () => {
      const loadedWords = getWords();
      setWords(loadedWords);
      setLoading(false);
    };

    loadWords();
  }, []);

  const addNewWord = (word: Omit<Word, 'id' | 'createdAt'>) => {
    const newWord: Word = {
      ...word,
      id: `word_${Date.now()}_${Math.random()}`,
      createdAt: new Date().toISOString(),
    };
    const updatedWords = [...words, newWord];
    setWords(updatedWords);
    saveWords(updatedWords);
    return newWord;
  };

  const updateWord = (id: string, updates: Partial<Word>) => {
    const updatedWords = words.map(w => 
      w.id === id ? { ...w, ...updates } : w
    );
    setWords(updatedWords);
    saveWords(updatedWords);
  };

  const deleteWord = (id: string) => {
    const updatedWords = words.filter(w => w.id !== id);
    setWords(updatedWords);
    saveWords(updatedWords);
  };

  const togglePriority = (id: string) => {
    const word = words.find(w => w.id === id);
    if (word) {
      updateWord(id, { isPriority: !word.isPriority });
    }
  };

  return {
    words,
    loading,
    addWord: addNewWord,
    updateWord,
    deleteWord,
    togglePriority,
  };
};
