import type { Metadata } from 'next';
import ParentMode from '../../../screens/ParentMode';

export const metadata: Metadata = {
  title: 'Parent Dashboard',
  robots: { index: false, follow: false },
};

export default function EnglishParentPage() {
  return <ParentMode />;
}
