import React from 'react';
import { trackComponentAccess } from '../utils/analytics';
import GoogleAd from '../components/GoogleAd';
import GoogleAdSidebar from '../components/GoogleAdSidebar';
import './LandingPage.css';

interface LandingPageProps {
  onSelectModule: (module: 'kids' | 'numerology') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectModule }) => {
  const handleModuleClick = (module: 'kids' | 'numerology') => {
    trackComponentAccess('Landing Page', module === 'kids' ? 'Kids Learning' : 'Numerology');
    onSelectModule(module);
  };

  return (
    <div className="landing-page">
      {/* Sidebar Ad - Sticky on right side */}
      <GoogleAdSidebar adSlot="1234567893" />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">Learning with Joy & Purpose</h2>
          <p className="hero-subtitle">
            Discover the magic of interactive learning combined with life wisdom
          </p>
          <div className="hero-cta">
            <button className="cta-button primary" onClick={() => handleModuleClick('kids')}>
              🎓 Kids Learning (2nd Std ICSE)
            </button>
            <button className="cta-button secondary" onClick={() => handleModuleClick('numerology')}>
              🔢 Numerology Explorer
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-elements">
            <div className="element element-1">📚</div>
            <div className="element element-2">🔢</div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="modules-section">
        <h2>Our Learning Modules</h2>
        <p className="section-subtitle">Choose your learning adventure</p>

        <div className="modules-grid">
          {/* Kids Learning Module */}
          <div className="module-card kids-module">
            <div className="module-icon">🎓</div>
            <h3>Kids Learning</h3>
            <p className="module-grade">2nd Standard ICSE</p>
            <div className="module-features">
              <div className="feature">📖 English - Spelling Game</div>
              <div className="feature">🔢 Maths - Arithmetic</div>
              <div className="feature">🎮 Interactive Worksheets</div>
              <div className="feature">📊 Progress Tracking</div>
              <div className="feature">👨‍👩‍👧 Parent Dashboard</div>
            </div>
            <button 
              className="module-button"
              onClick={() => handleModuleClick('kids')}
            >
              Start Learning →
            </button>
          </div>

          {/* Numerology Module */}
          <div className="module-card numerology-module">
            <div className="module-icon">🔢</div>
            <h3>Numerology</h3>
            <p className="module-grade">For All Ages</p>
            <div className="module-features">
              <div className="feature">🧮 Number Calculator</div>
              <div className="feature">✨ Life Path Numbers</div>
              <div className="feature">🎯 Personal Insights</div>
              <div className="feature">📱 Easy to Use</div>
              <div className="feature">🌟 Discover Hidden Patterns</div>
            </div>
            <button 
              className="module-button"
              onClick={() => handleModuleClick('numerology')}
            >
              Explore Numerology →
            </button>
          </div>
        </div>
      </section>

      {/* In-Content Ad - Between Modules and About */}
      <GoogleAd 
        adSlot="1234567896"
        adFormat="auto"
        className="landing-page-ad-middle"
      />

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2>About LearnJoyHub</h2>
            <p>
              Welcome to <strong>LearnJoyHub.in</strong> — a unique digital learning platform created with a vision 
              to make education interactive, joyful, and meaningful for the entire family.
            </p>
            
            <h3>My Story</h3>
            <p>
              I created LearnJoyHub because I believe learning should be fun, engaging, and holistic. 
              As an educator and lifelong learner, I noticed that children learn best when concepts are interactive 
              and when learning extends beyond textbooks. This platform is my effort to bridge the gap between 
              traditional education and life wisdom.
            </p>

            <h3>Our Mission</h3>
            <p>
              <strong>"To create a joyful learning ecosystem where children excel academically while 
              discovering the deeper connections between numbers, patterns, and life itself."</strong>
            </p>

            <h3>Why LearnJoyHub?</h3>
            <ul className="why-list">
              <li>✨ <strong>Interactive Learning</strong> - Not just reading, but engaging with concepts actively</li>
              <li>👨‍👩‍👧‍👦 <strong>Family Focused</strong> - Parents can track progress and learn alongside their children</li>
              <li>🎯 <strong>ICSE Curriculum</strong> - Aligned with Indian school standards starting from 2nd grade</li>
              <li>🔢 <strong>Life Wisdom</strong> - Learn numerology and discover patterns in everyday life</li>
              <li>🎨 <strong>Beautiful Design</strong> - Kid-friendly interface that's also engaging for adults</li>
              <li>🚀 <strong>Continuously Growing</strong> - New subjects, grades, and features added regularly</li>
            </ul>
          </div>
          <div className="about-visual">
            <div className="about-card">
              <h4>Our Vision</h4>
              <p>
                A world where every child enjoys learning, 
                understands the joy of discovery, and grows 
                with confidence and curiosity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Parents & Kids Love LearnJoyHub</h2>
        <div className="features-grid">
          <div className="feature-item">
            <span className="feature-emoji">🎯</span>
            <h4>Curriculum Aligned</h4>
            <p>Follows ICSE standards for Indian schools</p>
          </div>
          <div className="feature-item">
            <span className="feature-emoji">🎨</span>
            <h4>Beautiful Design</h4>
            <p>Engaging, colorful, and kid-friendly interface</p>
          </div>
          <div className="feature-item">
            <span className="feature-emoji">⏱️</span>
            <h4>Timed Practice</h4>
            <p>Fun challenges with timer and scoring</p>
          </div>
          <div className="feature-item">
            <span className="feature-emoji">📊</span>
            <h4>Progress Tracking</h4>
            <p>Parents can monitor learning progress</p>
          </div>
          <div className="feature-item">
            <span className="feature-emoji">🎤</span>
            <h4>Voice Features</h4>
            <p>Audio pronunciation for spelling practice</p>
          </div>
          <div className="feature-item">
            <span className="feature-emoji">🔐</span>
            <h4>Safe & Secure</h4>
            <p>Kid-safe environment with no ads on learning screens</p>
          </div>
        </div>
      </section>

      {/* Ad Section - Non-intrusive placement */}
      <GoogleAd 
        adSlot="1234567890"
        adFormat="auto"
        className="landing-page-ad"
      />

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-info">
            <h3>LearnJoyHub 🌟</h3>
            <p>Making learning joyful, interactive, and meaningful</p>
            <p className="footer-domain">📱 learnjoyhub.in</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#modules">Modules</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Connect</h4>
            <p>📧 <a href="mailto:learnjoyhub@gmail.com">learnjoyhub@gmail.com</a></p>
            <p>For queries and feedback, please reach out to us</p>
          </div>
          <div className="footer-legal">
            <h4>Legal</h4>
            <ul>
              <li><a href="#terms" onClick={(e) => { e.preventDefault(); window.location.hash = 'terms'; }}>Terms & Conditions</a></li>
              <li><a href="#privacy" onClick={(e) => { e.preventDefault(); window.location.hash = 'privacy'; }}>Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 LearnJoyHub. All rights reserved. | Building the Future of Learning</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
