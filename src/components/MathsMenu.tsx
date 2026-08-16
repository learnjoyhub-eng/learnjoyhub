'use client';

import { useRouter } from 'next/navigation';
import { trackComponentAccess } from '../utils/analytics';
import type { MathsSubtopic } from '../types';
import '../screens/MathsSubject.css';

const topics: { id: MathsSubtopic; title: string; icon: string; description: string; color: string }[] = [
  {
    id: 'addition',
    title: 'Addition',
    icon: '➕',
    description: 'Learn to add numbers and build counting skills',
    color: 'addition-topic',
  },
  {
    id: 'subtraction',
    title: 'Subtraction',
    icon: '➖',
    description: 'Master subtraction and develop problem-solving skills',
    color: 'subtraction-topic',
  },
  {
    id: 'multiplication',
    title: 'Multiplication',
    icon: '✖️',
    description: 'Understand multiplication tables and patterns',
    color: 'multiplication-topic',
  },
  {
    id: 'division',
    title: 'Division',
    icon: '➗',
    description: 'Learn division concepts and long division',
    color: 'division-topic',
  },
];

const MathsMenu = () => {
  const router = useRouter();

  return (
    <div className="maths-subject-container">
      <div className="maths-subject-content">
        <button className="back-button-maths" onClick={() => router.push('/subjects')}>
          ← Back to Subjects
        </button>

        <div className="subject-header">
          <h1>🔢 Maths - Arithmetic</h1>
          <p>Build strong mathematical foundations with interactive practice</p>
        </div>

        <div className="maths-topics">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className={`topic-card ${topic.color}`}
              onClick={() => {
                trackComponentAccess('Maths Subject', topic.title);
                router.push(`/maths/${topic.id}`);
              }}
            >
              <div className="topic-icon">{topic.icon}</div>
              <h2>{topic.title}</h2>
              <p>{topic.description}</p>
              <button className="start-button">Start Practice →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MathsMenu;
