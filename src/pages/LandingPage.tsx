import React from 'react';
import { trackComponentAccess } from '../utils/analytics';
import GoogleAd from '../components/GoogleAd';
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

      {/* Educational Content Section */}
      <section className="educational-content-section">
        <h2>The Power of Interactive Learning</h2>
        
        <div className="content-grid">
          <article className="content-article">
            <h3>Why Interactive Learning Works Better</h3>
            <p>
              Traditional learning methods often rely on passive absorption of information through reading 
              and listening. However, research in educational psychology consistently shows that interactive 
              learning—where students actively engage with the material—leads to significantly better retention 
              and understanding.
            </p>
            <p>
              At LearnJoyHub, we've designed our modules to be highly interactive. When a child practices 
              spelling, they don't just read words—they type them, hear them pronounced, get immediate feedback, 
              and see their progress visualized. This multi-sensory approach activates different parts of the 
              brain, creating stronger neural pathways and making learning more effective and enjoyable.
            </p>
            <p>
              Studies show that interactive learning can improve retention rates by up to 75% compared to 
              passive learning methods. By making learning a game rather than a chore, children develop 
              intrinsic motivation to learn, which is far more powerful than external pressure.
            </p>
          </article>

          <article className="content-article">
            <h3>Building Strong Foundations in Primary Education</h3>
            <p>
              The primary school years, particularly 2nd standard, are crucial for building fundamental 
              academic skills. This is when children transition from learning to read to reading to learn. 
              Strong spelling and mathematical foundations during these years set the stage for academic 
              success throughout their educational journey.
            </p>
            <p>
              Our platform focuses on the ICSE curriculum for 2nd standard students, covering essential 
              subjects like English spelling and Mathematics. We understand that every child learns at their 
              own pace, which is why our content is organized by difficulty levels—Easy, Medium, and Hard. 
              Parents can also add custom words through our Parent Mode, tailoring the learning experience 
              to their child's specific needs.
            </p>
            <p>
              Mathematics is introduced through fundamental operations: addition, subtraction, multiplication, 
              and division. Each operation includes both table practice (for building memory) and problem-solving 
              exercises (for developing analytical thinking). This dual approach ensures children not only 
              memorize facts but also understand the concepts behind them.
            </p>
          </article>

          <article className="content-article">
            <h3>The Role of Parents in Modern Education</h3>
            <p>
              We believe parents are partners in their child's education, not just supervisors. That's why 
              we've created a comprehensive Parent Mode that gives you real control and visibility into your 
              child's learning journey.
            </p>
            <p>
              Through Parent Mode, you can add custom words based on your child's school curriculum or 
              specific areas where they need practice. You can mark certain words as priority, track detailed 
              progress statistics, and even customize game settings like timer duration and difficulty levels. 
              This level of customization ensures the platform adapts to your child rather than forcing your 
              child to adapt to rigid content.
            </p>
            <p>
              Our progress tracking system shows you exactly which words your child has mastered and which 
              ones need more practice. You can see accuracy rates, time taken, and improvement trends over 
              time. This data-driven approach helps you make informed decisions about where to focus your 
              child's learning efforts.
            </p>
          </article>

          <article className="content-article">
            <h3>Numerology: Understanding Life's Patterns</h3>
            <p>
              Beyond academic subjects, LearnJoyHub offers a unique feature—a comprehensive Numerology 
              Calculator. Numerology is the ancient study of numbers and their influence on our lives. 
              While it's not a science in the traditional sense, millions of people worldwide find meaning 
              and guidance through numerological insights.
            </p>
            <p>
              Our numerology module supports three major systems: Pythagorean (Western), Chaldean (Babylonian), 
              and Kabbalah (Hebrew). Each system has its own methodology for calculating life path numbers, 
              destiny numbers, and personality numbers. We provide detailed explanations of what each number 
              means, including personality traits, strengths, challenges, and life purposes associated with 
              each number from 1 to 9, plus master numbers 11, 22, and 33.
            </p>
            <p>
              Whether you're curious about numerology or a serious practitioner, our calculator provides 
              accurate calculations and comprehensive interpretations. We've included educational content 
              explaining the history of numerology, how different cultures have used numbers for divination 
              and self-understanding, and how to interpret your personal numbers in the context of your life 
              journey.
            </p>
          </article>

          <article className="content-article">
            <h3>Creating a Safe Digital Learning Environment</h3>
            <p>
              In today's digital age, keeping children safe online is a top priority for parents. LearnJoyHub 
              is designed with child safety at its core. We don't collect any personal information from 
              children. All progress data is stored locally in your browser, giving you complete control over 
              your child's data.
            </p>
            <p>
              We also maintain a strict "no ads in learning zones" policy. While you may see educational ads 
              on informational pages (which help us keep the platform free), the actual learning interfaces 
              where children interact—the spelling game, math practice areas—are completely ad-free. This 
              ensures children can focus on learning without distractions or exposure to inappropriate content.
            </p>
            <p>
              Our interface is designed to be intuitive even for young learners, with large buttons, clear 
              instructions, and colorful, engaging graphics. We use positive reinforcement—celebrating 
              successes and gently encouraging improvement on mistakes—to build confidence and motivation.
            </p>
          </article>

          <article className="content-article">
            <h3>The Future of Learning is Here</h3>
            <p>
              Education is evolving rapidly, and digital learning platforms are becoming essential tools in 
              every household. LearnJoyHub represents the future of education—personalized, interactive, 
              data-driven, and accessible to everyone with an internet connection.
            </p>
            <p>
              We're constantly working on expanding our platform. Future updates will include more grade 
              levels, additional subjects like Science and Social Studies, more advanced math topics, 
              multiplayer challenges where children can compete with friends, achievement badges and rewards 
              systems, and even more customization options for parents.
            </p>
            <p>
              Our vision is to create a complete learning ecosystem that grows with your child from primary 
              school through high school, combining academic excellence with life skills and wisdom. By 
              integrating traditional curriculum with modern learning science and even ancient wisdom like 
              numerology, we're creating something truly unique in the educational technology space.
            </p>
            <p>
              Join us on this journey to make learning joyful, effective, and meaningful. Whether you're a 
              parent looking for supplemental learning tools, a teacher seeking interactive resources, or 
              simply someone interested in numerology and self-discovery, LearnJoyHub has something valuable 
              to offer you.
            </p>
          </article>
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
