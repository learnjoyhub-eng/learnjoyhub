import { useState, useEffect } from 'react';
import type { GameSettings } from '../types';
import { getSettings, saveSettings, DEFAULT_SETTINGS } from '../utils/localStorage';

export const useSettings = () => {
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const loadSettings = () => {
      setSettings(getSettings());
    };

    loadSettings();
  }, []);

  const updateSettings = (newSettings: GameSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  return { settings, updateSettings };
};
