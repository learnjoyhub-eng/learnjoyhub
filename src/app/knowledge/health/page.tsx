import type { Metadata } from 'next';
import QuizPlayer from '../../../components/QuizPlayer';

export const metadata: Metadata = {
  title: 'Health Education Quiz',
  description: 'Learn healthy habits for a happy, strong body and mind with a fun Health Education quiz.',
  alternates: { canonical: '/knowledge/health' },
};

export default function HealthQuizPage() {
  return <QuizPlayer subject="health" title="Health Education" icon="🩺" />;
}
