import { useState, useEffect } from 'react';
import { useWords } from '../hooks/useWords';
import { useProgress } from '../hooks/useProgress';
import type { Word, GameSettings } from '../types';
import { getSettings, saveSettings, resetProgress } from '../utils/localStorage';
import { getEnglishVoices, speakWord } from '../utils/gameHelpers';
import './ParentMode.css';

interface ParentModeProps {
  onBack: () => void;
}

const ParentMode = ({ onBack }: ParentModeProps) => {
  const { words, addWord, updateWord, deleteWord, togglePriority } = useWords();
  const { progress } = useProgress();
  const [activeTab, setActiveTab] = useState<'words' | 'progress' | 'settings'>('words');
  const [settings, setSettings] = useState<GameSettings>(getSettings());
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingWord, setEditingWord] = useState<Word | null>(null);
  const [testWord, setTestWord] = useState('hello');
  const [newWord, setNewWord] = useState({
    word: '',
    difficulty: 'easy' as const,
    category: '',
  });

  // Load available voices on component mount
  useEffect(() => {
    const loadVoices = () => {
      const voices = getEnglishVoices();
      setAvailableVoices(voices);
      console.log('Available English voices:', voices.map(v => `${v.name} (${v.lang})`));
    };

    // Load voices immediately if available
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.getVoices().length > 0) {
        loadVoices();
      } else {
        // Wait for voices to be loaded
        window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
        return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      }
    }
  }, []);

  const handleAddWord = () => {
    if (newWord.word.trim()) {
      addWord({
        word: newWord.word.trim(),
        difficulty: newWord.difficulty,
        category: newWord.category || undefined,
        isPriority: false,
      });
      setNewWord({ word: '', difficulty: 'easy', category: '' });
      setShowAddForm(false);
    }
  };

  const handleUpdateWord = () => {
    if (editingWord && editingWord.word.trim()) {
      updateWord(editingWord.id, {
        word: editingWord.word.trim(),
        difficulty: editingWord.difficulty,
        category: editingWord.category,
      });
      setEditingWord(null);
    }
  };

  const handleSettingsChange = (key: keyof GameSettings, value: any) => {
    const updatedSettings = { ...settings, [key]: value };
    setSettings(updatedSettings);
    saveSettings(updatedSettings);
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress();
      window.location.reload();
    }
  };

  const accuracy = progress.totalWordsPlayed > 0 
    ? Math.round((progress.correctWords / progress.totalWordsPlayed) * 100)
    : 0;

  return (
    <div className="parent-mode-container">
      <div className="parent-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h1>👨‍👩‍👧 Parent Dashboard</h1>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'words' ? 'active' : ''}`}
          onClick={() => setActiveTab('words')}
        >
          📚 Words ({words.length})
        </button>
        <button 
          className={`tab ${activeTab === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          📊 Progress
        </button>
        <button 
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          ⚙️ Settings
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'words' && (
          <div className="words-tab">
            <div className="words-header">
              <h2>Manage Words</h2>
              <button className="add-button" onClick={() => setShowAddForm(!showAddForm)}>
                {showAddForm ? '✖ Cancel' : '+ Add Word'}
              </button>
            </div>

            {showAddForm && (
              <div className="add-word-form">
                <input
                  type="text"
                  placeholder="Enter word"
                  value={newWord.word}
                  onChange={(e) => setNewWord({ ...newWord, word: e.target.value })}
                  className="word-input"
                />
                <select
                  value={newWord.difficulty}
                  onChange={(e) => setNewWord({ ...newWord, difficulty: e.target.value as any })}
                  className="difficulty-select"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                <input
                  type="text"
                  placeholder="Category (optional)"
                  value={newWord.category}
                  onChange={(e) => setNewWord({ ...newWord, category: e.target.value })}
                  className="category-input"
                />
                <button onClick={handleAddWord} className="save-button">Save</button>
              </div>
            )}

            <div className="words-list">
              {words.map((word) => (
                <div key={word.id} className="word-item">
                  {editingWord?.id === word.id ? (
                    <div className="edit-word-form">
                      <input
                        type="text"
                        value={editingWord.word}
                        onChange={(e) => setEditingWord({ ...editingWord, word: e.target.value })}
                        className="word-input-edit"
                      />
                      <select
                        value={editingWord.difficulty}
                        onChange={(e) => setEditingWord({ ...editingWord, difficulty: e.target.value as any })}
                        className="difficulty-select-edit"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Category"
                        value={editingWord.category || ''}
                        onChange={(e) => setEditingWord({ ...editingWord, category: e.target.value })}
                        className="category-input-edit"
                      />
                      <button onClick={handleUpdateWord} className="save-btn-small">✓</button>
                      <button onClick={() => setEditingWord(null)} className="cancel-btn-small">✖</button>
                    </div>
                  ) : (
                    <>
                      <div className="word-info">
                        <div className="word-text">
                          {word.word}
                          {word.isPriority && <span className="priority-badge">⭐ Priority</span>}
                        </div>
                        <div className="word-meta">
                          <span className={`difficulty-badge ${word.difficulty}`}>{word.difficulty}</span>
                          {word.category && <span className="category-badge">{word.category}</span>}
                        </div>
                      </div>
                      <div className="word-actions">
                        <button onClick={() => togglePriority(word.id)} className="action-btn">
                          {word.isPriority ? '⭐' : '☆'}
                        </button>
                        <button onClick={() => setEditingWord(word)} className="action-btn">✏️</button>
                        <button onClick={() => {
                          if (window.confirm(`Delete "${word.word}"?`)) deleteWord(word.id);
                        }} className="action-btn delete">🗑️</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="progress-tab">
            <h2>📊 Learning Progress</h2>
            
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🎯</div>
                <div className="stat-value">{progress.totalWordsPlayed}</div>
                <div className="stat-label">Words Practiced</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-value">{progress.correctWords}</div>
                <div className="stat-label">Correct Spellings</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">📈</div>
                <div className="stat-value">{accuracy}%</div>
                <div className="stat-label">Accuracy</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-value">{progress.stars}</div>
                <div className="stat-label">Total Stars</div>
              </div>
            </div>

            <div className="recent-results">
              <h3>Recent Attempts</h3>
              {progress.recentResults.length === 0 ? (
                <p className="no-results">No attempts yet. Start playing!</p>
              ) : (
                <div className="results-list">
                  {progress.recentResults.slice(0, 10).map((result, idx) => (
                    <div key={idx} className={`result-item ${result.correct ? 'correct' : 'incorrect'}`}>
                      <span className="result-word">{result.word}</span>
                      <span className="result-status">
                        {result.correct ? '✓' : '✗'} 
                        {result.correct && ` (${result.attempts} attempt${result.attempts > 1 ? 's' : ''})`}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="reset-section">
              <h3>⚠️ Reset Progress</h3>
              <p className="reset-warning">
                This will permanently delete all game progress, scores, and statistics. This action cannot be undone.
              </p>
              <button onClick={handleResetProgress} className="reset-button">
                🔄 Reset All Progress
              </button>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-tab">
            <h2>⚙️ Game Settings</h2>
            
            <div className="settings-list">
              <div className="setting-item">
                <label>Maximum Attempts per Word</label>
                <select
                  value={settings.maxAttempts}
                  onChange={(e) => handleSettingsChange('maxAttempts', parseInt(e.target.value))}
                  className="setting-select"
                >
                  <option value="2">2 attempts</option>
                  <option value="3">3 attempts</option>
                  <option value="4">4 attempts</option>
                  <option value="5">5 attempts</option>
                </select>
              </div>

              <div className="setting-item">
                <label>Enable Hints</label>
                <button
                  onClick={() => handleSettingsChange('hintsEnabled', !settings.hintsEnabled)}
                  className={`toggle-button ${settings.hintsEnabled ? 'active' : ''}`}
                >
                  {settings.hintsEnabled ? 'ON' : 'OFF'}
                </button>
              </div>

              <div className="setting-item">
                <label>Enable Audio Pronunciation</label>
                <button
                  onClick={() => handleSettingsChange('audioEnabled', !settings.audioEnabled)}
                  className={`toggle-button ${settings.audioEnabled ? 'active' : ''}`}
                >
                  {settings.audioEnabled ? 'ON' : 'OFF'}
                </button>
              </div>

              <div className="setting-item">
                <label>🎤 Voice Selection</label>
                {availableVoices.length > 0 ? (
                  <>
                    <select
                      value={settings.preferredVoice || ''}
                      onChange={(e) => handleSettingsChange('preferredVoice', e.target.value || undefined)}
                      className="setting-select"
                    >
                      <option value="">Default (Auto Select)</option>
                      {availableVoices.map((voice, idx) => (
                        <option key={idx} value={voice.name}>
                          {voice.name} ({voice.lang})
                        </option>
                      ))}
                    </select>
                    <p className="voice-note">Available voices: {availableVoices.length}</p>
                  </>
                ) : (
                  <p className="voice-note">No voices found. Please reload the page or check browser settings.</p>
                )}
              </div>

              <div className="setting-item voice-test-section">
                <div className="voice-test-content">
                  <label>🎧 Test Voice</label>
                  <p className="voice-test-description">Test the selected voice with a word:</p>
                  <div className="voice-test-controls">
                    <input
                      type="text"
                      value={testWord}
                      onChange={(e) => setTestWord(e.target.value)}
                      placeholder="Enter a test word..."
                      className="test-word-input"
                    />
                    <button
                      onClick={() => speakWord(testWord, settings.preferredVoice)}
                      className="test-play-button"
                      disabled={!testWord.trim()}
                    >
                      🔊 Play
                    </button>
                  </div>
                  <div className="quick-test-words">
                    <span className="quick-label">Quick test:</span>
                    {['hello', 'elephant', 'water', 'beautiful'].map((word) => (
                      <button
                        key={word}
                        onClick={() => speakWord(word, settings.preferredVoice)}
                        className="quick-test-button"
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentMode;
