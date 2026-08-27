'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import logoImage from '../assets/image.png';
import GradeSwitcher from './GradeSwitcher';
import './GlobalHeader.css';

const GlobalHeader = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavClick = (section: 'home' | 'about' | 'modules') => {
    if (section === 'home') {
      if (pathname !== '/') {
        router.push('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (pathname !== '/') {
      router.push(`/#${section}`);
      return;
    }

    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="global-header">
      <div className="header-container">
        <Link href="/" className="header-logo-section">
          <Image src={logoImage} alt="LearnJoyHub Logo" className="header-logo" />
          <div className="header-branding">
            <h1 className="domain-name">LearnJoyHub</h1>
            <p className="domain-url">learnjoyhub.in</p>
          </div>
        </Link>

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
          <GradeSwitcher />
        </nav>
      </div>
    </header>
  );
};

export default GlobalHeader;
