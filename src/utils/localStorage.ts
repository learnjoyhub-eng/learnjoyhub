import type { Word, GameProgress, GameSettings, AttemptResult } from '../types';

const STORAGE_KEYS = {
  WORDS: 'spelling_game_words',
  PROGRESS: 'spelling_game_progress',
  SETTINGS: 'spelling_game_settings',
};

// Default ICSE 2nd Standard word list
export const DEFAULT_WORDS: Omit<Word, 'id' | 'createdAt'>[] = [
  // Easy words (3-4 letters) - Animals
  { word: 'cat', difficulty: 'easy', category: 'Animals', isPriority: false },
  { word: 'dog', difficulty: 'easy', category: 'Animals', isPriority: false },
  { word: 'bird', difficulty: 'easy', category: 'Animals', isPriority: false },
  { word: 'fish', difficulty: 'easy', category: 'Animals', isPriority: false },
  { word: 'frog', difficulty: 'easy', category: 'Animals', isPriority: false },
  { word: 'lion', difficulty: 'easy', category: 'Animals', isPriority: false },
  { word: 'bear', difficulty: 'easy', category: 'Animals', isPriority: false },
  { word: 'duck', difficulty: 'easy', category: 'Animals', isPriority: false },
  
  // Easy words - Nature & Environment
  { word: 'sun', difficulty: 'easy', category: 'Nature', isPriority: false },
  { word: 'moon', difficulty: 'easy', category: 'Nature', isPriority: false },
  { word: 'tree', difficulty: 'easy', category: 'Nature', isPriority: false },
  { word: 'leaf', difficulty: 'easy', category: 'Nature', isPriority: false },
  { word: 'rain', difficulty: 'easy', category: 'Nature', isPriority: false },
  { word: 'wind', difficulty: 'easy', category: 'Nature', isPriority: false },
  { word: 'hill', difficulty: 'easy', category: 'Nature', isPriority: false },
  { word: 'star', difficulty: 'easy', category: 'Nature', isPriority: false },
  { word: 'pond', difficulty: 'easy', category: 'Nature', isPriority: false },
  { word: 'rock', difficulty: 'easy', category: 'Nature', isPriority: false },
  
  // Easy words - School & Learning
  { word: 'book', difficulty: 'easy', category: 'School', isPriority: false },
  { word: 'desk', difficulty: 'easy', category: 'School', isPriority: false },
  { word: 'pen', difficulty: 'easy', category: 'School', isPriority: false },
  { word: 'bag', difficulty: 'easy', category: 'School', isPriority: false },
  { word: 'bell', difficulty: 'easy', category: 'School', isPriority: false },
  { word: 'page', difficulty: 'easy', category: 'School', isPriority: false },
  
  // Easy words - Technology
  { word: 'mouse', difficulty: 'easy', category: 'Technology', isPriority: false },
  { word: 'key', difficulty: 'easy', category: 'Technology', isPriority: false },
  { word: 'phone', difficulty: 'easy', category: 'Technology', isPriority: false },
  { word: 'game', difficulty: 'easy', category: 'Technology', isPriority: false },
  
  // Easy words - Home & Family
  { word: 'home', difficulty: 'easy', category: 'Family', isPriority: false },
  { word: 'door', difficulty: 'easy', category: 'Family', isPriority: false },
  { word: 'room', difficulty: 'easy', category: 'Family', isPriority: false },
  { word: 'wall', difficulty: 'easy', category: 'Family', isPriority: false },
  { word: 'bed', difficulty: 'easy', category: 'Family', isPriority: false },
  
  // Medium words (5-6 letters) - Animals
  { word: 'tiger', difficulty: 'medium', category: 'Animals', isPriority: false },
  { word: 'horse', difficulty: 'medium', category: 'Animals', isPriority: false },
  { word: 'rabbit', difficulty: 'medium', category: 'Animals', isPriority: false },
  { word: 'monkey', difficulty: 'medium', category: 'Animals', isPriority: false },
  { word: 'parrot', difficulty: 'medium', category: 'Animals', isPriority: false },
  { word: 'spider', difficulty: 'medium', category: 'Animals', isPriority: false },
  { word: 'turtle', difficulty: 'medium', category: 'Animals', isPriority: false },
  { word: 'pigeon', difficulty: 'medium', category: 'Animals', isPriority: false },
  
  // Medium words - Nature & Environment
  { word: 'flower', difficulty: 'medium', category: 'Nature', isPriority: false },
  { word: 'garden', difficulty: 'medium', category: 'Nature', isPriority: false },
  { word: 'forest', difficulty: 'medium', category: 'Nature', isPriority: false },
  { word: 'river', difficulty: 'medium', category: 'Nature', isPriority: false },
  { word: 'ocean', difficulty: 'medium', category: 'Nature', isPriority: false },
  { word: 'earth', difficulty: 'medium', category: 'Nature', isPriority: false },
  { word: 'water', difficulty: 'medium', category: 'Nature', isPriority: false },
  { word: 'cloud', difficulty: 'medium', category: 'Nature', isPriority: false },
  { word: 'plant', difficulty: 'medium', category: 'Nature', isPriority: false },
  { word: 'grass', difficulty: 'medium', category: 'Nature', isPriority: false },
  { word: 'beach', difficulty: 'medium', category: 'Nature', isPriority: false },
  { word: 'stone', difficulty: 'medium', category: 'Nature', isPriority: false },
  
  // Medium words - Fruits & Food
  { word: 'apple', difficulty: 'medium', category: 'Fruits', isPriority: false },
  { word: 'mango', difficulty: 'medium', category: 'Fruits', isPriority: false },
  { word: 'orange', difficulty: 'medium', category: 'Fruits', isPriority: false },
  { word: 'banana', difficulty: 'medium', category: 'Fruits', isPriority: false },
  { word: 'grapes', difficulty: 'medium', category: 'Fruits', isPriority: false },
  { word: 'bread', difficulty: 'medium', category: 'Food', isPriority: false },
  { word: 'rice', difficulty: 'medium', category: 'Food', isPriority: false },
  { word: 'milk', difficulty: 'medium', category: 'Food', isPriority: false },
  
  // Medium words - School & Learning
  { word: 'pencil', difficulty: 'medium', category: 'School', isPriority: false },
  { word: 'school', difficulty: 'medium', category: 'School', isPriority: false },
  { word: 'teacher', difficulty: 'medium', category: 'School', isPriority: false },
  { word: 'student', difficulty: 'medium', category: 'School', isPriority: false },
  { word: 'lesson', difficulty: 'medium', category: 'School', isPriority: false },
  { word: 'chalk', difficulty: 'medium', category: 'School', isPriority: false },
  { word: 'eraser', difficulty: 'medium', category: 'School', isPriority: false },
  { word: 'ruler', difficulty: 'medium', category: 'School', isPriority: false },
  
  // Medium words - Technology
  { word: 'computer', difficulty: 'medium', category: 'Technology', isPriority: false },
  { word: 'laptop', difficulty: 'medium', category: 'Technology', isPriority: false },
  { word: 'tablet', difficulty: 'medium', category: 'Technology', isPriority: false },
  { word: 'screen', difficulty: 'medium', category: 'Technology', isPriority: false },
  { word: 'printer', difficulty: 'medium', category: 'Technology', isPriority: false },
  { word: 'keyboard', difficulty: 'medium', category: 'Technology', isPriority: false },
  { word: 'camera', difficulty: 'medium', category: 'Technology', isPriority: false },
  
  // Medium words - Family & Home
  { word: 'mother', difficulty: 'medium', category: 'Family', isPriority: false },
  { word: 'father', difficulty: 'medium', category: 'Family', isPriority: false },
  { word: 'sister', difficulty: 'medium', category: 'Family', isPriority: false },
  { word: 'brother', difficulty: 'medium', category: 'Family', isPriority: false },
  { word: 'family', difficulty: 'medium', category: 'Family', isPriority: false },
  { word: 'window', difficulty: 'medium', category: 'Family', isPriority: false },
  { word: 'kitchen', difficulty: 'medium', category: 'Family', isPriority: false },
  
  // Medium words - Body Parts & Health
  { word: 'hand', difficulty: 'easy', category: 'Body', isPriority: false },
  { word: 'feet', difficulty: 'easy', category: 'Body', isPriority: false },
  { word: 'eyes', difficulty: 'easy', category: 'Body', isPriority: false },
  { word: 'ears', difficulty: 'easy', category: 'Body', isPriority: false },
  { word: 'nose', difficulty: 'easy', category: 'Body', isPriority: false },
  { word: 'teeth', difficulty: 'medium', category: 'Body', isPriority: false },
  { word: 'finger', difficulty: 'medium', category: 'Body', isPriority: false },
  
  // Hard words (7+ letters) - Animals
  { word: 'elephant', difficulty: 'hard', category: 'Animals', isPriority: false },
  { word: 'butterfly', difficulty: 'hard', category: 'Animals', isPriority: false },
  { word: 'crocodile', difficulty: 'hard', category: 'Animals', isPriority: false },
  { word: 'peacock', difficulty: 'hard', category: 'Animals', isPriority: false },
  { word: 'sparrow', difficulty: 'hard', category: 'Animals', isPriority: false },
  
  // Hard words - Nature & Environment
  { word: 'rainbow', difficulty: 'hard', category: 'Nature', isPriority: false },
  { word: 'mountain', difficulty: 'hard', category: 'Nature', isPriority: false },
  { word: 'waterfall', difficulty: 'hard', category: 'Nature', isPriority: false },
  { word: 'environment', difficulty: 'hard', category: 'Nature', isPriority: false },
  { word: 'sunshine', difficulty: 'hard', category: 'Nature', isPriority: false },
  { word: 'weather', difficulty: 'hard', category: 'Nature', isPriority: false },
  { word: 'season', difficulty: 'medium', category: 'Nature', isPriority: false },
  { word: 'summer', difficulty: 'medium', category: 'Nature', isPriority: false },
  { word: 'winter', difficulty: 'medium', category: 'Nature', isPriority: false },
  { word: 'spring', difficulty: 'medium', category: 'Nature', isPriority: false },
  
  // Hard words - School & Learning
  { word: 'notebook', difficulty: 'hard', category: 'School', isPriority: false },
  { word: 'classroom', difficulty: 'hard', category: 'School', isPriority: false },
  { word: 'blackboard', difficulty: 'hard', category: 'School', isPriority: false },
  { word: 'homework', difficulty: 'hard', category: 'School', isPriority: false },
  { word: 'library', difficulty: 'hard', category: 'School', isPriority: false },
  
  // Hard words - Technology
  { word: 'internet', difficulty: 'hard', category: 'Technology', isPriority: false },
  { word: 'software', difficulty: 'hard', category: 'Technology', isPriority: false },
  { word: 'website', difficulty: 'hard', category: 'Technology', isPriority: false },
  { word: 'monitor', difficulty: 'hard', category: 'Technology', isPriority: false },
  { word: 'speaker', difficulty: 'hard', category: 'Technology', isPriority: false },
  
  // Hard words - Food & Daily Life
  { word: 'vegetable', difficulty: 'hard', category: 'Food', isPriority: false },
  { word: 'chocolate', difficulty: 'hard', category: 'Food', isPriority: false },
  { word: 'breakfast', difficulty: 'hard', category: 'Food', isPriority: false },
  
  // Hard words - Adjectives & Concepts
  { word: 'beautiful', difficulty: 'hard', category: 'Adjectives', isPriority: false },
  { word: 'wonderful', difficulty: 'hard', category: 'Adjectives', isPriority: false },
  { word: 'birthday', difficulty: 'hard', category: 'Events', isPriority: false },
  { word: 'umbrella', difficulty: 'hard', category: 'Objects', isPriority: false },
  
  // Medium words - Objects & Furniture
  { word: 'chair', difficulty: 'medium', category: 'Objects', isPriority: false },
  { word: 'table', difficulty: 'medium', category: 'Objects', isPriority: false },
  { word: 'bottle', difficulty: 'medium', category: 'Objects', isPriority: false },
  { word: 'basket', difficulty: 'medium', category: 'Objects', isPriority: false },
  { word: 'mirror', difficulty: 'medium', category: 'Objects', isPriority: false },
  { word: 'clock', difficulty: 'medium', category: 'Objects', isPriority: false },
  { word: 'watch', difficulty: 'medium', category: 'Objects', isPriority: false },
  
  // Colors & Shapes
  { word: 'red', difficulty: 'easy', category: 'Colors', isPriority: false },
  { word: 'blue', difficulty: 'easy', category: 'Colors', isPriority: false },
  { word: 'green', difficulty: 'easy', category: 'Colors', isPriority: false },
  { word: 'yellow', difficulty: 'medium', category: 'Colors', isPriority: false },
  { word: 'orange', difficulty: 'medium', category: 'Colors', isPriority: false },
  { word: 'purple', difficulty: 'medium', category: 'Colors', isPriority: false },
  { word: 'circle', difficulty: 'medium', category: 'Shapes', isPriority: false },
  { word: 'square', difficulty: 'medium', category: 'Shapes', isPriority: false },
  { word: 'triangle', difficulty: 'hard', category: 'Shapes', isPriority: false },
];

// Words
export const getWords = (): Word[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.WORDS);
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Initialize with default words
  const words: Word[] = DEFAULT_WORDS.map((w, idx) => ({
    ...w,
    id: `word_${idx}_${Date.now()}`,
    createdAt: new Date().toISOString(),
  }));
  
  localStorage.setItem(STORAGE_KEYS.WORDS, JSON.stringify(words));
  return words;
};

export const saveWords = (words: Word[]): void => {
  localStorage.setItem(STORAGE_KEYS.WORDS, JSON.stringify(words));
};

export const addWord = (word: Omit<Word, 'id' | 'createdAt'>): Word => {
  const words = getWords();
  const newWord: Word = {
    ...word,
    id: `word_${Date.now()}_${Math.random()}`,
    createdAt: new Date().toISOString(),
  };
  words.push(newWord);
  saveWords(words);
  return newWord;
};

export const updateWord = (id: string, updates: Partial<Word>): void => {
  const words = getWords();
  const index = words.findIndex((w) => w.id === id);
  if (index !== -1) {
    words[index] = { ...words[index], ...updates };
    saveWords(words);
  }
};

export const deleteWord = (id: string): void => {
  const words = getWords().filter((w) => w.id !== id);
  saveWords(words);
};

// Progress
export const getProgress = (): GameProgress => {
  const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
  if (stored) {
    return JSON.parse(stored);
  }
  
  const initialProgress: GameProgress = {
    totalWordsPlayed: 0,
    correctWords: 0,
    totalAttempts: 0,
    recentResults: [],
    stars: 0,
  };
  
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(initialProgress));
  return initialProgress;
};

export const saveProgress = (progress: GameProgress): void => {
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
};

export const addAttemptResult = (result: AttemptResult): void => {
  const progress = getProgress();
  
  progress.totalWordsPlayed += 1;
  progress.totalAttempts += result.attempts;
  
  if (result.correct) {
    progress.correctWords += 1;
    // Award stars based on attempts
    if (result.attempts === 1) {
      progress.stars += 3;
    } else if (result.attempts === 2) {
      progress.stars += 2;
    } else {
      progress.stars += 1;
    }
  }
  
  progress.recentResults.unshift(result);
  // Keep only last 50 results
  if (progress.recentResults.length > 50) {
    progress.recentResults = progress.recentResults.slice(0, 50);
  }
  
  saveProgress(progress);
};

export const resetProgress = (): void => {
  const initialProgress: GameProgress = {
    totalWordsPlayed: 0,
    correctWords: 0,
    totalAttempts: 0,
    recentResults: [],
    stars: 0,
  };
  saveProgress(initialProgress);
};

// Settings
export const getSettings = (): GameSettings => {
  const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  if (stored) {
    return JSON.parse(stored);
  }
  
  const defaultSettings: GameSettings = {
    maxAttempts: 3,
    hintsEnabled: true,
    audioEnabled: true,
  };
  
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(defaultSettings));
  return defaultSettings;
};

export const saveSettings = (settings: GameSettings): void => {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
};
