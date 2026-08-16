import type { Metadata } from 'next';
import Link from 'next/link';
import ModeSelector from '../../../components/ModeSelector';
import '../../../screens/EnglishSubject.css';

export const metadata: Metadata = {
  title: 'Choose Parent or Child Mode',
  description: 'Choose Parent Mode to manage spelling words and settings, or Play & Learn mode to practice spelling.',
  alternates: { canonical: '/english/play' },
};

export default function EnglishPlayPage() {
  return (
    <div className="english-subject-container">
      <Link href="/english" className="back-button-english">
        ← Back to English
      </Link>
      <ModeSelector />
    </div>
  );
}
