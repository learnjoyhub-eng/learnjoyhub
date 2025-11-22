import { useState, useEffect } from 'react';
import GlobalHeader from './components/GlobalHeader';
import LandingPage from './pages/LandingPage';
import SubjectSelector from './components/SubjectSelector';
import EnglishSubject from './pages/EnglishSubject';
import MathsSubject from './pages/MathsSubject';
import ParentMode from './pages/ParentMode';
import ChildMode from './pages/ChildMode';
import NumerologyCalculator from './pages/NumerologyCalculator';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { trackPageView } from './utils/analytics';
import type { GameMode, Subject } from './types';
import './App.css';

type AppState = 'landing' | 'subject' | 'english' | 'maths' | 'parent' | 'child' | 'numerology' | 'terms' | 'privacy';

function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);

  // Track page views when appState changes
  useEffect(() => {
    const pageNames: Record<AppState, string> = {
      landing: 'Landing Page',
      subject: 'Subject Selector',
      english: 'English Subject',
      maths: 'Maths Subject',
      parent: 'Parent Mode',
      child: 'Child Mode',
      numerology: 'Numerology Calculator',
      terms: 'Terms and Conditions',
      privacy: 'Privacy Policy'
    };
    
    trackPageView(pageNames[appState]);
  }, [appState]);

  // Handle hash changes for legal pages
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'terms') {
        setAppState('terms');
      } else if (hash === 'privacy') {
        setAppState('privacy');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check initial hash

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectModule = (module: 'kids' | 'numerology') => {
    if (module === 'kids') {
      setAppState('subject');
    } else if (module === 'numerology') {
      setAppState('numerology');
    }
  };

  const handleSelectSubject = (subject: Subject) => {
    if (subject === 'english') {
      setAppState('english');
    } else if (subject === 'maths') {
      setAppState('maths');
    }
  };

  const handleSelectMode = (mode: GameMode) => {
    setSelectedMode(mode);
    setAppState(mode === 'parent' ? 'parent' : 'child');
  };

  const handleBackToLanding = () => {
    setAppState('landing');
    setSelectedMode(null);
  };

  const handleLogoClick = () => {
    setAppState('landing');
    setSelectedMode(null);
  };

  const handleNavigation = (section: 'home' | 'about' | 'modules') => {
    if (appState !== 'landing') {
      // If not on landing page, go to landing first
      setAppState('landing');
      setSelectedMode(null);
      // Wait for state to update, then scroll
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Already on landing page, just scroll
      if (section === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleBackToSubjects = () => {
    setAppState('subject');
    setSelectedMode(null);
  };

  const handleBackToEnglish = () => {
    setAppState('english');
  };

  return (
    <div className="app">
      <GlobalHeader onLogoClick={handleLogoClick} onNavigate={handleNavigation} />
      
      {appState === 'landing' && (
        <LandingPage onSelectModule={handleSelectModule} />
      )}

      {appState === 'subject' && (
        <SubjectSelector onSelectSubject={handleSelectSubject} onBackHome={handleBackToLanding} />
      )}
      
      {appState === 'english' && (
        <EnglishSubject 
          onBack={handleBackToSubjects}
          onSelectMode={handleSelectMode}
        />
      )}
      
      {appState === 'maths' && (
        <MathsSubject 
          onBack={handleBackToSubjects}
        />
      )}

      {appState === 'numerology' && (
        <NumerologyCalculator onBack={handleBackToLanding} />
      )}
      
      {appState === 'parent' && selectedMode === 'parent' && (
        <ParentMode onBack={handleBackToEnglish} />
      )}
      
      {appState === 'child' && selectedMode === 'child' && (
        <ChildMode onBack={handleBackToEnglish} />
      )}

      {appState === 'terms' && (
        <TermsAndConditions onBack={handleBackToLanding} />
      )}

      {appState === 'privacy' && (
        <PrivacyPolicy onBack={handleBackToLanding} />
      )}
    </div>
  );
}

export default App;
