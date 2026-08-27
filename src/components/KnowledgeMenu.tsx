'use client';

import { useRouter } from 'next/navigation';
import { trackComponentAccess } from '../utils/analytics';
import { KNOWLEDGE_SUBJECTS } from '../utils/knowledgeQuestions';
import './KnowledgeMenu.css';

const colors: Record<string, string> = {
  science: 'science-topic',
  gk: 'gk-topic',
  health: 'health-topic',
};

const KnowledgeMenu = () => {
  const router = useRouter();

  return (
    <div className="knowledge-menu-container">
      <div className="knowledge-menu-content">
        <button className="back-button-knowledge" onClick={() => router.push('/subjects')}>
          ← Back to Subjects
        </button>

        <div className="knowledge-subject-header">
          <h1>🧠 Knowledge Hub</h1>
          <p>Fun quizzes in Science, General Knowledge, and Health Education</p>
        </div>

        <div className="knowledge-topics">
          {KNOWLEDGE_SUBJECTS.map((topic) => (
            <div
              key={topic.value}
              className={`knowledge-topic-card ${colors[topic.value]}`}
              onClick={() => {
                trackComponentAccess('Knowledge Menu', topic.label);
                router.push(`/knowledge/${topic.value}`);
              }}
            >
              <div className="knowledge-topic-icon">{topic.icon}</div>
              <h2>{topic.label}</h2>
              <p>{topic.description}</p>
              <button className="knowledge-start-button">Start Quiz →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeMenu;
