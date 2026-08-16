import type { Metadata } from 'next';
import NumerologyCalculator from '../../screens/NumerologyCalculator';

export const metadata: Metadata = {
  title: 'Numerology Calculator',
  description: 'Calculate your life path, destiny, and personality numbers using Pythagorean, Chaldean, and Kabbalah numerology systems.',
  alternates: { canonical: '/numerology' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'LearnJoyHub Numerology Calculator',
  applicationCategory: 'LifestyleApplication',
  description: 'Free numerology calculator supporting Pythagorean, Chaldean, and Kabbalah numerology systems.',
};

export default function NumerologyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NumerologyCalculator />
    </>
  );
}
