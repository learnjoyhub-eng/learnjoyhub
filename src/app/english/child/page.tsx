import type { Metadata } from 'next';
import ChildMode from '../../../screens/ChildMode';

export const metadata: Metadata = {
  title: 'Play & Learn Spelling',
  robots: { index: false, follow: false },
};

export default function EnglishChildPage() {
  return <ChildMode />;
}
