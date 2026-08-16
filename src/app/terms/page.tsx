import type { Metadata } from 'next';
import TermsAndConditions from '../../screens/TermsAndConditions';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms and Conditions for using LearnJoyHub.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return <TermsAndConditions />;
}
