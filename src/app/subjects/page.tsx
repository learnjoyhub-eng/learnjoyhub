import type { Metadata } from 'next';
import SubjectSelector from '../../components/SubjectSelector';

export const metadata: Metadata = {
  title: 'Choose a Subject',
  description: 'Pick English spelling practice or Maths arithmetic practice for 2nd Standard ICSE.',
  alternates: { canonical: '/subjects' },
};

export default function SubjectsPage() {
  return <SubjectSelector />;
}
