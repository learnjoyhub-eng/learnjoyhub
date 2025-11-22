import React from 'react';
import logoImage from '../assets/image.png';
import './GlobalHeader.css';

interface GlobalHeaderProps {
  onLogoClick: () => void;
  onNavigate?: (section: 'home' | 'about' | 'modules') => void;
}

const GlobalHeader: React.FC<GlobalHeaderProps> = ({ onLogoClick, onNavigate }) => {
  const handleNavClick = (section: 'home' | 'about' | 'modules') => {
    if (onNavigate) {
      onNavigate(section);
    } else {
      // Fallback to scrolling if navigation callback not provided
      if (section === 'home') {
        onLogoClick();
      } else {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header className="global-header">
      <div className="header-container">
        <div 
          className="header-logo-section" 
          onClick={onLogoClick}
          role="button"
          tabIndex={0}
        >
          <img src={logoImage} alt="LearnJoyHub Logo" className="header-logo" />
          <div className="header-branding">
            <h1 className="domain-name">LearnJoyHub</h1>
            <p className="domain-url">learnjoyhub.in</p>
          </div>
        </div>
        
        <nav className="header-nav">
          <button 
            className="nav-link" 
            onClick={() => handleNavClick('home')}
          >
            🏠 Home
          </button>
          <button 
            className="nav-link" 
            onClick={() => handleNavClick('about')}
          >
            📖 About
          </button>
          <button 
            className="nav-link" 
            onClick={() => handleNavClick('modules')}
          >
            🎓 Modules
          </button>
        </nav>
      </div>
    </header>
  );
};

export default GlobalHeader;
