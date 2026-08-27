import type { Metadata } from 'next';
import KnowledgeMenu from '../../components/KnowledgeMenu';

export const metadata: Metadata = {
  title: 'Knowledge Hub',
  description: 'Fun Science, General Knowledge, and Health Education quizzes for 2nd and 3rd Standard ICSE students.',
  alternates: { canonical: '/knowledge' },
};

export default function KnowledgePage() {
  return <KnowledgeMenu />;
}
