import type { Metadata } from 'next';
import QuizPlayer from '../../../components/QuizPlayer';

export const metadata: Metadata = {
  title: 'Science Quiz',
  description: 'Test your knowledge of plants, animals, the human body, and the world around us with a fun Science quiz.',
  alternates: { canonical: '/knowledge/science' },
};

export default function ScienceQuizPage() {
  return <QuizPlayer subject="science" title="Science" icon="🔬" />;
}
