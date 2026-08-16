import type { Metadata } from 'next';
import EnglishSubject from '../../screens/EnglishSubject';

export const metadata: Metadata = {
  title: 'English Spelling Practice',
  description: 'Master spelling with guided practice, audio pronunciation, and smart hints for 2nd Standard ICSE students.',
  alternates: { canonical: '/english' },
};

export default function EnglishPage() {
  return <EnglishSubject />;
}
