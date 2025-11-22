export const speakWord = (word: string, preferredVoice?: string): void => {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Function to speak with selected voice
    const speak = () => {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.7; // Slower for clarity
      utterance.pitch = 1.1; // Slightly higher pitch for female voice
      utterance.volume = 1;
      
      // Get available voices
      const voices = window.speechSynthesis.getVoices();
      
      // Debug: log available voices
      console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`));
      
      let selectedVoice = null;
      
      // If a preferred voice is specified, try to find it
      if (preferredVoice) {
        selectedVoice = voices.find(v => v.name === preferredVoice);
        if (selectedVoice) {
          console.log('Using preferred voice:', selectedVoice.name);
        }
      }
      
      // If no preferred voice or not found, use priority selection
      if (!selectedVoice) {
        // Preference order: Indian lady English > Indian English > British English > Any English
        
        // Look for Indian lady voices (female Indian English speakers)
        selectedVoice = voices.find(voice => {
          const name = voice.name.toLowerCase();
          const lang = voice.lang.toLowerCase();
          
          return (
            (lang.includes('en-in') && !name.includes('male')) || // Indian English, not male
            name.includes('veena') ||  // Common Indian female voice
            name.includes('lakshmi') || // Common Indian female voice
            name.includes('shruti') || // Common Indian female voice
            (lang.includes('hi-in') && name.includes('female')) // Hindi/Indian female
          );
        });
        
        // Look for any Indian English voice
        if (!selectedVoice) {
          selectedVoice = voices.find(voice => 
            voice.lang.includes('en-IN') || 
            voice.name.toLowerCase().includes('indian') ||
            voice.name.toLowerCase().includes('india') ||
            voice.name.toLowerCase().includes('rishi')
          );
        }
        
        // Look for British English voices (usually female by default)
        if (!selectedVoice) {
          selectedVoice = voices.find(voice => 
            voice.lang.includes('en-GB') || 
            voice.name.toLowerCase().includes('british') ||
            voice.name.toLowerCase().includes('kate') ||
            voice.name.toLowerCase().includes('moira')
          );
        }
        
        // Fallback to any English voice
        if (!selectedVoice) {
          selectedVoice = voices.find(voice => voice.lang.startsWith('en'));
        }
        
        if (selectedVoice) {
          console.log('Selected voice:', selectedVoice.name, selectedVoice.lang);
        } else {
          console.warn('No suitable voice found');
        }
      }
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    };
    
    // If voices aren't loaded yet, wait for them
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener('voiceschanged', speak, { once: true });
    } else {
      speak();
    }
  }
};

export const getHint = (word: string, attemptNumber: number): string => {
  if (attemptNumber === 1) {
    return `The word has ${word.length} letters`;
  } else if (attemptNumber === 2) {
    return `It starts with "${word[0].toUpperCase()}"`;
  } else if (attemptNumber === 3) {
    const half = Math.ceil(word.length / 2);
    return `First half: ${word.substring(0, half)}`;
  }
  return '';
};

export const getCharacterClue = (
  word: string, 
  revealedPositions: number[], 
  userInput: string
): { position: number; character: string } | null => {
  // Get positions that haven't been revealed yet
  const allPositions = Array.from({ length: word.length }, (_, i) => i);
  
  // Filter out positions that are:
  // 1. Already revealed
  // 2. Already correctly typed by the user
  const unrevealedPositions = allPositions.filter(pos => {
    if (revealedPositions.includes(pos)) return false;
    
    // Check if user has already typed this character correctly
    const userChar = userInput[pos]?.toLowerCase();
    const correctChar = word[pos]?.toLowerCase();
    
    return userChar !== correctChar;
  });
  
  if (unrevealedPositions.length === 0) {
    return null; // All characters revealed or correctly typed
  }
  
  // Pick a random unrevealed position
  const randomIndex = Math.floor(Math.random() * unrevealedPositions.length);
  const position = unrevealedPositions[randomIndex];
  
  return {
    position,
    character: word[position]
  };
};

export const compareWords = (input: string, correct: string): {
  isCorrect: boolean;
  feedback: string[];
} => {
  const inputLower = input.toLowerCase().trim();
  const correctLower = correct.toLowerCase();
  
  if (inputLower === correctLower) {
    return { isCorrect: true, feedback: [] };
  }
  
  const feedback: string[] = [];
  
  // Check length
  if (inputLower.length !== correctLower.length) {
    feedback.push(`Your word has ${inputLower.length} letters, but it should have ${correctLower.length}`);
  }
  
  // Check correct letters in correct positions
  const correctPositions: number[] = [];
  for (let i = 0; i < Math.min(inputLower.length, correctLower.length); i++) {
    if (inputLower[i] === correctLower[i]) {
      correctPositions.push(i);
    }
  }
  
  if (correctPositions.length > 0) {
    const positions = correctPositions.map(i => `${i + 1}`).join(', ');
    feedback.push(`✓ Correct letters at position(s): ${positions}`);
  }
  
  return { isCorrect: false, feedback };
};

export const getRandomWord = (words: any[], excludeIds: string[] = []): any | null => {
  const available = words.filter(w => !excludeIds.includes(w.id));
  if (available.length === 0) return null;
  
  // Prioritize priority words
  const priorityWords = available.filter(w => w.isPriority);
  const pool = priorityWords.length > 0 ? priorityWords : available;
  
  return pool[Math.floor(Math.random() * pool.length)];
};

export const calculateAccuracy = (correct: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

export const getStarRating = (attempts: number, maxAttempts: number, cluesTaken: number): number => {
  let stars = 0;
  
  // Base stars on attempts
  if (attempts === 1) {
    stars = 3;
  } else if (attempts === 2) {
    stars = 2;
  } else if (attempts <= maxAttempts) {
    stars = 1;
  }
  
  // Reduce stars based on clues taken
  // Each clue reduces by 1 star, but minimum is 0
  stars = Math.max(0, stars - cluesTaken);
  
  return stars;
};

export const getAvailableVoices = (): SpeechSynthesisVoice[] => {
  if ('speechSynthesis' in window) {
    return window.speechSynthesis.getVoices();
  }
  return [];
};

export const getEnglishVoices = (): SpeechSynthesisVoice[] => {
  const allVoices = getAvailableVoices();
  return allVoices.filter(voice => voice.lang.startsWith('en'));
};
