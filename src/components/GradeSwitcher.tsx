'use client';

import { useState, useRef, useEffect } from 'react';
import { useSettings } from '../hooks/useSettings';
import { GRADES } from '../utils/localStorage';
import type { Grade } from '../types';
import './GradeSwitcher.css';

const GradeSwitcher = () => {
  const { settings, updateSettings } = useSettings();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const activeGrade = settings.grade ?? 'grade2';
  const activeLabel = GRADES.find((g) => g.value === activeGrade)?.label ?? '2nd Standard';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (grade: Grade) => {
    updateSettings({ ...settings, grade });
    setOpen(false);
  };

  return (
    <div className="grade-switcher" ref={ref}>
      <button
        className="grade-switcher-button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        🎓 {activeLabel} <span className="grade-switcher-caret">▾</span>
      </button>
      {open && (
        <ul className="grade-switcher-menu" role="listbox">
          {GRADES.map((g) => (
            <li key={g.value}>
              <button
                className={`grade-switcher-option ${g.value === activeGrade ? 'active' : ''}`}
                onClick={() => handleSelect(g.value)}
                role="option"
                aria-selected={g.value === activeGrade}
              >
                {g.label} {g.value === activeGrade && '✓'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GradeSwitcher;
