import type { Word, GameProgress, GameSettings, AttemptResult, Grade } from '../types';

const STORAGE_KEYS = {
  WORDS: 'spelling_game_words',
  PROGRESS: 'spelling_game_progress',
  SETTINGS: 'spelling_game_settings',
  MIGRATIONS: 'spelling_game_migrations',
};

export const GRADES: { value: Grade; label: string }[] = [
  { value: 'grade2', label: '2nd Standard' },
  { value: 'grade3', label: '3rd Standard' },
];

// Default ICSE 2nd Standard word list
export const DEFAULT_WORDS: Omit<Word, 'id' | 'createdAt'>[] = [
  // Easy words (3-4 letters) - Animals
  { word: 'cat', difficulty: 'easy', category: 'Animals', isPriority: false, grade: 'grade2' },
  { word: 'dog', difficulty: 'easy', category: 'Animals', isPriority: false, grade: 'grade2' },
  { word: 'bird', difficulty: 'easy', category: 'Animals', isPriority: false, grade: 'grade2' },
  { word: 'fish', difficulty: 'easy', category: 'Animals', isPriority: false, grade: 'grade2' },
  { word: 'frog', difficulty: 'easy', category: 'Animals', isPriority: false, grade: 'grade2' },
  { word: 'lion', difficulty: 'easy', category: 'Animals', isPriority: false, grade: 'grade2' },
  { word: 'bear', difficulty: 'easy', category: 'Animals', isPriority: false, grade: 'grade2' },
  { word: 'duck', difficulty: 'easy', category: 'Animals', isPriority: false, grade: 'grade2' },
  
  // Easy words - Nature & Environment
  { word: 'sun', difficulty: 'easy', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'moon', difficulty: 'easy', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'tree', difficulty: 'easy', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'leaf', difficulty: 'easy', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'rain', difficulty: 'easy', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'wind', difficulty: 'easy', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'hill', difficulty: 'easy', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'star', difficulty: 'easy', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'pond', difficulty: 'easy', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'rock', difficulty: 'easy', category: 'Nature', isPriority: false, grade: 'grade2' },
  
  // Easy words - School & Learning
  { word: 'book', difficulty: 'easy', category: 'School', isPriority: false, grade: 'grade2' },
  { word: 'desk', difficulty: 'easy', category: 'School', isPriority: false, grade: 'grade2' },
  { word: 'pen', difficulty: 'easy', category: 'School', isPriority: false, grade: 'grade2' },
  { word: 'bag', difficulty: 'easy', category: 'School', isPriority: false, grade: 'grade2' },
  { word: 'bell', difficulty: 'easy', category: 'School', isPriority: false, grade: 'grade2' },
  { word: 'page', difficulty: 'easy', category: 'School', isPriority: false, grade: 'grade2' },
  
  // Easy words - Technology
  { word: 'mouse', difficulty: 'easy', category: 'Technology', isPriority: false, grade: 'grade2' },
  { word: 'key', difficulty: 'easy', category: 'Technology', isPriority: false, grade: 'grade2' },
  { word: 'phone', difficulty: 'easy', category: 'Technology', isPriority: false, grade: 'grade2' },
  { word: 'game', difficulty: 'easy', category: 'Technology', isPriority: false, grade: 'grade2' },
  
  // Easy words - Home & Family
  { word: 'home', difficulty: 'easy', category: 'Family', isPriority: false, grade: 'grade2' },
  { word: 'door', difficulty: 'easy', category: 'Family', isPriority: false, grade: 'grade2' },
  { word: 'room', difficulty: 'easy', category: 'Family', isPriority: false, grade: 'grade2' },
  { word: 'wall', difficulty: 'easy', category: 'Family', isPriority: false, grade: 'grade2' },
  { word: 'bed', difficulty: 'easy', category: 'Family', isPriority: false, grade: 'grade2' },
  
  // Medium words (5-6 letters) - Animals
  { word: 'tiger', difficulty: 'medium', category: 'Animals', isPriority: false, grade: 'grade2' },
  { word: 'horse', difficulty: 'medium', category: 'Animals', isPriority: false, grade: 'grade2' },
  { word: 'rabbit', difficulty: 'medium', category: 'Animals', isPriority: false, grade: 'grade2' },
  { word: 'monkey', difficulty: 'medium', category: 'Animals', isPriority: false, grade: 'grade2' },
  { word: 'parrot', difficulty: 'medium', category: 'Animals', isPriority: false, grade: 'grade2' },
  { word: 'spider', difficulty: 'medium', category: 'Animals', isPriority: false, grade: 'grade2' },
  { word: 'turtle', difficulty: 'medium', category: 'Animals', isPriority: false, grade: 'grade2' },
  { word: 'pigeon', difficulty: 'medium', category: 'Animals', isPriority: false, grade: 'grade2' },
  
  // Medium words - Nature & Environment
  { word: 'flower', difficulty: 'medium', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'garden', difficulty: 'medium', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'forest', difficulty: 'medium', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'river', difficulty: 'medium', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'ocean', difficulty: 'medium', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'earth', difficulty: 'medium', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'water', difficulty: 'medium', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'cloud', difficulty: 'medium', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'plant', difficulty: 'medium', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'grass', difficulty: 'medium', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'beach', difficulty: 'medium', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'stone', difficulty: 'medium', category: 'Nature', isPriority: false, grade: 'grade2' },
  
  // Medium words - Fruits & Food
  { word: 'apple', difficulty: 'medium', category: 'Fruits', isPriority: false, grade: 'grade2' },
  { word: 'mango', difficulty: 'medium', category: 'Fruits', isPriority: false, grade: 'grade2' },
  { word: 'orange', difficulty: 'medium', category: 'Fruits', isPriority: false, grade: 'grade2' },
  { word: 'banana', difficulty: 'medium', category: 'Fruits', isPriority: false, grade: 'grade2' },
  { word: 'grapes', difficulty: 'medium', category: 'Fruits', isPriority: false, grade: 'grade2' },
  { word: 'bread', difficulty: 'medium', category: 'Food', isPriority: false, grade: 'grade2' },
  { word: 'rice', difficulty: 'medium', category: 'Food', isPriority: false, grade: 'grade2' },
  { word: 'milk', difficulty: 'medium', category: 'Food', isPriority: false, grade: 'grade2' },
  
  // Medium words - School & Learning
  { word: 'pencil', difficulty: 'medium', category: 'School', isPriority: false, grade: 'grade2' },
  { word: 'school', difficulty: 'medium', category: 'School', isPriority: false, grade: 'grade2' },
  { word: 'teacher', difficulty: 'medium', category: 'School', isPriority: false, grade: 'grade2' },
  { word: 'student', difficulty: 'medium', category: 'School', isPriority: false, grade: 'grade2' },
  { word: 'lesson', difficulty: 'medium', category: 'School', isPriority: false, grade: 'grade2' },
  { word: 'chalk', difficulty: 'medium', category: 'School', isPriority: false, grade: 'grade2' },
  { word: 'eraser', difficulty: 'medium', category: 'School', isPriority: false, grade: 'grade2' },
  { word: 'ruler', difficulty: 'medium', category: 'School', isPriority: false, grade: 'grade2' },
  
  // Medium words - Technology
  { word: 'computer', difficulty: 'medium', category: 'Technology', isPriority: false, grade: 'grade2' },
  { word: 'laptop', difficulty: 'medium', category: 'Technology', isPriority: false, grade: 'grade2' },
  { word: 'tablet', difficulty: 'medium', category: 'Technology', isPriority: false, grade: 'grade2' },
  { word: 'screen', difficulty: 'medium', category: 'Technology', isPriority: false, grade: 'grade2' },
  { word: 'printer', difficulty: 'medium', category: 'Technology', isPriority: false, grade: 'grade2' },
  { word: 'keyboard', difficulty: 'medium', category: 'Technology', isPriority: false, grade: 'grade2' },
  { word: 'camera', difficulty: 'medium', category: 'Technology', isPriority: false, grade: 'grade2' },
  
  // Medium words - Family & Home
  { word: 'mother', difficulty: 'medium', category: 'Family', isPriority: false, grade: 'grade2' },
  { word: 'father', difficulty: 'medium', category: 'Family', isPriority: false, grade: 'grade2' },
  { word: 'sister', difficulty: 'medium', category: 'Family', isPriority: false, grade: 'grade2' },
  { word: 'brother', difficulty: 'medium', category: 'Family', isPriority: false, grade: 'grade2' },
  { word: 'family', difficulty: 'medium', category: 'Family', isPriority: false, grade: 'grade2' },
  { word: 'window', difficulty: 'medium', category: 'Family', isPriority: false, grade: 'grade2' },
  { word: 'kitchen', difficulty: 'medium', category: 'Family', isPriority: false, grade: 'grade2' },
  
  // Medium words - Body Parts & Health
  { word: 'hand', difficulty: 'easy', category: 'Body', isPriority: false, grade: 'grade2' },
  { word: 'feet', difficulty: 'easy', category: 'Body', isPriority: false, grade: 'grade2' },
  { word: 'eyes', difficulty: 'easy', category: 'Body', isPriority: false, grade: 'grade2' },
  { word: 'ears', difficulty: 'easy', category: 'Body', isPriority: false, grade: 'grade2' },
  { word: 'nose', difficulty: 'easy', category: 'Body', isPriority: false, grade: 'grade2' },
  { word: 'teeth', difficulty: 'medium', category: 'Body', isPriority: false, grade: 'grade2' },
  { word: 'finger', difficulty: 'medium', category: 'Body', isPriority: false, grade: 'grade2' },
  
  // Hard words (7+ letters) - Animals
  { word: 'elephant', difficulty: 'hard', category: 'Animals', isPriority: false, grade: 'grade2' },
  { word: 'butterfly', difficulty: 'hard', category: 'Animals', isPriority: false, grade: 'grade2' },
  { word: 'crocodile', difficulty: 'hard', category: 'Animals', isPriority: false, grade: 'grade2' },
  { word: 'peacock', difficulty: 'hard', category: 'Animals', isPriority: false, grade: 'grade2' },
  { word: 'sparrow', difficulty: 'hard', category: 'Animals', isPriority: false, grade: 'grade2' },
  
  // Hard words - Nature & Environment
  { word: 'rainbow', difficulty: 'hard', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'mountain', difficulty: 'hard', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'waterfall', difficulty: 'hard', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'environment', difficulty: 'hard', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'sunshine', difficulty: 'hard', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'weather', difficulty: 'hard', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'season', difficulty: 'medium', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'summer', difficulty: 'medium', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'winter', difficulty: 'medium', category: 'Nature', isPriority: false, grade: 'grade2' },
  { word: 'spring', difficulty: 'medium', category: 'Nature', isPriority: false, grade: 'grade2' },
  
  // Hard words - School & Learning
  { word: 'notebook', difficulty: 'hard', category: 'School', isPriority: false, grade: 'grade2' },
  { word: 'classroom', difficulty: 'hard', category: 'School', isPriority: false, grade: 'grade2' },
  { word: 'blackboard', difficulty: 'hard', category: 'School', isPriority: false, grade: 'grade2' },
  { word: 'homework', difficulty: 'hard', category: 'School', isPriority: false, grade: 'grade2' },
  { word: 'library', difficulty: 'hard', category: 'School', isPriority: false, grade: 'grade2' },
  
  // Hard words - Technology
  { word: 'internet', difficulty: 'hard', category: 'Technology', isPriority: false, grade: 'grade2' },
  { word: 'software', difficulty: 'hard', category: 'Technology', isPriority: false, grade: 'grade2' },
  { word: 'website', difficulty: 'hard', category: 'Technology', isPriority: false, grade: 'grade2' },
  { word: 'monitor', difficulty: 'hard', category: 'Technology', isPriority: false, grade: 'grade2' },
  { word: 'speaker', difficulty: 'hard', category: 'Technology', isPriority: false, grade: 'grade2' },
  
  // Hard words - Food & Daily Life
  { word: 'vegetable', difficulty: 'hard', category: 'Food', isPriority: false, grade: 'grade2' },
  { word: 'chocolate', difficulty: 'hard', category: 'Food', isPriority: false, grade: 'grade2' },
  { word: 'breakfast', difficulty: 'hard', category: 'Food', isPriority: false, grade: 'grade2' },
  
  // Hard words - Adjectives & Concepts
  { word: 'beautiful', difficulty: 'hard', category: 'Adjectives', isPriority: false, grade: 'grade2' },
  { word: 'wonderful', difficulty: 'hard', category: 'Adjectives', isPriority: false, grade: 'grade2' },
  { word: 'birthday', difficulty: 'hard', category: 'Events', isPriority: false, grade: 'grade2' },
  { word: 'umbrella', difficulty: 'hard', category: 'Objects', isPriority: false, grade: 'grade2' },
  
  // Medium words - Objects & Furniture
  { word: 'chair', difficulty: 'medium', category: 'Objects', isPriority: false, grade: 'grade2' },
  { word: 'table', difficulty: 'medium', category: 'Objects', isPriority: false, grade: 'grade2' },
  { word: 'bottle', difficulty: 'medium', category: 'Objects', isPriority: false, grade: 'grade2' },
  { word: 'basket', difficulty: 'medium', category: 'Objects', isPriority: false, grade: 'grade2' },
  { word: 'mirror', difficulty: 'medium', category: 'Objects', isPriority: false, grade: 'grade2' },
  { word: 'clock', difficulty: 'medium', category: 'Objects', isPriority: false, grade: 'grade2' },
  { word: 'watch', difficulty: 'medium', category: 'Objects', isPriority: false, grade: 'grade2' },
  
  // Colors & Shapes
  { word: 'red', difficulty: 'easy', category: 'Colors', isPriority: false, grade: 'grade2' },
  { word: 'blue', difficulty: 'easy', category: 'Colors', isPriority: false, grade: 'grade2' },
  { word: 'green', difficulty: 'easy', category: 'Colors', isPriority: false, grade: 'grade2' },
  { word: 'yellow', difficulty: 'medium', category: 'Colors', isPriority: false, grade: 'grade2' },
  { word: 'orange', difficulty: 'medium', category: 'Colors', isPriority: false, grade: 'grade2' },
  { word: 'purple', difficulty: 'medium', category: 'Colors', isPriority: false, grade: 'grade2' },
  { word: 'circle', difficulty: 'medium', category: 'Shapes', isPriority: false, grade: 'grade2' },
  { word: 'square', difficulty: 'medium', category: 'Shapes', isPriority: false, grade: 'grade2' },
  { word: 'triangle', difficulty: 'hard', category: 'Shapes', isPriority: false, grade: 'grade2' },
];

// Default ICSE 3rd Standard word list
export const DEFAULT_WORDS_GRADE3: Omit<Word, 'id' | 'createdAt'>[] = [
  // Transportation
  { word: 'train', difficulty: 'easy', category: 'Transportation', isPriority: false, grade: 'grade3' },
  { word: 'plane', difficulty: 'easy', category: 'Transportation', isPriority: false, grade: 'grade3' },
  { word: 'truck', difficulty: 'easy', category: 'Transportation', isPriority: false, grade: 'grade3' },
  { word: 'boat', difficulty: 'easy', category: 'Transportation', isPriority: false, grade: 'grade3' },
  { word: 'bicycle', difficulty: 'medium', category: 'Transportation', isPriority: false, grade: 'grade3' },
  { word: 'scooter', difficulty: 'medium', category: 'Transportation', isPriority: false, grade: 'grade3' },
  { word: 'tractor', difficulty: 'medium', category: 'Transportation', isPriority: false, grade: 'grade3' },
  { word: 'ambulance', difficulty: 'hard', category: 'Transportation', isPriority: false, grade: 'grade3' },
  { word: 'submarine', difficulty: 'hard', category: 'Transportation', isPriority: false, grade: 'grade3' },
  { word: 'helicopter', difficulty: 'hard', category: 'Transportation', isPriority: false, grade: 'grade3' },

  // Professions
  { word: 'cook', difficulty: 'easy', category: 'Professions', isPriority: false, grade: 'grade3' },
  { word: 'nurse', difficulty: 'easy', category: 'Professions', isPriority: false, grade: 'grade3' },
  { word: 'actor', difficulty: 'easy', category: 'Professions', isPriority: false, grade: 'grade3' },
  { word: 'doctor', difficulty: 'medium', category: 'Professions', isPriority: false, grade: 'grade3' },
  { word: 'farmer', difficulty: 'medium', category: 'Professions', isPriority: false, grade: 'grade3' },
  { word: 'dancer', difficulty: 'medium', category: 'Professions', isPriority: false, grade: 'grade3' },
  { word: 'singer', difficulty: 'medium', category: 'Professions', isPriority: false, grade: 'grade3' },
  { word: 'painter', difficulty: 'medium', category: 'Professions', isPriority: false, grade: 'grade3' },
  { word: 'dentist', difficulty: 'medium', category: 'Professions', isPriority: false, grade: 'grade3' },
  { word: 'engineer', difficulty: 'hard', category: 'Professions', isPriority: false, grade: 'grade3' },
  { word: 'scientist', difficulty: 'hard', category: 'Professions', isPriority: false, grade: 'grade3' },
  { word: 'carpenter', difficulty: 'hard', category: 'Professions', isPriority: false, grade: 'grade3' },
  { word: 'policeman', difficulty: 'hard', category: 'Professions', isPriority: false, grade: 'grade3' },
  { word: 'firefighter', difficulty: 'hard', category: 'Professions', isPriority: false, grade: 'grade3' },

  // Festivals & Culture
  { word: 'holi', difficulty: 'easy', category: 'Festivals', isPriority: false, grade: 'grade3' },
  { word: 'eid', difficulty: 'easy', category: 'Festivals', isPriority: false, grade: 'grade3' },
  { word: 'rakhi', difficulty: 'easy', category: 'Festivals', isPriority: false, grade: 'grade3' },
  { word: 'diwali', difficulty: 'medium', category: 'Festivals', isPriority: false, grade: 'grade3' },
  { word: 'pongal', difficulty: 'medium', category: 'Festivals', isPriority: false, grade: 'grade3' },
  { word: 'sweets', difficulty: 'medium', category: 'Festivals', isPriority: false, grade: 'grade3' },
  { word: 'costume', difficulty: 'medium', category: 'Festivals', isPriority: false, grade: 'grade3' },
  { word: 'festival', difficulty: 'hard', category: 'Festivals', isPriority: false, grade: 'grade3' },
  { word: 'fireworks', difficulty: 'hard', category: 'Festivals', isPriority: false, grade: 'grade3' },
  { word: 'tradition', difficulty: 'hard', category: 'Festivals', isPriority: false, grade: 'grade3' },

  // Space & Solar System
  { word: 'comet', difficulty: 'easy', category: 'Space', isPriority: false, grade: 'grade3' },
  { word: 'orbit', difficulty: 'easy', category: 'Space', isPriority: false, grade: 'grade3' },
  { word: 'planet', difficulty: 'medium', category: 'Space', isPriority: false, grade: 'grade3' },
  { word: 'rocket', difficulty: 'medium', category: 'Space', isPriority: false, grade: 'grade3' },
  { word: 'galaxy', difficulty: 'hard', category: 'Space', isPriority: false, grade: 'grade3' },
  { word: 'universe', difficulty: 'hard', category: 'Space', isPriority: false, grade: 'grade3' },
  { word: 'astronaut', difficulty: 'hard', category: 'Space', isPriority: false, grade: 'grade3' },
  { word: 'satellite', difficulty: 'hard', category: 'Space', isPriority: false, grade: 'grade3' },
  { word: 'telescope', difficulty: 'hard', category: 'Space', isPriority: false, grade: 'grade3' },

  // Sports
  { word: 'team', difficulty: 'easy', category: 'Sports', isPriority: false, grade: 'grade3' },
  { word: 'coach', difficulty: 'easy', category: 'Sports', isPriority: false, grade: 'grade3' },
  { word: 'cricket', difficulty: 'medium', category: 'Sports', isPriority: false, grade: 'grade3' },
  { word: 'hockey', difficulty: 'medium', category: 'Sports', isPriority: false, grade: 'grade3' },
  { word: 'tennis', difficulty: 'medium', category: 'Sports', isPriority: false, grade: 'grade3' },
  { word: 'soccer', difficulty: 'medium', category: 'Sports', isPriority: false, grade: 'grade3' },
  { word: 'athlete', difficulty: 'medium', category: 'Sports', isPriority: false, grade: 'grade3' },
  { word: 'swimming', difficulty: 'hard', category: 'Sports', isPriority: false, grade: 'grade3' },
  { word: 'referee', difficulty: 'hard', category: 'Sports', isPriority: false, grade: 'grade3' },
  { word: 'stadium', difficulty: 'hard', category: 'Sports', isPriority: false, grade: 'grade3' },
  { word: 'champion', difficulty: 'hard', category: 'Sports', isPriority: false, grade: 'grade3' },
  { word: 'badminton', difficulty: 'hard', category: 'Sports', isPriority: false, grade: 'grade3' },

  // Emotions & Feelings
  { word: 'happy', difficulty: 'easy', category: 'Emotions', isPriority: false, grade: 'grade3' },
  { word: 'sad', difficulty: 'easy', category: 'Emotions', isPriority: false, grade: 'grade3' },
  { word: 'calm', difficulty: 'easy', category: 'Emotions', isPriority: false, grade: 'grade3' },
  { word: 'angry', difficulty: 'medium', category: 'Emotions', isPriority: false, grade: 'grade3' },
  { word: 'excited', difficulty: 'medium', category: 'Emotions', isPriority: false, grade: 'grade3' },
  { word: 'nervous', difficulty: 'medium', category: 'Emotions', isPriority: false, grade: 'grade3' },
  { word: 'curious', difficulty: 'medium', category: 'Emotions', isPriority: false, grade: 'grade3' },
  { word: 'confident', difficulty: 'hard', category: 'Emotions', isPriority: false, grade: 'grade3' },
  { word: 'surprised', difficulty: 'hard', category: 'Emotions', isPriority: false, grade: 'grade3' },
  { word: 'grateful', difficulty: 'hard', category: 'Emotions', isPriority: false, grade: 'grade3' },

  // Human Body & Health
  { word: 'brain', difficulty: 'easy', category: 'Body', isPriority: false, grade: 'grade3' },
  { word: 'skin', difficulty: 'easy', category: 'Body', isPriority: false, grade: 'grade3' },
  { word: 'bone', difficulty: 'easy', category: 'Body', isPriority: false, grade: 'grade3' },
  { word: 'muscle', difficulty: 'medium', category: 'Body', isPriority: false, grade: 'grade3' },
  { word: 'stomach', difficulty: 'medium', category: 'Body', isPriority: false, grade: 'grade3' },
  { word: 'kidney', difficulty: 'medium', category: 'Body', isPriority: false, grade: 'grade3' },
  { word: 'lungs', difficulty: 'medium', category: 'Body', isPriority: false, grade: 'grade3' },
  { word: 'skeleton', difficulty: 'hard', category: 'Body', isPriority: false, grade: 'grade3' },
  { word: 'digestion', difficulty: 'hard', category: 'Body', isPriority: false, grade: 'grade3' },
  { word: 'breathing', difficulty: 'hard', category: 'Body', isPriority: false, grade: 'grade3' },

  // Nature & Environment
  { word: 'lake', difficulty: 'easy', category: 'Nature', isPriority: false, grade: 'grade3' },
  { word: 'cave', difficulty: 'easy', category: 'Nature', isPriority: false, grade: 'grade3' },
  { word: 'desert', difficulty: 'medium', category: 'Nature', isPriority: false, grade: 'grade3' },
  { word: 'valley', difficulty: 'medium', category: 'Nature', isPriority: false, grade: 'grade3' },
  { word: 'island', difficulty: 'medium', category: 'Nature', isPriority: false, grade: 'grade3' },
  { word: 'jungle', difficulty: 'medium', category: 'Nature', isPriority: false, grade: 'grade3' },
  { word: 'meadow', difficulty: 'medium', category: 'Nature', isPriority: false, grade: 'grade3' },
  { word: 'volcano', difficulty: 'hard', category: 'Nature', isPriority: false, grade: 'grade3' },
  { word: 'glacier', difficulty: 'hard', category: 'Nature', isPriority: false, grade: 'grade3' },
  { word: 'pollution', difficulty: 'hard', category: 'Nature', isPriority: false, grade: 'grade3' },
  { word: 'climate', difficulty: 'hard', category: 'Nature', isPriority: false, grade: 'grade3' },

  // School & Learning
  { word: 'exam', difficulty: 'easy', category: 'School', isPriority: false, grade: 'grade3' },
  { word: 'quiz', difficulty: 'easy', category: 'School', isPriority: false, grade: 'grade3' },
  { word: 'uniform', difficulty: 'medium', category: 'School', isPriority: false, grade: 'grade3' },
  { word: 'subject', difficulty: 'medium', category: 'School', isPriority: false, grade: 'grade3' },
  { word: 'assembly', difficulty: 'medium', category: 'School', isPriority: false, grade: 'grade3' },
  { word: 'timetable', difficulty: 'medium', category: 'School', isPriority: false, grade: 'grade3' },
  { word: 'dictionary', difficulty: 'hard', category: 'School', isPriority: false, grade: 'grade3' },
  { word: 'calculator', difficulty: 'hard', category: 'School', isPriority: false, grade: 'grade3' },
  { word: 'principal', difficulty: 'hard', category: 'School', isPriority: false, grade: 'grade3' },
  { word: 'examination', difficulty: 'hard', category: 'School', isPriority: false, grade: 'grade3' },

  // Technology
  { word: 'robot', difficulty: 'easy', category: 'Technology', isPriority: false, grade: 'grade3' },
  { word: 'message', difficulty: 'medium', category: 'Technology', isPriority: false, grade: 'grade3' },
  { word: 'headphones', difficulty: 'medium', category: 'Technology', isPriority: false, grade: 'grade3' },
  { word: 'television', difficulty: 'hard', category: 'Technology', isPriority: false, grade: 'grade3' },
  { word: 'microwave', difficulty: 'hard', category: 'Technology', isPriority: false, grade: 'grade3' },
  { word: 'refrigerator', difficulty: 'hard', category: 'Technology', isPriority: false, grade: 'grade3' },

  // Adjectives & Descriptive Words
  { word: 'tiny', difficulty: 'easy', category: 'Adjectives', isPriority: false, grade: 'grade3' },
  { word: 'quick', difficulty: 'easy', category: 'Adjectives', isPriority: false, grade: 'grade3' },
  { word: 'brave', difficulty: 'easy', category: 'Adjectives', isPriority: false, grade: 'grade3' },
  { word: 'enormous', difficulty: 'medium', category: 'Adjectives', isPriority: false, grade: 'grade3' },
  { word: 'ancient', difficulty: 'medium', category: 'Adjectives', isPriority: false, grade: 'grade3' },
  { word: 'modern', difficulty: 'medium', category: 'Adjectives', isPriority: false, grade: 'grade3' },
  { word: 'delicious', difficulty: 'medium', category: 'Adjectives', isPriority: false, grade: 'grade3' },
  { word: 'gigantic', difficulty: 'hard', category: 'Adjectives', isPriority: false, grade: 'grade3' },
  { word: 'mysterious', difficulty: 'hard', category: 'Adjectives', isPriority: false, grade: 'grade3' },
  { word: 'dangerous', difficulty: 'hard', category: 'Adjectives', isPriority: false, grade: 'grade3' },
  { word: 'comfortable', difficulty: 'hard', category: 'Adjectives', isPriority: false, grade: 'grade3' },

  // Community & Places
  { word: 'park', difficulty: 'easy', category: 'Community', isPriority: false, grade: 'grade3' },
  { word: 'shop', difficulty: 'easy', category: 'Community', isPriority: false, grade: 'grade3' },
  { word: 'farm', difficulty: 'easy', category: 'Community', isPriority: false, grade: 'grade3' },
  { word: 'hospital', difficulty: 'medium', category: 'Community', isPriority: false, grade: 'grade3' },
  { word: 'market', difficulty: 'medium', category: 'Community', isPriority: false, grade: 'grade3' },
  { word: 'station', difficulty: 'medium', category: 'Community', isPriority: false, grade: 'grade3' },
  { word: 'temple', difficulty: 'medium', category: 'Community', isPriority: false, grade: 'grade3' },
  { word: 'museum', difficulty: 'hard', category: 'Community', isPriority: false, grade: 'grade3' },
  { word: 'restaurant', difficulty: 'hard', category: 'Community', isPriority: false, grade: 'grade3' },
  { word: 'playground', difficulty: 'hard', category: 'Community', isPriority: false, grade: 'grade3' },
  { word: 'neighbourhood', difficulty: 'hard', category: 'Community', isPriority: false, grade: 'grade3' },

  // Musical Instruments
  { word: 'drum', difficulty: 'easy', category: 'Music', isPriority: false, grade: 'grade3' },
  { word: 'flute', difficulty: 'easy', category: 'Music', isPriority: false, grade: 'grade3' },
  { word: 'guitar', difficulty: 'medium', category: 'Music', isPriority: false, grade: 'grade3' },
  { word: 'violin', difficulty: 'medium', category: 'Music', isPriority: false, grade: 'grade3' },
  { word: 'piano', difficulty: 'medium', category: 'Music', isPriority: false, grade: 'grade3' },
  { word: 'trumpet', difficulty: 'hard', category: 'Music', isPriority: false, grade: 'grade3' },
  { word: 'harmonium', difficulty: 'hard', category: 'Music', isPriority: false, grade: 'grade3' },

  // Time & Calendar
  { word: 'today', difficulty: 'easy', category: 'Time', isPriority: false, grade: 'grade3' },
  { word: 'week', difficulty: 'easy', category: 'Time', isPriority: false, grade: 'grade3' },
  { word: 'month', difficulty: 'easy', category: 'Time', isPriority: false, grade: 'grade3' },
  { word: 'morning', difficulty: 'medium', category: 'Time', isPriority: false, grade: 'grade3' },
  { word: 'evening', difficulty: 'medium', category: 'Time', isPriority: false, grade: 'grade3' },
  { word: 'weekday', difficulty: 'medium', category: 'Time', isPriority: false, grade: 'grade3' },
  { word: 'weekend', difficulty: 'medium', category: 'Time', isPriority: false, grade: 'grade3' },
  { word: 'calendar', difficulty: 'hard', category: 'Time', isPriority: false, grade: 'grade3' },
  { word: 'afternoon', difficulty: 'hard', category: 'Time', isPriority: false, grade: 'grade3' },
  { word: 'yesterday', difficulty: 'hard', category: 'Time', isPriority: false, grade: 'grade3' },
  { word: 'tomorrow', difficulty: 'hard', category: 'Time', isPriority: false, grade: 'grade3' },
];

// Migrations
// A one-time, idempotent record of which content migrations have already run
// for this browser. Gated on "did this migration run" rather than "is the
// content present", so a word a parent deliberately deletes never comes back.
const getAppliedMigrations = (): string[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.MIGRATIONS);
  return stored ? JSON.parse(stored) : [];
};

const markMigrationApplied = (id: string): void => {
  const applied = getAppliedMigrations();
  if (!applied.includes(id)) {
    localStorage.setItem(STORAGE_KEYS.MIGRATIONS, JSON.stringify([...applied, id]));
  }
};

const GRADE3_WORDS_MIGRATION = 'grade3-words-v1';

const withGradeDefault = (w: Word): Word => ({ ...w, grade: w.grade ?? 'grade2' });

const toWord = (w: Omit<Word, 'id' | 'createdAt'>, idx: number): Word => ({
  ...w,
  id: `word_${idx}_${Date.now()}_${Math.random()}`,
  createdAt: new Date().toISOString(),
});

// Appends any DEFAULT_WORDS_GRADE3 entries not already present, exactly once
// per browser. Returns the (possibly unchanged) word list plus whether it
// actually changed, so the caller only writes to storage when needed.
const applyGrade3WordsMigration = (words: Word[]): { words: Word[]; changed: boolean } => {
  if (getAppliedMigrations().includes(GRADE3_WORDS_MIGRATION)) {
    return { words, changed: false };
  }

  const existing = new Set(
    words.filter(w => w.grade === 'grade3').map(w => w.word.toLowerCase())
  );
  const toAdd = DEFAULT_WORDS_GRADE3.filter(w => !existing.has(w.word.toLowerCase()));
  const merged = [...words, ...toAdd.map((w, idx) => toWord(w, words.length + idx))];

  markMigrationApplied(GRADE3_WORDS_MIGRATION);
  return { words: merged, changed: true };
};

// Words
export const getWords = (): Word[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.WORDS);
  let words: Word[];
  let changed = false;

  if (stored) {
    words = JSON.parse(stored).map(withGradeDefault);
  } else {
    words = DEFAULT_WORDS.map(toWord);
    changed = true;
  }

  const migrated = applyGrade3WordsMigration(words);
  words = migrated.words;
  changed = changed || migrated.changed;

  if (changed) {
    localStorage.setItem(STORAGE_KEYS.WORDS, JSON.stringify(words));
  }

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
export const DEFAULT_SETTINGS: GameSettings = {
  maxAttempts: 3,
  hintsEnabled: true,
  audioEnabled: true,
  grade: 'grade2',
};

export const getSettings = (): GameSettings => {
  const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  if (stored) {
    // Backfill grade for settings saved before this field existed, without
    // forcing a write on every read — it persists next time saveSettings runs.
    return { grade: 'grade2', ...JSON.parse(stored) };
  }

  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
  return DEFAULT_SETTINGS;
};

export const saveSettings = (settings: GameSettings): void => {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
};
