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
export type Subject = 'english' | 'maths' | 'knowledge';
export type MathsSubtopic = 'addition' | 'subtraction' | 'multiplication' | 'division';

export type KnowledgeSubject = 'science' | 'gk' | 'health';
export type QuestionType = 'mcq' | 'truefalse';

export interface QuizQuestion {
  id: string;
  subject: KnowledgeSubject;
  grade: Grade;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  category?: string;
}
