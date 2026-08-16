import type { Metadata } from 'next';
import PrivacyPolicy from '../../screens/PrivacyPolicy';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for LearnJoyHub.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}
