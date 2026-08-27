import type { Metadata } from 'next';
import QuizPlayer from '../../../components/QuizPlayer';

export const metadata: Metadata = {
  title: 'General Knowledge Quiz',
  description: 'Fun facts about India, the world, and everyday life in a General Knowledge quiz for kids.',
  alternates: { canonical: '/knowledge/gk' },
};

export default function GKQuizPage() {
  return <QuizPlayer subject="gk" title="General Knowledge" icon="🌍" />;
}
