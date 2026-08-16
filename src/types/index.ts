export type Grade = 'grade2' | 'grade3';

export interface Word {
  id: string;
  word: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category?: string;
  isPriority: boolean;
  createdAt: string;
  grade?: Grade;
}

export interface GameSettings {
  maxAttempts: number;
  hintsEnabled: boolean;
  audioEnabled: boolean;
  preferredVoice?: string;
  grade?: Grade;
}

export interface AttemptResult {
  wordId: string;
  word: string;
  attempts: number;
  correct: boolean;
  timestamp: string;
}

export interface GameProgress {
  totalWordsPlayed: number;
  correctWords: number;
  totalAttempts: number;
  recentResults: AttemptResult[];
  stars: number;
}

export type GameMode = 'parent' | 'child';
export type Subject = 'english' | 'maths';
export type MathsSubtopic = 'addition' | 'subtraction' | 'multiplication' | 'division';
